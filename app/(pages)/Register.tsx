// app/(pages)/Register.tsx
import { Button, Card, Icon, Input, Text } from '@rneui/themed';
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';

type RegisterForm = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const formWidth = Math.min(width * 0.9, 400);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();
  const password = watch('password');

  const onSubmit = (data: RegisterForm) => {
    console.log('Register data:', data);
  };

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
            name="user-plus"
            type="font-awesome"
            size={64}
            containerStyle={styles.logo}
          />

          <Card containerStyle={[styles.card, { width: formWidth }]}>
            <Text h4 style={styles.title}>Create Account</Text>

            <Controller
              control={control}
              name="fullName"
              rules={{ required: 'Full name is required' }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Full Name"
                  leftIcon={{ name: 'user', type: 'font-awesome' }}
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.fullName?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email is required',
                pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Email"
                  leftIcon={{ name: 'envelope', type: 'font-awesome' }}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Password is required',
                minLength: { value: 6, message: 'Min. 6 characters' },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Password"
                  secureTextEntry
                  leftIcon={{ name: 'lock', type: 'font-awesome' }}
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                validate: (val) => val === password || 'Passwords do not match',
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirm Password"
                  secureTextEntry
                  leftIcon={{ name: 'lock', type: 'font-awesome' }}
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.confirmPassword?.message}
                />
              )}
            />
          </Card>

          {/* Button group */}
          <Card.Divider style={{ backgroundColor: 'transparent' }} />
          <ScrollView
            horizontal={false}
            contentContainerStyle={[styles.buttonGroup, { width: formWidth }]}
          >
            <Button
              title="Register"
              onPress={handleSubmit(onSubmit)}
              type="solid"
              buttonStyle={styles.primaryButton}
            />
            <Button
              title="Back to Login"
              type="outline"
              onPress={() => router.push('/')}
              buttonStyle={styles.secondaryButton}
            />
          </ScrollView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
  },
  logo: { marginBottom: 24 },
  card: {
    borderRadius: 12,
    borderWidth: 0,
    paddingVertical: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonGroup: {
    marginTop: 24,
    alignItems: 'center',
  },
  primaryButton: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    backgroundColor: '#00ff7f',
    marginBottom: 12,
  },
  secondaryButton: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    borderColor: '#00ff7f',
  },
});
