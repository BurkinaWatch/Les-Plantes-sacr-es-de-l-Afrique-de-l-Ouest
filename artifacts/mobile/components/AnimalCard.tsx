import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { useColors } from '@/hooks/useColors';
import type { Animal } from '@/data/animals';

interface Props {
  animal: Animal;
  compact?: boolean;
  numColumns?: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  Mammifères: 'MAMMIFÈRE',
  Oiseaux: 'OISEAU',
  Reptiles: 'REPTILE',
  Amphibiens: 'AMPHIBIEN',
  Aquatiques: 'AQUATIQUE',
};

const ANIMAL_IMAGES: Record<string, any> = {
  lion: require('@/assets/images/lion.png'),
  elephant: require('@/assets/images/elephant.png'),
  leopard: require('@/assets/images/leopard.png'),
  crocodile: require('@/assets/images/crocodile.png'),
  aigle: require('@/assets/images/aigle.png'),
  serpent: require('@/assets/images/serpent.png'),
  grenouille: require('@/assets/images/grenouille.png'),
  hippopotame: require('@/assets/images/hippopotame.png'),
  panthere: require('@/assets/images/panthere.png'),
  cigogne: require('@/assets/images/cigogne.png'),
  tortue: require('@/assets/images/tortue.png'),
  cameleon: require('@/assets/images/cameleon.png'),
  vautour: require('@/assets/images/vautour.png'),
  'poisson-chat': require('@/assets/images/poisson-chat.png'),
  hyene: require('@/assets/images/hyene.png'),
  lezard: require('@/assets/images/lezard.png'),
  singe: require('@/assets/images/singe.png'),
  souris: require('@/assets/images/souris.png'),
  calao: require('@/assets/images/calao.png'),
  cheval: require('@/assets/images/cheval.png'),
  iguane: require('@/assets/images/iguane.png'),
  chevre: require('@/assets/images/chevre.png'),
  pintade: require('@/assets/images/pintade.png'),
  lievre: require('@/assets/images/lievre.png'),
  colombe: require('@/assets/images/colombe.png'),
  poisson: require('@/assets/images/poisson.png'),
  cerf: require('@/assets/images/cerf.png'),
  chien: require('@/assets/images/chien.png'),
  ane: require('@/assets/images/ane.png'),
  antilope: require('@/assets/images/antilope.png'),
  tatou: require('@/assets/images/tatou.png'),
  poulet: require('@/assets/images/poulet.png'),
  cochon: require('@/assets/images/cochon.png'),
  pigeon: require('@/assets/images/pigeon.png'),
  lapin: require('@/assets/images/lapin.png'),
  'porc-epic': require('@/assets/images/porc-epic.png'),
  rat: require('@/assets/images/rat.png'),
  escargot: require('@/assets/images/escargot.png'),
  ecureuil: require('@/assets/images/ecureuil.png'),
  cygne: require('@/assets/images/cygne.png'),
  gorille: require('@/assets/images/gorille.png'),
  buffle: require('@/assets/images/buffle.png'),
  rhinoceros: require('@/assets/images/rhinoceros.png'),
  guepard: require('@/assets/images/guepard.png'),
  gnou: require('@/assets/images/gnou.png'),
  araignee: require('@/assets/images/araignee.png'),
  scorpion: require('@/assets/images/scorpion.png'),
  pangolin: require('@/assets/images/pangolin.png'),
  perroquet: require('@/assets/images/perroquet.png'),
  ibis: require('@/assets/images/ibis.png'),
  flamant: require('@/assets/images/flamant.png'),
  heron: require('@/assets/images/heron.png'),
  zebre: require('@/assets/images/zebre.png'),
  girafe: require('@/assets/images/girafe.png'),
  mangouste: require('@/assets/images/mangouste.png'),
  'phacochère': require('@/assets/images/phacochere.png'),
  'oryctérope': require('@/assets/images/oryctelope.png'),
};

export function AnimalCard({ animal, compact = false, numColumns = 2 }: Props) {
  const colors = useColors();
  const router = useRouter();
  const animalImage = ANIMAL_IMAGES[animal.id];

  // Scale card dimensions based on number of columns
  // More columns → smaller cards, so keep height proportional
  const cardHeight = compact ? 90 : numColumns >= 4 ? 105 : numColumns === 3 ? 120 : 115;
  const imgSize = compact ? 60 : numColumns >= 4 ? 70 : numColumns === 3 ? 88 : 78;
  const nomSize = compact ? 14 : numColumns >= 4 ? 14 : numColumns === 3 ? 16 : 17;

  return (
    <Pressable
      style={({ pressed }) => [styles.container, compact && styles.containerCompact, { opacity: pressed ? 0.85 : 1 }]}
      onPress={() => router.push(`/animal/${animal.id}` as any)}
    >
      <LinearGradient
        colors={[animal.couleur, animal.couleurSecondaire]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, compact && styles.gradientCompact, { height: cardHeight }]}
      >
        <View style={styles.patternOverlay}>
          <View style={[styles.circle1, { borderColor: 'rgba(255,255,255,0.15)' }]} />
          <View style={[styles.circle2, { borderColor: 'rgba(255,255,255,0.10)' }]} />
          <View style={[styles.diamond, { borderColor: 'rgba(255,255,255,0.12)' }]} />
        </View>

        {animalImage && (
          <Image
            source={animalImage}
            style={[styles.animalImage, { width: imgSize, height: imgSize }]}
            resizeMode="contain"
          />
        )}

        <View style={styles.content}>
          <View style={styles.badge}>
            <Text style={[styles.badgeText, { color: colors.ivory }]}>
              {CATEGORY_LABELS[animal.categorie] ?? animal.categorie.toUpperCase()}
            </Text>
          </View>

          <View style={styles.levelRow}>
            {Array.from({ length: 5 }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.levelDot,
                  {
                    backgroundColor:
                      i < animal.niveauSpirituel
                        ? 'rgba(255,255,255,0.9)'
                        : 'rgba(255,255,255,0.25)',
                  },
                ]}
              />
            ))}
          </View>

          <Text style={[styles.nom, { fontSize: nomSize }, compact && styles.nomCompact]}>{animal.nom}</Text>

          {!compact && (
            <Text style={styles.pouvoir} numberOfLines={1}>
              {animal.pouvoirs[0]}
            </Text>
          )}
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 6,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      web: { boxShadow: '0px 2px 6px rgba(0,0,0,0.30)' },
      default: {
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
    }),
  },
  containerCompact: {
    margin: 4,
  },
  gradient: {
    height: 115,
    padding: 11,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  gradientCompact: {
    height: 90,
    padding: 10,
  },
  patternOverlay: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  animalImage: {
    position: 'absolute',
    right: -4,
    bottom: -6,
    width: 78,
    height: 78,
    opacity: 0.22,
  },
  animalImageCompact: {
    width: 60,
    height: 60,
    right: -2,
    bottom: -4,
  },
  circle1: {
    position: 'absolute',
    right: -20,
    top: -20,
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1.5,
  },
  circle2: {
    position: 'absolute',
    right: 10,
    bottom: -30,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
  },
  diamond: {
    position: 'absolute',
    left: -15,
    bottom: -15,
    width: 60,
    height: 60,
    borderWidth: 1,
    transform: [{ rotate: '45deg' }],
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700' as const,
    letterSpacing: 1.2,
  },
  levelRow: {
    flexDirection: 'row',
    gap: 3,
    marginTop: 6,
  },
  levelDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  nom: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  nomCompact: {
    fontSize: 14,
  },
  pouvoir: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500' as const,
    letterSpacing: 0.3,
  },
});
