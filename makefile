start-dev:
	@echo "Starting development environment"
	docker compose -f docker-compose.dev.yml up -d 

stop-dev:
	@echo "Stopping development environment"
	docker compose -f docker-compose.dev.yml down

