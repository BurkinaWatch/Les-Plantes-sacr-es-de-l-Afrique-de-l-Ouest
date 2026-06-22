export type TotemAnimalId = 'lion' | 'elephant' | 'leopard' | 'crocodile' | 'aigle' | 'serpent' | 'tortue';

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
    optionA: { texte: "Prenez naturellement les rênes et proposez une direction", scores: { lion: 2, aigle: 1 }, dimension: 'E' },
    optionB: { texte: "Observez d'abord, puis conseillez discrètement", scores: { elephant: 2, crocodile: 1 }, dimension: 'E' },
  },
  {
    id: 2,
    dimension: 'E',
    dimensionLabel: 'Leadership',
    question: "Après une longue journée sociale, vous ressentez...",
    optionA: { texte: "De l'énergie — le contact humain vous ressource", scores: { lion: 2, elephant: 1 }, dimension: 'E' },
    optionB: { texte: "Du besoin de solitude pour vous régénérer", scores: { leopard: 2, serpent: 1 }, dimension: 'E' },
  },
  {
    id: 3,
    dimension: 'E',
    dimensionLabel: 'Leadership',
    question: "Votre façon d'influencer les autres est...",
    optionA: { texte: "Par la présence directe et l'audace visible", scores: { lion: 2, aigle: 1 }, dimension: 'E' },
    optionB: { texte: "Par la profondeur de votre sagesse et votre exemple silencieux", scores: { elephant: 2, tortue: 1 }, dimension: 'E' },
  },
  {
    id: 4,
    dimension: 'E',
    dimensionLabel: 'Leadership',
    question: "Votre rôle naturel dans un projet collectif est...",
    optionA: { texte: "Initiateur — vous lancez, mobilisez et portez l'élan", scores: { lion: 2, leopard: 1 }, dimension: 'E' },
    optionB: { texte: "Ancre — vous assurez la continuité et la profondeur", scores: { elephant: 2, tortue: 1 }, dimension: 'E' },
  },

  // D2 : OUVERTURE / INTUITION (O)
  {
    id: 5,
    dimension: 'O',
    dimensionLabel: 'Intuition',
    question: "Quand vous devez prendre une décision importante, vous faites confiance à...",
    optionA: { texte: "Votre intuition profonde — quelque chose en vous sait", scores: { serpent: 2, crocodile: 1 }, dimension: 'O' },
    optionB: { texte: "L'observation rigoureuse et les faits vérifiables", scores: { aigle: 2, elephant: 1 }, dimension: 'O' },
  },
  {
    id: 6,
    dimension: 'O',
    dimensionLabel: 'Intuition',
    question: "Les rêves et les symboles sont pour vous...",
    optionA: { texte: "Des messages à décoder — ils portent une vérité cachée", scores: { crocodile: 2, serpent: 1 }, dimension: 'O' },
    optionB: { texte: "Des phénomènes intéressants, mais vous préférez le concret", scores: { lion: 1, tortue: 2 }, dimension: 'O' },
  },
  {
    id: 7,
    dimension: 'O',
    dimensionLabel: 'Intuition',
    question: "Face à l'inconnu, vous ressentez...",
    optionA: { texte: "Une fascination — l'inconnu est un espace à explorer", scores: { aigle: 2, serpent: 1 }, dimension: 'O' },
    optionB: { texte: "Une vigilance — il faut comprendre avant d'avancer", scores: { crocodile: 2, leopard: 1 }, dimension: 'O' },
  },
  {
    id: 8,
    dimension: 'O',
    dimensionLabel: 'Intuition',
    question: "Votre rapport à la spiritualité est...",
    optionA: { texte: "Mystique et personnel — vous cherchez votre propre accès au sacré", scores: { crocodile: 2, serpent: 1 }, dimension: 'O' },
    optionB: { texte: "Ancré dans les traditions — vous respectez les formes transmises", scores: { elephant: 2, tortue: 1 }, dimension: 'O' },
  },

  // D3 : CONSCIENCIOSITÉ / ENDURANCE (C)
  {
    id: 9,
    dimension: 'C',
    dimensionLabel: 'Endurance',
    question: "Face à un objectif lointain et difficile, vous...",
    optionA: { texte: "Tenez le cap avec méthode, quelle que soit la durée", scores: { tortue: 2, elephant: 1 }, dimension: 'C' },
    optionB: { texte: "Adaptez votre trajectoire en chemin selon les opportunités", scores: { serpent: 2, aigle: 1 }, dimension: 'C' },
  },
  {
    id: 10,
    dimension: 'C',
    dimensionLabel: 'Endurance',
    question: "Votre énergie ressemble plutôt à...",
    optionA: { texte: "Une source constante et durable — vous êtes toujours là", scores: { tortue: 2, elephant: 1 }, dimension: 'C' },
    optionB: { texte: "Des éclairs intenses — vous donnez tout, puis vous vous retirez", scores: { lion: 2, leopard: 1 }, dimension: 'C' },
  },
  {
    id: 11,
    dimension: 'C',
    dimensionLabel: 'Endurance',
    question: "Face à une règle injuste, vous...",
    optionA: { texte: "La respectez d'abord, puis cherchez à la changer par les voies légitimes", scores: { elephant: 2, tortue: 1 }, dimension: 'C' },
    optionB: { texte: "La contournez avec intelligence si votre mission le justifie", scores: { leopard: 2, serpent: 1 }, dimension: 'C' },
  },
  {
    id: 12,
    dimension: 'C',
    dimensionLabel: 'Endurance',
    question: "La victoire, pour vous, ressemble à...",
    optionA: { texte: "Un marathon gagné par la constance et la discipline", scores: { tortue: 2, elephant: 1 }, dimension: 'C' },
    optionB: { texte: "Un instant parfait de précision au moment exact", scores: { leopard: 2, aigle: 1 }, dimension: 'C' },
  },

  // D4 : AGRÉABILITÉ / COMMUNAUTÉ (A)
  {
    id: 13,
    dimension: 'A',
    dimensionLabel: 'Communauté',
    question: "La transmission de la sagesse à la génération suivante est pour vous...",
    optionA: { texte: "Une responsabilité sacrée — vous portez ce devoir profondément", scores: { elephant: 2, tortue: 1 }, dimension: 'A' },
    optionB: { texte: "Quelque chose que vous faites si l'autre est prêt à recevoir", scores: { aigle: 2, leopard: 1 }, dimension: 'A' },
  },
  {
    id: 14,
    dimension: 'A',
    dimensionLabel: 'Communauté',
    question: "Quand quelqu'un de proche souffre, vous...",
    optionA: { texte: "Êtes immédiatement présent, avec chaleur et soutien actif", scores: { elephant: 2, lion: 1 }, dimension: 'A' },
    optionB: { texte: "Lui offrez la vérité dont il a besoin, même difficile à entendre", scores: { aigle: 2, crocodile: 1 }, dimension: 'A' },
  },
  {
    id: 15,
    dimension: 'A',
    dimensionLabel: 'Communauté',
    question: "Ce qui vous tient le plus à coeur est...",
    optionA: { texte: "Le bien-être et la cohésion de votre cercle proche", scores: { elephant: 2, lion: 1 }, dimension: 'A' },
    optionB: { texte: "Votre propre mission et ce que vous devez accomplir seul", scores: { leopard: 2, serpent: 1 }, dimension: 'A' },
  },
  {
    id: 16,
    dimension: 'A',
    dimensionLabel: 'Communauté',
    question: "Votre rapport à la mémoire des ancêtres est...",
    optionA: { texte: "Central — ils vivent en vous, vous leur rendez des comptes", scores: { elephant: 2, crocodile: 1 }, dimension: 'A' },
    optionB: { texte: "Respectueux, mais vous tracez avant tout votre propre chemin", scores: { aigle: 2, serpent: 1 }, dimension: 'A' },
  },

  // D5 : STABILITÉ / ADAPTABILITÉ (S)
  {
    id: 17,
    dimension: 'S',
    dimensionLabel: 'Transformation',
    question: "Un bouleversement majeur dans votre vie vous amène à...",
    optionA: { texte: "Vous transformer profondément — vous n'êtes plus le même après", scores: { serpent: 2, aigle: 1 }, dimension: 'S' },
    optionB: { texte: "Vous ancrer plus profondément dans vos valeurs fondamentales", scores: { crocodile: 2, tortue: 1 }, dimension: 'S' },
  },
  {
    id: 18,
    dimension: 'S',
    dimensionLabel: 'Transformation',
    question: "Votre identité au fil des années est...",
    optionA: { texte: "En évolution constante — vous vous réinventez par cycles", scores: { serpent: 2, leopard: 1 }, dimension: 'S' },
    optionB: { texte: "Stable et cohérente — vous approfondissez ce que vous êtes", scores: { tortue: 2, elephant: 1 }, dimension: 'S' },
  },
  {
    id: 19,
    dimension: 'S',
    dimensionLabel: 'Transformation',
    question: "Face à l'échec, votre premier mouvement est...",
    optionA: { texte: "Chercher une voie entièrement nouvelle, différente de l'ancienne", scores: { serpent: 2, aigle: 1 }, dimension: 'S' },
    optionB: { texte: "Repartir avec plus de force sur le même chemin", scores: { lion: 2, leopard: 1 }, dimension: 'S' },
  },
  {
    id: 20,
    dimension: 'S',
    dimensionLabel: 'Transformation',
    question: "Votre rapport au passé est...",
    optionA: { texte: "Vous vous en libérez — chaque mue vous allège", scores: { serpent: 2, leopard: 1 }, dimension: 'S' },
    optionB: { texte: "Vous le portez avec vous — il est une ressource, pas un poids", scores: { elephant: 2, crocodile: 1 }, dimension: 'S' },
  },
];

export const TOTEM_RESULTS: Record<TotemAnimalId, TotemResult> = {
  lion: {
    id: 'lion',
    nom: 'Lion',
    description: "Votre profil révèle une forte extraversion et un leadership naturel, caractéristiques associées au Lion dans les traditions mandé du Mali. Le lion-roi (Simba) y symbolise la lumière solaire, la responsabilité du meneur et le courage au service du groupe — non le pouvoir pour lui-même.",
    forces: ["Leadership affirmé", "Courage sous pression", "Présence mobilisatrice", "Vision d'action directe"],
    defis: ["Gérer l'impatience face à la lenteur", "Laisser de la place aux autres voix", "Déléguer sans contrôle"],
    mantra: "Je guide avec force et je sers avec lumière.",
    animalSecondaire: 'aigle',
    couleur: '#D4A017',
    profilDimensions: { E: 'haut', O: 'bas', C: 'moyen', A: 'moyen', S: 'moyen' },
  },
  elephant: {
    id: 'elephant',
    nom: 'Éléphant',
    description: "Votre profil révèle une forte agréabilité et une mémoire collective profonde, traits qui définissent l'Éléphant dans les traditions akan (Ghana, Côte d'Ivoire). L'éléphant y est gardien des ancêtres et symbole d'Ubuntu — la sagesse qui s'accomplit dans et pour la communauté.",
    forces: ["Mémoire et continuité intergénérationnelle", "Sens profond de la justice", "Stabilité émotionnelle", "Soin du lien communautaire"],
    defis: ["Tendance à ruminer les blessures passées", "Difficulté à lâcher prise", "Lourdeur dans les décisions rapides"],
    mantra: "Je porte la mémoire de mon peuple et j'en fais une force.",
    animalSecondaire: 'tortue',
    couleur: '#5C7A3E',
    profilDimensions: { E: 'moyen', O: 'bas', C: 'haut', A: 'haut', S: 'haut' },
  },
  leopard: {
    id: 'leopard',
    nom: 'Léopard',
    description: "Votre profil révèle une conscienciosité élevée associée à une forte autonomie — signature du Léopard dans les sociétés initiatiques d'Afrique centrale et de l'Ouest (Poro, Sande). Le léopard y est l'initiateur solitaire, maître du passage entre les mondes et de la précision dans l'action.",
    forces: ["Précision et timing parfait", "Autonomie et maîtrise de soi", "Capacité à traverser les opposés", "Grâce dans l'action"],
    defis: ["Tendance à l'isolement excessif", "Difficulté à exposer sa vulnérabilité", "Perfectionnisme paralysant"],
    mantra: "J'agis au moment juste, avec la grâce qui m'appartient.",
    animalSecondaire: 'serpent',
    couleur: '#C4622D',
    profilDimensions: { E: 'bas', O: 'moyen', C: 'haut', A: 'bas', S: 'moyen' },
  },
  crocodile: {
    id: 'crocodile',
    nom: 'Crocodile',
    description: "Votre profil révèle une haute ouverture au symbolique et une stabilité primordiale — attributs du Crocodile dans les traditions fon du Bénin (gardien de Dan Ayido Hwedo). Il est l'être des frontières entre visible et invisible, gardien des eaux sacrées.",
    forces: ["Vision mystique et lecture des profondeurs", "Patience stratégique", "Ancrage dans les cycles longs", "Connaissance des passages"],
    defis: ["Difficulté à communiquer sa profondeur", "Méfiance excessive envers l'extérieur", "Risque d'isolement mystique"],
    mantra: "Je plonge dans les profondeurs et j'en remonte la sagesse du monde.",
    animalSecondaire: 'serpent',
    couleur: '#2E7D6B',
    profilDimensions: { E: 'bas', O: 'haut', C: 'moyen', A: 'moyen', S: 'haut' },
  },
  aigle: {
    id: 'aigle',
    nom: 'Aigle',
    description: "Votre profil révèle une extraversion orientée vers la vision d'ensemble et une forte ouverture, traits que les traditions yoruba (Nigeria) associent à l'aigle messager — intermédiaire entre les hommes et les Orishas. L'aigle voit ce que les autres ne peuvent pas voir depuis le sol.",
    forces: ["Vision transcendante et stratégique", "Liberté intérieure", "Capacité à percevoir les patterns cachés", "Connexion aux grandes perspectives"],
    defis: ["Détachement excessif du quotidien concret", "Difficulté à s'ancrer dans le présent", "Impatience envers la lenteur humaine"],
    mantra: "Je m'élève pour voir la vérité et je redescends pour la servir.",
    animalSecondaire: 'lion',
    couleur: '#4A6FA5',
    profilDimensions: { E: 'haut', O: 'haut', C: 'moyen', A: 'moyen', S: 'moyen' },
  },
  serpent: {
    id: 'serpent',
    nom: 'Serpent',
    description: "Votre profil révèle une haute ouverture au changement et une adaptabilité profonde — marque du Serpent dans les traditions yoruba (Oshumare) et fon (Damballa). Il est l'archétype de la renaissance cyclique : chaque mue est une mort symbolique suivie d'une naissance plus puissante.",
    forces: ["Capacité de transformation profonde", "Intuition aiguisée sur les cycles", "Renouveau et résilience par la métamorphose", "Sagesse de la guérison"],
    defis: ["Instabilité identitaire dans les phases de transition", "Difficulté à maintenir les engagements sur le long terme", "Tentation de fuir plutôt que d'affronter"],
    mantra: "Je me renouvelle dans chaque cycle et j'émerge plus conscient.",
    animalSecondaire: 'crocodile',
    couleur: '#7B4FA5',
    profilDimensions: { E: 'bas', O: 'haut', C: 'bas', A: 'bas', S: 'bas' },
  },
  tortue: {
    id: 'tortue',
    nom: 'Tortue',
    description: "Votre profil révèle une conscienciosité et une stabilité exceptionnelles — valeurs incarnées par la Tortue dans de nombreuses traditions africaines de l'Ouest, où elle est symbole de la Terre-Mère et de la sagesse des commencements. Elle porte le monde sur son dos sans vaciller.",
    forces: ["Endurance et constance incomparables", "Sagesse ancrée dans le temps long", "Fiabilité et engagement profond", "Protection naturelle de ce qui compte"],
    defis: ["Résistance au changement nécessaire", "Lenteur inadaptée aux urgences", "Repli sur soi protecteur mais isolant"],
    mantra: "J'avance avec constance et je porte le monde avec sérénité.",
    animalSecondaire: 'elephant',
    couleur: '#7A8C3A',
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
    lion: 0, elephant: 0, leopard: 0,
    crocodile: 0, aigle: 0, serpent: 0, tortue: 0,
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
