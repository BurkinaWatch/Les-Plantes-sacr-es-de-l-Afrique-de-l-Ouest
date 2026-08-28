/**
 * Monographies complémentaires transcrites depuis :
 * Jean-Louis Pousset, Plantes Médicinales Africaines — Utilisation Pratique,
 * Éditions ESTEM / AUPELF, Paris, 1989.
 *
 * Ces entrées complètent la première série de fiches déjà présente dans
 * plantes-medicinales.ts. Elles décrivent des usages traditionnels documentés,
 * pas des diagnostics ni des prescriptions.
 */

import type { PlanteMedicinale } from './plantes-medicinales';

export const PLANTES_COMPLEMENTAIRES: PlanteMedicinale[] = [
  {
    id: 'acacia-nilotica',
    nomVulgaire: 'Gonakié – Gommier rouge',
    nomScientifique: 'Acacia nilotica',
    famille: 'Fabaceae',
    nomsAfricains: {
      wolof: 'nebnep, nepnep',
      bambara: 'barana, bagana',
      peuhl: 'gaddé, gaudi',
    },
    categorieTherapeutique: 'Antidiarrhéique',
    couleur: '#8A6A3A',
    icone: '🌳',
    historique:
      'Le Gonakié forme des peuplements dans la vallée du fleuve Sénégal. Le document décrit l’emploi traditionnel de ses feuilles et de son écorce pour les maux de dents, ainsi que celui de ses fruits riches en tanins.',
    descriptionPlante:
      'Arbre de 10 à 12 mètres, à cime arrondie, feuilles composées et petites fleurs jaunes en boules. Ses fruits sont des gousses grisâtres contenant les graines.',
    actionCurative:
      'Les fruits sont décrits comme très riches en tanins galliques. Le document les associe surtout aux usages traditionnels liés aux diarrhées et à la dysenterie, tout en rapportant des recherches sur l’action des tanins dans les eaux dormantes.',
    emplois: [
      {
        indication: 'Diarrhée – usage traditionnel documenté',
        preparation:
          'Le texte décrit une poudre de fruit sans graines. Ne pas reproduire un dosage sans avis d’un professionnel de santé, notamment chez l’enfant ou en cas de diarrhée persistante.',
      },
      {
        indication: 'Maux de dents – usage externe traditionnel',
        preparation:
          'Le document rapporte l’emploi des feuilles et de l’écorce. Une douleur dentaire nécessite un avis dentaire ; ne pas appliquer de préparation irritante dans la bouche.',
      },
    ],
    partiesUtilisees: ['fruits', 'feuilles', 'écorce'],
    precautions:
      'Les tanins concentrés peuvent irriter et interagir avec l’absorption de médicaments. La dysenterie, la fièvre, le sang dans les selles ou la déshydratation sont des situations médicales urgentes.',
    source: 'Pousset, J.-L., 1989, p. 13–15',
  },
  {
    id: 'borreria-verticillata',
    nomVulgaire: 'Borrérie à fleurs verticillées',
    nomScientifique: 'Borreria verticillata',
    famille: 'Rubiaceae',
    nomsAfricains: {},
    categorieTherapeutique: 'Antibactérien – Affections cutanées',
    couleur: '#6E9A62',
    icone: '🌿',
    historique:
      'Le document cite cette petite plante dans les usages traditionnels des affections de la peau et mentionne l’étude d’un alcaloïde, la borreverine, isolé de Borreria verticillata.',
    descriptionPlante:
      'Herbe ou sous-arbrisseau à tiges étalées, feuilles opposées et petits groupes de fleurs disposés autour des nœuds. Elle pousse dans les zones ouvertes et les terrains remués.',
    actionCurative:
      'Les sources citées rapportent une activité antibactérienne d’extraits et de la borreverine en laboratoire. Cela ne permet pas de conclure à une efficacité clinique ni de remplacer un traitement d’infection.',
    emplois: [
      {
        indication: 'Affections cutanées – usage traditionnel externe',
        preparation:
          'Le document rapporte un emploi de la plante dans les soins de peau. Toute préparation maison doit être évitée sur une plaie profonde, une brûlure étendue ou une lésion infectée.',
      },
    ],
    partiesUtilisees: ['plante entière', 'feuilles'],
    precautions:
      'Ne pas appliquer sur les yeux ni sur une plaie importante. Tester l’identification botanique et interrompre en cas de réaction cutanée.',
    source: 'Pousset, J.-L., 1989, p. 30–31 et bibliographie',
  },
  {
    id: 'centella-asiatica',
    nomVulgaire: 'Centelle asiatique – Herbe à la mémoire',
    nomScientifique: 'Centella asiatica',
    famille: 'Apiaceae',
    nomsAfricains: {},
    categorieTherapeutique: 'Cicatrisant traditionnel',
    couleur: '#5B9B71',
    icone: '🌿',
    historique:
      'La Centella asiatica est une plante rampante des lieux humides, connue dans plusieurs pharmacopées asiatiques et africaines. Le document la présente dans le contexte des plantes médicinales introduites et de leurs usages traditionnels.',
    descriptionPlante:
      'Petite herbe vivace à tiges rampantes, feuilles arrondies portées par de longs pétioles et petites fleurs rosées ou blanchâtres regroupées près du sol.',
    actionCurative:
      'Les préparations de Centella sont traditionnellement associées aux soins de la peau et à la cicatrisation. Les effets rapportés dans les ouvrages ne remplacent pas l’évaluation d’une plaie ou d’une infection.',
    emplois: [
      {
        indication: 'Soin cutané traditionnel',
        preparation:
          'Le document mentionne l’usage de la plante dans les pharmacopées. Employer uniquement un produit correctement identifié et destiné à cet usage ; ne pas déposer de plante fraîche sur une plaie ouverte.',
      },
    ],
    partiesUtilisees: ['parties aériennes', 'feuilles'],
    precautions:
      'Éviter l’automédication prolongée et les préparations non stériles sur une plaie. Demander conseil en cas de grossesse, de maladie du foie ou de traitement régulier.',
    source: 'Pousset, J.-L., 1989, monographie Centella asiatica',
  },
  {
    id: 'cucurbita-pepo',
    nomVulgaire: 'Courge – Citrouille',
    nomScientifique: 'Cucurbita pepo',
    famille: 'Cucurbitaceae',
    nomsAfricains: {},
    categorieTherapeutique: 'Anthelmintique traditionnel',
    couleur: '#C28B3D',
    icone: '🌿',
    historique:
      'Les graines de courge sont employées comme aliment et comme remède traditionnel dans différentes régions. Le document rapproche Cucurbita pepo et Cucurbita maxima dans une fiche consacrée aux graines.',
    descriptionPlante:
      'Plante annuelle coureuse ou grimpante, aux grandes feuilles rudes, fleurs jaunes et fruits très variables selon les cultivars. Les graines aplaties sont entourées d’une coque claire.',
    actionCurative:
      'La fiche décrit les graines comme support d’un usage traditionnel contre certains vers intestinaux et rappelle leur intérêt alimentaire. Les observations pharmacologiques ne constituent pas une preuve de traitement chez l’être humain.',
    emplois: [
      {
        indication: 'Vers intestinaux – usage traditionnel',
        preparation:
          'Le document décrit l’emploi de graines préparées. Une suspicion de parasitose doit être confirmée par un professionnel et traitée avec un produit adapté.',
      },
    ],
    partiesUtilisees: ['graines', 'pulpe du fruit'],
    precautions:
      'Les graines alimentaires ne remplacent pas un traitement antiparasitaire. Consulter en cas de douleurs fortes, vomissements, amaigrissement ou présence de sang dans les selles.',
    source: 'Pousset, J.-L., 1989, fiche Cucurbita pepo / Cucurbita maxima',
  },
  {
    id: 'detarium-senegalense',
    nomVulgaire: 'Ditakh – Détar',
    nomScientifique: 'Detarium senegalense',
    famille: 'Fabaceae',
    nomsAfricains: {
      wolof: 'ditakh',
      bambara: 'taba',
    },
    categorieTherapeutique: 'Alimentaire – Tradition digestive',
    couleur: '#5C8A3A',
    icone: '🌳',
    historique:
      'Le Ditakh est un arbre ouest-africain dont le fruit est très apprécié. Le document le cite dans la pharmacopée et les usages alimentaires locaux, en lien avec les préparations de la pulpe.',
    descriptionPlante:
      'Arbre à cime large des forêts et galeries, aux feuilles composées et aux fruits ronds à coque dure contenant une pulpe verte ou brunâtre, acidulée et parfumée.',
    actionCurative:
      'La pulpe est surtout documentée comme aliment et boisson traditionnelle. Les usages médicinaux des autres parties demandent une identification et un encadrement local précis.',
    emplois: [
      {
        indication: 'Boisson et alimentation traditionnelle',
        preparation:
          'La pulpe peut être transformée en boisson ou incorporée à des préparations alimentaires. Laver le fruit, retirer la coque et conserver au frais.',
      },
    ],
    partiesUtilisees: ['fruits', 'pulpe'],
    precautions:
      'Respecter l’identification de l’espèce et l’hygiène alimentaire. Les usages thérapeutiques de l’écorce ou des racines ne doivent pas être improvisés.',
    source: 'Pousset, J.-L., 1989, monographie Detarium senegalense',
  },
  {
    id: 'euphorbia-hirta',
    nomVulgaire: 'Malnommée – Herbe à l’asthme',
    nomScientifique: 'Euphorbia hirta',
    famille: 'Euphorbiaceae',
    nomsAfricains: {
      wolof: 'mbal',
      bambara: 'dada dablé',
      hausa: 'nonan kurchiya',
    },
    categorieTherapeutique: 'Antiasthmatique – Antidiarrhéique',
    couleur: '#7E9A55',
    icone: '🌿',
    historique:
      'Cette herbe annuelle est connue sous plusieurs noms populaires liés à ses usages traditionnels respiratoires. Le document mentionne également des emplois contre les diarrhées et des recherches pharmacologiques.',
    descriptionPlante:
      'Petite herbe velue, souvent couchée ou dressée, à feuilles opposées et à latex blanc. Les inflorescences se trouvent dans les aisselles des feuilles.',
    actionCurative:
      'Les usages traditionnels décrits concernent les troubles respiratoires et digestifs. Le latex et les extraits d’Euphorbia peuvent être irritants ; des résultats de laboratoire ne prouvent pas une efficacité clinique.',
    emplois: [
      {
        indication: 'Toux ou gêne respiratoire – usage traditionnel documenté',
        preparation:
          'Le document cite des préparations de la plante. Ne pas utiliser pour une crise d’asthme, une détresse respiratoire ou chez un enfant sans avis médical.',
      },
      {
        indication: 'Diarrhée – usage traditionnel documenté',
        preparation:
          'Une diarrhée persistante nécessite réhydratation et consultation. Ne pas ingérer de latex frais ni de préparation non identifiée.',
      },
    ],
    partiesUtilisees: ['parties aériennes', 'latex'],
    precautions:
      'Le latex peut brûler les yeux et irriter la peau et les muqueuses. Rincer immédiatement en cas de contact et tenir hors de portée des enfants.',
    source: 'Pousset, J.-L., 1989, p. 78–83',
  },
  {
    id: 'holarrhena-floribunda',
    nomVulgaire: 'Holarrhena',
    nomScientifique: 'Holarrhena floribunda',
    famille: 'Apocynaceae',
    nomsAfricains: {
      wolof: 'séulu',
      bambara: 'fufu, nofo, kedan',
      peuhl: 'indama, taraki',
    },
    categorieTherapeutique: 'Antiamibien – Antidiarrhéique',
    couleur: '#758B55',
    icone: '🌳',
    historique:
      'L’écorce de cet arbre est citée dans les pharmacopées ouest-africaines pour les diarrhées et les dysenteries. Le document relie ces usages à des recherches sur les alcaloïdes de la plante.',
    descriptionPlante:
      'Arbre ou arbuste à écorce claire, feuilles opposées et fleurs blanches parfumées. Les fruits sont des follicules allongés contenant de nombreuses graines.',
    actionCurative:
      'La fiche rapporte une activité traditionnelle contre les diarrhées d’origine infectieuse et une activité étudiée sur des parasites intestinaux. Le diagnostic d’une dysenterie ne peut pas être posé par une tisane.',
    emplois: [
      {
        indication: 'Diarrhée ou dysenterie – usage traditionnel documenté',
        preparation:
          'Le texte décrit l’écorce en décoction. Toute diarrhée avec fièvre, sang, déshydratation ou durée prolongée doit être prise en charge médicalement.',
      },
    ],
    partiesUtilisees: ['écorce', 'racines'],
    precautions:
      'Les alcaloïdes peuvent être actifs à faible dose et la composition varie selon la partie utilisée. Ne pas associer à un traitement sans conseil professionnel.',
    source: 'Pousset, J.-L., 1989, p. 89–92',
  },
  {
    id: 'kigelia-africana',
    nomVulgaire: 'Saucissonnier',
    nomScientifique: 'Kigelia africana',
    famille: 'Bignoniaceae',
    nomsAfricains: {
      wolof: 'dabolé',
      bambara: 'sidiamba',
    },
    categorieTherapeutique: 'Usage cutané traditionnel',
    couleur: '#A86D4A',
    icone: '🌳',
    historique:
      'Le Saucissonnier est reconnaissable à ses longs fruits pendants. Le document rapporte des usages traditionnels de ses fruits et de ses fleurs, notamment dans les soins de la peau.',
    descriptionPlante:
      'Arbre des savanes et des zones humides, à grandes fleurs rouge sombre et fruits cylindriques suspendus par de longs pédoncules, parfois lourds de plusieurs kilogrammes.',
    actionCurative:
      'Les usages traditionnels cités concernent principalement des applications externes et certaines pratiques liées à la poitrine. Les allégations de grossissement des seins ne sont pas une indication médicale démontrée.',
    emplois: [
      {
        indication: 'Soin cutané – usage externe traditionnel',
        preparation:
          'Le document décrit l’emploi externe de préparations de fruit. Ne pas appliquer sur une plaie, sur les muqueuses ou près des yeux sans formulation contrôlée.',
      },
    ],
    partiesUtilisees: ['fruits', 'fleurs', 'écorce'],
    precautions:
      'Les fruits frais peuvent être irritants ou toxiques s’ils sont ingérés. Ne pas utiliser pour modifier le volume d’une partie du corps et demander un avis médical pour toute masse ou douleur.',
    source: 'Pousset, J.-L., 1989, p. 97–99',
  },
  {
    id: 'luffa-aegyptiaca',
    nomVulgaire: 'Luffa – Éponge végétale',
    nomScientifique: 'Luffa aegyptiaca',
    famille: 'Cucurbitaceae',
    nomsAfricains: {
      wolof: 'nâpé',
      bambara: 'nâbésé, kofu',
    },
    categorieTherapeutique: 'Hygiène – Usage traditionnel',
    couleur: '#8B9C52',
    icone: '🌿',
    historique:
      'Le Luffa est cultivé comme légume lorsqu’il est jeune et comme éponge lorsqu’il est mûr. Le document décrit ses usages domestiques et certains emplois traditionnels de la plante.',
    descriptionPlante:
      'Liane annuelle à vrilles, grandes feuilles palmées, fleurs jaunes et fruits allongés. À maturité, la pulpe sèche laisse un réseau fibreux utilisé comme éponge.',
    actionCurative:
      'L’intérêt principal documenté est mécanique et hygiénique : la fibre sèche sert au lavage et au gommage. La plante ne doit pas être confondue avec un traitement de maladie de peau.',
    emplois: [
      {
        indication: 'Hygiène et exfoliation – usage externe',
        preparation:
          'Employer la fibre propre et bien séchée, sans frotter une peau lésée. Le jeune fruit peut être cuisiné comme légume après préparation alimentaire adaptée.',
      },
    ],
    partiesUtilisees: ['fruit jeune', 'fibre du fruit mûr'],
    precautions:
      'Laver et sécher complètement l’éponge, la remplacer régulièrement et ne pas la partager sur une peau infectée. Stopper en cas d’irritation.',
    source: 'Pousset, J.-L., 1989, p. 103–105',
  },
  {
    id: 'mangifera-indica',
    nomVulgaire: 'Manguier',
    nomScientifique: 'Mangifera indica',
    famille: 'Anacardiaceae',
    nomsAfricains: {
      wolof: 'mango',
      bambara: 'mangoro',
    },
    categorieTherapeutique: 'Digestif – Alimentaire',
    couleur: '#A27B36',
    icone: '🌳',
    historique:
      'Le manguier est largement cultivé en Afrique de l’Ouest pour ses fruits. Le document mentionne les usages alimentaires de la mangue et les emplois traditionnels de l’écorce et des feuilles.',
    descriptionPlante:
      'Grand arbre à feuillage persistant, feuilles longues et coriaces, panicules de petites fleurs et fruits charnus de formes et de couleurs variées.',
    actionCurative:
      'Les fruits apportent une alimentation énergétique et vitaminée. Le document rapporte aussi des usages traditionnels digestifs et astringents des feuilles ou de l’écorce, sans en faire des traitements validés.',
    emplois: [
      {
        indication: 'Alimentation et boisson',
        preparation:
          'Consommer la pulpe mûre propre ou l’intégrer à une boisson. Conserver au frais et éviter les fruits abîmés ou fermentés.',
      },
      {
        indication: 'Troubles digestifs – usage traditionnel documenté',
        preparation:
          'Les feuilles et l’écorce sont mentionnées dans les traditions locales. Leur usage médicinal doit être encadré par un professionnel connaissant la pharmacopée locale.',
      },
    ],
    partiesUtilisees: ['fruits', 'feuilles', 'écorce'],
    precautions:
      'La sève et la peau du fruit peuvent provoquer des réactions chez les personnes sensibles aux Anacardiaceae. Ne pas donner de préparation concentrée aux enfants.',
    source: 'Pousset, J.-L., 1989, monographie Mangifera indica',
  },
  {
    id: 'mitracarpus-scaber',
    nomVulgaire: 'Mitracarpus – Herbe aux dermatoses',
    nomScientifique: 'Mitracarpus scaber',
    famille: 'Rubiaceae',
    nomsAfricains: {},
    categorieTherapeutique: 'Antifongique externe',
    couleur: '#6E9461',
    icone: '🌿',
    historique:
      'Cette herbe est étudiée dans le document pour ses usages traditionnels des dermatoses et pour l’activité antifongique de certains extraits.',
    descriptionPlante:
      'Petite herbe annuelle à tiges ramifiées, feuilles opposées et fleurs blanches regroupées à l’aisselle des feuilles. Elle se rencontre dans les savanes et les terrains ouverts.',
    actionCurative:
      'Des extraits sont rapportés comme actifs sur certains champignons en laboratoire. Une lésion cutanée peut avoir plusieurs causes et nécessite une identification avant tout soin.',
    emplois: [
      {
        indication: 'Dermatoses – usage externe traditionnel',
        preparation:
          'Le document mentionne l’emploi externe de la plante. Ne pas appliquer sur une plaie ou une infection étendue et ne pas partager une préparation entre personnes.',
      },
    ],
    partiesUtilisees: ['parties aériennes', 'feuilles'],
    precautions:
      'Éviter les yeux et les muqueuses. Consulter si la lésion s’étend, suinte, démange fortement ou ne s’améliore pas rapidement.',
    source: 'Pousset, J.-L., 1989, monographie Mitracarpus scaber',
  },
  {
    id: 'moghania-faginea',
    nomVulgaire: 'Moghania',
    nomScientifique: 'Moghania faginea',
    famille: 'Fabaceae',
    nomsAfricains: {},
    categorieTherapeutique: 'Antiseptique traditionnel',
    couleur: '#7D9250',
    icone: '🌿',
    historique:
      'Le document cite Moghania faginea parmi les plantes utilisées localement dans les soins de peau et dans certaines préparations antiseptiques traditionnelles.',
    descriptionPlante:
      'Arbuste ou sous-arbrisseau des savanes, à feuilles composées et fleurs papilionacées. Il forme des touffes dans les zones sèches ou dégradées.',
    actionCurative:
      'Les usages externes rapportés sont liés à l’hygiène des lésions cutanées. Les résultats d’extraits ne suffisent pas à garantir une action antiseptique sur une plaie.',
    emplois: [
      {
        indication: 'Soin cutané externe traditionnel',
        preparation:
          'Le document rapporte des applications locales. Privilégier un soin propre et validé pour toute plaie ; ne pas utiliser de préparation végétale non stérile sur une brûlure.',
      },
    ],
    partiesUtilisees: ['feuilles', 'racines'],
    precautions:
      'Ne pas ingérer sans avis spécialisé. Nettoyer une plaie avec une méthode sûre et consulter en cas de douleur, rougeur progressive ou fièvre.',
    source: 'Pousset, J.-L., 1989, monographie Moghania faginea',
  },
  {
    id: 'nauclea-latifolia',
    nomVulgaire: 'Pêcher africain',
    nomScientifique: 'Nauclea latifolia',
    famille: 'Rubiaceae',
    nomsAfricains: {
      wolof: 'nâdok, nâdop',
      bambara: 'bari',
      peuhl: 'bauré, bakuré',
    },
    categorieTherapeutique: 'Fébrifuge traditionnel',
    couleur: '#718A52',
    icone: '🌳',
    historique:
      'Le Pêcher africain est un arbuste ou petit arbre très présent dans les pharmacopées de savane. Le document rapporte l’usage des racines dans les états fébriles.',
    descriptionPlante:
      'Arbuste ou arbre de petite taille, à feuilles opposées, capitules ronds de fleurs blanches et fruits globuleux. Il rejette facilement après la coupe.',
    actionCurative:
      'Les racines contiennent des alcaloïdes et d’autres composés étudiés pour des activités fébrifuges et antipaludiques en laboratoire. Une fièvre en zone de paludisme doit être testée et prise en charge sans délai.',
    emplois: [
      {
        indication: 'Fièvre – usage traditionnel documenté',
        preparation:
          'Le document décrit des décoctions de racines. Ne pas retarder un test de paludisme ni remplacer un traitement prescrit par une décoction.',
      },
    ],
    partiesUtilisees: ['racines', 'écorce'],
    precautions:
      'L’arrachage des racines fragilise les peuplements. Ne pas utiliser chez l’enfant, la femme enceinte ou une personne sous traitement sans avis professionnel.',
    source: 'Pousset, J.-L., 1989, p. 112–115',
  },
  {
    id: 'piliostigma-reticulatum',
    nomVulgaire: 'Piliostigma – Parasolier',
    nomScientifique: 'Piliostigma reticulatum',
    famille: 'Fabaceae',
    nomsAfricains: {
      wolof: 'nguiguis',
      bambara: 'n’taba',
    },
    categorieTherapeutique: 'Antitussif – Usage externe',
    couleur: '#8B7441',
    icone: '🌳',
    historique:
      'Le Parasolier est un arbuste de savane conservé dans les champs. Le document décrit des usages traditionnels de ses feuilles, de son écorce et de ses racines.',
    descriptionPlante:
      'Arbuste ou petit arbre à feuilles bilobées rappelant un cœur, fleurs blanchâtres et longues gousses. Il supporte la sécheresse et rejette après la taille.',
    actionCurative:
      'Les préparations traditionnelles sont associées aux toux, aux douleurs et à certains soins de peau. Les indications varient selon les régions et ne remplacent pas un diagnostic.',
    emplois: [
      {
        indication: 'Toux – usage traditionnel documenté',
        preparation:
          'Le document rapporte des décoctions de feuilles ou d’écorce. Demander un avis si la toux dure, s’accompagne de fièvre, de souffle court ou de sang.',
      },
      {
        indication: 'Soin cutané – usage externe',
        preparation:
          'Les applications locales mentionnées doivent rester propres et limitées à une petite zone intacte ; ne pas appliquer sur une plaie profonde.',
      },
    ],
    partiesUtilisees: ['feuilles', 'écorce', 'racines'],
    precautions:
      'Ne pas administrer une décoction concentrée à un enfant ou à une femme enceinte sans conseil médical. Toute gêne respiratoire aiguë est une urgence.',
    source: 'Pousset, J.-L., 1989, monographie Piliostigma reticulatum',
  },
  {
    id: 'sclerocarya-birrea',
    nomVulgaire: 'Marula',
    nomScientifique: 'Sclerocarya birrea',
    famille: 'Anacardiaceae',
    nomsAfricains: {
      wolof: 'néw',
      peuhl: 'weri',
    },
    categorieTherapeutique: 'Digestif – Alimentaire',
    couleur: '#A27C43',
    icone: '🌳',
    historique:
      'Le Marula est un arbre fruitier et culturel des savanes. Le document rapporte des usages alimentaires du fruit et des usages traditionnels de l’écorce et des feuilles.',
    descriptionPlante:
      'Arbre à tronc gris, feuilles composées et fruits jaunes à maturité, à pulpe acidulée entourant un noyau dur. Il pousse dans les savanes soudaniennes.',
    actionCurative:
      'Le fruit est décrit comme aliment et source de boisson. Les usages des écorces et feuilles sont documentés par la tradition, mais leur composition varie selon la préparation et la région.',
    emplois: [
      {
        indication: 'Fruit et boisson traditionnels',
        preparation:
          'Consommer le fruit mûr propre ou sa pulpe transformée. Écarter les fruits moisis et conserver les préparations au frais.',
      },
    ],
    partiesUtilisees: ['fruits', 'écorce', 'feuilles'],
    precautions:
      'Les boissons fermentées peuvent contenir de l’alcool. Ne pas utiliser l’écorce ou les racines en automédication, notamment pendant la grossesse.',
    source: 'Pousset, J.-L., 1989, monographie Sclerocarya birrea',
  },
  {
    id: 'sterculia-setigera',
    nomVulgaire: 'Mbep – Gommier du Sénégal',
    nomScientifique: 'Sterculia setigera',
    famille: 'Malvaceae',
    nomsAfricains: {
      wolof: 'mbep',
      bambara: 'kôgurani, kogosito',
      peuhl: 'bobori',
      hausa: 'kukuko',
    },
    categorieTherapeutique: 'Coupe-faim – Laxatif',
    couleur: '#8C7655',
    icone: '🌳',
    historique:
      'La gomme du Mbep est recueillie après incision de l’écorce et ajoutée au couscous de mil. Le document décrit son gonflement dans l’eau et son emploi traditionnel pour faciliter le transit.',
    descriptionPlante:
      'Arbre de 10 à 15 mètres, à tronc cylindrique, feuilles lobées présentes surtout pendant la saison des pluies et follicules veloutés.',
    actionCurative:
      'La gomme forme un gel volumineux au contact de l’eau. Elle est décrite comme laxatif mécanique et comme ingrédient donnant une sensation de satiété ; elle peut aussi réduire la fermentation intestinale.',
    emplois: [
      {
        indication: 'Transit ralenti – usage traditionnel',
        preparation:
          'La gomme doit toujours être prise avec suffisamment d’eau. Le texte décrit une poudre hydratée, mais le dosage et la qualité du produit doivent être validés par un professionnel.',
      },
    ],
    partiesUtilisees: ['gomme'],
    precautions:
      'Ne pas utiliser en cas de douleur abdominale inexpliquée, d’occlusion possible ou de difficulté à avaler. Boire suffisamment et espacer la gomme des médicaments.',
    source: 'Pousset, J.-L., 1989, p. 124–127',
  },
  {
    id: 'vitex-doniana',
    nomVulgaire: 'Prune noire',
    nomScientifique: 'Vitex doniana',
    famille: 'Lamiaceae',
    nomsAfricains: {
      wolof: 'lêg, lung',
      bambara: 'koro, koroba, korofin',
    },
    categorieTherapeutique: 'Antiasthénique traditionnel',
    couleur: '#6E8750',
    icone: '🌳',
    historique:
      'Le document conseille traditionnellement le Vitex doniana dans les états de fatigue et certaines affections respiratoires. Ses fruits noirs sont également consommés dans plusieurs régions.',
    descriptionPlante:
      'Arbre de 10 à 15 mètres, feuilles composées de cinq folioles, fleurs blanches parfois marquées de violet et drupes vert foncé devenant noires à maturité.',
    actionCurative:
      'Les feuilles et l’écorce sont décrites en décoction sucrée dans les traditions locales. Le document précise que les indications scientifiques sur les feuilles restent limitées.',
    emplois: [
      {
        indication: 'Fatigue – usage traditionnel documenté',
        preparation:
          'Le document mentionne une décoction de feuilles. Une fatigue persistante doit faire rechercher une cause médicale plutôt que d’être masquée par une préparation.',
      },
      {
        indication: 'Fruit alimentaire',
        preparation:
          'Les fruits mûrs peuvent être consommés selon les usages locaux après lavage. Écarter tout fruit altéré.',
      },
    ],
    partiesUtilisees: ['feuilles', 'écorce', 'fruits'],
    precautions:
      'Ne pas confondre fatigue et maladie aiguë. Demander un avis avant toute prise régulière, en particulier en cas de grossesse ou de traitement chronique.',
    source: 'Pousset, J.-L., 1989, p. 134–136',
  },
];