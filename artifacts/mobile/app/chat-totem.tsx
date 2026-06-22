import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import { useApp } from '@/context/AppContext';
import { TOTEM_RESULTS } from '@/data/quiz';
import { getAnimalById } from '@/data/animals';
import { useColors } from '@/hooks/useColors';
import { useTranslation } from '@/i18n';

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

const API_BASE = process.env.EXPO_PUBLIC_DOMAIN
  ? `https://${process.env.EXPO_PUBLIC_DOMAIN}/api`
  : null;

const ADINKRA = ['◆', '▲', '◇', '△', '●', '○', '✦', '✧'];
const KENTE_STRIP = ['#D4A017', '#C4622D', '#5C7A3E', '#CC7722', '#8B6914', '#D4A017'];

function KenteStrip() {
  return (
    <View style={kStyles.kenteStrip}>
      {KENTE_STRIP.map((c, i) => (
        <View key={i} style={[kStyles.kenteCell, { backgroundColor: c }]} />
      ))}
    </View>
  );
}

function AdinkraRow({ color }: { color: string }) {
  return (
    <View style={kStyles.adinkraRow}>
      {ADINKRA.map((s, i) => (
        <Text key={i} style={[kStyles.adinkraChar, { color: color + '60' }]}>{s}</Text>
      ))}
    </View>
  );
}

const kStyles = StyleSheet.create({
  kenteStrip: { flexDirection: 'row', height: 4 },
  kenteCell: { flex: 1 },
  adinkraRow: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 6, paddingHorizontal: 8 },
  adinkraChar: { fontSize: 11, fontWeight: '700' as const },
});

function formatDate(ts: number) {
  const d = new Date(ts);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}
function formatTime(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatTotemScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { quizResult } = useApp();
  const { lang } = useTranslation();

  const [messages, setMessages] = useState<Message[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showArchives, setShowArchives] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const loadingAnim = useRef(new Animated.Value(0)).current;

  const totem = quizResult ? TOTEM_RESULTS[quizResult.primary] : null;
  const animal = quizResult ? getAnimalById(quizResult.primary) : null;
  const topPad = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;

  const STORAGE_KEY = `@chat_sessions_${animal?.id ?? 'none'}`;

  // ── Animate loading dots ──
  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(loadingAnim, { toValue: 1, duration: 600, useNativeDriver: false }),
          Animated.timing(loadingAnim, { toValue: 0, duration: 600, useNativeDriver: false }),
        ])
      ).start();
    } else {
      loadingAnim.stopAnimation();
      loadingAnim.setValue(0);
    }
  }, [isLoading]);

  // ── Load sessions ──
  useEffect(() => {
    if (!animal) return;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        const stored: ChatSession[] = raw ? JSON.parse(raw) : [];
        setSessions(stored);
        // Start fresh session
        const id = Date.now().toString();
        setCurrentSessionId(id);
        setMessages([]);
      } catch {}
    })();
  }, [animal?.id]);

  // ── Persist after each exchange ──
  const persistSession = useCallback(async (msgs: Message[], sessionId: string) => {
    if (msgs.length === 0) return;
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const stored: ChatSession[] = raw ? JSON.parse(raw) : [];
      const preview = msgs.find((m) => m.role === 'assistant')?.content?.slice(0, 80) ?? msgs[0]?.content?.slice(0, 80) ?? '';
      const existing = stored.findIndex((s) => s.id === sessionId);
      const session: ChatSession = {
        id: sessionId,
        startedAt: msgs[0]?.timestamp ?? Date.now(),
        messages: msgs,
        preview,
      };
      if (existing >= 0) stored[existing] = session;
      else stored.unshift(session);
      // Keep last 20 sessions
      const trimmed = stored.slice(0, 20);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
      setSessions(trimmed);
    } catch {}
  }, [STORAGE_KEY]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading || !animal || !totem) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput('');
    setIsLoading(true);

    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);

    if (!API_BASE) {
      const offlineMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '🌐 La Plante Totem nécessite une connexion au serveur. Cette fonctionnalité sera disponible dans une prochaine version.',
        timestamp: Date.now(),
      };
      setMessages([...allMessages, offlineMsg]);
      setIsLoading(false);
      return;
    }

    try {
      const chatApiKey = process.env.EXPO_PUBLIC_CHAT_API_KEY ?? '';
      const response = await fetch(`${API_BASE}/chat/totem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(chatApiKey ? { 'x-api-key': chatApiKey } : {}),
        },
        body: JSON.stringify({
          animalId: animal.id,
          animalData: {
            nom: animal.nom,
            nomScientifique: animal.nomScientifique,
            element: animal.element,
            categorie: animal.categorie,
            regionOrigine: animal.regionOrigine,
            description: animal.description,
            symboliqueAfricaine: animal.symboliqueAfricaine,
            symboliqueSpirirtuelle: animal.symboliqueSpirirtuelle,
            qualites: animal.qualites,
            defauts: animal.defauts,
            pouvoirs: animal.pouvoirs,
            enseignements: animal.enseignements,
            citation: animal.citation,
            proverbes: animal.proverbes,
            conseilsDeVie: animal.conseilsDeVie,
            niveauSpirituel: animal.niveauSpirituel,
          },
          messages: allMessages.map((m) => ({ role: m.role, content: m.content })),
          userLang: lang === 'fr' || lang === 'en' ? lang : 'fr',
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error((err as any).error ?? 'Erreur réseau');
      }

      const data = await response.json();
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content ?? '',
        timestamp: Date.now(),
      };

      const finalMessages = [...allMessages, assistantMsg];
      setMessages(finalMessages);
      await persistSession(finalMessages, currentSessionId);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    } catch (err: any) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '⚠️ Une erreur est survenue. Réessaie.',
        timestamp: Date.now(),
      };
      const finalMessages = [...allMessages, errorMsg];
      setMessages(finalMessages);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, animal, totem, messages, lang, currentSessionId, persistSession]);

  const loadSession = (session: ChatSession) => {
    setMessages(session.messages);
    setCurrentSessionId(session.id);
    setShowArchives(false);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: false }), 200);
  };

  const newConversation = () => {
    const id = Date.now().toString();
    setCurrentSessionId(id);
    setMessages([]);
    setShowArchives(false);
  };

  const deleteSession = async (sessionId: string) => {
    const updated = sessions.filter((s) => s.id !== sessionId);
    setSessions(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (currentSessionId === sessionId) newConversation();
  };

  if (!quizResult || !totem || !animal) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.emptyWrap, { paddingTop: topPad + 16 }]}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={20} color={colors.gold} />
          </Pressable>
          <Text style={[styles.emptyTitle, { color: colors.ivory }]}>✦ Totem non révélé</Text>
          <Text style={[styles.emptyDesc, { color: colors.mutedForeground }]}>
            Complète le quiz sacré pour découvrir ta plante totem et accéder à ce dialogue ancestral.
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

  const totemColor = totem.couleur;

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      {/* ══ HEADER ══ */}
      <LinearGradient
        colors={[colors.deepBrown, colors.warmBrown]}
        style={[styles.header, { paddingTop: topPad + 6 }]}
      >
        {/* Kente strip top */}
        <KenteStrip />

        <View style={styles.headerRow}>
          <Pressable
            style={({ pressed }) => [styles.iconBtn, { opacity: pressed ? 0.7 : 1, borderColor: totemColor + '60' }]}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={18} color={totemColor} />
          </Pressable>

          <View style={styles.headerCenter}>
            <Text style={[styles.headerSup, { color: totemColor + '90' }]}>✦ DIALOGUE SACRÉ ✦</Text>
            <Text style={[styles.headerName, { color: colors.ivory }]}>{totem.nom}</Text>
            <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>
              {animal.element} · {animal.regionOrigine}
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [styles.iconBtn, { opacity: pressed ? 0.7 : 1, borderColor: totemColor + '60' }]}
            onPress={() => setShowArchives(true)}
          >
            <Feather name="archive" size={18} color={totemColor} />
            {sessions.length > 0 && (
              <View style={[styles.badge, { backgroundColor: totemColor }]}>
                <Text style={styles.badgeText}>{Math.min(sessions.length, 9)}</Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Adinkra strip */}
        <AdinkraRow color={totemColor} />
      </LinearGradient>

      {/* ══ MESSAGES ══ */}
      <ScrollView
        ref={scrollRef}
        style={styles.messages}
        contentContainerStyle={[styles.messagesContent, { paddingBottom: 16 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting / suggestions when empty */}
        {messages.length === 0 && (
          <View style={styles.welcomeWrap}>
            <View style={[styles.totemEmblem, { borderColor: totemColor + '50', backgroundColor: totemColor + '12' }]}>
              <Text style={[styles.totemEmblemChar, { color: totemColor }]}>✦</Text>
              <Text style={[styles.totemEmblemName, { color: colors.ivory }]}>{totem.nom}</Text>
              <Text style={[styles.totemEmblemSci, { color: colors.mutedForeground }]}>{animal.nomScientifique}</Text>
            </View>

            <View style={[styles.citationCard, { backgroundColor: totemColor + '15', borderColor: totemColor + '40', borderLeftColor: totemColor }]}>
              <Text style={[styles.citationText, { color: colors.ivory }]}>"{animal.citation}"</Text>
            </View>

            <Text style={[styles.suggestLabel, { color: colors.mutedForeground }]}>◆ COMMENCE PAR ◆</Text>
            {[
              `Qu'est-ce que ta nature m'apprend sur moi ?`,
              `Comment puis-je surmonter mes peurs ?`,
              `Quel enseignement m'offres-tu aujourd'hui ?`,
              `Révèle-moi mes forces cachées.`,
            ].map((s) => (
              <Pressable
                key={s}
                style={({ pressed }) => [
                  styles.suggestion,
                  { backgroundColor: colors.card, borderColor: totemColor + '40', opacity: pressed ? 0.75 : 1 },
                ]}
                onPress={() => setInput(s)}
              >
                <Text style={[styles.suggestionDiamond, { color: totemColor }]}>◆</Text>
                <Text style={[styles.suggestionText, { color: colors.ivory }]}>{s}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          const showTime = idx === 0 || messages[idx - 1]?.timestamp < msg.timestamp - 5 * 60 * 1000;
          return (
            <View key={msg.id}>
              {showTime && (
                <Text style={[styles.timeLabel, { color: colors.mutedForeground }]}>
                  {formatTime(msg.timestamp)}
                </Text>
              )}
              {isUser ? (
                <View style={[styles.userBubble, { backgroundColor: totemColor + '22', borderColor: totemColor + '50' }]}>
                  <Text style={[styles.bubbleText, { color: colors.ivory }]}>{msg.content}</Text>
                </View>
              ) : (
                <View style={[styles.assistantBubbleWrap]}>
                  <View style={[styles.assistantAccent, { backgroundColor: totemColor }]} />
                  <View style={[styles.assistantBubble, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <View style={styles.assistantHeader}>
                      <Text style={[styles.assistantLabel, { color: totemColor }]}>
                        ✦ {totem.nom.toUpperCase()}
                      </Text>
                    </View>
                    <Text style={[styles.bubbleText, { color: colors.ivory }]}>{msg.content}</Text>
                    <View style={[styles.assistantFooter, { borderTopColor: colors.border }]}>
                      <Text style={[styles.assistantFooterText, { color: colors.mutedForeground }]}>
                        {animal.element} · Niveau {animal.niveauSpirituel}/5
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          );
        })}

        {/* Loading indicator */}
        {isLoading && (
          <View style={styles.assistantBubbleWrap}>
            <View style={[styles.assistantAccent, { backgroundColor: totemColor }]} />
            <View style={[styles.assistantBubble, styles.loadingBubble, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.assistantLabel, { color: totemColor }]}>✦ {totem.nom.toUpperCase()}</Text>
              <View style={styles.dotsRow}>
                {[0, 1, 2].map((i) => (
                  <Animated.View
                    key={i}
                    style={[
                      styles.dot,
                      { backgroundColor: totemColor },
                      { opacity: loadingAnim.interpolate({ inputRange: [0, 1], outputRange: i === 1 ? [1, 0.3] : [0.3, 1] }) },
                    ]}
                  />
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* ══ INPUT BAR ══ */}
      <View style={[styles.inputWrap, { backgroundColor: colors.warmBrown, borderTopColor: totemColor + '30', paddingBottom: insets.bottom + 8 }]}>
        <KenteStrip />
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, { color: colors.ivory, backgroundColor: colors.card, borderColor: totemColor + '40' }]}
            placeholder={`Parle au ${totem.nom}…`}
            placeholderTextColor={colors.mutedForeground}
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={800}
          />
          <Pressable
            style={({ pressed }) => [
              styles.sendBtn,
              { backgroundColor: input.trim() && !isLoading ? totemColor : colors.midBrown, opacity: pressed ? 0.8 : 1 },
            ]}
            onPress={sendMessage}
            disabled={!input.trim() || isLoading}
          >
            {isLoading
              ? <ActivityIndicator size="small" color="#FFF" />
              : <Feather name="send" size={18} color="#FFF" />
            }
          </Pressable>
        </View>
        <Pressable style={styles.newChatBtn} onPress={newConversation}>
          <Feather name="plus-circle" size={13} color={colors.mutedForeground} />
          <Text style={[styles.newChatText, { color: colors.mutedForeground }]}>Nouvelle conversation</Text>
        </Pressable>
      </View>

      {/* ══ ARCHIVES MODAL ══ */}
      <Modal visible={showArchives} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSheet, { backgroundColor: colors.warmBrown }]}>
            {/* Header */}
            <LinearGradient colors={[colors.deepBrown, colors.warmBrown]} style={styles.modalHeader}>
              <KenteStrip />
              <View style={styles.modalHeaderRow}>
                <View>
                  <Text style={[styles.modalTitle, { color: colors.ivory }]}>✦ Archives sacrées</Text>
                  <Text style={[styles.modalSub, { color: colors.mutedForeground }]}>
                    {sessions.length} conversation{sessions.length !== 1 ? 's' : ''} avec {totem.nom}
                  </Text>
                </View>
                <Pressable
                  style={({ pressed }) => [styles.iconBtn, { borderColor: totemColor + '40', opacity: pressed ? 0.7 : 1 }]}
                  onPress={() => setShowArchives(false)}
                >
                  <Feather name="x" size={18} color={totemColor} />
                </Pressable>
              </View>
              <AdinkraRow color={totemColor} />
            </LinearGradient>

            <Pressable
              style={[styles.newSessionBtn, { backgroundColor: totemColor + '20', borderColor: totemColor + '50' }]}
              onPress={newConversation}
            >
              <Feather name="plus" size={16} color={totemColor} />
              <Text style={[styles.newSessionText, { color: totemColor }]}>Nouvelle conversation</Text>
            </Pressable>

            <ScrollView style={styles.archiveList} showsVerticalScrollIndicator={false}>
              {sessions.length === 0 && (
                <Text style={[styles.emptyArchive, { color: colors.mutedForeground }]}>
                  Aucune conversation archivée pour le moment.
                </Text>
              )}
              {sessions.map((s) => (
                <Pressable
                  key={s.id}
                  style={({ pressed }) => [
                    styles.archiveCard,
                    {
                      backgroundColor: s.id === currentSessionId ? totemColor + '15' : colors.card,
                      borderColor: s.id === currentSessionId ? totemColor + '60' : colors.border,
                      opacity: pressed ? 0.85 : 1,
                    },
                  ]}
                  onPress={() => loadSession(s)}
                >
                  <View style={[styles.archiveAccent, { backgroundColor: totemColor }]} />
                  <View style={styles.archiveBody}>
                    <View style={styles.archiveTop}>
                      <Text style={[styles.archiveDate, { color: totemColor }]}>
                        {s.id === currentSessionId ? '▶ En cours' : formatDate(s.startedAt)}
                      </Text>
                      <Pressable
                        onPress={() => deleteSession(s.id)}
                        hitSlop={10}
                        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 0.6 }]}
                      >
                        <Feather name="trash-2" size={13} color={colors.mutedForeground} />
                      </Pressable>
                    </View>
                    <Text style={[styles.archivePreview, { color: colors.ivory }]} numberOfLines={2}>
                      {s.preview || '…'}
                    </Text>
                    <Text style={[styles.archiveCount, { color: colors.mutedForeground }]}>
                      {s.messages.length} message{s.messages.length !== 1 ? 's' : ''}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Empty state
  emptyWrap: { flex: 1, padding: 28, gap: 16 },
  backBtn: { marginBottom: 20 },
  emptyTitle: { fontSize: 26, fontWeight: '800' as const },
  emptyDesc: { fontSize: 15, lineHeight: 24 },
  emptyBtn: { padding: 16, borderRadius: 14, alignItems: 'center' as const, marginTop: 8 },
  emptyBtnText: { fontSize: 15, fontWeight: '700' as const },

  // Header
  header: { paddingBottom: 0 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingVertical: 12 },
  headerCenter: { flex: 1 },
  headerSup: { fontSize: 9, fontWeight: '800' as const, letterSpacing: 2.5, marginBottom: 2 },
  headerName: { fontSize: 22, fontWeight: '800' as const, lineHeight: 26 },
  headerSub: { fontSize: 11, marginTop: 2 },
  iconBtn: {
    width: 38, height: 38, borderRadius: 10, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
  },
  badge: {
    position: 'absolute', top: -6, right: -6,
    width: 16, height: 16, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center',
  },
  badgeText: { fontSize: 9, fontWeight: '800' as const, color: '#FFF' },

  // Messages
  messages: { flex: 1 },
  messagesContent: { padding: 16, gap: 10 },

  // Welcome
  welcomeWrap: { gap: 12, paddingBottom: 8 },
  totemEmblem: {
    alignItems: 'center', borderWidth: 1, borderRadius: 16,
    paddingVertical: 20, paddingHorizontal: 24, gap: 4,
  },
  totemEmblemChar: { fontSize: 28 },
  totemEmblemName: { fontSize: 20, fontWeight: '800' as const, letterSpacing: 1 },
  totemEmblemSci: { fontSize: 12, fontStyle: 'italic' },
  citationCard: {
    borderWidth: 1, borderLeftWidth: 4, borderRadius: 12,
    padding: 14,
  },
  citationText: { fontSize: 14, fontStyle: 'italic', lineHeight: 22 },
  suggestLabel: { fontSize: 9, fontWeight: '800' as const, letterSpacing: 3, textAlign: 'center', marginTop: 8 },
  suggestion: {
    flexDirection: 'row', alignItems: 'flex-start',
    gap: 10, padding: 12, borderRadius: 12, borderWidth: 1,
  },
  suggestionDiamond: { fontSize: 12, marginTop: 2 },
  suggestionText: { flex: 1, fontSize: 14, lineHeight: 20 },

  // Messages
  timeLabel: { fontSize: 10, textAlign: 'center', marginVertical: 4 },
  userBubble: {
    alignSelf: 'flex-end', maxWidth: '82%',
    borderRadius: 16, borderTopRightRadius: 4,
    borderWidth: 1, padding: 14,
  },
  assistantBubbleWrap: { flexDirection: 'row', alignSelf: 'flex-start', maxWidth: '90%', gap: 0 },
  assistantAccent: { width: 3, borderRadius: 2, marginRight: 8, marginTop: 4 },
  assistantBubble: { flex: 1, borderRadius: 16, borderTopLeftRadius: 4, borderWidth: 1, overflow: 'hidden' },
  loadingBubble: { paddingVertical: 14, paddingHorizontal: 14 },
  assistantHeader: { paddingHorizontal: 14, paddingTop: 12, paddingBottom: 6 },
  assistantLabel: { fontSize: 9, fontWeight: '800' as const, letterSpacing: 2.5 },
  bubbleText: { fontSize: 15, lineHeight: 24, paddingHorizontal: 14, paddingBottom: 10 },
  assistantFooter: { borderTopWidth: 1, paddingHorizontal: 14, paddingVertical: 6 },
  assistantFooterText: { fontSize: 10, letterSpacing: 0.5 },
  dotsRow: { flexDirection: 'row', gap: 6, paddingVertical: 4 },
  dot: { width: 8, height: 8, borderRadius: 4 },

  // Input
  inputWrap: { borderTopWidth: 1 },
  inputRow: {
    flexDirection: 'row', alignItems: 'flex-end',
    gap: 10, paddingHorizontal: 12, paddingTop: 10, paddingBottom: 6,
  },
  input: {
    flex: 1, borderRadius: 14, borderWidth: 1,
    paddingHorizontal: 14, paddingVertical: 10,
    fontSize: 15, maxHeight: 100,
  },
  sendBtn: {
    width: 44, height: 44, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  newChatBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, paddingBottom: 4,
  },
  newChatText: { fontSize: 11 },

  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalSheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: 'hidden', maxHeight: '80%' },
  modalHeader: { paddingBottom: 0 },
  modalHeaderRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingHorizontal: 20, paddingVertical: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: '800' as const },
  modalSub: { fontSize: 12, marginTop: 2 },
  newSessionBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    margin: 14, padding: 14, borderRadius: 12, borderWidth: 1,
  },
  newSessionText: { fontSize: 14, fontWeight: '700' as const },
  archiveList: { paddingHorizontal: 14, paddingBottom: 24 },
  emptyArchive: { textAlign: 'center', padding: 32, fontSize: 14 },
  archiveCard: {
    flexDirection: 'row', borderRadius: 12, borderWidth: 1,
    marginBottom: 10, overflow: 'hidden',
  },
  archiveAccent: { width: 4 },
  archiveBody: { flex: 1, padding: 12, gap: 4 },
  archiveTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  archiveDate: { fontSize: 11, fontWeight: '700' as const, letterSpacing: 0.5 },
  archivePreview: { fontSize: 13, lineHeight: 19 },
  archiveCount: { fontSize: 11 },
});
