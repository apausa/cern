export async function connectWebSocket() {
  const response: any = await fetch('/api/ws', { method: 'GET' });

  return response;
}

export async function disconnectWebSOcket() { // @next
  const response: any = await fetch('/api/ws', { method: 'DELETE' });

  return response;
}
