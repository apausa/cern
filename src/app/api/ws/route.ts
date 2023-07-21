/* eslint-disable import/prefer-default-export */
/* eslint-disable global-require */

import { NextResponse } from 'next/server';

export async function GET() {
  const express = require('express');
  const { WebSocketServer } = require('ws');

  const server = express();
  const PORT = 8000;

  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws: any) => {
    console.log('Inside connection');
    ws.send('Web socket send functionality');

    ws.on('message', (message: any) => {
      console.log('Inside message');
      ws.send('>>>>', message);
    });
  });

  server.get('/', (req: any, res: any) => { res.send('Hello world!'); });
  server.listen(PORT, () => console.log(`Listening on port ${8000}`));

  return NextResponse.json(null);
}
