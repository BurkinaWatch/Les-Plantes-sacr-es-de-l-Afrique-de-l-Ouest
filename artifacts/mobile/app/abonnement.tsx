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
  const [customerName, setCustomerName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

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
  const validEmail = /^\S+@\S+\.\S+$/.test(email.trim());
  const hasActiveSubscription = statusQuery.data?.subscription?.status === "ACTIVE";
  const hasPendingSubscription = statusQuery.data?.subscription?.status === "PENDING";

  async function startPayment() {
    if (
      !user ||
      !isConfigured ||
      !validEmail ||
      customerName.trim().length < 2 ||
      hasActiveSubscription
    ) {
      return;
    }
    setMessage(null);
    paymentMutation.mutate(
      {
        data: {
          planCode: selectedPlan,
          customerEmail: email.trim(),
          customerName: customerName.trim(),
        },
      },
      {
        onSuccess: async (checkout) => {
          setCheckoutUrl(checkout.checkoutUrl);
          try {
            await Linking.openURL(checkout.checkoutUrl);
            setMessage(
              "Le paiement s’effectue sur la page sécurisée SAS Pay. Revenez ici après le règlement pour vérifier votre abonnement.",
            );
          } catch {
            setMessage(
              "Le checkout est prêt, mais n’a pas pu s’ouvrir. Utilisez le bouton pour reprendre le paiement.",
            );
          }
          statusQuery.refetch();
        },
        onError: (error) => {
          setMessage(error instanceof Error ? error.message : "Paiement indisponible.");
        },
      },
    );
  }

  function openCheckout() {
    if (!checkoutUrl) return;
    Linking.openURL(checkoutUrl).catch(() => {
      setMessage("Impossible d’ouvrir la page SAS Pay. Vérifiez votre connexion et réessayez.");
    });
  }

  function reconcilePayment() {
    reconcileMutation.mutate(undefined, {
      onSuccess: async (result) => {
        await statusQuery.refetch();
        if (result.activated > 0) {
          setCheckoutUrl(null);
          setMessage("Paiement confirmé. Votre abonnement est actif.");
        } else if (result.checked > 0) {
          setMessage("Aucun paiement confirmé pour le moment. Réessayez après le règlement.");
        } else {
          setMessage("Aucun paiement en attente à vérifier.");
        }
      },
      onError: () => {
        setMessage("La vérification a échoué. Vérifiez votre connexion et réessayez.");
      },
    });
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
          Choisissez une formule mensuelle ou annuelle. Le paiement est traité sur la page sécurisée SAS Pay.
        </Text>
      </View>

      {statusQuery.data?.subscription && (
        <View style={[styles.statusCard, { backgroundColor: colors.card, borderColor: colors.gold }]}>
          <Text style={[styles.statusTitle, { color: colors.ivory }]}>Votre abonnement</Text>
          <Text style={[styles.body, { color: colors.mutedForeground }]}>
            {statusQuery.data.subscription.planName} · {
              statusQuery.data.subscription.status === "ACTIVE"
                ? "Actif"
                : statusQuery.data.subscription.status === "PENDING"
                  ? "Paiement en attente"
                  : statusQuery.data.subscription.status === "FAILED"
                    ? "Échec du paiement"
                    : statusQuery.data.subscription.status === "CANCELLED"
                      ? "Résilié"
                      : "Expiré"
            }
          </Text>
          {statusQuery.data.subscription.expiresAt && (
            <Text style={[styles.body, { color: colors.mutedForeground }]}>
              Valable jusqu’au {new Date(statusQuery.data.subscription.expiresAt).toLocaleDateString("fr-FR")}
            </Text>
          )}
        </View>
      )}

      {plansQuery.isLoading ? (
        <ActivityIndicator color={colors.gold} style={{ marginTop: 28 }} />
      ) : plansQuery.isError ? (
        <View style={[styles.planCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.body, { color: colors.mutedForeground }]}>
            Impossible de charger les formules pour le moment.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => plansQuery.refetch()}
            style={[styles.secondaryButton, { borderColor: colors.gold }]}
          >
            <Text style={[styles.buttonText, { color: colors.gold }]}>Réessayer</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.planList}>
          {(plansQuery.data?.plans ?? []).map((plan) => {
            const selectedCard = plan.code === selectedPlan;
            const available = plan.active && Boolean(plan.amount && plan.currency);
            return (
              <Pressable
                key={plan.code}
                disabled={!available}
                onPress={() => setSelectedPlan(plan.code)}
                style={[
                  styles.planCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: selectedCard ? colors.gold : colors.border,
                    opacity: available ? 1 : 0.62,
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
                  {plan.amount && plan.currency
                    ? `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Number(plan.amount))} ${plan.currency} / ${plan.period === "MONTHLY" ? "mois" : "an"}`
                    : "Tarif non configuré"}
                </Text>
                {plan.description && (
                  <Text style={[styles.planDescription, { color: colors.mutedForeground }]}>
                    {plan.description}
                  </Text>
                )}
                {!available && (
                  <Text style={[styles.unavailable, { color: colors.gold }]}>
                    Formule non disponible
                  </Text>
                )}
              </Pressable>
            );
          })}
          {plansQuery.data?.plans.length === 0 && (
            <Text style={[styles.body, { color: colors.mutedForeground }]}>
              Aucune formule n’est actuellement proposée.
            </Text>
          )}
        </View>
      )}

      {!user ? (
        <View style={styles.loginPrompt}>
          <Text style={[styles.body, { color: colors.mutedForeground }]}>
            Connectez-vous pour souscrire à une formule et suivre votre paiement.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/(auth)/login" as any)}
            style={[styles.button, { backgroundColor: colors.gold }]}
          >
            <Text style={[styles.buttonText, { color: colors.deepBrown }]}>Se connecter</Text>
          </Pressable>
        </View>
      ) : (
        <>
          {!hasActiveSubscription && (
            <>
              <TextInput
                value={customerName}
                onChangeText={setCustomerName}
                placeholder="Votre nom complet"
                placeholderTextColor={colors.mutedForeground}
                autoCapitalize="words"
                autoComplete="name"
                accessibilityLabel="Votre nom complet"
                style={[styles.input, { color: colors.ivory, borderColor: colors.border, backgroundColor: colors.card }]}
              />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Votre adresse e-mail"
                placeholderTextColor={colors.mutedForeground}
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                accessibilityLabel="Votre adresse e-mail"
                style={[styles.input, { color: colors.ivory, borderColor: colors.border, backgroundColor: colors.card, marginTop: 10 }]}
              />
              <Pressable
                disabled={!isConfigured || !validEmail || customerName.trim().length < 2 || paymentMutation.isPending}
                onPress={startPayment}
                style={[
                  styles.button,
                  {
                    backgroundColor: colors.gold,
                    opacity:
                      !isConfigured || !validEmail || customerName.trim().length < 2 || paymentMutation.isPending
                        ? 0.45
                        : 1,
                  },
                ]}
              >
                {paymentMutation.isPending ? (
                  <ActivityIndicator color={colors.deepBrown} />
                ) : (
                  <Text style={[styles.buttonText, { color: colors.deepBrown }]}>
                    {isConfigured ? "Continuer vers le paiement" : "Formule non disponible"}
                  </Text>
                )}
              </Pressable>
            </>
          )}
          {hasActiveSubscription && (
            <Text style={[styles.body, { color: colors.gold, marginTop: 18 }]}>
              Votre abonnement est actif.
            </Text>
          )}
          {checkoutUrl && (
            <Pressable
              accessibilityRole="button"
              onPress={openCheckout}
              style={[styles.secondaryButton, { borderColor: colors.gold }]}
            >
              <Text style={[styles.buttonText, { color: colors.gold }]}>
                Reprendre le paiement sécurisé
              </Text>
            </Pressable>
          )}
          {hasPendingSubscription && (
            <Pressable
              accessibilityRole="button"
              disabled={reconcileMutation.isPending}
              onPress={reconcilePayment}
              style={[styles.secondaryButton, { borderColor: colors.gold }]}
            >
              {reconcileMutation.isPending ? (
                <ActivityIndicator color={colors.gold} />
              ) : (
                <Text style={[styles.buttonText, { color: colors.gold }]}>
                  Vérifier mon paiement
                </Text>
              )}
            </Pressable>
          )}
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
  secondaryButton: { borderWidth: 1, borderRadius: 13, padding: 15, alignItems: "center", marginTop: 12 },
  loginPrompt: { marginTop: 18, gap: 4 },
  buttonText: { fontSize: 15, fontWeight: "800" as const },
  message: { textAlign: "center", marginTop: 14, lineHeight: 20 },
});