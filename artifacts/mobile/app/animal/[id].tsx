import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  type ImageSourcePropType,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  type GestureResponderEvent,
  useWindowDimensions,
  View,
} from 'react-native';
import PLANT_IMAGES from '@/constants/plantImages';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useApp } from '@/context/AppContext';
import { SacredIcon, iconForCategory, type SacredIconName } from '@/components/SacredIcon';
import { getPlanteById, PLANTS } from '@/data/animals';
import type { Element } from '@/data/animals';
import { useColors } from '@/hooks/useColors';

const ELEMENT_ICONS: Record<Element, SacredIconName> = {
  Feu: 'flame',
  Eau: 'water',
  Terre: 'leaf',
  Air: 'wind',
};

const ELEMENT_COLORS: Record<Element, string> = {
  Feu: '#E05A2B',
  Eau: '#2E7DB5',
  Terre: '#5C7A3E',
  Air: '#7A9EC0',
};

function Section({ label, color }: { label: string; color: string }) {
  return (
    <Text style={[styles.sectionLabel, { color }]}>{label}</Text>
  );
}

function PlantImageViewer({
  visible,
  source,
  plantName,
  fallbackIcon,
  accentColor,
  backgroundColor,
  foregroundColor,
  topInset,
  bottomInset,
  onClose,
}: {
  visible: boolean;
  source?: ImageSourcePropType;
  plantName: string;
  fallbackIcon: SacredIconName;
  accentColor: string;
  backgroundColor: string;
  foregroundColor: string;
  topInset: number;
  bottomInset: number;
  onClose: () => void;
}) {
  const { width, height } = useWindowDimensions();
  const imageSize = Math.max(1, Math.min(width, height - topInset - bottomInset - 136));
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const offsetRef = useRef({ x: 0, y: 0 });
  const dragOriginRef = useRef({ x: 0, y: 0 });
  const pinchStartRef = useRef({ distance: 0, scale: 1 });

  const resetZoom = useCallback(() => {
    scaleRef.current = 1;
    offsetRef.current = { x: 0, y: 0 };
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (visible) resetZoom();
  }, [visible, source, resetZoom]);

  const zoomBy = useCallback((amount: number) => {
    const nextScale = Math.min(4, Math.max(1, scaleRef.current + amount));
    scaleRef.current = nextScale;
    setScale(nextScale);
    if (nextScale === 1) {
      offsetRef.current = { x: 0, y: 0 };
      setOffset({ x: 0, y: 0 });
    }
  }, []);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (event) =>
          scaleRef.current > 1.01 && event.nativeEvent.touches.length > 0,
        onMoveShouldSetPanResponder: (event) =>
          event.nativeEvent.touches.length > 1 || scaleRef.current > 1.01,
        onPanResponderGrant: (event) => {
          dragOriginRef.current = offsetRef.current;
          const touches = event.nativeEvent.touches;
          if (touches.length > 1) {
            const dx = touches[0].pageX - touches[1].pageX;
            const dy = touches[0].pageY - touches[1].pageY;
            pinchStartRef.current = {
              distance: Math.hypot(dx, dy),
              scale: scaleRef.current,
            };
          }
        },
        onPanResponderMove: (event, gestureState) => {
          const touches = event.nativeEvent.touches;
          if (touches.length > 1) {
            const dx = touches[0].pageX - touches[1].pageX;
            const dy = touches[0].pageY - touches[1].pageY;
            const distance = Math.hypot(dx, dy);
            if (pinchStartRef.current.distance === 0) {
              pinchStartRef.current = { distance, scale: scaleRef.current };
              return;
            }

            const nextScale = Math.min(
              4,
              Math.max(1, pinchStartRef.current.scale * (distance / pinchStartRef.current.distance)),
            );
            scaleRef.current = nextScale;
            setScale(nextScale);
            return;
          }

          if (scaleRef.current <= 1.01) return;
          const maxOffset = (imageSize * (scaleRef.current - 1)) / 2;
          const nextOffset = {
            x: Math.max(-maxOffset, Math.min(maxOffset, dragOriginRef.current.x + gestureState.dx)),
            y: Math.max(-maxOffset, Math.min(maxOffset, dragOriginRef.current.y + gestureState.dy)),
          };
          offsetRef.current = nextOffset;
          setOffset(nextOffset);
        },
        onPanResponderRelease: () => {
          pinchStartRef.current.distance = 0;
          if (scaleRef.current <= 1.02) resetZoom();
        },
        onPanResponderTerminate: () => {
          pinchStartRef.current.distance = 0;
        },
        onPanResponderTerminationRequest: () => false,
      }),
    [imageSize, resetZoom],
  );

  return (
    <Modal
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.viewerContainer,
          { backgroundColor, paddingTop: topInset, paddingBottom: bottomInset },
        ]}
      >
        <View style={styles.viewerHeader}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Fermer l’image"
            testID="plant-image-viewer-close"
            onPress={onClose}
            style={styles.viewerIconButton}
          >
            <SacredIcon name="close" size={22} color={foregroundColor} />
          </Pressable>
          <Text style={[styles.viewerTitle, { color: foregroundColor }]} numberOfLines={1}>
            {plantName}
          </Text>
          <View style={styles.viewerHeaderSpacer} />
        </View>

        <View style={styles.viewerStage} {...panResponder.panHandlers}>
          <View
            style={[
              styles.viewerImageFrame,
              {
                width: imageSize,
                height: imageSize,
                transform: [
                  { translateX: offset.x },
                  { translateY: offset.y },
                  { scale },
                ],
              },
            ]}
          >
            {source ? (
              <Image source={source} resizeMode="contain" style={styles.viewerImage} />
            ) : (
              <View style={styles.viewerFallback}>
                <SacredIcon name={fallbackIcon} size={88} color={accentColor} />
                <Text style={[styles.viewerFallbackText, { color: foregroundColor }]}>
                  Illustration indisponible
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.viewerFooter}>
          <Text style={[styles.viewerHint, { color: foregroundColor }]}>
            Pincez pour zoomer · Faites glisser pour déplacer
          </Text>
          <View style={styles.viewerControls}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Réduire l’image"
              testID="plant-image-zoom-out"
              onPress={() => zoomBy(-0.5)}
              style={styles.viewerIconButton}
            >
              <Text style={[styles.viewerZoomSymbol, { color: foregroundColor }]}>−</Text>
            </Pressable>
            <Text style={[styles.viewerZoomValue, { color: accentColor }]}>
              {Math.round(scale * 100)}%
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Agrandir l’image"
              testID="plant-image-zoom-in"
              onPress={() => zoomBy(0.5)}
              style={styles.viewerIconButton}
            >
              <SacredIcon name="plus" size={22} color={foregroundColor} />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function PlanteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const { isFavorite, toggleFavorite } = useApp();
  const scrollRef = useRef<ScrollView>(null);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);

  // Carré 1:1, affiché entièrement sur tout support (téléphone et tablette).
  const heroImgHeight = Math.min(Math.max(screenWidth * 0.82, 260), 460);

  const plante = getPlanteById(id ?? '');
  const plantIndex = PLANTS.findIndex((plant) => plant.id === id);
  const topPad = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [id]);

  const navigatePlant = useCallback(
    (direction: -1 | 1) => {
      const nextPlant = PLANTS[plantIndex + direction];
      if (!nextPlant) return;
      setImageViewerVisible(false);
      router.replace(`/animal/${nextPlant.id}` as any);
    },
    [plantIndex, router],
  );

  if (!plante) {
    return (
      <View style={[styles.notFound, { backgroundColor: colors.background }]}>
        <Text style={[styles.notFoundText, { color: colors.ivory }]}>Plante introuvable</Text>
        <Pressable onPress={() => router.back()}>
         <View style={styles.backLinkRow}>
           <SacredIcon name="arrow-left" size={17} color={colors.gold} />
           <Text style={[styles.backLink, { color: colors.gold }]}>Retour</Text>
         </View>
        </Pressable>
      </View>
    );
  }

  const fav = isFavorite(plante.id);
  const elemColor = ELEMENT_COLORS[plante.element];
  const categoryIcon = iconForCategory(plante.categorie);

  function handleFavorite() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleFavorite(plante!.id);
  }

  return (
    <>
      <ScrollView
        ref={scrollRef}
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={{ paddingBottom: 60 + insets.bottom }}
        showsVerticalScrollIndicator={false}
        onTouchStart={(event: GestureResponderEvent) => {
          const touch = event.nativeEvent.touches[0];
          swipeStartRef.current = touch
            ? { x: touch.pageX, y: touch.pageY }
            : null;
        }}
        onTouchEnd={(event: GestureResponderEvent) => {
          const start = swipeStartRef.current;
          const touch = event.nativeEvent.changedTouches[0];
          swipeStartRef.current = null;
          if (!start || !touch) return;

          const deltaX = touch.pageX - start.x;
          const deltaY = touch.pageY - start.y;
          if (Math.abs(deltaX) >= 72 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
            navigatePlant(deltaX < 0 ? 1 : -1);
          }
        }}
        onTouchCancel={() => {
          swipeStartRef.current = null;
        }}
      >
      {/* ── HERO ── */}
      <View style={[styles.heroWrap, { paddingTop: topPad }]}>
        <LinearGradient
          colors={[plante.couleur, plante.couleurSecondaire, colors.deepBrown]}
          style={styles.heroGrad}
        >
          <View style={styles.heroDecor}>
            <View style={[styles.hd1, { borderColor: 'rgba(255,255,255,0.12)' }]} />
            <View style={[styles.hd2, { borderColor: 'rgba(255,255,255,0.08)' }]} />
            <View style={[styles.hd3, { borderColor: 'rgba(255,255,255,0.05)' }]} />
          </View>

          <View style={[styles.navRow, { paddingTop: 12 }]}>
            <Pressable
              style={({ pressed }) => [styles.navBtn, { backgroundColor: 'rgba(0,0,0,0.3)', opacity: pressed ? 0.7 : 1 }]}
              onPress={() => router.back()}
            >
              <SacredIcon name="arrow-left" size={20} color="#FFFFFF" />
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.navBtn,
                { backgroundColor: fav ? colors.gold : 'rgba(0,0,0,0.3)', opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={handleFavorite}
            >
              <SacredIcon name="heart" size={20} color={fav ? colors.deepBrown : '#FFFFFF'} />
            </Pressable>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Afficher l’image de ${plante.nom} en plein écran`}
            testID="plant-detail-image"
            disabled={!PLANT_IMAGES[plante.id]}
            onPress={() => setImageViewerVisible(true)}
            style={[styles.planteImagePlaceholder, { height: heroImgHeight }]}
          >
            {PLANT_IMAGES[plante.id] ? (
              <Image
                source={PLANT_IMAGES[plante.id]}
                style={styles.planteImage}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.phInner}>
                <View style={[styles.phCircle, { borderColor: 'rgba(255,255,255,0.3)' }]} />
                <SacredIcon name={categoryIcon} size={80} color="rgba(255,255,255,0.85)" />
              </View>
            )}
            {PLANT_IMAGES[plante.id] && (
              <View pointerEvents="none" style={styles.zoomHint}>
                <SacredIcon name="search" size={15} color="#FFFFFF" />
                <Text style={styles.zoomHintText}>Agrandir</Text>
              </View>
            )}
          </Pressable>

          <LinearGradient
            colors={['transparent', plante.couleurSecondaire, colors.deepBrown]}
            style={[styles.imageFade, { pointerEvents: 'none' }]}
          />

          <View style={styles.heroInfo}>
            <Text style={[styles.categorie, { color: 'rgba(255,255,255,0.65)' }]}>
              {plante.categorie.toUpperCase()}
            </Text>
            <Text style={[styles.planteNom, { color: '#FFFFFF' }]}>{plante.nom}</Text>
            <Text style={[styles.regionText, { color: 'rgba(255,255,255,0.6)' }]}>
              {plante.regionOrigine}
            </Text>

            <View style={styles.levelRow}>
              {Array.from({ length: 5 }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.levelDot,
                    {
                      backgroundColor:
                        i < plante.niveauSpirituel
                          ? 'rgba(255,255,255,0.9)'
                          : 'rgba(255,255,255,0.2)',
                      width: i < plante.niveauSpirituel ? 22 : 8,
                    },
                  ]}
                />
              ))}
              <Text style={[styles.levelLabel, { color: 'rgba(255,255,255,0.6)' }]}>
                Niveau spirituel
              </Text>
            </View>

            <View style={styles.plantPager}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Plante précédente"
                testID="plant-previous"
                disabled={plantIndex <= 0}
                onPress={() => navigatePlant(-1)}
                style={({ pressed }) => [
                  styles.pagerButton,
                  { opacity: plantIndex <= 0 ? 0.35 : pressed ? 0.65 : 1 },
                ]}
              >
                <SacredIcon name="arrow-left" size={18} color="#FFFFFF" />
              </Pressable>
              <View style={styles.pagerCaption}>
                <Text style={[styles.pagerCount, { color: 'rgba(255,255,255,0.9)' }]}>
                  {plantIndex + 1} / {PLANTS.length}
                </Text>
                <Text style={[styles.pagerHint, { color: 'rgba(255,255,255,0.6)' }]}>
                  Glisser pour changer de plante
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Plante suivante"
                testID="plant-next"
                disabled={plantIndex >= PLANTS.length - 1}
                onPress={() => navigatePlant(1)}
                style={({ pressed }) => [
                  styles.pagerButton,
                  { opacity: plantIndex >= PLANTS.length - 1 ? 0.35 : pressed ? 0.65 : 1 },
                ]}
              >
                <SacredIcon name="chevron-right" size={20} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={{ padding: 20, gap: 20 }}>

        {/* ── IDENTITÉ SCIENTIFIQUE ── */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Section label="IDENTITÉ" color={colors.gold} />
          <View style={styles.identityGrid}>
            <View style={styles.identityItem}>
              <Text style={[styles.identityKey, { color: colors.mutedForeground }]}>Français</Text>
              <Text style={[styles.identityVal, { color: colors.ivory }]}>{plante.nom}</Text>
            </View>
            <View style={styles.identityItem}>
              <Text style={[styles.identityKey, { color: colors.mutedForeground }]}>Anglais</Text>
              <Text style={[styles.identityVal, { color: colors.ivory }]}>{plante.nomAnglais}</Text>
            </View>
            <View style={[styles.identityItem, { flex: 2 }]}>
              <Text style={[styles.identityKey, { color: colors.mutedForeground }]}>Nom scientifique</Text>
              <Text style={[styles.identityValItalic, { color: colors.ivory }]}>{plante.nomScientifique}</Text>
            </View>
          </View>
        </View>

        {/* ── ÉLÉMENT ── */}
        <LinearGradient
          colors={[elemColor + '30', colors.card]}
          style={[styles.elementCard, { borderColor: elemColor + '60' }]}
        >
          <SacredIcon name={ELEMENT_ICONS[plante.element]} size={38} color={elemColor} accessibilityLabel={plante.element} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.elementLabel, { color: elemColor }]}>ÉLÉMENT ASSOCIÉ</Text>
            <Text style={[styles.elementName, { color: colors.ivory }]}>{plante.element}</Text>
          </View>
        </LinearGradient>

        {/* ── VERTUS MÉDICINALES ── */}
        {plante.vertus && plante.vertus.length > 0 && (
          <View style={[styles.card, { backgroundColor: '#5C7A3E15', borderColor: '#5C7A3E40' }]}>
            <Section label="VERTUS & USAGES TRADITIONNELS" color="#5C7A3E" />
            <View style={styles.chipsWrap}>
              {plante.vertus.map((v) => (
                <View key={v} style={[styles.chip, { backgroundColor: '#5C7A3E18', borderColor: '#5C7A3E50' }]}>
                  <View style={[styles.chipDot, { backgroundColor: '#5C7A3E' }]} />
                  <Text style={[styles.chipText, { color: colors.ivory }]}>{v}</Text>
                </View>
              ))}
            </View>
            {plante.usagesTraditionnels && plante.usagesTraditionnels.length > 0 && (
              <>
                <Text style={[styles.subSectionLabel, { color: colors.mutedForeground }]}>USAGES TRADITIONNELS</Text>
                {plante.usagesTraditionnels.map((u, i) => (
                  <View key={i} style={styles.usageItem}>
                    <SacredIcon name="circle" size={9} color="#5C7A3E" />
                    <Text style={[styles.usageText, { color: colors.ivory }]}>{u}</Text>
                  </View>
                ))}
              </>
            )}
          </View>
        )}

        {/* ── DESCRIPTION ── */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Section label="DESCRIPTION" color={colors.gold} />
          <Text style={[styles.cardText, { color: colors.ivory }]}>{plante.description}</Text>
        </View>

        {/* ── SYMBOLIQUE AFRICAINE ── */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Section label="SYMBOLIQUE AFRICAINE" color={colors.gold} />
          <Text style={[styles.cardText, { color: colors.ivory }]}>{plante.symboliqueAfricaine}</Text>
        </View>

        {/* ── SYMBOLIQUE SPIRITUELLE ── */}
        <LinearGradient
          colors={[plante.couleur + '20', colors.card]}
          style={[styles.card, { borderColor: plante.couleur + '40' }]}
        >
          <Section label="SYMBOLIQUE SPIRITUELLE" color={plante.couleur} />
          <Text style={[styles.cardText, { color: colors.ivory }]}>{plante.symboliqueSpirirtuelle}</Text>
        </LinearGradient>

        {/* ── QUALITÉS ── */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Section label="QUALITÉS" color="#5DBF7A" />
          <View style={styles.chipsWrap}>
            {plante.qualites.map((q) => (
              <View key={q} style={[styles.chip, { backgroundColor: '#5DBF7A18', borderColor: '#5DBF7A50' }]}>
                <View style={[styles.chipDot, { backgroundColor: '#5DBF7A' }]} />
                <Text style={[styles.chipText, { color: colors.ivory }]}>{q}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── DÉFAUTS ── */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Section label="DÉFIS & ZONES D'OMBRE" color="#D46B6B" />
          <View style={styles.chipsWrap}>
            {plante.defauts.map((d) => (
              <View key={d} style={[styles.chip, { backgroundColor: '#D46B6B18', borderColor: '#D46B6B50' }]}>
                <View style={[styles.chipDot, { backgroundColor: '#D46B6B' }]} />
                <Text style={[styles.chipText, { color: colors.ivory }]}>{d}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── POUVOIRS SACRÉS ── */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Section label="POUVOIRS SACRÉS" color={colors.gold} />
          <View style={styles.chipsWrap}>
            {plante.pouvoirs.map((p) => (
              <View key={p} style={[styles.chip, { backgroundColor: plante.couleur + '25', borderColor: plante.couleur + '55' }]}>
                <View style={[styles.chipDot, { backgroundColor: plante.couleur }]} />
                <Text style={[styles.chipText, { color: colors.ivory }]}>{p}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── PROVERBES ── */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Section label="PROVERBES AFRICAINS" color={colors.gold} />
          {plante.proverbes.map((p, i) => (
            <View key={i} style={[styles.proverbeItem, { borderLeftColor: plante.couleur }]}>
              <Text style={[styles.proverbeText, { color: colors.ivory }]}>"{p}"</Text>
            </View>
          ))}
        </View>

        {/* ── LÉGENDES ── */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Section label="LÉGENDES TRADITIONNELLES" color={colors.gold} />
          {plante.legendes.map((l, i) => (
            <View key={i} style={styles.legendeItem}>
                <SacredIcon name={i === 0 ? 'sparkles' : 'circle'} size={18} color={plante.couleur} />
              <Text style={[styles.legendeText, { color: colors.ivory }]}>{l}</Text>
            </View>
          ))}
        </View>

        {/* ── ENSEIGNEMENTS ── */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Section label="ENSEIGNEMENTS" color={colors.gold} />
          {plante.enseignements.map((e, i) => (
            <View key={i} style={styles.enseignementItem}>
              <Text style={[styles.ensNum, { color: plante.couleur }]}>{String(i + 1).padStart(2, '0')}</Text>
              <Text style={[styles.ensText, { color: colors.ivory }]}>{e}</Text>
            </View>
          ))}
        </View>

        {/* ── CONSEILS DE VIE ── */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Section label="CONSEILS DE VIE" color={colors.terracotta} />
          {plante.conseilsDeVie.map((c, i) => (
            <View key={i} style={styles.conseilItem}>
              <SacredIcon name="sparkles" size={15} color={colors.terracotta} />
              <Text style={[styles.conseilText, { color: colors.ivory }]}>{c}</Text>
            </View>
          ))}
        </View>

        {/* ── CITATION SACRÉE ── */}
        <LinearGradient
          colors={[plante.couleur + '40', colors.card]}
          style={[styles.citationCard, { borderColor: plante.couleur + '50' }]}
        >
          <Text style={[styles.citationLabel, { color: plante.couleur }]}>CITATION SACRÉE</Text>
          <Text style={[styles.citationText, { color: colors.ivory }]}>"{plante.citation}"</Text>
        </LinearGradient>

        {/* ── ENSEIGNEMENT DU JOUR ── */}
        <View style={[styles.card, { backgroundColor: plante.couleur + '15', borderColor: plante.couleur + '40' }]}>
          <Text style={[styles.sectionLabel, { color: plante.couleur }]}>
            CE QUE LE {plante.nom.toUpperCase()} VOUS ENSEIGNE AUJOURD'HUI
          </Text>
          <Text style={[styles.todayText, { color: colors.ivory }]}>{plante.enseignementDuJour}</Text>
        </View>

        {/* ── FAVORI ── */}
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.88 : 1 }]}
          onPress={handleFavorite}
        >
          <View style={[styles.favBtn, { backgroundColor: fav ? colors.gold + '20' : colors.card, borderColor: fav ? colors.gold : colors.border }]}>
            <SacredIcon name="heart" size={18} color={fav ? colors.gold : colors.mutedForeground} />
            <Text style={[styles.favBtnText, { color: fav ? colors.gold : colors.mutedForeground }]}>
              {fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            </Text>
          </View>
        </Pressable>
      </View>
      </ScrollView>
      <PlantImageViewer
        visible={imageViewerVisible}
        source={PLANT_IMAGES[plante.id]}
        plantName={plante.nom}
        fallbackIcon={categoryIcon}
        accentColor={plante.couleur}
        backgroundColor={colors.deepBrown}
        foregroundColor={colors.ivory}
        topInset={insets.top}
        bottomInset={insets.bottom}
        onClose={() => setImageViewerVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  notFoundText: { fontSize: 18, fontWeight: '600' as const },
  backLink: { fontSize: 16, fontWeight: '600' as const },
  backLinkRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },

  heroWrap: { overflow: 'hidden' },
  heroGrad: { paddingHorizontal: 20, paddingBottom: 0, overflow: 'hidden', position: 'relative', minHeight: 380 },
  heroDecor: { ...StyleSheet.absoluteFill },
  hd1: { position: 'absolute', right: -50, top: 60, width: 250, height: 250, borderRadius: 125, borderWidth: 1 },
  hd2: { position: 'absolute', right: -30, top: 40, width: 320, height: 320, borderRadius: 160, borderWidth: 1 },
  hd3: { position: 'absolute', left: -60, bottom: 20, width: 200, height: 200, borderRadius: 100, borderWidth: 1 },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', zIndex: 10 },
  navBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  planteImagePlaceholder: { width: '100%', borderRadius: 18, marginTop: 16, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: 'rgba(0,0,0,0.18)' },
  planteImage: { width: '100%', height: '100%', borderRadius: 18 },
  zoomHint: { position: 'absolute', right: 12, bottom: 12, flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 16, paddingHorizontal: 11, paddingVertical: 7 },
  zoomHintText: { color: '#FFFFFF', fontSize: 11, fontWeight: '600' as const },
  phInner: { alignItems: 'center', justifyContent: 'center' },
  phCircle: { position: 'absolute', width: 120, height: 120, borderRadius: 60, borderWidth: 1.5 },
  phIcon: { fontSize: 80 },
  imageFade: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 140, zIndex: 2 },
  heroInfo: { paddingBottom: 24, zIndex: 3 },
  categorie: { fontSize: 10, fontWeight: '700' as const, letterSpacing: 2.5, marginBottom: 4 },
  planteNom: { fontSize: 44, fontWeight: '800' as const, letterSpacing: 1 },
  regionText: { fontSize: 13, marginTop: 4, fontWeight: '400' as const },
  levelRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 12 },
  levelDot: { height: 5, borderRadius: 2.5 },
  levelLabel: { fontSize: 11, marginLeft: 6, fontWeight: '500' as const },
  plantPager: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 },
  pagerButton: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.28)' },
  pagerCaption: { flex: 1, alignItems: 'center', gap: 3 },
  pagerCount: { fontSize: 12, fontWeight: '700' as const, letterSpacing: 1 },
  pagerHint: { fontSize: 10, fontWeight: '500' as const },

  viewerContainer: { flex: 1 },
  viewerHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 8, gap: 12 },
  viewerIconButton: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.1)' },
  viewerTitle: { flex: 1, fontSize: 16, fontWeight: '600' as const, textAlign: 'center' },
  viewerHeaderSpacer: { width: 46 },
  viewerStage: { flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  viewerImageFrame: { alignItems: 'center', justifyContent: 'center' },
  viewerImage: { width: '100%', height: '100%' },
  viewerFallback: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  viewerFallbackText: { fontSize: 14, fontWeight: '500' as const },
  viewerFooter: { alignItems: 'center', paddingHorizontal: 18, paddingTop: 8, paddingBottom: 12, gap: 12 },
  viewerHint: { fontSize: 12, opacity: 0.72, textAlign: 'center' },
  viewerControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 22 },
  viewerZoomValue: { minWidth: 50, textAlign: 'center', fontSize: 13, fontWeight: '700' as const },
  viewerZoomSymbol: { fontSize: 27, fontWeight: '400' as const, lineHeight: 29 },

  card: { borderRadius: 16, padding: 18, borderWidth: 1, gap: 12 },
  sectionLabel: { fontSize: 10, fontWeight: '700' as const, letterSpacing: 2.5 },
  subSectionLabel: { fontSize: 9, fontWeight: '700' as const, letterSpacing: 2, marginTop: 8 },
  cardText: { fontSize: 15, lineHeight: 26, fontWeight: '400' as const },

  identityGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  identityItem: { flex: 1, minWidth: 100 },
  identityKey: { fontSize: 10, fontWeight: '600' as const, letterSpacing: 1, marginBottom: 2 },
  identityVal: { fontSize: 15, fontWeight: '600' as const },
  identityValItalic: { fontSize: 14, fontWeight: '400' as const, fontStyle: 'italic' },

  elementCard: { borderRadius: 16, padding: 18, borderWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 16 },
  elementIcon: { fontSize: 36 },
  elementLabel: { fontSize: 10, fontWeight: '700' as const, letterSpacing: 2.5, marginBottom: 2 },
  elementName: { fontSize: 22, fontWeight: '700' as const },

  usageItem: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', paddingVertical: 2 },
  usageDot: { fontSize: 14, fontWeight: '700' as const, width: 16 },
  usageText: { flex: 1, fontSize: 13, lineHeight: 20 },

  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, borderWidth: 1, gap: 7 },
  chipDot: { width: 6, height: 6, borderRadius: 3 },
  chipText: { fontSize: 13, fontWeight: '600' as const },

  proverbeItem: { borderLeftWidth: 3, paddingLeft: 14, paddingVertical: 6 },
  proverbeText: { fontSize: 14, fontStyle: 'italic', lineHeight: 22 },

  legendeItem: { flexDirection: 'row', gap: 12, alignItems: 'flex-start', paddingVertical: 4 },
  legendeNum: { fontSize: 18, paddingTop: 2 },
  legendeText: { flex: 1, fontSize: 14, lineHeight: 23, fontWeight: '400' as const },

  enseignementItem: { flexDirection: 'row', gap: 14, alignItems: 'flex-start', paddingVertical: 6 },
  ensNum: { fontSize: 12, fontWeight: '800' as const, fontStyle: 'italic', minWidth: 24, paddingTop: 2 },
  ensText: { flex: 1, fontSize: 14, lineHeight: 22, fontWeight: '400' as const },

  conseilItem: { flexDirection: 'row', gap: 12, alignItems: 'flex-start', paddingVertical: 4 },
  conseilBullet: { fontSize: 14, paddingTop: 2 },
  conseilText: { flex: 1, fontSize: 14, lineHeight: 22 },

  citationCard: { borderRadius: 16, padding: 20, borderWidth: 1, gap: 10, alignItems: 'center' },
  citationLabel: { fontSize: 10, fontWeight: '700' as const, letterSpacing: 2.5 },
  citationText: { fontSize: 17, fontStyle: 'italic', textAlign: 'center', lineHeight: 26, fontWeight: '500' as const },

  todayText: { fontSize: 15, lineHeight: 24, fontWeight: '400' as const },
  favBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 14, borderWidth: 1, gap: 10 },
  favBtnText: { fontSize: 15, fontWeight: '600' as const },
});
