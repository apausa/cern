/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable global-require */

export default function webSocket() {
  const express = require('express');
  const server = require('http').createServer(express);
  const { WebSocketServer } = require('ws');

  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws: any) => {
    console.log('Inside connection');
    ws.send('Web socket send functionality');

    ws.on('message', (message: any) => {
      console.log('Inside message');
      ws.send('>>>>', message);
    });
  });

  server.listen(8000, () => console.log(`Listening on port ${8000}`));
}
