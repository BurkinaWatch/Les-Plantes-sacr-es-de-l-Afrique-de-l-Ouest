export type PlanteCategorie =
  | 'Arbres Sacrés'
  | 'Plantes Médicinales'
  | 'Plantes Alimentaires'
  | 'Plantes Rituelles'
  | 'Herbes & Graminées'
  | 'Palmiers';

export type AnimalCategorie = PlanteCategorie;

export type Element = 'Feu' | 'Eau' | 'Terre' | 'Air';

export interface Plante {
  id: string;
  nom: string;
  nomAnglais: string;
  nomScientifique: string;
  categorie: PlanteCategorie;
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

export type Animal = Plante;

export const PLANTS: Plante[] = [

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

  /* ═══════════════════════════════════════════════════════════
     NOUVELLES PLANTES — ARBRES SACRÉS
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'iroko',
    nom: 'Iroko',
    nomAnglais: 'African Teak',
    nomScientifique: 'Milicia excelsa',
    categorie: 'Arbres Sacrés',
    element: 'Terre',
    description:
      "L'Iroko est le Roi Silencieux des forêts sacrées d'Afrique de l'Ouest. Colossal, immobile depuis des siècles, il est interdit de le couper sous peine de malédiction. Son bois dense et précieux, couleur d'or vieilli, est le bois des rois et des autels. Il incarne la permanence divine, la puissance qui n'a pas besoin de se montrer.",
    symboliqueAfricaine:
      "Chez les Yoruba du Nigeria, l'Iroko est habité par un esprit puissant — l'Iroko-man — qui exauce les souhaits mais exige en échange. Couper un Iroko sans rituel de permission attire la folie ou la mort. Au Bénin et en Côte d'Ivoire, ses racines contreforts abritent des autels où les guérisseurs font leurs offrandes. Nul village ne coupe son Iroko sacré.",
    symboliqueSpirirtuelle:
      "L'Iroko symbolise la puissance qui n'a pas besoin de se prouver — il est là depuis des siècles, silencieux, indestructible. Il enseigne que la grandeur véritable se reconnaît à sa permanence, non à ses éclats. Sa présence seule transforme l'espace autour de lui en espace sacré.",
    symbolique: "Symbole de permanence divine, de puissance silencieuse et de royauté de la forêt.",
    qualites: ['Permanence divine', 'Puissance silencieuse', 'Ancrage millénaire', 'Autorité naturelle', 'Présence transformatrice'],
    defauts: ['Immobilisme', 'Résistance totale au changement', 'Inaccessibilité', 'Pesanteur parfois écrasante'],
    pouvoirs: ['Permanence sacrée', 'Protection de la forêt', 'Accès aux esprits profonds', 'Autorité divine'],
    enseignements: [
      "La vraie puissance n'a pas besoin de se manifester — elle rayonne",
      "Certaines choses ne se touchent pas — respecte la hiérarchie du vivant",
      "Ta permanence dans tes valeurs est ta plus grande force",
      "La présence consciente transforme l'espace sans aucun effort",
    ],
    citation: "L'iroko ne parle jamais — mais tous savent qu'il est là.",
    proverbes: [
      "L'iroko ne parle jamais — mais tous savent qu'il est là.",
      "On ne coupe pas l'iroko sans demander permission — certaines forces exigent le respect.",
      "L'ombre de l'iroko est froide même en plein cœur de l'été — ainsi la sagesse rafraîchit toujours.",
    ],
    legendes: [
      "La légende yoruba raconte qu'un bûcheron qui coupa un Iroko sacré entendit un rire dans son tronc. La nuit, l'esprit Iroko-man vint le visiter en rêve et lui demanda : 'Pourquoi m'as-tu dérangé ?' Le bûcheron, effrayé, promit de planter dix Iroko en échange. L'esprit accepta — et depuis ce jour, la tradition veut qu'on plante dix arbres pour chaque Iroko qu'on abat.",
    ],
    conseilsDeVie: [
      "Cultive une présence profonde et ancrée — les gens sentent la solidité de ceux qui sont vraiment enracinés.",
      "Certaines de tes valeurs fondamentales ne se négocient pas — tiens-les comme l'Iroko tient sa forêt.",
      "Respecte les hiérarchies invisibles autour de toi — tout n'est pas accessible à tout le monde.",
    ],
    niveauSpirituel: 5,
    regionOrigine: "Forêts tropicales humides — Côte d'Ivoire, Nigeria, Ghana, Bénin",
    couleur: '#6B4A2A',
    couleurSecondaire: '#3D2810',
    enseignementDuJour:
      "Aujourd'hui, sois présent sans faire d'effort — laisse ta présence solide parler pour toi comme l'Iroko parle par son existence.",
    vertus: ['Bois imputrescible', 'Anti-inflammatoire (écorce)', 'Antimicrobien', 'Fébrifuge'],
    usagesTraditionnels: ['Bois sacré pour autels', 'Écorce en décoction', 'Sculpture rituelle', 'Construction de pirogues sacrées', 'Offrandes aux esprits'],
  },

  /* ═══════════════════════════════════════════════════════════
     NOUVELLES PLANTES — PLANTES MÉDICINALES
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'bissap',
    nom: 'Bissap',
    nomAnglais: 'Roselle Hibiscus',
    nomScientifique: 'Hibiscus sabdariffa',
    categorie: 'Plantes Médicinales',
    element: 'Feu',
    description:
      "Le Bissap est la Fleur du Cœur, la plante rouge sang dont les calices écarlates sont à la fois la boisson nationale du Sénégal et un remède cardiaque puissant. Sa couleur évoque le sang vitalisé, la passion maîtrisée, la beauté qui soigne. Il incarne la guérison par la beauté et la joie.",
    symboliqueAfricaine:
      "Au Sénégal, en Guinée et au Mali, le bissap est bien plus qu'une boisson — c'est le lien social par excellence. Offrir un verre de bissap rouge, c'est offrir son cœur. Lors des cérémonies de mariage, le bissap est servi aux invités pour symboliser la chaleur et la passion de l'union. Les guérisseurs wolof l'utilisent dans les remèdes du cœur brisé.",
    symboliqueSpirirtuelle:
      "Le Bissap symbolise la passion transformée en santé — son rouge sang n'est pas la violence mais la vitalité. Il enseigne que les émotions intenses, bien canalisées, sont des médicaments pour le corps et l'âme. Sa saveur acidulée représente les expériences difficiles qui, une fois intégrées, deviennent source d'énergie.",
    symbolique: "Symbole de passion vitale, de guérison par le cœur et de chaleur partagée.",
    qualites: ['Passion vitale', 'Chaleur du cœur', 'Beauté qui guérit', 'Générosité émotionnelle', 'Intensité créatrice'],
    defauts: ['Intensité parfois épuisante', 'Acidité émotionnelle', 'Fragilité face au gel', 'Passion qui brûle les autres'],
    pouvoirs: ['Guérison du cœur', 'Vitalité sanguine', 'Passion transformatrice', 'Lien social sacré'],
    enseignements: [
      "Tes émotions intenses sont tes médicaments — apprends à les doser",
      "La beauté qui guérit vaut plus que la médecine qui punit",
      "Partage ta chaleur sans te consumer",
      "Le rouge de ta passion est une force — pas une blessure",
    ],
    citation: "Le bissap est rouge comme le sang — et comme lui, il fait vivre le cœur.",
    proverbes: [
      "Le bissap est rouge comme le sang — et comme lui, il fait vivre le cœur.",
      "Là où le bissap fleurit, les cœurs sont ouverts.",
      "Une fleur rouge au bon moment vaut mille médicaments amers.",
    ],
    legendes: [
      "La légende wolof raconte qu'une femme guérisseuse dont le fils était mourant découvrit les calices rouges du bissap en suivant un oiseau rouge dans la forêt. Elle en fit une tisane et le donna à son fils qui revint à la vie en une nuit. Depuis, le bissap est appelé 'la couleur qui rappelle à la vie' — et on le sert à tous les malades du cœur.",
    ],
    conseilsDeVie: [
      "Transforme tes passions les plus intenses en sources de créativité et de guérison.",
      "Partage ta chaleur et ta vitalité avec générosité — le bissap se partage, jamais bu seul.",
      "Prends soin de ton cœur — littéralement et spirituellement.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Savanes tropicales — Sénégal, Mali, Guinée, Burkina Faso",
    couleur: '#B03060',
    couleurSecondaire: '#7A1A3A',
    enseignementDuJour:
      "Aujourd'hui, partage quelque chose de rouge — une passion, une émotion, une chaleur — avec quelqu'un qui en a besoin.",
    vertus: ['Hypotenseur naturel', 'Riche en vitamine C', 'Antioxydant puissant', 'Diurétique doux', 'Anti-cholestérol'],
    usagesTraditionnels: ['Boisson (jus de bissap)', 'Tisane cardiaque', 'Colorant naturel', 'Confiture', 'Remède tensions artérielles'],
  },

  {
    id: 'kinkeliba',
    nom: 'Kinkéliba',
    nomAnglais: 'Kinkeliba',
    nomScientifique: 'Combretum micranthum',
    categorie: 'Plantes Médicinales',
    element: 'Terre',
    description:
      "Le Kinkéliba est le Médecin du Village, le grand purificateur de l'Afrique soudano-sahélienne. Sa tisane ambrée est le premier remède contre la fièvre, le paludisme, les maladies du foie. Dans tout le Sahel, 'prendre le kinkéliba' est synonyme de prendre soin de soi profondément.",
    symboliqueAfricaine:
      "Au Sénégal et au Mali, le kinkéliba est la plante du retour à la santé. Les femmes wolof et bambara le préparent pour toute la famille lors des changements de saison. Il est aussi utilisé dans les rituels de purification après une épreuve — maladies, deuils, ruptures. Boire le kinkéliba, c'est se laver de l'intérieur.",
    symboliqueSpirirtuelle:
      "Le Kinkéliba symbolise la purification profonde qui vient de l'humilité — c'est un buisson discret, sans éclat, dont les feuilles allongées cachent une puissance médicinale extraordinaire. Il enseigne que les guérisseurs les plus puissants ne cherchent pas à être vus, que la vraie médecine est souvent là où on ne la cherche pas.",
    symbolique: "Symbole de purification intérieure, d'humilité guérisseuse et de force cachée.",
    qualites: ['Purification profonde', 'Humilité active', 'Force cachée', 'Constance thérapeutique', 'Discernement médical'],
    defauts: ['Amertume rebutante', 'Discrétion excessive', 'Méconnaissance par ceux qui cherchent l\'éclat', 'Besoin de patience'],
    pouvoirs: ['Purification hépatique', 'Fièvre maîtrisée', 'Retour à l\'équilibre', 'Guérison discrète'],
    enseignements: [
      "Les remèdes les plus puissants sont souvent les plus humbles",
      "La vraie guérison commence par accepter l'amertume de la vérité",
      "Ton pouvoir n'a pas besoin d'être vu pour être réel",
      "Prends soin de ton foie — il est le siège des émotions non digérées",
    ],
    citation: "Le kinkéliba ne cherche pas à plaire — il guérit, c'est tout.",
    proverbes: [
      "Le kinkéliba ne cherche pas à plaire — il guérit, c'est tout.",
      "Un buisson humble vaut mieux qu'un grand arbre qui n'a rien à donner.",
      "Qui connaît le kinkéliba ne craint pas la fièvre.",
    ],
    legendes: [
      "La tradition bambara raconte qu'un génie de la brousse enseigna le kinkéliba à une femme en la guidant vers ses feuilles lors d'une épidémie de fièvre. Elle dut d'abord accepter de boire elle-même l'amère tisane avant de la donner aux malades. Sa guérison convainquit tout le village. Depuis, le kinkéliba est la plante du courage de se soigner.",
    ],
    conseilsDeVie: [
      "Prends soin de ta santé profondemment — pas seulement les symptômes, mais les causes.",
      "Accepte les vérités amères qui te guérissent plutôt que les douceurs qui t'endorment.",
      "Valorise les gens discrets autour de toi — souvent les plus précieux se montrent le moins.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Sahel — Sénégal, Mali, Guinée, Burkina Faso",
    couleur: '#7A6030',
    couleurSecondaire: '#4D3A10',
    enseignementDuJour:
      "Aujourd'hui, occupe-toi d'une purification intérieure — corps, esprit ou émotions. Le kinkéliba nettoie en profondeur.",
    vertus: ['Anti-paludéen puissant', 'Hépatoprotecteur', 'Fébrifuge', 'Diurétique', 'Cholérétique'],
    usagesTraditionnels: ['Tisane de purification', 'Remède paludisme', 'Soins du foie', 'Purification rituelle après deuil', 'Traitement fièvre'],
  },

  {
    id: 'kalanchoe',
    nom: 'Kalanchoé',
    nomAnglais: 'Miracle Leaf',
    nomScientifique: 'Kalanchoe pinnata',
    categorie: 'Plantes Médicinales',
    element: 'Eau',
    description:
      "Le Kalanchoé est la Plante de la Résurrection, celle qui se reproduit à partir d'une seule feuille tombée. Sur le bord de chaque feuille naissent de petites plantules déjà formées — prêtes à prendre racine là où elles tombent. Il symbolise la régénération perpétuelle et l'invincibilité de la vie.",
    symboliqueAfricaine:
      "En Afrique de l'Ouest, le Kalanchoé est planté autour des maisons pour sa protection et sa guérison. On dit que 'là où le Kalanchoé pousse, la mort ne peut entrer'. Ses feuilles charnues sont appliquées directement sur les blessures, les brûlures et les infections. Son nom populaire — 'feuille de vie' — dit tout.",
    symboliqueSpirirtuelle:
      "Le Kalanchoé enseigne la multiplication par le don — chaque feuille donnée engendre une nouvelle plante. Il symbolise la générosité créatrice : ce qu'on offre revient multiplié. Sa capacité à s'enraciner partout où il tombe représente la résilience de l'âme qui transforme chaque chute en nouveau départ.",
    symbolique: "Symbole de régénération perpétuelle, de générosité multiplicatrice et de vie indestructible.",
    qualites: ['Régénération constante', 'Générosité multiplicatrice', 'Adaptabilité totale', 'Vie indestructible', 'Guérison naturelle'],
    defauts: ['Envahissement progressif', 'Difficulté à se contenir', 'Multiplication incontrôlable', 'Besoin de limites'],
    pouvoirs: ['Régénération sacrée', 'Multiplication de la vie', 'Guérison des blessures', 'Invincibilité vitale'],
    enseignements: [
      "Ce que tu offres se multiplie — la générosité est une loi cosmique",
      "Chaque chute peut être un nouveau départ si tu décides de t'enraciner",
      "La vie trouve toujours un chemin — même depuis une seule feuille",
      "Ta capacité de régénération est infinie si tu y crois",
    ],
    citation: "Le kalanchoé fait de chaque chute une naissance — il n'a pas peur de tomber.",
    proverbes: [
      "Le kalanchoé fait de chaque chute une naissance — il n'a pas peur de tomber.",
      "La feuille qui tombe engendre cent enfants — ainsi le geste généreux revient multiplié.",
      "Là où le kalanchoé pousse, la vie s'accroche.",
    ],
    legendes: [
      "La légende fon du Bénin raconte qu'une femme guerrière blessée en combat se traîna jusqu'à un Kalanchoé. Elle appliqua ses feuilles sur ses plaies et se coucha pour mourir. Au matin, elle était guérie. Elle rapporta la plante au village et dit : 'Cette feuille ne connaît pas la mort.' Depuis, le Kalanchoé est la plante des soldats et des mères qui veillent.",
    ],
    conseilsDeVie: [
      "Tu as une capacité de régénération que tu sous-estimes — souviens-t'en dans les moments sombres.",
      "Partage tes dons généreusement — ils reviennent toujours sous une autre forme.",
      "Transforme chaque blessure en force — le Kalanchoé fait de chaque feuille tombée une nouvelle plante.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Tropiques d'Afrique de l'Ouest — présent du Sénégal au Cameroun",
    couleur: '#2E7A5C',
    couleurSecondaire: '#1A4D38',
    enseignementDuJour:
      "Aujourd'hui, trouve comment transformer une difficulté récente en nouveau départ. Le Kalanchoé ne connaît pas les impasses.",
    vertus: ['Cicatrisant puissant', 'Anti-inflammatoire', 'Antibactérien', 'Antifongique', 'Hémosta-tique'],
    usagesTraditionnels: ['Feuilles sur les plaies', 'Traitement brûlures', 'Anti-infectieux', 'Remède ulcères', 'Protection de la maison'],
  },

  {
    id: 'artemisia',
    nom: 'Artémisia Africaine',
    nomAnglais: 'African Wormwood',
    nomScientifique: 'Artemisia afra',
    categorie: 'Plantes Médicinales',
    element: 'Air',
    description:
      "L'Artémisia Africaine est la Grande Guérisseuse des Hauts Plateaux, la plante argentée dont le parfum âcre et puissant purifie l'air et le corps. Reconnue mondialement pour ses propriétés anti-paludéennes, elle est utilisée depuis des millénaires dans la médecine traditionnelle sub-saharienne comme remède universel.",
    symboliqueAfricaine:
      "Dans les traditions d'Afrique de l'Est et du Sud qui rayonnent vers l'Afrique de l'Ouest, l'Artémisia est la plante des guérisseuses. Ses feuilles argentées et laineuses sont brûlées dans les rituels de purification. On dit qu'elle voit les maladies avant qu'elles ne se manifestent — et qu'elle les empêche d'entrer dans le corps.",
    symboliqueSpirirtuelle:
      "L'Artémisia symbolise la prophylaxie spirituelle — protéger avant que le mal n'arrive. Ses feuilles argentées représentent la sagesse lunaire, intuitive, qui anticipe. Elle enseigne que la vraie médecine est préventive, que le guérisseur sage agit avant la maladie, non après.",
    symbolique: "Symbole de prophylaxie spirituelle, de sagesse lunaire et de guérison préventive.",
    qualites: ['Anticipation intuitive', 'Sagesse préventive', 'Purification active', 'Discernement médical', 'Protection naturelle'],
    defauts: ['Amertume rebutante', 'Puissance parfois excessive', 'Usage à doses précises seulement', 'Incompréhension par les non-initiés'],
    pouvoirs: ['Prophylaxie sacrée', 'Purification par le parfum', 'Sagesse lunaire', 'Anti-paludisme ancestral'],
    enseignements: [
      "La prévention vaut mille guérisons — anticipe avant que la crise n'arrive",
      "Ton intuition qui pressentoit le danger est un don à cultiver",
      "Purifie ton environnement régulièrement avant que la toxicité ne s'installe",
      "La sagesse argentée est douce et acérée à la fois — comme l'intuition vraie",
    ],
    citation: "L'artémisia guérit la maladie avant que le malade ne sache qu'il l'a.",
    proverbes: [
      "L'artémisia guérit la maladie avant que le malade ne sache qu'il l'a.",
      "La feuille argentée voit dans l'ombre ce que l'œil ordinaire ne voit pas.",
      "Plante l'artémisia avant la saison des fièvres — ainsi font les sages.",
    ],
    legendes: [
      "Les guérisseurs de l'est africain racontent que la déesse Lune offrit l'Artémisia aux femmes guérisseuses pour les aider à voir les maladies dans le corps avant qu'elles ne se manifestent. C'est pourquoi la plante est argentée comme la lune et que ses propriétés sont maximales la nuit de pleine lune. Les récolter au clair de lune les charge d'une puissance particulière.",
    ],
    conseilsDeVie: [
      "Anticipe les risques dans ta vie — la prévention est l'intelligence supérieure.",
      "Fais confiance à ton intuition qui perçoit le danger avant qu'il ne soit visible.",
      "Purifie régulièrement ton espace de vie, tes relations et tes pensées.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Hauts plateaux d'Afrique — du Zimbabwe au Nigeria",
    couleur: '#7A9E7A',
    couleurSecondaire: '#4D6B4D',
    enseignementDuJour:
      "Aujourd'hui, fais un acte préventif dans un domaine de ta vie — santé, finances, relation — avant que le problème ne survienne.",
    vertus: ['Anti-paludéen (artémisinine)', 'Antiparasitaire', 'Antibactérien', 'Anti-inflammatoire', 'Vermifuge'],
    usagesTraditionnels: ['Tisane préventive paludisme', 'Fumigation purifiante', 'Inhalation pour infections', 'Bain médicinal', 'Remède universel'],
  },

  /* ═══════════════════════════════════════════════════════════
     NOUVELLES PLANTES — PLANTES ALIMENTAIRES
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'igname',
    nom: 'Igname',
    nomAnglais: 'African Yam',
    nomScientifique: 'Dioscorea rotundata',
    categorie: 'Plantes Alimentaires',
    element: 'Terre',
    description:
      "L'Igname est la Nourriture Royale, le tubercule sacré qui a nourri les grandes civilisations d'Afrique de l'Ouest depuis des millénaires. Sa récolte est une fête, sa première coupe est un rituel — au Nigeria, les Ibo célèbrent la Fête des Ignames comme le Nouvel An de la terre. C'est la plante de l'abondance et de la gratitude.",
    symboliqueAfricaine:
      "Chez les Ibo du Nigeria, l'Igname est 'le roi des cultures'. La Fête des Ignames (Iri Ji Ohuru) est la cérémonie la plus importante de l'année — elle marque le début de l'abondance retrouvée. Nul ne mange l'igname nouvelle avant que le chef n'ait fait les offrandes aux ancêtres. Elle appartient d'abord aux esprits, ensuite aux hommes.",
    symboliqueSpirirtuelle:
      "L'Igname symbolise le cycle de la gratitude — on ne consomme pas sans d'abord remercier. Elle enseigne que l'abondance n'est pas un droit mais un cadeau qui mérite d'être honoré. Son tubercule caché sous terre représente les richesses cachées qui demandent de s'agenouiller pour les trouver.",
    symbolique: "Symbole de gratitude pour l'abondance, de royauté de la terre et de célébration communautaire.",
    qualites: ['Gratitude profonde', 'Célébration de l\'abondance', 'Sens du sacré alimentaire', 'Royauté de l\'ancrage', 'Générosité festive'],
    defauts: ['Lourdeur', 'Lenteur de croissance', 'Dépendance au sol fertile', 'Besoin de soins constants'],
    pouvoirs: ['Abondance royale', 'Connexion à la terre nourricière', 'Gratitude sacrée', 'Festin communautaire'],
    enseignements: [
      "Remercie la terre avant de prendre ses fruits — la gratitude est la première sagesse",
      "Les richesses qui comptent sont cachées sous la surface — creuse avant de récolter",
      "Célèbre l'abondance collectivement — elle se multiplie quand elle est partagée",
      "Honore les cycles de la terre — elle sait mieux que toi quand c'est le bon moment",
    ],
    citation: "L'igname ne se mange pas sans d'abord la présenter aux ancêtres — ainsi tout festin commence par la gratitude.",
    proverbes: [
      "L'igname ne se mange pas sans d'abord la présenter aux ancêtres — ainsi tout festin commence par la gratitude.",
      "Celui qui honore la première igname ne manquera jamais de la dernière.",
      "La richesse de la terre appartient à ceux qui la respectent.",
    ],
    legendes: [
      "La légende ibo raconte que le premier homme reçut l'igname directement de Chukwu, le dieu créateur. Il lui dit : 'Partage-la avec ta communauté et remercie-moi avant chaque repas. Si tu oublies, l'abondance se retirera.' Depuis, la Fête des Ignames est le rappel annuel de ce premier pacte entre l'homme et le divin.",
    ],
    conseilsDeVie: [
      "Pratique la gratitude systématique avant de consommer — de la nourriture, du temps des autres, des ressources.",
      "Célèbre tes récoltes — petites et grandes — collectivement.",
      "Cherche tes richesses profondes en creusant sous la surface apparente.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Ceinture de l'igname — Nigeria, Bénin, Ghana, Côte d'Ivoire",
    couleur: '#C8892A',
    couleurSecondaire: '#8B5A10',
    enseignementDuJour:
      "Aujourd'hui, exprime une gratitude profonde et sincère pour une abondance dans ta vie que tu tiens pour acquise.",
    vertus: ['Riche en glucides complexes', 'Source de potassium', 'Fibres digestives', 'Antioxydant', 'Régulation glycémique'],
    usagesTraditionnels: ['Fufu (plat principal)', 'Igname pilée', 'Fête des Ignames', 'Offrande aux ancêtres', 'Alimentation de base'],
  },

  {
    id: 'manioc',
    nom: 'Manioc',
    nomAnglais: 'Cassava',
    nomScientifique: 'Manihot esculenta',
    categorie: 'Plantes Alimentaires',
    element: 'Terre',
    description:
      "Le Manioc est le Grand Adaptateur, la plante qui nourrit même là où rien d'autre ne pousse. Poussant dans les terres pauvres, supportant la sécheresse, produisant dans l'adversité — il est la plante de la résilience alimentaire. Sa toxicité crue, transformée par les femmes en nourriture saine, symbolise la transmutation des poisons en remèdes.",
    symboliqueAfricaine:
      "Introduit en Afrique de l'Ouest à partir du XVIème siècle, le Manioc s'est si bien intégré qu'il est devenu la base alimentaire de nombreux peuples. Au Congo, en Côte d'Ivoire et au Cameroun, le 'foutou' et l'attiéké de manioc sont des aliments identitaires. Les femmes qui maîtrisent sa transformation — enlever la toxicité — sont respectées comme des alchimistes.",
    symboliqueSpirirtuelle:
      "Le Manioc symbolise la transformation alchimique : ce qui est toxique cru devient nourrissant transformé. Il enseigne que les situations les plus difficiles et les personnes les plus 'difficiles' peuvent devenir des ressources extraordinaires si on sait comment les transformer. La patience et le savoir-faire féminin transmutent le poison en nourriture.",
    symbolique: "Symbole de transformation alchimique, de résilience dans l'adversité et de savoir-faire transmutateur.",
    qualites: ['Résilience absolue', 'Adaptabilité totale', 'Transformation alchimique', 'Nourriture de l\'adversité', 'Patience transformatrice'],
    defauts: ['Toxicité crue', 'Besoin de transformation avant d\'être utilisable', 'Dépendance aux techniques', 'Pauvreté nutritionnelle brute'],
    pouvoirs: ['Transmutation du poison en nourriture', 'Résilience alimentaire', 'Savoir-faire alchimique', 'Abondance dans les terres pauvres'],
    enseignements: [
      "Ce qui paraît toxique peut devenir nourrissant avec la bonne transformation",
      "Ton adaptabilité à des conditions difficiles est ta plus grande force",
      "Valorise le savoir-faire de transformation — c'est l'intelligence pratique du peuple",
      "Les terres pauvres peuvent produire des richesses si on sait comment les travailler",
    ],
    citation: "Le manioc cru empoisonne — transformé, il nourrit des millions. Ainsi les épreuves : elles dépendent de ce qu'on en fait.",
    proverbes: [
      "Le manioc cru empoisonne — transformé, il nourrit des millions. Ainsi les épreuves : elles dépendent de ce qu'on en fait.",
      "La femme qui sait travailler le manioc ne connaît pas la faim.",
      "La terre pauvre qui produit du manioc vaut mieux que la terre riche qui produit rien.",
    ],
    legendes: [
      "La légende congolaise raconte que la première femme qui découvrit comment détoxifier le manioc reçut ce secret dans un rêve d'une ancêtre. Elle vit que l'eau emportait le poison quand on laissait tremper les racines. Ainsi le peuple fut sauvé de la faim — par le savoir d'une femme qui écouta ses rêves.",
    ],
    conseilsDeVie: [
      "Identifie les situations 'toxiques' dans ta vie et cherche comment les transformer en ressources.",
      "Valorise le savoir-faire de transformation — en toi et chez les autres.",
      "Développe ta résilience en situations difficiles — le manioc pousse là où rien d'autre ne pousserait.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Zones tropicales d'Afrique de l'Ouest — partout du Sénégal au Congo",
    couleur: '#C8A87A',
    couleurSecondaire: '#8B6B3A',
    enseignementDuJour:
      "Aujourd'hui, transforme une situation difficile en opportunité — comme le manioc transforme la terre pauvre en nourriture.",
    vertus: ['Glucides énergétiques', 'Source de calcium', 'Fibres digestives', 'Faible en matières grasses'],
    usagesTraditionnels: ['Foutou, attiéké, gari', 'Farine de manioc', 'Tapioca', 'Colle naturelle (amidon)', 'Alimentation du bétail'],
  },

  {
    id: 'arachide',
    nom: 'Arachide',
    nomAnglais: 'Peanut',
    nomScientifique: 'Arachis hypogaea',
    categorie: 'Plantes Alimentaires',
    element: 'Terre',
    description:
      "L'Arachide est la Plante de l'Humilité Productive, celle qui cache ses fruits sous terre mais nourrit des millions. Sa fleur jaune vive produit en superficie, puis courbe sa tige pour enterrer ses gousses — comme si elle cachait sa propre réussite. C'est la plante de la discrétion qui produit en silence.",
    symboliqueAfricaine:
      "Au Sénégal, le 'pays de l'arachide', elle est l'or sous la terre qui a permis la prospérité coloniale — mais aussi le trésor des femmes qui extraient son huile depuis des siècles. Les marabouts sénégalais l'utilisent dans leurs gris-gris de protection. Partager une poignée d'arachides grillées, c'est partager l'essentiel de soi.",
    symboliqueSpirirtuelle:
      "L'Arachide enseigne que les réussites les plus solides se construisent sous la surface — invisibles, discrètes, sans vantardise. Elle courbe sa tige pour mettre ses graines en terre : humilité productive. Elle symbolise celui qui travaille dans l'ombre et produit ce dont tout le monde a besoin.",
    symbolique: "Symbole d'humilité productive, de richesse cachée et de travail discret qui nourrit.",
    qualites: ['Humilité productive', 'Discrétion efficace', 'Richesse partagée', 'Travail de fond', 'Constance silencieuse'],
    defauts: ['Excès de discrétion', 'Invisibilité des accomplissements', 'Difficulté à se valoriser', 'Modestie parfois handicapante'],
    pouvoirs: ['Richesse cachée', 'Nourriture des peuples', 'Humilité féconde', 'Travail de fond sacré'],
    enseignements: [
      "Les accomplissements les plus solides se construisent sous la surface",
      "L'humilité n'est pas l'absence de valeur — c'est la valeur qui ne se vante pas",
      "Travaille dans le silence — la terre reconnaît ce qu'on y sème",
      "Partage ce que tu produis, même en petite quantité — ça nourrit plus qu'on ne croit",
    ],
    citation: "L'arachide cache ses fruits sous terre — et nourrit pourtant des continents.",
    proverbes: [
      "L'arachide cache ses fruits sous terre — et nourrit pourtant des continents.",
      "Celui qui travaille en silence comme l'arachide récolte en abondance.",
      "Ne méprise pas ce qui est petit — l'arachide est petite et nourrit les rois.",
    ],
    legendes: [
      "La légende sérère du Sénégal raconte qu'une petite fille qui ne voulait pas se faire remarquer découvrit la première arachide en observant des fourmis traîner de petites graines dans leurs galeries souterraines. Elle les planta discrètement, sans le dire à personne. À la récolte, tout le village mangea grâce à elle — mais personne ne sut qui avait planté la première.",
    ],
    conseilsDeVie: [
      "Construis ta richesse dans la discrétion — les accomplissements silencieux sont les plus solides.",
      "Apprécie la valeur des petites choses — elles nourrissent souvent mieux que les grandes.",
      "Partage même ce qui te semble modeste — l'essentiel est souvent dans le geste.",
    ],
    niveauSpirituel: 2,
    regionOrigine: "Sénégal, Gambie, Mali — tout le Sahel",
    couleur: '#C49A30',
    couleurSecondaire: '#8B6510',
    enseignementDuJour:
      "Aujourd'hui, valorise ton travail discret. L'arachide produit sous terre — ce que tu fais sans être vu est aussi réel que ce que tout le monde voit.",
    vertus: ['Protéines végétales complètes', 'Bonnes graisses (acide oléique)', 'Vitamine E', 'Magnésium', 'Résveratrol antioxydant'],
    usagesTraditionnels: ['Huile d\'arachide', 'Pâte d\'arachide', 'Mafé (sauce)', 'Grillée comme snack', 'Savon artisanal'],
  },

  {
    id: 'sesame',
    nom: 'Sésame',
    nomAnglais: 'Sesame',
    nomScientifique: 'Sesamum indicum',
    categorie: 'Plantes Alimentaires',
    element: 'Feu',
    description:
      "Le Sésame est la Plante de l'Ouverture, la graine magique qui cache sa richesse jusqu'au dernier instant — puis s'ouvre en éclatant à maturité. 'Sésame, ouvre-toi !' est l'incantation universelle de l'ouverture du trésor caché. Il enseigne que les richesses les plus précieuses attendent celui qui sait être patient et prononcer les bons mots.",
    symboliqueAfricaine:
      "Au Burkina Faso, au Niger et au Mali, le sésame est l'or des femmes du Sahel. Ses petites graines blanches ou noires sont pressées pour une huile précieuse utilisée dans la cuisine, les massages de bébés et les rituels de beauté. On dit que l'huile de sésame 'ouvre les pores de l'âme' lors des massages rituels des nouveau-nés.",
    symboliqueSpirirtuelle:
      "Le Sésame symbolise l'ouverture au moment juste — ni trop tôt, ni trop tard. Ses gousses s'ouvrent en explosant quand elles sont mûres, dispersant leurs graines au vent. Il enseigne que certains trésors ne se révèlent qu'à leur moment exact, que la patience jusqu'à la maturité est la seule façon d'accéder aux richesses profondes.",
    symbolique: "Symbole d'ouverture au moment juste, de richesse patiente et de maturité explosive.",
    qualites: ['Patience jusqu\'à la maturité', 'Ouverture au bon moment', 'Richesse concentrée', 'Timing parfait', 'Générosité explosive'],
    defauts: ['Fermeture obstinée avant maturité', 'Explosion incontrôlable', 'Dispersion des ressources', 'Difficulté à retenir'],
    pouvoirs: ['Ouverture sacrée', 'Richesse révélée', 'Timing divin', 'Explosion de la maturité'],
    enseignements: [
      "Les trésors les plus profonds attendent le bon moment pour se révéler — sois patient",
      "Dis les bons mots au bon moment — 'Sésame ouvre-toi' fonctionne dans ta vie aussi",
      "Ta maturité intérieure est ce qui permet l'accès aux richesses profondes",
      "Quand le moment vient, n'hésite pas — ouvre-toi entièrement",
    ],
    citation: "Sésame, ouvre-toi — trois mots pour tous les trésors du monde, si on sait les dire au bon moment.",
    proverbes: [
      "Sésame, ouvre-toi — trois mots pour tous les trésors du monde, si on sait les dire au bon moment.",
      "La petite graine de sésame contient plus d'huile qu'on ne croit.",
      "Attend que le sésame soit mûr — les trésors précipités se perdent.",
    ],
    legendes: [
      "La tradition sahélienne raconte que le sésame fut le premier don des djinns aux humains. Un pêcheur perdu trouva un champ de sésame gardé par un génie. Le génie lui dit : 'Prononce les mots justes et tu pourras en emporter.' Le pêcheur dit honnêtement : 'Je te le demande pour nourrir ma famille.' Le génie lui ouvrit le chemin — car l'honnêteté était le mot de passe.",
    ],
    conseilsDeVie: [
      "Identifie le bon timing dans ta vie — certaines portes ne s'ouvrent qu'au bon moment.",
      "Attends ta vraie maturité avant de t'exposer — comme le sésame qui éclate quand il est prêt.",
      "Formule avec précision ce que tu demandes — les mots justes ouvrent les bonnes portes.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Sahel — Burkina Faso, Niger, Mali, Sénégal",
    couleur: '#D4A850',
    couleurSecondaire: '#8B6B1A',
    enseignementDuJour:
      "Aujourd'hui, identifie un trésor dans ta vie qui attend le bon moment pour s'ouvrir. Sois patient — le sésame sait quand éclater.",
    vertus: ['Riche en calcium (tahini)', 'Acides aminés essentiels', 'Vitamine E', 'Zinc et magnésium', 'Lignanes antioxydants'],
    usagesTraditionnels: ['Huile de sésame', 'Graines en cuisine', 'Massage des nourrissons', 'Pâte de sésame', 'Cosmétique capillaire'],
  },

  /* ═══════════════════════════════════════════════════════════
     NOUVELLES PLANTES — HERBES & GRAMINÉES
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'sorgho',
    nom: 'Sorgho',
    nomAnglais: 'Sorghum',
    nomScientifique: 'Sorghum bicolor',
    categorie: 'Herbes & Graminées',
    element: 'Feu',
    description:
      "Le Sorgho est la Graminée de Feu, la céréale solaire qui résiste à la chaleur là où les autres meurent. Ses grandes panicules rouges et marron dominent les champs comme des torches vivantes. C'est la céréale de la bière traditionnelle, des cérémonies du feu et des rituels de passage masculins en Afrique de l'Ouest.",
    symboliqueAfricaine:
      "Dans les traditions mandingues, dogon et peules, le sorgho est la céréale de la force masculine et des initiations. La bière de sorgho (dolo) est la boisson sacrée des cérémonies, servie aux ancêtres avant d'être bue par les vivants. Au Burkina Faso, les forgerons — caste sacrée — récoltent le sorgho selon des rituels spéciaux, car ils seuls savent manier le feu.",
    symboliqueSpirirtuelle:
      "Le Sorgho symbolise l'endurance solaire — sa capacité à pousser dans la chaleur intense là où les autres cèdent. Il représente le guerrier qui ne recule pas sous la pression, la force tempérée par la chaleur. Sa couleur rouge-brun évoque le sang maîtrisé, la passion contrôlée au service de la communauté.",
    symbolique: "Symbole d'endurance solaire, de force masculine sacrée et de célébration par le feu.",
    qualites: ['Endurance solaire', 'Force maîtrisée', 'Résistance à la chaleur', 'Célébration collective', 'Constance productive'],
    defauts: ['Rigidité parfois', 'Résistance au changement', 'Force brute difficile à raffiner', 'Besoin d\'espace'],
    pouvoirs: ['Feu sacré', 'Endurance du guerrier', 'Bière rituelle', 'Résistance climatique'],
    enseignements: [
      "La vraie force s'exprime dans les conditions les plus difficiles",
      "Résiste à la chaleur des épreuves — c'est là que ton caractère se forge",
      "Célèbre avec ceux qui t'ont aidé à passer les saisons difficiles",
      "Ton endurance n'est pas de l'entêtement — c'est de la constance",
    ],
    citation: "Le sorgho reste debout quand le soleil brûle tout — ainsi l'homme de caractère reste debout dans l'adversité.",
    proverbes: [
      "Le sorgho reste debout quand le soleil brûle tout — ainsi l'homme de caractère reste debout dans l'adversité.",
      "La bière de sorgho unit les vivants et les morts — ainsi la tradition unit les générations.",
      "Celui qui plante le sorgho en plein soleil ne craint pas la chaleur.",
    ],
    legendes: [
      "La légende dogon raconte que le sorgho fut apporté du ciel par les Nommo lors de la descente de l'arche cosmique. Il tomba en premier sur la terre comme un cadeau du cosmos pour les humains. C'est pourquoi sa récolte est célébrée comme un retour aux origines — un souvenir de ce premier don du ciel à la terre.",
    ],
    conseilsDeVie: [
      "Développe ta résistance aux conditions difficiles — ton endurance est ton vrai capital.",
      "Célèbre collectivement tes réussites — la bière de sorgho se partage, jamais bue seul.",
      "Trouve du sens dans les moments chauds de ta vie — ils forgent quelque chose d'important.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Sahel — Burkina Faso, Mali, Niger, Sénégal, Nigeria",
    couleur: '#A83030',
    couleurSecondaire: '#6B1A1A',
    enseignementDuJour:
      "Aujourd'hui, montre ton endurance dans une situation difficile. Le sorgho brille quand le soleil est le plus fort.",
    vertus: ['Riche en fer et vitamines B', 'Antioxydant (tanins)', 'Sans gluten', 'Fibres alimentaires', 'Anti-diabétique'],
    usagesTraditionnels: ['Tô et bouillie', 'Bière sacrée (dolo)', 'Farine de sorgho', 'Cérémonies d\'initiation', 'Alimentation du bétail'],
  },

  {
    id: 'fonio',
    nom: 'Fonio',
    nomAnglais: 'Fonio',
    nomScientifique: 'Digitaria exilis',
    categorie: 'Herbes & Graminées',
    element: 'Air',
    description:
      "Le Fonio est la Graine de l'Humilité Sacrée, la plus petite céréale du monde qui contenait autrefois le plus grand pouvoir nutritif. Surnommé 'la céréale des dieux' par les Dogon, il pousse sur les terres les plus ingrates sans engrais ni irrigation. Sa petitesse cache une richesse extraordinaire en acides aminés essentiels introuvables ailleurs.",
    symboliqueAfricaine:
      "Selon la cosmogonie dogon, le fonio est le 'germe du monde' — la première graine que Dieu confia à Nommo lors de la création. Il est la céréale des cérémonies spirituelles les plus hautes. Au Mali et en Guinée, le fonio est servi lors des naissances, des funérailles et des initiations — les trois passages de vie. Aucune cérémonie dogon ne peut se tenir sans le fonio.",
    symboliqueSpirirtuelle:
      "Le Fonio symbolise la puissance de l'infiniment petit — une graine minuscule qui contient plus de nutriments rares que toute autre céréale. Il enseigne l'humilité sacrée : ne pas sous-estimer ce qui est petit, car les plus grands pouvoirs sont souvent dans les plus petites formes. Il représente la grâce légère qui accomplit ce que la force lourde ne peut pas.",
    symbolique: "Symbole de puissance cachée dans l'humilité, de grâce légère et de sacré dans le quotidien.",
    qualites: ['Puissance dans la légèreté', 'Grâce sacrée', 'Humilité parfaite', 'Richesse inattendue', 'Adaptation maximale'],
    defauts: ['Difficulté de décorticage', 'Fragilité apparente', 'Méconnaissance de sa valeur', 'Petitesse mal comprise'],
    pouvoirs: ['Graine des dieux', 'Nourriture des passages', 'Puissance de l\'infiniment petit', 'Grâce alimentaire'],
    enseignements: [
      "Ne sous-estime jamais ce qui est petit — les plus grandes puissances sont parfois minuscules",
      "La légèreté n'est pas la faiblesse — c'est une forme supérieure de force",
      "Les passages importants de ta vie méritent les nourritures les plus sacrées",
      "Cultive l'humilité — elle est souvent plus puissante que la grandeur affichée",
    ],
    citation: "Le fonio est si petit qu'on le voit à peine — et pourtant les dieux eux-mêmes en mangent.",
    proverbes: [
      "Le fonio est si petit qu'on le voit à peine — et pourtant les dieux eux-mêmes en mangent.",
      "La plus petite graine du Sahel contient le plus grand mystère.",
      "Celui qui méprise le fonio ne connaît pas encore la sagesse des choses légères.",
    ],
    legendes: [
      "La cosmogonie dogon enseigne que lors de la création, Amma (Dieu) donna aux humains quatre graines pour survivre. Le fonio fut la dernière, la plus petite — et Nommo dit : 'Celle-ci est la plus sacrée car elle contient le commencement de toutes les autres.' Les Dogon plantent toujours le fonio en premier, avant toute autre culture, pour rappeler que le commencement est sacré.",
    ],
    conseilsDeVie: [
      "Reconnais la valeur extraordinaire des petites choses dans ta vie.",
      "Cultive la légèreté et la grâce dans ta façon d'agir — l'air porte plus que la pierre.",
      "Marque tes grands passages de vie par des rituels intentionnels — comme le fonio marque les cérémonies.",
    ],
    niveauSpirituel: 5,
    regionOrigine: "Haut plateau mandingue — Guinée, Mali, Sénégal, Burkina Faso",
    couleur: '#D4BF7A',
    couleurSecondaire: '#8B7A2E',
    enseignementDuJour:
      "Aujourd'hui, prête attention à quelque chose de petit que tu as négligé. Le fonio rappelle que la grandeur peut se cacher dans l'infiniment petit.",
    vertus: ['Acides aminés essentiels (méthionine, cystine)', 'Sans gluten', 'Index glycémique bas', 'Digestion facile', 'Fer et zinc'],
    usagesTraditionnels: ['Couscous de fonio', 'Bouillie sacrée', 'Bière de fonio', 'Cérémonies de naissance', 'Initiations spirituelles'],
  },

  /* ═══════════════════════════════════════════════════════════
     NOUVELLES PLANTES — PLANTES RITUELLES
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'basilic-africain',
    nom: 'Basilic Africain',
    nomAnglais: 'African Basil',
    nomScientifique: 'Ocimum gratissimum',
    categorie: 'Plantes Rituelles',
    element: 'Feu',
    description:
      "Le Basilic Africain est la Plante du Seuil, celle qu'on plante à l'entrée des maisons pour purifier ce qui entre et protéger ce qui est dedans. Son parfum puissant, entre l'anisé et l'épicé, est à la fois médicament et offrande. Il est la frontière vivante entre le monde ordinaire et l'espace sacré.",
    symboliqueAfricaine:
      "Dans les traditions yoruba du Nigeria, le Basilic Africain est associé à Oshun, l'Orisha de l'amour et de la féminité sacrée. On le place dans les maisons au nom de cet Orisha pour attirer l'amour et la fertilité. Au Ghana, les Akan l'utilisent dans les purifications avant les grandes cérémonies — son parfum chasse les énergies mortes.",
    symboliqueSpirirtuelle:
      "Le Basilic Africain symbolise la protection par la présence aimante — il ne combat pas, il enveloppe. Son parfum crée un espace où le négatif n'est pas détruit mais simplement rendu incompatible. Il représente la frontière sacrée entre l'intime et le public, entre le sacré et le profane.",
    symbolique: "Symbole de protection par l'amour, de frontière sacrée et de purification par la présence.",
    qualites: ['Protection par l\'amour', 'Frontière sacrée', 'Purification vivante', 'Présence enveloppante', 'Fertilité aimante'],
    defauts: ['Besoin de chaleur constante', 'Fragilité au froid', 'Dépendance à l\'amour pour s\'épanouir', 'Surprotection possible'],
    pouvoirs: ['Protection sacrée', 'Purification des seuils', 'Attraction de l\'amour', 'Frontière vivante'],
    enseignements: [
      "La protection la plus puissante vient de l'amour, pas de la peur",
      "Crée une frontière sacrée entre ton espace intérieur et le monde",
      "Purifie tes seuils — tout ce qui entre dans ta vie t'influence",
      "L'amour est un espace, pas seulement une émotion — cultivez-le dans votre environnement",
    ],
    citation: "Le basilic à l'entrée de la maison dit à tout ce qui passe : l'amour habite ici.",
    proverbes: [
      "Le basilic à l'entrée de la maison dit à tout ce qui passe : l'amour habite ici.",
      "Plante le basilic à ta porte — et tes ennemis passeront sans entrer.",
      "La maison qui sent le basilic est une maison où les esprits bons se sentent les bienvenus.",
    ],
    legendes: [
      "La légende yoruba raconte qu'Oshun elle-même planta le premier basilic africain sur les rives du fleuve qui porte son nom. Elle dit : 'Là où je plante ce parfum, l'amour ne peut que fleurir.' Depuis, les femmes yoruba plantent le basilic à l'entrée de leurs maisons pour que l'Orisha de l'amour guide ce qui entre et protège ce qui y vit.",
    ],
    conseilsDeVie: [
      "Crée des 'seuils sacrés' dans ta vie — des pratiques qui protègent ton espace intérieur.",
      "Purifie régulièrement l'entrée de ton foyer et de ton espace de travail.",
      "Protège-toi avec l'amour plutôt qu'avec la peur — c'est une protection plus durable.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Zones tropicales d'Afrique de l'Ouest — Nigeria, Ghana, Côte d'Ivoire, Bénin",
    couleur: '#4A8A5A',
    couleurSecondaire: '#2A5A3A',
    enseignementDuJour:
      "Aujourd'hui, crée ou renforce une frontière saine dans ta vie — une limite qui protège ce que tu as de précieux.",
    vertus: ['Antibactérien puissant', 'Anti-inflammatoire', 'Antifongique', 'Vermifuge', 'Stimulant digestif'],
    usagesTraditionnels: ['Plante protectrice de seuil', 'Huile essentielle purifiante', 'Tisane digestive', 'Rituel d\'amour (Oshun)', 'Fumigation cérémonielle'],
  },

  /* ═══════════════════════════════════════════════════════════
     NOUVELLES PLANTES — PALMIERS
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'palmier-huile',
    nom: 'Palmier à Huile',
    nomAnglais: 'Oil Palm',
    nomScientifique: 'Elaeis guineensis',
    categorie: 'Palmiers',
    element: 'Feu',
    description:
      "Le Palmier à Huile est le Grand Pourvoyeur d'Afrique de l'Ouest, le palmier aux fruits rouges ardents dont l'huile d'or rouge illumine et nourrit. De ses grappes de fruits orange-rouge coule l'huile palmiste, base de la cuisine, du savon, des cosmétiques et des rituels depuis des millénaires. Il incarne l'abondance solaire et la générosité ardente.",
    symboliqueAfricaine:
      "Chez les Ibo du Nigeria et les Fon du Bénin, le palmier à huile est associé à Amadioha et Shango — les dieux du tonnerre et du feu. Son huile rouge est utilisée dans presque toutes les cérémonies vaudou et yoruba : elle oint les statues, les autels, les initiés. La palme est l'arbre du monde ibo — 'Qui a un frère palmiste ne meurt pas de faim.'",
    symboliqueSpirirtuelle:
      "Le Palmier à Huile symbolise la générosité ardente — tout en lui peut servir : huile, palme, sève, bois, noyau. Il enseigne que la vraie richesse est celle qui peut tout transformer en ressource. Son huile rouge évoque le sang de la vie, la passion productive, la chaleur qui nourrit et unit.",
    symbolique: "Symbole de générosité ardente, d'abondance totale et de transformation sacrée.",
    qualites: ['Générosité ardente', 'Productivité totale', 'Abondance transmissible', 'Chaleur nourricière', 'Polyvalence totale'],
    defauts: ['Intensité parfois excessive', 'Couleur qui tache et marque', 'Besoin d\'espace', 'Mono-culture épuisante'],
    pouvoirs: ['Huile sacrée', 'Feu nourricier', 'Abondance totale', 'Onction rituelle'],
    enseignements: [
      "Toutes les parties de toi peuvent être utiles — ne réserve pas ta générosité à un seul aspect",
      "La richesse qui nourrit la communauté est sacrée",
      "L'ardeur productive vaut plus que la contemplation stérile",
      "Offre ton huile — ce qui te semble ordinaire peut transformer la vie des autres",
    ],
    citation: "Le palmier à huile ne garde rien — ses fruits rouges apartiennent à tout le monde.",
    proverbes: [
      "Le palmier à huile ne garde rien — ses fruits rouges appartiennent à tout le monde.",
      "L'huile rouge du palmier ne se cache pas — ainsi la vraie générosité est visible.",
      "Qui a un frère palmiste ne meurt pas de faim — ainsi qui a un ami généreux est riche.",
    ],
    legendes: [
      "La légende ibo raconte que le palmier à huile fut planté par Chukwu au centre du premier village créé. Ses fruits rouges représentaient le sang de la création — et qui le consommait participait à la vie divine. Depuis, l'huile de palme rouge est la première offrande faite aux divinités ibo avant toute cérémonie.",
    ],
    conseilsDeVie: [
      "Offre ta générosité sans compter — comme le palmier dont les régimes nourrissent des familles entières.",
      "Développe ta polyvalence — le palmier à huile est utile du fruit au bois.",
      "Mets de la passion et de la chaleur dans tout ce que tu produis.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Forêts tropicales humides — Côte d'Ivoire, Nigeria, Ghana, Congo",
    couleur: '#C83020',
    couleurSecondaire: '#8B1A0A',
    enseignementDuJour:
      "Aujourd'hui, sois généreux avec ardeur dans un domaine qui te tient à cœur. Le palmier rouge donne sans retenue.",
    vertus: ['Huile riche en vitamine E', 'Acide palmitique et oléique', 'Caroténoïdes antioxydants', 'Vitamine K', 'Coenzyme Q10'],
    usagesTraditionnels: ['Huile de palme rouge (cuisine)', 'Huile palmiste (cosmétique)', 'Vin de palme', 'Savon traditionnel', 'Onction rituelle des autels'],
  },

  {
    id: 'cocotier',
    nom: 'Cocotier',
    nomAnglais: 'Coconut Palm',
    nomScientifique: 'Cocos nucifera',
    categorie: 'Palmiers',
    element: 'Eau',
    description:
      "Le Cocotier est l'Arbre de la Côte, le palmier voyageur dont les noix naviguent sur les océans depuis des millénaires pour coloniser de nouveaux rivages. Il symbolise l'aventure du voyage, la confiance dans les courants de la vie et l'abondance des côtes où la mer et la terre se rencontrent.",
    symboliqueAfricaine:
      "Dans les traditions côtières d'Afrique de l'Ouest — Sénégal, Côte d'Ivoire, Ghana, Nigeria — le cocotier est l'arbre des pêcheurs et des navigateurs. Ses fronds agités par le vent sont lus comme des messages des esprits marins. L'eau de coco est offerte aux visiteurs arrivant de la mer — symbole d'hospitalité et de purification après le voyage.",
    symboliqueSpirirtuelle:
      "Le Cocotier symbolise la confiance dans le voyage — sa noix se lance dans l'océan sans savoir où elle s'enracinera. Il enseigne que certains destins nécessitent de naviguer à la dérive, de faire confiance aux courants plutôt que de forcer la direction. Ses racines profondes dans le sable tenu par le vent représentent l'ancrage malgré l'incertitude.",
    symbolique: "Symbole de confiance dans le voyage, d'abondance côtière et d'hospitalité universelle.",
    qualites: ['Confiance dans le voyage', 'Hospitalité généreuse', 'Adaptabilité maritime', 'Ancrage dans l\'incertitude', 'Abondance légère'],
    defauts: ['Déracinement facile', 'Dispersion possible', 'Fragilité aux grandes tempêtes', 'Nostalgie des rivages'],
    pouvoirs: ['Voyage sacré', 'Purification maritime', 'Hospitalité divine', 'Confiance dans les courants'],
    enseignements: [
      "Fais confiance aux courants de la vie — ils t'emmènent là où tu dois aller",
      "L'hospitalité est la plus haute forme de la générosité",
      "Voyage léger — les cocotiers ne portent que leurs noix",
      "Enracine-toi profondément même sur les sables mouvants de l'incertitude",
    ],
    citation: "La noix de coco ne choisit pas sa rive — mais partout où elle s'échoue, elle donne tout.",
    proverbes: [
      "La noix de coco ne choisit pas sa rive — mais partout où elle s'échoue, elle donne tout.",
      "Celui qui offre l'eau de coco à l'étranger reçoit la bénédiction de la mer.",
      "Le cocotier penché vers la mer n'a pas peur de tomber — il sait que l'eau le rattrapera.",
    ],
    legendes: [
      "La légende des pêcheurs alladian de la Côte d'Ivoire raconte qu'une famille perdue en mer fut guidée vers la côte par la lumière qui brillait à travers les fronds d'un cocotier. Ils comprirent que les esprits des ancêtres s'étaient installés dans l'arbre pour les guider. Depuis, les pêcheurs plantent un cocotier sur la rive pour y appeler les esprits protecteurs des navigateurs.",
    ],
    conseilsDeVie: [
      "Fais confiance au voyage même quand tu n'en vois pas la destination.",
      "Accueille les étrangers et les voyageurs avec générosité — ils portent des bénédictions.",
      "Ancre-toi dans tes valeurs profondes même en terrain instable.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Côtes d'Afrique de l'Ouest — Sénégal, Guinée, Côte d'Ivoire, Ghana, Nigeria",
    couleur: '#3D8A6A',
    couleurSecondaire: '#1A5A3A',
    enseignementDuJour:
      "Aujourd'hui, fais confiance à un courant dans ta vie que tu voulais contrôler. Le cocotier voyage sans peur — et trouve toujours une rive.",
    vertus: ['Eau de coco électrolytes naturels', 'Huile de coco anti-microbienne', 'Chair nutritive', 'Acide laurique immuno-stimulant'],
    usagesTraditionnels: ['Eau de coco purifiante', 'Huile de coco cosmétique', 'Chair alimentaire', 'Huile pour rituels', 'Lait de coco en cuisine'],
  },

  /* ═══════════════════════════════════════════════════════════
     NOUVEAUX ARBRES SACRÉS
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'manguier',
    nom: 'Manguier',
    nomAnglais: 'Mango Tree',
    nomScientifique: 'Mangifera indica',
    categorie: 'Arbres Sacrés',
    element: 'Feu',
    description:
      "Le Manguier est le roi des arbres fruitiers tropicaux, dont l'ombre bienfaisante protège les villages et les familles d'Afrique de l'Ouest depuis des générations. Son fruit doré est symbole de récompense après la longue attente de la saison sèche, et son tronc majestueux offre le lieu de rassemblement communautaire par excellence.",
    symboliqueAfricaine:
      "Dans les traditions mandingues et haoussa, le manguier est l'arbre de la prospérité partagée. Ses fruits abondants symbolisent la générosité divine — un arbre qui comble toute une communauté. Les palabres importants se tiennent à son ombre. Les jeunes filles y font des prières pour trouver un bon mari, car sa douceur représente la bonté du cœur.",
    symboliqueSpirirtuelle:
      "Le Manguier enseigne la patience dorée : ses fruits se forment lentement sous une chaleur intense, mais leur douceur compense toute attente. Il symbolise la récompense des efforts persévérants et la générosité qui ne s'épuise pas. Sa sève laiteuse représente la sagesse qui coule en silence avant de se révéler.",
    symbolique: "Symbole de prospérité, de patience dorée et de générosité communautaire.",
    qualites: ['Générosité abondante', 'Patience mûrissante', 'Douceur profonde', 'Protection familiale', 'Prospérité partagée'],
    defauts: ['Jalousie des richesses', 'Lenteur à produire', 'Lourdeur après l\'abondance', 'Possessivité des fruits'],
    pouvoirs: ['Abondance divine', 'Rassemblement communautaire', 'Protection de l\'ombre', 'Récompense du patient'],
    enseignements: [
      "Les fruits les plus doux demandent la plus longue patience",
      "Partage ton abondance — l'arbre qui retient ses fruits pourrit",
      "Ta douceur est ta force la plus puissante",
      "L'ombre que tu offres est ton plus beau cadeau",
    ],
    citation: "Le manguier ne choisit pas ses convives — il nourrit celui qui tend la main.",
    proverbes: [
      "Le manguier ne choisit pas ses convives — il nourrit celui qui tend la main.",
      "Avant la mangue dorée, il y a eu la fleur blanche que personne ne regardait.",
      "L'arbre qui donne des mangues subit les lancers de pierres — c'est le prix de l'abondance.",
    ],
    legendes: [
      "La légende bambara raconte qu'un jeune homme sans famille planta un manguier au centre du village. Pendant des années il l'arrosait seul. Quand il porta ses premiers fruits, tous vinrent manger. L'arbre lui avait construit sa famille — ceux qui partagent un repas deviennent frères.",
      "Les Haoussa disent que le dieu du soleil, Uwar Gona, souffla dans la fleur du manguier pour y distiller sa lumière. C'est pourquoi le fruit est doré et sucré comme un rayon de soleil capturé.",
    ],
    conseilsDeVie: [
      "Cultive ta patience — les plus belles réalisations se font attendre.",
      "Offre généreusement les fruits de ton travail à ta communauté.",
      "Ta douceur de caractère attire plus que ta force — sois comme la mangue.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Toute l'Afrique de l'Ouest — du Sénégal au Nigeria",
    couleur: '#F4A12E',
    couleurSecondaire: '#C47A0A',
    enseignementDuJour:
      "Aujourd'hui, sois généreux comme le manguier. Offre quelque chose de doux à quelqu'un sans attendre de retour.",
    vertus: ['Riche en vitamine C et A', 'Antioxydant puissant', 'Digestif naturel', 'Anti-inflammatoire', 'Renforce l\'immunité'],
    usagesTraditionnels: ['Fruit frais et séché', 'Jus et jus fermenté', 'Feuilles en tisane antidiabétique', 'Écorce pour traiter la diarrhée', 'Graine pour l\'huile cosmétique'],
  },

  {
    id: 'jujubier',
    nom: 'Jujubier',
    nomAnglais: 'Jujube Tree',
    nomScientifique: 'Ziziphus mauritiana',
    categorie: 'Arbres Sacrés',
    element: 'Terre',
    description:
      "Le Jujubier est l'arbre de la résistance et de la survivance. Épineux et vigoureux, il pousse là où d'autres arbres refusent, s'enracine dans les terres arides les plus hostiles et produit ses petits fruits rouges avec une générosité farouche. C'est l'arbre du Sahel, gardien des terres ingrates et protecteur des villages les plus exposés.",
    symboliqueAfricaine:
      "Dans les traditions peules et touarègues, le jujubier est l'arbre de la résistance héroïque. Ses épines protègent les villages contre les esprits maléfiques. Ses fruits nourrissent les voyageurs épuisés dans le désert. On dit que l'arbre comprend la souffrance — il a lui-même survécu à tout. Les bergers y accrochent des amulettes pour protéger leurs troupeaux.",
    symboliqueSpirirtuelle:
      "Le Jujubier incarne la force née de l'adversité. Ses épines ne sont pas de la cruauté — elles sont la nécessité de se protéger pour survivre et continuer à donner. Il enseigne que la dureté extérieure peut coexister avec la douceur intérieure — ses fruits sont sucrés malgré l'hostilité de ses branches.",
    symbolique: "Symbole de résistance héroïque, de survie dans l'adversité et de protection farouche.",
    qualites: ['Résistance exceptionnelle', 'Générosité malgré la dureté', 'Protection farouche', 'Survie créatrice', 'Ancrage dans l\'impossible'],
    defauts: ['Dureté défensive', 'Méfiance excessive', 'Repli protecteur', 'Difficulté d\'approche'],
    pouvoirs: ['Protection contre le mal', 'Force dans l\'adversité', 'Nourriture des voyageurs', 'Résistance spirituelle'],
    enseignements: [
      "La force naît là où les conditions sont les plus dures",
      "Protège-toi sans honte — les épines du jujubier sont son intelligence",
      "Ta douceur intérieure n'est pas incompatible avec ta résistance extérieure",
      "Prospère là où l'on te dit que c'est impossible",
    ],
    citation: "Le jujubier prospère dans le désert — il a appris que la dureté du sol nourrit la profondeur des racines.",
    proverbes: [
      "Le jujubier prospère dans le désert — il a appris que la dureté du sol nourrit la profondeur des racines.",
      "Ne méprise pas le buisson épineux — c'est sous ses épines que se cachent les fruits les plus doux.",
      "Celui qui traverse le jujubier sans se piquer n'en connaît pas le chemin.",
    ],
    legendes: [
      "Les Peuls racontent qu'un esprit du désert, jaloux de la vie, maudit le jujubier pour qu'il ne puisse jamais pousser que dans les terres mortes. L'arbre accepta la malédiction et en fit sa force — et depuis, il verdit les terres que les autres abandonnent.",
    ],
    conseilsDeVie: [
      "Utilise les obstacles comme des racines supplémentaires — ils t'ancrent plus profond.",
      "Protège tes limites fermement. Tes épines ne sont pas de la méchanceté.",
      "Sois doux à l'intérieur même quand le monde t'impose d'être dur à l'extérieur.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Sahel et zones semi-arides — Sénégal, Mali, Niger, Burkina Faso",
    couleur: '#8B6914',
    couleurSecondaire: '#5C4208',
    enseignementDuJour:
      "Aujourd'hui, honore ta capacité à résister. Là où tu as survécu, tu as aussi grandi.",
    vertus: ['Riche en vitamine C', 'Calmant nerveux', 'Anti-diarrhéique', 'Hypnotique doux', 'Antioxydant'],
    usagesTraditionnels: ['Fruits comestibles frais et séchés', 'Feuilles contre la fièvre', 'Racines contre les maux de ventre', 'Bois dur pour outils', 'Haies protectrices'],
  },

  {
    id: 'anacardier',
    nom: 'Anacardier',
    nomAnglais: 'Cashew Tree',
    nomScientifique: 'Anacardium occidentale',
    categorie: 'Arbres Sacrés',
    element: 'Feu',
    description:
      "L'Anacardier est l'arbre paradoxal par excellence — son fruit précieux est caché sous sa pomme charnue, et sa noix contient une huile brûlante avant d'offrir sa douceur. C'est l'arbre qui enseigne que la vraie valeur nécessite une transformation, que rien de précieux ne se livre sans effort. En Afrique de l'Ouest, il représente la richesse industrieuse et la sagesse de discerner ce qui est précieux.",
    symboliqueAfricaine:
      "Dans les régions côtières de Guinée-Bissau, du Sénégal et de la Côte d'Ivoire, l'anacardier est devenu l'arbre de la prospérité économique. Ses noix exportées font vivre des familles entières. Les djola associent l'anacardier aux initiations — sa noix brûlante représente l'épreuve qui précède la révélation. On dit que celui qui comprend l'anacardier comprend que toute transformation est douloureuse avant d'être lumineuse.",
    symboliqueSpirirtuelle:
      "L'Anacardier incarne le paradoxe sacré : ce qui est le plus précieux est souvent caché dans ce qui semble être un danger. Son huile urticante enveloppe une noix divine. Il enseigne à ne pas fuir la transformation douloureuse — c'est précisément là que se trouve la valeur.",
    symbolique: "Symbole de transformation, de valeur cachée et de richesse méritée.",
    qualites: ['Persévérance transformatrice', 'Valeur cachée reconnue', 'Richesse industrieuse', 'Paradoxe créatif', 'Générosité complète'],
    defauts: ['Brûlure des approches maladroites', 'Apparences trompeuses', 'Valeur méconnue', 'Impatience dans la transformation'],
    pouvoirs: ['Révélation de la valeur cachée', 'Transformation par l\'épreuve', 'Prospérité méritée', 'Discernement du précieux'],
    enseignements: [
      "Ce qui est précieux se cache souvent derrière ce qui semble dangereux",
      "Toute transformation vraie passe par une épreuve",
      "Ne juge pas la valeur des choses à leur apparence extérieure",
      "La prospérité réelle vient du travail de discernement",
    ],
    citation: "La noix de cajou dit : je suis précieuse, mais tu dois d'abord accepter ma brûlure pour me connaître.",
    proverbes: [
      "La noix de cajou dit : je suis précieuse, mais tu dois d'abord accepter ma brûlure pour me connaître.",
      "L'or ne se révèle qu'après le feu — la noix de cajou l'a appris avant l'orfèvre.",
      "Ne méprise pas la pomme de cajou douce — elle protège la noix la plus précieuse.",
    ],
    legendes: [
      "Les Djola de Guinée-Bissau racontent que l'anacardier fut planté par un génie du feu qui voulait tester les hommes. Il cacha la sagesse dans une noix entourée d'huile brûlante. Seuls ceux qui acceptèrent la transformation par le feu — la torréfaction — accédèrent à la connaissance douce.",
    ],
    conseilsDeVie: [
      "Cherche la valeur cachée derrière les apparences difficiles.",
      "Accepte les transformations douloureuses — elles révèlent qui tu es vraiment.",
      "Ta prospérité réelle est le fruit de ton discernement, pas de la chance.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Guinée-Bissau, Sénégal, Côte d'Ivoire, Nigeria",
    couleur: '#D4541A',
    couleurSecondaire: '#A33510',
    enseignementDuJour:
      "Aujourd'hui, explore ce qui te semble difficile d'accès — la valeur que tu cherches y est peut-être cachée.",
    vertus: ['Antioxydant puissant', 'Acides gras sains', 'Zinc et magnésium', 'Anti-inflammatoire', 'Énergie soutenue'],
    usagesTraditionnels: ['Noix torréfiée comestible', 'Pomme de cajou jus et vin', 'Huile de cajou cosmétique', 'Feuilles contre les maux de dents', 'Écorce pour les dermatoses'],
  },

  {
    id: 'flamboyant',
    nom: 'Flamboyant',
    nomAnglais: 'Flamboyant Tree',
    nomScientifique: 'Delonix regia',
    categorie: 'Arbres Sacrés',
    element: 'Feu',
    description:
      "Le Flamboyant est l'explosion de beauté la plus spectaculaire de la végétation d'Afrique de l'Ouest. Quand il fleurit en saison sèche, il transforme les rues grises en rivières de flammes orangées et écarlates. C'est l'arbre de la passion, de l'art et de la beauté qui refuse de se cacher — un acte de bravoure esthétique qui embrasse le ciel.",
    symboliqueAfricaine:
      "Dans les villes d'Afrique de l'Ouest — Dakar, Abidjan, Cotonou — le flamboyant est l'arbre de la fête et du prestige. On le plante devant les palais et les lieux sacrés. Sa floraison coïncide avec les grandes cérémonies. Les artistes et musiciens lui vouent une dévotion particulière — il est la preuve que la beauté est un langage universel qui transcende toutes les frontières.",
    symboliqueSpirirtuelle:
      "Le Flamboyant incarne le courage de la beauté — il fleurit dans la saison la plus sèche, là où tout semble mort, pour rappeler que la vie et la grâce ne capitulent jamais. Il enseigne que l'expression de sa beauté intérieure est un acte de résistance et de foi.",
    symbolique: "Symbole de beauté triomphante, de passion ardente et de résistance par la grâce.",
    qualites: ['Beauté rayonnante', 'Passion créatrice', 'Générosité visuelle', 'Courage d\'expression', 'Joie explosive'],
    defauts: ['Éclat éphémère', 'Brièveté de la floraison', 'Séduction superficielle', 'Demande d\'attention'],
    pouvoirs: ['Inspiration artistique', 'Joie communautaire', 'Transformation du regard', 'Beauté comme médecine'],
    enseignements: [
      "Exprime ta beauté intérieure sans attendre le bon moment",
      "La beauté est un acte de résistance face à la grisaille du monde",
      "Fleuris dans les saisons les plus dures — c'est alors que la lumière est la plus précieuse",
      "Partage ta joie — elle est contagieuse et guérisseuse",
    ],
    citation: "Le flamboyant ne demande pas la permission de fleurir — il offre au monde sa splendeur comme un cadeau.",
    proverbes: [
      "Le flamboyant ne demande pas la permission de fleurir — il offre au monde sa splendeur comme un cadeau.",
      "Même en saison sèche, le flamboyant rappelle que la vie est plus forte que la mort.",
      "La beauté du flamboyant dure peu — mais son souvenir brûle longtemps dans le cœur.",
    ],
    legendes: [
      "La légende yoruba raconte que Sango, dieu du tonnerre, tomba amoureux d'un arbre si beau qu'il y captura une partie de sa foudre. L'arbre brûla mais ne mourut pas — et depuis, ses fleurs sont la couleur du feu sacré qui ne consume pas.",
    ],
    conseilsDeVie: [
      "Exprime ta créativité et ta beauté — c'est ta contribution unique au monde.",
      "Ne cache pas ta lumière intérieure par peur de paraître trop fort.",
      "La joie est une forme de bravoure — partage-la sans retenue.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Toutes les villes et savanes d'Afrique de l'Ouest",
    couleur: '#E84615',
    couleurSecondaire: '#A82E08',
    enseignementDuJour:
      "Aujourd'hui, exprime quelque chose de beau — une parole, un geste, une création. Le flamboyant ne demande pas la permission.",
    vertus: ['Feuilles anti-inflammatoires', 'Anti-paludéen traditionnel', 'Antipyrétique', 'Antifongique'],
    usagesTraditionnels: ['Tisane de feuilles contre le paludisme', 'Décoction d\'écorce pour la fièvre', 'Bois pour le charbon', 'Ombre dans les cours', 'Ornement des lieux sacrés'],
  },

  {
    id: 'acajou',
    nom: 'Acajou d\'Afrique',
    nomAnglais: 'African Mahogany',
    nomScientifique: 'Khaya senegalensis',
    categorie: 'Arbres Sacrés',
    element: 'Terre',
    description:
      "L'Acajou d'Afrique est le roi des bois africains, un arbre majestueux à la stature imposante dont le bois rouge-brun est parmi les plus précieux au monde. Géant de la forêt-galerie et de la savane boisée, il peut dépasser trente mètres de hauteur et vivre plusieurs siècles. Son écorce gris-rouge se détache en grandes plaques, révélant un bois d'une beauté et d'une dureté exceptionnelles.",
    symboliqueAfricaine:
      "Dans les traditions mandingues et bambaras, l'acajou est l'arbre de la royauté et du pouvoir légitime. Les trônes des chefs et les instruments de musique sacrés sont sculptés dans son bois. Son écorce est utilisée dans les rituels de force et de protection des guerriers. Les forgerons — caste sacrée — utilisent son charbon pour les fontes rituelles.",
    symboliqueSpirirtuelle:
      "L'Acajou incarne la noblesse tranquille — une grandeur qui ne cherche pas à s'imposer mais s'impose naturellement par sa seule présence. Son bois, le plus noble, se forme au cœur de l'arbre dans l'obscurité. Il enseigne que la vraie noblesse est intérieure, acquise dans la durée et la profondeur.",
    symbolique: "Symbole de noblesse royale, de pouvoir légitime et de grandeur tranquille.",
    qualites: ['Noblesse naturelle', 'Force intérieure', 'Durée et solidité', 'Majesté tranquille', 'Qualité intrinsèque'],
    defauts: ['Hauteur inaccessible', 'Lenteur de croissance', 'Rigidité du caractère', 'Rareté qui isole'],
    pouvoirs: ['Autorité naturelle', 'Protection royale', 'Force des guerriers', 'Art sacré'],
    enseignements: [
      "La vraie noblesse ne s'annonce pas — elle se révèle naturellement",
      "La qualité profonde se forme dans le temps et l'obscurité",
      "Sois une ressource précieuse pour ta communauté",
      "La solidité est ta meilleure contribution au monde",
    ],
    citation: "L'acajou ne crie pas sa beauté — c'est l'artisan qui la découvre en travaillant son cœur.",
    proverbes: [
      "L'acajou ne crie pas sa beauté — c'est l'artisan qui la découvre en travaillant son cœur.",
      "Le bois de l'acajou se révèle au ciseau — certaines grandeurs ne se voient qu'au travail.",
      "Le chef vrai est comme l'acajou : solide au cœur, même quand l'écorce se détache.",
    ],
    legendes: [
      "La légende mandingue raconte que les premiers forgerons reçurent l'acajou en cadeau du dieu du feu Nyalen. Son bois devint charbon sacré pour les fontes, et ses copeaux furent les premiers encens brûlés dans les forges rituelles.",
    ],
    conseilsDeVie: [
      "Développe ta qualité intérieure — c'est elle qui dure et qui importe.",
      "Ta présence naturelle est ton autorité — tu n'as pas besoin de l'imposer.",
      "Investis dans ce qui est solide et durable plutôt que dans ce qui brille vite.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Savane boisée et forêt-galerie — Sénégal, Mali, Guinée, Côte d'Ivoire",
    couleur: '#7B3A1E',
    couleurSecondaire: '#4A1E0A',
    enseignementDuJour:
      "Aujourd'hui, travaille sur ta qualité profonde — ce que tu construis dans le silence et la durée.",
    vertus: ['Écorce antiparasitaire', 'Antipaludéen', 'Antifongique', 'Anti-inflammatoire', 'Tonique général'],
    usagesTraditionnels: ['Bois d\'oeuvre noble', 'Décoction d\'écorce contre le paludisme', 'Charbon pour la forge', 'Sculpture rituelle', 'Teinture rouge naturelle'],
  },

  {
    id: 'vene',
    nom: 'Vène',
    nomAnglais: 'African Rosewood',
    nomScientifique: 'Pterocarpus erinaceus',
    categorie: 'Arbres Sacrés',
    element: 'Feu',
    description:
      "Le Vène, ou Palissandre d'Afrique, est un arbre majestueux de la savane soudano-sahélienne dont le tronc tortueux et la silhouette tourmentée racontent des siècles de résistance aux saisons sèches. Il déploie une couronne dense d'un vert profond et porte en saison des fleurs orange vif, un spectacle rare et précieux. Son bois rouge-brun aux veines dorées est l'un des plus recherchés d'Afrique.",
    symboliqueAfricaine:
      "Dans les traditions sénégalaises et maliennes, le vène est l'arbre du courage silencieux. Ses branches tortueuses symbolisent le chemin de vie avec ses épreuves et ses détours. Les luthiers sacrés fabriquent les koras et les balafons dans son bois — instruments qui portent la parole des ancêtres. Les guérisseurs récoltent sa sève rouge comme le sang pour les rituels de force.",
    symboliqueSpirirtuelle:
      "Le Vène incarne la beauté née de la souffrance acceptée. Sa forme torturée par les saisons sèches crée un bois aux veinures extraordinaires — chaque épreuve a sculpté en lui une beauté plus profonde. Il enseigne que les cicatrices de la vie sont des ornements de l'âme.",
    symbolique: "Symbole de courage tortueux, de beauté née de l'épreuve et de musique sacrée.",
    qualites: ['Courage silencieux', 'Beauté forgée par l\'épreuve', 'Résilience créatrice', 'Profondeur musicale', 'Noblesse tourmentée'],
    defauts: ['Tortuosité du chemin', 'Difficulté d\'approche', 'Rareté précieuse', 'Vulnérabilité aux coupes'],
    pouvoirs: ['Musique des ancêtres', 'Guérison par la beauté', 'Sève de force', 'Art de la résilience'],
    enseignements: [
      "Tes épreuves ne t'abîment pas — elles te sculptent",
      "La beauté la plus profonde naît des saisons les plus dures",
      "Chaque détour de ta vie dessine ta veinure unique",
      "La musique est le langage des âmes qui ont souffert et survécu",
    ],
    citation: "Le vène est tordu par les saisons — c'est pourquoi son bois chante si bien dans la kora.",
    proverbes: [
      "Le vène est tordu par les saisons — c'est pourquoi son bois chante si bien dans la kora.",
      "L'arbre qui souffre du vent devient le meilleur bois pour la musique.",
      "Les veinures du vène sont les cicatrices de ses siècles — elles sont sa beauté.",
    ],
    legendes: [
      "Les griots mandingues disent que la première kora fut taillée dans un vène frappé par la foudre. Le choc avait ouvert le bois au plus profond — et dans cette blessure, la musique trouva sa demeure. Depuis, le vène est l'arbre qui transforme la douleur en musique.",
    ],
    conseilsDeVie: [
      "Tes expériences difficiles t'ont sculpté — reconnais-les comme des richesses.",
      "Exprime-toi artistiquement — la créativité transforme la souffrance en beauté.",
      "Ton chemin tortueux est unique et précieux — ne le compare pas aux chemins droits.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Savane soudano-sahélienne — Sénégal, Guinée, Mali, Burkina Faso",
    couleur: '#A0522D',
    couleurSecondaire: '#6B2E10',
    enseignementDuJour:
      "Aujourd'hui, regarde tes épreuves passées comme le sculpteur qui voit la beauté dans le bois tordu.",
    vertus: ['Sève astringente cicatrisante', 'Anti-diarrhéique', 'Antidiabétique traditionnel', 'Antipaludéen', 'Régulateur du transit'],
    usagesTraditionnels: ['Bois d\'oeuvre et lutherie sacrée', 'Feuilles pour le bétail', 'Décoction contre le diabète', 'Sève pour les plaies', 'Racines contre la toux'],
  },

  {
    id: 'dimb',
    nom: 'Dimb',
    nomAnglais: 'Senegal Plum',
    nomScientifique: 'Cordyla pinnata',
    categorie: 'Arbres Sacrés',
    element: 'Eau',
    description:
      "Le Dimb est l'arbre sacré des Sérères, peuple côtier du Sénégal, gardien des cimetières et des lieux de mémoire ancestrale. Majestueux et longevif, il s'étend en une couronne massive qui couvre des espaces immenses. Ses fruits jaunes, appelés pommes de Cayor, nourrissent les familles et les animaux. C'est l'arbre de la réconciliation — sous son ombre se règlent les conflits graves.",
    symboliqueAfricaine:
      "Dans la cosmologie sérère, le Dimb est le lieu de résidence des pangols — les ancêtres divinisés. Planter un Dimb, c'est inviter un ancêtre à veiller sur la maison. Son ombre est sacrée : on y dépose les offrandes, on y prononce les serments de paix. Les villages sérères sont reconnaissables à leurs grands Dimb qui émergent au-dessus des toits.",
    symboliqueSpirirtuelle:
      "Le Dimb symbolise la mémoire vivante — il maintient le lien entre le monde des vivants et celui des ancêtres. Sa longévité extrême en fait un témoin silencieux de l'histoire. Il enseigne que honorer les morts est nourrir les vivants, que la mémoire collective est une source de force.",
    symbolique: "Symbole de mémoire ancestrale, de réconciliation et de lien entre les mondes.",
    qualites: ['Mémoire profonde', 'Réconciliation sage', 'Lien ancestral fort', 'Ombre médiatrice', 'Longévité gardienne'],
    defauts: ['Attachement aux morts', 'Immobilité mémorielle', 'Poids du passé', 'Sacralité inaccessible'],
    pouvoirs: ['Communication avec les ancêtres', 'Médiation des conflits', 'Protection spirituelle', 'Gardiennage de la mémoire'],
    enseignements: [
      "Honore tes ancêtres — ils continuent de te guider",
      "L'ombre de la réconciliation est plus fraîche que celle de la vengeance",
      "La mémoire collective est ta richesse la plus profonde",
      "Résoudre les conflits sous un arbre sacré, c'est convoquer la sagesse",
    ],
    citation: "Le Dimb se souvient de tous ceux qui ont dormi sous son ombre — ils vivent encore en lui.",
    proverbes: [
      "Le Dimb se souvient de tous ceux qui ont dormi sous son ombre — ils vivent encore en lui.",
      "Sous le Dimb, les ennemis deviennent frères — l'arbre sacré ne supporte pas la haine.",
      "Plante un Dimb aujourd'hui — tes arrière-petits-enfants s'y réconcilieront.",
    ],
    legendes: [
      "La légende sérère raconte que le premier Dimb naquit de la larme d'un ancêtre pleurant la discorde de ses enfants. En tombant dans la terre, la larme devint un arbre dont l'ombre était si apaisante que les enfants en querelle s'endormirent et se réveillèrent réconciliés.",
    ],
    conseilsDeVie: [
      "Recherche la réconciliation — les querelles non résolues empoisonnent les générations.",
      "Connecte-toi à ta lignée — tes ancêtres sont une source de sagesse.",
      "Offre l'ombre de ta sagesse aux conflits autour de toi.",
    ],
    niveauSpirituel: 5,
    regionOrigine: "Sénégal et Gambie — pays sérère et mandingue",
    couleur: '#2E6B4F',
    couleurSecondaire: '#164030',
    enseignementDuJour:
      "Aujourd'hui, pense à un conflit non résolu dans ta vie. Sous quel arbre accepterais-tu de parler ?",
    vertus: ['Fruit comestible nutritif', 'Écorce tonique', 'Anti-inflammatoire', 'Antipaludéen'],
    usagesTraditionnels: ['Fruit pomme de Cayor comestible', 'Ombre pour les cérémonies', 'Offrandes rituelles', 'Bois de construction', 'Lieu de palabres'],
  },

  /* ═══════════════════════════════════════════════════════════
     NOUVELLES PLANTES MÉDICINALES
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'aloe-vera',
    nom: 'Aloès d\'Afrique',
    nomAnglais: 'African Aloe',
    nomScientifique: 'Aloe barbadensis / Aloe vera',
    categorie: 'Plantes Médicinales',
    element: 'Eau',
    description:
      "L'Aloès d'Afrique est la plante guérisseuse par excellence, une succulente aux feuilles épaisses gorgées d'un gel translucide aux propriétés médicinales extraordinaires. Résistante à la sécheresse extrême, elle stocke l'eau de vie dans ses feuilles comme le guérisseur stocke la sagesse en lui — pour la partager au moment du besoin. C'est la pharmacie du désert, toujours disponible, toujours généreuse.",
    symboliqueAfricaine:
      "Dans les traditions de tout le Sahel, l'aloès est la plante de la guérisseuse — les femmes sages, les matrones, les rebouteuses l'utilisent depuis des millénaires. On en frotte les nouveau-nés pour les protéger des mauvais esprits. On en enduit les murs des maisons pour éloigner les serpents. Son gel est le premier remède appliqué sur toute blessure.",
    symboliqueSpirirtuelle:
      "L'Aloès incarne l'autonomie guérisseuse — il porte en lui toute la médecine dont il a besoin, même dans les déserts les plus arides. Il enseigne l'autosuffisance spirituelle : en toi se trouvent toutes les ressources pour ta guérison. Son amertume extérieure protège la douceur guérisseuse intérieure.",
    symbolique: "Symbole d'autonomie guérisseuse, de résilience aquatique et de protection maternelle.",
    qualites: ['Guérison naturelle', 'Résilience aquatique', 'Générosité médicinale', 'Protection instinctive', 'Douceur sous l\'amertume'],
    defauts: ['Amertume défensive', 'Épines protectrices', 'Sécheresse apparente', 'Fermeture aux pluies excessives'],
    pouvoirs: ['Guérison des blessures', 'Protection des nouveau-nés', 'Médecine du désert', 'Purification des espaces'],
    enseignements: [
      "Tu portes en toi les ressources de ta propre guérison",
      "L'amertume de surface protège la douceur profonde",
      "Stocke la sagesse pour les temps de sécheresse",
      "La guérison des autres commence par la guérison de soi",
    ],
    citation: "L'aloès ne réclame pas la pluie — il porte son eau en lui pour les temps de sécheresse.",
    proverbes: [
      "L'aloès ne réclame pas la pluie — il porte son eau en lui pour les temps de sécheresse.",
      "La guérisseuse ressemble à l'aloès : amère en apparence, mais douce pour celui qui souffre.",
      "Couper l'aloès sans intention de guérir, c'est gaspiller la grâce.",
    ],
    legendes: [
      "Les anciens du Sahel racontent que la déesse de la guérison Mawu-Lisa offrit l'aloès aux femmes pour compenser leur vulnérabilité. Elle mit dans ses feuilles tout ce dont une mère a besoin pour soigner : la douceur pour les blessures, l'amertume pour les infections, la force pour les moments de désespoir.",
    ],
    conseilsDeVie: [
      "Fais confiance à ta capacité naturelle de guérison — le corps et l'âme savent se réparer.",
      "Protège ta douceur intérieure avec des limites claires.",
      "Sois une ressource pour les autres sans te vider — l'aloès ne se coupe pas jusqu'à la racine.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Sahel et zones arides — du Sénégal au Sahara",
    couleur: '#5BAF7A',
    couleurSecondaire: '#2A7A4A',
    enseignementDuJour:
      "Aujourd'hui, fais confiance à ta guérison naturelle. Qu'est-ce qui en toi sait déjà comment se réparer ?",
    vertus: ['Cicatrisant cutané puissant', 'Anti-inflammatoire', 'Hydratant intense', 'Laxatif doux', 'Antifongique', 'Immunostimulant'],
    usagesTraditionnels: ['Gel sur les brûlures et plaies', 'Frottement des nouveau-nés', 'Jus laxatif', 'Hydratation cutanée', 'Traitement des dermatoses', 'Protection contre les serpents'],
  },

  {
    id: 'guiera',
    nom: 'Guiera',
    nomAnglais: 'Guiera',
    nomScientifique: 'Guiera senegalensis',
    categorie: 'Plantes Médicinales',
    element: 'Air',
    description:
      "Le Guiera est l'arbuste médicinal le plus répandu du Sahel — un buisson gris-vert, discret et tenace, qui couvre les terres dégradées et les bords de piste du Sénégal au Niger. Méprisé par les agriculteurs car jugé comme un envahisseur, il est pourtant l'une des plantes médicinales les plus précieuses de toute la pharmacopée sahélienne. Sa modestie est sa sagesse.",
    symboliqueAfricaine:
      "Dans les traditions peules et wolof, le guiera est la plante du guérisseur humble — celui qui soigne sans se montrer. On l'appelle ngélénu en wolof, signifiant 'qui pardonne'. Ses feuilles furent les premières à être brûlées comme encens dans les cases pour purifier l'air. Les femmes enceintes se baignent dans sa décoction pour protéger leur grossesse. Ses racines sont portées en amulette pour la protection quotidienne.",
    symboliqueSpirirtuelle:
      "Le Guiera enseigne l'humilité du serviteur — il est partout, il guérit silencieusement, il ne revendique rien. C'est la plante de ceux qui font le bien sans le proclamer. Sa résistance aux terres les plus ingrates symbolise la capacité à trouver une mission même dans les environnements les plus difficiles.",
    symbolique: "Symbole d'humilité guérisseuse, de service silencieux et de résistance du quotidien.",
    qualites: ['Humilité du service', 'Guérison discrète', 'Résistance quotidienne', 'Modestie précieuse', 'Disponibilité constante'],
    defauts: ['Invisibilité méconnue', 'Sous-estimation fréquente', 'Discrétion mal interprétée', 'Valeur ignorée des ignorants'],
    pouvoirs: ['Purification de l\'air', 'Protection de la grossesse', 'Guérison respiratoire', 'Service communautaire'],
    enseignements: [
      "Les plus grands services sont souvent rendus dans le silence",
      "Ta valeur ne dépend pas de la reconnaissance des autres",
      "Sois disponible et utile là où tu es — sans chercher un meilleur endroit",
      "L'humilité n'est pas la faiblesse — c'est la sagesse qui se tait",
    ],
    citation: "Le guiera ne se plaint pas des terres ingrates — il les guérit en les habitant.",
    proverbes: [
      "Le guiera ne se plaint pas des terres ingrates — il les guérit en les habitant.",
      "La plante qui pousse partout est rarement appréciée — jusqu'au jour où elle manque.",
      "Le guérisseur humble ressemble au guiera : on ne le voit qu'au moment où on a besoin de lui.",
    ],
    legendes: [
      "Les anciens Peuls racontent que le guiera fut créé par les génies du vent pour guérir les maladies de l'air — la toux, le rhume, la fièvre. Les génies lui apprirent à se rendre invisible pour que les hommes apprennent eux-mêmes à voir la valeur des choses modestes.",
    ],
    conseilsDeVie: [
      "Rends service humblement — ta valeur ne dépend pas des applaudissements.",
      "Sois utile là où tu es, même si l'endroit te semble ingrat.",
      "Les personnes discrètes sont souvent les plus indispensables — remarque-les.",
    ],
    niveauSpirituel: 2,
    regionOrigine: "Sahel — Sénégal, Mali, Niger, Burkina Faso, Nigeria",
    couleur: '#8FAF6A',
    couleurSecondaire: '#5A7A3A',
    enseignementDuJour:
      "Aujourd'hui, rends un service discret et significatif sans attendre de reconnaissance.",
    vertus: ['Antipaludéen reconnu', 'Expectorant puissant', 'Antitussif', 'Antiparasitaire', 'Antimicrobien'],
    usagesTraditionnels: ['Tisane feuilles contre le paludisme', 'Fumigation pour purifier l\'air', 'Bain de grossesse protecteur', 'Amulette de protection', 'Décoction contre la toux'],
  },

  {
    id: 'piment',
    nom: 'Piment Africain',
    nomAnglais: 'African Chili',
    nomScientifique: 'Capsicum frutescens',
    categorie: 'Plantes Médicinales',
    element: 'Feu',
    description:
      "Le Piment Africain est la flamme de la vie dans chaque cuisine et chaque remède d'Afrique de l'Ouest. Petit mais d'une puissance extraordinaire, ses fruits rouge vif brûlent la langue et enflamment l'énergie. C'est la plante du courage, de la vie qui s'intensifie, du feu intérieur qui chasse le froid de l'âme et les maladies du corps. Il n'est pas dans sa nature d'être timide.",
    symboliqueAfricaine:
      "Dans toutes les traditions d'Afrique de l'Ouest, le piment est à la fois aliment, médecine et protection spirituelle. On en frotte les seuils pour repousser les esprits malveillants. Les guerriers en consomment avant les batailles pour activer leur feu intérieur. Les femmes l'utilisent dans les envoûtements d'amour et dans les charmes de protection. Il est présent dans toutes les cuisines et dans tous les rituels de purification.",
    symboliqueSpirirtuelle:
      "Le Piment incarne le feu purificateur — il chasse ce qui est froid, mort ou maléfique. Sa brûlure n'est pas une punition mais une activation — il réveille les corps endormis, stimule la circulation, active la vie. Il enseigne que certaines vérités brûlent comme le piment, mais qu'elles guérissent.",
    symbolique: "Symbole de feu purificateur, de courage ardent et de vitalité explosive.",
    qualites: ['Courage ardent', 'Feu purificateur', 'Vitalité explosive', 'Protection active', 'Vérité brûlante'],
    defauts: ['Excès de chaleur', 'Brûlure sans discernement', 'Irritabilité possible', 'Intensité difficile à maîtriser'],
    pouvoirs: ['Purification spirituelle', 'Activation de l\'énergie', 'Protection des seuils', 'Courage des guerriers'],
    enseignements: [
      "Certaines vérités brûlent comme le piment — mais elles guérissent",
      "Cultive ton feu intérieur pour ne pas laisser le froid envahir ton âme",
      "La protection exige parfois une présence intense et affirmée",
      "La vie s'intensifie quand on lui ajoute du feu",
    ],
    citation: "Le piment ne s'excuse pas de brûler — c'est sa mission sacrée.",
    proverbes: [
      "Le piment ne s'excuse pas de brûler — c'est sa mission sacrée.",
      "Une vérité sans piment est fade comme un bouillon sans sel.",
      "Celui qui ne connaît pas le piment ne connaît pas la vie.",
    ],
    legendes: [
      "La légende fon du Bénin raconte que Lêgba, dieu des carrefours, créa le piment pour marquer la frontière entre les mondes. Là où le piment pousse, les esprits malveillants hésitent — car même eux ne supportent pas sa brûlure.",
    ],
    conseilsDeVie: [
      "Dis tes vérités — même si elles brûlent, elles guérissent plus qu'elles ne blessent.",
      "Cultive ton feu intérieur — l'enthousiasme est une forme de santé.",
      "Protège ton espace avec une présence affirmée, pas agressive.",
    ],
    niveauSpirituel: 2,
    regionOrigine: "Toute l'Afrique de l'Ouest — dans chaque cuisine et jardin",
    couleur: '#E02020',
    couleurSecondaire: '#A01010',
    enseignementDuJour:
      "Aujourd'hui, active ton feu intérieur. Qu'est-ce qui te rend passionné et vivant ?",
    vertus: ['Analgésique topique', 'Anti-inflammatoire capsaïcine', 'Stimulant circulatoire', 'Antimicrobien', 'Digestif', 'Décongestionnant'],
    usagesTraditionnels: ['Cuisine quotidienne', 'Frottement des seuils protecteur', 'Décoction contre les rhumatismes', 'Inhalation décongestionnante', 'Charme de protection'],
  },

  {
    id: 'poivre-de-guinee',
    nom: 'Poivre de Guinée',
    nomAnglais: 'Guinea Pepper',
    nomScientifique: 'Piper guineense',
    categorie: 'Plantes Médicinales',
    element: 'Feu',
    description:
      "Le Poivre de Guinée est l'épice secrète des saveurs d'Afrique de l'Ouest — une liane forestière dont les petites baies noires concentrent un arôme extraordinaire, plus complexe et plus poivré que le poivre noir ordinaire. Utilisé depuis des millénaires dans les cuisines et les pharmacopées traditionnelles, c'est l'épice des initiés, celle qui distingue un plat ordinaire d'un festin royal.",
    symboliqueAfricaine:
      "Dans les traditions yoruba et igbo du Nigeria, le poivre de Guinée est l'épice de la réconciliation et des serments. On en offre lors des cérémonies de fiançailles et des pactes de paix — sa saveur intense symbolise la profondeur de l'engagement. Les prêtres d'Ifa l'utilisent dans leurs rituels de divination et de protection. Son parfum est dit attirer les esprits bienveillants.",
    symboliqueSpirirtuelle:
      "Le Poivre de Guinée incarne la profondeur des engagements — une petite chose qui concentre une puissance extraordinaire. Il enseigne que la vraie force n'est pas dans la taille mais dans l'intensité. Sa complexité aromatique symbolise la richesse de ceux qui ont plusieurs dimensions cachées.",
    symbolique: "Symbole d'engagements profonds, de puissance concentrée et de saveur des initiés.",
    qualites: ['Profondeur d\'engagement', 'Puissance concentrée', 'Complexité cachée', 'Intensité sacrée', 'Fidélité des serments'],
    defauts: ['Intensité excessive', 'Inaccessibilité des initiés', 'Rareté qui exclut', 'Brûlure des non-initiés'],
    pouvoirs: ['Serments et pactes', 'Attraction des esprits bienveillants', 'Initiation sacrée', 'Profondeur des rituels'],
    enseignements: [
      "La vraie puissance n'est pas dans la taille mais dans l'intensité",
      "Tes engagements profonds sont ta valeur la plus précieuse",
      "La complexité n'est pas un défaut — c'est une richesse à révéler",
      "Certaines saveurs ne se comprennent qu'à l'initiation",
    ],
    citation: "Le poivre de Guinée révèle sa puissance à qui sait l'utiliser — les autres ne le remarquent même pas.",
    proverbes: [
      "Le poivre de Guinée révèle sa puissance à qui sait l'utiliser — les autres ne le remarquent même pas.",
      "Petite baie, grand serment — ce qui lie est souvent minuscule.",
      "Celui qui connaît le poivre de Guinée sait que les meilleures choses se cachent.",
    ],
    legendes: [
      "La légende yoruba raconte qu'Ogun, dieu du fer, planta le premier poivre de Guinée pour marquer les contrats des forgerons. Son intensité symbolise la dureté du fer — et comme le fer, le serment fait avec cette épice ne se brise pas.",
    ],
    conseilsDeVie: [
      "Honore tes engagements avec la même intensité que le poivre de Guinée — profondément.",
      "Révèle ta complexité à ceux qui méritent de te connaître vraiment.",
      "Ne t'engage que dans ce que tu peux tenir — mais alors, tiens-le absolument.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Forêts humides — Côte d'Ivoire, Nigeria, Cameroun, Ghana",
    couleur: '#4A2010',
    couleurSecondaire: '#2A1008',
    enseignementDuJour:
      "Aujourd'hui, réfléchis à un engagement que tu peux approfondir. La qualité vaut plus que la quantité.",
    vertus: ['Aphrodisiaque traditionnel', 'Anti-inflammatoire', 'Stimulant digestif', 'Antimicrobien', 'Analgésique'],
    usagesTraditionnels: ['Cuisine comme épice', 'Tisane aphrodisiaque', 'Décoction contre l\'infertilité', 'Rituel de pacte', 'Protection des maisons'],
  },

  {
    id: 'grains-de-selim',
    nom: 'Grains de Sélim',
    nomAnglais: 'Grains of Selim',
    nomScientifique: 'Xylopia aethiopica',
    categorie: 'Plantes Médicinales',
    element: 'Air',
    description:
      "Les Grains de Sélim sont l'épice royale des cuisines et des rituels d'Afrique de l'Ouest — de petites gousses ligneuses aux arômes complexes et envoûtants, mêlant poivre, eucalyptus et notes résineuses. Appelés 'poivre d'Éthiopie' ou 'kani' en mandingue, ils sont présents dans les bouillons les plus sophistiqués et les préparations médicinales les plus sacrées.",
    symboliqueAfricaine:
      "Dans les traditions mandingues, les grains de Sélim sont l'épice des ancêtres — on en jette quelques grains dans les feux des cérémonies funéraires pour parfumer le chemin de l'âme vers l'au-delà. Les marabouts les utilisent dans la préparation des talismans. Les sages-femmes les brûlent dans les cases des nouvelles mères pour purifier l'espace de naissance.",
    symboliqueSpirirtuelle:
      "Les Grains de Sélim symbolisent la connexion entre les mondes — leur fumée aromatique sert de véhicule entre le monde visible et invisible. Ils enseignent que certaines transitions nécessitent une préparation sensorielle, que parfumer le chemin est une forme de respect pour le voyage.",
    symbolique: "Symbole de passage entre les mondes, de purification par le parfum et de connexion ancestrale.",
    qualites: ['Connexion inter-mondes', 'Purification aromatique', 'Raffinement sensoriel', 'Sagesse ancestrale', 'Transition aidée'],
    defauts: ['Hermétisme initiatique', 'Complexité inaccessible', 'Rareté élitiste', 'Mystère difficile'],
    pouvoirs: ['Communication avec les morts', 'Purification des naissances', 'Protection talismanique', 'Parfum sacré'],
    enseignements: [
      "Les transitions importantes méritent une préparation consciente",
      "Le parfum est une forme de prière — il porte l'intention dans les espaces invisibles",
      "Honore les passages — naissance, mort, initiation — avec des rituels appropriés",
      "Certaines connexions ne s'établissent que dans le raffinement",
    ],
    citation: "Les grains de Sélim parfument le chemin des âmes — pour que les ancêtres les reconnaissent de loin.",
    proverbes: [
      "Les grains de Sélim parfument le chemin des âmes — pour que les ancêtres les reconnaissent de loin.",
      "Brûle le Sélim dans la case de la naissance — ainsi l'âme sait qu'elle est attendue.",
      "L'épice rare est pour les moments rares — ne la gaspille pas en des jours ordinaires.",
    ],
    legendes: [
      "Les anciens mandingues racontent que les grains de Sélim furent offerts par les génies de l'entre-deux — ni vivants ni morts, les êtres qui habitent les frontières. Ils les donnèrent aux humains pour faciliter les passages difficiles, pour adoucir les séparations.",
    ],
    conseilsDeVie: [
      "Prépare consciemment tes grandes transitions — elles méritent de l'attention et du soin.",
      "Crée des rituels personnels pour marquer les passages importants de ta vie.",
      "Honore la mémoire de tes morts — leur connexion te nourrit.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Forêts d'Afrique de l'Ouest — Sénégal, Guinée, Mali, Côte d'Ivoire",
    couleur: '#6B4A1A',
    couleurSecondaire: '#3A2808',
    enseignementDuJour:
      "Aujourd'hui, crée un moment de transition consciente dans ta journée — un rituel simple pour marquer un passage.",
    vertus: ['Bronchodilatateur', 'Antitussif', 'Galactogène', 'Antidouleur', 'Carminatif', 'Antimicrobien'],
    usagesTraditionnels: ['Épice dans les bouillons et ragoûts', 'Fumigation de purification', 'Préparation des talismans', 'Tisane contre la toux', 'Rituel de naissance'],
  },

  {
    id: 'vernonia',
    nom: 'Vernonia',
    nomAnglais: 'Bitter Leaf',
    nomScientifique: 'Vernonia amygdalina',
    categorie: 'Plantes Médicinales',
    element: 'Terre',
    description:
      "La Vernonia, connue comme 'feuilles amères' en français ou 'ewuro' en yoruba, est l'une des plantes médicinales les plus respectées d'Afrique subsaharienne. Ses feuilles d'un vert profond ont un goût amer intense qui choque au premier contact mais révèle la sagesse ancienne : l'amertume guérit ce que la douceur ne peut atteindre. C'est la médecine des maladies profondes.",
    symboliqueAfricaine:
      "Dans les traditions igbo et yoruba du Nigeria, la vernonia est associée à la vérité difficile — on dit que ses feuilles amères sont l'antidote à toutes les illusions douces mais néfastes. Les anciens l'utilisaient pour purifier le sang des guerriers avant les batailles. Les femmes l'ingèrent après l'accouchement pour nettoyer le sang et stimuler la lactation. C'est la plante de la purification profonde.",
    symboliqueSpirirtuelle:
      "La Vernonia enseigne l'acceptation de l'amertume nécessaire — certaines guérisons passent par des vérités et des remèdes amers que l'ego refuse d'abord. Elle symbolise le courage de prendre la médecine difficile pour guérir vraiment plutôt que de préférer le placebo doux.",
    symbolique: "Symbole d'amertume salvatrice, de purification profonde et de vérités courageuses.",
    qualites: ['Courage de la vérité amère', 'Purification profonde', 'Guérison radicale', 'Discernement des illusions', 'Honnêteté médicinale'],
    defauts: ['Amertume rebutante', 'Directness difficile', 'Purification exigeante', 'Rejet des faux-semblants'],
    pouvoirs: ['Purification sanguine', 'Guérison des maladies profondes', 'Dissolution des illusions', 'Force après l\'accouchement'],
    enseignements: [
      "Certaines guérisons nécessitent d'avaler des vérités amères",
      "Préfère la médecine difficile qui guérit à l'illusion douce qui tue lentement",
      "La purification vraie n'est jamais entièrement agréable",
      "Le courage de l'honnêteté est la plus grande des médecines",
    ],
    citation: "La vernonia est amère comme la vérité — et comme la vérité, elle guérit ce que le mensonge entretient.",
    proverbes: [
      "La vernonia est amère comme la vérité — et comme la vérité, elle guérit ce que le mensonge entretient.",
      "Celui qui refuse les feuilles amères refusera aussi la guérison.",
      "L'amertume d'aujourd'hui est la santé de demain.",
    ],
    legendes: [
      "La légende igbo raconte qu'un roi souffrant d'une maladie mystérieuse refusait toute médecine amère. Ses guérisseurs lui proposaient des remèdes de plus en plus doux — il empirait. Finalement, un enfant lui offrit des feuilles de vernonia sans lui dire leur goût. Le roi les prit, fit une grimace — et guérit. Il apprit que la bonne médecine n'a pas à plaire.",
    ],
    conseilsDeVie: [
      "Accepte les vérités difficiles — elles sont la médecine que ton âme attend.",
      "Ne fuis pas l'amertume des purifications nécessaires.",
      "Sois honnête même quand la vérité est amère — c'est un cadeau.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Zones humides — Nigeria, Ghana, Côte d'Ivoire, Cameroun",
    couleur: '#2A5C1A',
    couleurSecondaire: '#143A08',
    enseignementDuJour:
      "Aujourd'hui, quelle vérité amère as-tu besoin d'accepter pour avancer vers ta guérison ?",
    vertus: ['Antidiabétique puissant', 'Antipaludéen', 'Anticancéreux étudié', 'Antihypertenseur', 'Galactogène', 'Antipyrétique'],
    usagesTraditionnels: ['Soupe aux feuilles amères', 'Décoction antidiabétique', 'Purification post-partum', 'Traitement du paludisme', 'Tonique sanguin'],
  },

  {
    id: 'corossolier',
    nom: 'Corossolier',
    nomAnglais: 'Soursop',
    nomScientifique: 'Annona muricata',
    categorie: 'Plantes Médicinales',
    element: 'Eau',
    description:
      "Le Corossolier est l'arbre aux fruits paradoxaux — sa peau verte et épineuse cache une chair blanche crémeuse d'une douceur tropicale incomparable, à la saveur d'ananas et de fraise mêlés. Mais au-delà de sa délicieuse pulpe, cet arbre est devenu l'un des plus étudiés par la phytothérapie moderne pour ses propriétés anticancéreuses potentielles, connues depuis des siècles par les guérisseurs africains.",
    symboliqueAfricaine:
      "Dans les traditions côtières d'Afrique de l'Ouest, le corossolier est l'arbre de la guérison miraculeuse. Ses feuilles sont utilisées dans les tisanes des maladies graves, quand les autres remèdes ont échoué. On l'appelle parfois 'arbre de la dernière chance' — non pas parce qu'il soigne en désespoir de cause, mais parce que sa puissance est réservée aux cas extrêmes.",
    symboliqueSpirirtuelle:
      "Le Corossolier symbolise la guérison profonde qui nécessite le paradoxe — ce qui est doux à l'intérieur peut guérir les maladies les plus dures. Sa chair crémeuse représente la douceur de l'espoir qui persiste même face à la maladie. Il enseigne que les guérisons les plus profondes viennent souvent d'où on les attend le moins.",
    symbolique: "Symbole de guérison paradoxale, d'espoir persistant et de douceur cachée sous les épines.",
    qualites: ['Guérison inattendue', 'Espoir persistant', 'Douceur cachée', 'Puissance médicinale profonde', 'Don de la dernière chance'],
    defauts: ['Épines protectrices intimidantes', 'Espoir parfois déçu', 'Dépendance au miracle', 'Attentes excessives'],
    pouvoirs: ['Guérison des maladies graves', 'Espoir en dernier recours', 'Purification profonde', 'Douceur de l\'âme'],
    enseignements: [
      "Les guérisons les plus profondes viennent souvent d'où on les attendait le moins",
      "Derrière les épines de la difficulté se cache souvent une douceur inconnue",
      "Ne désespère jamais — la dernière chance est parfois la plus puissante",
      "La guérison exige la foi autant que la médecine",
    ],
    citation: "Le corossolier est épineux dehors et crémeux dedans — comme toute vraie guérison.",
    proverbes: [
      "Le corossolier est épineux dehors et crémeux dedans — comme toute vraie guérison.",
      "N'abandonne pas l'arbre aux fruits impossibles — c'est parfois lui qui guérit l'impossible.",
      "La médecine la plus puissante est souvent aussi la plus douce.",
    ],
    legendes: [
      "Les guérisseurs ivoiriens racontent qu'une femme dont l'enfant était condamné cueillit des feuilles de corossolier guidée par un rêve. Elle prépara une tisane qu'elle donna à son enfant sept nuits de suite. Au matin du huitième jour, l'enfant se leva guéri. L'arbre lui avait été envoyé par ses ancêtres guérisseurs.",
    ],
    conseilsDeVie: [
      "Ne renonce pas aux possibilités de guérison — explore toutes les pistes.",
      "Cherche la douceur derrière les apparences difficiles.",
      "Garde l'espoir vivant — c'est lui-même une forme de médecine.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Zones côtières et humides — Côte d'Ivoire, Ghana, Nigeria, Bénin",
    couleur: '#3A7A2A',
    couleurSecondaire: '#1A4A10',
    enseignementDuJour:
      "Aujourd'hui, explore un remède inattendu — une solution douce à un problème épineux.",
    vertus: ['Anticancéreux étudié (acétogénines)', 'Antiparasitaire', 'Sédatif doux', 'Antidiabétique', 'Antibactérien', 'Hypotenseur'],
    usagesTraditionnels: ['Fruit comestible', 'Tisane de feuilles anticancéreuse', 'Traitement de l\'insomnie', 'Décoction antiparasitaire', 'Remède des maladies graves'],
  },

  {
    id: 'maniguette',
    nom: 'Maniguette',
    nomAnglais: 'Grains of Paradise',
    nomScientifique: 'Aframomum melegueta',
    categorie: 'Plantes Médicinales',
    element: 'Feu',
    description:
      "La Maniguette, ou 'Graines du Paradis', est l'épice mythique d'Afrique de l'Ouest qui fit pendant des siècles la fortune des routes commerciales. Ses graines rouge-brun, à la saveur ardente mêlant poivre, cardamome et gingembre, étaient si précieuses qu'elles donnèrent leur nom à la 'Côte des Graines' — l'actuelle côte de la Sierra Leone au Liberia. C'est l'épice royale par excellence.",
    symboliqueAfricaine:
      "Dans les traditions akan et mandingues, la maniguette est l'épice de la royauté et de la prospérité. On l'offre aux chefs lors des intronisations. Les fêtes royales ne se tiennent pas sans ses graines parfumées. Les femmes l'utilisent pour attirer la prospérité et l'amour — ses graines sont portées en amulettes. C'est la plante qui transforme le commun en royal.",
    symboliqueSpirirtuelle:
      "La Maniguette incarne la transformation alchimique — elle prend quelque chose d'ordinaire (un repas, une cérémonie) et le transforme en quelque chose de royal par sa seule présence. Elle enseigne que la présence de l'excellence élève tout ce qui l'entoure.",
    symbolique: "Symbole de royauté accessible, de transformation alchimique et de prospérité méritée.",
    qualites: ['Excellence transformatrice', 'Présence royale', 'Prospérité attirée', 'Alchimie du quotidien', 'Valeur rare reconnue'],
    defauts: ['Rareté qui exclut', 'Préciosité parfois excessive', 'Attentes de grandeur', 'Difficulté du quotidien'],
    pouvoirs: ['Transformation du banal en royal', 'Attraction de la prospérité', 'Intronisation du pouvoir', 'Alchimie amoureuse'],
    enseignements: [
      "L'excellence de ta présence élève tout ce qui t'entoure",
      "La vraie royauté se manifeste dans l'attention portée aux détails",
      "La prospérité s'attire par la qualité de ta présence",
      "Transforme le quotidien en royal par ton raffinement",
    ],
    citation: "La maniguette transforme le repas commun en festin royal — c'est le pouvoir de la qualité sur la quantité.",
    proverbes: [
      "La maniguette transforme le repas commun en festin royal — c'est le pouvoir de la qualité sur la quantité.",
      "Les Graines du Paradis ne se trouvent pas n'importe où — elles choisissent leurs hôtes.",
      "Celui qui connaît la maniguette comprend que le paradis commence dans la bouche.",
    ],
    legendes: [
      "Les marchands arabes médiévaux racontaient que les grains de paradis tombaient directement du ciel sur les côtes d'Afrique — c'est pourquoi elles portaient ce nom. Les rois d'Afrique de l'Ouest savaient que ce mythe commercial leur permettait de vendre leur épice à prix d'or, et ils s'en amusaient.",
    ],
    conseilsDeVie: [
      "Apporte l'excellence dans chaque chose que tu fais, même les plus petites.",
      "Ta qualité de présence transforme les situations ordinaires.",
      "Cultive le raffinement — non par snobisme, mais par respect de la beauté.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Côte des Graines — Sierra Leone, Liberia, Côte d'Ivoire, Ghana",
    couleur: '#C4501A',
    couleurSecondaire: '#8A2E08',
    enseignementDuJour:
      "Aujourd'hui, transforme une situation ordinaire en quelque chose d'exceptionnel par ta présence et ton attention.",
    vertus: ['Stimulant métabolique', 'Anti-inflammatoire', 'Aphrodisiaque traditionnel', 'Digestif', 'Antimicrobien', 'Perte de poids soutenue'],
    usagesTraditionnels: ['Épice royale dans les plats', 'Amulette de prospérité', 'Boisson cérémonielle', 'Tisane métabolique', 'Rituel d\'intronisation'],
  },

  {
    id: 'securidaca',
    nom: 'Arbre Violet',
    nomAnglais: 'Violet Tree',
    nomScientifique: 'Securidaca longipedunculata',
    categorie: 'Plantes Rituelles',
    element: 'Air',
    description:
      "L'Arbre Violet ou Securidaca est l'une des plantes rituelles les plus puissantes et les plus respectées d'Afrique de l'Ouest. Petit arbre des savanes ouvertes, il se distingue par ses magnifiques fleurs violettes qui embaument l'air au moment de la floraison. Son parfum intense rappelant la violette lui a valu une place centrale dans les rituels de purification et de protection.",
    symboliqueAfricaine:
      "Dans les traditions bambaras, sonhraï et dogon, le Securidaca est l'arbre de la frontière — il marque les limites entre le monde des vivants et celui des esprits. Ses racines, à l'odeur caractéristique de salicylate de méthyle (similaire à la Wintergreen), sont utilisées par les devins et les guérisseurs pour créer des espaces protégés lors des rituels. C'est la plante qui purifie les espaces avant les cérémonies sacrées.",
    symboliqueSpirirtuelle:
      "Le Securidaca symbolise la frontière sacrée — la ligne entre deux mondes, deux états, deux temps. Il enseigne que certains espaces doivent être clairement délimités et protégés pour que la vie spirituelle soit possible. Son parfum est le signal que la cérémonie commence et que le monde ordinaire s'efface.",
    symbolique: "Symbole de frontières sacrées, de purification rituelle et de passage conscient.",
    qualites: ['Discernement des frontières', 'Purification consciente', 'Protection rituelle', 'Odeur qui éveille', 'Transition délimitée'],
    defauts: ['Toxicité des ignorants', 'Frontières rigides', 'Exclusion des non-initiés', 'Accès dangereux sans connaissance'],
    pouvoirs: ['Purification des espaces sacrés', 'Protection des rituels', 'Marquage des frontières', 'Ouverture des passages'],
    enseignements: [
      "Marque clairement les frontières de ton espace sacré",
      "Toute cérémonie importante mérite une purification préalable",
      "Certains passages ne s'ouvrent qu'à ceux qui connaissent le rituel",
      "Le parfum est la première médecine de l'âme",
    ],
    citation: "Là où le Securidaca fleurit, les esprits savent qu'ils sont attendus.",
    proverbes: [
      "Là où le Securidaca fleurit, les esprits savent qu'ils sont attendus.",
      "La frontière n'est pas une prison — c'est la protection de ce qui est sacré.",
      "Purifier l'espace avant le rituel, c'est préparer une maison pour des invités divins.",
    ],
    legendes: [
      "Les devins dogon racontent que l'Arbre Violet fut planté par Amma, le dieu créateur, aux quatre coins du monde pour marquer les frontières du visible et de l'invisible. Quand ses fleurs s'ouvrent, les deux mondes se rapprochent et la communication devient possible.",
    ],
    conseilsDeVie: [
      "Purifies ton espace et ton esprit avant toute chose importante.",
      "Respecte les frontières — les tiennes et celles des autres.",
      "Crée des rituels de transition entre tes différents états de vie.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Savane d'Afrique de l'Ouest — Burkina Faso, Mali, Guinée, Côte d'Ivoire",
    couleur: '#6A3A8A',
    couleurSecondaire: '#3A1A5A',
    enseignementDuJour:
      "Aujourd'hui, purifies un espace — physique ou mental — avant de commencer quelque chose d'important.",
    vertus: ['Antiseptique puissant', 'Antidouleur', 'Antipaludéen', 'Anti-inflammatoire'],
    usagesTraditionnels: ['Purification des espaces rituels', 'Fumigation des cases', 'Tisane anti-inflammatoire', 'Décoction antipaludéenne', 'Amulette protectrice'],
  },

  {
    id: 'ylang-ylang',
    nom: 'Ylang-Ylang',
    nomAnglais: 'Ylang-Ylang',
    nomScientifique: 'Cananga odorata',
    categorie: 'Plantes Rituelles',
    element: 'Eau',
    description:
      "L'Ylang-Ylang est l'arbre du parfum sacré — ses fleurs étoilées jaune-verdâtre dégagent l'un des parfums les plus envoûtants et les plus complexes du règne végétal. Introduit en Afrique de l'Ouest depuis l'Asie du Sud-Est mais profondément adopté par les traditions spirituelles côtières, il est devenu l'arbre des rituels d'amour, de beauté et d'harmonie.",
    symboliqueAfricaine:
      "Dans les traditions côtières d'Afrique de l'Ouest, l'ylang-ylang est l'arbre de Yemoja, déesse de la mer et de la fertilité. Ses fleurs parfumées sont offertes à la mer lors des cérémonies de propitiation. Les femmes s'enduisent de son huile lors des initiations féminines et des rituels de mariage. Son parfum est dit ouvrir le cœur à l'amour et harmoniser les relations.",
    symboliqueSpirirtuelle:
      "L'Ylang-Ylang incarne l'harmonie parfaite — son parfum complexe mêle des notes qui sembleraient discordantes séparément mais qui créent ensemble quelque chose de transcendant. Il enseigne que l'harmonie ne vient pas de l'uniformité mais de la juste proportion de toutes les différences.",
    symbolique: "Symbole d'harmonie transcendante, d'amour sacré et de beauté rituelle.",
    qualites: ['Harmonie naturelle', 'Beauté sensorielle', 'Amour sacré', 'Équilibre émotionnel', 'Attraction bienveillante'],
    defauts: ['Intensité excessive du parfum', 'Ivresse sensorielle', 'Dépendance à la beauté', 'Lourdeur parfois envoûtante'],
    pouvoirs: ['Ouverture du cœur', 'Harmonisation des relations', 'Rituel de mariage', 'Connexion marine'],
    enseignements: [
      "L'harmonie naît de la juste proportion de toutes les différences",
      "La beauté sensorielle est un chemin valide vers le sacré",
      "Ouvre ton cœur à l'amour — c'est ta nature profonde",
      "Harmonise tes relations avec la même complexité que le parfum de l'ylang",
    ],
    citation: "L'ylang-ylang ne cache pas son parfum — il l'offre à tous les vents pour que tous se souviennent de l'amour.",
    proverbes: [
      "L'ylang-ylang ne cache pas son parfum — il l'offre à tous les vents pour que tous se souviennent de l'amour.",
      "La fleur parfumée attire plus que la fleur criarde — la douceur est la plus grande séduction.",
      "Harmoniser, c'est trouver la note que chacun peut chanter ensemble.",
    ],
    legendes: [
      "La légende des pêcheurs fante du Ghana raconte que Yemoja, faisant le deuil de ses enfants noyés, planta l'ylang-ylang sur les rivages pour que son parfum les guide vers le paradis aquatique. Depuis, l'odeur de ses fleurs est la porte entre la mer des vivants et la mer des morts.",
    ],
    conseilsDeVie: [
      "Cultive l'harmonie dans tes relations — cherche les notes qui s'accordent.",
      "Laisse la beauté te toucher — c'est une forme de connexion au divin.",
      "Offre de l'amour ouvertement — comme l'ylang-ylang offre son parfum.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Côtes d'Afrique de l'Ouest — Côte d'Ivoire, Ghana, Bénin, Nigeria",
    couleur: '#D4AF37',
    couleurSecondaire: '#A07A10',
    enseignementDuJour:
      "Aujourd'hui, crée un moment de beauté intentionnelle — pour toi-même ou quelqu'un que tu aimes.",
    vertus: ['Anxiolytique naturel', 'Régulateur du rythme cardiaque', 'Aphrodisiaque doux', 'Antidépresseur léger', 'Antiseptique'],
    usagesTraditionnels: ['Huile essentielle de mariage', 'Offrandes à la mer', 'Rituel d\'initiation féminine', 'Parfum des cérémonies', 'Soin cosmétique et capillaire'],
  },

  /* ═══════════════════════════════════════════════════════════
     NOUVELLES PLANTES ALIMENTAIRES
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'niebe',
    nom: 'Niébé',
    nomAnglais: 'Cowpea',
    nomScientifique: 'Vigna unguiculata',
    categorie: 'Plantes Alimentaires',
    element: 'Terre',
    description:
      "Le Niébé est la légumineuse sacrée de l'Afrique de l'Ouest — un haricot robuste à l'œil noir caractéristique qui nourrit les populations sahéliennes depuis des millénaires. Première source de protéines végétales dans toute la région, il pousse là où peu d'autres plantes survivent. On le dit béni des dieux parce qu'il nourrit les plus pauvres avec une efficacité et une dignité remarquables.",
    symboliqueAfricaine:
      "Dans les traditions mandingues et haoussa, le niébé est 'la nourriture des humbles' mais aussi 'la force des travailleurs'. On dit que le guerrier peul qui mange du niébé chaque matin n'est jamais fatigué. Les femmes préparent le thiébou niébé pour les fêtes importantes — car partager le niébé, c'est partager sa force. Il est présent dans les cérémonies de mariage comme symbole de subsistance durable.",
    symboliqueSpirirtuelle:
      "Le Niébé symbolise la modestie nutritive — il donne beaucoup sans paraître extraordinaire. Sa richesse en protéines, cachée dans sa simplicité apparente, rappelle que les vraies ressources sont souvent invisibles pour ceux qui ne savent pas voir. Il enseigne la dignité du simple et la richesse cachée dans l'ordinaire.",
    symbolique: "Symbole de force humble, de subsistance digne et de richesse cachée dans la simplicité.",
    qualites: ['Force humble', 'Subsistance digne', 'Générosité simple', 'Richesse cachée', 'Endurance des travailleurs'],
    defauts: ['Modestie mal interprétée', 'Sous-estimation fréquente', 'Apparence sans éclat', 'Méconnaissance des ignorants'],
    pouvoirs: ['Force durable', 'Nourriture des familles', 'Résistance à la sécheresse', 'Fertilité des sols'],
    enseignements: [
      "La vraie richesse nourrit — elle ne se vante pas",
      "Sois fier de la simplicité qui nourrit vraiment",
      "Les ressources les plus précieuses sont souvent les plus modestes",
      "La force durable vient de la constance, pas de l'éclat",
    ],
    citation: "Le niébé ne brille pas — mais il nourrit le village entier quand la saison est maigre.",
    proverbes: [
      "Le niébé ne brille pas — mais il nourrit le village entier quand la saison est maigre.",
      "Méprise le niébé au marché — mange-le quand la faim frappe et comprends sa valeur.",
      "La force du travailleur n'est pas dans ses muscles mais dans son bol de niébé.",
    ],
    legendes: [
      "Les anciens peuls racontent que le niébé fut le premier don d'Ardo, le dieu des bergers, à ses enfants avant leur long voyage à travers le Sahel. 'Je vous donne ce qui est petit mais qui ne vous abandonnera jamais', dit-il. Et le niébé poussa dans les terres les plus sèches pour tenir sa promesse.",
    ],
    conseilsDeVie: [
      "Ne méprise pas les ressources simples — elles sont souvent les plus fiables.",
      "La constance dans l'effort modeste vaut plus que l'éclat dans l'exceptionnel.",
      "Nourris-toi de ce qui te donne une force durable, pas de ce qui brille vite.",
    ],
    niveauSpirituel: 2,
    regionOrigine: "Tout le Sahel et les savanes — Sénégal, Mali, Niger, Nigeria, Burkina Faso",
    couleur: '#8B7540',
    couleurSecondaire: '#5A4820',
    enseignementDuJour:
      "Aujourd'hui, reconnaît la valeur d'une ressource simple dans ta vie que tu as peut-être sous-estimée.",
    vertus: ['Riche en protéines végétales', 'Fer et zinc', 'Régulation glycémique', 'Acide folique', 'Prébiotique'],
    usagesTraditionnels: ['Plat de résistance', 'Soupe familiale', 'Farine de niébé pour le pain', 'Aliment de sevrage', 'Présent de mariage'],
  },

  {
    id: 'mais',
    nom: 'Maïs',
    nomAnglais: 'Corn',
    nomScientifique: 'Zea mays',
    categorie: 'Plantes Alimentaires',
    element: 'Terre',
    description:
      "Le Maïs est devenu en quelques siècles l'une des plantes les plus cultivées d'Afrique de l'Ouest, adoptée et sacralisée par les peuples qui l'ont faite leur. Ses épis dorés aux rangées serrées de grains symbolisent la communauté solidaire — des centaines de grains unis dans une organisation parfaite autour d'un même axe. C'est la plante de l'unité dans la diversité.",
    symboliqueAfricaine:
      "Dans les traditions akan et ewe du Ghana et du Togo, le maïs est l'aliment de la fête et de la communion. L'akpan, la pâte de maïs fermentée, est le premier aliment donné aux nourrissons lors des cérémonies de naming. Le pop-corn est offert aux ancêtres lors des libations. Le maïs représente la communauté — ses grains ne peuvent exister qu'ensemble sur l'épi.",
    symboliqueSpirirtuelle:
      "Le Maïs symbolise la communauté bien organisée — des milliers d'individus différents, solidement liés autour d'un axe commun, tous exposés à la même lumière. Il enseigne que la force de la communauté repose sur l'organisation et la solidarité, non sur l'uniformité.",
    symbolique: "Symbole de communauté organisée, d'abondance dorée et de solidarité structurée.",
    qualites: ['Esprit communautaire', 'Organisation solide', 'Abondance généreuse', 'Solidarité structurée', 'Adaptabilité remarquable'],
    defauts: ['Dépendance au groupe', 'Uniformité imposée', 'Vulnérabilité des monocultures', 'Perte de l\'individuel'],
    pouvoirs: ['Nourriture de la fête', 'Communion des vivants', 'Offrande aux ancêtres', 'Unité communautaire'],
    enseignements: [
      "La force réside dans l'union organisée, non dans l'accumulation désordonnée",
      "Chaque membre de la communauté a sa place précise — respecte-la",
      "L'abondance se partage — un épi de maïs ne se mange pas seul",
      "Expose-toi à la même lumière que ta communauté — la croissance est collective",
    ],
    citation: "L'épi de maïs ne choisit pas ses grains — il les unit tous et c'est leur force.",
    proverbes: [
      "L'épi de maïs ne choisit pas ses grains — il les unit tous et c'est leur force.",
      "Un seul grain de maïs ne fait pas une récolte — mais ensemble, ils nourrissent le village.",
      "Celui qui quitte son rang sur l'épi devient facile à perdre.",
    ],
    legendes: [
      "La légende akan raconte que le maïs fut un cadeau d'Anansi l'araignée, qui l'avait volé au soleil. Le soleil lui reprocha de voler sa lumière dorée — Anansi répondit qu'il la donnait aux hommes pour qu'ils aient toujours un peu du soleil à manger pendant la nuit.",
    ],
    conseilsDeVie: [
      "Sois un membre actif de ta communauté — chaque grain compte sur l'épi.",
      "L'organisation collective crée une abondance que l'individu seul ne peut atteindre.",
      "Partage l'abondance que tu crées — c'est le sens de la récolte.",
    ],
    niveauSpirituel: 2,
    regionOrigine: "Toute l'Afrique de l'Ouest — adapté à toutes les zones",
    couleur: '#E8C040',
    couleurSecondaire: '#B89010',
    enseignementDuJour:
      "Aujourd'hui, contribue activement à une communauté — ta place y est précieuse.",
    vertus: ['Glucides énergétiques', 'Fibres digestives', 'Antioxydants caroténoïdes', 'Vitamine B', 'Magnésium'],
    usagesTraditionnels: ['Farine et pâte (tô, akpan)', 'Pop-corn des cérémonies', 'Bouillie de sevrage', 'Bière de mil traditionnelle', 'Aliment de fête'],
  },

  {
    id: 'plantain',
    nom: 'Plantain',
    nomAnglais: 'Plantain',
    nomScientifique: 'Musa paradisiaca',
    categorie: 'Plantes Alimentaires',
    element: 'Terre',
    description:
      "Le Plantain est le roi des aliments de subsistance des zones forestières d'Afrique de l'Ouest — un cousin géant de la banane dont les fruits amidonnés, cuits de mille façons, constituent la base alimentaire de millions de personnes du Sénégal au Congo. Allôfètes, kelewele, aloco, attiéké — chaque peuple a su transformer ce fruit universel en mets uniques et identitaires.",
    symboliqueAfricaine:
      "Dans les traditions des peuples forestiers — Ashanti, Agni, Baoulé, Éwé — le plantain est l'arbre de la mère nourricière. Son régime abondant pend comme un bras chargé de cadeaux. On dit que le plantain est généreux 'comme une mère qui ne retient rien' — il donne tout son fruit, puis meurt et laisse ses rejets continuer son œuvre.",
    symboliqueSpirirtuelle:
      "Le Plantain incarne le don total et la transmission générationnelle — il donne tous ses fruits sans réserve, puis passe le relais à ses rejets. Il n'y a pas de mort dans le plantain, seulement une transformation. Il enseigne que la vraie générosité est sans calcul et que chaque fin prépare un commencement.",
    symbolique: "Symbole de générosité totale, de transmission générationnelle et de don sans retenue.",
    qualites: ['Générosité totale', 'Transmission fidèle', 'Don sans calcul', 'Nourriture universelle', 'Adaptabilité culinaire'],
    defauts: ['Mort après le don', 'Dépendance de l\'entourage', 'Vulnerabilité aux maladies', 'Brièveté du cycle'],
    pouvoirs: ['Nourriture des familles', 'Transmission générationnelle', 'Adaptabilité de la générosité', 'Alimentation des voyages'],
    enseignements: [
      "Donne tout ce que tu as à donner — tes rejets continueront ton œuvre",
      "La mort d'une génération est la vie de la suivante",
      "La générosité sans calcul est la plus grande des richesses",
      "Adapte ton don à chaque contexte — le plantain se cuisine de mille façons",
    ],
    citation: "Le plantain donne tout son fruit, meurt, et laisse ses enfants continuer — c'est la générosité pure.",
    proverbes: [
      "Le plantain donne tout son fruit, meurt, et laisse ses enfants continuer — c'est la générosité pure.",
      "Qui a un plantanier dans sa cour ne mourra pas de faim.",
      "Le plantain ne demande pas pourquoi tu le coupes — il te nourrit et c'est assez.",
    ],
    legendes: [
      "Les anciens ashanti racontent qu'Onyame, le dieu suprême, offrit le premier plantain à une veuve qui avait nourri un étranger affamé sans rien demander. Il planta son bâton dans la terre — et un plantain poussa, abondant et inépuisable. La générosité appelle la nourriture.",
    ],
    conseilsDeVie: [
      "Donne sans calculer — la vraie générosité ne comptabilise pas.",
      "Ce que tu laisses après toi est aussi important que ce que tu as accompli.",
      "Nourris les autres avec ce que tu sais faire — c'est toujours assez.",
    ],
    niveauSpirituel: 2,
    regionOrigine: "Zones forestières et côtières — Côte d'Ivoire, Ghana, Nigeria, Cameroun",
    couleur: '#C8A835',
    couleurSecondaire: '#8A7015',
    enseignementDuJour:
      "Aujourd'hui, donne quelque chose sans attendre de retour — nourriture, temps ou sagesse.",
    vertus: ['Glucides complexes énergétiques', 'Potassium', 'Vitamine B6', 'Fibres digestives', 'Résistant à l\'insuline'],
    usagesTraditionnels: ['Allôcos frits', 'Kelewele épicé', 'Foufou mixte', 'Plantain bouilli', 'Chips de plantain', 'Farine pour bouillies'],
  },

  {
    id: 'pois-bambara',
    nom: 'Pois Bambara',
    nomAnglais: 'Bambara Groundnut',
    nomScientifique: 'Vigna subterranea',
    categorie: 'Plantes Alimentaires',
    element: 'Terre',
    description:
      "Le Pois Bambara est l'une des rares plantes entièrement africaines — originaire d'Afrique de l'Ouest, il n'a pas été importé d'ailleurs. Cette légumineuse souterraine produit ses gousses dans le sol, invisible aux yeux des non-initiés. C'est la plante de l'autosuffisance absolue : complète en protéines, glucides et lipides, elle peut, à elle seule, sustenter une personne en bonne santé.",
    symboliqueAfricaine:
      "Dans les traditions bambaras du Mali — qui lui donnèrent leur nom — le pois bambara est l'aliment de l'indépendance. On dit qu'un peuple qui cultive le pois bambara ne peut pas mourir de faim. Les femmes en font le sôm, une pâte fermentée qui accompagne tout repas. C'est la nourriture des voyageurs courageux et des paysans sages qui planifient longtemps à l'avance.",
    symboliqueSpirirtuelle:
      "Le Pois Bambara incarne l'autosuffisance et la planification profonde — il cache ses trésors dans la terre, hors de vue, les protégeant patiemment jusqu'à la récolte. Il enseigne l'importance de construire des réserves invisibles, de ne pas tout exposer, de préparer l'avenir dans le secret de la profondeur.",
    symbolique: "Symbole d'autosuffisance, de planification patiente et de richesse cachée dans la profondeur.",
    qualites: ['Autosuffisance complète', 'Planification patiente', 'Discrétude stratégique', 'Richesse cachée', 'Indépendance nourricière'],
    defauts: ['Invisibilité méconnue', 'Effort de récolte important', 'Lenteur de la préparation', 'Sous-estimation constante'],
    pouvoirs: ['Autosuffisance alimentaire', 'Réserves stratégiques', 'Nourrit sans se montrer', 'Indépendance préservée'],
    enseignements: [
      "Construis des réserves invisibles pour les temps difficiles",
      "L'autosuffisance est la plus haute forme de liberté",
      "Ne montre pas tous tes atouts — certaines richesses se protègent dans l'ombre",
      "Planifie pour les saisons futures, pas seulement pour aujourd'hui",
    ],
    citation: "Le pois bambara se cache dans la terre — mais c'est lui qui nourrit les peuples libres.",
    proverbes: [
      "Le pois bambara se cache dans la terre — mais c'est lui qui nourrit les peuples libres.",
      "L'homme sage, comme le pois bambara, n'expose pas toutes ses réserves.",
      "Plante le pois bambara pour tes enfants — il mûrit au moment où on en a le plus besoin.",
    ],
    legendes: [
      "La légende bambara raconte que lors d'une grande famine, un village entier survécut grâce à une vieille femme qui avait caché des pois bambara sous sa maison. Quand tout fut consommé, elle partagea ses réserves secrètes. Depuis, on dit que la sagesse des anciens est cachée comme les pois — mais elle nourrit au bon moment.",
    ],
    conseilsDeVie: [
      "Construis des réserves — financières, émotionnelles, relationnelles — pour les temps difficiles.",
      "L'autosuffisance n'est pas l'isolement — c'est la liberté de donner sans contrainte.",
      "Ne révèle pas toutes tes forces immédiatement — garde des profondeurs en réserve.",
    ],
    niveauSpirituel: 2,
    regionOrigine: "Originaire d'Afrique de l'Ouest — Mali, Burkina Faso, Sénégal, Nigeria",
    couleur: '#8B6040',
    couleurSecondaire: '#5A3A20',
    enseignementDuJour:
      "Aujourd'hui, réfléchis à tes réserves invisibles. Qu'as-tu préparé pour les temps difficiles ?",
    vertus: ['Protéines complètes rares', 'Glucides lents', 'Lipides bénéfiques', 'Fer et calcium', 'Acide folique'],
    usagesTraditionnels: ['Pâte fermentée sôm', 'Bouillie de pois', 'Farine pour le pain', 'Plat de résistance', 'Aliment de voyage'],
  },

  {
    id: 'patate-douce',
    nom: 'Patate Douce',
    nomAnglais: 'Sweet Potato',
    nomScientifique: 'Ipomoea batatas',
    categorie: 'Plantes Alimentaires',
    element: 'Terre',
    description:
      "La Patate Douce est la tubercule de la douceur profonde — ses chairs orangées et violacées cachées sous terre concentrent des sucres naturels, des bêta-carotènes et une énergie lente qui nourrit sans épuiser. Ses feuilles rampantes couvrent le sol comme une cape protectrice, et ses fleurs violettes sont d'une délicatesse surprenante pour une plante si robuste.",
    symboliqueAfricaine:
      "Dans les traditions des savanes d'Afrique de l'Ouest, la patate douce est l'aliment des femmes enceintes et des enfants — on dit qu'elle 'donne du soleil dans le ventre'. Sa couleur orange, liée au caroténoïde, symbolise la chaleur nourricière du soleil stockée dans la terre. Les feuilles sont cuisinées en légumes verts par les plus pauvres — la plante entière se mange.",
    symboliqueSpirirtuelle:
      "La Patate Douce incarne la douceur nourricière profonde — un trésor caché dans la terre qui dévoile sa couleur de soleil à la coupe. Elle enseigne que la vraie douceur n'est pas superficielle mais vient des profondeurs, et qu'elle nourrit à la fois le corps et l'âme.",
    symbolique: "Symbole de douceur profonde, de nourriture solaire et de trésor souterrain.",
    qualites: ['Douceur nourrissante', 'Chaleur maternelle', 'Générosité complète', 'Adaptabilité totale', 'Soleil terrestre'],
    defauts: ['Douceur parfois excessive', 'Attachement au sol', 'Lenteur de croissance', 'Fragilité à la chaleur'],
    pouvoirs: ['Nourriture des grossesses', 'Protection des enfants', 'Soleil intérieur', 'Douceur thérapeutique'],
    enseignements: [
      "La vraie douceur vient des profondeurs — elle n'est pas superficielle",
      "Nourris ceux qui sont en croissance avec une attention particulière",
      "La chaleur que tu portes en toi est un soleil intérieur à partager",
      "La générosité totale est de donner même les feuilles, pas seulement les fruits",
    ],
    citation: "La patate douce stocke le soleil dans la terre — pour le restituer à ceux qui en ont besoin en hiver.",
    proverbes: [
      "La patate douce stocke le soleil dans la terre — pour le restituer à ceux qui en ont besoin en hiver.",
      "La mère est comme la patate douce : douce dedans, enracinée profond, nourrit entièrement.",
      "Ce qui est caché dans la terre n'est pas perdu — il devient de la douceur.",
    ],
    legendes: [
      "La légende peule raconte que la patate douce est le cadeau que la Terre-Mère fit aux femmes après la naissance difficile du premier enfant. Elle cacha le soleil dans ses chairs pour que les mères puissent nourrir la vie même en saison sèche.",
    ],
    conseilsDeVie: [
      "Cultive ta douceur intérieure — elle est ta ressource la plus précieuse.",
      "Prends soin des êtres en croissance autour de toi — ils ont besoin de ta chaleur.",
      "Ne cache pas ta douceur — partage-la généreusement.",
    ],
    niveauSpirituel: 2,
    regionOrigine: "Toute l'Afrique de l'Ouest — des côtes aux savanes",
    couleur: '#D4701A',
    couleurSecondaire: '#A04010',
    enseignementDuJour:
      "Aujourd'hui, offre quelque chose de doux à quelqu'un — un mot, un geste, un repas.",
    vertus: ['Bêta-carotène antioxydant', 'Vitamine C et E', 'Antidiabétique doux', 'Anti-inflammatoire', 'Riche en fibres'],
    usagesTraditionnels: ['Tubercule bouillie ou rôtie', 'Feuilles cuisinées en légumes', 'Aliment de grossesse', 'Bouillie de sevrage', 'Fécule pour cuisine'],
  },

  {
    id: 'taro',
    nom: 'Taro',
    nomAnglais: 'Taro',
    nomScientifique: 'Colocasia esculenta',
    categorie: 'Plantes Alimentaires',
    element: 'Eau',
    description:
      "Le Taro est la plante des zones humides et des rivières d'Afrique de l'Ouest — ses feuilles gigantesques en forme d'oreilles d'éléphant captent chaque goutte de pluie et la dirigent vers sa base comme une offrande. Ses cormes (tubercules) sont parmi les plus vieux aliments cultivés au monde. C'est la plante de la mémoire longue et de l'adaptation aux zones difficiles d'accès.",
    symboliqueAfricaine:
      "Dans les traditions des peuples forestiers et côtiers, le taro est l'aliment du peuple de l'eau — les pêcheurs, les habitants des deltas, ceux qui vivent entre la terre et la mer. Ses grandes feuilles sont utilisées pour envelopper les aliments lors de la cuisson rituelle. Dans certaines traditions, planter le taro marque un espace comme habité — c'est une déclaration de présence.",
    symboliqueSpirirtuelle:
      "Le Taro incarne la capacité à prospérer dans les zones de transition — là où la terre et l'eau se mêlent, là où les frontières sont floues. Il enseigne que les zones d'incertitude sont souvent les plus fertiles, que vivre entre deux mondes est une force et non une faiblesse.",
    symbolique: "Symbole de prospérité dans les zones de transition, d'adaptabilité aux frontières et d'ancienne mémoire.",
    qualites: ['Adaptabilité aux frontières', 'Prospérité dans l\'incertitude', 'Mémoire ancienne', 'Présence affirmée', 'Force des zones humides'],
    defauts: ['Dépendance à l\'eau', 'Zones d\'accès difficile', 'Préparation complexe', 'Fragilité à la sécheresse'],
    pouvoirs: ['Nourriture des zones de transition', 'Affirmation de présence', 'Enveloppe rituelle', 'Mémoire des origines'],
    enseignements: [
      "Les zones d'entre-deux sont souvent les plus fertiles",
      "Affirme ta présence — planter le taro, c'est dire 'je suis là'",
      "L'incertitude de la frontière est une richesse, non une faiblesse",
      "La mémoire longue est une force — tes racines sont profondes",
    ],
    citation: "Le taro prospère là où la terre devient eau — il a appris que les frontières sont des espaces de richesse.",
    proverbes: [
      "Le taro prospère là où la terre devient eau — il a appris que les frontières sont des espaces de richesse.",
      "Les feuilles du taro recueillent chaque goutte — rien n'est perdu pour celui qui sait recevoir.",
      "Plante le taro là où tu veux rester — il dira aux autres que tu as choisi cet endroit.",
    ],
    legendes: [
      "Les pêcheurs du delta du Niger racontent que le dieu de la rivière Oya donna le taro aux pêcheurs comme signe de sa bénédiction. Là où il pousse, l'eau est propre et les poissons abondants. Les pêcheurs plantent le taro sur les berges pour marquer les endroits bénis.",
    ],
    conseilsDeVie: [
      "Apprivoise les zones d'incertitude — elles sont souvent les plus fertiles de ta vie.",
      "Affirme ta présence dans les espaces importants pour toi.",
      "Tire ta force de ta mémoire longue — tes racines te soutiennent.",
    ],
    niveauSpirituel: 2,
    regionOrigine: "Zones humides et forestières — delta du Niger, côtes d'Afrique de l'Ouest",
    couleur: '#5A8040',
    couleurSecondaire: '#2A4A20',
    enseignementDuJour:
      "Aujourd'hui, explore une zone d'incertitude de ta vie — elle porte peut-être une richesse cachée.",
    vertus: ['Glucides digestibles', 'Potassium', 'Fibres alimentaires', 'Calcium et fer', 'Faible indice glycémique'],
    usagesTraditionnels: ['Cormes bouillis et pilés', 'Feuilles cuisinées', 'Emballage rituel des aliments', 'Fécule de taro', 'Colle traditionnelle'],
  },

  {
    id: 'canne-a-sucre',
    nom: 'Canne à Sucre',
    nomAnglais: 'Sugar Cane',
    nomScientifique: 'Saccharum officinarum',
    categorie: 'Plantes Alimentaires',
    element: 'Eau',
    description:
      "La Canne à Sucre est la plante de la douceur accessible — ses hautes tiges vertes et sucrées ont été mâchées par des générations d'enfants africains comme première rencontre avec la douceur naturelle du monde. Dans les champs ensoleillés d'Afrique de l'Ouest, ses hauts panaches souples se balancent comme des drapeaux de la joie.",
    symboliqueAfricaine:
      "Dans les traditions d'Afrique de l'Ouest, la canne à sucre est associée aux enfants et à la joie simple. On la plante aux abords des maisons pour que les enfants aient toujours quelque chose de doux à portée de main. Dans les cérémonies, le sucre de canne aromatise les boissons rituelles. Les guérisseurs l'utilisent pour 'adoucir' les remèdes amers — mélangeant l'amertume nécessaire à la douceur permissive.",
    symboliqueSpirirtuelle:
      "La Canne à Sucre symbolise la douceur qui se mérite — il faut traverser l'épaisseur de sa tige, mordre à travers son extérieur fibreux pour atteindre son jus sucré. Elle enseigne que les plaisirs durables et profonds demandent un effort, que la douceur facile n'est que la surface des choses.",
    symbolique: "Symbole de douceur méritée, de joie accessible et de récompense de l'effort.",
    qualites: ['Douceur accessible', 'Joie de l\'enfance', 'Récompense de l\'effort', 'Générosité sucrée', 'Équilibre des amertumes'],
    defauts: ['Douceur excessive sans limite', 'Attachement aux plaisirs faciles', 'Épuisement du sol', 'Dépendance à la chaleur'],
    pouvoirs: ['Adoucissement des remèdes', 'Joie cérémonielle', 'Nourriture des enfants', 'Équilibre gustatif'],
    enseignements: [
      "La vraie douceur se mérite — elle se cache sous l'écorce de l'effort",
      "Adoucis les remèdes difficiles sans en atténuer l'efficacité",
      "La joie simple est un cadeau à partager sans retenue",
      "Équilibre les amertumes de la vie avec les douceurs qu'elle offre",
    ],
    citation: "La canne à sucre ne donne pas sa douceur facilement — mais à qui mord, elle offre tout.",
    proverbes: [
      "La canne à sucre ne donne pas sa douceur facilement — mais à qui mord, elle offre tout.",
      "Donne du sucre de canne à l'enfant qui pleure — pas pour l'habituer à la douceur facile, mais pour lui rappeler que la vie en a.",
      "La fête sans canne à sucre est une fête à moitié.",
    ],
    legendes: [
      "La légende mandingue raconte qu'un génie du soleil voulut offrir aux hommes un cadeau pour adoucir leurs jours difficiles. Il ne pouvait pas leur donner le miel des abeilles — trop rare. Il planta alors la canne dans les terres ensoleillées et dit : 'Le sucre du soleil appartient à tous les enfants.'",
    ],
    conseilsDeVie: [
      "Permets-toi les douceurs simples et méritées de la vie.",
      "Adoucis les réalités difficiles sans les nier — c'est la sagesse de la canne à sucre.",
      "Partage la joie — elle se multiplie quand on la partage.",
    ],
    niveauSpirituel: 1,
    regionOrigine: "Zones humides et côtières — Guinée, Sierra Leone, Côte d'Ivoire, Nigeria",
    couleur: '#7ABA50',
    couleurSecondaire: '#4A8A20',
    enseignementDuJour:
      "Aujourd'hui, permets-toi une douceur simple. La joie n'a pas besoin d'être complexe pour être réelle.",
    vertus: ['Énergie rapide', 'Minéraux naturels', 'Prébiotique du jus frais', 'Alcalinisant', 'Hydratant'],
    usagesTraditionnels: ['Tige mâchée fraîche', 'Jus de canne naturel', 'Sucre artisanal', 'Boissons fermentées', 'Adoucissant des remèdes'],
  },

  {
    id: 'amarante',
    nom: 'Amarante Africaine',
    nomAnglais: 'African Amaranth',
    nomScientifique: 'Amaranthus hybridus',
    categorie: 'Plantes Alimentaires',
    element: 'Feu',
    description:
      "L'Amarante Africaine est la plante de la résurrection — son nom grec signifie 'qui ne se fane pas', et en effet cette herbe aux feuilles pourpres et vert foncé revient chaque saison avec une vigueur inépuisable. Spontanée, robuste, nutritive, elle pousse dans les champs et les jardins sans qu'on la plante, offrant généreusement ses feuilles riches en fer et en protéines aux familles qui savent la reconnaître.",
    symboliqueAfricaine:
      "Dans les traditions des femmes d'Afrique de l'Ouest, l'amarante est 'la feuille qui ne demande pas de permission' — elle pousse où elle veut, quand elle veut, et nourrit sans compter. Les femmes qui connaissent l'amarante ne souffrent jamais de pénurie de légumes verts. C'est la plante de l'indépendance féminine et de la connaissance botanique traditionnelle.",
    symboliqueSpirirtuelle:
      "L'Amarante symbolise la résilience qui revient toujours — impossible à éradiquer vraiment, elle réapparaît à chaque saison avec une puissance renouvelée. Elle enseigne que certaines forces de vie sont impossibles à détruire complètement, que la vraie résistance est dans le retour perpétuel.",
    symbolique: "Symbole de résurrection perpétuelle, d'indépendance nourricière et de résilience indestructible.",
    qualites: ['Résilience indestructible', 'Retour perpétuel', 'Indépendance nourricière', 'Générosité spontanée', 'Richesse discrète'],
    defauts: ['Envahissement excessif', 'Indiscipline de croissance', 'Difficile à contrôler', 'Méconnaissance des ignorants'],
    pouvoirs: ['Nutrition des familles', 'Résurrection perpétuelle', 'Indépendance alimentaire', 'Connaissance botanique'],
    enseignements: [
      "Certaines forces en toi sont impossibles à éradiquer — honore-les",
      "La vraie résilience est dans le retour, pas dans la résistance",
      "Connais les ressources qui t'entourent — la nature nourrit ceux qui savent regarder",
      "L'indépendance nutritive est une forme de liberté",
    ],
    citation: "L'amarante n'a pas besoin qu'on la plante — elle choisit elle-même où pousser et nourrir.",
    proverbes: [
      "L'amarante n'a pas besoin qu'on la plante — elle choisit elle-même où pousser et nourrir.",
      "La femme qui connaît l'amarante ne sera jamais sans légumes.",
      "Ce qui revient toujours est plus fort que ce qui n'est jamais tombé.",
    ],
    legendes: [
      "Les anciens wolof racontent que l'amarante poussa spontanément sur la tombe d'une femme guérisseuse après sa mort. Les villageois comprirent que son savoir végétal était passé dans la plante — et depuis, ils l'appellent 'la feuille de la guérisseuse immortelle'.",
    ],
    conseilsDeVie: [
      "Reviens toujours — la résilience n'est pas de ne jamais tomber, c'est de se relever chaque fois.",
      "Acquiers des connaissances pratiques sur la nature autour de toi.",
      "L'indépendance est un chemin — commence par ce que tu peux maîtriser toi-même.",
    ],
    niveauSpirituel: 2,
    regionOrigine: "Spontanée partout en Afrique de l'Ouest — jardins et champs",
    couleur: '#8B1A4A',
    couleurSecondaire: '#5A0A2A',
    enseignementDuJour:
      "Aujourd'hui, remarque une ressource naturelle autour de toi que tu n'avais pas vue. La nature nourrit ceux qui regardent.",
    vertus: ['Fer végétal élevé', 'Protéines complètes', 'Calcium', 'Vitamine C et A', 'Acide folique'],
    usagesTraditionnels: ['Feuilles cuisinées en légumes', 'Soupe de légumes verts', 'Graines consommées', 'Aliment anti-anémie', 'Légume de soudure'],
  },

  /* ═══════════════════════════════════════════════════════════
     NOUVELLES HERBES & GRAMINÉES
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'herbe-de-guinee',
    nom: 'Herbe de Guinée',
    nomAnglais: 'Guinea Grass',
    nomScientifique: 'Panicum maximum',
    categorie: 'Herbes & Graminées',
    element: 'Air',
    description:
      "L'Herbe de Guinée est la graminée tropicale la plus généreuse d'Afrique de l'Ouest — une graminée haute et vigoureuse dont les panaches plumeteux ondulent dans le vent de la savane. Source principale de fourrage pour le bétail, elle est la base de l'économie pastorale de toute la région. Ses tiges peuvent atteindre deux mètres, formant des prairies denses qui abritent une multitude de vie.",
    symboliqueAfricaine:
      "Dans les traditions peules — peuple pasteur par excellence — l'herbe de Guinée est la bénédiction divine accordée au bétail. Un champ d'herbe de Guinée est une promesse de vie et de prospérité pour le troupeau. Les bergers lisent l'état des prairies comme un livre — l'herbe verte abondante annonce une bonne saison, l'herbe sèche une période difficile. C'est le baromètre naturel de la vie pastorale.",
    symboliqueSpirirtuelle:
      "L'Herbe de Guinée incarne la générosité collective et le service discret — elle nourrit sans s'imposer, soutient les plus grands sans chercher à leur ressembler, et crée des espaces de vie pour d'innombrables êtres. Elle enseigne la valeur du rôle de support — pas toujours le plus visible, mais indispensable.",
    symbolique: "Symbole de soutien généreux, de service pastoral et de vie collective vigoureuse.",
    qualites: ['Générosité fourragère', 'Service discret', 'Soutien des grands', 'Vie collective abondante', 'Adaptabilité tropicale'],
    defauts: ['Envahissement possible', 'Brûlage nécessaire', 'Dépendance à la pluie', 'Vulnérabilité à la sécheresse'],
    pouvoirs: ['Nourriture du bétail', 'Prédiction des saisons', 'Création d\'habitats', 'Soutien de l\'économie pastorale'],
    enseignements: [
      "Le rôle de soutien est aussi noble que le rôle de leader",
      "Nourrir ceux qui nourrissent les autres est une chaîne sacrée",
      "La générosité collective crée des espaces de vie pour tous",
      "Lis les signaux de la nature — elle parle à ceux qui savent écouter",
    ],
    citation: "L'herbe de Guinée ne se vante pas de nourrir les troupeaux — mais sans elle, le pasteur serait seul.",
    proverbes: [
      "L'herbe de Guinée ne se vante pas de nourrir les troupeaux — mais sans elle, le pasteur serait seul.",
      "Un champ d'herbe verte est une prière exaucée pour le berger peul.",
      "Même la plus grande savane commence par un brin d'herbe.",
    ],
    legendes: [
      "La légende peule raconte qu'Ardo, le dieu des pasteurs, parsema la savane d'herbe de Guinée pour ses enfants nomades, comme un père qui prépare la route avant que ses enfants partent. Chaque brin d'herbe est une bénédiction plantée pour les troupeaux qui passent.",
    ],
    conseilsDeVie: [
      "Le rôle de soutien est essentiel — honore ceux qui te soutiennent discrètement.",
      "Crée des espaces nourriciers pour ceux qui en dépendent.",
      "Lis les signaux de ton environnement — ils te parlent de l'avenir.",
    ],
    niveauSpirituel: 1,
    regionOrigine: "Savanes d'Afrique de l'Ouest — présente dans tous les pays",
    couleur: '#6BAA30',
    couleurSecondaire: '#3A7A10',
    enseignementDuJour:
      "Aujourd'hui, honorez quelqu'un qui joue un rôle de soutien discret dans votre vie.",
    vertus: ['Fourrage nutritif pour bétail', 'Protection des sols contre l\'érosion', 'Habitat faunique', 'Biomasse'],
    usagesTraditionnels: ['Pâturage du bétail', 'Toiture des cases', 'Cordes tressées', 'Protection des berges', 'Baromètre saison'],
  },

  {
    id: 'bambou',
    nom: 'Bambou Africain',
    nomAnglais: 'African Bamboo',
    nomScientifique: 'Bambusa vulgaris',
    categorie: 'Herbes & Graminées',
    element: 'Air',
    description:
      "Le Bambou Africain est le géant des graminées — une plante extraordinaire qui peut pousser de trente centimètres par jour et atteindre vingt mètres de hauteur, tout en restant une herbe. Ses tiges creuses sont d'une solidité remarquable, combinant légèreté et résistance. Dans les villages d'Afrique de l'Ouest, le bambou est la matière première universelle — il construit, il clôture, il fait de la musique, il nourrit.",
    symboliqueAfricaine:
      "Dans les traditions des zones forestières, le bambou est l'arbre de la famille soudée — ses rhizomes souterrains interconnectent tous les plants d'un même bouquet, les nourrissant collectivement. Couper un seul bambou n'affaiblit pas le bouquet — il repoussera. On dit que la famille bambou ne meurt jamais vraiment, car ses racines restent vivantes même si les tiges tombent.",
    symboliqueSpirirtuelle:
      "Le Bambou incarne la flexibilité dans la solidité — ses tiges plient sous la tempête mais ne se brisent pas, et se redressent quand le vent passe. Il enseigne l'art de la résistance douce : ne pas s'opposer frontalement à la force, mais plier intelligemment pour revenir plus fort.",
    symbolique: "Symbole de flexibilité dans la solidité, de famille interconnectée et de croissance explosive.",
    qualites: ['Flexibilité intelligente', 'Solidité légère', 'Croissance explosive', 'Famille interconnectée', 'Polyvalence créatrice'],
    defauts: ['Envahissement des rhizomes', 'Croissance parfois incontrôlable', 'Creux intérieur apparent', 'Fragile si sec'],
    pouvoirs: ['Construction légère et solide', 'Musique sacrée', 'Famille indestructible', 'Croissance rapide'],
    enseignements: [
      "Plie sous la tempête plutôt que de te briser — la flexibilité est une force",
      "Tes racines familiales sont plus profondes que ce qu'on voit",
      "Croître vite nécessite des racines solides et interconnectées",
      "La légèreté n'est pas la fragilité — elle est l'élégance de la force",
    ],
    citation: "Le bambou plie dans la tempête, mais ses racines tiennent tout le bouquet — il se redresse toujours.",
    proverbes: [
      "Le bambou plie dans la tempête, mais ses racines tiennent tout le bouquet — il se redresse toujours.",
      "Coupe un bambou, il repousse — c'est la force des racines collectives.",
      "La flûte de bambou est creuse — mais c'est ce vide qui fait la musique.",
    ],
    legendes: [
      "Les forgerons dogon racontent que les premiers instruments de musique furent des flûtes de bambou offertes par les génies du vent. En soufflant dans le bambou creux, les génies apprirent aux hommes que le vide intérieur n'est pas un manque — c'est l'espace par lequel la musique peut naître.",
    ],
    conseilsDeVie: [
      "Développe ta flexibilité — plier intelligemment n'est pas céder, c'est survivre.",
      "Nourris tes connexions familiales et communautaires — elles sont tes racines.",
      "Ton vide intérieur est un espace de créativité — ne le comble pas à la hâte.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Zones humides et forestières de toute l'Afrique de l'Ouest",
    couleur: '#5A9A40',
    couleurSecondaire: '#2A6A20',
    enseignementDuJour:
      "Aujourd'hui, pratique la flexibilité face à une difficulté. Plie plutôt que résiste — et observe ce qui se passe.",
    vertus: ['Jeunes pousses comestibles', 'Silice abondante', 'Antioxydant', 'Anti-inflammatoire', 'Tonique général'],
    usagesTraditionnels: ['Construction de cases et meubles', 'Flûtes et instruments', 'Paniers et nattes', 'Clôtures de villages', 'Pousses consommées'],
  },

  /* ═══════════════════════════════════════════════════════════
     NOUVEAU PALMIER
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'palmier-doum',
    nom: 'Palmier Doum',
    nomAnglais: 'Doum Palm',
    nomScientifique: 'Hyphaene thebaica',
    categorie: 'Palmiers',
    element: 'Feu',
    description:
      "Le Palmier Doum est l'unique palmier qui se ramifie — tandis que tous ses cousins poussent droit vers le ciel, il ose se diviser en branches distinctes, créant une silhouette surréaliste et reconnaissable entre toutes dans les paysages sahéliens. Ses fruits ronds et orangés, appelés 'pain d'épice des pharaons', dégagent une saveur douce et sucrée évoquant le pain d'épice. C'est le palmier des carrefours et des choix.",
    symboliqueAfricaine:
      "Dans les traditions du Sahel, le palmier doum est l'arbre du carrefour — là où il pousse, les chemins se séparent. Les voyageurs s'y arrêtent pour décider de leur direction. Les devins l'utilisent dans leurs lectures : les branches du palmier doum représentent les chemins possibles d'une vie. C'est l'arbre de la décision, de la bifurcation et de la responsabilité des choix.",
    symboliqueSpirirtuelle:
      "Le Palmier Doum incarne le paradoxe de l'originalité — le seul palmier à se ramifier, à refuser la voie unique. Il enseigne que s'écarter de la norme n'est pas une erreur mais parfois une évolution. Sa division est sa force distinctive, son refus de la linéarité sa signature dans le paysage.",
    symbolique: "Symbole de la décision audacieuse, de l'originalité assumée et du carrefour de vie.",
    qualites: ['Originalité distinctive', 'Courage des bifurcations', 'Vision panoramique', 'Décision audacieuse', 'Signature unique'],
    defauts: ['Division parfois dispersante', 'Indécision aux carrefours', 'Originalité mal comprise', 'Difficulté de l\'unique'],
    pouvoirs: ['Guidance aux carrefours', 'Lecture des destins', 'Originalité sacrée', 'Vision à deux têtes'],
    enseignements: [
      "L'originalité est une force — être le seul à se ramifier est une signature divine",
      "Aux carrefours de la vie, arrête-toi et réfléchis — la décision mérite cet honneur",
      "Refuser la voie unique n'est pas de la confusion — c'est parfois de l'évolution",
      "Ta singularité est ton cadeau au monde",
    ],
    citation: "Le palmier doum est le seul à se ramifier — il a compris que certains destins refusent d'être linéaires.",
    proverbes: [
      "Le palmier doum est le seul à se ramifier — il a compris que certains destins refusent d'être linéaires.",
      "Au carrefour, arrête-toi sous le doum — c'est là que les décisions deviennent sagesse.",
      "Celui qui se ramifie comme le doum couvre plus de ciel que celui qui monte droit.",
    ],
    legendes: [
      "La légende songhraï raconte qu'un palmier orgueilleux de sa droiture fut puni par le dieu des jardins qui le divisa en deux. Humilié, le palmier comprit que la division était une bénédiction — il pouvait maintenant voir dans deux directions, protéger deux fois plus d'ombre, offrir deux fois plus de fruits.",
    ],
    conseilsDeVie: [
      "Assume ton originalité — être différent est une force, pas un défaut.",
      "Aux carrefours de ta vie, prends le temps de décider avec sagesse.",
      "Ta singularité n'est pas un accident — c'est ta contribution unique.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Sahel et zones arides — Niger, Mali, Sénégal, Mauritanie",
    couleur: '#C48030',
    couleurSecondaire: '#8A5010',
    enseignementDuJour:
      "Aujourd'hui, assume une originalité qui t'a peut-être fait douter. Le doum est le seul à se ramifier — et il en est plus beau.",
    vertus: ['Fruit pain d\'épice énergétique', 'Feuilles pour nattes', 'Tronc pour construction', 'Noix dure pour sculpture'],
    usagesTraditionnels: ['Fruit comestible sucré', 'Nattes et paniers de feuilles', 'Repère des carrefours', 'Divination des chemins', 'Ombre des voyageurs'],
  },

  /* ═══════════════════════════════════════════════════════════
     NOUVEAUX ARBRES SACRÉS (extension)
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'kad',
    nom: 'Kad',
    nomAnglais: 'Winter Thorn',
    nomScientifique: 'Faidherbia albida',
    categorie: 'Arbres Sacrés',
    element: 'Terre',
    description:
      "Le Kad — appelé Gao en peul — est l'arbre miraculeux du Sahel, celui qui défie toutes les lois de la nature : il perd ses feuilles à la saison des pluies et reverdit en pleine saison sèche. Ce calendrier inversé permet aux cultures de pousser à son pied en plein soleil, puis d'être fertilisées par sa litière. C'est le grand allié des paysans, l'arbre qui nourrit la terre.",
    symboliqueAfricaine:
      "Dans tout le Sahel, le Kad est sacré pour les cultivateurs sérères, wolof et peuls. On ne le coupe jamais — un champ parsemé de Kad est un champ béni. Les anciens disent qu'il « travaille pendant que les autres dorment ». Sa présence dans un terroir est signe de prospérité et de la bénédiction des ancêtres sur la terre.",
    symboliqueSpirirtuelle:
      "Le Kad incarne le don silencieux et le service à contre-courant. Il se dépouille quand les autres se parent, il donne son ombre quand le soleil brûle, il enrichit la terre sans jamais rien réclamer. Il enseigne que la vraie générosité agit à rebours de l'ego, dans le rythme inverse du monde.",
    symbolique: "Symbole de la générosité fertile, du service discret et du don à contre-courant.",
    qualites: ['Générosité fertile', 'Service discret', 'Rythme à contre-courant', 'Bienveillance nourricière', 'Constance'],
    defauts: ['Effacement excessif', 'Oubli de soi', 'Don sans limite', 'Sacrifice silencieux'],
    pouvoirs: ['Fertilité de la terre', 'Protection des cultures', 'Régénération du sol', 'Abondance partagée'],
    enseignements: [
      "Donne quand les autres prennent — ta générosité fertilise le monde",
      "Le vrai service se fait sans bruit et sans récompense attendue",
      "Se dépouiller au bon moment, c'est faire de la place à la vie des autres",
      "Travaille quand les autres dorment — la terre s'en souviendra",
    ],
    citation: "Le Kad reverdit quand tout sèche — il a compris que donner à contretemps, c'est donner deux fois.",
    proverbes: [
      "Le Kad reverdit quand tout sèche — il a compris que donner à contretemps, c'est donner deux fois.",
      "Sous le Kad, le mil pousse plus haut — l'arbre qui donne ne perd jamais.",
      "On ne coupe pas le Kad : on coupe la main qui nourrit le village.",
    ],
    legendes: [
      "Les anciens sérères racontent qu'au temps de la grande sécheresse, tous les arbres fuirent le soleil en perdant leurs feuilles à la mauvaise saison. Seul le Kad accepta d'inverser son destin pour protéger les semences des hommes. Dieu, voyant son sacrifice, décréta que partout où pousserait le Kad, la faim ne s'installerait jamais.",
    ],
    conseilsDeVie: [
      "Offre ton aide précisément quand les autres se retirent — c'est là qu'elle compte le plus.",
      "N'attends pas de reconnaissance pour le bien que tu fais discrètement.",
      "Apprends à te retirer au bon moment pour laisser grandir ceux qui t'entourent.",
    ],
    niveauSpirituel: 5,
    regionOrigine: "Sahel — Sénégal, Mali, Niger, Burkina Faso",
    couleur: '#7A8C3A',
    couleurSecondaire: '#4A5A20',
    enseignementDuJour:
      "Aujourd'hui, donne à contre-courant : aide là où personne ne regarde. Comme le Kad, fertilise en silence.",
    vertus: ['Fertilisation naturelle des sols', 'Fourrage riche en saison sèche', 'Écorce médicinale', 'Ombre pour les cultures'],
    usagesTraditionnels: ['Agroforesterie traditionnelle', 'Gousses pour le bétail', 'Soins des fièvres', 'Protection des champs'],
  },

  {
    id: 'ditakh',
    nom: 'Ditakh',
    nomAnglais: 'Tallow Tree',
    nomScientifique: 'Detarium senegalense',
    categorie: 'Arbres Sacrés',
    element: 'Eau',
    description:
      "Le Ditakh — ou Détar — est un grand arbre des forêts et galeries du Sénégal, célèbre pour ses fruits ronds verdâtres à la pulpe acidulée très appréciée. Son bois dense et son ombre généreuse en font un arbre respecté, tandis que ses fruits parfumés sont un délice de la brousse que petits et grands cueillent avec joie.",
    symboliqueAfricaine:
      "Chez les Wolof et les Sérères, le Ditakh est l'arbre du plaisir partagé et de la saison des récoltes. Sa cueillette rassemble les enfants des villages. On dit que son fruit « réveille la langue » — symbole de la parole vraie et savoureuse. Certains guérisseurs lisent dans la chute de ses fruits des présages de fertilité.",
    symboliqueSpirirtuelle:
      "Le Ditakh enseigne la douceur cachée derrière l'apparence rude : son fruit terne au-dehors renferme une chair exquise. Il rappelle que les vraies richesses ne se révèlent qu'à celui qui prend le temps d'ouvrir, de goûter, de patienter.",
    symbolique: "Symbole de la richesse intérieure cachée et de la joie partagée des récoltes.",
    qualites: ['Douceur intérieure', 'Générosité gourmande', 'Convivialité', 'Patience du goût', 'Joie simple'],
    defauts: ['Apparence trompeuse', 'Réserve excessive', 'Lenteur à se révéler'],
    pouvoirs: ['Nourriture de brousse', 'Rassemblement des cœurs', 'Saveur de la vie', 'Présage de fertilité'],
    enseignements: [
      "Ne juge pas la chair au seul aspect de l'écorce",
      "Les plus grandes douceurs demandent qu'on prenne le temps de les ouvrir",
      "La joie se multiplie quand on la cueille ensemble",
      "Sois savoureux dans ta parole comme le fruit l'est dans la bouche",
    ],
    citation: "Le Ditakh est terne dehors et doux dedans — comme les cœurs qu'il faut apprendre à ouvrir.",
    proverbes: [
      "Le Ditakh est terne dehors et doux dedans — comme les cœurs qu'il faut apprendre à ouvrir.",
      "Le fruit du Détar réunit les enfants : la douceur appelle toujours la compagnie.",
      "Qui dédaigne l'écorce du Ditakh ne goûtera jamais sa chair.",
    ],
    legendes: [
      "On raconte qu'un voyageur affamé méprisa les fruits ternes du Détar et poursuivit sa route. Un enfant les ramassa, les ouvrit, et y trouva de quoi nourrir tout un village. Depuis, les anciens disent que la richesse passe à côté de l'orgueilleux et se donne à l'humble qui sait regarder au-dedans.",
    ],
    conseilsDeVie: [
      "Cherche la valeur cachée derrière les apparences modestes.",
      "Partage tes joies — elles grandissent quand elles sont communes.",
      "Prends le temps de découvrir les gens avant de les juger.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Sénégal, Gambie, Guinée — forêts et galeries",
    couleur: '#5C8A3A',
    couleurSecondaire: '#365220',
    enseignementDuJour:
      "Aujourd'hui, regarde au-delà des apparences : une personne ou une chose terne cache peut-être une douceur rare.",
    vertus: ['Fruit riche en vitamine C', 'Pulpe digestive', 'Bois solide de construction', 'Graines nutritives'],
    usagesTraditionnels: ['Fruit consommé frais', 'Jus et boissons', 'Soins digestifs', 'Bois d\'œuvre'],
  },

  {
    id: 'soump',
    nom: 'Soump',
    nomAnglais: 'Desert Date',
    nomScientifique: 'Balanites aegyptiaca',
    categorie: 'Arbres Sacrés',
    element: 'Feu',
    description:
      "Le Soump est l'arbre épineux des terres les plus sèches, un survivant absolu qui prospère là où presque rien ne pousse. Couvert de longues épines vertes, il donne de petits fruits jaunes en forme de dattes, comestibles et médicinaux. C'est le gardien armé du désert, celui qui protège et nourrit malgré l'aridité.",
    symboliqueAfricaine:
      "Dans les zones sahéliennes, le Soump symbolise la résistance armée et la protection. Ses épines en font un arbre de défense — on plante ses branches pour clôturer les enclos. Les guérisseurs maures et peuls tirent de ses fruits, racines et écorces de puissants remèdes. C'est l'arbre qui se défend pour mieux donner.",
    symboliqueSpirirtuelle:
      "Le Soump enseigne que la douceur peut s'accompagner de fermes limites. Ses épines ne sont pas de l'agressivité mais une frontière sacrée : il offre son fruit à qui le respecte, et se protège de qui veut l'arracher. Il incarne le don protégé par des limites saines.",
    symbolique: "Symbole de la résistance, des limites saines et du don protégé.",
    qualites: ['Résistance extrême', 'Limites saines', 'Protection', 'Endurance', 'Don défendu'],
    defauts: ['Rudesse défensive', 'Méfiance', 'Aspérité', 'Distance protectrice'],
    pouvoirs: ['Survie en milieu hostile', 'Protection des enclos', 'Guérison profonde', 'Endurance à la soif'],
    enseignements: [
      "Pose tes épines : des limites claires protègent ta générosité",
      "On peut être doux au fruit et ferme à la frontière",
      "Survis là où d'autres renoncent — la racine sait trouver l'eau cachée",
      "Ce qui te protège te permet aussi de donner",
    ],
    citation: "Le Soump garde ses épines et offre ses fruits — il sait qu'on ne donne bien que ce qu'on a su protéger.",
    proverbes: [
      "Le Soump garde ses épines et offre ses fruits — il sait qu'on ne donne bien que ce qu'on a su protéger.",
      "L'arbre du désert ne pleure pas la pluie : sa racine connaît le chemin de l'eau.",
      "Qui veut le fruit du Soump apprend d'abord le respect de l'épine.",
    ],
    legendes: [
      "Une légende maure dit que le Soump fut le premier arbre à accepter de vivre dans le désert que tous fuyaient. Pour récompense, Dieu lui donna des épines afin que nul ne le déracine, et des fruits sucrés afin que les voyageurs perdus survivent. Ainsi l'arbre qui se défend devint l'arbre qui sauve.",
    ],
    conseilsDeVie: [
      "Apprends à poser des limites : elles protègent ta capacité à donner.",
      "Ne renonce pas dans l'adversité — tes ressources profondes existent.",
      "Le respect ouvre les portes que la force ne forcera jamais.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Sahel et zones arides — Mauritanie, Mali, Niger, Sénégal",
    couleur: '#B8A030',
    couleurSecondaire: '#7A6818',
    enseignementDuJour:
      "Aujourd'hui, pose une limite saine sans culpabilité. Comme le Soump, protège ce que tu offres au monde.",
    vertus: ['Fruit comestible énergétique', 'Huile médicinale des graines', 'Écorce vermifuge', 'Bois très dur'],
    usagesTraditionnels: ['Haies défensives', 'Remèdes traditionnels', 'Savon et huile', 'Alimentation de survie'],
  },

  {
    id: 'kapokier',
    nom: 'Kapokier Rouge',
    nomAnglais: 'Red-flowered Kapok',
    nomScientifique: 'Bombax costatum',
    categorie: 'Arbres Sacrés',
    element: 'Feu',
    description:
      "Le Kapokier rouge embrase la savane sèche : alors que ses branches sont encore nues, il se couvre de magnifiques fleurs orange vif qui flamboient sur le ciel. Ses fleurs séchées entrent dans la cuisine ouest-africaine, notamment le célèbre kapokier des sauces. C'est l'arbre du feu floral, de la beauté qui surgit avant les feuilles.",
    symboliqueAfricaine:
      "Dans les savanes du Burkina, du Mali et de la Côte d'Ivoire, la floraison du Kapokier rouge annonce une saison et nourrit les sauces traditionnelles. Ses fleurs sont récoltées par les femmes et symbolisent l'abondance qui précède la pluie. On y voit l'arbre de l'espérance flamboyante au cœur de la sécheresse.",
    symboliqueSpirirtuelle:
      "Le Kapokier rouge enseigne que la beauté peut précéder les conditions favorables : il fleurit avant d'avoir ses feuilles, il donne avant d'avoir reçu. Il incarne l'audace de rayonner dans l'adversité, la foi qui éclate en couleurs avant même la première goutte de pluie.",
    symbolique: "Symbole de la beauté audacieuse, de l'espérance flamboyante et de l'abondance annoncée.",
    qualites: ['Audace lumineuse', 'Espérance', 'Beauté généreuse', 'Éclat précoce', 'Foi'],
    defauts: ['Précipitation', 'Éclat sans fondations', 'Flamboiement éphémère'],
    pouvoirs: ['Annonce des saisons', 'Nourriture des sauces', 'Éclat dans l\'adversité', 'Beauté nourricière'],
    enseignements: [
      "Ose rayonner avant même que les conditions soient parfaites",
      "La beauté donnée généreusement nourrit aussi le ventre",
      "Fleuris dans la sécheresse — c'est là que tes couleurs comptent le plus",
      "L'espérance se voit de loin, comme un arbre en feu sur la savane",
    ],
    citation: "Le Kapokier rouge fleurit avant ses feuilles — il a compris qu'on peut donner sa beauté avant d'avoir tout reçu.",
    proverbes: [
      "Le Kapokier rouge fleurit avant ses feuilles — il a compris qu'on peut donner sa beauté avant d'avoir tout reçu.",
      "Quand le kapokier s'embrase, la savane sait que l'espoir précède la pluie.",
      "La fleur du kapokier nourrit la marmite : la beauté n'est pas que pour les yeux.",
    ],
    legendes: [
      "On raconte qu'en pleine sécheresse, les arbres attendaient la pluie pour fleurir. Le Kapokier, impatient de redonner espoir aux hommes affamés, choisit de fleurir le premier, nu et flamboyant. Les femmes vinrent récolter ses fleurs pour leurs sauces, et le village survécut. Depuis, sa floraison est le signal que l'abondance revient.",
    ],
    conseilsDeVie: [
      "N'attends pas les conditions parfaites pour offrir ce que tu as de beau.",
      "Ta lumière est plus précieuse encore dans les temps difficiles.",
      "Donne généreusement, même de ce qui semble n'être que beauté.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Savanes — Burkina Faso, Mali, Côte d'Ivoire, Sénégal",
    couleur: '#D4541E',
    couleurSecondaire: '#8A3210',
    enseignementDuJour:
      "Aujourd'hui, ose montrer ta beauté sans attendre d'avoir tout réuni. Comme le kapokier, fleuris à contretemps.",
    vertus: ['Fleurs comestibles pour sauces', 'Kapok des fruits pour rembourrage', 'Écorce médicinale', 'Bois léger'],
    usagesTraditionnels: ['Sauce de fleurs séchées', 'Rembourrage de kapok', 'Soins traditionnels', 'Calendrier saisonnier'],
  },

  {
    id: 'ebene',
    nom: 'Ébénier d\'Afrique',
    nomAnglais: 'African Ebony',
    nomScientifique: 'Diospyros mespiliformis',
    categorie: 'Arbres Sacrés',
    element: 'Terre',
    description:
      "L'Ébénier d'Afrique, ou jackalberry, est un arbre majestueux au bois noir précieux et à la cime dense et sombre. Ses petits fruits jaunes sucrés régalent hommes et animaux. Souvent associé aux termitières qui l'arrosent de leurs galeries, il atteint un grand âge et inspire un respect mêlé de crainte sacrée.",
    symboliqueAfricaine:
      "Dans de nombreuses traditions ouest-africaines, l'Ébénier est un arbre habité : ses ombres profondes abritent les esprits, et son bois noir, rare et dur, sert à sculpter masques et objets sacrés. On ne s'y endort pas sans précaution. C'est l'arbre du mystère, de la noblesse cachée et du lien avec l'invisible.",
    symboliqueSpirirtuelle:
      "L'Ébénier enseigne la profondeur et la valeur de ce qui est sombre et dense. Son cœur noir, le plus précieux des bois, se forme lentement au centre de l'arbre. Il rappelle que les parties les plus obscures de nous-mêmes peuvent receler la matière la plus noble — à condition de la travailler avec patience.",
    symbolique: "Symbole de la noblesse cachée, de la profondeur sacrée et de la valeur du temps.",
    qualites: ['Profondeur', 'Noblesse intérieure', 'Solidité', 'Mystère', 'Maturité lente'],
    defauts: ['Gravité excessive', 'Opacité', 'Distance', 'Rigidité du cœur'],
    pouvoirs: ['Lien avec l\'invisible', 'Sculpture du sacré', 'Longévité', 'Densité de l\'âme'],
    enseignements: [
      "Le cœur le plus précieux se forme lentement, au plus profond",
      "Ce qui est sombre en toi peut devenir ta plus noble matière",
      "Le respect du mystère vaut mieux que la prétention de tout comprendre",
      "La vraie valeur résiste au temps et au tranchant",
    ],
    citation: "L'ébène le plus noir est au cœur de l'arbre — la noblesse se forge au plus profond et au plus lent.",
    proverbes: [
      "L'ébène le plus noir est au cœur de l'arbre — la noblesse se forge au plus profond et au plus lent.",
      "On sculpte le masque dans l'ébénier : le sacré aime le bois qui a duré.",
      "Sous l'ébénier, baisse la voix — toutes les ombres ne sont pas vides.",
    ],
    legendes: [
      "Les conteurs disent que le premier roi sculpta son trône dans l'ébénier parce que ce bois, comme le pouvoir véritable, ne se forme qu'avec le temps et résiste à toutes les lames. Quand le roi mourut, son esprit se retira dans un ébénier près du village, et depuis on dit que les arbres les plus sombres gardent la mémoire des grands.",
    ],
    conseilsDeVie: [
      "Accepte que tes plus belles qualités demandent du temps pour mûrir.",
      "Explore tes zones d'ombre : elles contiennent souvent ta plus grande richesse.",
      "Respecte ce que tu ne comprends pas encore.",
    ],
    niveauSpirituel: 5,
    regionOrigine: "Savanes et galeries — Afrique de l'Ouest et soudano-sahélienne",
    couleur: '#3A2A1E',
    couleurSecondaire: '#1E140C',
    enseignementDuJour:
      "Aujourd'hui, honore la lenteur d'une chose qui mûrit en toi. Comme l'ébène, ta noblesse se forme au plus profond.",
    vertus: ['Bois noir précieux', 'Fruits sucrés comestibles', 'Écorce et feuilles médicinales', 'Longévité remarquable'],
    usagesTraditionnels: ['Sculpture de masques et objets sacrés', 'Fruit consommé', 'Remèdes contre la fièvre', 'Ébénisterie'],
  },

  /* ═══════════════════════════════════════════════════════════
     NOUVELLES PLANTES MÉDICINALES (extension)
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'pomme-sodome',
    nom: 'Pomme de Sodome',
    nomAnglais: 'Apple of Sodom',
    nomScientifique: 'Calotropis procera',
    categorie: 'Plantes Médicinales',
    element: 'Air',
    description:
      "La Pomme de Sodome — appelée Faftan en wolof — est un arbuste robuste aux grandes feuilles gris-vert et aux fleurs blanc-violet en couronne. Ses fruits verts gonflés d'air éclatent en libérant une soie cotonneuse. Toute la plante exsude un latex blanc puissant. Pionnière des sols dégradés, elle pousse là où la terre a été blessée.",
    symboliqueAfricaine:
      "Plante des lieux abandonnés et des décharges, le Faftan est paradoxal : méprisé comme mauvaise herbe, il est pourtant un remède puissant entre les mains des guérisseurs. Son latex traite les affections de la peau, ses feuilles chauffées apaisent les douleurs. On le dit « plante des marges » : celle que l'on néglige mais qui sauve.",
    symboliqueSpirirtuelle:
      "La Pomme de Sodome enseigne la valeur des êtres et des choses jugés indignes. Beauté de fleur et danger de latex, remède et poison à la fois, elle incarne l'ambivalence puissante : ce qui guérit peut blesser, ce qu'on rejette peut sauver. Elle invite à reconnaître la médecine cachée dans le marginal.",
    symbolique: "Symbole de la valeur des marges, de l'ambivalence puissante et de la médecine méprisée.",
    qualites: ['Résilience pionnière', 'Pouvoir de guérison', 'Force des marges', 'Adaptabilité', 'Ténacité'],
    defauts: ['Latex dangereux', 'Excès brûlant', 'Mauvaise réputation', 'Ambivalence trouble'],
    pouvoirs: ['Guérison de la peau', 'Régénération des sols', 'Médecine des marges', 'Force toxique maîtrisée'],
    enseignements: [
      "Ne méprise pas ce qui pousse dans les marges — il peut te guérir",
      "Le même pouvoir guérit ou blesse selon la mesure que tu en fais",
      "On peut fleurir là où la terre a été blessée",
      "La valeur ne dépend pas du regard des hommes",
    ],
    citation: "On l'appelle mauvaise herbe, mais le guérisseur sait : la Pomme de Sodome soigne ce que les beaux jardins ignorent.",
    proverbes: [
      "On l'appelle mauvaise herbe, mais le guérisseur sait : la Pomme de Sodome soigne ce que les beaux jardins ignorent.",
      "Le latex qui brûle est aussi celui qui guérit : tout est dans la main.",
      "La fleur naît même sur la terre que les hommes ont abandonnée.",
    ],
    legendes: [
      "On raconte qu'un guérisseur banni du village s'installa près d'une décharge où ne poussait que le Faftan. De cette plante méprisée, il tira des remèdes si efficaces que ceux qui l'avaient chassé revinrent le supplier. Il leur enseigna alors que rien n'est sans valeur, et que la médecine se cache souvent là où l'orgueil ne regarde pas.",
    ],
    conseilsDeVie: [
      "Cherche la valeur dans ce que les autres rejettent.",
      "Dose tes forces : ce qui te rend puissant peut aussi te nuire en excès.",
      "Tu peux renaître et fleurir même sur un terrain abîmé.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Sahel et zones sèches — toute l'Afrique de l'Ouest",
    couleur: '#9AA0B0',
    couleurSecondaire: '#5A6070',
    enseignementDuJour:
      "Aujourd'hui, regarde autrement une chose que tu méprisais : comme le Faftan, elle cache peut-être un remède.",
    vertus: ['Latex pour affections cutanées', 'Feuilles anti-inflammatoires', 'Pionnière des sols dégradés', 'Fibre de la soie des fruits'],
    usagesTraditionnels: ['Soins de la peau', 'Cataplasmes chauffés', 'Remèdes articulaires', 'Restauration des sols (à manier avec prudence)'],
  },

  {
    id: 'pourghere',
    nom: 'Pourghère',
    nomAnglais: 'Physic Nut',
    nomScientifique: 'Jatropha curcas',
    categorie: 'Plantes Médicinales',
    element: 'Feu',
    description:
      "La Pourghère — Tabanani en wolof — est un arbuste rustique aux larges feuilles lobées et aux fruits verts riches en huile. Plantée en haies vives autour des concessions et des champs, elle protège les cultures du bétail et fournit une huile servant au savon et à l'éclairage. Plante de la clôture et de la lumière domestique.",
    symboliqueAfricaine:
      "Dans les villages, la Pourghère trace les frontières : on la plante en haie pour délimiter et protéger. Son huile alimentait jadis les lampes des veillées et entre dans la fabrication du savon. Plante de la limite et du foyer, elle est associée à la protection de l'intimité familiale et à la lumière qui veille.",
    symboliqueSpirirtuelle:
      "La Pourghère enseigne la protection bienveillante et la lumière intérieure. Elle marque la frontière non pour exclure mais pour préserver ce qui est précieux, et de sa graine on tire la flamme qui éclaire les soirs. Elle incarne l'art de protéger son espace tout en restant source de clarté pour les siens.",
    symbolique: "Symbole de la protection du foyer, des limites bienveillantes et de la lumière intérieure.",
    qualites: ['Protection du foyer', 'Lumière intérieure', 'Rusticité', 'Délimitation saine', 'Utilité discrète'],
    defauts: ['Graines toxiques', 'Rigidité de la haie', 'Fermeture excessive'],
    pouvoirs: ['Protection des cultures', 'Lumière des veillées', 'Soins de la peau', 'Délimitation du sacré'],
    enseignements: [
      "Protège ce qui t'est précieux par des limites claires et vivantes",
      "De la même graine peut naître la lumière ou le poison — choisis l'usage",
      "Une frontière n'exclut pas : elle préserve",
      "Sois utile dans la discrétion, comme la haie qu'on remarque à peine",
    ],
    citation: "La Pourghère clôt le champ et éclaire la nuit — protéger et illuminer sont les deux visages d'un même amour.",
    proverbes: [
      "La Pourghère clôt le champ et éclaire la nuit — protéger et illuminer sont les deux visages d'un même amour.",
      "La haie de Tabanani garde le mil et donne la flamme : l'utile a mille visages.",
      "La graine qui éclaire est aussi celle qui empoisonne : sage est qui connaît la mesure.",
    ],
    legendes: [
      "On dit qu'une mère, ne pouvant veiller ses enfants dans le noir, pria pour une lumière. Au matin, une haie de Pourghère avait poussé autour de sa case ; de ses graines elle tira une huile qui brûla toute la nuit. Mais un esprit l'avertit : « Cette graine éclaire et empoisonne. Apprends la mesure. » Depuis, la Pourghère est l'arbre de la lumière sage.",
    ],
    conseilsDeVie: [
      "Délimite ton espace intime sans culpabilité : c'est une forme de respect de soi.",
      "Chaque don a son bon usage — apprends la juste mesure.",
      "Sois une lumière fiable pour tes proches, même dans la discrétion.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Toute l'Afrique de l'Ouest — haies villageoises",
    couleur: '#6E9A40',
    couleurSecondaire: '#42601F',
    enseignementDuJour:
      "Aujourd'hui, protège ton énergie par une limite claire, tout en restant une lumière pour ceux que tu aimes.",
    vertus: ['Huile pour savon et éclairage', 'Latex cicatrisant', 'Haie vive protectrice', 'Restauration des sols'],
    usagesTraditionnels: ['Haies de protection des champs', 'Fabrication de savon', 'Soins des plaies', 'Lampes traditionnelles'],
  },

  {
    id: 'goyavier',
    nom: 'Goyavier',
    nomAnglais: 'Guava',
    nomScientifique: 'Psidium guajava',
    categorie: 'Plantes Médicinales',
    element: 'Eau',
    description:
      "Le Goyavier est un petit arbre au tronc lisse qui pèle en plaques, aux feuilles aromatiques et aux fruits parfumés à la chair rose ou blanche. Adopté dans toute l'Afrique de l'Ouest, il est aimé pour ses fruits délicieux autant que pour ses feuilles, remède universel contre les maux de ventre des enfants comme des adultes.",
    symboliqueAfricaine:
      "Le Goyavier est l'arbre de la cour familiale, planté près des cases pour ses fruits que les enfants cueillent et ses feuilles que les mères font bouillir contre la diarrhée. Remède de première intention dans tous les foyers, il symbolise la santé domestique et le savoir des grands-mères transmis de génération en génération.",
    symboliqueSpirirtuelle:
      "Le Goyavier enseigne la guérison accessible et la générosité du quotidien. Il ne demande pas de rituel complexe : son fruit nourrit, sa feuille soigne, à portée de main. Il incarne la sagesse simple — le remède le plus précieux est souvent celui qui pousse dans ta propre cour.",
    symbolique: "Symbole de la santé domestique, du savoir des grands-mères et de la guérison à portée de main.",
    qualites: ['Générosité quotidienne', 'Guérison accessible', 'Douceur familiale', 'Fiabilité', 'Simplicité bienfaisante'],
    defauts: ['Banalité sous-estimée', 'Trop de discrétion', 'Tenu pour acquis'],
    pouvoirs: ['Soins du ventre', 'Nourriture douce', 'Santé de la famille', 'Remède de proximité'],
    enseignements: [
      "Le remède le plus précieux pousse souvent dans ta propre cour",
      "La guérison n'a pas besoin d'être compliquée pour être profonde",
      "Honore le savoir simple transmis par les anciens",
      "Ne tiens pas pour acquis ce qui te soigne chaque jour",
    ],
    citation: "Le Goyavier guérit dans la cour ce qu'on cherche au loin — la santé est plus proche qu'on ne croit.",
    proverbes: [
      "Le Goyavier guérit dans la cour ce qu'on cherche au loin — la santé est plus proche qu'on ne croit.",
      "La feuille de goyave de la grand-mère vaut mille remèdes du marché.",
      "Qui a un goyavier dans sa cour n'a pas à craindre le ventre de l'enfant.",
    ],
    legendes: [
      "On raconte qu'une grand-mère, voyant les villageois courir vers de lointains guérisseurs pour des maux bénins, fit pousser un goyavier au centre de la cour. « Tout ce que vous cherchez si loin, dit-elle, le ciel l'a mis ici, près du feu. » Depuis, on plante un goyavier à la naissance d'un enfant, pour que la santé reste à portée de main.",
    ],
    conseilsDeVie: [
      "Cherche d'abord les solutions simples et proches avant de courir au loin.",
      "Valorise le savoir transmis par les anciens de ta famille.",
      "Remercie ce qui te fait du bien au quotidien sans bruit.",
    ],
    niveauSpirituel: 2,
    regionOrigine: "Acclimaté dans toute l'Afrique de l'Ouest — cours familiales",
    couleur: '#8FB04A',
    couleurSecondaire: '#566A24',
    enseignementDuJour:
      "Aujourd'hui, reconnais une ressource simple et proche que tu négligeais. Comme le goyavier, elle te veut du bien.",
    vertus: ['Fruit riche en vitamine C', 'Feuilles antidiarrhéiques', 'Décoction antiseptique', 'Apport nutritif'],
    usagesTraditionnels: ['Infusion de feuilles contre les maux de ventre', 'Fruit consommé frais', 'Bain de bouche', 'Soins des enfants'],
  },

  /* ═══════════════════════════════════════════════════════════
     NOUVELLES PLANTES ALIMENTAIRES (extension)
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'riz-africain',
    nom: 'Riz Africain',
    nomAnglais: 'African Rice',
    nomScientifique: 'Oryza glaberrima',
    categorie: 'Plantes Alimentaires',
    element: 'Eau',
    description:
      "Le Riz Africain est la céréale native domestiquée il y a plus de trois mille ans dans le delta intérieur du Niger — bien avant l'arrivée du riz asiatique. Plus rustique, résistant aux inondations et aux sols pauvres, il porte des grains rougeâtres. Il est le grain-mère de la civilisation rizicole ouest-africaine, fierté des peuples du fleuve.",
    symboliqueAfricaine:
      "Chez les Diola, les Mandingues et les peuples du fleuve, le Riz Africain est sacré : grain des ancêtres, il accompagne les naissances, les mariages et les funérailles. Les femmes diola en sont les gardiennes savantes, transmettant des variétés depuis des siècles. Il symbolise l'autonomie, la mémoire agricole et la dignité du terroir.",
    symboliqueSpirirtuelle:
      "Le Riz Africain enseigne la fierté des racines et la valeur de ce qui est ancestral. Face au grain venu d'ailleurs, il rappelle que ton propre héritage a sa noblesse et sa force. Il incarne la résilience identitaire : nourrir les siens avec le grain de ses propres ancêtres.",
    symbolique: "Symbole de l'héritage ancestral, de l'autonomie nourricière et de la fierté du terroir.",
    qualites: ['Fierté des racines', 'Résilience', 'Autonomie', 'Mémoire vivante', 'Endurance'],
    defauts: ['Rendement modeste', 'Attachement rigide aux traditions', 'Repli identitaire'],
    pouvoirs: ['Nourriture sacrée', 'Mémoire agricole', 'Autonomie alimentaire', 'Lien aux ancêtres'],
    enseignements: [
      "Ton propre héritage a une noblesse que rien d'importé ne remplace",
      "Garde et transmets les semences des anciens — elles sont ta mémoire",
      "La résilience pousse mieux dans le sol de tes racines",
      "Nourris les tiens avec dignité et fierté de ce que tu es",
    ],
    citation: "Le Riz Africain a nourri nos ancêtres avant tout autre — qui connaît son grain connaît son nom.",
    proverbes: [
      "Le Riz Africain a nourri nos ancêtres avant tout autre — qui connaît son grain connaît son nom.",
      "La femme qui garde la semence garde l'avenir du village.",
      "Le grain rouge du fleuve résiste à l'eau comme le peuple résiste au temps.",
    ],
    legendes: [
      "Les Diola racontent que les premières mères reçurent le grain rouge des mains des génies des rizières, à charge de ne jamais le perdre. De mère en fille, les variétés furent gardées comme des trésors vivants. On dit qu'une lignée qui perd ses semences perd sa mémoire — c'est pourquoi les gardiennes du riz sont honorées comme des prêtresses.",
    ],
    conseilsDeVie: [
      "Sois fier de tes origines : elles sont une force, pas un fardeau.",
      "Préserve et transmets ce que les anciens t'ont confié.",
      "Cultive ta résilience dans le terreau de ton identité.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Delta intérieur du Niger, Casamance, vallée du fleuve Sénégal",
    couleur: '#A8603A',
    couleurSecondaire: '#6A3A20',
    enseignementDuJour:
      "Aujourd'hui, honore une part de ton héritage. Comme le riz des ancêtres, elle te nourrit en profondeur.",
    vertus: ['Grain rustique nutritif', 'Résistant aux inondations', 'Riche en fer', 'Adapté aux sols pauvres'],
    usagesTraditionnels: ['Aliment de base sacré', 'Plats de cérémonie', 'Conservation des semences ancestrales', 'Rites agricoles'],
  },

  {
    id: 'aubergine-africaine',
    nom: 'Aubergine Africaine',
    nomAnglais: 'African Eggplant',
    nomScientifique: 'Solanum aethiopicum',
    categorie: 'Plantes Alimentaires',
    element: 'Terre',
    description:
      "L'Aubergine Africaine — Jaxatu en wolof, Gboma ailleurs — est un légume-fruit incontournable des marchés ouest-africains : de petites boules vertes striées de blanc, à la saveur franchement amère, que l'on cuit dans les sauces et les ragoûts. Ses feuilles aussi se consomment. Plante du goût qui ne ment pas, elle assume son amertume.",
    symboliqueAfricaine:
      "Présent dans le thiéboudienne et d'innombrables sauces, le Jaxatu est le légume de la vérité gustative : son amertume, loin d'être un défaut, équilibre les plats et « réveille » le foie selon la sagesse populaire. Il symbolise l'authenticité — ce qui est vrai n'est pas toujours doux, mais il fait du bien.",
    symboliqueSpirirtuelle:
      "L'Aubergine Africaine enseigne la valeur de l'amertume assumée et de la vérité qui soigne. Tout n'est pas sucre dans une vie pleine ; l'amer a sa place, il purifie et équilibre. Elle invite à accueillir les vérités difficiles qui, comme elle, ont un goût franc mais des vertus profondes.",
    symbolique: "Symbole de l'authenticité, de la vérité qui soigne et de l'amertume bénéfique.",
    qualites: ['Authenticité', 'Franchise', 'Équilibre', 'Vérité bienfaisante', 'Caractère'],
    defauts: ['Amertume rebutante', 'Dureté de ton', 'Excès de franchise'],
    pouvoirs: ['Équilibre des saveurs', 'Purification du corps', 'Vérité du goût', 'Stimulation de la digestion'],
    enseignements: [
      "L'amertume assumée vaut mieux que la douceur feinte",
      "Les vérités qui soignent ne sont pas toujours sucrées",
      "Un peu d'amer équilibre toute une vie trop douce",
      "Reste fidèle à ton goût propre, même s'il dérange",
    ],
    citation: "Le Jaxatu n'a pas honte de son amertume — il sait qu'elle équilibre le plat et réveille le corps.",
    proverbes: [
      "Le Jaxatu n'a pas honte de son amertume — il sait qu'elle équilibre le plat et réveille le corps.",
      "La sauce sans amertume manque de caractère, comme la vie sans vérité.",
      "Ce qui est amer à la bouche est parfois doux au ventre.",
    ],
    legendes: [
      "On raconte qu'un cuisinier du roi ne servait que des mets sucrés pour plaire. Le roi tomba malade de tant de douceur. Une vieille femme glissa du Jaxatu dans la marmite ; le roi grimaça, puis se sentit renaître. « L'amer aussi est un remède », dit-elle. Depuis, aucune grande sauce ne se fait sans une part d'amertume.",
    ],
    conseilsDeVie: [
      "Accueille les vérités difficiles : elles équilibrent et soignent.",
      "Assume ton caractère, même quand il n'est pas tout en douceur.",
      "Ne fuis pas l'amertume nécessaire au prix d'une fausse douceur.",
    ],
    niveauSpirituel: 2,
    regionOrigine: "Toute l'Afrique de l'Ouest — jardins et marchés",
    couleur: '#5E8A3A',
    couleurSecondaire: '#38531F',
    enseignementDuJour:
      "Aujourd'hui, accueille une vérité un peu amère : comme le Jaxatu, elle pourrait bien te faire du bien.",
    vertus: ['Fruit riche en fibres', 'Feuilles comestibles nutritives', 'Stimule la digestion', 'Faible en calories'],
    usagesTraditionnels: ['Sauces et ragoûts (thiéboudienne)', 'Feuilles en légume', 'Tonique digestif', 'Cuisine quotidienne'],
  },

  {
    id: 'calebasse',
    nom: 'Calebasse',
    nomAnglais: 'Bottle Gourd',
    nomScientifique: 'Lagenaria siceraria',
    categorie: 'Plantes Alimentaires',
    element: 'Eau',
    description:
      "La Calebasse est une plante grimpante aux grandes fleurs blanches nocturnes et aux fruits qui, une fois séchés et évidés, deviennent les récipients emblématiques de l'Afrique : bols, louches, instruments de musique, calebasses de lait. Jeune, le fruit se mange ; mûr et séché, il sert tout le quotidien. Plante de l'objet sacré et utile.",
    symboliqueAfricaine:
      "La calebasse est partout : on y sert le lait, on y bat le foura, on en fait la kora et le balafon, on l'offre lors des mariages. Symbole de l'hospitalité et du ventre maternel, elle contient et transmet. Donner à boire dans une calebasse, c'est offrir la vie. Elle est le contenant sacré de la culture ouest-africaine.",
    symboliqueSpirirtuelle:
      "La Calebasse enseigne l'art d'être un contenant : recevoir, garder, transmettre sans se rigidifier. Vide, elle devient utile ; pleine, elle nourrit. Elle incarne la disponibilité féconde — savoir accueillir ce qui passe par soi pour le redonner, comme la mère, le griot ou le sage.",
    symbolique: "Symbole de l'hospitalité, du ventre nourricier et de la transmission.",
    qualites: ['Hospitalité', 'Disponibilité', 'Capacité d\'accueil', 'Transmission', 'Polyvalence'],
    defauts: ['Vide si négligée', 'Fragilité une fois sèche', 'Dépendance au contenu'],
    pouvoirs: ['Contenant sacré', 'Hospitalité rituelle', 'Musique (kora, balafon)', 'Don de la vie'],
    enseignements: [
      "Sois un bon contenant : reçois, garde, puis redonne",
      "Le vide n'est pas un manque — c'est la place faite pour servir",
      "Offrir à boire, c'est offrir un peu de vie",
      "Ce qui passe par toi peut nourrir bien au-delà de toi",
    ],
    citation: "La calebasse vide n'est pas inutile — c'est elle qu'on remplit pour donner à boire au monde.",
    proverbes: [
      "La calebasse vide n'est pas inutile — c'est elle qu'on remplit pour donner à boire au monde.",
      "On reconnaît l'hôte à la calebasse qu'il tend, pas à la maison qu'il habite.",
      "La calebasse fêlée garde la mémoire de toute l'eau qu'elle a portée.",
    ],
    legendes: [
      "Un mythe dogon raconte que le monde lui-même fut conçu comme une calebasse : une moitié pour le ciel, une moitié pour la terre, et entre les deux toute la vie. C'est pourquoi la calebasse est sacrée — chaque fois qu'on y verse du lait, on rejoue la création, on remplit le monde de nourriture et d'hospitalité.",
    ],
    conseilsDeVie: [
      "Cultive ta capacité à accueillir les autres avec générosité.",
      "N'aie pas peur du vide : il te rend disponible à ce qui compte.",
      "Transmets ce que tu reçois plutôt que de le retenir.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Toute l'Afrique de l'Ouest — l'une des plus anciennes plantes cultivées",
    couleur: '#9AAE5A',
    couleurSecondaire: '#5E6E30',
    enseignementDuJour:
      "Aujourd'hui, sois une calebasse : accueille ce qui vient à toi et redonne-le généreusement aux autres.",
    vertus: ['Fruit jeune comestible', 'Récipient naturel', 'Instruments de musique', 'Graines oléagineuses'],
    usagesTraditionnels: ['Bols, louches et récipients', 'Kora, balafon, maracas', 'Calebasse de lait des cérémonies', 'Légume jeune en sauce'],
  },

  {
    id: 'madd',
    nom: 'Madd',
    nomAnglais: 'Saba Fruit',
    nomScientifique: 'Saba senegalensis',
    categorie: 'Plantes Alimentaires',
    element: 'Air',
    description:
      "Le Madd est une liane forestière vigoureuse qui s'enroule autour des grands arbres et porte des grappes de fruits ronds orange à la pulpe acidulée enveloppant de nombreuses graines. Fruit-roi de la brousse casamançaise, il fait fureur sur les marchés, consommé tel quel avec sel et piment ou transformé en jus et confitures. Liane de la convoitise gourmande.",
    symboliqueAfricaine:
      "En Casamance et au Sénégal, la saison du Madd est une fête : sa cueillette dans les forêts est un savoir, sa vente une économie. Liane qui grimpe vers la lumière en s'appuyant sur les autres, le Madd symbolise l'entraide ascendante et la débrouillardise joyeuse. On dit qu'il « ne monte jamais seul ».",
    symboliqueSpirirtuelle:
      "Le Madd enseigne l'art de s'élever en s'appuyant sur plus grand que soi, sans honte. La liane ne renie pas l'arbre qui la porte ; elle lui doit sa hauteur. Il incarne la réussite reconnaissante — atteindre la lumière en honorant ceux qui nous ont soutenus.",
    symbolique: "Symbole de l'entraide ascendante, de la débrouillardise et de la réussite reconnaissante.",
    qualites: ['Entraide', 'Persévérance ascendante', 'Reconnaissance', 'Débrouillardise', 'Joie de vivre'],
    defauts: ['Dépendance aux appuis', 'Opportunisme', 'Acidité excessive'],
    pouvoirs: ['Élévation par l\'appui', 'Abondance forestière', 'Économie de cueillette', 'Désaltération'],
    enseignements: [
      "S'élever en s'appuyant sur plus grand que soi n'a rien de honteux",
      "N'oublie jamais l'arbre qui t'a porté vers la lumière",
      "La réussite douce-amère se savoure mieux partagée",
      "Monte, mais reste reconnaissant de tes appuis",
    ],
    citation: "Le Madd grimpe vers le soleil en s'appuyant sur l'arbre — et n'oublie jamais à qui il doit sa hauteur.",
    proverbes: [
      "Le Madd grimpe vers le soleil en s'appuyant sur l'arbre — et n'oublie jamais à qui il doit sa hauteur.",
      "La liane qui renie son arbre tombe avec la première pluie.",
      "Le fruit du Madd réjouit le marché : la brousse aussi a ses trésors.",
    ],
    legendes: [
      "On raconte qu'une liane orgueilleuse voulut atteindre le ciel sans l'aide d'aucun arbre. Elle rampa, s'épuisa et sécha au sol. Une autre, humble, s'enroula autour d'un grand fromager et atteignit la lumière, couverte de fruits. Les hommes nommèrent celle-ci « Madd » et apprirent que nul ne s'élève vraiment seul.",
    ],
    conseilsDeVie: [
      "Accepte les appuis sur ton chemin : s'élever ensemble n'est pas une faiblesse.",
      "Honore ceux qui t'ont aidé à monter.",
      "Savoure les réussites, même quand elles ont un goût doux-amer.",
    ],
    niveauSpirituel: 3,
    regionOrigine: "Casamance, Sénégal, Mali, Guinée — forêts et savanes boisées",
    couleur: '#E08A2A',
    couleurSecondaire: '#9A5A12',
    enseignementDuJour:
      "Aujourd'hui, accepte un appui ou remercie ceux qui t'ont élevé. Comme le Madd, on monte mieux ensemble.",
    vertus: ['Fruit riche en vitamine C', 'Pulpe désaltérante', 'Source de revenus de cueillette', 'Graines comestibles'],
    usagesTraditionnels: ['Fruit consommé avec sel et piment', 'Jus, sirops et confitures', 'Commerce des marchés', 'En-cas de brousse'],
  },

  /* ═══════════════════════════════════════════════════════════
     NOUVELLES PLANTES RITUELLES (extension)
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'henne',
    nom: 'Henné',
    nomAnglais: 'Henna',
    nomScientifique: 'Lawsonia inermis',
    categorie: 'Plantes Rituelles',
    element: 'Feu',
    description:
      "Le Henné est un arbuste aux petites feuilles vertes et aux fleurs crème délicieusement parfumées, dont les feuilles séchées et broyées donnent une pâte teignant la peau et les cheveux d'un rouge-orangé profond. Bien plus qu'un cosmétique, il est l'art rituel du corps paré, présent dans toutes les grandes fêtes ouest-africaines et sahéliennes.",
    symboliqueAfricaine:
      "Du Sénégal au Niger, le henné pare les mains et les pieds des mariées, des fêtes religieuses et des naissances. Les motifs tracés sont un langage : protection, beauté, statut, vœux de fécondité. Appliquer le henné est un rite féminin de transmission et de soin. Il symbolise la beauté sacrée, la protection et les seuils de la vie.",
    symboliqueSpirirtuelle:
      "Le Henné enseigne que le corps peut devenir un autel et la beauté une prière. Sa teinte ne se révèle qu'avec le temps de pose, et s'efface lentement : il rappelle que la parure véritable est rituelle, patiente, et marque les passages. Il incarne la transformation visible des seuils sacrés.",
    symbolique: "Symbole de la beauté sacrée, de la protection et des passages de la vie.",
    qualites: ['Beauté rituelle', 'Protection', 'Patience', 'Soin de soi', 'Célébration'],
    defauts: ['Vanité possible', 'Attachement aux apparences', 'Marque éphémère'],
    pouvoirs: ['Protection des seuils', 'Parure sacrée', 'Soin de la peau et des cheveux', 'Marquage des passages'],
    enseignements: [
      "Le corps paré avec intention devient un lieu sacré",
      "La vraie beauté demande le temps de la pose et de la patience",
      "Marque tes passages : ils méritent d'être célébrés",
      "Prends soin de toi comme d'un autel, non par vanité mais par respect",
    ],
    citation: "Le Henné ne livre sa couleur qu'à qui sait attendre — la beauté sacrée n'est jamais pressée.",
    proverbes: [
      "Le Henné ne livre sa couleur qu'à qui sait attendre — la beauté sacrée n'est jamais pressée.",
      "Les mains au henné parlent sans mots : elles disent la fête et la protection.",
      "La couleur du henné s'efface, mais le passage qu'elle marque demeure.",
    ],
    legendes: [
      "La tradition raconte qu'une jeune épousée, craignant l'avenir, reçut des mains des anciennes le henné sur ses paumes. « Ces motifs te protègent, lui dirent-elles, et te rappellent que tu n'entres pas seule dans ta nouvelle vie. » Depuis, aucune mariée ne franchit le seuil sans le henné, scellant sur sa peau les vœux de tout un lignage.",
    ],
    conseilsDeVie: [
      "Célèbre et marque les grands passages de ta vie.",
      "Prends soin de ton corps avec intention et respect.",
      "Sache attendre : les belles choses se révèlent avec le temps.",
    ],
    niveauSpirituel: 4,
    regionOrigine: "Sahel et Afrique de l'Ouest — Sénégal, Mali, Niger, Mauritanie",
    couleur: '#A8442A',
    couleurSecondaire: '#6A2614',
    enseignementDuJour:
      "Aujourd'hui, marque un passage avec intention. Comme le henné, laisse à la beauté le temps de se révéler.",
    vertus: ['Teinture naturelle de la peau et des cheveux', 'Soin rafraîchissant', 'Antifongique cutané', 'Parfum des fleurs'],
    usagesTraditionnels: ['Motifs rituels des mariées', 'Fêtes religieuses et naissances', 'Soin des cheveux', 'Protection symbolique'],
  },

  {
    id: 'newbouldia',
    nom: 'Arbre de Vie',
    nomAnglais: 'African Tree of Life',
    nomScientifique: 'Newbouldia laevis',
    categorie: 'Plantes Rituelles',
    element: 'Air',
    description:
      "Le Newbouldia — Arbre de Vie, Akoko chez les Yoruba — est un petit arbre élancé aux feuilles luisantes et aux grappes de fleurs en trompette pourpre-rose. Très facile à bouturer, une simple branche plantée prend racine. Il est l'arbre rituel par excellence des peuples du golfe de Guinée, planté aux lieux sacrés, aux palais et aux sanctuaires.",
    symboliqueAfricaine:
      "Chez les Yoruba, Igbo, Edo et peuples voisins, l'Akoko est sacré : on couronne les rois et les chefs avec ses feuilles, on le plante aux sanctuaires et aux limites des terres sacrées, on l'utilise dans d'innombrables rituels de bénédiction, de protection et d'intronisation. Il symbolise la vie qui se perpétue, l'autorité légitime et la frontière du sacré.",
    symboliqueSpirirtuelle:
      "L'Arbre de Vie enseigne la régénération et la transmission du sacré : de la plus simple bouture renaît un arbre entier. Il incarne la vie indestructible et l'autorité qui se reçoit et se transmet. Là où il est planté, un seuil sacré s'établit entre l'ordinaire et le divin.",
    symbolique: "Symbole de la vie perpétuée, de l'autorité sacrée et du seuil entre les mondes.",
    qualites: ['Régénération', 'Autorité légitime', 'Sacralité', 'Transmission', 'Enracinement facile'],
    defauts: ['Gravité cérémonielle', 'Rigidité du rite', 'Distance du sacré'],
    pouvoirs: ['Bénédiction et protection', 'Intronisation des chefs', 'Délimitation du sacré', 'Régénération de la vie'],
    enseignements: [
      "De la plus petite bouture peut renaître une vie entière",
      "L'autorité véritable se reçoit, s'honore et se transmet",
      "Établis des seuils sacrés dans ta vie — des espaces à part",
      "La vie se perpétue à qui sait replanter ce qu'il a reçu",
    ],
    citation: "L'Akoko renaît d'une simple branche plantée — la vie sacrée ne meurt pas, elle se transmet.",
    proverbes: [
      "L'Akoko renaît d'une simple branche plantée — la vie sacrée ne meurt pas, elle se transmet.",
      "On couronne le roi de feuilles d'Akoko : l'autorité véritable est vivante, non de métal.",
      "Là où pousse l'Arbre de Vie, le sol devient seuil du sacré.",
    ],
    legendes: [
      "Les Yoruba racontent que lorsque les premiers rois descendirent du ciel, ils plantèrent l'Akoko pour marquer la terre de leur règne. L'arbre, planté d'une simple branche, prit aussitôt racine — signe que leur autorité était vivante et bénie. Depuis, nul roi n'est intronisé sans la feuille d'Akoko, et nul sanctuaire n'est fondé sans cet arbre.",
    ],
    conseilsDeVie: [
      "Crée dans ta vie des espaces sacrés, à l'écart du tumulte.",
      "Transmets ce que tu as reçu : c'est ainsi que la vie se perpétue.",
      "Honore l'autorité juste et exerce la tienne avec respect.",
    ],
    niveauSpirituel: 5,
    regionOrigine: "Golfe de Guinée — Nigéria, Bénin, Togo, Ghana, Côte d'Ivoire",
    couleur: '#8A3A6A',
    couleurSecondaire: '#54203F',
    enseignementDuJour:
      "Aujourd'hui, plante une intention nouvelle : comme l'Akoko, même un petit geste peut faire naître une vie entière.",
    vertus: ['Feuilles médicinales polyvalentes', 'Écorce fébrifuge', 'Bouturage très facile', 'Haie sacrée vivante'],
    usagesTraditionnels: ['Rituels d\'intronisation', 'Bénédictions et protections', 'Délimitation des lieux sacrés', 'Soins traditionnels'],
  },

  /* ═══════════════════════════════════════════════════════════
     NOUVELLE HERBE & GRAMINÉE (extension)
  ═══════════════════════════════════════════════════════════ */

  {
    id: 'andropogon',
    nom: 'Herbe à Paille',
    nomAnglais: 'Gamba Grass',
    nomScientifique: 'Andropogon gayanus',
    categorie: 'Herbes & Graminées',
    element: 'Air',
    description:
      "L'Herbe à Paille est une grande graminée vivace des savanes, formant de hautes touffes dorées qui ondulent sous le vent de saison sèche. Fourrage essentiel pour le bétail et matériau roi pour la toiture des cases et la confection des nattes, elle est l'herbe utile par excellence — celle qui abrite, nourrit et habille le quotidien rural.",
    symboliqueAfricaine:
      "Dans les villages sahéliens, l'Herbe à Paille couvre les toits, tresse les nattes, nourrit les troupeaux. Sa récolte rythme la saison sèche et rassemble les communautés. Humble mais indispensable, elle symbolise le travail collectif et la valeur des choses simples qui tiennent debout les maisons et les vies.",
    symboliqueSpirirtuelle:
      "L'Herbe à Paille enseigne la force de l'union et l'humilité de l'utile. Un brin seul casse, mais liés en bottes, les brins couvrent des toits et résistent aux vents. Elle incarne la solidarité tressée — la grandeur discrète de ceux qui, ensemble, abritent et soutiennent les autres.",
    symbolique: "Symbole de la solidarité, du travail collectif et de la grandeur des choses humbles.",
    qualites: ['Solidarité', 'Utilité humble', 'Souplesse', 'Endurance', 'Esprit collectif'],
    defauts: ['Fragilité isolée', 'Banalité méprisée', 'Effacement'],
    pouvoirs: ['Abri (toiture)', 'Nourriture du bétail', 'Tissage des nattes', 'Force du nombre'],
    enseignements: [
      "Un brin seul casse, mais liés en bottes, vous couvrez un toit",
      "La grandeur se cache souvent dans l'utile et l'humble",
      "C'est l'union qui transforme la paille fragile en abri solide",
      "Plie sous le vent plutôt que de rompre",
    ],
    citation: "Le brin de paille seul, le vent l'emporte — mais tressés ensemble, ils tiennent le toit du village.",
    proverbes: [
      "Le brin de paille seul, le vent l'emporte — mais tressés ensemble, ils tiennent le toit du village.",
      "L'herbe qui plie sous l'orage se relève ; l'arbre raide se brise.",
      "On méprise la paille jusqu'au jour où il pleut sur le toit.",
    ],
    legendes: [
      "On raconte qu'un brin de paille se plaignait d'être faible et inutile face aux grands arbres. Le vent vint et brisa les arbres orgueilleux, mais l'herbe souple plia et survécut. Puis les hommes la tressèrent pour couvrir leurs toits. « Voilà, dit le vent : ta force est dans l'union et la souplesse, non dans la raideur. »",
    ],
    conseilsDeVie: [
      "Cherche la force dans l'union plutôt que dans l'isolement.",
      "Ne méprise pas les tâches humbles : elles soutiennent l'essentiel.",
      "Apprends à plier dans l'adversité pour mieux te relever.",
    ],
    niveauSpirituel: 2,
    regionOrigine: "Savanes de toute l'Afrique de l'Ouest",
    couleur: '#C2A24A',
    couleurSecondaire: '#7E6624',
    enseignementDuJour:
      "Aujourd'hui, unis tes efforts à ceux des autres. Comme la paille tressée, ensemble vous tiendrez bon.",
    vertus: ['Fourrage nutritif du bétail', 'Matériau de toiture', 'Fibres pour nattes et cordes', 'Protection contre l\'érosion'],
    usagesTraditionnels: ['Toitures de chaume', 'Nattes et paniers tressés', 'Alimentation du bétail', 'Stabilisation des sols'],
  },
];

export const CATEGORIES: PlanteCategorie[] = [
  'Arbres Sacrés',
  'Plantes Médicinales',
  'Plantes Alimentaires',
  'Plantes Rituelles',
  'Herbes & Graminées',
  'Palmiers',
];

export function getPlanteById(id: string): Plante | undefined {
  return PLANTS.find((p) => p.id === id);
}

export const getAnimalById = getPlanteById;
export const ANIMALS = PLANTS;

export const PLANT_CRIS: Record<string, { nom: string; description: string }> = {};
