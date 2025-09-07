import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { intercomApi } from '../lib/api';
import { IntercomStatus } from '@ai-retrofit/shared';

interface StatusIndicatorProps {
  style?: any;
}

export function StatusIndicator({ style }: StatusIndicatorProps) {
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
      <View style={[styles.container, style]}>
        <View style={[styles.indicator, styles.loading]} />
        <Text style={styles.text}>Checking status...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.indicator,
          status?.is_online ? styles.online : styles.offline,
        ]}
      />
      <Text style={styles.text}>
        {status?.is_online ? 'Online' : 'Offline'}
      </Text>
      {status?.battery_level && (
        <Text style={styles.batteryText}>
          Battery: {status.battery_level}%
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  online: {
    backgroundColor: '#10B981',
  },
  offline: {
    backgroundColor: '#EF4444',
  },
  loading: {
    backgroundColor: '#9CA3AF',
  },
  text: {
    fontSize: 14,
    color: '#6B7280',
  },
  batteryText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 8,
  },
});
