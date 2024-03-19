export DOCKER_COMPOSE=docker-compose
install: ## Install all dependencies
	$(DOCKER_COMPOSE) build
	$(DOCKER_COMPOSE) run --rm frontend npm install
run: ## Run the docker stack
	$(DOCKER_COMPOSE) up -d
stop: ## stop the docker stack
	$(DOCKER_COMPOSE) stop
logs: ## logs
	$(DOCKER_COMPOSE) logs --tail=10 -f
down: ## Delete the Docker containers and volumes
	$(DOCKER_COMPOSE) down -v
cli:
	$(DOCKER_COMPOSE) exec frontend sh
test: ## Install all dependencies
	$(DOCKER_COMPOSE) exec frontend npm run test
prettier: ## Install all dependencies
	$(DOCKER_COMPOSE) exec frontend npm run lint
	$(DOCKER_COMPOSE) exec frontend npm run format:fix
security: ## Detect anomalies in packages.json
	$(DOCKER_COMPOSE) exec frontend npm run audit

