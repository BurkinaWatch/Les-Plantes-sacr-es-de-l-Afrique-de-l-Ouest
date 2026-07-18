import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColors } from '@/hooks/useColors';
import { RECIPES, type Recipe } from '@/data/recipes';
import { ARTICLES, type Article } from '@/data/articles';
import { PLANTES_MEDICINALES, searchPlantes, type PlanteMedicinale } from '@/data/plantes-medicinales';

type Tab = 'recettes' | 'articles' | 'plantes';

const TABS: { key: Tab; label: string; emoji: string }[] = [
  { key: 'recettes', label: 'Recettes',  emoji: '🌿' },
  { key: 'articles', label: 'Articles',  emoji: '📰' },
  { key: 'plantes',  label: 'Plantes',   emoji: '🌱' },
];

export default function SavoirScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab]             = useState<Tab>('recettes');
  const [selectedRecipe,  setSelectedRecipe]  = useState<Recipe | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedPlante,  setSelectedPlante]  = useState<PlanteMedicinale | null>(null);
  const [planteSearch,    setPlanteSearch]    = useState('');

  const topPad = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;

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

          <View style={[styles.resumeBadge, { backgroundColor: 'rgba(0,0,0,0.25)', borderColor: r.couleur + '60' }]}>
            <Text style={[styles.resumeText, { color: colors.ivory }]}>{r.resume}</Text>
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
          <View style={[styles.resumeBadge, { backgroundColor: colors.card, borderColor: a.couleur + '50', marginBottom: 8 }]}>
            <Text style={[styles.resumeText, { color: colors.ivory }]}>{a.resume}</Text>
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

          <View style={styles.tagsRow}>
            {a.tags.map((tag, i) => (
              <View key={i} style={[styles.tagChip, { backgroundColor: a.couleur + '20', borderColor: a.couleur + '40' }]}>
                <Text style={[styles.tagText, { color: a.couleur }]}>{tag}</Text>
              </View>
            ))}
          </View>

          {a.sources && a.sources.length > 0 && (
            <View style={[styles.sourceBox, { borderColor: colors.border, backgroundColor: colors.card }]}>
              <Text style={[styles.sourceLabel, { color: colors.mutedForeground }]}>RÉFÉRENCES</Text>
              {a.sources.map((src, i) => (
                <Text key={i} style={[styles.sourceRef, { color: colors.mutedForeground }]}>• {src}</Text>
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
     PLANTE DETAIL VIEW
  ═════════════════════════════════════════════════════*/
  if (selectedPlante) {
    const p = selectedPlante;
    const nomsAfricainsEntries = Object.entries(p.nomsAfricains).filter(([, v]) => v);
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Hero */}
        <LinearGradient
          colors={[p.couleur + '60', colors.background]}
          style={[styles.planteHero, { paddingTop: topPad + 12 }]}
        >
          <Pressable
            onPress={() => setSelectedPlante(null)}
            style={({ pressed }) => [styles.backBtn, { opacity: pressed ? 0.7 : 1 }]}
          >
            <Text style={[styles.backBtnText, { color: p.couleur }]}>← Plantes médicinales</Text>
          </Pressable>

          <View style={[styles.catBadge, {
            backgroundColor: p.couleur + '30',
            borderColor: p.couleur + '60',
            alignSelf: 'flex-start',
            marginBottom: 10,
          }]}>
            <Text style={[styles.catBadgeText, { color: p.couleur }]}>
              {p.categorieTherapeutique.toUpperCase()}
            </Text>
          </View>

          <View style={styles.planteHeroRow}>
            <Text style={styles.planteHeroIcon}>{p.icone}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.planteHeroTitle, { color: colors.ivory }]}>{p.nomVulgaire}</Text>
              <Text style={[styles.planteHeroScientific, { color: p.couleur }]}>{p.nomScientifique}</Text>
              <Text style={[styles.planteHeroFamille, { color: colors.mutedForeground }]}>{p.famille}</Text>
            </View>
          </View>

          {/* Noms africains */}
          {nomsAfricainsEntries.length > 0 && (
            <View style={[styles.nomsAfricainsBox, { backgroundColor: 'rgba(0,0,0,0.25)', borderColor: p.couleur + '50' }]}>
              <Text style={[styles.nomsAfricainsLabel, { color: p.couleur }]}>🗣 NOMS AFRICAINS</Text>
              <View style={styles.nomsAfricainsGrid}>
                {nomsAfricainsEntries.map(([lang, nom]) => (
                  <View key={lang} style={styles.nomAfricainItem}>
                    <Text style={[styles.nomAfricainLang, { color: colors.mutedForeground }]}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </Text>
                    <Text style={[styles.nomAfricainVal, { color: colors.ivory }]}>{nom}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </LinearGradient>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.readingContent, { paddingBottom: 120 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Historique */}
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: p.couleur + '40' }]}>
            <Text style={[styles.sectionCardTitle, { color: p.couleur }]}>📜 HISTORIQUE ET TRADITION</Text>
            <Text style={[styles.paragraph, { color: colors.ivory, marginTop: 4 }]}>{p.historique}</Text>
          </View>

          {/* Description */}
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.sectionCardTitle, { color: p.couleur }]}>🌿 DESCRIPTION DE LA PLANTE</Text>
            <Text style={[styles.paragraph, { color: colors.ivory, marginTop: 4 }]}>{p.descriptionPlante}</Text>
          </View>

          {/* Action curative */}
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.sectionCardTitle, { color: p.couleur }]}>⚗️ ACTION CURATIVE</Text>
            <Text style={[styles.paragraph, { color: colors.ivory, marginTop: 4 }]}>{p.actionCurative}</Text>
          </View>

          {/* Parties utilisées */}
          <View style={[styles.partiesRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.sectionCardTitle, { color: p.couleur }]}>🫚 PARTIES UTILISÉES</Text>
            <View style={styles.partiesChips}>
              {p.partiesUtilisees.map((partie, i) => (
                <View key={i} style={[styles.partieChip, { backgroundColor: p.couleur + '20', borderColor: p.couleur + '50' }]}>
                  <Text style={[styles.partieChipText, { color: p.couleur }]}>{partie}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Emplois */}
          <Text style={[styles.readingSubtitle, { color: p.couleur }]}>EMPLOIS PRATIQUES</Text>
          {p.emplois.map((emploi, i) => (
            <LinearGradient
              key={i}
              colors={[p.couleur + '20', p.couleur + '08']}
              style={[styles.emploiBox, { borderColor: p.couleur + '50' }]}
            >
              <Text style={[styles.emploiIndication, { color: p.couleur }]}>{emploi.indication}</Text>
              <Text style={[styles.emploiPreparation, { color: colors.ivory }]}>{emploi.preparation}</Text>
            </LinearGradient>
          ))}

          {/* Précautions */}
          {p.precautions && (
            <View style={[styles.precautionsBox, { backgroundColor: '#FF6B0015', borderColor: '#FF6B0060' }]}>
              <Text style={[styles.precautionsTitle, { color: '#E74C3C' }]}>⚠️ PRÉCAUTIONS</Text>
              <Text style={[styles.precautionsText, { color: colors.ivory }]}>{p.precautions}</Text>
            </View>
          )}

          {/* Source */}
          <View style={[styles.sourceBox, { borderColor: colors.border, backgroundColor: colors.card }]}>
            <Text style={[styles.sourceLabel, { color: colors.mutedForeground }]}>SOURCE</Text>
            <Text style={[styles.sourceText, { color: colors.mutedForeground }]}>{p.source}</Text>
            <Text style={[styles.sourceDisclaimer, { color: colors.mutedForeground }]}>
              Ces informations sont à titre éducatif. Consultez un professionnel de santé avant tout usage thérapeutique.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  /* ════════════════════════════════════════════════════
     MAIN LIST VIEW
  ═════════════════════════════════════════════════════*/
  const filteredPlantes = planteSearch.trim() ? searchPlantes(planteSearch) : PLANTES_MEDICINALES;

  const headerTitles: Record<Tab, string> = {
    recettes: 'Recettes de Plantes',
    articles: 'Articles & Savoirs',
    plantes:  'Plantes Médicinales',
  };

  const headerSubs: Record<Tab, string> = {
    recettes: `${RECIPES.length} recettes · Plantes médicinales & cuisine`,
    articles: `${ARTICLES.length} articles · Ethnobotanique & culture`,
    plantes:  `${PLANTES_MEDICINALES.length} plantes · Pharmacopée africaine`,
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

        {/* Tab bar */}
        <View style={[styles.segmentRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <Pressable
                key={tab.key}
                style={[styles.segmentBtn, isActive && { backgroundColor: colors.gold }]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text style={[
                  styles.segmentText,
                  { color: isActive ? colors.deepBrown : colors.mutedForeground },
                ]}>
                  {tab.emoji} {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Plante search bar */}
        {activeTab === 'plantes' && (
          <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={{ fontSize: 14 }}>🔍</Text>
            <TextInput
              style={[styles.searchInput, { color: colors.ivory }]}
              placeholder="Rechercher une plante, indication..."
              placeholderTextColor={colors.mutedForeground}
              value={planteSearch}
              onChangeText={setPlanteSearch}
              returnKeyType="search"
            />
            {planteSearch.length > 0 && (
              <Pressable onPress={() => setPlanteSearch('')}>
                <Text style={[styles.searchClear, { color: colors.mutedForeground }]}>✕</Text>
              </Pressable>
            )}
          </View>
        )}
      </LinearGradient>

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
                styles.card,
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
                <View style={styles.cardBottomRow}>
                  <Text style={[styles.cardMeta, { color: colors.mutedForeground }]}>{recipe.tradition}</Text>
                  <View style={[styles.diffBadge, {
                    backgroundColor: recipe.difficulte === 'Facile' ? '#27AE6020'
                      : recipe.difficulte === 'Moyen' ? '#F39C1220' : '#E74C3C20',
                  }]}>
                    <Text style={[styles.diffText, {
                      color: recipe.difficulte === 'Facile' ? '#27AE60'
                        : recipe.difficulte === 'Moyen' ? '#F39C12' : '#E74C3C',
                    }]}>
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
                styles.card,
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
                <Text style={[styles.articleAuthor, { color: colors.mutedForeground }]}>
                  ✍️ {article.auteur} · {article.annee}
                </Text>
              </View>
              <Text style={[styles.arrow, { color: article.couleur }]}>›</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}

      {/* ════ PLANTES LIST ════ */}
      {activeTab === 'plantes' && (
        <ScrollView
          contentContainerStyle={[styles.listContent, { paddingBottom: 100 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
        >
          {filteredPlantes.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={{ fontSize: 40 }}>🌿</Text>
              <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
                Aucune plante trouvée pour « {planteSearch} »
              </Text>
            </View>
          )}
          {filteredPlantes.map((plante) => (
            <Pressable
              key={plante.id}
              style={({ pressed }) => [
                styles.card,
                { backgroundColor: colors.card, borderColor: plante.couleur + '50', opacity: pressed ? 0.88 : 1 },
              ]}
              onPress={() => setSelectedPlante(plante)}
            >
              <LinearGradient
                colors={[plante.couleur + '22', 'transparent']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
              />
              <View style={[styles.iconWrap, { backgroundColor: plante.couleur + '28' }]}>
                <Text style={styles.iconText}>{plante.icone}</Text>
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <View style={[styles.catChip, { backgroundColor: plante.couleur + '25', alignSelf: 'flex-start' }]}>
                  <Text style={[styles.catChipText, { color: plante.couleur }]} numberOfLines={1}>
                    {plante.categorieTherapeutique.toUpperCase()}
                  </Text>
                </View>
                <Text style={[styles.cardTitle, { color: colors.ivory }]}>{plante.nomVulgaire}</Text>
                <Text style={[styles.planteScientificSmall, { color: plante.couleur }]}>
                  {plante.nomScientifique}
                </Text>
                <View style={styles.planteNomsRow}>
                  {plante.nomsAfricains.wolof && (
                    <Text style={[styles.planteNomTag, { color: colors.mutedForeground }]}>
                      Wolof: {plante.nomsAfricains.wolof.split(',')[0].trim()}
                    </Text>
                  )}
                  {plante.nomsAfricains.bambara && (
                    <Text style={[styles.planteNomTag, { color: colors.mutedForeground }]}>
                      Bambara: {plante.nomsAfricains.bambara.split(',')[0].trim()}
                    </Text>
                  )}
                </View>
                <Text style={[styles.cardDesc, { color: colors.mutedForeground }]} numberOfLines={2}>
                  {plante.emplois[0]?.indication}
                </Text>
              </View>
              <Text style={[styles.arrow, { color: plante.couleur }]}>›</Text>
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

  /* Header */
  header: { paddingHorizontal: 24, paddingBottom: 12, gap: 4 },
  headerLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 2.5, marginBottom: 4 },
  headerTitle: { fontSize: 30, fontWeight: '800', letterSpacing: 0.5 },
  headerSub: { fontSize: 12, marginTop: 2, marginBottom: 10 },

  /* Segment control */
  segmentRow: {
    flexDirection: 'row', borderRadius: 12, borderWidth: 1,
    padding: 3, marginTop: 8, gap: 3,
  },
  segmentBtn: { flex: 1, paddingVertical: 9, borderRadius: 9, alignItems: 'center' },
  segmentText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.3 },

  /* Search */
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderRadius: 12, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 9,
    marginTop: 10,
  },
  searchInput: { flex: 1, fontSize: 14, fontWeight: '500' },
  searchClear: { fontSize: 14, paddingHorizontal: 4 },

  /* Lists */
  listContent: { padding: 16, gap: 12 },
  arrow: { fontSize: 22, fontWeight: '300' },

  /* Cards (shared) */
  card: {
    flexDirection: 'row', alignItems: 'center', borderRadius: 16,
    borderWidth: 1, padding: 14, gap: 12, overflow: 'hidden',
  },
  iconWrap: { width: 52, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  iconText: { fontSize: 28 },
  cardMetaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardDur: { fontSize: 10, fontWeight: '500' },
  cardTitle: { fontSize: 15, fontWeight: '800', letterSpacing: 0.1, lineHeight: 20 },
  cardSub: { fontSize: 12, fontWeight: '600', fontStyle: 'italic' },
  cardMeta: { fontSize: 10, fontWeight: '500' },
  cardDesc: { fontSize: 11, lineHeight: 16 },
  cardBottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  catChip: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  catChipText: { fontSize: 9, fontWeight: '700', letterSpacing: 0.8 },
  diffBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  diffText: { fontSize: 9, fontWeight: '700' },

  /* Article list specifics */
  articleTitleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  articleCardIcon: { fontSize: 22, marginTop: 1 },
  articleAuthor: { fontSize: 10, fontWeight: '500', fontStyle: 'italic' },

  /* Plante list specifics */
  planteScientificSmall: { fontSize: 11, fontStyle: 'italic', fontWeight: '600' },
  planteNomsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  planteNomTag: { fontSize: 9, fontWeight: '500' },

  /* Empty state */
  emptyState: { alignItems: 'center', paddingTop: 60, gap: 16 },
  emptyText: { fontSize: 14, textAlign: 'center', fontStyle: 'italic' },

  /* Back button */
  backBtn: { marginBottom: 12 },
  backBtnText: { fontSize: 14, fontWeight: '700', letterSpacing: 0.5 },

  /* Reading */
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

  /* Resume badge */
  resumeBadge: { borderRadius: 10, borderWidth: 1, padding: 12 },
  resumeText: { fontSize: 13, lineHeight: 20, fontStyle: 'italic' },

  /* Recipe detail */
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

  /* Article detail */
  articleHero: { paddingHorizontal: 20, paddingBottom: 16, gap: 6 },
  articleHeroIcon: { fontSize: 40, marginTop: 4 },
  articleHeroTitle: { fontSize: 24, fontWeight: '800', lineHeight: 30 },
  articleHeroSub: { fontSize: 13, fontWeight: '600', fontStyle: 'italic', lineHeight: 20 },
  articleHeroMeta: { flexDirection: 'row', gap: 16, marginTop: 6, flexWrap: 'wrap' },
  articleMetaText: { fontSize: 11, fontWeight: '500' },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tagChip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, borderWidth: 1 },
  tagText: { fontSize: 10, fontWeight: '700' },

  /* Plante detail */
  planteHero: { paddingHorizontal: 20, paddingBottom: 16, gap: 8 },
  planteHeroRow: { flexDirection: 'row', gap: 14, alignItems: 'flex-start' },
  planteHeroIcon: { fontSize: 46, marginTop: 4 },
  planteHeroTitle: { fontSize: 24, fontWeight: '800', lineHeight: 30, marginTop: 4 },
  planteHeroScientific: { fontSize: 14, fontStyle: 'italic', fontWeight: '600', marginTop: 2 },
  planteHeroFamille: { fontSize: 11, fontWeight: '500', marginTop: 2 },
  nomsAfricainsBox: { borderRadius: 12, borderWidth: 1, padding: 12, gap: 8 },
  nomsAfricainsLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 2 },
  nomsAfricainsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  nomAfricainItem: { minWidth: 100 },
  nomAfricainLang: { fontSize: 9, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  nomAfricainVal: { fontSize: 12, fontStyle: 'italic', fontWeight: '600' },
  partiesRow: { borderRadius: 14, borderWidth: 1, padding: 14, gap: 10 },
  partiesChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  partieChip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth: 1 },
  partieChipText: { fontSize: 11, fontWeight: '600' },
  emploiBox: { borderRadius: 14, borderWidth: 1, padding: 16, gap: 8 },
  emploiIndication: { fontSize: 13, fontWeight: '800', letterSpacing: 0.5 },
  emploiPreparation: { fontSize: 14, lineHeight: 22 },

  /* Source */
  sourceBox: { borderRadius: 12, borderWidth: 1, padding: 14, gap: 8, marginTop: 4 },
  sourceLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 2 },
  sourceText: { fontSize: 12, lineHeight: 18, fontStyle: 'italic' },
  sourceRef: { fontSize: 11, lineHeight: 18, fontStyle: 'italic' },
  sourceDisclaimer: { fontSize: 10, lineHeight: 16, marginTop: 4, fontStyle: 'italic' },
});
