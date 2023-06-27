mkfile_dir := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))
project_name := website-346705
region := us`-west1
image_name := api
image_hostname := ${region}-docker.pkg.dev
image_url := ${image_hostname}/${project_name}/${image_name}
service_account := github-action-479701882

infra-plan:
	terraform -chdir=${mkfile_dir}infra plan

infra-apply:
	terraform -chdir=${mkfile_dir}infra apply

build-api:
	docker compose -f src/docker-compose.yml build api

push-api:
	docker compose -f src/docker-compose.yml push api

up:
	docker compose -f src/docker-compose.yml --env-file src/.env up -d

down:
	docker compose -f src/docker-compose.yml --env-file src/.env down

gsa-key.json:
	gcloud auth login && \
	gcloud iam service-accounts keys create $@ --iam-account=${service_account}@${project_name}.iam.gserviceaccount.com

setup-docker: gsa-key.json
	gcloud auth activate-service-account ${service_account}@${project_name}.iam.gserviceaccount.com --key-file=$? && \
	gcloud auth configure-docker ${image_hostname}