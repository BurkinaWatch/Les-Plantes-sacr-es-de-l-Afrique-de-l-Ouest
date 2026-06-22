export type AnimalCategorie =
  | 'Mammifères'
  | 'Oiseaux'
  | 'Reptiles'
  | 'Amphibiens'
  | 'Aquatiques'
  | 'Invertébrés';

export type Element = 'Feu' | 'Eau' | 'Terre' | 'Air';

export interface Animal {
  id: string;
  nom: string;
  nomAnglais: string;
  nomScientifique: string;
  categorie: AnimalCategorie;
  element: Element;
  description: string;
  symboliqueAfricaine: string;
  symboliqueSpirirtuelle: string;
  /** kept for backward compat — same as symboliqueAfricaine */
  symbolique: string;
  qualites: string[];
  defauts: string[];
  pouvoirs: string[];
  enseignements: string[];
  citation: string;
  proverbes: string[];
  legendes: string[];
  conseilsDeVie: string[];
  niveauSpirituel: number;
  regionOrigine: string;
  couleur: string;
  couleurSecondaire: string;
  enseignementDuJour: string;
}

export const ANIMALS: Animal[] = [

  /* ═══════════════════════════════════════════════════════════
     ANIMAUX ORIGINAUX (15)
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'lion',
    nom: 'Lion',
    nomAnglais: 'Lion',
    nomScientifique: 'Panthera leo',
    categorie: 'Mammifères',
    element: 'Feu',
    description:
      "Le Lion est le roi des animaux sacrés d'Afrique de l'Ouest, maître de la savane et porteur de la flamme solaire. Symbole de l'autorité divine, il est le gardien des chefs et des rois dans les traditions akan et yoruba.",
    symboliqueAfricaine:
      "Dans les royaumes akan et yoruba, le Lion est l'emblème royal par excellence — son rugissement ouvre les cérémonies d'intronisation. Les chasseurs dogon portaient sa peau pour absorber sa bravoure, et les griots chantaient ses louanges pour insuffler le courage aux guerriers.",
    symboliqueSpirirtuelle:
      "Gardien de la flamme solaire, le Lion symbolise l'autorité spirituelle exercée avec justice : le roi-prêtre qui sert avant de régner, le leader qui brûle de l'intérieur pour guider les autres vers la lumière.",
    symbolique: "Symbole de royauté, de justice divine et d'énergie solaire. Autorité légitime au service du peuple.",
    qualites: ['Leadership naturel', 'Courage inébranlable', 'Générosité royale', 'Loyauté profonde', 'Vision claire'],
    defauts: ['Orgueil excessif', 'Impatience', 'Dominance oppressive', 'Difficulté à déléguer'],
    pouvoirs: ['Pouvoir royal du soleil', "Énergie solaire et féminine", 'Leadership', 'Courage et noblesse'],
    enseignements: [
      "Le vrai chef sert avant de régner",
      "Le courage n'est pas l'absence de peur, mais l'action malgré elle",
      "La force sans sagesse détruit ; avec sagesse, elle édifie",
      "Ton rugissement intérieur peut changer le cours des événements",
    ],
    citation: "Un lion ne se retourne pas chaque fois qu'un chien aboie.",
    proverbes: [
      "Un lion ne se retourne pas chaque fois qu'un chien aboie.",
      "Le lion qui rugit le plus fort n'est pas toujours celui qui chasse.",
      "Même le lion s'incline devant sa mère.",
      "La force du lion est dans son calme, pas dans son rugissement.",
    ],
    legendes: [
      "Selon la tradition akan, le premier roi Asante fut guidé par un lion doré qui lui indiqua l'emplacement de la capitale. Il disparut au lever du soleil, laissant une empreinte dorée — le premier tambour sacré fut sculpté dans le bois de l'arbre marqué.",
      "Les Mandingues racontent qu'un chasseur perdu pendant sept jours fut guidé par un lion qui lui enseigna les chemins étoilés. Ses descendants portent le nom de Kouyaté — 'celui que le lion a sauvé'.",
    ],
    conseilsDeVie: [
      "Assume ta place avec dignité — l'humilité du lion n'est pas la timidité, c'est la maîtrise.",
      "Avant de rugir, observe. Le timing de ton intervention est ta vraie puissance.",
      "Entoure-toi de ceux qui t'élèvent — même le lion a besoin de sa troupe.",
      "Ne laisse pas ta fierté t'empêcher de demander de l'aide.",
    ],
    niveauSpirituel: 5,
    regionOrigine: "Savane d'Afrique de l'Ouest",
    couleur: '#D4A017',
    couleurSecondaire: '#8B6914',
    enseignementDuJour:
      "Aujourd'hui, assume pleinement ta place. Le monde a besoin de ta lumière — ne te ratatine pas pour faire plaisir.",
  },

  {
    id: 'elephant',
    nom: 'Éléphant',
    nomAnglais: 'Elephant',
    nomScientifique: 'Loxodonta africana',
    categorie: 'Mammifères',
    element: 'Terre',
    description:
      "L'Éléphant est la bibliothèque vivante des traditions, gardien de la mémoire ancestrale. Dans toutes les cosmogonies d'Afrique de l'Ouest, il est l'animal de la sagesse intergénérationnelle.",
    symboliqueAfricaine:
      "Chez les Ashanti, l'éléphant est le symbole du chef suprême — l'Asantehene. Ses défenses ornaient les maisons sacrées. Un éléphant mort devenait ancêtre protecteur du village.",
    symboliqueSpirirtuelle:
      "L'Éléphant incarne l'Akasha — le registre universel où tout souvenir est préservé. Il représente le chemin de l'éveil par la mémoire, le respect des origines et la responsabilité envers les générations futures.",
    symbolique: "Symbole de sagesse, de mémoire collective et de justice sociale.",
    qualites: ['Sagesse profonde', 'Mémoire infaillible', 'Patience exceptionnelle', 'Loyauté absolue', 'Solidarité'],
    defauts: ['Rumination du passé', 'Résistance au changement', 'Lenteur décisionnelle', 'Rancune tenace'],
    pouvoirs: ["Pouvoir d'apprentissage", 'Sagesse et mémoire', 'Responsabilité et respect', 'Champion de la justice'],
    enseignements: [
      "La vraie sagesse honore ceux qui sont venus avant toi",
      "La mémoire collective est le trésor de ton peuple",
      "Prends soin des plus faibles — c'est la mesure d'une grande âme",
      "La patience de l'éléphant lui permet de traverser les déserts",
    ],
    citation: "Si tu veux aller vite, marche seul. Si tu veux aller loin, marche ensemble.",
    proverbes: [
      "Si tu veux aller vite, marche seul. Si tu veux aller loin, marche ensemble.",
      "L'éléphant ne trébuche pas sur ce qu'il a déjà vu.",
      "Quand l'éléphant marche, la forêt se souvient de son passage.",
      "La mort d'un ancêtre n'est pas une fin — c'est un éléphant qui change de troupeau.",
    ],
    legendes: [
      "La légende bambara raconte que lors de la grande sécheresse, l'Éléphant marcha trois jours sans boire, creusa avec ses défenses une source profonde et la partagea avec tous. Depuis, les puits sacrés du Mali portent son empreinte dans la pierre.",
    ],
    conseilsDeVie: [
      "Cultive ta mémoire comme un jardin — ce que tu retiens fait ce que tu es.",
      "Marche lentement mais sûrement ; la précipitation est l'ennemie de la profondeur.",
      "Honore tes ancêtres : leurs erreurs t'ont épargné, leurs victoires t'ont construit.",
    ],
    niveauSpirituel: 5,
    regionOrigine: 'Forêts et savanes du Sahel',
    couleur: '#5C7A3E',
    couleurSecondaire: '#3D5229',
    enseignementDuJour:
      "Aujourd'hui, prends un moment pour honorer ceux qui t'ont précédé. Leur sagesse vit en toi.",
  },

  {
    id: 'leopard',
    nom: 'Léopard',
    nomAnglais: 'Leopard',
    nomScientifique: 'Panthera pardus',
    categorie: 'Mammifères',
    element: 'Air',
    description:
      "Le Léopard est le maître de l'équilibre entre les mondes. Ni totalement de jour ni de nuit, il traverse les frontières invisibles avec une grâce inégalée.",
    symboliqueAfricaine:
      "Au Bénin, la société secrète Ekpe (Léopard) était l'institution judiciaire suprême. La peau de léopard était posée sur les trônes royaux comme symbole d'équité et d'initiation.",
    symboliqueSpirirtuelle:
      "Le Léopard représente l'initiation : la capacité à mourir à ce qu'on était et renaître en quelque chose de plus précis, de plus puissant. Il enseigne l'art de l'action parfaite.",
    symbolique: "Symbole d'équilibre parfait, de dualité maîtrisée et d'action précise.",
    qualites: ["Précision dans l'action", 'Grâce naturelle', "Maîtrise de l'équilibre", 'Pensées cachées', 'Protection silencieuse'],
    defauts: ["Tendance à l'isolement", 'Froideur émotionnelle', 'Perfectionnisme paralysant', 'Méfiance chronique'],
    pouvoirs: ['Pouvoir de balance et patience', 'Timing et action décisive', 'Pouvoir du silence', 'Pensées cachées et protection'],
    enseignements: [
      "L'équilibre n'est pas l'absence de mouvement, c'est le mouvement parfait",
      "Observe longuement avant d'agir — la précision vaut mieux que la hâte",
      "Tu peux être doux et puissant à la fois",
      "La nuit te révèle ce que le jour te cache",
    ],
    citation: "Le léopard ne change pas ses taches, mais il choisit quand les montrer.",
    proverbes: [
      "Le léopard ne change pas ses taches, mais il choisit quand les montrer.",
      "Là où le léopard a passé, les feuilles gardent le secret.",
      "Le léopard ne mange jamais deux fois au même endroit.",
    ],
    legendes: [
      "La tradition Poro des peuples Mende raconte que le premier Léopard reçut du dieu créateur la mission d'initier les hommes aux mystères. Il enseigna la fabrication des masques, les rythmes sacrés et la loi secrète — puis disparut dans la forêt, laissant sa forme imprimée dans l'argile sacrée.",
    ],
    conseilsDeVie: [
      "Développe l'art du timing — la bonne action au mauvais moment n'est qu'un geste raté.",
      "Laisse entrer ceux qui méritent de voir tes vulnérabilités.",
      "La perfection que tu cherches existe déjà en toi — arrête de la fuir.",
    ],
    niveauSpirituel: 4,
    regionOrigine: 'Forêts sacrées de Casamance',
    couleur: '#C4622D',
    couleurSecondaire: '#8B3D1A',
    enseignementDuJour:
      "Aujourd'hui, identifie le moment parfait pour agir. L'efficacité vient de la justesse du timing.",
  },

  {
    id: 'crocodile',
    nom: 'Crocodile',
    nomAnglais: 'Nile Crocodile',
    nomScientifique: 'Crocodylus niloticus',
    categorie: 'Reptiles',
    element: 'Eau',
    description:
      "Le Crocodile est le gardien du seuil entre la vie et la mort. Présent dans les traditions vodou et bamana, il est le dépositaire des mystères les plus profonds des eaux sacrées.",
    symboliqueAfricaine:
      "À Djenné, les crocodiles sacrés du lac Antogo sont vénérés depuis des siècles. Les femmes souhaitant une grossesse leur apportent des offrandes. Au Bénin, ils habitent les palais royaux comme protecteurs.",
    symboliqueSpirirtuelle:
      "Le Crocodile incarne la conscience primordiale. Ses yeux au-dessus de l'eau symbolisent la conscience qui observe sans être vue. Il garde le passage entre ce monde et l'autre.",
    symbolique: "Symbole de la double nature de l'existence : vie et mort, passé et futur.",
    qualites: ['Vision mystique', 'Patience absolue', 'Connaissance de la vie et de la mort', 'Sagesse profonde'],
    defauts: ['Méfiance excessive', 'Immobilisme', "Difficulté à s'ouvrir", 'Isolement mystique'],
    pouvoirs: ['Pouvoir de la vie et de la mort', 'Pouvoir de la connaissance et de la sagesse', 'Vision mystique', 'Sagesse des abysses'],
    enseignements: [
      "Ce qui dort dans les profondeurs se réveillera au bon moment",
      "Vois au-delà de ce que les yeux montrent",
      "Tout cycle de mort prépare un cycle de renaissance",
      "Les eaux calmes cachent les plus grands pouvoirs",
    ],
    citation: "Les eaux profondes ne font pas de bruit.",
    proverbes: [
      "Les eaux profondes ne font pas de bruit.",
      "Le crocodile ne mourra jamais dans une eau qu'il connaît.",
      "Ne provoque pas le crocodile avant d'avoir traversé la rivière.",
    ],
    legendes: [
      "La légende fon du Bénin raconte que Mawu-Lisa confia au Crocodile la garde des âmes en transit entre la mort et la renaissance. Les âmes méritantes traversaient le fleuve sur son dos.",
    ],
    conseilsDeVie: [
      "Développe ta capacité à attendre sans t'impatienter — le bon moment arrive toujours.",
      "Plonge dans tes peurs les plus profondes ; c'est là que réside ta plus grande force.",
      "Ne laisse pas ta profondeur t'isoler — ouvre de temps en temps la surface.",
    ],
    niveauSpirituel: 4,
    regionOrigine: 'Fleuves sacrés du Niger et du Sénégal',
    couleur: '#2E7D6B',
    couleurSecondaire: '#1A4D40',
    enseignementDuJour:
      "Aujourd'hui, descends dans tes profondeurs. La réponse que tu cherches n'est pas en surface.",
  },

  {
    id: 'aigle',
    nom: 'Aigle',
    nomAnglais: 'Tawny Eagle',
    nomScientifique: 'Aquila rapax',
    categorie: 'Oiseaux',
    element: 'Air',
    description:
      "L'Aigle est le messager entre la terre et le ciel, porteur des prières vers les ancêtres. Dans la cosmologie mandingue et peule, il ramène les réponses divines sur ses ailes.",
    symboliqueAfricaine:
      "Dans les royaumes sahéliens, l'Aigle de Tombouctou était l'emblème des rois savants. Les marabouts portaient des plumes d'aigle dans leurs coiffes cérémonielles pour recevoir les messages célestes.",
    symboliqueSpirirtuelle:
      "L'Aigle incarne le troisième œil ouvert — la vision qui dépasse le temps et l'espace. Il est le guide des âmes lors des voyages initiatiques et le messager des visions prophétiques.",
    symbolique: "Symbole de vision transcendante, de liberté spirituelle et de connexion divine.",
    qualites: ['Vision transcendante', 'Liberté intérieure', 'Intelligence stratégique', 'Clarté prophétique'],
    defauts: ['Détachement excessif', "Difficulté à s'ancrer", 'Impatience envers la lenteur', 'Arrogance intellectuelle'],
    pouvoirs: ['Vision divine', 'Liberté', 'Élévation spirituelle', 'Messager céleste'],
    enseignements: [
      "Élève ta vision au-delà des conflits du quotidien",
      "La liberté véritable commence dans l'esprit",
      "Porte tes intentions vers le ciel — elles reviendront transformées",
      "De la hauteur, tous les chemins deviennent clairs",
    ],
    citation: "L'aigle ne chasse pas les mouches.",
    proverbes: [
      "L'aigle ne chasse pas les mouches.",
      "L'aigle qui vole haut voit ce que le chacal ne peut qu'imaginer.",
      "L'aigle vole seul, les corneilles en bandes — choisis ta compagnie selon ton âme.",
    ],
    legendes: [
      "La légende peule raconte que Gueno envoya un Aigle portant dans ses serres les quatre premiers grains de mil. Il les sema aux quatre coins de la savane — ainsi naquit l'agriculture sacrée.",
    ],
    conseilsDeVie: [
      "Prends de la hauteur régulièrement — zoom arrière sur ta vie pour voir le dessin complet.",
      "Ta liberté ne doit pas devenir une fuite — apprends à atterrir et à te laisser toucher.",
      "Les visions prophétiques sont un don — partage-les avec discernement.",
    ],
    niveauSpirituel: 5,
    regionOrigine: 'Montagnes du Fouta Djalon',
    couleur: '#4A6FA5',
    couleurSecondaire: '#2C4566',
    enseignementDuJour:
      "Aujourd'hui, prends de la hauteur sur tes préoccupations. La perspective change tout.",
  },

  {
    id: 'serpent',
    nom: 'Serpent',
    nomAnglais: 'Royal Python',
    nomScientifique: 'Python regius',
    categorie: 'Reptiles',
    element: 'Terre',
    description:
      "Le Serpent est l'être de la transformation perpétuelle. Dans le Dahomey, Danbala — le grand serpent arc-en-ciel — est l'une des divinités primordiales qui maintient l'équilibre du monde.",
    symboliqueAfricaine:
      "Au Dahomey, le temple des Pythons à Ouidah abrite des centaines de serpents sacrés. À Abomey, le roi portait une ceinture de peau de serpent lors du couronnement. Tuer un python sacré était un crime capital.",
    symboliqueSpirirtuelle:
      "Danbala représente la sagesse primordiale d'avant les mots. Le Serpent symbolise la kundalini africaine : l'énergie vitale qui monte de la terre à travers l'être pour atteindre la conscience divine.",
    symbolique: "Symbole de renaissance, de transformation et de sagesse cyclique.",
    qualites: ['Transformation profonde', 'Sagesse de guérison', 'Intuition aiguë', 'Ambition éclairée', 'Connaissance des rêves'],
    defauts: ['Instabilité identitaire', 'Tendance à manipuler', "Difficulté à s'engager", 'Fuite du passé'],
    pouvoirs: ['Sagesse et intuition', 'Compréhension et transformation', 'Guérison et plénitude', 'Ambition, intellect et rêves'],
    enseignements: [
      "Mue régulièrement — lâche ce qui ne te sert plus",
      "La guérison passe par la transformation",
      "Sinue plutôt que d'affronter — l'intelligence des voies indirectes",
      "Chaque fin est le début d'une nouvelle vie",
    ],
    citation: "Le serpent ne se brise pas sur les rochers — il les contourne.",
    proverbes: [
      "Le serpent ne se brise pas sur les rochers — il les contourne.",
      "Le serpent qui mue vit plus longtemps que celui qui résiste.",
      "Le serpent arc-en-ciel unit la terre et le ciel — sans lui, la pluie ne viendrait plus.",
    ],
    legendes: [
      "La grande légende vodou fon raconte que Danbala et Ayida Wedo formèrent l'univers en s'enroulant l'un autour de l'autre. Leurs 3500 anneaux créèrent les montagnes, leurs ondulations formèrent les rivières.",
    ],
    conseilsDeVie: [
      "Identifie les peaux usées que tu portes encore — croyances, relations, identités périmées.",
      "Utilise les voies indirectes quand les frontales sont bloquées — ce n'est pas de la lâcheté.",
      "La guérison que tu apportes aux autres commence par la tienne.",
    ],
    niveauSpirituel: 4,
    regionOrigine: 'Royaume du Dahomey',
    couleur: '#7B4FA5',
    couleurSecondaire: '#4D2E66',
    enseignementDuJour:
      "Aujourd'hui, libère-toi d'une vieille peau. Qu'est-ce que tu peux enfin laisser derrière toi ?",
  },

  {
    id: 'grenouille',
    nom: 'Grenouille',
    nomAnglais: 'Reed Frog',
    nomScientifique: 'Hyperolius viridiflavus',
    categorie: 'Amphibiens',
    element: 'Eau',
    description:
      "La Grenouille est le symbole de la transformation entre les mondes. Elle traverse les règnes de l'eau et de la terre, associée aux rites de passage et à la parole créatrice.",
    symboliqueAfricaine:
      "Dans les traditions bambara, la grenouille est sculptée sur les masques de pluie. Son chant annonce la saison des pluies. Au Bénin, ses représentations en bronze ornent les autels des guérisseurs.",
    symboliqueSpirirtuelle:
      "La Grenouille est l'être de la métamorphose complète : de l'œuf au têtard à l'adulte, elle traverse trois états d'être distincts. Son chant sacré appelle la transformation et la communication.",
    symbolique: "Symbole de transformation, de communication sacrée et de guérison émotionnelle.",
    qualites: ['Communication sacrée', 'Transformation et purification', 'Guérison émotionnelle', 'Adaptabilité', 'Fertilité'],
    defauts: ['Hypersensibilité', 'Instabilité émotionnelle', 'Tendance à la dispersion'],
    pouvoirs: ["Pouvoir de l'eau et de la transformation", 'Purification et guérison', 'Communication et paix', 'Guérison émotionnelle'],
    enseignements: [
      "Chaque saut est une transformation — n'aie pas peur du vide entre les deux",
      "Ta voix a le pouvoir de changer l'atmosphère autour de toi",
      "Les émotions sont de l'eau — laisse-les couler, pas stagner",
      "L'adaptabilité est la clé de la survie et de l'épanouissement",
    ],
    citation: "La grenouille ne se décourage pas parce que la mare est petite.",
    proverbes: [
      "La grenouille ne se décourage pas parce que la mare est petite.",
      "La grenouille sait que la pluie arrive avant que les humains ne la voient.",
      "Même la grenouille qui vit dans un puits connaît le ciel.",
    ],
    legendes: [
      "La tradition bambara raconte que lors de la grande sécheresse de sept ans, les grenouilles disparurent et la pluie avec elles. Un devin organisa une grande cérémonie de purification — quand les grenouilles chantèrent à nouveau, la pluie revint dès le lendemain.",
    ],
    conseilsDeVie: [
      "Exprime-toi — ta voix unique est une contribution irremplaçable.",
      "Prends soin de ton monde émotionnel comme d'un écosystème fragile.",
      "Les petits espaces peuvent contenir de grandes sagesses — honore ta mare actuelle.",
    ],
    niveauSpirituel: 3,
    regionOrigine: 'Zones humides du Mali et du Burkina Faso',
    couleur: '#3D7A5C',
    couleurSecondaire: '#254D3A',
    enseignementDuJour:
      "Aujourd'hui, ose le saut. La transformation que tu attends te demande de quitter ta mare actuelle.",
  },

  {
    id: 'hippopotame',
    nom: 'Hippopotame',
    nomAnglais: 'Hippopotamus',
    nomScientifique: 'Hippopotamus amphibius',
    categorie: 'Aquatiques',
    element: 'Eau',
    description:
      "L'Hippopotame est la force tranquille des eaux sacrées. Chercheur de vérité, il voit au-delà des surfaces et incarne une puissance phénoménale guidée par une sagesse profonde.",
    symboliqueAfricaine:
      "Les pêcheurs bozo du Mali lui font des offrandes avant chaque saison de pêche. Chez les Ashanti, la déesse du fleuve Tano est représentée avec la force d'une hippopotame.",
    symboliqueSpirirtuelle:
      "L'Hippopotame représente la force qui n'a pas besoin de se prouver. Il symbolise l'ancrage complet dans sa propre nature et la capacité à voir sous la surface des apparences.",
    symbolique: "Symbole de force tranquille, de vérité cachée et de protection maternelle.",
    qualites: ['Force tranquille', 'Vision sous la surface', "Recherche de la vérité", 'Autorité naturelle', 'Protection'],
    defauts: ['Agressivité imprévisible', 'Immobilisme défensif', 'Entêtement'],
    pouvoirs: ["Pouvoir de voir sous la surface", 'Chercheur de vérité', 'Intuition et transformation', 'Force tranquille'],
    enseignements: [
      "La vraie force n'a pas besoin de se prouver",
      "Protège ceux qui sont sous ta responsabilité avec détermination",
      "La paix intérieure est ta plus grande armure",
      "Va chercher la vérité là où les autres ne regardent pas",
    ],
    citation: "L'hippopotame ne craint pas l'eau qui est son royaume.",
    proverbes: [
      "L'hippopotame ne craint pas l'eau qui est son royaume.",
      "Quand l'hippopotame bâille, c'est le fleuve entier qui frémit.",
      "L'hippopotame dit : 'Je ne cours pas, mais rien ne me pousse.'",
    ],
    legendes: [
      "Les griots du Delta du Niger racontent qu'une femme stérile pria au bord du fleuve. Un hippopotame sortit de l'eau, lui souffla dans les oreilles et replongea. Neuf mois plus tard, elle donna naissance à des jumeaux.",
    ],
    conseilsDeVie: [
      "Connais la différence entre la vraie force et la violence — l'une protège, l'autre détruit.",
      "Cherche toujours la vérité sous les apparences — les surfaces mentent.",
      "Ancre-toi dans tes convictions profondes.",
    ],
    niveauSpirituel: 4,
    regionOrigine: 'Fleuves Volta et Niger',
    couleur: '#4A6A8A',
    couleurSecondaire: '#2C4057',
    enseignementDuJour:
      "Aujourd'hui, regarde sous la surface. La vérité que tu cherches est dans les profondeurs.",
  },

  {
    id: 'panthere',
    nom: 'Panthère',
    nomAnglais: 'Black Panther',
    nomScientifique: 'Panthera pardus melanotica',
    categorie: 'Mammifères',
    element: 'Terre',
    description:
      "La Panthère noire est l'être du mystère par excellence. Gardienne des secrets les plus profonds, elle traverse la nuit sans être vue et connaît les chemins invisibles.",
    symboliqueAfricaine:
      "Les masques Wé et Guéré aux yeux perçants représentent sa puissance. Seul le chasseur ayant tué une panthère pouvait porter certains colliers sacrés.",
    symboliqueSpirirtuelle:
      "La Panthère noire incarne la nuit cosmique — le mystère fécond d'où naît toute création. Elle représente l'initiation ultime : descendre dans la nuit de soi pour trouver sa propre lumière.",
    symbolique: "Symbole de puissance nocturne, d'intuition profonde et de mystère protecteur.",
    qualites: ['Intuition extraordinaire', 'Puissance silencieuse', 'Mystère magnétique', 'Protection invisible'],
    defauts: ['Inaccessibilité', 'Tendance à l\'hermétisme', "Difficulté à faire confiance"],
    pouvoirs: ['Puissance nocturne', 'Intuition', 'Mystère', 'Protection invisible'],
    enseignements: [
      "Tout ce qui est caché finit par se révéler au moment opportun",
      "L'obscurité n'est pas l'ennemi — elle est la mère de la lumière",
      "Fais confiance à ton instinct nocturne",
      "Les plus grandes forces travaillent dans l'ombre",
    ],
    citation: "La panthère ne révèle pas ses traces à ceux qui ne savent pas lire la forêt.",
    proverbes: [
      "La panthère ne révèle pas ses traces à ceux qui ne savent pas lire la forêt.",
      "Dans la nuit la plus noire, la panthère voit tout.",
      "Qui connaît les secrets de la panthère n'en parle jamais.",
    ],
    legendes: [
      "La tradition Wé de Côte d'Ivoire raconte que la Panthère noire fut créée pour garder les forêts sacrées. Elle patrouille les frontières entre les deux mondes et empêche les esprits errants de troubler les vivants.",
    ],
    conseilsDeVie: [
      "Embrasse ton mystère — tu n'as pas à tout expliquer de toi-même.",
      "Descends dans ta nuit intérieure avec curiosité, pas avec peur.",
      "Protège les autres avec ta force, mais sans les étouffer.",
    ],
    niveauSpirituel: 5,
    regionOrigine: "Forêts sacrées de Côte d'Ivoire",
    couleur: '#6B3FA0',
    couleurSecondaire: '#3D2060',
    enseignementDuJour:
      "Aujourd'hui, écoute tes intuitions les plus profondes. Elles te parlent d'un savoir que tu possèdes déjà.",
  },

  {
    id: 'cigogne',
    nom: 'Cigogne',
    nomAnglais: 'White Stork',
    nomScientifique: 'Ciconia ciconia',
    categorie: 'Oiseaux',
    element: 'Air',
    description:
      "La Cigogne est le grand messager des transitions. Elle annonce les saisons, les naissances et les retours. Son arrivée est un signe de bénédiction et de renouveau imminent.",
    symboliqueAfricaine:
      "Au Sénégal et au Mali, l'arrivée des cigognes marque le début de la saison des pluies. Les villages où elles nichent sont réputés bénis. Dans les traditions wolof, une cigogne sur un toit annonce une naissance heureuse.",
    symboliqueSpirirtuelle:
      "La Cigogne symbolise le voyage de l'âme entre les cycles de vie. Elle représente la fidélité au chemin de l'âme, la capacité à revenir à ses origines après les plus longs voyages.",
    symbolique: "Symbole de renouveau, de fidélité au foyer et de longévité.",
    qualites: ['Fidélité profonde', 'Sens de l\'orientation', 'Grâce en mouvement', 'Endurance migratoire'],
    defauts: ['Nostalgie paralysante', 'Idéalisation des origines', 'Rigidité des cycles'],
    pouvoirs: ['Renouveau', 'Longévité', 'Fidélité', 'Transition gracieuse'],
    enseignements: [
      "Voyage loin mais reviens toujours à tes racines",
      "Chaque retour enrichit ce qu'on a quitté",
      "Annonce le changement avec grâce",
      "La fidélité est une forme de sagesse",
    ],
    citation: "La cigogne revient toujours au nid qui l'a vu naître.",
    proverbes: [
      "La cigogne revient toujours au nid qui l'a vu naître.",
      "La cigogne qui voyage loin revient avec plus de sagesse que celle qui reste.",
      "La cigogne ne demande pas la permission du vent — elle le lit et l'utilise.",
    ],
    legendes: [
      "La légende wolof raconte qu'un jeune homme perdu en mer fut guidé par une cigogne vers une île aux pierres précieuses. Quand il rentra chez lui, la cigogne nidifiait déjà sur le toit de sa maison natale.",
    ],
    conseilsDeVie: [
      "N'aie pas peur des grands voyages — ils te ramèneront à toi-même, enrichi.",
      "Honore tes origines sans y être prisonnier.",
      "La grâce dans les transitions est une compétence — cultive-la.",
    ],
    niveauSpirituel: 3,
    regionOrigine: 'Plaines du Sahel et du Sénégal',
    couleur: '#A08060',
    couleurSecondaire: '#6B503A',
    enseignementDuJour:
      "Aujourd'hui, reconnecte-toi à tes origines. D'où viens-tu et où retournes-tu ?",
  },

  {
    id: 'tortue',
    nom: 'Tortue',
    nomAnglais: 'African Forest Tortoise',
    nomScientifique: 'Kinixys erosa',
    categorie: 'Reptiles',
    element: 'Terre',
    description:
      "La Tortue est l'ancêtre de la patience et de la sagesse accumulée. Dans les contes d'Afrique de l'Ouest, Tortue est toujours la plus rusée malgré sa lenteur apparente.",
    symboliqueAfricaine:
      "Dans les contes akan, yoruba et igbo, la Tortue Mbe bat systématiquement les animaux plus forts grâce à son intelligence. Sa carapace est utilisée comme instrument de musique sacré.",
    symboliqueSpirirtuelle:
      "La Tortue porte le monde sur son dos dans de nombreuses cosmogonies africaines. Elle représente l'être qui a trouvé son centre de gravité intérieur — son chez-soi qu'il porte partout.",
    symbolique: "Symbole d'endurance, de sagesse ancienne et de protection par la carapace intérieure.",
    qualites: ['Énergie vitale', 'Auto-protection et survie', 'Connaissance intérieure', 'Patience légendaire', 'Retrait sage'],
    defauts: ['Rigidité excessive', 'Lenteur en urgence', 'Repli excessif'],
    pouvoirs: ["Pouvoir d'énergie", 'Auto-protection et survie', 'Connaissance intérieure et patience', 'Pouvoir de retrait'],
    enseignements: [
      "La lenteur n'est pas la faiblesse — c'est la profondeur",
      "Ta carapace intérieure est ta vraie protection",
      "L'intelligence rusée vaut mieux que la force brute",
      "Porte ton chez-toi avec toi — tu n'as pas besoin de l'approbation des autres",
    ],
    citation: "Peu à peu, l'oiseau fait son nid.",
    proverbes: [
      "Peu à peu, l'oiseau fait son nid.",
      "La tortue arrive toujours à destination — parce qu'elle ne s'arrête jamais.",
      "La tortue dit : 'Ma maison est mon armure et mon armure est ma maison.'",
    ],
    legendes: [
      "Le conte akan raconte que lors du grand concours des animaux pour garder la sagesse, la Tortue marcha seule sans s'arrêter. Quand elle arriva au sommet trois jours après les autres, les autres animaux étaient épuisés et partis. Elle seule avait atteint le but — les dieux lui confièrent la sagesse.",
    ],
    conseilsDeVie: [
      "Résiste à la pression de t'adapter au rythme des autres — ton rythme est ta force.",
      "La persévérance tranquille accomplit ce que l'agitation brillante ne fait que promettre.",
      "Sache quand te retirer — le retrait sage est une force, pas une faiblesse.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Côtes et rivières d'Afrique de l'Ouest",
    couleur: '#7A8C3A',
    couleurSecondaire: '#4D5C1F',
    enseignementDuJour:
      "Aujourd'hui, avance à ton propre rythme. La comparaison avec les autres est l'ennemi de ta croissance.",
  },

  {
    id: 'cameleon',
    nom: 'Caméléon',
    nomAnglais: 'Graceful Chameleon',
    nomScientifique: 'Chamaeleo gracilis',
    categorie: 'Reptiles',
    element: 'Air',
    description:
      "Le Caméléon est le maître de l'adaptation. Dans les mythes d'Afrique de l'Ouest, c'est lui qui fut envoyé porter le message de la création aux hommes, mais il s'attarda trop en chemin.",
    symboliqueAfricaine:
      "Dans la tradition yoruba, Caméléon fut envoyé par Olodumare pour annoncer l'immortalité aux hommes — mais Lézard passa devant avec le message de la mortalité. C'est pourquoi les hommes meurent.",
    symboliqueSpirirtuelle:
      "Le Caméléon incarne l'art de la présence totale dans chaque contexte. Ses deux yeux indépendants symbolisent la double vision : voir simultanément le passé et le futur.",
    symbolique: "Symbole d'adaptabilité, d'observation totale et de discrétion intelligente.",
    qualites: ['Adaptabilité exceptionnelle', 'Observation totale', 'Intelligence sociale', 'Discrétion', 'Présence totale'],
    defauts: ['Instabilité identitaire', 'Manque d\'assertivité', 'Tendance au caméléonisme social'],
    pouvoirs: ['Adaptation', 'Observation totale', 'Discrétion', 'Flexibilité'],
    enseignements: [
      "Adapte-toi à l'environnement sans te perdre toi-même",
      "Observe avant de parler — deux yeux qui regardent dans des directions opposées voient tout",
      "La discrétion est une forme de puissance",
      "Changer de couleur n'est pas être faux — c'est être stratégique",
    ],
    citation: "Le caméléon ne change pas d'âme, seulement de robe.",
    proverbes: [
      "Le caméléon ne change pas d'âme, seulement de robe.",
      "Le caméléon voit devant et derrière — c'est pourquoi rien ne le surprend.",
      "Même le caméléon ne peut changer de couleur sur fond blanc.",
    ],
    legendes: [
      "Un roi voulait tester la loyauté de ses conseillers. Seul celui qui avait l'esprit du caméléon — s'adaptant à chaque village tout en préservant le message intact — revint avec les bonnes réponses. Le roi le nomma Grand Conseiller.",
    ],
    conseilsDeVie: [
      "L'adaptation est précieuse — mais assure-toi de savoir qui tu es quand tu enlèves tous tes masques.",
      "Développe l'art de lire les situations avant de réagir.",
      "Utilise ta vision à 360° pour anticiper et non pas pour éviter.",
    ],
    niveauSpirituel: 3,
    regionOrigine: 'Forêts tropicales du Togo et du Bénin',
    couleur: '#6B8C3A',
    couleurSecondaire: '#405522',
    enseignementDuJour:
      "Aujourd'hui, adapte ton approche sans changer ton essence. La souplesse est une forme d'intelligence.",
  },

  {
    id: 'vautour',
    nom: 'Vautour',
    nomAnglais: 'White-backed Vulture',
    nomScientifique: 'Gyps africanus',
    categorie: 'Oiseaux',
    element: 'Air',
    description:
      "Le Vautour est le grand purificateur sacré. Vénéré en Afrique de l'Ouest, il transforme la mort en vie et maintient l'équilibre des écosystèmes avec sa vision acérée.",
    symboliqueAfricaine:
      "Les devins zulu portent ses plumes pour 'voir ce que les autres ne voient pas'. Au Nigeria, son vol en cercle indique aux guérisseurs l'emplacement des herbes médicinales rares.",
    symboliqueSpirirtuelle:
      "Le Vautour incarne le courage de regarder en face ce que les autres fuient. Il est l'alchimiste qui transforme la mort en vie, les blessures en force.",
    symbolique: "Symbole de purification, de clairvoyance et de transformation de la mort en vie.",
    qualites: ['Courage de regarder en face', 'Transformation alchimique', 'Vision acérée', 'Discernement'],
    defauts: ['Attraction pour le morbide', 'Incompréhension sociale', "Difficulté à être léger"],
    pouvoirs: ['Purification', 'Clairvoyance', 'Transformation', 'Équilibre naturel'],
    enseignements: [
      "Regarde en face ce que les autres fuient",
      "La transformation commence dans les endroits que l'on évite",
      "Purifier son environnement est un acte sacré",
      "La hauteur de ta vision détermine la portée de ton action",
    ],
    citation: "Le vautour ne mange pas ce qui lui appartient, mais ce que la nature lui offre.",
    proverbes: [
      "Le vautour ne mange pas ce qui lui appartient, mais ce que la nature lui offre.",
      "Le vautour vole haut — c'est pourquoi il voit ce que les autres manquent.",
      "Ne méprise pas le vautour — sans lui, les maladies envahiraient la savane.",
    ],
    legendes: [
      "Un conte dogon raconte que lors de la grande épidémie, seul le Vautour restait. Il vola au ciel pour demander aux dieux comment purifier la terre. Ils lui enseignèrent la formule de transformation — il porte depuis dans son estomac le feu sacré qui neutralise tous les poisons.",
    ],
    conseilsDeVie: [
      "Fais face à tes ombres — ce que tu refuses de regarder te contrôle.",
      "Le travail ingrat mais nécessaire a une noblesse que le monde ne voit pas encore.",
      "Maintiens ta vision haute même quand tu travailles dans les zones difficiles.",
    ],
    niveauSpirituel: 3,
    regionOrigine: 'Savane du Sahel',
    couleur: '#8C6A3A',
    couleurSecondaire: '#5C4020',
    enseignementDuJour:
      "Aujourd'hui, purifie un espace dans ta vie. Le nettoyage est un acte de puissance.",
  },

  {
    id: 'poisson-chat',
    nom: 'Poisson-chat',
    nomAnglais: 'African Catfish',
    nomScientifique: 'Clarias gariepinus',
    categorie: 'Aquatiques',
    element: 'Eau',
    description:
      "Le Poisson-chat est le gardien des eaux profondes et de l'abondance cachée. Indépendant et intuitif, il prospère là où les autres échouent.",
    symboliqueAfricaine:
      "Pour les pêcheurs bozo du Mali, le Poisson-chat sacré est l'intermédiaire entre les hommes et les génies des eaux (Faro). Des spécimens géants sont sacralisés — les toucher est interdit.",
    symboliqueSpirirtuelle:
      "Le Poisson-chat représente la prospérité qui vient de la profondeur et de la persévérance. Il incarne l'indépendance créatrice et la capacité à trouver des ressources dans les conditions adverses.",
    symbolique: "Symbole de fertilité, d'abondance et de persévérance dans l'adversité.",
    qualites: ['Indépendance d\'esprit', 'Intuition adaptée', 'Persévérance', 'Résilience créatrice'],
    defauts: ['Tendance à rester dans l\'obscurité', 'Excès de pragmatisme', "Difficulté à se faire remarquer"],
    pouvoirs: ["Pouvoir d'indépendance", "Pouvoir d'intuition", 'Fertilité et abondance', 'Adaptation'],
    enseignements: [
      "L'abondance est dans les profondeurs — plonge pour la trouver",
      "Nage contre le courant quand ta direction l'exige",
      "Les eaux troubles ne t'arrêtent pas — tu y navigues",
      "Nourris ta communauté avec ce que tu trouves",
    ],
    citation: "Le poisson ne se noie pas dans son propre élément.",
    proverbes: [
      "Le poisson ne se noie pas dans son propre élément.",
      "Même dans les eaux troubles, le poisson sait où est la nourriture.",
      "Le fleuve qui nourrit le plus de villages n'est pas le plus clair, mais le plus persistant.",
    ],
    legendes: [
      "La légende bozo raconte que Faro — le génie des eaux — prit la forme d'un immense Poisson-chat pour enseigner aux premiers pêcheurs l'art de la navigation sur le Niger. En échange, ils s'engagèrent à ne jamais pêcher à certaines lunes.",
    ],
    conseilsDeVie: [
      "Les ressources que tu cherches sont souvent dans les endroits que tu évites.",
      "Nourrir les autres est une façon de se nourrir soi-même.",
      "Ne laisse pas les eaux troubles te définir — c'est là que tu trouves ton vrai terrain.",
    ],
    niveauSpirituel: 3,
    regionOrigine: 'Fleuve Niger et ses affluents',
    couleur: '#2E6A8A',
    couleurSecondaire: '#1A3D54',
    enseignementDuJour:
      "Aujourd'hui, plonge dans les profondeurs de ton projet. L'abondance attend ceux qui osent aller en bas.",
  },

  {
    id: 'hyene',
    nom: 'Hyène',
    nomAnglais: 'Spotted Hyena',
    nomScientifique: 'Crocuta crocuta',
    categorie: 'Mammifères',
    element: 'Feu',
    description:
      "La Hyène est l'animal de la ténacité et de l'adaptation radicale. Symbole de résilience, elle trouve la nourriture là où les autres ne voient rien.",
    symboliqueAfricaine:
      "Dans les traditions hausa, les dompteurs de hyènes 'Dan Marayan Zaki' parcourent les villes avec des hyènes apprivoisées pour des rituels de protection. Les fétiches fabriqués à partir de ses parties donnent un pouvoir de persuasion extraordinaire.",
    symboliqueSpirirtuelle:
      "La Hyène incarne la sagesse non conventionnelle — celle qui naît dans les marges, dans l'adversité. Son rire paradoxal dans la nuit représente la joie qui transcende les circonstances.",
    symbolique: "Symbole de résilience, d'adaptation et d'astuce pragmatique.",
    qualites: ['Résilience extraordinaire', 'Ténacité', 'Pragmatisme efficace', 'Joie dans l\'adversité'],
    defauts: ['Image négative projetée', 'Opportunisme excessif', 'Cynisme défensif'],
    pouvoirs: ['Résilience', 'Ténacité', 'Adaptation', 'Astuce'],
    enseignements: [
      "La résilience se construit dans les moments difficiles, pas faciles",
      "L'astuce est une forme d'intelligence que les puissants méprisent et les sages cultivent",
      "Trouve de la nourriture là où les autres ne voient que déchets",
      "Même dans l'obscurité, on peut trouver de la joie",
    ],
    citation: "La hyène mange ce que le lion laisse — et elle en est reconnaissante.",
    proverbes: [
      "La hyène mange ce que le lion laisse — et elle en est reconnaissante.",
      "Le rire de la hyène n'est pas de la folie — c'est la sagesse qui a compris l'ironie de la vie.",
      "Méprise la hyène si tu veux — mais ne laisse pas de restes la nuit.",
    ],
    legendes: [
      "Un conte sahélien raconte qu'un village frappé d'une malédiction vit mourir tous ses animaux. Seule la Hyène survivait. Un devin lui demanda le secret de sa survie. Elle répondit : 'Je n'ai jamais choisi ce que je mange — j'ai choisi de continuer à manger.' Cette leçon brisa la malédiction.",
    ],
    conseilsDeVie: [
      "Embrasse ta résilience comme une fierté, pas comme une honte.",
      "Ne laisse pas l'opinion des autres définir ta valeur.",
      "Cultive la capacité à rire même dans les situations difficiles — c'est de la santé mentale.",
    ],
    niveauSpirituel: 3,
    regionOrigine: 'Savane du Burkina Faso et du Ghana',
    couleur: '#A07040',
    couleurSecondaire: '#6B4A28',
    enseignementDuJour:
      "Aujourd'hui, fais preuve de ténacité. L'obstacle que tu contournes t'apprend plus que celui que tu évites.",
  },

  /* ═══════════════════════════════════════════════════════════
     ANIMAUX DU LIVRE DE OUEDRAOGO & PHILLIPS (25 nouveaux)
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'lezard',
    nom: 'Lézard',
    nomAnglais: 'Lizard',
    nomScientifique: 'Agama agama',
    categorie: 'Reptiles',
    element: 'Feu',
    description:
      "Le Lézard est l'être des rêves et de la régénération. Agile et solaire, il capte la chaleur du soleil et transmet les visions de l'invisible. Son pouvoir de caution en fait un guide de responsabilité.",
    symboliqueAfricaine:
      "Dans les traditions yoruba, c'est le Lézard qui porta le message de la mortalité aux hommes, devançant le Caméléon. Il est à la fois messager de la réalité et gardien des rêves prophétiques des ancêtres.",
    symboliqueSpirirtuelle:
      "Le Lézard symbolise le pont entre le monde des rêves et le monde éveillé. Sa capacité à perdre et régénérer sa queue illustre la croissance par la perte — tout changement nécessite de laisser quelque chose derrière.",
    symbolique: "Symbole des rêves, de la régénération et de la responsabilité face au changement.",
    qualites: ['Vision onirique', 'Agilité mentale', 'Sens de la responsabilité', 'Capacité de croissance', 'Discernement'],
    defauts: ['Impulsivité', 'Superficialité', 'Manque de constance', 'Dispersion'],
    pouvoirs: ['Pouvoir des rêves et de la vision', 'Pouvoir de régénération et croissance', 'Pouvoir de prudence', 'Pouvoir de responsabilité'],
    enseignements: [
      "Tes rêves sont des messages — apprends à les lire",
      "Toute croissance exige de laisser quelque chose derrière soi",
      "La prudence n'est pas la peur — c'est la sagesse de l'expérience",
      "Assume la responsabilité de ton évolution",
    ],
    citation: "Le lézard qui perd sa queue n'est pas diminué — il est en train de grandir.",
    proverbes: [
      "Le lézard qui perd sa queue n'est pas diminué — il est en train de grandir.",
      "Le lézard au soleil voit arriver les ombres bien avant les autres.",
      "Même le lézard sait que rêver n'est pas perdre son temps.",
    ],
    legendes: [
      "La tradition yoruba raconte que Dieu envoya Caméléon annoncer l'immortalité aux hommes, mais Lézard courut plus vite et arriva le premier avec le message de la mortalité. Depuis, les hommes meurent, mais le Lézard est honoré pour sa rapidité à assumer les réalités difficiles.",
    ],
    conseilsDeVie: [
      "Tiens un journal de tes rêves — ils te révèlent ce que ton esprit conscient cache.",
      "Accepte que la croissance implique des pertes — c'est le sens de la régénération.",
      "Prends tes responsabilités sans attendre que les autres le fassent à ta place.",
    ],
    niveauSpirituel: 3,
    regionOrigine: 'Savanes et zones rocheuses du Sahel',
    couleur: '#C47A2E',
    couleurSecondaire: '#8B4D1A',
    enseignementDuJour:
      "Aujourd'hui, note un rêve récent et cherches-y un message. Ton inconscient te parle.",
  },

  {
    id: 'singe',
    nom: 'Singe',
    nomAnglais: 'Monkey',
    nomScientifique: 'Cercopithecus mona',
    categorie: 'Mammifères',
    element: 'Air',
    description:
      "Le Singe est le maître de l'équilibre et de la persévérance. Acrobate de la forêt, il enseigne que le focus est plus précieux que l'agilité, et que la constance bâtit plus que la vitesse.",
    symboliqueAfricaine:
      "Dans les forêts d'Afrique de l'Ouest, le Singe est l'intermédiaire entre la canopée et le sol — il connaît les deux mondes. Les guérisseurs dogon le considèrent comme un gardien des remèdes cachés dans les hauteurs des arbres sacrés.",
    symboliqueSpirirtuelle:
      "Le Singe symbolise l'esprit mobile qui doit apprendre à se poser. Sa tendance au jeu et à la distraction est le défi de l'âme créative : canaliser l'énergie dispersée en une persévérance stable et féconde.",
    symbolique: "Symbole d'équilibre, de focus et de persévérance stable.",
    qualites: ['Équilibre et focus', 'Persévérance', 'Intelligence adaptative', 'Créativité', 'Stabilité acquise'],
    defauts: ['Tendance à la distraction', 'Agitation', 'Difficile à canaliser', 'Superficialité dans les engagements'],
    pouvoirs: ['Pouvoir de balance et de focus', 'Pouvoir de persévérance et stabilité', 'Intelligence pratique', 'Acrobatie mentale'],
    enseignements: [
      "L'équilibre se gagne par la pratique, pas par la chance",
      "Le focus est plus puissant que l'agitation",
      "La persévérance transforme le talent en maîtrise",
      "Apprends à te poser — l'arbre qui accueille est celui qui ne bouge pas",
    ],
    citation: "Le singe agile qui ne se pose jamais ne trouve jamais le meilleur fruit.",
    proverbes: [
      "Le singe agile qui ne se pose jamais ne trouve jamais le meilleur fruit.",
      "Le singe voit l'arbre entier depuis la branche la plus haute.",
      "Même le singe peut tomber — la grâce n'est pas l'absence d'erreur mais la façon de se relever.",
    ],
    legendes: [
      "Les Dogon du Mali racontent qu'un Singe ancien connaissait l'emplacement de toutes les plantes médicinales. Il n'enseignait qu'aux guérisseurs capables de grimper jusqu'à lui sans s'agiter — seul le calme et la constance méritaient son savoir.",
    ],
    conseilsDeVie: [
      "Identifie une seule priorité et reste-y concentré pendant une période définie.",
      "Ta créativité a besoin de structure pour s'épanouir pleinement.",
      "La vraie stabilité vient de l'intérieur — arrête de chercher le prochain arbre.",
    ],
    niveauSpirituel: 3,
    regionOrigine: 'Forêts tropicales du Bénin et du Cameroun',
    couleur: '#8C4A2E',
    couleurSecondaire: '#5C2E1A',
    enseignementDuJour:
      "Aujourd'hui, reste sur une seule tâche jusqu'à sa complétion. La persévérance construit ce que l'agitation ne peut qu'imaginer.",
  },

  {
    id: 'souris',
    nom: 'Souris',
    nomAnglais: 'Mouse',
    nomScientifique: 'Mus musculus',
    categorie: 'Mammifères',
    element: 'Terre',
    description:
      "La Souris est la gardienne de la minutie et de la sagesse des anciens. Petite mais perspicace, elle voit ce que les regards pressés manquent et honore la transmission intergénérationnelle.",
    symboliqueAfricaine:
      "Dans de nombreuses traditions sahéliennes, la Souris est associée aux esprits des ancêtres — sa présence dans une maison annonce que les ancêtres veillent. Les devins utilisent son comportement pour déchiffrer les messages du monde invisible.",
    symboliqueSpirirtuelle:
      "La Souris représente l'attention aux détails qui révèle les grandes vérités. Elle incarne le respect de la sagesse des aînés — ceux qui ont vécu longtemps voient petit et juste, là où les jeunes voient grand et se perdent.",
    symbolique: "Symbole de minutie, de diligence et de la sagesse transmise par les anciens.",
    qualites: ['Perspicacité fine', 'Diligence', 'Mémoire précise', 'Respect des anciens', 'Sens du détail'],
    defauts: ['Timidité excessive', 'Tendance à l\'effacement', 'Anxiété face aux grands espaces', 'Méfiance'],
    pouvoirs: ['Pouvoir de scrutin et diligence', 'Pouvoir des anciens', 'Observation fine', 'Discernement des détails'],
    enseignements: [
      "Les plus grandes vérités se cachent dans les petits détails",
      "La sagesse des anciens mérite d'être cherchée, pas attendue",
      "La diligence silencieuse accomplit ce que l'ambition bruyante rate",
      "Honore ceux qui t'ont précédé — leur regard porte plus loin que le tien",
    ],
    citation: "La souris qui connaît tous les trous de la maison est plus en sécurité que le chat qui ronronne.",
    proverbes: [
      "La souris qui connaît tous les trous de la maison est plus en sécurité que le chat qui ronronne.",
      "La petite souris voit le grain que les grands animaux écrasent sans le voir.",
      "La souris dit : 'Les anciens m'ont montré les chemins que les yeux neufs ne voient pas.'",
    ],
    legendes: [
      "La tradition bambara raconte que les Souris des greniers sacrés portaient les âmes des ancêtres et protégeaient les semences. Les paysans leur laissaient une poignée de grain avant de fermer le grenier — en échange, les ancêtres veillaient sur les récoltes.",
    ],
    conseilsDeVie: [
      "Ralentis et observe les détails — c'est là que se cachent les vraies opportunités.",
      "Va chercher la sagesse des plus âgés — ils ont des réponses à des questions que tu n'as pas encore posées.",
      "La diligence silencieuse est ton super-pouvoir — ne la sous-estime pas.",
    ],
    niveauSpirituel: 2,
    regionOrigine: 'Savanes et villages du Sahel',
    couleur: '#7A7A6A',
    couleurSecondaire: '#4D4D40',
    enseignementDuJour:
      "Aujourd'hui, consulte une personne plus âgée et plus expérimentée. Leur sagesse est un raccourci vers ta vérité.",
  },

  {
    id: 'calao',
    nom: 'Calao',
    nomAnglais: 'Hornbill',
    nomScientifique: 'Buceros bicornis',
    categorie: 'Oiseaux',
    element: 'Air',
    description:
      "Le Calao est l'oiseau de la noblesse et de la beauté sacrée. Avec son bec caractéristique et ses couleurs royales, il incarne la royauté naturelle et la fertilité des cieux.",
    symboliqueAfricaine:
      "Chez les Sénoufo et les Lobi de Côte d'Ivoire et du Burkina Faso, le Calao est l'oiseau primordial — il apparaît dans les masques de création comme le premier être vivant. Sa représentation orne les autels des ancêtres et les maisons des chefs.",
    symboliqueSpirirtuelle:
      "Le Calao symbolise la majesté naturelle — la noblesse qui ne cherche pas à s'imposer mais rayonne par sa seule présence. Il représente l'union de la beauté intérieure et extérieure, de la fertilité de l'esprit et de la chair.",
    symbolique: "Symbole de noblesse royale, de beauté authentique et de fertilité bénie.",
    qualites: ['Noblesse naturelle', 'Beauté authentique', 'Bravoure tranquille', 'Fertilité créatrice', 'Majesté'],
    defauts: ['Tendance à la vanité', 'Besoin de reconnaissance', 'Difficulté dans la simplicité'],
    pouvoirs: ['Pouvoir de noblesse et royauté', 'Pouvoir de bravoure', 'Pouvoir de beauté et fertilité', 'Majesté naturelle'],
    enseignements: [
      "La vraie noblesse se montre dans la façon dont tu traites les humbles",
      "Ta beauté intérieure est ta couronne — porte-la avec grâce",
      "Le courage n'est pas l'absence de peur mais la présence de quelque chose de plus grand",
      "La fertilité de l'esprit précède toujours la fertilité du monde",
    ],
    citation: "Le calao ne change pas son bec pour plaire — sa singularité est sa couronne.",
    proverbes: [
      "Le calao ne change pas son bec pour plaire — sa singularité est sa couronne.",
      "L'oiseau au bec d'or ne chante pas comme les autres — il chante comme lui-même.",
      "La beauté du calao n'est pas dans ses plumes mais dans sa façon de voler.",
    ],
    legendes: [
      "Les Sénoufo racontent que lors de la création, le premier Calao posa les premières graines sur la terre en battant de ses ailes. Son vol créateur engendra la fertilité du sol. Encore aujourd'hui, ses représentations dans les masques de Poro inaugurent les cérémonies de plantation.",
    ],
    conseilsDeVie: [
      "Embrasse ce qui te rend unique — ta singularité est ton plus grand atout.",
      "Exprime ta créativité avec fierté et sans te justifier.",
      "La vraie royauté est dans le service — sers avec la grâce d'un calao en vol.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Forêts de Côte d'Ivoire et du Burkina Faso",
    couleur: '#1A7A5C',
    couleurSecondaire: '#0F4D3A',
    enseignementDuJour:
      "Aujourd'hui, exprime une facette de toi que tu caches habituellement. Ta singularité mérite d'être vue.",
  },

  {
    id: 'cheval',
    nom: 'Cheval',
    nomAnglais: 'Horse',
    nomScientifique: 'Equus caballus',
    categorie: 'Mammifères',
    element: 'Feu',
    description:
      "Le Cheval est le symbole universel de la liberté en Afrique de l'Ouest. Véhicule des guerriers et des rois, il incarne la puissance dirigée, la vitesse au service d'un but.",
    symboliqueAfricaine:
      "Dans les empires du Sahel — Ghana, Mali, Songhaï — le Cheval était l'attribut des cavaliers nobles. La cavalerie Peule et Hausa représentait l'élite guerrière. Les chevaux sacrés des rois étaient enterrés avec leurs maîtres.",
    symboliqueSpirirtuelle:
      "Le Cheval symbolise la liberté qui s'accomplit dans la direction — non pas l'errance sans but, mais la vitesse guidée par une vision claire. Monter un cheval, c'est unir la puissance animale à la volonté humaine.",
    symbolique: "Symbole de liberté, de vitesse et de direction maîtrisée.",
    qualites: ['Liberté d\'esprit', 'Vitesse et efficacité', 'Force et endurance', 'Sens de la direction', 'Majesté en mouvement'],
    defauts: ['Impétuosité', 'Besoin d\'espace excessif', 'Difficulté à accepter les contraintes', 'Impatience'],
    pouvoirs: ['Pouvoir de liberté', 'Pouvoir de vitesse, force et direction', 'Énergie dirigée', 'Majesté en mouvement'],
    enseignements: [
      "La liberté sans direction est du vent — donne un but à ta puissance",
      "La vitesse n'a de valeur que si elle te rapproche de ta destination",
      "La vraie force s'exprime dans le service d'une vision plus grande que toi",
      "Connais tes limites pour mieux les dépasser",
    ],
    citation: "Le cheval libre choisit son chemin ; le cheval sage choisit aussi sa destination.",
    proverbes: [
      "Le cheval libre choisit son chemin ; le cheval sage choisit aussi sa destination.",
      "Un cheval sans cavalier galope dans tous les sens et n'arrive nulle part.",
      "La vitesse du cheval est un don — son endurance est une conquête.",
    ],
    legendes: [
      "La légende peule raconte que le premier Cheval fut offert aux hommes par les dieux du vent pour qu'ils puissent traverser le désert. Mais les dieux précisèrent : 'Ce don n'est précieux que si vous savez où aller.' Depuis, les Peuls disent que posséder un cheval sans vision est posséder du vent.",
    ],
    conseilsDeVie: [
      "Définis clairement ta destination avant de galoper — l'énergie sans direction s'épuise.",
      "Allie ta puissance naturelle à une vision claire et tout devient possible.",
      "Préserve ton espace de liberté intérieure quelle que soit la contrainte extérieure.",
    ],
    niveauSpirituel: 4,
    regionOrigine: 'Empires du Sahel — Mali, Songhaï, Hausa',
    couleur: '#8C3A3A',
    couleurSecondaire: '#5C1A1A',
    enseignementDuJour:
      "Aujourd'hui, identifie clairement ta destination. L'énergie que tu as mérite une direction précise.",
  },

  {
    id: 'iguane',
    nom: 'Iguane',
    nomAnglais: 'Iguana',
    nomScientifique: 'Iguana iguana',
    categorie: 'Reptiles',
    element: 'Terre',
    description:
      "L'Iguane est le maître de l'observation profonde et de la patience créatrice. Présent depuis les origines, il porte en lui la compréhension de la profondeur de la création.",
    symboliqueAfricaine:
      "En Afrique de l'Ouest, l'Iguane (Varan de Nil dans le contexte local) est associé aux dieux de la terre et de la création. Dans certaines traditions, il est le gardien des espaces entre la terre et l'eau — un être de passage.",
    symboliqueSpirirtuelle:
      "L'Iguane symbolise la contemplation active — l'immobilité qui n'est pas passivité mais observation totale. Il représente la capacité à comprendre la profondeur de la création en restant simplement présent et attentif.",
    symbolique: "Symbole de contemplation, d'adaptation profonde et de compréhension de la création.",
    qualites: ['Observation fine', 'Patience créatrice', 'Adaptation intelligente', 'Profondeur de compréhension'],
    defauts: ['Passivité excessive', 'Tendance à l\'attente', "Lenteur décisionnelle"],
    pouvoirs: ["Pouvoir d'observation", 'Adaptation et patience', "Pouvoir de compréhension", 'Profondeur de création'],
    enseignements: [
      "Observer profondément avant d'agir est une forme de sagesse",
      "L'adaptation intelligente ne sacrifie pas l'essence, seulement la forme",
      "La profondeur de ta compréhension détermine la qualité de tes actions",
      "La patience n'est pas l'attente — c'est la préparation active",
    ],
    citation: "L'iguane qui attend sait ce qu'il attend — l'impatient ne sait que bouger.",
    proverbes: [
      "L'iguane qui attend sait ce qu'il attend — l'impatient ne sait que bouger.",
      "L'iguane a vu passer plus de saisons que le lion ne se souvient.",
      "La pierre et l'iguane ne se disputent jamais — ils partagent la même compréhension du temps.",
    ],
    legendes: [
      "Une tradition du Delta du Niger dit que l'Iguane fut le premier témoin de la création. Il vit le dieu tisser la terre depuis l'eau, et depuis il garde en mémoire ce premier mouvement. Ceux qui méditent près d'un iguane reçoivent parfois une vision du commencement.",
    ],
    conseilsDeVie: [
      "Développe la pratique de la contemplation — cinq minutes d'observation vaut une heure d'action précipitée.",
      "Ta capacité à comprendre les situations en profondeur est ton avantage compétitif.",
      "Ne confonds pas la patience avec la procrastination — l'une prépare, l'autre évite.",
    ],
    niveauSpirituel: 3,
    regionOrigine: 'Côtes et zones humides du Golfe de Guinée',
    couleur: '#3A7A3A',
    couleurSecondaire: '#1F4D1F',
    enseignementDuJour:
      "Aujourd'hui, observe davantage que tu ne parles. La compréhension que tu cherches viendra de l'écoute.",
  },

  {
    id: 'chevre',
    nom: 'Chèvre',
    nomAnglais: 'Goat',
    nomScientifique: 'Capra aegagrus hircus',
    categorie: 'Mammifères',
    element: 'Terre',
    description:
      "La Chèvre est l'animal de la gratitude et du sacrifice consenti. Robuste et débrouillarde, elle symbolise l'endurance qui traverse tous les terrains de la vie.",
    symboliqueAfricaine:
      "La Chèvre est l'animal sacrificiel par excellence en Afrique de l'Ouest. Présente dans toutes les cérémonies importantes — naissances, mariages, funérailles, initiations — elle est le messager entre les hommes et les ancêtres. Son sang consacre les alliances.",
    symboliqueSpirirtuelle:
      "La Chèvre incarne le don de soi consenti, le sacrifice librement offert. Spirituellement, elle représente la capacité à gravir tous les terrains spirituels difficiles avec la même aisance, la ténacité qui refuse de lâcher.",
    symbolique: "Symbole de gratitude, de sacrifice sacré et d'endurance tenace.",
    qualites: ['Gratitude profonde', 'Endurance tenace', 'Débrouillardise', 'Sens du sacrifice', 'Diligence'],
    defauts: ['Entêtement', 'Tendance à l\'errance', 'Difficulté à se concentrer', 'Besoin de liberté parfois excessif'],
    pouvoirs: ['Pouvoir de gratitude et sacrifice', 'Pouvoir d\'endurance, ténacité et diligence', 'Adaptabilité terrestre', 'Force tranquille'],
    enseignements: [
      "La vraie gratitude change la qualité de tout ce que tu reçois",
      "L'endurance n'est pas souffrir — c'est avancer malgré",
      "Certaines choses valent le sacrifice — apprends à discerner lesquelles",
      "La ténacité sur un terrain difficile révèle qui tu es vraiment",
    ],
    citation: "La chèvre qui grimpe la montagne ne regarde pas en bas — elle regarde vers le sommet.",
    proverbes: [
      "La chèvre qui grimpe la montagne ne regarde pas en bas — elle regarde vers le sommet.",
      "La chèvre mange l'herbe qui lui est offerte et cherche celle qui lui manque.",
      "Le sacrifice de la chèvre nourrit l'alliance entre les vivants et les ancêtres.",
    ],
    legendes: [
      "La tradition bambara raconte qu'une Chèvre blanche fut la première à traverser la rivière sacrée pour aller chercher du feu chez les dieux. Elle revint les cornes brûlées mais porteuse de la flamme. Depuis, la Chèvre blanche est l'animal du feu sacré et de la transmission.",
    ],
    conseilsDeVie: [
      "Cultive la gratitude quotidienne — elle transforme ce que tu as en abondance.",
      "Identifie ce pour quoi tu es prêt à faire des sacrifices — c'est là que réside ta vérité.",
      "L'endurance se développe pas à pas — chaque terrain difficile te prépare au suivant.",
    ],
    niveauSpirituel: 3,
    regionOrigine: 'Villages et plateaux du Sahel',
    couleur: '#A08C6A',
    couleurSecondaire: '#6B5C3A',
    enseignementDuJour:
      "Aujourd'hui, exprime de la gratitude pour trois choses que tu tiens pour acquises. Cela changera ta journée.",
  },

  {
    id: 'pintade',
    nom: 'Pintade',
    nomAnglais: 'Guinea Fowl',
    nomScientifique: 'Numida meleagris',
    categorie: 'Oiseaux',
    element: 'Terre',
    description:
      "La Pintade est l'oiseau de la famille et de la protection douce. Garder son troupeau avec douceur et assurer la fertilité du groupe — telle est sa mission sacrée.",
    symboliqueAfricaine:
      "La Pintade est l'oiseau le plus répandu dans les villages d'Afrique de l'Ouest. Elle annonce le danger par ses cris — gardienne vigilante du village, elle est l'alerte vivante. Ses plumes tachetées symbolisent l'équité : chaque point est différent mais la tache est la même pour tous.",
    symboliqueSpirirtuelle:
      "La Pintade représente la maternité protectrice et la douceur efficace. Elle enseigne que la force de la famille repose sur la vigilance tranquille de ceux qui veillent sans se vanter.",
    symbolique: "Symbole de la famille, de la fertilité protectrice et de la douceur vigilante.",
    qualites: ['Sens de la famille', 'Vigilance protectrice', 'Douceur efficace', 'Fertilité', 'Solidarité communautaire'],
    defauts: ['Agitation face au danger', 'Tendance au commérage', 'Difficulté à garder un secret'],
    pouvoirs: ['Pouvoir de la famille, fertilité et protection', 'Pouvoir de douceur', 'Vigilance communautaire', 'Solidarité'],
    enseignements: [
      "La famille est la première richesse — protège-la avec douceur et fermeté",
      "La vigilance tranquille protège mieux que le bruit agressif",
      "La fertilité commence par le soin apporté à ce qui existe déjà",
      "La douceur n'est pas la faiblesse — c'est la force du tissu social",
    ],
    citation: "La pintade crie pour alerter le village — pas pour se faire remarquer.",
    proverbes: [
      "La pintade crie pour alerter le village — pas pour se faire remarquer.",
      "Les plumes de la pintade sont différentes mais toutes appartiennent au même oiseau.",
      "La pintade garde ses poussins avec une douceur que les faucons ne comprennent pas.",
    ],
    legendes: [
      "Une légende sénoufo raconte que lors d'une attaque ennemie, toutes les sentinelles dormaient sauf les Pintades du village qui crièrent à l'unisson. Le village fut sauvé. En remerciement, les villageois ne mangèrent plus jamais de pintade sans en offrir la première bouchée aux ancêtres.",
    ],
    conseilsDeVie: [
      "Prends soin de tes proches avec douceur et constance — c'est la vraie richesse.",
      "Sois vigilant sans être paranoïaque — protège ce qui compte.",
      "Ta solidarité avec la communauté est ta meilleure assurance-vie.",
    ],
    niveauSpirituel: 3,
    regionOrigine: 'Villages de savane du Mali et du Sénégal',
    couleur: '#7A5C7A',
    couleurSecondaire: '#4D3A4D',
    enseignementDuJour:
      "Aujourd'hui, fais un geste concret de soin envers quelqu'un de ta famille ou de ta communauté.",
  },

  {
    id: 'lievre',
    nom: 'Lièvre',
    nomAnglais: 'Hare',
    nomScientifique: 'Lepus capensis',
    categorie: 'Mammifères',
    element: 'Air',
    description:
      "Le Lièvre est le maître du mouvement et de la transformation intuitive. Toujours en éveil, il anticipe les changements et se transforme avant que le danger n'arrive.",
    symboliqueAfricaine:
      "Dans les contes d'Afrique de l'Ouest, le Lièvre Mba est le héros rusé par excellence — comme Zomo au Nigeria ou Leuk-le-Lièvre au Sénégal. Il bat les animaux plus forts grâce à son intelligence et son intuition fulgurant.",
    symboliqueSpirirtuelle:
      "Le Lièvre symbolise l'intuition qui devance la logique. Sa rapidité n'est pas la fuite — c'est la réponse juste à une perception juste. Il représente la transformation consciente plutôt que la transformation subie.",
    symbolique: "Symbole de mouvement, d'intuition vive et de transformation active.",
    qualites: ['Intuition fulgurante', 'Rapidité décisionnelle', 'Transformation active', 'Intelligence pratique', 'Vivacité'],
    defauts: ['Impulsivité', 'Tendance à la fuite', 'Instabilité', 'Manque de persistance'],
    pouvoirs: ['Pouvoir de mouvement et de changement', "Pouvoir d'intuition et transformation", 'Rapidité perceptive', 'Intelligence rusée'],
    enseignements: [
      "L'intuition est une intelligence — fais-lui confiance",
      "La transformation choisie est plus puissante que la transformation subie",
      "Mouvoir-se et se transformer sont des actes spirituels",
      "La rapidité n'est précieuse que si elle va dans la bonne direction",
    ],
    citation: "Le lièvre ne court pas — il suit sa vérité à toute vitesse.",
    proverbes: [
      "Le lièvre ne court pas — il suit sa vérité à toute vitesse.",
      "Au pays du lièvre, la ruse vaut mieux que la force.",
      "Le lièvre dit : 'Je ne fuis pas — je me transforme en quelque chose que tu ne peux plus attraper.'",
    ],
    legendes: [
      "Leuk-le-Lièvre, le héros des contes wolof, représente l'intelligence du faible face au fort. Dans un conte célèbre, il convainc le lion de s'enfermer dans une cage en lui disant que c'est le seul moyen de montrer sa vraie force. La sagesse du lièvre protège les humbles.",
    ],
    conseilsDeVie: [
      "Fais confiance à tes premières intuitions — elles arrivent avant que la peur ne les filtre.",
      "Choisis tes transformations plutôt que de les subir — l'anticipation est une forme de liberté.",
      "Transforme-toi régulièrement avant que les circonstances ne t'y forcent.",
    ],
    niveauSpirituel: 3,
    regionOrigine: 'Savanes du Sénégal et du Nigeria',
    couleur: '#A07A5C',
    couleurSecondaire: '#6B4D3A',
    enseignementDuJour:
      "Aujourd'hui, écoute ta première intuition sur une décision en suspens. Elle sait déjà ce que ta logique hésite encore à accepter.",
  },

  {
    id: 'colombe',
    nom: 'Colombe',
    nomAnglais: 'Dove',
    nomScientifique: 'Streptopelia senegalensis',
    categorie: 'Oiseaux',
    element: 'Air',
    description:
      "La Colombe est le symbole universel de la paix et de la maternité sacrée. Messagère de la réconciliation, elle porte la promesse d'un monde restauré dans son vol.",
    symboliqueAfricaine:
      "La Colombe sénégalaise est l'oiseau des villages sahéliens. Son roucoulement annonce la paix du matin. Dans les traditions vodou, elle est l'oiseau de Mawu — le dieu créateur femelle — et symbolise la douceur divine qui précède toute création.",
    symboliqueSpirirtuelle:
      "La Colombe est la messagère entre le monde des vivants et le monde des esprits paisibles. Elle symbolise la paix intérieure comme condition de la paix extérieure, et la prophétie douce qui guide sans contraindre.",
    symbolique: "Symbole de paix, de prophétie et de maternité divine.",
    qualites: ['Douceur sacrée', 'Amour maternel', 'Sens de la paix', 'Don prophétique', 'Réconciliation'],
    defauts: ['Naïveté face au danger', 'Tendance à l\'évitement du conflit', 'Vulnérabilité'],
    pouvoirs: ['Pouvoir de paix', 'Pouvoir de prophétie', 'Symbole féminin de maternité', 'Réconciliation'],
    enseignements: [
      "La paix intérieure est la source de toute paix autour de toi",
      "La maternité est la forme la plus haute de l'amour créateur",
      "Certaines visions ne peuvent être reçues que dans le calme",
      "Réconcilier deux parties est un acte plus puissant que de prendre parti",
    ],
    citation: "La colombe ne crie pas la paix — elle la vit et les autres s'y reposent.",
    proverbes: [
      "La colombe ne crie pas la paix — elle la vit et les autres s'y reposent.",
      "Quand la colombe fait son nid, les guerriers se souviennent de leurs familles.",
      "La prophétie de la colombe parle toujours de réconciliation, jamais de vengeance.",
    ],
    legendes: [
      "La tradition vodou fon raconte que Mawu — le dieu créateur féminin — envoya une Colombe blanche après le grand déluge pour annoncer que la terre était à nouveau habitable. La colombe revint avec une fleur dans son bec, et Mawu put créer à nouveau.",
    ],
    conseilsDeVie: [
      "Cultive la paix intérieure — ce n'est pas l'absence de conflit mais la présence d'un centre stable.",
      "Sois le pacificateur dans tes relations — cette fonction demande plus de force que le conflit.",
      "Ouvre-toi aux prophéties douces de ta vie — les signes paisibles parlent souvent plus juste que les crises.",
    ],
    niveauSpirituel: 4,
    regionOrigine: 'Villages du Sénégal et du Mali',
    couleur: '#9CB0C0',
    couleurSecondaire: '#6B7A8C',
    enseignementDuJour:
      "Aujourd'hui, crée un espace de paix consciente dans ta journée. Même cinq minutes de silence transforment tout.",
  },

  {
    id: 'poisson',
    nom: 'Poisson',
    nomAnglais: 'Fish',
    nomScientifique: 'Tilapia zillii',
    categorie: 'Aquatiques',
    element: 'Eau',
    description:
      "Le Poisson est le symbole de la grâce dans son milieu naturel. Indépendant et intuitif, il navigue les courants de la vie avec une élégance qui fait de chaque mouvement un acte de beauté.",
    symboliqueAfricaine:
      "Dans les traditions des peuples du fleuve Niger, les Poissons sacrés des étangs de village sont les représentants des esprits de l'eau. Les pêcheurs leur parlent avant de jeter leurs filets. Certains poissons géants, jamais pêchés depuis des générations, sont vénérés comme des ancêtres.",
    symboliqueSpirirtuelle:
      "Le Poisson symbolise l'indépendance dans son milieu naturel — la grâce qui vient de l'alignement parfait avec son environnement. Il représente l'intuition qui guide sans effort, le mouvement fluide qui ne rencontre pas la résistance.",
    symbolique: "Symbole de grâce, d'indépendance intuitive et d'adaptation élégante.",
    qualites: ['Grâce naturelle', "Indépendance d'esprit", 'Intuition fluide', 'Élégance adaptative', 'Sens de l\'eau'],
    defauts: ['Tendance à la solitude', 'Difficulté dans les milieux secs', 'Changement d\'humeur rapide'],
    pouvoirs: ['Pouvoir de grâce', "Pouvoir d'indépendance", "Pouvoir d'intuition et adaptation", 'Navigation fluide'],
    enseignements: [
      "La grâce vient de l'alignement avec ta nature profonde",
      "L'indépendance est une forme de dignité — préserve-la",
      "Quand tu es dans ton élément, tout coule sans effort",
      "Laisse ton intuition te guider comme l'eau guide le poisson",
    ],
    citation: "Le poisson dans son eau n'a pas besoin de nager — il coule.",
    proverbes: [
      "Le poisson dans son eau n'a pas besoin de nager — il coule.",
      "Le poisson connaît chaque courant de sa rivière — c'est pourquoi il y survit.",
      "La grâce du poisson ne s'enseigne pas — elle se vit dans son milieu naturel.",
    ],
    legendes: [
      "Les pêcheurs bozo du Mali racontent que les grands Tilapias des lacs sacrés sont les réincarnations des ancêtres pêcheurs. Ils guident les filets des descendants méritants vers les bancs de poissons invisibles. Une bonne pêche est toujours une bénédiction ancestrale.",
    ],
    conseilsDeVie: [
      "Trouve ton milieu naturel et habite-le pleinement — là où tu es aligné, tout devient grâce.",
      "Cultive ton indépendance sans en faire un mur contre les autres.",
      "Fais confiance à ta navigation intuitive — elle te connaît mieux que ta peur.",
    ],
    niveauSpirituel: 3,
    regionOrigine: 'Fleuves et lacs du Delta du Niger',
    couleur: '#2E5C8A',
    couleurSecondaire: '#1A3A5C',
    enseignementDuJour:
      "Aujourd'hui, identifie ton milieu naturel — le contexte où tu es le plus toi-même. Comment y passer plus de temps ?",
  },

  {
    id: 'cerf',
    nom: 'Cerf',
    nomAnglais: 'Deer',
    nomScientifique: 'Kobus ellipsiprymnus',
    categorie: 'Mammifères',
    element: 'Air',
    description:
      "Le Cerf est l'être de la compassion et de la douceur de l'esprit. Sa présence apaise, sa grâce inspire et sa sensibilité perçoit ce que les autres manquent.",
    symboliqueAfricaine:
      "Le Céphalophe et le Kob — antilopes proches du Cerf dans la tradition africaine — sont les animaux de la délicatesse et de la paix. Dans les forêts sacrées, leur présence indique que les lieux sont bénis et que les ancêtres sont en paix.",
    symboliqueSpirirtuelle:
      "Le Cerf symbolise la compassion comme mode d'être — non pas comme sentiment passager mais comme orientation permanente de l'âme. Sa sensibilité fine est un don spirituel qui lui permet de percevoir les souffrances cachées des autres.",
    symbolique: "Symbole de compassion, de douceur de l'esprit et de sensibilité sacrée.",
    qualites: ['Compassion profonde', "Douceur de l'esprit", 'Sensibilité fine', 'Sensibilité à la paix', 'Grâce naturelle'],
    defauts: ['Hypersensibilité', 'Tendance à fuir le conflit', 'Fragilité émotionnelle', 'Vulnérabilité'],
    pouvoirs: ['Pouvoir de compassion', "Pouvoir de douceur de l'esprit", 'Sensibilité et paix', 'Grâce en mouvement'],
    enseignements: [
      "La compassion est une force — pas une faiblesse",
      "La douceur de l'esprit ouvre des portes que la force ferme",
      "Ta sensibilité te permet de percevoir ce que les durs ne voient jamais",
      "La paix que tu portes rayonne sur tous ceux qui t'approchent",
    ],
    citation: "Le cerf qui boit à la source n'agite pas l'eau — il la remercier de sa douceur.",
    proverbes: [
      "Le cerf qui boit à la source n'agite pas l'eau — il la remercie de sa douceur.",
      "La forêt bénie est celle où le cerf se sent en sécurité.",
      "La compassion du cerf rend les prédateurs hésitants — même eux sentent quelque chose de sacré.",
    ],
    legendes: [
      "Une légende sénoufo raconte qu'un Cerf blanc apparaissait aux guérisseurs en rêve pour leur indiquer les plantes médicinales qui guériraient les maladies de l'âme. Sa présence annonçait toujours la guérison — non pas du corps, mais du cœur.",
    ],
    conseilsDeVie: [
      "Embrasse ta sensibilité comme un don, pas une malédiction.",
      "Exprime ta compassion concrètement — l'empathie sans action reste incomplète.",
      "Protège ta douceur des environnements qui veulent la durcir inutilement.",
    ],
    niveauSpirituel: 3,
    regionOrigine: 'Forêts sacrées de Côte d\'Ivoire et du Ghana',
    couleur: '#7A5A2A',
    couleurSecondaire: '#4D3A18',
    enseignementDuJour:
      "Aujourd'hui, fais un acte de compassion envers quelqu'un qui souffre en silence. Ton attention guérit.",
  },

  {
    id: 'chien',
    nom: 'Chien',
    nomAnglais: 'Dog',
    nomScientifique: 'Canis lupus familiaris',
    categorie: 'Mammifères',
    element: 'Feu',
    description:
      "Le Chien est le symbole universel de la loyauté et de la foi. Compagnon fidèle des hommes depuis des millénaires, il incarne la bravoure du service et la fiabilité inconditionnelle.",
    symboliqueAfricaine:
      "Dans les traditions de chasse africaines, le Chien est le partenaire sacré du chasseur — il guide, alerte et protège. Dans certaines traditions dogon, le chien est l'animal intermédiaire qui guide les âmes vers le monde des ancêtres lors des funérailles.",
    symboliqueSpirirtuelle:
      "Le Chien symbolise la loyauté spirituelle — la fidélité à ses engagements au-delà de la commodité ou de la peur. Il représente le compagnonnage sacré : être présent pour l'autre dans les moments difficiles, sans condition ni calcul.",
    symbolique: "Symbole de loyauté, de foi et de courage au service des autres.",
    qualites: ['Loyauté absolue', 'Foi inébranlable', 'Fiabilité', 'Courage protecteur', 'Compagnonnage sacré'],
    defauts: ['Dépendance excessive', 'Tendance à chercher l\'approbation', 'Servilité', 'Difficulté à s\'affirmer'],
    pouvoirs: ['Pouvoir de loyauté, foi et fiabilité', 'Pouvoir du compagnonnage', 'Pouvoir de courage et force', 'Service fidèle'],
    enseignements: [
      "La loyauté est une forme de courage — elle exige de tenir quand c'est difficile",
      "La foi sans preuve est la forme la plus pure de la confiance",
      "Sois le type de compagnon que tu voudrais trouver dans tes moments difficiles",
      "Le service sincère est une des formes les plus élevées de la spiritualité",
    ],
    citation: "Le chien fidèle ne demande pas pourquoi — il est là.",
    proverbes: [
      "Le chien fidèle ne demande pas pourquoi — il est là.",
      "Le meilleur ami de l'homme l'est aussi dans les mauvais jours.",
      "Le chien qui aboie fort n'est pas toujours le plus courageux — celui qui reste est le plus brave.",
    ],
    legendes: [
      "Les Dogon racontent que lors du premier voyage vers le monde des ancêtres, c'est un Chien qui guida l'âme du premier défunt à travers les chemins invisibles. Depuis, un chien est toujours présent dans les cérémonies funèbres dogon pour assurer le chemin vers l'au-delà.",
    ],
    conseilsDeVie: [
      "Sois fiable — la confiance qu'on place en toi est le plus beau des honneurs.",
      "Ton courage de rester présent dans les moments difficiles des autres est un don rare.",
      "Distingue la loyauté de la servilité — tu mérites aussi de recevoir.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Villages et zones de chasse d'Afrique de l'Ouest",
    couleur: '#6B5C3A',
    couleurSecondaire: '#4D3A1F',
    enseignementDuJour:
      "Aujourd'hui, honore un engagement que tu as pris. La loyauté se construit dans les petits actes quotidiens.",
  },

  {
    id: 'ane',
    nom: 'Âne',
    nomAnglais: 'Donkey',
    nomScientifique: 'Equus asinus',
    categorie: 'Mammifères',
    element: 'Terre',
    description:
      "L'Âne est le symbole de la patience absolue et de la stabilité inébranlable. Porteur infatigable, il enseigne l'endurance qui ne se plaint pas et la constance qui ne se décourage pas.",
    symboliqueAfricaine:
      "Dans les villes et villages du Sahel, l'Âne est l'animal de charge indispensable. Il traverse déserts et montagnes sans se plaindre. Les marchands sahariens lui confient leurs biens les plus précieux — il ne les abandonne jamais, même épuisé.",
    symboliqueSpirirtuelle:
      "L'Âne symbolise la patience comme pratique spirituelle — non pas la résignation mais l'acceptation active. Il représente la force qui tire sa stabilité de la terre elle-même, imperturbable face aux exigences et aux mépris.",
    symbolique: "Symbole de patience, d'endurance et de stabilité profonde.",
    qualites: ['Patience inébranlable', 'Endurance légendaire', 'Stabilité profonde', 'Constance', 'Solidité'],
    defauts: ['Entêtement célébre', 'Difficulté à changer de direction', 'Tendance à la résistance passive'],
    pouvoirs: ['Pouvoir de patience', "Pouvoir d'endurance et persévérance", 'Pouvoir de stabilité et focus', 'Solidité terrestre'],
    enseignements: [
      "La patience n'est pas l'attente passive — c'est la présence active dans le mouvement lent",
      "L'endurance se mesure dans les moments où tout le monde a abandonné sauf toi",
      "La stabilité intérieure est indépendante des circonstances extérieures",
      "Porte ta charge avec dignité — elle forge ce que rien d'autre ne peut forger",
    ],
    citation: "L'âne porte la charge sans se plaindre — il sait que chaque pas le rapproche du repos.",
    proverbes: [
      "L'âne porte la charge sans se plaindre — il sait que chaque pas le rapproche du repos.",
      "L'entêtement de l'âne a sauvé plus d'un voyageur du précipice.",
      "L'âne qui refuse d'avancer au bord du gouffre est plus sage que le cavalier impatient.",
    ],
    legendes: [
      "Une histoire du Sahel raconte qu'un marchand demanda à son Âne de traverser un pont vermoulu. L'Âne refusa. Le marchand s'énerva et passa seul — le pont céda sous son poids. L'Âne avait vu ce que l'impatience du maître avait caché. La patience de l'Âne avait tout vu.",
    ],
    conseilsDeVie: [
      "Développe ta patience comme un muscle — exercice quotidien, résultats durables.",
      "Ton entêtement peut être une sagesse — mais apprends à distinguer l'obstruction de la protection.",
      "La stabilité que tu construis dans les moments difficiles te servira toute ta vie.",
    ],
    niveauSpirituel: 3,
    regionOrigine: 'Routes et caravanes du Sahara et du Sahel',
    couleur: '#8C7A5C',
    couleurSecondaire: '#5C4D3A',
    enseignementDuJour:
      "Aujourd'hui, reste stable face à une situation qui teste ta patience. Ta constance est ton message.",
  },

  {
    id: 'antilope',
    nom: 'Antilope',
    nomAnglais: 'Antelope',
    nomScientifique: 'Antidorcas marsupialis',
    categorie: 'Mammifères',
    element: 'Air',
    description:
      "L'Antilope est l'être de l'action gracieuse et de la survie élégante. Rapide et vigilante, elle transcende les obstacles avec une grâce que rien ne semble pouvoir arrêter.",
    symboliqueAfricaine:
      "L'Antilope Chi Wara des Bambara du Mali est l'une des représentations artistiques les plus célèbres d'Afrique. Ces masques-crêtes d'antilope sont portés lors des cérémonies agricoles pour invoquer la puissance de la terre. L'Antilope Chi Wara est l'esprit qui enseigna aux hommes l'art de cultiver.",
    symboliqueSpirirtuelle:
      "L'Antilope représente la grâce dans l'adversité — la capacité à surmonter les obstacles non pas par la force brute mais par l'élégance du mouvement. Elle symbolise les limites saines qui protègent sans emprisonner.",
    symbolique: "Symbole d'action gracieuse, de survie et de frontières protectrices.",
    qualites: ['Grace dans l\'action', 'Rapidité stratégique', 'Vigilance protectrice', 'Survie élégante', 'Frontières saines'],
    defauts: ['Tendance à la fuite face au danger', 'Hypervigilance épuisante', 'Difficulté à s\'arrêter'],
    pouvoirs: ["Pouvoir d'action, vitesse et grâce", 'Pouvoir de survie et dépassement des obstacles', 'Protection et frontières', "Pouvoir de compréhension et objectivité"],
    enseignements: [
      "La grâce est une forme d'intelligence — elle dépasse les obstacles que la force brise",
      "Des limites saines protègent sans emprisonner",
      "La survie élégante est plus durable que la résistance épuisante",
      "L'objectivité te permet de voir les chemins que l'émotion masque",
    ],
    citation: "L'antilope ne court pas pour fuir — elle court pour exprimer sa liberté.",
    proverbes: [
      "L'antilope ne court pas pour fuir — elle court pour exprimer sa liberté.",
      "La grâce de l'antilope n'est pas dans ses cornes mais dans son mouvement.",
      "L'antilope Chi Wara a enseigné aux hommes que la terre s'honore en la cultivant, pas en la conquérant.",
    ],
    legendes: [
      "La légende bambara de Chi Wara raconte que l'Esprit-Antilope descendit du ciel pour enseigner aux hommes l'agriculture. Il prit un bâton de bois et une antilope femelle, et ensemble ils creusèrent la terre pour la première fois. Depuis, les masques Chi Wara honorent cet enseignement primordial.",
    ],
    conseilsDeVie: [
      "Exprime-toi avec élégance même dans les situations difficiles — la grâce est une forme de pouvoir.",
      "Établis des limites claires et maintiens-les avec fermeté et douceur.",
      "Surmonte les obstacles en les contournant avec intelligence plutôt qu'en les heurtant de front.",
    ],
    niveauSpirituel: 4,
    regionOrigine: 'Savanes du Mali et du Burkina Faso',
    couleur: '#C4A03A',
    couleurSecondaire: '#8B6A1F',
    enseignementDuJour:
      "Aujourd'hui, affronte un obstacle avec grâce plutôt qu'avec force. L'élégance est souvent plus efficace.",
  },

  {
    id: 'tatou',
    nom: 'Tatou',
    nomAnglais: 'Pangolin',
    nomScientifique: 'Phataginus tricuspis',
    categorie: 'Mammifères',
    element: 'Terre',
    description:
      "Le Tatou (Pangolin en Afrique) est l'animal de la protection et des frontières sacrées. Sa carapace de kératine est une des plus élaborées de la nature — symbole de la protection par la compréhension.",
    symboliqueAfricaine:
      "Le Pangolin d'Afrique de l'Ouest est l'un des animaux les plus protégés et sacrés. Dans de nombreuses traditions, le trouver est signe de grande bénédiction. Ses écailles sont utilisées dans les fétiches de protection. Certains rois l'offraient comme cadeau diplomatique le plus précieux.",
    symboliqueSpirirtuelle:
      "Le Pangolin symbolise la protection intérieure — la carapace que l'on construit non pas pour fermer le monde dehors, mais pour préserver un espace sacré intérieur. Il représente l'objectivité qui voit les situations sans les distordre par les émotions.",
    symbolique: "Symbole de protection sacrée, de frontières intelligentes et d'objectivité.",
    qualites: ['Protection sagace', 'Frontières claires', 'Objectivité', 'Compréhension profonde', 'Discernement'],
    defauts: ['Tendance à l\'isolement', 'Résistance à l\'ouverture', 'Rigidité défensive'],
    pouvoirs: ['Pouvoir de protection et frontières', "Pouvoir de compréhension et objectivité", 'Discernement sacré', 'Protection intérieure'],
    enseignements: [
      "La vraie protection vient de la compréhension, pas de la peur",
      "Des frontières saines permettent les vraies rencontres",
      "L'objectivité est un outil spirituel — utilise-la sans cynisme",
      "Ton espace intérieur sacré mérite d'être protégé avec soin",
    ],
    citation: "Le pangolin ferme sa carapace pour se préserver — pas pour se punir.",
    proverbes: [
      "Le pangolin ferme sa carapace pour se préserver — pas pour se punir.",
      "Les écailles du pangolin ne sont pas une prison — elles sont une demeure.",
      "Celui qui comprend vraiment une situation peut la protéger sans la défigurer.",
    ],
    legendes: [
      "Une tradition du Bénin raconte que le Pangolin fut créé par les dieux pour protéger les secrets de la création. Sa carapace d'écailles contient chacune un mot du langage primordial. Les guérisseurs qui trouvent un pangolin vivant reçoivent en rêve une partie de ce langage originel.",
    ],
    conseilsDeVie: [
      "Pose des limites claires dans tes relations — ce n'est pas de l'égoïsme, c'est de la sagesse.",
      "Cultive ton objectivité comme un outil de clarté, pas de distance.",
      "Protège ton espace intérieur sacré avec la même détermination que ta vie extérieure.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Forêts tropicales d'Afrique centrale et occidentale",
    couleur: '#6A7A5C',
    couleurSecondaire: '#3A4D2E',
    enseignementDuJour:
      "Aujourd'hui, protège un espace sacré dans ta vie — peut-être ta tranquillité du matin ou ton temps de créativité.",
  },

  {
    id: 'poulet',
    nom: 'Poulet',
    nomAnglais: 'Chicken',
    nomScientifique: 'Gallus gallus domesticus',
    categorie: 'Oiseaux',
    element: 'Feu',
    description:
      "Le Poulet est l'enseignant du village, l'observateur attentif qui transmet le savoir par l'exemple quotidien. Sa présence dans toutes les cultures africaines en fait un animal de la connaissance partagée.",
    symboliqueAfricaine:
      "Le Poulet est l'animal le plus utilisé dans les rituels divinatoires d'Afrique de l'Ouest. Dans les traditions dagara et akan, ses entrailles révèlent les messages des ancêtres. Le coq annonce le lever du soleil — il est le gardien du passage entre la nuit et le jour.",
    symboliqueSpirirtuelle:
      "Le Poulet symbolise la transmission du savoir par l'observation et l'imitation. Il représente la fertilité de la connaissance — qui se multiplie chaque fois qu'elle est partagée. Son chant à l'aube est une invitation à l'éveil spirituel quotidien.",
    symbolique: "Symbole d'enseignement, de transmission et de fertilité de la connaissance.",
    qualites: ['Sens de l\'observation', 'Don pour l\'enseignement', 'Fertilité créatrice', 'Énergie partagée', 'Connaissance pratique'],
    defauts: ['Agitation face aux menaces', 'Tendance au commérage', 'Manque de vision long terme'],
    pouvoirs: ["Pouvoir d'observation", 'Pouvoir d\'enseignement et connaissance', "Pouvoir d'énergie", 'Fertilité et créativité'],
    enseignements: [
      "Chaque jour est une invitation à l'éveil — accueille-le avec le chant du coq",
      "Le savoir qui n'est pas partagé se perd — enseigne ce que tu sais",
      "L'observation attentive du quotidien révèle des enseignements que les grands voyages manquent",
      "Ta créativité se multiplie chaque fois que tu la partages",
    ],
    citation: "Le coq qui chante à l'aube ne prouve pas qu'il fait lever le soleil — il célèbre l'éveil.",
    proverbes: [
      "Le coq qui chante à l'aube ne prouve pas qu'il fait lever le soleil — il célèbre l'éveil.",
      "La poule ne dit pas 'j'ai pondu un œuf' — elle dit 'voici ce que j'ai créé pour toi'.",
      "L'enseignant est comme le poulet : il donne tout ce qu'il a et reste encore présent.",
    ],
    legendes: [
      "La tradition dagara du Burkina Faso raconte que le premier Coq fut créé par les dieux pour rappeler aux hommes de se lever et de commencer leur journée avec intention. Son chant est une prière — un rappel que chaque matin est un nouveau commencement sacré.",
    ],
    conseilsDeVie: [
      "Partage ce que tu sais — la connaissance thésaurisée meurt, la connaissance partagée se multiplie.",
      "Commence chaque journée avec une intention claire — le coq en toi mérite d'être entendu.",
      "Observe ton environnement quotidien avec un regard d'apprentissage — il contient plus d'enseignements que tu ne l'imagines.",
    ],
    niveauSpirituel: 3,
    regionOrigine: 'Villages et cours des traditions africaines',
    couleur: '#C4802D',
    couleurSecondaire: '#8B5218',
    enseignementDuJour:
      "Aujourd'hui, transmets quelque chose que tu sais à quelqu'un qui peut en bénéficier. L'enseignement est une forme d'amour.",
  },

  {
    id: 'cochon',
    nom: 'Cochon',
    nomAnglais: 'Pig',
    nomScientifique: 'Sus scrofa domesticus',
    categorie: 'Mammifères',
    element: 'Terre',
    description:
      "Le Cochon est l'animal de la force intérieure et de l'intelligence intuitive. Autosuffisant et fiable, il symbolise la confiance en soi et l'amitié profonde qui ne juge pas.",
    symboliqueAfricaine:
      "Dans les traditions animistes d'Afrique subsaharienne où il est présent, le Cochon est associé à la terre nourricière. Il représente l'abondance et la prospérité domestique. Ses rituels sont liés à la gratitude pour la générosité de la terre.",
    symboliqueSpirirtuelle:
      "Le Cochon symbolise l'autosuffisance spirituelle — la capacité à trouver en soi-même les ressources pour traverser toutes les situations. Il représente aussi la force spirituelle qui soutient sans se montrer et l'intelligence intuitive qui trouve la nourriture là où les autres ne voient que boue.",
    symbolique: "Symbole d'autonomie, de force spirituelle et d'intelligence intuitive.",
    qualites: ['Autosuffisance', 'Fiabilité', 'Force spirituelle', 'Intelligence intuitive', 'Pragmatisme'],
    defauts: ['Apparence trompeuse', 'Tendance à l\'excès', 'Manque de raffinement perçu'],
    pouvoirs: ['Pouvoir d\'autonomie, fiabilité et amitié', 'Pouvoir de force spirituelle', 'Intelligence et intuition', 'Prospérité terrestre'],
    enseignements: [
      "L'apparence ne dit pas tout — regarde sous la surface",
      "L'autosuffisance est une forme de liberté",
      "La vraie amitié ne juge pas — elle reste présente",
      "Ton intelligence intuitive trouve des ressources là où les autres voient seulement des obstacles",
    ],
    citation: "Le cochon sait où se trouve la nourriture même dans la boue — c'est son intelligence, pas sa malchance.",
    proverbes: [
      "Le cochon sait où se trouve la nourriture même dans la boue — c'est son intelligence, pas sa malchance.",
      "Ne juge pas le cochon par sa demeure — juge-le par la qualité de son amitié.",
      "Celui qui sait trouver de l'or dans la boue vaut mieux que celui qui cherche de l'or dans l'or.",
    ],
    legendes: [
      "Une tradition du Golfe de Guinée raconte qu'un Cochon magique vivait dans les forêts et guidait les voyageurs perdus vers la sécurité. Ceux qui le méprisaient se perdaient ; ceux qui le respectaient trouvaient toujours leur chemin. Le mépris aveugle ; le respect ouvre les yeux.",
    ],
    conseilsDeVie: [
      "Développe ton autosuffisance — la liberté commence par ne dépendre de personne pour ton équilibre intérieur.",
      "Ne laisse pas l'apparence des choses masquer leur vraie valeur.",
      "Cultive des amitiés profondes qui résistent à tes mauvais jours.",
    ],
    niveauSpirituel: 2,
    regionOrigine: 'Zones rurales et forêts tropicales',
    couleur: '#C47A5C',
    couleurSecondaire: '#8B4D3A',
    enseignementDuJour:
      "Aujourd'hui, reconnais la valeur cachée dans une situation ou une personne que tu tends à sous-estimer.",
  },

  {
    id: 'pigeon',
    nom: 'Pigeon',
    nomAnglais: 'Pigeon',
    nomScientifique: 'Columba livia',
    categorie: 'Oiseaux',
    element: 'Air',
    description:
      "Le Pigeon est le symbole de l'amour durable et de la persévérance dans l'accomplissement. Messager fidèle, il trouve toujours son chemin vers chez lui et revient avec la récompense de sa constance.",
    symboliqueAfricaine:
      "Le Pigeon est l'oiseau de l'amour maternel par excellence dans les villages d'Afrique de l'Ouest. Son roucoulement doux annonce la paix du foyer. Dans certaines traditions, un pigeon posé sur une maison est le signe que les ancêtres bénissent ce foyer.",
    symboliqueSpirirtuelle:
      "Le Pigeon symbolise l'amour qui revient toujours — la constance affective qui traverse les distances et les séparations. Il représente la persévérance dans l'accomplissement : chaque message qu'il porte, il le livrera quelles que soient les circonstances.",
    symbolique: "Symbole d'amour maternel, de persévérance et d'accomplissement fidèle.",
    qualites: ['Amour maternel', 'Persévérance', 'Stabilité du foyer', 'Accomplissement fidèle', 'Direction intérieure'],
    defauts: ['Tendance à l\'attachement excessif', 'Difficulté à explorer l\'inconnu', 'Routine rigide'],
    pouvoirs: ["Symbole d'amour", 'Instincts maternels, sécurité et stabilité', 'Protection et prospérité', 'Accomplissement, persévérance et direction'],
    enseignements: [
      "L'amour véritable revient toujours — même après les longues distances",
      "La persévérance dans l'accomplissement transforme les petites actions en grandes réalisations",
      "Un foyer stable est le fondement de toute croissance",
      "Ta direction intérieure te ramènera toujours à ce qui compte vraiment",
    ],
    citation: "Le pigeon voyageur ne sait pas toujours le chemin — mais il sait toujours la destination.",
    proverbes: [
      "Le pigeon voyageur ne sait pas toujours le chemin — mais il sait toujours la destination.",
      "L'amour du pigeon pour son nid lui fait traverser des tempêtes que l'aigle éviterait.",
      "Le roucoulement du pigeon dit : 'Je suis là, je t'aime, je reste.'",
    ],
    legendes: [
      "Une légende du Sénégal raconte qu'un roi exilé envoya un Pigeon à sa femme avec le message 'Je reviens'. La femme attendit sept ans. Le pigeon revint chaque saison avec la même promesse. Au septième retour, le roi rentra enfin — guidé par la fidélité de son pigeon et la constance de son amour.",
    ],
    conseilsDeVie: [
      "Honore les engagements affectifs que tu as pris — la constance est la forme la plus pure de l'amour.",
      "Construis un foyer intérieur stable — un espace de paix en toi auquel tu peux toujours revenir.",
      "Persévère dans l'accomplissement de tes engagements, même quand le chemin n'est pas visible.",
    ],
    niveauSpirituel: 3,
    regionOrigine: 'Villages et villes côtières du Sénégal',
    couleur: '#8C9A7A',
    couleurSecondaire: '#5C6B4D',
    enseignementDuJour:
      "Aujourd'hui, reviens à ce qui compte vraiment dans ta vie. Que ce soit une personne, un projet ou un rêve.",
  },

  {
    id: 'lapin',
    nom: 'Lapin',
    nomAnglais: 'Rabbit',
    nomScientifique: 'Oryctolagus cuniculus',
    categorie: 'Mammifères',
    element: 'Terre',
    description:
      "Le Lapin est le symbole de la fertilité et de l'innocence vigilante. Doux et attentif, il renouvelle la vie par sa fertilité et la protège par sa vigilance.",
    symboliqueAfricaine:
      "Dans de nombreux contes d'Afrique de l'Ouest, le Lapin (ou le Lièvre) est l'animal de l'astuce douce — il survit non pas par la force mais par la douceur intelligente et la vigilance. Dans les traditions d'initiation des jeunes filles, il symbolise la fertilité heureuse.",
    symboliqueSpirirtuelle:
      "Le Lapin symbolise l'innocence qui n'est pas naïveté. Sa vigilance constante lui permet de rester doux dans un monde de prédateurs. Il représente la foi en la vie — la certitude que la fertilité et le renouveau viendront.",
    symbolique: "Symbole de fertilité, de foi en la vie et d'innocence vigilante.",
    qualites: ['Douceur', 'Vigilance protectrice', 'Fertilité créatrice', 'Foi en la vie', 'Renouveau'],
    defauts: ['Timidité excessive', 'Fuite face au danger', 'Tendance à la dispersion créatrice'],
    pouvoirs: ["Symbole de fertilité", 'Pouvoir de douceur, foi et fertilité', 'Pouvoir de nouvelle vie', 'Vigilance protectrice'],
    enseignements: [
      "L'innocence protégée est plus forte que la méfiance blindée",
      "La fertilité commence dans le cœur — crois en ta capacité à créer",
      "La douceur et la vigilance ne s'excluent pas — elles se complètent",
      "Chaque printemps recommence — la vie revient toujours",
    ],
    citation: "Le lapin ne se cache pas de peur — il se prépare pour rebondir.",
    proverbes: [
      "Le lapin ne se cache pas de peur — il se prépare pour rebondir.",
      "La fertilité du lapin vient de sa foi que la vie continue.",
      "La douceur du lapin n'est pas une invitation aux prédateurs — c'est sa façon de vivre sa nature.",
    ],
    legendes: [
      "La tradition akan raconte qu'Anansi le Lapin (souvent confondu avec l'Araignée) sauva les histoires du monde en acceptant de payer un prix que tous croyaient impossible. Son audace douce lui valut d'être le gardien éternel des contes — les histoires nourrissent la vie.",
    ],
    conseilsDeVie: [
      "Fais confiance à ta fertilité créatrice — tes idées et projets peuvent se multiplier.",
      "Reste doux sans perdre ta vigilance — les deux coexistent parfaitement.",
      "Honore l'innocence en toi — elle n'est pas une faiblesse mais une fraîcheur rare.",
    ],
    niveauSpirituel: 2,
    regionOrigine: "Zones rurales d'Afrique de l'Ouest",
    couleur: '#A09CB0',
    couleurSecondaire: '#6B697A',
    enseignementDuJour:
      "Aujourd'hui, fais confiance à une idée nouvelle sans la tuer dans l'œuf. Laisse-lui une chance de germer.",
  },

  {
    id: 'porc-epic',
    nom: 'Porc-épic',
    nomAnglais: 'Porcupine',
    nomScientifique: 'Hystrix cristata',
    categorie: 'Mammifères',
    element: 'Terre',
    description:
      "Le Porc-épic est l'animal de la protection humble. Ni agressif ni passif, il porte en lui la sagesse de la défense juste et l'humilité qui reconnaît ses propres limites.",
    symboliqueAfricaine:
      "Dans les traditions d'Afrique de l'Ouest, le Porc-épic est l'animal qui ne cherche pas le conflit mais ne le fuit pas non plus. Ses piquants sont utilisés dans les fétiches de protection passive — ceux qui ne font pas de mal mais se défendent quand on les attaque.",
    symboliqueSpirirtuelle:
      "Le Porc-épic symbolise la protection par l'humilité — rester petit, discret, mais impossible à blesser sans se blesser soi-même. Il représente l'innocence gardée non pas par la naïveté mais par la sagesse de ceux qui savent se protéger sans attaquer.",
    symbolique: "Symbole d'innocence protégée, d'auto-défense sage et d'humilité.",
    qualites: ['Humilité véritable', 'Auto-protection sage', 'Innocence préservée', 'Discrétion efficace', 'Dignité tranquille'],
    defauts: ['Tendance à se fermer', "Difficulté à s'ouvrir", 'Isolement défensif'],
    pouvoirs: ["Pouvoir d'innocence", "Pouvoir d'auto-protection", 'Pouvoir d\'humilité', 'Défense sans agression'],
    enseignements: [
      "L'humilité n'est pas la honte — c'est la conscience de ta vraie taille",
      "Se protéger sans attaquer est une forme de sagesse avancée",
      "Ton innocence est précieuse — protège-la sans la perdre",
      "La discrétion efficace accomplit plus que la démonstration de force",
    ],
    citation: "Le porc-épic ne cherche pas les ennuis — mais ceux qui l'attaquent comprennent leur erreur.",
    proverbes: [
      "Le porc-épic ne cherche pas les ennuis — mais ceux qui l'attaquent comprennent leur erreur.",
      "L'humilité du porc-épic n'est pas une invitation à l'attaquer — c'est une invitation à le respecter.",
      "Celui qui se protège sans blesser les autres a trouvé la sagesse de la frontière.",
    ],
    legendes: [
      "Une légende bambara raconte qu'un village fut épargné de l'attaque d'un sorcier grâce à des piquants de Porc-épic plantés autour des maisons. Le sorcier s'approcha et fut repoussé par la protection invisible. L'humilité du porc-épic avait fait ce que l'arrogance des guerriers n'avait pas pu faire.",
    ],
    conseilsDeVie: [
      "Protège-toi avec sagesse sans devenir agressif — la défense juste ne cherche pas la guerre.",
      "Cultive l'humilité comme une armure : elle te protège des pièges de l'ego.",
      "Préserve ton innocence — c'est une ressource rare dans un monde qui se durcit.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Forêts et savanes d'Afrique de l'Ouest",
    couleur: '#5C7A8A',
    couleurSecondaire: '#3A4D5C',
    enseignementDuJour:
      "Aujourd'hui, pose une limite sans agressivité ni culpabilité. La protection juste est un acte d'amour.",
  },

  {
    id: 'rat',
    nom: 'Rat',
    nomAnglais: 'Rat',
    nomScientifique: 'Rattus rattus',
    categorie: 'Mammifères',
    element: 'Terre',
    description:
      "Le Rat est l'animal du travail acharné et de la prudence intelligente. Débrouillard et fertile, il trouve des ressources dans les situations les plus contraignantes.",
    symboliqueAfricaine:
      "Dans la divination bamana et yoruba, le Rat des champs est l'animal qui révèle ce qui est caché. Les devins observent son comportement pour comprendre les dynamiques cachées d'une situation. Il incarne la prudence face aux pièges invisibles.",
    symboliqueSpirirtuelle:
      "Le Rat symbolise le travail discret et constant qui produit des résultats tangibles. Il représente la prudence qui évite les pièges et l'intelligence pratique qui transforme même les restes en ressources. Sa fertilité symbolise l'abondance née de l'effort.",
    symbolique: "Symbole de travail acharné, d'intelligence pratique et de fertilité.",
    qualites: ['Travail acharné', 'Intelligence pratique', 'Prudence éclairée', 'Fertilité', 'Débrouillardise'],
    defauts: ['Image négative', 'Tendance à thésauriser', 'Méfiance excessive', "Difficulté à partager"],
    pouvoirs: ['Pouvoir de travail acharné, survie et intelligence', 'Pouvoir de prudence', 'Pouvoir de fertilité et richesse', 'Débrouillardise'],
    enseignements: [
      "Le travail constant et discret bâtit plus que les grandes démonstrations",
      "La prudence te protège des pièges que l'arrogance ne voit pas",
      "Cherche l'abondance dans ce que les autres ont abandonné",
      "La fertilité vient de l'effort répété, pas de la chance unique",
    ],
    citation: "Le rat qui connaît tous les chemins de la maison mange mieux que celui qui cherche la grande porte.",
    proverbes: [
      "Le rat qui connaît tous les chemins de la maison mange mieux que celui qui cherche la grande porte.",
      "La prudence du rat le fait survivre là où le lion ne peut pas entrer.",
      "Le rat travaille dans l'ombre pour que sa famille soit dans la lumière.",
    ],
    legendes: [
      "Dans la tradition bambara de divination, on dit que les Rats des greniers sacrés connaissent les secrets de la prochaine récolte. Les devins observaient leur comportement avant les semailles : s'ils stockaient beaucoup, la récolte serait abondante ; s'ils cherchaient d'autres greniers, la disette approchait.",
    ],
    conseilsDeVie: [
      "Ne méprise pas le travail discret — il produit souvent les résultats les plus durables.",
      "Développe ta prudence face aux risques — évaluer avant d'agir n'est pas de la lâcheté.",
      "Ton intelligence pratique est un don rare — utilise-la pour créer de la valeur là où les autres voient des restes.",
    ],
    niveauSpirituel: 2,
    regionOrigine: 'Greniers et villages du Sahel',
    couleur: '#7A7A5C',
    couleurSecondaire: '#4D4D3A',
    enseignementDuJour:
      "Aujourd'hui, valorise le travail constant et discret que tu fais chaque jour. C'est lui qui construit ta vie, pas les grands éclats.",
  },

  {
    id: 'escargot',
    nom: 'Escargot',
    nomAnglais: 'Snail',
    nomScientifique: 'Achatina fulica',
    categorie: 'Invertébrés',
    element: 'Eau',
    description:
      "L'Escargot est le gardien des émotions et du rythme sacré. Il porte sa maison sur lui et avance au rythme qui lui convient, maître de la patience et de l'auto-protection douce.",
    symboliqueAfricaine:
      "L'Escargot géant d'Afrique est un animal important dans la cuisine et la médecine traditionnelle. Dans les traditions du Golfe de Guinée, sa coquille spiralée symbolise l'évolution de l'âme — toujours plus grande, toujours en expansion, sans jamais perdre son centre.",
    symboliqueSpirirtuelle:
      "L'Escargot symbolise le voyage intérieur lent mais transformateur. Sa coquille spiralée est la carte de l'évolution spirituelle : en spirale, revenant toujours au même point mais toujours plus haut. Il représente les émotions comme portes vers l'esprit.",
    symbolique: "Symbole de voyage intérieur, d'émotions sacrées et de protection douce.",
    qualites: ['Profondeur émotionnelle', 'Patience sacrée', 'Auto-protection douce', 'Sens du rythme', 'Évolution spiralée'],
    defauts: ['Lenteur parfois excessive', 'Tendance au retrait', 'Vulnérabilité aux environnements secs'],
    pouvoirs: ["Pouvoir des émotions et de l'esprit", "Pouvoir d'auto-protection et patience", 'Évolution spiralée', 'Rythme sacré'],
    enseignements: [
      "Tes émotions sont des portes vers ton esprit — honore-les",
      "Avance à ton propre rythme sans t'excuser",
      "Porte ta maison avec toi — tu es complet en toi-même",
      "La spirale est la forme de toute véritable évolution",
    ],
    citation: "L'escargot avance lentement mais il n'abandonne jamais son chemin.",
    proverbes: [
      "L'escargot avance lentement mais il n'abandonne jamais son chemin.",
      "La maison de l'escargot lui appartient partout où il va.",
      "L'escargot dit : 'Je suis lent, mais j'arrive toujours là où je dois être.'",
    ],
    legendes: [
      "Une tradition du Bénin raconte que l'Escargot fut l'un des premiers êtres à comprendre la forme spiralée de l'univers. Il la porte sur son dos depuis le commencement. Les initiés qui méditent sur la coquille d'escargot comprennent le mouvement de toute chose : en spirale, jamais vraiment en arrière, jamais vraiment en avant — toujours plus.",
    ],
    conseilsDeVie: [
      "Écoute tes émotions — elles sont des messagers, pas des ennemis.",
      "Respecte ton rythme naturel et arrête de t'excuser d'être lent.",
      "La spirale est une bonne image pour ta croissance — tu reviens aux mêmes thèmes mais à un niveau plus profond.",
    ],
    niveauSpirituel: 3,
    regionOrigine: 'Forêts humides du Golfe de Guinée',
    couleur: '#8A7A5A',
    couleurSecondaire: '#5C4D3A',
    enseignementDuJour:
      "Aujourd'hui, écoute une émotion que tu as tendance à mettre de côté. Elle te dit quelque chose d'important.",
  },

  {
    id: 'ecureuil',
    nom: 'Écureuil',
    nomAnglais: 'Squirrel',
    nomScientifique: 'Heliosciurus rufobrachium',
    categorie: 'Mammifères',
    element: 'Air',
    description:
      "L'Écureuil est le maître de la prévoyance et de la préparation. Agile et organisé, il enseigne l'art d'accumuler la sagesse et les ressources pour les temps qui viennent.",
    symboliqueAfricaine:
      "Dans les forêts de savane d'Afrique de l'Ouest, l'Écureuil roux est l'animal de la prévoyance et de la mémoire topographique. Les chasseurs dogon observent ses cachettes pour comprendre l'abondance ou la rareté à venir. Il est le planificateur naturel.",
    symboliqueSpirirtuelle:
      "L'Écureuil symbolise la sagesse préparatoire — rassembler les ressources spirituelles, les connaissances et les connexions qui nourriront les périodes difficiles. Il représente l'intelligence du futur : penser maintenant à ce dont demain aura besoin.",
    symbolique: "Symbole de prévoyance, d'accumulation sage et de préparation pour l'avenir.",
    qualites: ['Prévoyance', 'Organisation', 'Mémoire précise', 'Agilité mentale', 'Préparation proactive'],
    defauts: ['Tendance à l\'accumulation excessive', 'Anxiété face au manque', 'Difficulté à profiter du présent'],
    pouvoirs: ['Pouvoir de rassemblement', 'Pouvoir de survie et préparation pour le futur', 'Prévoyance', 'Organisation des ressources'],
    enseignements: [
      "Prépare aujourd'hui ce dont demain aura besoin",
      "Accumuler la sagesse est le meilleur investissement",
      "L'agilité n'est précieuse que si elle sert une stratégie",
      "Souviens-toi où tu as planté tes graines — elles germeront",
    ],
    citation: "L'écureuil qui ne prépare pas l'hiver mange ses regrets au printemps.",
    proverbes: [
      "L'écureuil qui ne prépare pas l'hiver mange ses regrets au printemps.",
      "L'écureuil connaît l'emplacement de chaque graine — sa mémoire est son trésor.",
      "Prépare le futur comme l'écureuil prépare l'hiver — avec soin et sans anxiété.",
    ],
    legendes: [
      "Une tradition du Burkina Faso raconte qu'un Écureuil sage cacha des graines de mil dans cent endroits différents. Lors de la grande sécheresse, il ne retrouva que soixante de ses cachettes — mais ces soixante nourrirent tout son village. Sa prévoyance imparfaite était encore meilleure que l'absence de prévoyance.",
    ],
    conseilsDeVie: [
      "Investis maintenant dans tes connaissances, relations et ressources — ils nourriront les temps difficiles.",
      "La prévoyance n'est pas l'anxiété — c'est la confiance en ta propre intelligence.",
      "Plante des graines dont tu ne verras peut-être pas tous les fruits — c'est la vraie générosité.",
    ],
    niveauSpirituel: 3,
    regionOrigine: 'Forêts de savane du Burkina Faso et du Ghana',
    couleur: '#C46A2E',
    couleurSecondaire: '#8B3A1A',
    enseignementDuJour:
      "Aujourd'hui, fais un geste de prévoyance : épargne quelque chose, apprends quelque chose, plante quelque chose.",
  },

  {
    id: 'cygne',
    nom: 'Cygne / Oiseau-Trompette',
    nomAnglais: 'Swan / Trumpeter Bird',
    nomScientifique: 'Balearica regulorum',
    categorie: 'Oiseaux',
    element: 'Eau',
    description:
      "Le Cygne-Trompette est l'oiseau de la grâce absolue et de la conscience intérieure. Sa beauté extérieure reflète la beauté intérieure de celui qui a trouvé l'acceptation et la loyauté comme modes de vie.",
    symboliqueAfricaine:
      "La Grue royale, oiseau proche du Cygne-Trompette en Afrique de l'Est et centrale, est l'un des plus beaux oiseaux du continent. Elle orne les armoiries nationales de l'Ouganda. Sa couronne de plumes dorées symbolise la royauté spirituelle — la noblesse intérieure qui se voit de loin.",
    symboliqueSpirirtuelle:
      "Le Cygne-Trompette symbolise l'éveil à la beauté intérieure — la transformation de 'vilain petit canard' en être pleinement accompli. Il représente l'acceptation de soi qui précède la vraie beauté, et la loyauté qui crée des liens durables.",
    symbolique: "Symbole de grâce, de conscience de la beauté intérieure, d'acceptation et de loyauté.",
    qualites: ['Grâce raffinée', "Conscience de la beauté intérieure", 'Acceptation profonde', 'Loyauté', 'Longévité'],
    defauts: ['Susceptibilité aux jugements', 'Tendance à l\'idéalisme', 'Difficulté avec la laideur du monde'],
    pouvoirs: ['Pouvoir de grâce et force', "Pouvoir de conscience, beauté intérieure", 'Pouvoir d\'acceptation, loyauté, longévité', 'Beauté transcendante'],
    enseignements: [
      "La beauté intérieure précède toujours la beauté extérieure",
      "L'acceptation de soi est le plus beau des ornements",
      "La grâce se cultive — elle n'est pas donnée par le hasard",
      "La loyauté à soi-même permet la loyauté aux autres",
    ],
    citation: "Le cygne ne cherche pas le miroir pour confirmer sa beauté — il la vit.",
    proverbes: [
      "Le cygne ne cherche pas le miroir pour confirmer sa beauté — il la vit.",
      "La grâce du cygne vient de ce qu'il est en paix avec lui-même.",
      "Celui qui accepte sa propre beauté n'a plus besoin de diminuer celle des autres.",
    ],
    legendes: [
      "La Grue royale d'Afrique de l'Est dit-on fut autrefois un oiseau ordinaire. Mais elle refusait de se comparer aux autres oiseaux — elle vivait simplement dans sa propre nature. Les dieux, touchés par son acceptation, la couronnèrent d'or. Sa grâce actuelle est la récompense de son ancienne paix intérieure.",
    ],
    conseilsDeVie: [
      "Cesse de comparer ta beauté à celle des autres — la tienne est unique et ne peut être jugée.",
      "Cultive l'acceptation de toi-même comme pratique quotidienne.",
      "La loyauté à ta propre nature est la source de toute grâce véritable.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Zones lacustres d'Afrique de l'Est et centrale",
    couleur: '#9090C0',
    couleurSecondaire: '#5C5C8A',
    enseignementDuJour:
      "Aujourd'hui, nomme une qualité en toi que tu ne t'accordes pas assez souvent le droit de reconnaître. C'est là ta grâce.",
  },

  /* ═══════════════════════════════════════════════════════════
     NOUVEAUX ANIMAUX (16)
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'gorille',
    nom: 'Gorille',
    nomAnglais: 'Gorilla',
    nomScientifique: 'Gorilla gorilla',
    categorie: 'Mammifères',
    element: 'Terre',
    description:
      "Le Gorille est le gardien silencieux de la forêt sacrée. Être de grande force intérieure, il ne combat que pour protéger, jamais pour dominer. Dans les traditions d'Afrique centrale et de l'Ouest, il est l'ancêtre gardien des forêts primaires.",
    symboliqueAfricaine:
      "Dans les traditions bassa et beti du Cameroun, le Gorille est le père de la forêt — son territoire est sacré, intouchable. Les chasseurs demandaient sa permission avant d'entrer dans la forêt. Le tuer sans raison spirituelle attire la colère des ancêtres.",
    symboliqueSpirirtuelle:
      "Le Gorille enseigne que la vraie puissance n'a pas besoin de se prouver. Il incarne la sagesse silencieuse du père, la protection sans violence, et la force qui s'exerce avec retenue. Sa présence suffit.",
    symbolique: "Symbole de force sage, de paternité protectrice et de puissance intérieure contenue.",
    qualites: ['Force intérieure massive', 'Protection naturelle', 'Calme imperturbable', 'Sagesse silencieuse', 'Sens du clan'],
    defauts: ['Repli sur soi', 'Résistance au changement', 'Impressionner plutôt que communiquer', 'Isolement territorial'],
    pouvoirs: ['Force de la terre', 'Protection ancestrale', 'Stabilité émotionnelle', 'Autorité naturelle'],
    enseignements: [
      "La vraie force se tait là où la faiblesse crie",
      "Protéger sa famille est la forme la plus haute du courage",
      "La lenteur délibérée est plus puissante que la vitesse incontrôlée",
      "Le silence d'un sage pèse plus que mille discours",
    ],
    citation: "Celui qui connaît sa force n'a pas besoin de la montrer.",
    proverbes: [
      "Celui qui connaît sa force n'a pas besoin de la montrer.",
      "Le gorille ne court pas après les mouches.",
      "La forêt respecte celui qui la respecte.",
      "Le géant qui s'agenouille est plus grand encore.",
    ],
    legendes: [
      "La légende beti raconte qu'au commencement, le Gorille et l'Homme étaient frères. Quand les hommes choisirent les villages, le Gorille choisit la forêt. Depuis, quand un Gorille croise le regard d'un homme, il lui transmet le souvenir de leur fraternité originelle.",
    ],
    conseilsDeVie: [
      "Ta force est ta responsabilité — utilise-la pour élever, jamais pour écraser.",
      "Sois présent sans envahir. Ta seule présence peut changer l'atmosphère d'une pièce.",
      "Prends soin de ton clan avant de vouloir conquérir le monde.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Forêts équatoriales d'Afrique centrale et de l'Ouest",
    couleur: '#4A5240',
    couleurSecondaire: '#2E3328',
    enseignementDuJour:
      "Aujourd'hui, exerce ta force avec douceur. La vraie puissance protège sans jamais humilier.",
  },

  {
    id: 'buffle',
    nom: 'Buffle',
    nomAnglais: 'African Buffalo',
    nomScientifique: 'Syncerus caffer',
    categorie: 'Mammifères',
    element: 'Terre',
    description:
      "Le Buffle est l'emblème de l'endurance collective et de la résistance indomptable. Animal de clan par excellence, il n'abandonne jamais les siens. Dans les rites initiatiques d'Afrique de l'Ouest, il symbolise le passage à l'âge adulte et la force du peuple uni.",
    symboliqueAfricaine:
      "Chez les Mandingues, le Buffle est l'animal totem des guerriers d'élite. La société secrète du Komo au Mali utilise le crâne de Buffle dans ses cérémonies d'initiation les plus sacrées. Sa corne est un instrument de pouvoir utilisé par les chasseurs-guérisseurs.",
    symboliqueSpirirtuelle:
      "Le Buffle enseigne que la communauté est une armure. Seul, il peut être abattu ; en troupeau, il est invincible. Il incarne la puissance de l'union, l'endurance face à l'adversité et la loyauté envers les siens jusqu'à la mort.",
    symbolique: "Symbole d'endurance collective, de loyauté absolue et de puissance du groupe.",
    qualites: ['Endurance exceptionnelle', 'Loyauté indéfectible', 'Résistance face au danger', 'Solidarité du troupeau', 'Détermination'],
    defauts: ['Rancune tenace', 'Impétuosité en colère', 'Difficulté à pardonner', 'Entêtement'],
    pouvoirs: ['Force du troupeau', 'Protection collective', 'Endurance spirituelle', 'Résistance aux épreuves'],
    enseignements: [
      "On ne laisse jamais un frère derrière soi",
      "La force du groupe surpasse toujours celle de l'individu",
      "Endure — ce qui ne te brise pas te rend indestructible",
      "Ton clan est ton armure la plus solide",
    ],
    citation: "Le buffle qui marche seul finit dans la gueule du lion.",
    proverbes: [
      "Le buffle qui marche seul finit dans la gueule du lion.",
      "Quand le troupeau charge, même la terre tremble.",
      "Un buffle ne trahit jamais celui qui a bu à la même mare.",
      "La corne du buffle pousse lentement mais elle est dure comme le fer.",
    ],
    legendes: [
      "La légende mandingue raconte qu'un chasseur avait blessé un buffle sans le tuer. Le buffle le poursuivit trois jours. Quand le chasseur tomba d'épuisement, le buffle s'arrêta et dit : 'Je voulais te montrer ce que ressent celui qu'on abandonne blessé.' Depuis, les chasseurs mandingues achèvent toujours leur proie par respect.",
    ],
    conseilsDeVie: [
      "Identifie ton troupeau — ces personnes pour qui tu irais jusqu'au bout. Chéris-les.",
      "Quand tu es épuisé, laisse les autres porter le groupe. Tu prendras le relais ensuite.",
      "Ta rancune est une corne dirigée vers toi-même. Apprends à la retourner.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Savanes et forêts galeries d'Afrique de l'Ouest",
    couleur: '#6B4C2A',
    couleurSecondaire: '#3D2A16',
    enseignementDuJour:
      "Aujourd'hui, pense à quelqu'un de ton clan qui a besoin de toi. Le buffle ne compte pas — il charge.",
  },

  {
    id: 'rhinoceros',
    nom: 'Rhinocéros',
    nomAnglais: 'Rhinoceros',
    nomScientifique: 'Ceratotherium simum',
    categorie: 'Mammifères',
    element: 'Terre',
    description:
      "Le Rhinocéros est l'incarnation de la force primordiale et de la détermination sans détour. Animal blindé par la nature, il avance avec une certitude absolue. Rare et mystérieux, il est dans les traditions africaines le gardien des forces telluriques les plus profondes.",
    symboliqueAfricaine:
      "Dans les traditions zulu et sotho, la corne de Rhinocéros est l'un des ingrédients les plus puissants de la médecine traditionnelle — non pour sa poudre, mais pour l'énergie qu'elle concentre. Elle symbolise la détermination du chef qui avance sans reculer face à l'ennemi.",
    symboliqueSpirirtuelle:
      "Le Rhinocéros incarne l'ancrage absolu dans la matière et la direction claire. Il ne voit pas loin mais il va droit. Il enseigne la puissance de la conviction : avancer sans hésitation sur le chemin qu'on a choisi, blindé contre le doute.",
    symbolique: "Symbole de détermination inébranlable, d'ancrage et de force primordiale.",
    qualites: ['Détermination absolue', 'Résistance naturelle', 'Absence de peur', 'Puissance brute', 'Stabilité'],
    defauts: ['Manque de vision lointaine', 'Rigidité', 'Brutalité involontaire', 'Imprévisibilité en colère'],
    pouvoirs: ['Force de la terre', 'Blindage spirituel', 'Détermination sans faille', "Ancrage dans l'action"],
    enseignements: [
      "Choisis ta direction et avance — le doute est le seul ennemi qui peut t'arrêter",
      "Ton blindage intérieur te protège — fais-lui confiance",
      "La rareté de ta nature est ta valeur, pas ta faiblesse",
      "La ligne droite est parfois le chemin le plus courageux",
    ],
    citation: "Le rhinocéros ne demande pas la permission d'avancer.",
    proverbes: [
      "Le rhinocéros ne demande pas la permission d'avancer.",
      "Ce qui est blindé de l'intérieur n'a pas peur des pierres.",
      "La rareté du rhinocéros fait sa puissance.",
      "Quand le rhinocéros charge, même la montagne s'écarte.",
    ],
    legendes: [
      "La légende zulu raconte que le Rhinocéros fut autrefois le gardien du feu sacré. Quand les hommes volèrent le feu, il courut si vite pour les rattraper que sa peau se plissa en armure. Depuis, il porte ces plis comme les cicatrices d'un gardien trahi — et il charge tout ce qui se dresse devant lui.",
    ],
    conseilsDeVie: [
      "Décide et avance. L'hésitation perpétuelle use plus que l'action.",
      "Construis ton blindage intérieur — méditation, discipline, ancrage. Aucune parole blessante n'atteint celui qui est solide en lui-même.",
      "Ta rareté est une force. Ne te dilue pas pour appartenir.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Savanes d'Afrique de l'Est et du Sud",
    couleur: '#7A6652',
    couleurSecondaire: '#4A3C2E',
    enseignementDuJour:
      "Aujourd'hui, identifie une décision que tu repousses. Prends-la. Avance. Le rhinocéros ne regarde pas en arrière.",
  },

  {
    id: 'guepard',
    nom: 'Guépard',
    nomAnglais: 'Cheetah',
    nomScientifique: 'Acinonyx jubatus',
    categorie: 'Mammifères',
    element: 'Feu',
    description:
      "Le Guépard est le maître de la vitesse et de la grâce parfaite. Animal le plus rapide du monde, il accomplit l'impossible en quelques secondes. Dans les traditions d'Afrique de l'Est et de l'Ouest, il symbolise l'opportunité saisie au vol et l'action dans sa forme la plus pure.",
    symboliqueAfricaine:
      "Chez les Massaï et dans les cours royales d'Afrique de l'Ouest, le Guépard était l'animal des messagers sacrés — sa vitesse en faisait le lien entre les royaumes. Des guépards apprivoisés ornaient les palais comme symboles de la puissance royale maîtrisée.",
    symboliqueSpirirtuelle:
      "Le Guépard enseigne l'art de l'instant décisif. Il ne peut courir qu'une centaine de mètres à pleine vitesse — il doit donc choisir avec une précision absolue le bon moment. Il incarne le focus total, l'action parfaite et le lâcher-prise après l'effort.",
    symbolique: "Symbole de vitesse, de précision dans l'action et de saisie de l'opportunité parfaite.",
    qualites: ['Vitesse de décision', 'Grâce naturelle', 'Focus absolu', 'Agilité mentale', 'Élégance dans action'],
    defauts: ['Épuisement rapide', "Vulnérabilité après l'effort", "Difficulté à tenir sur la durée", 'Timidité hors de la chasse'],
    pouvoirs: ['Vitesse de manifestation', 'Focus laser', 'Saisie de opportunité', 'Action parfaite'],
    enseignements: [
      "L'opportunité ne se présente qu'une fois — sois prêt",
      "La précision vaut mieux que la puissance brute",
      "Après l'effort maximal, repose-toi sans culpabilité",
      "Ta grâce est une intelligence — laisse-la te guider",
    ],
    citation: "Le guépard ne court pas pour toujours — il court pour l'essentiel.",
    proverbes: [
      "Le guépard ne court pas pour toujours — il court pour l'essentiel.",
      "La vitesse sans direction est du vent.",
      "Celui qui voit l'occasion et hésite la voit partir.",
      "Le guépard épuisé est plus vulnérable que l'antilope reposée.",
    ],
    legendes: [
      "La légende swahili raconte qu'au commencement, le Guépard courait si vite qu'il attrapait les étoiles. Les dieux, jaloux, lui retirèrent l'endurance pour qu'il ne puisse tout saisir à la fois. Les larmes du Guépard, qui coula depuis ses yeux, laissèrent des traces noires sur son visage — les marques de ceux qui doivent choisir.",
    ],
    conseilsDeVie: [
      "Identifie tes moments de pic d'énergie et réserve-les pour ce qui compte vraiment.",
      "Sois prêt avant que l'opportunité arrive — elle n'attend pas.",
      "Accepte tes limites d'endurance : mieux vaut briller intensément que s'épuiser à durer.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Savanes d'Afrique de l'Est et de l'Ouest",
    couleur: '#C8A84B',
    couleurSecondaire: '#8B6B1A',
    enseignementDuJour:
      "Aujourd'hui, identifie une opportunité que tu as hésité à saisir. Sprinte vers elle — le guépard ne reconsidère pas.",
  },

  {
    id: 'gnou',
    nom: 'Gnou',
    nomAnglais: 'Wildebeest',
    nomScientifique: 'Connochaetes taurinus',
    categorie: 'Mammifères',
    element: 'Air',
    description:
      "Le Gnou est le symbole du grand voyage collectif et du renouveau cyclique. Chaque année, des millions de gnous traversent les plaines dans la plus grande migration terrestre du monde — un acte de foi collective vers un horizon inconnu mais prometteur.",
    symboliqueAfricaine:
      "Dans les traditions des peuples nomades du Sahel, le Gnou représente l'acceptation des cycles naturels et la sagesse de suivre le bon flux au bon moment. Sa migration est vue comme un enseignement divin : il faut savoir quand partir, même sans certitude d'arriver.",
    symboliqueSpirirtuelle:
      "Le Gnou enseigne la confiance dans le mouvement collectif et l'abandon du contrôle individuel au profit d'un flux plus grand. Il symbolise la foi, le renouveau saisonnier de l'âme et la capacité à traverser les zones de danger avec la force du nombre.",
    symbolique: "Symbole du renouveau cyclique, de la migration sacrée et de la foi dans le flux de la vie.",
    qualites: ['Foi dans le mouvement', 'Endurance du voyage', 'Sens du collectif', 'Adaptation au cycle', 'Persévérance'],
    defauts: ['Suivisme', 'Manque de vision individuelle', "Panique en cas d'isolement", 'Dépendance au groupe'],
    pouvoirs: ['Énergie de renouveau', 'Force migratoire', 'Confiance dans les cycles', 'Traversée des épreuves'],
    enseignements: [
      "Fais confiance au flux — parfois la rivière sait mieux que toi où aller",
      "Le renouveau exige de quitter ce qui était familier",
      "La force du nombre transcende la peur individuelle",
      "Chaque arrivée est une renaissance",
    ],
    citation: "Le gnou ne sait pas où finit la migration — il sait juste qu'il doit avancer.",
    proverbes: [
      "Le gnou ne sait pas où finit la migration — il sait juste qu'il doit avancer.",
      "Celui qui reste sur la rive regarde passer sa vie.",
      "La traversée est dangereuse mais l'autre rive est verte.",
      "On ne peut pas arrêter la migration — on peut seulement y prendre sa place.",
    ],
    legendes: [
      "La légende masaï raconte que le premier Gnou fut un être humain trop attaché à sa terre. Les dieux, pour le libérer, lui donnèrent quatre pattes et la mémoire d'un horizon plus vert. Chaque année, il retourne chercher ce souvenir — et il l'atteint toujours.",
    ],
    conseilsDeVie: [
      "Reconnais les cycles de ta vie : saisons de croissance, saisons de transition. Ne lutte pas contre eux.",
      "Quand tout le monde autour de toi avance, interroge-toi : qu'est-ce qui te retient ?",
      "La transition est inconfortable mais c'est là que la transformation opère.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Grandes plaines d'Afrique de l'Est",
    couleur: '#8B7355',
    couleurSecondaire: '#5C4A2E',
    enseignementDuJour:
      "Aujourd'hui, lâche prise sur le besoin de tout contrôler. Fais confiance au mouvement qui t'emporte.",
  },

  {
    id: 'araignee',
    nom: 'Araignée (Anansi)',
    nomAnglais: 'Spider (Anansi)',
    nomScientifique: 'Nephila senegalensis',
    categorie: 'Invertébrés',
    element: 'Air',
    description:
      "Anansi l'Araignée est la figure mythologique la plus célèbre d'Afrique de l'Ouest. Dieu des histoires et de la sagesse chez les Akan du Ghana, elle incarne la ruse bienveillante, la créativité et le pouvoir des mots. Elle a volé les histoires du dieu du ciel pour les offrir aux hommes.",
    symboliqueAfricaine:
      "Dans la tradition akan, Anansi est le fils de Nyame, le dieu du ciel. Il acheta les histoires du monde en capturant des créatures impossibles à attraper — le frelon, le serpent python, le léopard — par la seule force de son intelligence. Depuis, toutes les histoires lui appartiennent.",
    symboliqueSpirirtuelle:
      "Anansi enseigne que la sagesse et la créativité transcendent la force brute. Elle tisse sa toile — le réseau de tous les possibles — avec une précision mathématique. Elle symbolise le créateur, le conteur, celui qui relie les mondes par le fil des mots et des histoires.",
    symbolique: "Symbole de sagesse créatrice, de ruse bienveillante et du pouvoir des histoires et des mots.",
    qualites: ['Intelligence créative', 'Ruse bienveillante', 'Patience du tisseur', 'Art de la narration', 'Connexion des mondes'],
    defauts: ['Manipulation possible', 'Excès de calcul', 'Méfiance envers la force brute', 'Tendance à la tromperie'],
    pouvoirs: ['Tissage du destin', 'Pouvoir des mots', 'Sagesse créatrice', 'Connexion entre les mondes'],
    enseignements: [
      "Les histoires que tu racontes créent le monde que tu habites",
      "L'intelligence bien utilisée surpasse toujours la force",
      "Tisse des ponts entre les êtres — c'est le travail le plus sacré",
      "Chaque difficulté est un problème à résoudre avec créativité",
    ],
    citation: "Anansi ne combat jamais — il tisse.",
    proverbes: [
      "Anansi ne combat jamais — il tisse.",
      "L'araignée n'a pas peur de la nuit — c'est dans l'obscurité qu'elle voit sa toile briller.",
      "Celui qui possède les histoires possède le monde.",
      "Une petite créature peut déjouer les plus grands — si elle pense mieux.",
    ],
    legendes: [
      "Anansi voulut obtenir les histoires du dieu du ciel Nyame. Nyame demanda en échange le frelon Mboro, le serpent Onini et le léopard Osebo. Anansi captura chacun par la ruse : il mit de l'eau sur le frelon, attacha le serpent en lui faisant croire mesurer un bâton, piégea le léopard dans une fosse. Nyame, impressionné, lui donna toutes les histoires du monde. Depuis, on les appelle 'les histoires d'Anansi'.",
    ],
    conseilsDeVie: [
      "Cultive l'art de raconter — les histoires que tu partages modèlent la réalité collective.",
      "Face à un problème de force, utilise l'intelligence. Face à un problème d'intelligence, utilise la créativité.",
      "Tisse ton réseau avec soin — chaque fil est une relation précieuse.",
    ],
    niveauSpirituel: 5,
    regionOrigine: "Afrique de l'Ouest — tradition akan (Ghana, Côte d'Ivoire)",
    couleur: '#2C1A4A',
    couleurSecondaire: '#1A0D2E',
    enseignementDuJour:
      "Aujourd'hui, raconte une histoire qui élève quelqu'un. Les mots sont tes fils — tisse avec intention.",
  },

  {
    id: 'scorpion',
    nom: 'Scorpion',
    nomAnglais: 'Scorpion',
    nomScientifique: 'Pandinus imperator',
    categorie: 'Invertébrés',
    element: 'Feu',
    description:
      "Le Scorpion est le gardien des frontières entre la vie et la mort, le protecteur qui frappe avant qu'on le touche. Animal de la transformation radicale, il porte en lui à la fois le danger et le remède — son venin, en petite dose, soigne ce qu'il détruit en grande quantité.",
    symboliqueAfricaine:
      "En Égypte ancienne et dans les traditions du Sahel, la déesse-scorpion Serqet protégeait les morts et les guérisseurs. Chez les Dogon du Mali, le Scorpion est le gardien des seuils — les initiés portaient son symbole pour montrer qu'ils avaient traversé la mort symbolique.",
    symboliqueSpirirtuelle:
      "Le Scorpion enseigne la transformation par la crise. Il symbolise la capacité à porter son propre venin sans en mourir — à intégrer ses zones sombres et à en faire une puissance de guérison. Celui qui a traversé sa propre obscurité peut guider les autres.",
    symbolique: "Symbole de protection, de transformation par la crise et de guérison par le danger traversé.",
    qualites: ['Protection instinctive', 'Résistance aux poisons', 'Transformation profonde', 'Discernement du danger', 'Puissance cachée'],
    defauts: ['Méfiance excessive', 'Attaque préventive', 'Isolement défensif', 'Manipulation émotionnelle'],
    pouvoirs: ['Protection des seuils', 'Venin transformateur', 'Vision dans les zones sombres', 'Guérison par la crise'],
    enseignements: [
      "Ton poison, maîtrisé, devient ton remède et ta protection",
      "Traverser sa propre obscurité est la seule voie vers la lumière profonde",
      "La vigilance n'est pas la paranoïa — sache distinguer",
      "Protège ce qui est sacré en toi, même au prix d'être incompris",
    ],
    citation: "Le scorpion ne cherche pas l'ennemi — mais il ne recule jamais devant lui.",
    proverbes: [
      "Le scorpion ne cherche pas l'ennemi — mais il ne recule jamais devant lui.",
      "Celui qui a survécu au venin connaît le remède.",
      "La nuit est l'alliée de celui qui n'a pas peur du noir.",
      "Ne méprise pas le petit — c'est lui qui porte la piqûre fatale.",
    ],
    legendes: [
      "La légende dogon raconte que le premier guérisseur fut piqué par un Scorpion sacré et survécut trois jours entre la vie et la mort. À son réveil, il connaissait tous les poisons et tous les remèdes. Le Scorpion lui avait enseigné les deux faces de la même vérité.",
    ],
    conseilsDeVie: [
      "Identifie tes zones sombres — peurs, colères, douleurs. Ce que tu ne regardes pas te contrôle.",
      "Ton instinct de protection est un don. Apprends à le calibrer plutôt qu'à l'étouffer.",
      "La transformation la plus profonde passe toujours par une crise. Ne fuis pas — traverse.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Zones arides du Sahel et d'Afrique du Nord",
    couleur: '#1A1A2E',
    couleurSecondaire: '#0D0D1A',
    enseignementDuJour:
      "Aujourd'hui, regarde en face une peur que tu évites. Le Scorpion sait que le danger ignoré est le plus mortel.",
  },

  {
    id: 'pangolin',
    nom: 'Pangolin',
    nomAnglais: 'Pangolin',
    nomScientifique: 'Manis tricuspis',
    categorie: 'Mammifères',
    element: 'Terre',
    description:
      "Le Pangolin est l'un des animaux les plus sacrés et les plus mystérieux d'Afrique de l'Ouest. Couvert d'écailles comme une armure vivante, il se roule en boule parfaite face au danger. Au Bénin et au Togo, il est considéré comme un messager entre les mondes visible et invisible.",
    symboliqueAfricaine:
      "Au Bénin, dans la tradition vodoun, le Pangolin est un animal royal et sacré — le tuer est un tabou grave dans de nombreuses communautés. Ses écailles sont utilisées dans les plus puissants gris-gris de protection. Il est le gardien du seuil entre les vivants et les ancêtres.",
    symboliqueSpirirtuelle:
      "Le Pangolin enseigne la protection par l'intériorité. Sa boule parfaite symbolise l'âme qui se retire en elle-même pour se protéger sans fuir. Il incarne aussi le mystère : peu de gens le voient, et ceux qui le rencontrent y voient un signe. Il est le gardien des secrets sacrés.",
    symbolique: "Symbole de protection mystique, de sagesse cachée et de gardien des secrets ancestraux.",
    qualites: ['Protection naturelle', 'Discrétion profonde', 'Connexion au monde invisible', 'Patience', 'Préservation de soi'],
    defauts: ["Isolement excessif", "Difficultés à s'ouvrir", "Incompréhension par les autres", "Renfermement"],
    pouvoirs: ['Protection mystique', 'Gardiennage des secrets', 'Communication avec les ancêtres', 'Blindage spirituel'],
    enseignements: [
      "Se retirer en soi-même est parfois la plus grande sagesse",
      "Les secrets sacrés se gardent, ils ne se vendent pas",
      "Ce qui est rare est précieux — ta singularité est un trésor",
      "La protection la plus puissante vient de l'intérieur",
    ],
    citation: "Le pangolin ne montre ses écailles qu'à ceux qui le méritent.",
    proverbes: [
      "Le pangolin ne montre ses écailles qu'à ceux qui le méritent.",
      "Ce que tu ne vois pas n'est pas absent — c'est caché.",
      "La rareté du pangolin protège sa puissance.",
      "Celui qui garde les secrets du monde porte un fardeau sacré.",
    ],
    legendes: [
      "La légende fon du Bénin raconte que le Pangolin fut envoyé par les ancêtres pour garder le passage entre les deux mondes. Chaque fois qu'un Pangolin est aperçu, c'est qu'un ancêtre veut transmettre un message. On s'arrête, on observe, et on écoute ce que le silence dit.",
    ],
    conseilsDeVie: [
      "Apprends à te retirer en toi sans te couper des autres — il y a une différence.",
      "Certaines de tes qualités sont trop précieuses pour être exposées à tous. Sois sélectif.",
      "Ton lien avec l'invisible est réel. Cultive-le par le silence, le rêve et l'attention.",
    ],
    niveauSpirituel: 5,
    regionOrigine: "Forêts et savanes d'Afrique de l'Ouest — Bénin, Togo, Ghana",
    couleur: '#6B5C3E',
    couleurSecondaire: '#3D3322',
    enseignementDuJour:
      "Aujourd'hui, protège ce qui est précieux en toi. Tout le monde n'a pas accès à ton sanctuaire intérieur.",
  },

  {
    id: 'perroquet',
    nom: 'Perroquet',
    nomAnglais: 'African Grey Parrot',
    nomScientifique: 'Psittacus erithacus',
    categorie: 'Oiseaux',
    element: 'Air',
    description:
      "Le Perroquet est le gardien de la parole sacrée et le messager entre les mondes. Oiseau de la mémoire vivante, il répète ce qu'il entend mais seul l'initié comprend ce qu'il transmet vraiment. Dans les traditions d'Afrique de l'Ouest, il est l'oiseau des griots et des ancêtres.",
    symboliqueAfricaine:
      "En Afrique de l'Ouest, le Perroquet gris est l'oiseau des cours royales et des sanctuaires. Chez les Akan, il était élevé dans les palais pour transmettre les messages sacrés. Les griots comparaient leur mémoire à celle du Perroquet — fidèle, précise, inaltérable.",
    symboliqueSpirirtuelle:
      "Le Perroquet enseigne que la parole est un pouvoir sacré qui doit être mani avec soin. Il rappelle aussi que répéter sans comprendre est vain — la vraie sagesse est dans la transmission avec conscience. Il symbolise la mémoire vivante, la tradition orale et le lien entre les générations.",
    symbolique: "Symbole de la parole sacrée, de la mémoire vivante et du messager entre les mondes.",
    qualites: ['Mémoire exceptionnelle', 'Art de la communication', 'Intelligence vive', 'Fidélité à la parole', 'Sens de la transmission'],
    defauts: ['Répétition sans compréhension', 'Dépendance aux autres', 'Bruyance déplacée', 'Mimétisme excessif'],
    pouvoirs: ['Parole sacrée', 'Mémoire ancestrale', 'Transmission du savoir', 'Messagerie entre les mondes'],
    enseignements: [
      "Les mots que tu prononçes créent ta réalité — parle avec intention",
      "La mémoire vivante est plus puissante que l'écrit",
      "Transmettre ce qu'on a reçu est un acte sacré",
      "Écoute autant que tu parles — la sagesse entre par les oreilles",
    ],
    citation: "Le perroquet ne ment jamais — c'est toi qui décides ce qu'il doit retenir.",
    proverbes: [
      "Le perroquet ne ment jamais — c'est toi qui décides ce qu'il doit retenir.",
      "La parole est une flèche — une fois lancée, on ne la reprend pas.",
      "Celui qui parle beaucoup n'entend pas grand-chose.",
      "La bouche du sage s'ouvre quand les oreilles du monde sont prêtes.",
    ],
    legendes: [
      "La légende akan raconte qu'un roi avait un Perroquet sacré qui répétait tous les secrets entendus au palais. Un jour, l'oiseau révéla une trahison que nul n'avait osé nommer. Le roi comprit que la vérité ne peut être enfermée — elle trouve toujours un porte-voix.",
    ],
    conseilsDeVie: [
      "Mesure tes mots — chaque parole est une graine qui germe dans l'esprit de celui qui l'entend.",
      "Deviens un gardien de la mémoire : écoute les anciens, transmets aux jeunes.",
      "Parle de ce que tu sais, pas de ce que tu supposes. La précision est ta crédibilité.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Forêts d'Afrique centrale et de l'Ouest",
    couleur: '#C0392B',
    couleurSecondaire: '#7D241E',
    enseignementDuJour:
      "Aujourd'hui, pèse chaque mot avant de le prononcer. La parole juste au bon moment vaut plus que mille discours.",
  },

  {
    id: 'ibis',
    nom: 'Ibis Sacré',
    nomAnglais: 'Sacred Ibis',
    nomScientifique: 'Threskiornis aethiopicus',
    categorie: 'Oiseaux',
    element: 'Eau',
    description:
      "L'Ibis Sacré est l'oiseau de la connaissance divine et de la sagesse écrite dans les étoiles. Présent du Delta du Nil aux côtes d'Afrique de l'Ouest, il est l'oiseau des scribes, des guérisseurs et de ceux qui cherchent la vérité au-delà des apparences.",
    symboliqueAfricaine:
      "En Égypte ancienne, l'Ibis était la forme animale de Thoth, dieu de la sagesse et de l'écriture. En Afrique de l'Ouest, l'Ibis sacré est vu comme un oiseau prophétique — son apparition annonce une vérité importante. Les guérisseurs observaient son vol pour lire les messages des ancêtres.",
    symboliqueSpirirtuelle:
      "L'Ibis enseigne la quête de vérité au-delà des illusions. Il fouille les eaux troubles avec son bec précis pour trouver la nourriture cachée — métaphore de celui qui cherche la sagesse là où d'autres ne voient que la boue. Il symbolise la connaissance, l'écriture et la transmission du savoir divin.",
    symbolique: "Symbole de sagesse divine, de quête de vérité et de transmission de la connaissance sacrée.",
    qualites: ['Quête de vérité', 'Intelligence intuitive', 'Sagesse pratique', 'Discernement', 'Précision analytique'],
    defauts: ['Intellectualisme froid', 'Distance émotionnelle', 'Perfectionnisme', 'Jugement excessif'],
    pouvoirs: ['Sagesse divine', 'Lecture des signes', 'Transmission du savoir', 'Discernement du vrai'],
    enseignements: [
      "La vérité se cache dans les eaux troubles — plonge pour la trouver",
      "Écrire, c'est immortaliser — laisse une trace qui guide ceux qui viennent après",
      "La connaissance sans humilité est une arme sans fourreau",
      "Observe les signes — la réalité te parle en permanence",
    ],
    citation: "L'ibis ne cherche pas la nourriture là où l'eau est claire — c'est dans la vase que se cachent les vérités.",
    proverbes: [
      "L'ibis ne cherche pas la nourriture là où l'eau est claire — c'est dans la vase que se cachent les vérités.",
      "Celui qui sait écrire donne une voix aux silencieux.",
      "La sagesse de l'ibis est dans son bec, pas dans ses plumes.",
      "Cherche la vérité là où personne ne regarde.",
    ],
    legendes: [
      "La légende nilotique raconte que l'Ibis Sacré fut le premier à enseigner l'écriture aux hommes — en traçant avec son bec des signes dans la boue du Nil. Ces traces devinrent les premiers hiéroglyphes. Depuis, chaque fois qu'un ibis marche dans la vase, il renouvelle cet enseignement originel.",
    ],
    conseilsDeVie: [
      "Développe ta rigueur intellectuelle — cherche la vérité derrière les apparences.",
      "Écris, note, archive. Ta mémoire seule n'est pas suffisante pour préserver ce qui compte.",
      "Transmets ton savoir activement — la connaissance gardée pour soi se stérilise.",
    ],
    niveauSpirituel: 5,
    regionOrigine: "Delta du Nil et côtes d'Afrique de l'Ouest",
    couleur: '#2E86AB',
    couleurSecondaire: '#1A5276',
    enseignementDuJour:
      "Aujourd'hui, cherche la vérité là où tu ne l'as pas encore regardée. L'ibis fouille là où les autres n'osent pas.",
  },

  {
    id: 'flamant',
    nom: 'Flamant Rose',
    nomAnglais: 'Flamingo',
    nomScientifique: 'Phoenicopterus roseus',
    categorie: 'Oiseaux',
    element: 'Eau',
    description:
      "Le Flamant Rose est l'oiseau de la beauté transformatrice et de l'équilibre parfait. Blanc à la naissance, il devient rose grâce à ce qu'il mange — métaphore vivante de la transformation par la nourriture de l'âme. Il vit en vastes colonies mais se tient toujours élégamment.",
    symboliqueAfricaine:
      "Sur les lacs de la Rift Valley et les côtes d'Afrique de l'Ouest, le Flamant est associé à la purification et à la renaissance. Dans certaines traditions nilotiques, il symbolise l'âme au moment de la mort — qui s'élève en nuée rose vers le ciel. Son vol collectif représente la communion des âmes.",
    symboliqueSpirirtuelle:
      "Le Flamant enseigne que la beauté est le résultat de ce qu'on absorbe intérieurement. Il symbolise l'équilibre entre individu et collectif, entre le monde des eaux et celui des airs. Sa couleur rose est le signe d'une âme nourrie de ce qui l'élève.",
    symbolique: "Symbole de transformation par la beauté intérieure, d'équilibre et d'élégance naturelle.",
    qualites: ['Grâce naturelle', 'Sens de la beauté', 'Équilibre parfait', 'Vie en communauté', 'Transformation visible'],
    defauts: ['Superficialité apparente', 'Dépendance au groupe', 'Fragilité hors milieu naturel', 'Conformisme'],
    pouvoirs: ['Beauté transformatrice', 'Équilibre des éléments', 'Purification', 'Élévation collective'],
    enseignements: [
      "Tu deviens ce que tu consommes — nourris ton âme avec soin",
      "La beauté authentique est le résultat d'une transformation intérieure",
      "L'équilibre sur une jambe est une pratique — cultive-le chaque jour",
      "La grâce n'est pas la faiblesse — c'est la maîtrise",
    ],
    citation: "Le flamant rose n'était pas rose en naissant — il est devenu ce qu'il a choisi de nourrir.",
    proverbes: [
      "Le flamant rose n'était pas rose en naissant — il est devenu ce qu'il a choisi de nourrir.",
      "On reconnaît l'oiseau à ses couleurs, et l'homme à ses fréquentations.",
      "La beauté qui dure vient du dedans.",
      "Mille flamants ensemble font un seul coucher de soleil.",
    ],
    legendes: [
      "La légende nilotique raconte que le premier Flamant était blanc comme la neige. Un jour, il plongea dans un lac sacré rempli de couchers de soleil liquides. En ressortant, il était rose — et depuis, il cherche à retrouver ce lac dans chaque plan d'eau qu'il visite.",
    ],
    conseilsDeVie: [
      "Fais attention à ce dont tu te nourris mentalement et spirituellement — cela colore littéralement qui tu es.",
      "Cultive l'équilibre comme une discipline quotidienne, pas comme un état acquis.",
      "Ta beauté intérieure n'a pas besoin d'être défendue — elle parle d'elle-même.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Lacs et côtes d'Afrique de l'Est et du Nord-Ouest",
    couleur: '#FF6B9D',
    couleurSecondaire: '#C0396B',
    enseignementDuJour:
      "Aujourd'hui, demande-toi : de quoi est-ce que je me nourris ? Lectures, conversations, pensées. Qu'est-ce que ça colore en moi ?",
  },

  {
    id: 'heron',
    nom: 'Héron',
    nomAnglais: 'Grey Heron',
    nomScientifique: 'Ardea cinerea',
    categorie: 'Oiseaux',
    element: 'Eau',
    description:
      "Le Héron est le maître de la patience et de l'immobilité active. Debout dans l'eau pendant des heures, immobile comme une statue, il frappe avec une précision foudroyante au moment parfait. Dans les traditions d'Afrique de l'Ouest, il est l'oiseau du sage qui attend le bon moment.",
    symboliqueAfricaine:
      "Dans les traditions des peuples du delta du Niger et du fleuve Sénégal, le Héron est l'oiseau des pêcheurs-guérisseurs. Sa patience est légendaire — les anciens disaient qu'un homme qui observe un Héron suffisamment longtemps apprend tout ce qu'il faut savoir sur le bon timing.",
    symboliqueSpirirtuelle:
      "Le Héron enseigne l'art de l'immobilité fertile — ne pas bouger n'est pas l'inaction, c'est la préparation parfaite. Il symbolise la méditation en action, la patience comme puissance et la frappe décisive quand le moment est venu. Il est le sage qui observe avant de parler.",
    symbolique: "Symbole de patience active, de timing parfait et de sagesse contemplative.",
    qualites: ["Patience exceptionnelle", "Précision dans l'action", 'Calme intérieur', 'Observation fine', 'Timing parfait'],
    defauts: ['Passivité excessive', 'Difficulté à agir vite', 'Isolement contemplatif', 'Indécision prolongée'],
    pouvoirs: ['Patience comme puissance', 'Frappe au moment juste', 'Sagesse contemplative', 'Équilibre eau-air'],
    enseignements: [
      "L'immobilité active n'est pas la paresse — c'est la préparation ultime",
      "Attends le moment parfait : ni trop tôt, ni trop tard",
      "L'observation profonde précède toujours l'action juste",
      "Le calme intérieur est ta ressource la plus précieuse",
    ],
    citation: "Le héron ne rate jamais — parce qu'il attend d'être sûr.",
    proverbes: [
      "Le héron ne rate jamais — parce qu'il attend d'être sûr.",
      "La précipitation est la mère de l'échec.",
      "Celui qui observe longtemps frappe juste.",
      "L'eau calme est plus profonde que l'eau agitée.",
    ],
    legendes: [
      "La légende du fleuve Niger raconte qu'un pêcheur pressé ne prenait jamais de poisson. Un vieux héron lui dit : 'Tu arrives avant le poisson. Moi j'attends qu'il arrive à moi.' Le pêcheur apprit la patience et devint le meilleur pêcheur de son village. Depuis, les pêcheurs du Niger observent le Héron avant de lancer leur ligne.",
    ],
    conseilsDeVie: [
      "Développe ta capacité à attendre sans t'impatienter. La patience est un muscle.",
      "Avant chaque décision importante, prends le temps de l'observation silencieuse.",
      "Ton calme en période de tempête est le plus grand service que tu puisses rendre aux autres.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Fleuves et deltas d'Afrique de l'Ouest",
    couleur: '#5B8FB9',
    couleurSecondaire: '#2E5A8A',
    enseignementDuJour:
      "Aujourd'hui, pratique l'immobilité une fois : avant de répondre, avant de décider. Attends. Observe. Puis agis.",
  },

  {
    id: 'zebre',
    nom: 'Zèbre',
    nomAnglais: 'Zebra',
    nomScientifique: 'Equus quagga',
    categorie: 'Mammifères',
    element: 'Air',
    description:
      "Le Zèbre est le symbole vivant de la dualité assumée et de l'identité propre. Ni blanc, ni noir — les deux à la fois, en parfaite harmonie. Dans les traditions africaines, il enseigne que les opposés ne s'excluent pas : ils se complètent et créent quelque chose d'unique.",
    symboliqueAfricaine:
      "Dans les traditions des peuples pasteurs d'Afrique de l'Est, le Zèbre est l'animal de l'équilibre cosmique. Son pelage est une représentation visuelle du jour et de la nuit, de la lumière et de l'ombre. Certaines traditions le voient comme un cheval sacré portant la carte du monde sur son dos.",
    symboliqueSpirirtuelle:
      "Le Zèbre enseigne que ton identité propre est ta plus grande protection. Ses rayures le rendent unique — et dans un troupeau, elles créent un éblouissement qui désarçonne les prédateurs. Il symbolise la force de l'individualité affirmée au sein du collectif.",
    symbolique: "Symbole de dualité harmonieuse, d'identité propre et d'équilibre entre les contraires.",
    qualites: ['Identité affirmée', 'Équilibre des contraires', 'Sens de la communauté', 'Originalité naturelle', 'Adaptation au groupe sans se perdre'],
    defauts: ['Difficulté à choisir un camp', 'Indécision face aux extrêmes', 'Incompréhension par les autres', 'Trop grande adaptabilité'],
    pouvoirs: ['Équilibre des polarités', 'Identité protectrice', 'Harmonie des contraires', 'Force de la singularité'],
    enseignements: [
      "Tu n'as pas à choisir entre deux parts de toi-même — elles sont toutes les deux vraies",
      "Ton originalité est ta protection, pas ta vulnérabilité",
      "Les contraires en toi ne s'excluent pas — ils te rendent complet",
      "Reste toi-même dans le troupeau — c'est là ta vraie force",
    ],
    citation: "Le zèbre ne cherche pas à être cheval — il sait ce qu'il est.",
    proverbes: [
      "Le zèbre ne cherche pas à être cheval — il sait ce qu'il est.",
      "Les rayures du zèbre ne sont pas une erreur de la nature — elles sont sa signature.",
      "Dans un troupeau de zèbres, le lion ne sait plus où regarder.",
      "Qui essaie d'être tout le monde finit par n'être personne.",
    ],
    legendes: [
      "La légende masaï raconte qu'au commencement, le Zèbre était tout blanc. Un jour, il voulut se baigner dans la nuit pour voir ce que cachait l'obscurité. En ressortant, l'ombre s'était accrochée à lui en rayures. Au lieu d'en avoir honte, il comprit qu'il portait désormais les deux vérités du monde. Depuis, le Zèbre marche fièrement entre le jour et la nuit.",
    ],
    conseilsDeVie: [
      "Cesse de vouloir te choisir — tes contradictions sont ce qui te rend complet.",
      "Affirme ton identité propre, surtout quand le groupe pousse à la conformité.",
      "L'équilibre entre tes forces opposées est ton œuvre de vie — pas un problème à résoudre.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Savanes d'Afrique de l'Est et australe",
    couleur: '#2C2C2C',
    couleurSecondaire: '#F5F5F5',
    enseignementDuJour:
      "Aujourd'hui, accepte une contradiction en toi que tu juges. Elle n'est pas un défaut — c'est ta rayure.",
  },

  {
    id: 'girafe',
    nom: 'Girafe',
    nomAnglais: 'Giraffe',
    nomScientifique: 'Giraffa camelopardalis',
    categorie: 'Mammifères',
    element: 'Air',
    description:
      "La Girafe est l'animal de la vision élevée et de l'élégance spirituelle. Seul être à voir au-dessus de la forêt, elle symbolise la capacité à percevoir ce que les autres ne voient pas encore. Dans les traditions africaines, elle est l'animal des voyants, des prophètes et des visionnaires.",
    symboliqueAfricaine:
      "Dans les peintures rupestres du Sahara et du Sahel, la Girafe apparaît comme un être intermédiaire entre la terre et le ciel. Chez les peuples nomades du Sahel, la Girafe est l'animal du guide — celui qui voit le point d'eau avant tout le monde et conduit le groupe vers lui.",
    symboliqueSpirirtuelle:
      "La Girafe enseigne l'élévation du regard — voir loin, voir haut, voir ce qui vient avant que cela n'arrive. Elle incarne aussi la grâce dans la vulnérabilité : pour boire, elle doit plier ses longues pattes et se rendre momentanément vulnérable. L'humilité est le prix de la vision.",
    symbolique: "Symbole de vision élevée, d'élégance dans la vulnérabilité et de perception du lointain.",
    qualites: ['Vision à long terme', 'Élégance naturelle', 'Hauteur de vue', 'Grâce dans la vulnérabilité', 'Perception fine'],
    defauts: ["Difficulté à se pencher vers le détail", "Vulnérabilité dans l'abaissement", "Distance avec le quotidien", "Maladresse dans l'intimité"],
    pouvoirs: ['Vision prophétique', 'Élévation spirituelle', 'Perception du futur', 'Grâce comme puissance'],
    enseignements: [
      "Élève ton regard — les problèmes d'en bas semblent différents d'en haut",
      "Pour boire à la source, il faut accepter de se baisser — l'humilité précède la vision",
      "Ta hauteur de vue est un don au service de ta communauté",
      "Vois loin, mais n'oublie pas ceux qui marchent près de toi",
    ],
    citation: "La girafe voit demain depuis aujourd'hui.",
    proverbes: [
      "La girafe voit demain depuis aujourd'hui.",
      "Celui qui voit loin doit aussi apprendre à se baisser pour boire.",
      "La tête dans les étoiles, les pieds sur la terre — c'est ainsi qu'on guide.",
      "La girafe ne voit pas ce qui est sous ses pieds — tout don a son angle mort.",
    ],
    legendes: [
      "La légende touareg raconte que la Girafe fut autrefois un oracle humain si grand qu'il voyait par-delà l'horizon. Les dieux lui offrirent un corps à la hauteur de sa vision — un cou qui touche presque le ciel. En échange, il dut accepter de se baisser jusqu'au sol pour boire, rappel que même le plus grand visionnaire a besoin d'humilité.",
    ],
    conseilsDeVie: [
      "Cultive une vision à long terme — là où tu veux être dans 5, 10 ans. La girafe voit l'oasis avant d'avoir soif.",
      "Partage ce que tu vois avec ceux qui ne peuvent pas voir aussi loin — c'est ton rôle.",
      "L'élévation sans humilité isole. Penche-toi régulièrement vers ceux qui sont en bas.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Savanes d'Afrique subsaharienne et Sahel",
    couleur: '#C8A46E',
    couleurSecondaire: '#8B5E2A',
    enseignementDuJour:
      "Aujourd'hui, prends de la hauteur sur une situation qui t'oppresse. Vue d'en haut, elle a une autre dimension.",
  },

  {
    id: 'mangouste',
    nom: 'Mangouste',
    nomAnglais: 'Mongoose',
    nomScientifique: 'Herpestes ichneumon',
    categorie: 'Mammifères',
    element: 'Feu',
    description:
      "La Mangouste est la championne du courage face au danger et de l'agilité mentale. Seul animal capable de tuer un cobra à mains nues, elle symbolise la victoire de la vitesse et de l'intelligence sur la peur. Dans les traditions africaines, elle est le totem des guerriers sans peur.",
    symboliqueAfricaine:
      "En Afrique du Nord et de l'Ouest, la Mangouste est l'animal protecteur des maisons et des familles — elle chasse les serpents venimeux avec une efficacité redoutable. Elle est vue comme un gardien naturel, envoyé par les ancêtres pour protéger les foyers. La voir entrer dans une maison est considéré comme un signe de protection.",
    symboliqueSpirirtuelle:
      "La Mangouste enseigne que le courage n'est pas l'absence de peur, mais la décision d'agir malgré elle. Elle connaît le danger du cobra mais l'affronte quand même, avec une technique parfaite. Elle symbolise le guerrier spirituel — celui qui combat ses peurs intérieures avec agilité et précision.",
    symbolique: "Symbole de courage face au danger, d'agilité et de victoire de l'intelligence sur la peur.",
    qualites: ['Courage inébranlable', 'Agilité exceptionnelle', 'Rapidité de décision', 'Protection naturelle', 'Sang-froid face au danger'],
    defauts: ['Imprudence parfois', 'Sous-estimation du danger', 'Hyperactivité', 'Difficulté au repos'],
    pouvoirs: ['Immunité aux venins spirituels', 'Protection du foyer', 'Courage actif', 'Agilité guerrière'],
    enseignements: [
      "Le courage n'est pas l'absence de peur — c'est l'action malgré la peur",
      "Connais ton ennemi mieux qu'il ne te connaît",
      "La vitesse de réaction est une forme d'intelligence",
      "Protège ton foyer et tes proches avec la même détermination",
    ],
    citation: "La mangouste n'attend pas que le cobra frappe — elle frappe la première.",
    proverbes: [
      "La mangouste n'attend pas que le cobra frappe — elle frappe la première.",
      "Le courage sans technique est de la témérité.",
      "Ce que tu combats avec assurance, tu le vaincs.",
      "La petite taille n'interdit pas la grande bravoure.",
    ],
    legendes: [
      "La légende du Maghreb et d'Afrique du Nord raconte qu'une mangouste sauva un enfant endormi en combattant un cobra royal. Le père, rentrant chez lui et voyant la gueule ensanglantée de la mangouste, la frappa croyant qu'elle avait attaqué son enfant. En découvrant le cobra mort, il comprit son erreur. Depuis, la Mangouste est l'emblème de ceux dont la bravoure est incomprise.",
    ],
    conseilsDeVie: [
      "Affronte tes peurs tôt — elles grandissent dans l'évitement.",
      "Développe ta réactivité : l'hésitation face au danger est souvent plus coûteuse que l'action.",
      "Protège activement ce qui compte pour toi — ne laisse pas le cobra s'installer.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Afrique de l'Ouest, du Nord et centrale",
    couleur: '#C0722A',
    couleurSecondaire: '#7D4A1A',
    enseignementDuJour:
      "Aujourd'hui, affronte une peur que tu évites. La Mangouste ne négocie pas avec le cobra — elle agit.",
  },

  {
    id: 'phacochère',
    nom: 'Phacochère',
    nomAnglais: 'Warthog',
    nomScientifique: 'Phacochoerus africanus',
    categorie: 'Mammifères',
    element: 'Terre',
    description:
      "Le Phacochère est l'animal de la ténacité humble et du courage sans prétention. Loin d'être beau ou impressionnant, il survit dans les conditions les plus difficiles avec une détermination remarquable. Dans les traditions africaines, il symbolise ceux qui réussissent non par grâce mais par acharnement.",
    symboliqueAfricaine:
      "Dans les traditions des peuples de savane, le Phacochère est l'animal du peuple — robuste, sans fioritures, capable de tout. Il est l'emblème de ceux qui creusent profond, littéralement (il creuse des terriers) et figurativement. Les chasseurs respectaient sa ténacité : blessé, il continue de charger.",
    symboliqueSpirirtuelle:
      "Le Phacochère enseigne que la ténacité vaut plus que la beauté, et que l'humilité de s'agenouiller pour boire (il fléchit ses pattes avant) est la marque du sage. Il symbolise la persévérance sans ego, le travail acharné sans reconnaissance et la capacité à se battre jusqu'au bout.",
    symbolique: "Symbole de ténacité humble, de persévérance sans gloire et de courage du peuple.",
    qualites: ['Ténacité extrême', 'Humilité naturelle', 'Résistance aux épreuves', 'Pragmatisme', 'Persévérance sans ego'],
    defauts: ["Manque d'élégance sociale", 'Entêtement contre-productif', 'Sous-estimation de soi', 'Impétuosité'],
    pouvoirs: ['Endurance des profondeurs', 'Persévérance sacrée', 'Ancrage dans le réel', 'Résistance aux coups du sort'],
    enseignements: [
      "Le travail acharné sans gloire a sa propre dignité",
      "S'agenouiller pour boire n'est pas une faiblesse — c'est une sagesse",
      "Creuse profond — les racines solides résistent aux tempêtes",
      "La ténacité sans élégance vaut mieux que l'élégance sans substance",
    ],
    citation: "Le phacochère ne gagne pas par beauté — il gagne par refus d'abandonner.",
    proverbes: [
      "Le phacochère ne gagne pas par beauté — il gagne par refus d'abandonner.",
      "Celui qui creuse assez profond trouve toujours de l'eau.",
      "La laideur du phacochère n'empêche pas sa chair de nourrir.",
      "Blessé, le phacochère charge encore — c'est ça le vrai courage.",
    ],
    legendes: [
      "La légende des peuples de savane raconte que le Phacochère demanda un jour aux dieux pourquoi il était si laid alors qu'il travaillait si dur. Les dieux répondirent : 'Nous t'avons donné la laideur pour que les hommes sous-estiment ta force — et qu'ils apprennent que l'apparence ne dit rien de la valeur.' Depuis, le Phacochère porte sa laideur comme un honneur.",
    ],
    conseilsDeVie: [
      "Cesse d'attendre d'être reconnu pour travailler dur. La ténacité silencieuse construit des monuments.",
      "S'agenouiller devant une réalité difficile pour mieux la traverser n'est pas de la faiblesse.",
      "Creuse ton terrier — bâtis ta sécurité dans le concret, pas dans les apparences.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Savanes d'Afrique subsaharienne",
    couleur: '#8B6914',
    couleurSecondaire: '#5C4209',
    enseignementDuJour:
      "Aujourd'hui, continue même sans applaudissements. Le Phacochère ne fait pas de show — il avance.",
  },

  {
    id: 'oryctérope',
    nom: 'Oryctérope',
    nomAnglais: 'Aardvark',
    nomScientifique: 'Orycteropus afer',
    categorie: 'Mammifères',
    element: 'Terre',
    description:
      "L'Oryctérope est le gardien silencieux des seuils entre les mondes — le fouisseur sacré qui ouvre des passages dans la terre mère. Nocturne et solitaire, il incarne la persévérance tranquille et la capacité à révéler ce qui est caché dans les profondeurs de la terre et de l'âme.",
    symboliqueAfricaine:
      "Dans les traditions bambara du Mali, l'oryctérope — nommé 'n'gouroukou' — est le gardien des entrées vers le monde des ancêtres : ses terriers sont des portes sacrées que les devins consultent avant les grandes décisions. Chez les Dogon de la falaise de Bandiagara, son museau allongé évoque la forme des masques Kanaga liés à la création du monde, et ses galeries souterraines symbolisent les canaux de communication avec Nommo, le génie primordial. Les Mossi du Burkina Faso le nomment 'baga' et voient en lui un maître de la connaissance cachée, capable de flairer la vérité là où l'œil ne voit rien.",
    symboliqueSpirirtuelle:
      "L'Oryctérope incarne la quête intérieure par l'humilité : il fouille la terre — symbole de l'inconscient et des mémoires ancestrales — pour en extraire la nourriture essentielle. Sa longue langue précise représente la capacité à saisir la vérité dans les recoins les plus obscurs. Sa peau épaisse et ridée est la sagesse accumulée dans le silence — une armure naturelle contre la superficialité du monde des apparences.",
    symbolique:
      "Symbole de persévérance silencieuse, de discernement profond et de gardiennage des seuils entre les mondes visibles et invisibles.",
    qualites: [
      'Persévérance inébranlable',
      'Discernement profond',
      'Humilité authentique',
      'Résilience face aux épreuves',
      'Intuition développée',
    ],
    defauts: [
      'Isolement excessif',
      'Difficulté à communiquer',
      'Méfiance envers les autres',
      'Tendance au repli sur soi',
    ],
    pouvoirs: [
      'Gardien des seuils sacrés',
      'Vision dans les ténèbres',
      'Connaissance des terres cachées',
      'Protection par la discrétion',
    ],
    enseignements: [
      "La vérité se trouve dans les profondeurs, jamais à la surface",
      "Le travail silencieux et constant produit des résultats que le bruit ne peut égaler",
      "Ouvre des chemins pour ceux qui viendront après toi — ton terrier devient leur refuge",
      "Ta résistance n'est pas ton insensibilité — c'est la sagesse qui te protège",
    ],
    citation: "Celui qui creuse en silence touche le cœur de la terre.",
    proverbes: [
      "L'oryctérope ne vante pas ses terriers — il les construit.",
      "Quand l'oryctérope creuse, même la nuit recule.",
      "Celui qui travaille dans l'ombre nourrit ceux qui vivent à la lumière.",
      "La terre ne refuse rien à qui s'y applique avec patience.",
    ],
    legendes: [
      "Les anciens Bambara racontent que le premier oryctérope fut envoyé par Faro, dieu de l'eau et de la parole, pour creuser les premiers puits de la création. Ses terriers devinrent des sources sacrées où les devins puisent la sagesse des profondeurs.",
      "Chez les Dogon, un oryctérope creusa le premier grenier à mil d'un village frappé par la famine. Ses tunnels révélèrent une réserve d'eau et de graines que personne ne soupçonnait. Depuis, il est appelé 'l'ancêtre fouisseur' — celui qui nourrit sans être vu.",
    ],
    conseilsDeVie: [
      "Travaille dans le silence — ton résultat sera ton seul discours.",
      "Creuse profond dans tes propres fondations avant de bâtir quoi que ce soit.",
      "Ouvre des voies pour les autres sans attendre qu'ils te remercient.",
      "Ta solitude n'est pas un manque — c'est l'espace sacré où tu deviens toi-même.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Savanes et forêts claires d'Afrique de l'Ouest",
    couleur: '#8B5A2B',
    couleurSecondaire: '#5C3317',
    enseignementDuJour:
      "Aujourd'hui, creuse en profondeur plutôt que de t'étaler en surface. La vérité qui nourrit est toujours enfouie.",
  },

];

export const CATEGORIES: AnimalCategorie[] = [
  'Mammifères',
  'Oiseaux',
  'Reptiles',
  'Amphibiens',
  'Aquatiques',
  'Invertébrés',
];

export interface AnimalCri {
  nom: string;
  description: string;
}

export const ANIMAL_CRIS: Record<string, AnimalCri> = {
  lion:          { nom: 'Rugissement',     description: 'Rooaaarrr !' },
  elephant:      { nom: 'Barrissement',    description: 'Paaaooouuu !' },
  leopard:       { nom: 'Feulement',       description: 'Grrrouhhh !' },
  crocodile:     { nom: 'Sifflement',      description: 'Ssshhhhhh !' },
  aigle:         { nom: 'Cri perçant',     description: 'Kiiiieeeh !' },
  serpent:       { nom: 'Sifflement',      description: 'Ssssssss !' },
  grenouille:    { nom: 'Coassement',      description: 'Coâ coâ !' },
  hippopotame:   { nom: 'Mugissement',     description: 'Hnnnnggh !' },
  panthere:      { nom: 'Feulement',       description: 'Grraaouhh !' },
  cigogne:       { nom: 'Craquètement',    description: 'Clac clac !' },
  tortue:        { nom: 'Sifflement sourd', description: 'Hssss...' },
  cameleon:      { nom: 'Sifflement doux', description: 'Shshsh...' },
  vautour:       { nom: 'Sifflement',      description: 'Fshhhhh !' },
  'poisson-chat':{ nom: 'Grognement',      description: 'Grrr grrr !' },
  hyene:         { nom: 'Ricanement',      description: 'Hii hii hiiii !' },
  lezard:        { nom: 'Stridulation',    description: 'Tchk tchk !' },
  singe:         { nom: 'Criaillement',    description: 'Ih ih ih !' },
  souris:        { nom: 'Couinement',      description: 'Ouin ouin !' },
  calao:         { nom: 'Cri strident',    description: 'Okok okok !' },
  cheval:        { nom: 'Hennissement',    description: 'Hiiiiiiih !' },
  iguane:        { nom: 'Sifflement',      description: 'Pshhhhh !' },
  chevre:        { nom: 'Bêlement',        description: 'Bêê bêê !' },
  pintade:       { nom: 'Criaillement',    description: 'Krrr krrr !' },
  lievre:        { nom: 'Glapissement',    description: 'Ouin ouin !' },
  colombe:       { nom: 'Roucoulement',    description: 'Rou rou rou !' },
  poisson:       { nom: 'Silence sacré',   description: '...' },
  cerf:          { nom: 'Bramement',       description: 'Braaaaaah !' },
  chien:         { nom: 'Aboiement',       description: 'Waf waf !' },
  ane:           { nom: 'Braiment',        description: 'Hiiihaaan !' },
  antilope:      { nom: 'Bêlement',        description: 'Mêê mêê !' },
  tatou:         { nom: 'Grognement',      description: 'Grrr grrr !' },
  poulet:        { nom: 'Gloussement',     description: 'Cot cot codèt !' },
  cochon:        { nom: 'Grognement',      description: 'Groin groin !' },
  pigeon:        { nom: 'Roucoulement',    description: 'Rou rou rou !' },
  lapin:         { nom: 'Glapissement',    description: 'Couîî couîî !' },
  'porc-epic':   { nom: 'Grognement',      description: 'Grrrh grrrh !' },
  rat:           { nom: 'Couinement',      description: 'Couic couic !' },
  escargot:      { nom: 'Silence mystique', description: '...' },
  ecureuil:      { nom: 'Criaillement',    description: 'Tchik tchik !' },
  cygne:         { nom: 'Trompette',       description: 'Hooouuuh !' },
  gorille:       { nom: 'Rugissement sourd', description: 'Houuuhhh !' },
  buffle:        { nom: 'Mugissement',     description: 'Mooouuuh !' },
  rhinoceros:    { nom: 'Barrissement',    description: 'Rrrooouh !' },
  guepard:       { nom: 'Feulement aigu',  description: 'Grriihh !' },
  gnou:          { nom: 'Meugling',        description: 'Gnouuuh !' },
  araignee:      { nom: 'Silence tisseur', description: '...' },
  scorpion:      { nom: 'Silence nocturne', description: '...' },
  pangolin:      { nom: 'Sifflement doux', description: 'Shsshsh...' },
  perroquet:     { nom: 'Criaillement',    description: 'Kraaa kraaa !' },
  ibis:          { nom: 'Cri rauque',      description: 'Hrraak !' },
  flamant:       { nom: 'Honking',         description: 'Kak kak kak !' },
  heron:         { nom: 'Croassement',     description: 'Fraank !' },
  zebre:         { nom: 'Aboiement',       description: 'Ouaf ouaf !' },
  girafe:        { nom: 'Silence majestueux', description: '...' },
  mangouste:     { nom: 'Caquètement',     description: 'Tchik tchik !' },
  phacochère:    { nom: 'Grognement',      description: 'Oink oink !' },
  'oryctérope':  { nom: 'Grognement sourd', description: 'Mghhh mghhh !' },
};

export function getAnimalById(id: string): Animal | undefined {
  return ANIMALS.find((a) => a.id === id);
}

export function getAnimalsByCategorie(categorie: AnimalCategorie): Animal[] {
  return ANIMALS.filter((a) => a.categorie === categorie);
}

