export const CATEGORY_LABEL_KEYS = {
  'Arbres Sacrés': 'cat_sacred_trees',
  'Plantes Médicinales': 'cat_medicinal_plants',
  'Plantes Alimentaires': 'cat_food_plants',
  'Plantes Rituelles': 'cat_ritual_plants',
  'Herbes & Graminées': 'cat_herbs_grasses',
  Palmiers: 'cat_palms',
} as const;

export type PlantCategory = keyof typeof CATEGORY_LABEL_KEYS;
type CategoryLabelKey = (typeof CATEGORY_LABEL_KEYS)[PlantCategory];
type CategoryTranslations = Record<CategoryLabelKey, string>;

export function getCategoryLabels(
  translations: CategoryTranslations,
): Record<PlantCategory, string> {
  return {
    'Arbres Sacrés': translations.cat_sacred_trees,
    'Plantes Médicinales': translations.cat_medicinal_plants,
    'Plantes Alimentaires': translations.cat_food_plants,
    'Plantes Rituelles': translations.cat_ritual_plants,
    'Herbes & Graminées': translations.cat_herbs_grasses,
    Palmiers: translations.cat_palms,
  };
}