# Basic proof of concept

Note: you must open the index.html using a "webserver", not open it as a local file.

This page does a few things:

- Create a javascript function that is to be called from WASM
- A wasm file is loaded, which defines uses the imported javascript function in an exported rust function.
- The wasm file is then instantiated using the javascript function, resulting in a WebAssemblyInstantiatedSource
- The exported WASM function is called from JavaScript, which in turn calls the imported JavaScript function, which logs to the console

Further reading: https://developer.mozilla.org/en-US/docs/WebAssembly/Using_the_JavaScript_API
