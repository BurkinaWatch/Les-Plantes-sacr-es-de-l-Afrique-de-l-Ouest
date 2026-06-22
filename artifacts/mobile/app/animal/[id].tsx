import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PLANT_IMAGES from '@/constants/plantImages';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import { useApp } from '@/context/AppContext';
import { getPlanteById } from '@/data/animals';
import type { Element } from '@/data/animals';
import { useColors } from '@/hooks/useColors';

const ELEMENT_ICONS: Record<Element, string> = {
  Feu: '🔥',
  Eau: '💧',
  Terre: '🌿',
  Air: '💨',
};

const ELEMENT_COLORS: Record<Element, string> = {
  Feu: '#E05A2B',
  Eau: '#2E7DB5',
  Terre: '#5C7A3E',
  Air: '#7A9EC0',
};

const CATEGORY_ICONS: Record<string, string> = {
  'Arbres Sacrés': '🌳',
  'Plantes Médicinales': '🌿',
  'Plantes Alimentaires': '🫘',
  'Plantes Rituelles': '✦',
  'Herbes & Graminées': '🌾',
  'Palmiers': '🌴',
};

function Section({ label, color }: { label: string; color: string }) {
  return (
    <Text style={[styles.sectionLabel, { color }]}>{label}</Text>
  );
}

export default function PlanteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useApp();

  const plante = getPlanteById(id ?? '');
  const topPad = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;

  if (!plante) {
    return (
      <View style={[styles.notFound, { backgroundColor: colors.background }]}>
        <Text style={[styles.notFoundText, { color: colors.ivory }]}>Plante introuvable</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={[styles.backLink, { color: colors.gold }]}>← Retour</Text>
        </Pressable>
      </View>
    );
  }

  const fav = isFavorite(plante.id);
  const elemColor = ELEMENT_COLORS[plante.element];
  const categoryIcon = CATEGORY_ICONS[plante.categorie] ?? '🌿';

  function handleFavorite() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleFavorite(plante!.id);
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 60 + insets.bottom }}
      showsVerticalScrollIndicator={false}
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
              <Feather name="arrow-left" size={20} color="#FFFFFF" />
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.navBtn,
                { backgroundColor: fav ? colors.gold : 'rgba(0,0,0,0.3)', opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={handleFavorite}
            >
              <Feather name="heart" size={20} color={fav ? colors.deepBrown : '#FFFFFF'} />
            </Pressable>
          </View>

          <View style={styles.planteImagePlaceholder}>
            {PLANT_IMAGES[plante.id] ? (
              <Image
                source={PLANT_IMAGES[plante.id]}
                style={styles.planteImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.phInner}>
                <View style={[styles.phCircle, { borderColor: 'rgba(255,255,255,0.3)' }]} />
                <Text style={styles.phIcon}>{categoryIcon}</Text>
              </View>
            )}
          </View>

          <LinearGradient
            colors={['transparent', plante.couleurSecondaire, colors.deepBrown]}
            style={styles.imageFade}
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
          <Text style={styles.elementIcon}>{ELEMENT_ICONS[plante.element]}</Text>
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
                    <Text style={[styles.usageDot, { color: '#5C7A3E' }]}>◦</Text>
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
              <Text style={[styles.legendeNum, { color: plante.couleur }]}>
                {i === 0 ? '◈' : '◇'}
              </Text>
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
              <Text style={[styles.conseilBullet, { color: colors.terracotta }]}>✦</Text>
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
            <Feather name="heart" size={18} color={fav ? colors.gold : colors.mutedForeground} />
            <Text style={[styles.favBtnText, { color: fav ? colors.gold : colors.mutedForeground }]}>
              {fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            </Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  notFoundText: { fontSize: 18, fontWeight: '600' as const },
  backLink: { fontSize: 16, fontWeight: '600' as const },

  heroWrap: { overflow: 'hidden' },
  heroGrad: { paddingHorizontal: 20, paddingBottom: 0, overflow: 'hidden', position: 'relative', minHeight: 380 },
  heroDecor: { ...StyleSheet.absoluteFillObject },
  hd1: { position: 'absolute', right: -50, top: 60, width: 250, height: 250, borderRadius: 125, borderWidth: 1 },
  hd2: { position: 'absolute', right: -30, top: 40, width: 320, height: 320, borderRadius: 160, borderWidth: 1 },
  hd3: { position: 'absolute', left: -60, bottom: 20, width: 200, height: 200, borderRadius: 100, borderWidth: 1 },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', zIndex: 10 },
  navBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  planteImagePlaceholder: { width: '100%', height: 220, borderRadius: 18, marginTop: 16, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  planteImage: { width: '100%', height: '100%', borderRadius: 18 },
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
