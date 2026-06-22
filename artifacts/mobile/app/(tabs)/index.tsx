import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { QuoteCard } from '@/components/QuoteCard';
import { useApp } from '@/context/AppContext';
import { ANIMALS } from '@/data/animals';
import { QUIZ_QUESTIONS } from '@/data/quiz';
import { useColors } from '@/hooks/useColors';
import { useTranslation } from '@/i18n';

const PLANT_ICONS: Record<string, string> = {
  'Arbres Sacrés': '🌳',
  'Plantes Médicinales': '🌿',
  'Plantes Alimentaires': '🫘',
  'Plantes Rituelles': '✦',
  'Herbes & Graminées': '🌾',
  'Palmiers': '🌴',
};

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { dailyQuote } = useApp();
  const { t } = useTranslation();

  const { width, height } = useWindowDimensions();
  const heroHeight = Math.round(height * 0.72);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const glowAnim = useRef(new Animated.Value(0.5)).current;
  const carouselFade = useRef(new Animated.Value(1)).current;

  const pickRandom = useCallback((exclude: string[] = []): typeof ANIMALS => {
    const pool = ANIMALS.filter((a) => !exclude.includes(a.id));
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, []);

  const [featuredPlantes, setFeaturedPlantes] = useState(() => pickRandom());

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 2200, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.4, duration: 2200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(carouselFade, { toValue: 0, duration: 350, useNativeDriver: true }).start(() => {
        setFeaturedPlantes((prev) => pickRandom(prev.map((a) => a.id)));
        Animated.timing(carouselFade, { toValue: 1, duration: 450, useNativeDriver: true }).start();
      });
    }, 9000);
    return () => clearInterval(interval);
  }, [pickRandom]);

  const isTablet = width >= 600;
  const cardWidth = isTablet ? Math.round(width * 0.28) : 140;
  const cardHeight = isTablet ? Math.round(cardWidth * 1.45) : 200;

  const topPad = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
      showsVerticalScrollIndicator={false}
    >
      {/* HERO — full-bleed photo with overlay */}
      <ImageBackground
        source={require('@/assets/images/hero.png')}
        style={[styles.hero, { height: heroHeight }]}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(10,4,1,0.72)', 'rgba(10,4,1,0.22)', 'rgba(10,4,1,0.04)', 'rgba(0,0,0,0)']}
          locations={[0, 0.28, 0.48, 1]}
          style={StyleSheet.absoluteFillObject}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(10,4,1,0.28)']}
          locations={[0.6, 1]}
          style={StyleSheet.absoluteFillObject}
        />

        <Animated.View style={[styles.heroContent, { paddingTop: topPad + 8, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.logoWrapper}>
            <Animated.View style={[styles.logoGlowOuter, { opacity: glowAnim }]} />
            <View style={styles.logoGlowInner} />
            <Image source={require('@/assets/images/icon.png')} style={styles.heroLogo} />
            <View style={styles.logoMoonOverlay} />
          </View>

          <View style={styles.logoRow}>
            <View style={[styles.logoDivider, { backgroundColor: colors.gold }]} />
            <Text style={[styles.logoSub, { color: colors.gold }]}>✦ {t.home_tagline} ✦</Text>
            <View style={[styles.logoDivider, { backgroundColor: colors.gold }]} />
          </View>

          <Text style={[styles.title, { color: colors.ivory }]}>
            {t.home_of_africa}
          </Text>

          <View style={[styles.titleRule, { backgroundColor: colors.gold }]} />

          <View style={[styles.westBadge, { borderColor: colors.terracotta, backgroundColor: 'rgba(10,4,1,0.45)' }]}>
            <View style={[styles.westBadgeDot, { backgroundColor: colors.terracotta }]} />
            <Text style={[styles.titleSub, { color: colors.terracotta }]}>{t.home_of_west}</Text>
            <View style={[styles.westBadgeDot, { backgroundColor: colors.terracotta }]} />
          </View>
        </Animated.View>
      </ImageBackground>

      <View style={[styles.section, { paddingHorizontal: 20 }]}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={[styles.sectionLabel, { color: colors.gold }]}>{t.home_wisdom_today}</Text>
          <QuoteCard quote={dailyQuote} />
        </Animated.View>
      </View>

      <View style={[styles.section, { paddingHorizontal: 20 }]}>
        <Text style={[styles.sectionLabel, { color: colors.gold }]}>{t.home_sacred_animals_label}</Text>
        <Text style={[styles.sectionTitle, { color: colors.ivory }]}>{t.home_guardians}</Text>
        <Animated.View style={{ opacity: carouselFade }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll} contentContainerStyle={{ gap: isTablet ? 16 : 12, paddingVertical: 4 }}>
            {featuredPlantes.map((plante) => (
              <Pressable
                key={plante.id}
                style={({ pressed }) => [styles.featuredCard, { width: cardWidth, height: cardHeight, opacity: pressed ? 0.85 : 1 }]}
                onPress={() => router.push(`/animal/${plante.id}` as any)}
              >
                <LinearGradient
                  colors={[plante.couleur, plante.couleurSecondaire]}
                  style={styles.featuredGradient}
                >
                  <View style={styles.featuredIconWrap}>
                    <Text style={[styles.featuredIcon, { fontSize: isTablet ? 72 : 60 }]}>
                      {PLANT_ICONS[plante.categorie] ?? '🌿'}
                    </Text>
                  </View>
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.55)']}
                    style={[StyleSheet.absoluteFillObject, { pointerEvents: 'none' }]}
                  />
                  <View style={styles.featuredTextBlock}>
                    <Text style={[styles.featuredNom, isTablet && styles.featuredNomTablet]}>{plante.nom}</Text>
                    <Text style={[styles.featuredPouvoir, isTablet && styles.featuredPouvoirTablet]}>{plante.pouvoirs[0]}</Text>
                  </View>
                </LinearGradient>
              </Pressable>
            ))}
          </ScrollView>
        </Animated.View>
      </View>

      <View style={[styles.section, { paddingHorizontal: 20 }]}>
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.88 : 1 }]}
          onPress={() => router.push('/(tabs)/animaux' as any)}
        >
          <LinearGradient
            colors={[colors.gold, colors.ochre]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaButton}
          >
            <Text style={[styles.ctaText, { color: colors.deepBrown }]}>{t.home_cta_discover}</Text>
            <Text style={[styles.ctaArrow, { color: colors.deepBrown }]}>→</Text>
          </LinearGradient>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.quizButton, { borderColor: colors.terracotta, opacity: pressed ? 0.8 : 1 }]}
          onPress={() => router.push('/(tabs)/quiz' as any)}
        >
          <Text style={[styles.quizButtonText, { color: colors.terracotta }]}>{t.home_cta_quiz}</Text>
        </Pressable>
      </View>

      <View style={[styles.statsRow, { paddingHorizontal: 20 }]}>
        {[
          { value: String(ANIMALS.length), label: t.home_stat_animals },
          { value: String(new Set(ANIMALS.map((a) => a.categorie)).size), label: t.home_stat_categories },
          { value: String(QUIZ_QUESTIONS.length), label: t.home_stat_questions },
        ].map((stat) => (
          <View key={stat.label} style={[styles.statItem, { borderColor: colors.border }]}>
            <Text style={[styles.statValue, { color: colors.gold }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  heroContent: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  logoWrapper: {
    width: 80,
    height: 80,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoGlowOuter: {
    position: 'absolute',
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: 'rgba(180,210,255,0.18)',
    ...Platform.select({
      web: { boxShadow: '0 0 28px 12px rgba(160,200,255,0.30)' },
    }),
  },
  logoGlowInner: {
    position: 'absolute',
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1,
    borderColor: 'rgba(200,225,255,0.35)',
    backgroundColor: 'rgba(140,185,255,0.08)',
  },
  heroLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    ...Platform.select({
      web: { filter: 'brightness(1.15) saturate(0.7) hue-rotate(195deg) drop-shadow(0 0 10px rgba(160,205,255,0.55))' },
    }),
  },
  logoMoonOverlay: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(160,200,255,0.10)',
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
    width: '100%',
  },
  logoDivider: { height: 1, flex: 1, opacity: 0.8 },
  logoSub: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 3,
    ...Platform.select({
      web: { textShadow: '0px 1px 4px rgba(0,0,0,0.6)' },
      default: {
        textShadowColor: 'rgba(0,0,0,0.6)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
      },
    }),
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -0.5,
    textAlign: 'center',
    width: '100%',
    ...Platform.select({
      web: { textShadow: '0px 3px 12px rgba(0,0,0,0.65)' },
      default: {
        textShadowColor: 'rgba(0,0,0,0.65)',
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 12,
      },
    }),
  },
  titleRule: {
    width: 48,
    height: 2,
    borderRadius: 2,
    marginTop: 6,
    marginBottom: 6,
    opacity: 0.8,
  },
  westBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 6,
  },
  westBadgeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    opacity: 0.7,
  },
  titleSub: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 5,
    textAlign: 'center',
  },
  section: {
    marginTop: 32,
    gap: 12,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginTop: -4,
  },
  featuredScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  featuredCard: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  featuredGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  featuredIconWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    opacity: 0.35,
  },
  featuredIcon: {
    fontSize: 60,
  },
  featuredTextBlock: {
    padding: 12,
    paddingBottom: 14,
    zIndex: 2,
  },
  featuredNom: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', letterSpacing: 0.3 },
  featuredNomTablet: { fontSize: 20 },
  featuredPouvoir: { color: 'rgba(255,255,255,0.82)', fontSize: 11, marginTop: 3, lineHeight: 15 },
  featuredPouvoirTablet: { fontSize: 13, lineHeight: 18 },
  ctaButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 18,
    borderRadius: 16,
  },
  ctaText: { fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
  ctaArrow: { fontSize: 18, fontWeight: '700' },
  quizButton: {
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  quizButtonText: { fontSize: 15, fontWeight: '600', letterSpacing: 0.3 },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  statValue: { fontSize: 28, fontWeight: '800' },
  statLabel: { fontSize: 10, marginTop: 2, textAlign: 'center', letterSpacing: 0.3, fontWeight: '500' },
});
