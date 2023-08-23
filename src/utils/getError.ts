import { NextResponse } from 'next/server';

const getError = (): NextResponse<null> => (
  NextResponse.json(null, { status: 500 }));

export default getError;
