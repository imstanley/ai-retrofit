import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert } from 'react-native';
import { IntercomButton } from './src/components/IntercomButton';
import { StatusIndicator } from './src/components/StatusIndicator';

export default function App() {
  const [notifications, setNotifications] = useState<string[]>([]);

  const handleSuccess = () => {
    const message = `Door buzzed successfully at ${new Date().toLocaleTimeString()}`;
    setNotifications(prev => [message, ...prev.slice(0, 4)]);
  };

  const handleError = (error: string) => {
    const message = `Error: ${error} at ${new Date().toLocaleTimeString()}`;
    setNotifications(prev => [message, ...prev.slice(0, 4)]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>AI Retrofit</Text>
        <StatusIndicator />
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.mainSection}>
          <Text style={styles.subtitle}>Intercom Control</Text>
          <Text style={styles.description}>
            Tap the button below to buzz your apartment's front door
          </Text>
          
          <IntercomButton onSuccess={handleSuccess} onError={handleError} />
        </View>

        {/* Notifications */}
        {notifications.length > 0 && (
          <View style={styles.notificationsSection}>
            <Text style={styles.notificationsTitle}>Recent Activity</Text>
            {notifications.map((notification, index) => (
              <View
                key={index}
                style={[
                  styles.notification,
                  notification.startsWith('Error:')
                    ? styles.errorNotification
                    : styles.successNotification,
                ]}
              >
                <Text
                  style={[
                    styles.notificationText,
                    notification.startsWith('Error:')
                      ? styles.errorText
                      : styles.successText,
                  ]}
                >
                  {notification}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  mainSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  notificationsSection: {
    width: '100%',
  },
  notificationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  notification: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  successNotification: {
    backgroundColor: '#D1FAE5',
  },
  errorNotification: {
    backgroundColor: '#FEE2E2',
  },
  notificationText: {
    fontSize: 14,
  },
  successText: {
    color: '#065F46',
  },
  errorText: {
    color: '#991B1B',
  },
});
