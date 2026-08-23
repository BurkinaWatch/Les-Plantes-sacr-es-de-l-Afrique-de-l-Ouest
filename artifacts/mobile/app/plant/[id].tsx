/**
 * Deep-link redirect: plantessacrees://plant/:id → /animal/:id
 *
 * expo-router maps the file-system path to URLs, so a link like
 *   plantessacrees://plant/baobab
 * lands here. We immediately redirect to the canonical plant-detail
 * route (animal/[id]) which handles both animals and plants.
 */
import { Redirect, useLocalSearchParams } from 'expo-router';
import React from 'react';

export default function PlantRedirect() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <Redirect href={`/animal/${id ?? ''}`} />;
}
