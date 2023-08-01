import { NextResponse } from 'next/server';

const returnError = (): NextResponse<any> => (NextResponse.json(
  { error: 'Internal server error' },
  { status: 500 },
)
);

export default returnError;
