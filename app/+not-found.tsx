// app/+not-found.tsx
import { Link, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: 'Page Not Found' }} />
      <View style={styles.container}>
        <Text style={styles.message}>😕 Whoops, nothing here.</Text>
        <Link href="/" style={styles.link}>Go back to Login</Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16,
  },
  message: {
    fontSize: 18, marginBottom: 12, color: '#e0e0e0',
  },
  link: {
    fontSize: 16, color: '#00ff7f',
  },
});
