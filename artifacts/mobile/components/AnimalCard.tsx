import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { useColors } from '@/hooks/useColors';
import PLANT_IMAGES from '@/constants/plantImages';
import type { Animal } from '@/data/animals';

interface Props {
  animal: Animal;
  compact?: boolean;
  numColumns?: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  'Arbres Sacrés': 'ARBRE SACRÉ',
  'Plantes Médicinales': 'MÉDICINAL',
  'Plantes Alimentaires': 'ALIMENTAIRE',
  'Plantes Rituelles': 'RITUELLE',
  'Herbes & Graminées': 'HERBE',
  'Palmiers': 'PALMIER',
};

export function AnimalCard({ animal, compact = false, numColumns = 2 }: Props) {
  const colors = useColors();
  const router = useRouter();

  const cardHeight = compact ? 90 : numColumns >= 4 ? 105 : numColumns === 3 ? 120 : 140;
  const nomSize = compact ? 14 : numColumns >= 4 ? 14 : numColumns === 3 ? 16 : 17;

  const plantImage = PLANT_IMAGES[animal.id];

  return (
    <Pressable
      style={({ pressed }) => [styles.container, compact && styles.containerCompact, { opacity: pressed ? 0.85 : 1 }]}
      onPress={() => router.push(`/animal/${animal.id}` as any)}
    >
      <ImageBackground
        source={plantImage}
        style={[styles.card, { height: cardHeight }]}
        imageStyle={styles.cardImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.08)', 'rgba(0,0,0,0.62)']}
          style={StyleSheet.absoluteFillObject}
        />

        <View style={styles.content}>
          <View style={styles.topRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
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
                          ? 'rgba(200,160,32,0.95)'
                          : 'rgba(255,255,255,0.25)',
                    },
                  ]}
                />
              ))}
            </View>
          </View>

          <View style={styles.bottomRow}>
            <Text style={[styles.nom, { fontSize: nomSize }, compact && styles.nomCompact]} numberOfLines={1}>
              {animal.nom}
            </Text>
            {!compact && (
              <Text style={styles.pouvoir} numberOfLines={1}>
                {animal.pouvoirs[0]}
              </Text>
            )}
          </View>
        </View>
      </ImageBackground>
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
      web: { boxShadow: '0px 3px 10px rgba(0,0,0,0.40)' },
      default: {
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
      },
    }),
  },
  containerCompact: {
    margin: 4,
  },
  card: {
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderRadius: 16,
  },
  cardImage: {
    borderRadius: 16,
  },
  content: {
    padding: 10,
    paddingBottom: 11,
    gap: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderWidth: 0.5,
    borderColor: 'rgba(200,160,32,0.40)',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#C8A020',
  },
  levelRow: {
    flexDirection: 'row',
    gap: 3,
  },
  levelDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  bottomRow: {
    gap: 2,
  },
  nom: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
    ...Platform.select({
      web: { textShadow: '0px 1px 4px rgba(0,0,0,0.8)' },
      default: {
        textShadowColor: 'rgba(0,0,0,0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
      },
    }),
  },
  nomCompact: {
    fontSize: 14,
  },
  pouvoir: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.80)',
    fontWeight: '500',
    letterSpacing: 0.2,
    ...Platform.select({
      web: { textShadow: '0px 1px 3px rgba(0,0,0,0.7)' },
      default: {
        textShadowColor: 'rgba(0,0,0,0.7)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
      },
    }),
  },
});
