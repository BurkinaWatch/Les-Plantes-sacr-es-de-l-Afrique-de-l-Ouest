import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
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

import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { useColors } from '@/hooks/useColors';

export default function AccountDeletionScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, isLoading: authLoading, deleteAccount } = useAuth();
  const { clearPersonalData } = useApp();
  const [password, setPassword] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const topInset = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;
  const bottomInset = Platform.OS === 'web' ? 34 : insets.bottom;

  async function handleDeleteAccount() {
    if (!confirmed) {
      setError('Confirmez que vous comprenez les conséquences avant de continuer.');
      return;
    }
    if (!password) {
      setError('Saisissez votre mot de passe actuel pour confirmer votre identité.');
      return;
    }

    setError('');
    setSubmitting(true);
    const result = await deleteAccount(password);
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    await clearPersonalData();
    router.replace('/(auth)/login');
  }

  if (authLoading) {
    return (
      <View style={[styles.loadingScreen, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.gold} />
      </View>
    );
  }

  if (!user) {
    return (
      <LinearGradient colors={[colors.warmBrown, colors.deepBrown]} style={styles.loadingScreen}>
        <Text style={[styles.title, { color: colors.ivory }]}>Session non disponible</Text>
        <Text style={[styles.body, { color: colors.mutedForeground }]}>
          Connectez-vous pour supprimer votre compte depuis l’application.
        </Text>
        <Pressable
          testID="account-deletion-sign-in"
          accessibilityRole="button"
          onPress={() => router.replace('/(auth)/login')}
          style={styles.primaryButton}
        >
          <Text style={[styles.primaryButtonText, { color: colors.deepBrown }]}>Se connecter</Text>
        </Pressable>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={[colors.warmBrown, colors.deepBrown]} style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingTop: topInset + 12, paddingBottom: bottomInset + 28 },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            testID="account-deletion-back"
            accessibilityRole="button"
            accessibilityLabel="Retour au profil"
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={22} color={colors.ivory} />
            <Text style={[styles.backLabel, { color: colors.ivory }]}>Retour au profil</Text>
          </Pressable>

          <View style={styles.heading}>
            <View style={[styles.warningIcon, { backgroundColor: `${colors.destructive}22` }]}>
              <Ionicons name="person-remove-outline" size={26} color={colors.destructive} />
            </View>
            <Text style={[styles.eyebrow, { color: colors.gold }]}>GESTION DU COMPTE</Text>
            <Text style={[styles.title, { color: colors.ivory }]}>Supprimer mon compte</Text>
            <Text style={[styles.body, { color: colors.mutedForeground }]}>
              Cette action est définitive. Votre accès et les données liées à votre compte seront supprimés.
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.cardTitle, { color: colors.ivory }]}>Ce qui sera supprimé</Text>
            <View style={styles.listItem}>
              <Ionicons name="checkmark-circle-outline" size={19} color={colors.gold} />
              <Text style={[styles.listText, { color: colors.mutedForeground }]}>
                Votre compte, vos abonnements enregistrés et vos jetons de notification.
              </Text>
            </View>
            <View style={styles.listItem}>
              <Ionicons name="checkmark-circle-outline" size={19} color={colors.gold} />
              <Text style={[styles.listText, { color: colors.mutedForeground }]}>
                Les tentatives de paiement associées. Certains prestataires peuvent conserver leurs propres justificatifs.
              </Text>
            </View>
            <View style={[styles.notice, { backgroundColor: `${colors.gold}12`, borderColor: `${colors.gold}40` }]}>
              <Text style={[styles.noticeText, { color: colors.ivory }]}>
                Cette suppression ne déclenche ni remboursement ni annulation auprès d’un prestataire de paiement.
                Vos favoris et résultats du quiz enregistrés sur cet appareil seront également effacés.
              </Text>
            </View>
          </View>

          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.cardTitle, { color: colors.ivory }]}>Confirmer votre identité</Text>
            <Text style={[styles.accountLabel, { color: colors.mutedForeground }]}>Compte</Text>
            <Text style={[styles.username, { color: colors.ivory }]}>{user.username}</Text>

            <Text style={[styles.inputLabel, { color: colors.mutedForeground }]}>
              Mot de passe actuel
            </Text>
            <TextInput
              testID="account-deletion-password"
              accessibilityLabel="Mot de passe actuel"
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                if (error) setError('');
              }}
              placeholder="Saisissez votre mot de passe"
              placeholderTextColor={colors.mutedForeground}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="current-password"
              returnKeyType="done"
              onSubmitEditing={handleDeleteAccount}
              editable={!submitting}
              style={[
                styles.input,
                { color: colors.ivory, borderColor: colors.border, backgroundColor: colors.deepBrown },
              ]}
            />

            <Pressable
              testID="account-deletion-confirm"
              accessibilityRole="checkbox"
              accessibilityState={{ checked: confirmed, disabled: submitting }}
              onPress={() => {
                setConfirmed((value) => !value);
                if (error) setError('');
              }}
              disabled={submitting}
              style={styles.confirmRow}
            >
              <View
                style={[
                  styles.checkbox,
                  {
                    borderColor: confirmed ? colors.gold : colors.mutedForeground,
                    backgroundColor: confirmed ? colors.gold : 'transparent',
                  },
                ]}
              >
                {confirmed ? <Ionicons name="checkmark" size={15} color={colors.deepBrown} /> : null}
              </View>
              <Text style={[styles.confirmText, { color: colors.mutedForeground }]}>
                Je comprends que cette suppression est définitive et que je perdrai l’accès à mon compte.
              </Text>
            </Pressable>

            {error ? (
              <View
                testID="account-deletion-error"
                accessibilityRole="alert"
                style={[styles.errorBox, { borderColor: colors.destructive, backgroundColor: `${colors.destructive}18` }]}
              >
                <Text style={[styles.errorText, { color: colors.destructive }]}>{error}</Text>
              </View>
            ) : null}

            <Pressable
              testID="account-deletion-submit"
              accessibilityRole="button"
              accessibilityState={{ disabled: submitting || !confirmed }}
              onPress={handleDeleteAccount}
              disabled={submitting || !confirmed}
              style={({ pressed }) => [
                styles.deleteButton,
                {
                  backgroundColor: colors.destructive,
                  opacity: submitting || !confirmed ? 0.55 : pressed ? 0.82 : 1,
                },
              ]}
            >
              {submitting ? (
                <ActivityIndicator color={colors.destructiveForeground} />
              ) : (
                <>
                  <Ionicons name="trash-outline" size={19} color={colors.destructiveForeground} />
                  <Text style={[styles.deleteButtonText, { color: colors.destructiveForeground }]}>
                    Supprimer définitivement
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  loadingScreen: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28, gap: 16 },
  content: { flexGrow: 1, paddingHorizontal: 20, gap: 22 },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 10, alignSelf: 'flex-start', paddingVertical: 8 },
  backLabel: { fontSize: 14, fontWeight: '600' },
  heading: { alignItems: 'flex-start', gap: 10 },
  warningIcon: { width: 52, height: 52, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  eyebrow: { fontSize: 10, letterSpacing: 2, fontWeight: '800' },
  title: { fontSize: 27, lineHeight: 34, fontWeight: '800' },
  body: { fontSize: 14, lineHeight: 21 },
  card: { borderRadius: 18, padding: 20, borderWidth: 1, gap: 14 },
  cardTitle: { fontSize: 17, fontWeight: '700', marginBottom: 2 },
  listItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  listText: { flex: 1, fontSize: 13, lineHeight: 19 },
  notice: { borderWidth: 1, borderRadius: 12, padding: 12, marginTop: 2 },
  noticeText: { fontSize: 12, lineHeight: 18 },
  accountLabel: { fontSize: 12, fontWeight: '600' },
  username: { fontSize: 15, fontWeight: '700', marginTop: -10 },
  inputLabel: { fontSize: 12, fontWeight: '600', marginTop: 2 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, fontSize: 15 },
  confirmRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 11, paddingVertical: 4 },
  checkbox: { width: 22, height: 22, borderWidth: 1.5, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  confirmText: { flex: 1, fontSize: 13, lineHeight: 19 },
  errorBox: { borderWidth: 1, borderRadius: 10, padding: 12 },
  errorText: { fontSize: 13, lineHeight: 18 },
  deleteButton: { minHeight: 50, borderRadius: 13, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, marginTop: 2 },
  deleteButtonText: { fontSize: 14, fontWeight: '800' },
  primaryButton: { borderRadius: 12, paddingHorizontal: 18, paddingVertical: 13, marginTop: 4 },
  primaryButtonText: { fontSize: 14, fontWeight: '700' },
});