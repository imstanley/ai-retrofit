'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { intercomApi } from '@/lib/api';
import { ApiError } from '@/lib/api';

interface IntercomButtonProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function IntercomButton({ onSuccess, onError }: IntercomButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [lastBuzz, setLastBuzz] = useState<Date | null>(null);

  const handleBuzz = async () => {
    try {
      setIsLoading(true);
      const response = await intercomApi.buzz();
      
      if (response.success) {
        setLastBuzz(new Date());
        onSuccess?.();
      } else {
        onError?.(response.error || 'Failed to buzz intercom');
      }
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'An unexpected error occurred';
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        onClick={handleBuzz}
        loading={isLoading}
        size="xl"
        className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-2xl font-bold shadow-2xl transform transition-all duration-200 hover:scale-105 active:scale-95"
      >
        {isLoading ? 'BUZZING...' : 'BUZZ DOOR'}
      </Button>
      
      {lastBuzz && (
        <p className="text-sm text-gray-600">
          Last buzzed: {lastBuzz.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}
