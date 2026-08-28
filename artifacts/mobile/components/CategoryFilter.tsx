import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import type { PlanteCategorie } from '@/data/animals';
import { CATEGORIES } from '@/data/animals';
import { SacredIcon, iconForCategory } from '@/components/SacredIcon';
import { useColors } from '@/hooks/useColors';
import { useTranslation } from '@/i18n';
import { getCategoryLabels } from '@/lib/category-labels';

interface Props {
  selected: PlanteCategorie | null;
  onSelect: (cat: PlanteCategorie | null) => void;
}

export function CategoryFilter({ selected, onSelect }: Props) {
  const colors = useColors();
  const { t } = useTranslation();

  const CAT_LABELS: Record<PlanteCategorie, string> = getCategoryLabels(t);

  const items: (PlanteCategorie | null)[] = [null, ...CATEGORIES];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {items.map((cat) => {
        const isActive = selected === cat;
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
            <SacredIcon
              name={cat ? iconForCategory(cat) : 'sparkles'}
              size={16}
              color={isActive ? colors.deepBrown : colors.gold}
              accessibilityLabel={label}
            />
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
  chipText: {
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 0.2,
  },
});
