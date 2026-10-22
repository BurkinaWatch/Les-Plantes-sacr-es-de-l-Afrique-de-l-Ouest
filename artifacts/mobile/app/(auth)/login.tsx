import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/context/AuthContext';
import { useStartupReadiness } from '@/context/StartupReadinessContext';
import { useColors } from '@/hooks/useColors';
import { useTranslation } from '@/i18n';
import { isValidEmail, isValidUsername } from '@/lib/auth-validation';

export default function LoginScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { returnTo, username: suggestedUsername } = useLocalSearchParams<{
    returnTo?: string;
    username?: string;
  }>();
  const { login, linkEmail } = useAuth();
  const { t } = useTranslation();
  const markStartupReady = useStartupReadiness();

  const [username, setUsername] = useState(() =>
    typeof suggestedUsername === 'string' && isValidEmail(suggestedUsername)
      ? suggestedUsername.trim()
      : '',
  );
  const [legacyMode, setLegacyMode] = useState(() =>
    typeof suggestedUsername === 'string' && isValidUsername(suggestedUsername),
  );
  const [legacyUsername, setLegacyUsername] = useState(() =>
    typeof suggestedUsername === 'string' && isValidUsername(suggestedUsername)
      ? suggestedUsername.trim() : '',
  );
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username.trim() || !password) {
      setError(t.auth_fields_required);
      return;
    }
    if (!isValidEmail(username)) {
      setError(t.auth_username_hint);
      return;
    }
    if (legacyMode && !isValidUsername(legacyUsername)) {
      setError("Saisissez l’ancien identifiant de ce compte (3-30 lettres, chiffres ou _).");
      return;
    }
    setError('');
    setLoading(true);
    const result = legacyMode
      ? await linkEmail(legacyUsername, username.trim(), password)
      : await login(username.trim(), password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      // Only allow the known in-app return route, never an arbitrary URL.
      if (returnTo === '/abonnement') {
        router.dismissTo('/abonnement');
      } else {
        router.replace('/(tabs)');
      }
    }
  }

  return (
    <LinearGradient
      colors={[colors.warmBrown, colors.deepBrown]}
      onLayout={markStartupReady}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.container, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 20 }]}
        >
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
                onChangeText={(value) => {
                  setUsername(value);
                  if (error) setError('');
                }}
                placeholder={t.auth_username_placeholder}
                accessibilityLabel={t.auth_username}
                autoComplete="username"
                textContentType="username"
                keyboardType="email-address"
                maxLength={254}
                placeholderTextColor={colors.mutedForeground}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={[styles.identifierHint, { color: colors.mutedForeground }]}>
                {t.auth_username_hint}
              </Text>
            </View>

            {legacyMode && (
              <View style={styles.field}>
                <Text style={[styles.label, { color: colors.mutedForeground }]}>ANCIEN IDENTIFIANT</Text>
                <TextInput
                  accessibilityLabel="Ancien identifiant"
                  value={legacyUsername}
                  onChangeText={setLegacyUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Identifiant de votre ancien compte"
                  placeholderTextColor={colors.mutedForeground}
                  style={[styles.input, { color: colors.ivory, borderColor: colors.border, backgroundColor: colors.warmBrown }]}
                />
                <Text style={[styles.identifierHint, { color: colors.mutedForeground }]}>
                  Cette association unique conserve votre compte et vos abonnements. Ensuite, connectez-vous avec votre e-mail.
                </Text>
              </View>
            )}

            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.mutedForeground }]}>{t.auth_password}</Text>
              <TextInput
                style={[styles.input, { color: colors.ivory, borderColor: colors.border, backgroundColor: colors.warmBrown }]}
                value={password}
                onChangeText={setPassword}
                placeholder={t.auth_password_placeholder}
                accessibilityLabel={t.auth_password}
                autoComplete="current-password"
                textContentType="password"
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
                <Text style={[styles.btnText, { color: colors.deepBrown }]}>
                  {legacyMode ? "Associer mon e-mail et me connecter" : t.auth_login_btn}
                </Text>
                )}
              </LinearGradient>
            </Pressable>
          </View>

          <Pressable onPress={() => { setLegacyMode(value => !value); setError(''); }}>
            <Text style={[styles.footerLink, { color: colors.gold, textAlign: 'center' }]}>
              {legacyMode ? "J’ai déjà un compte avec mon e-mail" : "Ancien compte sans e-mail ? Associer mon adresse"}
            </Text>
          </Pressable>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: 'rgba(255,255,255,0.5)' }]}>{t.auth_no_account}</Text>
            <Pressable onPress={() => router.replace('/(auth)/register')}>
              <Text style={[styles.footerLink, { color: colors.gold }]}>{t.auth_create_account}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, paddingHorizontal: 24, justifyContent: 'center', gap: 24 },
  header: { alignItems: 'center', gap: 10 },
  logo: { width: 80, height: 80, marginBottom: 4 },
  title: { fontSize: 28, fontWeight: '800', letterSpacing: 0.3 },
  subtitle: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  card: { borderRadius: 20, padding: 24, borderWidth: 1, gap: 16 },
  field: { gap: 6 },
  label: { fontSize: 12, fontWeight: '600', letterSpacing: 1 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15 },
  identifierHint: { fontSize: 12, lineHeight: 18 },
  errorBox: { borderWidth: 1, borderRadius: 10, padding: 12 },
  errorText: { fontSize: 13, lineHeight: 18 },
  btn: { borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  btnText: { fontSize: 15, fontWeight: '700' },
  footer: { flexDirection: 'row', justifyContent: 'center', gap: 6, flexWrap: 'wrap' },
  footerText: { fontSize: 14 },
  footerLink: { fontSize: 14, fontWeight: '700' },
});
