# Recherche : enrichir « Savoir » avec des plantes et des savoirs documentés

**Status:** complete, avec limites de source explicites
**Depth:** vérification ciblée de sources ouvertes

## Plan

- **Question :** Quelles fiches non médicinales et quelles publications sociales peut-on ajouter sans présenter les témoignages comme des preuves médicales ?
- **Scope :** Fiches alimentaires ou agroécologiques, taxonomie, limites des allégations et posts publics pertinents pour l’Afrique de l’Ouest. Les recettes régionales non vérifiées sont exclues.
- **Audience :** Lecteurs francophones de l’application mobile.
- **Livrable :** 12 fiches sourcées dans « Plantes », un article de contexte dans « Articles », références ouvrables et tests de catalogue. Aucune recette nouvelle tant qu’une source culinaire régionale n’est pas vérifiée.

## Focus Areas

| # | Area | Status | Sources |
|---|---|---|---:|
| 1 | Espèces et usages alimentaires/agroécologiques | complete | 11 articles + GBIF |
| 2 | Identité botanique et noms scientifiques | complete | 13 correspondances GBIF, dont un synonyme |
| 3 | Sécurité et limites médicales | complete | Revue Moringa, étude animale Xylopia, limites des études d’extraits |
| 4 | Publications publiques sur les réseaux sociaux | limited | 3 extraits indexés, pages non ouvertes |
| 5 | Recettes régionales vérifiées | deferred | 0 recette publiée ; preuves régionales insuffisantes |

## Coverage Checklist

- [x] Ajouter des espèces absentes du catalogue, avec contrôle des doublons par nom scientifique.
- [x] Distinguer les fiches alimentaires, agroécologiques et médicinales dans l’interface.
- [x] Relier les noms scientifiques à GBIF et les usages ajoutés aux articles correspondants.
- [x] Écarter les doses, traitements maison et bénéfices médicaux non établis.
- [x] Citer Facebook, Instagram et TikTok comme témoignages ou pistes, avec les limites d’accès.
- [x] Rendre les sources consultables depuis les fiches et l’article de contexte.
- [x] Enrichir « Plantes » et « Articles » en français.
- [x] Ne pas publier les recettes antérieures tant que les sources régionales ne sont pas vérifiées.

## Findings Log

Les clés [@source] renvoient au registre research/sources.json ; les extraits sont dans research/sources/open-access-evidence.md.

### Fiches alimentaires et agroécologiques

- Le niébé est décrit comme aliment, fourrage et culture liée à la fertilité des sols [@pmc-12339483].
- L’étude ghanéenne décrit le dawadawa fermenté à base de Parkia biglobosa [@pmc-12447108]. Le zamné de Senegalia macrostachya est étudié dans le centre du Burkina Faso et comparé au soumbala [@pmc-12318027].
- Amaranthus cruentus est étudié comme légume-feuille en Afrique subsaharienne [@pmc-13199344]. L’étude de Solanum aethiopicum porte sur des fruits de deux variétés et des traitements culinaires [@pmc-13139839].
- Une revue examine les feuilles de patate douce comme ressource alimentaire, sans valider une recette ouest-africaine [@pmc-13409526].
- La revue de Vernonia amygdalina traite de transformation d’un légume-feuille et distingue observations propres à l’espèce des extrapolations [@pmc-13565637]. GBIF accepte Gymnanthemum amygdalinum et renvoie Vernonia amygdalina comme synonyme [@gbif-gymnanthemum-amygdalinum] [@gbif-vernonia-amygdalina-synonym].
- Une revue décrit Ocimum gratissimum comme basilic africain aromatique [@pmc-13259028]. Xylopia aethiopica est étudiée comme épice, mais l’expérience de toxicité chez le rat ne valide ni bénéfice ni sécurité clinique chez l’humain [@pmc-13195186].
- Les feuilles de Faidherbia albida sont étudiées pour leur décomposition et la libération de nutriments dans des systèmes agroforestiers du Sahel [@pmc-12835154].
- La thaumatine II est décrite comme protéine sucrante traditionnellement extraite du fruit de Thaumatococcus daniellii, espèce native d’Afrique de l’Ouest [@pmc-13441740]. Cela ne valide pas le témoignage Instagram sur l’emballage alimentaire.
- Corchorus olitorius est décrit comme plante comestible largement consommée en Asie ; cette source ne permet pas de relier l’espèce à ayoyo/ademe au Ghana [@pmc-13525489] [@social-tiktok-ayoyo-ademe].

### Identité botanique

- GBIF retourne 12 espèces acceptées pour les nouvelles fiches et Moringa oleifera pour le contexte du post social. Vernonia amygdalina est un synonyme de Gymnanthemum amygdalinum. Ces résultats valident les correspondances taxonomiques, pas un usage local.

### Réseaux sociaux

- Le post Facebook Moringa Senegal-Nebedaye évoque des informations tirées d’un manuel de production/transformation [@social-facebook-moringa-post-197205320820454]. Le post complet et le manuel n’ont pas été ouverts.
- Un extrait Instagram associe Thaumatococcus daniellii à des feuilles d’emballage culinaire dans certaines préparations nigérianes [@social-instagram-ebieba]. Publication non ouverte ; témoignage seulement.
- Un extrait TikTok porte sur ayoyo/ademe sans identifier d’espèce [@social-tiktok-ayoyo-ademe]. Ne pas attribuer ces noms à Corchorus olitorius.

### Limites médicales et documentaires

- La méta-analyse Moringa indique que les données humaines ne suffisent pas à établir un lien causal avec une baisse du poids ou de la pression artérielle [@pmc-13238855]. Les fiches ajoutées n’annoncent aucun bénéfice thérapeutique.
- Les résumés Europe PMC sont les éléments scientifiques consultés ; les textes complets n’ont pas tous été analysés.
- Les recettes lalo, akara/moi-moi, feuilles de patate douce, amarante et aubergine du document de recherche antérieur restent des pistes. Elles ne sont pas ajoutées sans source culinaire locale qui confirme le pays, la pratique et la plante.

## Conflicts & Open Questions

- Les pages sociales complètes et leurs dates ne sont pas accessibles dans la recherche consultée ; seuls les extraits publics indexés sont consignés.
- L’identification botanique d’ayoyo/ademe reste inconnue.
- Le témoignage Instagram sur Thaumatococcus doit être recoupé par une source culinaire indépendante ou une personne connaissant la pratique locale.

## Gaps / Next Research

- Vérifier des recettes avec des sources culinaires ou institutionnelles qui nomment pays, région et espèce.
- Consulter les publications sociales originales avant d’attribuer un propos à une communauté ; respecter le consentement et l’attribution.
- Faire confirmer l’identification des noms locaux de légumes-feuilles par une flore régionale ou un spécialiste local.