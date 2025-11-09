// In this forked version of `node-pty`, a worker script runs in a Web Worker
// instead of a Node worker thread. In a Web Worker environment, the `exports`
// object does not exist, so the TypeScript preamble that defines `__esModule`
// on `exports` is bound to fail.
//
// One quick way to work around this is to define a dummy `exports` object in
// the hackiest way possible: by manually editing the worker file after build.
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'lib', 'worker', 'conoutSocketWorker.js');
let contents = fs.readFileSync(filePath).toString();

if (!contents.includes(`if (typeof exports === "undefined")`)) {
  fs.writeFileSync(filePath, `"use strict";
if (typeof exports === "undefined") var exports = {};
${contents}
`);
}
