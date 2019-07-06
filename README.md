# codes

📌 some codes, use unit tests to verify code logic.

## JavaScript

- [x] [bind](./src/bind/bind.test.js)
- [x] [call](./src/call&apply/call.test.js)
- [x] [apply](./src/call&apply/apply.test.js)
- [x] [new](./src/new/new.test.js)
- [x] [promise](./src/promise/index.html)
- [x] [throttle](./src/throttle/throttle.js)
- [x] [debounce](./src/debounce/debounce.js)
- [x] [deepclone](./src/deepclone/deepclone.js)

## Bundler

- [x] [babel](./src/babel/babel.js)
  - input  => [tokenizer](./src/babel/lib/tokenizer.js)   => tokens
  - tokens => [parser](./src/babel/lib/parser.js)      => ast
  - ast    => [transformer](./src/babel/lib/transformer.js) => newAst
  - newAst => [codeGenerator](./src/babel/lib/codeGenerator.js)   => output
- [x] [webpack](./src/webpack/minipack.js)
- [x] [webpack-plugin](./src/webpack-plugin/OpenBrowserPlugin.js)
- [x] [babel-plugin](./src/babel-plugin/babel-plugin-simple-import.js)
