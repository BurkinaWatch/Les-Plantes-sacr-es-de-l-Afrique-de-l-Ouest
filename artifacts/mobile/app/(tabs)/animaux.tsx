import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimalCard } from '@/components/AnimalCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ANIMALS, type AnimalCategorie } from '@/data/animals';
import { useColors } from '@/hooks/useColors';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from '@/i18n';

export default function AnimauxScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<AnimalCategorie | null>(null);

  const topPad = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;

  const numColumns = width >= 1000 ? 4 : width >= 650 ? 3 : 2;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ANIMALS.filter((a) => {
      const matchSearch =
        q === '' ||
        a.nom.toLowerCase().includes(q) ||
        a.nomAnglais.toLowerCase().includes(q) ||
        a.nomScientifique.toLowerCase().includes(q) ||
        a.element.toLowerCase().includes(q) ||
        a.pouvoirs.some((p) => p.toLowerCase().includes(q)) ||
        a.qualites.some((v) => v.toLowerCase().includes(q));
      const matchCat = selectedCat === null || a.categorie === selectedCat;
      return matchSearch && matchCat;
    });
  }, [search, selectedCat]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 8, backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <View style={styles.titleRow}>
          <Text style={[styles.headerSub, { color: colors.gold }]}>{t.animals_museum}</Text>
          <Text style={[styles.headerTitle, { color: colors.ivory }]}>{t.animals_title}</Text>
        </View>

        <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="search" size={14} color={colors.mutedForeground} />
          <TextInput
            style={[styles.searchInput, { color: colors.ivory }]}
            placeholder={t.animals_search_placeholder}
            placeholderTextColor={colors.mutedForeground}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <Feather name="x" size={14} color={colors.mutedForeground} onPress={() => setSearch('')} />
          )}
        </View>
      </View>

      <View style={styles.filterWrap}>
        <CategoryFilter selected={selectedCat} onSelect={setSelectedCat} />
      </View>

      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Text style={[styles.emptyIcon, { color: colors.mutedForeground }]}>◇</Text>
          <Text style={[styles.emptyTitle, { color: colors.ivory }]}>{t.animals_none_found}</Text>
          <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>{t.animals_none_hint}</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          key={numColumns}
          contentContainerStyle={{ paddingHorizontal: 4, paddingBottom: 80 + insets.bottom, paddingTop: 4 }}
          renderItem={({ item }) => (
            <View style={styles.cardWrap}>
              <AnimalCard animal={item} numColumns={numColumns} />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingBottom: 8, borderBottomWidth: StyleSheet.hairlineWidth },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 },
  headerSub: { fontSize: 9, fontWeight: '700' as const, letterSpacing: 2 },
  headerTitle: { fontSize: 20, fontWeight: '800' as const, letterSpacing: 0.3 },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 12, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 7 },
  searchInput: { flex: 1, fontSize: 14, fontWeight: '400' as const },
  filterWrap: { paddingVertical: 4 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 32 },
  emptyIcon: { fontSize: 36, marginBottom: 4 },
  emptyTitle: { fontSize: 18, fontWeight: '700' as const },
  emptyText: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  cardWrap: { flex: 1 },
});
