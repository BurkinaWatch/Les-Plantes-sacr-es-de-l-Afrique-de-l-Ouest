import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { AnimalCategorie } from '@/data/animals';
import { CATEGORIES } from '@/data/animals';
import { useColors } from '@/hooks/useColors';
import { useTranslation } from '@/i18n';

interface Props {
  selected: AnimalCategorie | null;
  onSelect: (cat: AnimalCategorie | null) => void;
}

const ICONS: Record<AnimalCategorie | 'all', string> = {
  all: '✦',
  Mammifères: '◈',
  Oiseaux: '◇',
  Reptiles: '◆',
  Amphibiens: '◉',
  Aquatiques: '◎',
  Invertébrés: '◌',
};

export function CategoryFilter({ selected, onSelect }: Props) {
  const colors = useColors();
  const { t } = useTranslation();

  const CAT_LABELS: Record<AnimalCategorie, string> = {
    Mammifères: t.cat_mammals,
    Oiseaux: t.cat_birds,
    Reptiles: t.cat_reptiles,
    Amphibiens: t.cat_amphibians,
    Aquatiques: t.cat_aquatic,
    Invertébrés: t.cat_invertebrates,
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
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  chipIcon: {
    fontSize: 12,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600' as const,
    letterSpacing: 0.3,
  },
});
