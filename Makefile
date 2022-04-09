mkfile_dir := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))
project_name := website-346705
region := us-west1
image_name := ${project_name}/website
image_url := gcr.io/${image_name}

all: build push

infra-plan:
	terraform -chdir=${mkfile_dir}infra plan

infra-apply:
	terraform -chdir=${mkfile_dir}infra apply

build:
	docker build ${mkfile_dir}src/api -t ${image_url}

shell:
	docker run --rm -it -p 8080:8080 ${image_url} /bin/sh

run:
	docker run --rm -it -p 8080:8080 ${image_url}

push:
	docker push ${image_url}

deploy:
	gcloud run deploy website --image ${image_url} --region ${region}

