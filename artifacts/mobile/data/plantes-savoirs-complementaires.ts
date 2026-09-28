/**
 * Fiches alimentaires et agroécologiques appuyées par les références liées.
 * Les publications sociales sont signalées comme témoignages, jamais comme
 * preuves d'efficacité médicale.
 */

import type { PlanteMedicinale } from './plantes-medicinales';

const gbif = (key: number, name: string) => ({
  title: `GBIF — ${name} (nom et classification)`,
  url: `https://www.gbif.org/species/${key}`,
  kind: 'taxonomie' as const,
  note: 'Référence taxonomique uniquement : elle ne valide pas les usages décrits.',
});

const article = (title: string, pmc: string, note: string) => ({
  title,
  url: `https://pmc.ncbi.nlm.nih.gov/articles/${pmc}/`,
  kind: 'scientifique' as const,
  note,
});

export const PLANTES_SAVOIRS_COMPLEMENTAIRES: PlanteMedicinale[] = [
  {
    id: 'vigna-unguiculata',
    nomVulgaire: 'Niébé — cowpea',
    nomScientifique: 'Vigna unguiculata',
    famille: 'Fabaceae',
    nomsAfricains: {},
    categorieTherapeutique: 'Légumineuse alimentaire',
    typeSavoir: 'alimentaire',
    couleur: '#9A7740',
    icone: '🌱',
    historique:
      'Une revue scientifique de 2025 présente le niébé comme une culture vivrière importante, à usages alimentaires et agricoles multiples, particulièrement en Afrique.',
    descriptionPlante:
      'L’espèce est reconnue par GBIF sous le nom Vigna unguiculata. Les variétés, noms de marché et préparations changent selon les lieux ; cette fiche ne présente pas une recette comme universelle.',
    actionCurative:
      'Intérêt alimentaire et agricole documenté. La revue citée ne constitue pas une preuve d’effet thérapeutique.',
    emplois: [
      {
        indication: 'Alimentation — graines',
        preparation:
          'Les graines sont consommées après cuisson complète. Pour une recette régionale précise, s’appuyer sur une source culinaire du pays concerné.',
      },
      {
        indication: 'Culture vivrière',
        preparation:
          'La revue décrit aussi des rôles agricoles du niébé, sans fournir ici de conseil de culture adapté à une localité précise.',
      },
    ],
    partiesUtilisees: ['graines'],
    precautions:
      'Fiche alimentaire, pas un traitement. Employer une denrée correctement identifiée et suivre les règles d’hygiène et de cuisson.',
    source: 'Revue sur le niébé, Frontiers in Plant Science, 2025',
    sourceLinks: [
      gbif(2982583, 'Vigna unguiculata'),
      article(
        'Cowpea (Vigna unguiculata L.) production, genetic resources and strategic breeding priorities for sustainable food security: a review',
        'PMC12339483',
        'La revue décrit les usages alimentaires et agricoles du niébé, notamment en Afrique.',
      ),
    ],
  },
  {
    id: 'corchorus-olitorius',
    nomVulgaire: 'Corète potagère — jute mallow',
    nomScientifique: 'Corchorus olitorius',
    famille: 'Malvaceae',
    nomsAfricains: {},
    categorieTherapeutique: 'Feuille alimentaire — identité à préciser',
    typeSavoir: 'alimentaire',
    couleur: '#668B54',
    icone: '🌿',
    historique:
      'Un article scientifique de 2026 décrit Corchorus olitorius comme une plante comestible largement consommée en Asie. Une vidéo TikTok indexée parle d’« ayoyo / ademe » comme légume-feuille au Ghana, mais son extrait ne confirme pas l’identité botanique.',
    descriptionPlante:
      'GBIF reconnaît Corchorus olitorius comme espèce acceptée de la famille des Malvaceae. Les noms locaux seuls ne suffisent pas à relier une préparation à cette espèce.',
    actionCurative:
      'Intérêt alimentaire documenté, sans allégation médicale. Les sources consultées ne permettent pas de confirmer que « ayoyo / ademe » désigne cette espèce ni de décrire un usage régional précis.',
    emplois: [
      {
        indication: 'Lecture critique des noms locaux',
        preparation:
          'Ne pas attribuer le nom « ayoyo / ademe » à Corchorus olitorius sur la base du seul extrait social ; rechercher une identification botanique locale avant de publier une recette.',
      },
    ],
    partiesUtilisees: ['feuilles — usage rapporté par la littérature'],
    precautions:
      'Ne pas cueillir ni cuisiner une plante sauvage sur la base d’un nom ou d’une vidéo. L’extrait social est un témoignage à vérifier, pas une identification ni un conseil de santé.',
    source: 'Article scientifique sur Corchorus olitorius, Journal of Food Science, 2026',
    sourceLinks: [
      gbif(3152084, 'Corchorus olitorius'),
      article(
        'Dietary-Derived Corchorus olitorius L. Extract Suppresses KRAS-Mutant Pancreatic Cancer by Activating Ferritinophagy-Dependent Ferroptosis',
        'PMC13525489',
        'Le résumé décrit la plante comme comestible, surtout dans un contexte asiatique ; il ne valide pas les noms locaux cités dans la vidéo.',
      ),
      {
        title: 'TikTok — « Ayoyo (Ademe) African Green Leafy Vegetable: Uses & Recipes »',
        url: 'https://www.tiktok.com/@cheflifestyle_/video/7679522645712375061',
        kind: 'publication sociale',
        note: 'Extrait de résultat public indexé ; vidéo non ouverte et espèce botanique non confirmée. Témoignage culturel, pas preuve médicale.',
      },
    ],
  },
  {
    id: 'amaranthus-cruentus',
    nomVulgaire: 'Amarante — Amaranthus cruentus',
    nomScientifique: 'Amaranthus cruentus',
    famille: 'Amaranthaceae',
    nomsAfricains: {},
    categorieTherapeutique: 'Légume-feuille',
    typeSavoir: 'alimentaire',
    couleur: '#8A7255',
    icone: '🌿',
    historique:
      'Une étude de 2026 qualifie Amaranthus cruentus de légume-feuille important en Afrique subsaharienne et rapporte une évaluation participative de lignées avec des agriculteurs.',
    descriptionPlante:
      'GBIF reconnaît l’espèce sous le nom Amaranthus cruentus. Les amarantes cultivées et les noms vernaculaires peuvent désigner plusieurs espèces ; vérifier l’identité avant d’associer un nom local à cette fiche.',
    actionCurative:
      'Intérêt alimentaire et agronomique. Les résultats de sélection variétale ne sont pas des résultats cliniques et ne démontrent aucun effet thérapeutique.',
    emplois: [
      {
        indication: 'Alimentation — feuilles',
        preparation:
          'La source documente l’espèce comme légume-feuille. Elle ne décrit pas une recette ou un protocole de préparation régional précis.',
      },
    ],
    partiesUtilisees: ['feuilles — légume cultivé'],
    precautions:
      'Privilégier une plante cultivée et identifiée. Ne pas attribuer à toutes les amarantes les caractéristiques d’Amaranthus cruentus.',
    source: 'Étude participative sur Amaranthus cruentus, Frontiers in Plant Science, 2026',
    sourceLinks: [
      gbif(5384390, 'Amaranthus cruentus'),
      article(
        'Farmer participatory evaluation of Amaranthus cruentus L. breeding lines for marketable vegetable yield and organoleptic quality under on-farm and on-station conditions',
        'PMC13199344',
        'L’étude décrit cette espèce comme légume-feuille important en Afrique subsaharienne.',
      ),
    ],
  },
  {
    id: 'solanum-aethiopicum',
    nomVulgaire: 'Aubergine africaine',
    nomScientifique: 'Solanum aethiopicum',
    famille: 'Solanaceae',
    nomsAfricains: {},
    categorieTherapeutique: 'Fruit alimentaire',
    typeSavoir: 'alimentaire',
    couleur: '#A66D4E',
    icone: '🌿',
    historique:
      'Une étude de 2026 compare des fruits de deux variétés de Solanum aethiopicum selon leur maturité et des traitements culinaires comme l’ébullition et la cuisson à la vapeur.',
    descriptionPlante:
      'GBIF reconnaît Solanum aethiopicum comme espèce acceptée. Les formes et cultivars d’aubergine africaine sont divers ; la source porte sur des fruits de variétés identifiées, pas sur tous les Solanum.',
    actionCurative:
      'La publication traite de composition et de traitements culinaires. Ses mesures expérimentales ne démontrent pas une efficacité médicale chez l’humain.',
    emplois: [
      {
        indication: 'Alimentation — fruits',
        preparation:
          'La source étudie des fruits cuits à l’eau ou à la vapeur. Elle ne permet pas d’en déduire une recette traditionnelle universelle.',
      },
    ],
    partiesUtilisees: ['fruits — variétés étudiées'],
    precautions:
      'N’utiliser que des fruits de consommation correctement identifiés. Ne pas extrapoler les propriétés d’une variété à toutes les espèces du genre Solanum.',
    source: 'Étude sur maturité et traitements culinaires de Solanum aethiopicum, 2026',
    sourceLinks: [
      gbif(2929847, 'Solanum aethiopicum'),
      article(
        'Impact of State of Ripeness and Culinary Treatments on the Hypoglycemic, Antioxidant, and Nutritional Properties of Two Varieties of Solanum aethiopicum L. Fruit',
        'PMC13139839',
        'L’étude compare des fruits de deux variétés et des traitements culinaires.',
      ),
    ],
  },
  {
    id: 'ipomoea-batatas',
    nomVulgaire: 'Patate douce',
    nomScientifique: 'Ipomoea batatas',
    famille: 'Convolvulaceae',
    nomsAfricains: {},
    categorieTherapeutique: 'Feuilles alimentaires',
    typeSavoir: 'alimentaire',
    couleur: '#739257',
    icone: '🌿',
    historique:
      'Une revue de 2026 porte sur les feuilles de patate douce et leur valorisation alimentaire. Elle décrit des feuilles souvent sous-utilisées, sans établir une tradition culinaire propre à un pays ouest-africain.',
    descriptionPlante:
      'GBIF reconnaît Ipomoea batatas comme espèce acceptée. Cette fiche concerne les feuilles mentionnées par la revue ; elle ne confond pas la patate douce avec d’autres plantes parfois appelées liserons.',
    actionCurative:
      'Repère alimentaire général. Les travaux sur la composition ou la transformation ne constituent pas une preuve de traitement ou de prévention d’une maladie.',
    emplois: [
      {
        indication: 'Alimentation — feuilles',
        preparation:
          'La revue traite de la valorisation des feuilles, mais ne vérifie pas ici une préparation spécifique d’Afrique de l’Ouest.',
      },
    ],
    partiesUtilisees: ['feuilles'],
    precautions:
      'Choisir des feuilles cultivées et correctement identifiées, les laver à l’eau potable et les cuire ; ne pas substituer une plante sauvage ressemblante.',
    source: 'Revue sur la valorisation des feuilles d’Ipomoea batatas, Foods, 2026',
    sourceLinks: [
      gbif(2928551, 'Ipomoea batatas'),
      article(
        'From Source to Utilization: A Review of Influencing Factors and Safety Assessment for High-Value Utilization of Sweet Potato (Ipomoea batatas L.) Leaves',
        'PMC13409526',
        'Revue générale sur les feuilles comme ressource alimentaire ; elle ne décrit pas une recette régionale ouest-africaine.',
      ),
    ],
  },
  {
    id: 'parkia-biglobosa',
    nomVulgaire: 'Néré — locust bean',
    nomScientifique: 'Parkia biglobosa',
    famille: 'Fabaceae',
    nomsAfricains: {},
    categorieTherapeutique: 'Graine fermentée — condiment',
    typeSavoir: 'alimentaire',
    couleur: '#987644',
    icone: '🌳',
    historique:
      'Une étude ouverte de 2025 présente le dawadawa, produit fermenté de graines de Parkia biglobosa, comme un aliment consommé dans le nord du Ghana. Une autre étude le cite comme condiment populaire en Afrique de l’Ouest.',
    descriptionPlante:
      'GBIF reconnaît Parkia biglobosa comme espèce acceptée. La fiche porte sur les graines fermentées et leurs noms culinaires rapportés ; elle ne décrit pas les usages médicinaux de l’arbre.',
    actionCurative:
      'Intérêt culinaire et culturel documenté. Les études de composition alimentaire ne prouvent pas de bénéfice thérapeutique.',
    emplois: [
      {
        indication: 'Alimentation — graines fermentées',
        preparation:
          'Le dawadawa et le soumbala sont cités comme produits de fermentation de graines. Cette fiche n’ajoute ni durée de fermentation ni recette non vérifiée.',
      },
    ],
    partiesUtilisees: ['graines — transformées en condiment fermenté'],
    precautions:
      'Respecter des pratiques d’hygiène et de fermentation alimentaire sûres. Ne pas assimiler un produit fermenté artisanal à un médicament.',
    source: 'Études ouvertes sur le dawadawa et le soumbala, 2025',
    sourceLinks: [
      gbif(5348812, 'Parkia biglobosa'),
      article(
        'Microbial Diversity, Nutritional Composition, and Health Implications of Fermented Locust Bean Seed (Dawadawa) From Ghana',
        'PMC12447108',
        'Étude consacrée au dawadawa fermenté à partir de graines de Parkia biglobosa au Ghana.',
      ),
      article(
        'Sensory properties of fermented Zamné (Senegalia macrostachya seeds) and their influence on the broth quality and sensory profile',
        'PMC12318027',
        'L’article compare le zamné au soumbala, condiment fermenté de Parkia biglobosa.',
      ),
    ],
  },
  {
    id: 'gymnanthemum-amygdalinum',
    nomVulgaire: 'Vernonia amère — bitter leaf',
    nomScientifique: 'Gymnanthemum amygdalinum',
    famille: 'Asteraceae',
    nomsAfricains: {},
    categorieTherapeutique: 'Légume-feuille',
    typeSavoir: 'alimentaire',
    couleur: '#66865A',
    icone: '🌿',
    historique:
      'Une revue de 2026 sur Vernonia amygdalina — nom souvent rencontré dans la littérature — décrit cette plante comme légume-feuille et examine les effets des méthodes de transformation alimentaire.',
    descriptionPlante:
      'GBIF accepte Gymnanthemum amygdalinum et classe Vernonia amygdalina comme synonyme du même taxon. Cette équivalence est utile pour retrouver des publications sous les deux noms.',
    actionCurative:
      'La revue porte sur la transformation d’un légume-feuille ; elle ne valide pas les usages médicinaux ni les promesses de santé diffusées à son sujet.',
    emplois: [
      {
        indication: 'Alimentation — feuilles',
        preparation:
          'La revue analyse des méthodes domestiques et alimentaires, mais les extraits consultés ne suffisent pas à publier une recette précise ou un conseil de santé.',
      },
    ],
    partiesUtilisees: ['feuilles — légume documenté'],
    precautions:
      'Identifier l’espèce avant de reprendre un nom vernaculaire. Les allégations médicinales ne sont pas établies par une recette ou un témoignage.',
    source: 'Revue sur la transformation alimentaire de Vernonia amygdalina, Foods, 2026',
    sourceLinks: [
      gbif(3130899, 'Gymnanthemum amygdalinum'),
      article(
        'Processing, Bioaccessibility, Predicted Bioavailability, Gut Microbiome Interactions and Potential Food Applications of Vernonia amygdalina (Bitter Leaf): Bridging the Evidence-to-Practice Gap',
        'PMC13565637',
        'La revue traite de la plante comme légume-feuille et des méthodes de transformation.',
      ),
    ],
  },
  {
    id: 'ocimum-gratissimum',
    nomVulgaire: 'Basilic africain',
    nomScientifique: 'Ocimum gratissimum',
    famille: 'Lamiaceae',
    nomsAfricains: {},
    categorieTherapeutique: 'Herbe aromatique',
    typeSavoir: 'alimentaire',
    couleur: '#6C8A54',
    icone: '🌿',
    historique:
      'Une revue scientifique de 2026 décrit Ocimum gratissimum comme un basilic africain, originaire d’Afrique, dont les feuilles sont aussi utilisées pour parfumer des plats.',
    descriptionPlante:
      'GBIF reconnaît Ocimum gratissimum comme espèce acceptée de la famille des Lamiaceae. Il ne faut pas le confondre avec tous les basilics cultivés sous des noms proches.',
    actionCurative:
      'La fiche retient son emploi aromatique alimentaire. Les activités pharmacologiques évoquées dans la revue ne sont pas présentées comme des traitements validés.',
    emplois: [
      {
        indication: 'Cuisine — herbe aromatique',
        preparation:
          'La revue mentionne l’emploi aromatique dans les plats ; elle ne décrit pas un dosage ou une recette régionale unique.',
      },
    ],
    partiesUtilisees: ['feuilles'],
    precautions:
      'Cette fiche concerne un usage alimentaire courant, pas une huile essentielle ni un extrait concentré. Ne pas extrapoler les études d’extraits à la cuisine.',
    source: 'Revue sur Ocimum gratissimum, 2026',
    sourceLinks: [
      gbif(2927094, 'Ocimum gratissimum'),
      article(
        'Ocimum gratissimum: Chemical Composition, Phytochemical Properties, Antioxidants, and Pharmacological Activities: A Review',
        'PMC13259028',
        'Le résumé décrit le basilic africain et son emploi aromatique dans les plats.',
      ),
    ],
  },
  {
    id: 'xylopia-aethiopica',
    nomVulgaire: 'Poivre d’Éthiopie',
    nomScientifique: 'Xylopia aethiopica',
    famille: 'Annonaceae',
    nomsAfricains: {},
    categorieTherapeutique: 'Épice culinaire',
    typeSavoir: 'alimentaire',
    couleur: '#9A7048',
    icone: '🌳',
    historique:
      'Une étude de 2026 présente les fruits séchés de Xylopia aethiopica comme une épice culinaire employée dans plusieurs pays africains et étudie séparément des extraits chez l’animal.',
    descriptionPlante:
      'GBIF reconnaît Xylopia aethiopica comme espèce acceptée. Cette fiche concerne uniquement l’épice alimentaire ; les expériences sur extraits et animaux ne sont pas transposées à l’usage culinaire.',
    actionCurative:
      'Intérêt culinaire rapporté. L’étude de toxicologie animale ne fournit ni preuve de bénéfice thérapeutique ni conseil de dosage pour l’être humain.',
    emplois: [
      {
        indication: 'Cuisine — fruit épice',
        preparation:
          'La publication décrit le fruit séché comme épice. Aucun protocole d’extrait ou usage médicinal n’est repris dans cette fiche.',
      },
    ],
    partiesUtilisees: ['fruits séchés — épice'],
    precautions:
      'Ne pas confondre l’usage comme épice et les préparations concentrées. Ne pas utiliser les extraits étudiés chez l’animal comme remède.',
    source: 'Étude de sécurité préclinique sur le fruit-épice, 2026',
    sourceLinks: [
      gbif(3157151, 'Xylopia aethiopica'),
      article(
        'Acute (14-Day) and Subchronic (90-Day) Toxicity Evaluation of the Dried Fruit Spice Xylopia aethiopica (Dunal) A. Rich. (Annonaceae) in Male and Female Wistar Rats',
        'PMC13195186',
        'Le résumé décrit l’usage culinaire et une étude chez le rat ; celle-ci ne valide pas un traitement humain.',
      ),
    ],
  },
  {
    id: 'faidherbia-albida',
    nomVulgaire: 'Faidherbia — arbre des parcs sahéliens',
    nomScientifique: 'Faidherbia albida',
    famille: 'Fabaceae',
    nomsAfricains: {},
    categorieTherapeutique: 'Agroforesterie sahélienne',
    typeSavoir: 'agroecologique',
    couleur: '#8A754C',
    icone: '🌳',
    historique:
      'Une étude de 2026 consacrée aux parcs agroforestiers du Sahel suit la décomposition et la libération de nutriments des feuilles de Faidherbia albida au Mali, au Burkina Faso et au Sénégal.',
    descriptionPlante:
      'GBIF reconnaît Faidherbia albida comme espèce acceptée de la famille des Fabaceae. La source consultée décrit le rôle de sa biomasse foliaire dans les systèmes agroforestiers, pas une prescription de gestion locale.',
    actionCurative:
      'Intérêt agroécologique documenté : la recherche mesure la décomposition des feuilles et leur contribution potentielle aux apports organiques. Aucun usage médicinal n’est décrit ici.',
    emplois: [
      {
        indication: 'Agroforesterie — biomasse foliaire',
        preparation:
          'La publication étudie les feuilles dans des systèmes agricoles sahéliens. Les pratiques de taille ou de fertilisation doivent être adaptées avec des spécialistes locaux.',
      },
    ],
    partiesUtilisees: ['feuilles — biomasse étudiée'],
    precautions:
      'Ne pas transformer un résultat de recherche en recommandation de coupe ou d’épandage sans tenir compte du lieu, de la saison et des règles communautaires.',
    source: 'Étude sur la biomasse foliaire d’arbres agroforestiers ouest-africains, 2026',
    sourceLinks: [
      gbif(5360150, 'Faidherbia albida'),
      article(
        'Decomposition and nutrient release from leaves of some common agroforestry tree/shrub species of Sudano-Sahelian West Africa',
        'PMC12835154',
        'L’étude suit la décomposition des feuilles et leur libération de nutriments au Sahel.',
      ),
    ],
  },
  {
    id: 'thaumatococcus-daniellii',
    nomVulgaire: 'Thaumatococcus — plante au thaumatin',
    nomScientifique: 'Thaumatococcus daniellii',
    famille: 'Marantaceae',
    nomsAfricains: {},
    categorieTherapeutique: 'Aliment et emballage végétal',
    typeSavoir: 'alimentaire',
    couleur: '#668C5A',
    icone: '🌿',
    historique:
      'Une revue scientifique de 2026 décrit Thaumatococcus daniellii comme une plante ouest-africaine dont le fruit contient des protéines intensément sucrées appelées thaumatines. Une publication Instagram présente aussi ses feuilles comme emballage culinaire dans des préparations nigérianes ; ce second point reste un témoignage social.',
    descriptionPlante:
      'GBIF reconnaît Thaumatococcus daniellii comme espèce acceptée de la famille des Marantaceae. Le fruit et les feuilles correspondent à des usages distincts ; la source sociale n’est pas une preuve scientifique indépendante.',
    actionCurative:
      'Intérêt alimentaire et technique rapporté. La présence de thaumatine dans le fruit ne transforme pas la plante en traitement médical.',
    emplois: [
      {
        indication: 'Fruit — édulcorant étudié',
        preparation:
          'La revue traite de la thaumatine extraite du fruit ; elle ne donne pas de méthode domestique de récolte ou de dosage.',
      },
      {
        indication: 'Feuille — emballage culinaire rapporté',
        preparation:
          'Une publication sociale évoque l’emballage de préparations nigérianes avec les feuilles. L’extrait n’a pas été vérifié auprès d’une source culinaire indépendante.',
      },
    ],
    partiesUtilisees: ['fruit — thaumatine étudiée', 'feuilles — emballage rapporté'],
    precautions:
      'Les informations sur les feuilles sont un témoignage social, pas une validation de sécurité alimentaire. Ne pas appliquer ou ingérer une préparation médicinale sur la base de cette fiche.',
    source: 'Revue sur la thaumatine et publication sociale sur les feuilles, 2026',
    sourceLinks: [
      gbif(11066824, 'Thaumatococcus daniellii'),
      article(
        'Techno-economic assessment for plant seed-based production of Thaumatin II: a natural high intensity protein sweetener',
        'PMC13441740',
        'La revue décrit la plante ouest-africaine et la thaumatine du fruit.',
      ),
      {
        title: 'Instagram — « Ethnobotany 101: Ebieba »',
        url: 'https://www.instagram.com/reel/DdeLB_VoR2X/',
        kind: 'publication sociale',
        note: 'Extrait public indexé sur l’emballage culinaire ; la publication n’a pas été ouverte. Témoignage culturel, pas preuve médicale ni vérification indépendante.',
      },
    ],
  },
  {
    id: 'senegalia-macrostachya',
    nomVulgaire: 'Zamné — Senegalia',
    nomScientifique: 'Senegalia macrostachya',
    famille: 'Fabaceae',
    nomsAfricains: {},
    categorieTherapeutique: 'Graines fermentées',
    typeSavoir: 'alimentaire',
    couleur: '#9A7549',
    icone: '🌳',
    historique:
      'Une étude de 2025 documente le zamné fermenté, préparé à partir de graines de Senegalia macrostachya dans le centre du Burkina Faso, et compare ses propriétés sensorielles à celles du soumbala.',
    descriptionPlante:
      'GBIF reconnaît Senegalia macrostachya comme espèce acceptée de la famille des Fabaceae. La fiche documente la préparation alimentaire citée par l’étude sans extrapoler à d’autres régions.',
    actionCurative:
      'Intérêt culinaire et patrimonial. Les résultats sensoriels d’un aliment fermenté ne démontrent pas d’effet médical.',
    emplois: [
      {
        indication: 'Alimentation — zamné fermenté',
        preparation:
          'L’étude décrit le produit et son profil sensoriel ; aucune durée, recette détaillée ou recommandation de fermentation n’est ajoutée ici.',
      },
    ],
    partiesUtilisees: ['graines — aliment fermenté documenté'],
    precautions:
      'Respecter les règles d’hygiène et de fermentation alimentaire. La méthode locale doit être apprise auprès de sources compétentes du Burkina Faso.',
    source: 'Étude sensorielle sur le zamné fermenté, Scientific Reports, 2025',
    sourceLinks: [
      gbif(7936172, 'Senegalia macrostachya'),
      article(
        'Sensory properties of fermented Zamné (Senegalia macrostachya seeds) and their influence on the broth quality and sensory profile',
        'PMC12318027',
        'Étude sur le zamné du centre du Burkina Faso et comparaison avec le soumbala.',
      ),
    ],
  },
];