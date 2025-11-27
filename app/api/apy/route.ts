import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tokenSymbol = searchParams.get('token_symbol') || 'XUSDC';
    const days = searchParams.get('days') || '7';

    const response = await fetch(
      `https://identity.api.prod.metalx.com/v1/loan/stats/apy?token_symbol=${tokenSymbol}&days=${days}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch APY data: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch APY data' },
      { status: 500 }
    );
  }
}



