#!/bin/bash
set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Build APK — Les Animaux Sacrés"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -z "$EXPO_TOKEN" ]; then
  echo ""
  echo "EXPO_TOKEN non défini."
  echo "Exportez votre token avant de relancer :"
  echo "  export EXPO_TOKEN=votre_token_ici"
  echo ""
  exit 1
fi

cd /home/runner/workspace/artifacts/mobile

echo ""
echo "▶ Dossier : $(pwd)"
echo "▶ Token   : OK"
echo "▶ Lancement du build Android (APK)..."
echo ""

npx eas-cli build \
  --platform android \
  --profile preview \
  --non-interactive

echo ""
echo "✅ Build soumis ! Suivez le lien ci-dessus pour télécharger l'APK."
