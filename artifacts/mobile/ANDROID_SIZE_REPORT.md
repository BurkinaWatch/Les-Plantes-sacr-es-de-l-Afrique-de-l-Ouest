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

## Contrôle bloquant des prochaines releases

Le contrôle de régression est distinct de la comparaison historique « −20 % » :
une nouvelle version ne doit pas économiser à nouveau 20 % à chaque compilation.
La référence optimisée ci-dessus suffit ; les anciens APK ne sont pas nécessaires.

### Budget versionné

`android-size-budget.json` conserve les valeurs en **octets**, le SHA-256 de
l'APK de référence et le certificat public attendu. Aucun secret n'y figure.

| Paramètre | Valeur initiale |
|---|---:|
| APK optimisé de référence | 203 468 501 octets |
| Somme des 117 fichiers uniques du registre à cette référence | 132 206 673 octets |
| Marge de croissance hors catalogue | 5 242 880 octets (5 Mio) |
| Croissance cumulée du catalogue autorisée avant réexamen | 16 777 216 octets (16 Mio) |
| Limite avec le catalogue initial | **208 711 381 octets (199,04 Mio)** |

Formule appliquée, sans arrondi :

```text
limite APK = APK de référence + marge hors catalogue
             + (octets du catalogue courant − octets du catalogue de référence)
```

Les alias partageant un fichier ne le comptent qu'une fois. Les ajouts,
remplacements ou retraits d'images ajustent donc la limite, sans figer le
catalogue à 116 fiches ou 117 fichiers. Le delta négatif réduit aussi la limite :
retirer des images ne donne pas une réserve supplémentaire au code natif.
L'ajustement utilise les fichiers WebP/JPEG locaux (pas leurs pixels décodés),
à raison d'un octet de budget par octet source ajouté, avec un plafond cumulé de
16 Mio par rapport à la référence. Une forte augmentation exige une révision
explicite ; le script ne réécrit jamais son budget automatiquement.

Une release échoue (code de sortie non nul) si :

- sa taille dépasse la limite, même d'un octet, ou la croissance du catalogue
  dépasse le plafond ;
- un fichier du registre manque localement ou son contenu SHA-256 n'apparaît
  pas dans les ressources de l'APK ; un format de référence non pris en charge
  échoue explicitement plutôt que d'ignorer une image ;
- une des quatre architectures manque, Hermes ou React Native manque pour une
  architecture, ou les bibliothèques natives ne sont plus compressées ;
- l'identité ne correspond pas à `app.json`, le code de version est antérieur
  à la référence, la signature n'est pas valide ou son certificat change,
  ou l'alignement ZIP 16 Kio échoue ;
- un outil Android, l'APK ou le budget est absent/invalide.

Ce contrôle ne remplace ni les tests sur appareil, ni la règle d'incrémenter
le code de version avant de distribuer une mise à jour. Recompiler la même
version pour comparer sa taille reste possible.

### Commande de release

Depuis la racine du dépôt :

```sh
pnpm --filter @workspace/mobile release:android
```

Prérequis : dépendances installées, Java 17, SDK Android avec les build-tools
`36.0.0`, clé d'envoi existante dans
`artifacts/mobile/.keys/play-upload-key.jks` et `PLAY_UPLOAD_KEY_PASSWORD`
fourni par le gestionnaire de secrets. `ANDROID_HOME`, `ANDROID_USER_HOME`
et `GRADLE_USER_HOME` sont surchargeables ; leurs valeurs locales par défaut
reprennent les répertoires de la recette précédente.

La commande vérifie les correspondances du catalogue, régénère le projet
Android avec les plugins persistants, supprime l'ancien APK de sortie, compile
la Release signée puis exécute immédiatement l'audit. Elle ne distribue et ne
publie rien. Tout échec de compilation ou d'audit arrête la commande.
Ne pas remplacer cette commande par `assembleRelease` seul dans une procédure
de livraison : Gradle seul ne constitue pas une validation du budget.

Pour auditer à nouveau un APK déjà signé, sans recompilation :

```sh
cd artifacts/mobile
python3 scripts/audit-android-release.py \
  android/app/build/outputs/apk/release/app-release.apk \
  .android-sdk/build-tools/36.0.0 \
  --budget android-size-budget.json \
  --output ../../generated-artifacts/android-release
```

### Preuves archivées et CI

La commande de release crée dans `generated-artifacts/android-release/` :

- `release-audit.json` : résultat réussi/refusé, cause du refus, tailles exactes,
  budget et son hash, identité et hash de l'APK, certificat public, inventaire des
  architectures, images du registre et leurs hashes. En cas de refus précoce,
  seules les informations déjà contrôlées figurent dans le rapport ;
- `release-evidence.tar.gz` : **uniquement ce JSON**, même si l'audit refuse l'APK.

Les sorties d'une exécution précédente sont supprimées au démarrage pour
ne jamais présenter une ancienne réussite comme le résultat courant. Une
compilation qui échoue avant l'audit ne produit pas de preuve de validation.
Conserver l'archive de chaque release dans le stockage de livrables de l'équipe :
le répertoire local représente la dernière exécution, pas un historique permanent.

Le workflow `.github/workflows/android-release-budget.yml` :

1. teste la politique sur chaque pull request mobile, avec de petits ZIP générés
   temporairement, sans SDK ni clé ;
2. sur déclenchement manuel uniquement, compile la Release signée et applique
   le même contrôle ;
3. conserve le JSON **90 jours**, y compris après refus de l'audit. Son nom
   contient l'identifiant de l'exécution et de la tentative ; GitHub le rattache
   au commit source. Aucun APK, clé ou journal de compilation n'est téléversé.

Pour activer la compilation signée sur GitHub, configurer l'environnement
protégé `android-release`, ses approbateurs/branches autorisées, et ses secrets
`PLAY_UPLOAD_KEY_BASE64` (copie encodée de la **même clé existante**, jamais une
nouvelle clé) et `PLAY_UPLOAD_KEY_PASSWORD`. Les secrets du poste de travail ne
sont pas transférés automatiquement à GitHub. Ne pas les saisir dans un ticket,
le dépôt ou une ligne de commande. Les pull requests ne reçoivent jamais ces
secrets ; la clé temporaire est supprimée après la compilation, même en échec.

`generated-artifacts/` reste exclu de Git et des déploiements. Les APK, AAB et
répertoires Android générés restent ignorés. Ne jamais archiver tout le dossier
de compilation : uniquement le JSON autorisé ci-dessus.

### Modifier le budget intentionnellement

1. Garder le budget courant pendant la compilation et conserver le rapport,
   même s'il refuse la release. Comparer ses postes `apk.categories`,
   `catalog`, `size` et `architectures` à la dernière preuve acceptée.
2. Expliquer la cause : nouvelles fiches/images, mise à jour native, ou autre
   croissance mesurée. Corriger d'abord toute duplication, décompression des
   bibliothèques ou régression involontaire. Ne pas augmenter le budget pour
   contourner une image manquante, une ABI manquante ou une signature incorrecte.
3. Si le changement est légitime, proposer dans une pull request le nouveau
   `android-size-budget.json` : valeurs de référence mesurées (`apkBytes`,
   `apkSha256`, `catalogBytes`, `catalogUniqueImages`, `versionCode`), marge et
   plafond justifiés dans `approval`. Mettre à jour ce rapport avec la raison,
   les tailles avant/après et la preuve non sensible. Une modification du seul
   plafond peut suffire ; ne pas changer de référence sans preuve mesurée.
4. Faire approuver cette modification par le responsable de release.
   Le certificat et les quatre ABI sont des contraintes de compatibilité,
   pas des variables d'ajustement de taille.
5. Relancer l'audit avec le budget approuvé et archiver sa preuve réussie
   avant toute distribution. Ne pas commettre les APK ou les journaux.

Tests reproductibles de la politique :

```sh
pnpm --filter @workspace/mobile test:android-release
```

Ils couvrent notamment le seuil exact et son dépassement d'un octet, la
croissance et la réduction du catalogue, les alias, les images absentes/altérées,
chaque ABI retirée, les bibliothèques, l'identité, la signature et les entrées
invalides. Les vérifications de packaging ne prouvent pas l'installation ou
le démarrage sur appareil. Le budget décrit ici vise l'APK universel partagé,
pas la taille téléchargée d'un AAB après découpage par Google Play.

### Exécution réelle du contrôle — 20 octobre 2026

- `pnpm --filter @workspace/mobile release:android` : compilation signée et
  Lint vital réussis, puis audit automatique réussi, code de sortie `0`.
- APK mesuré : **203 468 497 octets**, limite **208 711 381 octets**,
  réserve **5 242 884 octets** ; catalogue inchangé.
- SHA-256 de cette recompilation :
  `342a9e0ffa81b3a1b7f40b43162d40298940ffd9d6b403554e3e28a80a0b1b6d`.
  La référence historique reste inchangée ; il ne s'agit pas d'une révision
  automatique du budget.
- Même certificat, version `1.0.1` / code `10`, 117 images vérifiées par SHA-256,
  quatre architectures et 104 bibliothèques natives compressées, alignement validé.
- Archive locale ouverte et contrôlée : seul `release-audit.json` est présent.
- Même APK réaudité avec un budget **temporaire de test** de 203 468 496 octets :
  refus effectif, code de sortie `1`, dépassement d'un octet. Le budget versionné
  et la preuve de réussite principale n'ont pas été modifiés.
- 19 tests automatisés réussis ; workflow vérifié avec `actionlint`.
  La compilation GitHub n'a pas été déclenchée : son environnement protégé et
  ses secrets doivent être configurés séparément. Aucun test d'installation
  sur appareil et aucune publication n'ont été effectués.
