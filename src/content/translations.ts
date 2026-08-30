import type { Language } from "../types/language";

export interface TranslationContent {
  navigation: {
    music: string;
    videos: string;
    about: string;
    bio: string;
    contact: string;
  };

  hero: {
    transmission: string;
    scroll: string;
    crawl: string[];
    signal: string;
    active: string;
    freq: string;
    spyder: string;
  };

  music: {
    title: string;
    nowReceiving: string;
    released: string;
    preRelease: string;
    restricted: string;
    locked: string;
    code: string;
  };

  videos: {
    title: string;
  };

  gallery: {
    subtitle: string;
    title: string;
  };

  bio: {
    subtitle: string;
    title: string;
    subject: string;
    status: string;
    active: string;
    description: string;
    bios: string[];
    eof: string;
    ready: string;
    engage: string;
    file: string;
    signal: string;
    visual: string;
    keepScrolling: string;
  };

  contact: {
    title: string;
    booking: string;
    bio: string;
  };
}

export const translations: Record<Language, TranslationContent> = {
  en: {
    navigation: {
      music: "MUSIC",
      videos: "VIDEOS",
      about: "ABOUT",
      bio: "PRESS",
      contact: "CONTACT",
    },

    hero: {
      transmission: "TRANSMISSION // 001",
      scroll: "SCROLL TO RECEIVE TRANSMISSION",
      crawl: [
        "A transmission has been detected from somewhere beyond the known charts.",
        "Ziggety Zag and The Mechanical Spyders are transmitting their signal across the cosmos.",
        "Glam. Space Rock. Strange machines. Distant worlds.",
      ],
      signal: "SIGNAL",
      active: "ACTIVE",
      freq: "FREQ",
      spyder: "WHITE SPYDER",
    },

    music: {
      title: "MUSIC",
      nowReceiving: "NOW RECEIVING",
      released: "Released",
      preRelease: "Pre-release",
      restricted: "Restricted",
      locked: "RESTRICTED TRANSMISSION",
      code: "This transmission has not yet been released. Enter your Spyder Code to access it.",
    },

    videos: {
      title: "VIDEOS",
    },

    gallery: {
      subtitle: "VISUALS",
      title: "IMAGE ARCHIVE",
    },

    bio: {
      subtitle: "FILE 001",
      title: "THE MECHANICAL SPYDERS",
      subject: "SUBJECT",
      status: "STATUS",
      active: "ACTIVE",
      description: "FILE DESCRIPTION",
      bios: [
        "CAPTAIN ZAG - VOCALS & GUITAR",
        "More than twenty years ago, Captain Zag launched the first mission of **The Mechanical Spyders** with a very specific goal: to take the glam of the seventies beyond Earth’s atmosphere. A natural multi-instrumentalist, he has piloted guitars, drums, bass and keyboards through countless musical projects, collecting influences like artifacts from forgotten galaxies. He claims to have played guitar for so long that he no longer remembers how to do it..., which may explain why he still sounds like he arrived from the future",
        "VAN VOURDALAK — GUITAR",
        "For more than thirty years, Van Vourdalak has pursued a single mission: finding the perfect chord between darkness and elegance. Inspired from the beginning by **The Cure**, he has traveled through more than twenty rock bands, including five different tributes devoted to the universe of Robert Smith. His personal log contains one legendary encounter: meeting Robert Smith in Monterrey and thanking him face-to-face for the signal that altered the course of his musical journey forever.",
        "VÍKTOR — KEYBOARDS & SEQUENCES",
        "Producer, audio engineer and architect of interstellar atmospheres, Víktor joined **The Mechanical Spyders** in 2023 to open new sonic portals. Active since 2009 and deeply influenced by the darker side of the eighties and its electronic sounds, he transforms synthesizers and sequences into atmospheric transmissions where satellites, neon and memories of futures that never happened drift through the void. Every performance is a signal from another dimension.",
        "LE RAT — BASS & VOCALS",
        "Le Rat is the keeper of the lower frequencies and the philosophical compass of **The Mechanical Spyders**. Present since the earliest incarnations of the band, he has helped shape its sonic identity through bass lines and vocal harmonies that hold the machinery together. His sound travels between post-punk, eighties rock and retro science fiction, maintaining the artificial gravity of the ship while echoes of distant worlds move through the music.",
        "WARPBEAT — DRUMS",
        "Born in the year 2287 aboard the orbital station **Andromeda-9**, WarpBeat arrived in this century through a rhythmic anomaly classified by the Galactic Federation. Recruited by Captain Zag to join **The Mechanical Spyders**, he developed a style where precision, power and warp-speed energy collide behind the drums. His mission is simple: keep the engines of space glam running at maximum velocity.",
      ],
      eof: "END OF FILE",
      ready: "READY?",
      engage: "ENGAGE",
      file: "FILE 001",
      signal: "VISUAL SIGNAL ACTIVE",
      visual: "VISUAL TRANSMISSION",
      keepScrolling: "KEEP SCROLLING",
    },

    contact: {
      title: "CONTACT",
      booking: "BOOKING",
      bio: "PRESS",
    },
  },

  es: {
    navigation: {
      music: "MÚSICA",
      videos: "VIDEOS",
      about: "NOSOTROS",
      bio: "PRENSA",
      contact: "CONTACTO",
    },

    hero: {
      transmission: "TRANSMISIÓN // 001",
      scroll: "DESPLÁZATE PARA RECIBIR LA TRANSMISIÓN",
      crawl: [
        "Se ha detectado una transmisión proveniente de algún lugar más allá de los mapas conocidos.",
        "Ziggety Zag y The Mechanical Spyders transmiten su señal a través del cosmos.",
        "Glam. Space Rock. Máquinas extrañas. Mundos distantes.",
      ],
      signal: "SEÑAL",
      active: "ACTIVA",
      freq: "FREQ",
      spyder: "WHITE SPYDER",
    },

    music: {
      title: "MÚSICA",
      nowReceiving: "RECIBIENDO AHORA",
      released: "Released",
      preRelease: "Pre-release",
      restricted: "Restricted",
      locked: "TRANSMISIÓN RESTRINGIDA",
      code: "Esta transmisión aún no ha sido liberada. Ingresa tu código spyder para acceder a ella.",
    },

    videos: {
      title: "VIDEOS",
    },

    gallery: {
      subtitle: "VISUALES",
      title: "ARCHIVO DE IMÁGENES",
    },

    bio: {
      subtitle: "ARCHIVO 001",
      title: "THE MECHANICAL SPYDERS",
      subject: "SUJETO",
      status: "STATUS",
      active: "ACTIVO",
      description: "DESCRIPCIÓN DEL ARCHIVO",
      bios: [
        "CAPTAIN ZAG - VOZ & GUITARRA",
        "Hace más de veinte años, el Capitán Zag lanzó la primera transmisión de The Mechanical Spyders con una misión muy específica: llevar el glam de los años setenta más allá de la atmósfera terrestre. Multiinstrumentista por vocación, ha pilotado guitarras, baterías, bajos y teclados en innumerables proyectos, recolectando influencias como si fueran artefactos de galaxias olvidadas. Afirma haber tocado la guitarra durante tanto tiempo que ya no recuerda cómo hacerlo... y quizá eso explique por qué sigue sonando como si hubiera llegado del futuro.",
        "VAN VOURDALAK — GUITARRA",
        "Durante más de treinta años, Van Vourdalak ha perfeccionado una sola misión: encontrar el acorde perfecto entre la oscuridad y la elegancia. Inspirado desde el principio por The Cure, ha formado parte de más de veinte bandas de rock, incluyendo cinco distintos tributos dedicados al universo de Robert Smith. Su bitácora personal incluye un momento legendario: conocer a Robert Smith en Monterrey y agradecerle, cara a cara, la señal que alteró para siempre el rumbo de su trayectoria musical.",
        "VÍKTOR — TECLADOS & SECUENCIAS",
        "Productor musical, ingeniero de audio y diseñador de paisajes interestelares, Víktor se incorporó a The Mechanical Spyders en 2023 para abrir nuevos portales sonoros. Activo desde 2009 e influenciado profundamente por la escena oscura y la electrónica de los años ochenta, convierte sintetizadores y secuencias en atmósferas donde flotan satélites, neones y recuerdos de futuros que nunca ocurrieron. Cada concierto es una transmisión desde otra dimensión.",
        "LE RAT — BAJO & VOZ",
        "Le Rat es el guardián de las frecuencias graves y la brújula filosófica de la tripulación. Desde las primeras encarnaciones de The Mechanical Spyders, ha moldeado el carácter del bajo y las armonías vocales que distinguen a la banda. Su sonido viaja entre el post-punk, el rock ochentero y la ciencia ficción retro, sosteniendo cada composición con líneas de bajo que parecen mantener la gravedad artificial de la nave.",
        "WARPBEAT — DRUMS",
        "Nacido en el año 2287 en la estación espacial Andromeda-9, WarpBeat llegó a este siglo gracias a una anomalía rítmica clasificada por la Federación Galáctica. Reclutado por el Capitán Zag para unirse a The Mechanical Spyders, desarrolló un estilo donde precisión, potencia y velocidad de curvatura conviven detrás de cada batería. Su trabajo consiste en una sola cosa: mantener los motores del glam espacial funcionando a máxima velocidad.",
      ],
      eof: "FIN DEL ARCHIVO",
      ready: "LISTO?",
      engage: "DESPEGAR",
      file: "ARCHIVO 001",
      signal: "SEÑAL VISUAL ACTIVE",
      visual: "TRANSMISIÓN VISUAL",
      keepScrolling: "KEEP BAJANDO",
    },

    contact: {
      title: "CONTACTO",
      booking: "BOOKING",
      bio: "PRENSA",
    },
  },

  spyder: {
    navigation: {
      music: "GU₃",
      videos: "IGI-MEŠ",
      about: "E₂-GAL",
      bio: "DUB",
      contact: "KA",
    },

    hero: {
      transmission: "DUB GU₃ // 001",
      scroll: "ŠU DU₃ GU₃ TI",
      crawl: [
        "AN-TA GU₃ MU-UN-DA-RA.",
        "ZIGGETY ZAG U₃ MECHANI-SPYDERS GU₃ MU-UN-GAR.",
        "GALAM. AN-GU₃. GIŠ-MEŠ. KUR-KUR.",
      ],
      signal: "GU₃",
      active: "ZI",
      freq: "ME",
      spyder: "MÙŠ PEŠ",
    },

    music: {
      title: "GU₃",
      nowReceiving: "GU₃ TI",
      released: "BA-AN-DU₃",
      preRelease: "NU-DU₃",
      restricted: "TAB",
      locked: "GU₃ TAB",
      code: "GU₃ NU BA-AN-DU₃. SPYDER KA ŠUM₂.",
    },

    videos: {
      title: "IGI-MEŠ",
    },

    gallery: {
      subtitle: "E₂-GAL",
      title: "DUB NU-GAL.",
    },

    bio: {
      subtitle: "DUB 001",
      title: "MECHANI-SPYDERS",
      subject: "LU₂",
      status: "ZI",
      active: "ZI",
      description: "DUB ZU",
      bios: [
        "LUGAL ZAG — GU₃ / GIŠ",
        "MECHANI-SPYDERS E₂-GAL MU-UN-DU₃. GIŠ • GU₃ • ZAMZAM • BALAG. U₄ 20-AM₃ KUR-KUR-TA ŠU MU-UN-TI. GALAM U₄ 70-KAM E₂-A BA-AN-GUB. GIŠ ZAG-GA GU₃ MU-UN-GAR. KUR-KUR-TI MU-UN-TUŠ. DINGIR-MEŠ IGI-NE₂",
        "VAN VOURDALAK — GIŠ",
        "VAN VOURDALAK GIŠ MU-UN-TI 30-AM₃. KUR-KUR DARK-MEŠ ŠU MU-UN-TI. GIŠ ME-ŠE₃ MU-UN-GAR. U₄ 20-AM₃ E₂-GAL-MEŠ. THE CURE — NAM-TAR. ROBERT SMITH IGI-BA. MONTERREY KI-A KA MU-UN-GUB. GIŠ-MEŠ ŠÀ-BA MU-UN-DU₃.",
        "VÍKTOR — ME / ZAMZAM",
        "VÍKTOR. U₄ 2009-KAM MU-UN-TUŠ. ME • ZAMZAM • GU₃ • E₂-DUB. U₄ 2023-KAM MECHANI-SPYDERS E₂-GAL-ŠU. U₄ 80-KAM KUR-KUR-TA. ŠA₃-GIG • ZAMZAM • ME. GIŠ-MEŠ. AN-TA KI-A GU₃ MU-UN-DA-RA. IGI-NI₂ ANŠE?. ME MU-UN-ŠUB.",
        "LE RAT — BASS & VOCALS",
        "LE RAT GUŠ-GAL • KA-GAL. MECHANI-SPYDERS U₄ ŠU-BA. GUŠ KUR-KUR-TI MU-UN-GAR. KA MU-UN-DU₃. U₄ 80-KAM KUR-KUR-TI. GUŠ GIŠ-DA MU-UN-NA-TI. ŠÀ MECHANI-SPYDERS. KI • AN • U₄. GUŠ ŠU-BA MU-UN-GUB.",
        "WARPBEAT — DRUMS",
        "WARPBEAT U₄ 2287-KAM. ANDROMEDA-9 E₂-AN-NA. AN-TA MU-UN-ŠUḪ. U₄ MU-UN-ZAL. LUGAL ZAG KA MU-UN-GAR. WARPBEAT BALAG MU-UN-GAR. BALAG • UŠUM • GU₃ • ZI. AN-TA KI-A MU-UN-ŠUḪ. MECHANI-SPYDERS U₄ ŠU-BA AN-TA KUR-KUR-TI MU-UN-TUŠ",
      ],
      eof: "DUB ŠU",
      ready: "ZI?",
      engage: "DU₃",
      file: "DUB 001",
      signal: "IGI GU₃ ZI",
      visual: "IGI GU₃",
      keepScrolling: "ŠU GUB",
    },

    contact: {
      title: "KA",
      booking: "KA-GAL",
      bio: "DUB",
    },
  },
};
