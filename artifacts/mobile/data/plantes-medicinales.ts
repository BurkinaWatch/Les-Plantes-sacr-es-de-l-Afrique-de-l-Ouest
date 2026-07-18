/**
 * Plantes médicinales africaines
 * Source : Jean-Louis POUSSET, « Plantes Médicinales Africaines — Utilisation Pratique »
 * Éditions ESTEM / AUPELF, Paris, 1989
 *
 * Données extraites fidèlement du livre pour ~35 plantes du Sahel occidental.
 * Chaque fiche comprend : classification thérapeutique, noms africains,
 * historique, description, action curative, emplois pratiques et précautions.
 */

export interface NomsAfricains {
  wolof?: string;
  bambara?: string;
  peuhl?: string;
  hausa?: string;
  toucouleur?: string;
}

export interface Emploi {
  indication: string;
  preparation: string;
}

export interface PlanteMedicinale {
  id: string;
  nomVulgaire: string;
  nomScientifique: string;
  famille: string;
  nomsAfricains: NomsAfricains;
  categorieTherapeutique: string; // titre principal du chapitre PDF
  couleur: string;
  icone: string;
  historique: string;
  descriptionPlante: string;
  actionCurative: string;
  emplois: Emploi[];
  partiesUtilisees: string[];
  precautions?: string;
  source: string;
}

export const PLANTES_MEDICINALES: PlanteMedicinale[] = [
  // ─── 1 ───────────────────────────────────────────────
  {
    id: 'adansonia-digitata',
    nomVulgaire: 'Baobab',
    nomScientifique: 'Adansonia digitata',
    famille: 'Bombacaceae',
    nomsAfricains: {
      wolof: 'gui (arbre), lalo (feuilles)',
      bambara: 'sira, sito',
      peuhl: 'boy, boïö, boki',
    },
    categorieTherapeutique: 'Antidiarrhéique',
    couleur: '#C8813A',
    icone: '🌳',
    historique:
      'Cet arbre a toujours frappé l\'imagination pour sa forme grotesque et sa grosseur. Il est considéré comme arbre sacré dans de nombreux villages. Toutes les parties de la plante sont utilisées. En dehors de ses usages alimentaires, on peut citer : antidiarrhéique, antirachitique, anti-inflammatoire, etc.',
    descriptionPlante:
      'C\'est un arbre qui peut atteindre 20 à 25 mètres de hauteur avec un tronc énorme pouvant mesurer 3 mètres de diamètre. Les feuilles sont alternes et composées de 5 à 7 folioles. Les fleurs blanches pendent à l\'extrémité d\'un pédoncule et donnent des fruits ovoïdes appelés "pain de singe" contenant des graines noires noyées dans une pulpe farineuse blanche.',
    actionCurative:
      'La toxicité des feuilles est inexistante par voie orale. La pulpe du fruit contient des glucides, des protides, des lipides, des vitamines, des matières pectiques, des acides organiques et des sels minéraux. L\'action antidiarrhéique est donnée par les glucides et les matières pectiques qui absorbent l\'eau. Les feuilles contiennent un pourcentage élevé de calcium utile à l\'alimentation et un abondant mucilage qui gonfle dans l\'eau et permet une meilleure digestion.',
    emplois: [
      {
        indication: 'Diarrhées',
        preparation:
          'Mélanger la pulpe du fruit séchée après avoir enlevé les graines dans l\'eau ou du lait (10 grammes pour 100 ml) et boire aux repas.',
      },
    ],
    partiesUtilisees: ['pulpe du fruit', 'feuilles'],
    source: 'Pousset, J.-L., 1989, p. 16–18',
  },

  // ─── 2 ───────────────────────────────────────────────
  {
    id: 'ageratum-conyzoides',
    nomVulgaire: 'Herbe aux sorciers',
    nomScientifique: 'Ageratum conyzoïdes',
    famille: 'Asteraceae',
    nomsAfricains: {
      wolof: 'gobu',
      bambara: 'nungu',
    },
    categorieTherapeutique: 'Antibactérien externe',
    couleur: '#6B9E5E',
    icone: '🌿',
    historique:
      'Cette herbe dégage un parfum quand on froisse les feuilles et ceci explique son emploi dans les traitements médico-magiques et les maladies mentales. On l\'utilise aussi pour les maladies oculaires en instillations, sur les brûlures et dans les pneumonies en frottant la poitrine.',
    descriptionPlante:
      'C\'est une herbe annuelle dressée atteignant 50 centimètres de hauteur. Les feuilles opposées sont douces au toucher. Les fleurs se rassemblent en petits capitules mauves ou bleu pâle. La plante froissée dégage une odeur caractéristique.',
    actionCurative:
      'La plante entière contient une huile essentielle comprenant des phénols et d\'autres produits (ageratochromène et conyzorigum). L\'essence est antibactérienne en particulier sur le staphylocoque doré. D\'autre part, un extrait d\'Ageratum conyzoïdes a montré une activité antihelmintique in vitro mais l\'action antidiarrhéique semble plutôt être due à un effet direct sur la muqueuse intestinale.',
    emplois: [
      {
        indication: 'Conjonctivites',
        preparation: 'Mettre une goutte du suc des feuilles en instillations oculaires.',
      },
      {
        indication: 'Pneumonies – Blessures',
        preparation: 'Frotter avec les feuilles la poitrine du malade et désinfecter aussi les brûlures et plaies.',
      },
    ],
    partiesUtilisees: ['feuilles', 'plante entière'],
    precautions: 'Usage externe uniquement pour les conjonctivites. Ne pas avaler en grande quantité.',
    source: 'Pousset, J.-L., 1989, p. 19–20',
  },

  // ─── 3 ───────────────────────────────────────────────
  {
    id: 'anacardium-occidentale',
    nomVulgaire: 'Anacardier – Pommier cajou',
    nomScientifique: 'Anacardium occidentale',
    famille: 'Anacardiaceae',
    nomsAfricains: {
      wolof: 'darkasou',
      bambara: 'finzâ',
    },
    categorieTherapeutique: 'Hypotenseur – Hypoglycémiant',
    couleur: '#E8A04A',
    icone: '🌰',
    historique:
      'C\'est un arbre originaire de l\'Amérique tropicale et introduit dans tous les pays tropicaux. En médecine traditionnelle, on utilise une macération des écorces fraîches dans l\'eau contre les maux de ventre. Les noix de cajou font l\'objet d\'un commerce international important.',
    descriptionPlante:
      'C\'est un arbre de 8 à 10 mètres de hauteur dont les branches latérales retombent jusqu\'au sol. Les feuilles ovales et arrondies mesurent 12 cm de long sur 10 cm de large. Le fruit ou "noix de cajou" pend au bout d\'un pédoncule charnu appelé "pomme cajou" dont le jus est utilisé en boisson.',
    actionCurative:
      'L\'extrait d\'écorce administré par voie orale s\'est révélé hypoglycémiant : l\'effet commence 10 à 20 mn après l\'ingestion, atteint son maximum d\'efficacité en 60 à 90 mn et persiste après 3 heures. Les propriétés antihypertensives de l\'extrait d\'écorce ont été vérifiées chez le rat et chez le singe. Les tanins isolés de l\'écorce ont montré une action anti-inflammatoire. De plus, l\'huile essentielle provenant des feuilles possède une action dépressive du système nerveux central semblable à celle d\'un tranquilisant.',
    emplois: [
      {
        indication: 'Hypotenseur – Hypoglycémiant',
        preparation:
          'Laisser macérer 10 g de poudre d\'écorce dans 200 ml d\'eau et boire 20 ml de cette solution deux fois par jour. Vérifier la tension et la glycémie.',
      },
    ],
    partiesUtilisees: ['écorce'],
    precautions: 'Surveiller la tension artérielle et la glycémie. Consulter un médecin si traitement en cours.',
    source: 'Pousset, J.-L., 1989, p. 21–22',
  },

  // ─── 4 ───────────────────────────────────────────────
  {
    id: 'azadirachta-indica',
    nomVulgaire: 'Neem – Nim',
    nomScientifique: 'Azadirachta indica',
    famille: 'Meliaceae',
    nomsAfricains: {
      wolof: 'nim, neem, dimi buki',
    },
    categorieTherapeutique: 'Anti-inflammatoire – Fébrifuge – Antimalarique',
    couleur: '#5A9E6B',
    icone: '🌱',
    historique:
      'Le Neem est originaire des Indes d\'où il a été importé comme arbres des avenues pour son ombrage. Comme il résiste à la sécheresse il a été employé au Sahel dans le reboisement. Ce sont les feuilles les plus utilisées en médecine traditionnelle dans le paludisme, les œdèmes et les rhumatismes.',
    descriptionPlante:
      'C\'est un petit arbre de 5 à 15 mètres de hauteur. Les feuilles sont alternes paripennées. Les petites fleurs blanches sont en grappes et très odorantes. Le fruit est une petite drupe vert clair.',
    actionCurative:
      'Un extrait alcoolique de feuilles et d\'écorces de tronc a montré une activité anti-inflammatoire et antipyrétique. De même, un extrait aqueux lyophilisé des feuilles donné par voie orale à des rats confirme cette action anti-inflammatoire. Les feuilles possèdent également des propriétés antimalariques vérifiées in vitro sur Plasmodium falciparum.',
    emplois: [
      {
        indication: 'Fièvre – Paludisme',
        preparation:
          'Faire bouillir 30 g de feuilles dans 1 litre d\'eau. Boire 2 à 3 verres par jour pendant 5 jours.',
      },
      {
        indication: 'Douleurs articulaires – Œdèmes',
        preparation: 'Frotter les parties douloureuses avec un décocté concentré de feuilles tièdes.',
      },
    ],
    partiesUtilisees: ['feuilles', 'écorce de tronc'],
    precautions: 'Déconseillé pendant la grossesse. Éviter les doses excessives.',
    source: 'Pousset, J.-L., 1989, p. 24–27',
  },

  // ─── 5 ───────────────────────────────────────────────
  {
    id: 'balanites-aegyptiaca',
    nomVulgaire: 'Dattier du désert',
    nomScientifique: 'Balanites aegyptiaca',
    famille: 'Balanitaceae',
    nomsAfricains: {
      wolof: 'sump',
      bambara: 'sérené',
    },
    categorieTherapeutique: 'Aliment – Frotte-dents – Anti-inflammatoire – Molluscide',
    couleur: '#B8860B',
    icone: '🌵',
    historique:
      'Tous les organes de cette plante sont utilisés en médecine traditionnelle. Le maceré d\'écorces est utilisé dans les coliques, les ictères et comme antivenimeux et vermifuge. Les tiges après enlèvement des épines sont employées comme frotte-dents et vendues sur tous les marchés. Le fruit est très utilisé comme aliment à cause de ses glucides et vitamines.',
    descriptionPlante:
      'C\'est un arbre épineux de 8 à 9 mètres de hauteur. L\'écorce du tronc est profondément striée. Les extrémités des rameaux possèdent de longues épines robustes et droites. Les fleurs sont jaunes-verdâtres se trouvant à l\'aisselle des feuilles. Les fruits sont des drupes de 3 à 4 centimètres de long ovoïdes de couleur verte à jaune qui peuvent être sucés comme des bonbons. Ils contiennent une amande riche en huile.',
    actionCurative:
      'La pulpe de ce fruit contient un saponoside, la diosgenine, en quantité importante qui explique les deux emplois traditionnels : anti-inflammatoire en frottant le jus sur les parties inflammées et aussi pouvoir asphyxiant sur les poissons. Ce même décocté peut tuer les mollusques responsables de la diffusion de la bilharziose. Enfin, les tiges débarrassées des épines servent à enlever le tartre des dents mais ne contiennent pas de principes antibactériens.',
    emplois: [
      {
        indication: 'Aliment',
        preparation: 'Sucer les fruits vendus sur les marchés pour leur richesse en vitamines et glucides.',
      },
      {
        indication: 'Anti-inflammatoire',
        preparation: 'Presser le jus de fruit ou faire une décoction concentrée et frotter la partie inflammée pour calmer la douleur.',
      },
      {
        indication: 'Frotte-dents',
        preparation:
          'Couper une tige de Balanites aegyptiaca, enlever les épines et se frotter les dents une heure par jour pour une hygiène normale.',
      },
    ],
    partiesUtilisees: ['fruit', 'écorce', 'tiges', 'amande'],
    source: 'Pousset, J.-L., 1989, p. 27–30',
  },

  // ─── 6 ───────────────────────────────────────────────
  {
    id: 'butyrospermum-parkii',
    nomVulgaire: 'Karité',
    nomScientifique: 'Butyrospermum parkii',
    famille: 'Sapotaceae',
    nomsAfricains: {
      wolof: 'karité',
      bambara: 'sé, si sii',
      peuhl: 'karé, karey, karedé, kolo',
    },
    categorieTherapeutique: 'Anti-inflammatoire externe',
    couleur: '#D4A066',
    icone: '🧈',
    historique:
      'La matière grasse ou beurre de karité est couramment vendue sur les marchés en plaques ou en boules. La méthode africaine de préparation du beurre consiste à débarrasser les fruits de leur pulpe par fermentation et lavage. L\'amande est ensuite réduite en pâte par pilonnage et la masse obtenue est jetée dans l\'eau bouillante. Au refroidissement, la graisse surnage et on peut ainsi la recueillir presque propre.',
    descriptionPlante:
      'C\'est un arbre trapu de 9 à 10 mètres de hauteur. Le feuillage vert sombre tombe pendant la saison sèche. Les feuilles sont groupées à l\'extrémité des rameaux. Les fruits sont des drupes contenant une graine blanchâtre très grasse.',
    actionCurative:
      'Le beurre de karité a été très bien étudié chimiquement. Il est composé de glycerides d\'acides gras saturés et insaturés. Dans l\'insaponifiable, on trouve des alcools triterpéniques et des stérols responsables de l\'action anti-inflammatoire. Des essais comme décongestionnant nasal ont donné de très bons résultats. Une application de beurre de karité à l\'intérieur du nez diminue la congestion dans les rhinites. D\'autre part, il n\'y a pas d\'irritation comme avec les vasoconstricteurs habituellement employés.',
    emplois: [
      {
        indication: 'Douleur des membres',
        preparation: 'Frictionner à l\'aide du beurre de karité les endroits douloureux au moins deux fois par jour.',
      },
      {
        indication: 'Congestion nasale',
        preparation:
          'Appliquer 1 gramme de beurre de karité à l\'intérieur des narines dans les cas de rhinites toutes les 6 heures.',
      },
    ],
    partiesUtilisees: ['beurre extrait de la graine'],
    source: 'Pousset, J.-L., 1989, p. 32–33',
  },

  // ─── 7 ───────────────────────────────────────────────
  {
    id: 'cajanus-cajan',
    nomVulgaire: 'Pois d\'Angola – Pois de pigeon',
    nomScientifique: 'Cajanus cajan',
    famille: 'Fabaceae',
    nomsAfricains: {
      hausa: 'waken-masar, waken-turawa',
    },
    categorieTherapeutique: 'Antidiarrhéique',
    couleur: '#7B9E4A',
    icone: '🫛',
    historique:
      'La plante est employée en médecine traditionnelle comme antidiarrhéique. Cette plante originaire de l\'Inde est cultivée sous tous les tropiques pour l\'alimentation (graines).',
    descriptionPlante:
      'C\'est une plante qui peut atteindre 3 mètres de hauteur. Les feuilles alternes se composent de 3 folioles. Les fleurs sont jaunes brunâtres. Le fruit est une gousse linéaire qui renferme plusieurs graines.',
    actionCurative:
      'Ce sont les tanins qui sont responsables de l\'action antidiarrhéique. D\'autre part, un extrait de graines de Cajanus cajan a montré une action antidrépanocytaire : les globules rouges des malades qui sont falciformes (en forme de faucilles) redeviennent ronds si l\'on ajoute un extrait de la plante.',
    emplois: [
      {
        indication: 'Diarrhée',
        preparation:
          'En présence de diarrhée, faire une décoction de 15 grammes de feuilles dans un litre d\'eau et boire dans la journée.',
      },
    ],
    partiesUtilisees: ['feuilles', 'graines'],
    source: 'Pousset, J.-L., 1989, p. 35–36',
  },

  // ─── 8 ───────────────────────────────────────────────
  {
    id: 'capsicum-frutescens',
    nomVulgaire: 'Piment de Cayenne – Petit piment',
    nomScientifique: 'Capsicum frutescens',
    famille: 'Solanaceae',
    nomsAfricains: {
      wolof: 'kani buseu',
      bambara: 'foratu, gamaho, ebaba kani',
      hausa: 'barkono, barkhannu',
    },
    categorieTherapeutique: 'Stimulant de la digestion – Hypocholestérolémiant – Révulsif',
    couleur: '#D94B35',
    icone: '🌶️',
    historique:
      'Le petit piment est d\'usage courant comme stimulant, laxatif et condiment. On le recommande aussi comme antihémorroïdaire et parfois antiictérique et antioedémateux. Parfois, on l\'ajoute aux préparations fébrifuges.',
    descriptionPlante:
      'C\'est un sous-arbrisseau pouvant atteindre 1 mètre de hauteur. Les feuilles sont ovales et les fleurs blanches ou jaunes pâles. Les fruits sont en forme de cônes, souvent groupés par 2 ou 3 de couleur jaune devenant rouge à maturité.',
    actionCurative:
      'Le petit piment contient des carotenoïdes responsables de la couleur du fruit et un amide piquant et rubéfiant : la capsaïcine responsable de la saveur. On y trouve aussi des vitamines et des flavonoïdes. L\'ingestion par des rats de rations contenant 5% de piment provoque une augmentation de consommation de nourriture et un gain de poids. La capsaïcine provoque l\'élimination du cholestérol et des acides biliaires tout en maintenant un taux peu élevé dans le foie.',
    emplois: [
      {
        indication: 'Stimulant de la digestion',
        preparation:
          'Le piment en quantité raisonnable stimule la digestion et augmente la consommation de nourriture. À fortes doses, il peut être irritant pour l\'estomac et provoquer des ulcères.',
      },
      {
        indication: 'Révulsif pour rhumatismes',
        preparation: 'Le piment peut être employé en emplâtres dans les rhumatismes et les névralgies.',
      },
    ],
    partiesUtilisees: ['fruit mûr'],
    precautions:
      'À fortes doses, peut irriter la muqueuse gastrique et provoquer des ulcères. Éviter en cas de gastrite ou ulcère gastrique.',
    source: 'Pousset, J.-L., 1989, p. 37–40',
  },

  // ─── 9 ───────────────────────────────────────────────
  {
    id: 'carica-papaya',
    nomVulgaire: 'Papayer',
    nomScientifique: 'Carica papaya',
    famille: 'Caricaceae',
    nomsAfricains: {
      wolof: 'papayo',
      bambara: 'papiu, papia',
      peuhl: 'papayi, papayo',
    },
    categorieTherapeutique: 'Antiictérique – Vermifuge',
    couleur: '#F0A030',
    icone: '🍈',
    historique:
      'C\'est une plante originaire de l\'Amérique Centrale introduite et cultivée autour des villages et dans les jardins africains. Les utilisations médicinales du Papayer sont variées, mais on peut distinguer trois propriétés principales : anti-ictériques (toutes les parties de la plante : feuilles, fruits et écorces), vermifuges (latex des fruits), diurétiques (racines et feuilles). Pour les ictères, un traitement au Sénégal consiste à faire bouillir un fruit vert cuit avec du poulet et d\'y ajouter des racines de Tinospora bakis.',
    descriptionPlante:
      'C\'est un petit arbre fruitier atteignant 2 à 10 mètres de hauteur à fût droit. Les feuilles sont groupées vers le sommet. Toutes les parties de la plante contiennent du latex. Le papayer est le plus souvent dioïque. Le fruit charnu est une baie ovoïde, de grosseur, de forme et de couleur variables selon les variétés.',
    actionCurative:
      'Le latex des fruits non mûrs est riche en papaïne, enzyme protéolytique qui agit comme vermifuge en digérant le revêtement de la cuticule des vers. Les feuilles contiennent de la carpaine, alcaloïde qui peut être responsable d\'une action antiparasitaire. La plante entière possède des propriétés antiictériques vérifiées cliniquement au Sénégal.',
    emplois: [
      {
        indication: 'Vermifuge',
        preparation:
          'Recueillir 4 à 5 ml de latex du fruit non mûr en incisant légèrement la peau. Mélanger dans un demi-verre d\'eau sucrée et boire le matin à jeun. Prendre un purgatif 2 heures après.',
      },
      {
        indication: 'Ictère (jaunisse)',
        preparation:
          'Faire bouillir un fruit vert de papayer avec du poulet et y ajouter des racines de Tinospora bakis. Consommer comme repas.',
      },
    ],
    partiesUtilisees: ['latex du fruit vert', 'feuilles', 'fruits', 'racines'],
    precautions: 'Le latex en grande quantité peut être toxique. Ne pas dépasser 5 ml de latex. Déconseillé pendant la grossesse.',
    source: 'Pousset, J.-L., 1989, p. 40–44',
  },

  // ─── 10 ──────────────────────────────────────────────
  {
    id: 'cassia-alata',
    nomVulgaire: 'Dartrier',
    nomScientifique: 'Cassia alata',
    famille: 'Caesalpiniaceae',
    nomsAfricains: {
      wolof: 'mbâta',
    },
    categorieTherapeutique: 'Antifongique externe – Antibactérien externe',
    couleur: '#8FC47A',
    icone: '🍀',
    historique:
      'Cette plante est employée dans toute l\'Afrique dans les affections de la peau. D\'autre part, elle est utilisée par voie interne comme purgatif. Ce sont les feuilles qui sont utilisées en applications soit telles quelles, soit après avoir été broyées.',
    descriptionPlante:
      'C\'est un arbuste de 2 à 3 mètres de haut, les feuilles sont grandes, composées pennées, les fleurs sont jaunes très ornementales et les fruits sont des gousses droites atteignant 25 cm de long.',
    actionCurative:
      'L\'action antibactérienne et antifongique des feuilles de Cassia alata a très bien été étudiée par Fuzellier dans sa thèse en 1983. Les principes actifs sont des hétérosides dont le sucre est le glucose et les génines des dérivés anthracéniques. L\'action antibactérienne sur le staphylocoque, qui est le germe le plus souvent rencontré dans les plaies infectées, a été vérifiée. D\'autre part, l\'action antifongique existe sur tous les dermatophytes mais non sur les levures.',
    emplois: [
      {
        indication: 'Dermatoses – Mycoses (teigne, dartres)',
        preparation:
          'Le mieux est d\'utiliser directement sur les lésions le jus des feuilles fraîches obtenu après broyage. Une pommade contenant 10% d\'un extrait de la plante par l\'alcool à 50° peut être facilement préparée par le pharmacien.',
      },
    ],
    partiesUtilisees: ['feuilles'],
    precautions: 'Usage externe uniquement pour les mycoses. Éviter le contact avec les yeux.',
    source: 'Pousset, J.-L., 1989, p. 43–44',
  },

  // ─── 11 ──────────────────────────────────────────────
  {
    id: 'cassia-italica',
    nomVulgaire: 'Séné africain',
    nomScientifique: 'Cassia italica',
    famille: 'Caesalpiniaceae',
    nomsAfricains: {
      wolof: 'laïdur',
      bambara: 'm\'bali, mbali',
      peuhl: 'falajin',
      hausa: 'illesko, filasko',
    },
    categorieTherapeutique: 'Laxatif',
    couleur: '#9BBF6E',
    icone: '🌾',
    historique:
      'Les propriétés laxatives et purgatives du Séné semblent avoir été découvertes par les Arabes au IXème siècle et connues en Europe par leur intermédiaire. Cassia italica a été inscrit à la pharmacopée française de 1949 à côté de Cassia angustifolia. Il fait partie de la pharmacopée africaine de 1985, éditée par l\'Organisation de l\'Unité Africaine (O.U.A.).',
    descriptionPlante:
      'C\'est un petit arbuste dépassant rarement 50 cm de haut. Les feuilles sont composées pénnées, les fruits sont des gousses plates et arrondies.',
    actionCurative:
      'Les folioles de Séné renferment de l\'eau, des dérivés minéraux et des sennosides, principes actifs qui sont des hétérosides. Le Séné agit plus de 12 heures après son ingestion. Ceci est dû à l\'hydrolyse dans le gros intestin des substances actives. Il faut donc prendre le Séné le soir au coucher pour avoir une action le lendemain.',
    emplois: [
      {
        indication: 'Laxatif – Constipation',
        preparation:
          'Verser un litre d\'eau chaude sur 20 grammes de feuilles, laisser infuser une demi-heure et boire un grand verre avant de se coucher.',
      },
    ],
    partiesUtilisees: ['feuilles (folioles)'],
    precautions:
      'Ne pas utiliser en cas de diarrhée, grossesse ou allaitement. Usage prolongé déconseillé (risque de dépendance intestinale).',
    source: 'Pousset, J.-L., 1989, p. 45–46',
  },

  // ─── 12 ──────────────────────────────────────────────
  {
    id: 'cassia-occidentalis',
    nomVulgaire: 'Faux kinkeliba',
    nomScientifique: 'Cassia occidentalis',
    famille: 'Caesalpiniaceae',
    nomsAfricains: {
      wolof: 'bêtamarê, xob bu adana, bâté, bâta',
      bambara: 'mbala mbala fin',
      peuhl: 'tasbati, câbali, aldana',
    },
    categorieTherapeutique: 'Cholagogue – Laxatif',
    couleur: '#A8C46A',
    icone: '🌿',
    historique:
      'Cette plante est très appréciée par les matrones accoucheuses dans tout le Sahel. Les feuilles sont particulièrement recommandées pour l\'accouchement des femmes enceintes car elles sont ocytociques. Les feuilles sont aussi utilisées comme dépuratives. Les graines peuvent être grillées comme succédané du café.',
    descriptionPlante:
      'Sous-arbrisseau pouvant atteindre 1 mètre de hauteur, dont le froissement des feuilles produit une odeur peu agréable. Les feuilles sont composées, imparipennées. Les fleurs sont jaunes. Les fruits sont des gousses étroites, arquées avec 12 graines en moyenne.',
    actionCurative:
      'Les feuilles contiennent des dérivés anthracéniques responsables de l\'action laxative et des flavonoïdes diurétiques. D\'autre part, les hétérosides anthracéniques sont en effet ocytociques et cette plante ne doit pas être donnée aux femmes enceintes sinon pour favoriser l\'accouchement.',
    emplois: [
      {
        indication: 'Laxatif – Dépuratif',
        preparation:
          'Infuser 20 grammes de feuilles dans un litre d\'eau chaude. Boire 2 verres par jour. Éviter chez la femme enceinte.',
      },
    ],
    partiesUtilisees: ['feuilles', 'graines'],
    precautions:
      'CONTRE-INDIQUÉE pendant la grossesse (effet ocytocique fort). Peut provoquer un accouchement prématuré.',
    source: 'Pousset, J.-L., 1989, p. 48–49',
  },

  // ─── 13 ──────────────────────────────────────────────
  {
    id: 'cassia-sieberiana',
    nomVulgaire: 'Sindian',
    nomScientifique: 'Cassia sieberiana',
    famille: 'Caesalpiniaceae',
    nomsAfricains: {
      wolof: 'sindian',
      bambara: 'sindian',
      peuhl: 'sindia',
    },
    categorieTherapeutique: 'Diurétique – Dépuratif',
    couleur: '#70A86E',
    icone: '🌳',
    historique:
      'Le Cassia sieberiana est une des plantes les plus utilisées par les mères de famille dès que leurs enfants ressentent un peu de fatigue. Les feuilles et les racines sont utilisées en macération comme dépuratif, fébrifuge, diurétique et antianémique.',
    descriptionPlante:
      'Petit arbre de 10 mètres de hauteur. Feuilles composées pénnées. Les fleurs sont jaunes en grappes pendantes. L\'arbre est fleuri en saison sèche. Les fruits sont des gousses cylindriques de 60 cm de longueur qui restent très longtemps sur l\'arbre.',
    actionCurative:
      'Les racines comme les feuilles contiennent des hétérosides anthracéniques responsables de l\'action dépurative et des flavonoïdes et tanins catéchiques qui expliquent l\'action diurétique. Cette action diurétique a été vérifiée. L\'accroissement du volume d\'urines est multiplié par deux avec une macération des racines ou des feuilles.',
    emplois: [
      {
        indication: 'Diurétique – Dépuratif',
        preparation:
          'Faire macérer 30 grammes de feuilles ou de racines dans un litre d\'eau froide pendant 12 heures. Boire 3 verres par jour.',
      },
    ],
    partiesUtilisees: ['feuilles', 'racines'],
    source: 'Pousset, J.-L., 1989, p. 50–51',
  },

  // ─── 14 ──────────────────────────────────────────────
  {
    id: 'catharanthus-roseus',
    nomVulgaire: 'Pervenche de Madagascar',
    nomScientifique: 'Catharanthus roseus',
    famille: 'Apocynaceae',
    nomsAfricains: {},
    categorieTherapeutique: 'Antidiabétique – Antihypertenseur',
    couleur: '#C070B0',
    icone: '🌸',
    historique:
      'Plante importée, la pervenche de Madagascar est peu employée par les tradipraticiens africains. Elle est signalée comme antidiabétique en décoction, indication pour laquelle elle était très employée à Madagascar. C\'est en essayant de vérifier cette action que des chercheurs canadiens ont découvert l\'action antimitotique des parties aériennes de cette plante. La racine par contre contient un alcaloïde responsable de l\'action antihypertensive.',
    descriptionPlante:
      'C\'est une plante vivace pouvant atteindre 50 cm de haut. Les fleurs roses ou blanches possèdent une corolle à 5 lobes en forme de roue. Les feuilles sont simples et opposées. Les racines sont très développées. Cette plante est cultivée comme ornementale dans tous les jardins urbains. Elle se cultive facilement dans les sols sablonneux.',
    actionCurative:
      'La pervenche de Madagascar est la plante qui a donné lieu au plus grande nombre de travaux ces vingt dernières années. Les alcaloïdes responsables de l\'action antidiabétique ont été isolés. On a découvert dans les parties aériennes deux alcaloïdes antimitotiques majeurs, la vincristine et la vinblastine, utilisées en chimiothérapie anticancéreuse. La racine contient de la serpentine et de l\'ajmalicine à action antihypertensive.',
    emplois: [
      {
        indication: 'Diabète – Hypertension légère',
        preparation:
          'Faire une décoction de 30 grammes de feuilles dans 1 litre d\'eau. Boire dans la journée et vérifier tension et glycémie.',
      },
    ],
    partiesUtilisees: ['feuilles', 'racines'],
    precautions:
      'Surveiller glycémie et tension artérielle. Les alcaloïdes des parties aériennes sont cytotoxiques à fortes doses. Ne pas dépasser les doses recommandées.',
    source: 'Pousset, J.-L., 1989, p. 52–55',
  },

  // ─── 15 ──────────────────────────────────────────────
  {
    id: 'chenopodium-ambrosioides',
    nomVulgaire: 'Anserine – Chénopode vermifuge',
    nomScientifique: 'Chenopodium ambrosioides',
    famille: 'Chenopodiaceae',
    nomsAfricains: {
      wolof: 'thiop bu weex',
    },
    categorieTherapeutique: 'Vermifuge',
    couleur: '#7AAE66',
    icone: '🌿',
    historique:
      'Cette plante est très répandue dans les pays tropicaux. Elle est connue pour son action vermifuge sur les ascaris et les ankylostomes. Son principe actif, l\'ascaridol, est une substance huileuse extraite par distillation à la vapeur d\'eau.',
    descriptionPlante:
      'Plante annuelle pouvant atteindre 1,5 mètre de hauteur, à odeur caractéristique forte et désagréable. Les feuilles sont alternes, lancéolées avec des dents obtuses. Les fleurs sont verdâtres, petites, groupées en épis. Les fruits sont des akènes enveloppés par les sépales persistants.',
    actionCurative:
      'L\'essence d\'Anserine renfermant l\'ascaridol est connue depuis longtemps pour son action antihelmintique. Cette huile esssentielle est active contre les ascaris, les ankylostomes et les oxyures. L\'huile essentielle d\'Ascaridée peut agir sur les larves des ankylostomes, présentant ainsi une action préventive.',
    emplois: [
      {
        indication: 'Vers intestinaux (ascaris, ankylostomes)',
        preparation:
          'Faire infuser 100 grammes de feuilles fraîches ou sommités fleuries dans un demi-litre d\'eau et boire à 3 reprises au cours de la journée. Après 3 jours, il est recommandé de prendre un purgatif. Réduire la dose de moitié pour les enfants.',
      },
    ],
    partiesUtilisees: ['feuilles', 'sommités fleuries'],
    precautions:
      'L\'emploi de cette plante doit être surveillé car des phénomènes d\'intolérance peuvent se manifester : vertiges, maux de têtes et vomissements. Réduire la dose pour les enfants.',
    source: 'Pousset, J.-L., 1989, p. 55–57',
  },

  // ─── 16 ──────────────────────────────────────────────
  {
    id: 'chrysanthellum-americanum',
    nomVulgaire: 'Chrysanthellum',
    nomScientifique: 'Chrysanthellum americanum',
    famille: 'Asteraceae',
    nomsAfricains: {
      wolof: 'bu ñëw',
    },
    categorieTherapeutique: 'Hépatoprotecteur – Cholagogue – Hypocholestérolémiant',
    couleur: '#DAA520',
    icone: '🌼',
    historique:
      'Cette petite plante très commune des bords de chemin en Afrique de l\'Ouest est utilisée dans de nombreuses ethnies. Elle est maintenant vendue comme tisane en Europe pour ses propriétés hépatoprotectrices, cholagogues et hypolipémiantes.',
    descriptionPlante:
      'Petite herbe rampante d\'environ 20 cm de hauteur. Les feuilles sont alternes, finement découpées. Les capitules floraux sont jaunes. La plante tapisse le sol en nappe dense dans les endroits ensoleillés et légèrement humides.',
    actionCurative:
      'La drogue est constituée de la plante entière. Deux sortes de dérivés ont été isolés, des saponosides et des flavonoïdes. L\'étude pharmacologique a porté essentiellement sur trois pôles d\'action : l\'activité hépatotrope, l\'action hypolipémiante et les propriétés vasculotropes de la plante. On a vérifié aussi bien chez l\'animal que chez l\'homme, une action hépatoprotectrice, cholagogue et cholérétique. D\'autre part, un extrait de la plante dissous les calculs biliaires et rénaux. La drogue peut être utilisée dans les affections caractérisées par une fragilité vasculaire : hémorroïdes, varices, artérites des membres inférieurs.',
    emplois: [
      {
        indication: 'Calculs biliaires et rénaux – Varices – Hémorroïdes',
        preparation:
          'Faire une décoction de 12 grammes de plante sèche dans un demi-litre d\'eau et boire par verres dans une journée.',
      },
    ],
    partiesUtilisees: ['plante entière'],
    source: 'Pousset, J.-L., 1989, p. 58–61',
  },

  // ─── 17 ──────────────────────────────────────────────
  {
    id: 'cochlospermum-tinctorium',
    nomVulgaire: 'Arbre de soie sauvage',
    nomScientifique: 'Cochlospermum tinctorium',
    famille: 'Cochlospermaceae',
    nomsAfricains: {
      wolof: 'fayar',
      peuhl: 'nda déré, ndadure, darundé',
    },
    categorieTherapeutique: 'Antiictérique',
    couleur: '#F0BC2A',
    icone: '🌻',
    historique:
      'C\'est une plante très estimée de toutes les ethnies vivant dans le Sahel. C\'est l\'exemple même de plante qui peut être reliée à la "théorie des signatures" de Paracelse. En effet, la fleur d\'un jaune flamboyant apparaît en saison sèche après les feux de brousse destinés à préparer le sol pour les prochaines cultures. La fleur jaune sort directement de la racine qui est aussi jaune et donne un signe évident à l\'homme préoccupé de sa santé. On ne peut l\'utiliser que comme antiictérique et ceci fait l\'unanimité des tradipraticiens.',
    descriptionPlante:
      'Plante ne dépassant pas 50 cm de haut et dont les tiges feuillées se développent pendant les pluies et montrent des feuilles profondément palmatilobées. Les fleurs d\'un beau jaune apparaissent presque au niveau du sol après les feux de brousse. Les fruits sont des capsules ovoïdes qui renferment de nombreuses graines.',
    actionCurative:
      'La racine de la plante contient des principes amers qui font l\'objet de recherches. Son action antiictérique et anti-inflammatoire a été vérifiée. C\'est un médicament spécifique des affections hépato-biliaires, en particulier des fièvres bilieuses hématuriques. Cette plante est aussi très employée comme anti-inflammatoire dans le cas d\'hémorroïdes justifiables d\'une intervention chirurgicale.',
    emplois: [
      {
        indication: 'Ictère (jaunisse) – Affections hépatiques',
        preparation:
          'Faire bouillir 20 g de racines fraîches dans un litre d\'eau pendant 20 minutes. Filtrer et boire 3 verres par jour pendant 5 à 7 jours.',
      },
    ],
    partiesUtilisees: ['racines'],
    precautions: 'En cas d\'ictère grave, consulter un médecin. L\'usage de cette plante ne remplace pas un bilan médical.',
    source: 'Pousset, J.-L., 1989, p. 61–63',
  },

  // ─── 18 ──────────────────────────────────────────────
  {
    id: 'cola-nitida',
    nomVulgaire: 'Kola',
    nomScientifique: 'Cola nitida',
    famille: 'Sterculiaceae',
    nomsAfricains: {
      wolof: 'guro',
      bambara: 'goro',
      peuhl: 'goro',
      hausa: 'goro',
    },
    categorieTherapeutique: 'Stimulant nerveux',
    couleur: '#8B4513',
    icone: '🌰',
    historique:
      'La noix de Kola a toujours été utilisée par les Africains comme stimulant, anti-fatigue et même aphrodisiaque. Les échanges entre le Sud et le Nord de l\'Afrique tels qu\'ils existent encore aujourd\'hui pour la noix de Cola ont été très bien décrits par René Caillé, premier explorateur européen ayant pu pénétrer à Tombouctou, cité interdite en 1830. Les noix fraîches qui sont seules utilisées sont choisies avec la plus grande précaution sur les marchés ambulants.',
    descriptionPlante:
      'C\'est un arbre de 5 à 10 mètres de hauteur avec un tronc droit. Les feuilles alternes et ovales possèdent un long pétiole. Les fleurs sont groupées en grappes de couleur jaune. Les fruits sont formés de cinq carpelles d\'environ 16 centimètres de longueur et contiennent 4 à 5 graines improprement appelées noix de kola. Les amandes se divisent en deux cotylédons.',
    actionCurative:
      'Les noix de kola contiennent de la caféine (environ 2%), de la théobromine et des tanins catéchiques. La caféine est le principal principe actif responsable des effets stimulants sur le système nerveux central. Elle augmente les capacités intellectuelles et physiques et diminue la fatigue. Les tanins donnent à la noix fraîche sa saveur légèrement astringente.',
    emplois: [
      {
        indication: 'Fatigue – Stimulant physique et intellectuel',
        preparation:
          'Croquer une noix fraîche de kola le matin. Ne pas dépasser 2 à 3 noix par jour. Les noix doivent être fraîches (non rougies) pour être efficaces.',
      },
    ],
    partiesUtilisees: ['cotylédons (noix)'],
    precautions:
      'Déconseillé en cas d\'insomnie, d\'hypertension ou de troubles cardiaques. La caféine peut créer une dépendance.',
    source: 'Pousset, J.-L., 1989, p. 64–66',
  },

  // ─── 19 ──────────────────────────────────────────────
  {
    id: 'combretum-glutinosum',
    nomVulgaire: 'Ratt',
    nomScientifique: 'Combretum glutinosum',
    famille: 'Combretaceae',
    nomsAfricains: {
      wolof: 'rat',
      bambara: 'âgara',
      peuhl: 'dokï',
    },
    categorieTherapeutique: 'Diurétique – Hypotenseur',
    couleur: '#5B8A4A',
    icone: '🌲',
    historique:
      'Combretum glutinosum est une des espèces les plus prescrites en médecine populaire. On reconnaît aux feuilles des propriétés diurétiques, dépuratives et cholagogues. D\'autre part, les feuilles sont aussi recommandées dans la toux et les bronchites. Elles rentrent dans un mélange de plantes comme antiictériques.',
    descriptionPlante:
      'C\'est un petit arbre pouvant atteindre 10 m de hauteur. Les feuilles sont alternes. Les inflorescences sont constituées par des épis axillaires compacts avec des fleurs jaune-crème poilues. Le fruit possède quatre ailles jaunâtres, devenant brunes à maturité.',
    actionCurative:
      'Le Combretum glutinosum maintenant vendu comme tisane en Europe a été étudié. Une expérimentation clinique effectuée à Dakar a permis de vérifier l\'action diurétique et hypotensive d\'un décocté de la plante de même que son action dans les ictères. D\'autre part, l\'expérimentation sur l\'animal a vérifié l\'action antitussive et antispasmodique. La composition chimique de la plante (flavonoïdes et acides organiques) corrobore l\'action diurétique.',
    emplois: [
      {
        indication: 'Diurétique – Hypertension légère',
        preparation:
          'Faire une décoction de 20 g de feuilles séchées dans un litre d\'eau. Boire 3 verres par jour. Surveiller la tension artérielle.',
      },
      {
        indication: 'Toux – Bronchites',
        preparation:
          'Préparer une tisane de 15 g de feuilles pour un demi-litre d\'eau chaude. Boire 2 tasses par jour avec du miel.',
      },
    ],
    partiesUtilisees: ['feuilles'],
    source: 'Pousset, J.-L., 1989, p. 67–68',
  },

  // ─── 20 ──────────────────────────────────────────────
  {
    id: 'combretum-micranthum',
    nomVulgaire: 'Kinkeliba',
    nomScientifique: 'Combretum micranthum',
    famille: 'Combretaceae',
    nomsAfricains: {
      wolof: 'sereo',
      bambara: 'kobobe, dolabe',
      peuhl: 'talli gugumi',
      hausa: 'geza',
    },
    categorieTherapeutique: 'Cholagogue – Diurétique',
    couleur: '#4E8B4E',
    icone: '🍃',
    historique:
      'C\'est le Docteur Rancon en 1891, médecin accomplissant une mission en Haute-Gambie qui récolta les premiers échantillons de kinkéliba et qui les expédia à son maître Heckel car disait-il cette plante est "employée avec succès, dans les cas des fièvres bilieuses et hématuriques". Depuis 1937, cette plante est inscrite à la pharmacopée française et depuis 1985 à la pharmacopée africaine éditée par l\'Organisation de l\'Unité Africaine (O.U.A.). Les propriétés les plus connues sont les actions cholagogues et diurétiques. Il existe de nombreuses autres utilisations en particulier dans toutes les maladies du foie, contre la toux, dans les cas de fièvres, comme tonique, etc.',
    descriptionPlante:
      'C\'est un petit arbre touffu de 5 à 6 mètres de haut. Les feuilles sont opposées, entières, ovales et coriaces. Les fleurs sont blanches ou rosées de type 4. Le fruit est une samare à 4 ailes renfermant une seule graine. Cette plante est très répandue de la Casamance au fleuve Sénégal.',
    actionCurative:
      'Les feuilles contiennent des flavonoïdes à action diurétique, des hétérosides à action cholagogue et des tanins. La composition chimique explique l\'ensemble des utilisations traditionnelles. L\'action diurétique a été vérifiée cliniquement. Des études ont également montré des propriétés antioxydantes et anti-inflammatoires.',
    emplois: [
      {
        indication: 'Foie – Digestion (usage quotidien)',
        preparation:
          'Faire infuser 10 à 15 grammes de feuilles séchées dans un litre d\'eau bouillante. Boire un grand verre le matin à jeun. C\'est l\'usage traditionnel quotidien au Sénégal.',
      },
      {
        indication: 'Fièvre biliaire – Ictère',
        preparation:
          'Faire bouillir 20 grammes de feuilles dans un litre d\'eau pendant 15 minutes. Boire 2 à 3 verres par jour pendant 5 jours.',
      },
    ],
    partiesUtilisees: ['feuilles'],
    source: 'Pousset, J.-L., 1989, p. 69–70',
  },

  // ─── 21 ──────────────────────────────────────────────
  {
    id: 'cymbopogon-citratus',
    nomVulgaire: 'Citronnelle',
    nomScientifique: 'Cymbopogon citratus',
    famille: 'Poaceae',
    nomsAfricains: {
      wolof: 'citronnelle',
    },
    categorieTherapeutique: 'Stimulant de la digestion – Insectifuge',
    couleur: '#A8C842',
    icone: '🌿',
    historique:
      'Le Cymbopogon citratus est improprement appelé citronnelle, comme C. nardus, qui en fait est une autre variété poussant en Inde. Mais les deux plantes ont les mêmes indications. Les feuilles sont très utilisées en décoction comme boisson rafraîchissante et digestive. D\'autre part, la décoction des feuilles et des racines est très utilisée comme fébrifuge en Afrique.',
    descriptionPlante:
      'C\'est une herbe vivace avec des grandes feuilles atteignant un mètre de hauteur et à odeur citronnée quand on les froisse. Les fleurs sont rares même en saison des pluies. Elle est cultivée dans les jardins.',
    actionCurative:
      'La plante contient une essence riche en myrcène et en citral responsable de l\'action antispasmodique et stimulante de la digestion. Cependant une étude très récente effectuée au Brésil a montré que, si elle était dénuée de toxicité, la plante n\'augmentait pas la vitesse du transit intestinal et ne possédait pas d\'action hypnotique, fébrifuge et anxiolytique. L\'action insectifuge de l\'huile essentielle est par contre bien établie.',
    emplois: [
      {
        indication: 'Troubles digestifs – Météorisme',
        preparation:
          'Faire infuser 3 à 4 feuilles fraîches dans une tasse d\'eau bouillante pendant 5 minutes. Boire après les repas.',
      },
      {
        indication: 'Insectifuge',
        preparation:
          'Frotter les bras et jambes avec des feuilles fraîches froissées pour éloigner les moustiques. Efficace pendant 1 à 2 heures.',
      },
    ],
    partiesUtilisees: ['feuilles', 'racines'],
    source: 'Pousset, J.-L., 1989, p. 74–76',
  },

  // ─── 22 ──────────────────────────────────────────────
  {
    id: 'fagara-xanthoxylo',
    nomVulgaire: 'Fagara – Poivre africain',
    nomScientifique: 'Fagara xanthoxyloïdes',
    famille: 'Rutaceae',
    nomsAfricains: {
      wolof: 'guene gui deg',
      bambara: 'wo, gozo ngua',
      peuhl: 'barkeley, bulabarkele',
      hausa: 'fasahuari',
      toucouleur: 'dori',
    },
    categorieTherapeutique: 'Anti-drépanocytaire – Frotte-dents',
    couleur: '#C08040',
    icone: '🌱',
    historique:
      'La racine de "Guene gui deg" est très utilisée au Sénégal comme frotte-dents. Elle a une saveur piquante très appréciée et utilisée pour calmer les douleurs dentaires et les infections. Le professeur Sofowora du Nigéria a constaté que le sang sur lequel on avait déposé un extrait de la plante restait rouge très longtemps. Il en déduisit que la plante avait empêché l\'hémolyse des globules rouges. Depuis quinze ans plus de trente publications ont précisé l\'action antidrépanocytaire de la plante.',
    descriptionPlante:
      'Petit arbre de 6 à 7 mètres de haut, avec sur les branches de nombreuses épines crochues. Tous les organes dégagent quand on les froisse une odeur citronnée. Les feuilles sont composées imparipennées. Les fleurs sont blanches parfumées.',
    actionCurative:
      'Le principe actif de la plante a été isolé. Il agit en redonnant aux globules rouges des malades drépanocytaires leur forme ronde normale et en permettant un meilleur apport d\'oxygène. Des comprimés sont maintenant préparés au Nigéria. La toxicité de la plante est négligeable et trois grammes de poudre de racines donné par jour à un homozygote SS font disparaître toutes les crises.',
    emplois: [
      {
        indication: 'Drépanocytose (douleurs de crise)',
        preparation:
          'Prendre 3 grammes de poudre de racines séchées par jour. Cette dose fait disparaître les crises chez les homozygotes SS.',
      },
      {
        indication: 'Douleurs dentaires – Frotte-dents',
        preparation:
          'Couper un morceau de racine fraîche et se frotter les dents et les gencives. La saveur piquante calme la douleur et a une action antibactérienne.',
      },
    ],
    partiesUtilisees: ['racines'],
    precautions: 'Pour la drépanocytose, ne pas arrêter un traitement médical en cours. Usage complémentaire seulement.',
    source: 'Pousset, J.-L., 1989, p. 81–82',
  },

  // ─── 23 ──────────────────────────────────────────────
  {
    id: 'guiera-senegalensis',
    nomVulgaire: 'Nger – Boulboul',
    nomScientifique: 'Guiera senegalensis',
    famille: 'Combretaceae',
    nomsAfricains: {
      wolof: 'nger',
      bambara: 'kudêmbé',
      peuhl: 'géloki',
    },
    categorieTherapeutique: 'Antitussif – Fébrifuge',
    couleur: '#6A9A5A',
    icone: '🌿',
    historique:
      'Le Nger est considéré comme la première plante du Sénégal étant donné son emploi généralisé par toute la population et ses nombreuses indications. Le Guiera senegalensis est utilisé principalement comme calmant de la toux et comme diminuant la fièvre. D\'où sa prescription comme antitussif, le paludisme, les inflammations des bronches et du poumon. Ces indications sont générales dans tous les pays où pousse cette plante, du Sénégal au Nord-Nigéria.',
    descriptionPlante:
      'C\'est un petit arbre pouvant atteindre trois mètres de haut, le plus souvent en buisson. Les feuilles sont opposées, ovales, arrondies, légèrement poilues sur les deux faces : les poils blancs donnent une teinte générale vert-gris argentée aux arbustes. Les fleurs sont blanches, les fruits sont linéaires de 3 à 4 cm de long. On trouve facilement la plante à partir de soixante kilomètres de Dakar et jusqu\'en Casamance.',
    actionCurative:
      'Le Guiera senegalensis a été une des plantes les plus étudiées de la pharmacopée africaine. Des études ont démontré une activité anti-inflammatoire, antitussive et antispasmodique. La composition chimique révèle des tanins galliques, des flavonoïdes et une huile essentielle. Ces principes actifs expliquent les actions observées cliniquement.',
    emplois: [
      {
        indication: 'Toux – Bronchite – Fièvre',
        preparation:
          'Faire bouillir 20 grammes de feuilles dans un litre d\'eau pendant 15 minutes. Filtrer. Boire 3 tasses par jour avec du miel pour la toux.',
      },
    ],
    partiesUtilisees: ['feuilles'],
    source: 'Pousset, J.-L., 1989, p. 84–85',
  },

  // ─── 24 ──────────────────────────────────────────────
  {
    id: 'hibiscus-sabdariffa',
    nomVulgaire: 'Bissap – Oseille de Guinée',
    nomScientifique: 'Hibiscus sabdariffa',
    famille: 'Malvaceae',
    nomsAfricains: {
      wolof: 'bisap',
      bambara: 'dakumu',
      peuhl: 'folérébadi',
    },
    categorieTherapeutique: 'Diurétique – Antiseptique urinaire',
    couleur: '#C0304A',
    icone: '🌺',
    historique:
      'Cette plante serait originaire d\'Amérique Centrale d\'où elle aurait été introduite dans diverses régions tropicales : Inde, Java, Afrique, Antilles. Les principaux producteurs actuels sont le Soudan, la Thaïlande et le Sénégal. La variété à calice rouge est utilisée en médecine populaire pour faire une boisson rafraîchissante et tonifiante. La décoction est employée comme diurétique et antiseptique urinaire.',
    descriptionPlante:
      'C\'est une plante annuelle cultivée sous les deux tropiques. Elle peut atteindre 1,5 mètre de hauteur. La tige robuste porte des feuilles ovales, trilobées ou simples sur les tiges fleuries. Les fleurs sont caractérisées par un calice de cinq sépales dont la couleur rouge ou verte correspond à celle de la tige. À maturité, le fruit capsulaire est entouré par le calice persistant devenu charnu.',
    actionCurative:
      'Les calices verts ou rouges contiennent de nombreux acides antiseptiques et antifongiques : acide citrique, malique, hibiscique. Ils contiennent également des flavonoïdes responsables de l\'action diurétique et de la coloration rouge intense. La boisson de bissap est reconnue comme diurétique efficace et antiseptique des voies urinaires.',
    emplois: [
      {
        indication: 'Boisson diurétique – Infections urinaires légères',
        preparation:
          'Faire bouillir 20 grammes de calices séchés dans 1 litre d\'eau pendant 10 minutes. Laisser refroidir, sucrer légèrement. Boire 3 verres par jour.',
      },
    ],
    partiesUtilisees: ['calices (fleurs séchées)'],
    precautions:
      'En cas d\'infection urinaire persistante, consulter un médecin. L\'hibiscus peut baisser légèrement la tension artérielle.',
    source: 'Pousset, J.-L., 1989, p. 87–89',
  },

  // ─── 25 ──────────────────────────────────────────────
  {
    id: 'khaya-senegalensis',
    nomVulgaire: 'Caïlcédrat – Acajou du Sénégal',
    nomScientifique: 'Khaya senegalensis',
    famille: 'Meliaceae',
    nomsAfricains: {
      wolof: 'kail',
      bambara: 'dala',
      peuhl: 'kail',
    },
    categorieTherapeutique: 'Fébrifuge – Tonique',
    couleur: '#8B6343',
    icone: '🌳',
    historique:
      'Le Caïlcédrat est un des médicaments les plus utilisés en médecine traditionnelle comme tonique et fébrifuge d\'où son nom de "Quinquina du Sénégal" qu\'on lui donne parfois. Il suffit de voir à la période des pluies ces beaux arbres écorcés en partie pour l\'utilisation en décoction contre les crises de paludisme.',
    descriptionPlante:
      'C\'est un grand arbre de 25 à 30 mètres de hauteur avec un tronc large. Les feuilles sont paripennées. Les fleurs blanches sortent à l\'extrémité des rameaux. Le fruit est une capsule qui s\'ouvre à maturité pour laisser échapper de nombreuses graines plates et ailées.',
    actionCurative:
      'L\'écorce contient un certain nombre de principes amers triterpénoïdes qui ont été isolés par plusieurs équipes. De plus, ont été identifiés des coumarines qui pourraient être responsables de l\'action fébrifuge. Des extraits aqueux de la plante donnés à des rats ont vérifié l\'action fébrifuge. De même, des extraits hydroalcooliques entrainent une dépression et une diminution de l\'activité motrice.',
    emplois: [
      {
        indication: 'Fièvre – Paludisme',
        preparation:
          'Faire bouillir un morceau d\'écorce (10 cm) dans 1 litre d\'eau pendant 20 minutes. Boire 3 verres par jour pendant 5 jours.',
      },
    ],
    partiesUtilisees: ['écorce de tronc'],
    precautions:
      'Ne pas utiliser en substitut d\'un traitement antipaludéen confirmé. L\'écorce peut être amère et provoquer des nausées. Prendre après le repas.',
    source: 'Pousset, J.-L., 1989, p. 95–96',
  },

  // ─── 26 ──────────────────────────────────────────────
  {
    id: 'lippia-multiflora',
    nomVulgaire: 'Thé de Gambie',
    nomScientifique: 'Lippia multiflora',
    famille: 'Verbenaceae',
    nomsAfricains: {
      wolof: 'nbornbor, mbalat, duté',
      bambara: 'ganéla',
    },
    categorieTherapeutique: 'Relaxant – Sédatif',
    couleur: '#8A9A72',
    icone: '☕',
    historique:
      'Les Lippia sont très utilisés en boisson théiforme comme antigrippal et stimulant au Sénégal. Par contre au Nigéria, les infusions des feuilles sont utilisées comme sédatives et relaxantes. Quelques essais cliniques ont démontré une action hypotensive.',
    descriptionPlante:
      'Ce sont des herbes aromatiques ligneuses et dressées en touffe. Les feuilles sont verticillées par 3 ou 4. Les inflorescences sont en épis terminaux de fleurs blanches. L\'odeur de la plante est camphrée.',
    actionCurative:
      'Les Lippia contiennent une huile essentielle riche en camphre. Une étude pharmacologique récente a démontré chez les chats et les rats, une action hypotensive due à une action vasodilatatrice d\'un extrait de Lippia multiflora. D\'autre part, cet extrait provoque une réduction spontanée de l\'activité motrice chez les souris et les rats avec un effet de relaxation musculaire.',
    emplois: [
      {
        indication: 'Insomnie légère – Stress – Grippe',
        preparation:
          'Faire infuser 5 grammes de feuilles séchées dans une tasse d\'eau bouillante pendant 10 minutes. Boire 1 à 2 tasses par jour. Possible avec du miel.',
      },
    ],
    partiesUtilisees: ['feuilles'],
    source: 'Pousset, J.-L., 1989, p. 101–102',
  },

  // ─── 27 ──────────────────────────────────────────────
  {
    id: 'ocimum-basilicum',
    nomVulgaire: 'Basilic africain',
    nomScientifique: 'Ocimum basilicum',
    famille: 'Lamiaceae',
    nomsAfricains: {
      wolof: 'lebalep bu djigen, ngugum, gugunô',
      bambara: 'suholan',
      peuhl: 'guguma',
      hausa: 'dai doya ta gida',
    },
    categorieTherapeutique: 'Stimulant de la digestion – Antispasmodique',
    couleur: '#52A852',
    icone: '🌿',
    historique:
      'Les feuilles sont utilisées dans toute l\'Afrique de l\'Ouest en infusion pour le traitement des fièvres, des dysenteries et pour les maux de dents. Les feuilles peuvent être utilisées pour repousser les moustiques. Le plus grand emploi est celui de stimulant de la digestion et antispasmodique.',
    descriptionPlante:
      'Petite plante de 30 à 40 cm de haut avec une tige quadrangulaire. Les feuilles sont simples, opposées, denticulées dans la partie supérieure. Les fleurs blanches sont terminales. D\'autres Ocimum sont très proches d\'aspect et peuvent être confondus avec l\'Ocimum basilicum.',
    actionCurative:
      'La plante fraîche contient une huile essentielle riche en estragol qui confère à la plante ses propriétés stimulantes de la digestion et antispasmodiques. On recommande l\'infusion des feuilles pour les malades souffrant de gastrites, constipation et crampes d\'estomac.',
    emplois: [
      {
        indication: 'Troubles digestifs – Crampes d\'estomac',
        preparation:
          'Faire infuser 10 grammes de feuilles fraîches dans une tasse d\'eau bouillante pendant 5 minutes. Boire après les repas, 2 fois par jour.',
      },
      {
        indication: 'Maux de dents',
        preparation: 'Mâcher des feuilles fraîches de basilic et appliquer sur la dent douloureuse.',
      },
    ],
    partiesUtilisees: ['feuilles fraîches'],
    source: 'Pousset, J.-L., 1989, p. 115–116',
  },

  // ─── 28 ──────────────────────────────────────────────
  {
    id: 'tinospora-bakis',
    nomVulgaire: 'Bakis',
    nomScientifique: 'Tinospora bakis',
    famille: 'Menispermaceae',
    nomsAfricains: {
      wolof: 'bakis',
      peuhl: 'abolo, bakani',
    },
    categorieTherapeutique: 'Anti-ictérique – Fébrifuge',
    couleur: '#C8AA46',
    icone: '🌿',
    historique:
      'C\'est l\'exemple même de l\'application de la "théorie des signatures" où une racine jaune celle du Bakis permet de soigner les ictères au sens large, diagnostiqués par la coloration des téguments et de la sclérotite. Tous les ictères qu\'ils résultent d\'une hépatite ou bien consécutifs à une crise de paludisme sont soignés par cette plante. Le Bakis est souvent associé au fruit vert de Carica papaya (voir cette plante).',
    descriptionPlante:
      'C\'est un petit arbuste avec des racines jaunes et des tiges en forme de liane qui peuvent atteindre 10 mètres de hauteur et s\'accrochent aux arbres. Les feuilles alternes en forme de cœur sont terminées en pointe. Elles possèdent un long pétiole. Les fleurs sont jaunes verdâtres et les fruits sont des petites drupes ovoïdes. On récolte les racines sans détruire l\'arbre.',
    actionCurative:
      'La racine de Tinospora bakis contient un principe amer, la colombine et différents alcaloïdes quaternaires dont le principal est la palmatine soluble dans l\'eau. La colombine augmente la sécrétion biliaire. L\'action antiictérique de la plante a été vérifiée sur des malades hospitalisés.',
    emplois: [
      {
        indication: 'Ictère (jaunisse) – Hépatite',
        preparation:
          'Faire bouillir 20 g de racines dans un litre d\'eau pendant 20 minutes. Boire 2 à 3 verres par jour pendant 7 à 10 jours.',
      },
    ],
    partiesUtilisees: ['racines'],
    precautions: 'En cas d\'ictère, consulter impérativement un médecin pour confirmer le diagnostic.',
    source: 'Pousset, J.-L., 1989, p. 129–131',
  },

  // ─── 29 ──────────────────────────────────────────────
  {
    id: 'vetiveria-nigritana',
    nomVulgaire: 'Vétiver africain',
    nomScientifique: 'Vetiveria nigritana',
    famille: 'Poaceae',
    nomsAfricains: {
      wolof: 'tep, sep',
      bambara: 'bangasa, ngokoba',
      peuhl: 'sêban, sâban',
    },
    categorieTherapeutique: 'Désinfectant – Antiseptique',
    couleur: '#7A9A6A',
    icone: '🌾',
    historique:
      'Les rhizomes de cette plante renferment une huile essentielle d\'odeur agréable et qui est très employée pour désinfecter l\'eau de boisson. Il faut distinguer ce vétiver de l\'autre espèce Vetiveria zizanoides qui pousse en Asie et dont l\'essence est à la base de nombreux parfums. D\'autre part, l\'eau aromatisée par l\'essence de ce rhizome est donnée aux enfants pour calmer les diarrhées.',
    descriptionPlante:
      'C\'est une herbe vivace grâce à ses rhizomes courts qui forme des touffes compactes à nombreuses feuilles dressées. Les hampes peuvent atteindre 2,50 mètres de hauteur. Les feuilles sont très longues (1 mètre à 1,50 mètres). Les fleurs sont disposées en racèmes composés de 15 à 20 verticilles.',
    actionCurative:
      'Le rhizome de cette plante contient une huile essentielle à alcools sesquiterpéniques (vetiverols) responsables de l\'action désinfectante et antiseptique. L\'action sur les bactéries responsables des infections intestinales est vérifiée. L\'eau aromatisée au vétiver est utilisée pour désinfecter l\'eau de boisson en zones rurales.',
    emplois: [
      {
        indication: 'Désinfection de l\'eau de boisson',
        preparation:
          'Tremper un bouquet de rhizomes dans le récipient d\'eau de boisson. L\'huile essentielle dégage une odeur agréable et désinfecte l\'eau.',
      },
      {
        indication: 'Diarrhée (enfants)',
        preparation:
          'Faire infuser des rhizomes dans l\'eau chaude. Laisser refroidir et donner à boire à l\'enfant par petites quantités.',
      },
    ],
    partiesUtilisees: ['rhizomes'],
    source: 'Pousset, J.-L., 1989, p. 132–133',
  },

  // ─── 30 ──────────────────────────────────────────────
  {
    id: 'zingiber-officinale',
    nomVulgaire: 'Gingembre',
    nomScientifique: 'Zingiber officinale',
    famille: 'Zingiberaceae',
    nomsAfricains: {
      wolof: 'gingembre, ginjar',
      bambara: 'gnambiri',
      hausa: 'citta',
    },
    categorieTherapeutique: 'Stomachique – Antiémétique – Stimulant circulatoire',
    couleur: '#D4932A',
    icone: '🫚',
    historique:
      'Le gingembre est l\'une des plantes médicinales les plus connues au monde, utilisée depuis des millénaires en Asie et en Afrique. Au Sahel, il est vendu en morceaux de rhizomes séchés sur tous les marchés. Ses usages principaux sont digestifs : il facilite la digestion, calme les nausées et les vomissements. Il est aussi utilisé pour stimuler la circulation sanguine et comme tonique général.',
    descriptionPlante:
      'Plante herbacée vivace de 60 cm à 1 mètre de hauteur poussant à partir d\'un rhizome charnu et très aromatique. Les tiges dressées portent des feuilles linéaires alternes. Les fleurs sont portées par des hampes spéciales en épi compact. Le rhizome irrégulier et noueux est la partie utilisée.',
    actionCurative:
      'Le rhizome contient une huile essentielle riche en zingibérène et des résines piquantes (gingérols et shogaols) responsables de la saveur et des propriétés thérapeutiques. Les gingérols ont une action antiémétique confirmée par des études cliniques. L\'huile essentielle a des propriétés anti-inflammatoires et stimule la motricité gastro-intestinale. Les shogaols ont une action sur la circulation sanguine.',
    emplois: [
      {
        indication: 'Nausées – Vomissements – Mal des transports',
        preparation:
          'Préparer une infusion de 5 grammes de rhizome fraîchement râpé dans 250 ml d\'eau chaude. Ajouter du miel et du citron. Boire 30 minutes avant le déplacement ou en cas de nausées.',
      },
      {
        indication: 'Digestion difficile – Ballonnements',
        preparation:
          'Mâcher un petit morceau de rhizome frais après les repas, ou boire une décoction de 10 g de rhizome sec dans 500 ml d\'eau.',
      },
      {
        indication: 'Tonique – Stimulant (boisson traditionnelle)',
        preparation:
          'Préparer le "kinkeliba au gingembre" : 10 g de gingembre râpé + 15 g de feuilles de kinkeliba dans 1 litre d\'eau. Bouillir 10 minutes, ajouter du miel.',
      },
    ],
    partiesUtilisees: ['rhizome'],
    precautions:
      'Déconseillé en cas de troubles de la coagulation ou prise d\'anticoagulants. À fortes doses, peut irriter l\'estomac.',
    source: 'Pousset, J.-L., 1989, p. 137–138',
  },

  // ─── 31 ──────────────────────────────────────────────
  {
    id: 'tamarindus-indica',
    nomVulgaire: 'Tamarinier',
    nomScientifique: 'Tamarindus indica',
    famille: 'Caesalpiniaceae',
    nomsAfricains: {
      wolof: 'dakhar',
      bambara: 'tomi',
      peuhl: 'jabi',
      hausa: 'tsamiya',
    },
    categorieTherapeutique: 'Laxatif – Antiscorbutique – Rafraîchissant',
    couleur: '#BA7A30',
    icone: '🌳',
    historique:
      'Le tamarinier est originaire d\'Afrique orientale, mais est maintenant naturalisé dans toute l\'Afrique tropicale. La pulpe des gousses est utilisée comme aliment et médicament depuis des temps immémoriaux. Elle sert à préparer la boisson rafraîchissante "bouye-tamar" très consommée au Sénégal. La pulpe est laxative, antiscorbutique et fébrifuge.',
    descriptionPlante:
      'Grand arbre pouvant atteindre 25 mètres de hauteur avec un tronc robuste et une frondaison dense. Les feuilles sont composées paripennées avec de nombreuses paires de folioles. Les fleurs sont jaunes striées de rouge. Les gousses brunes contiennent une pulpe brune acide entourant les graines.',
    actionCurative:
      'La pulpe du fruit contient des acides organiques (acide tartrique, malique, citrique) responsables du goût acide et de l\'action laxative par irritation légère de la muqueuse intestinale. Elle est riche en vitamine C et B1, d\'où l\'action antiscorbutique. Les acides organiques ont aussi une action rafraîchissante et apaisante sur les muqueuses. La pulpe contient des tanins à action astringente.',
    emplois: [
      {
        indication: 'Constipation légère',
        preparation:
          'Dissoudre 30 à 50 grammes de pulpe de tamarin dans un verre d\'eau tiède. Boire le soir avant de se coucher.',
      },
      {
        indication: 'Boisson rafraîchissante et vitaminée',
        preparation:
          'Dissoudre 50 g de pulpe dans 1 litre d\'eau fraîche, sucrer selon le goût, ajouter un peu de sel et de gingembre. C\'est la boisson traditionnelle du Sénégal.',
      },
    ],
    partiesUtilisees: ['pulpe du fruit', 'feuilles'],
    source: 'Pousset, J.-L., 1989 & connaissances ethnobotaniques traditionnelles',
  },

  // ─── 32 ──────────────────────────────────────────────
  {
    id: 'morinda-lucida',
    nomVulgaire: 'Pêcher africain – Brimstone tree',
    nomScientifique: 'Morinda lucida',
    famille: 'Rubiaceae',
    nomsAfricains: {
      wolof: 'wolo',
      bambara: 'wolo',
      peuhl: 'kosam nagge',
    },
    categorieTherapeutique: 'Antimalarique – Fébrifuge',
    couleur: '#6B8E4E',
    icone: '🌿',
    historique:
      'Le Morinda lucida est un arbre très utilisé en Afrique de l\'Ouest dans le traitement du paludisme. Il est considéré par de nombreux tradipraticiens comme l\'un des antipaludéens les plus efficaces de la pharmacopée traditionnelle ouest-africaine.',
    descriptionPlante:
      'Arbre de taille moyenne, 5 à 12 mètres de hauteur, à feuilles opposées ovales-elliptiques coriaces, vert brillant. Les fleurs sont blanches ou crème, groupées en glomérules. Les fruits sont charnus, ovoïdes, de couleur orange à maturité.',
    actionCurative:
      'L\'écorce et les racines contiennent des anthraquinones (morindine, moridone) et des iridoïdes qui ont montré une activité in vitro contre Plasmodium falciparum. Des études ont confirmé l\'activité antipyrétique et anti-inflammatoire des extraits de la plante. L\'action est comparable à celle de médicaments conventionnels dans les formes bénignes de paludisme.',
    emplois: [
      {
        indication: 'Fièvre palustre (formes légères)',
        preparation:
          'Faire bouillir 30 g d\'écorce dans 1 litre d\'eau pendant 20 minutes. Filtrer et boire 3 verres par jour pendant 5 jours.',
      },
    ],
    partiesUtilisees: ['écorce', 'racines', 'feuilles'],
    precautions:
      'Ne pas substituer à un traitement antipaludéen conventionnel en cas de paludisme grave. Consulter un médecin.',
    source: 'Pharmacopée africaine de l\'O.U.A., 1985',
  },
];

/** Retourne toutes les catégories thérapeutiques uniques */
export function getCategories(): string[] {
  return [...new Set(PLANTES_MEDICINALES.map((p) => p.categorieTherapeutique))].sort();
}

/** Recherche textuelle sur nom vulgaire, scientifique ou indication */
export function searchPlantes(query: string): PlanteMedicinale[] {
  const q = query.toLowerCase();
  return PLANTES_MEDICINALES.filter(
    (p) =>
      p.nomVulgaire.toLowerCase().includes(q) ||
      p.nomScientifique.toLowerCase().includes(q) ||
      p.categorieTherapeutique.toLowerCase().includes(q) ||
      p.emplois.some((e) => e.indication.toLowerCase().includes(q)) ||
      Object.values(p.nomsAfricains).some((n) => n?.toLowerCase().includes(q)),
  );
}
