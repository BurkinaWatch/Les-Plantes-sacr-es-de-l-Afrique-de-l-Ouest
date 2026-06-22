export type AnimalCategorie =
  | 'Arbres Sacrés'
  | 'Plantes Médicinales'
  | 'Plantes Alimentaires'
  | 'Plantes Rituelles'
  | 'Herbes & Graminées'
  | 'Palmiers';

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
  vertus?: string[];
  usagesTraditionnels?: string[];
}

export const ANIMALS: Animal[] = [

  /* ═══════════════════════════════════════════════════════════
     ARBRES SACRÉS
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'baobab',
    nom: 'Baobab',
    nomAnglais: 'Baobab',
    nomScientifique: 'Adansonia digitata',
    categorie: 'Arbres Sacrés',
    element: 'Terre',
    description:
      "Le Baobab est l'Arbre de Vie par excellence, le grand ancêtre vivant de la savane d'Afrique de l'Ouest. Pouvant vivre plus de deux mille ans, il est le gardien de la mémoire collective, le lieu de palabres des villages et le symbole de la sagesse intergénérationnelle.",
    symboliqueAfricaine:
      "Dans les traditions mandingues, wolof et peules, le Baobab est l'arbre des génies et des ancêtres — on y fait des offrandes, on y prononce les serments importants. Ses creux abritent des esprits protecteurs. Les griots s'y font enterrer, car seul le Baobab peut contenir leur parole.",
    symboliqueSpirirtuelle:
      "Le Baobab symbolise la sagesse qui grandit à rebours du monde visible : il pousse lentement, ses racines plongent infiniment, et il résiste à tout. Il enseigne que la vraie puissance s'ancre dans les profondeurs invisibles, que la mémoire collective est un trésor sacré.",
    symbolique: "Symbole de sagesse ancestrale, de mémoire collective et de vie indestructible.",
    qualites: ['Sagesse profonde', 'Mémoire collective', 'Patience millénaire', 'Générosité absolue', 'Ancrage terrestre'],
    defauts: ['Résistance au changement', 'Lenteur excessive', 'Attachement au passé', 'Immobilisme apparent'],
    pouvoirs: ['Mémoire des ancêtres', 'Connexion intergénérationnelle', 'Force tranquille', 'Nourriture de l\'âme'],
    enseignements: [
      "La vraie sagesse s'acquiert dans le silence et la durée",
      "Nourris les autres de ta pulpe avant de demander quoi que ce soit",
      "Les racines profondes résistent à toutes les tempêtes",
      "La mémoire de ton peuple vit en toi — honore-la",
    ],
    citation: "Le baobab n'a pas peur des saisons sèches — il porte l'eau en lui.",
    proverbes: [
      "Le baobab n'a pas peur des saisons sèches — il porte l'eau en lui.",
      "On ne déracine pas le baobab d'un seul coup de hache.",
      "L'ombre du baobab appartient à tout le village.",
      "Le baobab qui semble mort en saison sèche refleurit toujours — il sait attendre.",
    ],
    legendes: [
      "La légende mandingue raconte que le dieu créateur Maa Ngala planta le premier Baobab au centre du monde. Ses racines rejoignirent le royaume des ancêtres, son tronc connecta les vivants, et ses branches touchèrent le ciel. Depuis, quiconque s'assoit sous le Baobab peut entendre les trois royaumes.",
      "Les Wolof racontent que Dieu renversa le Baobab, ses racines vers le ciel, pour punir son orgueil. Mais l'arbre, même retourné, continua à nourrir et à abriter — la générosité ne peut être punie.",
    ],
    conseilsDeVie: [
      "Développe ta mémoire comme un trésor — ce que tu retiens de tes ancêtres te construit.",
      "Offre ton ombre et ta nourriture sans compter — la générosité est ta vraie force.",
      "Prends le temps qu'il faut. Les solutions durables mûrissent lentement.",
    ],
    niveauSpirituel: 5,
    regionOrigine: "Savanes d'Afrique de l'Ouest — Sénégal, Mali, Burkina Faso",
    couleur: '#8B4513',
    couleurSecondaire: '#5C2E0A',
    enseignementDuJour:
      "Aujourd'hui, honore ta mémoire ancestrale. Prends un moment pour te souvenir de ceux qui t'ont construit.",
    vertus: ['Antioxydant puissant', 'Riche en vitamine C', 'Régulation glycémique', 'Anti-inflammatoire'],
    usagesTraditionnels: ['Fruit comestible (pain de singe)', 'Feuilles consommées et médicinales', 'Écorce en tisane', 'Huile de graines pour la peau'],
  },

  {
    id: 'fromager',
    nom: 'Fromager',
    nomAnglais: 'Kapok Tree',
    nomScientifique: 'Ceiba pentandra',
    categorie: 'Arbres Sacrés',
    element: 'Air',
    description:
      "Le Fromager est l'Arbre des Esprits, le géant de la forêt dont la cime touche les nuages. Dans toute l'Afrique de l'Ouest, il est interdit d'abattre un Fromager — les esprits des ancêtres l'habitent et veillent à travers lui sur les vivants.",
    symboliqueAfricaine:
      "Chez les Yoruba, Igbo et Akan, le Fromager est l'axe du monde — l'arbre cosmique qui relie la terre, le ciel et le monde souterrain. Ses racines en contreforts forment des espaces sacrés où l'on consulte les oracles. Les masques des sociétés secrètes sont sculptés dans d'autres bois, mais déposés à son pied.",
    symboliqueSpirirtuelle:
      "Le Fromager incarne la vision transcendante — sa hauteur lui permet de voir ce que les autres ne voient pas. Il symbolise la connexion entre les plans d'existence et la capacité à porter des messages entre les mondes. Ses graines voyagent au vent, portant la sagesse aux quatre horizons.",
    symbolique: "Symbole de connexion spirituelle, de vision transcendante et d'axe entre les mondes.",
    qualites: ['Vision transcendante', 'Connexion spirituelle', 'Hauteur de vue', 'Messager entre les mondes', 'Protection naturelle'],
    defauts: ['Détachement du quotidien', 'Difficulté à s\'ancrer', 'Inaccessibilité apparente', 'Isolement en hauteur'],
    pouvoirs: ['Connexion aux esprits', 'Vision prophétique', 'Axe cosmique', 'Protection ancestrale'],
    enseignements: [
      "Élève ta vision au-dessus des conflits quotidiens pour voir l'ensemble",
      "Certains secrets ne peuvent être confiés qu'à ceux qui savent s'élever",
      "Ta présence seule peut protéger et guider ceux qui t'entourent",
      "Porte les messages entre le visible et l'invisible",
    ],
    citation: "Le fromager ne se vante pas de sa hauteur — les nuages viennent à lui.",
    proverbes: [
      "Le fromager ne se vante pas de sa hauteur — les nuages viennent à lui.",
      "Qui abat le fromager abat l'avenir du village.",
      "Les esprits choisissent les grands arbres — méfie-toi des vides.",
      "Le coton du fromager voyage loin — ainsi doit voyager ta sagesse.",
    ],
    legendes: [
      "La tradition yoruba raconte que le premier Fromager fut planté par Obatala, l'Orisha de la pureté et de la création. Ses racines en contreforts furent formées par les bras tendus des premiers ancêtres qui voulurent soutenir l'arbre de vie. Chaque racine est un ancêtre — marcher entre elles, c'est marcher parmi eux.",
    ],
    conseilsDeVie: [
      "Prends régulièrement de la hauteur sur ta vie — zoom arrière pour voir le dessin complet.",
      "Ta protection naturelle inspire confiance aux autres. Assume ce rôle avec humilité.",
      "Les graines que tu envoies au vent aujourd'hui germeront où tu ne le sais pas encore.",
    ],
    niveauSpirituel: 5,
    regionOrigine: "Forêts sacrées d'Afrique de l'Ouest — Côte d'Ivoire, Ghana, Nigeria",
    couleur: '#4A7A4A',
    couleurSecondaire: '#2E5229',
    enseignementDuJour:
      "Aujourd'hui, élève ta perspective. Le problème qui te semble insurmontable d'en bas disparaît souvent vu du haut.",
    vertus: ['Fibres de coton végétal', 'Huile de graines', 'Propriétés anti-fièvre'],
    usagesTraditionnels: ['Kapok pour rembourrage', 'Huile médicinale', 'Écorce en décoction pour la fièvre', 'Bois léger pour pirogues'],
  },

  {
    id: 'caïlcédrat',
    nom: 'Caïlcédrat',
    nomAnglais: 'African Mahogany',
    nomScientifique: 'Khaya senegalensis',
    categorie: 'Arbres Sacrés',
    element: 'Feu',
    description:
      "Le Caïlcédrat est l'arbre de la royauté et de la dignité. Son bois rouge et précieux ornait les trônes des rois, ses feuilles guérissaient, et son ombre accueillait les cérémonies d'intronisation. Il incarne l'autorité légitime exercée avec justice.",
    symboliqueAfricaine:
      "Dans les royaumes bambara, soninké et mandingue, le Caïlcédrat était l'arbre des fondateurs de royaumes — ses graines furent plantées lors de la création des grandes cités. À Ségou, au Mali, les piliers des cases royales étaient sculptés dans son bois. Il est l'arbre qui désigne les chefs.",
    symboliqueSpirirtuelle:
      "Le Caïlcédrat symbolise l'autorité qui vient du service — le leader qui brûle intérieurement pour éclairer la voie des autres. Son bois rouge évoque le feu solaire, la chaleur du cœur juste. Il enseigne que la vraie noblesse se prouve par les actes, pas par le rang.",
    symbolique: "Symbole de royauté, de dignité naturelle et de leadership au service du peuple.",
    qualites: ['Leadership naturel', 'Dignité innée', 'Courage noble', 'Justice équitable', 'Présence forte'],
    defauts: ['Orgueil subtil', 'Difficulté à déléguer', 'Exigence excessive', 'Impatience face aux insuffisances'],
    pouvoirs: ['Autorité royale', 'Feu solaire', 'Justice divine', 'Courage au service'],
    enseignements: [
      "Le vrai chef sert avant de régner",
      "La dignité n'a pas besoin de se proclamer — elle se voit",
      "Ton bois intérieur est précieux — ne le brade pas",
      "La noblesse d'âme se construit chaque jour dans les petits actes",
    ],
    citation: "Le caïlcédrat ne cherche pas à être roi — les villages viennent planter leurs fondations sous lui.",
    proverbes: [
      "Le caïlcédrat ne cherche pas à être roi — les villages viennent planter leurs fondations sous lui.",
      "Le bois précieux ne se vend pas au premier marché.",
      "L'ombre du chef juste est plus fraîche que celle du grand arbre.",
    ],
    legendes: [
      "La légende mandingue dit que Soundiata Keïta, fondateur de l'Empire du Mali, planta un Caïlcédrat à Niani lors de son intronisation. Cet arbre grandit en un seul jour, annonçant par sa hauteur la grandeur de l'empire à venir. Depuis, les rois mandingues plantent un Caïlcédrat à chaque grande décision.",
    ],
    conseilsDeVie: [
      "Assume ta place avec dignité — le monde a besoin de ton leadership.",
      "Brûle de l'intérieur pour guider les autres vers la lumière, pas pour leur éblouir les yeux.",
      "Entoure-toi de ceux qui t'élèvent — même l'arbre royal a besoin du soutien de la forêt.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Savanes du Mali, Sénégal, Burkina Faso",
    couleur: '#C4622D',
    couleurSecondaire: '#8B3D1A',
    enseignementDuJour:
      "Aujourd'hui, exerce ton autorité naturelle au service de quelqu'un. Le leadership vrai se mesure à ce qu'on donne.",
    vertus: ['Anti-paludéen', 'Anti-inflammatoire', 'Fébrifuge', 'Cicatrisant'],
    usagesTraditionnels: ['Écorce contre le paludisme', 'Décoctions pour la fièvre', 'Bois de construction sacré', 'Gomme médicinale'],
  },

  {
    id: 'ficus',
    nom: 'Ficus Sacré',
    nomAnglais: 'Sacred Fig',
    nomScientifique: 'Ficus gnaphalocarpa',
    categorie: 'Arbres Sacrés',
    element: 'Eau',
    description:
      "Le Ficus Sacré est l'arbre des palabres, le médiateur entre les hommes et entre les mondes. Sous son feuillage dense et ses racines aériennes, les anciens règlent les conflits, prononcent les jugements et consultent les ancêtres. Il est le gardien de la parole vraie.",
    symboliqueAfricaine:
      "Dans tout le Sahel, le Ficus sacré marque le centre du village — c'est l'arbre-palabre. À l'ombre de ses racines aériennes, les griots transmettent la tradition orale. Chez les Dogon, il est l'arbre de Nommo, le génie des eaux qui gouverne la parole juste et la connaissance.",
    symboliqueSpirirtuelle:
      "Le Ficus symbolise la médiation entre les contraires — ses racines aériennes descendent du ciel vers la terre, unissant le bas et le haut. Il incarne l'art de tenir deux vérités à la fois, de créer des ponts là où les autres voient des abîmes.",
    symbolique: "Symbole de médiation, de parole vraie et d'équilibre entre les mondes.",
    qualites: ['Art de la médiation', 'Parole vraie', 'Équilibre des opposés', 'Profondeur silencieuse', 'Connexion des mondes'],
    defauts: ['Tendance à prendre tout le territoire', 'Envahissement progressif', 'Difficulté à choisir un camp', 'Neutralité parfois paralysante'],
    pouvoirs: ['Médiation sacrée', 'Parole de vérité', 'Pont entre les mondes', 'Sagesse du juge'],
    enseignements: [
      "La vraie sagesse écoute les deux côtés avant de parler",
      "La médiation est plus courageuse que la prise de position",
      "Ta neutralité est une force — garde-la précieusement",
      "Les racines qui descendent du ciel apportent la sagesse divine à la terre",
    ],
    citation: "Le ficus n'a pas besoin de racines au sol — il les crée où il les pose.",
    proverbes: [
      "Le ficus n'a pas besoin de racines au sol — il les crée où il les pose.",
      "Sous le ficus sacré, même les ennemis trouvent l'ombre commune.",
      "La parole prononcée sous le ficus engage jusqu'à la septième génération.",
    ],
    legendes: [
      "Les Dogon du Mali racontent que Nommo, génie des eaux, descendit du ciel accroché aux racines aériennes d'un Ficus sacré. Il enseigna aux hommes la parole vraie, l'agriculture et la loi — puis remonta au ciel par le même chemin. Depuis, chaque Ficus sacré est une porte entre les deux mondes.",
    ],
    conseilsDeVie: [
      "Cultive l'art d'écouter vraiment avant de parler — la médiation commence dans l'oreille.",
      "Sois le pont dans les conflits de ton entourage. Cette mission demande plus de courage que de prendre parti.",
      "Crée des racines là où tu passes — tu n'as pas besoin d'être né quelque part pour y appartenir.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Villages du Sahel — Mali, Niger, Sénégal",
    couleur: '#2E7D6B',
    couleurSecondaire: '#1A4D40',
    enseignementDuJour:
      "Aujourd'hui, sois le médiateur dans une situation tendue. Ta neutralité est une puissance rare.",
    vertus: ['Antifongique', 'Cicatrisant', 'Anti-diarrhéique'],
    usagesTraditionnels: ['Latex cicatrisant', 'Feuilles contre les diarrhées', 'Rituel de purification', 'Lieu de palabre sacré'],
  },

  {
    id: 'tamarinier',
    nom: 'Tamarinier',
    nomAnglais: 'Tamarind',
    nomScientifique: 'Tamarindus indica',
    categorie: 'Arbres Sacrés',
    element: 'Terre',
    description:
      "Le Tamarinier est l'arbre de la justice et de la vérité acide. Son fruit, à la fois doux et acide, enseigne que la vérité a parfois un goût amer mais est toujours nourrissante. Il est l'arbre des serments et des engagements profonds.",
    symboliqueAfricaine:
      "Dans les traditions wolof et soninké, le Tamarinier est l'arbre de la justice — les serments prononcés sous lui sont irrévocables. À Tombouctou, les juges rendaient leurs verdicts à l'ombre du grand Tamarinier de la place du marché. Son acidité symbolise l'impartialité : la vérité n'est jamais entièrement douce.",
    symboliqueSpirirtuelle:
      "Le Tamarinier enseigne que la sagesse vraie exige d'accepter l'acidité de la vérité. Ses gousses nourrissent tout en piquant — comme les enseignements difficiles qui nous font grandir. Il symbolise l'engagement profond qui ne se rompt pas.",
    symbolique: "Symbole de justice, d'engagement inébranlable et de vérité qui nourrit même quand elle pique.",
    qualites: ['Justice naturelle', 'Engagement profond', 'Honnêteté courageuse', 'Persévérance', 'Équité'],
    defauts: ['Rigidité dans les jugements', 'Sévérité excessive', 'Difficulté à pardonner', 'Intransigeance'],
    pouvoirs: ['Justice divine', 'Force de l\'engagement', 'Vérité courageuse', 'Ancrage dans l\'éthique'],
    enseignements: [
      "La vérité nourrit même quand elle a un goût amer",
      "Un engagement sincère vaut plus que mille promesses douces",
      "La justice n'est pas vengeance — c'est l'équilibre restauré",
      "Tiens tes engagements même quand c'est difficile",
    ],
    citation: "Le fruit du tamarinier est acide et doux à la fois — c'est pourquoi il nourrit vraiment.",
    proverbes: [
      "Le fruit du tamarinier est acide et doux à la fois — c'est pourquoi il nourrit vraiment.",
      "Le serment prononcé sous le tamarinier traverse les générations.",
      "La vérité qui fait mal au moment où on l'entend guérit pour toujours.",
    ],
    legendes: [
      "Les griots wolof racontent qu'un grand chef injuste mourut sous un Tamarinier et que ses péchés se transformèrent en gousses. Depuis, chaque fruit de Tamarinier porte à la fois la douceur de ses bonnes actions et l'acidité de ses injustices. L'arbre mémorise tout.",
    ],
    conseilsDeVie: [
      "Dis la vérité avec amour, même quand elle est difficile — les mensonges doux empoisonnent.",
      "Tiens tes engagements coûte que coûte — ta réputation se bâtit dans la constance.",
      "Cherche la justice avant la victoire dans chaque conflit.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Savanes soudano-sahéliennes — Sénégal, Mali, Ghana",
    couleur: '#8B6914',
    couleurSecondaire: '#5C4510',
    enseignementDuJour:
      "Aujourd'hui, tiens un engagement que tu aurais envie de reporter. La constance se forge dans les moments difficiles.",
    vertus: ['Riche en vitamine C', 'Digestif puissant', 'Antioxydant', 'Laxatif doux'],
    usagesTraditionnels: ['Pulpe consommée', 'Tisane digestive', 'Sauces traditionnelles', 'Boissons rafraîchissantes'],
  },

  /* ═══════════════════════════════════════════════════════════
     PLANTES MÉDICINALES
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'moringa',
    nom: 'Moringa',
    nomAnglais: 'Moringa',
    nomScientifique: 'Moringa oleifera',
    categorie: 'Plantes Médicinales',
    element: 'Eau',
    description:
      "Le Moringa est l'Arbre Miraculeux, la plante la plus complète de la pharmacopée africaine. Chacune de ses parties — feuilles, graines, racines, écorce, huile — guérit, nourrit et transforme. Dans les traditions d'Afrique de l'Ouest, il est la plante de la renaissance totale.",
    symboliqueAfricaine:
      "En Afrique de l'Ouest, le Moringa est surnommé 'l'arbre qui ne meurt jamais' — coupé, il repousse ; desséché, il refleurit à la pluie. Les guérisseurs yoruba et haoussa l'utilisent dans presque toutes leurs préparations. Ses feuilles sont mélangées aux céréales des enfants malnutris pour les sauver.",
    symboliqueSpirirtuelle:
      "Le Moringa symbolise la transformation totale : il prend ce qui est incomplet et le complète, il prend ce qui est blessé et le guérit. Il représente la polyvalence de l'âme éveillée — qui peut nourrir, purifier et guérir simultanément. Sa capacité à pousser partout symbolise la résilience universelle.",
    symbolique: "Symbole de guérison totale, de transformation et de résilience indestructible.",
    qualites: ['Polyvalence sacrée', 'Guérison profonde', 'Résilience absolue', 'Nourriture de l\'âme', 'Transformation continue'],
    defauts: ['Dispersion des énergies', 'Tendance à vouloir tout guérir', 'Difficulté à se concentrer sur une seule chose', 'Générosité épuisante'],
    pouvoirs: ['Guérison totale', 'Renaissance perpétuelle', 'Transformation alchimique', 'Nourriture sacrée'],
    enseignements: [
      "Chaque partie de toi peut être utile — ne te réduis pas à une seule fonction",
      "La vraie guérison commence par se nourrir correctement",
      "La résilience n'est pas l'absence de blessure — c'est la capacité de repousser après",
      "Ta polyvalence est ta force — cultive-la",
    ],
    citation: "Le moringa pousse même sur les terres épuisées — il transforme ce qu'il touche.",
    proverbes: [
      "Le moringa pousse même sur les terres épuisées — il transforme ce qu'il touche.",
      "Quand la médecine moderne ne suffit plus, l'Africain retourne sous son moringa.",
      "Celui qui connaît le moringa ne connaît pas la faim.",
    ],
    legendes: [
      "La légende haoussa raconte qu'un enfant mourant de faim fut sauvé par une vieille femme qui ne possédait qu'un Moringa dans sa cour. Elle lui prépara ses feuilles chaque jour. Non seulement l'enfant guérit, mais il devint le plus grand guérisseur de son temps — et il planta un Moringa à chaque village qu'il traversa.",
    ],
    conseilsDeVie: [
      "Développe ta polyvalence — le monde a besoin de gens qui peuvent nourrir, guérir et transformer.",
      "Prends soin de ton corps comme de ton âme — les deux sont ton temple.",
      "Ta capacité de renaissance est indestructible — souviens-t'en dans tes crises.",
    ],
    niveauSpirituel: 5,
    regionOrigine: "Zones tropicales d'Afrique de l'Ouest — Sénégal, Nigeria, Burkina Faso",
    couleur: '#5C7A3E',
    couleurSecondaire: '#3D5229',
    enseignementDuJour:
      "Aujourd'hui, identifie une ressource en toi que tu n'as pas encore utilisée. Le moringa a sept vertus — combien as-tu les tiennes ?",
    vertus: ['Protéines complètes', 'Vitamines A, C, E', 'Fer et calcium', 'Anti-inflammatoire', 'Antioxydant majeur'],
    usagesTraditionnels: ['Feuilles alimentaires', 'Poudre nutritive', 'Huile de ben', 'Graines pour purifier l\'eau', 'Remède universel'],
  },

  {
    id: 'neem',
    nom: 'Neem',
    nomAnglais: 'Neem Tree',
    nomScientifique: 'Azadirachta indica',
    categorie: 'Plantes Médicinales',
    element: 'Air',
    description:
      "Le Neem est le Protecteur Sacré, la plante qui défend et purifie avec une précision redoutable. Ses principes actifs repoussent les insectes, purifient les espaces et soignent les infections. Il incarne la protection qui n'a pas besoin de violence — juste d'être lui-même.",
    symboliqueAfricaine:
      "Dans toute l'Afrique de l'Ouest, le Neem est planté aux entrées des villages, des maisons et des lieux sacrés pour repousser les mauvais esprits et les maladies. Ses branches sont utilisées comme bâtonnets à dents purificateurs. Les guérisseurs l'utilisent pour purifier les espaces avant les rituels.",
    symboliqueSpirirtuelle:
      "Le Neem enseigne la protection par la précision : il n'attaque pas, il repousse. Sa présence seule suffit à purifier. Il symbolise la discernement — la capacité de séparer le pur de l'impur, de protéger ce qui est sacré sans violence.",
    symbolique: "Symbole de protection précise, de purification et de discernement sacré.",
    qualites: ['Protection naturelle', 'Précision du discernement', 'Purification constante', 'Vigilance douce', 'Résistance aux invasions'],
    defauts: ['Amertume excessive', 'Rejet de ce qui n\'est pas parfait', 'Isolement par excès de pureté', 'Perfectionnisme purifiant'],
    pouvoirs: ['Bouclier naturel', 'Purification des espaces', 'Discernement sacré', 'Protection sans violence'],
    enseignements: [
      "Ta présence seule peut assainir un espace — sois conscient de ton influence",
      "La protection la plus puissante est celle qui ne blesse pas",
      "Purifies-toi régulièrement des influences négatives",
      "Le discernement est une forme de courage — sépare le précieux du toxic",
    ],
    citation: "Le neem ne combat pas les insectes — il leur rappelle qu'ils ne sont pas les bienvenus.",
    proverbes: [
      "Le neem ne combat pas les insectes — il leur rappelle qu'ils ne sont pas les bienvenus.",
      "La protection la plus durable n'a pas besoin d'épée.",
      "Celui qui plante le neem à sa porte dort tranquille.",
    ],
    legendes: [
      "La légende soninké raconte qu'un village décimé par la malaria fut sauvé par un vieux guérisseur qui planta des Neems à chaque entrée du village. Les moustiques disparurent en une saison. Depuis, le Neem est l'arbre des gardiens — ceux qui protègent sans bruit et sans gloire.",
    ],
    conseilsDeVie: [
      "Définis et protège tes limites avec clarté — comme le neem protège son territoire.",
      "Purifie régulièrement ton environnement des énergies toxiques.",
      "Ta capacité de discernement est un don précieux — affine-le.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Zones sèches d'Afrique de l'Ouest — Mali, Sénégal, Ghana",
    couleur: '#2C5F2E',
    couleurSecondaire: '#1A3D1B',
    enseignementDuJour:
      "Aujourd'hui, identifie une énergie négative dans ton environnement et établis une limite claire. Le neem protège sans violence.",
    vertus: ['Anti-paludéen', 'Antibactérien', 'Antifongique', 'Anti-inflammatoire', 'Antipyrétique'],
    usagesTraditionnels: ['Bâtonnets à dents', 'Huile de neem insectifuge', 'Décoctions contre la malaria', 'Purification des espaces', 'Soins de peau'],
  },

  {
    id: 'papayer',
    nom: 'Papayer',
    nomAnglais: 'Papaya',
    nomScientifique: 'Carica papaya',
    categorie: 'Plantes Médicinales',
    element: 'Feu',
    description:
      "Le Papayer est la Mère Guérisseuse, la plante de la douceur transformatrice. Il guérit en nourrissant, transforme en douceur et produit sans cesse. Dans les traditions d'Afrique de l'Ouest, sa générosité perpétuelle fait de lui un symbole de maternité divine.",
    symboliqueAfricaine:
      "Dans les villages d'Afrique de l'Ouest, le Papayer est planté près de la cuisine familiale — il est l'arbre des mères. Ses feuilles traitent la malaria, ses graines soignent les vers, sa papaye nourrit les malades. Il est consulté dans les rituels de fertilité et de maternité.",
    symboliqueSpirirtuelle:
      "Le Papayer symbolise la maternité créatrice — il produit sans cesse, nourrit sans compter, guérit avec douceur. Il représente la transformation par la tendresse : ses enzymes digestives décomposent ce qui est dur pour le rendre assimilable. Ainsi l'amour transforme les résistances.",
    symbolique: "Symbole de maternité divine, de guérison douce et de générosité perpétuelle.",
    qualites: ['Générosité perpétuelle', 'Douceur transformatrice', 'Fertilité créatrice', 'Guérison maternelle', 'Production constante'],
    defauts: ['Fragilité face au froid', 'Dépendance à la chaleur', 'Vulnérabilité aux excès', 'Production qui épuise'],
    pouvoirs: ['Guérison maternelle', 'Douceur transformatrice', 'Fertilité créatrice', 'Nourriture perpétuelle'],
    enseignements: [
      "La douceur peut transformer ce que la force ne peut entamer",
      "Nourris les autres de ta production sans t'épuiser",
      "La maternité est la forme la plus haute de la créativité",
      "Produis chaque saison, même quand personne ne regarde",
    ],
    citation: "Le papayer ne garde rien — il offre tout ce qu'il produit à ceux qui passent.",
    proverbes: [
      "Le papayer ne garde rien — il offre tout ce qu'il produit à ceux qui passent.",
      "La douceur du papayer cache des graines qui guérissent.",
      "La femme forte est comme le papayer — elle nourrit tous les siens sans jamais se vider.",
    ],
    legendes: [
      "La légende fon du Bénin raconte que Mawu-Lisa créa le Papayer pour les mères des guerriers — afin qu'elles aient toujours de quoi soigner les blessés. Les fruits poussent si vite que même après une grande bataille, il y avait toujours de quoi guérir. C'est pourquoi le Papayer est sacré dans les cours des mères.",
    ],
    conseilsDeVie: [
      "Donne de ta générosité naturellement — sans calculer, comme le papayer produit.",
      "Ta douceur est une force transformatrice — ne la sacrifie pas pour paraître fort.",
      "Prends soin de ta fertilité créatrice — qu'est-ce que tu produis dans ta vie ?",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Villages tropicaux d'Afrique de l'Ouest — Bénin, Togo, Côte d'Ivoire",
    couleur: '#D4A017',
    couleurSecondaire: '#8B6914',
    enseignementDuJour:
      "Aujourd'hui, offre quelque chose de ta production — une compétence, un soin, une attention — sans attendre de retour.",
    vertus: ['Riche en papaïne digestive', 'Vitamine C abondante', 'Anti-paludéen (feuilles)', 'Antiparasitaire (graines)', 'Riche en bêta-carotène'],
    usagesTraditionnels: ['Fruit alimentaire', 'Feuilles contre la malaria', 'Graines antiparasitaires', 'Latex papaine', 'Rituel de fertilité'],
  },

  {
    id: 'gingembre',
    nom: 'Gingembre',
    nomAnglais: 'Ginger',
    nomScientifique: 'Zingiber officinale',
    categorie: 'Plantes Médicinales',
    element: 'Feu',
    description:
      "Le Gingembre est le Feu Purificateur, la racine de courage et d'énergie vitale. Dans toute l'Afrique de l'Ouest, le 'Ngampé' ou 'Gnamgnamkourou' est la boisson des guerriers, des guérisseurs et des gens courageux. Il brûle pour guérir, réveille ce qui dort et active ce qui hésite.",
    symboliqueAfricaine:
      "La tisane de gingembre au citron et au miel est le premier remède universel d'Afrique de l'Ouest. Le gingembre est présent dans les cérémonies d'initiation pour 'réveiller' les initiés. Au Mali et en Guinée, les lutteurs boivent du gingembre avant les combats pour activer leur feu intérieur.",
    symboliqueSpirirtuelle:
      "Le Gingembre enseigne que certaines guérisons nécessitent de la chaleur — il brûle pour purifier, irrite pour activer, réveille pour libérer. Il symbolise le courage de traverser l'inconfort pour accéder à la vitalité. Sa racine noueuse et irrégulière rappelle que la vraie force n'est pas lisse.",
    symbolique: "Symbole de courage vital, de feu purificateur et d'énergie qui réveille.",
    qualites: ['Énergie vitale', 'Courage intérieur', 'Feu purificateur', 'Vitalité contagieuse', 'Activation de l\'action'],
    defauts: ['Intensité épuisante', 'Brûlure excessive', 'Difficulté à la douceur', 'Impatience avec les timorés'],
    pouvoirs: ['Feu sacré', 'Éveil de la conscience', 'Courage en action', 'Purification par la chaleur'],
    enseignements: [
      "Certaines vérités doivent brûler avant de guérir",
      "Ton énergie vitale est un feu sacré — entretiens-le",
      "Le courage n'est pas l'absence de peur — c'est le feu qui brûle malgré elle",
      "Réveille ce qui sommeille en toi avant que les circonstances ne t'y forcent",
    ],
    citation: "Le gingembre ne demande pas la permission de réchauffer — il agit et guérit.",
    proverbes: [
      "Le gingembre ne demande pas la permission de réchauffer — il agit et guérit.",
      "La racine qui brûle la bouche guérit le ventre.",
      "L'homme sans feu intérieur attend que les autres le réchauffent.",
    ],
    legendes: [
      "Les guérisseurs bambara racontent que le premier Gingembre fut offert aux hommes par le génie du feu, qui voulut laisser sa trace dans la terre. Il enseigna aux guérisseurs que le feu bien dosé guérit — que trop brûle et trop peu laisse froid. La sagesse du feu est dans la mesure.",
    ],
    conseilsDeVie: [
      "Active ton feu intérieur — l'hésitation est parfois plus dangereuse que l'action.",
      "Utilise ta chaleur pour réveiller les autres, pas pour les brûler.",
      "Quand tu manques d'énergie, retourne à tes racines profondes.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Villages et marchés d'Afrique de l'Ouest — partout",
    couleur: '#C4622D',
    couleurSecondaire: '#8B3D1A',
    enseignementDuJour:
      "Aujourd'hui, active ton feu intérieur sur un projet que tu as mis en veille. Le gingembre ne procrastine pas.",
    vertus: ['Anti-nausée puissant', 'Anti-inflammatoire', 'Digestif actif', 'Réchauffant', 'Stimulant circulatoire'],
    usagesTraditionnels: ['Tisane de gingembre', 'Épice culinaire', 'Remède contre la grippe', 'Boisson des lutteurs', 'Initiation'],
  },

  /* ═══════════════════════════════════════════════════════════
     PLANTES ALIMENTAIRES
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'kolatier',
    nom: 'Kolatier',
    nomAnglais: 'Kola Tree',
    nomScientifique: 'Cola nitida',
    categorie: 'Plantes Alimentaires',
    element: 'Terre',
    description:
      "Le Kolatier est l'arbre de l'Hospitalité Sacrée et du Lien entre les hommes. Sa noix de kola est le premier don offert à l'hôte, au fiancé, au chef. Dans toute l'Afrique de l'Ouest, nulle alliance ne se scelle, nul accord ne se conclut sans qu'on ait partagé la kola.",
    symboliqueAfricaine:
      "La kola est la monnaie spirituelle d'Afrique de l'Ouest. Chez les Akan, Yoruba et Mandingue, offrir la kola est le geste de paix et de respect le plus élevé. Ses lobes symbolisent les parties d'un accord — partager chaque lobe, c'est partager chaque aspect de l'engagement. Sans kola, les ancêtres ne peuvent être consultés.",
    symboliqueSpirirtuelle:
      "Le Kolatier symbolise le lien sacré entre les êtres. Il enseigne que toute relation véritable commence par un geste de générosité et de respect. La noix de kola, amère au début et revigorante après, représente l'engagement qui demande un effort initial avant de révéler ses bienfaits.",
    symbolique: "Symbole de l'hospitalité sacrée, du lien entre les êtres et des alliances durables.",
    qualites: ['Sens de l\'hospitalité', 'Art du lien social', 'Générosité cérémonielles', 'Leadership doux', 'Fidélité aux engagements'],
    defauts: ['Dépendance aux liens', 'Difficulté à agir seul', 'Besoin constant de valider les relations', 'Conformisme social'],
    pouvoirs: ['Lien sacré entre les êtres', 'Alliance durable', 'Hospitalité royale', 'Communication avec les ancêtres'],
    enseignements: [
      "Toute grande relation commence par un geste de générosité sincère",
      "L'engagement a d'abord un goût amer — persévère et il devient revigorant",
      "Le partage crée des liens plus forts que les contrats",
      "Honore tes invités comme des envoyés des ancêtres",
    ],
    citation: "Là où la kola est offerte avec sincérité, les ancêtres sourient.",
    proverbes: [
      "Là où la kola est offerte avec sincérité, les ancêtres sourient.",
      "Pas de palabre sans kola, pas d'alliance sans partage.",
      "La noix de kola amère au premier goût, douce à la longue — ainsi est l'amitié vraie.",
    ],
    legendes: [
      "La légende mandingue raconte que le premier Kolatier surgit à l'endroit où deux clans ennemis enterrèrent ensemble leurs armes. L'arbre fit sa première noix, qu'un enfant des deux clans partagea en deux. Les pères mangèrent chacun leur moitié — et depuis ce jour, les deux clans ne se combattirent plus.",
    ],
    conseilsDeVie: [
      "Commence chaque relation importante par un geste sincère de générosité.",
      "Tes alliances sont ta vraie richesse — investis-les avec soin.",
      "La communion autour d'un repas partagé vaut tous les contrats du monde.",
    ],
    niveauSpirituel: 5,
    regionOrigine: "Forêts humides d'Afrique de l'Ouest — Côte d'Ivoire, Ghana, Nigeria",
    couleur: '#D4A017',
    couleurSecondaire: '#8B6914',
    enseignementDuJour:
      "Aujourd'hui, fais un geste d'hospitalité sincère envers quelqu'un. Offrir, c'est créer un lien qui dure.",
    vertus: ['Stimulant naturel (caféine)', 'Digestif', 'Aphrodisiaque léger', 'Anti-fatigue'],
    usagesTraditionnels: ['Noix cérémonielle', 'Stimulant', 'Offrande aux ancêtres', 'Rite de mariage', 'Scellement d\'alliances'],
  },

  {
    id: 'nere',
    nom: 'Néré',
    nomAnglais: 'African Locust Bean',
    nomScientifique: 'Parkia biglobosa',
    categorie: 'Plantes Alimentaires',
    element: 'Eau',
    description:
      "Le Néré est l'Arbre de l'Abondance Partagée, la plante qui nourrit toute la communauté pendant la saison sèche. Ses gousses, ses graines fermentées (soumbala), ses fleurs nourricières font de lui le pivot de la sécurité alimentaire sahélienne et le symbole de la générosité collective.",
    symboliqueAfricaine:
      "Dans les traditions bambara et peule, le Néré est l'arbre des femmes et des familles — c'est autour de lui qu'on transforme les graines en soumbala, la pâte fermentée qui parfume tous les plats d'Afrique de l'Ouest. L'arbre produit en pleine saison sèche, quand tout le reste se tait. Il enseigne la contre-saison.",
    symboliqueSpirirtuelle:
      "Le Néré symbolise l'abondance qui surgit quand tout semble stérile. Il fleurit en saison sèche, produit dans l'adversité, nourrit en temps de disette. Il représente la sagesse qui jaillit des profondeurs obscures, la ressource cachée qui révèle son vrai prix dans les temps difficiles.",
    symbolique: "Symbole de l'abondance dans l'adversité, de profondeur nourricière et de sagesse cachée.",
    qualites: ['Abondance généreuse', 'Profondeur mystique', 'Ressource dans l\'adversité', 'Patience stratégique', 'Nourriture de la communauté'],
    defauts: ['Odeur forte difficile à accepter', 'Résistance à être utilisé sans transformation', 'Patience requise', 'Fermentation lente'],
    pouvoirs: ['Abondance contre-cyclique', 'Nourriture des profondeurs', 'Sagesse qui fermente', 'Sustentation communautaire'],
    enseignements: [
      "Les ressources les plus précieuses surgissent quand tout le reste manque",
      "Ce qui paraît repoussant peut nourrir une communauté entière",
      "La sagesse, comme le soumbala, se bonifie en fermentant",
      "Produis dans l'adversité — c'est là que ton vrai caractère s'exprime",
    ],
    citation: "Le néré fleurit quand tous les autres arbres sont nus — il choisit son moment.",
    proverbes: [
      "Le néré fleurit quand tous les autres arbres sont nus — il choisit son moment.",
      "Le soumbala sent fort mais nourrit profond — ainsi la vérité difficile.",
      "L'arbre qui produit en saison sèche n'a pas peur de l'avenir.",
    ],
    legendes: [
      "La légende bambara raconte que lors de la grande famine de sept ans, seul le Néré continua à produire. Une vieille femme apprit aux villageois à fermenter ses graines pour en faire le soumbala. Depuis, elle est vénérée comme la mère de l'abondance — et le Néré comme l'arbre que les ancêtres ont laissé pour les temps durs.",
    ],
    conseilsDeVie: [
      "Développe des ressources intérieures qui surgissent dans l'adversité — pas seulement dans la facilité.",
      "Ta valeur la plus profonde se révèle quand tout le monde est à court.",
      "Transforme tes expériences difficiles — comme le soumbala, elles peuvent nourrir les autres.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Sahel d'Afrique de l'Ouest — Burkina Faso, Mali, Sénégal",
    couleur: '#5C7A3E',
    couleurSecondaire: '#3D5229',
    enseignementDuJour:
      "Aujourd'hui, trouve une ressource en toi que tu n'as pas encore utilisée. Le néré produit quand les autres se reposent.",
    vertus: ['Protéines fermentées (soumbala)', 'Antioxydant', 'Anti-diabétique', 'Riche en lipides et fibres'],
    usagesTraditionnels: ['Soumbala (condiment fermenté)', 'Pulpe sucrée consommée', 'Fleurs nourricières', 'Gousses pour alimentation bétail'],
  },

  {
    id: 'karite',
    nom: 'Karité',
    nomAnglais: 'Shea Tree',
    nomScientifique: 'Vitellaria paradoxa',
    categorie: 'Plantes Alimentaires',
    element: 'Terre',
    description:
      "Le Karité est l'Arbre des Femmes, le trésor sacré du Sahel. Son beurre — l'or blanc de l'Afrique — nourrit, protège la peau, soigne les blessures et honore les dieux. Dans les traditions d'Afrique de l'Ouest, il appartient aux femmes de génération en génération.",
    symboliqueAfricaine:
      "Dans les traditions burkinabè, malienne et ghanéenne, le Karité est l'héritage des mères aux filles. On dit que les arbres de karité appartiennent à la lignée des femmes — les hommes ne peuvent les vendre. Sa récolte est une cérémonie féminine de solidarité et de transmission. Son beurre oint les enfants à la naissance.",
    symboliqueSpirirtuelle:
      "Le Karité symbolise la transmission sacrée des savoirs féminins et la richesse qui vient de la patience. Sa noix met 15 à 20 ans pour produire — comme certaines sagesses qui ne peuvent pas être brusquées. Il représente l'héritage maternel, la continuité de la lignée féminine et la beauté qui nourrit.",
    symbolique: "Symbole de transmission féminine, de richesse patiente et de beauté nourricière.",
    qualites: ['Patience créatrice', 'Générosité nourricière', 'Transmission sacrée', 'Beauté intérieure', 'Solidarité féminine'],
    defauts: ['Lenteur à mûrir', 'Difficulté à exprimer sa valeur rapidement', 'Dépendance à la tradition', 'Résistance à la modernisation'],
    pouvoirs: ['Or blanc de l\'âme', 'Transmission maternelle', 'Beauté nourricière', 'Continuité des lignées'],
    enseignements: [
      "Certaines richesses ne se récoltent qu'après des années de patience",
      "La vraie beauté nourrit autant qu'elle embellit",
      "Honore le savoir des mères — il est plus ancien que tous les livres",
      "La transmission est le plus beau cadeau qu'on puisse faire aux générations futures",
    ],
    citation: "Le karité ne donne son beurre qu'à celle qui sait attendre et travailler.",
    proverbes: [
      "Le karité ne donne son beurre qu'à celle qui sait attendre et travailler.",
      "L'or blanc de la femme vaut mieux que l'or jaune du roi.",
      "La femme qui connaît le karité ne manque jamais de rien.",
    ],
    legendes: [
      "La légende mossi du Burkina Faso raconte que la première femme qui découvrit comment extraire le beurre de karité fut guidée par un esprit féminin dans son rêve. Elle transmit ce savoir à sa fille, qui le transmit à la sienne — jusqu'à aujourd'hui. C'est pourquoi le savoir du karité reste dans la lignée des femmes.",
    ],
    conseilsDeVie: [
      "Investis dans des choses qui mûriront dans 15 ans — comme le Karité, elles vaudront bien davantage.",
      "Transmets ton savoir précieux aux générations suivantes — ne laisse pas mourir avec toi ce que tu sais.",
      "Célèbre la solidarité des femmes et des communautés autour de toi.",
    ],
    niveauSpirituel: 5,
    regionOrigine: "Sahel — Burkina Faso, Mali, Ghana, Niger",
    couleur: '#C8A87A',
    couleurSecondaire: '#8B6B2E',
    enseignementDuJour:
      "Aujourd'hui, transmets quelque chose de précieux à quelqu'un. Le vrai héritage ne s'accumule pas — il se transmet.",
    vertus: ['Beurre riche en acides gras', 'Hydratant peau', 'Anti-inflammatoire', 'Cicatrisant', 'Nourrissant pour les cheveux'],
    usagesTraditionnels: ['Beurre alimentaire', 'Cosmétique naturel', 'Soins de nourrissons', 'Offrandes rituelles', 'Médicinal'],
  },

  {
    id: 'gombo',
    nom: 'Gombo',
    nomAnglais: 'Okra',
    nomScientifique: 'Abelmoschus esculentus',
    categorie: 'Plantes Alimentaires',
    element: 'Eau',
    description:
      "Le Gombo est la plante du Lien Communautaire, la plante qui lie ce qui était séparé. Son mucilage naturel épaissit les sauces et unit les ingrédients — métaphore parfaite de son rôle social : créer la cohésion là où il y avait la dispersion.",
    symboliqueAfricaine:
      "Dans toute l'Afrique de l'Ouest, le gombo est la base des sauces communautaires — il nourrit collectivement. On dit que 'là où il y a du gombo, personne ne reste avec faim séparément'. Sa gluance symbolise la façon dont une communauté soudée tient ensemble même dans l'adversité.",
    symboliqueSpirirtuelle:
      "Le Gombo enseigne l'art du lien : son mucilage naturel est la colle de la communauté, ce qui unit sans forcer. Il représente la capacité de créer de la cohésion entre des éléments disparates, de réchauffer ce qui est froid et de nourrir ce qui est en manque.",
    symbolique: "Symbole du lien communautaire, de la cohésion sociale et de la nourriture partagée.",
    qualites: ['Sens du lien', 'Cohésion naturelle', 'Générosité communautaire', 'Adaptabilité', 'Création du consensus'],
    defauts: ['Viscosité parfois rebutante', 'Difficulté à se montrer seul', 'Besoin constant de groupe', 'Conformisme social'],
    pouvoirs: ['Lien communautaire', 'Cohésion sociale', 'Nourriture partagée', 'Création de l\'unité'],
    enseignements: [
      "La vraie communauté se construit autour du repas partagé",
      "Ta capacité à créer du lien est ta plus grande richesse",
      "Ce qui lie sans forcer est plus fort que ce qui contraint",
      "Nourris ta communauté — tu te nourris d'elle en retour",
    ],
    citation: "Là où le gombo mijote, personne ne mange seul.",
    proverbes: [
      "Là où le gombo mijote, personne ne mange seul.",
      "La gluance du gombo tient la sauce ensemble — ainsi les liens forts tiennent la communauté.",
      "Celui qui rejette le gombo mange toujours sa sauce claire.",
    ],
    legendes: [
      "La tradition peule raconte que lors d'une famine, une femme n'avait qu'un pied de gombo. Elle fit une sauce qu'elle partagea en petites portions avec tout le village. La sauce ne finit jamais — comme si le gombo, voyant la générosité de la femme, multipliait ses fruits. Depuis, le gombo est la plante de la générosité miraculeuse.",
    ],
    conseilsDeVie: [
      "Investis dans ta communauté — les liens que tu tisses sont ton filet de sécurité.",
      "Crée des espaces où les gens peuvent manger et se retrouver ensemble.",
      "Ta générosité dans le partage revient toujours multipliée.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Afrique de l'Ouest — partout dans les villages",
    couleur: '#3D7A5C',
    couleurSecondaire: '#254D3A',
    enseignementDuJour:
      "Aujourd'hui, crée un moment de partage avec ta communauté. La table commune est le premier remède contre l'isolement.",
    vertus: ['Riche en fibres', 'Mucilage calmant', 'Vitamine K et C', 'Hypoglycémiant doux'],
    usagesTraditionnels: ['Sauce principale', 'Épaississant naturel', 'Médical pour constipation', 'Réservé aux cérémonies communautaires'],
  },

  /* ═══════════════════════════════════════════════════════════
     PLANTES RITUELLES
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'vetiver',
    nom: 'Vétiver',
    nomAnglais: 'Vetiver',
    nomScientifique: 'Chrysopogon zizanioides',
    categorie: 'Plantes Rituelles',
    element: 'Terre',
    description:
      "Le Vétiver est l'Ancre de la Terre, la plante qui tient le sol et les esprits. Ses racines descendent à plusieurs mètres de profondeur — invisibles mais indestructibles. Il empêche l'érosion, retient l'eau et parfume l'air de sa fragrance terreuse et apaisante.",
    symboliqueAfricaine:
      "Dans les traditions sahéliennes, le Vétiver est planté sur les tombes des ancêtres — ses racines profondes connectent les vivants aux morts. Son huile essentielle est utilisée dans les rituels d'ancrage et de protection. Les femmes le tissent dans leurs nattes pour parfumer et protéger les espaces de sommeil.",
    symboliqueSpirirtuelle:
      "Le Vétiver symbolise l'ancrage profond — la stabilité qui vient non pas de la rigidité, mais des racines invisibles et profondes. Il enseigne que la force véritable est souterraine : ce qu'on ne voit pas en surface est ce qui tient tout debout. Il représente la connexion aux ancêtres et à la mémoire de la terre.",
    symbolique: "Symbole d'ancrage profond, de stabilité invisible et de connexion aux racines ancestrales.",
    qualites: ['Ancrage profond', 'Stabilité intérieure', 'Connexion aux racines', 'Patience souterraine', 'Protection durable'],
    defauts: ['Invisibilité apparente', 'Difficulté à être vu', 'Ancrage parfois rigide', 'Résistance au déracinement'],
    pouvoirs: ['Ancrage sacré', 'Protection des espaces', 'Connexion aux ancêtres', 'Stabilisation de la terre'],
    enseignements: [
      "Tes racines invisibles sont ta vraie force — développe-les",
      "La stabilité ne vient pas de ce qu'on montre mais de ce qu'on enfouit profondément",
      "Protège ton territoire avec la profondeur de ton ancrage",
      "La connexion à tes origines te protège des tempêtes",
    ],
    citation: "Le vétiver ne montre que ses feuilles — ses racines tiennent la montagne.",
    proverbes: [
      "Le vétiver ne montre que ses feuilles — ses racines tiennent la montagne.",
      "Méfie-toi de celui qui n'a pas de racines — il sera emporté à la première pluie.",
      "La terre tenue par le vétiver résiste à mille saisons — ainsi l'homme ancré dans ses valeurs.",
    ],
    legendes: [
      "La légende soninké raconte que lors du grand déluge, toutes les plantes furent emportées sauf le Vétiver. Ses racines tenaient si profond que les eaux ne purent l'arracher. Quand les eaux se retirèrent, c'est autour des touffes de Vétiver rescapées que les villages se reconstruisirent.",
    ],
    conseilsDeVie: [
      "Investis dans tes fondations invisibles — méditation, valeurs, relations profondes.",
      "Quand tout semble instable autour de toi, descends plus profondément dans tes racines.",
      "Protège les espaces qui te sont sacrés avec la même constance que le vétiver.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Sahel — Sénégal, Mali, Burkina Faso",
    couleur: '#6B5C2E',
    couleurSecondaire: '#4D3A1A',
    enseignementDuJour:
      "Aujourd'hui, renforce une de tes racines profondes — une valeur, une pratique, une connexion ancestrale.",
    vertus: ['Huile essentielle anti-stress', 'Anti-anxieux', 'Ancrage émotionnel', 'Protection de sol'],
    usagesTraditionnels: ['Huile rituelle', 'Nattes parfumées', 'Protection des tombes', 'Anti-érosion', 'Cosmétique'],
  },

  {
    id: 'acacia',
    nom: 'Acacia Gomme',
    nomAnglais: 'Gum Arabic Tree',
    nomScientifique: 'Acacia senegal',
    categorie: 'Plantes Rituelles',
    element: 'Air',
    description:
      "L'Acacia Gomme est le Gardien du Désert, le survivant qui prospère là où tout semble impossible. Il sécrète la gomme arabique — la résine sacrée qui relie, préserve et nourrit. Dans les traditions sahariennes et sahéliennes, il est le symbole de la résistance qui produit de la valeur.",
    symboliqueAfricaine:
      "Dans les traditions touarègues et soninké, l'Acacia Gomme est l'arbre de la frontière entre le monde vivable et le désert. Il protège les pâturages de l'avancée des sables. Sa gomme était utilisée dans l'encre des manuscrits de Tombouctou — ainsi il a préservé le savoir africain pour des siècles.",
    symboliqueSpirirtuelle:
      "L'Acacia enseigne que les environnements les plus durs produisent les résines les plus précieuses. Sa gomme — exsudée en réponse aux blessures — symbolise les larmes transformées en trésor, la douleur convertie en valeur. Il représente la résistance créatrice face à l'adversité.",
    symbolique: "Symbole de résistance créatrice, de valeur produite dans l'adversité et de préservation du savoir.",
    qualites: ['Résistance absolue', 'Création de valeur dans la difficulté', 'Protection du territoire', 'Préservation', 'Générosité de la résine'],
    defauts: ['Épines défensives', 'Difficulté d\'approche', 'Isolement en zone aride', 'Fermeture apparente'],
    pouvoirs: ['Résine sacrée', 'Préservation du savoir', 'Résistance à la désertification', 'Transformation de la blessure en trésor'],
    enseignements: [
      "Tes blessures peuvent devenir tes trésors si tu les transmutes",
      "La valeur réelle se produit dans les conditions difficiles",
      "Garde ton territoire avec tes épines — mais offre ta résine à ceux qui méritent",
      "Ce qui te semble hostile peut être précisément l'environnement qui révèle ta vraie nature",
    ],
    citation: "L'acacia survit là où les autres meurent — et de ses blessures naît la gomme qui lie le monde.",
    proverbes: [
      "L'acacia survit là où les autres meurent — et de ses blessures naît la gomme qui lie le monde.",
      "L'arbre des épines donne la résine précieuse — ainsi l'épreuve dure révèle la valeur cachée.",
      "Le désert ne vainc pas l'acacia — il le fortifie.",
    ],
    legendes: [
      "Les chroniques de Tombouctou racontent que la bibliothèque royale fut préservée grâce à l'encre d'acacia. Quand les envahisseurs brûlèrent la ville, les scribes enterrèrent les manuscrits — la gomme arabique dans l'encre préserva les textes pendant des siècles sous la terre. L'Acacia fut ainsi le gardien de toute la sagesse de l'empire.",
    ],
    conseilsDeVie: [
      "Transforme tes blessures en ressources — comme l'acacia transforme sa résine en trésor.",
      "Développe ta résistance dans les environnements difficiles sans perdre ta capacité à donner.",
      "Préserve le savoir qui te tient à cœur — écris, transmets, conserve.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Zones semi-arides — Sénégal, Mali, Niger, Soudan",
    couleur: '#D4A017',
    couleurSecondaire: '#8B6B14',
    enseignementDuJour:
      "Aujourd'hui, transforme une blessure ou un défi en quelque chose de précieux. L'acacia fait de ses blessures sa richesse.",
    vertus: ['Gomme arabique fibre soluble', 'Prébiotique puissant', 'Cicatrisant', 'Liant alimentaire'],
    usagesTraditionnels: ['Gomme arabique alimentaire', 'Encre de manuscrits', 'Médicament digestif', 'Cosmétique', 'Protection des pâturages'],
  },

  {
    id: 'citronnelle',
    nom: 'Citronnelle',
    nomAnglais: 'Lemongrass',
    nomScientifique: 'Cymbopogon citratus',
    categorie: 'Plantes Rituelles',
    element: 'Air',
    description:
      "La Citronnelle est la Purificatrice Sacrée, la gardienne des espaces de vie. Son parfum frais et puissant nettoie l'air, repousse les esprits négatifs et prépare les espaces pour les rituels. Dans toute l'Afrique de l'Ouest, brûler de la citronnelle annonce le début d'une cérémonie.",
    symboliqueAfricaine:
      "Dans les traditions vodou du Bénin et vaudou haïtien d'origine africaine, la citronnelle est brûlée pour purifier les espaces avant les cérémonies. Les guérisseurs mandingues l'utilisent pour préparer les espaces de guérison. Son parfum est considéré comme désagréable aux esprits malveillants.",
    symboliqueSpirirtuelle:
      "La Citronnelle enseigne que la légèreté est une forme de puissance. Son parfum aérien purifie sans violence, son passage laisse la place nette et fraîche. Elle symbolise la capacité à purifier son environnement émotionnel et spirituel simplement par sa présence.",
    symbolique: "Symbole de purification légère, de clarté de l'espace et de protection par le parfum.",
    qualites: ['Purification naturelle', 'Légèreté efficace', 'Clarté de l\'espace', 'Protection douce', 'Fraîcheur régénérante'],
    defauts: ['Volatilité', 'Besoin de renouvellement constant', 'Inconsistance dans le temps', 'Fragilité hors de son milieu'],
    pouvoirs: ['Purification des espaces', 'Protection légère', 'Clarté spirituelle', 'Renouveau de l\'atmosphère'],
    enseignements: [
      "La purification légère est souvent plus efficace que la violence des grands changements",
      "Nettoie régulièrement ton espace intérieur — la fraîcheur attire la clarté",
      "Ta légèreté peut assainir une atmosphère sans que personne ne sache comment",
      "Parfume ta vie des choses qui t'élèvent",
    ],
    citation: "La citronnelle ne combat pas les mauvais esprits — elle les rend mal à l'aise jusqu'à ce qu'ils partent.",
    proverbes: [
      "La citronnelle ne combat pas les mauvais esprits — elle les rend mal à l'aise jusqu'à ce qu'ils partent.",
      "Un espace parfumé accueille la bonne fortune.",
      "La propreté de la maison commence par la propreté de l'air.",
    ],
    legendes: [
      "La tradition yoruba raconte qu'une femme guérisseuse découvrit la citronnelle en suivant une biche blessée dans la forêt. Là où la biche s'arrêtait pour brouter, la femme trouvait des touffes de citronnelle. Elle comprit que cette plante guérissait les espaces malades. Depuis, les guérisseurs yoruba la plantent autour de leurs cases.",
    ],
    conseilsDeVie: [
      "Purifie régulièrement ton espace de vie et de travail — l'atmosphère influence ton état intérieur.",
      "Ta présence légère et purifiante est un don — cultive-le.",
      "Commence chaque projet par purifier l'espace mental et physique dans lequel tu travailles.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Zones tropicales d'Afrique de l'Ouest — partout",
    couleur: '#7A9E5A',
    couleurSecondaire: '#4D6B2E',
    enseignementDuJour:
      "Aujourd'hui, purifies ton espace — physique ou mental. Allume quelque chose de propre et de frais dans ta journée.",
    vertus: ['Répulsif moustiques naturel', 'Antifongique', 'Anti-anxieux', 'Digestif en tisane'],
    usagesTraditionnels: ['Tisane purifiante', 'Fumigation rituelle', 'Répulsif naturel', 'Assaisonnement culinaire', 'Purification des espaces sacrés'],
  },

  {
    id: 'raphia',
    nom: 'Raphia',
    nomAnglais: 'Raphia Palm',
    nomScientifique: 'Raphia sudanica',
    categorie: 'Plantes Rituelles',
    element: 'Eau',
    description:
      "Le Raphia est l'Initiatrice, la plante du passage et de la transformation sacrée. Ses fibres tissent les masques des sociétés secrètes, les vêtements des initiés et les liens sacrés. Il symbolise le tissage du destin et la transformation de la matière brute en art sacré.",
    symboliqueAfricaine:
      "Dans les traditions Poro, Sande et Ekpe d'Afrique de l'Ouest, le Raphia est la plante des sociétés d'initiation. Ses fibres tissent les costumes des masques qui représentent les esprits lors des cérémonies. Passer l'initiation, c'est littéralement être enveloppé de Raphia — entrer dans le monde des esprits.",
    symboliqueSpirirtuelle:
      "Le Raphia symbolise la transformation par l'initiation — le passage de l'état brut à l'état sacré. Ses longues feuilles qui tombent comme des fils symbolisent le tissage du destin. Il enseigne que le passage vers une vie plus profonde nécessite d'être 'enveloppé' dans le sacré, transformé par le processus.",
    symbolique: "Symbole de transformation initiatique, de tissage du destin et de passage vers le sacré.",
    qualites: ['Transformation profonde', 'Art du tissage', 'Passage initiatique', 'Connexion au sacré', 'Création rituelle'],
    defauts: ['Résistance à la transformation sans rituel', 'Difficulté à changer sans cérémonie', 'Besoin d\'être guidé', 'Dépendance au collectif'],
    pouvoirs: ['Initiation sacrée', 'Tissage du destin', 'Transformation par le rite', 'Connexion aux sociétés secrètes'],
    enseignements: [
      "Toute vraie transformation passe par un rite de passage conscient",
      "Tisse ton destin avec intention — chaque choix est un fil",
      "L'initiation n'est pas une fin — c'est un commencement",
      "Ce qui te transforme mérite d'être honoré comme sacré",
    ],
    citation: "Le raphia ne devient masque que dans les mains de celui qui sait tisser le sacré.",
    proverbes: [
      "Le raphia ne devient masque que dans les mains de celui qui sait tisser le sacré.",
      "L'initié sort du Raphia comme le papillon sort de son cocon — transformé.",
      "Ce que tu tisses avec intention sera porté par ceux qui viennent après toi.",
    ],
    legendes: [
      "La tradition Poro de Sierra Leone raconte que le premier masque sacré fut tissé avec du Raphia par les esprits eux-mêmes lors de la première nuit du monde. Ils le laissèrent aux humains en cadeau pour leurs cérémonies. Depuis, tisser le Raphia c'est refaire le geste originel des esprits.",
    ],
    conseilsDeVie: [
      "Crée des rites de passage conscients dans ta vie — marque les transitions importantes.",
      "Tisse avec intention tout ce que tu construis — chaque action est un fil dans le tissu de ta vie.",
      "La transformation profonde demande du temps et un accompagnement — ne saute pas les étapes.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Forêts humides d'Afrique de l'Ouest — Sierra Leone, Côte d'Ivoire, Guinée",
    couleur: '#7B4FA5',
    couleurSecondaire: '#4D2E66',
    enseignementDuJour:
      "Aujourd'hui, crée un rite intentionnel — même petit — pour marquer un passage dans ta vie.",
    vertus: ['Fibres solides biodégradables', 'Vin de raphia nutritif', 'Feuilles pour la construction'],
    usagesTraditionnels: ['Tissage des masques sacrés', 'Vêtements d\'initiation', 'Vin de raphia', 'Construction', 'Artisanat'],
  },

  /* ═══════════════════════════════════════════════════════════
     HERBES & GRAMINÉES
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'mil',
    nom: 'Mil Sacré',
    nomAnglais: 'Pearl Millet',
    nomScientifique: 'Pennisetum glaucum',
    categorie: 'Herbes & Graminées',
    element: 'Terre',
    description:
      "Le Mil Sacré est la Plante de la Vie Collective, le fondement alimentaire de l'Afrique de l'Ouest depuis des millénaires. Nourriture des ancêtres, offrande aux dieux, base de la bière sacrée — le mil est au cœur de toutes les cérémonies de la naissance à la mort.",
    symboliqueAfricaine:
      "Dans les traditions dogon, bambara et peule, le mil est l'aliment sacré par excellence. Ses grains représentent les étoiles — planter le mil c'est recréer le cosmos. Selon la cosmogonie dogon, c'est l'aigle de Gueno qui apporta les premiers grains de mil pour que les hommes puissent survivre. Les cérémonies des semailles et des récoltes sont les plus importantes de l'année.",
    symboliqueSpirirtuelle:
      "Le Mil symbolise la communauté nourricière — il ne peut être cultivé seul. Les champs de mil appartiennent à la famille étendue et sont cultivés collectivement. Il représente l'interdépendance sacrée : personne ne mange seul, personne ne plante seul. Sa graminée humble nourrit des empires.",
    symbolique: "Symbole de vie communautaire, d'interdépendance sacrée et de fondement nourricier.",
    qualites: ['Sens de la communauté', 'Humilité productive', 'Endurance climatique', 'Constance nourricière', 'Adaptabilité'],
    defauts: ['Invisibilité sous sa graminée humble', 'Besoin absolu de collectif', 'Fragilité individuelle', 'Difficulté à s\'imposer seul'],
    pouvoirs: ['Nourriture sacrée', 'Communauté nourricière', 'Offrande aux ancêtres', 'Fondement de l\'empire'],
    enseignements: [
      "La vie communautaire est la forme la plus élevée de l'organisation humaine",
      "Ce qui nourrit des empires est souvent humble en apparence",
      "Chaque geste de semailles est un acte de foi en l'avenir",
      "L'interdépendance n'est pas une faiblesse — c'est la sagesse collective",
    ],
    citation: "Le mil ne demande rien sinon de la terre et une communauté — et il nourrit des millions.",
    proverbes: [
      "Le mil ne demande rien sinon de la terre et une communauté — et il nourrit des millions.",
      "Un seul grain de mil ne fait pas la récolte.",
      "Plante le mil avec foi — la pluie viendra au moment voulu.",
    ],
    legendes: [
      "La cosmogonie dogon raconte que lors de la création du monde, Amma envoya un aigle portant les quatre premiers grains de mil dans ses serres. Il les sema aux quatre points cardinaux — ainsi le mil appartient à l'humanité entière, à aucune communauté en particulier. C'est pourquoi on partage toujours le mil.",
    ],
    conseilsDeVie: [
      "Cultive ton sens de la communauté — tu ne peux pas nourrir le monde seul.",
      "Honore les fondements humbles de ta vie — le mil simple nourrit mieux que les plats complexes.",
      "Plante aujourd'hui pour ceux qui mangeront demain — l'acte de foi est la plus grande vertu.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Savane et Sahel d'Afrique de l'Ouest — Mali, Sénégal, Burkina Faso, Niger",
    couleur: '#C8A84B',
    couleurSecondaire: '#8B6B1A',
    enseignementDuJour:
      "Aujourd'hui, fais quelque chose pour nourrir ta communauté — même un geste simple. Le mil nourrit tous ceux qui l'entourent.",
    vertus: ['Riche en fer et zinc', 'Source de protéines végétales', 'Anti-diabétique', 'Digestion lente'],
    usagesTraditionnels: ['Bouillie (fonio, tô)', 'Bière sacrée de mil (dolo)', 'Offrandes aux ancêtres', 'Cérémonies de semailles', 'Alimentation de base'],
  },

  /* ═══════════════════════════════════════════════════════════
     PALMIERS
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'ronier',
    nom: 'Rônier',
    nomAnglais: 'African Fan Palm',
    nomScientifique: 'Borassus aethiopum',
    categorie: 'Palmiers',
    element: 'Feu',
    description:
      "Le Rônier est le Géant du Sahel, le palmier qui donne tout sans retenue. De sa pulpe à ses feuilles, de sa sève à ses racines, chaque partie du Rônier nourrit ou construit. Il est le symbole de la générosité totale et de l'endurance sans plainte.",
    symboliqueAfricaine:
      "Dans les traditions sahéliennes, le Rônier est l'arbre qui 'ne refuse rien'. Il produit un fruit qui nourrit, des feuilles pour toiture et artisanat, une sève pour la boisson, un bois pour la construction, et ses jeunes pousses sont comestibles. Les griots le comparent au chef généreux qui donne tout à son peuple.",
    symboliqueSpirirtuelle:
      "Le Rônier enseigne la générosité sans retour — il ne cesse jamais de produire, ne se plaint jamais de l'aridité. Sa silhouette élancée en plein soleil symbolise l'endurance majestueuse, la persévérance qui ne cherche pas d'ombre pour se protéger mais qui crée de l'ombre pour les autres.",
    symbolique: "Symbole de générosité totale, d'endurance majestueuse et de service sans limite.",
    qualites: ['Générosité absolue', 'Endurance sahélienne', 'Service total', 'Majesté naturelle', 'Productivité constante'],
    defauts: ['Lenteur à mûrir', 'Difficulté à s\'adapter aux changements rapides', 'Croissance longue avant la production', 'Ancrage nécessaire'],
    pouvoirs: ['Générosité sacrée', 'Endurance du désert', 'Nourriture totale', 'Service sans mesure'],
    enseignements: [
      "La vraie générosité ne compte pas ce qu'elle donne",
      "L'endurance dans l'aridité révèle le caractère profond",
      "Sers sans retenue — chaque partie de toi peut être utile",
      "La majesté vient de la constance, pas de l'effort spectaculaire",
    ],
    citation: "Le rônier donne de sa pulpe, de ses feuilles, de sa sève et de son bois — il ne garde rien pour lui.",
    proverbes: [
      "Le rônier donne de sa pulpe, de ses feuilles, de sa sève et de son bois — il ne garde rien pour lui.",
      "Sous un rônier, on est toujours à l'ombre même en plein soleil du Sahel.",
      "L'endurance du rônier n'a pas besoin d'être admirée — elle nourrit.",
    ],
    legendes: [
      "La légende mandingue raconte que le premier Rônier fut planté par un chef qui avait tout perdu dans une guerre. Sans rien d'autre à offrir à son peuple, il planta un Rônier sur la tombe de chaque guerrier mort. Des années plus tard, les Rôniers nourrissaient les orphelins de la guerre. La générosité de leur mort continuait à travers les arbres.",
    ],
    conseilsDeVie: [
      "Développe ta capacité à donner sans compter — ta vraie richesse est dans ta générosité.",
      "Endure les saisons arides avec grâce — elles ne durent pas.",
      "Sois utile dans toutes les dimensions de ta vie, comme le rônier l'est dans tous ses aspects.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Sahel — Sénégal, Mali, Burkina Faso, Niger",
    couleur: '#8B4513',
    couleurSecondaire: '#5C2E0A',
    enseignementDuJour:
      "Aujourd'hui, donne quelque chose sans compter et sans attendre de retour. La générosité du rônier est sa nature.",
    vertus: ['Pulpe nutritive riche en sucres', 'Sève pour boisson (bangui)', 'Feuilles pour artisanat'],
    usagesTraditionnels: ['Fruit comestible', 'Vin de palme (bangui)', 'Toiture en feuilles', 'Artisanat', 'Construction'],
  },

  {
    id: 'dattier',
    nom: 'Dattier du Sénégal',
    nomAnglais: 'Senegal Date Palm',
    nomScientifique: 'Phoenix reclinata',
    categorie: 'Palmiers',
    element: 'Eau',
    description:
      "Le Dattier du Sénégal est le Survivant, le palmier qui pousse en touffes le long des rivières et dans les zones humides. Sa survie en groupe symbolise l'union qui fait la force — chaque rejeton soutient les autres, créant une forêt impénétrable.",
    symboliqueAfricaine:
      "Dans les traditions des bords de fleuves d'Afrique de l'Ouest, le Dattier du Sénégal marque les zones d'eau souterraine — il guide les voyageurs vers l'oasis. Ses fruits nourrissent en pleine saison sèche. Sa croissance en touffes denses symbolise la force du clan — individuel faible, ensemble invincible.",
    symboliqueSpirirtuelle:
      "Le Dattier du Sénégal enseigne que la survie est une affaire collective. Ses troncs multiples naissent d'une même racine — chacun est à la fois individu et partie d'un tout. Il symbolise la résilience par l'union, la persévérance dans les zones difficiles et la capacité de trouver de l'eau là où les autres ne cherchent pas.",
    symbolique: "Symbole de résilience collective, de survie par l'union et de persévérance dans l'adversité.",
    qualites: ['Résilience collective', 'Union fraternelle', 'Persévérance', 'Sens de l\'oasis', 'Guide dans l\'aridité'],
    defauts: ['Dépendance au groupe', 'Difficulté à s\'épanouir seul', 'Besoin d\'eau', 'Croissance envahissante'],
    pouvoirs: ['Force collective', 'Survie dans l\'adversité', 'Guide vers l\'eau vive', 'Résilience intergénérationnelle'],
    enseignements: [
      "L'union d'un clan est plus forte que la puissance d'un individu seul",
      "Cherche toujours l'eau là où les autres disent qu'il n'y en a pas",
      "La résilience se construit dans la durée et avec les autres",
      "Sois un guide vers les ressources pour ceux qui se perdent",
    ],
    citation: "Le dattier du Sénégal ne pousse jamais seul — c'est ensemble qu'il crée l'oasis.",
    proverbes: [
      "Le dattier du Sénégal ne pousse jamais seul — c'est ensemble qu'il crée l'oasis.",
      "Celui qui connaît le dattier du Sénégal trouve toujours l'eau.",
      "Le clan uni comme le dattier résiste à toutes les sécheresses.",
    ],
    legendes: [
      "La légende peule raconte qu'une famille nomade traversa sept jours de désert grâce à un enfant qui reconnut les touffes de Dattier au loin. Ils suivirent les arbres jusqu'à un point d'eau caché. L'enfant avait appris de sa grand-mère que les Dattiers du Sénégal ne poussent jamais loin de l'eau. Depuis, savoir lire les plantes fait partie de l'éducation peule.",
    ],
    conseilsDeVie: [
      "Construis et entretiens ton clan — seul tu survives, ensemble tu prospères.",
      "Développe ta capacité à lire les signaux que la nature t'envoie.",
      "Sois le guide qui sait trouver l'eau cachée pour les autres.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Bords de fleuves d'Afrique de l'Ouest — Sénégal, Guinée, Mali",
    couleur: '#A07A5C',
    couleurSecondaire: '#6B4D3A',
    enseignementDuJour:
      "Aujourd'hui, renforce un lien de ton clan ou de ta communauté. La résilience collective commence par un geste.",
    vertus: ['Fruits nutritifs', 'Sève sucrée', 'Feuilles artisanales'],
    usagesTraditionnels: ['Fruits consommés', 'Vin de palme', 'Vannerie', 'Indicateur d\'eau souterraine', 'Toiture'],
  },
];

export const CATEGORIES: AnimalCategorie[] = [
  'Arbres Sacrés',
  'Plantes Médicinales',
  'Plantes Alimentaires',
  'Plantes Rituelles',
  'Herbes & Graminées',
  'Palmiers',
];

export function getAnimalById(id: string): Animal | undefined {
  return ANIMALS.find((p) => p.id === id);
}

export const ANIMAL_CRIS: Record<string, { nom: string; description: string }> = {};
