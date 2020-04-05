install:
	npm install
	npm run build
	npm publish --dry-run
	sudo npm link

uninstall:
	sudo npm uninstall -g gendiff

start1:
	npx babel-node src/bin/gendiff.js __tests__/__fixtures__/before.json __tests__/__fixtures__/after.json

start2:
	npx babel-node src/bin/gendiff.js -f plain __tests__/__fixtures__/before.ini __tests__/__fixtures__/after.ini

start3:
	npx babel-node src/bin/gendiff.js -f json __tests__/__fixtures__/before.yaml __tests__/__fixtures__/after.yaml

publish:
	--dry-run

lint:
	npx eslint .

build:
	rm -rf dist
	npm run build

republish:
	sudo npm uninstall -g gendiff
	npm run build
	npm publish --dry-run
	sudo npm link

test:
	npm test

test-coverage:
	npm test -- --coverage
	
.PHONY: test
