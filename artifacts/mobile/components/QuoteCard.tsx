import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { Quote } from '@/data/quotes';
import { useColors } from '@/hooks/useColors';

interface Props {
  quote: Quote;
}

export function QuoteCard({ quote }: Props) {
  const colors = useColors();

  return (
    <LinearGradient
      colors={['#2A1608', '#1A0E08']}
      style={[styles.container, { borderColor: colors.gold + '40' }]}
    >
      <View style={styles.decorLeft}>
        <View style={[styles.decorLine, { backgroundColor: colors.gold }]} />
        <View style={[styles.decorDot, { backgroundColor: colors.gold }]} />
        <View style={[styles.decorLine, { backgroundColor: colors.gold }]} />
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.openQuote, { color: colors.gold }]}>"</Text>
        <Text style={[styles.quote, { color: colors.ivory }]}>{quote.texte}</Text>
        <Text style={[styles.source, { color: colors.mutedForeground }]}>— {quote.origine}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    gap: 16,
    marginHorizontal: 4,
  },
  decorLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingTop: 4,
  },
  decorLine: {
    width: 1.5,
    height: 20,
    borderRadius: 1,
    opacity: 0.7,
  },
  decorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  textContainer: {
    flex: 1,
  },
  openQuote: {
    fontSize: 40,
    lineHeight: 36,
    fontWeight: '700' as const,
    marginBottom: 4,
  },
  quote: {
    fontSize: 15,
    lineHeight: 24,
    fontStyle: 'italic',
    fontWeight: '400' as const,
  },
  source: {
    fontSize: 12,
    marginTop: 10,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
  },
});
