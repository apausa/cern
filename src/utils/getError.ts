import { NextResponse } from 'next/server';

const getError = (error: unknown = 'Internal Server Error'): NextResponse<unknown> => (
  NextResponse.json(error, { status: 500 }));

export default getError;
