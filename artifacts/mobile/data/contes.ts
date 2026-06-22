export interface ConteSection {
  type: 'paragraph' | 'quote' | 'moral';
  content: string;
}

export interface Conte {
  id: string;
  titre: string;
  animal: string;
  animalIcon: string;
  tradition: string;
  region: string;
  duree: string; // "5 min", "8 min"
  couleur: string;
  resume: string;
  contenu: ConteSection[];
  morale: string;
}

export const CONTES: Conte[] = [
  {
    id: 'conte-anansi-sagesse',
    titre: "Anansi et la Sagesse du Monde",
    animal: "Araignée",
    animalIcon: "🕷️",
    tradition: "Akan (Ghana / Côte d'Ivoire)",
    region: "Afrique de l'Ouest",
    duree: "7 min",
    couleur: "#C4622D",
    resume: "L'araignée Anansi réunit toute la sagesse du monde dans une calebasse — et découvre qu'on ne peut la garder pour soi.",
    contenu: [
      {
        type: 'paragraph',
        content: "Il y a très longtemps, dans les temps où les animaux parlaient encore avec les hommes, Anansi l'araignée décida qu'il deviendrait le plus sage de toutes les créatures. Son plan était simple mais ambitieux : il allait rassembler toute la sagesse du monde dans une seule calebasse et la garder jalousement pour lui seul.",
      },
      {
        type: 'paragraph',
        content: "Pendant de longues saisons, Anansi parcourut forêts, savanes et villages. Partout où une parole sage était prononcée, il tendait l'oreille. Partout où un vieux sage enseignait, il s'approchait furtivement, capturait les mots dans sa calebasse et scellait le couvercle. Il recueillit ainsi les conseils des anciens, les proverbes des griots, les secrets des guérisseurs et la prudence des chasseurs.",
      },
      {
        type: 'quote',
        content: "« Bientôt, se disait-il en chemin, je serai le seul à savoir. Tous viendront me consulter. Je serai plus puissant que le roi lui-même. »",
      },
      {
        type: 'paragraph',
        content: "Quand la calebasse fut pleine à déborder, Anansi voulut la cacher dans un endroit sûr, au sommet du plus grand fromager de la forêt. Il attacha la calebasse devant son ventre et commença à grimper. Mais la calebasse l'encombrait terriblement : ses pattes glissaient, il ne pouvait pas trouver ses appuis, et il retombait sans cesse.",
      },
      {
        type: 'paragraph',
        content: "Son jeune fils, Ntikuma, l'observait depuis le sol. Après la troisième chute de son père, l'enfant dit d'une voix douce : « Père, ne serait-il pas plus facile de porter la calebasse dans ton dos plutôt que devant toi ? »",
      },
      {
        type: 'paragraph',
        content: "Anansi s'arrêta. Il déplaça la calebasse dans son dos, et en effet, il grimpa sans peine jusqu'au sommet du fromager. Mais là, assis sur la plus haute branche, il resta longtemps silencieux. Son fils, un enfant qui n'avait jamais touché à la calebasse, venait de lui enseigner quelque chose qu'elle ne contenait pas.",
      },
      {
        type: 'paragraph',
        content: "Dans un geste de colère et de honte mêlées, Anansi lança la calebasse du haut de l'arbre. Elle se fracassa sur les racines du fromager, et toute la sagesse qu'elle contenait s'éparpilla aux quatre vents, se répandit sur les rivières, dans les feuilles, dans le souffle du vent. Depuis ce jour, la sagesse appartient à tout le monde.",
      },
      {
        type: 'quote',
        content: "« La sagesse est comme l'eau de pluie : elle ne peut appartenir à un seul homme. »\n— Proverbe akan",
      },
    ],
    morale: "Nul ne peut posséder toute la sagesse — car même le plus savant peut apprendre d'un enfant. Vouloir garder la connaissance pour soi, c'est déjà la perdre.",
  },

  {
    id: 'conte-lion-souris',
    titre: "Le Lion et la Petite Souris",
    animal: "Lion",
    animalIcon: "🦁",
    tradition: "Mandingue (Mali / Guinée)",
    region: "Afrique de l'Ouest",
    duree: "5 min",
    couleur: "#D4A017",
    resume: "Le roi des animaux épargne une souris par pitié — et cette infime créature lui sauvera la vie le jour où il en aura le plus besoin.",
    contenu: [
      {
        type: 'paragraph',
        content: "Le Lion, seigneur de la savane, dormait un après-midi à l'ombre d'un acacia centenaire. La chaleur était lourde, les mouches seules osaient troubler le silence. C'est alors qu'une petite souris, courant sans regarder où elle allait, trébucha sur la patte du Lion et lui grimpa sur le museau.",
      },
      {
        type: 'paragraph',
        content: "Le Lion se réveilla en sursaut, rugit, et d'un coup de patte agile, immobilisa la malheureuse. La souris, tremblante comme une feuille sèche dans le vent, implora grâce.",
      },
      {
        type: 'quote',
        content: "« Grand Roi, je t'en supplie, épargne-moi ! Je n'ai rien fait de mal — mes pattes sont trop petites pour déranger un aussi puissant seigneur. Et qui sait ? Peut-être qu'un jour je pourrai te rendre service à mon tour. »",
      },
      {
        type: 'paragraph',
        content: "Le Lion éclata de rire. Lui, être un jour secouru par une souris ? L'idée était si ridicule qu'elle l'amusa profondément. De bonne humeur, il ouvrit sa patte et laissa partir la petite créature.",
      },
      {
        type: 'paragraph',
        content: "Quelques semaines plus tard, des chasseurs tendirent un filet solide dans la forêt. Le Lion, distrait par la poursuite d'une proie, tomba dans le piège. Il rugit, se débattit, mais plus il luttait, plus les mailles se resserraient. Ses rugissements de détresse résonnèrent jusqu'aux collines.",
      },
      {
        type: 'paragraph',
        content: "La petite souris les entendit. Elle reconnut la voix de celui qui lui avait accordé la vie. Sans hésiter, elle courut vers le filet et commença à ronger les cordes, l'une après l'autre, de ses petites dents acérées. Au bout d'une longue heure de travail acharné, elle avait ouvert une brèche suffisante. Le Lion se faufila et s'élança, libre, dans la savane.",
      },
      {
        type: 'paragraph',
        content: "Il se tourna vers la petite souris, et cette fois, son regard ne contenait plus de mépris. Il s'inclina lentement, de toute sa hauteur de roi.",
      },
      {
        type: 'quote',
        content: "« Aujourd'hui, c'est toi le plus grand, petite sœur. Pardonne-moi d'avoir ri. »",
      },
    ],
    morale: "La bonté ne demande pas de calcul. Quand tu épargnes une vie, même petite, tu plantes une graine de gratitude qui peut te sauver au moment où tu t'y attends le moins. Nul n'est trop petit pour être utile.",
  },

  {
    id: 'conte-lièvre-hyene',
    titre: "Le Lièvre et la Hyène Gourmande",
    animal: "Lièvre",
    animalIcon: "🐇",
    tradition: "Wolof (Sénégal / Gambie)",
    region: "Afrique de l'Ouest",
    duree: "6 min",
    couleur: "#8B6914",
    resume: "La hyène veut tout manger sans partager — le lièvre lui tend un piège de mots et de ruse dont elle ne sortira pas à son avantage.",
    contenu: [
      {
        type: 'paragraph',
        content: "En ce temps-là, une grande sécheresse s'était abattue sur la savane. Les rivières n'étaient plus que des traits de boue craquelée, et trouver de la nourriture était devenu l'affaire de toute la journée. La Hyène, connue de tous pour sa voracité et son manque de générosité, avait pourtant trouvé un champ de mil abandonné, dont elle comptait bien profiter seule.",
      },
      {
        type: 'paragraph',
        content: "Le Lièvre, lui, n'avait rien trouvé depuis deux jours. Quand il vit la Hyène trotter vers le champ avec un air de propriétaire, il devina la situation. Il décida de l'aborder.",
      },
      {
        type: 'quote',
        content: "« Grande sœur Hyène, quelle chance de te rencontrer ! J'allais justement chercher de quoi manger. Si tu sais où trouver de la nourriture, dis-le-moi, et en échange, je te donnerai quelque chose de bien plus précieux que du mil. »",
      },
      {
        type: 'paragraph',
        content: "La Hyène ricana. « Rien n'est plus précieux que la nourriture, petit imposteur. » Mais la curiosité était plus forte que la méfiance. « De quoi s'agit-il ? »",
      },
      {
        type: 'paragraph',
        content: "Le Lièvre sortit une petite pierre lisse de sa poche. « Cette pierre magique, dit-il d'une voix grave, permet de cuire de la viande sans feu. Il suffit de la mettre dans une marmite d'eau froide avec la viande, et au bout d'une heure, tout est cuit à la perfection. Les anciens me l'ont donnée il y a longtemps. » La Hyène écarquilla les yeux.",
      },
      {
        type: 'paragraph',
        content: "« Je t'échange cette pierre contre l'emplacement de ta réserve de mil », proposa le Lièvre. La Hyène accepta sans réfléchir. Elle conduisit le Lièvre au champ, et lui remit en retour la pierre. Ils partagèrent le mil ce jour-là, et la Hyène, impatiente, rentra chez elle avec la pierre.",
      },
      {
        type: 'paragraph',
        content: "Toute la nuit, la Hyène attendit que l'eau froide cuise sa viande. Elle attendit, attendit encore. L'eau resta froide. La viande resta crue. Au matin, fourbue et affamée, elle courut chercher le Lièvre pour lui demander des explications. Mais le Lièvre avait, bien sûr, disparu depuis longtemps. Il avait laissé seulement un message tracé sur la terre avec un bâton :",
      },
      {
        type: 'quote',
        content: "« La prochaine fois, grande sœur, partage d'abord. Tu éviteras qu'on te partage autrement. »",
      },
    ],
    morale: "L'avarice attire la ruse. Celui qui refuse de partager librement finit souvent par être dupé et perd plus qu'il n'aurait donné. La générosité est le meilleur bouclier contre la tromperie.",
  },

  {
    id: 'conte-leopard-taches',
    titre: "Pourquoi le Léopard a des Taches",
    animal: "Léopard",
    animalIcon: "🐆",
    tradition: "Bété (Côte d'Ivoire)",
    region: "Afrique de l'Ouest",
    duree: "6 min",
    couleur: "#A0522D",
    resume: "Le léopard était autrefois d'un seul éblouissant jaune d'or — jusqu'au jour où la jalousie et l'orgueil lui valurent une leçon que sa peau porte encore.",
    contenu: [
      {
        type: 'paragraph',
        content: "Au commencement du monde, le Léopard n'avait pas de taches. Sa fourrure était d'un jaune doré parfaitement uni, qui brillait comme du soleil liquide quand il marchait dans la savane. Il était, de loin, le plus bel animal de la forêt, et il le savait. Il le savait même un peu trop bien.",
      },
      {
        type: 'paragraph',
        content: "Un jour, la Zèbre arriva dans la région avec sa robe d'un blanc éclatant rayée de noir. Tous les animaux s'arrêtèrent pour l'admirer. Les oiseaux chantèrent plus fort, les singes s'approchèrent curieux, même les vieux éléphants levèrent les yeux. Le Léopard observait la scène, les oreilles basses, le cœur brûlant de jalousie.",
      },
      {
        type: 'quote',
        content: "« Comment ose-t-on admirer cette créature zébrée quand je suis là ? Je suis plus puissant, plus rapide, plus majestueux ! »",
      },
      {
        type: 'paragraph',
        content: "Cette nuit-là, le Léopard alla trouver le vieux Caméléon, gardien des couleurs. « Donne-moi des motifs encore plus beaux que ceux de la Zèbre. Je veux qu'on ne puisse plus regarder qu'elles. » Le Caméléon, sage et prudent, l'avertit : « Les marques que l'on porte par vanité restent pour toujours. Es-tu certain ? »",
      },
      {
        type: 'paragraph',
        content: "Le Léopard, impatient, répondit qu'il ne changerait jamais d'avis. Le Caméléon trempa sa queue dans l'encre de la nuit et traça sur la fourrure du Léopard des taches sombres, rondes et profondes. Au matin, le Léopard s'admira dans le miroir d'un lac calme — et il fut satisfait.",
      },
      {
        type: 'paragraph',
        content: "Mais les taches avaient un effet qu'il n'avait pas prévu : dans la forêt tachetée d'ombres et de lumière, son motif le rendait invisible. Il pouvait approcher les proies sans être vu. Il était devenu un chasseur redoutable — mais plus jamais les animaux ne l'admireraient au grand jour, car nul ne le voyait venir.",
      },
      {
        type: 'paragraph',
        content: "La Zèbre, elle, gardait ses rayures franches et vivait en troupeau dans la plaine ouverte. Elle était belle au soleil pour tous ceux qui voulaient la voir. Le Léopard, lui, restait seul dans l'ombre de ses propres désirs.",
      },
      {
        type: 'quote',
        content: "« La vraie beauté ne cherche pas à éclipser les autres. Elle illumine autour d'elle. »",
      },
    ],
    morale: "La jalousie et la vanité transforment nos plus beaux dons en chaînes. Vouloir être plus que les autres par dépit nous éloigne souvent de la lumière que nous cherchions.",
  },

  {
    id: 'conte-elephant-tortue',
    titre: "L'Éléphant, la Tortue et le Secret du Fleuve",
    animal: "Éléphant",
    animalIcon: "🐘",
    tradition: "Baoulé (Côte d'Ivoire)",
    region: "Afrique de l'Ouest",
    duree: "8 min",
    couleur: "#556B2F",
    resume: "L'éléphant croit que sa force lui suffit pour tout — la tortue centenaire lui révèle pourquoi la patience est plus puissante que la puissance.",
    contenu: [
      {
        type: 'paragraph',
        content: "Le grand fleuve Comoé traversait la forêt depuis des temps immémoriaux. Chaque saison des pluies, il gonflait, débordait, et les animaux devaient attendre patiemment qu'il retrouve son lit. Tous, sauf l'Éléphant, qui traversait à sa guise, bousculant courant et rochers de ses immenses pattes.",
      },
      {
        type: 'paragraph',
        content: "La Tortue, elle, vivait sur la berge depuis plus longtemps que tous les autres animaux. Elle avait vu naître les baobabs qui bordaient le fleuve. Elle avait vu des générations d'éléphants venir et partir. Quand l'Éléphant passait près d'elle dans une gerbe d'éclaboussures, il ne lui accordait jamais un regard.",
      },
      {
        type: 'paragraph',
        content: "Un soir de grande crue, une lionne vint chercher la Tortue, épuisée et inquiète. « Mon petit est coincé sur l'île au milieu du fleuve. Le courant est trop fort pour moi. Personne ne peut traverser. » L'Éléphant, qui entendait cela, s'avança fièrement. « Je vais traverser, moi ! » Il entra dans l'eau avec fracas.",
      },
      {
        type: 'paragraph',
        content: "Mais le courant cette nuit-là était d'une violence qu'il n'avait jamais connue. Les roches du fond avaient bougé avec la crue. L'Éléphant trébucha, perdit l'équilibre, et fut emporté sur quelques mètres avant de réussir à se stabiliser contre un arbre submergé. Il revint à la berge, honteux, la tête basse.",
      },
      {
        type: 'paragraph',
        content: "La Tortue s'était mise en route sans rien dire. Tout le monde la regardait, incrédule. Elle entra dans l'eau, si lentement que cela paraissait impossible. Mais elle connaissait le fleuve dans ses moindres détours — elle l'observait depuis des décennies. Elle savait exactement où les roches formaient des marches naturelles, où le courant faiblissait derrière un coude de la berge.",
      },
      {
        type: 'paragraph',
        content: "En longeant ces passages invisibles, marchant sous la surface là où l'eau était presque calme, la Tortue atteignit l'île. Elle guida le lionceau vers l'eau peu profonde, et tous deux revinrent à la berge. La traversée avait pris deux heures. Mais elle avait réussi.",
      },
      {
        type: 'quote',
        content: "« J'ai eu cent ans pour apprendre ce fleuve, dit la Tortue à l'Éléphant. Toi, tu n'as eu que ta force. Ce n'est pas assez. »",
      },
      {
        type: 'paragraph',
        content: "Depuis ce jour, l'Éléphant s'arrêtait toujours un moment près de la Tortue avant de traverser, et lui demandait : « Par où passe-t-on ce soir, vieille sage ? »",
      },
    ],
    morale: "La force physique impressionne, mais la patience et l'observation accumulées sur des années dépassent toute puissance brute. L'humilité devant la sagesse des anciens n'est pas une faiblesse — c'est une intelligence.",
  },

  {
    id: 'conte-aigle-serpent',
    titre: "L'Aigle Royal et le Grand Serpent",
    animal: "Aigle",
    animalIcon: "🦅",
    tradition: "Dogon (Mali)",
    region: "Afrique de l'Ouest",
    duree: "7 min",
    couleur: "#8B0000",
    resume: "L'aigle, maître du ciel, et le serpent, gardien de la terre, s'affrontent — jusqu'à ce qu'un paysan leur révèle que le vrai courage est de s'arrêter.",
    contenu: [
      {
        type: 'paragraph',
        content: "Dans les falaises de Bandiagara, là où la roche rouge tombe à pic sur la plaine du Seno, vivait l'Aigle Royal. Son domaine s'étendait à perte de vue, et nul n'osait le défier dans les airs. En bas, dans les rochers et les terriers, régnait le Grand Serpent Python, seigneur des profondeurs et de l'ombre.",
      },
      {
        type: 'paragraph',
        content: "Depuis des générations, une guerre sourde opposait les deux seigneurs. L'Aigle fondait sur les proies du Serpent ; le Serpent empoisonnait les sources où l'Aigle venait boire. Les animaux de la région vivaient dans la peur, pris entre deux colères.",
      },
      {
        type: 'paragraph',
        content: "Un jour, un vieux paysan Dogon vit les deux bêtes en train de se battre au bord d'un champ. L'Aigle griffait, le Serpent mordait. Tous deux saignaient. Tous deux refusaient de lâcher prise. Le vieux s'approcha et parla d'une voix ferme, sans élever le ton :",
      },
      {
        type: 'quote',
        content: "« Aigle, qu'as-tu mangé ce matin ? — Une souris volée au Serpent. Et toi, Serpent, qu'as-tu bu hier soir ? — L'eau d'une source que j'ai troublée pour l'Aigle. Alors qui a commencé ? »",
      },
      {
        type: 'paragraph',
        content: "Ni l'un ni l'autre ne put répondre. La querelle remontait si loin que ses origines s'étaient perdues dans les générations. Ils se bataillaient par habitude, par orgueil, parce que c'est ce qu'ils avaient toujours fait.",
      },
      {
        type: 'paragraph',
        content: "Le vieux paysan s'accroupit et traça deux lignes dans la poussière. « Voici le ciel, voici la terre. Vous n'avez jamais voulu habiter le même espace. Pourtant, sans la pluie que tu attrapes dans tes ailes, Aigle, la terre du Serpent serait stérile. Et sans les vers et les petits animaux que le Serpent garde dans le sol, les proies de l'Aigle mourraient de faim. » Il effaça les deux lignes et n'en traça plus qu'une. « Vous ne pouvez pas vivre l'un sans l'autre. »",
      },
      {
        type: 'paragraph',
        content: "Le silence qui suivit dura longtemps. L'Aigle ouvrit ses ailes et s'éleva lentement. Le Serpent se glissa entre les rochers. Ce jour-là, ils ne se battirent plus. Les villageois, qui avaient observé la scène, dirent que c'est depuis ce jour-là que l'aigle et le serpent sont les deux gardiens du monde — l'un veille en haut, l'autre en bas, et ensemble ils tiennent le monde en équilibre.",
      },
    ],
    morale: "Les vieilles querelles survivent souvent à leurs raisons. Il faut le courage de s'arrêter et de regarder ce qu'on défend vraiment — parfois on défend seulement notre orgueil. La paix demande plus de bravoure que la guerre.",
  },

  {
    id: 'conte-singe-curiosite',
    titre: "Le Singe Trop Curieux",
    animal: "Singe",
    animalIcon: "🐒",
    tradition: "Fon (Bénin / Togo)",
    region: "Afrique de l'Ouest",
    duree: "5 min",
    couleur: "#2E8B57",
    resume: "Le singe ignore tous les avertissements et va fouiller dans la maison du féticheur — ce qu'il y trouve lui enseignera le respect des limites.",
    contenu: [
      {
        type: 'paragraph',
        content: "Au village de Tohossou, il y avait un singe qui avait la réputation de n'écouter personne. Quand les anciens disaient « n'entre pas dans la forêt sacrée », il y entrait. Quand on disait « ne touche pas aux offrandes du carrefour », il les renversait. On l'appelait Yovi, ce qui signifie « celui qui sait mieux ».",
      },
      {
        type: 'paragraph',
        content: "Un matin, le féticheur du village s'absenta pour trois jours, laissant sa maison fermée. Avant de partir, il avait averti tous les animaux : « Ne touchez pas à ma maison. À l'intérieur se trouvent des choses qui ne supportent pas d'être vues par des yeux non initiés. »",
      },
      {
        type: 'paragraph',
        content: "Le Perroquet, le Crapaud et la Tortue transmirent l'avertissement à Yovi. « Nous t'en supplions, cette fois, respecte la parole du vieux. » Yovi les regarda avec son sourire habituel. « Les vieux disent toujours 'ne touche pas' pour garder les bonnes choses pour eux. Je veux voir ce qu'il cache. »",
      },
      {
        type: 'paragraph',
        content: "Dès la nuit tombée, Yovi força la fenêtre de bambou et entra. À l'intérieur, il faisait noir et une odeur de racines et de cendres flottait. Ses yeux s'habituèrent à l'obscurité. Il vit des calebasses, des flacons, des petits totems. Intrigué, il saisit une calebasse et l'ouvrit.",
      },
      {
        type: 'paragraph',
        content: "Il ne vit rien de spectaculaire — juste de la poudre ocre et des plumes. Déçu, il en saisit une autre, puis une troisième, les renversant toutes. Quand il voulut repartir, il s'aperçut qu'il ne retrouvait plus la fenêtre. Ses yeux ne distinguaient plus rien. La maison lui semblait changer de forme autour de lui. Il tourna en rond toute la nuit, en proie à des peurs qu'il n'avait jamais connues.",
      },
      {
        type: 'paragraph',
        content: "Au matin, le féticheur le trouva recroquevillé dans un coin, tremblant. Le viel homme ne dit rien, ne le punit pas. Il fit seulement de la lumière, remit chaque chose à sa place, et dit simplement :",
      },
      {
        type: 'quote',
        content: "« Certaines portes ne sont pas fermées parce qu'il y a un trésor derrière. Elles sont fermées parce que tu n'es pas encore prêt pour ce qu'il y a dedans. »",
      },
      {
        type: 'paragraph',
        content: "Yovi ressortit dans la lumière du matin avec des oreilles différentes — celles de quelqu'un qui a compris que les limites ne sont pas toujours des injustices.",
      },
    ],
    morale: "Les interdits ne sont pas tous des injustices — certains sont des protections. La curiosité est une qualité, mais elle doit s'accompagner de respect. Violer une frontière sans y être préparé peut vous faire traverser une nuit bien longue.",
  },

  {
    id: 'conte-vautour-generosité',
    titre: "Le Vautour et le Don de la Pluie",
    animal: "Vautour",
    animalIcon: "🦅",
    tradition: "Soninke (Mauritanie / Mali / Sénégal)",
    region: "Afrique de l'Ouest",
    duree: "6 min",
    couleur: "#4A4A8A",
    resume: "Tous méprisent le vautour — mais quand la sécheresse frappe, il est le seul à connaître le chemin du dieu de la pluie.",
    contenu: [
      {
        type: 'paragraph',
        content: "Dans les temps anciens, le Vautour était un oiseau au plumage brillant, aux ailes larges et aux yeux perçants. Mais les animaux de la savane se moquaient de lui parce qu'il se nourrissait de ce que les autres laissaient — les restes, les oubliés, les déjà-morts. « Tu es l'éboueur du monde », ricanait le Guépard. « Tu fais la besogne que personne ne veut faire », se gaussait le Babouin.",
      },
      {
        type: 'paragraph',
        content: "Le Vautour encaissait sans répliquer. Il savait ce que lui seul savait : que sans lui, les carcasses s'accumuleraient, que les eaux s'empoisonneraient, que les maladies proliféreraient. Mais à quoi bon expliquer aux gens ce qu'ils ne veulent pas entendre ?",
      },
      {
        type: 'paragraph',
        content: "Vint une terrible sécheresse. Trois saisons sans pluie. Les rivières disparurent. Les animaux mouraient les uns après les autres. Le Conseil des bêtes fut réuni. Qui pouvait monter jusqu'aux nuages pour supplier le dieu de la pluie ? L'Aigle proposa de voler, mais les nuages étaient trop haut. L'Autruche courut jusqu'aux montagnes mais revint bredouille. Personne ne savait le chemin.",
      },
      {
        type: 'paragraph',
        content: "Dans un coin, le Vautour s'était tu. Le Lion finit par lui demander, presque malgré lui : « Toi qui voles si haut et si longtemps, saurais-tu le chemin ? » Un silence. Puis le Vautour répondit tranquillement : « Je le connais. Cela fait longtemps que je le connais. »",
      },
      {
        type: 'quote',
        content: "« Pourquoi ne l'as-tu pas dit avant ? — Parce que personne ne me l'a jamais demandé. »",
      },
      {
        type: 'paragraph',
        content: "Le Vautour monta seul, pendant deux jours et deux nuits, jusqu'aux régions où les nuages sont solides comme de la terre. Il parla au dieu de la pluie au nom de tous les animaux. Quand il revint, une semaine plus tard, les premières gouttes tombaient sur la savane. Les bêtes dansèrent sous la pluie.",
      },
      {
        type: 'paragraph',
        content: "Le Lion réunit le Conseil. « Dorénavant, le Vautour sera respecté. Toute charogne qu'il trouvera lui appartiendra de droit, et nul ne se moquera de son rôle. » Depuis ce jour, le Vautour porte sur la tête une petite zone dénudée, rose et chaude — la marque de l'endroit où le soleil l'a touché lors de son voyage vers les nuages.",
      },
    ],
    morale: "Ne juge pas l'utilité d'un être sur ce que tu comprends de son rôle. Les plus humbles tâches sont souvent les plus indispensables. Et ceux qu'on méprise gardent parfois le savoir dont tout le monde aura besoin.",
  },

  {
    id: 'conte-caiman-ruse',
    titre: "Le Caïman et la Ruse du Bouc",
    animal: "Caïman",
    animalIcon: "🐊",
    tradition: "Ewe (Ghana / Togo / Bénin)",
    region: "Afrique de l'Ouest",
    duree: "5 min",
    couleur: "#3D7A3D",
    resume: "Le caïman piège tous les animaux qui viennent boire au fleuve — jusqu'à ce qu'un vieux bouc lui pose une question à laquelle il ne peut pas répondre.",
    contenu: [
      {
        type: 'paragraph',
        content: "Le Caïman avait trouvé un stratagème redoutable. Il se couchait au bord de l'abreuvoir, à moitié caché sous la boue, et attendait. Quand un animal s'approchait pour boire, il l'attrapait par la patte et refusait de lâcher avant que la bête ne lui paye un tribut — une journée de travail, une portion de nourriture, une promesse.",
      },
      {
        type: 'paragraph',
        content: "Les gazelles payaient. Les oiseaux payaient. Même les gnous payaient. Le Caïman s'enrichissait et s'engraissait sans effort. Il croyait avoir trouvé la méthode parfaite.",
      },
      {
        type: 'paragraph',
        content: "Un jour, le vieux Bouc Koffi arriva à l'abreuvoir. Comme prévu, le Caïman surgit et saisit sa patte avant. « Tu ne boiras qu'après m'avoir donné quelque chose ! » Le Bouc ne paniqua pas. Il s'assit calmement sur ses trois autres pattes et regarda le Caïman dans les yeux.",
      },
      {
        type: 'quote',
        content: "« Très bien, dit-il. Mais avant de décider ce que tu vas prendre, dis-moi : est-ce que tu me tiens, ou est-ce que je te tiens ? »",
      },
      {
        type: 'paragraph',
        content: "Le Caïman fronça ses petits yeux. « C'est moi qui te tiens, évidemment ! » Le Bouc hocha la tête. « Vraiment ? Tu es sorti de ton fleuve. Tu es sur terre, où tu es lent et lourd. Ton ventre touche la boue. Moi, mes trois autres pattes sont libres. Si j'appelle mes frères maintenant, qu'est-ce qui se passe ? »",
      },
      {
        type: 'paragraph',
        content: "Le Caïman commença à réfléchir. Il réalisa que sa gueule était bien fermée sur la patte du Bouc — mais que ses propres mâchoires étaient maintenant son seul point de contact avec sa proie. Il ne pouvait ni avancer ni reculer. Il était, lui aussi, pris.",
      },
      {
        type: 'paragraph',
        content: "Le Bouc ne dit rien de plus. Il attendit. Après un long silence, le Caïman lâcha prise et se glissa dans l'eau sans un mot. Le Bouc but tranquillement, puis rentra chez lui. Depuis ce jour, le Caïman réfléchit deux fois avant de saisir ce qu'il croit tenir.",
      },
    ],
    morale: "Avant de piéger quelqu'un, assure-toi de ne pas te piéger toi-même. La domination par la force crée souvent une dépendance mutuelle qu'on n'avait pas prévue. La ruse réfléchie vaut mieux que la puissance mal orientée.",
  },

  {
    id: 'conte-grenouille-pluie',
    titre: "La Grenouille qui Avait Avalé la Pluie",
    animal: "Grenouille",
    animalIcon: "🐸",
    tradition: "Mossi (Burkina Faso)",
    region: "Afrique de l'Ouest",
    duree: "7 min",
    couleur: "#1E6B4A",
    resume: "Une gigantesque grenouille avale toute l'eau du monde — les animaux doivent s'unir pour la faire rire et libérer la pluie.",
    contenu: [
      {
        type: 'paragraph',
        content: "Au commencement d'une année que les anciens appellent « l'année sans eau », une grenouille d'une taille prodigieuse avait avalé toutes les rivières, tous les lacs, toutes les sources. Elle s'était assise au centre du monde, gonflée et silencieuse, et refusait de rendre quoi que ce soit.",
      },
      {
        type: 'paragraph',
        content: "Personne ne savait pourquoi elle avait fait cela. Peut-être avait-elle peur de manquer. Peut-être voulait-elle tout garder pour elle. Peut-être était-elle simplement triste depuis que son marais avait été piétiné par les buffles. Les anciens se disputaient sur la question sans trouver de réponse.",
      },
      {
        type: 'paragraph',
        content: "Le Conseil des animaux se réunit. Le Lion proposa de la combattre — on le tenta, elle était trop lourde et trop solide. L'Éléphant voulut la pousser dans une gorge — impossible de la faire bouger d'un centimètre. Le Serpent voulut l'effrayer avec son venin — la Grenouille était immunisée.",
      },
      {
        type: 'paragraph',
        content: "C'est le vieux Lézard qui dit finalement : « Personne ne peut forcer quelqu'un à rendre ce qu'il croit sien. Mais tout le monde peut être surpris. La surprise ouvre ce que la force ne peut pas ouvrir. Il faut la faire rire. »",
      },
      {
        type: 'paragraph',
        content: "Tous les animaux essayèrent de faire rire la Grenouille. La Gazelle dansa, mais la Grenouille ne bougea pas. Le Babouin fit des grimaces, mais rien. L'Anguille fit des acrobaties, mais sans eau, elle ne pouvait plus se mouvoir et tomba dans la poussière en battant des nageoires.",
      },
      {
        type: 'paragraph',
        content: "C'est cette image — l'Anguille désespérée, sèche, qui se débattait en projetant de la poussière — qui brisa la Grenouille. Un sourire monta de son ventre, puis un petit rire, puis un grand rire, puis un rire immense et irrépressible. Et avec le rire, l'eau sortit — d'abord un filet, puis un flot, puis un déluge.",
      },
      {
        type: 'quote',
        content: "« L'Anguille n'avait pas essayé d'être drôle. Elle avait juste montré sa vraie détresse, et c'est cela qui avait touché le cœur de la Grenouille. »",
      },
      {
        type: 'paragraph',
        content: "Les rivières reprirent leur course. La pluie tomba pendant trois jours. Et la Grenouille, plus légère, se glissa dans un petit marais tranquille que les buffles avaient appris, depuis, à contourner.",
      },
    ],
    morale: "Ce qui est retenu par la peur ou la tristesse ne peut être libéré par la force. Parfois, c'est l'authenticité — montrer sa propre vulnérabilité — qui touche un cœur fermé là où aucun argument ne passe.",
  },

  {
    id: 'conte-panthère-trois-sagesses',
    titre: "La Panthère et les Trois Épreuves",
    animal: "Panthère",
    animalIcon: "🐈‍⬛",
    tradition: "Ashanti (Ghana)",
    region: "Afrique de l'Ouest",
    duree: "9 min",
    couleur: "#2C2C5E",
    resume: "Pour devenir gardienne de la forêt, la Panthère doit réussir trois épreuves — dont la plus difficile n'est pas physique mais intérieure.",
    contenu: [
      {
        type: 'paragraph',
        content: "Dans la grande forêt d'Ashanti, quand le vieux Gardien des Ombres mourut, il fallut lui trouver un successeur. La Forêt avait besoin d'un gardien capable de protéger les plus faibles, de juger les disputes avec équité, et de résister aux marchands d'esclaves qui venaient parfois de la côte.",
      },
      {
        type: 'paragraph',
        content: "Trois animaux se présentèrent : le Buffle, le Gorille, et la Panthère Noire. L'esprit de la forêt — qu'on appelait Asase Yaa — leur prépara trois épreuves.",
      },
      {
        type: 'paragraph',
        content: "La première épreuve était celle de la Force. Dans une clairière, un baobab centenaire était tombé en travers du chemin principal, coupant la route aux villageois. Le Buffle le bougea en deux charges. Le Gorille mit une heure de travail acharné. La Panthère trop légère ne pouvait pas le déplacer seule — elle alla chercher une famille d'éléphants et coordonna leurs efforts. Le chemin fut dégagé. « Les trois ont passé », dit Asase Yaa.",
      },
      {
        type: 'paragraph',
        content: "La deuxième épreuve était celle de la Justice. Deux singes se disputaient un régime de bananes tombé d'un arbre. L'un disait l'avoir vu tomber en premier, l'autre disait être arrivé en premier. Le Buffle trancha : « À celui qui crie le plus fort. » La Panthère l'interrompit : « Qui était sous l'arbre quand la banane est tombée ? » Le second singe admit que c'était le premier. La Panthère partagea le régime équitablement : « L'un a le droit de priorité, l'autre a le besoin. Le juste n'est pas toujours le même que le légal. »",
      },
      {
        type: 'paragraph',
        content: "La troisième épreuve surprit tout le monde. Asase Yaa ne posa aucun obstacle, aucun problème. Elle dit simplement : « Demain matin, avant l'aube, revenez ici et dites-moi ce que vous avez ressenti cette nuit. »",
      },
      {
        type: 'paragraph',
        content: "Le matin venu, le Buffle dit qu'il avait dormi profondément — il était sûr de gagner. Le Gorille dit qu'il avait passé la nuit à se préparer mentalement à la victoire. La Panthère dit qu'elle avait marché toute la nuit dans la forêt, à l'écoute des bruits, des peurs des petits animaux, des murmures des arbres.",
      },
      {
        type: 'quote',
        content: "« J'ai réalisé cette nuit ce que veut dire 'garder'. Ce n'est pas imposer sa force. C'est prêter ses oreilles à ceux qui n'ont pas de voix. »",
      },
      {
        type: 'paragraph',
        content: "Asase Yaa choisit la Panthère. Depuis ce jour, la Panthère Noire veille dans l'ombre des forêts d'Ashanti — invisible, silencieuse, à l'écoute.",
      },
    ],
    morale: "Le vrai pouvoir ne s'exerce pas dans la démonstration de force ou l'accumulation de victoires. Il réside dans la capacité à écouter ceux que le monde n'entend pas, et à servir avant de régner.",
  },

  {
    id: 'conte-hirondelle-soleil',
    titre: "L'Hirondelle qui Portait le Soleil",
    animal: "Hirondelle",
    animalIcon: "🐦",
    tradition: "Diola (Casamance, Sénégal)",
    region: "Afrique de l'Ouest",
    duree: "6 min",
    couleur: "#B8860B",
    resume: "Quand le Soleil refuse de se lever, une petite hirondelle entreprend le voyage le plus long — et revient avec la lumière dans ses plumes.",
    contenu: [
      {
        type: 'paragraph',
        content: "Il fut un temps où le Soleil se coucha un soir et refusa de se lever le lendemain. Les dieux l'avaient blessé dans son orgueil — on lui avait dit qu'il était trop brûlant, trop impitoyable, que les hommes le maudissaient autant qu'ils le bénissaient. Froissé, le Soleil s'était enroulé dans ses propres feux, quelque part derrière les montagnes du monde, et avait décidé de rester.",
      },
      {
        type: 'paragraph',
        content: "Après trois jours de nuit, la panique s'installait. Les plantes commençaient à mourir. Les animaux ne savaient plus quand dormir, quand chasser, quand migrer. Le Grand Conseil des oiseaux fut convoqué. Qui irait chercher le Soleil pour le convaincre de revenir ?",
      },
      {
        type: 'paragraph',
        content: "L'Aigle Royal se proposa le premier. « Je suis le plus puissant. J'irai le chercher par la force si nécessaire. » Il s'élança, mais la nuit était totale et il se perdit dans les nuages. Le Perroquet proposa d'y aller avec des paroles habiles. Il s'envola, trouva l'obscurité trop épaisse et revint. Le Hibou, roi de la nuit, essaya — mais il n'aimait pas le soleil et ne savait pas comment lui parler.",
      },
      {
        type: 'paragraph',
        content: "La petite Hirondelle, qui n'avait pas parlé jusque-là, dit doucement : « Je partirai. » Tous rirent. « Toi ? Tu es si petite ! Tu ne verras rien dans le noir ! — C'est vrai, dit-elle. Mais je chante chaque matin avant que le soleil se lève. Je connais son nom. »",
      },
      {
        type: 'paragraph',
        content: "L'Hirondelle vola pendant une nuit entière, guidée non pas par la vue, mais par un instinct profond. Elle franchit les montagnes, les mers de nuages, et trouva enfin le Soleil blotti dans sa grotte de lumière voilée.",
      },
      {
        type: 'paragraph',
        content: "Elle n'essaya pas de le raisonner. Elle se posa devant lui et chanta — le chant de l'aube, celui qu'elle entonnait chaque matin depuis que le monde existait. Le Soleil écouta. Dans ce chant, il entendit que quelqu'un l'attendait. Que quelqu'un avait besoin de lui non pas pour se chauffer ou se bronzer, mais simplement pour que le monde recommence.",
      },
      {
        type: 'quote',
        content: "« Tu viens me chercher seule ? Sans armée, sans menace ? — Je n'ai que mon chant. Mais ce chant, je l'ai toujours chanté pour toi. »",
      },
      {
        type: 'paragraph',
        content: "Le Soleil se leva. Depuis ce jour, l'Hirondelle a sur la gorge une tache de roux doré — la trace de la chaleur que le Soleil lui a donnée en signe de gratitude. Et chaque matin, elle chante la première, avant même que la lumière n'arrive.",
      },
    ],
    morale: "Ce ne sont pas toujours les plus puissants qui accomplissent les plus grandes choses. La sincérité et la fidélité — chanter le même chant depuis toujours, sans attendre de récompense — touchent là où la force échoue.",
  },

  {
    id: 'conte-cameleon-couleurs',
    titre: "Pourquoi le Caméléon Change de Couleur",
    animal: "Caméléon",
    animalIcon: "🦎",
    tradition: "Yoruba (Bénin / Nigeria)",
    region: "Afrique de l'Ouest",
    duree: "6 min",
    couleur: "#5B8A3C",
    resume: "Le Caméléon portait autrefois une seule couleur — la plus belle du monde. Le jour où il voulut la garder pour lui seul, les dieux lui infligèrent la plus étrange des peines.",
    contenu: [
      {
        type: 'paragraph',
        content: "Au commencement, le Caméléon était vert — d'un vert si parfait, si vibrant, que les autres animaux s'arrêtaient sur son passage. C'était la couleur de la forêt vivante, de la feuille au soleil de midi, de l'herbe après la pluie. Tout le monde l'admirait, et lui le savait.",
      },
      {
        type: 'paragraph',
        content: "Un jour, Obatala, l'orisha créateur, annonça qu'il allait partager les couleurs entre tous les êtres du monde. Le Caméléon panique. Il voulait garder son vert pour lui seul. Il courut se cacher dans la plus haute branche du fromager sacré, serrant sa couleur contre lui comme un trésor.",
      },
      {
        type: 'quote',
        content: "« Si je partage, dit-il à mi-voix, je ne serai plus le plus beau. Je serai comme tout le monde. Et que suis-je, si je suis comme tout le monde ? »",
      },
      {
        type: 'paragraph',
        content: "Obatala distribua les couleurs à tous les animaux sans trouver le Caméléon. Quand il apprit sa cachette, il monta jusqu'à lui. « Tu t'es caché pour ne pas partager. Très bien. Tu porteras désormais toutes les couleurs en même temps, selon ce que tu touches. Tu ne pourras jamais choisir, jamais rester le même, jamais te fixer. »",
      },
      {
        type: 'paragraph',
        content: "Le Caméléon cria que c'était une punition terrible. Obatala sourit. « C'est un enseignement. Celui qui refuse d'être comme les autres devient tout le monde à la fois. »",
      },
      {
        type: 'paragraph',
        content: "Depuis ce jour, le Caméléon porte les couleurs de ce qui l'entoure. Il est vert dans les feuilles, brun dans la terre, doré au soleil. Il ne peut jamais se cacher vraiment — car il prend toujours la couleur de l'endroit où il se trouve, et ainsi, il révèle toujours où il est.",
      },
      {
        type: 'quote',
        content: "« Vouloir garder la beauté pour soi, c'est finir par n'avoir plus de visage propre. »\n— Sagesse Yoruba",
      },
    ],
    morale: "L'exclusivité tue l'identité. Vouloir être unique en refusant le partage conduit à ne plus être soi-même du tout — mais le reflet perpétuel des circonstances.",
  },

  {
    id: 'conte-girafe-ciel',
    titre: "La Girafe et le Secret du Ciel",
    animal: "Girafe",
    animalIcon: "🦒",
    tradition: "Hausa (Niger / Nigeria)",
    region: "Afrique de l'Ouest",
    duree: "7 min",
    couleur: "#C8860A",
    resume: "La Girafe était autrefois de taille ordinaire — jusqu'au jour où elle décida de garder un secret que le ciel lui avait confié, et reçut en échange un don extraordinaire.",
    contenu: [
      {
        type: 'paragraph',
        content: "En ce temps-là, la Girafe était un animal comme les autres — de taille moyenne, de couleur neutre, sans particularité remarquable. Elle vivait dans la savane du Niger, mangeait de l'herbe et buvait aux mares avec tous ses compagnons.",
      },
      {
        type: 'paragraph',
        content: "Un soir, après un violent orage, la Girafe trouva dans la boue un oiseau de feu tombé du ciel — un messager d'Ubangiji, le dieu suprême des Hausa. L'oiseau était blessé et ne pouvait plus voler. La Girafe le soigna en secret pendant sept nuits, cachant sa présence aux autres animaux qui auraient pu lui faire peur.",
      },
      {
        type: 'paragraph',
        content: "La huitième nuit, l'oiseau était guéri. Avant de repartir vers le ciel, il dit à la Girafe : « Je dois te confier le message que je portais pour Ubangiji. Personne d'autre ne doit l'entendre. Mais je ne peux pas te dire ce que tu dois en faire — c'est ta sagesse qui décidera. »",
      },
      {
        type: 'quote',
        content: "L'oiseau posa son bec contre l'oreille de la Girafe et chuchota. Ce qu'il dit n'a jamais été rapporté. La Girafe l'écouta en silence, et son regard changea.",
      },
      {
        type: 'paragraph',
        content: "« Comment garder un secret aussi grand dans un monde aussi petit ? » murmura-t-elle. Elle se mit à marcher, à marcher vers l'horizon, cherchant un endroit assez haut pour que les mots restent entre elle et le ciel. Et en marchant, en s'étirant vers le haut, vers les nuages, son cou grandit, ses pattes s'allongèrent, ses taches devinrent les fenêtres par lesquelles elle regardait le monde depuis les hauteurs.",
      },
      {
        type: 'paragraph',
        content: "Elle ne trouva jamais d'endroit assez haut. Mais elle ne cessa jamais de chercher. C'est pourquoi la Girafe est toujours la tête levée — non pas par arrogance, mais parce qu'elle porte quelque chose en elle qui regarde vers le ciel.",
      },
      {
        type: 'quote',
        content: "« Certains êtres grandissent non pas pour dominer, mais pour garder. »\n— Proverbe Hausa",
      },
    ],
    morale: "La grandeur n'est pas toujours une ambition — parfois c'est une responsabilité. Ceux qui grandissent pour garder quelque chose de sacré ne le font pas pour être admirés, mais pour servir.",
  },

  {
    id: 'conte-guepard-larmes',
    titre: "Comment le Guépard Perdit ses Larmes",
    animal: "Guépard",
    animalIcon: "🐆",
    tradition: "Akan (Ghana / Côte d'Ivoire)",
    region: "Afrique de l'Ouest",
    duree: "6 min",
    couleur: "#D4900A",
    resume: "Le Guépard pleurait autrefois de vraies larmes — jusqu'au jour où un chasseur vola ses petits en profitant de son chagrin.",
    contenu: [
      {
        type: 'paragraph',
        content: "On dit que le Guépard était autrefois le plus sensible des grands félins. Sa vitesse lui venait non pas de la colère, mais d'une joie immense de vivre — il courait parce qu'il aimait courir, parce que la savane était belle et que le vent dans ses moustaches était le plus grand des plaisirs.",
      },
      {
        type: 'paragraph',
        content: "Un jour, ses trois petits tombèrent malades. Pendant trois nuits, il veilla sur eux, courant chercher les herbes que les vieux animaux lui indiquaient, portant de l'eau dans sa gueule depuis la rivière lointaine. Ses larmes coulaient librement — des larmes de peur, de tendresse, d'épuisement.",
      },
      {
        type: 'paragraph',
        content: "Un chasseur humain passait par là. Il vit le Guépard pleurer et comprit que ses petits étaient malades. Il attendit que le Guépard parte chercher de l'eau, et prit les trois petits dans ses bras pour les emporter.",
      },
      {
        type: 'paragraph',
        content: "Quand le Guépard revint et trouva le nid vide, ses larmes devinrent brûlantes. Il pleura si fort, si longtemps, que les larmes tracèrent des sillons permanents sur ses joues — les deux raies sombres qui descendent du coin de ses yeux jusqu'à sa gueule.",
      },
      {
        type: 'quote',
        content: "« Le chagrin a séché en moi, dit-il à l'Anguille qui l'observait depuis la rivière. Je ne pleurerai plus. Car les larmes ont montré à l'ennemi où j'étais vulnérable. »",
      },
      {
        type: 'paragraph',
        content: "Depuis ce jour, le Guépard court toujours — non plus de joie, mais cherchant. Et les raies sombres sur ses joues sont les cicatrices de la dernière fois qu'il a pleuré. Il court si vite que personne ne peut voir ses yeux. Il préfère ça.",
      },
    ],
    morale: "La vulnérabilité montrée au mauvais moment peut être retournée contre nous. Cela ne veut pas dire qu'il ne faut jamais montrer ses larmes — mais qu'il faut choisir à qui on les offre.",
  },

  {
    id: 'conte-hippopotame-eau',
    titre: "Pourquoi l'Hippopotame Vit dans l'Eau",
    animal: "Hippopotame",
    animalIcon: "🦛",
    tradition: "Igbo (Nigeria)",
    region: "Afrique de l'Ouest",
    duree: "5 min",
    couleur: "#7A5C8A",
    resume: "L'Hippopotame vivait autrefois dans la savane — jusqu'au jour où il fit une promesse au feu et dut fuir dans les rivières pour toujours.",
    contenu: [
      {
        type: 'paragraph',
        content: "Au commencement, l'Hippopotame était l'un des seigneurs de la savane. Il était massif, imposant, et toléré de tous parce qu'il ne chassait rien — il mangeait l'herbe et laissait passer les autres. Il avait même un nom respectueux : Eze Ahihia, le Roi de l'Herbe.",
      },
      {
        type: 'paragraph',
        content: "Un soir de grande chaleur, un incendie éclata à la lisière de la savane. Le feu courut vers le village d'herbe où dormaient les animaux. Pris de panique, les petits animaux coururent vers l'Hippopotame. « Aide-nous ! Couche-toi sur les flammes ! Tu es assez grand ! »",
      },
      {
        type: 'paragraph',
        content: "L'Hippopotame hésita. Le feu était immense. Mais il vit les tortues, les lièvres, les rats des champs qui allaient périr. Il se jeta sur les flammes, roulant de tout son poids pour les étouffer. Il survécut, mais son ventre et ses flancs furent brûlés — c'est pourquoi sa peau est si épaisse et si rose-grise, comme la cicatrice d'une brûlure ancienne.",
      },
      {
        type: 'quote',
        content: "« Tu as sauvé la savane, lui dirent les animaux. Que veux-tu en échange ? »",
      },
      {
        type: 'paragraph',
        content: "L'Hippopotame dit qu'il voulait une seule chose : se rafraîchir dans le fleuve pendant les journées chaudes. « Mais attention, ajouta-t-il, j'ai peur de manger les poissons sans le faire exprès. Je suis si grand. Je m'engage donc : chaque nuit, avant d'entrer dans l'eau, j'écarterai mes excréments avec ma queue pour montrer qu'il n'y a pas d'arêtes de poisson dedans. Ainsi, les esprits de l'eau sauront que je ne mange pas leur peuple. »",
      },
      {
        type: 'paragraph',
        content: "C'est pourquoi aujourd'hui encore, l'Hippopotame secoue sa queue vigoureusement quand il défèque dans l'eau — il tient sa promesse ancienne, chaque jour, depuis des millénaires.",
      },
    ],
    morale: "Un engagement sincère, même symbolique, est une forme de dignité. Tenir sa parole — surtout quand personne ne nous y oblige plus — est la marque d'un caractère véritable.",
  },

  {
    id: 'conte-hyene-dieu',
    titre: "La Hyène et le Jugement du Dieu Soleil",
    animal: "Hyène",
    animalIcon: "🦴",
    tradition: "Bambara (Mali)",
    region: "Afrique de l'Ouest",
    duree: "7 min",
    couleur: "#8B7355",
    resume: "La Hyène conteste le jugement de Dieu devant tout le Conseil des animaux — et reçoit une leçon sur la différence entre avoir raison et être juste.",
    contenu: [
      {
        type: 'paragraph',
        content: "Dans les temps où Faro, le dieu soleil des Bambara, descendait encore parfois parler aux animaux, la Hyène était connue pour sa mémoire prodigieuse. Elle ne oubliait jamais une injustice — ni les siennes, ni celles des autres. Elle tenait compte de chaque dette, chaque affront, chaque promesse non tenue.",
      },
      {
        type: 'paragraph',
        content: "Un jour, Faro rendit un jugement que la Hyène trouva injuste : un lion avait tué un bouc du village, mais comme il avait ensuite aidé à retrouver une enfant perdue, Faro lui avait pardonné le bouc. La Hyène était indignée.",
      },
      {
        type: 'quote',
        content: "« Une bonne action efface-t-elle une faute ? cria-t-elle. Si c'est ainsi, n'importe qui peut voler et puis aider quelqu'un pour se racheter. La justice n'est pas un marché ! »",
      },
      {
        type: 'paragraph',
        content: "Faro l'écouta sans se fâcher. « Tu as raison, Hyène. Une faute n'est pas effacée par une bonne action. Mais je n'ai pas pardonné la faute — j'ai pardonné le fautif. Ce sont deux choses différentes. »",
      },
      {
        type: 'paragraph',
        content: "La Hyène ne comprit pas. « C'est du sophisme ! » Faro continua : « Toi, Hyène, tu te souviens de chaque faute. Tu gardes tout en mémoire. Dis-moi, est-ce que cela te rend heureuse ? Est-ce que cela t'aide à dormir ? Est-ce que cela te nourrit ? »",
      },
      {
        type: 'paragraph',
        content: "La Hyène s'arrêta. Elle ne dormait pas bien, c'est vrai. Elle riait souvent — d'un rire nerveux, crispé — mais elle ne se souvenait pas d'avoir ri de bonheur depuis longtemps. « La justice que tu défends, dit Faro doucement, est exacte. Mais elle t'a volé ta paix. J'ai choisi une justice moins exacte mais plus vivante. »",
      },
      {
        type: 'paragraph',
        content: "Depuis ce jour, la Hyène porte dans son dos une légère difformité — ses pattes arrière plus courtes que les pattes avant. Les anciens Bambara disent que c'est le poids de tout ce qu'elle refuse de lâcher. Elle court toujours vers l'avant, mais quelque chose la tire en arrière.",
      },
    ],
    morale: "La mémoire parfaite des injustices peut être une prison. Il existe une forme de justice qui vise non à punir exactement, mais à remettre les choses en mouvement. Savoir quand lâcher prise est une sagesse aussi grande que savoir nommer le tort.",
  },

  {
    id: 'conte-lapin-roi-serpents',
    titre: "Le Lapin et le Roi des Serpents",
    animal: "Lapin",
    animalIcon: "🐇",
    tradition: "Hausa (Niger / Nigeria)",
    region: "Afrique de l'Ouest",
    duree: "6 min",
    couleur: "#A0855B",
    resume: "Le Roi des Serpents exige que chaque animal lui rende hommage chaque lune — le Lapin trouve un moyen de mettre fin à cette tyrannie avec rien d'autre que ses mots.",
    contenu: [
      {
        type: 'paragraph',
        content: "Le Grand Serpent Sarki, roi des reptiles de la savane du Niger, avait décrété que chaque animal devait venir se prosterner devant lui à chaque pleine lune. Ceux qui refusaient disparaissaient. La terreur régnait depuis trois saisons.",
      },
      {
        type: 'paragraph',
        content: "Le Lapin décida que cela devait cesser. Il alla trouver le Serpent Sarki, non pas pour le combattre, mais pour lui parler. Il s'agenouilla avec respect, ce qui étonna le Serpent.",
      },
      {
        type: 'quote',
        content: "« Grand Roi, j'ai entendu parler de ta puissance, et j'ai voulu vérifier par moi-même. Mais j'ai aussi entendu une rumeur troublante en chemin — il paraît qu'un autre serpent, encore plus grand que toi, vit dans la colline de l'Est et se dit le vrai roi des reptiles. »",
      },
      {
        type: 'paragraph',
        content: "Le Sarki dressa la tête, les yeux rétrécis. « Qui ose ? — Je ne sais pas, dit le Lapin innocemment. Peut-être n'est-ce qu'une rumeur. Mais tous les animaux en parlent. Ils disent que tu n'oses pas aller là-bas par peur. »",
      },
      {
        type: 'paragraph',
        content: "Le Sarki, fou de rage, fila vers la colline de l'Est. Il chercha tout le jour et toute la nuit — il n'y avait aucun autre serpent. Mais pendant son absence, tous les animaux s'enfuirent vers d'autres territoires.",
      },
      {
        type: 'paragraph',
        content: "Quand le Sarki revint, furieux et humilié, il trouva la savane vide. Le Lapin avait laissé un message tracé dans le sable : « Un roi sans peuple n'est qu'un serpent dans la poussière. »",
      },
      {
        type: 'paragraph',
        content: "Le Lapin ne fut jamais retrouvé. Depuis, on dit que ses longues oreilles lui permettent d'entendre arriver le danger avant tous les autres — une aptitude acquise au service de sa communauté.",
      },
    ],
    morale: "La ruse au service de la liberté collective n'est pas de la tromperie — c'est de la stratégie. Un seul individu courageux, armé de mots et d'intelligence, peut défaire une tyrannie que la force collective n'avait pas pu briser.",
  },

  {
    id: 'conte-perroquet-secrets',
    titre: "Le Perroquet qui Gardait les Secrets",
    animal: "Perroquet",
    animalIcon: "🦜",
    tradition: "Mandé (Mali / Guinée)",
    region: "Afrique de l'Ouest",
    duree: "5 min",
    couleur: "#2E7D4A",
    resume: "Le Perroquet avait le don de tout répéter — jusqu'au jour où il apprit qu'un secret est un fardeau sacré, et non un trésor à exhiber.",
    contenu: [
      {
        type: 'paragraph',
        content: "Dans le royaume des Mandé, le Perroquet était l'archiviste des airs. Doté d'une mémoire parfaite et d'une voix capable d'imiter toutes les autres, il était invité à toutes les réunions, toutes les cérémonies, tous les conseils. On l'aimait pour son talent — et on l'oubliait parce qu'il était petit et coloré, et non parce qu'il était dangereux.",
      },
      {
        type: 'paragraph',
        content: "Un jour, il entendit le chef du village confier à sa femme un secret d'État — la localisation d'une réserve de mil cachée pour les temps de famine. Le lendemain, dans un moment d'insouciance, le Perroquet répéta ce qu'il avait entendu à d'autres oiseaux. La nouvelle se répandit. Des étrangers vinrent, la réserve fut pillée.",
      },
      {
        type: 'paragraph',
        content: "Le Perroquet fut convoqué devant le Conseil des anciens. Il avoua tout, sans comprendre encore l'ampleur de sa faute. Le vieux Griot se leva et dit calmement :",
      },
      {
        type: 'quote',
        content: "« Tu as une voix magnifique. Mais la voix sans la sagesse de garder le silence est comme un fleuve sans berges — il se répand partout et ne nourrit personne. »",
      },
      {
        type: 'paragraph',
        content: "Le Perroquet fut condamné à une peine étrange : pendant une saison entière, il dut vivre avec les humains du village, leur parler, les écouter, servir de messager — mais sans jamais répéter ce qu'il entendait dans les maisons. C'était l'apprentissage du silence choisi.",
      },
      {
        type: 'paragraph',
        content: "Au bout de la saison, le Perroquet avait changé. Il parlait toujours — mais il savait maintenant ce qu'il choisissait de répéter et ce qu'il gardait. C'est cette sagesse-là qui fit de lui, selon les Mandé, le vrai griot des oiseaux.",
      },
    ],
    morale: "La parole est un pouvoir. Celui qui parle tout ce qu'il sait n'est pas intelligent — il est imprudent. La vraie maîtrise de la parole inclut le silence choisi, qui vaut parfois plus que les plus beaux discours.",
  },

  {
    id: 'conte-pintade-etoiles',
    titre: "La Pintade et ses Plumes Étoilées",
    animal: "Pintade",
    animalIcon: "🐦",
    tradition: "Mossi (Burkina Faso)",
    region: "Afrique de l'Ouest",
    duree: "5 min",
    couleur: "#4A3D7A",
    resume: "La Pintade était autrefois toute noire — jusqu'à la nuit où elle dansa si fort pour réveiller le soleil que les étoiles laissèrent leurs empreintes sur ses plumes.",
    contenu: [
      {
        type: 'paragraph',
        content: "Avant que le monde ne soit ce qu'il est, la Pintade avait un plumage entièrement noir, sombre comme la nuit de la nouvelle lune. Elle n'était pas triste de cela — la nuit lui appartenait, et elle aimait la nuit.",
      },
      {
        type: 'paragraph',
        content: "Mais il y eut une année terrible où le soleil tomba malade et refusa de se lever. Les récoltes mouraient. Les enfants pleuraient. Les anciens Mossi consultèrent les fétiches, firent des offrandes, chantèrent des prières — rien.",
      },
      {
        type: 'paragraph',
        content: "La Pintade dit : « Je danserai pour lui. La danse réveille ce que les mots ne peuvent pas atteindre. » Elle demanda aux étoiles de descendre un peu plus bas pour l'éclairer pendant sa danse.",
      },
      {
        type: 'paragraph',
        content: "Toute la nuit, la Pintade dansa. Elle dansa la danse des semailles, la danse des pluies, la danse des funérailles, la danse des naissances — toutes les danses que les hommes faisaient pour la vie. Les étoiles, touchées, se penchèrent si bas pour voir qu'elles effleurèrent ses plumes noires, y laissant leurs empreintes : de petites taches blanches et rondes, une constellation portée sur la peau.",
      },
      {
        type: 'quote',
        content: "Au matin, le soleil se leva — attiré, dit-on, par le bruit de la danse et par la beauté d'un oiseau qui portait le ciel sur ses plumes.",
      },
      {
        type: 'paragraph',
        content: "Depuis ce jour, la Pintade porte les étoiles. Et quand on la voit courir et caqueter dans la brousse au lever du soleil, les anciens Mossi disent qu'elle recommence la même danse, chaque matin, pour que le soleil ne l'oublie pas.",
      },
    ],
    morale: "La danse, le chant, la création ne sont pas des distractions — ils sont des actes de survie collective. L'art rappelle au monde sa propre beauté au moment où il risque de l'oublier.",
  },

  {
    id: 'conte-serpent-arc-en-ciel',
    titre: "Aïdo-Hwedo, le Serpent Arc-en-Ciel",
    animal: "Serpent",
    animalIcon: "🐍",
    tradition: "Fon (Bénin / Togo)",
    region: "Afrique de l'Ouest",
    duree: "8 min",
    couleur: "#6A3D9A",
    resume: "Avant la création du monde, le grand Serpent Arc-en-Ciel portait le Dieu créateur dans ses anneaux — et porta ensuite le monde entier pour qu'il ne tombe pas dans le vide.",
    contenu: [
      {
        type: 'paragraph',
        content: "Au commencement de toutes choses, avant que la terre ne soit séparée des eaux, le grand dieu Mawu se déplaçait à travers le chaos sans forme. Il voyageait porté dans la gueule d'Aïdo-Hwedo, le Serpent cosmique, dont le corps formait le chemin que le dieu traçait en créant.",
      },
      {
        type: 'paragraph',
        content: "Partout où Mawu allait, Aïdo-Hwedo se courbait — et c'est ainsi que les rivières furent courbées, que les montagnes se formèrent aux endroits où le serpent s'était enroulé pour se reposer. Les dépôts ferreux que l'on trouve dans les collines d'Afrique sont, dit-on, les excréments d'Aïdo-Hwedo de ce voyage primordial.",
      },
      {
        type: 'paragraph',
        content: "Quand la création fut terminée, Mawu regarda son oeuvre et vit un problème : la terre était trop lourde, trop chargée de montagnes, d'arbres géants et d'animaux énormes. Elle risquait de basculer dans le vide.",
      },
      {
        type: 'quote',
        content: "« Aïdo-Hwedo, dit Mawu, je t'ai besoin encore. Veux-tu porter la terre sur tes anneaux, pour l'éternité ? »",
      },
      {
        type: 'paragraph',
        content: "Le Serpent accepta. Il plongea sous la terre, s'enroula en spirale gigantesque, et prit le poids du monde sur lui. Mais la chaleur sous la terre le brûlait. Pour se rafraîchir, il fut placé dans un océan de fer liquide — et pour qu'il ne souffre pas de la faim, les dieux lui donnèrent sa propre queue à manger.",
      },
      {
        type: 'paragraph',
        content: "Quand Aïdo-Hwedo se retourne dans son sommeil, la terre tremble. Quand il sort un instant la tête, on voit l'arc-en-ciel — les reflets de ses écailles iridescentes contre le ciel. C'est pour cela que les Fon ne tuent pas le serpent python : il est le frère d'Aïdo-Hwedo, et toucher un python, c'est insulter le porteur du monde.",
      },
    ],
    morale: "Certains êtres portent le monde sans que personne ne le voie — silencieux, invisibles, en dessous. Le respect et la gratitude envers ceux qui soutiennent tout sans rien exiger est une sagesse fondatrice.",
  },

  {
    id: 'conte-tortue-parole',
    titre: "La Tortue et la Parole Donnée",
    animal: "Tortue",
    animalIcon: "🐢",
    tradition: "Ewe (Ghana / Togo)",
    region: "Afrique de l'Ouest",
    duree: "6 min",
    couleur: "#3D6B3D",
    resume: "La Tortue fait une promesse impossible à tenir — et passe sa vie entière à la tenir quand même, un pas après l'autre.",
    contenu: [
      {
        type: 'paragraph',
        content: "La Tortue avait fait une promesse à sa mère mourante : elle irait, un jour, voir la mer. La mer était à sept jours de marche pour un être normal — et à bien plus pour une tortue. Sa mère savait cela. La Tortue aussi. Mais elle avait promis.",
      },
      {
        type: 'paragraph',
        content: "Le Lièvre lui dit que c'était inutile. Le Singe lui dit qu'elle n'arriverait pas avant sa propre mort. La Hyène rit et dit qu'une promesse faite à une morte n'engageait personne. La Tortue répondit à chacun la même chose :",
      },
      {
        type: 'quote',
        content: "« La promesse n'a pas été faite pour elle. Elle a été faite par moi. C'est moi qui dois la tenir. »",
      },
      {
        type: 'paragraph',
        content: "Elle commença à marcher. Les saisons passèrent. Elle traversa des forêts, des plaines, des marais. Des animaux l'aidèrent parfois — lui donnant de l'eau, lui indiquant les chemins. Elle continuait, lentement, obstinément.",
      },
      {
        type: 'paragraph',
        content: "Le jour où elle atteignit enfin la plage et vit l'océan pour la première fois, elle s'arrêta longtemps. Elle ne dit rien. Les vagues venaient lécher ses pattes. Elle pensa à sa mère.",
      },
      {
        type: 'paragraph',
        content: "Sur le chemin du retour — car elle repartit, elle avait encore longtemps à vivre — elle rencontra le Lièvre qui l'avait moquée. Il était vieux maintenant. « Tu y es allée vraiment ? » dit-il, stupéfait. « Oui. — Et alors ? — Alors j'ai vu la mer. »",
      },
      {
        type: 'quote',
        content: "« Parfois, dit la Tortue, la promesse est le voyage. Pas la destination. »",
      },
    ],
    morale: "La fidélité à sa parole — même quand personne ne nous observe, même quand la personne à qui on l'a faite n'est plus là — est une forme de respect de soi-même. L'intégrité n'a pas besoin de témoin.",
  },

  {
    id: 'conte-zebre-feu',
    titre: "Le Zèbre et la Nuit du Grand Feu",
    animal: "Zèbre",
    animalIcon: "🦓",
    tradition: "Dogon (Mali)",
    region: "Afrique de l'Ouest",
    duree: "6 min",
    couleur: "#2C2C2C",
    resume: "Le Zèbre était autrefois blanc comme la craie — jusqu'à la nuit où il se coucha entre son troupeau et les flammes.",
    contenu: [
      {
        type: 'paragraph',
        content: "Dans les falaises de Bandiagara, les Dogon racontent que le premier Zèbre était d'un blanc éclatant, comme un nuage posé sur la savane. Il vivait avec un grand troupeau et était son chef — non pas par la force, mais parce que son pelage blanc était visible de loin dans la nuit, et que tout le monde le suivait.",
      },
      {
        type: 'paragraph',
        content: "Un été sans pluie, un feu immense s'alluma à l'est de la plaine. Le vent l'emportait vers le troupeau endormi. Le Zèbre s'éveilla le premier — il sentait toujours les dangers avant les autres. Il avait le temps de fuir. Personne n'aurait su.",
      },
      {
        type: 'paragraph',
        content: "Mais il cria pour réveiller le troupeau. Certains se levèrent et coururent. Les plus vieux, les blessés et les poulains ne pouvaient pas aller assez vite. Le Zèbre se retourna et marcha vers le feu.",
      },
      {
        type: 'paragraph',
        content: "Il se coucha en travers du chemin des flammes, faisant obstacle de son corps, chassant le feu vers les côtés par sa présence et en piétinant les herbes sèches devant lui. Le feu le lécha. Les rayures noires que l'on voit aujourd'hui sur sa robe blanche sont les cicatrices de cette nuit-là — les marques là où les flammes ont touché sa peau.",
      },
      {
        type: 'quote',
        content: "« Je ne pouvais pas les porter plus vite, dit-il aux Dogon qui avaient observé la scène depuis leurs greniers. Mais je pouvais m'interposer. »",
      },
      {
        type: 'paragraph',
        content: "Le troupeau s'en sortit. Le Zèbre aussi — brûlé, marqué, mais vivant. Et les Dogon enseignent depuis que les rayures du Zèbre rappellent que la beauté d'un chef ne réside pas dans son apparence, mais dans les sacrifices qu'il accepte de faire pour les siens.",
      },
    ],
    morale: "Le courage véritable n'est pas l'absence de peur — c'est choisir d'agir malgré elle, pour les autres, quand personne ne nous y oblige. Les marques que l'on porte de ces moments sont des titres de noblesse silencieux.",
  },

  {
    id: 'conte-pangolin-secret',
    titre: "Le Pangolin et le Secret du Fer",
    animal: "Pangolin",
    animalIcon: "🦔",
    tradition: "Mandé (Mali / Guinée)",
    region: "Afrique de l'Ouest",
    duree: "7 min",
    couleur: "#8B4513",
    resume: "Avant que les hommes ne sachent forger le fer, le Pangolin en connaissait le secret — et refusa de le livrer jusqu'à ce que les hommes prouvent qu'ils étaient prêts.",
    contenu: [
      {
        type: 'paragraph',
        content: "Dans la tradition des forgerons Mandé, avant que Nomo — le génie des eaux — n'enseigne la forge aux ancêtres, c'est le Pangolin qui était le gardien du métal. Ses écailles, dures comme du fer, étaient la preuve vivante qu'il connaissait le secret de la résistance.",
      },
      {
        type: 'paragraph',
        content: "Les premiers hommes vivaient dans la peur : ils n'avaient pas d'outils pour défricher, pas d'armes pour se défendre, pas de couteaux pour cuisiner. Ils supplièrent le Pangolin. Chaque fois, il refusait.",
      },
      {
        type: 'quote',
        content: "« Pourquoi ? lui demanda un chasseur désespéré un jour de famine. — Parce que vous n'êtes pas encore prêts. Un outil donné à des mains qui ne savent pas encore ce qu'elles construisent finit toujours en arme. »",
      },
      {
        type: 'paragraph',
        content: "Pendant sept ans, le Pangolin observa les hommes. Il vit des pères protéger leurs enfants, des femmes soigner des blessés, des anciens enseigner sans rien attendre en retour. Il vit aussi des guerres, des trahisons, des égoïsmes. Mais il vit aussi des hommes qui choisissaient autrement.",
      },
      {
        type: 'paragraph',
        content: "La huitième année, un jeune garçon trouva le Pangolin blessé dans la forêt, une épine d'acacia coincée entre ses écailles. Sans penser à rien d'autre qu'à l'aider, il retira l'épine, prit soin de la plaie avec des feuilles. Il n'avait rien demandé en échange.",
      },
      {
        type: 'paragraph',
        content: "Le Pangolin guéri dit alors : « Ce n'est pas l'intelligence qui vous manquait. C'était la preuve que vous pouvez soigner avant de posséder. » Il conduisit le garçon vers une veine de fer dans la roche. C'est ce garçon qui devint le premier forgeron, et ses descendants portent encore le titre de Numu — ceux que le Pangolin a choisis.",
      },
    ],
    morale: "Le savoir dangereux ne doit pas être donné selon les demandes, mais selon la preuve de la maturité. Prendre soin sans rien attendre est parfois la clé qui ouvre les portes que l'insistance ne peut forcer.",
  },

  {
    id: 'conte-heron-pecheur',
    titre: "Le Héron et le Pêcheur Aveugle",
    animal: "Héron",
    animalIcon: "🕊️",
    tradition: "Dogon (Mali)",
    region: "Afrique de l'Ouest",
    duree: "6 min",
    couleur: "#4A7BA8",
    resume: "Un vieux pêcheur perd la vue — le Héron blanc décide de le guider chaque matin, en échange d'une seule chose : une histoire.",
    contenu: [
      {
        type: 'paragraph',
        content: "Sur les rives du lac Debo, au Mali, vivait un vieux pêcheur Dogon nommé Amadou. Depuis l'enfance, il avait pêché chaque matin, et chaque matin le Héron blanc était là, quelques mètres plus loin, péchant aussi à sa façon. Ils ne se parlaient pas — mais ils s'étaient regardés pendant quarante ans.",
      },
      {
        type: 'paragraph',
        content: "Quand Amadou perdit la vue à soixante ans, il ne put plus aller au lac seul. Sa famille était loin, ses voisins occupés. Il restait chez lui, et maigrissait. Le Héron, qui ne le voyait plus venir, vola jusqu'à la maison de l'homme et attendit à la porte.",
      },
      {
        type: 'paragraph',
        content: "Quand Amadou sortit, le Héron cria d'une façon particulière — un cri court, deux fois. L'homme tendit la main, et le Héron se laissa saisir par l'aile. Ainsi, chaque matin, le Héron guidait l'homme aveugle jusqu'au bord de l'eau, restait auprès de lui, et le ramenait le soir.",
      },
      {
        type: 'quote',
        content: "Un jour, la femme d'Amadou demanda au Héron : « Pourquoi fais-tu cela ? » Il répondit — car en ce temps les animaux parlaient encore aux sages : « Il me raconte une histoire chaque soir. Je n'avais jamais eu d'histoires. »",
      },
      {
        type: 'paragraph',
        content: "Pendant sept ans, l'homme et l'oiseau allèrent ainsi au lac. Amadou mourut un matin de saison sèche, paisiblement, les pieds dans l'eau. Le Héron resta sur la berge jusqu'au coucher du soleil, puis s'envola et ne revint plus au lac Debo.",
      },
      {
        type: 'paragraph',
        content: "Les pêcheurs Dogon disent que le Héron blanc qui se pose parfois immobile à l'aube, regardant l'eau sans pêcher, attend une histoire.",
      },
    ],
    morale: "Tout service véritable naît d'une relation, non d'une obligation. Ce qui nous lie durablement à un autre être — humain ou animal — est souvent quelque chose d'aussi simple qu'une histoire partagée au fil des jours.",
  },

  {
    id: 'conte-escargot-course',
    titre: "L'Escargot et la Course du Monde",
    animal: "Escargot",
    animalIcon: "🐌",
    tradition: "Ewe (Ghana / Togo)",
    region: "Afrique de l'Ouest",
    duree: "5 min",
    couleur: "#8B7355",
    resume: "L'Escargot est défié par tous les animaux rapides — mais quand vient le vrai moment de compter, c'est lui qui arrive le premier.",
    contenu: [
      {
        type: 'paragraph',
        content: "Le roi des animaux Ewe avait annoncé une grande épreuve : celui qui arriverait le premier au Grand Fromager sacré, à l'autre bout de la savane, recevrait le titre de Messager du Roi — le plus honorable des rôles. La Gazelle, le Guépard, le Lièvre et même l'Aigle se présentèrent.",
      },
      {
        type: 'paragraph',
        content: "L'Escargot aussi se présenta. Les rires fusèrent. « Tu vas te mêler à cela ? Tu ne finiras même pas demain ! » L'Escargot ne répondit rien et attendit patiemment que la course commence.",
      },
      {
        type: 'paragraph',
        content: "Le jour de la course, quelque chose de surprenant se produisit. La Gazelle se tordit la cheville dans un trou de rat à mi-chemin. Le Guépard eut trop chaud et s'arrêta à l'ombre. Le Lièvre s'endormit, comme de coutume. L'Aigle prit la mauvaise direction.",
      },
      {
        type: 'paragraph',
        content: "L'Escargot, lui, n'avait jamais arrêté. Il avait marché la nuit pendant que les autres dormaient. Il avait marché sous la pluie pendant que les autres attendaient le beau temps. Il n'avait pas de plan brillant — il avait juste continué.",
      },
      {
        type: 'quote',
        content: "Quand il arriva au Grand Fromager, personne n'était là. Il monta lentement sur une racine et attendit. Le Roi des animaux arriva ensuite pour juger — et trouva l'Escargot déjà là, sa coquille luisante de rosée du matin.",
      },
      {
        type: 'paragraph',
        content: "« Comment as-tu fait ? » Le Roi était sincèrement perplexe. L'Escargot dit : « J'ai fait ce que je pouvais faire. Je suis allé à ma vitesse. Et pendant ce temps, les plus rapides ont fait des choses que je ne pouvais pas me permettre — s'arrêter. »",
      },
    ],
    morale: "La constance humble dépasse souvent l'éclat irrégulier. Faire ce qu'on peut faire, à sa propre cadence, sans s'arrêter pour se comparer ou pour se vanter, est une forme de maîtrise que peu de gens possèdent.",
  },

  {
    id: 'conte-flamant-sel',
    titre: "Le Flamant et la Danse du Sel",
    animal: "Flamant",
    animalIcon: "🦩",
    tradition: "Songhay (Niger / Mali)",
    region: "Afrique de l'Ouest",
    duree: "6 min",
    couleur: "#D4608A",
    resume: "Les flamants étaient autrefois blancs comme les autres oiseaux — jusqu'à la nuit de la grande cérémonie où ils dansèrent si fort pour les dieux qu'ils en rougirent pour toujours.",
    contenu: [
      {
        type: 'paragraph',
        content: "Sur les rives du fleuve Niger, les esprits Songhay — les Holey — organisaient chaque année une grande cérémonie de remerciement pour l'eau. Tous les oiseaux du fleuve étaient conviés à danser. Mais la cérémonie avait lieu la nuit, et seuls les oiseaux qui osaient danser dans l'obscurité totale pouvaient participer.",
      },
      {
        type: 'paragraph',
        content: "La plupart des oiseaux avaient peur du noir et de l'eau profonde où la cérémonie se tenait. Les hérons restèrent sur la berge. Les cormorans s'excusèrent. Seuls les flamants, qui vivaient dans les eaux peu profondes des lacs salés et n'avaient pas peur de l'obscurité, acceptèrent.",
      },
      {
        type: 'paragraph',
        content: "Ils dansèrent toute la nuit dans les eaux du fleuve. Ils dansèrent en cercle, en ligne, en spirale. Leurs ailes battaient l'eau et les éclaboussures montaient vers le ciel comme des offrandes. Les Holey, ravis, descendirent les voir de plus près.",
      },
      {
        type: 'quote',
        content: "Les esprits posèrent leurs mains rouges et enflammées sur les ailes des flamants pour les bénir. Partout où les mains des Holey les touchèrent, les plumes devinrent rose, puis rouge vif.",
      },
      {
        type: 'paragraph',
        content: "Au matin, les flamants émergèrent de l'eau, rouges et roses. Les autres oiseaux étaient stupéfaits. « Que vous est-il arrivé ? — Les dieux nous ont touchés. — Ils vous ont blessés ! — Non, dit le plus vieux flamant. Ils nous ont marqués. La marque de ceux qui n'avaient pas peur. »",
      },
    ],
    morale: "La couleur singulière que certains portent n'est pas toujours un défaut ou une bizarrerie — c'est parfois la trace d'une nuit où ils ont osé quand les autres ont préféré la sécurité. La distinction vient du courage, pas de la naissance.",
  },

  {
    id: 'conte-porcepic-aiguille',
    titre: "Le Porc-Épic et l'Aiguille d'Or",
    animal: "Porc-épic",
    animalIcon: "🦔",
    tradition: "Bambara (Mali)",
    region: "Afrique de l'Ouest",
    duree: "6 min",
    couleur: "#7A5C3D",
    resume: "Le Porc-Épic possède une aiguille d'or capable de guérir toutes les blessures — mais pour l'utiliser, il doit choisir entre sa propre défense et le soin des autres.",
    contenu: [
      {
        type: 'paragraph',
        content: "Les anciens Bambara racontent qu'au début du monde, le Porc-Épic possédait, parmi ses piquants, une unique aiguille d'or. Cette aiguille avait le pouvoir de refermer n'importe quelle blessure — il suffisait de la planter délicatement dans la chair meurtrie pour que la peau se referme et la douleur parte.",
      },
      {
        type: 'paragraph',
        content: "Mais l'aiguille d'or était aussi sa seule arme vraiment efficace. Les autres piquants pouvaient blesser un prédateur, mais seule l'aiguille d'or pouvait atteindre un cœur et le tuer net. Le Porc-Épic vivait donc dans une tension permanente : garder l'aiguille pour survivre, ou s'en servir pour guérir ?",
      },
      {
        type: 'paragraph',
        content: "Un jour, une lionne dont le petit était gravement blessé vint le trouver. Elle était désespérée. « Je t'en supplie. Tu es le seul qui peut le sauver. » Le Porc-Épic regarda la lionne — prédateur naturel, capable de le tuer d'un coup de patte. Il regarda l'aiguille d'or.",
      },
      {
        type: 'quote',
        content: "« Si je l'utilise pour ton fils, je serai sans défense. Et toi, quand la faim reviendra... — Je sais, dit la lionne. Et toi, qu'est-ce qui vaut plus : ta vie sauvée à coup sûr, ou une vie sauvée par toi ? »",
      },
      {
        type: 'paragraph',
        content: "Le Porc-Épic utilisa l'aiguille d'or. Le lionceau guérit. La lionne rentra chez elle avec son fils. Elle ne revint jamais menacer le Porc-Épic.",
      },
      {
        type: 'paragraph',
        content: "L'aiguille d'or, après cet usage unique, devint transparente et disparut dans les autres piquants. Mais depuis ce jour, dit-on, chaque piquant du Porc-Épic porte en lui un peu de cette vertu guérisseuse — et ceux qui savent le trouver sans le menacer peuvent encore obtenir son aide.",
      },
    ],
    morale: "Le don le plus précieux est souvent aussi notre protection la plus fragile. Choisir de s'en servir pour les autres, au prix de sa propre sécurité, est le geste qui définit le caractère véritable d'un être.",
  },

  {
    id: 'conte-mangouste-cobra',
    titre: "La Mangouste et le Cobra Royal",
    animal: "Mangouste",
    animalIcon: "🦡",
    tradition: "Hausa (Niger / Nigeria)",
    region: "Afrique de l'Ouest",
    duree: "7 min",
    couleur: "#8B5E3C",
    resume: "La Mangouste et le Cobra sont ennemis depuis la nuit des temps — mais quand une sécheresse frappe, leur vieille guerre doit céder le pas.",
    contenu: [
      {
        type: 'paragraph',
        content: "On raconte chez les Hausa que la Mangouste et le Cobra Royal sont frères ennemis depuis que le monde est monde. Ils ont les mêmes ennemis — les faucons, les hommes — et les mêmes proies. Mais ils ne peuvent pas se voir sans vouloir se battre.",
      },
      {
        type: 'paragraph',
        content: "Une année de sécheresse terrible, toutes les eaux avaient disparu sauf une : une source cachée au fond d'une gorge de rochers. La gorge était si étroite qu'un seul animal à la fois pouvait y entrer. La Mangouste arriva la première — et trouva le Cobra déjà là, enroulé au bord de l'eau.",
      },
      {
        type: 'paragraph',
        content: "Ils se regardèrent longtemps. Le combat était inévitable — sauf qu'ils étaient tous les deux épuisés, déshydratés, à peine capables de tenir debout. « Si on se bat, dit la Mangouste, le vainqueur sera trop blessé pour repartir. Tous deux mourrons dans ce trou. »",
      },
      {
        type: 'quote',
        content: "Le Cobra réfléchit. « Que proposes-tu ? — Une trêve. Jusqu'à la fin de la sécheresse. Tu bois d'un côté, je bois de l'autre. On ne se regarde pas. »",
      },
      {
        type: 'paragraph',
        content: "Ils burent. Le silence était tendu comme une corde. Mais ils burent. Plusieurs jours ils revinrent à la source, chacun de leur côté, sans se parler. Un soir, une tempête vint — le tonnerre, puis la pluie. La sécheresse était terminée.",
      },
      {
        type: 'paragraph',
        content: "Avant de repartir chacun de son côté, le Cobra dit : « Tu es rapide et courageux. — Et toi patient et mortel, dit la Mangouste. Bonne chance. — Bonne chance. » Ils s'en allèrent, et la guerre reprit. Mais les Hausa disent qu'il existe entre eux, depuis ce jour, une limite invisible : ils se battent, mais jamais jusqu'à la mort inutile.",
      },
    ],
    morale: "Même les ennemis les plus anciens peuvent trouver une trêve quand la survie l'exige. La sagesse n'est pas de nier la rivalité — c'est de savoir quand la mettre de côté pour un intérêt plus grand.",
  },

  {
    id: 'conte-buffle-orphelin',
    titre: "Le Buffle et l'Enfant Orphelin",
    animal: "Buffle",
    animalIcon: "🐃",
    tradition: "Bambara (Mali)",
    region: "Afrique de l'Ouest",
    duree: "7 min",
    couleur: "#5C3317",
    resume: "Un enfant orphelin seul dans la savane rencontre un vieux buffle solitaire — et tous deux découvrent que la famille peut naître de l'inattendu.",
    contenu: [
      {
        type: 'paragraph',
        content: "Dans les plaines du Sahel mali, un jeune garçon de sept ans nommé Bourama se retrouva seul après que la maladie eut emporté sa mère. Son père était parti depuis des années. Les villageois, dans la famine, n'avaient pas assez pour un enfant de plus. Bourama prit le chemin de la savane, sans but précis, avec dans sa poche un morceau de pain sec.",
      },
      {
        type: 'paragraph',
        content: "Dans la savane, il trouva un vieux Buffle à l'écart du troupeau. Le Buffle avait une corne brisée et boitait légèrement — c'est pourquoi le troupeau l'avait laissé derrière. L'enfant et l'animal se regardèrent longtemps.",
      },
      {
        type: 'paragraph',
        content: "Bourama s'approcha sans peur. Il déchira son morceau de pain en deux et posa une moitié devant le Buffle. Le Buffle la flaira, puis la mangea. Le garçon mangea l'autre moitié.",
      },
      {
        type: 'quote',
        content: "Ni l'un ni l'autre ne put expliquer pourquoi ils restèrent ensemble ce soir-là. Mais ils restèrent.",
      },
      {
        type: 'paragraph',
        content: "Pendant une saison, ils vécurent ainsi dans la savane. Le Buffle protégeait l'enfant des prédateurs — sa simple présence suffisait à les éloigner. L'enfant ôtait les tiques du Buffle, lui trouvait les herbes qu'il aimait, lui parlait le soir pour le tenir éveillé lors des nuits froides.",
      },
      {
        type: 'paragraph',
        content: "Quand les gens du village suivant les trouvèrent, ils crurent d'abord à un esprit. Un enfant, un buffle, dormant côte à côte. Le chef du village dit que c'était un signe : l'enfant et l'animal devaient être accueillis ensemble. Et c'est ce qui fut fait.",
      },
      {
        type: 'quote',
        content: "« La famille n'est pas ce qu'on reçoit à la naissance. C'est ce qu'on construit dans les moments où l'on n'a plus rien. »\n— Proverbe Bambara",
      },
    ],
    morale: "La solitude partagée crée des liens que le sang ne peut pas toujours offrir. La famille se construit entre ceux qui choisissent de prendre soin l'un de l'autre — sans y être obligés.",
  },

  {
    id: 'conte-gorille-femme-perdue',
    titre: "Le Gorille et la Femme Perdue",
    animal: "Gorille",
    animalIcon: "🦍",
    tradition: "Baka (Cameroun / Congo)",
    region: "Afrique Centrale",
    duree: "8 min",
    couleur: "#2C4A2C",
    resume: "Une femme égarée dans la forêt est recueillie par un groupe de gorilles — et doit apprendre à désapprendre tout ce qu'elle croyait savoir sur eux.",
    contenu: [
      {
        type: 'paragraph',
        content: "Les Baka de la forêt équatoriale racontent l'histoire d'une femme nommée Ngomo qui se perdit dans la grande forêt lors d'une collecte de fruits. La nuit tomba avant qu'elle ne retrouve son chemin, et les bruits de la forêt nocturne la terrifiaient.",
      },
      {
        type: 'paragraph',
        content: "C'est alors qu'elle entendit les gorilles — un groupe qui dormait dans les arbres non loin. Elle avait appris depuis l'enfance à les fuir, à les craindre. Mais la pluie commençait à tomber, et elle n'avait nulle part où aller.",
      },
      {
        type: 'paragraph',
        content: "Le mâle dominant du groupe l'observa de loin. Il ne s'approcha pas, ne chargea pas. Il se retourna vers ses femelles et ses petits comme pour dire : laissez-la. La pluie tomba toute la nuit. Les gorilles construisirent des nids de feuilles pour dormir. Ngomo, tremblante, fit de son mieux avec des branches qu'elle trouva.",
      },
      {
        type: 'paragraph',
        content: "Au matin, une femelle gorille s'approcha lentement de Ngomo, portant son petit sur le dos. Elle posa devant la femme des figues sauvages qu'elle venait de cueillir. Puis elle s'en alla.",
      },
      {
        type: 'quote',
        content: "Ngomo ne mangea pas tout de suite. Elle regarda les figues longtemps. « Ce geste, dit-elle plus tard aux siens, était exactement celui que je fais pour un inconnu qui a faim. Je compris que j'avais eu peur d'un miroir. »",
      },
      {
        type: 'paragraph',
        content: "Le groupe de gorilles la guidèrent, sans le savoir, vers le bord de la forêt le lendemain matin — suivant leur propre route habituelle qui longeait les chemins humains. Ngomo rentra chez elle et ne parla jamais des gorilles comme d'êtres sauvages.",
      },
    ],
    morale: "Ce dont on a le plus peur ressemble souvent à ce qu'on connaît déjà — mais vu d'un angle qu'on n'a pas encore accepté. La rencontre véritable avec l'autre commence quand on accepte de désapprendre ses peurs héritées.",
  },

  {
    id: 'conte-ibis-memoire',
    titre: "L'Ibis et la Mémoire du Nil",
    animal: "Ibis",
    animalIcon: "🦢",
    tradition: "Songhay (Niger / Mali)",
    region: "Afrique de l'Ouest",
    duree: "6 min",
    couleur: "#B8A020",
    resume: "L'Ibis sacré gardait la mémoire de tout ce qui s'était passé dans le monde — jusqu'au jour où il décida de la confier à un seul homme, et pourquoi.",
    contenu: [
      {
        type: 'paragraph',
        content: "Dans les traditions Songhay du fleuve Niger, l'Ibis blanc est l'oiseau de Thot — le gardien de la mémoire du monde. On dit qu'il se souvient de tout ce qui s'est passé depuis la création, parce qu'il est présent aux bords de l'eau depuis les premiers temps, et que l'eau garde tout.",
      },
      {
        type: 'paragraph',
        content: "Un vieux maître de l'école coranique sur les rives du Niger avait perdu la mémoire. Il ne se souvenait plus des versets, plus des noms de ses élèves, plus du visage de sa femme. Il était désespéré — lui qui avait consacré sa vie à transmettre.",
      },
      {
        type: 'paragraph',
        content: "L'Ibis vint se poser sur le muret de sa maison. Chaque matin, à la même heure, il était là. Le maître, qui ne comprenait pas pourquoi, commença à lui parler — lui racontant des fragments de ce dont il se souvenait encore, des histoires de son enfance, des proverbes de ses parents.",
      },
      {
        type: 'quote',
        content: "Un jour, le maître dit : « Je n'ai plus de mémoire. Que suis-je, si je ne me souviens plus ? » L'Ibis inclina la tête et dit — car en ce temps les oiseaux parlaient encore aux sages — : « Tu n'es pas ta mémoire. Tu es ce que tu continues de faire avec ce qui te reste. »",
      },
      {
        type: 'paragraph',
        content: "Le maître continua d'enseigner, avec les bribes qui lui restaient. Ses élèves comprirent et le complétèrent — ils devinrent sa mémoire externe. Et l'Ibis resta sur son muret jusqu'à la mort du vieux maître, vingt ans plus tard.",
      },
      {
        type: 'paragraph',
        content: "Les Songhay disent que c'est pourquoi l'Ibis se tient toujours près des eaux habitées — il veille sur ceux dont la mémoire est fragile, rappelant que la communauté est la vraie archive.",
      },
    ],
    morale: "Nous ne sommes pas notre mémoire — nous sommes ce que nous continuons de faire et d'offrir. Et la mémoire collective d'un groupe peut porter ce qu'un individu ne peut plus porter seul.",
  },

  {
    id: 'conte-scorpion-crocodile',
    titre: "Le Scorpion et le Crocodile",
    animal: "Scorpion",
    animalIcon: "🦂",
    tradition: "Wolof (Sénégal / Gambie)",
    region: "Afrique de l'Ouest",
    duree: "5 min",
    couleur: "#8B2500",
    resume: "Le Scorpion veut traverser le fleuve. Le Crocodile hésite à l'aider. Ce qui se passe ensuite est devenu le conte le plus enseigné dans les écoles du Sahel.",
    contenu: [
      {
        type: 'paragraph',
        content: "Le Scorpion voulait traverser le fleuve et trouva le Crocodile sur la berge. « Porte-moi sur ton dos jusqu'à l'autre rive. » Le Crocodile réfléchit. « Si je te prends sur mon dos, tu me piqueras en chemin. » Le Scorpion secoua ses pinces. « Pourquoi ferais-je ça ? Si tu meurs, je me noie. Je ne suis pas stupide. »",
      },
      {
        type: 'paragraph',
        content: "Le Crocodile trouva l'argument raisonnable. Il prit le Scorpion sur son dos et s'engagea dans le courant. À mi-fleuve, le Scorpion le piqua.",
      },
      {
        type: 'paragraph',
        content: "Le venin commençait à paralyser le Crocodile. Tandis qu'il cherchait à rejoindre la berge le plus vite possible, il parvint à prononcer les mots qui brûlaient dans sa gorge depuis des années :",
      },
      {
        type: 'quote',
        content: "« Tu m'as dit que tu ne me piquerais pas parce que tu te noierais. Tu t'es noyé quand même. Pourquoi ? »",
      },
      {
        type: 'paragraph',
        content: "Le Scorpion, qui coulait dans l'eau, répondit d'une voix déjà lointaine : « Je ne sais pas. C'est ma nature. Je savais que c'était une erreur. Mais au milieu du fleuve, quelque chose en moi l'a fait quand même. »",
      },
      {
        type: 'paragraph',
        content: "Le Crocodile réussit à rejoindre la berge, à demi-paralysé. Il survécut — car les crocodiles résistent mieux que d'autres. Mais il resta longtemps à regarder l'endroit où le Scorpion avait coulé, pensant à cette réponse.",
      },
      {
        type: 'quote',
        content: "« Connaître sa nature ne suffit pas, dit-il finalement. Il faut la travailler, chaque jour, pour qu'elle ne nous détruise pas nous-même. »",
      },
    ],
    morale: "Nos instincts profonds peuvent agir contre nos intérêts les plus évidents. La vraie liberté n'est pas d'ignorer sa nature — c'est de la travailler assez pour ne pas la laisser agir à notre place dans les moments cruciaux.",
  },

  {
    id: 'conte-calao-messager',
    titre: "Le Calao et le Message des Rois",
    animal: "Calao",
    animalIcon: "🦜",
    tradition: "Mandé (Mali / Guinée)",
    region: "Afrique de l'Ouest",
    duree: "6 min",
    couleur: "#8B4000",
    resume: "Le Calao est le seul oiseau qui ne porte pas ses messages dans sa gueule, mais dans sa corne — et voici pourquoi.",
    contenu: [
      {
        type: 'paragraph',
        content: "Du temps où les rois d'Afrique de l'Ouest s'envoyaient des messages portés par des oiseaux messagers, le Calao était le plus respecté. Non pas parce qu'il était le plus rapide — il ne l'était pas — mais parce qu'il était le seul à n'avoir jamais laissé tomber un message.",
      },
      {
        type: 'paragraph',
        content: "Le secret était dans sa corne — le grand casque jaune et rouge qui orne son bec. On dit que le premier Calao naquit d'un croisement entre un oiseau et un roi guerrier mort au combat. Son bec ordinaire ne pouvait pas porter un message royal sans le salir ou le déchirer. Alors un forgeron-esprit lui forgea une corne de protection.",
      },
      {
        type: 'paragraph',
        content: "Un jour, le roi du Manding envoya un message de paix au roi du Wassoulou, son ennemi de toujours. C'était un accord fragile — si le message arrivait abîmé, ou mal compris, la guerre reprendrait. Tous les autres messagers refusèrent le risque.",
      },
      {
        type: 'paragraph',
        content: "Le Calao accepta. Il prit le message — un rouleau de cuir gravé — dans sa corne, et vola pendant deux jours sans s'arrêter. Quand il arriva au palais du roi du Wassoulou, le message était intact, chaque mot lisible.",
      },
      {
        type: 'quote',
        content: "Le roi du Wassoulou regarda le Calao posé devant lui. « Comment as-tu traversé deux jours sans boire, sans manger ? — Un messager qui perd le message n'est plus un messager. Il n'est qu'un oiseau. »",
      },
      {
        type: 'paragraph',
        content: "La paix fut signée. Depuis, les Mandé sculptent le Calao sur les portes des palais — symbole du messager fidèle, de la parole portée sans trahison.",
      },
    ],
    morale: "La fidélité à une mission — même au prix de la fatigue, même sans témoin en chemin — est ce qui transforme un acte ordinaire en acte exemplaire. Porter quelque chose d'important engage tout ce qu'on est.",
  },

  {
    id: 'conte-rhinoceros-premiere-guerre',
    titre: "Le Rhinocéros et la Première Guerre",
    animal: "Rhinocéros",
    animalIcon: "🦏",
    tradition: "Fulani / Peul (Sahel)",
    region: "Afrique de l'Ouest",
    duree: "7 min",
    couleur: "#4A4040",
    resume: "Le Rhinocéros était autrefois le plus grand défenseur de la paix — jusqu'au jour où on lui fit croire que la paix avait un prix.",
    contenu: [
      {
        type: 'paragraph',
        content: "Les griots Peul racontent qu'au commencement il n'y avait pas de guerre entre les animaux. Tous mangeaient selon leurs besoins, tous vivaient dans leurs territoires sans empiéter sur ceux des autres. Le Rhinocéros était le garant de cet équilibre — nul n'osait déclencher un conflit tant que sa silhouette imposante se profilait à l'horizon.",
      },
      {
        type: 'paragraph',
        content: "Un esprit malin — que les Peul appellent Iblis des savanes — décida de tester cet équilibre. Il alla trouver le Rhinocéros et lui dit : « On dit dans la forêt que tu es vieux et que tu n'as plus la force d'arrêter quiconque. On dit que ta corne est creuse et ta peau fragile. »",
      },
      {
        type: 'paragraph',
        content: "Le Rhinocéros, blessé dans son orgueil, fonça dans la forêt pour prouver qu'il était encore fort. Il renversa des arbres, chargea à l'aveugle — et dans sa course, blessa un jeune antilope qui passait par là. L'antilope mourut. La famille de l'antilope exigea réparation. Les lionnes qui protégeaient le territoire s'en mêlèrent. En trois jours, la première grande guerre entre espèces éclata.",
      },
      {
        type: 'quote',
        content: "Quand le Rhinocéros comprit ce qu'il avait déclenché, il hurla vers le ciel : « J'ai voulu prouver ma force — et j'ai provoqué ce que toute ma force était censée empêcher. »",
      },
      {
        type: 'paragraph',
        content: "Depuis ce jour, le Rhinocéros charge à l'aveugle quand il est provoqué — il a gardé cette réaction mal maîtrisée. Mais il a aussi gardé la mémoire de sa faute : c'est pourquoi il vit solitaire, à l'écart, gardien qui se méfie désormais de lui-même.",
      },
    ],
    morale: "Ceux qui ont pour mission de maintenir la paix doivent être les plus imperméables aux provocations. Car si le gardien perd son calme, c'est tout l'édifice qu'il portait qui s'effondre. La force véritable est d'abord maîtrise de soi.",
  },
];
