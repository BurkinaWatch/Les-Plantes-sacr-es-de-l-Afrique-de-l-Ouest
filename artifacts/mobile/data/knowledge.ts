export interface KnowledgeChapter {
  id: string;
  titre: string;
  sousTitre?: string;
  icon: string;
  page: number;
  sections: KnowledgeSection[];
}

export interface KnowledgeSection {
  type: 'paragraph' | 'quote' | 'list' | 'list-title';
  content: string;
  items?: string[];
}

export interface KnowledgeBook {
  id: string;
  titre: string;
  titreFr: string;
  auteur: string;
  annee: number;
  editeur: string;
  langue: string;
  langueEmoji: string;
  icon: string;
  couleur: string;
  description: string;
  isbn?: string;
  chapitres: KnowledgeChapter[];
}

/* ─────────────────────────────────────────────────────────
   LIVRE 1 — Karin-Beate Phillips (EN/DE, 2010)
───────────────────────────────────────────────────────── */
const PHILLIPS_CHAPTERS: KnowledgeChapter[] = [
  {
    id: 'introduction',
    titre: 'Introduction',
    icon: '◎',
    page: 9,
    sections: [
      {
        type: 'paragraph',
        content:
          "La croyance en les animaux ou les plantes est aussi ancienne que l'humanité et aussi actuelle que la spiritualité moderne. Elle embrasse tout ce qui est vivant comme des parties essentielles de nous-mêmes — comment nous nous rapportons à eux et comment ils se rapportent à nous. Elle existe depuis des milliers d'années et a joué — et joue encore — un rôle immensément important dans la vie quotidienne de millions de personnes à travers le monde.",
      },
      {
        type: 'paragraph',
        content:
          "Bien que le concept de parenté de l'homme avec les animaux et la nature soit universel, il diffère considérablement d'une culture à l'autre, selon les peuples et les circonstances qui l'ont façonné.",
      },
      {
        type: 'paragraph',
        content:
          "Le plus important, cependant, est que le concept et le culte des animaux et des plantes sacrés ont contribué à préserver de nombreuses espèces de la flore et de la faune mondiales, car on croyait que tuer son animal sacré principal ou détruire une plante sacrée apporterait la malchance à l'individu, la famille ou le clan responsable de cet acte.",
      },
    ],
  },
  {
    id: 'animisme-ame-nature',
    titre: "L'Animisme",
    sousTitre: "L'Adoration de l'Âme de la Nature",
    icon: '◈',
    page: 11,
    sections: [
      {
        type: 'paragraph',
        content:
          "Wikipédia définit le terme « animisme » (du mot latin *anima* : âme, vie) comme l'idée « philosophique, religieuse ou spirituelle que des âmes ou des esprits existent non seulement dans les humains et les animaux, mais aussi dans les plantes, les roches, les phénomènes naturels tels que le tonnerre et la foudre, les caractéristiques géographiques telles que les montagnes ou les rivières, ou d'autres entités non humaines de l'environnement naturel. »",
      },
      {
        type: 'quote',
        content:
          "L'animisme peut également attribuer des âmes à des concepts plus abstraits tels que des mots, des noms véritables ou des métaphores dans la mythologie.",
      },
      {
        type: 'paragraph',
        content:
          "L'animisme est une croyance que l'on trouve dans de nombreuses religions à travers le monde, mais il n'est pas, en général, considéré comme un type de religion en lui-même. En règle générale, on peut dire que les religions qui mettent l'accent sur l'animisme appartiennent surtout au groupe des religions naturelles.",
      },
    ],
  },
  {
    id: 'animisme-histoire',
    titre: "L'Animisme dans l'Histoire Humaine",
    icon: '◇',
    page: 13,
    sections: [
      {
        type: 'paragraph',
        content:
          "En tant que méthodes d'identification facilement reconnaissables, les emblèmes animaux et végétaux existaient déjà dans l'Égypte prédynastique, manifestant le pouvoir d'un régime particulier. Ils étaient largement utilisés sur des étiquettes en ivoire attachées aux marchandises commerciales, des sceaux, des étendards et d'autres objets, et sont considérés comme ayant conduit au développement des premiers hiéroglyphes.",
      },
      {
        type: 'paragraph',
        content:
          "Des animaux comme la grue, le scorpion, le faucon et le serpent figuraient parmi les premiers à apparaître sur les bâtiments, les manuscrits, les objets rituels. Ils symbolisaient très probablement déjà les mêmes vertus, qualités et fonctions dans la nature qu'aujourd'hui.",
      },
      {
        type: 'paragraph',
        content:
          "Dotés de pouvoirs magiques, de sagesse et de longue vie en tant que protecteurs puissants, il était interdit de tuer et de manger ses animaux sacrés. Leurs images étaient tatouées sur le corps, gravées sur les armes, représentées sous forme de masques ou intégrées dans des objets cultuels et profanes.",
      },
    ],
  },
  {
    id: 'parente-ame-esprit',
    titre: "Parenté dans l'Âme et l'Esprit",
    icon: '✦',
    page: 17,
    sections: [
      {
        type: 'paragraph',
        content:
          "D'une manière générale, une relation sacrée dans le concept de l'animisme peut embrasser trois concepts distincts, bien que liés :",
      },
      {
        type: 'list',
        content: 'Trois formes de relation sacrée',
        items: [
          "Une espèce ou un animal ou une plante individuel avec lequel une personne ressent une affinité — soit pour ses attributs, soit pour son symbolisme",
          "Une sorte de « guide spirituel » sous la forme d'un animal ou d'une plante",
          "L'« animal ou plante soi » de la personne, c'est-à-dire un archétype intérieur ou un modèle idéal de soi-même",
        ],
      },
      {
        type: 'list-title',
        content: 'Les animaux ou plantes sacrés peuvent représenter :',
        items: [
          'Un ancêtre',
          "Un représentant d'un clan",
          "Une âme externe placée auprès d'un animal pour être « gardée en sécurité »",
          "Un ami ou un parent fournissant des pouvoirs magiques",
          "Une incarnation d'une divinité",
          "Un « allié spirituel » qui guide vers les royaumes de l'esprit",
        ],
      },
    ],
  },
  {
    id: 'religions-afrique-ouest',
    titre: "Religions en Afrique de l'Ouest",
    sousTitre: 'Naturelles, Traditionnelles ou Indigènes',
    icon: '◉',
    page: 21,
    sections: [
      {
        type: 'paragraph',
        content:
          "Les religions naturelles, traditionnelles, indigènes ou même « tribales » africaines sont également classées comme un groupe de croyances en divers esprits de la nature, communément décrites comme animistes. Cette classification est cependant contestée depuis de nombreuses années par les anthropologues culturels les plus influents.",
      },
      {
        type: 'quote',
        content:
          "Pour la plupart, la description des religions traditionnelles africaines comme animistes reflète davantage un biais européen de la compréhension et moins une perspective équilibrée sur le plan scientifique et ethnographique.",
      },
    ],
  },
  {
    id: 'representations-animales',
    titre: 'Représentations Animales',
    sousTitre: "Dans l'Animisme Africain",
    icon: '🐾',
    page: 23,
    sections: [
      {
        type: 'quote',
        content:
          "La représentation animale — parfois sous forme symbolique — est commune à toutes les civilisations. « Mais clairement, ce sont les peuples d'Afrique qui ont été capables d'exprimer avec le plus de puissance et de beauté convaincante la proximité qui marque le lien entre les mondes mystique et humain. »",
      },
      {
        type: 'paragraph',
        content:
          "Les représentations animales sont omniprésentes dans toutes les cultures africaines, variant d'une région à l'autre, en fonction de l'environnement naturel dont les cultures respectives ont émergé.",
      },
      {
        type: 'paragraph',
        content:
          "En conséquence naturelle, les rites et pratiques associés aux animaux sacrés diffèrent substantiellement selon les traditions des groupes individuels ou même des pays entiers.",
      },
    ],
  },
  {
    id: 'textiles-afrique-ouest',
    titre: 'Animaux Sacrés',
    sousTitre: 'Sur les Textiles Traditionnels',
    icon: '◆',
    page: 25,
    sections: [
      {
        type: 'paragraph',
        content:
          "Il est encourageant de constater que la profonde affinité avec la nature et la pratique de l'animisme existent encore dans certaines parties plus reculées de l'Afrique de l'Ouest rurale. On peut les trouver loin des danses rituelles présentées comme spectacles touristiques et des villages « artisans » qui vendent des masques reproduisant des animaux sacrés comme cadeaux souvenirs.",
      },
      {
        type: 'paragraph',
        content:
          "Cependant, toute initiative de préservation de cet aspect particulier du patrimoine culturel d'Afrique de l'Ouest doit commencer par une tentative de documenter — aussi brièvement soit-elle — l'utilisation des motifs d'animaux dans l'un des savoir-faire traditionnels manuels les plus importants : l'artisanat et l'art du tissage du fameux tissu rayé fabriqué à partir du coton cultivé dans les parcelles familiales.",
      },
    ],
  },
  {
    id: 'diasporas-africaines',
    titre: 'Identités Culturelles',
    sousTitre: 'Dans les Diasporas Africaines',
    icon: '◊',
    page: 27,
    sections: [
      {
        type: 'paragraph',
        content:
          "La perte de leurs croyances et traditions ancestrales chez de nombreux Africains modernes est largement due à la destruction de leurs systèmes politiques et sociaux et des identités culturelles par la colonisation au cours des quatre derniers siècles, et aux progrès de l'Islam et du Christianisme pendant une période encore plus longue.",
      },
      {
        type: 'quote',
        content:
          "Contraires aux coutumes européennes, de nombreux Africains modernes ne sont plus conscients des emblèmes anciennement utilisés par leurs familles ou communautés ethniques ni de leur importance symbolique ancestrale.",
      },
    ],
  },
  {
    id: 'royaumes-anciens',
    titre: 'Royaumes Anciens',
    sousTitre: "d'Afrique de l'Ouest",
    icon: '♛',
    page: 30,
    sections: [
      {
        type: 'paragraph',
        content:
          "Voici quelques-uns des empires et royaumes les plus célèbres d'Afrique de l'Ouest jusqu'au XXe siècle, avec leurs langues officielles.",
      },
      {
        type: 'list-title',
        content: 'Royaumes et empires',
        items: [
          "Royaume Ashanti — XVIIe-XIXe s. · Ghana actuel\nLangue : Twi · ✦ L'un des royaumes les plus riches grâce à l'or Ashanti",
          "Empire Bamana (Ségou) — XVIIe-XIXe s. · Mali actuel\nLangue : Bambara (famille Mandé)",
          "Empire du Bénin (Edo) — XVe-XIXe s. · Nigeria actuel",
          "Empire du Mali (Mandin) — XIe & XIIIe-XVIIe s. · Guinée & Mali\n✦ Territoire plus vaste que l'Europe occidentale",
          "Empire Songhay — milieu XIVe-XVIe s. · Niger & Burkina Faso\n✦ L'un des plus grands empires africains de l'histoire",
          "Royaume Yoruba d'Ife — XIIe-XVIIIe s. · Nigeria actuel",
        ],
      },
    ],
  },
  {
    id: 'groupes-ethniques',
    titre: 'Groupes Ethniques',
    sousTitre: "Répartition en Afrique de l'Ouest",
    icon: '🌍',
    page: 35,
    sections: [
      {
        type: 'quote',
        content:
          "Aujourd'hui, ces peuples anciens autrefois célèbres d'Afrique de l'Ouest se retrouvent à vivre arbitrairement sous différents drapeaux nationaux, à communiquer dans différentes langues étrangères et à adopter des traditions et des valeurs étrangères autres que les leurs.",
      },
      {
        type: 'list-title',
        content: 'Principaux groupes par pays (16 nations)',
        items: [
          "BÉNIN — env. 42 groupes : Yoruba, Dendi, Bariba, Fula, Fon, Mina",
          "BURKINA FASO — 2 groupes majeurs : Voltaïque Mossi et Mandé",
          "CÔTE D'IVOIRE — Akan, Voltaïque/Gur, Mandé du Nord, Krous · env. 65 langues",
          "GHANA — Akan, Mole-Gagbon, Ewe, Ga-Dangme, Gurunsi, Hausa",
          "MALI — Mandé, Bambara, Soninké, Fula, Voltaïque, Songhaï, Touareg",
          "NIGERIA — env. 250 groupes : Hausa, Fula, Yoruba, Igbo, Ijaw, Kanuri",
          "SÉNÉGAL — Wolof, Fula, Pular, Serer, Dioula, Mandinka, Soninké",
        ],
      },
    ],
  },
  {
    id: 'proteger-animaux-sacres',
    titre: 'Protéger les Animaux Sacrés',
    sousTitre: "Protéger l'Âme de la Nature",
    icon: '🌿',
    page: 39,
    sections: [
      {
        type: 'paragraph',
        content:
          "En dernière analyse, il y a peu de différence entre les vertus et les significations que les nombreux peuples différents d'Afrique de l'Ouest attribuent à leurs animaux et plantes sacrés, et celles données aux mêmes espèces dans d'autres parties du monde.",
      },
      {
        type: 'quote',
        content:
          "Ce qui devrait être rectifié, cependant, est la perte déplorable de conscience et de respect quant à la signification culturelle et spirituelle de la représentation traditionnelle des animaux et des plantes. Ils ne sont pas — et ne devraient pas être — utilisés simplement comme de beaux et décoratifs « motifs de surface ».",
      },
      {
        type: 'paragraph',
        content:
          "Pendant des siècles, ces motifs ont incarné et symbolisé la proximité atavique de l'homme avec le cycle complexe de la nature, dont il n'est qu'une infime partie.",
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   LIVRE 2 — Ted Andrews · Animal-Speak (EN, 1993)
───────────────────────────────────────────────────────── */
const ANDREWS_CHAPTERS: KnowledgeChapter[] = [
  {
    id: 'understanding-totems',
    titre: 'Understanding Animal Totems',
    sousTitre: 'The Language of Nature',
    icon: '🐺',
    page: 1,
    sections: [
      {
        type: 'paragraph',
        content:
          "Animals have always been a part of the spiritual life of humanity. In most societies, animals were seen as divine messengers, spirit guides, and teachers. The idea of the totem — an animal or natural object revered as the emblem of a clan or individual — is one of the most ancient and universal of all spiritual concepts.",
      },
      {
        type: 'paragraph',
        content:
          "Every animal has a specific power and medicine — a unique gift it carries within the web of life. When we align ourselves with an animal totem, we draw upon that specific power. We activate the same energy within ourselves. This is not metaphor. In shamanic understanding, it is direct, practical spiritual technology that has been tested across thousands of years and dozens of civilizations.",
      },
      {
        type: 'quote',
        content:
          "Every animal has its own set of qualities and characteristics. When we learn to listen, they speak to us of hidden forces in the universe and in ourselves.",
      },
      {
        type: 'paragraph',
        content:
          "Animal totems serve as mirrors. They reflect back to us those qualities and energies that we need to develop or that we are expressing too strongly. When an animal shows up repeatedly in your life — physically or symbolically — it is time to pay attention to its message.",
      },
      {
        type: 'paragraph',
        content:
          "Throughout history, shamans, healers, priests, and visionaries have maintained living relationships with animal spirits. These relationships were not symbolic or decorative — they were active alliances that shaped the destiny of individuals and communities. The shaman who worked with Wolf medicine moved with greater strategy through the world. The healer who aligned with Snake understood transformation at its deepest level. The warrior bonded to Eagle held a vision no earthbound adversary could anticipate.",
      },
      {
        type: 'list-title',
        content: 'The seven types of animal totems',
        items: [
          "The Life Totem — the animal that stays with you from birth to death, embodying your deepest soul nature",
          "The Journey Totem — guides a specific life chapter, transition, or spiritual quest",
          "The Message Totem — appears with a specific teaching, warning, or invitation",
          "The Shadow Totem — represents your fears, your challenges, and the tests that forge your character",
          "The Dream Totem — appears in visionary states, dream journeys, and meditation",
          "The Clan Totem — the ancestral animal of your lineage, family, or people",
          "The Moon Totem — associated with your emotional cycles, intuition, and the rhythm of time",
        ],
      },
      {
        type: 'paragraph',
        content:
          "To discover your totems, you must first become quiet enough to observe. Modern life speeds us past the signals animals send. A hawk crying overhead. A spider weaving in the corner of your window. A spider crossing your path three times in a week. These are not coincidences — they are communications. Learning to receive them requires only patience, attention, and the willingness to believe that the natural world is not silent.",
      },
    ],
  },
  {
    id: 'finding-your-totem',
    titre: 'Finding Your Personal Totem',
    sousTitre: 'Practices for Recognizing Your Animal Guides',
    icon: '🔮',
    page: 27,
    sections: [
      {
        type: 'paragraph',
        content:
          "Your personal animal totem is rarely assigned through someone else's system or quiz. It reveals itself through the pattern of your own life. Which animals have appeared at significant moments? Which creature have you been drawn to since childhood? Which animal's qualities — both its strengths and its shadow sides — mirror your own character most honestly?",
      },
      {
        type: 'paragraph',
        content:
          "The most reliable method for discovering your totem is the shamanic journey — a meditative or trance state in which you descend through an imagined underworld tunnel or ascend through the sky in search of your animal ally. This technique, used by indigenous healers across every continent, has been adapted and taught in modern spiritual practice with consistent and remarkable results.",
      },
      {
        type: 'list-title',
        content: 'Methods for connecting with your animal totem',
        items: [
          "The Shamanic Journey — enter a drumbeat-induced trance and travel the inner realms seeking your ally",
          "Dream incubation — set a clear intention before sleep to meet your totem animal in the dream space",
          "Nature observation — spend extended time outdoors and track which animals approach or repeat",
          "Meditation with a question — enter stillness and ask: 'What animal walks with me?'",
          "Childhood memory — recall which animals fascinated, frightened, or captivated you as a child",
          "Pattern tracking — keep a journal of animal encounters for 30 days and identify repeating themes",
          "Art and creativity — draw, paint, or write freely about animals and note which arise spontaneously",
        ],
      },
      {
        type: 'quote',
        content:
          "The totem animal you need most right now is usually the one you are most afraid of — or the one you have been ignoring. Spirit chooses its messengers for their precision, not for our comfort.",
      },
      {
        type: 'paragraph',
        content:
          "Once you have identified a totem, the relationship must be cultivated. This is not a passive process. Like any relationship, it deepens through attention, respect, and reciprocity. Study the animal — its biology, its habits, its ecological role, its symbolic presence across world cultures. The more you know about the creature, the more clearly you can read its messages in your life.",
      },
      {
        type: 'paragraph',
        content:
          "Place images of your totem in your home and workspace. Learn its calls and movements. Spend time in habitats where it lives. And when it appears — in waking life, in dreams, in art — pause. Write down the context. What were you thinking about? What question were you living? What was happening in your life at that moment? Over time, a coherent dialogue will emerge.",
      },
      {
        type: 'paragraph',
        content:
          "Working with your totem animal is ultimately a practice of becoming more fully yourself. The animal does not change you — it reveals you. It mirrors the patterns of your soul with a clarity that words and therapy and analysis sometimes cannot reach. This is the oldest medicine on Earth: the friendship between the human and the animal worlds.",
      },
    ],
  },
  {
    id: 'birds-sacred-messengers',
    titre: 'Birds',
    sousTitre: 'Sacred Messengers Between Worlds',
    icon: '🦅',
    page: 87,
    sections: [
      {
        type: 'paragraph',
        content:
          "Birds have always been considered messengers of the divine. Because they live in the sky, they are naturally associated with the celestial realm — the world of gods, spirits, and elevated consciousness. In virtually every tradition on Earth, birds carry prayers upward and bring answers back down.",
      },
      {
        type: 'paragraph',
        content:
          "The gift of flight — denied to all other vertebrates except bats — made birds objects of profound fascination and reverence. They inhabit a realm inaccessible to humans: the intermediate space between earth and heaven, between the visible and the invisible. A bird that appears at a critical moment in someone's life was, in virtually every pre-modern culture, taken as a direct communication from the divine.",
      },
      {
        type: 'paragraph',
        content:
          "The Eagle, in particular, occupies the highest position in the avian spiritual hierarchy across most of the world's traditions. Its ability to soar at extraordinary altitudes while maintaining pinpoint vision of what moves on the ground below makes it the natural emblem of the individual who has ascended to spiritual heights without losing connection with the practical world beneath.",
      },
      {
        type: 'quote',
        content:
          "The Eagle is the Great Spirit's messenger. Its feathers are used in virtually every ceremony because they carry our prayers directly to the Creator.",
      },
      {
        type: 'paragraph',
        content:
          "The Hawk teaches us to observe our lives with a higher perspective. It is a messenger of vision and truth. When a hawk crosses your path, a message of clarity and awakening is at hand. Hawks are diurnal hunters of extraordinary precision — they do not waste energy, they do not strike without seeing clearly. Their medicine asks: are you truly seeing the situation in your life, or are you operating from assumption and habit?",
      },
      {
        type: 'paragraph',
        content:
          "The Owl occupies a uniquely liminal space in the world of birds. Active at night, possessed of silent flight and eyes that see in darkness, the Owl has been associated across cultures with death, prophecy, wisdom, and the underworld. In West African traditions, the owl is often regarded as the bird of the ancestors — its call heard near a home may signal that the dead are visiting. This association is not morbid but deeply respectful: the owl bridges the worlds of the living and the departed.",
      },
      {
        type: 'list-title',
        content: 'Sacred birds and their primary medicine',
        items: [
          "Eagle — Illumination, divine connection, far-sightedness, courageous vision",
          "Hawk — Messenger, acute observation, truth-seeing, swift decisive action",
          "Owl — Wisdom, the unseen world, night knowledge, ancestral communication",
          "Heron — Self-reliance, patience, stillness, the power of solitary contemplation",
          "Raven — Magic, shapeshifting, the mystery of creation, transformation through darkness",
          "Crane — Longevity, vigilance, inner stillness, the grace of old wisdom",
          "Vulture — Purification, transformation, patience, the sacred work of renewal",
          "Parrot — Communication, truth-speaking, the sacred repetition of divine words",
          "Hornbill — Ancestral voice, sacred ceremony, the call of the invisible world",
          "Flamingo — Balance, community, the beauty of filtering what truly nourishes",
        ],
      },
      {
        type: 'paragraph',
        content:
          "To work with a bird totem, begin by learning its actual behavior in the wild. The spiritual qualities of an animal are always rooted in its biological reality. The hawk's spiritual medicine of clear-sightedness is inseparable from its physical capacity for extraordinary vision. The owl's wisdom is inseparable from its ability to navigate in complete darkness. When you understand what the bird actually does, you understand what it is teaching you to do.",
      },
    ],
  },
  {
    id: 'four-legged-totems',
    titre: 'Four-Legged Totems',
    sousTitre: 'Strength, Instinct & Wisdom of the Earth',
    icon: '🦁',
    page: 167,
    sections: [
      {
        type: 'paragraph',
        content:
          "Mammals are among the most powerful of totems because they share so many characteristics with humanity: warm blood, live birth, the nursing of young, complex social structures, and advanced emotional lives. Working with a mammal totem can therefore produce some of the deepest and most personal of spiritual lessons.",
      },
      {
        type: 'paragraph',
        content:
          "The Lion teaches solar strength, courage, and the proper use of power. It does not waste energy. It conserves and strikes with precision. The lion spends up to twenty hours per day in rest — not in laziness, but in the disciplined conservation of power for the moments when power is truly needed. Working with Lion medicine means learning to assert oneself with dignity, to lead without aggression, and to understand that true authority does not need to announce itself constantly.",
      },
      {
        type: 'paragraph',
        content:
          "In the traditions of West Africa, the Lion holds a position comparable to its role in European heraldry: it is the king, the sovereign, the being of highest standing. But unlike the European conceptualization, which emphasizes dominance, the African Lion is above all a being of solar wisdom — the one who knows when to act and when to wait, who protects the circle of life not through violence alone but through the authority of his presence.",
      },
      {
        type: 'quote',
        content:
          "The Elephant never forgets because it carries the memory of its lineage. It teaches us to honor our ancestors and to walk gently yet powerfully upon the Earth.",
      },
      {
        type: 'paragraph',
        content:
          "The Elephant's medicine is among the most complex and layered of any animal totem. Its extraordinary memory — documented by scientists who have observed elephants mourning their dead, returning decades later to the bones of family members, and recognizing individual humans after years of separation — makes it the natural emblem of ancestral wisdom, of the unbroken chain between the living and those who came before.",
      },
      {
        type: 'paragraph',
        content:
          "The Leopard moves differently from the lion. Where the lion is solar and collective, the leopard is lunar and solitary. It hunts alone, it travels at night, it carries its prey into the trees where others cannot follow. Leopard medicine teaches the power of self-reliance, of inner resources that need no audience, of the strength that is cultivated in silence and privacy rather than in the pride of the group.",
      },
      {
        type: 'paragraph',
        content:
          "The Cheetah teaches something that no other mammal embodies as completely: the willingness to commit fully, to accelerate from stillness to extraordinary speed in a single decision, and then to accept the outcome with grace. The cheetah succeeds in only about half of its hunts. It does not brood over failure. It rests, recovers its breath, and begins again. This is perhaps the most pragmatic of all totem teachings.",
      },
      {
        type: 'list-title',
        content: 'Mammal totems of African traditions',
        items: [
          "Lion — Sovereignty, solar power, courage, the dignity of restrained authority",
          "Elephant — Memory, ancestral wisdom, family bonds, gentleness in strength",
          "Leopard — Solitude, stealth, swift transformation, the power of inner resources",
          "Cheetah — Commitment, acceleration, grace in both success and failure",
          "Hyena — Cunning, adaptation, misunderstood power, the wisdom of what others reject",
          "Buffalo — Gratitude, abundance, prayer, the sacred contract with the Earth",
          "Gazelle — Grace, swiftness, leaping toward one's goals without hesitation",
          "Hippopotamus — Emotional depth, the power of water, fierce protection of the sacred",
          "Warthog — Resourcefulness, adaptability, the courage to be exactly as one is",
          "Wild Dog — Community, cooperation, the extraordinary power of collective commitment",
        ],
      },
      {
        type: 'paragraph',
        content:
          "When a mammal totem appears in your life repeatedly, it is usually addressing something fundamental: your relationship to power, to family, to memory, to instinct. These are the deep structures of mammalian life that we share. The totem animal brings you into alignment with the part of this heritage that you need most urgently to reclaim.",
      },
    ],
  },
  {
    id: 'reptiles-amphibians',
    titre: 'Reptiles & Amphibians',
    sousTitre: 'Ancient Wisdom of the Water and Earth',
    icon: '🐊',
    page: 249,
    sections: [
      {
        type: 'paragraph',
        content:
          "Reptiles are among the oldest living creatures on Earth. They predate mammals by hundreds of millions of years. Their medicine is ancient, primal, and connected to the deepest currents of life force. To work with a reptile totem is to reach back through evolutionary time and access wisdom that predates the human nervous system as we know it — wisdom written into the oldest structures of our own brains.",
      },
      {
        type: 'paragraph',
        content:
          "The serpent in particular is one of the most universally sacred animals across all world traditions. It represents death and regeneration simultaneously — the same creature that carries lethal venom also embodies the principle of healing (the caduceus of Hermes, the staff of Asclepius, the bronze serpent of Moses). In its skin-shedding, it offers the most literal biological demonstration of renewal that nature provides.",
      },
      {
        type: 'paragraph',
        content:
          "The Crocodile, in African and Egyptian traditions, holds a particularly complex spiritual position. It is simultaneously feared as a destroyer and revered as a protector of sacred waters. In ancient Egypt, the god Sobek — who bore the head of a crocodile — was the lord of rivers and of fertility. Crocodile medicine teaches survival through patience, the power of the ambush (striking at the precise moment rather than wasting energy on premature action), and the ability to move between the worlds of water and land — between the emotional and the material.",
      },
      {
        type: 'paragraph',
        content:
          "The Monitor Lizard (Nile Monitor), found throughout West and Central Africa, is revered in many traditions as a guardian of the spirit world and a detector of truth. Its forked tongue — reading chemical messages invisible to human senses — makes it a natural symbol of discernment and the perception of hidden realities. Some traditions hold that the monitor lizard can sense when death is approaching a community, and its presence near a dwelling is taken as a warning to be heeded.",
      },
      {
        type: 'quote',
        content:
          "The serpent that sheds its skin teaches us that we must die to our old selves in order to be reborn. Every ending contains within it the seed of a new beginning.",
      },
      {
        type: 'list-title',
        content: 'Reptile and amphibian totems and their medicine',
        items: [
          "Crocodile — Ancient power, patience, the dual nature of creation and destruction",
          "Python — Constriction, embrace, the slow transformation that cannot be rushed",
          "Cobra — Kundalini energy, the raising of spiritual power, royal wisdom",
          "Monitor Lizard — Discernment, truth-sensing, guardian of the threshold",
          "Chameleon — Adaptation, the power of changing one's colors, perception of surroundings",
          "Tortoise — Patience, protection, the slow accumulation of wisdom across great time",
          "Frog — Purification, fertility, the voice that calls rain, emotional cleansing",
          "Salamander — The element of fire, transformation through intense experience",
        ],
      },
      {
        type: 'paragraph',
        content:
          "Reptile totems often appear when we are being asked to shed something — an identity, a belief system, a relationship, a way of being in the world that has outgrown its usefulness. Like the serpent releasing its skin, we cannot carry our old form into the new life we are entering. The reptile totem arrives precisely at those threshold moments to tell us: this shedding is not loss. It is the condition of becoming.",
      },
    ],
  },
  {
    id: 'insects-small-creatures',
    titre: 'Insects & Small Creatures',
    sousTitre: 'The Overlooked Teachers',
    icon: '🕷',
    page: 323,
    sections: [
      {
        type: 'paragraph',
        content:
          "In most spiritual traditions focused on animal totems, the great mammals and birds receive the most attention. Yet some of the most precise and powerful teachings in the natural world are carried by creatures we step over without a second glance. The insect kingdom — with its extraordinary diversity, its complex social structures, its miraculous metamorphoses — offers spiritual lessons of an intimacy and specificity that the great animals cannot always provide.",
      },
      {
        type: 'paragraph',
        content:
          "The Spider is, across many world traditions, the weaver of fate itself. In West African cosmology, Anansi the Spider is the trickster deity, the keeper of all stories — the being who holds the narrative threads of the universe. In Lakota tradition, Spider Woman wove the web of the world into existence. The spider's medicine is creativity, patience, the understanding that you yourself are always at the center of the web you weave, and that every thread you add has consequences reaching to its farthest edges.",
      },
      {
        type: 'paragraph',
        content:
          "The Bee carries perhaps the most complex social medicine of any insect. Bee communities are models of a particular kind of excellence: individual self-sacrifice in service of collective intelligence. The queen does not rule the hive through force — she is the center around which all activity organizes. Working with Bee medicine asks us to examine our relationship to community: Are we bringing our full gift? Are we organized around a true center? Is our work serving something larger than our individual need?",
      },
      {
        type: 'quote',
        content:
          "The Butterfly does not remember being a caterpillar. When it dissolves into liquid within its chrysalis — losing all prior form before reconstituting entirely — it demonstrates the most radical transformation available to living beings: not change, but complete recreation.",
      },
      {
        type: 'paragraph',
        content:
          "The Butterfly's metamorphosis is biologically extraordinary: inside the chrysalis, the caterpillar's body literally dissolves into an undifferentiated biological soup before reorganizing into an entirely new form. This is not a gradual change — it is a death and a resurrection. Butterfly medicine appears when we are in, or need to enter, this kind of radical dissolution: the surrendering of a former self so complete that what emerges cannot be predicted from what preceded it.",
      },
      {
        type: 'list-title',
        content: 'Insect and small creature medicine',
        items: [
          "Spider — Creativity, fate-weaving, the patterns we create in our own lives",
          "Bee — Community, sacred work, the intelligence of collective devotion",
          "Butterfly — Complete transformation, the courage to dissolve before becoming",
          "Ant — Patience, community labor, the building of great things grain by grain",
          "Dragonfly — Illusion, the ability to see through surfaces, swift change",
          "Scarab Beetle — Sacred renewal, the solar cycle, persistence through darkness",
          "Praying Mantis — Stillness, perfect patience before decisive action",
          "Firefly — Illumination from within, the call of one's own light into the darkness",
        ],
      },
    ],
  },
  {
    id: 'daily-practice',
    titre: 'Working with Animal Spirits',
    sousTitre: 'A Daily Practice for Deepening the Bond',
    icon: '🌅',
    page: 389,
    sections: [
      {
        type: 'paragraph',
        content:
          "Knowing your totem animal is only the beginning. The relationship must be lived. Like any meaningful relationship in the human world, it requires regular attention, honest communication, and a willingness to be changed by what you encounter. Here are practices that have been tested across many years of teaching and personal work.",
      },
      {
        type: 'paragraph',
        content:
          "Begin each morning with a moment of acknowledgment. Before the noise of the day begins, spend two or three minutes simply holding your totem animal in your mind's eye. See it clearly — its body, its movement, its environment. Ask: what is the quality of this animal that I most need today? Not what you want — what you need. Allow the answer to arise without forcing it.",
      },
      {
        type: 'list-title',
        content: 'Seven daily practices for deepening your totem relationship',
        items: [
          "Morning acknowledgment — spend 3 minutes visualizing your totem and asking what quality it offers today",
          "Nature journaling — record every animal encounter, dream, or image that appears, no matter how minor",
          "Study — read about your totem's biology, ecology, and cultural symbolism across different traditions",
          "Embodiment — spend a few minutes moving, breathing, or thinking as your animal would",
          "Offerings — in many traditions, leaving water, food, or natural objects near images of your totem maintains the connection",
          "Gratitude — close each day by thanking your totem for its presence and any messages received",
          "Silence — regularly create conditions of stillness in which animal communications can be heard",
        ],
      },
      {
        type: 'quote',
        content:
          "The animal spirits are always speaking. The question is never whether they are sending messages — it is whether we have quieted ourselves enough to receive them. The practice of the totem is ultimately the practice of attention.",
      },
      {
        type: 'paragraph',
        content:
          "Over months and years, those who maintain a genuine relationship with their animal totems report a consistent pattern: a deepened sense of personal identity, greater clarity about their gifts and challenges, stronger connection to the natural world, and a felt sense of being accompanied through life's difficulties by an intelligence greater than their own. This is not mysticism. It is the ancient human practice of relationship with the living world — and it works.",
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   LIVRE 3 — Louis Charbonneau-Lassay (FR, 1940)
───────────────────────────────────────────────────────── */
const CHARBONNEAU_CHAPTERS: KnowledgeChapter[] = [
  {
    id: 'symbolisme-animal-chretien',
    titre: "L'Iconographie Chrétienne et les Animaux",
    sousTitre: "Héritage d'un Symbolisme Universel",
    icon: '✟',
    page: 1,
    sections: [
      {
        type: 'paragraph',
        content:
          "Depuis les premières communautés chrétiennes des catacombes jusqu'aux grandes cathédrales gothiques, les animaux ont occupé une place centrale dans l'art et la pensée religieuse de l'Occident. Loin d'être de simples ornements, chaque bête représentée dans la sculpture, le vitrail ou l'enluminure porte un sens théologique précis, hérité des traditions juives, grecques et de l'Orient ancien.",
      },
      {
        type: 'paragraph',
        content:
          "L'auteur de cet ouvrage monumental, Louis Charbonneau-Lassay, a consacré trente ans de sa vie à recenser et documenter l'apparition des animaux dans l'iconographie chrétienne. Son travail, publié en 1940 après des décennies de recherches dans les archives des monastères, les bibliothèques cathédrales et les collections privées d'Europe, demeure à ce jour la référence incontournable sur ce sujet.",
      },
      {
        type: 'quote',
        content:
          "Le Bestiaire n'est pas un simple catalogue de curiosités naturelles. C'est une lecture spirituelle du monde visible, où chaque créature vivante est un signe de la puissance créatrice de Dieu.",
      },
      {
        type: 'paragraph',
        content:
          "L'auteur recense plus de cinq cents espèces d'animaux, d'oiseaux, de reptiles et de poissons qui apparaissent dans l'iconographie chrétienne médiévale, en retraçant pour chacun l'origine de son symbolisme dans les textes sacrés, les Pères de l'Église et les traditions populaires. Ce qui frappe le lecteur moderne est la cohérence de ce système : chaque animal occupe une position précise dans une grammaire visuelle qui était parfaitement lisible pour le chrétien médiéval.",
      },
      {
        type: 'paragraph',
        content:
          "Il est fondamental de comprendre que ce symbolisme animal chrétien ne naît pas du vide. Il hérite directement des traditions symboliques de l'Égypte ancienne, de la Grèce, de la Mésopotamie et de Rome — et, par l'intermédiaire des contacts commerciaux et militaires, de traditions encore plus lointaines. Le bestiaire médiéval est un témoignage de la façon dont le christianisme a absorbé, transformé et réinterprété les systèmes symboliques qui le précédaient.",
      },
      {
        type: 'list-title',
        content: 'Sources du symbolisme animal chrétien',
        items: [
          "L'Ancien Testament — le lion de Juda, l'agneau pascal, le serpent d'airain de Moïse",
          "Les Évangiles — la colombe de l'Esprit Saint, le poisson (Ichthys), l'âne de la Nativité",
          "L'Apocalypse de Jean — les quatre Vivants (lion, taureau, aigle, homme-ange)",
          "Le Physiologus — manuel grec du IIe siècle, source principale des bestiaires médiévaux",
          "Les Pères de l'Église — Ambroise, Augustin, Grégoire le Grand et leurs commentaires allégoriques",
          "Les traditions populaires — légendes locales, coutumes agraires, croyances pré-chrétiennes intégrées",
        ],
      },
      {
        type: 'paragraph',
        content:
          "Le Physiologus mérite une attention particulière car il est la pierre angulaire de toute la tradition bestiaire médiévale. Composé probablement à Alexandrie au IIe siècle de notre ère, ce texte grec décrit cinquante animaux réels ou légendaires, puis tire de chaque description une leçon morale et spirituelle. Cette méthode — observer la nature pour en extraire une vérité divine — reflète une philosophie profonde : le monde visible est un livre, et chaque créature en est un signe qu'il appartient au sage de déchiffrer.",
      },
    ],
  },
  {
    id: 'lion-judee-agneau',
    titre: "Le Lion de Judée et l'Agneau Mystique",
    sousTitre: 'Force et Douceur du Sacré',
    icon: '🦁',
    page: 45,
    sections: [
      {
        type: 'paragraph',
        content:
          "Le Lion est la première des bêtes dans la symbolique biblique. Il est à la fois le signe de la tribu de Juda — donc de la lignée royale de David et du Christ — et la figure de la puissance divine qui terrasse le mal. Dans les catacombes romaines, on trouve déjà les premières représentations du Christ sous les traits d'un lion couronné.",
      },
      {
        type: 'paragraph',
        content:
          "Selon le Physiologus, le lion possède trois propriétés merveilleuses. La première : il efface ses traces en marchant avec sa queue, afin que les chasseurs ne puissent le suivre — de même que le Christ a caché sa divinité aux yeux du diable lors de l'Incarnation. La deuxième : il dort les yeux ouverts — de même que le Christ, dans la mort du vendredi saint, gardait sa divinité en éveil. La troisième : la lionne met bas ses petits mort-nés, et le lion les insuffle de vie le troisième jour — figure transparente de la Résurrection.",
      },
      {
        type: 'quote',
        content:
          "Le Lion dort les yeux ouverts — disait le Physiologus — comme le Christ dormait dans la mort avec sa divinité toujours en éveil. Voilà pourquoi les sculpteurs médiévaux représentaient les lions couchés aux pieds des gisants.",
      },
      {
        type: 'paragraph',
        content:
          "L'Agneau, à l'inverse, incarne la douceur et l'offrande. L'Agnus Dei — l'Agneau de Dieu — est l'une des images les plus chargées du christianisme : l'animal pur et sans tache qui se donne volontairement pour le salut du monde. Dès les premières représentations dans les mosaïques de Ravenne (Ve siècle), l'Agneau porte le drapeau de la victoire : la mort n'est pas une défaite, mais le moyen même du triomphe.",
      },
      {
        type: 'paragraph',
        content:
          "La tension entre ces deux symboles — le Lion et l'Agneau — structure une grande partie de la théologie chrétienne. Dans l'Apocalypse de Jean, celui qui est digne d'ouvrir le livre scellé des sept sceaux est annoncé comme le « Lion de la tribu de Juda » mais apparaît, quand on le voit effectivement, comme un agneau debout, portant les marques de sa mort. Cette coexistence des contraires — la puissance souveraine et le sacrifice volontaire — est au cœur du mystère chrétien.",
      },
      {
        type: 'paragraph',
        content:
          "Dans l'art médiéval, le lion-symbole du Christ est souvent représenté dans des postures ambivalentes : parfois triomphant, parfois en gisant, parfois enchaîné mais transcendant ses chaînes. Ces représentations ne sont pas des incohérences artistiques — elles sont des théologies visuelles, chacune soulignant un aspect différent de la même réalité divine. L'artiste médiéval ne cherchait pas à représenter un lion réel. Il cherchait à donner une forme visible à une vérité invisible.",
      },
      {
        type: 'list-title',
        content: 'Le lion dans l\'iconographie à travers les siècles',
        items: [
          "IIe-IIIe s. — Lions gardiens des catacombes, protecteurs du sommeil éternel",
          "IVe-Ve s. — Lion de saint Jérôme, l'animal apprivoisé par la sainteté",
          "VIe-VIIe s. — Lion de l'Évangéliaire, symbole de saint Marc",
          "XIe-XIIIe s. — Lions héraldiques des cathédrales, gardiens du seuil sacré",
          "XIVe-XVe s. — Lion de la Justice, présent dans les représentations du Jugement dernier",
          "XVIe s. — Lion alchimique, transformé par la symbolique ésotérique de la Renaissance",
        ],
      },
    ],
  },
  {
    id: 'aigle-saint-jean',
    titre: "L'Aigle de Saint Jean l'Évangéliste",
    sousTitre: 'La Vision du Divin',
    icon: '🦅',
    page: 128,
    sections: [
      {
        type: 'paragraph',
        content:
          "L'Aigle est le symbole de saint Jean l'Évangéliste, le disciple « bien-aimé », car son Évangile commence par une montée vers le Ciel — « Au commencement était le Verbe » — là où les trois autres évangélistes commencent sur la terre ferme. L'aigle seul peut fixer le soleil sans ciller : ainsi Jean contemple-t-il le mystère divin face à face.",
      },
      {
        type: 'paragraph',
        content:
          "Cette association entre l'aigle et saint Jean remonte au commentaire de saint Irénée de Lyon (IIe siècle), qui fut l'un des premiers à mettre en correspondance les quatre évangélistes avec les quatre Vivants de l'Apocalypse : le Lion pour Marc, le Taureau pour Luc, l'Homme pour Matthieu, et l'Aigle pour Jean. Ces quatre figures — reprises par Ézéchiel dans l'Ancien Testament — devinrent l'un des schèmes iconographiques les plus durables de l'art chrétien.",
      },
      {
        type: 'paragraph',
        content:
          "Selon la croyance médiévale, l'aigle avait la propriété de se plonger dans un lac ou une rivière pour « rénover » sa vue lorsqu'elle commençait à décliner avec l'âge — puis de voler directement en direction du soleil pour achever le processus de régénération. Cette légende est rapportée par le Physiologus comme une figure du baptême et de la conversion : l'âme pécheresse qui se plonge dans les eaux du sacrement pour en ressortir régénérée et tournée vers la lumière divine.",
      },
      {
        type: 'quote',
        content:
          "Ce qui est remarquable dans le symbolisme universel de l'aigle, c'est qu'il transcende les frontières culturelles et religieuses. Du Mexique aztèque à l'Égypte pharaonique, de la Sibérie chamanique à l'Afrique animiste, l'aigle est partout le signe du pouvoir sacré.",
      },
      {
        type: 'paragraph',
        content:
          "Dans les cathédrales médiévales, le pupitre d'où le diacre lisait l'Évangile lors de la liturgie prenait souvent la forme d'un aigle aux ailes déployées — portant sur son dos le livre de la Parole divine, comme s'il le transportait du ciel vers les fidèles. Ce meuble liturgique, que l'on appelle « aigle de lutrin », est encore visible dans de nombreuses cathédrales gothiques de France, de Belgique et d'Angleterre.",
      },
      {
        type: 'paragraph',
        content:
          "Il est remarquable de constater que dans les traditions d'Afrique de l'Ouest, l'aigle (ou son équivalent régional, le faucon ou l'oiseau de proie) occupe une position spirituelle comparable. Il est l'œil des ancêtres sur le monde des vivants, le messager entre le visible et l'invisible, la créature capable de traverser les frontières entre les mondes que les humains ordinaires ne peuvent franchir qu'en rêve ou en transe.",
      },
      {
        type: 'list-title',
        content: 'L\'aigle dans les traditions du monde',
        items: [
          "Christianisme — Symbole de saint Jean, vision du divin, élévation vers la lumière",
          "Islam — L'oiseau du paradis, la fidélité envers le divin",
          "Amérindienne — Messager du Grand Esprit, porteur de prières vers le Créateur",
          "Égypte ancienne — Le dieu Horus, gardien du pharaon, œil solaire",
          "Aztèque — Symbole de la guerre sacrée et du soleil, fondateur de Tenochtitlan",
          "Afrique de l'Ouest — Messager des ancêtres, gardien des communautés, œil des esprits",
          "Grèce antique — L'oiseau de Zeus, porteur de la foudre divine",
        ],
      },
    ],
  },
  {
    id: 'serpent-dualite-sacre',
    titre: 'Le Serpent',
    sousTitre: 'Dualité et Mystère du Sacré',
    icon: '🐍',
    page: 310,
    sections: [
      {
        type: 'paragraph',
        content:
          "Nulle créature dans l'histoire des religions n'a suscité autant d'ambivalence que le serpent. Divinité guérisseuse chez les Grecs avec Asclépios, esprit de la sagesse dans les traditions gnostiques, figure du mal et de la tentation dans la Genèse — le serpent concentre en lui les tensions fondamentales entre la vie et la mort, la sagesse et la tromperie.",
      },
      {
        type: 'paragraph',
        content:
          "Dans la tradition chrétienne, le serpent occupe deux positions radicalement opposées et pourtant complémentaires. D'un côté, il est le tentateur du Paradis — celui qui introduit le mensonge, le désir immodéré et la chute dans l'histoire humaine. De l'autre, il est le serpent d'airain que Moïse lève dans le désert pour guérir les Israélites mordus (Nombres 21:8-9), figure explicitement citée par Jésus lui-même dans l'Évangile de Jean comme une préfiguration de sa propre élévation sur la croix.",
      },
      {
        type: 'paragraph',
        content:
          "Cette ambivalence fondamentale n'est pas une incohérence — c'est une sagesse. Le serpent, dans presque toutes les traditions du monde, symbolise la force qui peut être tournée vers la destruction ou vers la guérison selon l'usage qu'on en fait. Le venin du serpent est à la fois ce qui tue et ce qui soigne, selon la dose et le contexte. C'est précisément cette dualité qui en fait un symbole si chargé de sens pour la médecine, la pharmacopée et la transformation spirituelle.",
      },
      {
        type: 'paragraph',
        content:
          "Dans les traditions d'Afrique de l'Ouest, le Grand Serpent Python — Dangbé chez les Fon du Bénin — est l'une des divinités les plus vénérées. Il symbolise l'arc-en-ciel céleste qui relie la terre au ciel, et sa protection est invoquée pour la fertilité des terres et la santé des communautés. Le temple du python à Ouidah (Bénin) est encore aujourd'hui un lieu de culte actif où les pythons sacrés vivent librement parmi les fidèles.",
      },
      {
        type: 'quote',
        content:
          "Le serpent qui mue sa peau ne meurt pas : il renaît. C'est pourquoi, de l'Égypte à la Mésopotamie, du Mexique à l'Afrique, le serpent est le symbole universel de la résurrection et du cycle éternel de la vie.",
      },
      {
        type: 'paragraph',
        content:
          "Charbonneau-Lassay consacre plusieurs chapitres de son Bestiaire à distinguer soigneusement les différentes espèces de serpents dans l'iconographie chrétienne et les nuances théologiques qu'elles incarnent. Le basilic, roi des serpents, symbolise le péché mortel dont le regard seul tue. L'aspic, qui bouche ses oreilles avec sa queue pour ne pas entendre le charme du serpentaire, représente l'âme qui se ferme à la Parole divine. La vipère, qui dévore ses petits, est l'image de l'ingratitude envers Dieu. Chaque espèce devient un chapitre d'un vaste encyclopédie morale.",
      },
      {
        type: 'list-title',
        content: 'Formes du serpent dans l\'iconographie chrétienne',
        items: [
          "Le serpent de bronze de Moïse — figure de la Rédemption et de l'élévation du Christ",
          "L'Ouroboros — le serpent qui se mord la queue, symbole de l'éternité divine",
          "Le Basilic — le péché mortel, l'ennemi de l'âme",
          "L'Aspic sourd — l'âme qui refuse d'entendre la vérité divine",
          "Le serpent sous le pied de Marie — le mal vaincu par la pureté",
          "Le serpent du caducée — la guérison, la médecine, la transformation alchimique",
          "Le Dragon — le diable lui-même, le serpent primitif de l'Apocalypse",
        ],
      },
    ],
  },
  {
    id: 'colombe-esprit-saint',
    titre: 'La Colombe et le Saint-Esprit',
    sousTitre: 'L\'Oiseau de Paix et de Révélation',
    icon: '🕊',
    page: 215,
    sections: [
      {
        type: 'paragraph',
        content:
          "Parmi tous les oiseaux de l'iconographie chrétienne, aucun n'a connu un destin symbolique aussi simple dans son apparence et aussi profond dans son contenu que la colombe. Elle est l'oiseau du Saint-Esprit, la troisième personne de la Trinité — et pourtant cette association, qui paraît aller de soi au croyant moderne, a une histoire riche et complexe qui traverse plusieurs civilisations.",
      },
      {
        type: 'paragraph',
        content:
          "L'apparition décisive est au Jourdain : lors du baptême de Jésus, les quatre évangélistes rapportent que l'Esprit de Dieu descend sur lui « comme une colombe ». Cette image est fondatrice. Mais elle n'est pas isolée dans le contexte biblique : la colombe de Noé, qui revient à l'arche portant un rameau d'olivier après le déluge (Genèse 8:11), est déjà associée à la réconciliation entre Dieu et l'humanité, au retour de la paix et de la vie après la destruction.",
      },
      {
        type: 'paragraph',
        content:
          "Dans les catacombes de Rome, parmi les premières représentations chrétiennes du IIe et IIIe siècle, la colombe est omniprésente. Elle figure sur les épitaphes comme signe d'espérance en la vie éternelle. Elle est représentée portant des rameaux de palmier (symbole de victoire), d'olivier (symbole de paix), ou buvant à une coupe (symbole eucharistique). La richesse de ces variations témoigne d'une méditation collective et continue sur le sens de cet oiseau dans le contexte de la foi nouvelle.",
      },
      {
        type: 'quote',
        content:
          "La colombe ne peut vivre que dans la lumière. Elle fuit les ténèbres et ne trouve pas de repos dans les lieux pollués. Ainsi en est-il de l'Esprit Saint, qui ne peut habiter qu'une âme purifiée et tournée vers la lumière divine.",
      },
      {
        type: 'paragraph',
        content:
          "L'art roman et gothique développe une iconographie de la colombe d'une richesse extraordinaire. Dans les Annonciations, la colombe descend de la bouche de Dieu le Père vers l'oreille ou la tête de Marie — représentant la transmission du Verbe divin. Dans les Pentecôtes, elle se place au centre d'un cercle de flammes entourant les apôtres. Dans les représentations de la Trinité, elle occupe la position centrale entre le Père et le Fils.",
      },
      {
        type: 'list-title',
        content: 'Significations de la colombe dans l\'iconographie chrétienne',
        items: [
          "La colombe du baptême — la descente de l'Esprit, la révélation de la filiation divine",
          "La colombe de Noé — la paix retrouvée, la vie après le déluge, l'alliance renouvelée",
          "La colombe de l'Annonciation — le vecteur du Verbe divin vers Marie",
          "La colombe eucharistique — l'âme qui s'abreuve au sang du Christ",
          "La colombe des épitaphes — l'espérance de la résurrection et de la vie éternelle",
          "La colombe de la Pentecôte — le feu de l'Esprit distribué aux apôtres",
          "La colombe héraldique — la pureté d'intention, la douceur chrétienne",
        ],
      },
    ],
  },
  {
    id: 'poisson-ichthys',
    titre: 'Le Poisson — Ichthys',
    sousTitre: 'Le Premier Signe des Chrétiens',
    icon: '🐟',
    page: 376,
    sections: [
      {
        type: 'paragraph',
        content:
          "Le poisson est peut-être le symbole chrétien le plus ancien et le plus discret. Avant même la croix — qui n'apparaît comme symbole dominant qu'après le IVe siècle — le poisson était le signe de reconnaissance des premiers chrétiens persécutés à Rome. Le mot grec ΙΧΘΥΣ (ichthys, « poisson ») formait un acrostiche du nom et de la dignité du Christ : Ἰησοῦς Χριστός Θεοῦ Υἱός Σωτήρ — Jésus Christ Fils de Dieu Sauveur.",
      },
      {
        type: 'paragraph',
        content:
          "Au-delà de ce rôle cryptographique, le poisson est profondément ancré dans les récits évangéliques. Les premiers disciples sont en grande majorité des pêcheurs — Pierre, André, Jacques et Jean — et Jésus les appelle à devenir « pêcheurs d'hommes ». La multiplication des pains et des poissons figure parmi les miracles les plus rapportés. Le repas du ressuscité au bord du lac de Tibériade, où Jésus mange du poisson grillé avec ses disciples, est l'un des récits de Résurrection les plus intimes et les plus chargés de sens.",
      },
      {
        type: 'paragraph',
        content:
          "Pour les Pères de l'Église, le poisson devenait une mine d'enseignements spirituels. Origène voit dans sa capacité à vivre et à se mouvoir dans l'eau une image de l'âme qui vit dans le milieu de la grâce divine. Tertullien compare le croyant au poisson qui naît dans l'eau du baptême. Ambroise de Milan développe une symbolique eucharistique autour du poisson qui, péché et cuit par le feu de l'Esprit, devient nourriture spirituelle pour l'assemblée des fidèles.",
      },
      {
        type: 'quote',
        content:
          "Nous sommes, selon notre Ichthys Jésus-Christ, nés dans l'eau, et nous ne nous sauvons qu'en demeurant dans l'eau. — Tertullien, De Baptismo",
      },
      {
        type: 'paragraph',
        content:
          "Dans les mosaïques des premières basiliques chrétiennes, les poissons nagent dans des eaux paradisiaques aux côtés de daupins, d'oiseaux exotiques et de vignes luxuriantes — tous symboles de la vie éternelle et de la félicité des élus. Ces représentations ne sont pas décoratives : elles sont des affirmations théologiques sous forme d'images, accessibles à une population largement analphabète mais formée à lire le monde comme un livre de signes.",
      },
    ],
  },
  {
    id: 'animaux-fantastiques',
    titre: 'Les Animaux Fantastiques',
    sousTitre: 'Licorne, Dragon et Phénix dans le Bestiaire Chrétien',
    icon: '🦄',
    page: 480,
    sections: [
      {
        type: 'paragraph',
        content:
          "Parmi les animaux qui peuplent le bestiaire médiéval chrétien, une catégorie particulière fascine et déconcerte le lecteur moderne : les créatures qui n'ont jamais existé biologiquement, mais qui ont joué un rôle spirituel et symbolique tout aussi réel que les espèces naturelles. La licorne, le dragon, le phénix et le griffon ne sont pas des erreurs de zoologie — ce sont des constructions symboliques délibérées, des figures de pensée sous forme animale.",
      },
      {
        type: 'paragraph',
        content:
          "La Licorne est, dans l'iconographie chrétienne médiévale, l'un des symboles les plus chargés du Christ. Selon le Physiologus, la licorne est une bête si farouche et si puissante qu'aucun chasseur ne peut la capturer — sauf en approchant une vierge, auprès de laquelle la licorne vient poser sa tête et s'endort, permettant alors sa capture. L'allégorie est transparente : seule la vierge Marie pouvait accueillir le Christ, le fils de Dieu impossible à « capturer » par l'histoire ordinaire des hommes.",
      },
      {
        type: 'paragraph',
        content:
          "Le Phénix est peut-être la créature fantastique au symbolisme le plus directement christologique. Cet oiseau fabuleux, originaire de la mythologie égyptienne et grecque, meurt dans un bûcher de flammes et renaît de ses propres cendres, rajeuni et purifié. Pour les Pères de l'Église, la correspondance avec la mort et la résurrection du Christ s'imposait d'elle-même : le phénix fut l'un des premiers symboles de la Résurrection utilisés dans l'art paléochrétien, avant même que la représentation directe du Christ ressuscité soit considérée acceptable.",
      },
      {
        type: 'quote',
        content:
          "Le Phénix renaît de ses cendres comme le Christ est sorti du tombeau. L'oiseau d'Arabie meurt par sa propre volonté et ressuscite dans sa propre gloire. Ainsi en est-il du Fils de Dieu.",
      },
      {
        type: 'paragraph',
        content:
          "Le Dragon occupe dans le bestiaire chrétien la position exactement inverse de ces symboles positifs : il est la figure du Diable lui-même, le « grand dragon, l'ancien serpent, appelé le Diable et Satan » de l'Apocalypse (12:9). Et pourtant, même le dragon subit une complexification symbolique au fil du temps : dans certaines traditions hagiographiques, le saint qui terrasse un dragon (saint Georges, sainte Marguerite d'Antioche) accomplit un acte de purification — le dragon représentant le chaos primitif que la sainteté transforme en ordre et en fécondité.",
      },
      {
        type: 'list-title',
        content: 'Animaux fantastiques et leur signification chrétienne',
        items: [
          "Licorne — Le Christ, que seule la pureté virginale peut accueillir",
          "Phénix — La Résurrection, la vie qui surgit de la mort volontaire",
          "Dragon — Le Diable, le serpent primordial, le chaos que le saint doit dompter",
          "Griffon — La double nature du Christ (divin et humain, aigle et lion)",
          "Pelican — Le Christ nourricier, qui se perce le flanc pour nourrir ses petits de son sang",
          "Basilic — Le péché mortel, le regard qui tue l'âme",
          "Sirène — La tentation mondaine, les illusions qui mènent à la perdition",
        ],
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   LIVRE 4 — Wande Abimbola · Ifá (EN, 1976)
───────────────────────────────────────────────────────── */
const ABIMBOLA_CHAPTERS: KnowledgeChapter[] = [
  {
    id: 'ifa-corpus-introduction',
    titre: 'The Ifá Literary Corpus',
    sousTitre: 'An Ancient African System of Knowledge',
    icon: '◉',
    page: 1,
    sections: [
      {
        type: 'paragraph',
        content:
          "Ifá is the sacred divination system of the Yoruba people of West Africa, primarily found in what is now Nigeria, Benin, and Togo. It is also known as Orúnmìlà — the Witness to Creation — a deity said to have been present at the moment God shaped each human destiny before birth. The corpus of Ifá literature — called Odù — contains 256 major chapters, each with hundreds of sacred verses called Ese. Together, they form one of the largest oral literary traditions ever recorded.",
      },
      {
        type: 'paragraph',
        content:
          "In 2005, UNESCO recognized the Ifá divination system as an Intangible Cultural Heritage of Humanity — a remarkable acknowledgment for a tradition that was, for centuries, dismissed by colonial powers as primitive superstition. Wande Abimbola, the author of this foundational study and himself a trained Ifá diviner (Babalawo), was instrumental in that recognition, having spent decades documenting and translating the Ese Ifá — the sacred verses — from oral tradition into written form.",
      },
      {
        type: 'paragraph',
        content:
          "The Ifá system operates through a sophisticated mathematical structure. The 256 Odù correspond to the 256 possible combinations produced by casting either 16 sacred palm nuts (ikin) or a divining chain (opele) of 8 pods. Each combination produces a unique signature pattern, and the Babalawo (Ifá priest) trained to memorize hundreds of Ese — poetic verses containing myths, proverbs, prescriptions, and histories — associated with each Odù.",
      },
      {
        type: 'quote',
        content:
          "Ifá teaches that the boundaries between humans, animals, and spirits are permeable. A diviner who truly understands Ifá can read the messages written in the behavior of animals just as he reads them in the patterns of palm nuts.",
      },
      {
        type: 'paragraph',
        content:
          "Animals appear throughout the Ifá corpus not merely as natural creatures but as spiritual agents with specific relationships to the Orisha — the divine forces that govern the universe. Each Orisha has associated animals that embody their spiritual essence, and specific taboos (eewo) govern the handling of these creatures by their devotees. To violate these taboos is to rupture one's relationship with the divine force one worships.",
      },
      {
        type: 'paragraph',
        content:
          "The Ese Ifá are not merely divination texts — they are a complete library of human experience. They contain myths of creation and destruction, ethical teachings, historical records of kingdoms and their rise and fall, herbal and medical knowledge, and detailed accounts of the relationships between humans, animals, and the divine forces that govern existence. A Babalawo who has truly mastered Ifá carries within his memory the equivalent of a university education in cosmology, history, medicine, ethics, and natural science.",
      },
      {
        type: 'list-title',
        content: 'The structure of the Ifá corpus',
        items: [
          "256 Odù — the major chapters, each a complete cosmological signature",
          "Ese Ifá — the sacred verses, numbered in the hundreds per Odù",
          "Itan — the narrative myths embedded within each verse",
          "Ogede — the proverbs that encode ancestral wisdom",
          "Oogun — the herbal and ritual prescriptions associated with each Odù",
          "Eewo — the taboos and prohibitions specific to each chapter",
          "Ebó — the sacrificial offerings that restore harmony between the human and the divine",
        ],
      },
    ],
  },
  {
    id: 'orishas-sacred-animals',
    titre: 'The Orisha and Their Sacred Animals',
    sousTitre: 'Divine Forces and Animal Embodiments',
    icon: '🌊',
    page: 63,
    sections: [
      {
        type: 'paragraph',
        content:
          "Each Orisha — the divine forces or spiritual archetypes of the Yoruba worldview — has a specific set of sacred animals through which that force is expressed in the natural world. These animals are called ẹranko orísà (animals of the Orisha) and must not be eaten or harmed by devotees of that particular deity. The relationship between an Orisha and its sacred animals is not arbitrary — it emerges from the mythological narratives preserved in the Ifá corpus, which explain how these associations came to be.",
      },
      {
        type: 'paragraph',
        content:
          "Shango, the Orisha of thunder and lightning, is associated with the ram because of a foundational myth in which the ram's horns first gave shape to the power of lightning — striking the earth and returning to the sky. The ram's charge and the crack of thunder are understood as the same force manifested in two different registers: the physical world and the divine. Devotees of Shango do not eat ram; to do so would be to consume the body of the divine force they worship.",
      },
      {
        type: 'paragraph',
        content:
          "Yemoja, the great mother Orisha of rivers and seas, is associated with fish, ducks, and all creatures of fresh water. In her myths, she gave birth to most of the other Orisha, and her waters are understood as the primordial womb of creation itself. The river fish in particular are her children — to harm them carelessly is to disrespect the source of all life. Communities living near rivers traditionally maintained taboos against overfishing or polluting the waters sacred to Yemoja.",
      },
      {
        type: 'list-title',
        content: 'Orisha and their sacred animal correspondences',
        items: [
          "Shango (Sàngó) — God of thunder · Sacred animals: Ram, eagle · Taboo: Eating ram",
          "Yemoja — Goddess of rivers · Sacred animals: Fish, ducks, water creatures · Taboo: Polluting water",
          "Ogún — God of iron and labor · Sacred animals: Dog, tortoise, snail · Taboo: Eating dog",
          "Ọṣọ̀osi — God of hunting · Sacred animals: Deer, bush birds · Taboo: Killing needlessly",
          "Ọṣun — Goddess of love and sweet water · Sacred animals: Peacock, vulture, catfish",
          "Obatala — God of purity · Sacred animals: Snail, white dove, elephant · Taboo: Eating snail",
          "Èṣù — Messenger and guardian of crossroads · Sacred animals: Black birds, the goat",
          "Ọya — Goddess of wind and transformation · Sacred animals: Buffalo, the antelope",
          "Babalú-Ayé — Orisha of disease and healing · Sacred animals: Dog, birds of the earth",
          "Orúnmìlà — Witness to creation, Ifá itself · Sacred animal: The hornbill (Agbe)",
        ],
      },
      {
        type: 'quote',
        content:
          "To harm the sacred animal of an Orisha is to provoke that divine force directly. But to care for it, to feed it and honor it, is to build a living bridge between the human world and the divine.",
      },
      {
        type: 'paragraph',
        content:
          "The ecological implications of these taboos are profound and have been noted by environmental scholars. In communities where Ifá traditions remain strong, populations of certain animals are protected by religious law — not through abstract environmental consciousness, but through a deeply felt understanding that these creatures are sacred and their destruction is an act of sacrilege. The Yoruba concept of eewo (taboo) has functioned, for centuries, as one of the world's most effective systems of wildlife conservation.",
      },
      {
        type: 'paragraph',
        content:
          "When a divination session reveals that a client has violated a taboo related to an Orisha's sacred animal — knowingly or unknowingly — the prescribed remedy always involves both a form of spiritual restitution (offerings, sacrifice, ritual cleansing) and a commitment to future observance. The Ifá system understands that the relationship between humans and the divine is not a one-way channel of petition and blessing — it is a covenant, with responsibilities on both sides.",
      },
    ],
  },
  {
    id: 'birds-ifa-divination',
    titre: 'Birds in Ifá Divination',
    sousTitre: 'Messengers of the Unseen',
    icon: '🦜',
    page: 142,
    sections: [
      {
        type: 'paragraph',
        content:
          "In Ifá literature, birds occupy a position of extraordinary importance as mediators between the visible and invisible worlds. Their ability to move through the air — the domain of the ancestors, the Orisha, and the forces of Àjé (prosperity) — makes them natural intermediaries between human concerns and divine attention. A trained Babalawo reads the behavior of birds as carefully as he reads the fall of palm nuts: both are forms of the same divine communication.",
      },
      {
        type: 'paragraph',
        content:
          "The Parrot (ọpẹlẹ ọde) is considered the vehicle of divine speech because it repeats what it hears — just as the Ifá diviner repeats the words of the oracle to his client. The parrot does not interpret or add to what it receives; it transmits with perfect fidelity. This is understood as a sacred function. The parrot's red tail feathers are used in specific rituals of consecration and are among the most valued items in the Babalawo's ceremonial inventory.",
      },
      {
        type: 'paragraph',
        content:
          "The Agbe (Abyssinian Ground Hornbill) is among the most sacred birds in the Ifá tradition. It is associated with Orúnmìlà himself, and its presence near a divination session is considered powerfully auspicious. Its deep, booming call — audible for great distances across the savanna — is said to echo the voice of the ancestors speaking through the forest. The hornbill is also associated with longevity: it can live for forty years or more, making it a natural symbol of accumulated wisdom and patience.",
      },
      {
        type: 'quote',
        content:
          "When the sacred hornbill calls three times at dawn, the diviner knows that Orúnmìlà is speaking. He must open his divination tray before the first light fully breaks.",
      },
      {
        type: 'paragraph',
        content:
          "The Vulture occupies a complex but highly honored position in Ifá. Often misunderstood in Western contexts as a symbol of death or ill omen, the vulture in Yoruba cosmology is a sacred servant of cosmic order — the purifier who removes what is no longer living and returns it to the earth, preventing disease and making room for new life. The vulture is associated with Ọṣun and with the concept of àṣà — deep ancestral custom — because it performs, selflessly and continuously, the work that must be done even when no one acknowledges it.",
      },
      {
        type: 'paragraph',
        content:
          "One of the most celebrated myths in the Ifá corpus (found in the Odù Ogbe-Meji) recounts how the birds came to hold their power. Originally, all living creatures shared equally in the world's resources. But a drought came, and only the Vulture — scorned by the others — had the patience to wait for what the earth would provide naturally. When the rains returned and abundance flowed again, the Vulture was given the power to see across great distances and to move between the world of the living and the world of the dead without harm.",
      },
      {
        type: 'list-title',
        content: 'Sacred birds and their roles in Ifá tradition',
        items: [
          "Agbe (Ground Hornbill) — Sacred to Orúnmìlà, bearer of ancestral voice, symbol of divination",
          "Parrot — Vehicle of divine speech, transmitter of Ifá messages, used in consecration rituals",
          "Vulture — Sacred purifier, associated with Ọṣun, emblem of patient ancestral wisdom",
          "Peacock — Associated with Ọṣun, beauty of the divine feminine, display of spiritual abundance",
          "Owiwi (Owl) — Messenger of the night, the voice of ancestors after death",
          "Eagle — Solar power, swift divine justice, the eye of Shango in the sky",
          "Swallow — Good fortune arriving, the Orisha's acknowledgment of an offering received",
          "Crow — Trickster energy, associated with Èṣù, the bird of crossroads and paradox",
        ],
      },
    ],
  },
  {
    id: 'odu-teachings',
    titre: 'The 256 Odù',
    sousTitre: 'Animal Teachings from the Core of Ifá',
    icon: '📖',
    page: 198,
    sections: [
      {
        type: 'paragraph',
        content:
          "Each of the 256 Odù of Ifá contains a vast repository of teachings about the relationship between animals, humans, and the divine. These teachings are not abstract theological principles — they are embedded in concrete narrative situations, specific myths, and practical prescriptions that address the full range of human circumstances: health, love, wealth, conflict, grief, ambition, and spiritual direction.",
      },
      {
        type: 'paragraph',
        content:
          "The first Odù, Ogbe-Meji (the double opening), contains myths of the original creation in which animals were the first teachers of humans. In one celebrated verse, a client consults Ifá because he cannot find his path in life. The diviner casts the palm nuts and receives Ogbe-Meji. He narrates the story of the tortoise, who was given the gift of carrying his home on his back — and who learned that this was not a burden but a blessing. The tortoise never need fear homelessness, never need rush toward shelter. The lesson for the client: your resources are already within you.",
      },
      {
        type: 'paragraph',
        content:
          "The Odù Iwori-Meji contains teachings associated with the leopard and its medicine of solitude. In a celebrated verse, the leopard who spends his nights climbing trees alone is laughed at by the lions who hunt in groups. But the leopard endures. When the dry season comes and the water holes shrink, the leopard — who has learned to find prey in the high branches — survives while the lions, dependent on their group strategies, struggle. The Babalawo interprets: your solitary path is not isolation, it is specialization. Your uniqueness is your survival.",
      },
      {
        type: 'quote',
        content:
          "Ifá says: every creature was given its nature for a reason. The snail was given its shell. The bird was given its wings. The fish was given its water. Do not envy another's gifts — discover and inhabit your own. This is the path of Ori — your personal divine consciousness.",
      },
      {
        type: 'paragraph',
        content:
          "The concept of Ori is central to understanding Ifá's animal teachings. Ori — literally 'head' — is the personal divine consciousness that each being carries. Humans have Ori. Animals have Ori. Even the Orisha have Ori. Before birth, each soul kneels before Olodumare (the Supreme Being) and chooses its Ori — its destiny, its nature, its essential character. Animals are therefore understood not as lesser beings but as souls who chose a different form of embodiment, each carrying a specific mission in the great web of existence.",
      },
      {
        type: 'list-title',
        content: 'Animal teachings from selected Odù',
        items: [
          "Ogbe-Meji — The tortoise teaches: your resources are already within you",
          "Oyeku-Meji — The vulture teaches: sacred service continues even when unseen and unthanked",
          "Iwori-Meji — The leopard teaches: solitude cultivated becomes incomparable strength",
          "Odi-Meji — The crab teaches: moving sideways is not retreat, it is strategy",
          "Irosun-Meji — The parrot teaches: speak what you know truly, add nothing",
          "Owonrin-Meji — The monkey teaches: laughter and agility outlast brute force",
          "Obara-Meji — The lion teaches: sovereignty rests in the economy of power",
          "Okanran-Meji — The scorpion teaches: what appears dangerous often carries medicine",
          "Ogunda-Meji — The dog teaches: loyal service is its own form of divinity",
          "Osa-Meji — The rabbit teaches: swift change of direction is not cowardice but intelligence",
        ],
      },
    ],
  },
  {
    id: 'ifa-ecology',
    titre: 'Ifá and the Living World',
    sousTitre: 'Sacred Ecology in the Yoruba Tradition',
    icon: '🌿',
    page: 267,
    sections: [
      {
        type: 'paragraph',
        content:
          "The Ifá system carries within it one of the world's most sophisticated frameworks for understanding the relationship between human beings and the natural environment. This framework is not a separate 'environmental ethics' — it is woven into the very fabric of the cosmological, ethical, and practical teachings of the corpus. To follow Ifá is, among many other things, to participate in an ancient covenant of care for the living world.",
      },
      {
        type: 'paragraph',
        content:
          "The Yoruba concept of Àṣà — deep ancestral custom — includes the accumulated knowledge of how to live within a landscape without destroying it. Communities living under strong Ifá influence maintained, through religious obligation, what modern ecology would recognize as sustainable resource management: restrictions on hunting during breeding seasons (encoded in taboos around sacred animals), prohibitions on clear-cutting forests associated with Orisha groves (the Igbó Òrìṣà), and the maintenance of sacred rivers as protected watersheds.",
      },
      {
        type: 'paragraph',
        content:
          "The Igbó Òrìṣà — the sacred groves dedicated to specific Orisha — are among the most remarkable examples of religiously maintained biodiversity in the world. These forest sanctuaries, typically found near towns and villages, are protected by religious law and by the genuine belief that cutting their trees or disturbing their animals is an act of sacrilege against the Orisha who inhabit them. Studies of these groves have consistently found them to contain far greater biodiversity than surrounding landscapes, serving as refugia for species that have disappeared from unprotected areas.",
      },
      {
        type: 'quote',
        content:
          "The forest is not ours to own. We are its children. The animals are our older brothers and sisters in the family of creation. The Orisha gave us this land in trust — and what has been given in trust must be returned intact to those who come after us.",
      },
      {
        type: 'paragraph',
        content:
          "Ifá teaches that every Odù — every combination in the divination system — has associated plants, animals, colors, and natural phenomena. This means that the diviner's training includes an extensive education in natural history: which plants heal which ailments, which animals signal which changes in the weather or the spirit world, which trees shelter which Orisha. The Babalawo is, in this sense, a trained naturalist whose natural history knowledge is simultaneously ecological and spiritual.",
      },
      {
        type: 'paragraph',
        content:
          "In the contemporary world, as ecological crises deepen, Ifá scholars and practitioners are increasingly recognized as holders of traditional ecological knowledge (TEK) — the accumulated, tested wisdom of generations of careful observation of the natural world. Wande Abimbola himself has spoken extensively about the importance of Ifá's ecological teachings for the present moment, arguing that the crisis of the natural world is inseparable from the spiritual crisis of modernity, and that the recovery of one requires the recovery of the other.",
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   LIVRE 5 — Jamie Sams & David Carson · Medicine Cards (EN, 1988)
───────────────────────────────────────────────────────── */
const MEDICINE_CARDS_CHAPTERS: KnowledgeChapter[] = [
  {
    id: 'medicine-wheel-animals',
    titre: 'The Medicine Wheel',
    sousTitre: 'Animals as Teachers of Sacred Wisdom',
    icon: '☯',
    page: 11,
    sections: [
      {
        type: 'paragraph',
        content:
          "In Native American traditions, every living creature has a place on the Medicine Wheel — the sacred circle that represents the totality of existence. Animals are not below us on a hierarchy; they are our brothers and sisters, our elders in many cases, and our teachers. They chose to incarnate in their specific forms in order to carry specific teachings for two-leggeds who would be willing to listen.",
      },
      {
        type: 'paragraph',
        content:
          "The Medicine Wheel is a map of the cosmos, a teaching tool, and a way of organizing all of existence into a comprehensible, navigable whole. The four cardinal directions — East, South, West, and North — each carry a distinct set of qualities, seasons, ages of life, animal guardians, and spiritual lessons. Moving around the wheel is the primary curriculum of a human life: we are born in the innocence of the East, mature through the trust of the South, encounter the inner knowing of the West, and finally arrive at the wisdom of the North.",
      },
      {
        type: 'paragraph',
        content:
          "The concept of 'medicine' in this tradition does not refer to pharmaceutical remedies. It means power, healing energy, spiritual influence, and the unique gift or quality that any being carries and offers to the world. Every person has a medicine — a specific contribution to the web of life that only they can make. Every animal has a medicine — the particular teaching it embodies. To call on an animal's medicine is to invoke that specific quality and make it available in your own life.",
      },
      {
        type: 'quote',
        content:
          "Each animal that crosses your path carries a message. When you begin to see the creatures around you as living libraries of wisdom rather than as backdrop scenery, your life transforms.",
      },
      {
        type: 'paragraph',
        content:
          "Jamie Sams, one of the co-authors of Medicine Cards, received these teachings over many years from elders of the Seneca, Choctaw, Aztec, Mayan, Turtle Island, and Cherokee traditions. The system presented in this book is not the exclusive property of any single indigenous nation — it draws from a broad river of shared North American indigenous wisdom, filtered through Sams's decades of apprenticeship and spiritual practice.",
      },
      {
        type: 'list-title',
        content: 'The four cardinal directions and their animal guardians',
        items: [
          "East (Eagle) — Illumination, new beginnings, the rising sun, clarity of vision, the season of spring",
          "South (Mouse or Coyote) — Trust, innocence, the present moment, playfulness, the season of summer",
          "West (Bear or Snake) — Introspection, the unknown, the setting sun, inner strength, the season of autumn",
          "North (Buffalo or Owl) — Wisdom, gratitude, the elders, the white of winter, the season of maturity",
          "Above (Eagle or Hawk) — Connection to the Great Spirit, the overview, spirit guides",
          "Below (Mole or Snake) — The earth's wisdom, the roots, ancestral memory",
          "Within (All Animals) — The medicine you carry in your own body and soul",
        ],
      },
      {
        type: 'paragraph',
        content:
          "The Medicine Cards deck, developed alongside this book, presents 44 animal cards — each accompanied by an upright and reversed meaning. The upright meaning addresses the teaching the animal offers when its medicine flows freely. The reversed meaning addresses the teaching of challenge: where might you be blocking this medicine, or where might it be appearing in a distorted form? The system is not predictive — it is reflective. It shows you what is already present in your life, and invites you to work with it consciously.",
      },
    ],
  },
  {
    id: 'eagle-supreme-vision',
    titre: 'Eagle — Wambli Gleska',
    sousTitre: 'Spirit, Courage & Supreme Vision',
    icon: '🦅',
    page: 42,
    sections: [
      {
        type: 'paragraph',
        content:
          "Eagle medicine is the power of the Great Spirit, the connection to the divine. It is the ability to live in the realm of spirit and yet remain connected and balanced within the realm of Earth. Eagle medicine is the gift of clear vision combined with the wisdom to know when to use that vision and when to be still.",
      },
      {
        type: 'paragraph',
        content:
          "The Eagle's power comes from its willingness to both soar — to rise above the ordinary level of perception — and to dive — to bring what it has seen from above into direct, concentrated contact with the earth below. The eagle does not choose one or the other. It lives between the two. This is the central lesson of Eagle medicine: the integration of the spiritual and the material, the visionary and the practical, the divine connection and the earthly commitment.",
      },
      {
        type: 'paragraph',
        content:
          "Those who carry Eagle medicine are asked to accept the responsibility of serving the role of messenger. They must be willing to see their lives clearly — their shadows as well as their gifts — and they must be prepared to fly high enough to witness the patterns of their journey from an elevated vantage point, while also being willing to land and act decisively on what they see.",
      },
      {
        type: 'quote',
        content:
          "Eagle says: you are ready. The cocoon of your limited self-concept is shed. Fly. Look at the full picture. Your medicine is needed — not your hesitation.",
      },
      {
        type: 'paragraph',
        content:
          "In the Lakota tradition, the eagle feather is the most sacred of objects — a direct physical connection between the human world and the divine. Eagle feathers are given as honors of the highest order, worn in ceremonies, used in healing, and placed with the dead. To receive an eagle feather is to receive a responsibility: the responsibility of living in a manner worthy of the trust the eagle has placed in you by offering its feather.",
      },
      {
        type: 'paragraph',
        content:
          "When Eagle medicine appears reversed — when the card is drawn upside down — it signals that your vision is being clouded by ego, by the desire to use your gifts for personal aggrandizement rather than for service. The eagle who hoards its view of the landscape — who sees the patterns of life clearly but keeps that clarity to itself — violates its own medicine. The reversed Eagle asks: where are you seeing clearly but failing to communicate or act on what you see?",
      },
      {
        type: 'list-title',
        content: 'Eagle medicine in practice',
        items: [
          "Develop the ability to see your life from a higher perspective — to view patterns rather than only events",
          "Practice moving between spiritual insight and practical action without losing either",
          "Cultivate the courage to communicate your clear vision even when it is unwelcome",
          "Honor the responsibility that comes with clarity — wisdom withheld is wisdom wasted",
          "Spend time in open landscapes where the sky is visible — let the Eagle's element work on you",
          "When you feel trapped in the details of life, ask: what would I see if I were soaring above this?",
        ],
      },
    ],
  },
  {
    id: 'bear-introspection',
    titre: 'Bear — Mato',
    sousTitre: 'The Keeper of Dreams and Inner Knowing',
    icon: '🐻',
    page: 59,
    sections: [
      {
        type: 'paragraph',
        content:
          "Bear medicine is the power of introspection. The bear is the only large mammal that disappears into the earth for months at a time — entering a state of profound rest and inner gestation during which extraordinary biological transformations occur. A female bear who mates in autumn may not even be aware she is pregnant; the fertilized eggs remain dormant until the body has determined that its reserves are sufficient to support new life. Bear's hibernation is not mere sleep — it is a deliberate retreat into the interior, a willingness to do nothing visible while vast work occurs within.",
      },
      {
        type: 'paragraph',
        content:
          "In many Native American traditions, the bear's den is understood as a sacred space of dreaming. The bear enters this space carrying the questions of the year that has passed, and emerges in spring carrying answers — not in logical form, but as a felt knowing, an altered orientation, a changed relationship to the world. Bear medicine teaches that some questions cannot be answered through analysis or action. They require a willingness to go inward, to enter the darkness, to wait.",
      },
      {
        type: 'quote',
        content:
          "Bear says: the answers you seek are not out there. They are in the quiet place within you that you have been too busy to visit. Go inside. The den is waiting. The dream is ready.",
      },
      {
        type: 'paragraph',
        content:
          "The Hopi people revere the bear as the great medicine healer. In Hopi tradition, the bear is the master of herbs and healing plants — the first being to discover the medicinal properties of the plants that grow from the earth. This association between bear medicine and healing reflects something observed in nature: bears do use specific plants medicinally, and indigenous observers have long noted that following a bear through the forest is a way of learning which plants heal which ailments.",
      },
      {
        type: 'paragraph',
        content:
          "Bear medicine appears in your life when you are being called to honor your need for solitude, for silence, for the inner journey that cannot be made in company. It appears when you have been too long in the world of doing, and your inner life — your dreaming self, your intuitive knowing, your access to the wisdom of your own experience — has been neglected. The bear's invitation is always the same: come inside. What you need is already within you.",
      },
      {
        type: 'list-title',
        content: 'Teachings of Bear medicine',
        items: [
          "Introspection is not self-indulgence — it is a form of sacred inner work",
          "Some transformations require darkness, stillness, and apparent inactivity",
          "Your dreams carry medicine — learn to receive and work with them",
          "The healer within you knows more than your conscious mind acknowledges",
          "Solitude, taken deliberately and respectfully, renews your capacity for community",
          "Trust the wisdom of your body — Bear is deeply somatic, deeply physical medicine",
          "What you carry within from your ancestors is part of your medicine — honor it",
        ],
      },
    ],
  },
  {
    id: 'wolf-pathfinder',
    titre: 'Wolf — Shunkaha Tanka',
    sousTitre: 'The Teacher of New Paths',
    icon: '🐺',
    page: 97,
    sections: [
      {
        type: 'paragraph',
        content:
          "Wolf medicine is the power of the teacher, the pathfinder, the one who goes ahead to discover what lies beyond the current horizon and then returns to share that knowledge with the community. The wolf is the great explorer of the pack — the animal who will spend days ranging far from the group, mapping the landscape, testing the boundaries of the territory, finding the waterholes and the corridors through the mountains — and then returning, not to keep these discoveries for itself, but to lead others to where sustenance can be found.",
      },
      {
        type: 'paragraph',
        content:
          "The social structure of the wolf pack is one of the most sophisticated in the animal kingdom. It is organized not through dominance and submission — as early ethologists incorrectly described it — but through a complex web of affiliation, cooperation, and role specialization. Wolves play together well into old age. They care for each other's young. They support injured or elderly members of the pack. They make decisions collectively. The wolf's medicine is not raw, hierarchical power — it is the wisdom of community organized around shared purpose.",
      },
      {
        type: 'paragraph',
        content:
          "Wolf is the teacher who works through demonstration rather than instruction. The mother wolf does not explain to her cubs how to hunt — she shows them, she plays with them, she allows them to try and fail in safety. Wolf medicine teaches us to learn through direct experience rather than second-hand information, and to teach through living example rather than abstract principle.",
      },
      {
        type: 'quote',
        content:
          "Wolf says: I have walked ahead on this path. I have found the way through the forest. I return to you not to lead you — but to show you that it can be done. Now you must walk it yourself. I will be beside you.",
      },
      {
        type: 'paragraph',
        content:
          "The wolf's howl is one of the most resonant sounds in nature. It carries across vast distances, serving simultaneously as location signal, communal celebration, and territorial declaration. The wolf howls not from loneliness — it howls to say: I am here, I am alive, I am part of this pack, and our song echoes across the land. Wolf medicine invites us to find our own voice — to discover what our unique howl is, and to send it into the world without shame.",
      },
      {
        type: 'list-title',
        content: 'When Wolf medicine appears in your life',
        items: [
          "You are being called to pioneer new territory — in your work, your relationships, or your spiritual life",
          "You have something important to teach — and you are perhaps hesitating to claim that role",
          "Your community needs your scouting gift — the knowledge of what lies ahead on the path",
          "You are learning a new path yourself and need to trust your instincts over received wisdom",
          "Your howl has been silent too long — it is time to find and use your authentic voice",
          "The balance between community belonging and individual ranging needs attention",
        ],
      },
    ],
  },
  {
    id: 'turtle-mother-earth',
    titre: 'Turtle — Keya',
    sousTitre: 'Mother Earth and the Shell of Protection',
    icon: '🐢',
    page: 193,
    sections: [
      {
        type: 'paragraph',
        content:
          "In many Native American creation myths, it was Turtle who volunteered to bear the weight of the new world on her back. She is the oldest symbol of Mother Earth — her shell the firmament of continents, her belly the waters beneath the world. Turtle medicine is the foundation itself: patience, groundedness, the willingness to carry one's home on one's back and never be lost.",
      },
      {
        type: 'paragraph',
        content:
          "The turtle carries the 13 moons of the year on her back — the number of segments in the center of her shell matches the number of months in the lunar calendar. This is not a coincidence in the indigenous understanding — it is a teaching embedded in the very body of the creature. The turtle's back is a lunar calendar, a record of cyclical time, a reminder that life moves not in straight lines of progress but in circles of recurrence and renewal.",
      },
      {
        type: 'paragraph',
        content:
          "The turtle's shell is simultaneously armor and home. Unlike any other creature on earth, the turtle cannot be separated from its house — the shell is not a refuge it enters and leaves, but part of its living body, fused to its spine and ribs. This is Turtle's deepest teaching: your home is not a place you go to — it is something you carry within you. Your safety comes not from external circumstances but from your relationship to your own center.",
      },
      {
        type: 'quote',
        content:
          "Turtle teaches: you do not need to rush to your destiny. It is already written on your back. Walk, breathe, feel the earth beneath you, and trust that you will arrive exactly when you are meant to.",
      },
      {
        type: 'paragraph',
        content:
          "Turtle medicine also carries the teaching of appropriate pace. In a culture that worships speed and equates acceleration with progress, Turtle is a radical teacher: slow down. Not because speed is wrong, but because the things worth doing in a human life — loving, healing, creating, understanding, growing — cannot be rushed without being broken. The gardener who tears open a seed pod to accelerate the flower's blooming destroys the very thing she sought to hasten.",
      },
      {
        type: 'paragraph',
        content:
          "When Turtle medicine appears in its reversed position, it speaks of withdrawal that has become excessive — the retreat into one's shell that was once healthy self-protection but has become isolation. It asks: have you been so focused on protecting yourself that you have forgotten to move forward? The turtle's shell is for specific moments of danger, not for permanent residence. The world outside your shell needs your participation.",
      },
      {
        type: 'list-title',
        content: 'Turtle medicine teachings for daily life',
        items: [
          "Practice deliberate slowness in at least one area of your life — let a process unfold at its natural pace",
          "Tend to your home — physical space, inner space, and the space you carry between yourself and others",
          "Work with the moon's cycles — observe how your energy, creativity, and emotions move with the lunar rhythm",
          "When overwhelmed, do not accelerate — withdraw, breathe, find your center, then proceed",
          "Trust your longevity — you are building something that will outlast your impatience",
          "Feel the earth — walk barefoot, put your hands in soil, remember what holds you",
          "Honor what you carry — your history, your ancestors, your experience are not burdens but your medicine",
        ],
      },
    ],
  },
  {
    id: 'coyote-trickster',
    titre: 'Coyote — The Sacred Trickster',
    sousTitre: 'Laughter, Paradox and Hidden Wisdom',
    icon: '🦊',
    page: 89,
    sections: [
      {
        type: 'paragraph',
        content:
          "Coyote is the trickster — the holy fool — of the Medicine Wheel. His medicine is paradox, laughter, and the willingness to walk into situations that look foolish to others. But Coyote's foolishness is often a higher wisdom in disguise. He teaches by absurdity, by upending expectations, by making us laugh at our own rigidities. Coyote arrives when we have become too serious, too certain, too attached to our own understanding of how things are and should be.",
      },
      {
        type: 'paragraph',
        content:
          "The trickster is one of the most universal archetypes in world mythology. In West African traditions, this same energy is embodied by Anansi the Spider, by Eshu the trickster deity at the crossroads, by Legba the liminal guardian who controls all communication between humans and the divine. Wherever boundaries need to be crossed and rules need to be questioned, the trickster animal appears. It is the force that prevents any system — social, spiritual, or philosophical — from becoming too rigid to allow life to flow through it.",
      },
      {
        type: 'paragraph',
        content:
          "Coyote is also the great survivor. Despite centuries of systematic extermination campaigns by American ranchers and government agencies — programs that killed millions of individual coyotes — the coyote population in North America has actually expanded, not contracted, over the past two hundred years. Coyote now inhabits cities, suburbs, parks, and landscapes its ancestral populations never occupied. This extraordinary resilience is itself a teaching: the qualities that make something annoying and inconvenient to power — adaptability, cunning, the refusal to be trapped into predictable behavior — are precisely the qualities that ensure survival.",
      },
      {
        type: 'quote',
        content:
          "If Coyote has entered your cards today, look at where you have been taking yourself too seriously. Where have you been afraid to be wrong? The joke is always on the one who forgets to laugh.",
      },
      {
        type: 'paragraph',
        content:
          "Coyote medicine challenges us to examine our relationship to our own self-image. We all have a story about who we are — a narrative of competence and virtue and coherent purpose. Coyote loves nothing more than to tangle those stories, to demonstrate through perfectly arranged humiliations that we are simultaneously more and less than we think. This is not cruelty — it is the deepest form of care. The ego that cannot laugh at itself is an ego too brittle to serve genuine growth.",
      },
      {
        type: 'paragraph',
        content:
          "When Coyote medicine appears in your life — through unexpected reversals, comic misunderstandings, situations that refuse to resolve the way you planned — the invitation is not to be frustrated but to be curious. What is the universe arranging? What is trying to get your attention by refusing to follow the script you wrote? Where have you been so certain of the outcome that you stopped paying attention to what is actually happening?",
      },
      {
        type: 'list-title',
        content: 'Working with Coyote medicine',
        items: [
          "When life goes sideways, ask: what can only be seen from this unplanned angle?",
          "Practice laughing at yourself — genuinely and without shame",
          "Notice where your certainty has made you rigid — what beliefs are you unable to question?",
          "Deliberately do something playful and apparently 'useless' — Coyote medicine lives in play",
          "When Coyote's chaos arrives, resist the urge to immediately restore order — wait and watch",
          "Study the creative possibilities in failure — Coyote considers failure a prerequisite for real learning",
          "Remember that the trickster serves the larger pattern, even when the immediate experience is maddening",
        ],
      },
    ],
  },
  {
    id: 'hawk-messenger',
    titre: 'Hawk — Cetan',
    sousTitre: 'The Messenger of Omens',
    icon: '🦁',
    page: 35,
    sections: [
      {
        type: 'paragraph',
        content:
          "Hawk is the messenger, the one sent by the universe to deliver communications of critical importance. When Hawk appears in your life — screeching across the sky, landing near you, circling above a significant place — something is being communicated. Something requires your attention. The hawk's cry is one of the most piercing sounds in nature: it cuts through ambient noise and demands to be heard. This is the nature of Hawk medicine: it carries messages that cannot be ignored.",
      },
      {
        type: 'paragraph',
        content:
          "The Red-Tailed Hawk, native to the Americas, is the variety most commonly associated with Hawk medicine in the traditions from which this system draws. Its red tail — visible in flight as a brilliant flash of color — is understood as a flag, a signal, a visible sign of the message being carried. Indigenous peoples observed that the red tail becomes visible precisely when the hawk is diving — committing fully to the pursuit of its target. The message and the commitment to acting on it arrive together.",
      },
      {
        type: 'paragraph',
        content:
          "Hawk's vision is one of the most extraordinary in the natural world. It can see small prey from great heights, track movement that would be invisible to human eyes, and judge distance with a precision our optical system cannot approach. Its medicine, therefore, is not just the message — it is the seeing. Hawk teaches us to develop our own perceptual acuity: to notice what others miss, to read situations with accuracy, to distinguish between what is actually present and what we merely project onto what we see.",
      },
      {
        type: 'quote',
        content:
          "Hawk says: stop. Look. What is right in front of you that you have not allowed yourself to fully see? The answer you have been seeking is not hidden — you have simply not been willing to look at it directly.",
      },
      {
        type: 'paragraph',
        content:
          "In many indigenous traditions of the Americas, the appearance of a hawk before a significant journey, decision, or life transition is taken as a blessing and a sign of protection. The hawk scouts the way ahead — its superior vision identifies the dangers and the openings that the human traveler cannot yet perceive. To pray with Hawk medicine before a new undertaking is to ask for the gift of clear perception, accurate judgment, and the courage to act decisively on what you see.",
      },
      {
        type: 'list-title',
        content: 'Signs that Hawk medicine is active in your life',
        items: [
          "A hawk appears repeatedly in your environment, often at meaningful moments",
          "You are receiving messages, insights, or intuitions that feel urgent and important",
          "Someone in your life is bringing you a critical truth that you need to hear",
          "You are being called to develop your perceptual capacities — to see more clearly",
          "A decision requires accurate assessment rather than wishful thinking",
          "The universe is trying to get your attention and gentle signals have not worked",
          "You are at a threshold moment — a new chapter is beginning, and you need clear vision to navigate it",
        ],
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   EXPORT — All books
───────────────────────────────────────────────────────── */
export const KNOWLEDGE_BOOKS: KnowledgeBook[] = [
  {
    id: 'phillips-2010',
    titre: 'Sacred Animals in West Africa',
    titreFr: "Les Animaux Sacrés d'Afrique de l'Ouest",
    auteur: 'Karin-Beate Phillips',
    annee: 2010,
    editeur: 'SOS-SaveOurSkills Publications',
    langue: 'Anglais / Allemand',
    langueEmoji: '🇬🇧',
    icon: '🌍',
    couleur: '#C9A84C',
    description:
      "Cet ouvrage explore les animaux sacrés de l'Afrique de l'Ouest à travers les traditions animistes, les identités culturelles et la préservation du patrimoine ancestral.",
    isbn: '978-3-942331-00-5',
    chapitres: PHILLIPS_CHAPTERS,
  },
  {
    id: 'andrews-1993',
    titre: 'Animal-Speak',
    titreFr: 'Pouvoirs Spirituels et Magiques des Créatures',
    auteur: 'Ted Andrews',
    annee: 1993,
    editeur: 'Llewellyn Publications',
    langue: 'Anglais',
    langueEmoji: '🇺🇸',
    icon: '🐺',
    couleur: '#5B8A4A',
    description:
      'Un guide fondamental sur les totems animaux, les esprits guides et les messages spirituels que portent les animaux dans les traditions chamaniques et autochtones du monde entier.',
    isbn: '978-0-87542-028-8',
    chapitres: ANDREWS_CHAPTERS,
  },
  {
    id: 'charbonneau-1940',
    titre: 'Le Bestiaire du Christ',
    titreFr: 'Le Bestiaire du Christ',
    auteur: 'Louis Charbonneau-Lassay',
    annee: 1940,
    editeur: 'Desclée de Brouwer',
    langue: 'Français',
    langueEmoji: '🇫🇷',
    icon: '✟',
    couleur: '#8B3A5A',
    description:
      "Chef-d'œuvre de l'érudition mystique, cet ouvrage recense plus de 500 animaux de l'iconographie chrétienne médiévale et retrace l'origine de leur symbolisme sacré.",
    isbn: '978-2-220-02126-2',
    chapitres: CHARBONNEAU_CHAPTERS,
  },
  {
    id: 'abimbola-1976',
    titre: 'Ifá: An Exposition of Ifá Literary Corpus',
    titreFr: 'Ifá : Exposition du Corpus Littéraire',
    auteur: 'Wande Abimbola',
    annee: 1976,
    editeur: 'Oxford University Press Nigeria',
    langue: 'Anglais',
    langueEmoji: '🇳🇬',
    icon: '◉',
    couleur: '#C47A1E',
    description:
      'Référence essentielle sur le système de divination Ifá des Yoruba, explorant les relations entre les Orisha, les animaux sacrés et le corpus de sagesse ancestrale.',
    isbn: '978-0-19-575394-2',
    chapitres: ABIMBOLA_CHAPTERS,
  },
  {
    id: 'sams-carson-1988',
    titre: 'Medicine Cards',
    titreFr: 'Cartes de Médecine Animale',
    auteur: 'Jamie Sams & David Carson',
    annee: 1988,
    editeur: 'Bear & Company',
    langue: 'Anglais',
    langueEmoji: '🇺🇸',
    icon: '☯',
    couleur: '#4A6B8A',
    description:
      'Un système de sagesse amérindienne transmis oralement, révélant les enseignements spirituels portés par 44 animaux sacrés de la roue de médecine.',
    isbn: '978-0-312-20768-1',
    chapitres: MEDICINE_CARDS_CHAPTERS,
  },
];

export const KNOWLEDGE_CHAPTERS = PHILLIPS_CHAPTERS;
