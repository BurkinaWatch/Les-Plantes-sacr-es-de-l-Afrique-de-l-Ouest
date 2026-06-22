// ─────────────────────────────────────────────────────────────────────────────
// QUIZ — Big Five Inventory (BFI) adapté aux traditions botaniques d'Afrique de l'Ouest
// Méthode : échelle de Likert à 5 points + items inversés + correspondance par
// distance euclidienne (John & Srivastava, 1999 ; Costa & McCrae, 1992).
// ─────────────────────────────────────────────────────────────────────────────

export type TotemAnimalId = 'kolatier' | 'baobab' | 'neem' | 'nere' | 'fromager' | 'moringa' | 'ronier';

export interface QuizStatement {
  id: number;
  statement: string;
  dimension: 'E' | 'O' | 'C' | 'A' | 'S';
  dimensionLabel: string;
  reversed: boolean;
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
  profilDimensions: Record<'E' | 'O' | 'C' | 'A' | 'S', number>;
}

// ── 20 affirmations · 4 par dimension · 1 item inversé par dimension (★)
export const QUIZ_QUESTIONS: QuizStatement[] = [

  // D1 : EXTRAVERSION / LEADERSHIP (E)
  {
    id: 1,
    dimension: 'E',
    dimensionLabel: 'Leadership',
    statement: "Je prends naturellement les rênes quand un groupe manque de direction.",
    reversed: false,
  },
  {
    id: 2,
    dimension: 'E',
    dimensionLabel: 'Leadership',
    statement: "Le contact avec les autres me donne de l'énergie plutôt que de me fatiguer.",
    reversed: false,
  },
  {
    id: 3,
    dimension: 'E',
    dimensionLabel: 'Leadership',
    statement: "Je préfère rester en retrait et observer plutôt qu'intervenir en premier. ★",
    reversed: true,
  },
  {
    id: 4,
    dimension: 'E',
    dimensionLabel: 'Leadership',
    statement: "Mon influence sur les autres passe avant tout par ma présence directe et mon charisme.",
    reversed: false,
  },

  // D2 : OUVERTURE / INTUITION (O)
  {
    id: 5,
    dimension: 'O',
    dimensionLabel: 'Intuition',
    statement: "Je fais confiance à mon intuition pour les décisions importantes, même sans preuve tangible.",
    reversed: false,
  },
  {
    id: 6,
    dimension: 'O',
    dimensionLabel: 'Intuition',
    statement: "Les rêves, les symboles et le monde invisible m'interpellent profondément.",
    reversed: false,
  },
  {
    id: 7,
    dimension: 'O',
    dimensionLabel: 'Intuition',
    statement: "Je préfère les faits concrets et vérifiables aux interprétations symboliques. ★",
    reversed: true,
  },
  {
    id: 8,
    dimension: 'O',
    dimensionLabel: 'Intuition',
    statement: "Je cherche mon propre chemin spirituel plutôt que de suivre une tradition toute tracée.",
    reversed: false,
  },

  // D3 : CONSCIENCIOSITÉ / ENDURANCE (C)
  {
    id: 9,
    dimension: 'C',
    dimensionLabel: 'Endurance',
    statement: "Je tiens mes engagements jusqu'au bout, même quand les circonstances se compliquent.",
    reversed: false,
  },
  {
    id: 10,
    dimension: 'C',
    dimensionLabel: 'Endurance',
    statement: "Mon énergie est constante et durable — je suis fiable sur le long terme.",
    reversed: false,
  },
  {
    id: 11,
    dimension: 'C',
    dimensionLabel: 'Endurance',
    statement: "Je m'adapte facilement à un nouveau plan quand l'ancien ne fonctionne plus. ★",
    reversed: true,
  },
  {
    id: 12,
    dimension: 'C',
    dimensionLabel: 'Endurance',
    statement: "La discipline et la méthode sont au cœur de ma façon d'avancer.",
    reversed: false,
  },

  // D4 : AGRÉABILITÉ / COMMUNAUTÉ (A)
  {
    id: 13,
    dimension: 'A',
    dimensionLabel: 'Communauté',
    statement: "La transmission de la sagesse aux générations suivantes est une mission sacrée pour moi.",
    reversed: false,
  },
  {
    id: 14,
    dimension: 'A',
    dimensionLabel: 'Communauté',
    statement: "Quand quelqu'un de proche souffre, je suis immédiatement présent avec chaleur et soutien.",
    reversed: false,
  },
  {
    id: 15,
    dimension: 'A',
    dimensionLabel: 'Communauté',
    statement: "Ma mission personnelle prime souvent sur les attentes de mon entourage. ★",
    reversed: true,
  },
  {
    id: 16,
    dimension: 'A',
    dimensionLabel: 'Communauté',
    statement: "La mémoire de mes ancêtres guide activement mes choix de vie.",
    reversed: false,
  },

  // D5 : STABILITÉ / TRANSFORMATION (S)
  {
    id: 17,
    dimension: 'S',
    dimensionLabel: 'Transformation',
    statement: "Un bouleversement majeur me transforme profondément — je n'en ressors pas le même. ★",
    reversed: true,
  },
  {
    id: 18,
    dimension: 'S',
    dimensionLabel: 'Transformation',
    statement: "Mon identité reste stable et cohérente même dans les périodes de crise.",
    reversed: false,
  },
  {
    id: 19,
    dimension: 'S',
    dimensionLabel: 'Transformation',
    statement: "Face à l'échec, je reprends le même chemin avec plus de force plutôt que de tout recommencer.",
    reversed: false,
  },
  {
    id: 20,
    dimension: 'S',
    dimensionLabel: 'Transformation',
    statement: "Je porte mon passé comme une ressource précieuse qui me nourrit encore aujourd'hui.",
    reversed: false,
  },
];

// ── Profils totem (0–100 par dimension)
// Calibrés sur la symbolique ethnobotanique documentée de chaque espèce
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
    profilDimensions: { E: 85, O: 30, C: 50, A: 80, S: 50 },
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
    profilDimensions: { E: 50, O: 25, C: 80, A: 85, S: 80 },
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
    profilDimensions: { E: 20, O: 55, C: 85, A: 25, S: 55 },
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
    profilDimensions: { E: 20, O: 80, C: 50, A: 55, S: 80 },
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
    profilDimensions: { E: 75, O: 85, C: 50, A: 50, S: 50 },
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
    profilDimensions: { E: 25, O: 80, C: 25, A: 25, S: 20 },
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
    profilDimensions: { E: 20, O: 20, C: 85, A: 55, S: 80 },
  },
};

// ── Type de réponse : 1 (pas du tout d'accord) → 5 (tout à fait d'accord)
export type LikertValue = 1 | 2 | 3 | 4 | 5;
export type QuizAnswers = Record<number, LikertValue>;

const DIMS = ['E', 'O', 'C', 'A', 'S'] as const;
type Dim = typeof DIMS[number];

// ── Calcul par distance euclidienne (BFI standard)
export function calculateTotem(answers: QuizAnswers): {
  primary: TotemAnimalId;
  secondary: TotemAnimalId;
  scores: Record<TotemAnimalId, number>;
  dimensionScores: Record<Dim, number>;
} {
  // 1. Somme brute par dimension (avec inversion des items ★)
  const dimRaw: Record<Dim, number> = { E: 0, O: 0, C: 0, A: 0, S: 0 };
  const dimCount: Record<Dim, number> = { E: 0, O: 0, C: 0, A: 0, S: 0 };

  QUIZ_QUESTIONS.forEach((stmt) => {
    const raw = answers[stmt.id];
    if (raw == null) return;
    const corrected = stmt.reversed ? (6 - raw) : raw;
    dimRaw[stmt.dimension] += corrected;
    dimCount[stmt.dimension]++;
  });

  // 2. Normalisation 0–100
  //    min = count × 1, max = count × 5, range = count × 4
  const dimensionScores = {} as Record<Dim, number>;
  DIMS.forEach((d) => {
    const count = dimCount[d] || 4;
    const min = count * 1;
    const max = count * 5;
    dimensionScores[d] = Math.round(((dimRaw[d] - min) / (max - min)) * 100);
  });

  // 3. Distance euclidienne entre profil répondant et chaque totem
  //    Plus la distance est faible, plus le totem correspond
  const MAX_DIST = Math.sqrt(DIMS.length * 100 * 100); // ≈ 223.6
  const scores = {} as Record<TotemAnimalId, number>;

  (Object.entries(TOTEM_RESULTS) as [TotemAnimalId, TotemResult][]).forEach(([id, totem]) => {
    const dist = Math.sqrt(
      DIMS.reduce((acc, d) => acc + Math.pow(dimensionScores[d] - totem.profilDimensions[d], 2), 0)
    );
    scores[id] = Math.round((1 - dist / MAX_DIST) * 100);
  });

  // 4. Tri décroissant par score de similarité
  const sorted = (Object.entries(scores) as [TotemAnimalId, number][]).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0][0];
  const primaryProfile = TOTEM_RESULTS[primary].profilDimensions;

  // 5. Totem secondaire : profil suffisamment distinct (≥ 2 dims écartées de > 20 pts)
  let secondary = sorted[1][0];
  for (let i = 1; i < sorted.length; i++) {
    const candidate = sorted[i][0];
    const candidateProfile = TOTEM_RESULTS[candidate].profilDimensions;
    const largeDiffs = DIMS.filter(
      (d) => Math.abs(primaryProfile[d] - candidateProfile[d]) > 20
    ).length;
    if (largeDiffs >= 2) {
      secondary = candidate;
      break;
    }
  }

  return { primary, secondary, scores, dimensionScores };
}
