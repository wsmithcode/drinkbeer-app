start-dev:
	@echo "Starting development environment"
	docker compose -f docker-compose.dev.yml up -d 

stop-dev:
	@echo "Stopping development environment"
	docker compose -f docker-compose.dev.yml down

start-prod:
	@echo "Starting production environment"
	docker compose -f docker-compose.prod.yml up -d

stop-prod:
	@echo "Stopping production environment"
	docker compose -f docker-compose.prod.yml down

