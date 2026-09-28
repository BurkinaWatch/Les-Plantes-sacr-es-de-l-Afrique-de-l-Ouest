import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { SacredIcon } from '@/components/SacredIcon';
import { useApp } from '@/context/AppContext';
import { PLANTS } from '@/data/animals';
import { QUIZ_QUESTIONS } from '@/data/quiz';
import { useColors } from '@/hooks/useColors';
import { useTranslation } from '@/i18n';
import PLANT_IMAGES from '@/constants/plantImages';

function shufflePlants(plants: typeof PLANTS): typeof PLANTS {
  const shuffled = [...plants];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { dailyQuote } = useApp();
  const { t } = useTranslation();

  const { width, height } = useWindowDimensions();
  const heroHeight = Math.min(Math.max(Math.round(height * 0.58), 360), 560);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const glowAnim = useRef(new Animated.Value(0.5)).current;

  const plantsWithImages = useMemo(
    () => PLANTS.filter((plant) => Boolean(PLANT_IMAGES[plant.id])),
    [],
  );

  const initialCycle = useMemo(() => shufflePlants(plantsWithImages), [plantsWithImages]);
  const [featuredPlantes, setFeaturedPlantes] = useState(() => initialCycle.slice(0, 4));
  const remainingPlantsRef = useRef(initialCycle.slice(4));
  const hasFocusedOnceRef = useRef(false);

  const showNextFeatured = useCallback(() => {
    let remainingPlants = remainingPlantsRef.current;

    if (remainingPlants.length === 0) {
      remainingPlants = shufflePlants(plantsWithImages);
    }

    setFeaturedPlantes(remainingPlants.slice(0, 4));
    remainingPlantsRef.current = remainingPlants.slice(4);
  }, [plantsWithImages]);

  useFocusEffect(
    useCallback(() => {
      // The initial state already contains the first group of the cycle.
      // Advance only when the screen is focused again after being left.
      if (hasFocusedOnceRef.current) {
        showNextFeatured();
      } else {
        hasFocusedOnceRef.current = true;
      }
    }, [showNextFeatured]),
  );

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

  const isTablet = width >= 600;
  // 2×2 grid: 2 columns with a gap
  const GRID_GAP = isTablet ? 14 : 10;
  const SECTION_PAD = 20;
  const cardWidth = Math.floor((width - SECTION_PAD * 2 - GRID_GAP) / 2);
  const cardHeight = Math.round(cardWidth * 1.22);

  const topPad = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
      showsVerticalScrollIndicator={false}
    >
      {/* HERO — full-bleed photo with overlay */}
      <ImageBackground
        source={require('@/assets/images/hero-plants.png')}
        style={[styles.hero, { height: heroHeight }]}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(4,12,4,0.38)', 'rgba(4,12,4,0.12)', 'rgba(4,12,4,0.04)', 'rgba(0,0,0,0)']}
          locations={[0, 0.28, 0.48, 1]}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(4,12,4,0.28)']}
          locations={[0.55, 1]}
          style={StyleSheet.absoluteFill}
        />

        <Animated.View style={[styles.heroContent, { paddingTop: topPad + 8, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.logoWrapper}>
            <Animated.View style={[styles.logoGlowOuter, { opacity: glowAnim }]} />
            <View style={styles.logoGlowInner} />
            <Image source={require('@/assets/images/logo-plantes-sacrees.png')} style={styles.heroLogo} />
            <View style={styles.logoMoonOverlay} />
          </View>

          <View style={styles.logoRow}>
            <View style={[styles.logoDivider, { backgroundColor: colors.gold }]} />
            <SacredIcon name="sparkles" size={12} color={colors.gold} />
            <Text style={[styles.logoSub, { color: colors.gold }]}>{t.home_tagline}</Text>
            <SacredIcon name="sparkles" size={12} color={colors.gold} />
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

      <View style={[styles.featuredSection, { backgroundColor: colors.featureSurface }]}>
        <Text style={[styles.sectionLabel, { color: colors.gold }]}>{t.home_sacred_animals_label}</Text>
        <Text style={[styles.sectionTitle, { color: colors.ivory }]}>{t.home_guardians}</Text>
        <View style={[styles.featuredGrid, { gap: GRID_GAP }]}>
          {featuredPlantes.map((plante) => {
            const imageSource = PLANT_IMAGES[plante.id];

            return (
              <Pressable
                key={plante.id}
                style={({ pressed }) => [styles.featuredCard, { width: cardWidth, height: cardHeight, opacity: pressed ? 0.85 : 1 }]}
                onPress={() => router.push(`/animal/${plante.id}` as any)}
                testID={`featured-plant-${plante.id}`}
              >
                <View style={[styles.featuredCardContent, { backgroundColor: colors.card }]}>
                  <View style={styles.featuredImageFrame}>
                    {imageSource ? (
                      <Image source={imageSource} style={styles.featuredImage} resizeMode="contain" fadeDuration={0} />
                    ) : (
                      <LinearGradient colors={[plante.couleur, plante.couleurSecondaire]} style={StyleSheet.absoluteFill} />
                    )}
                  </View>
                  <View style={[styles.featuredTextBlock, { backgroundColor: colors.background }]}>
                    <Text style={[styles.featuredNom, isTablet && styles.featuredNomTablet, { color: colors.ivory }]} numberOfLines={2}>{plante.nom}</Text>
                    <Text style={[styles.featuredPouvoir, isTablet && styles.featuredPouvoirTablet]} numberOfLines={2}>{plante.pouvoirs[0]}</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
        <Pressable
          testID="discover-plants"
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
            <SacredIcon name="chevron-right" size={20} color={colors.deepBrown} />
          </LinearGradient>
        </Pressable>
      </View>

      <View style={[styles.section, { paddingHorizontal: 20 }]}>
        <Pressable
          style={({ pressed }) => [styles.quizButton, { borderColor: colors.terracotta, opacity: pressed ? 0.8 : 1 }]}
          onPress={() => router.push('/(tabs)/quiz' as any)}
        >
          <Text style={[styles.quizButtonText, { color: colors.terracotta }]}>{t.home_cta_quiz}</Text>
        </Pressable>
      </View>

      <View style={[styles.statsRow, { paddingHorizontal: 20 }]}>
        {[
          { value: String(PLANTS.length), label: t.home_stat_animals },
          { value: String(new Set(PLANTS.map((a) => a.categorie)).size), label: t.home_stat_categories },
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
    width: 58,
    height: 58,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoGlowOuter: {
    position: 'absolute',
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: 'rgba(200,160,32,0.16)',
    ...Platform.select({
      web: { boxShadow: '0 0 28px 14px rgba(200,160,32,0.28)' },
    }),
  },
  logoGlowInner: {
    position: 'absolute',
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(200,160,32,0.38)',
    backgroundColor: 'rgba(92,122,62,0.12)',
  },
  heroLogo: {
    width: 58,
    height: 58,
    borderRadius: 12,
    ...Platform.select({
      web: { filter: 'brightness(1.1) saturate(1.1) drop-shadow(0 0 10px rgba(200,160,32,0.50))' },
    }),
  },
  logoMoonOverlay: {
    position: 'absolute',
    width: 58,
    height: 58,
    borderRadius: 12,
    backgroundColor: 'rgba(200,160,32,0.08)',
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
    width: '100%',
  },
  logoDivider: { height: 1, flex: 1, opacity: 0.8 },
  logoSub: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
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
    fontSize: 28,
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
    marginTop: 4,
    marginBottom: 4,
    opacity: 0.8,
  },
  westBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
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
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
    textAlign: 'center',
  },
  section: {
    marginTop: 24,
    gap: 12,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.5,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 0,
    marginTop: -4,
  },
  featuredSection: {
    marginTop: 14,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 18,
    gap: 10,
  },
  featuredGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  featuredCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  featuredCardContent: {
    flex: 1,
    position: 'relative',
  },
  featuredImageFrame: {
    flex: 1,
    minHeight: 0,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredTextBlock: {
    paddingHorizontal: 10,
    paddingTop: 7,
    paddingBottom: 10,
    minHeight: 76,
  },
  featuredNom: { fontSize: 15, fontWeight: '800', letterSpacing: 0.3 },
  featuredNomTablet: { fontSize: 19 },
  featuredPouvoir: { color: 'rgba(255,255,255,0.82)', fontSize: 11, marginTop: 3, lineHeight: 15 },
  featuredPouvoirTablet: { fontSize: 13, lineHeight: 18 },
  ctaButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 10,
  },
  ctaText: { maxWidth: 130, flexShrink: 1, fontSize: 12, fontWeight: '700', letterSpacing: 0.2, lineHeight: 15 },
  quizButton: {
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  quizButtonText: { fontSize: 15, fontWeight: '600', letterSpacing: 0.3 },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  statValue: { fontSize: 24, fontWeight: '800' },
  statLabel: { fontSize: 10, marginTop: 2, textAlign: 'center', letterSpacing: 0.3, fontWeight: '500' },
});
