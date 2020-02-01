install:
	npm install

start:
	npx babel-node src/bin/gendiff.js -V

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
