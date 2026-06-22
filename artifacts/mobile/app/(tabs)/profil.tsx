import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimalCard } from '@/components/AnimalCard';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { ANIMALS } from '@/data/animals';
import { TOTEM_RESULTS } from '@/data/quiz';
import { useColors } from '@/hooks/useColors';
import { useTranslation, LANG_CODES, LANG_NAMES, type LangCode } from '@/i18n';

export default function ProfilScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { favorites, quizResult } = useApp();
  const { user, logout } = useAuth();
  const { t, lang, setLang } = useTranslation();
  const [showLogout, setShowLogout] = useState(false);

  const topPad = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;
  const favoriteAnimals = ANIMALS.filter((a) => favorites.includes(a.id));
  const totem = quizResult ? TOTEM_RESULTS[quizResult.primary] : null;

  if (!user) {
    return (
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ paddingBottom: 100 + insets.bottom }} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[colors.warmBrown, colors.deepBrown]} style={[styles.header, { paddingTop: topPad + 20 }]}>
          <Image source={require('@/assets/images/icon.png')} style={styles.headerLogo} />
          <Text style={[styles.headerLabel, { color: 'rgba(255,255,255,0.6)' }]}>{t.profile_sacred_label}</Text>
          <Text style={[styles.headerTitle, { color: colors.ivory }]}>{t.profile_explorer}</Text>
        </LinearGradient>
        <View style={{ padding: 24, gap: 16 }}>
          <Text style={[{ color: colors.mutedForeground, fontSize: 14, textAlign: 'center', lineHeight: 22 }]}>
            Connectez-vous pour accéder à votre profil, sauvegarder vos animaux favoris et retrouver votre totem.
          </Text>
          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.88 : 1 }]}
            onPress={() => router.push('/(auth)/login' as any)}
          >
            <LinearGradient colors={[colors.gold, colors.ochre]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.quizBtn}>
              <Text style={[styles.quizBtnText, { color: colors.deepBrown }]}>Se connecter</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={totem ? [totem.couleur + '80', colors.deepBrown] : [colors.warmBrown, colors.deepBrown]}
        style={[styles.header, { paddingTop: topPad + 20 }]}
      >
        <Image source={require('@/assets/images/icon.png')} style={styles.headerLogo} />
        <Text style={[styles.headerLabel, { color: 'rgba(255,255,255,0.6)' }]}>{t.profile_sacred_label}</Text>
        <Text style={[styles.headerTitle, { color: colors.ivory }]}>
          {totem ? `${t.profile_child_of_prefix} ${totem.nom}` : t.profile_explorer}
        </Text>
        {quizResult && (
          <View style={[styles.totemBadge, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
            <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: '600' as const }}>
              {t.profile_totem_badge} : {totem?.nom} · {TOTEM_RESULTS[quizResult.secondary].nom}
            </Text>
          </View>
        )}
      </LinearGradient>

      <View style={{ padding: 20, gap: 24 }}>
        <View style={styles.statsRow}>
          {[
            { value: String(favorites.length), label: t.profile_favorites },
            { value: quizResult ? '1' : '0', label: t.profile_quiz_completed },
            { value: String(ANIMALS.length), label: t.profile_animals_count },
          ].map((stat) => (
            <View key={stat.label} style={[styles.statItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.statValue, { color: colors.gold }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View>
          <Text style={[styles.sectionLabel, { color: colors.gold }]}>{t.profile_my_favorites}</Text>
          {favoriteAnimals.length === 0 ? (
            <View style={[styles.emptyFav, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.emptyFavIcon, { color: colors.mutedForeground }]}>◇</Text>
              <Text style={[styles.emptyFavText, { color: colors.mutedForeground }]}>{t.profile_no_fav}</Text>
              <Pressable onPress={() => router.push('/(tabs)/animaux' as any)}>
                <Text style={[styles.emptyFavCta, { color: colors.terracotta }]}>{t.profile_no_fav_cta}</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.favGrid}>
              {favoriteAnimals.map((animal) => (
                <View key={animal.id} style={styles.favCardWrap}>
                  <AnimalCard animal={animal} compact />
                </View>
              ))}
            </View>
          )}
        </View>

        {!quizResult && (
          <View style={[styles.quizPromo, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.quizPromoLabel, { color: colors.gold }]}>{t.profile_quiz_promo_label}</Text>
            <Text style={[styles.quizPromoTitle, { color: colors.ivory }]}>{t.profile_quiz_promo_title}</Text>
            <Text style={[styles.quizPromoDesc, { color: colors.mutedForeground }]}>{t.profile_quiz_promo_desc}</Text>
            <Pressable
              style={({ pressed }) => [{ opacity: pressed ? 0.88 : 1, marginTop: 8 }]}
              onPress={() => router.push('/(tabs)/quiz' as any)}
            >
              <LinearGradient colors={[colors.gold, colors.ochre]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.quizBtn}>
                <Text style={[styles.quizBtnText, { color: colors.deepBrown }]}>{t.profile_quiz_promo_btn}</Text>
              </LinearGradient>
            </Pressable>
          </View>
        )}

        <View style={[styles.infoSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.infoLabel, { color: colors.gold }]}>{t.profile_about}</Text>
          {[
            { title: t.profile_app_label, value: 'Les Animaux Sacrés' },
            { title: t.profile_version, value: '1.0.0' },
            { title: t.profile_language, value: LANG_NAMES[lang] },
            { title: t.profile_offline, value: t.profile_offline_value },
          ].map((item) => (
            <View key={item.title} style={[styles.infoRow, { borderTopColor: colors.border }]}>
              <Text style={[styles.infoTitle, { color: colors.mutedForeground }]}>{item.title}</Text>
              <Text style={[styles.infoValue, { color: colors.ivory }]}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.infoLabel, { color: colors.gold }]}>{t.profile_languages_label}</Text>
          <View style={styles.langRow}>
            {LANG_CODES.map((code) => {
              const isActive = lang === code;
              return (
                <Pressable
                  key={code}
                  onPress={() => setLang(code)}
                  style={({ pressed }) => [
                    styles.langChip,
                    {
                      backgroundColor: isActive ? colors.gold + '25' : colors.warmBrown,
                      borderColor: isActive ? colors.gold + '60' : colors.border,
                      opacity: pressed ? 0.75 : 1,
                    },
                  ]}
                >
                  <Text style={[styles.langText, { color: isActive ? colors.gold : colors.mutedForeground }]}>
                    {LANG_NAMES[code]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={[styles.infoSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.infoLabel, { color: colors.gold }]}>{t.auth_account_label}</Text>
          <View style={[styles.infoRow, { borderTopColor: colors.border }]}>
            <Text style={[styles.infoTitle, { color: colors.mutedForeground }]}>{t.auth_username}</Text>
            <Text style={[styles.infoValue, { color: colors.ivory }]}>{user?.username}</Text>
          </View>
        </View>

        <Pressable
          onPress={() => setShowLogout(true)}
          style={({ pressed }) => [styles.logoutBtn, { backgroundColor: colors.card, borderColor: '#ef444440', opacity: pressed ? 0.8 : 1 }]}
        >
          <Text style={[styles.logoutText, { color: '#f87171' }]}>{t.auth_logout}</Text>
        </Pressable>
      </View>

      <Modal visible={showLogout} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setShowLogout(false)}>
          <View style={[styles.modalCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.modalText, { color: colors.ivory }]}>{t.auth_logout_confirm}</Text>
            <View style={styles.modalBtns}>
              <Pressable
                onPress={() => setShowLogout(false)}
                style={[styles.modalBtn, { backgroundColor: colors.warmBrown, borderColor: colors.border }]}
              >
                <Text style={[styles.modalBtnText, { color: colors.mutedForeground }]}>{t.auth_logout_no}</Text>
              </Pressable>
              <Pressable
                onPress={async () => { setShowLogout(false); await logout(); }}
                style={[styles.modalBtn, { backgroundColor: '#7f1d1d', borderColor: '#ef4444' }]}
              >
                <Text style={[styles.modalBtnText, { color: '#fca5a5' }]}>{t.auth_logout_yes}</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 24, paddingBottom: 36, alignItems: 'flex-start' },
  headerLogo: { width: 60, height: 60, marginBottom: 12 },
  headerLabel: { fontSize: 10, fontWeight: '700' as const, letterSpacing: 2.5, marginBottom: 6 },
  headerTitle: { fontSize: 30, fontWeight: '800' as const, letterSpacing: 0.5 },
  totemBadge: { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginTop: 14 },
  statsRow: { flexDirection: 'row', gap: 12 },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 16, borderRadius: 14, borderWidth: 1 },
  statValue: { fontSize: 28, fontWeight: '800' as const },
  statLabel: { fontSize: 11, marginTop: 2, textAlign: 'center', fontWeight: '500' as const },
  sectionLabel: { fontSize: 10, fontWeight: '700' as const, letterSpacing: 2.5, marginBottom: 14 },
  emptyFav: { borderRadius: 16, padding: 24, borderWidth: 1, alignItems: 'center', gap: 10 },
  emptyFavIcon: { fontSize: 28 },
  emptyFavText: { fontSize: 14, textAlign: 'center', lineHeight: 20, fontWeight: '400' as const },
  emptyFavCta: { fontSize: 14, fontWeight: '600' as const },
  favGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4 },
  favCardWrap: { width: '50%' },
  quizPromo: { borderRadius: 16, padding: 20, borderWidth: 1, gap: 8 },
  quizPromoLabel: { fontSize: 10, fontWeight: '700' as const, letterSpacing: 2.5 },
  quizPromoTitle: { fontSize: 20, fontWeight: '700' as const },
  quizPromoDesc: { fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
  quizBtn: { padding: 16, borderRadius: 14, alignItems: 'center' },
  quizBtnText: { fontSize: 15, fontWeight: '700' as const },
  infoSection: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  infoLabel: { fontSize: 10, fontWeight: '700' as const, letterSpacing: 2.5, padding: 16, paddingBottom: 10 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 13, borderTopWidth: StyleSheet.hairlineWidth },
  infoTitle: { fontSize: 14, fontWeight: '400' as const },
  infoValue: { fontSize: 14, fontWeight: '600' as const },
  card: { borderRadius: 16, padding: 18, borderWidth: 1, gap: 12 },
  langRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  langChip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, borderWidth: 1 },
  langText: { fontSize: 13, fontWeight: '600' as const },
  logoutBtn: { borderRadius: 14, padding: 16, borderWidth: 1, alignItems: 'center' },
  logoutText: { fontSize: 15, fontWeight: '700' as const },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 32 },
  modalCard: { width: '100%', borderRadius: 20, padding: 24, borderWidth: 1, gap: 20 },
  modalText: { fontSize: 16, fontWeight: '600' as const, textAlign: 'center', lineHeight: 22 },
  modalBtns: { flexDirection: 'row', gap: 12 },
  modalBtn: { flex: 1, borderRadius: 12, padding: 14, borderWidth: 1, alignItems: 'center' },
  modalBtnText: { fontSize: 14, fontWeight: '700' as const },
});
