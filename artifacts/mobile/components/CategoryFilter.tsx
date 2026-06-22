import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { PlanteCategorie } from '@/data/animals';
import { CATEGORIES } from '@/data/animals';
import { useColors } from '@/hooks/useColors';
import { useTranslation } from '@/i18n';

interface Props {
  selected: PlanteCategorie | null;
  onSelect: (cat: PlanteCategorie | null) => void;
}

const ICONS: Record<PlanteCategorie | 'all', string> = {
  all: '✦',
  'Arbres Sacrés': '🌳',
  'Plantes Médicinales': '🌿',
  'Plantes Alimentaires': '🫘',
  'Plantes Rituelles': '◉',
  'Herbes & Graminées': '🌾',
  'Palmiers': '🌴',
};

export function CategoryFilter({ selected, onSelect }: Props) {
  const colors = useColors();
  const { t } = useTranslation();

  const CAT_LABELS: Record<PlanteCategorie, string> = {
    'Arbres Sacrés': t.cat_mammals,
    'Plantes Médicinales': t.cat_birds,
    'Plantes Alimentaires': t.cat_reptiles,
    'Plantes Rituelles': t.cat_amphibians,
    'Herbes & Graminées': t.cat_aquatic,
    'Palmiers': t.cat_invertebrates,
  };

  const items: (AnimalCategorie | null)[] = [null, ...CATEGORIES];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {items.map((cat) => {
        const isActive = selected === cat;
        const icon = cat ? ICONS[cat] : ICONS['all'];
        const label = cat ? CAT_LABELS[cat] : t.cat_all;
        return (
          <Pressable
            key={cat ?? 'all'}
            style={({ pressed }) => [
              styles.chip,
              {
                backgroundColor: isActive ? colors.gold : colors.card,
                borderColor: isActive ? colors.gold : colors.border,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            onPress={() => onSelect(cat)}
          >
            <Text style={[styles.chipIcon, { color: isActive ? colors.deepBrown : colors.gold }]}>
              {icon}
            </Text>
            <Text
              style={[
                styles.chipText,
                { color: isActive ? colors.deepBrown : colors.ivory },
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 12,
    gap: 6,
    paddingVertical: 3,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    gap: 5,
  },
  chipIcon: {
    fontSize: 11,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 0.2,
  },
});
