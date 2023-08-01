import { NextResponse } from 'next/server';

const returnError = (error: any): NextResponse<any> => (
  NextResponse.json({ error }, { status: 500 }));

export default returnError;
