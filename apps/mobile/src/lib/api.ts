import { ApiResponse, IntercomAction, IntercomStatus } from '@ai-retrofit/shared';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(response.status, errorData.message || 'API request failed');
  }

  return response.json();
}

export const intercomApi = {
  async buzz(): Promise<ApiResponse<IntercomAction>> {
    return apiRequest('/api/intercom/buzz', {
      method: 'POST',
    });
  },

  async getStatus(): Promise<ApiResponse<IntercomStatus>> {
    return apiRequest('/api/intercom/status');
  },

  async getHistory(): Promise<ApiResponse<IntercomAction[]>> {
    return apiRequest('/api/intercom/history');
  },
};
