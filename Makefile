mkfile_dir := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))
project_name := website-346705
region := us-west1
image_name := ${project_name}/website
image_url := gcr.io/${image_name}
api_port := 8080

infra-plan:
	terraform -chdir=${mkfile_dir}infra plan

infra-apply:
	terraform -chdir=${mkfile_dir}infra apply

build-api:
	docker compose -f src/docker-compose.yml --env-file src/.env build api

push-api:
	docker compose -f src/docker-compose.yml --env-file src/.env push api

up:
	docker compose -f src/docker-compose.yml --env-file src/.env up -d

down:
	docker compose -f src/docker-compose.yml --env-file src/.env down
