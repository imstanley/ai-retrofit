'use client';

import { useState } from 'react';
import { IntercomButton } from '@/components/molecules/IntercomButton';
import { Button } from '@/components/atoms/Button';

export function IntercomControl() {
  const [notifications, setNotifications] = useState<string[]>([]);

  const handleSuccess = () => {
    const message = `Door buzzed successfully at ${new Date().toLocaleTimeString()}`;
    setNotifications(prev => [message, ...prev.slice(0, 4)]);
  };

  const handleError = (error: string) => {
    const message = `Error: ${error} at ${new Date().toLocaleTimeString()}`;
    setNotifications(prev => [message, ...prev.slice(0, 4)]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Intercom Control
        </h2>
        <p className="text-gray-600">
          Tap the button below to buzz your apartment's front door
        </p>
      </div>

      <div className="flex flex-col items-center space-y-8">
        <IntercomButton onSuccess={handleSuccess} onError={handleError} />
        
        {notifications.length > 0 && (
          <div className="w-full max-w-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700">Recent Activity</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearNotifications}
              >
                Clear
              </Button>
            </div>
            <div className="space-y-1">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className={`text-xs p-2 rounded ${
                    notification.startsWith('Error:')
                      ? 'bg-red-50 text-red-700'
                      : 'bg-green-50 text-green-700'
                  }`}
                >
                  {notification}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
