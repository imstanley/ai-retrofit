import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { intercomApi } from '../lib/api';
import { ApiError } from '../lib/api';

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
        const errorMessage = response.error || 'Failed to buzz intercom';
        onError?.(errorMessage);
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'An unexpected error occurred';
      onError?.(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonLoading]}
        onPress={handleBuzz}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>BUZZ DOOR</Text>
        )}
      </TouchableOpacity>
      
      {lastBuzz && (
        <Text style={styles.lastBuzzText}>
          Last buzzed: {lastBuzz.toLocaleTimeString()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonLoading: {
    backgroundColor: '#1D4ED8',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastBuzzText: {
    marginTop: 16,
    fontSize: 14,
    color: '#6B7280',
  },
});
