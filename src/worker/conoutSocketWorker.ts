/**
 * Copyright (c) 2020, Microsoft Corporation (MIT License).
 */
/// <reference lib="webworker" />

// import { parentPort, workerData } from 'worker_threads';
import { Socket, createServer } from 'net';
import { ConoutWorkerMessage, getWorkerPipeName } from '../shared/conout';

const params = new URLSearchParams(self.location.search);
const conoutPipeName = params.get('conoutPipeName');
if (!conoutPipeName) {
  throw new Error('No pipe name')
}
const conoutSocket = new Socket();
conoutSocket.setEncoding('utf8');
conoutSocket.connect(conoutPipeName, () => {
  const server = createServer(workerSocket => {
    conoutSocket.pipe(workerSocket);
  });
  server.listen(getWorkerPipeName(conoutPipeName));
  self.postMessage(ConoutWorkerMessage.READY);
});
