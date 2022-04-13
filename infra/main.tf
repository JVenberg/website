locals {
  project        = "website-346705"
  region         = "us-west1"
  storage_region = "US"
  timezone       = "America/Los_Angeles"
}

provider "google" {
  project = local.project
}

resource "google_cloud_run_service" "default" {
  name     = "website"
  location = local.region

  metadata {
    annotations = {
      "run.googleapis.com/ingress" = "all"
    }
  }

  template {
    spec {
      containers {
        args    = []
        command = []
        image   = "gcr.io/${local.project}/api:latest"
      }
    }
  }

  lifecycle {
    ignore_changes = [
      metadata[0].annotations["run.googleapis.com/client-name"],
      metadata[0].annotations["run.googleapis.com/client-version"],
      metadata[0].annotations["client.knative.dev/user-image"],
    ]
  }

  autogenerate_revision_name = true
}

data "google_iam_policy" "noauth" {
  binding {
    role    = "roles/run.invoker"
    members = ["allUsers"]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.default.location
  project  = google_cloud_run_service.default.project
  service  = google_cloud_run_service.default.name

  policy_data = data.google_iam_policy.noauth.policy_data
}

resource "google_container_registry" "registry" {
  project  = local.project
  location = local.storage_region
}

module "gcr_cleaner" {
  source  = "mirakl/gcr-cleaner/google"
  version = "1.2.0"

  app_engine_application_location = local.region
  cloud_run_service_location      = local.region
  cloud_scheduler_job_time_zone   = local.timezone
  cloud_scheduler_job_schedule    = "0 4 * * *"

  gcr_repositories = [
    {
      region     = local.region
      project_id = local.project
      clean_all  = true
      parameters = {
        keep           = 1
        tag_filter_all = "^latest$"
      }
    }
  ]
}
