import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { fr } from './fr';
import { en } from './en';
import { mos } from './mos';
import { dyo } from './dyo';
import { ful } from './ful';

export type LangCode = 'fr' | 'en' | 'mos' | 'dyo' | 'ful';

export const LANG_NAMES: Record<LangCode, string> = {
  fr: 'Français',
  en: 'English',
  mos: 'Mooré',
  dyo: 'Dioula',
  ful: 'Fulfuldé',
};

export const LANG_CODES = Object.keys(LANG_NAMES) as LangCode[];

export interface QuizQuestion18n {
  q: string;
  a: string;
  b: string;
}

export interface Translations {
  // ── TABS
  tab_home: string;
  tab_animals: string;
  tab_knowledge: string;
  tab_my_animal: string;
  tab_profile: string;

  // ── HOME
  home_tagline: string;
  home_of_africa: string;
  home_of_west: string;
  home_wisdom_today: string;
  home_sacred_animals_label: string;
  home_guardians: string;
  home_cta_discover: string;
  home_cta_quiz: string;
  home_stat_animals: string;
  home_stat_categories: string;
  home_stat_questions: string;

  // ── ANIMALS
  animals_museum: string;
  animals_title: string;
  animals_search_placeholder: string;
  animals_none_found: string;
  animals_none_hint: string;

  // ── CATEGORIES (used in filter)
  cat_all: string;
  cat_mammals: string;
  cat_birds: string;
  cat_reptiles: string;
  cat_amphibians: string;
  cat_aquatic: string;
  cat_invertebrates: string;

  // ── QUIZ WELCOME
  quiz_revelation_label: string;
  quiz_title_line1: string;
  quiz_title_line2: string;
  quiz_subtitle: string;
  quiz_feat1_title: string;
  quiz_feat1_desc: string;
  quiz_feat2_title: string;
  quiz_feat2_desc: string;
  quiz_feat3_title: string;
  quiz_feat3_desc: string;
  quiz_start: string;
  quiz_prev_result: string;

  // ── QUIZ CHARTE
  quiz_charte_title: string;
  quiz_charte_subtitle: string;
  quiz_charte_theory_label: string;
  quiz_charte_theory_text: string;
  quiz_charte_dimensions_label: string;
  quiz_charte_cultural_label: string;
  quiz_charte_cultural_items: string[];
  quiz_charte_limits_label: string;
  quiz_charte_limits_items: string[];
  quiz_charte_cta: string;
  quiz_back: string;

  // ── QUIZ DIMENSIONS
  dim_E_label: string;
  dim_O_label: string;
  dim_C_label: string;
  dim_A_label: string;
  dim_S_label: string;
  dim_E_desc: string;
  dim_O_desc: string;
  dim_C_desc: string;
  dim_A_desc: string;
  dim_S_desc: string;

  // ── QUIZ QUESTIONS (20)
  quiz_questions: QuizQuestion18n[];

  // ── QUIZ RESULTS
  quiz_result_sacred_label: string;
  quiz_result_secondary_prefix: string;
  quiz_result_profile_title: string;
  quiz_result_profile_note: string;
  quiz_result_revelation_label: string;
  quiz_result_forces_label: string;
  quiz_result_defis_label: string;
  quiz_result_mantra_label: string;
  quiz_result_secondary_label: string;
  quiz_result_secondary_desc: string;
  quiz_result_see_full: string;
  quiz_restart: string;

  // ── MY ANIMAL
  my_animal_totem_label: string;
  my_animal_revealed_prefix: string;
  my_animal_soul_label: string;
  my_animal_primary: string;
  my_animal_secondary: string;
  my_animal_primary_desc: string;
  my_animal_secondary_desc: string;
  my_animal_qualities: string;
  my_animal_challenges: string;
  my_animal_daily_mantra: string;
  my_animal_daily_teaching: string;
  my_animal_explore_prefix: string;
  my_animal_retake: string;
  my_animal_empty_title1: string;
  my_animal_empty_title2: string;
  my_animal_empty_desc: string;
  my_animal_empty_cta: string;

  // ── PROFILE
  profile_sacred_label: string;
  profile_child_of_prefix: string;
  profile_explorer: string;
  profile_totem_badge: string;
  profile_favorites: string;
  profile_quiz_completed: string;
  profile_animals_count: string;
  profile_my_favorites: string;
  profile_no_fav: string;
  profile_no_fav_cta: string;
  profile_quiz_promo_label: string;
  profile_quiz_promo_title: string;
  profile_quiz_promo_desc: string;
  profile_quiz_promo_btn: string;
  profile_about: string;
  profile_app_label: string;
  profile_version: string;
  profile_language: string;
  profile_offline: string;
  profile_offline_value: string;
  profile_languages_label: string;

  // ── AUTH
  auth_welcome_back: string;
  auth_login_subtitle: string;
  auth_create_title: string;
  auth_register_subtitle: string;
  auth_username: string;
  auth_username_placeholder: string;
  auth_username_hint: string;
  auth_password: string;
  auth_password_placeholder: string;
  auth_confirm_password: string;
  auth_confirm_password_placeholder: string;
  auth_login_btn: string;
  auth_register_btn: string;
  auth_no_account: string;
  auth_create_account: string;
  auth_have_account: string;
  auth_login_link: string;
  auth_fields_required: string;
  auth_passwords_mismatch: string;
  auth_password_too_short: string;
  auth_logout: string;
  auth_logout_confirm: string;
  auth_logout_yes: string;
  auth_logout_no: string;
  auth_account_label: string;
  auth_member_since: string;
}

const TRANSLATIONS: Record<LangCode, Translations> = { fr, en, mos, dyo, ful };

const LANG_STORAGE_KEY = '@plantes_sacrees_language';

interface LanguageContextType {
  lang: LangCode;
  setLang: (code: LangCode) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('fr');

  useEffect(() => {
    AsyncStorage.getItem(LANG_STORAGE_KEY).then((stored) => {
      if (stored && LANG_CODES.includes(stored as LangCode)) {
        setLangState(stored as LangCode);
      }
    }).catch(() => {});
  }, []);

  const setLang = useCallback((code: LangCode) => {
    setLangState(code);
    AsyncStorage.setItem(LANG_STORAGE_KEY, code).catch(() => {});
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider');
  return ctx;
}
