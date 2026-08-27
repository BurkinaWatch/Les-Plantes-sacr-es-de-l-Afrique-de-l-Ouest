import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColors } from '@/hooks/useColors';
import { useTranslation } from '@/i18n';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/hooks/useNotifications';
import {
  ApiRequestError,
  requestPlantRecognition,
  type PlantRecognitionSuccess,
} from '@/lib/ai-api';

type PlantResult = PlantRecognitionSuccess;

function getApiBase(): string | null {
  const domain = process.env.EXPO_PUBLIC_DOMAIN;
  return domain ? `https://${domain}/api` : null;
}

const API_BASE = getApiBase();
const CHAT_API_KEY = process.env.EXPO_PUBLIC_CHAT_API_KEY ?? '';

async function pickImage(source: 'camera' | 'gallery'): Promise<string | null> {
  if (source === 'camera') {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'L\'accès à la caméra est nécessaire.');
      return null;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.7,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (result.canceled || !result.assets[0]) return null;
    return result.assets[0].base64 ?? null;
  } else {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'L\'accès à la galerie est nécessaire.');
      return null;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (result.canceled || !result.assets[0]) return null;
    return result.assets[0].base64 ?? null;
  }
}

function ConfidenceBadge({ level, t }: { level: string; t: any }) {
  const color =
    level === 'high' ? '#4CAF50' : level === 'medium' ? '#FF9800' : '#F44336';
  const label =
    level === 'high'
      ? t.scanner_confidence_high
      : level === 'medium'
      ? t.scanner_confidence_medium
      : t.scanner_confidence_low;

  return (
    <View style={[styles.confidenceBadge, { borderColor: color }]}>
      <View style={[styles.confidenceDot, { backgroundColor: color }]} />
      <Text style={[styles.confidenceText, { color }]}>{label}</Text>
    </View>
  );
}

function Section({
  icon,
  title,
  children,
  colors,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
  colors: any;
}) {
  return (
    <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.sectionHeader}>
        <Feather name={icon as any} size={14} color={colors.gold} />
        <Text style={[styles.sectionTitle, { color: colors.gold }]}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function BulletList({ items, colors }: { items: string[]; colors: any }) {
  return (
    <View>
      {items.map((item, i) => (
        <View key={i} style={styles.bulletRow}>
          <Text style={[styles.bullet, { color: colors.gold }]}>•</Text>
          <Text style={[styles.bulletText, { color: colors.foreground }]}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

export default function ScannerScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { t, lang } = useTranslation();
  const { token } = useAuth();
  const { scheduleLocalNotification } = useNotifications();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlantResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rateLimitRemaining, setRateLimitRemaining] = useState<number | null>(null);
  const [resetAt, setResetAt] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Live countdown when limit is exhausted
  useEffect(() => {
    if (rateLimitRemaining !== 0 || resetAt === null) {
      setCountdown(null);
      return;
    }
    const tick = () => {
      const secs = Math.max(0, resetAt - Math.floor(Date.now() / 1000));
      setCountdown(secs);
      if (secs === 0) {
        setRateLimitRemaining(null);
        setResetAt(null);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [rateLimitRemaining, resetAt]);

  const topPad = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;

  const handlePick = async (source: 'camera' | 'gallery') => {
    setResult(null);
    setError(null);
    setImageUri(null);
    setImageBase64(null);

    const picker = source === 'camera'
      ? ImagePicker.launchCameraAsync
      : ImagePicker.launchImageLibraryAsync;

    if (Platform.OS !== 'web') {
      const perm =
        source === 'camera'
          ? await ImagePicker.requestCameraPermissionsAsync()
          : await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (perm.status !== 'granted') {
        Alert.alert('Permission refusée', 'Accès nécessaire pour utiliser cette fonctionnalité.');
        return;
      }
    }

    const pickerResult = await picker({
      mediaTypes: ['images'],
      quality: 0.7,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (pickerResult.canceled || !pickerResult.assets[0]) return;

    const asset = pickerResult.assets[0];
    if (!asset.base64) {
      setError(t.scanner_error_generic);
      return;
    }

    setImageUri(asset.uri);
    setImageBase64(asset.base64);
    await analyze(asset.base64);
  };

  const analyze = async (b64: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const apiLang = ['fr', 'en'].includes(lang) ? lang : 'fr';
      const { plant, remaining, resetAt: newResetAt } = await requestPlantRecognition({
        apiBase: API_BASE,
        apiKey: CHAT_API_KEY,
        imageBase64: b64,
        lang: apiLang,
        token,
      });
      if (remaining !== null) setRateLimitRemaining(remaining);
      if (newResetAt !== null) setResetAt(newResetAt);
      if (plant.error) {
        setError(t.scanner_error_no_plant);
        await scheduleLocalNotification(t.notif_scan_title, t.notif_scan_error_body);
      } else {
        setResult(plant);
        await scheduleLocalNotification(t.notif_scan_title, t.notif_scan_body);
      }
    } catch (err: any) {
      if (err instanceof ApiRequestError) {
        const errorMessage =
          err.code === 'missing_key'
            ? t.api_error_missing_key
            : err.code === 'invalid_key'
            ? t.api_error_invalid_key
            : t.api_error_unavailable;
        setError(errorMessage);
        return;
      }
      const isRateLimit = (err as any).name === 'ApiRateLimitError';
      if (isRateLimit) {
        setRateLimitRemaining(0);
        if (err.resetAt != null) setResetAt(err.resetAt);
      }
      setError(isRateLimit ? t.rate_limit_exhausted : t.api_error_unavailable);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImageUri(null);
    setImageBase64(null);
    setResult(null);
    setError(null);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: topPad + 16, paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={[styles.headerLabel, { color: colors.gold }]}>{t.scanner_title}</Text>
          {rateLimitRemaining !== null && rateLimitRemaining <= 3 && (
            <View style={[
              styles.rateLimitPill,
              { backgroundColor: rateLimitRemaining === 0 ? '#2A0A0A' : '#1A1A00',
                borderColor: rateLimitRemaining === 0 ? '#C0392B' : '#8B6914' }
            ]}>
              <Text style={[
                styles.rateLimitText,
                { color: rateLimitRemaining === 0 ? '#E74C3C' : '#D4A017' }
              ]}>
                {rateLimitRemaining === 0
                  ? `⚠ ${t.rate_limit_reset_in} ${countdown !== null ? countdown + 's' : '…'}`
                  : `◆ ${rateLimitRemaining} ${t.rate_limit_remaining}`}
              </Text>
            </View>
          )}
        </View>
        {!result && !loading && (
          <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>
            {t.scanner_subtitle}
          </Text>
        )}
      </View>

      {/* Image Preview */}
      {imageUri ? (
        <View style={styles.previewWrap}>
          <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="cover" />
          {loading && (
            <View style={styles.analyzingOverlay}>
              <ActivityIndicator size="large" color={colors.gold} />
              <Text style={[styles.analyzingText, { color: colors.ivory }]}>
                {t.scanner_analyzing}
              </Text>
            </View>
          )}
        </View>
      ) : (
        /* Pick Buttons */
        <View style={styles.pickArea}>
          <LinearGradient
            colors={['#0A2A10', '#0A1F0A']}
            style={[styles.pickBox, { borderColor: colors.border }]}
          >
            <View style={[styles.scanIcon, { borderColor: colors.gold }]}>
              <Feather name="camera" size={36} color={colors.gold} />
            </View>

            <Pressable
              style={[styles.btn, { backgroundColor: colors.gold }]}
              onPress={() => handlePick('camera')}
            >
              <Feather name="camera" size={16} color={colors.background} />
              <Text style={[styles.btnText, { color: colors.background }]}>
                {t.scanner_btn_camera}
              </Text>
            </Pressable>

            <View style={styles.orRow}>
              <View style={[styles.orLine, { backgroundColor: colors.border }]} />
              <Text style={[styles.orText, { color: colors.mutedForeground }]}>ou</Text>
              <View style={[styles.orLine, { backgroundColor: colors.border }]} />
            </View>

            <Pressable
              style={[styles.btn, styles.btnOutline, { borderColor: colors.gold }]}
              onPress={() => handlePick('gallery')}
            >
              <Feather name="image" size={16} color={colors.gold} />
              <Text style={[styles.btnText, { color: colors.gold }]}>
                {t.scanner_btn_gallery}
              </Text>
            </Pressable>
          </LinearGradient>
        </View>
      )}

      {/* Error */}
      {error && (
        <View style={[styles.errorBox, { backgroundColor: '#2A0A0A', borderColor: '#C0392B' }]}>
          <Feather name="alert-circle" size={18} color="#E74C3C" />
          <Text style={styles.errorText}>{error}</Text>
          <Pressable
            style={[styles.retryBtn, { borderColor: colors.gold }]}
            onPress={() => imageBase64 ? analyze(imageBase64) : reset()}
            disabled={loading}
          >
            <Text style={[styles.retryText, { color: colors.gold }]}>{t.scanner_retry}</Text>
          </Pressable>
        </View>
      )}

      {/* Results */}
      {result && !loading && (
        <View style={styles.results}>
          {/* Plant Name */}
          <LinearGradient
            colors={['#1A3A1A', '#0A2A10']}
            style={[styles.nameCard, { borderColor: colors.gold }]}
          >
            <Text style={[styles.plantName, { color: colors.ivory }]}>{result.nom}</Text>
            <Text style={[styles.plantSci, { color: colors.gold }]}>
              {result.nomScientifique}
            </Text>
            <View style={styles.metaRow}>
              <View style={[styles.pill, { backgroundColor: colors.muted }]}>
                <Text style={[styles.pillText, { color: colors.mutedForeground }]}>
                  {result.famille}
                </Text>
              </View>
              <ConfidenceBadge level={result.confidence} t={t} />
            </View>
          </LinearGradient>

          {/* Description */}
          <Section icon="book-open" title="Description" colors={colors}>
            <Text style={[styles.bodyText, { color: colors.foreground }]}>
              {result.description}
            </Text>
          </Section>

          {/* Origin */}
          <Section icon="map-pin" title={t.scanner_result_origin} colors={colors}>
            <Text style={[styles.bodyText, { color: colors.foreground }]}>
              {result.origineGeographique}
            </Text>
          </Section>

          {/* Traditional uses */}
          {result.utilisationsTraditionnelles?.length > 0 && (
            <Section icon="leaf" title={t.scanner_result_uses} colors={colors}>
              <BulletList items={result.utilisationsTraditionnelles} colors={colors} />
            </Section>
          )}

          {/* Medicinal */}
          {result.proprietesMediacinales?.length > 0 && (
            <Section icon="heart" title={t.scanner_result_medicinal} colors={colors}>
              <BulletList items={result.proprietesMediacinales} colors={colors} />
            </Section>
          )}

          {/* African symbolism */}
          {result.symboliqueAfricaine && (
            <Section icon="sun" title={t.scanner_result_africa} colors={colors}>
              <Text style={[styles.bodyText, { color: colors.foreground }]}>
                {result.symboliqueAfricaine}
              </Text>
            </Section>
          )}

          {/* Tips */}
          {result.conseils?.length > 0 && (
            <Section icon="check-circle" title={t.scanner_result_tips} colors={colors}>
              <BulletList items={result.conseils} colors={colors} />
            </Section>
          )}

          {/* Curiosity */}
          {result.curiosite && (
            <LinearGradient
              colors={['#2A1A00', '#1A1000']}
              style={[styles.curiosityCard, { borderColor: colors.gold }]}
            >
              <Text style={[styles.curiosityLabel, { color: colors.gold }]}>
                ✦ {t.scanner_result_curiosity}
              </Text>
              <Text style={[styles.curiosityText, { color: colors.ivory }]}>
                {result.curiosite}
              </Text>
            </LinearGradient>
          )}

          {/* New Scan Button */}
          <Pressable
            style={[styles.newScanBtn, { borderColor: colors.terracotta }]}
            onPress={reset}
          >
            <Feather name="refresh-cw" size={16} color={colors.terracotta} />
            <Text style={[styles.newScanText, { color: colors.terracotta }]}>
              {t.scanner_new_scan}
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 24, marginBottom: 24 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  headerLabel: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 4,
  },
  headerSub: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  rateLimitPill: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  rateLimitText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  pickArea: { paddingHorizontal: 20 },
  pickBox: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 32,
    alignItems: 'center',
    gap: 16,
  },
  scanIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    justifyContent: 'center',
  },
  btnOutline: { borderWidth: 1, backgroundColor: 'transparent' },
  btnText: { fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
  orRow: { flexDirection: 'row', alignItems: 'center', width: '100%', gap: 10 },
  orLine: { flex: 1, height: 1 },
  orText: { fontSize: 12, letterSpacing: 1 },

  previewWrap: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    aspectRatio: 4 / 3,
  },
  previewImage: { width: '100%', height: '100%' },
  analyzingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,31,10,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  analyzingText: { fontSize: 15, fontWeight: '600', letterSpacing: 1 },

  errorBox: {
    margin: 20,
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    gap: 12,
  },
  errorText: { color: '#E74C3C', fontSize: 14, textAlign: 'center', lineHeight: 20 },
  retryBtn: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 20, paddingVertical: 8 },
  retryText: { fontSize: 14, fontWeight: '600' },

  results: { paddingHorizontal: 16, gap: 12, marginTop: 16 },
  nameCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    gap: 4,
  },
  plantName: { fontSize: 26, fontWeight: '900', letterSpacing: 1 },
  plantSci: { fontSize: 14, fontStyle: 'italic', marginBottom: 10 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  pill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  pillText: { fontSize: 11, letterSpacing: 0.5 },
  confidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  confidenceDot: { width: 6, height: 6, borderRadius: 3 },
  confidenceText: { fontSize: 11, fontWeight: '600' },

  section: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase' },
  bodyText: { fontSize: 14, lineHeight: 22 },
  bulletRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  bullet: { fontSize: 16, lineHeight: 22 },
  bulletText: { flex: 1, fontSize: 14, lineHeight: 22 },

  curiosityCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
    gap: 10,
  },
  curiosityLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  curiosityText: { fontSize: 14, lineHeight: 22, fontStyle: 'italic' },

  newScanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 8,
  },
  newScanText: { fontSize: 15, fontWeight: '600' },
});
