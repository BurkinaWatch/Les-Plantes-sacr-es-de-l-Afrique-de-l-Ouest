import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useApp } from '@/context/AppContext';
import { QUIZ_QUESTIONS, TOTEM_RESULTS, calculateTotem, type LikertValue, type QuizAnswers } from '@/data/quiz';
import { useColors } from '@/hooks/useColors';
import { useTranslation } from '@/i18n';

const DIM_ICONS: Record<string, string> = {
  E: '☀', O: '◎', C: '⬟', A: '◈', S: '∞',
};

const LIKERT_VALUES: LikertValue[] = [1, 2, 3, 4, 5];

type Screen = 'welcome' | 'charte' | 'quiz' | 'result';

export default function QuizScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { quizResult, setQuizResult, clearQuizResult } = useApp();
  const { t } = useTranslation();

  const [screen, setScreen] = useState<Screen>('welcome');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [result, setResult] = useState<ReturnType<typeof calculateTotem> | null>(null);
  const [selectedValue, setSelectedValue] = useState<LikertValue | null>(null);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const topPad = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;

  const DIMENSION_LABELS = {
    E: { label: t.dim_E_label, icon: DIM_ICONS.E, desc: t.dim_E_desc },
    O: { label: t.dim_O_label, icon: DIM_ICONS.O, desc: t.dim_O_desc },
    C: { label: t.dim_C_label, icon: DIM_ICONS.C, desc: t.dim_C_desc },
    A: { label: t.dim_A_label, icon: DIM_ICONS.A, desc: t.dim_A_desc },
    S: { label: t.dim_S_label, icon: DIM_ICONS.S, desc: t.dim_S_desc },
  };

  function handleAnswer(value: LikertValue) {
    if (selectedValue !== null) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedValue(value);

    const question = QUIZ_QUESTIONS[currentQ];
    const newAnswers: QuizAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      setSelectedValue(null);
      if (currentQ < QUIZ_QUESTIONS.length - 1) {
        Animated.sequence([
          Animated.timing(fadeAnim, { toValue: 0, duration: 160, useNativeDriver: true }),
          Animated.timing(fadeAnim, { toValue: 1, duration: 240, useNativeDriver: true }),
        ]).start();
        setTimeout(() => setCurrentQ((q) => q + 1), 160);
      } else {
        const calc = calculateTotem(newAnswers);
        setResult(calc);
        setQuizResult({
          primary: calc.primary,
          secondary: calc.secondary,
          completedAt: new Date().toISOString(),
        });
        setTimeout(() => setScreen('result'), 300);
      }
    }, 380);
  }

  function handleRestart() {
    setScreen('welcome');
    setCurrentQ(0);
    setAnswers({});
    setResult(null);
    setSelectedValue(null);
    clearQuizResult();
  }

  // ── ÉCRAN D'ACCUEIL ──────────────────────────────────────────
  if (screen === 'welcome') {
    return (
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 110 + insets.bottom }}
      >
        <LinearGradient colors={[colors.deepBrown, '#1A0E08']} style={[styles.startHero, { paddingTop: topPad + 32 }]}>
          <View style={styles.startDecor}>
            <View style={[styles.sdRing1, { borderColor: colors.gold + '20' }]} />
            <View style={[styles.sdRing2, { borderColor: colors.gold + '10' }]} />
          </View>
          <Text style={[styles.startLabel, { color: colors.gold }]}>{t.quiz_revelation_label}</Text>
          <Text style={[styles.startTitle, { color: colors.ivory }]}>{t.quiz_title_line1}</Text>
          <Text style={[styles.startTitleAccent, { color: colors.gold }]}>{t.quiz_title_line2}</Text>
          <Text style={[styles.startSubtitle, { color: colors.mutedForeground }]}>{t.quiz_subtitle}</Text>
        </LinearGradient>

        <View style={{ padding: 24, gap: 16 }}>
          {[
            { icon: '◈', title: t.quiz_feat1_title, desc: t.quiz_feat1_desc },
            { icon: '◇', title: t.quiz_feat2_title, desc: t.quiz_feat2_desc },
            { icon: '◉', title: t.quiz_feat3_title, desc: t.quiz_feat3_desc },
          ].map((item) => (
            <View key={item.title} style={[styles.featureItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.featureIcon, { color: colors.gold }]}>{item.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.featureTitle, { color: colors.ivory }]}>{item.title}</Text>
                <Text style={[styles.featureDesc, { color: colors.mutedForeground }]}>{item.desc}</Text>
              </View>
            </View>
          ))}

          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.88 : 1, marginTop: 8 }]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setScreen('charte');
            }}
          >
            <LinearGradient colors={[colors.gold, colors.ochre]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.startBtn}>
              <Text style={[styles.startBtnText, { color: colors.deepBrown }]}>{t.quiz_start}</Text>
            </LinearGradient>
          </Pressable>

          {quizResult && (
            <Pressable onPress={() => router.push('/(tabs)/ma-plante' as any)}>
              <Text style={[styles.previousResult, { color: colors.terracotta }]}>{t.quiz_prev_result}</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    );
  }

  // ── CHARTE DE TRANSPARENCE ───────────────────────────────────
  if (screen === 'charte') {
    return (
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
      >
        <LinearGradient
          colors={[colors.deepBrown, '#1A0E08']}
          style={[styles.charteHero, { paddingTop: topPad + 24 }]}
        >
          <Text style={[styles.charteIcon, { color: colors.gold }]}>◎</Text>
          <Text style={[styles.charteTitle, { color: colors.ivory }]}>{t.quiz_charte_title}</Text>
          <Text style={[styles.charteSubtitle, { color: colors.mutedForeground }]}>{t.quiz_charte_subtitle}</Text>
        </LinearGradient>

        <View style={{ padding: 20, gap: 16 }}>
          <View style={[styles.charteCard, { backgroundColor: colors.card, borderColor: colors.gold + '40' }]}>
            <Text style={[styles.charteCardTitle, { color: colors.gold }]}>{t.quiz_charte_theory_label}</Text>
            <Text style={[styles.charteCardText, { color: colors.ivory }]}>{t.quiz_charte_theory_text}</Text>
          </View>

          <View style={[styles.charteCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.charteCardTitle, { color: colors.gold }]}>{t.quiz_charte_dimensions_label}</Text>
            {(['E', 'O', 'C', 'A', 'S'] as const).map((d) => {
              const dim = DIMENSION_LABELS[d];
              return (
                <View key={d} style={styles.dimRow}>
                  <View style={[styles.dimBadge, { backgroundColor: colors.gold + '20', borderColor: colors.gold + '40' }]}>
                    <Text style={[styles.dimBadgeText, { color: colors.gold }]}>{d}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.dimLabel, { color: colors.ivory }]}>{dim.label}</Text>
                    <Text style={[styles.dimDesc, { color: colors.mutedForeground }]}>{dim.desc}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={[styles.charteCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.charteCardTitle, { color: colors.gold }]}>{t.quiz_charte_cultural_label}</Text>
            {t.quiz_charte_cultural_items.map((ref, i) => (
              <View key={i} style={styles.refRow}>
                <Text style={[styles.refDot, { color: colors.gold }]}>◦</Text>
                <Text style={[styles.refText, { color: colors.mutedForeground }]}>{ref}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.charteCard, { backgroundColor: colors.terracotta + '12', borderColor: colors.terracotta + '40' }]}>
            <Text style={[styles.charteCardTitle, { color: colors.terracotta }]}>{t.quiz_charte_limits_label}</Text>
            {t.quiz_charte_limits_items.map((limit, i) => (
              <View key={i} style={styles.refRow}>
                <Text style={[styles.refDot, { color: colors.terracotta }]}>!</Text>
                <Text style={[styles.refText, { color: colors.ivory }]}>{limit}</Text>
              </View>
            ))}
          </View>

          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.88 : 1, marginTop: 4 }]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setScreen('quiz');
            }}
          >
            <LinearGradient colors={[colors.gold, colors.ochre]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.startBtn}>
              <Text style={[styles.startBtnText, { color: colors.deepBrown }]}>{t.quiz_charte_cta}</Text>
            </LinearGradient>
          </Pressable>

          <Pressable onPress={() => setScreen('welcome')} style={styles.restartBtn}>
            <Text style={[styles.restartText, { color: colors.mutedForeground }]}>{t.quiz_back}</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  // ── RÉSULTATS ────────────────────────────────────────────────
  if (screen === 'result' && result) {
    const totem = TOTEM_RESULTS[result.primary];
    const secondary = TOTEM_RESULTS[result.secondary];

    return (
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
      >
        <LinearGradient
          colors={[totem.couleur, colors.deepBrown]}
          style={[styles.resultHero, { paddingTop: topPad + 24 }]}
        >
          <Text style={[styles.resultLabel, { color: 'rgba(255,255,255,0.7)' }]}>{t.quiz_result_sacred_label}</Text>
          <Text style={[styles.resultAnimalNom, { color: '#FFFFFF' }]}>{totem.nom}</Text>
          <View style={[styles.resultSecondaryBadge, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: '500' as const }}>
              {t.quiz_result_secondary_prefix} {secondary.nom}
            </Text>
          </View>
        </LinearGradient>

        <View style={{ padding: 20, gap: 20 }}>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.cardLabel, { color: colors.gold }]}>{t.quiz_result_profile_title}</Text>
            {(['E', 'O', 'C', 'A', 'S'] as const).map((d) => {
              const pct = result.dimensionScores[d] ?? 0;
              const dim = DIMENSION_LABELS[d];
              return (
                <View key={d} style={{ gap: 4 }}>
                  <View style={styles.dimBarRow}>
                    <Text style={[styles.dimBarLabel, { color: colors.ivory }]}>{dim.label}</Text>
                    <Text style={[styles.dimBarPct, { color: colors.mutedForeground }]}>{pct}%</Text>
                  </View>
                  <View style={[styles.dimBarTrack, { backgroundColor: colors.warmBrown }]}>
                    <View style={[styles.dimBarFill, { width: `${pct}%` as any, backgroundColor: totem.couleur }]} />
                  </View>
                </View>
              );
            })}
            <Text style={[styles.dimNote, { color: colors.mutedForeground }]}>{t.quiz_result_profile_note}</Text>
          </View>

          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.cardLabel, { color: colors.gold }]}>{t.quiz_result_revelation_label}</Text>
            <Text style={[styles.cardText, { color: colors.ivory }]}>{totem.description}</Text>
          </View>

          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.cardLabel, { color: colors.gold }]}>{t.quiz_result_forces_label}</Text>
            {totem.forces.map((f) => (
              <View key={f} style={styles.listItem}>
                <View style={[styles.listDot, { backgroundColor: totem.couleur }]} />
                <Text style={[styles.listText, { color: colors.ivory }]}>{f}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.cardLabel, { color: colors.gold }]}>{t.quiz_result_defis_label}</Text>
            {totem.defis.map((d) => (
              <View key={d} style={styles.listItem}>
                <View style={[styles.listDot, { backgroundColor: colors.terracotta }]} />
                <Text style={[styles.listText, { color: colors.ivory }]}>{d}</Text>
              </View>
            ))}
          </View>

          <LinearGradient colors={[totem.couleur + '40', colors.card]} style={[styles.mantraCard, { borderColor: totem.couleur + '60' }]}>
            <Text style={[styles.mantraLabel, { color: totem.couleur }]}>{t.quiz_result_mantra_label}</Text>
            <Text style={[styles.mantraText, { color: colors.ivory }]}>"{totem.mantra}"</Text>
          </LinearGradient>

          <View style={[styles.card, { backgroundColor: secondary.couleur + '15', borderColor: secondary.couleur + '40' }]}>
            <Text style={[styles.cardLabel, { color: secondary.couleur }]}>{t.quiz_result_secondary_label} — {secondary.nom.toUpperCase()}</Text>
            <Text style={[styles.cardText, { color: colors.ivory }]}>{t.quiz_result_secondary_desc}</Text>
          </View>

          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.88 : 1 }]}
            onPress={() => router.push('/(tabs)/ma-plante' as any)}
          >
            <LinearGradient colors={[colors.gold, colors.ochre]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.startBtn}>
              <Text style={[styles.startBtnText, { color: colors.deepBrown }]}>{t.quiz_result_see_full}</Text>
            </LinearGradient>
          </Pressable>

          <Pressable onPress={handleRestart} style={styles.restartBtn}>
            <Text style={[styles.restartText, { color: colors.mutedForeground }]}>{t.quiz_restart}</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  // ── QUESTIONS (LIKERT) ───────────────────────────────────────
  const question = QUIZ_QUESTIONS[currentQ];
  const translatedQ = t.quiz_questions[currentQ];
  const progress = (currentQ / QUIZ_QUESTIONS.length) * 100;
  const dimInfo = DIMENSION_LABELS[question.dimension as keyof typeof DIMENSION_LABELS];
  const statementText = translatedQ?.q ?? question.statement;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* ── EN-TÊTE ─────────────────────────────── */}
      <View style={[styles.quizHeader, { paddingTop: topPad + 16, paddingHorizontal: 20, borderBottomColor: colors.border }]}>
        <View style={styles.quizHeaderRow}>
          <Text style={[styles.quizCounter, { color: colors.mutedForeground }]}>
            {currentQ + 1} / {QUIZ_QUESTIONS.length}
          </Text>
          <View style={[styles.dimPill, { backgroundColor: colors.gold + '20', borderColor: colors.gold + '30' }]}>
            <Text style={[styles.dimPillText, { color: colors.gold }]}>{dimInfo.icon} {dimInfo.label}</Text>
          </View>
        </View>
        <View style={[styles.progressTrack, { backgroundColor: colors.card }]}>
          <View style={[styles.progressFill, { width: `${progress}%` as any, backgroundColor: colors.gold }]} />
        </View>
      </View>

      {/* ── AFFIRMATION ──────────────────────────── */}
      <Animated.View style={[styles.questionContainer, { opacity: fadeAnim, paddingHorizontal: 24 }]}>
        <Text style={[styles.instructionText, { color: colors.mutedForeground }]}>
          {t.quiz_likert_instruction}
        </Text>
        <Text style={[styles.questionText, { color: colors.ivory }]}>{statementText}</Text>
      </Animated.View>

      {/* ── ÉCHELLE DE LIKERT ────────────────────── */}
      <View style={[styles.likertSection, { paddingHorizontal: 20, paddingBottom: 90 + insets.bottom }]}>
        <View style={styles.likertRow}>
          {LIKERT_VALUES.map((val) => {
            const isSelected = selectedValue === val;
            const isNear = selectedValue !== null && Math.abs(val - (selectedValue ?? 0)) <= 0;
            return (
              <Pressable
                key={val}
                onPress={() => handleAnswer(val)}
                disabled={selectedValue !== null}
                style={({ pressed }) => [
                  styles.likertCircle,
                  {
                    backgroundColor: isSelected
                      ? colors.gold
                      : pressed
                      ? colors.gold + '30'
                      : colors.card,
                    borderColor: isSelected
                      ? colors.gold
                      : pressed
                      ? colors.gold + '80'
                      : colors.border,
                    transform: [{ scale: isSelected ? 1.12 : 1 }],
                  },
                ]}
              >
                <Text
                  style={[
                    styles.likertCircleText,
                    { color: isSelected ? colors.deepBrown : colors.ivory },
                  ]}
                >
                  {val}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* ── LABELS EXTRÉMITÉS ─────────────────── */}
        <View style={styles.likertLabels}>
          <Text style={[styles.likertEndLabel, { color: colors.mutedForeground }]}>{t.quiz_likert_low}</Text>
          <Text style={[styles.likertEndLabel, { color: colors.mutedForeground, textAlign: 'right' }]}>{t.quiz_likert_high}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  startHero: { paddingHorizontal: 28, paddingBottom: 48, overflow: 'hidden', position: 'relative' },
  startDecor: { ...StyleSheet.absoluteFillObject },
  sdRing1: { position: 'absolute', right: -60, top: 20, width: 220, height: 220, borderRadius: 110, borderWidth: 1 },
  sdRing2: { position: 'absolute', right: -40, top: 0, width: 300, height: 300, borderRadius: 150, borderWidth: 1 },
  startLabel: { fontSize: 11, fontWeight: '700' as const, letterSpacing: 2.5, marginBottom: 12 },
  startTitle: { fontSize: 40, fontWeight: '800' as const, letterSpacing: 1 },
  startTitleAccent: { fontSize: 40, fontWeight: '800' as const, letterSpacing: 1, marginTop: -4 },
  startSubtitle: { fontSize: 14, lineHeight: 21, marginTop: 16, fontWeight: '400' as const },

  featureItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 14, borderWidth: 1, gap: 14 },
  featureIcon: { fontSize: 22 },
  featureTitle: { fontSize: 15, fontWeight: '700' as const },
  featureDesc: { fontSize: 13, marginTop: 2 },

  startBtn: { padding: 18, borderRadius: 16, alignItems: 'center' },
  startBtnText: { fontSize: 16, fontWeight: '700' as const, letterSpacing: 0.5 },
  previousResult: { textAlign: 'center', fontSize: 14, fontWeight: '500' as const, paddingVertical: 8 },

  charteHero: { paddingHorizontal: 28, paddingBottom: 40 },
  charteIcon: { fontSize: 36, marginBottom: 12 },
  charteTitle: { fontSize: 36, fontWeight: '800' as const, lineHeight: 42 },
  charteSubtitle: { fontSize: 15, lineHeight: 22, marginTop: 12, fontWeight: '400' as const },
  charteCard: { borderRadius: 16, padding: 18, borderWidth: 1, gap: 12 },
  charteCardTitle: { fontSize: 10, fontWeight: '700' as const, letterSpacing: 2.5 },
  charteCardText: { fontSize: 14, lineHeight: 22, fontWeight: '400' as const },
  dimRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 4 },
  dimBadge: { width: 28, height: 28, borderRadius: 7, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  dimBadgeText: { fontSize: 12, fontWeight: '800' as const },
  dimLabel: { fontSize: 14, fontWeight: '700' as const },
  dimDesc: { fontSize: 12, marginTop: 1 },
  refRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', paddingVertical: 3 },
  refDot: { fontSize: 14, fontWeight: '700' as const, width: 16 },
  refText: { flex: 1, fontSize: 13, lineHeight: 20 },

  resultHero: { padding: 28, paddingBottom: 40 },
  resultLabel: { fontSize: 11, fontWeight: '700' as const, letterSpacing: 2.5, marginBottom: 8 },
  resultAnimalNom: { fontSize: 52, fontWeight: '800' as const, letterSpacing: 1 },
  resultSecondaryBadge: { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginTop: 16 },

  card: { borderRadius: 16, padding: 18, borderWidth: 1, gap: 10 },
  cardLabel: { fontSize: 11, fontWeight: '700' as const, letterSpacing: 2 },
  cardText: { fontSize: 15, lineHeight: 24, fontWeight: '400' as const },

  dimBarRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dimBarLabel: { fontSize: 13, fontWeight: '600' as const },
  dimBarPct: { fontSize: 12, fontWeight: '500' as const },
  dimBarTrack: { height: 6, borderRadius: 3, overflow: 'hidden' },
  dimBarFill: { height: '100%', borderRadius: 3 },
  dimNote: { fontSize: 11, fontStyle: 'italic', marginTop: 4 },

  listItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 4 },
  listDot: { width: 7, height: 7, borderRadius: 3.5 },
  listText: { fontSize: 14, flex: 1, fontWeight: '400' as const, lineHeight: 20 },

  mantraCard: { borderRadius: 16, padding: 20, borderWidth: 1, alignItems: 'center' },
  mantraLabel: { fontSize: 11, fontWeight: '700' as const, letterSpacing: 2, marginBottom: 10 },
  mantraText: { fontSize: 16, fontStyle: 'italic', textAlign: 'center', lineHeight: 24, fontWeight: '500' as const },

  restartBtn: { alignItems: 'center', paddingVertical: 8 },
  restartText: { fontSize: 14, fontWeight: '500' as const },

  quizHeader: { paddingBottom: 20, borderBottomWidth: StyleSheet.hairlineWidth },
  quizHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  quizCounter: { fontSize: 13, fontWeight: '500' as const, letterSpacing: 0.5 },
  dimPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1 },
  dimPillText: { fontSize: 11, fontWeight: '700' as const, letterSpacing: 0.5 },
  progressTrack: { height: 4, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },

  questionContainer: { flex: 1, justifyContent: 'center', gap: 16, paddingVertical: 24 },
  instructionText: { fontSize: 12, fontWeight: '500' as const, letterSpacing: 0.5, textTransform: 'uppercase' },
  questionText: { fontSize: 22, fontWeight: '700' as const, lineHeight: 32, letterSpacing: 0.2 },

  likertSection: { justifyContent: 'flex-end', gap: 14 },
  likertRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  likertCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likertCircleText: { fontSize: 17, fontWeight: '700' as const },
  likertLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  likertEndLabel: { fontSize: 11, fontWeight: '500' as const, flex: 1 },
});
