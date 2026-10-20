# Réduction du téléchargement Android

## Résultat livré

| Élément | Avant | Après |
|---|---:|---:|
| APK signé universel | 317 134 727 octets (302,44 Mio) | **203 468 501 octets (194,04 Mio)** |
| Ressources dans le ZIP | 200 682 776 octets | 145 115 180 octets |
| Bibliothèques natives dans le ZIP | 88 081 460 octets | 30 744 841 octets |

**Réduction du téléchargement : 35,84 %, soit 113 666 226 octets (108,40 Mio).**

Livrable : `generated-artifacts/android-size/plantes-sacrees-1.0.1-v10-universal.apk`.

Une copie de téléchargement est disponible dans `artifacts/mobile/public/plantessacrees-v10.apk` via l'aperçu Expo actif. Elle est ignorée par Git et les déploiements. Le fichier dépasse la limite de 100 Mio d'une pièce jointe de la bibliothèque ; son lien d'aperçu n'est pas un hébergement de distribution permanent.

- Package : `com.sotyssi.plantessacrees`.
- Version : `1.0.1`, code Android : `10`.
- Signature vérifiée par `apksigner`, identique à celle de l'APK initial.
- Certificat SHA-256 : `59b47e7dc4d1302a17bee085dea2534b7071eea74c0926c84bd2d64f0b4071a3`.
- SHA-256 du nouvel APK : `bddfc15d3b180e54fe10e2561d908fc90d18091b78fbf5c15e4943c3c178cfaa`.
- Alignement ZIP vérifié, y compris contrôle 16 Kio.
- **117 fichiers image uniques du registre retrouvés dans l'APK, avec un contenu SHA-256 identique aux sources livrées.**
- **104 bibliothèques natives conservées**, 26 pour chacune des quatre architectures, désormais compressées.
- Compilation Release et contrôle Lint vital réussis (`BUILD SUCCESSFUL`).

## Choix retenu

- APK universel : conservation de `armeabi-v7a`, `arm64-v8a`, `x86` et `x86_64`.
- Compression ZIP des bibliothèques natives, persistée par le plugin Expo `withCompactAndroidPackaging`.
- Conversion de 94 illustrations PNG en WebP **sans perte**, sans redimensionnement. Chaque conversion compare intégralement les pixels RGBA décodés, dimensions et transparence comprises.
- Conservation des 23 photographies JPEG, du catalogue, des textes et du démarrage existants.
- Même package et même clé de signature ; version affichée `1.0.1`, code Android augmenté de `9` à `10` pour permettre une mise à jour.

Les PNG maîtres sont conservés comme sources de conversion, mais ne sont plus référencés par le registre Metro et ne sont donc pas ajoutés à l'APK en doublon. Les médias du catalogue restent des ressources locales : aucune dépendance à un téléchargement à la consultation.

La compression native réduit le téléchargement, pas nécessairement l'espace occupé après installation : Android extrait les bibliothèques à l'installation. Aucune architecture n'est supprimée et le démarrage n'est pas modifié. La réduction du bytecode par R8 n'est pas activée dans ce changement, pour éviter de modifier simultanément le comportement des modules natifs.

## Audit des ressources

APK initial : **317 134 727 octets** (302,44 Mio).

| Poste initial | Taille décompressée | Taille dans le ZIP |
|---|---:|---:|
| Ressources `res/`, 1 147 fichiers | 203 606 372 octets | 200 682 776 octets |
| Bibliothèques natives, quatre architectures | 88 081 460 octets | 88 081 460 octets |
| Bytecode DEX | 53 167 304 octets | 19 186 573 octets |

Le décompte de 25 groupes de ressources identiques ne représente que **18 938 octets** de répétition. Ce n'est pas le principal levier.

Plus gros PNG du catalogue avant conversion :

| Illustration | Octets |
|---|---:|
| Dattier | 2 729 679 |
| Raphia | 2 640 753 |
| Palmier à huile, plante entière | 2 528 964 |
| Neem | 2 490 178 |
| Karité | 2 472 240 |
| Corossolier, plante entière | 2 463 451 |
| Fromager | 2 455 473 |

Les anciennes variantes `corossolier.png`, `kalanchoe.png`, `palmier-huile.png` et `pomme-sodome.png` ne sont déjà plus référencées : leurs variantes « plante entière » sont celles utilisées. Leur suppression du dépôt ne réduirait pas l'APK. Les alias botaniques karité / *Butyrospermum parkii* et vernonia / *Gymnanthemum amygdalinum* partagent déjà leurs illustrations.

**Conversion des 94 images : 189 044 618 → 127 714 474 octets**, soit **61 330 144 octets économisés (32,44 %)**. Les pixels décodés sont identiques pour chaque image.

## Contrôles et preuves

- Vérification du registre sur les **116 fiches** du catalogue effectif.
- Tests du packaging : option persistante, idempotente et sans modification des architectures.
- Tests de rendu des illustrations du catalogue et de la visionneuse agrandie.
- Aperçu web de la fiche baobab : illustration WebP visible et route initiale prête. Cet aperçu ne constitue pas un test Android.
- La suite mobile globale a été interrompue après 37 tests affichés comme réussis, car le processus `tests/public-deployment.test.mjs` ne terminait pas. Les tests du parseur Metro (5 tests) et la vérification des images avaient également réussi. Ne pas interpréter ce résultat comme une validation complète de toute la suite.
- Aucun appareil ou émulateur Android n'est connecté : installation réelle, démarrage à froid et consultation en mode avion restent à vérifier sur appareil (travail natif déjà prévu séparément).

Les preuves volumineuses sont dans `generated-artifacts/android-size/`, exclu de Git et des déploiements :

- `lossless-conversion.json` : dimensions et tailles avant/après, égalité RGBA des 94 images.
- `apk-audit.json` : comparaison des ZIP, identité, signature, alignement et présence des 117 fichiers uniques du registre par SHA-256.
- `gradle-release.log` et `mobile-tests.log`.

## Reproduire

Depuis `artifacts/mobile`, avec les dépendances installées :

```sh
# Recréer les WebP depuis les PNG maîtres, avec vérification pixel à pixel.
node scripts/optimize-catalog-images.js
pnpm run verify:plant-images

# Régénérer les réglages natifs depuis app.json et les plugins.
CI=1 pnpm exec expo prebuild --platform android --no-install

# Utiliser le SDK et les caches persistants locaux.
export ANDROID_HOME="$PWD/.android-sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export ANDROID_USER_HOME="$PWD/.android-user"
export GRADLE_USER_HOME="$PWD/.gradle-cache"
export CMAKE_BUILD_PARALLEL_LEVEL=2

# PLAY_UPLOAD_KEY_PASSWORD doit être fourni par les Secrets.
# Ne jamais saisir sa valeur dans une ligne de commande ou un fichier.
cd android
./gradlew :app:assembleRelease --no-daemon --no-parallel --max-workers=1 \
  '-Dorg.gradle.jvmargs=-Xmx1536m -XX:MaxMetaspaceSize=1024m' \
  -Pkotlin.compiler.execution.strategy=in-process --console=plain
cd ..

# Comparaison indépendante avec l'APK initial préservé avant compilation.
python3 scripts/audit-android-release.py \
  ../../generated-artifacts/android-size/baseline-1.0.1-v9.apk \
  android/app/build/outputs/apk/release/app-release.apk \
  .android-sdk/build-tools/36.0.0
```

Sur un environnement limité à 8 Gio, suspendre temporairement Metro pendant la compilation native. La première tentative parallèle a subi un arrêt par manque de mémoire ; les options ci-dessus limitent la concurrence et évitent un second processus de compilation Kotlin. Ne pas trop réduire la réserve Metaspace : un plafond de 384 Mio a ensuite bloqué l'analyse Lint avec `OutOfMemoryError: Metaspace`. Le plafond retenu est de 1 Gio.

Conserver la clé d'envoi existante et son mot de passe sécurisé : une nouvelle clé ne permettrait pas de mettre à jour les installations signées par l'ancienne.
