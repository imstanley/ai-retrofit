'use client';

import { useState, useEffect } from 'react';
import { intercomApi } from '@/lib/api';
import { IntercomStatus } from '@ai-retrofit/shared';

interface StatusIndicatorProps {
  className?: string;
}

export function StatusIndicator({ className }: StatusIndicatorProps) {
  const [status, setStatus] = useState<IntercomStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await intercomApi.getStatus();
        if (response.success && response.data) {
          setStatus(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
    
    // Refresh status every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse" />
        <span className="text-sm text-gray-600">Checking status...</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div
        className={`w-3 h-3 rounded-full ${
          status?.is_online ? 'bg-green-500' : 'bg-red-500'
        }`}
      />
      <span className="text-sm text-gray-600">
        {status?.is_online ? 'Online' : 'Offline'}
      </span>
      {status?.battery_level && (
        <span className="text-xs text-gray-500">
          Battery: {status.battery_level}%
        </span>
      )}
    </div>
  );
}
