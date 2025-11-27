import { TVLResponse, APYResponse } from './types';

// Use Next.js API routes to avoid CORS issues
// These routes proxy requests to the external API

export async function fetchTVLData(tokenSymbol: string = 'XUSDC', days: number = 7): Promise<TVLResponse> {
  const response = await fetch(
    `/api/tvl?token_symbol=${tokenSymbol}&days=${days}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to fetch TVL data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function fetchAPYData(tokenSymbol: string = 'XUSDC', days: number = 7): Promise<APYResponse> {
  const response = await fetch(
    `/api/apy?token_symbol=${tokenSymbol}&days=${days}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to fetch APY data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}


