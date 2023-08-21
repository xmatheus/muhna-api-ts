include .env

.PHONY: up

up:
	docker-compose up -d --remove-orphans

.PHONY: down

down:
	docker-compose down

.PHONY: logs

logs:
	docker-compose logs -f