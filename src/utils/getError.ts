import { NextResponse } from 'next/server';

const getError = (): NextResponse<any> => (
  NextResponse.json(null, { status: 500 }));

export default getError;
