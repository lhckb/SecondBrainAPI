up: #run the app and DB on docker
	docker-compose up --build

down: #erase containers
	docker-compose down

lint: #run typescript linter
	npm run lint

local: #run app locally in WSL
	npm run dev

test:
	npm run test

help: #list all targets
	grep '^[^#[:space:]].*:' Makefile
	