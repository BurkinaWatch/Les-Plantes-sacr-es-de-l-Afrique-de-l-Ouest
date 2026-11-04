import type { SourceReference } from './source-reference';

export interface ArticleSection {
  type: 'paragraph' | 'quote' | 'subtitle' | 'list';
  content: string;
  items?: string[];
}

export interface Article {
  id: string;
  titre: string;
  sousTitre?: string;
  auteur: string;
  source: string;
  annee: string;
  duree: string;
  categorie: 'ethnobotanique' | 'medecine' | 'spiritualite' | 'ecologie' | 'culture';
  categorieLabel: string;
  planteIcon: string;
  couleur: string;
  resume: string;
  contenu: ArticleSection[];
  tags: string[];
  sources?: string[];
  sourceLinks?: SourceReference[];
}

export const ARTICLES: Article[] = [
  {
    id: 'baobab-gardien-savane',
    titre: 'Le Baobab, Gardien de la Savane',
    sousTitre: 'Biologie, mythes et usages d\'un arbre millénaire',
    auteur: 'Dr. Aminata Diallo',
    source: 'Revue d\'Ethnobotanique Africaine',
    annee: '2021',
    duree: '8 min',
    categorie: 'ethnobotanique',
    categorieLabel: 'Ethnobotanique',
    planteIcon: '🌳',
    couleur: '#E67E22',
    resume: 'De ses racines aériennes à ses fruits nutritifs, le baobab incarne l\'identité végétale de l\'Afrique de l\'Ouest. Tour d\'horizon scientifique et culturel.',
    tags: ['baobab', 'savane', 'arbre sacré', 'nutrition', 'conservation'],
    contenu: [
      {
        type: 'paragraph',
        content: 'Adansonia digitata — le baobab — est sans doute l\'arbre le plus emblématique du continent africain. Ses silhouettes massives, aux troncs renflés comme des carafes géantes et aux branches dressées comme des racines vers le ciel, ponctuent la savane soudano-sahélienne depuis le Sénégal jusqu\'au Mozambique. Certains spécimens vivent depuis plus de deux millénaires, classant le baobab parmi les organismes vivants les plus âgés de la planète.',
      },
      {
        type: 'subtitle',
        content: 'Une biologie hors du commun',
      },
      {
        type: 'paragraph',
        content: 'Le baobab est un succulentophyte : son tronc gigantesque (parfois plus de 10 mètres de diamètre) est en réalité un réservoir d\'eau. Un grand baobab peut stocker jusqu\'à 120 000 litres d\'eau dans ses fibres ligneuses spongieuses, lui permettant de survivre aux saisons sèches les plus sévères. Cette capacité en fait un véritable château d\'eau pour les communautés rurales et la faune sauvage en période de sécheresse.',
      },
      {
        type: 'quote',
        content: '« L\'arbre qui a bu l\'eau d\'une rivière entière » — surnom donné au baobab dans les légendes bambara du Mali.',
      },
      {
        type: 'subtitle',
        content: 'Une pharmacopée à lui seul',
      },
      {
        type: 'paragraph',
        content: 'Chaque partie du baobab possède des vertus médicinales documentées. Les feuilles séchées et moulues — le "lalo" — sont l\'un des aliments les plus nutritifs du Sahel, comparables aux suppléments vitaminiques modernes. La pulpe du fruit ("pain de singe") est naturellement riche en vitamine C, calcium et prébiotiques. L\'écorce est utilisée comme antipyrétique et antidiarrhéique. Les graines fournissent une huile de haute qualité pour les cosmétiques.',
      },
      {
        type: 'list',
        content: 'Utilisations principales du baobab en médecine traditionnelle :',
        items: [
          'Feuilles (lalo) : nutrition, anémie, fatigue, allaitement',
          'Pulpe du fruit : vitamine C, probiotique, soif intense',
          'Écorce : fièvre, diarrhée, paludisme traditionnel',
          'Racines (jeunes arbres uniquement) : vermifuge',
          'Graines : huile pour cosmétique et consommation',
          'Fleurs : miel et infusions légères contre les fièvres',
        ],
      },
      {
        type: 'subtitle',
        content: 'Le baobab dans le sacré',
      },
      {
        type: 'paragraph',
        content: 'Chez les Dogon du Mali, le baobab est un arbre cosmique — ses racines plongent dans le monde des esprits et ses branches portent le ciel. Il est interdit de couper un vieux baobab sans effectuer des libations et des prières aux ancêtres. Des nuits entières de cérémonies se tiennent parfois à son pied. En Casamance (Sénégal), les arbres les plus anciens abritent des génies protecteurs et servent de lieux de médiation entre vivants et morts.',
      },
      {
        type: 'paragraph',
        content: 'La conservation du baobab est aujourd\'hui menacée par les changements climatiques et le déforestation. Des études récentes documentent la mort soudaine de plusieurs millénaires depuis 2005. Protéger le baobab, c\'est protéger à la fois un trésor nutritif irremplaçable et des siècles de mémoire culturelle.',
      },
    ],
    sources: ['Wickens & Lowe (2008), The Baobabs: Pachycauls of Africa, Madagascar and Australia', 'Venter & Venter (1996), Making the Most of Indigenous Trees', 'Palgrave (2002), Trees of Southern Africa'],
  },

  {
    id: 'moringa-arbre-vie',
    titre: 'Moringa oleifera : L\'Arbre de la Vie',
    sousTitre: 'De la nutrition à la médecine préventive — un siècle de recherche',
    auteur: 'Pr. Ibrahim Coulibaly',
    source: 'Journal Africain de Nutrition et Santé',
    annee: '2022',
    duree: '7 min',
    categorie: 'medecine',
    categorieLabel: 'Médecine',
    planteIcon: '🌱',
    couleur: '#27AE60',
    resume: 'Considéré par l\'ONU comme l\'une des plantes les plus importantes pour lutter contre la malnutrition, le moringa est au cœur d\'une révolution alimentaire silencieuse en Afrique de l\'Ouest.',
    tags: ['moringa', 'nutrition', 'malnutrition', 'Sahel', 'ONU', 'médecine préventive'],
    contenu: [
      {
        type: 'paragraph',
        content: 'En 1997, un rapport des Nations Unies décrivait Moringa oleifera comme "l\'une des ressources végétales les plus précieuses jamais découvertes". Plus de vingt ans après, la plante originaire du sous-continent indien mais naturalisée en Afrique de l\'Ouest continue de fasciner les chercheurs. On lui connaît désormais plus de 300 propriétés biologiques actives identifiées dans ses différentes parties.',
      },
      {
        type: 'subtitle',
        content: 'Un profil nutritionnel sans équivalent',
      },
      {
        type: 'list',
        content: 'Comparé aux aliments de référence à poids égal, le moringa contient :',
        items: [
          '7× plus de vitamine C que les oranges',
          '4× plus de calcium que le lait',
          '4× plus de vitamine A que les carottes',
          '3× plus de potassium que les bananes',
          '2× plus de protéines que le yaourt',
          'Des niveaux significatifs de fer, zinc, magnésium',
        ],
      },
      {
        type: 'paragraph',
        content: 'Ces données ont été vérifiées par de multiples études indépendantes dont plusieurs menées en Afrique de l\'Ouest. Elles expliquent pourquoi les communautés Haoussa et Peul incorporent systématiquement les feuilles de moringa dans leurs préparations pour nourrissons et femmes allaitantes depuis des générations, bien avant que la science occidentale ne valide ces pratiques.',
      },
      {
        type: 'subtitle',
        content: 'Propriétés médicinales documentées',
      },
      {
        type: 'paragraph',
        content: 'Les études cliniques récentes ont confirmé plusieurs activités biologiques du moringa : hypoglycémiante (intérêt pour les diabétiques de type 2), hypocholestérolémiante, anti-inflammatoire (inhibition de NF-kB), antibactérienne (isothiocyanates) et même neuroprotectrice. Au Niger et au Burkina Faso, des programmes gouvernementaux distribuent de la poudre de moringa dans les centres de santé comme supplément nutritionnel pour les enfants en sous-nutrition.',
      },
      {
        type: 'quote',
        content: '« Les mères de mon village n\'appellent pas ça "moringa". Elles disent juste "la feuille qui fait grandir les enfants". Ce nom en dit plus long que n\'importe quelle publication scientifique. » — Sage-femme traditionnelle, région de Mopti, Mali.',
      },
      {
        type: 'subtitle',
        content: 'Un arbre pour l\'avenir climatique',
      },
      {
        type: 'paragraph',
        content: 'Le moringa est une plante extrêmement résistante à la sécheresse, à croissance ultra-rapide (3 mètres en première année), et pouvant être taillée comme un arbuste pour faciliter la cueillette des feuilles. Ces caractéristiques en font un allié majeur pour les programmes d\'adaptation au changement climatique en zone sahélienne. Sa culture nécessite peu d\'eau et aucun intrant chimique, et il améliore la fertilité des sols.',
      },
    ],
    sources: ['Fuglie (1999), The Miracle Tree: Moringa oleifera', 'Fahey (2005), Moringa oleifera: A Review of the Medical Evidence', 'OMS (2012), Moringa as a Nutritional Supplement'],
  },

  {
    id: 'plantes-sacrees-vodun',
    titre: 'Les Plantes Sacrées dans le Vodun du Bénin',
    sousTitre: 'Botanique rituelle et ontologie des divinités végétales',
    auteur: 'Sylvie Ahouandjinou',
    source: 'Cahiers d\'Anthropologie Religieuse',
    annee: '2020',
    duree: '10 min',
    categorie: 'spiritualite',
    categorieLabel: 'Spiritualité',
    planteIcon: '🌿',
    couleur: '#8E44AD',
    resume: 'Dans la tradition Vodun du Bénin et du Togo, les plantes ne sont pas de simples remèdes — elles sont des corps vivants de divinités, des portes entre les mondes.',
    tags: ['vodun', 'Bénin', 'Togo', 'Fon', 'Ewe', 'rituels', 'divinités'],
    contenu: [
      {
        type: 'paragraph',
        content: 'Le Vodun — que l\'Occident connaît sous le terme déformé de "vaudou" — est l\'une des traditions spirituelles les plus complexes et les plus riches d\'Afrique de l\'Ouest. Au Bénin, au Togo, et parmi les communautés Fon et Ewe, le Vodun constitue un système cosmologique complet où chaque être vivant, chaque plante, chaque élément naturel est habité par une force spirituelle appelée "vodun" au sens littéral.',
      },
      {
        type: 'subtitle',
        content: 'Les plantes comme corps des Voduns',
      },
      {
        type: 'paragraph',
        content: 'Dans cette ontologie, les plantes ne sont pas de simples médicaments ou ressources alimentaires. Elles sont les corps physiques préférés de certaines divinités. Le Fromager (Ceiba pentandra) est habité par Sakpata, divinité de la terre et des maladies. L\'Iroko (Milicia excelsa) est le trône de Lègba, gardien des carrefours. L\'Erythrine (Erythrina senegalensis) appartient à Ogou, dieu du fer et de la guerre.',
      },
      {
        type: 'quote',
        content: '« Quand vous coupez un Fromager sans autorisation, vous blessez Sakpata. La maladie qui suit n\'est pas une punition — c\'est la douleur du dieu qui cherche un autre corps. » — Bokono (devin), Ouidah, Bénin.',
      },
      {
        type: 'subtitle',
        content: 'Les "azan" : assemblages végétaux sacrés',
      },
      {
        type: 'paragraph',
        content: 'Les Bokono (devins Vodun) préparent des "azan" — des préparations végétales composées parfois de dizaines de plantes dont la combinaison précise est révélée par la divination. Ces assemblages ne guérissent pas seulement le corps physique : ils rétablissent l\'harmonie entre l\'individu, ses ancêtres et les divinités. La même maladie peut nécessiter deux "azan" différents pour deux personnes, selon leur situation spirituelle respective.',
      },
      {
        type: 'list',
        content: 'Quelques plantes fondamentales du panthéon Vodun :',
        items: [
          'Fromager (Ceiba pentandra) — Sakpata : maladies, terre, vérole',
          'Iroko (Milicia excelsa) — Lègba : carrefours, passages, communication',
          'Okoubaka (Okoubaka aubrevillei) — protection contre l\'empoisonnement',
          'Basilic africain (Ocimum gratissimum) — purification et protection',
          'Langue de boeuf (Bryophyllum pinnatum) — soins maternels et fertilité',
          'Ficus (Ficus gnaphalocarpa) — ancêtres et médiation',
        ],
      },
      {
        type: 'paragraph',
        content: 'La connaissance de ces plantes est un savoir sacré, transmis lors d\'initiations qui durent des années. Les novices apprennent non seulement à identifier les espèces végétales, mais aussi les protocoles de collecte (heure du jour, phase de lune, prières à réciter), les interdits (certaines plantes ne peuvent être coupées par une femme, d\'autres uniquement de la main gauche), et les formules d\'activation des préparations.',
      },
      {
        type: 'paragraph',
        content: 'L\'anthropologue Alfred Métraux notait en 1958 que le savoir botanique des praticiens Vodun était si précis et si complet qu\'il constituait une "pharmacopée vivante" d\'une sophistication comparable aux systèmes médicaux de l\'Antiquité classique. Soixante ans plus tard, les ethno-pharmacologues continuent de valider scientifiquement ces intuitions millénaires.',
      },
    ],
    sources: ['Métraux (1958), Le Vaudou Haïtien', 'Maupoil (1943), La Géomancie à l\'Ancienne Côte des Esclaves', 'Verger (1967), Awon Ewe Osanyin — Yoruba Medicinal Leaves'],
  },

  {
    id: 'pharmacopee-yoruba',
    titre: 'La Pharmacopée Yoruba : Ifa et les Plantes',
    sousTitre: 'Un système médical intégré entre oracle, botanique et chirurgie spirituelle',
    auteur: 'Pr. Kolade Adeyemi',
    source: 'African Traditional Medicine Review',
    annee: '2019',
    duree: '9 min',
    categorie: 'medecine',
    categorieLabel: 'Médecine traditionnelle',
    planteIcon: '🌿',
    couleur: '#C0392B',
    resume: 'Chez les Yoruba du Nigeria et du Bénin, la médecine traditionnelle est inséparable du système divinatoire Ifá — un corpus de 256 "Odù" qui encode des millénaires de savoir médical et botanique.',
    tags: ['yoruba', 'Ifá', 'Osanyin', 'pharmacopée', 'Nigeria', 'Bénin'],
    contenu: [
      {
        type: 'paragraph',
        content: 'La tradition médicale Yoruba est l\'une des plus sophistiquées du continent africain. Son fondement théologique repose sur Osanyin — orisha (divinité) des plantes médicinales, dont l\'emblème est un bâton de fer surmonté d\'un oiseau entouré de seize autres oiseaux, représentant les seize grandes familles de plantes. Les Babalawos (prêtres d\'Ifá) et les Onísègùn (herboristes) détiennent une connaissance botanique d\'une richesse exceptionnelle.',
      },
      {
        type: 'subtitle',
        content: 'Le corpus Ifá comme base de données médicale',
      },
      {
        type: 'paragraph',
        content: 'Le système divinatoire Ifá comprend 256 Odù (configurations) contenant chacun des centaines de vers mémorisés. Une part significative de ce corpus encode des prescriptions médicales précises : quelle plante utiliser, quelle partie de la plante, comment la préparer, à quelle heure la collecter, quelles prières accompagnent le traitement. L\'UNESCO a inscrit Ifá au Patrimoine Culturel Immatériel de l\'Humanité en 2005.',
      },
      {
        type: 'quote',
        content: '« L\'Ifá ne sépare pas ce que vous appelez "médecine" de ce que vous appelez "prière". Pour nous, soigner quelqu\'un sans s\'adresser aux forces qui ont causé sa maladie, c\'est réparer une maison en ignorant pourquoi le toit s\'est effondré. » — Babalawo, Ilé-Ifé, Nigeria.',
      },
      {
        type: 'subtitle',
        content: 'Quelques plantes clés de la médecine Yoruba',
      },
      {
        type: 'list',
        content: 'Plantes fondamentales documentées dans le corpus Ifá :',
        items: [
          'Abere (Secamone afzelii) — maladies de peau et infections',
          'Àgbàdo (maïs violet) — diurétique et soins rénaux',
          'Efinrin (Ocimum gratissimum) — antiseptique, rhume, paludisme',
          'Ewe Ori (Vitellaria paradoxa) — soins postnataux, fertilité',
          'Gbógi (Newbouldia laevis) — anti-épileptique, céphalées',
          'Ìrókò (Milicia excelsa) — douleurs chroniques, protection',
          'Osé Ọpẹlẹ (Zanthoxylum zanthoxyloides) — douleurs dentaires',
          'Ewé Tètè (Amarante verte) — anémie, constipation',
        ],
      },
      {
        type: 'paragraph',
        content: 'La pharmacopée Yoruba distingue plusieurs formes galéniques que les herbologues modernes reconnaissent facilement : les "agbo" (décoctions), les "omi ero" (infusions froides), les "gbigbe" (poudres), les "ikunle" (baumes topiques) et les "ewe tutu" (cataplasmes de feuilles fraîches). Cette classification parallèle à la pharmacologie moderne a été développée de façon indépendante sur des millénaires d\'observation empirique.',
      },
      {
        type: 'paragraph',
        content: 'Des études pharmacologiques récentes menées à l\'Université d\'Ibadan et à l\'Université du Bénin ont validé les propriétés de nombreuses plantes du corpus Ifá. Notamment, la Newbouldia laevis (Gbógi) montre des effets anticonvulsivants significatifs, confirmant son usage traditionnel contre l\'épilepsie.',
      },
    ],
    sources: ['Verger (1967), Awon Ewe Osanyin', 'Abimbola (1976), Ifá: An Exposition of Ifá Literary Corpus', 'Sofowora (1982), Medicinal Plants and Traditional Medicine in Africa'],
  },

  {
    id: 'kinkeliba-or-vert-senegal',
    titre: 'Le Kinkeliba, Or Vert du Sénégal',
    sousTitre: 'Histoire, botanique et marché d\'une plante emblématique',
    auteur: 'Fatou Ndoye',
    source: 'Revue de Phytothérapie Africaine',
    annee: '2021',
    duree: '6 min',
    categorie: 'ethnobotanique',
    categorieLabel: 'Ethnobotanique',
    planteIcon: '🍵',
    couleur: '#5B8A3C',
    resume: 'Du fond des concessions sénégalaises aux laboratoires pharmaceutiques européens, l\'histoire du kinkeliba est celle d\'une plante ordinaire devenue trésor scientifique mondial.',
    tags: ['kinkeliba', 'Sénégal', 'Gambie', 'thé', 'antioxydant', 'diabète'],
    contenu: [
      {
        type: 'paragraph',
        content: 'À Dakar, rares sont les matins qui commencent sans un verre de kinkeliba. Cette tisane dorée, préparée à partir des feuilles séchées de Combretum micranthum, est aussi indissociable du quotidien sénégalais que le café amer l\'est de l\'Italie ou le maté de l\'Argentine. Pourtant, jusqu\'aux années 1990, cette plante était pratiquement inconnue hors d\'Afrique de l\'Ouest.',
      },
      {
        type: 'subtitle',
        content: 'Une plante de la brousse aux labos européens',
      },
      {
        type: 'paragraph',
        content: 'Tout a changé quand des chercheurs français de l\'ORSTOM (aujourd\'hui IRD) ont commencé à analyser chimiquement le kinkeliba dans les années 1970-1980. Leurs découvertes ont été stupéfiantes : la plante contient une concentration exceptionnelle en vitexine, une flavone aux puissantes propriétés antioxydantes et hypoglycémiantes. Des études ultérieures ont confirmé ses effets protecteurs sur le foie, ses propriétés anti-inflammatoires et ses activités antibactériennes contre plusieurs souches pathogènes.',
      },
      {
        type: 'quote',
        content: '« Ce que les Sérères appelaient "la plante qui nettoie le ventre" depuis des générations, nous l\'appelons maintenant "modulateur de la glycémie à potentiel thérapeutique significatif". C\'est la même chose — nous avons juste mis des mots latins sur leurs millénaires d\'observation. » — Chercheur en pharmacognosie, Université de Dakar.',
      },
      {
        type: 'subtitle',
        content: 'Un marché en plein essor',
      },
      {
        type: 'paragraph',
        content: 'La reconnaissance scientifique a transformé l\'économie autour du kinkeliba. En 2023, le marché mondial des extraits de Combretum micranthum était estimé à plusieurs dizaines de millions de dollars. Des sociétés allemandes, françaises et américaines importent massivement les feuilles séchées pour les compléments alimentaires et les cosmétiques. Cette demande internationale crée une pression croissante sur les peuplements sauvages au Sénégal et en Gambie.',
      },
      {
        type: 'list',
        content: 'Propriétés scientifiquement documentées du kinkeliba :',
        items: [
          'Antioxydant majeur : inhibition de l\'oxydation des LDL (cholestérol)',
          'Hypoglycémiant : réduction de la glycémie post-prandiale (-18% dans les études)',
          'Hépatoprotecteur : protection des cellules hépatiques contre les toxines',
          'Diurétique léger : favorise l\'élimination rénale',
          'Antibactérien : actif contre E.coli et Staphylococcus aureus',
          'Anti-inflammatoire : inhibition de la COX-2',
        ],
      },
      {
        type: 'paragraph',
        content: 'Face aux risques de surexploitation, plusieurs ONG sénégalaises et gambiennes mènent des projets de plantation et de certification "durable" du kinkeliba. Des coopératives féminines dans la région de Thiès et de Kaolack ont commencé à cultiver la plante en agroforesterie, assurant un revenu stable tout en préservant les peuplements naturels.',
      },
    ],
    sources: ['Ndiaye et al. (2004), Antioxidant activity of Combretum micranthum', 'Bassene et al. (1986), Plantes médicinales du Sénégal'],
  },

  {
    id: 'femmes-savoir-botanique',
    titre: 'Les Femmes Gardiennes du Savoir Botanique',
    sousTitre: 'Transmission, genre et biodiversité en Afrique de l\'Ouest',
    auteur: 'Marème Sall & Awa Traoré',
    source: 'Genre & Développement Rural',
    annee: '2022',
    duree: '7 min',
    categorie: 'culture',
    categorieLabel: 'Culture',
    planteIcon: '👩‍🌾',
    couleur: '#E84393',
    resume: 'En Afrique de l\'Ouest, les femmes sont les premières gardiennes du savoir botanique : herboristes, guérisseuses, sages-femmes et cuisinières, elles portent une encyclopédie vivante du végétal.',
    tags: ['femmes', 'transmission', 'herboristes', 'genre', 'ethnobotanique'],
    contenu: [
      {
        type: 'paragraph',
        content: 'Une étude menée dans 12 villages du Sine-Saloum au Sénégal a révélé que les femmes âgées de 45 ans et plus connaissaient en moyenne 87 espèces végétales médicinales, contre 34 pour les hommes de même âge. Cet écart n\'est pas biologique — il est le produit d\'une division genrée du savoir ancestral dans laquelle les femmes ont toujours occupé la première ligne de la santé familiale et communautaire.',
      },
      {
        type: 'subtitle',
        content: 'L\'apprentissage par les corps',
      },
      {
        type: 'paragraph',
        content: 'Le savoir botanique féminin ne s\'apprend pas dans des livres. Il se transmet dans les champs, au marché, à la cuisine et autour des accouchements. Une jeune fille apprend à reconnaître les plantes en accompagnant sa mère ou sa grand-mère. Elle apprend les noms en wolof, en bambara, en mooré — pas les noms latins. Elle apprend par quoi les plantes se reconnaissent (odeur, texture, couleur, goût), comment les préparer, pour quoi les utiliser, et parfois quelles prières accompagnent leur collecte.',
      },
      {
        type: 'quote',
        content: '« Ma fille, je ne t\'apprendrai pas toutes mes plantes. Je t\'apprendrai à regarder. Quand tu sauras regarder, les plantes te parleront elles-mêmes. » — Sage-femme traditionnelle Sérère, Région de Fatick.',
      },
      {
        type: 'subtitle',
        content: 'Les herboristes des marchés : une économie invisible',
      },
      {
        type: 'paragraph',
        content: 'Au marché Tilène de Dakar, au marché Djenné de Bamako ou au marché Dantokpa de Cotonou, des centaines de femmes vendent quotidiennement des plantes médicinales. Elles constituent une infrastructure sanitaire de proximité pour les populations qui n\'ont pas accès aux soins modernes — soit faute de ressources financières, soit faute d\'établissements de santé à proximité. Ces femmes diagnostiquent, conseillent, préparent et suivent leurs "patients" avec une expertise accumulée sur des décennies.',
      },
      {
        type: 'list',
        content: 'Rôles des femmes dans les systèmes botaniques d\'Afrique de l\'Ouest :',
        items: [
          'Herboristes de marché : vente et conseil de plantes médicinales',
          'Sages-femmes traditionnelles : phytothérapie péri et post-natale',
          'Guérisseuses : traitement des maladies courantes',
          'Cuisinières traditionnelles : intégration des plantes médicinales dans l\'alimentation',
          'Jardinières : cultivation des espèces rares menacées de disparition',
          'Conteuses : transmission orale des propriétés des plantes aux générations suivantes',
        ],
      },
      {
        type: 'paragraph',
        content: 'Paradoxalement, alors que les femmes sont les principales détentrices du savoir botanique de l\'Afrique de l\'Ouest, la littérature ethnobotanique internationale les a longtemps ignorées, préférant documenter les savoirs des guérisseurs mâles considérés comme plus "officiels". Des travaux récents tentent de corriger cette invisibilisation en plaçant les femmes au centre des recherches ethnobotaniques.',
      },
    ],
    sources: ['Agarwal (1994), A Field of One\'s Own: Gender and Land Rights', 'Nolan (2001), Wild Plants: A Cross-Cultural Perspective', 'Bénié Bi Vroh (2012), Les femmes et les plantes médicinales en Côte d\'Ivoire'],
  },

  {
    id: 'foret-sacree-akan',
    titre: 'Les Forêts Sacrées des Peuples Akan',
    sousTitre: 'Conservation de la biodiversité par le sacré en Afrique de l\'Ouest',
    auteur: 'Kwame Asante-Frimpong',
    source: 'Journal of Sacred Groves and Ethnobiology',
    annee: '2020',
    duree: '8 min',
    categorie: 'ecologie',
    categorieLabel: 'Écologie',
    planteIcon: '🌲',
    couleur: '#1A6B3C',
    resume: 'Les "bosquets sacrés" des peuples Akan du Ghana et de la Côte d\'Ivoire constituent des réservoirs de biodiversité exceptionnels — une conservation millénaire par l\'interdit et le sacré.',
    tags: ['akan', 'Ghana', 'forêts sacrées', 'biodiversité', 'conservation', 'tabous'],
    contenu: [
      {
        type: 'paragraph',
        content: 'À travers l\'Afrique de l\'Ouest, des milliers de "bosquets sacrés" parsèment le paysage — des îlots forestiers protégés par des interdits religieux depuis des générations. Au Ghana, on les appelle "abosom nsrae" (forêts des dieux) ou "fam po" (forêts interdites). En Côte d\'Ivoire, les Baoulé et Akan parlent de "bois sacrés". Ces espaces, où la coupe est prohibée et l\'accès limité aux initiés, constituent des archives vivantes de la flore originelle d\'Afrique de l\'Ouest.',
      },
      {
        type: 'subtitle',
        content: 'Une conservation plus efficace que les aires protégées',
      },
      {
        type: 'paragraph',
        content: 'Une étude comparative menée en 2018 par des chercheurs de l\'Université de Legon (Ghana) a comparé la biodiversité des bosquets sacrés à celle des forêts classées gérées par l\'État. Le résultat est sans appel : les bosquets sacrés présentent une densité d\'espèces végétales 40% supérieure, une présence d\'espèces rares ou menacées 3 fois plus élevée, et une structure de canopée plus intacte. La protection par l\'interdit religieux s\'avère plus efficace que la protection légale.',
      },
      {
        type: 'quote',
        content: '« Le dieu de cette forêt rend fou quiconque y coupe un arbre sans autorisation. Aucun ranger, aucune amende ne pourrait nous convaincre de ne pas couper — seulement la peur de devenir fou. C\'est pour ça que nos ancêtres ont tout mis sous la protection des dieux. » — Gardien d\'un bosquet sacré, Région Ashanti, Ghana.',
      },
      {
        type: 'list',
        content: 'Caractéristiques typiques des bosquets sacrés d\'Afrique de l\'Ouest :',
        items: [
          'Superficie variable : de 0,1 ha (bosquet villageois) à plusieurs centaines d\'ha',
          'Présence de plantes "totem" totalement intouchables',
          'Gardiens institutionnels (prêtres, chefs traditionnels) avec pouvoirs réels',
          'Interdits d\'accès pour les femmes dans certaines traditions',
          'Rituel annuel de "renouvellement" du pacte avec les esprits',
          'Interdiction de capture d\'animaux sauvages dans l\'enceinte',
          'Plantes médicinales pouvant être prélevées uniquement avec permission',
        ],
      },
      {
        type: 'paragraph',
        content: 'Malheureusement, la modernisation, la déchristianisation/islamisation et la pression démographique érodent rapidement ces protections. Des chercheurs documentent la disparition progressive de nombreux bosquets sacrés depuis les années 1980. À chaque bosquet qui disparaît, ce sont des espèces végétales rares, des savoirs botaniques locaux et une mémoire culturelle irremplaçable qui s\'évaporent.',
      },
      {
        type: 'paragraph',
        content: 'Des organisations comme l\'IUCN et Bioversity International travaillent maintenant avec les communautés pour renforcer la protection légale des bosquets sacrés tout en respectant leur caractère spirituel. Cette approche, qui allie conservation biologique et respect des croyances, représente une voie prometteuse pour la préservation de la biodiversité d\'Afrique de l\'Ouest.',
      },
    ],
    sources: ['Bhagwat & Rutte (2006), Sacred Groves: Potential for Biodiversity Management', 'Bossart et al. (2006), Conservation Biology in Sub-Saharan Africa', 'Lebbie & Guries (1995), Sacred Groves in Sierra Leone'],
  },

  {
    id: 'plantes-islam-afrique-ouest',
    titre: 'Plantes et Islam en Afrique de l\'Ouest',
    sousTitre: 'Coexistence et syncrétisme des savoirs botaniques avec la tradition islamique',
    auteur: 'Amadou Bamba Diallo',
    source: 'Islam et Société en Afrique',
    annee: '2021',
    duree: '7 min',
    categorie: 'culture',
    categorieLabel: 'Culture & Religion',
    planteIcon: '☪️',
    couleur: '#2E86C1',
    resume: 'Loin des stéréotypes du "conflit" entre animisme et islam, les pratiques botaniques d\'Afrique de l\'Ouest illustrent un syncrétisme créatif et millénaire.',
    tags: ['islam', 'syncrétisme', 'marabouts', 'talisman', 'Sénégal', 'Mali'],
    contenu: [
      {
        type: 'paragraph',
        content: 'L\'islam s\'est répandu en Afrique de l\'Ouest à partir du VIIIe siècle, d\'abord par les routes commerciales transsahariennes, puis progressivement dans l\'ensemble de la région. Aujourd\'hui, de nombreux pays d\'Afrique de l\'Ouest sont à majorité musulmane — Sénégal (96%), Guinée (85%), Mali (90%), Gambie (96%). Pourtant, les pratiques botaniques traditionnelles, héritées des civilisations préislamiques, ont non seulement survécu mais ont été intégrées dans un syncrétisme riche et original.',
      },
      {
        type: 'subtitle',
        content: 'Le marabout botaniste',
      },
      {
        type: 'paragraph',
        content: 'La figure centrale de ce syncrétisme est le marabout — un guide spirituel islamique qui, en Afrique de l\'Ouest, combine rôles de lettré coranique, de guérisseur, de confectionneur de talismans ("gris-gris") et de phytothérapeute. Le marabout prépare des "xarns" (au Sénégal) ou "boli" (au Mali) — des préparations végétales incorporant des versets coraniques écrits sur papier, brûlés et mélangés à des plantes spécifiques selon le problème à traiter.',
      },
      {
        type: 'quote',
        content: '« Le Prophète lui-même, que la paix soit sur lui, disait : "Pour chaque maladie, Allah a créé un remède." Cette plante que vous voyez ici, c\'est le remède qu\'Allah a créé pour cette maladie. Je suis juste l\'intermédiaire qui sait le trouver. » — Marabout guérisseur, Touba, Sénégal.',
      },
      {
        type: 'subtitle',
        content: 'Des plantes dans les versets',
      },
      {
        type: 'paragraph',
        content: 'Le Coran lui-même mentionne plusieurs plantes — le figuier (At-Tin), le palmier dattier, l\'olivier, le gingembre, le sidr. Ces références coraniques ont facilité l\'acceptation islamique de la phytothérapie : utiliser les plantes n\'est pas contraire à l\'Islam, c\'est reconnaître les dons d\'Allah à l\'humanité. Les hadith du Prophète mentionnent explicitement la nigelle (Nigella sativa), le sidr (jujubier) et le miel comme remèdes bénis.',
      },
      {
        type: 'list',
        content: 'Pratiques syncrétiques botano-islamiques documentées en Afrique de l\'Ouest :',
        items: [
          'Plantes mélangées à l\'eau de lavage de tablettes coraniques (eau de kouraane)',
          'Fumigation de plantes lors des prières collectives du vendredi',
          'Gris-gris végétaux bénis par des versets coraniques',
          'Infusions de plantes consommées après une récitation du Coran',
          'Bains rituels associant plantes et lavage à l\'eau de Zamzam',
          'Jardins de mosquées plantés d\'herbes médicinales "islamiques"',
        ],
      },
      {
        type: 'paragraph',
        content: 'Ce syncrétisme n\'est pas sans tension. Les courants réformistes islamiques (salafisme, wahhabisme) en progression depuis les années 1980 condamnent ces pratiques comme "bid\'ah" (innovations non islamiques) ou même "shirk" (polythéisme). Ces tensions créent des fractures intergénérationnelles : les jeunes formés dans des écoles arabes rejettent parfois le savoir de leurs grands-parents marabouts. La préservation de ce syncrétisme botano-islamique est ainsi également un enjeu culturel et intergénérationnel.',
      },
    ],
    sources: ['Amselle (1990), Logiques métisses : Anthropologie de l\'identité en Afrique', 'Robinson (2000), Paths of Accommodation: Muslim Societies and French Colonial Authorities', 'Gomez-Perez (2005), L\'islam politique au sud du Sahara'],
  },

  {
    id: 'karite-tresor-feminin',
    titre: 'Le Karité : Trésor Féminin de la Savane',
    sousTitre: 'Entre économie, héritage culturel et révolution cosmétique mondiale',
    auteur: 'Clarisse Dakuyo',
    source: 'Économie & Développement Durable, Afrique',
    annee: '2023',
    duree: '6 min',
    categorie: 'culture',
    categorieLabel: 'Culture & Économie',
    planteIcon: '🌰',
    couleur: '#D4A853',
    resume: 'De la savane burkinabè aux rayons des parfumeries européennes, le karité raconte l\'histoire d\'un savoir féminin devenu industrie mondiale — et les enjeux de sa réappropriation.',
    tags: ['karité', 'Burkina Faso', 'femmes', 'cosmétique', 'commerce équitable'],
    contenu: [
      {
        type: 'paragraph',
        content: 'Il suffit de se promener dans n\'importe quelle forêt-parc de la zone soudanienne en août pour comprendre pourquoi on appelle le karité "l\'or des femmes". Sous les vénérables Vitellaria paradoxa aux troncs rugueux et aux ramures généreuses, des dizaines de femmes et de jeunes filles collectent les fruits mûrs tombés au sol, travaillant depuis l\'aube jusqu\'à la mi-journée avant que la chaleur ne devienne insupportable.',
      },
      {
        type: 'subtitle',
        content: 'Un arbre qui appartient aux femmes',
      },
      {
        type: 'paragraph',
        content: 'Dans les traditions Bambara, Mossi, Lobi et Senufo, le karité est un arbre qui "appartient" aux femmes. Non pas au sens de la propriété foncière formelle (les terres appartiennent aux lignages masculins), mais au sens d\'un droit d\'usufruit coutumier inaliénable. Aucun homme ne peut vendre les fruits d\'un karité de son champ — ils reviennent de droit aux femmes. Ce statut particulier a fait du karité un des rares vecteurs d\'autonomie économique féminine dans des sociétés agraires traditionnellement dominées par les hommes.',
      },
      {
        type: 'quote',
        content: '« Mon karité, c\'est ma banque. Mes enfants ont fait l\'école avec le karité. J\'ai acheté mes moutons avec le karité. Si le karité disparaît, c\'est ma liberté qui disparaît. » — Femme productrice de beurre de karité, Province du Houet, Burkina Faso.',
      },
      {
        type: 'subtitle',
        content: 'Du village aux multinationales',
      },
      {
        type: 'paragraph',
        content: 'Le marché mondial du beurre de karité a explosé depuis les années 2000. En 2023, il était estimé à plus de 2 milliards de dollars. L\'industrie cosmétique (L\'Oréal, Unilever, The Body Shop, Lush) achète des quantités croissantes de beurre de karité comme ingrédient premium pour crèmes, shampooings et savons. L\'industrie alimentaire l\'utilise comme substitut au beurre de cacao (même sans obligation d\'étiquetage dans certains pays). La demande dépasse maintenant largement la production artisanale.',
      },
      {
        type: 'list',
        content: 'Enjeux actuels de la filière karité :',
        items: [
          'Pression sur les ressources naturelles : surexploitation des peuplements sauvages',
          'Problème de prix : les femmes productrices reçoivent moins de 5% de la valeur finale',
          'Concurrence déloyale des versions raffinées et déodérisées',
          'Dépossession du savoir : les brevets cosmétiques excluent les communautés',
          'Opportunité : développement des coopératives de transformation locale',
          'Certifications "commerce équitable" encore trop rares et coûteuses',
        ],
      },
      {
        type: 'paragraph',
        content: 'Des organisations comme la Global Shea Alliance et des coopératives locales au Burkina Faso, au Mali et au Ghana travaillent à rééquilibrer cette chaîne de valeur. La montée des certifications bio et commerce équitable, conjuguée à la demande croissante des consommateurs pour des ingrédients "tracés", offre de réelles opportunités. Mais la route vers une équité réelle reste longue : l\'écart entre la valeur créée par des générations de femmes africaines et ce qu\'elles en reçoivent demeure abyssal.',
      },
    ],
    sources: ['Lovett & Haq (2000), Evidence for anthropic selection of the shea tree', 'Elias & Carney (2007), African shea butter: a feminized subsidy from nature', 'Schreckenberg et al. (2006), A marketled approach to the promotion of shea nut'],
  },

  {
    id: 'conservation-savoirs-botaniques',
    titre: 'Urgence : Sauvegarder les Savoirs Botaniques d\'Afrique de l\'Ouest',
    sousTitre: 'La course contre la montre de l\'ethnobotanique',
    auteur: 'Dr. Jean-Baptiste Nikiema',
    source: 'Biodiversity and Conservation International',
    annee: '2023',
    duree: '6 min',
    categorie: 'ecologie',
    categorieLabel: 'Écologie & Conservation',
    planteIcon: '📚',
    couleur: '#2C3E50',
    resume: 'Avec chaque guérisseur traditionnel qui meurt sans avoir transmis son savoir, l\'Afrique de l\'Ouest perd une bibliothèque entière. La situation est critique — et des solutions émergent.',
    tags: ['conservation', 'ethno-botanique', 'biodiversité', 'mémoire', 'urgence'],
    contenu: [
      {
        type: 'paragraph',
        content: 'Wade Davis, l\'ethnobotaniste qui a documenté les savoirs des chamanes amazoniens, a dit un jour : "Quand un aîné meurt, c\'est une bibliothèque qui brûle." En Afrique de l\'Ouest, cet incendie est en cours. Le rapport de la BGCI (Botanic Gardens Conservation International) estime que 40% des espèces végétales mondiales sont menacées d\'extinction. Pour les savoirs qui y sont associés, la situation est encore plus précaire.',
      },
      {
        type: 'subtitle',
        content: 'Trois crises convergentes',
      },
      {
        type: 'paragraph',
        content: 'La disparition des savoirs botaniques en Afrique de l\'Ouest résulte de trois crises qui se renforcent mutuellement. La première est écologique : déforestation, changement climatique et agriculture intensive réduisent les populations sauvages des espèces médicinales. La seconde est démographique : les détenteurs des savoirs les plus complets sont âgés et la transmission aux jeunes est en rupture. La troisième est culturelle : la scolarisation en langue française ou anglaise, l\'urbanisation et la mondialisation créent une discontinuité entre les générations.',
      },
      {
        type: 'quote',
        content: '« Mon fils est médecin à Abidjan. Il ne sait pas le nom d\'une seule plante de notre village. Il soigne des maladies avec des médicaments qu\'on lui a appris en France. Je ne dis pas que c\'est mal. Je dis que c\'est la moitié de la vérité. » — Guérisseur traditionnel, Région de Bondoukou, Côte d\'Ivoire.',
      },
      {
        type: 'subtitle',
        content: 'Des solutions qui émergent',
      },
      {
        type: 'list',
        content: 'Initiatives en cours pour la préservation des savoirs botaniques :',
        items: [
          'Jardins ethnobotaniques universitaires (Dakar, Abidjan, Accra, Cotonou)',
          'Archives sonores et vidéo des guérisseurs par des ONG locales',
          'Herbiers numériques en langues locales (wolof, bambara, mooré, éwé)',
          'Intégration de modules de phytothérapie dans les formations médicales',
          'Programmes de "gardiens du savoir" avec rémunération des anciens',
          'Plateformes numériques en langues africaines pour la documentation collaborative',
          'Partenariats universités-communautés pour la validation scientifique',
        ],
      },
      {
        type: 'paragraph',
        content: 'L\'enjeu n\'est pas seulement culturel. Des études estiment que seulement 1% des espèces végétales africaines ont été analysées pharmacologiquement. Dans les 99% restants se trouvent peut-être des traitements révolutionnaires contre le cancer, le paludisme résistant, la maladie d\'Alzheimer. Chaque plante qui disparaît sans avoir été documentée emporte potentiellement avec elle une molécule qui pourrait changer la médecine mondiale.',
      },
      {
        type: 'paragraph',
        content: 'La bonne nouvelle est que la conscience de cette urgence grandit — en Afrique de l\'Ouest d\'abord, où une nouvelle génération de chercheurs africains prend en main la documentation de leur propre héritage, refusant que ce savoir soit capturé exclusivement par des institutions occidentales. Applications mobiles, podcasts en langues locales, herbiers communautaires : les outils du XXIe siècle sont maintenant au service de la mémoire du XXe siècle et bien avant.',
      },
    ],
    sources: ['Davis (1995), One River: Explorations and Discoveries in the Amazon Rain Forest', 'BGCI (2020), State of the World\'s Trees', 'Gueye & Diallo (2019), Ethnobotanique ouest-africaine : bilan et perspectives'],
  },

  {
    id: 'inventaire-pousset-lire-avec-prudence',
    titre: 'Lire un inventaire médicinal avec prudence',
    sousTitre: 'Du document de référence à une transmission responsable',
    auteur: 'Équipe éditoriale des Plantes Sacrées',
    source: 'D’après Jean-Louis Pousset, Plantes Médicinales Africaines',
    annee: '2026',
    duree: '6 min',
    categorie: 'ethnobotanique',
    categorieLabel: 'Méthode & transmission',
    planteIcon: '📖',
    couleur: '#B58A3A',
    resume: 'Comment consulter les monographies du corpus sans confondre un usage traditionnel documenté avec un diagnostic, une dose ou une prescription.',
    tags: ['Pousset', 'monographies', 'méthode', 'prudence', 'conservation', 'pharmacopée'],
    contenu: [
      {
        type: 'paragraph',
        content: 'Le corpus documentaire de l’application s’appuie d’abord sur Jean-Louis Pousset, Plantes Médicinales Africaines — Utilisation Pratique, publié en 1989. Le livre décrit des plantes, des parties utilisées, des préparations et des usages rapportés dans plusieurs pharmacopées africaines. Il s’agit d’une source historique et ethnobotanique : elle renseigne la transmission des savoirs, mais ne remplace pas l’évaluation d’une personne malade.',
      },
      {
        type: 'subtitle',
        content: 'Trois niveaux à ne pas mélanger',
      },
      {
        type: 'list',
        content: 'Chaque fiche distingue volontairement :',
        items: [
          'L’alimentation : fruit, graine, feuille ou boisson consommés comme aliments.',
          'La préparation traditionnelle : infusion, décoction ou soin externe rapporté par la source.',
          'La prudence de santé : situations qui exigent un professionnel, comme une fièvre persistante, une détresse respiratoire, une déshydratation ou une plaie importante.',
        ],
      },
      {
        type: 'paragraph',
        content: 'Un résultat observé en laboratoire, une propriété décrite dans un ouvrage et une efficacité clinique ne sont pas équivalents. La dose, l’identification botanique, la partie de la plante, la saison, le mode de préparation et les traitements associés peuvent changer le risque. Pour cette raison, l’application conserve les formulations « usage traditionnel documenté » et évite de transformer une indication ancienne en promesse de guérison.',
      },
      {
        type: 'subtitle',
        content: 'Identifier avant de cueillir',
      },
      {
        type: 'paragraph',
        content: 'Un nom populaire peut désigner plusieurs espèces selon la région et la langue. Le nom scientifique aide à comparer les sources, mais il ne suffit pas à identifier une plante sur le terrain. Observer la forme, le lieu, la saison et les caractères botaniques avec une personne compétente ; ne jamais utiliser une plante simplement parce qu’elle ressemble à une photographie ou à une autre fiche.',
      },
      {
        type: 'quote',
        content: '« Connaître le nom d’une plante, c’est commencer à la reconnaître ; connaître ses limites, c’est commencer à la respecter. »',
      },
      {
        type: 'subtitle',
        content: 'Préserver les plantes et les savoirs',
      },
      {
        type: 'list',
        content: 'Une transmission durable peut commencer par des gestes simples :',
        items: [
          'Privilégier les feuilles, fruits ou graines lorsque la tradition le permet, plutôt que d’arracher les racines.',
          'Ne pas prélever dans une forêt sacrée ou sur un arbre protégé sans l’autorisation de la communauté.',
          'Noter la langue, le lieu, la partie utilisée et le nom de la personne qui transmet le savoir.',
          'Respecter le consentement et la reconnaissance des communautés qui détiennent ces connaissances.',
          'Cultiver les espèces recherchées et laisser des plants produire des graines.',
        ],
      },
      {
        type: 'paragraph',
        content: 'L’Organisation mondiale de la Santé souligne l’importance de la qualité, de la sécurité et de l’usage responsable des médecines traditionnelles. Le rôle de cette bibliothèque est donc de rendre les sources plus lisibles et de soutenir la curiosité botanique, pas d’organiser une automédication. En cas de doute, l’abstention et la demande d’un avis qualifié sont les choix les plus protecteurs.',
      },
    ],
    sources: [
      'Pousset, J.-L. (1989), Plantes Médicinales Africaines — Utilisation Pratique, Éditions ESTEM / AUPELF, Paris.',
      'Organisation mondiale de la Santé (2013), Stratégie de l’OMS pour la médecine traditionnelle 2014–2023 : https://www.who.int/publications/i/item/9789241506096',
      'Convention sur la diversité biologique, Traditional Knowledge : https://www.cbd.int/traditional/',
    ],
  },
  {
    id: 'plantes-reseaux-sociaux-temoignages',
    titre: 'Plantes sur les réseaux : écouter sans confondre',
    sousTitre: 'Des publications publiques comme pistes, pas comme preuves médicales',
    auteur: 'Équipe éditoriale des Plantes Sacrées',
    source: 'Extraits publics indexés de Facebook, Instagram et TikTok',
    annee: '2026',
    duree: '5 min',
    categorie: 'ethnobotanique',
    categorieLabel: 'Savoirs partagés',
    planteIcon: '📖',
    couleur: '#668A56',
    resume:
      'Trois publications publiques font circuler des informations sur le moringa, les feuilles d’emballage et un légume nommé ayoyo/ademe. Elles documentent des pistes culturelles, pas une efficacité médicale.',
    tags: ['réseaux sociaux', 'moringa', 'Thaumatococcus', 'ayoyo', 'sources', 'prudence'],
    contenu: [
      {
        type: 'paragraph',
        content:
          'Les réseaux sociaux peuvent montrer comment des cultivateurs, des cuisiniers et des communautés parlent des plantes. Les trois liens ci-dessous proviennent de résultats publics indexés le 27 septembre 2026. Les pages complètes n’ont pas pu être ouvertes ; les dates de publication ne sont pas visibles dans les extraits. Les résumés restent donc limités à ce que ces extraits affichent.',
      },
      {
        type: 'subtitle',
        content: 'Des pistes de savoirs partagés',
      },
      {
        type: 'list',
        content: 'Les extraits consultés évoquent :',
        items: [
          'Facebook : une page publique consacrée au moringa au Sénégal annonce des informations sur sa production et sa transformation, en renvoyant à un manuel. Le manuel lui-même n’a pas été consulté.',
          'Instagram : une publication intitulée « Ethnobotany 101: Ebieba » associe Thaumatococcus daniellii à des feuilles d’emballage pour certaines préparations nigérianes. Cette attribution reste un témoignage social à recouper.',
          'TikTok : un résultat intitulé « Ayoyo (Ademe) African Green Leafy Vegetable » parle d’un légume-feuille sous les noms ayoyo/ademe. L’extrait n’identifie pas l’espèce botanique.',
        ],
      },
      {
        type: 'subtitle',
        content: 'Ce que ces publications ne démontrent pas',
      },
      {
        type: 'paragraph',
        content:
          'Un témoignage, une vidéo de cuisine ou une page de producteurs peut orienter une enquête ethnobotanique ; cela ne confirme ni l’identité de l’espèce botanique concernée, ni la sécurité d’une préparation, ni un effet sur la santé. En particulier, ayoyo/ademe n’est pas attribué ici à Corchorus olitorius. Une publication sociale ne justifie aucun dosage, traitement ou promesse médicale.',
      },
      {
        type: 'subtitle',
        content: 'Comment poursuivre la vérification',
      },
      {
        type: 'paragraph',
        content:
          'Pour documenter une pratique, il faut préciser le pays, la langue, le nom local, la partie utilisée et le contexte, avec le consentement et la reconnaissance des personnes qui transmettent le savoir. L’identité botanique se vérifie séparément auprès d’une source taxonomique ou d’une flore régionale. Dans cette bibliothèque, les réseaux sociaux restent explicitement étiquetés comme témoignages ; les références scientifiques ne sont utilisées que pour les points qu’elles documentent réellement.',
      },
    ],
    sourceLinks: [
      {
        title: 'Facebook — Moringa Senegal-Nebedaye, publication sur production et transformation',
        url: 'https://www.facebook.com/MoringalSen/posts/ces-informations-sont-tirées-du-manuel-sur-la-production-et-la-transformation-du/197205320820454/',
        kind: 'publication sociale',
        note:
          'Résultat public indexé ; publication non ouverte et date non visible. Témoignage et piste de transmission communautaire, pas une preuve médicale ni de sécurité.',
      },
      {
        title: 'Instagram — « Ethnobotany 101: Ebieba »',
        url: 'https://www.instagram.com/reel/DdeLB_VoR2X/',
        kind: 'publication sociale',
        note:
          'Extrait public indexé sur l’usage des feuilles comme emballage ; publication non ouverte. Témoignage culturel, pas preuve médicale.',
      },
      {
        title: 'TikTok — « Ayoyo (Ademe) African Green Leafy Vegetable: Uses & Recipes »',
        url: 'https://www.tiktok.com/@cheflifestyle_/video/7679522645712375061',
        kind: 'publication sociale',
        note:
          'Extrait public indexé ; vidéo non ouverte et espèce non identifiée dans l’extrait. Témoignage culturel, pas preuve médicale.',
      },
      {
        title: 'GBIF — Thaumatococcus daniellii',
        url: 'https://www.gbif.org/species/11066824',
        kind: 'taxonomie',
        note: 'Référence de nom scientifique, pas vérification d’un usage culturel.',
      },
      {
        title: 'Article ouvert sur Thaumatococcus daniellii et la thaumatine (2026)',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13441740/',
        kind: 'scientifique',
        note:
          'Source indépendante sur l’origine ouest-africaine et les thaumatines du fruit ; elle ne valide pas l’extrait Instagram sur les feuilles.',
      },
      {
        title: 'Revue systématique sur les essais humains de Moringa oleifera (2026)',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13238855/',
        kind: 'scientifique',
        note:
          'La revue conclut que les données disponibles ne suffisent pas à établir un lien causal pour les effets étudiés sur le poids et la pression artérielle.',
      },
    ],
  },
  {
    id: 'dawadawa-ingredient-etude',
    titre: 'Dawadawa : un condiment, plusieurs pratiques',
    sousTitre: 'Fermentation et variation entre communautés ghanéennes',
    auteur: 'Équipe éditoriale des Plantes Sacrées',
    source: 'Étude ouverte et reportage de la Ghana News Agency',
    annee: '2025–2026',
    duree: '5 min',
    categorie: 'culture',
    categorieLabel: 'Cuisine & transmission',
    planteIcon: '🫘',
    couleur: '#9B6B3D',
    resume:
      'Le dawadawa issu des graines de néré est un condiment fermenté important dans la cuisine ghanéenne. Les études mesurent des différences entre échantillons : elles ne permettent pas d’en faire un médicament.',
    tags: ['dawadawa', 'néré', 'fermentation', 'Ghana', 'alimentation'],
    contenu: [
      {
        type: 'paragraph',
        content:
          'Le dawadawa est décrit comme un condiment fermenté de graines de néré (Parkia biglobosa), utilisé dans des préparations ghanéennes, notamment dans le nord du pays. Un reportage de la Ghana News Agency rapporte aussi les souvenirs de collecte et de transformation transmis par une commerçante. Ces témoignages éclairent une pratique culinaire ; ils ne constituent pas un essai de santé.',
      },
      {
        type: 'subtitle',
        content: 'Ce qu’a mesuré l’étude',
      },
      {
        type: 'paragraph',
        content:
          'Une étude ouverte a examiné des échantillons provenant de six communautés du Ghana, notamment leur composition nutritionnelle et leur diversité microbienne. Les teneurs rapportées variaient d’un lieu à l’autre. Cette variabilité rappelle que la fermentation artisanale, les ingrédients et les conditions de fabrication comptent ; un chiffre tiré d’un échantillon ne décrit pas tous les dawadawa.',
      },
      {
        type: 'subtitle',
        content: 'Comment lire les résultats',
      },
      {
        type: 'paragraph',
        content:
          'Une analyse de laboratoire sur des aliments ne démontre pas à elle seule un bénéfice clinique. Les recettes de l’application utilisent le condiment pour son rôle culinaire. Elles ne recommandent ni dosage médicinal ni remplacement d’un soin. Acheter un produit destiné à l’alimentation, suivre les consignes de conservation et éviter un condiment altéré.',
      },
    ],
    sourceLinks: [
      {
        title: 'Microbial Diversity, Nutritional Composition, and Health Implications of Fermented Locust Bean Seed (Dawadawa) From Ghana.',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12447108/',
        kind: 'scientifique',
        note: 'Étude de composition et de diversité microbienne sur des échantillons de six communautés ghanéennes ; pas un essai thérapeutique.',
      },
      {
        title: 'Beyond the scent: Dawadawa, the indigenous northern Ghanaian spice',
        url: 'https://gna.org.gh/2026/03/beyond-the-scent-dawadawa-the-indigenous-northern-ghanaian-spice/',
        kind: 'institutionnelle',
        note: 'Reportage de la Ghana News Agency sur la place culinaire et la transmission du dawadawa.',
      },
      {
        title: 'How to prepare Dawadawa jollof rice',
        url: 'https://www.pulse.com.gh/story/how-to-prepare-dawadawa-jollof-rice-2024081005313224295',
        kind: 'source culinaire',
        note: 'Exemple de recette au riz publiée par Pulse Ghana ; lien culinaire, pas preuve d’un effet sur la santé.',
      },
    ],
  },
  {
    id: 'zamne-evaluation-sensorielle',
    titre: 'Zamné : étudier un condiment du Burkina Faso',
    sousTitre: 'Une évaluation sensorielle située, pas un vote universel',
    auteur: 'Équipe éditoriale des Plantes Sacrées',
    source: 'Scientific Reports, étude ouverte',
    annee: '2025',
    duree: '4 min',
    categorie: 'culture',
    categorieLabel: 'Cuisine & recherche',
    planteIcon: '🌰',
    couleur: '#A77B4C',
    resume:
      'Une étude sensorielle porte sur le zamné fermenté, préparé à partir de graines de Senegalia macrostachya au Burkina Faso, et le compare au soumbala.',
    tags: ['zamné', 'Burkina Faso', 'fermentation', 'évaluation sensorielle'],
    contenu: [
      {
        type: 'paragraph',
        content:
          'Le zamné est un aliment fermenté décrit dans l’étude comme étant consommé dans la région centrale du Burkina Faso. Les auteurs ont comparé son profil sensoriel à celui du soumbala, condiment fermenté de Parkia biglobosa. Cette recherche documente un aliment et une méthode d’évaluation ; elle n’établit pas que l’un des deux condiments est meilleur pour la santé.',
      },
      {
        type: 'subtitle',
        content: 'Ce que les participants ont évalué',
      },
      {
        type: 'paragraph',
        content:
          'Le panel a évalué notamment l’apparence, l’odeur, le goût et l’acceptabilité des échantillons. Certains scores et descriptions étaient favorables pour des caractéristiques précises du zamné frais. Ils concernent les participants et les préparations de cette étude : ils ne prouvent pas une préférence générale au Burkina Faso, encore moins une popularité constante sur plusieurs plateformes.',
      },
      {
        type: 'paragraph',
        content:
          'Pour transmettre une recette, il reste important de préciser l’espèce, le lieu, la méthode de fermentation et les conditions d’hygiène. Le résumé scientifique ne fournit pas à lui seul un protocole domestique complet ; l’application ne transforme donc pas ces résultats sensoriels en instructions de fermentation.',
      },
    ],
    sourceLinks: [
      {
        title: 'Sensory properties of fermented Zamné (Senegalia macrostachya seeds) and their influence on the broth quality and sensory profile.',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12318027/',
        kind: 'scientifique',
        note: 'Étude sensorielle comparant le zamné fermenté au soumbala ; résultats propres au panel et aux échantillons étudiés.',
      },
    ],
  },
  {
    id: 'feuille-amere-transformation',
    titre: 'Feuille amère : la préparation change le résultat',
    sousTitre: 'Ce que l’on sait — et ce qu’il reste à vérifier',
    auteur: 'Équipe éditoriale des Plantes Sacrées',
    source: 'Foods, revue scientifique ouverte',
    annee: '2026',
    duree: '5 min',
    categorie: 'ethnobotanique',
    categorieLabel: 'Alimentation & preuves',
    planteIcon: '🍃',
    couleur: '#688A4F',
    resume:
      'Une revue examine les effets du lavage et de la cuisson sur Vernonia amygdalina, tout en soulignant que les recherches ne permettent pas de généraliser un effet nutritionnel ou clinique.',
    tags: ['Vernonia amygdalina', 'feuille amère', 'cuisson', 'preuves'],
    contenu: [
      {
        type: 'paragraph',
        content:
          'Vernonia amygdalina, appelée feuille amère dans plusieurs contextes, est un légume consommé dans différentes régions. Une revue de 2026 s’intéresse aux étapes de transformation alimentaire — notamment l’ébullition et le lavage à l’eau — et sépare les observations mesurées des hypothèses encore extrapolées.',
      },
      {
        type: 'subtitle',
        content: 'Pourquoi le détail culinaire compte',
      },
      {
        type: 'paragraph',
        content:
          'La revue indique que le lavage et l’ébullition peuvent réduire l’amertume et certains facteurs antinutritionnels, mais aussi modifier des nutriments sensibles à la chaleur. Les études sont hétérogènes : leurs résultats ne donnent pas une valeur unique applicable à toutes les variétés, préparations ou portions.',
      },
      {
        type: 'subtitle',
        content: 'La limite médicale',
      },
      {
        type: 'paragraph',
        content:
          'Les travaux sur les extraits, la composition ou la bioaccessibilité ne démontrent pas qu’une soupe de feuilles amères soigne une maladie. La revue signale elle-même un écart entre les données de laboratoire et la pratique alimentaire réelle. Une recette reste ici une préparation culinaire, pas un conseil de traitement.',
      },
    ],
    sourceLinks: [
      {
        title: 'Processing, Bioaccessibility, Predicted Bioavailability, Gut Microbiome Interactions and Potential Food Applications of Vernonia amygdalina (Bitter Leaf): Bridging the Evidence-to-Practice Gap.',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13565637/',
        kind: 'scientifique',
        note: 'Revue des méthodes de transformation et des limites de l’extrapolation aux aliments consommés.',
      },
      {
        title: 'Bitterleaf Soup (Ofe Onugbu) - All Nigerian Recipes',
        url: 'https://www.allnigerianrecipes.com/soups/bitterleaf-soup/',
        kind: 'source culinaire',
        note: 'Source de cuisine igbo décrivant le lavage des feuilles et la soupe ; elle ne démontre pas d’effet thérapeutique.',
      },
    ],
  },
  {
    id: 'moringa-essais-humains',
    titre: 'Moringa : ne pas confondre tradition et preuve clinique',
    sousTitre: 'Une revue systématique examine les essais chez l’humain',
    auteur: 'Équipe éditoriale des Plantes Sacrées',
    source: 'Food Science & Nutrition, revue systématique ouverte',
    annee: '2026',
    duree: '5 min',
    categorie: 'medecine',
    categorieLabel: 'Lecture critique',
    planteIcon: '🌱',
    couleur: '#568C58',
    resume:
      'Une méta-analyse d’essais randomisés n’a pas trouvé de preuve suffisante pour établir un effet causal du moringa sur le poids ou la pression artérielle.',
    tags: ['moringa', 'essais cliniques', 'revue systématique', 'prudence'],
    contenu: [
      {
        type: 'paragraph',
        content:
          'Le moringa est consommé comme aliment et fait aussi l’objet de nombreuses allégations de santé en ligne. Une revue systématique publiée en 2026 a recherché des essais randomisés portant sur le poids et la pression artérielle. Huit essais ont été inclus parmi les études repérées par les auteurs.',
      },
      {
        type: 'subtitle',
        content: 'Conclusion des auteurs',
      },
      {
        type: 'paragraph',
        content:
          'La revue conclut que les éléments disponibles ne suffisent pas à établir un lien causal entre la consommation de Moringa oleifera et une réduction de ces mesures chez l’humain. Ce constat ne signifie pas que le moringa n’a aucune valeur alimentaire ; il signifie que ces essais ne justifient pas une promesse de traitement ou de prévention.',
      },
      {
        type: 'paragraph',
        content:
          'Les messages viraux, les témoignages et les mesures de laboratoire peuvent aider à repérer des questions, mais ils ne remplacent pas des essais bien conçus. Pour une tension élevée ou un changement de poids préoccupant, il faut demander conseil à un professionnel de santé plutôt que remplacer un suivi par une plante.',
      },
    ],
    sourceLinks: [
      {
        title: 'The Effect of Moringa oleifera on Body Weight and Blood Pressure: A Systematic Review and Meta-Analysis of Randomized Controlled Trials.',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13238855/',
        kind: 'scientifique',
        note: 'Revue systématique et méta-analyse d’essais randomisés ; les auteurs jugent les preuves insuffisantes pour établir un lien causal.',
      },
    ],
  },
  {
    id: 'basilic-africain-cuisine',
    titre: 'Le basilic africain dans la cuisine ouest-africaine',
    sousTitre: 'Une herbe aromatique, des usages culinaires à distinguer des essais',
    auteur: 'Équipe éditoriale des Plantes Sacrées',
    source: 'Plants, revue scientifique ouverte',
    annee: '2026',
    duree: '4 min',
    categorie: 'culture',
    categorieLabel: 'Cuisine & botanique',
    planteIcon: '🌿',
    couleur: '#53856A',
    resume:
      'Une revue botanique décrit Ocimum gratissimum comme une plante aromatique utilisée pour parfumer des plats et des soupes ouest-africains, tout en rappelant que les données pharmacologiques ne valent pas preuve clinique.',
    tags: ['Ocimum gratissimum', 'basilic africain', 'aromates', 'cuisine'],
    contenu: [
      {
        type: 'paragraph',
        content:
          'Ocimum gratissimum, souvent appelé basilic africain, est présenté dans une revue de 2026 comme une plante aromatique dont les feuilles servent à parfumer des plats et des soupes dans des foyers d’Afrique de l’Ouest. Les noms populaires peuvent varier : vérifier l’espèce avant d’associer une recette à cette plante.',
      },
      {
        type: 'subtitle',
        content: 'L’aromate n’est pas une ordonnance',
      },
      {
        type: 'paragraph',
        content:
          'La revue rassemble des données sur la composition et des activités observées dans différentes études. Une activité pharmacologique ou un résultat de laboratoire n’équivaut pas à une efficacité démontrée chez des personnes. Cette fiche documente l’usage culinaire décrit par la revue ; elle ne recommande pas d’utiliser l’huile essentielle ou un extrait concentré.',
      },
      {
        type: 'paragraph',
        content:
          'En cuisine, employer des feuilles vendues comme aliment, les laver avec de l’eau potable et les ajouter selon le goût. Les extraits concentrés et les huiles essentielles ne sont pas interchangeables avec une herbe utilisée comme condiment.',
      },
    ],
    sourceLinks: [
      {
        title: 'Ocimum gratissimum: Chemical Composition, Phytochemical Properties, Antioxidants, and Pharmacological Activities: A Review.',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13259028/',
        kind: 'scientifique',
        note: 'Revue de composition et d’activités étudiées ; elle indique aussi un usage aromatique dans les plats et soupes ouest-africains.',
      },
    ],
  },
];
