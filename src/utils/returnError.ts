import { NextResponse } from 'next/server';

const returnError = (error: unknown): NextResponse<unknown> => (
  NextResponse.json(error, { status: 500 }));

export default returnError;
