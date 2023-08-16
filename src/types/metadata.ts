import { Metadata } from 'next';
import { NextResponse } from 'next/server';

export type PostMetadata = NextResponse<Metadata | unknown>;

export type PutMetadata = NextResponse<Metadata | unknown>;
