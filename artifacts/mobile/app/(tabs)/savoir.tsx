import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColors } from '@/hooks/useColors';
import { KNOWLEDGE_BOOKS, type KnowledgeBook, type KnowledgeChapter } from '@/data/knowledge';
import { CONTES, type Conte } from '@/data/contes';

type Tab = 'bibliotheque' | 'contes';

export default function SavoirScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<Tab>('contes');
  const [selectedBook, setSelectedBook] = useState<KnowledgeBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<KnowledgeChapter | null>(null);
  const [selectedConte, setSelectedConte] = useState<Conte | null>(null);

  const topPad = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;

  /* ── CONTE READING VIEW ── */
  if (selectedConte) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <LinearGradient
          colors={[selectedConte.couleur + '55', colors.background]}
          style={[styles.conteHero, { paddingTop: topPad + 12 }]}
        >
          <Pressable
            onPress={() => setSelectedConte(null)}
            style={({ pressed }) => [styles.backBtn, { opacity: pressed ? 0.7 : 1 }]}
          >
            <Text style={[styles.backBtnText, { color: selectedConte.couleur }]}>← Contes</Text>
          </Pressable>

          <View style={styles.conteHeroMeta}>
            <Text style={styles.conteHeroIcon}>{selectedConte.animalIcon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.conteTradition, { color: selectedConte.couleur }]}>
                {selectedConte.tradition}
              </Text>
              <Text style={[styles.conteHeroTitle, { color: colors.ivory }]}>
                {selectedConte.titre}
              </Text>
              <View style={styles.conteDurRow}>
                <Text style={[styles.conteDur, { color: colors.mutedForeground }]}>
                  🕐 {selectedConte.duree} · {selectedConte.region}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.conteResumeBadge, { backgroundColor: 'rgba(0,0,0,0.25)', borderColor: selectedConte.couleur + '60' }]}>
            <Text style={[styles.conteResumeText, { color: colors.ivory }]}>
              {selectedConte.resume}
            </Text>
          </View>
        </LinearGradient>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.conteContent, { paddingBottom: 100 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
        >
          {selectedConte.contenu.map((section, idx) => {
            if (section.type === 'paragraph') {
              return (
                <Text key={idx} style={[styles.paragraph, { color: colors.ivory }]}>
                  {section.content}
                </Text>
              );
            }
            if (section.type === 'quote') {
              return (
                <View
                  key={idx}
                  style={[styles.quoteBlock, { borderLeftColor: selectedConte.couleur, backgroundColor: colors.card }]}
                >
                  <Text style={[styles.quoteText, { color: colors.mutedForeground }]}>
                    {section.content}
                  </Text>
                </View>
              );
            }
            return null;
          })}

          {/* Morale box */}
          <LinearGradient
            colors={[selectedConte.couleur + '30', selectedConte.couleur + '10']}
            style={[styles.moraleBox, { borderColor: selectedConte.couleur + '60' }]}
          >
            <View style={styles.moraleHeader}>
              <View style={[styles.moraleDot, { backgroundColor: selectedConte.couleur }]} />
              <Text style={[styles.moraleLabel, { color: selectedConte.couleur }]}>LEÇON DE MORAL</Text>
              <View style={[styles.moraleDot, { backgroundColor: selectedConte.couleur }]} />
            </View>
            <Text style={[styles.moraleText, { color: colors.ivory }]}>
              {selectedConte.morale}
            </Text>
          </LinearGradient>

          <View style={[styles.sourceBox, { borderColor: colors.border, backgroundColor: colors.card }]}>
            <Text style={[styles.sourceLabel, { color: colors.mutedForeground }]}>TRADITION ORALE</Text>
            <Text style={[styles.sourceText, { color: colors.mutedForeground }]}>
              {selectedConte.tradition}{'\n'}{selectedConte.region}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  /* ── CHAPTER CONTENT VIEW ── */
  if (selectedBook && selectedChapter) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <LinearGradient
          colors={[selectedBook.couleur + '40', colors.background]}
          style={[styles.chapterHero, { paddingTop: topPad + 16 }]}
        >
          <Pressable
            onPress={() => setSelectedChapter(null)}
            style={({ pressed }) => [styles.backBtn, { opacity: pressed ? 0.7 : 1 }]}
          >
            <Text style={[styles.backBtnText, { color: selectedBook.couleur }]}>← Retour</Text>
          </Pressable>
          <Text style={[styles.chapterPage, { color: colors.mutedForeground }]}>
            PAGE {selectedChapter.page}
          </Text>
          <Text style={styles.chapterIcon}>{selectedChapter.icon}</Text>
          <Text style={[styles.chapterHeroTitle, { color: colors.ivory }]}>{selectedChapter.titre}</Text>
          {selectedChapter.sousTitre && (
            <Text style={[styles.chapterHeroSub, { color: selectedBook.couleur }]}>{selectedChapter.sousTitre}</Text>
          )}
        </LinearGradient>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.chapterContent, { paddingBottom: 100 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
        >
          {selectedChapter.sections.map((section, idx) => {
            if (section.type === 'paragraph') {
              return (
                <Text key={idx} style={[styles.paragraph, { color: colors.ivory }]}>
                  {section.content}
                </Text>
              );
            }
            if (section.type === 'quote') {
              return (
                <View
                  key={idx}
                  style={[styles.quoteBlock, { borderLeftColor: selectedBook.couleur, backgroundColor: colors.card }]}
                >
                  <Text style={[styles.quoteText, { color: colors.mutedForeground }]}>
                    {section.content}
                  </Text>
                </View>
              );
            }
            if (section.type === 'list' || section.type === 'list-title') {
              return (
                <View key={idx} style={styles.listBlock}>
                  {section.type === 'list-title' && (
                    <Text style={[styles.listTitle, { color: selectedBook.couleur }]}>
                      {section.content.toUpperCase()}
                    </Text>
                  )}
                  {(section.items ?? []).map((item, i) => (
                    <View key={i} style={styles.listRow}>
                      <View style={[styles.listDot, { backgroundColor: selectedBook.couleur }]} />
                      <Text style={[styles.listItem, { color: colors.ivory }]}>{item}</Text>
                    </View>
                  ))}
                </View>
              );
            }
            return null;
          })}

          <View style={[styles.sourceBox, { borderColor: colors.border, backgroundColor: colors.card }]}>
            <Text style={[styles.sourceLabel, { color: colors.mutedForeground }]}>SOURCE</Text>
            <Text style={[styles.sourceText, { color: colors.mutedForeground }]}>
              {selectedBook.auteur} — {selectedBook.titre}{'\n'}
              {selectedBook.editeur} · {selectedBook.annee}
              {selectedBook.isbn ? `\nISBN ${selectedBook.isbn}` : ''}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  /* ── CHAPTER LIST VIEW ── */
  if (selectedBook) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <LinearGradient
          colors={[selectedBook.couleur + '55', colors.background]}
          style={[styles.bookHero, { paddingTop: topPad + 8 }]}
        >
          <Pressable
            onPress={() => setSelectedBook(null)}
            style={({ pressed }) => [styles.backBtn, { opacity: pressed ? 0.7 : 1 }]}
          >
            <Text style={[styles.backBtnText, { color: selectedBook.couleur }]}>← Bibliothèque</Text>
          </Pressable>
          <View style={styles.bookHeroRow}>
            <Text style={styles.bookHeroIcon}>{selectedBook.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.bookHeroLang, { color: selectedBook.couleur }]}>
                {selectedBook.langueEmoji}  {selectedBook.langue} · {selectedBook.annee}
              </Text>
              <Text style={[styles.bookHeroTitle, { color: colors.ivory }]}>{selectedBook.titreFr}</Text>
              <Text style={[styles.bookHeroAuteur, { color: colors.mutedForeground }]}>
                {selectedBook.auteur}
              </Text>
            </View>
          </View>
          <Text style={[styles.bookHeroDesc, { color: colors.mutedForeground }]}>
            {selectedBook.description}
          </Text>
        </LinearGradient>

        <ScrollView
          contentContainerStyle={[styles.listContent, { paddingBottom: 100 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.chapitresLabel, { color: colors.mutedForeground }]}>
            {selectedBook.chapitres.length} CHAPITRE{selectedBook.chapitres.length > 1 ? 'S' : ''}
          </Text>
          {selectedBook.chapitres.map((chapter, idx) => (
            <Pressable
              key={chapter.id}
              style={({ pressed }) => [
                styles.chapterCard,
                { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.88 : 1 },
              ]}
              onPress={() => setSelectedChapter(chapter)}
            >
              <View style={[styles.chapterNum, { backgroundColor: selectedBook.couleur + '25' }]}>
                <Text style={[styles.chapterNumText, { color: selectedBook.couleur }]}>
                  {String(idx + 1).padStart(2, '0')}
                </Text>
              </View>
              <View style={{ flex: 1, gap: 3 }}>
                <Text style={[styles.cardTitle, { color: colors.ivory }]}>{chapter.titre}</Text>
                {chapter.sousTitre && (
                  <Text style={[styles.cardSub, { color: selectedBook.couleur }]}>{chapter.sousTitre}</Text>
                )}
                <Text style={[styles.cardMeta, { color: colors.mutedForeground }]}>
                  Page {chapter.page} · {chapter.sections.length} section{chapter.sections.length > 1 ? 's' : ''}
                </Text>
              </View>
              <Text style={styles.chapterIconSmall}>{chapter.icon}</Text>
              <Text style={[styles.arrow, { color: colors.mutedForeground }]}>›</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  }

  /* ── MAIN LIST (Bibliothèque + Contes) ── */
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={[colors.deepBrown, colors.background]}
        style={[styles.header, { paddingTop: topPad + 8 }]}
      >
        <Text style={[styles.headerLabel, { color: colors.gold }]}>✦ SAVOIR ANCESTRAL</Text>
        <Text style={[styles.headerTitle, { color: colors.ivory }]}>
          {activeTab === 'contes' ? 'Contes Africains' : 'Bibliothèque'}
        </Text>
        <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>
          {activeTab === 'contes'
            ? `${CONTES.length} contes · Traditions d'Afrique de l'Ouest`
            : `${KNOWLEDGE_BOOKS.length} ouvrages · Toutes traditions confondues`}
        </Text>

        {/* Segment control */}
        <View style={[styles.segmentRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Pressable
            style={[
              styles.segmentBtn,
              activeTab === 'contes' && { backgroundColor: colors.gold },
            ]}
            onPress={() => setActiveTab('contes')}
          >
            <Text style={[
              styles.segmentText,
              { color: activeTab === 'contes' ? colors.deepBrown : colors.mutedForeground },
            ]}>
              🌙 Contes
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.segmentBtn,
              activeTab === 'bibliotheque' && { backgroundColor: colors.gold },
            ]}
            onPress={() => setActiveTab('bibliotheque')}
          >
            <Text style={[
              styles.segmentText,
              { color: activeTab === 'bibliotheque' ? colors.deepBrown : colors.mutedForeground },
            ]}>
              📚 Bibliothèque
            </Text>
          </Pressable>
        </View>
      </LinearGradient>

      {/* CONTES LIST */}
      {activeTab === 'contes' && (
        <ScrollView
          contentContainerStyle={[styles.listContent, { paddingBottom: 100 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
        >
          {CONTES.map((conte) => (
            <Pressable
              key={conte.id}
              style={({ pressed }) => [
                styles.conteCard,
                { backgroundColor: colors.card, borderColor: conte.couleur + '50', opacity: pressed ? 0.88 : 1 },
              ]}
              onPress={() => setSelectedConte(conte)}
            >
              <LinearGradient
                colors={[conte.couleur + '20', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
              />
              {/* Animal icon bubble */}
              <View style={[styles.conteIconWrap, { backgroundColor: conte.couleur + '28' }]}>
                <Text style={styles.conteIcon}>{conte.animalIcon}</Text>
              </View>

              <View style={{ flex: 1, gap: 4 }}>
                <View style={styles.conteMeta}>
                  <Text style={[styles.conteAnimal, { color: conte.couleur }]}>
                    {conte.animal.toUpperCase()}
                  </Text>
                  <Text style={[styles.conteDurBadge, { color: colors.mutedForeground }]}>
                    {conte.duree}
                  </Text>
                </View>
                <Text style={[styles.conteTitle, { color: colors.ivory }]} numberOfLines={2}>
                  {conte.titre}
                </Text>
                <Text style={[styles.conteTrad, { color: colors.mutedForeground }]} numberOfLines={1}>
                  {conte.tradition}
                </Text>
                <Text style={[styles.conteResumeList, { color: colors.mutedForeground }]} numberOfLines={2}>
                  {conte.resume}
                </Text>
              </View>
              <Text style={[styles.arrow, { color: conte.couleur }]}>›</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}

      {/* BIBLIOTHÈQUE LIST */}
      {activeTab === 'bibliotheque' && (
        <ScrollView
          contentContainerStyle={[styles.listContent, { paddingBottom: 100 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
        >
          {KNOWLEDGE_BOOKS.map((book) => (
            <Pressable
              key={book.id}
              style={({ pressed }) => [
                styles.bookCard,
                { backgroundColor: colors.card, borderColor: book.couleur + '50', opacity: pressed ? 0.88 : 1 },
              ]}
              onPress={() => setSelectedBook(book)}
            >
              <LinearGradient
                colors={[book.couleur + '22', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
              />
              <View style={[styles.bookIconWrap, { backgroundColor: book.couleur + '30' }]}>
                <Text style={styles.bookIcon}>{book.icon}</Text>
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <View style={styles.bookMeta}>
                  <Text style={[styles.bookLang, { color: book.couleur }]}>
                    {book.langueEmoji}  {book.langue}
                  </Text>
                  <Text style={[styles.bookYear, { color: colors.mutedForeground }]}>{book.annee}</Text>
                </View>
                <Text style={[styles.bookTitle, { color: colors.ivory }]}>{book.titreFr}</Text>
                <Text style={[styles.bookAuteur, { color: book.couleur }]}>{book.auteur}</Text>
                <Text style={[styles.bookEditeur, { color: colors.mutedForeground }]} numberOfLines={1}>
                  {book.editeur}
                </Text>
                <Text style={[styles.bookChapterCount, { color: colors.mutedForeground }]}>
                  {book.chapitres.length} chapitre{book.chapitres.length > 1 ? 's' : ''}
                </Text>
              </View>
              <Text style={[styles.arrow, { color: book.couleur }]}>›</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  /* ── Header ── */
  header: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    gap: 4,
  },
  headerLabel: {
    fontSize: 10,
    fontWeight: '700' as const,
    letterSpacing: 2.5,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800' as const,
    letterSpacing: 0.5,
  },
  headerSub: {
    fontSize: 12,
    fontWeight: '400' as const,
    marginTop: 2,
    marginBottom: 8,
  },

  /* ── Segment control ── */
  segmentRow: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    padding: 3,
    marginTop: 8,
    gap: 3,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 9,
    alignItems: 'center',
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '700' as const,
    letterSpacing: 0.3,
  },

  /* ── Shared list ── */
  listContent: {
    padding: 16,
    gap: 12,
  },
  arrow: {
    fontSize: 22,
    fontWeight: '300' as const,
  },

  /* ── Conte list cards ── */
  conteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    gap: 12,
    overflow: 'hidden',
  },
  conteIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conteIcon: { fontSize: 28 },
  conteMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  conteAnimal: {
    fontSize: 10,
    fontWeight: '700' as const,
    letterSpacing: 1.5,
  },
  conteDurBadge: {
    fontSize: 10,
    fontWeight: '500' as const,
  },
  conteTitle: {
    fontSize: 15,
    fontWeight: '800' as const,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  conteTrad: {
    fontSize: 11,
    fontWeight: '500' as const,
    fontStyle: 'italic',
  },
  conteResumeList: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '400' as const,
  },

  /* ── Conte reading view ── */
  conteHero: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  conteHeroMeta: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  conteHeroIcon: { fontSize: 44, marginTop: 4 },
  conteTradition: {
    fontSize: 10,
    fontWeight: '700' as const,
    letterSpacing: 2,
    marginBottom: 4,
  },
  conteHeroTitle: {
    fontSize: 22,
    fontWeight: '800' as const,
    lineHeight: 28,
  },
  conteDurRow: { marginTop: 4 },
  conteDur: {
    fontSize: 11,
    fontWeight: '500' as const,
  },
  conteResumeBadge: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
  },
  conteResumeText: {
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
    fontWeight: '400' as const,
  },
  conteContent: {
    padding: 20,
    gap: 18,
  },

  /* ── Morale box ── */
  moraleBox: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
    gap: 12,
    marginTop: 8,
  },
  moraleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  moraleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  moraleLabel: {
    fontSize: 10,
    fontWeight: '800' as const,
    letterSpacing: 2.5,
  },
  moraleText: {
    fontSize: 15,
    lineHeight: 26,
    fontWeight: '500' as const,
    fontStyle: 'italic',
  },

  /* ── Book list cards ── */
  bookCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    gap: 12,
    overflow: 'hidden',
  },
  bookIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookIcon: { fontSize: 28 },
  bookMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookLang: {
    fontSize: 10,
    fontWeight: '700' as const,
    letterSpacing: 1.5,
  },
  bookYear: {
    fontSize: 11,
    fontWeight: '500' as const,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: '800' as const,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  bookAuteur: {
    fontSize: 13,
    fontWeight: '600' as const,
    fontStyle: 'italic',
  },
  bookEditeur: {
    fontSize: 11,
    fontWeight: '400' as const,
  },
  bookChapterCount: {
    fontSize: 10,
    fontWeight: '600' as const,
    letterSpacing: 1,
    marginTop: 2,
  },

  /* ── Book detail hero ── */
  bookHero: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  bookHeroRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  bookHeroIcon: { fontSize: 44, marginTop: 4 },
  bookHeroLang: {
    fontSize: 10,
    fontWeight: '700' as const,
    letterSpacing: 2,
    marginBottom: 4,
  },
  bookHeroTitle: {
    fontSize: 22,
    fontWeight: '800' as const,
    lineHeight: 28,
  },
  bookHeroAuteur: {
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 2,
  },
  bookHeroDesc: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
  chapitresLabel: {
    fontSize: 10,
    fontWeight: '700' as const,
    letterSpacing: 2,
    marginBottom: 4,
    marginLeft: 4,
  },

  /* ── Chapter cards ── */
  chapterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 12,
    marginBottom: 2,
  },
  chapterNum: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chapterNumText: {
    fontSize: 13,
    fontWeight: '700' as const,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    letterSpacing: 0.2,
  },
  cardSub: {
    fontSize: 12,
    fontWeight: '500' as const,
  },
  cardMeta: {
    fontSize: 11,
    fontWeight: '400' as const,
  },
  chapterIconSmall: { fontSize: 20 },

  /* ── Chapter content ── */
  chapterHero: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 6,
  },
  backBtn: { alignSelf: 'flex-start', marginBottom: 8 },
  backBtnText: { fontSize: 14, fontWeight: '600' as const },
  chapterPage: { fontSize: 10, fontWeight: '700' as const, letterSpacing: 2 },
  chapterIcon: { fontSize: 32, marginTop: 4 },
  chapterHeroTitle: { fontSize: 28, fontWeight: '800' as const, letterSpacing: 0.5 },
  chapterHeroSub: { fontSize: 14, fontWeight: '500' as const },
  chapterContent: { padding: 20, gap: 16 },

  /* ── Shared content styles ── */
  paragraph: { fontSize: 15, lineHeight: 26, fontWeight: '400' as const },
  quoteBlock: {
    borderLeftWidth: 3,
    paddingLeft: 14,
    paddingVertical: 12,
    paddingRight: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  quoteText: { fontSize: 14, lineHeight: 22, fontStyle: 'italic', fontWeight: '400' as const },
  listBlock: { gap: 10, paddingVertical: 4 },
  listTitle: { fontSize: 11, fontWeight: '700' as const, letterSpacing: 1.8, marginBottom: 4 },
  listRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  listDot: { width: 6, height: 6, borderRadius: 3, marginTop: 9 },
  listItem: { flex: 1, fontSize: 14, lineHeight: 22, fontWeight: '400' as const },
  sourceBox: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    gap: 6,
    marginTop: 8,
  },
  sourceLabel: { fontSize: 10, fontWeight: '700' as const, letterSpacing: 2 },
  sourceText: { fontSize: 12, lineHeight: 18, fontWeight: '400' as const },
});
