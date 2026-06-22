export type TotemAnimalId = 'kolatier' | 'baobab' | 'neem' | 'nere' | 'fromager' | 'moringa' | 'ronier';

export interface QuizOption {
  texte: string;
  scores: Partial<Record<TotemAnimalId, number>>;
  dimension: 'E' | 'O' | 'C' | 'A' | 'S';
}

export interface QuizQuestion {
  id: number;
  question: string;
  optionA: QuizOption;
  optionB: QuizOption;
  dimension: 'E' | 'O' | 'C' | 'A' | 'S';
  dimensionLabel: string;
}

export interface TotemResult {
  id: TotemAnimalId;
  nom: string;
  description: string;
  forces: string[];
  defis: string[];
  mantra: string;
  animalSecondaire: TotemAnimalId;
  couleur: string;
  profilDimensions: Record<'E' | 'O' | 'C' | 'A' | 'S', 'haut' | 'moyen' | 'bas'>;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [

  // D1 : EXTRAVERSION / LEADERSHIP (E)
  {
    id: 1,
    dimension: 'E',
    dimensionLabel: 'Leadership',
    question: "Face à un groupe sans direction claire, vous...",
    optionA: { texte: "Prenez naturellement les rênes et proposez une direction", scores: { kolatier: 2, fromager: 1 }, dimension: 'E' },
    optionB: { texte: "Observez d'abord, puis conseillez discrètement", scores: { baobab: 2, nere: 1 }, dimension: 'E' },
  },
  {
    id: 2,
    dimension: 'E',
    dimensionLabel: 'Leadership',
    question: "Après une longue journée sociale, vous ressentez...",
    optionA: { texte: "De l'énergie — le contact humain vous ressource", scores: { kolatier: 2, baobab: 1 }, dimension: 'E' },
    optionB: { texte: "Du besoin de solitude pour vous régénérer", scores: { neem: 2, moringa: 1 }, dimension: 'E' },
  },
  {
    id: 3,
    dimension: 'E',
    dimensionLabel: 'Leadership',
    question: "Votre façon d'influencer les autres est...",
    optionA: { texte: "Par la présence directe et l'audace visible", scores: { kolatier: 2, fromager: 1 }, dimension: 'E' },
    optionB: { texte: "Par la profondeur de votre sagesse et votre exemple silencieux", scores: { baobab: 2, ronier: 1 }, dimension: 'E' },
  },
  {
    id: 4,
    dimension: 'E',
    dimensionLabel: 'Leadership',
    question: "Votre rôle naturel dans un projet collectif est...",
    optionA: { texte: "Initiateur — vous lancez, mobilisez et portez l'élan", scores: { kolatier: 2, neem: 1 }, dimension: 'E' },
    optionB: { texte: "Ancre — vous assurez la continuité et la profondeur", scores: { baobab: 2, ronier: 1 }, dimension: 'E' },
  },

  // D2 : OUVERTURE / INTUITION (O)
  {
    id: 5,
    dimension: 'O',
    dimensionLabel: 'Intuition',
    question: "Quand vous devez prendre une décision importante, vous faites confiance à...",
    optionA: { texte: "Votre intuition profonde — quelque chose en vous sait", scores: { moringa: 2, nere: 1 }, dimension: 'O' },
    optionB: { texte: "L'observation rigoureuse et les faits vérifiables", scores: { fromager: 2, baobab: 1 }, dimension: 'O' },
  },
  {
    id: 6,
    dimension: 'O',
    dimensionLabel: 'Intuition',
    question: "Les rêves et les symboles sont pour vous...",
    optionA: { texte: "Des messages à décoder — ils portent une vérité cachée", scores: { nere: 2, moringa: 1 }, dimension: 'O' },
    optionB: { texte: "Des phénomènes intéressants, mais vous préférez le concret", scores: { kolatier: 1, ronier: 2 }, dimension: 'O' },
  },
  {
    id: 7,
    dimension: 'O',
    dimensionLabel: 'Intuition',
    question: "Face à l'inconnu, vous ressentez...",
    optionA: { texte: "Une fascination — l'inconnu est un espace à explorer", scores: { fromager: 2, moringa: 1 }, dimension: 'O' },
    optionB: { texte: "Une vigilance — il faut comprendre avant d'avancer", scores: { nere: 2, neem: 1 }, dimension: 'O' },
  },
  {
    id: 8,
    dimension: 'O',
    dimensionLabel: 'Intuition',
    question: "Votre rapport à la spiritualité est...",
    optionA: { texte: "Mystique et personnel — vous cherchez votre propre accès au sacré", scores: { nere: 2, moringa: 1 }, dimension: 'O' },
    optionB: { texte: "Ancré dans les traditions — vous respectez les formes transmises", scores: { baobab: 2, ronier: 1 }, dimension: 'O' },
  },

  // D3 : CONSCIENCIOSITÉ / ENDURANCE (C)
  {
    id: 9,
    dimension: 'C',
    dimensionLabel: 'Endurance',
    question: "Face à un objectif lointain et difficile, vous...",
    optionA: { texte: "Tenez le cap avec méthode, quelle que soit la durée", scores: { ronier: 2, baobab: 1 }, dimension: 'C' },
    optionB: { texte: "Adaptez votre trajectoire en chemin selon les opportunités", scores: { moringa: 2, fromager: 1 }, dimension: 'C' },
  },
  {
    id: 10,
    dimension: 'C',
    dimensionLabel: 'Endurance',
    question: "Votre énergie ressemble plutôt à...",
    optionA: { texte: "Une source constante et durable — vous êtes toujours là", scores: { ronier: 2, baobab: 1 }, dimension: 'C' },
    optionB: { texte: "Des éclairs intenses — vous donnez tout, puis vous vous retirez", scores: { kolatier: 2, neem: 1 }, dimension: 'C' },
  },
  {
    id: 11,
    dimension: 'C',
    dimensionLabel: 'Endurance',
    question: "Face à une règle injuste, vous...",
    optionA: { texte: "La respectez d'abord, puis cherchez à la changer par les voies légitimes", scores: { baobab: 2, ronier: 1 }, dimension: 'C' },
    optionB: { texte: "La contournez avec intelligence si votre mission le justifie", scores: { neem: 2, moringa: 1 }, dimension: 'C' },
  },
  {
    id: 12,
    dimension: 'C',
    dimensionLabel: 'Endurance',
    question: "La victoire, pour vous, ressemble à...",
    optionA: { texte: "Un marathon gagné par la constance et la discipline", scores: { ronier: 2, baobab: 1 }, dimension: 'C' },
    optionB: { texte: "Un instant parfait de précision au moment exact", scores: { neem: 2, fromager: 1 }, dimension: 'C' },
  },

  // D4 : AGRÉABILITÉ / COMMUNAUTÉ (A)
  {
    id: 13,
    dimension: 'A',
    dimensionLabel: 'Communauté',
    question: "La transmission de la sagesse à la génération suivante est pour vous...",
    optionA: { texte: "Une responsabilité sacrée — vous portez ce devoir profondément", scores: { baobab: 2, ronier: 1 }, dimension: 'A' },
    optionB: { texte: "Quelque chose que vous faites si l'autre est prêt à recevoir", scores: { fromager: 2, neem: 1 }, dimension: 'A' },
  },
  {
    id: 14,
    dimension: 'A',
    dimensionLabel: 'Communauté',
    question: "Quand quelqu'un de proche souffre, vous...",
    optionA: { texte: "Êtes immédiatement présent, avec chaleur et soutien actif", scores: { baobab: 2, kolatier: 1 }, dimension: 'A' },
    optionB: { texte: "Lui offrez la vérité dont il a besoin, même difficile à entendre", scores: { fromager: 2, nere: 1 }, dimension: 'A' },
  },
  {
    id: 15,
    dimension: 'A',
    dimensionLabel: 'Communauté',
    question: "Ce qui vous tient le plus à coeur est...",
    optionA: { texte: "Le bien-être et la cohésion de votre cercle proche", scores: { baobab: 2, kolatier: 1 }, dimension: 'A' },
    optionB: { texte: "Votre propre mission et ce que vous devez accomplir seul", scores: { neem: 2, moringa: 1 }, dimension: 'A' },
  },
  {
    id: 16,
    dimension: 'A',
    dimensionLabel: 'Communauté',
    question: "Votre rapport à la mémoire des ancêtres est...",
    optionA: { texte: "Central — ils vivent en vous, vous leur rendez des comptes", scores: { baobab: 2, nere: 1 }, dimension: 'A' },
    optionB: { texte: "Respectueux, mais vous tracez avant tout votre propre chemin", scores: { fromager: 2, moringa: 1 }, dimension: 'A' },
  },

  // D5 : STABILITÉ / ADAPTABILITÉ (S)
  {
    id: 17,
    dimension: 'S',
    dimensionLabel: 'Transformation',
    question: "Un bouleversement majeur dans votre vie vous amène à...",
    optionA: { texte: "Vous transformer profondément — vous n'êtes plus le même après", scores: { moringa: 2, fromager: 1 }, dimension: 'S' },
    optionB: { texte: "Vous ancrer plus profondément dans vos valeurs fondamentales", scores: { nere: 2, ronier: 1 }, dimension: 'S' },
  },
  {
    id: 18,
    dimension: 'S',
    dimensionLabel: 'Transformation',
    question: "Votre identité au fil des années est...",
    optionA: { texte: "En évolution constante — vous vous réinventez par cycles", scores: { moringa: 2, neem: 1 }, dimension: 'S' },
    optionB: { texte: "Stable et cohérente — vous approfondissez ce que vous êtes", scores: { ronier: 2, baobab: 1 }, dimension: 'S' },
  },
  {
    id: 19,
    dimension: 'S',
    dimensionLabel: 'Transformation',
    question: "Face à l'échec, votre premier mouvement est...",
    optionA: { texte: "Chercher une voie entièrement nouvelle, différente de l'ancienne", scores: { moringa: 2, fromager: 1 }, dimension: 'S' },
    optionB: { texte: "Repartir avec plus de force sur le même chemin", scores: { kolatier: 2, neem: 1 }, dimension: 'S' },
  },
  {
    id: 20,
    dimension: 'S',
    dimensionLabel: 'Transformation',
    question: "Votre rapport au passé est...",
    optionA: { texte: "Vous vous en libérez — chaque cycle vous allège", scores: { moringa: 2, neem: 1 }, dimension: 'S' },
    optionB: { texte: "Vous le portez avec vous — il est une ressource, pas un poids", scores: { baobab: 2, nere: 1 }, dimension: 'S' },
  },
];

export const TOTEM_RESULTS: Record<TotemAnimalId, TotemResult> = {
  kolatier: {
    id: 'kolatier',
    nom: 'Kolatier',
    description: "Votre profil révèle un fort leadership social et un sens de l'hospitalité sacrée, traits associés au Kolatier dans les traditions mandingues et akan. Le Kolatier est l'arbre de l'alliance — il rassemble, scelle les accords et crée des ponts là où il y avait des distances.",
    forces: ["Leadership chaleureux et fédérateur", "Art de la relation et de l'alliance", "Présence mobilisatrice", "Sens du rassemblement"],
    defis: ["Disperser son énergie dans trop de liens", "Difficulté à agir seul sans validation", "Fatigue de la représentation constante"],
    mantra: "Je crée des liens sacrés et je rassemble autour de moi ce qui doit s'unir.",
    animalSecondaire: 'fromager',
    couleur: '#D4A017',
    profilDimensions: { E: 'haut', O: 'bas', C: 'moyen', A: 'haut', S: 'moyen' },
  },
  baobab: {
    id: 'baobab',
    nom: 'Baobab',
    description: "Votre profil révèle une sagesse profonde et un sens aigu de la mémoire collective, traits que les traditions mandingues et wolof associent au Grand Baobab. Arbre des ancêtres, gardien des villages, il symbolise la sagesse qui grandit dans la durée et le service silencieux.",
    forces: ["Sagesse ancestrale et mémoire collective", "Sens de la justice et de la continuité", "Stabilité émotionnelle profonde", "Générosité sans calcul"],
    defis: ["Résistance aux changements rapides", "Difficulté à lâcher ce qui appartient au passé", "Lenteur dans les décisions urgentes"],
    mantra: "Je porte la mémoire de mon peuple et j'en fais une force pour demain.",
    animalSecondaire: 'ronier',
    couleur: '#8B4513',
    profilDimensions: { E: 'moyen', O: 'bas', C: 'haut', A: 'haut', S: 'haut' },
  },
  neem: {
    id: 'neem',
    nom: 'Neem',
    description: "Votre profil révèle une haute précision et une autonomie intérieure, caractéristiques du Neem dans les traditions sahéliennes. Protecteur discret, purificateur des espaces, il agit par sa simple présence — sans bruit, sans violence, avec une efficacité redoutable.",
    forces: ["Précision et discernement remarquables", "Autonomie et maîtrise de soi", "Protection naturelle de l'espace", "Efficacité sans ostentation"],
    defis: ["Tendance à l'isolement par excès de pureté", "Difficulté à tolérer les imperfections", "Perfectionnisme parfois paralysant"],
    mantra: "J'agis avec précision et je protège ce qui est sacré par ma seule présence.",
    animalSecondaire: 'moringa',
    couleur: '#2C5F2E',
    profilDimensions: { E: 'bas', O: 'moyen', C: 'haut', A: 'bas', S: 'moyen' },
  },
  nere: {
    id: 'nere',
    nom: 'Néré',
    description: "Votre profil révèle une ouverture mystique profonde et une stabilité enracinée, attributs du Néré dans les traditions bambara et peule. Arbre de l'abondance contre-cyclique, il fleurit quand tout le reste se tait et nourrit la communauté dans les temps difficiles.",
    forces: ["Vision mystique et lecture des profondeurs", "Patience stratégique et longue vue", "Abondance dans l'adversité", "Connaissance des cycles"],
    defis: ["Difficulté à communiquer sa profondeur intérieure", "Méfiance envers ce qui est superficiel", "Risque d'incompréhension sociale"],
    mantra: "Je plonge dans les profondeurs et j'en remonte la sagesse nourricière.",
    animalSecondaire: 'moringa',
    couleur: '#5C7A3E',
    profilDimensions: { E: 'bas', O: 'haut', C: 'moyen', A: 'moyen', S: 'haut' },
  },
  fromager: {
    id: 'fromager',
    nom: 'Fromager',
    description: "Votre profil révèle une vision transcendante et une ouverture spirituelle rare, traits que les traditions yoruba et akan associent au Fromager sacré. Axe du monde, demeure des esprits, il voit ce que les autres ne peuvent apercevoir depuis le sol.",
    forces: ["Vision transcendante et stratégique", "Connexion spirituelle profonde", "Capacité à percevoir les patterns cachés", "Hauteur de vue naturelle"],
    defis: ["Détachement excessif du quotidien concret", "Difficulté à s'ancrer dans le présent", "Isolement dans les hauteurs spirituelles"],
    mantra: "Je m'élève pour voir la vérité complète et je redescends pour la mettre au service des autres.",
    animalSecondaire: 'kolatier',
    couleur: '#4A7A4A',
    profilDimensions: { E: 'haut', O: 'haut', C: 'moyen', A: 'moyen', S: 'moyen' },
  },
  moringa: {
    id: 'moringa',
    nom: 'Moringa',
    description: "Votre profil révèle une haute capacité de transformation et une adaptabilité profonde, marque du Moringa dans les traditions haoussa et mandingue. L'Arbre Miraculeux se transforme, guérit, nourrit — chaque phase de vie est une renaissance plus puissante.",
    forces: ["Capacité de transformation profonde", "Polyvalence et adaptabilité sacrée", "Guérison et renaissance par la métamorphose", "Résilience indestructible"],
    defis: ["Dispersion dans trop de directions à la fois", "Difficulté à maintenir les engagements sur le long terme", "Instabilité dans les phases de transition"],
    mantra: "Je me transforme dans chaque cycle et j'émerge plus puissant et plus nourrissant.",
    animalSecondaire: 'nere',
    couleur: '#5C7A3E',
    profilDimensions: { E: 'bas', O: 'haut', C: 'bas', A: 'bas', S: 'bas' },
  },
  ronier: {
    id: 'ronier',
    nom: 'Rônier',
    description: "Votre profil révèle une endurance et une générosité constantes, valeurs incarnées par le Rônier dans les traditions sahéliennes. Il porte le monde sur lui sans vaciller, donne sans compter et continue à produire même dans les conditions les plus arides.",
    forces: ["Endurance et constance incomparables", "Générosité totale et service profond", "Fiabilité et engagement sans faille", "Majesté tranquille dans l'adversité"],
    defis: ["Résistance au changement rapide", "Difficulté à recevoir autant qu'à donner", "Épuisement par excès de service"],
    mantra: "Je donne sans compter et je persévère avec la majesté de celui qui sait pourquoi il sert.",
    animalSecondaire: 'baobab',
    couleur: '#8B4513',
    profilDimensions: { E: 'bas', O: 'bas', C: 'haut', A: 'moyen', S: 'haut' },
  },
};

export type QuizAnswers = Record<number, 'A' | 'B'>;

export function calculateTotem(answers: QuizAnswers): {
  primary: TotemAnimalId;
  secondary: TotemAnimalId;
  scores: Record<TotemAnimalId, number>;
  dimensionScores: Record<'E' | 'O' | 'C' | 'A' | 'S', number>;
} {
  const scores: Record<TotemAnimalId, number> = {
    kolatier: 0, baobab: 0, neem: 0,
    nere: 0, fromager: 0, moringa: 0, ronier: 0,
  };

  const dimensionScores: Record<'E' | 'O' | 'C' | 'A' | 'S', number> = {
    E: 0, O: 0, C: 0, A: 0, S: 0,
  };

  QUIZ_QUESTIONS.forEach((q) => {
    const answer = answers[q.id];
    if (!answer) return;
    const option = answer === 'A' ? q.optionA : q.optionB;
    (Object.entries(option.scores) as [TotemAnimalId, number][]).forEach(([id, pts]) => {
      scores[id] += pts;
    });
  });

  QUIZ_QUESTIONS.forEach((q) => {
    const answer = answers[q.id];
    if (!answer) return;
    const option = answer === 'A' ? q.optionA : q.optionB;
    const primary = (Object.entries(option.scores) as [TotemAnimalId, number][])
      .sort((a, b) => b[1] - a[1])[0];
    if (primary) {
      dimensionScores[q.dimension] += primary[1];
    }
  });

  const sorted = (Object.entries(scores) as [TotemAnimalId, number][]).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0][0];

  const primaryProfile = TOTEM_RESULTS[primary].profilDimensions;
  let secondary = sorted[1][0];

  for (let i = 1; i < sorted.length; i++) {
    const candidate = sorted[i][0];
    const candidateProfile = TOTEM_RESULTS[candidate].profilDimensions;
    const differences = (['E', 'O', 'C', 'A', 'S'] as const).filter(
      (d) => primaryProfile[d] !== candidateProfile[d]
    ).length;
    if (differences >= 2) {
      secondary = candidate;
      break;
    }
  }

  return { primary, secondary, scores, dimensionScores };
}
