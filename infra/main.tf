terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.81.0"
    }
  }
}

locals {
  project        = "website-346705"
  region         = "us-west1"
  storage_region = "US"
  timezone       = "America/Los_Angeles"
  repository_id  = "website"
  image_name     = "api"
}

provider "google" {
  project = local.project
}

resource "google_cloud_run_service" "default" {
  name     = "api"
  location = local.region

  metadata {
    annotations = {
      "run.googleapis.com/ingress" = "all"
    }
  }

  template {
    spec {
      containers {
        image = "us-west1-docker.pkg.dev/${local.project}/${local.repository_id}/${local.image_name}:latest"
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

resource "google_artifact_registry_repository" "api" {
  location      = local.region
  repository_id = local.repository_id
  description   = "Website Backend Container"
  format        = "DOCKER"
}
