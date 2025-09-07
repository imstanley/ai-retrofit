'use client';

import { StatusIndicator } from '@/components/molecules/StatusIndicator';
import { Button } from '@/components/atoms/Button';

interface HeaderProps {
  onSignOut?: () => void;
  isAuthenticated?: boolean;
}

export function Header({ onSignOut, isAuthenticated }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">AI Retrofit</h1>
            <StatusIndicator />
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Button variant="ghost" onClick={onSignOut}>
                Sign Out
              </Button>
            ) : (
              <Button variant="primary">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
