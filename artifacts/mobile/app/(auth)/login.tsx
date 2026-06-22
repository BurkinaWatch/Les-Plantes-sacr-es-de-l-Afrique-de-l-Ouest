import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/context/AuthContext';
import { useColors } from '@/hooks/useColors';
import { useTranslation } from '@/i18n';

export default function LoginScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useTranslation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username.trim() || !password) {
      setError(t.auth_fields_required);
      return;
    }
    setError('');
    setLoading(true);
    const result = await login(username.trim(), password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      router.replace('/(tabs)');
    }
  }

  return (
    <LinearGradient colors={[colors.warmBrown, colors.deepBrown]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.container, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 20 }]}>
          <View style={styles.header}>
            <Image source={require('@/assets/images/icon.png')} style={styles.logo} />
            <Text style={[styles.title, { color: colors.ivory }]}>{t.auth_welcome_back}</Text>
            <Text style={[styles.subtitle, { color: 'rgba(255,255,255,0.55)' }]}>{t.auth_login_subtitle}</Text>
          </View>

          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.mutedForeground }]}>{t.auth_username}</Text>
              <TextInput
                style={[styles.input, { color: colors.ivory, borderColor: colors.border, backgroundColor: colors.warmBrown }]}
                value={username}
                onChangeText={setUsername}
                placeholder={t.auth_username_placeholder}
                placeholderTextColor={colors.mutedForeground}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.mutedForeground }]}>{t.auth_password}</Text>
              <TextInput
                style={[styles.input, { color: colors.ivory, borderColor: colors.border, backgroundColor: colors.warmBrown }]}
                value={password}
                onChangeText={setPassword}
                placeholder={t.auth_password_placeholder}
                placeholderTextColor={colors.mutedForeground}
                secureTextEntry
              />
            </View>

            {error ? (
              <View style={[styles.errorBox, { backgroundColor: '#7f1d1d22', borderColor: '#ef4444' }]}>
                <Text style={[styles.errorText, { color: '#f87171' }]}>{error}</Text>
              </View>
            ) : null}

            <Pressable
              onPress={handleLogin}
              disabled={loading}
              style={({ pressed }) => [{ opacity: pressed || loading ? 0.8 : 1, marginTop: 8 }]}
            >
              <LinearGradient colors={[colors.gold, colors.ochre]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.btn}>
                {loading ? (
                  <ActivityIndicator color={colors.deepBrown} />
                ) : (
                  <Text style={[styles.btnText, { color: colors.deepBrown }]}>{t.auth_login_btn}</Text>
                )}
              </LinearGradient>
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: 'rgba(255,255,255,0.5)' }]}>{t.auth_no_account}</Text>
            <Pressable onPress={() => router.replace('/(auth)/register')}>
              <Text style={[styles.footerLink, { color: colors.gold }]}>{t.auth_create_account}</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, justifyContent: 'center', gap: 32 },
  header: { alignItems: 'center', gap: 10 },
  logo: { width: 80, height: 80, marginBottom: 4 },
  title: { fontSize: 28, fontWeight: '800', letterSpacing: 0.3 },
  subtitle: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  card: { borderRadius: 20, padding: 24, borderWidth: 1, gap: 16 },
  field: { gap: 6 },
  label: { fontSize: 12, fontWeight: '600', letterSpacing: 1 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15 },
  errorBox: { borderWidth: 1, borderRadius: 10, padding: 12 },
  errorText: { fontSize: 13, lineHeight: 18 },
  btn: { borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  btnText: { fontSize: 15, fontWeight: '700' },
  footer: { flexDirection: 'row', justifyContent: 'center', gap: 6, flexWrap: 'wrap' },
  footerText: { fontSize: 14 },
  footerLink: { fontSize: 14, fontWeight: '700' },
});
