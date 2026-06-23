import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useApp } from '@/context/AppContext';
import { TOTEM_RESULTS } from '@/data/quiz';
import { getPlanteById } from '@/data/animals';
import { useColors } from '@/hooks/useColors';
import { useTranslation } from '@/i18n';

export default function MaPlanteScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { quizResult } = useApp();
  const { t, lang } = useTranslation();

  const topPad = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;

  if (!quizResult) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <LinearGradient colors={[colors.deepBrown, colors.background]} style={styles.emptyBg} />
        <ScrollView
          contentContainerStyle={[styles.emptyScroll, { paddingTop: topPad + 40, paddingBottom: 100 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.emptyContent}>
            <Text style={[styles.emptySymbol, { color: colors.gold }]}>◎</Text>
            <Text style={[styles.emptyTitle, { color: colors.ivory }]}>{t.my_animal_empty_title1}</Text>
            <Text style={[styles.emptyTitle2, { color: colors.ivory }]}>{t.my_animal_empty_title2}</Text>
            <Text style={[styles.emptyDesc, { color: colors.mutedForeground }]}>{t.my_animal_empty_desc}</Text>
            <Pressable
              style={({ pressed }) => [{ opacity: pressed ? 0.88 : 1, width: '100%' }]}
              onPress={() => router.push('/(tabs)/quiz' as any)}
            >
              <LinearGradient colors={[colors.gold, colors.ochre]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaBtn}>
                <Text style={[styles.ctaBtnText, { color: colors.deepBrown }]}>{t.my_animal_empty_cta}</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    );
  }

  const primaryTotem = TOTEM_RESULTS[quizResult.primary];
  const secondaryTotem = TOTEM_RESULTS[quizResult.secondary];
  const primaryPlante = getPlanteById(quizResult.primary);

  const locale = lang === 'en' ? 'en-GB' : lang === 'fr' ? 'fr-FR' : 'fr-FR';
  const completedDate = new Date(quizResult.completedAt).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={[primaryTotem.couleur, primaryTotem.couleur + '80', colors.deepBrown]}
        style={[styles.hero, { paddingTop: topPad + 20 }]}
      >
        <View style={styles.heroDecor}>
          <View style={[styles.hr1, { borderColor: 'rgba(255,255,255,0.12)' }]} />
          <View style={[styles.hr2, { borderColor: 'rgba(255,255,255,0.07)' }]} />
        </View>
        <Text style={[styles.heroLabel, { color: 'rgba(255,255,255,0.7)' }]}>{t.my_animal_totem_label}</Text>
        <Text style={[styles.heroNom, { color: '#FFFFFF' }]}>{primaryTotem.nom}</Text>
        <Text style={[styles.heroDate, { color: 'rgba(255,255,255,0.5)' }]}>{t.my_animal_revealed_prefix} {completedDate}</Text>
      </LinearGradient>

      <View style={{ padding: 20, gap: 18 }}>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardLabel, { color: colors.gold }]}>{t.my_animal_soul_label}</Text>
          <Text style={[styles.cardText, { color: colors.ivory }]}>{primaryTotem.description}</Text>
        </View>

        <View style={styles.row}>
          <View style={[styles.halfCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.cardLabel, { color: colors.gold }]}>{t.my_animal_primary}</Text>
            <View style={[styles.planteBadge, { backgroundColor: primaryTotem.couleur + '30', borderColor: primaryTotem.couleur + '60' }]}>
              <Text style={[styles.planteBadgeText, { color: '#FFFFFF' }]}>{primaryTotem.nom}</Text>
            </View>
            <Text style={[styles.halfDesc, { color: colors.mutedForeground }]}>{t.my_animal_primary_desc}</Text>
          </View>
          <View style={[styles.halfCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.cardLabel, { color: colors.gold }]}>{t.my_animal_secondary}</Text>
            <View style={[styles.planteBadge, { backgroundColor: secondaryTotem.couleur + '30', borderColor: secondaryTotem.couleur + '60' }]}>
              <Text style={[styles.planteBadgeText, { color: '#FFFFFF' }]}>{secondaryTotem.nom}</Text>
            </View>
            <Text style={[styles.halfDesc, { color: colors.mutedForeground }]}>{t.my_animal_secondary_desc}</Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardLabel, { color: colors.gold }]}>{t.my_animal_qualities}</Text>
          <View style={styles.qualitesGrid}>
            {primaryTotem.forces.map((f) => (
              <View key={f} style={[styles.qualiteChip, { backgroundColor: primaryTotem.couleur + '25', borderColor: primaryTotem.couleur + '50' }]}>
                <Text style={[styles.qualiteText, { color: colors.ivory }]}>{f}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardLabel, { color: colors.terracotta }]}>{t.my_animal_challenges}</Text>
          {primaryTotem.defis.map((d) => (
            <View key={d} style={styles.listItem}>
              <View style={[styles.listDot, { backgroundColor: colors.terracotta }]} />
              <Text style={[styles.listText, { color: colors.ivory }]}>{d}</Text>
            </View>
          ))}
        </View>

        <LinearGradient
          colors={[primaryTotem.couleur + '50', colors.card]}
          style={[styles.mantraCard, { borderColor: primaryTotem.couleur + '60' }]}
        >
          <Text style={[styles.mantraLabel, { color: primaryTotem.couleur }]}>{t.my_animal_daily_mantra}</Text>
          <Text style={[styles.mantraText, { color: colors.ivory }]}>"{primaryTotem.mantra}"</Text>
        </LinearGradient>

        {primaryPlante && (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.cardLabel, { color: colors.gold }]}>{t.my_animal_daily_teaching}</Text>
            <Text style={[styles.cardText, { color: colors.ivory }]}>{primaryPlante.enseignementDuJour}</Text>
          </View>
        )}

        <View style={{ gap: 12 }}>
          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.88 : 1 }]}
            onPress={() => router.push('/chat-totem' as any)}
          >
            <LinearGradient
              colors={[primaryTotem.couleur, primaryTotem.couleur + 'CC']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.chatBtn}
            >
              <Feather name="message-circle" size={20} color="#FFF" />
              <Text style={styles.chatBtnText}>Parler à ma plante {primaryTotem.nom}</Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.progressionBtn, { borderColor: primaryTotem.couleur + '60', opacity: pressed ? 0.85 : 1 }]}
            onPress={() => router.push('/progression-spirituelle' as any)}
          >
            <Feather name="trending-up" size={16} color={primaryTotem.couleur} />
            <Text style={[styles.progressionBtnText, { color: primaryTotem.couleur }]}>
              Ma progression spirituelle
            </Text>
            <Feather name="chevron-right" size={14} color={primaryTotem.couleur + '80'} />
          </Pressable>

          {primaryPlante && (
            <Pressable
              style={({ pressed }) => [{ opacity: pressed ? 0.88 : 1 }]}
              onPress={() => router.push(`/animal/${primaryPlante.id}` as any)}
            >
              <LinearGradient colors={[colors.gold, colors.ochre]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaBtn}>
                <Text style={[styles.ctaBtnText, { color: colors.deepBrown }]}>{t.my_animal_explore_prefix} {primaryTotem.nom}</Text>
              </LinearGradient>
            </Pressable>
          )}
          <Pressable
            onPress={() => router.push('/(tabs)/quiz' as any)}
            style={[styles.retakeBtn, { borderColor: colors.border }]}
          >
            <Text style={[styles.retakeText, { color: colors.mutedForeground }]}>{t.my_animal_retake}</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyBg: { ...StyleSheet.absoluteFillObject },
  emptyScroll: { flexGrow: 1, justifyContent: 'center' },
  emptyContent: { padding: 32, alignItems: 'center', gap: 12, width: '100%' },
  emptySymbol: { fontSize: 52, marginBottom: 8 },
  emptyTitle: { fontSize: 32, fontWeight: '800' as const, letterSpacing: 0.5 },
  emptyTitle2: { fontSize: 32, fontWeight: '800' as const, letterSpacing: 0.5, marginTop: -12 },
  emptyDesc: { fontSize: 15, lineHeight: 24, textAlign: 'center', fontWeight: '400' as const, marginTop: 8 },
  ctaBtn: { padding: 18, borderRadius: 16, alignItems: 'center' },
  ctaBtnText: { fontSize: 16, fontWeight: '700' as const, letterSpacing: 0.5 },
  hero: { padding: 24, paddingBottom: 40, overflow: 'hidden', position: 'relative' },
  heroDecor: { ...StyleSheet.absoluteFillObject },
  hr1: { position: 'absolute', right: -40, top: -40, width: 250, height: 250, borderRadius: 125, borderWidth: 1 },
  hr2: { position: 'absolute', right: -20, top: -20, width: 320, height: 320, borderRadius: 160, borderWidth: 1 },
  heroLabel: { fontSize: 11, fontWeight: '700' as const, letterSpacing: 2.5, marginBottom: 8 },
  heroNom: { fontSize: 52, fontWeight: '800' as const, letterSpacing: 1 },
  heroDate: { fontSize: 13, marginTop: 10, fontWeight: '400' as const },
  card: { borderRadius: 16, padding: 18, borderWidth: 1, gap: 12 },
  cardLabel: { fontSize: 10, fontWeight: '700' as const, letterSpacing: 2.5 },
  cardText: { fontSize: 15, lineHeight: 24, fontWeight: '400' as const },
  row: { flexDirection: 'row', gap: 12 },
  halfCard: { flex: 1, borderRadius: 16, padding: 16, borderWidth: 1, gap: 10 },
  planteBadge: { borderRadius: 10, padding: 10, alignItems: 'center', borderWidth: 1 },
  planteBadgeText: { fontSize: 16, fontWeight: '700' as const },
  halfDesc: { fontSize: 12, textAlign: 'center' },
  qualitesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  qualiteChip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, borderWidth: 1 },
  qualiteText: { fontSize: 13, fontWeight: '600' as const },
  listItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 4 },
  listDot: { width: 7, height: 7, borderRadius: 3.5 },
  listText: { flex: 1, fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
  mantraCard: { borderRadius: 16, padding: 20, borderWidth: 1, alignItems: 'center', gap: 10 },
  mantraLabel: { fontSize: 10, fontWeight: '700' as const, letterSpacing: 2.5 },
  mantraText: { fontSize: 16, fontStyle: 'italic', textAlign: 'center', lineHeight: 26, fontWeight: '500' as const },
  chatBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 18, borderRadius: 16 },
  chatBtnText: { fontSize: 16, fontWeight: '700' as const, color: '#FFF' },
  progressionBtn: {
    flexDirection: 'row' as const, alignItems: 'center' as const, gap: 10,
    padding: 14, borderRadius: 14, borderWidth: 1,
    justifyContent: 'center' as const,
  },
  progressionBtnText: { fontSize: 14, fontWeight: '600' as const, flex: 1, textAlign: 'center' as const },
  retakeBtn: { alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1 },
  retakeText: { fontSize: 14, fontWeight: '500' as const },
});
