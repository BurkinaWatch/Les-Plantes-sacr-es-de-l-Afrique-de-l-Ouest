import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  ActivityIndicator,
  AppState,
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
import { useStartupReadiness } from "@/context/StartupReadinessContext";
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
  const queryClient = useQueryClient();
  const { reason } = useLocalSearchParams<{ reason?: string }>();
  const markStartupReady = useStartupReadiness();
  const { user, token, isLoading: authLoading, logout } = useAuth();
  const [rejectedToken, setRejectedToken] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<"MONTHLY" | "YEARLY">("MONTHLY");
  const [email, setEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const sessionExpired = Boolean(token && rejectedToken === token);
  const authenticated = Boolean(user && token) && !sessionExpired && !authLoading;
  // A new login must not inherit a cached 401 from the previous session.
  // Use an opaque local key rather than placing the bearer token in the cache.
  const sessionScope = useMemo(() => Math.random().toString(36).slice(2), [token]);

  const plansQuery = useGetSubscriptionPlans();
  const statusQuery = useGetSubscriptionStatus({
    query: {
      enabled: authenticated,
      queryKey: ["subscription-status", user?.id, sessionScope],
      retry: (count, error) => !isUnauthorized(error) && count < 2,
      refetchInterval: 30_000,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  });
  const paymentMutation = useCreateSubscriptionPayment();
  const reconcileMutation = useReconcileSubscriptionPayment();
  const trialStartedAt = statusQuery.data?.trial.startedAt
    ? Date.parse(statusQuery.data.trial.startedAt)
    : Number.NaN;
  const trialEndsAt = statusQuery.data?.trial.endsAt
    ? Date.parse(statusQuery.data.trial.endsAt)
    : Number.NaN;
  const hasActiveTrial =
    statusQuery.data?.access.trialActive === true &&
    Number.isFinite(trialStartedAt) &&
    Number.isFinite(trialEndsAt) &&
    Date.now() >= trialStartedAt &&
    Date.now() < trialEndsAt;
  const activeSubscriptionExpiry = statusQuery.data?.subscription?.expiresAt
    ? Date.parse(statusQuery.data.subscription.expiresAt)
    : Number.NaN;
  const hasActiveSubscription =
    statusQuery.data?.access.subscriptionActive === true &&
    (!Number.isFinite(activeSubscriptionExpiry) ||
      Date.now() < activeSubscriptionExpiry);
  const hasAppAccess = hasActiveTrial || hasActiveSubscription;
  const trialExpired = reason === "trial-expired" && !hasAppAccess;

  function handleRequestError(error: unknown, fallback: string) {
    if (isUnauthorized(error)) {
      setRejectedToken(token);
      setCheckoutUrl(null);
      setMessage("Votre session a expiré ou n’est plus valide. Reconnectez-vous pour continuer votre abonnement.");
      return;
    }
    const data = typeof error === "object" && error !== null && "data" in error ? error.data : null;
    if (typeof data === "object" && data !== null && "code" in data && data.code === "PAYMENTS_NOT_CONFIGURED") {
      setMessage("Les paiements ne sont pas encore activés par l’administrateur. Aucun paiement n’a été lancé. Réessayer plus tard ne suffit pas : la configuration doit être finalisée.");
      return;
    }
    // Do not display transport details or a provider's raw response.
    setMessage(fallback);
  }

  useEffect(() => {
    setCheckoutUrl(null);
    setMessage(null);
  }, [user?.id, token]);

  useEffect(() => {
    if (authenticated && isUnauthorized(statusQuery.error)) {
      handleRequestError(statusQuery.error, "");
    }
  }, [authenticated, statusQuery.error]);

  useEffect(() => {
    const error = plansQuery.error;
    if (!error) return;

    const details = error as Error & { status?: unknown };
    console.warn("[subscription-plans] request failed", {
      name: typeof details.name === "string" ? details.name : "UnknownError",
      status: typeof details.status === "number" ? details.status : undefined,
      message:
        typeof details.message === "string"
          ? details.message.slice(0, 180)
          : "Unknown error",
    });
  }, [plansQuery.error]);

  useEffect(() => {
    const hasConfiguredPlan = plansQuery.data?.plans.some(
      (plan) => plan.active && Boolean(plan.amount && plan.currency),
    );
    if (!authenticated || !hasConfiguredPlan) return;
    reconcileMutation.mutate(undefined, {
      onSuccess: () => {
        statusQuery.refetch();
        void queryClient.invalidateQueries({
          queryKey: ["trial-access", user?.id],
        });
      },
      onError: (error) => {
        if (isUnauthorized(error)) handleRequestError(error, "");
      },
    });
  }, [authenticated, token, plansQuery.data?.plans]);

  const selected = useMemo(
    () => plansQuery.data?.plans.find((plan) => plan.code === selectedPlan),
    [plansQuery.data?.plans, selectedPlan],
  );
  const isConfigured = Boolean(selected?.active && selected.amount && selected.currency);
  const validEmail = /^\S+@\S+\.\S+$/.test(email.trim());
  const hasPendingSubscription = statusQuery.data?.subscription?.status === "PENDING";

  async function continueToApp() {
    if (!user?.id || !hasAppAccess) return;
    await queryClient.invalidateQueries({
      queryKey: ["trial-access", user.id],
    });
    router.replace("/(tabs)");
  }

  async function startPayment() {
    if (
      !authenticated ||
      !statusQuery.isSuccess ||
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
          handleRequestError(error, "Le paiement est indisponible pour le moment. Réessayez dans quelques instants.");
        },
      },
    );
  }

  function openCheckout() {
    if (!authenticated || !checkoutUrl) return;
    Linking.openURL(checkoutUrl).catch(() => {
      setMessage("Impossible d’ouvrir la page SAS Pay. Vérifiez votre connexion et réessayez.");
    });
  }

  function reconcilePayment() {
    if (!authenticated) return;
    reconcileMutation.mutate(undefined, {
      onSuccess: async (result) => {
        const refreshedStatus = await statusQuery.refetch();
        await queryClient.invalidateQueries({
          queryKey: ["trial-access", user?.id],
        });
        if (result.activated > 0 || refreshedStatus.data?.access.subscriptionActive) {
          setCheckoutUrl(null);
          setMessage("Paiement confirmé. Votre abonnement est actif.");
        } else if (result.checked > 0) {
          setMessage("Aucun paiement confirmé pour le moment. Réessayez après le règlement.");
        } else {
          setMessage("Aucun paiement en attente à vérifier.");
        }
      },
      onError: (error) => {
        handleRequestError(error, "La vérification a échoué. Vérifiez votre connexion et réessayez.");
      },
    });
  }

  useEffect(() => {
    if (!authenticated) return;
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") {
        reconcilePayment();
      }
    });
    return () => subscription.remove();
  }, [authenticated, token]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: insets.top + 18, paddingBottom: 40 }}
      onLayout={markStartupReady}
    >
      <View style={styles.topRow}>
        <Pressable
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else if (hasAppAccess) {
              void continueToApp();
            } else {
              router.replace("/(auth)/login");
            }
          }}
          accessibilityRole="button"
          accessibilityLabel="Retour"
        >
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

      {trialExpired && (
        <View
          accessibilityRole="alert"
          style={[
            styles.statusCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.gold,
              marginTop: 14,
            },
          ]}
        >
          <Text style={[styles.body, { color: colors.ivory }]}>
            Votre essai gratuit de 3 jours est terminé. Choisissez une formule pour continuer à utiliser l’application.
          </Text>
        </View>
      )}

      {hasActiveTrial && (
        <View
          style={[
            styles.statusCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.gold,
              marginTop: 14,
            },
          ]}
        >
          <Text style={[styles.body, { color: colors.ivory }]}>
            Votre essai gratuit est actif. Vous pouvez continuer à utiliser l’application.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => void continueToApp()}
            style={[styles.secondaryButton, { borderColor: colors.gold }]}
          >
            <Text style={[styles.buttonText, { color: colors.gold }]}>
              Continuer vers l’application
            </Text>
          </Pressable>
        </View>
      )}

      {authenticated && statusQuery.data?.subscription && (
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
                    ? "Annulé"
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

      {authenticated && statusQuery.isError && !statusQuery.data && (
        <View
          style={[
            styles.statusCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.body, { color: colors.mutedForeground }]}>
            Impossible de vérifier votre accès pour le moment. Réessayez avant de lancer un paiement.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => void statusQuery.refetch()}
            style={[styles.secondaryButton, { borderColor: colors.gold }]}
          >
            <Text style={[styles.buttonText, { color: colors.gold }]}>Réessayer</Text>
          </Pressable>
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

      {selected?.active && selected.amount && selected.currency && (
        <View
          style={[
            styles.priceSummary,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
          accessibilityLabel="Récapitulatif estimatif du paiement"
        >
          <Text style={[styles.eyebrow, { color: colors.gold }]}>
            RÉCAPITULATIF
          </Text>
          <View style={styles.amountRow}>
            <Text style={[styles.amountLabel, { color: colors.ivory }]}>
              {selected.period === "MONTHLY"
                ? "Abonnement mensuel"
                : "Abonnement annuel"}
            </Text>
            <Text style={[styles.amountValue, { color: colors.ivory }]}>
              {formatCurrency(selected.amount, selected.currency)}
            </Text>
          </View>
          <View style={styles.amountRow}>
            <Text style={[styles.amountLabel, { color: colors.mutedForeground }]}>
              Frais SAS Pay estimés
            </Text>
            <Text style={[styles.amountValue, { color: colors.ivory }]}>
              {selected.feeEstimate
                ? formatAmountRange(
                    selected.feeEstimate.minimumFee,
                    selected.feeEstimate.maximumFee,
                    selected.currency,
                  )
                : "Selon le réseau"}
            </Text>
          </View>
          {selected.feeEstimate && (
            <>
              <View style={styles.amountRow}>
                <Text style={[styles.amountLabel, styles.totalLabel, { color: colors.ivory }]}>
                  Total estimé
                </Text>
                <Text style={[styles.amountValue, styles.totalValue, { color: colors.gold }]}>
                  {formatAmountRange(
                    selected.feeEstimate.totalMinimum,
                    selected.feeEstimate.totalMaximum,
                    selected.currency,
                  )}
                </Text>
              </View>
              <Text style={[styles.feeNote, { color: colors.mutedForeground }]}>
                {selected.feeEstimate.feeChargeMode === "ADD_ON"
                  ? "Les frais estimés sont ajoutés au paiement."
                  : selected.feeEstimate.feeChargeMode === "DEDUCTED"
                    ? "Les frais sont pris en charge par le marchand sur les réseaux concernés."
                    : "La prise en charge des frais dépend du réseau choisi."}
                {` Estimation basée sur les tarifs publiés pour ${selected.feeEstimate.networkCount} réseau${selected.feeEstimate.networkCount > 1 ? "x" : ""} compatible${selected.feeEstimate.networkCount > 1 ? "s" : ""}. Le réseau choisi peut modifier ce montant.`}
              </Text>
            </>
          )}
          <Text style={[styles.feeNote, { color: colors.mutedForeground }]}>
            Le montant exact sera affiché par SAS Pay après le choix du réseau,
            avant la confirmation du paiement.
          </Text>
        </View>
      )}

      {!authenticated ? (
        <View style={styles.loginPrompt}>
          <Text style={[styles.body, { color: colors.mutedForeground }]}>
            {sessionExpired
              ? "Votre session n’est plus valide. Reconnectez-vous pour poursuivre."
              : "Connectez-vous pour souscrire à une formule et suivre votre paiement."}
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={async () => {
              if (user) {
                try {
                  await logout();
                } catch {
                  // In-memory logout has already cleared the rejected session.
                }
              }
              router.push({
                pathname: "/(auth)/login",
                params: {
                  returnTo: "/abonnement",
                  ...(user?.username ? { username: user.username } : {}),
                },
              });
            }}
            style={[styles.button, { backgroundColor: colors.gold }]}
          >
            <Text style={[styles.buttonText, { color: colors.deepBrown }]}>
              {sessionExpired ? "Se reconnecter" : "Se connecter"}
            </Text>
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
                disabled={!statusQuery.isSuccess || !isConfigured || !validEmail || customerName.trim().length < 2 || paymentMutation.isPending}
                onPress={startPayment}
                style={[
                  styles.button,
                  {
                    backgroundColor: colors.gold,
                    opacity:
                      !statusQuery.isSuccess || !isConfigured || !validEmail || customerName.trim().length < 2 || paymentMutation.isPending
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
            <>
              <Text style={[styles.body, { color: colors.gold, marginTop: 18 }]}>
                Votre abonnement est actif.
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => void continueToApp()}
                style={[styles.secondaryButton, { borderColor: colors.gold }]}
              >
                <Text style={[styles.buttonText, { color: colors.gold }]}>
                  Continuer vers l’application
                </Text>
              </Pressable>
            </>
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

function isUnauthorized(error: unknown): boolean {
  return typeof error === "object" && error !== null &&
    "status" in error && error.status === 401;
}

function formatCurrency(value: string, currency: string): string {
  const amount = Number(value);
  return Number.isFinite(amount)
    ? `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 }).format(amount)} ${currency}`
    : `${value} ${currency}`;
}

function formatAmountRange(minimum: string, maximum: string, currency: string): string {
  const minimumText = formatCurrency(minimum, currency);
  return minimum === maximum
    ? minimumText
    : `${minimumText} – ${formatCurrency(maximum, currency)}`;
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
  planName: { flex: 1, flexShrink: 1, marginRight: 12, fontSize: 17, fontWeight: "700" as const },
  planDescription: { fontSize: 14 },
  priceSummary: { borderRadius: 16, borderWidth: 1, padding: 16, marginTop: 18, gap: 12 },
  amountRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 12 },
  amountLabel: { flex: 1, flexShrink: 1, fontSize: 14, lineHeight: 20 },
  amountValue: { flexShrink: 0, fontSize: 14, lineHeight: 20, fontWeight: "700" as const, textAlign: "right" },
  totalLabel: { fontWeight: "800" as const },
  totalValue: { fontSize: 16, fontWeight: "800" as const },
  feeNote: { fontSize: 12, lineHeight: 18 },
  unavailable: { fontSize: 12, fontWeight: "700" as const },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  radioDot: { width: 10, height: 10, borderRadius: 5 },
  input: { borderWidth: 1, borderRadius: 12, padding: 15, marginTop: 20, fontSize: 15 },
  button: { borderRadius: 13, paddingVertical: 16, paddingHorizontal: 12, minHeight: 52, alignItems: "center", justifyContent: "center", marginTop: 12 },
  secondaryButton: { borderWidth: 1, borderRadius: 13, padding: 15, alignItems: "center", marginTop: 12 },
  loginPrompt: { marginTop: 18, gap: 4 },
  buttonText: { flexShrink: 1, fontSize: 15, fontWeight: "800" as const, textAlign: "center", lineHeight: 21 },
  message: { textAlign: "center", marginTop: 14, lineHeight: 20 },
});