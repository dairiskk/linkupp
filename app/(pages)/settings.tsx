// app/settings.tsx
import { Icon, Text } from '@rneui/themed';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
            headerShown: true, 
          title: 'Settings',
          headerStyle: { backgroundColor: '#000' },
          headerTitleStyle: { color: '#00ff7f' },
          headerLeft: () => (
            <Icon
              name="home"
              type="font-awesome"
              color="#00ff7f"
              onPress={() => router.replace('/home')}
              containerStyle={{ marginLeft: 16 }}
            />
          ),
          contentStyle: { backgroundColor: '#000' },
        }}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text h4 style={styles.text}>Settings Page</Text>
          {/* add your settings fields here */}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { color: '#e0e0e0' },
});
