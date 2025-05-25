const moodConfig = {
    // Mood State Transitions
    transitions: {
        'sad': { target: 'calm', final: 'hopeful' },
        'angry': { target: 'focused', final: 'empowered' },
        'anxious': { target: 'grounded', final: 'confident' }
    },

    // Mood to Music & Visual Mappings
    mappings: {
        sad: {
            music: {
                prompt: "slow melancholic acoustic guitar with soft piano",
                denoising: 0.7,
                seed: "acoustic",
                bpm: "60-80"
            },
            visuals: {
                colorPalette: [0x4a90e2, 0x357abd, 0x2c3e50],
                particleSpeed: 0.01,
                particleSize: 0.15,
                particleCount: 200,
                animationTempo: 0.5
            }
        },
        calm: {
            music: {
                prompt: "peaceful ambient nature sounds with gentle piano",
                denoising: 0.6,
                seed: "ambient",
                bpm: "70-90"
            },
            visuals: {
                colorPalette: [0x7fdbff, 0x39cccc, 0x2ecc71],
                particleSpeed: 0.015,
                particleSize: 0.2,
                particleCount: 250,
                animationTempo: 0.7
            }
        },
        hopeful: {
            music: {
                prompt: "uplifting orchestral with soft strings",
                denoising: 0.5,
                seed: "orchestral",
                bpm: "80-100"
            },
            visuals: {
                colorPalette: [0xffdc00, 0xff851b, 0xff4136],
                particleSpeed: 0.02,
                particleSize: 0.25,
                particleCount: 300,
                animationTempo: 0.9
            }
        },
        angry: {
            music: {
                prompt: "dark aggressive synth with heavy bass",
                denoising: 0.8,
                seed: "synth",
                bpm: "120-140"
            },
            visuals: {
                colorPalette: [0xff4136, 0x85144b, 0x111111],
                particleSpeed: 0.03,
                particleSize: 0.3,
                particleCount: 400,
                animationTempo: 1.2
            }
        },
        focused: {
            music: {
                prompt: "minimal techno with steady beat",
                denoising: 0.65,
                seed: "techno",
                bpm: "100-120"
            },
            visuals: {
                colorPalette: [0x0074d9, 0x001f3f, 0x7fdbff],
                particleSpeed: 0.025,
                particleSize: 0.25,
                particleCount: 350,
                animationTempo: 1.0
            }
        },
        empowered: {
            music: {
                prompt: "epic orchestral with powerful drums",
                denoising: 0.6,
                seed: "epic",
                bpm: "110-130"
            },
            visuals: {
                colorPalette: [0xffdc00, 0xff851b, 0x0074d9],
                particleSpeed: 0.035,
                particleSize: 0.35,
                particleCount: 450,
                animationTempo: 1.3
            }
        },
        anxious: {
            music: {
                prompt: "lo-fi ambient with soft pads",
                denoising: 0.7,
                seed: "lofi",
                bpm: "70-90"
            },
            visuals: {
                colorPalette: [0x2ecc71, 0x3d9970, 0x111111],
                particleSpeed: 0.02,
                particleSize: 0.2,
                particleCount: 300,
                animationTempo: 0.8
            }
        },
        grounded: {
            music: {
                prompt: "meditative ambient with nature sounds",
                denoising: 0.6,
                seed: "meditation",
                bpm: "60-80"
            },
            visuals: {
                colorPalette: [0x3d9970, 0x2ecc71, 0x01ff70],
                particleSpeed: 0.015,
                particleSize: 0.25,
                particleCount: 250,
                animationTempo: 0.6
            }
        },
        confident: {
            music: {
                prompt: "uplifting electronic with positive energy",
                denoising: 0.5,
                seed: "electronic",
                bpm: "90-110"
            },
            visuals: {
                colorPalette: [0xffdc00, 0xff851b, 0x2ecc71],
                particleSpeed: 0.03,
                particleSize: 0.3,
                particleCount: 350,
                animationTempo: 1.1
            }
        }
    }
};

export default moodConfig; 