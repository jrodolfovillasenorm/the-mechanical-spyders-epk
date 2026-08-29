import type { Track } from '../types/tracks'

export const tracks: Track[] = [
    {
        id: 'the-fall',
        title: 'The Fall',
        artist: 'Ziggety Zag & The Mechanical Spyders',
        artwork: '/artwork/the-fall.jpeg',
        audio: '/audio/the-fall.mp3',
        released: true,
    },

    {
        id: 'andromedon',
        title: 'Andromedon',
        artist: 'Ziggety Zag & The Mechanical Spyders',
        artwork: '/artwork/andromedon.jpg',
        audio: '/audio/andromedon.mp3',
        released: true,
    },

    {
        id: 'birth-of-the-starmen',
        title: 'Birth Of The Starmen',
        artist: 'Ziggety Zag & The Mechanical Spyders',
        artwork: '/artwork/birth-of-the-starmen.jpeg',
        audio: '/audio/birth-of-the-starmen.mp3',
        released: false,
        private: true
    },

    {
        id: 'light-machine',
        title: '(Get On The) Light Machine',
        artist: 'Ziggety Zag & The Mechanical Spyders',
        artwork: '/artwork/light-machine.jpeg',
        audio: '/audio/light-machine.mp3',
        released: false,
        private: true
    },
]