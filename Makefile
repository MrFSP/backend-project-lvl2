install:
	npm install

start1:
	npx babel-node src/bin/gendiff.js __tests__/fixtures/before.json __tests__/fixtures/after.json

start2:
	npx babel-node src/bin/gendiff.js __tests__/fixtures/before.yml __tests__/fixtures/after.yml

start3:
	npx babel-node src/bin/gendiff.js __tests__/fixtures/before.ini __tests__/fixtures/after.ini

start4:
	npx babel-node src/bin/gendiff.js -f plain __tests__/fixtures/before.ini __tests__/fixtures/after.ini

publish:
	--dry-run

lint:
	npx eslint .

republish:
	sudo npm uninstall -g gendiff
	npm run build
	npm publish --dry-run
	sudo npm link

test-coverage:
	npm test -- --coverage
	
.PHONY: test
