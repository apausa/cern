import { Metadata } from '@/types/dashboard';

// All metadata

export function getAllMetadata(): Metadata[] {
  const response: string = localStorage.getItem('allMetadata')!;
  const parsedResponse: Metadata[] = JSON.parse(response);

  return parsedResponse;
}

// Metadata

export async function postMetadata(version: string, cmdStr: string): Promise<Metadata | null> {
  const response: Response = await fetch('/api/metadata', { method: 'POST', body: JSON.stringify({ version, cmdStr }) });
  const parsedResponse: Metadata | null = await response.json();

  return parsedResponse;
}

export async function putMetadata(unresolvedMetadata: Metadata): Promise<Metadata | null> {
  const response: Response = await fetch('/api/metadata', { method: 'PUT', body: JSON.stringify(unresolvedMetadata) });
  const parsedResponse: Metadata | null = await response.json();

  return parsedResponse;
}
