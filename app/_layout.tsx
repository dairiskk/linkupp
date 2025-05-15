// app/_layout.tsx
import { ThemeProvider } from '@rneui/themed';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { PostsProvider } from '../context/PostsContext';
import { ACCENT, theme } from '../theme'; // import ACCENT

export default function RootLayout() {
  const [loading, setLoading] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <PostsProvider>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <SafeAreaView style={styles.container}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#000' },
            }}
            screenListeners={{
              transitionStart: () => setLoading(true),
              transitionEnd: () => setLoading(false),
            }}
          />
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={ACCENT} />
            </View>
          )}
        </SafeAreaView>
      </PostsProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
