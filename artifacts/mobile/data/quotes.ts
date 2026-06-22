export interface Quote {
  id: string;
  texte: string;
  origine: string;
}

export const QUOTES: Quote[] = [
  {
    id: 'q1',
    texte: "Un homme qui ne sait pas d'où il vient ne saura jamais où il va.",
    origine: 'Sagesse yoruba',
  },
  {
    id: 'q2',
    texte: "Je suis parce que nous sommes.",
    origine: 'Ubuntu — Philosophie bantou',
  },
  {
    id: 'q3',
    texte: "Si tu veux aller vite, marche seul. Si tu veux aller loin, marche ensemble.",
    origine: 'Proverbe africain',
  },
  {
    id: 'q4',
    texte: "La forêt serait silencieuse si aucun oiseau ne chantait sauf celui qui chante le mieux.",
    origine: 'Sagesse mandingue',
  },
  {
    id: 'q5',
    texte: "Ce que les anciens ont vu debout, les jeunes ne peuvent le voir même assis sur un arbre.",
    origine: 'Proverbe ashanti',
  },
  {
    id: 'q6',
    texte: "L'eau douce ne se sait pas qu'elle est douce jusqu'à ce qu'on la compare à l'eau salée.",
    origine: 'Sagesse akan',
  },
  {
    id: 'q7',
    texte: "Une seule main ne peut pas applaudir.",
    origine: 'Proverbe wolof',
  },
  {
    id: 'q8',
    texte: "Les ancêtres ne meurent que lorsque les vivants les oublient.",
    origine: 'Tradition vodou fon',
  },
  {
    id: 'q9',
    texte: "L'enfant qui n'est pas élevé par tout le village sera détruit par ce même village.",
    origine: 'Sagesse africaine',
  },
  {
    id: 'q10',
    texte: "Le savoir est comme un jardin : si tu ne le cultives pas, tu ne peux pas le récolter.",
    origine: 'Proverbe guinéen',
  },
  {
    id: 'q11',
    texte: "Connais-toi toi-même et tu connaîtras tous les hommes.",
    origine: 'Sagesse bambara',
  },
  {
    id: 'q12',
    texte: "Un bon conteur n'a pas besoin de beaucoup de mots — il lui faut la vérité.",
    origine: 'Tradition griot',
  },
  {
    id: 'q13',
    texte: "La pluie ne tombe pas sur un seul toit.",
    origine: 'Proverbe bantou',
  },
  {
    id: 'q14',
    texte: "Celui qui n'a pas traversé la rivière ne sait pas si elle est profonde.",
    origine: 'Sagesse peule',
  },
  {
    id: 'q15',
    texte: "Le bois tordu peut devenir une belle sculpture entre les mains d'un maître.",
    origine: 'Tradition akan',
  },
];

export function getQuoteDuJour(): Quote {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
  );
  return QUOTES[dayOfYear % QUOTES.length];
}

export function getQuoteAleatoire(): Quote {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}
