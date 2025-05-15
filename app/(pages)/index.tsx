// app/(pages)/index.tsx
import { Button, Card, Icon, Input, Text } from '@rneui/themed';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
// import { useForm, Controller } from 'react-hook-form'; // validation temporarily disabled

type LoginForm = { email: string; password: string };

export default function LoginScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const formWidth = Math.min(width * 0.9, 400);

  // const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  // const onValid = (data: LoginForm) => { router.replace('/home'); };
  // const onInvalid = (errs: any) => console.warn(errs);

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: '#000' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={{ backgroundColor: 'transparent' }}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Icon
            name="lock"
            type="font-awesome"
            size={64}
            containerStyle={styles.logo}
          />

          <Card containerStyle={[styles.card, { width: formWidth }]}>
            <Text h4 style={styles.title}>Secret Login</Text>

            {/* Inputs (validation commented out) */}
            <Input
              placeholder="Email"
              leftIcon={{ name: 'envelope', type: 'font-awesome' }}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Input
              placeholder="Password"
              secureTextEntry
              leftIcon={{ name: 'lock', type: 'font-awesome' }}
            />

            {/* Always navigate to home on press */}
            <Button
              title="Unlock"
              onPress={() => router.replace('/home')}
              containerStyle={styles.button}
            />

            <Button
              type="clear"
              onPress={() => router.push('/Register')}
              containerStyle={styles.linkContainer}
            >
              <Text style={styles.link}>Register</Text>
            </Button>
          </Card>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: { marginBottom: 24 },
  card: {
    borderRadius: 12,
    borderWidth: 0,
    paddingVertical: 20,
    backgroundColor: '#111111',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#e0e0e0',
  },
  button: { marginTop: 16 },
  linkContainer: { marginTop: 12 },
  link: { color: '#00ff7f', fontSize: 16 },
});
