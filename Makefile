install:
	npm install

start:
	npx babel-node src/bin/gendiff.js

publish:
	--dry-run

lint:
	npx eslint .

republish:
	sudo npm uninstall -g gendiff
	npm run build
	npm publish --dry-run
	sudo npm link
	
.PHONY: test
