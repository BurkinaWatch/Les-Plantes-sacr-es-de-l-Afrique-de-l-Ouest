import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import { useApp } from '@/context/AppContext';
import { TOTEM_RESULTS } from '@/data/quiz';
import { getPlanteById } from '@/data/animals';
import { useColors } from '@/hooks/useColors';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatSession {
  id: string;
  startedAt: number;
  messages: Message[];
  preview: string;
}

const DIMENSION_META: Record<string, { label: string; desc: string; icon: string }> = {
  E: { label: 'Leadership', desc: 'Énergie sociale & influence', icon: '◈' },
  O: { label: 'Intuition', desc: 'Ouverture spirituelle', icon: '◎' },
  C: { label: 'Endurance', desc: 'Discipline & persévérance', icon: '◆' },
  A: { label: 'Communauté', desc: 'Soutien & ancêtres', icon: '◇' },
  S: { label: 'Transformation', desc: 'Stabilité en crise', icon: '△' },
};

const SPIRITUAL_KEYWORDS: Record<string, string[]> = {
  Sagesse:       ['sagesse', 'sage', 'savoir', 'connaissance'],
  Force:         ['force', 'puissance', 'fort', 'robuste'],
  Lumière:       ['lumière', 'clarté', 'illumine', 'éclaire'],
  Ancêtres:      ['ancêtres', 'ancêtral', 'lignée', 'mémoire'],
  Nature:        ['nature', 'naturel', 'terre', 'racines', 'enraciné'],
  Transformation:['transformation', 'transforme', 'métamorphose', 'évolue'],
  Protection:    ['protection', 'protège', 'protecteur', 'garde'],
  Équilibre:     ['équilibre', 'harmonie', 'équilibré', 'centré'],
  Communauté:    ['communauté', 'partage', 'lien', 'peuple', 'ensemble'],
  Chemin:        ['chemin', 'voie', 'route', 'direction', 'guide'],
  Paix:          ['paix', 'sérénité', 'calme', 'tranquille'],
  Croissance:    ['croissance', 'grandir', 'évolue', 'développe', 'fleurit'],
  Courage:       ['courage', 'audace', 'bravoure', 'ose'],
  Esprit:        ['esprit', 'âme', 'spirituel', 'sacré', 'invisible'],
  Abondance:     ['abondance', 'richesse', 'prospère', 'fécondité'],
};

function extractKeywords(sessions: ChatSession[]): Array<{ word: string; count: number }> {
  const counts: Record<string, number> = {};
  const allText = sessions
    .flatMap((s) => s.messages.filter((m) => m.role === 'assistant').map((m) => m.content))
    .join(' ')
    .toLowerCase();

  for (const [theme, variants] of Object.entries(SPIRITUAL_KEYWORDS)) {
    let total = 0;
    for (const v of variants) {
      const re = new RegExp(v, 'gi');
      total += (allText.match(re) || []).length;
    }
    if (total > 0) counts[theme] = total;
  }

  return Object.entries(counts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

function formatDateShort(ts: number) {
  const d = new Date(ts);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

function formatDateFull(ts: number) {
  const d = new Date(ts);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

const KENTE_STRIP = ['#D4A017', '#C4622D', '#5C7A3E', '#CC7722', '#8B6914', '#D4A017'];

function KenteStrip() {
  return (
    <View style={{ flexDirection: 'row', height: 4 }}>
      {KENTE_STRIP.map((c, i) => (
        <View key={i} style={{ flex: 1, backgroundColor: c }} />
      ))}
    </View>
  );
}

export default function ProgressionSpirituelleScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { quizResult } = useApp();
  const topPad = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;

  const totem = quizResult ? TOTEM_RESULTS[quizResult.primary] : null;
  const plante = quizResult ? getPlanteById(quizResult.primary) : null;
  const totemColor = totem?.couleur ?? colors.gold;

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!plante) { setLoading(false); return; }
    const key = `@chat_sessions_${plante.id}`;
    AsyncStorage.getItem(key).then((raw) => {
      const data: ChatSession[] = raw ? JSON.parse(raw) : [];
      setSessions(data.sort((a, b) => a.startedAt - b.startedAt));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [plante?.id]);

  const stats = useMemo(() => {
    if (!sessions.length) return null;
    const totalMessages = sessions.reduce((acc, s) => acc + s.messages.length, 0);
    const userMessages = sessions.reduce(
      (acc, s) => acc + s.messages.filter((m) => m.role === 'user').length, 0
    );
    const avgLength = sessions.length ? Math.round(totalMessages / sessions.length) : 0;
    const lastSession = sessions[sessions.length - 1];
    const firstSession = sessions[0];
    return { totalMessages, userMessages, avgLength, lastSession, firstSession };
  }, [sessions]);

  const keywords = useMemo(() => extractKeywords(sessions), [sessions]);

  const maxMessages = useMemo(
    () => Math.max(...sessions.map((s) => s.messages.length), 1),
    [sessions]
  );

  const dimScores = quizResult?.dimensionScores ?? { E: 0, O: 0, C: 0, A: 0, S: 0 };
  const dims = Object.entries(DIMENSION_META) as Array<[string, typeof DIMENSION_META[string]]>;

  if (!quizResult || !totem || !plante) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.emptyWrap, { paddingTop: topPad + 24 }]}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={20} color={colors.gold} />
          </Pressable>
          <Text style={[styles.emptyTitle, { color: colors.ivory }]}>✦ Totem non révélé</Text>
          <Text style={[styles.emptyDesc, { color: colors.mutedForeground }]}>
            Complète le quiz sacré pour débloquer ta progression spirituelle.
          </Text>
          <Pressable onPress={() => router.push('/(tabs)/quiz' as any)}>
            <LinearGradient colors={[colors.gold, colors.ochre]} style={styles.emptyBtn}>
              <Text style={[styles.emptyBtnText, { color: colors.deepBrown }]}>Révéler mon totem</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* ── HEADER ── */}
      <LinearGradient
        colors={[colors.deepBrown, colors.warmBrown]}
        style={[styles.header, { paddingTop: topPad + 6 }]}
      >
        <KenteStrip />
        <View style={styles.headerRow}>
          <Pressable
            style={({ pressed }) => [styles.iconBtn, { borderColor: totemColor + '60', opacity: pressed ? 0.7 : 1 }]}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={18} color={totemColor} />
          </Pressable>
          <View style={styles.headerCenter}>
            <Text style={[styles.headerSup, { color: totemColor + '90' }]}>✦ PROGRESSION SPIRITUELLE ✦</Text>
            <Text style={[styles.headerName, { color: colors.ivory }]}>{totem.nom}</Text>
            <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>
              {plante.element} · Niveau {plante.niveauSpirituel}/5
            </Text>
          </View>
          <View style={[styles.iconBtn, { borderColor: 'transparent' }]} />
        </View>
        <View style={[styles.adinkraRow]}>
          {['◆', '▲', '◇', '△', '●', '○', '✦', '✧'].map((s, i) => (
            <Text key={i} style={[styles.adinkraChar, { color: totemColor + '60' }]}>{s}</Text>
          ))}
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 40 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── STATS CARDS ── */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: totemColor + '40' }]}>
            <Text style={[styles.statValue, { color: totemColor }]}>{sessions.length}</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Dialogues</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: totemColor + '40' }]}>
            <Text style={[styles.statValue, { color: totemColor }]}>{stats?.totalMessages ?? 0}</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Messages</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: totemColor + '40' }]}>
            <Text style={[styles.statValue, { color: totemColor }]}>{plante.niveauSpirituel}/5</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Niveau</Text>
          </View>
        </View>

        {stats && (
          <View style={[styles.firstContactCard, { backgroundColor: colors.card, borderColor: colors.border, borderLeftColor: totemColor }]}>
            <Text style={[styles.firstContactLabel, { color: colors.mutedForeground }]}>◆ Premier dialogue</Text>
            <Text style={[styles.firstContactDate, { color: colors.ivory }]}>
              {formatDateFull(stats.firstSession.startedAt)}
            </Text>
            <Text style={[styles.firstContactSub, { color: colors.mutedForeground }]}>
              Dernier échange : {formatDateFull(stats.lastSession.startedAt)}
            </Text>
          </View>
        )}

        {/* ── PROFIL DIMENSIONS ── */}
        <SectionTitle title="Profil intérieur" color={totemColor} />
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardSubtitle, { color: colors.mutedForeground }]}>
            Tes scores sur les 5 dimensions de l'âme
          </Text>
          {dims.map(([dim, meta]) => {
            const score = dimScores[dim as keyof typeof dimScores] ?? 0;
            return (
              <View key={dim} style={styles.dimRow}>
                <View style={styles.dimLabelCol}>
                  <Text style={[styles.dimIcon, { color: totemColor }]}>{meta.icon}</Text>
                  <View>
                    <Text style={[styles.dimLabel, { color: colors.ivory }]}>{meta.label}</Text>
                    <Text style={[styles.dimDesc, { color: colors.mutedForeground }]}>{meta.desc}</Text>
                  </View>
                </View>
                <View style={styles.dimBarWrap}>
                  <View style={[styles.dimBarTrack, { backgroundColor: colors.midBrown }]}>
                    <View
                      style={[
                        styles.dimBarFill,
                        { width: `${score}%` as any, backgroundColor: totemColor },
                      ]}
                    />
                  </View>
                  <Text style={[styles.dimScore, { color: totemColor }]}>{score}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* ── ACTIVITÉ (bar chart) ── */}
        {sessions.length > 0 && (
          <>
            <SectionTitle title="Activité des dialogues" color={totemColor} />
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardSubtitle, { color: colors.mutedForeground }]}>
                Messages échangés par conversation
              </Text>
              <View style={styles.chartWrap}>
                {sessions.slice(-12).map((s, i) => {
                  const count = s.messages.length;
                  const heightPct = count / maxMessages;
                  const barH = Math.max(6, Math.round(heightPct * 80));
                  return (
                    <View key={s.id} style={styles.barCol}>
                      <Text style={[styles.barCount, { color: totemColor }]}>{count}</Text>
                      <View style={styles.barTrackV}>
                        <View
                          style={[
                            styles.barFillV,
                            {
                              height: barH,
                              backgroundColor: i === sessions.slice(-12).length - 1
                                ? totemColor
                                : totemColor + '70',
                            },
                          ]}
                        />
                      </View>
                      <Text style={[styles.barDate, { color: colors.mutedForeground }]} numberOfLines={1}>
                        {formatDateShort(s.startedAt)}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </>
        )}

        {/* ── THÈMES RÉCURRENTS ── */}
        {keywords.length > 0 && (
          <>
            <SectionTitle title="Thèmes récurrents" color={totemColor} />
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardSubtitle, { color: colors.mutedForeground }]}>
                Les sagesses les plus présentes dans vos échanges
              </Text>
              <View style={styles.keywordWrap}>
                {keywords.map(({ word, count }, i) => {
                  const maxCount = keywords[0].count;
                  const intensity = 0.35 + (count / maxCount) * 0.65;
                  const fontSize = 11 + Math.round((count / maxCount) * 7);
                  return (
                    <View
                      key={word}
                      style={[
                        styles.keywordPill,
                        {
                          backgroundColor: totemColor + Math.round(intensity * 40).toString(16).padStart(2, '0'),
                          borderColor: totemColor + Math.round(intensity * 120).toString(16).padStart(2, '0'),
                        },
                      ]}
                    >
                      <Text style={[styles.keywordText, { color: colors.ivory, fontSize }]}>{word}</Text>
                      <View style={[styles.keywordBadge, { backgroundColor: totemColor + '60' }]}>
                        <Text style={[styles.keywordBadgeText, { color: colors.ivory }]}>{count}×</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </>
        )}

        {/* ── EMPTY STATE ── */}
        {sessions.length === 0 && !loading && (
          <View style={[styles.emptyChat, { borderColor: totemColor + '30', backgroundColor: totemColor + '0A' }]}>
            <Text style={[styles.emptyChatIcon, { color: totemColor }]}>✦</Text>
            <Text style={[styles.emptyChatTitle, { color: colors.ivory }]}>
              Ton parcours commence ici
            </Text>
            <Text style={[styles.emptyChatDesc, { color: colors.mutedForeground }]}>
              Lance un dialogue sacré avec {totem.nom} pour voir ta progression spirituelle prendre vie.
            </Text>
            <Pressable
              onPress={() => router.push('/chat-totem' as any)}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <LinearGradient
                colors={[totemColor, totemColor + 'AA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.emptyChatBtn}
              >
                <Feather name="message-circle" size={15} color={colors.deepBrown} />
                <Text style={[styles.emptyChatBtnText, { color: colors.deepBrown }]}>
                  Ouvrir le dialogue
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        )}

        {/* ── COMPATIBILITÉS ── */}
        {quizResult.scores && (
          <>
            <SectionTitle title="Affinités avec les totems" color={totemColor} />
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardSubtitle, { color: colors.mutedForeground }]}>
                Ton score de résonance avec chaque plante sacrée
              </Text>
              {(Object.entries(quizResult.scores) as [string, number][])
                .sort((a, b) => b[1] - a[1])
                .map(([id, score]) => {
                  const t = TOTEM_RESULTS[id as keyof typeof TOTEM_RESULTS];
                  if (!t) return null;
                  const isPrimary = id === quizResult.primary;
                  return (
                    <View key={id} style={styles.affinityRow}>
                      <View style={[styles.affinityDot, {
                        backgroundColor: isPrimary ? t.couleur : t.couleur + '40',
                        borderColor: t.couleur,
                      }]} />
                      <Text style={[
                        styles.affinityName,
                        { color: isPrimary ? colors.ivory : colors.mutedForeground, fontWeight: isPrimary ? '700' : '400' },
                      ]}>
                        {t.nom}
                        {isPrimary ? ' ✦' : ''}
                      </Text>
                      <View style={styles.affinityBarWrap}>
                        <View style={[styles.affinityBarTrack, { backgroundColor: colors.midBrown }]}>
                          <View
                            style={[
                              styles.affinityBarFill,
                              {
                                width: `${score}%` as any,
                                backgroundColor: isPrimary ? t.couleur : t.couleur + '70',
                              },
                            ]}
                          />
                        </View>
                        <Text style={[styles.affinityScore, { color: isPrimary ? t.couleur : colors.mutedForeground }]}>
                          {score}%
                        </Text>
                      </View>
                    </View>
                  );
                })}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

function SectionTitle({ title, color }: { title: string; color: string }) {
  return (
    <View style={styles.sectionTitleRow}>
      <View style={[styles.sectionLine, { backgroundColor: color + '60' }]} />
      <Text style={[styles.sectionTitle, { color }]}>◆ {title.toUpperCase()} ◆</Text>
      <View style={[styles.sectionLine, { backgroundColor: color + '60' }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  emptyWrap: { flex: 1, padding: 28, gap: 16 },
  backBtn: { marginBottom: 20 },
  emptyTitle: { fontSize: 26, fontWeight: '800' },
  emptyDesc: { fontSize: 15, lineHeight: 24 },
  emptyBtn: { padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 8 },
  emptyBtnText: { fontSize: 15, fontWeight: '700' },

  header: { paddingBottom: 0 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingVertical: 12 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerSup: { fontSize: 9, fontWeight: '800', letterSpacing: 2.5, marginBottom: 2 },
  headerName: { fontSize: 20, fontWeight: '800', letterSpacing: 0.5 },
  headerSub: { fontSize: 11, marginTop: 2 },
  iconBtn: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  adinkraRow: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 6, paddingHorizontal: 8 },
  adinkraChar: { fontSize: 11, fontWeight: '700' },

  scroll: { flex: 1 },
  scrollContent: { padding: 16, gap: 0 },

  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  statCard: {
    flex: 1, borderRadius: 14, borderWidth: 1,
    padding: 14, alignItems: 'center', gap: 4,
  },
  statValue: { fontSize: 26, fontWeight: '800' },
  statLabel: { fontSize: 11 },

  firstContactCard: {
    borderRadius: 12, borderWidth: 1, borderLeftWidth: 3,
    padding: 14, marginBottom: 20, gap: 3,
  },
  firstContactLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  firstContactDate: { fontSize: 16, fontWeight: '700' },
  firstContactSub: { fontSize: 12 },

  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8, marginBottom: 12 },
  sectionLine: { flex: 1, height: 1 },
  sectionTitle: { fontSize: 10, fontWeight: '800', letterSpacing: 2 },

  card: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 20, gap: 12 },
  cardSubtitle: { fontSize: 12, marginBottom: 4 },

  dimRow: { gap: 8 },
  dimLabelCol: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dimIcon: { fontSize: 16, width: 20, textAlign: 'center' },
  dimLabel: { fontSize: 13, fontWeight: '700' },
  dimDesc: { fontSize: 11 },
  dimBarWrap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dimBarTrack: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
  dimBarFill: { height: '100%', borderRadius: 3 },
  dimScore: { fontSize: 12, fontWeight: '700', width: 28, textAlign: 'right' },

  chartWrap: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 120 },
  barCol: { flex: 1, alignItems: 'center', gap: 3 },
  barCount: { fontSize: 9, fontWeight: '700' },
  barTrackV: { height: 80, justifyContent: 'flex-end', width: '100%', alignItems: 'center' },
  barFillV: { width: '100%', borderRadius: 3 },
  barDate: { fontSize: 8, textAlign: 'center' },

  keywordWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  keywordPill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    borderRadius: 20, borderWidth: 1,
    paddingVertical: 5, paddingHorizontal: 10,
  },
  keywordText: { fontWeight: '700' },
  keywordBadge: { borderRadius: 8, paddingHorizontal: 5, paddingVertical: 1 },
  keywordBadgeText: { fontSize: 9, fontWeight: '700' },

  emptyChat: {
    borderRadius: 16, borderWidth: 1,
    padding: 28, alignItems: 'center', gap: 12, marginTop: 8,
  },
  emptyChatIcon: { fontSize: 36 },
  emptyChatTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
  emptyChatDesc: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
  emptyChatBtn: {
    flexDirection: 'row', gap: 8, alignItems: 'center',
    paddingVertical: 12, paddingHorizontal: 24, borderRadius: 14, marginTop: 4,
  },
  emptyChatBtnText: { fontSize: 14, fontWeight: '700' },

  affinityRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  affinityDot: { width: 8, height: 8, borderRadius: 4, borderWidth: 1 },
  affinityName: { fontSize: 13, width: 90 },
  affinityBarWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  affinityBarTrack: { flex: 1, height: 5, borderRadius: 3, overflow: 'hidden' },
  affinityBarFill: { height: '100%', borderRadius: 3 },
  affinityScore: { fontSize: 11, fontWeight: '700', width: 36, textAlign: 'right' },
});
