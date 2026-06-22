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
import { RECIPES, type Recipe } from '@/data/recipes';
import { ARTICLES, type Article } from '@/data/articles';

type Tab = 'contes' | 'bibliotheque' | 'recettes' | 'articles';

const TABS: { key: Tab; label: string; emoji: string }[] = [
  { key: 'contes',      label: 'Contes',       emoji: '🌙' },
  { key: 'bibliotheque',label: 'Bibliothèque', emoji: '📚' },
  { key: 'recettes',    label: 'Recettes',     emoji: '🌿' },
  { key: 'articles',    label: 'Articles',     emoji: '📰' },
];

const CATEGORIE_COLORS: Record<string, string> = {
  tisane:       '#5B8A3C',
  decoction:    '#A04000',
  alimentation: '#E67E22',
  soin_externe: '#2C7A45',
  rituel:       '#8E44AD',
  ethnobotanique: '#5B8A3C',
  medecine:     '#C0392B',
  spiritualite: '#8E44AD',
  ecologie:     '#1A6B3C',
  culture:      '#E84393',
};

export default function SavoirScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<Tab>('contes');

  /* ── Detail states ── */
  const [selectedBook,    setSelectedBook]    = useState<KnowledgeBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<KnowledgeChapter | null>(null);
  const [selectedConte,   setSelectedConte]   = useState<Conte | null>(null);
  const [selectedRecipe,  setSelectedRecipe]  = useState<Recipe | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const topPad = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;

  /* ════════════════════════════════════════════════════
     CONTE READING VIEW
  ═════════════════════════════════════════════════════*/
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
              <Text style={[styles.conteDur, { color: colors.mutedForeground }]}>
                🕐 {selectedConte.duree} · {selectedConte.region}
              </Text>
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
          contentContainerStyle={[styles.readingContent, { paddingBottom: 100 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
        >
          {selectedConte.contenu.map((section, idx) => {
            if (section.type === 'paragraph') {
              return <Text key={idx} style={[styles.paragraph, { color: colors.ivory }]}>{section.content}</Text>;
            }
            if (section.type === 'quote') {
              return (
                <View key={idx} style={[styles.quoteBlock, { borderLeftColor: selectedConte.couleur, backgroundColor: colors.card }]}>
                  <Text style={[styles.quoteText, { color: colors.mutedForeground }]}>{section.content}</Text>
                </View>
              );
            }
            return null;
          })}

          <LinearGradient
            colors={[selectedConte.couleur + '30', selectedConte.couleur + '10']}
            style={[styles.moraleBox, { borderColor: selectedConte.couleur + '60' }]}
          >
            <View style={styles.moraleHeader}>
              <View style={[styles.moraleDot, { backgroundColor: selectedConte.couleur }]} />
              <Text style={[styles.moraleLabel, { color: selectedConte.couleur }]}>LEÇON DE MORAL</Text>
              <View style={[styles.moraleDot, { backgroundColor: selectedConte.couleur }]} />
            </View>
            <Text style={[styles.moraleText, { color: colors.ivory }]}>{selectedConte.morale}</Text>
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

  /* ════════════════════════════════════════════════════
     CHAPTER CONTENT VIEW
  ═════════════════════════════════════════════════════*/
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
          <Text style={[styles.chapterPage, { color: colors.mutedForeground }]}>PAGE {selectedChapter.page}</Text>
          <Text style={styles.chapterIcon}>{selectedChapter.icon}</Text>
          <Text style={[styles.chapterHeroTitle, { color: colors.ivory }]}>{selectedChapter.titre}</Text>
          {selectedChapter.sousTitre && (
            <Text style={[styles.chapterHeroSub, { color: selectedBook.couleur }]}>{selectedChapter.sousTitre}</Text>
          )}
        </LinearGradient>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.readingContent, { paddingBottom: 100 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
        >
          {selectedChapter.sections.map((section, idx) => {
            if (section.type === 'paragraph') {
              return <Text key={idx} style={[styles.paragraph, { color: colors.ivory }]}>{section.content}</Text>;
            }
            if (section.type === 'quote') {
              return (
                <View key={idx} style={[styles.quoteBlock, { borderLeftColor: selectedBook.couleur, backgroundColor: colors.card }]}>
                  <Text style={[styles.quoteText, { color: colors.mutedForeground }]}>{section.content}</Text>
                </View>
              );
            }
            if (section.type === 'list' || section.type === 'list-title') {
              return (
                <View key={idx} style={styles.listBlock}>
                  {section.type === 'list-title' && (
                    <Text style={[styles.listTitle, { color: selectedBook.couleur }]}>{section.content.toUpperCase()}</Text>
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

  /* ════════════════════════════════════════════════════
     BOOK CHAPTER LIST VIEW
  ═════════════════════════════════════════════════════*/
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
              <Text style={[styles.bookHeroAuteur, { color: colors.mutedForeground }]}>{selectedBook.auteur}</Text>
            </View>
          </View>
          <Text style={[styles.bookHeroDesc, { color: colors.mutedForeground }]}>{selectedBook.description}</Text>
        </LinearGradient>

        <ScrollView
          contentContainerStyle={[styles.listContent, { paddingBottom: 100 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.sectionCountLabel, { color: colors.mutedForeground }]}>
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

  /* ════════════════════════════════════════════════════
     RECIPE DETAIL VIEW
  ═════════════════════════════════════════════════════*/
  if (selectedRecipe) {
    const r = selectedRecipe;
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <LinearGradient
          colors={[r.couleur + '55', colors.background]}
          style={[styles.recipeHero, { paddingTop: topPad + 12 }]}
        >
          <Pressable
            onPress={() => setSelectedRecipe(null)}
            style={({ pressed }) => [styles.backBtn, { opacity: pressed ? 0.7 : 1 }]}
          >
            <Text style={[styles.backBtnText, { color: r.couleur }]}>← Recettes</Text>
          </Pressable>

          <View style={styles.recipeHeroRow}>
            <Text style={styles.recipeHeroIcon}>{r.planteIcon}</Text>
            <View style={{ flex: 1 }}>
              <View style={[styles.catBadge, { backgroundColor: r.couleur + '30', borderColor: r.couleur + '60' }]}>
                <Text style={[styles.catBadgeText, { color: r.couleur }]}>{r.categorieLabel}</Text>
              </View>
              <Text style={[styles.recipeHeroTitle, { color: colors.ivory }]}>{r.titre}</Text>
              <Text style={[styles.recipeHeroPlante, { color: r.couleur }]} numberOfLines={1}>{r.plante}</Text>
            </View>
          </View>

          <View style={styles.recipeMetaRow}>
            <View style={[styles.metaChip, { backgroundColor: colors.card }]}>
              <Text style={[styles.metaChipText, { color: colors.mutedForeground }]}>⏱ {r.duree}</Text>
            </View>
            <View style={[styles.metaChip, { backgroundColor: colors.card }]}>
              <Text style={[styles.metaChipText, { color: colors.mutedForeground }]}>🎯 {r.difficulte}</Text>
            </View>
            <View style={[styles.metaChip, { backgroundColor: colors.card }]}>
              <Text style={[styles.metaChipText, { color: colors.mutedForeground }]}>📍 {r.region.split(',')[0]}</Text>
            </View>
          </View>

          <View style={[styles.conteResumeBadge, { backgroundColor: 'rgba(0,0,0,0.25)', borderColor: r.couleur + '60' }]}>
            <Text style={[styles.conteResumeText, { color: colors.ivory }]}>{r.resume}</Text>
          </View>
        </LinearGradient>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.readingContent, { paddingBottom: 120 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Bienfaits */}
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: r.couleur + '40' }]}>
            <Text style={[styles.sectionCardTitle, { color: r.couleur }]}>✦ BIENFAITS</Text>
            {r.bienfaits.map((b, i) => (
              <View key={i} style={styles.listRow}>
                <View style={[styles.listDot, { backgroundColor: r.couleur }]} />
                <Text style={[styles.listItem, { color: colors.ivory }]}>{b}</Text>
              </View>
            ))}
          </View>

          {/* Ingrédients */}
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.sectionCardTitle, { color: r.couleur }]}>🌿 INGRÉDIENTS</Text>
            {r.ingredients.map((ing, i) => (
              <View key={i} style={styles.ingredientRow}>
                <View style={[styles.quantityBadge, { backgroundColor: r.couleur + '20' }]}>
                  <Text style={[styles.quantityText, { color: r.couleur }]}>{ing.quantite}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.ingredientName, { color: colors.ivory }]}>{ing.nom}</Text>
                  {ing.note && (
                    <Text style={[styles.ingredientNote, { color: colors.mutedForeground }]}>{ing.note}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Étapes */}
          <Text style={[styles.readingSubtitle, { color: r.couleur }]}>PRÉPARATION</Text>
          {r.etapes.map((etape, i) => (
            <View key={i} style={styles.etapeRow}>
              <View style={[styles.etapeNum, { backgroundColor: r.couleur }]}>
                <Text style={styles.etapeNumText}>{i + 1}</Text>
              </View>
              <Text style={[styles.etapeText, { color: colors.ivory }]}>{etape}</Text>
            </View>
          ))}

          {/* Conseils */}
          <LinearGradient
            colors={[r.couleur + '25', r.couleur + '08']}
            style={[styles.conseilsBox, { borderColor: r.couleur + '50' }]}
          >
            <Text style={[styles.conseilsTitle, { color: r.couleur }]}>💡 CONSEILS DU SAVOIR ANCESTRAL</Text>
            <Text style={[styles.conseilsText, { color: colors.ivory }]}>{r.conseils}</Text>
          </LinearGradient>

          {/* Précautions */}
          {r.precautions && (
            <View style={[styles.precautionsBox, { backgroundColor: '#FF6B0015', borderColor: '#FF6B0060' }]}>
              <Text style={[styles.precautionsTitle, { color: '#E74C3C' }]}>⚠️ PRÉCAUTIONS</Text>
              <Text style={[styles.precautionsText, { color: colors.ivory }]}>{r.precautions}</Text>
            </View>
          )}

          <View style={[styles.sourceBox, { borderColor: colors.border, backgroundColor: colors.card }]}>
            <Text style={[styles.sourceLabel, { color: colors.mutedForeground }]}>TRADITION</Text>
            <Text style={[styles.sourceText, { color: colors.mutedForeground }]}>
              {r.tradition}{'\n'}{r.region}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  /* ════════════════════════════════════════════════════
     ARTICLE DETAIL VIEW
  ═════════════════════════════════════════════════════*/
  if (selectedArticle) {
    const a = selectedArticle;
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <LinearGradient
          colors={[a.couleur + '50', colors.background]}
          style={[styles.articleHero, { paddingTop: topPad + 12 }]}
        >
          <Pressable
            onPress={() => setSelectedArticle(null)}
            style={({ pressed }) => [styles.backBtn, { opacity: pressed ? 0.7 : 1 }]}
          >
            <Text style={[styles.backBtnText, { color: a.couleur }]}>← Articles</Text>
          </Pressable>

          <View style={[styles.catBadge, { backgroundColor: a.couleur + '30', borderColor: a.couleur + '60', alignSelf: 'flex-start', marginBottom: 8 }]}>
            <Text style={[styles.catBadgeText, { color: a.couleur }]}>{a.categorieLabel}</Text>
          </View>

          <Text style={styles.articleHeroIcon}>{a.planteIcon}</Text>
          <Text style={[styles.articleHeroTitle, { color: colors.ivory }]}>{a.titre}</Text>
          {a.sousTitre && (
            <Text style={[styles.articleHeroSub, { color: a.couleur }]}>{a.sousTitre}</Text>
          )}

          <View style={styles.articleHeroMeta}>
            <Text style={[styles.articleMetaText, { color: colors.mutedForeground }]}>✍️ {a.auteur}</Text>
            <Text style={[styles.articleMetaText, { color: colors.mutedForeground }]}>📖 {a.duree} de lecture</Text>
          </View>
        </LinearGradient>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.readingContent, { paddingBottom: 120 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.conteResumeBadge, { backgroundColor: colors.card, borderColor: a.couleur + '50', marginBottom: 8 }]}>
            <Text style={[styles.conteResumeText, { color: colors.ivory }]}>{a.resume}</Text>
          </View>

          {a.contenu.map((section, idx) => {
            if (section.type === 'paragraph') {
              return <Text key={idx} style={[styles.paragraph, { color: colors.ivory }]}>{section.content}</Text>;
            }
            if (section.type === 'subtitle') {
              return <Text key={idx} style={[styles.readingSubtitle, { color: a.couleur }]}>{section.content.toUpperCase()}</Text>;
            }
            if (section.type === 'quote') {
              return (
                <View key={idx} style={[styles.quoteBlock, { borderLeftColor: a.couleur, backgroundColor: colors.card }]}>
                  <Text style={[styles.quoteText, { color: colors.mutedForeground }]}>{section.content}</Text>
                </View>
              );
            }
            if (section.type === 'list') {
              return (
                <View key={idx} style={styles.listBlock}>
                  {section.content ? (
                    <Text style={[styles.listTitle, { color: a.couleur }]}>{section.content}</Text>
                  ) : null}
                  {(section.items ?? []).map((item, i) => (
                    <View key={i} style={styles.listRow}>
                      <View style={[styles.listDot, { backgroundColor: a.couleur }]} />
                      <Text style={[styles.listItem, { color: colors.ivory }]}>{item}</Text>
                    </View>
                  ))}
                </View>
              );
            }
            return null;
          })}

          {/* Tags */}
          <View style={styles.tagsRow}>
            {a.tags.map((tag, i) => (
              <View key={i} style={[styles.tagChip, { backgroundColor: a.couleur + '20', borderColor: a.couleur + '40' }]}>
                <Text style={[styles.tagText, { color: a.couleur }]}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* Sources */}
          {a.sources && a.sources.length > 0 && (
            <View style={[styles.sourceBox, { borderColor: colors.border, backgroundColor: colors.card }]}>
              <Text style={[styles.sourceLabel, { color: colors.mutedForeground }]}>RÉFÉRENCES</Text>
              {a.sources.map((src, i) => (
                <Text key={i} style={[styles.sourceRef, { color: colors.mutedForeground }]}>
                  • {src}
                </Text>
              ))}
            </View>
          )}

          <View style={[styles.sourceBox, { borderColor: colors.border, backgroundColor: colors.card, marginTop: 8 }]}>
            <Text style={[styles.sourceLabel, { color: colors.mutedForeground }]}>PUBLICATION</Text>
            <Text style={[styles.sourceText, { color: colors.mutedForeground }]}>
              {a.source} · {a.annee}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  /* ════════════════════════════════════════════════════
     MAIN LIST VIEW
  ═════════════════════════════════════════════════════*/
  const headerTitles: Record<Tab, string> = {
    contes:       'Contes Africains',
    bibliotheque: 'Bibliothèque',
    recettes:     'Recettes de Plantes',
    articles:     'Articles & Savoirs',
  };

  const headerSubs: Record<Tab, string> = {
    contes:       `${CONTES.length} contes · Traditions d'Afrique de l'Ouest`,
    bibliotheque: `${KNOWLEDGE_BOOKS.length} ouvrages · Toutes traditions`,
    recettes:     `${RECIPES.length} recettes · Plantes médicinales & cuisine`,
    articles:     `${ARTICLES.length} articles · Ethnobotanique & culture`,
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* ── Header ── */}
      <LinearGradient
        colors={[colors.deepBrown, colors.background]}
        style={[styles.header, { paddingTop: topPad + 8 }]}
      >
        <Text style={[styles.headerLabel, { color: colors.gold }]}>✦ SAVOIR ANCESTRAL</Text>
        <Text style={[styles.headerTitle, { color: colors.ivory }]}>{headerTitles[activeTab]}</Text>
        <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>{headerSubs[activeTab]}</Text>

        {/* Horizontal scrollable tab bar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBarContent}
          style={styles.tabBar}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <Pressable
                key={tab.key}
                style={[
                  styles.tabPill,
                  isActive
                    ? { backgroundColor: colors.gold }
                    : { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 },
                ]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text style={[
                  styles.tabPillText,
                  { color: isActive ? colors.deepBrown : colors.mutedForeground },
                ]}>
                  {tab.emoji} {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </LinearGradient>

      {/* ════ CONTES LIST ════ */}
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
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
              />
              <View style={[styles.iconWrap, { backgroundColor: conte.couleur + '28' }]}>
                <Text style={styles.iconText}>{conte.animalIcon}</Text>
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <View style={styles.cardMetaRow}>
                  <Text style={[styles.cardTag, { color: conte.couleur }]}>{conte.animal.toUpperCase()}</Text>
                  <Text style={[styles.cardDur, { color: colors.mutedForeground }]}>{conte.duree}</Text>
                </View>
                <Text style={[styles.cardTitle, { color: colors.ivory }]} numberOfLines={2}>{conte.titre}</Text>
                <Text style={[styles.cardSub, { color: colors.mutedForeground }]} numberOfLines={1}>{conte.tradition}</Text>
                <Text style={[styles.cardDesc, { color: colors.mutedForeground }]} numberOfLines={2}>{conte.resume}</Text>
              </View>
              <Text style={[styles.arrow, { color: conte.couleur }]}>›</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}

      {/* ════ BIBLIOTHÈQUE LIST ════ */}
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
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
              />
              <View style={[styles.iconWrap, { backgroundColor: book.couleur + '30' }]}>
                <Text style={styles.iconText}>{book.icon}</Text>
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <View style={styles.cardMetaRow}>
                  <Text style={[styles.cardTag, { color: book.couleur }]}>{book.langueEmoji}  {book.langue}</Text>
                  <Text style={[styles.cardDur, { color: colors.mutedForeground }]}>{book.annee}</Text>
                </View>
                <Text style={[styles.cardTitle, { color: colors.ivory }]}>{book.titreFr}</Text>
                <Text style={[styles.cardSub, { color: book.couleur }]}>{book.auteur}</Text>
                <Text style={[styles.cardMeta, { color: colors.mutedForeground }]}>
                  {book.chapitres.length} chapitre{book.chapitres.length > 1 ? 's' : ''} · {book.editeur}
                </Text>
              </View>
              <Text style={[styles.arrow, { color: book.couleur }]}>›</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}

      {/* ════ RECETTES LIST ════ */}
      {activeTab === 'recettes' && (
        <ScrollView
          contentContainerStyle={[styles.listContent, { paddingBottom: 100 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
        >
          {RECIPES.map((recipe) => (
            <Pressable
              key={recipe.id}
              style={({ pressed }) => [
                styles.recipeCard,
                { backgroundColor: colors.card, borderColor: recipe.couleur + '50', opacity: pressed ? 0.88 : 1 },
              ]}
              onPress={() => setSelectedRecipe(recipe)}
            >
              <LinearGradient
                colors={[recipe.couleur + '22', 'transparent']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
              />
              <View style={[styles.iconWrap, { backgroundColor: recipe.couleur + '28' }]}>
                <Text style={styles.iconText}>{recipe.planteIcon}</Text>
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <View style={styles.cardMetaRow}>
                  <View style={[styles.catChip, { backgroundColor: recipe.couleur + '25' }]}>
                    <Text style={[styles.catChipText, { color: recipe.couleur }]}>{recipe.categorieLabel}</Text>
                  </View>
                  <Text style={[styles.cardDur, { color: colors.mutedForeground }]}>⏱ {recipe.duree}</Text>
                </View>
                <Text style={[styles.cardTitle, { color: colors.ivory }]}>{recipe.titre}</Text>
                <Text style={[styles.cardSub, { color: recipe.couleur }]} numberOfLines={1}>{recipe.plante}</Text>
                <View style={styles.recipeBottomRow}>
                  <Text style={[styles.cardMeta, { color: colors.mutedForeground }]}>{recipe.tradition}</Text>
                  <View style={[styles.diffBadge, { backgroundColor: recipe.difficulte === 'Facile' ? '#27AE6020' : recipe.difficulte === 'Moyen' ? '#F39C1220' : '#E74C3C20' }]}>
                    <Text style={[styles.diffText, { color: recipe.difficulte === 'Facile' ? '#27AE60' : recipe.difficulte === 'Moyen' ? '#F39C12' : '#E74C3C' }]}>
                      {recipe.difficulte}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={[styles.arrow, { color: recipe.couleur }]}>›</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}

      {/* ════ ARTICLES LIST ════ */}
      {activeTab === 'articles' && (
        <ScrollView
          contentContainerStyle={[styles.listContent, { paddingBottom: 100 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
        >
          {ARTICLES.map((article) => (
            <Pressable
              key={article.id}
              style={({ pressed }) => [
                styles.articleCard,
                { backgroundColor: colors.card, borderColor: article.couleur + '50', opacity: pressed ? 0.88 : 1 },
              ]}
              onPress={() => setSelectedArticle(article)}
            >
              <LinearGradient
                colors={[article.couleur + '20', 'transparent']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
              />
              <View style={{ flex: 1, gap: 5 }}>
                <View style={styles.cardMetaRow}>
                  <View style={[styles.catChip, { backgroundColor: article.couleur + '25' }]}>
                    <Text style={[styles.catChipText, { color: article.couleur }]}>{article.categorieLabel}</Text>
                  </View>
                  <Text style={[styles.cardDur, { color: colors.mutedForeground }]}>📖 {article.duree}</Text>
                </View>
                <View style={styles.articleTitleRow}>
                  <Text style={styles.articleCardIcon}>{article.planteIcon}</Text>
                  <Text style={[styles.cardTitle, { color: colors.ivory, flex: 1 }]} numberOfLines={2}>
                    {article.titre}
                  </Text>
                </View>
                {article.sousTitre && (
                  <Text style={[styles.cardSub, { color: article.couleur }]} numberOfLines={2}>
                    {article.sousTitre}
                  </Text>
                )}
                <Text style={[styles.cardDesc, { color: colors.mutedForeground }]} numberOfLines={2}>
                  {article.resume}
                </Text>
                <View style={styles.articleAuthorRow}>
                  <Text style={[styles.articleAuthor, { color: colors.mutedForeground }]}>
                    ✍️ {article.auteur} · {article.annee}
                  </Text>
                </View>
              </View>
              <Text style={[styles.arrow, { color: article.couleur }]}>›</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

/* ══════════════════════════════════════════════════════
   STYLES
══════════════════════════════════════════════════════*/
const styles = StyleSheet.create({
  container: { flex: 1 },

  /* ── Header ── */
  header: { paddingHorizontal: 24, paddingBottom: 12, gap: 4 },
  headerLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 2.5, marginBottom: 4 },
  headerTitle: { fontSize: 30, fontWeight: '800', letterSpacing: 0.5 },
  headerSub: { fontSize: 12, marginTop: 2, marginBottom: 10 },

  /* ── Tab bar ── */
  tabBar: { marginTop: 4, marginHorizontal: -8 },
  tabBarContent: { paddingHorizontal: 8, gap: 8, paddingBottom: 12 },
  tabPill: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: 20, flexDirection: 'row', alignItems: 'center' },
  tabPillText: { fontSize: 13, fontWeight: '700', letterSpacing: 0.2 },

  /* ── Shared list ── */
  listContent: { padding: 16, gap: 12 },
  arrow: { fontSize: 22, fontWeight: '300' },

  /* ── Icon wrap ── */
  iconWrap: { width: 52, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  iconText: { fontSize: 28 },

  /* ── Card meta shared ── */
  cardMetaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardTag: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  cardDur: { fontSize: 10, fontWeight: '500' },
  cardTitle: { fontSize: 15, fontWeight: '800', letterSpacing: 0.1, lineHeight: 20 },
  cardSub: { fontSize: 12, fontWeight: '600', fontStyle: 'italic' },
  cardMeta: { fontSize: 10, fontWeight: '500' },
  cardDesc: { fontSize: 11, lineHeight: 16 },

  /* ── Conte cards ── */
  conteCard: {
    flexDirection: 'row', alignItems: 'center', borderRadius: 16,
    borderWidth: 1, padding: 14, gap: 12, overflow: 'hidden',
  },

  /* ── Book cards ── */
  bookCard: {
    flexDirection: 'row', alignItems: 'center', borderRadius: 16,
    borderWidth: 1, padding: 14, gap: 12, overflow: 'hidden',
  },

  /* ── Recipe cards ── */
  recipeCard: {
    flexDirection: 'row', alignItems: 'center', borderRadius: 16,
    borderWidth: 1, padding: 14, gap: 12, overflow: 'hidden',
  },
  catChip: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  catChipText: { fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  recipeBottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  diffBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  diffText: { fontSize: 9, fontWeight: '700' },

  /* ── Article cards ── */
  articleCard: {
    flexDirection: 'row', alignItems: 'flex-start', borderRadius: 16,
    borderWidth: 1, padding: 14, gap: 12, overflow: 'hidden',
  },
  articleTitleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  articleCardIcon: { fontSize: 22, marginTop: 1 },
  articleAuthorRow: { flexDirection: 'row' },
  articleAuthor: { fontSize: 10, fontWeight: '500', fontStyle: 'italic' },

  /* ── Back button ── */
  backBtn: { marginBottom: 12 },
  backBtnText: { fontSize: 14, fontWeight: '700', letterSpacing: 0.5 },

  /* ── Reading content ── */
  readingContent: { padding: 20, gap: 18 },
  paragraph: { fontSize: 15, lineHeight: 26, fontWeight: '400' },
  readingSubtitle: { fontSize: 11, fontWeight: '800', letterSpacing: 2, marginTop: 4 },

  quoteBlock: { borderLeftWidth: 3, borderRadius: 6, paddingVertical: 12, paddingHorizontal: 16 },
  quoteText: { fontSize: 14, lineHeight: 24, fontStyle: 'italic', fontWeight: '500' },

  listBlock: { gap: 8 },
  listTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 4 },
  listRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  listDot: { width: 6, height: 6, borderRadius: 3, marginTop: 8 },
  listItem: { fontSize: 14, lineHeight: 22, flex: 1 },

  /* ── Morale / Conte ── */
  conteHero: { paddingHorizontal: 20, paddingBottom: 20, gap: 12 },
  conteHeroMeta: { flexDirection: 'row', alignItems: 'flex-start', gap: 14 },
  conteHeroIcon: { fontSize: 44, marginTop: 4 },
  conteTradition: { fontSize: 10, fontWeight: '700', letterSpacing: 2, marginBottom: 4 },
  conteHeroTitle: { fontSize: 22, fontWeight: '800', lineHeight: 28 },
  conteDur: { fontSize: 11, fontWeight: '500', marginTop: 4 },
  conteResumeBadge: { borderRadius: 10, borderWidth: 1, padding: 12 },
  conteResumeText: { fontSize: 13, lineHeight: 20, fontStyle: 'italic' },
  moraleBox: { borderRadius: 14, borderWidth: 1, padding: 18, gap: 12, marginTop: 8 },
  moraleHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  moraleDot: { width: 6, height: 6, borderRadius: 3 },
  moraleLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 2.5 },
  moraleText: { fontSize: 15, lineHeight: 26, fontWeight: '500', fontStyle: 'italic' },

  /* ── Chapter ── */
  chapterHero: { paddingHorizontal: 20, paddingBottom: 20, gap: 8 },
  chapterPage: { fontSize: 10, fontWeight: '700', letterSpacing: 2 },
  chapterIcon: { fontSize: 36 },
  chapterHeroTitle: { fontSize: 24, fontWeight: '800', lineHeight: 30 },
  chapterHeroSub: { fontSize: 14, fontWeight: '600', fontStyle: 'italic' },
  chapterCard: {
    flexDirection: 'row', alignItems: 'center', borderRadius: 14,
    borderWidth: 1, padding: 14, gap: 12,
  },
  chapterNum: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  chapterNumText: { fontSize: 16, fontWeight: '800' },
  chapterIconSmall: { fontSize: 20 },
  sectionCountLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 2, marginBottom: 4 },

  /* ── Book hero ── */
  bookHero: { paddingHorizontal: 20, paddingBottom: 20, gap: 10 },
  bookHeroRow: { flexDirection: 'row', gap: 14, alignItems: 'flex-start' },
  bookHeroIcon: { fontSize: 40, marginTop: 4 },
  bookHeroLang: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginBottom: 4 },
  bookHeroTitle: { fontSize: 20, fontWeight: '800', lineHeight: 26 },
  bookHeroAuteur: { fontSize: 13, fontWeight: '500', fontStyle: 'italic', marginTop: 2 },
  bookHeroDesc: { fontSize: 13, lineHeight: 20, fontStyle: 'italic' },

  /* ── Recipe detail ── */
  recipeHero: { paddingHorizontal: 20, paddingBottom: 16, gap: 10 },
  recipeHeroRow: { flexDirection: 'row', gap: 14, alignItems: 'flex-start' },
  recipeHeroIcon: { fontSize: 44, marginTop: 4 },
  recipeHeroTitle: { fontSize: 22, fontWeight: '800', lineHeight: 28, marginTop: 4 },
  recipeHeroPlante: { fontSize: 12, fontWeight: '600', fontStyle: 'italic' },
  recipeMetaRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  metaChip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  metaChipText: { fontSize: 11, fontWeight: '600' },
  catBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, borderWidth: 1 },
  catBadgeText: { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  sectionCard: { borderRadius: 14, borderWidth: 1, padding: 16, gap: 10 },
  sectionCardTitle: { fontSize: 10, fontWeight: '800', letterSpacing: 2, marginBottom: 6 },
  ingredientRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start', paddingVertical: 4 },
  quantityBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, minWidth: 80, alignItems: 'center' },
  quantityText: { fontSize: 11, fontWeight: '700' },
  ingredientName: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
  ingredientNote: { fontSize: 11, fontStyle: 'italic', lineHeight: 16, marginTop: 2 },
  etapeRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  etapeNum: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  etapeNumText: { fontSize: 12, fontWeight: '800', color: '#FFF' },
  etapeText: { fontSize: 14, lineHeight: 22, flex: 1 },
  conseilsBox: { borderRadius: 14, borderWidth: 1, padding: 16, gap: 10 },
  conseilsTitle: { fontSize: 10, fontWeight: '800', letterSpacing: 2 },
  conseilsText: { fontSize: 14, lineHeight: 22 },
  precautionsBox: { borderRadius: 14, borderWidth: 1, padding: 16, gap: 10 },
  precautionsTitle: { fontSize: 10, fontWeight: '800', letterSpacing: 2 },
  precautionsText: { fontSize: 14, lineHeight: 22 },

  /* ── Article detail ── */
  articleHero: { paddingHorizontal: 20, paddingBottom: 16, gap: 6 },
  articleHeroIcon: { fontSize: 40, marginTop: 4 },
  articleHeroTitle: { fontSize: 24, fontWeight: '800', lineHeight: 30 },
  articleHeroSub: { fontSize: 13, fontWeight: '600', fontStyle: 'italic', lineHeight: 20 },
  articleHeroMeta: { flexDirection: 'row', gap: 16, marginTop: 6, flexWrap: 'wrap' },
  articleMetaText: { fontSize: 11, fontWeight: '500' },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tagChip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, borderWidth: 1 },
  tagText: { fontSize: 10, fontWeight: '700' },

  /* ── Source / shared ── */
  sourceBox: { borderRadius: 12, borderWidth: 1, padding: 14, gap: 8, marginTop: 4 },
  sourceLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 2 },
  sourceText: { fontSize: 12, lineHeight: 18, fontStyle: 'italic' },
  sourceRef: { fontSize: 11, lineHeight: 18, fontStyle: 'italic' },
});
