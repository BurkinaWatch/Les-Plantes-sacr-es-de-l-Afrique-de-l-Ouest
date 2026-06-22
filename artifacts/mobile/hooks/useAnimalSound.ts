import { Platform } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────────────────
   URLs audio libres — Wikimedia Commons (libres de droits, CORS ouvert)
───────────────────────────────────────────────────────────────────── */
const ANIMAL_SOUNDS: Record<string, string> = {
  lion:         'https://upload.wikimedia.org/wikipedia/commons/b/b3/Lion_roar_sf_CA.mp3',
  elephant:     'https://upload.wikimedia.org/wikipedia/commons/0/0f/Elephant_trumpet.ogg',
  leopard:      'https://upload.wikimedia.org/wikipedia/commons/b/b3/Lion_roar_sf_CA.mp3',
  panthere:     'https://upload.wikimedia.org/wikipedia/commons/b/b3/Lion_roar_sf_CA.mp3',
  crocodile:    'https://upload.wikimedia.org/wikipedia/commons/3/3f/Alligator-mississippiensis-call.ogg',
  aigle:        'https://upload.wikimedia.org/wikipedia/commons/1/1f/Haliaeetus_leucocephalus_-_sound.ogg',
  serpent:      'https://upload.wikimedia.org/wikipedia/commons/7/73/Crotalus_rattlesnake_sound.ogg',
  grenouille:   'https://upload.wikimedia.org/wikipedia/commons/6/68/Rana_temporaria_2.ogg',
  hippopotame:  'https://upload.wikimedia.org/wikipedia/commons/e/e0/Hippo_yawn.ogg',
  cigogne:      'https://upload.wikimedia.org/wikipedia/commons/0/04/Ciconia_ciconia_-_sound_at_nest.ogg',
  vautour:      'https://upload.wikimedia.org/wikipedia/commons/4/4d/Gyps_africanus.ogg',
  cameleon:     'https://upload.wikimedia.org/wikipedia/commons/7/73/Crotalus_rattlesnake_sound.ogg',
  hyene:        'https://upload.wikimedia.org/wikipedia/commons/d/d5/Spotted_hyena_whooping.ogg',
  lezard:       'https://upload.wikimedia.org/wikipedia/commons/e/e1/Gecko_call.ogg',
  singe:        'https://upload.wikimedia.org/wikipedia/commons/e/eb/Chlorocebus_pygerythrus_-_call.ogg',
  souris:       'https://upload.wikimedia.org/wikipedia/commons/d/d0/Mus_musculus_-_sound.ogg',
  calao:        'https://upload.wikimedia.org/wikipedia/commons/6/61/Bucerotidae_hornbill.ogg',
  cheval:       'https://upload.wikimedia.org/wikipedia/commons/d/d3/Horse-whinny.ogg',
  iguane:       'https://upload.wikimedia.org/wikipedia/commons/7/73/Crotalus_rattlesnake_sound.ogg',
  chevre:       'https://upload.wikimedia.org/wikipedia/commons/f/f3/Goat_bleating.ogg',
  pintade:      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Numida_meleagris_call.ogg',
  lievre:       'https://upload.wikimedia.org/wikipedia/commons/c/c2/Lepus_europaeus_-_sound.ogg',
  colombe:      'https://upload.wikimedia.org/wikipedia/commons/5/56/Columba_palumbus_-_sound.ogg',
  cerf:         'https://upload.wikimedia.org/wikipedia/commons/7/72/Cervus_elaphus_-_belling.ogg',
  chien:        'https://upload.wikimedia.org/wikipedia/commons/2/2d/Dog_barking_(German_Shepherd).ogg',
  ane:          'https://upload.wikimedia.org/wikipedia/commons/e/e4/Donkey_Hee_Haw.ogg',
  antilope:     'https://upload.wikimedia.org/wikipedia/commons/5/51/Impala_alarm_call.ogg',
  tatou:        'https://upload.wikimedia.org/wikipedia/commons/d/d0/Mus_musculus_-_sound.ogg',
  poulet:       'https://upload.wikimedia.org/wikipedia/commons/5/53/Rooster_crowing_02.ogg',
  cochon:       'https://upload.wikimedia.org/wikipedia/commons/f/f9/Oink_oink.ogg',
  pigeon:       'https://upload.wikimedia.org/wikipedia/commons/5/56/Columba_palumbus_-_sound.ogg',
  lapin:        'https://upload.wikimedia.org/wikipedia/commons/c/c2/Lepus_europaeus_-_sound.ogg',
  'porc-epic':  'https://upload.wikimedia.org/wikipedia/commons/d/d0/Mus_musculus_-_sound.ogg',
  rat:          'https://upload.wikimedia.org/wikipedia/commons/d/d0/Mus_musculus_-_sound.ogg',
  ecureuil:     'https://upload.wikimedia.org/wikipedia/commons/5/5c/Sciurus_vulgaris_-_alarm_call.ogg',
  cygne:        'https://upload.wikimedia.org/wikipedia/commons/a/a2/Cygnus_olor_-_trumpeting.ogg',
  gorille:      'https://upload.wikimedia.org/wikipedia/commons/3/3d/Gorilla_gorilla_gorilla_-_sound.ogg',
  buffle:       'https://upload.wikimedia.org/wikipedia/commons/6/6c/Syncerus_caffer_-_sound.ogg',
  rhinoceros:   'https://upload.wikimedia.org/wikipedia/commons/f/f5/Ceratotherium_simum_-_sound.ogg',
  guepard:      'https://upload.wikimedia.org/wikipedia/commons/9/9f/Acinonyx_jubatus_-_chirping.ogg',
  gnou:         'https://upload.wikimedia.org/wikipedia/commons/a/a0/Connochaetes_taurinus_-_call.ogg',
  perroquet:    'https://upload.wikimedia.org/wikipedia/commons/6/66/Psittacus_erithacus_-_sound.ogg',
  ibis:         'https://upload.wikimedia.org/wikipedia/commons/3/30/Threskiornis_aethiopicus_-_call.ogg',
  flamant:      'https://upload.wikimedia.org/wikipedia/commons/4/41/Phoenicopterus_roseus_-_call.ogg',
  heron:        'https://upload.wikimedia.org/wikipedia/commons/7/75/Ardea_cinerea_-_call.ogg',
  zebre:        'https://upload.wikimedia.org/wikipedia/commons/1/14/Equus_burchellii_-_bark.ogg',
  mangouste:    'https://upload.wikimedia.org/wikipedia/commons/4/48/Mungos_mungo_-_warning.ogg',
  phacochère:   'https://upload.wikimedia.org/wikipedia/commons/f/f9/Oink_oink.ogg',
  'oryctérope': 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Oink_oink.ogg',
  pangolin:     'https://upload.wikimedia.org/wikipedia/commons/d/d0/Mus_musculus_-_sound.ogg',
  tortue:       'https://upload.wikimedia.org/wikipedia/commons/2/29/Aldabrachelys_gigantea_-_sound.ogg',
  'poisson-chat': 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Mus_musculus_-_sound.ogg',
};

/* Animaux au silence intentionnel dans ANIMAL_CRIS */
const SILENT_ANIMALS = new Set(['poisson', 'escargot', 'araignee', 'scorpion', 'girafe']);

export function useAnimalSound(animalId: string) {
  const webAudioRef = useRef<HTMLAudioElement | null>(null);
  /* expo-audio player ref — typed as any to avoid import issues on web build */
  const nativePlayerRef = useRef<any>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isSilent = SILENT_ANIMALS.has(animalId);
  const soundUrl  = isSilent ? null : (ANIMAL_SOUNDS[animalId] ?? null);
  const hasSound  = !isSilent && !!soundUrl;

  /* Nettoyage quand l'animal change ou que le composant est démonté */
  useEffect(() => {
    return () => {
      if (Platform.OS === 'web') {
        if (webAudioRef.current) {
          webAudioRef.current.pause();
          webAudioRef.current = null;
        }
      } else {
        if (nativePlayerRef.current) {
          try { nativePlayerRef.current.remove(); } catch { /* ignore */ }
          nativePlayerRef.current = null;
        }
      }
      setIsPlaying(false);
      setIsLoading(false);
    };
  }, [animalId]);

  const play = useCallback(async () => {
    if (!soundUrl) return;

    /* ─── WEB — HTML5 Audio API ─── */
    if (Platform.OS === 'web') {
      if (isPlaying && webAudioRef.current) {
        webAudioRef.current.pause();
        webAudioRef.current.currentTime = 0;
        webAudioRef.current = null;
        setIsPlaying(false);
        return;
      }
      try {
        setIsLoading(true);
        if (webAudioRef.current) {
          webAudioRef.current.pause();
          webAudioRef.current = null;
        }
        const audio = new Audio(soundUrl);
        webAudioRef.current = audio;
        audio.oncanplaythrough = () => setIsLoading(false);
        audio.onended  = () => { setIsPlaying(false); webAudioRef.current = null; };
        audio.onerror  = () => { setIsLoading(false); setIsPlaying(false); webAudioRef.current = null; };
        setIsPlaying(true);
        await audio.play();
      } catch {
        setIsLoading(false);
        setIsPlaying(false);
      }
      return;
    }

    /* ─── NATIVE — expo-audio (SDK 54) ─── */
    try {
      /* Import dynamique pour éviter l'erreur sur web */
      const { createAudioPlayer, setAudioModeAsync } = await import('expo-audio');

      if (isPlaying && nativePlayerRef.current) {
        nativePlayerRef.current.pause();
        nativePlayerRef.current.remove();
        nativePlayerRef.current = null;
        setIsPlaying(false);
        return;
      }

      setIsLoading(true);

      await setAudioModeAsync({
        playsInSilentMode: true,
        shouldDuckAndroid: true,
      });

      if (nativePlayerRef.current) {
        nativePlayerRef.current.remove();
        nativePlayerRef.current = null;
      }

      const player = createAudioPlayer({ uri: soundUrl });
      nativePlayerRef.current = player;

      player.addListener('playbackStatusUpdate', (status: any) => {
        if (status.isLoaded) {
          setIsLoading(false);
          if (status.didJustFinish) {
            setIsPlaying(false);
            player.remove();
            nativePlayerRef.current = null;
          }
        }
      });

      player.play();
      setIsLoading(false);
      setIsPlaying(true);
    } catch {
      setIsLoading(false);
      setIsPlaying(false);
    }
  }, [soundUrl, isPlaying]);

  return { play, isPlaying, isLoading, hasSound };
}
