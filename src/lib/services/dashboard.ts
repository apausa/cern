import { Form } from '@/types/build';
import { Metadata } from '@/types/dashboard';

// Metadata

export async function postMetadata(form: Form): Promise<Metadata | null> {
  const response: Response = await fetch('/api/metadata', { method: 'POST', body: JSON.stringify(form) });
  const parsedResponse: Metadata | null = await response.json();

  return parsedResponse;
}

export async function putMetadata(unresolvedMetadata: Metadata): Promise<Metadata | null> {
  const response: Response = await fetch('/api/metadata', { method: 'PUT', body: JSON.stringify(unresolvedMetadata) });
  const parsedResponse: Metadata | null = await response.json();

  return parsedResponse;
}
