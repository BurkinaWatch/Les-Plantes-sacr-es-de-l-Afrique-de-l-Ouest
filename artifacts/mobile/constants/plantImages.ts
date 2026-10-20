const PLANT_IMAGES: Record<string, any> = {
  baobab:             require('@/assets/images/plants/baobab.webp'),
  fromager:           require('@/assets/images/plants/fromager.webp'),
  'caïlcédrat':       require('@/assets/images/plants/cailcedrat.webp'),
  ficus:              require('@/assets/images/plants/ficus.webp'),
  tamarinier:         require('@/assets/images/plants/tamarinier.webp'),
  iroko:              require('@/assets/images/plants/iroko.webp'),
  moringa:            require('@/assets/images/plants/moringa.webp'),
  neem:               require('@/assets/images/plants/neem.webp'),
  papayer:            require('@/assets/images/plants/papayer.webp'),
  gingembre:          require('@/assets/images/plants/gingembre.webp'),
  bissap:             require('@/assets/images/plants/bissap.webp'),
  kinkeliba:          require('@/assets/images/plants/kinkeliba.webp'),
  kalanchoe:          require('@/assets/images/plants/kalanchoe-full-plant.webp'),
  artemisia:          require('@/assets/images/plants/artemisia.webp'),
  kolatier:           require('@/assets/images/plants/kolatier.webp'),
  nere:               require('@/assets/images/plants/nere.webp'),
  karite:             require('@/assets/images/plants/karite.webp'),
  gombo:              require('@/assets/images/plants/gombo.webp'),
  igname:             require('@/assets/images/plants/igname.webp'),
  manioc:             require('@/assets/images/plants/manioc.webp'),
  arachide:           require('@/assets/images/plants/arachide.webp'),
  sesame:             require('@/assets/images/plants/sesame.webp'),
  vetiver:            require('@/assets/images/plants/vetiver.webp'),
  acacia:             require('@/assets/images/plants/acacia.webp'),
  citronnelle:        require('@/assets/images/plants/citronnelle.webp'),
  raphia:             require('@/assets/images/plants/raphia.webp'),
  'basilic-africain': require('@/assets/images/plants/basilic-africain.webp'),
  mil:                require('@/assets/images/plants/mil.webp'),
  sorgho:             require('@/assets/images/plants/sorgho.webp'),
  fonio:              require('@/assets/images/plants/fonio.webp'),
  ronier:             require('@/assets/images/plants/ronier.webp'),
  dattier:            require('@/assets/images/plants/dattier.webp'),
  'palmier-huile':    require('@/assets/images/plants/palmier-huile-full-plant.webp'),
  cocotier:           require('@/assets/images/plants/cocotier.webp'),

  // Nouveaux Arbres Sacrés
  manguier:           require('@/assets/images/plants/manguier.webp'),
  jujubier:           require('@/assets/images/plants/jujubier.webp'),
  anacardier:         require('@/assets/images/plants/anacardier.webp'),
  flamboyant:         require('@/assets/images/plants/flamboyant.webp'),
  acajou:             require('@/assets/images/plants/acajou.webp'),
  vene:               require('@/assets/images/plants/vene.webp'),
  dimb:               require('@/assets/images/plants/dimb.webp'),

  // Nouvelles Plantes Médicinales
  'aloe-vera':        require('@/assets/images/plants/aloe-vera.webp'),
  guiera:             require('@/assets/images/plants/guiera.webp'),
  piment:             require('@/assets/images/plants/piment.webp'),
  'poivre-de-guinee': require('@/assets/images/plants/poivre-de-guinee.webp'),
  'grains-de-selim':  require('@/assets/images/plants/grains-de-selim.webp'),
  vernonia:           require('@/assets/images/plants/vernonia.webp'),
  corossolier:        require('@/assets/images/plants/corossolier-full-plant.webp'),
  maniguette:         require('@/assets/images/plants/maniguette.webp'),

  // Nouvelles Plantes Rituelles
  securidaca:         require('@/assets/images/plants/securidaca.webp'),
  'ylang-ylang':      require('@/assets/images/plants/ylang-ylang.webp'),

  // Nouvelles Plantes Alimentaires
  niebe:              require('@/assets/images/plants/niebe.webp'),
  mais:               require('@/assets/images/plants/mais.webp'),
  plantain:           require('@/assets/images/plants/plantain.webp'),
  'pois-bambara':     require('@/assets/images/plants/pois-bambara.webp'),
  'patate-douce':     require('@/assets/images/plants/patate-douce.webp'),
  taro:               require('@/assets/images/plants/taro.webp'),
  'canne-a-sucre':    require('@/assets/images/plants/canne-a-sucre.webp'),
  amarante:           require('@/assets/images/plants/amarante.webp'),

  // Nouvelles Herbes & Graminées
  'herbe-de-guinee':  require('@/assets/images/plants/herbe-de-guinee.webp'),
  bambou:             require('@/assets/images/plants/bambou.webp'),

  // Nouveau Palmier
  'palmier-doum':     require('@/assets/images/plants/palmier-doum.webp'),

  // Extension — Nouveaux Arbres Sacrés
  kad:                require('@/assets/images/plants/kad.webp'),
  ditakh:             require('@/assets/images/plants/ditakh.webp'),
  soump:              require('@/assets/images/plants/soump.webp'),
  kapokier:           require('@/assets/images/plants/kapokier.webp'),
  ebene:              require('@/assets/images/plants/ebene.webp'),

  // Extension — Nouvelles Plantes Médicinales
  'pomme-sodome':     require('@/assets/images/plants/pomme-sodome-full-plant.webp'),
  pourghere:          require('@/assets/images/plants/pourghere.webp'),
  goyavier:           require('@/assets/images/plants/goyavier.webp'),

  // Extension — Nouvelles Plantes Alimentaires
  'riz-africain':     require('@/assets/images/plants/riz-africain.webp'),
  'aubergine-africaine': require('@/assets/images/plants/aubergine-africaine.webp'),
  calebasse:          require('@/assets/images/plants/calebasse.webp'),
  madd:               require('@/assets/images/plants/madd.webp'),

  // Extension — Nouvelles Plantes Rituelles
  henne:              require('@/assets/images/plants/henne.webp'),
  newbouldia:         require('@/assets/images/plants/newbouldia.webp'),

  // Extension — Nouvelle Herbe & Graminée
  andropogon:         require('@/assets/images/plants/andropogon.webp'),

  // Monographies complémentaires
  'acacia-nilotica':       require('@/assets/images/plants/acacia-nilotica.webp'),
  'borreria-verticillata': require('@/assets/images/plants/borreria-verticillata.webp'),
  'centella-asiatica':     require('@/assets/images/plants/centella-asiatica.webp'),
  'cucurbita-pepo':        require('@/assets/images/plants/cucurbita-pepo.webp'),
  'detarium-senegalense':  require('@/assets/images/plants/detarium-senegalense.webp'),
  'euphorbia-hirta':       require('@/assets/images/plants/euphorbia-hirta.webp'),
  'holarrhena-floribunda': require('@/assets/images/plants/holarrhena-floribunda.webp'),
  'kigelia-africana':     require('@/assets/images/plants/kigelia-africana.webp'),
  'luffa-aegyptiaca':      require('@/assets/images/plants/luffa-aegyptiaca.webp'),
  'mangifera-indica':      require('@/assets/images/plants/mangifera-indica.webp'),
  'mitracarpus-scaber':    require('@/assets/images/plants/mitracarpus-scaber.webp'),
  'moghania-faginea':      require('@/assets/images/plants/moghania-faginea.webp'),
  'nauclea-latifolia':     require('@/assets/images/plants/nauclea-latifolia.webp'),
  'piliostigma-reticulatum': require('@/assets/images/plants/piliostigma-reticulatum.webp'),
  'sclerocarya-birrea':    require('@/assets/images/plants/sclerocarya-birrea.webp'),
  'sterculia-setigera':    require('@/assets/images/plants/sterculia-setigera.webp'),
  'vitex-doniana':         require('@/assets/images/plants/vitex-doniana.webp'),

  // Monographies botaniques complémentaires
  'ageratum-conyzoides': require('@/assets/images/plants/ageratum-conyzoides.jpg'),
  'butyrospermum-parkii': require('@/assets/images/plants/karite.webp'),
  'cajanus-cajan': require('@/assets/images/plants/cajanus-cajan.jpg'),
  'cassia-alata': require('@/assets/images/plants/cassia-alata.jpg'),
  'cassia-italica': require('@/assets/images/plants/cassia-italica.jpg'),
  'cassia-occidentalis': require('@/assets/images/plants/cassia-occidentalis.jpg'),
  'cassia-sieberiana': require('@/assets/images/plants/cassia-sieberiana.jpg'),
  'catharanthus-roseus': require('@/assets/images/plants/catharanthus-roseus.jpg'),
  'chenopodium-ambrosioides': require('@/assets/images/plants/chenopodium-ambrosioides.jpg'),
  'chrysanthellum-americanum': require('@/assets/images/plants/chrysanthellum-americanum.jpg'),
  'cochlospermum-tinctorium': require('@/assets/images/plants/cochlospermum-tinctorium.jpg'),
  'combretum-glutinosum': require('@/assets/images/plants/combretum-glutinosum.jpg'),
  'fagara-xanthoxylo': require('@/assets/images/plants/fagara-xanthoxylo.jpg'),
  'lippia-multiflora': require('@/assets/images/plants/lippia-multiflora.jpg'),
  'ocimum-basilicum': require('@/assets/images/plants/ocimum-basilicum.jpg'),
  'tinospora-bakis': require('@/assets/images/plants/tinospora-bakis.jpg'),
  'vetiveria-nigritana': require('@/assets/images/plants/vetiveria-nigritana.jpg'),
  'morinda-lucida': require('@/assets/images/plants/morinda-lucida.jpg'),
  'angelica-archangelica': require('@/assets/images/plants/angelica-archangelica.jpg'),
  'betula-alba': require('@/assets/images/plants/betula-alba.jpg'),
  'corchorus-olitorius': require('@/assets/images/plants/corchorus-olitorius.jpg'),
  'amaranthus-cruentus': require('@/assets/images/plants/amaranthus-cruentus.jpg'),
  'gymnanthemum-amygdalinum': require('@/assets/images/plants/vernonia.webp'),
  'thaumatococcus-daniellii': require('@/assets/images/plants/thaumatococcus-daniellii.jpg'),
  'senegalia-macrostachya': require('@/assets/images/plants/senegalia-macrostachya.jpg'),
};

export default PLANT_IMAGES;
