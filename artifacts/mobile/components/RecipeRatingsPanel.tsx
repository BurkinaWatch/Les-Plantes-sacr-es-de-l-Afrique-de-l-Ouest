import {
  getGetRecipeRatingsQueryKey,
  useGetRecipeRatings,
  useSaveRecipeRating,
  type RecipeId,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";

type RatingScores = {
  taste: number;
  preparationEase: number;
};

type RatingDimension = keyof RatingScores;

const SCALE = [1, 2, 3, 4, 5] as const;

function getHttpStatus(error: unknown): number | undefined {
  if (typeof error !== "object" || error === null || !("status" in error)) {
    return undefined;
  }
  const status = error.status;
  return typeof status === "number" ? status : undefined;
}

function formatAverage(value: number | null): string {
  return value === null ? "—" : value.toFixed(1);
}

export function RecipeRatingsPanel({
  recipeId,
  accentColor,
}: {
  recipeId: string;
  accentColor: string;
}) {
  const colors = useColors();
  const queryClient = useQueryClient();
  // Recipe IDs are kept in sync with the OpenAPI enum and checked by tests.
  const typedRecipeId = recipeId as RecipeId;
  const ratingQuery = useGetRecipeRatings(typedRecipeId, {
    query: { staleTime: 5 * 60_000 },
  });
  const [draft, setDraft] = useState<RatingScores | null>(null);
  const [notice, setNotice] = useState("");
  const saveMutation = useSaveRecipeRating({
    mutation: {
      onSuccess: (summary) => {
        queryClient.setQueryData(
          getGetRecipeRatingsQueryKey(typedRecipeId),
          summary,
        );
        setDraft(null);
        setNotice("Votre avis culinaire a été enregistré.");
      },
    },
  });

  const saved = ratingQuery.data?.myRating ?? null;
  const taste = draft?.taste ?? saved?.taste ?? 0;
  const preparationEase = draft?.preparationEase ?? saved?.preparationEase ?? 0;
  const ratingCount = ratingQuery.data?.ratingCount ?? 0;
  const canSave = taste > 0 && preparationEase > 0 && (
    saved === null || saved.taste !== taste || saved.preparationEase !== preparationEase
  );

  const setScore = (dimension: RatingDimension, score: number) => {
    setNotice("");
    saveMutation.reset();
    setDraft({
      taste: dimension === "taste" ? score : taste,
      preparationEase: dimension === "preparationEase" ? score : preparationEase,
    });
  };

  const submit = () => {
    if (!canSave || saveMutation.isPending) return;
    saveMutation.mutate({
      recipeId: typedRecipeId,
      data: { taste, preparationEase },
    });
  };

  const requestError = ratingQuery.isError
    ? getHttpStatus(ratingQuery.error) === 401
      ? "Connectez-vous pour consulter et déposer un avis culinaire."
      : "Les avis ne sont pas disponibles pour le moment."
    : "";
  const saveError = saveMutation.isError
    ? getHttpStatus(saveMutation.error) === 401
      ? "Votre session a expiré. Reconnectez-vous pour enregistrer votre avis."
      : "Impossible d’enregistrer cet avis. Vérifiez votre connexion puis réessayez."
    : "";

  const renderScale = (dimension: RatingDimension, label: string, selected: number) => (
    <View style={styles.dimension}>
      <Text style={[styles.dimensionLabel, { color: colors.ivory }]}>{label}</Text>
      <View style={styles.scaleRow}>
        {SCALE.map((score) => {
          const isSelected = selected === score;
          return (
            <Pressable
              key={`${dimension}-${score}`}
              accessibilityRole="button"
              accessibilityState={{
                selected: isSelected,
                disabled: ratingQuery.isLoading || saveMutation.isPending,
              }}
              accessibilityLabel={`${label} : ${score} sur 5`}
              disabled={ratingQuery.isLoading || saveMutation.isPending}
              onPress={() => setScore(dimension, score)}
              style={({ pressed }) => [
                styles.scaleButton,
                {
                  backgroundColor: isSelected ? accentColor : colors.background,
                  borderColor: isSelected ? accentColor : colors.border,
                  opacity: pressed ? 0.72 : 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.scaleButtonText,
                  { color: isSelected ? colors.primaryForeground : colors.mutedForeground },
                ]}
              >
                {score}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.headingRow}>
        <Text style={[styles.heading, { color: accentColor }]}>AVIS CULINAIRES</Text>
        <Text style={[styles.count, { color: colors.mutedForeground }]}>
          {ratingQuery.isLoading ? "…" : `${ratingCount} avis`}
        </Text>
      </View>

      <Text style={[styles.explainer, { color: colors.mutedForeground }]}>
        Ces notes portent uniquement sur le goût et la facilité de préparation, pas sur un effet médical.
      </Text>

      {ratingQuery.isLoading ? (
        <Text accessibilityRole="text" style={[styles.status, { color: colors.mutedForeground }]}>
          Chargement des avis…
        </Text>
      ) : ratingQuery.isError ? (
        <View style={styles.errorBlock}>
          <Text accessibilityRole="alert" style={[styles.status, { color: colors.ivory }]}>
            {requestError}
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => void ratingQuery.refetch()}
            style={({ pressed }) => [
              styles.retryButton,
              { borderColor: accentColor, opacity: pressed ? 0.72 : 1 },
            ]}
          >
            <Text style={[styles.retryText, { color: accentColor }]}>Réessayer</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View style={styles.summaryRow}>
            <View style={[styles.summaryChip, { borderColor: colors.border }]}>
              <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>GOÛT</Text>
              <Text style={[styles.summaryValue, { color: colors.ivory }]}>
                {formatAverage(ratingQuery.data?.tasteAverage ?? null)}<Text style={styles.outOfFive}> / 5</Text>
              </Text>
            </View>
            <View style={[styles.summaryChip, { borderColor: colors.border }]}>
              <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>PRÉPARATION</Text>
              <Text style={[styles.summaryValue, { color: colors.ivory }]}>
                {formatAverage(ratingQuery.data?.preparationEaseAverage ?? null)}<Text style={styles.outOfFive}> / 5</Text>
              </Text>
            </View>
          </View>

          {ratingCount === 0 && (
            <Text style={[styles.status, { color: colors.mutedForeground }]}>
              Aucun avis pour le moment.
            </Text>
          )}

          {renderScale("taste", "Comment avez-vous trouvé le goût ?", taste)}
          {renderScale("preparationEase", "La préparation était-elle facile ?", preparationEase)}

          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: !canSave || saveMutation.isPending }}
            disabled={!canSave || saveMutation.isPending}
            onPress={submit}
            style={({ pressed }) => [
              styles.submitButton,
              {
                backgroundColor: !canSave || saveMutation.isPending
                  ? colors.muted
                  : accentColor,
                opacity: pressed ? 0.82 : 1,
              },
            ]}
          >
            <Text style={[styles.submitText, { color: colors.primaryForeground }]}>
              {saveMutation.isPending
                ? "Enregistrement…"
                : saved
                  ? "Mettre à jour mon avis"
                  : "Enregistrer mon avis"}
            </Text>
          </Pressable>
          {!!notice && (
            <Text accessibilityRole="text" style={[styles.status, { color: colors.savanna }]}>
              {notice}
            </Text>
          )}
          {!!saveError && (
            <Text accessibilityRole="alert" style={[styles.status, { color: colors.ivory }]}>
              {saveError}
            </Text>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 12,
    marginTop: 4,
  },
  headingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  heading: { fontSize: 10, fontWeight: "800", letterSpacing: 1.5 },
  count: { fontSize: 11, fontWeight: "600" },
  explainer: { fontSize: 12, lineHeight: 18 },
  summaryRow: { flexDirection: "row", gap: 10 },
  summaryChip: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    gap: 4,
  },
  summaryLabel: { fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  summaryValue: { fontSize: 18, fontWeight: "800" },
  outOfFive: { fontSize: 11, fontWeight: "500" },
  dimension: { gap: 8 },
  dimensionLabel: { fontSize: 13, fontWeight: "700" },
  scaleRow: { flexDirection: "row", gap: 8 },
  scaleButton: {
    width: 42,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  scaleButtonText: { fontSize: 14, fontWeight: "800" },
  submitButton: {
    minHeight: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 2,
  },
  submitText: { fontSize: 13, fontWeight: "800" },
  status: { fontSize: 12, lineHeight: 18 },
  errorBlock: { gap: 8 },
  retryButton: {
    minHeight: 40,
    borderWidth: 1,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 16,
  },
  retryText: { fontSize: 12, fontWeight: "700" },
});
