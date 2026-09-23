import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SacredIcon } from "@/components/SacredIcon";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";
import {
  useCreateSubscriptionPayment,
  useGetSubscriptionPlans,
  useGetSubscriptionStatus,
  useReconcileSubscriptionPayment,
} from "@workspace/api-client-react";

export default function AbonnementScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<"MONTHLY" | "YEARLY">("MONTHLY");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const plansQuery = useGetSubscriptionPlans();
  const statusQuery = useGetSubscriptionStatus({
    query: { enabled: Boolean(user), queryKey: ["subscription-status"] },
  });
  const paymentMutation = useCreateSubscriptionPayment();
  const reconcileMutation = useReconcileSubscriptionPayment();

  useEffect(() => {
    const hasConfiguredPlan = plansQuery.data?.plans.some(
      (plan) => plan.active && Boolean(plan.amount && plan.currency),
    );
    if (!user || !hasConfiguredPlan) return;
    reconcileMutation.mutate(undefined, {
      onSuccess: () => {
        statusQuery.refetch();
      },
    });
  }, [user, plansQuery.data?.plans]);

  const selected = useMemo(
    () => plansQuery.data?.plans.find((plan) => plan.code === selectedPlan),
    [plansQuery.data?.plans, selectedPlan],
  );
  const isConfigured = Boolean(selected?.active && selected.amount && selected.currency);

  async function startPayment() {
    if (!user || !isConfigured) return;
    setMessage(null);
    paymentMutation.mutate(
      {
        data: {
          planCode: selectedPlan,
          customerEmail: email.trim(),
          customerName: user.username,
        },
      },
      {
        onSuccess: async (checkout) => {
          await Linking.openURL(checkout.checkoutUrl);
          setMessage("Le checkout sécurisé a été ouvert.");
          statusQuery.refetch();
        },
        onError: (error) => {
          setMessage(error instanceof Error ? error.message : "Paiement indisponible.");
        },
      },
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: insets.top + 18, paddingBottom: 40 }}
    >
      <View style={styles.topRow}>
        <Pressable onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Retour">
          <SacredIcon name="arrow-left" size={24} color={colors.ivory} />
        </Pressable>
        <Text style={[styles.title, { color: colors.ivory }]}>Abonnement</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={[styles.intro, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.eyebrow, { color: colors.gold }]}>ACCÈS SOUTIEN</Text>
        <Text style={[styles.heading, { color: colors.ivory }]}>
          Soutenez la transmission des savoirs sacrés
        </Text>
        <Text style={[styles.body, { color: colors.mutedForeground }]}>
          Les plans sont préparés. Les prix et la devise seront activés après validation de la configuration commerciale.
        </Text>
      </View>

      {statusQuery.data?.subscription && (
        <View style={[styles.statusCard, { backgroundColor: colors.card, borderColor: colors.gold }]}>
          <Text style={[styles.statusTitle, { color: colors.ivory }]}>Votre abonnement</Text>
          <Text style={[styles.body, { color: colors.mutedForeground }]}>
            {statusQuery.data.subscription.planName} · {statusQuery.data.subscription.status}
          </Text>
        </View>
      )}

      {plansQuery.isLoading ? (
        <ActivityIndicator color={colors.gold} style={{ marginTop: 28 }} />
      ) : (
        <View style={styles.planList}>
          {plansQuery.data?.plans.map((plan) => {
            const selectedCard = plan.code === selectedPlan;
            return (
              <Pressable
                key={plan.code}
                onPress={() => setSelectedPlan(plan.code as "MONTHLY" | "YEARLY")}
                style={[
                  styles.planCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: selectedCard ? colors.gold : colors.border,
                    opacity: plan.active ? 1 : 0.78,
                  },
                ]}
              >
                <View style={styles.planHeader}>
                  <Text style={[styles.planName, { color: colors.ivory }]}>{plan.name}</Text>
                  <View style={[styles.radio, { borderColor: selectedCard ? colors.gold : colors.border }]}>
                    {selectedCard && <View style={[styles.radioDot, { backgroundColor: colors.gold }]} />}
                  </View>
                </View>
                <Text style={[styles.planDescription, { color: colors.mutedForeground }]}>
                  {plan.amount && plan.currency ? `${plan.amount} ${plan.currency}` : "Prix à définir"}
                </Text>
                {!plan.active && (
                  <Text style={[styles.unavailable, { color: colors.gold }]}>Bientôt disponible</Text>
                )}
              </Pressable>
            );
          })}
        </View>
      )}

      {!user ? (
        <Text style={[styles.body, { color: colors.mutedForeground, marginTop: 18 }]}>
          Connectez-vous pour gérer un abonnement.
        </Text>
      ) : (
        <>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Votre adresse e-mail"
            placeholderTextColor={colors.mutedForeground}
            autoCapitalize="none"
            keyboardType="email-address"
            style={[styles.input, { color: colors.ivory, borderColor: colors.border, backgroundColor: colors.card }]}
          />
          <Pressable
            disabled={!isConfigured || !email.trim() || paymentMutation.isPending}
            onPress={startPayment}
            style={[
              styles.button,
              { backgroundColor: colors.gold, opacity: !isConfigured || !email.trim() ? 0.45 : 1 },
            ]}
          >
            {paymentMutation.isPending ? (
              <ActivityIndicator color={colors.deepBrown} />
            ) : (
              <Text style={[styles.buttonText, { color: colors.deepBrown }]}>
                {isConfigured ? "Continuer vers le paiement" : "Paiement bientôt disponible"}
              </Text>
            )}
          </Pressable>
        </>
      )}
      {message && <Text style={[styles.message, { color: colors.mutedForeground }]}>{message}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 22 },
  title: { fontSize: 20, fontWeight: "800" as const },
  intro: { borderRadius: 18, borderWidth: 1, padding: 20, gap: 9 },
  eyebrow: { fontSize: 10, letterSpacing: 2.2, fontWeight: "800" as const },
  heading: { fontSize: 23, lineHeight: 29, fontWeight: "800" as const },
  body: { fontSize: 14, lineHeight: 21 },
  statusCard: { borderRadius: 16, borderWidth: 1, padding: 16, marginTop: 16, gap: 6 },
  statusTitle: { fontSize: 15, fontWeight: "700" as const },
  planList: { gap: 12, marginTop: 20 },
  planCard: { borderRadius: 16, borderWidth: 1, padding: 17, gap: 8 },
  planHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  planName: { fontSize: 17, fontWeight: "700" as const },
  planDescription: { fontSize: 14 },
  unavailable: { fontSize: 12, fontWeight: "700" as const },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  radioDot: { width: 10, height: 10, borderRadius: 5 },
  input: { borderWidth: 1, borderRadius: 12, padding: 15, marginTop: 20, fontSize: 15 },
  button: { borderRadius: 13, padding: 16, alignItems: "center", marginTop: 12 },
  buttonText: { fontSize: 15, fontWeight: "800" as const },
  message: { textAlign: "center", marginTop: 14, lineHeight: 20 },
});