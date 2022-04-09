locals {
  project = "website-346705"
}

provider "google" {
  project = local.project
}

resource "google_cloud_run_service" "default" {
  name     = "website"
  location = "us-west1"

  metadata {
    annotations = {
      "run.googleapis.com/client-name" = "terraform"
      "run.googleapis.com/ingress"     = "all"
    }
  }

  template {
    spec {
      containers {
        args    = []
        command = []
        image   = "gcr.io/${local.project}/website:latest"
      }
    }
  }
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
  location = "US"
}
