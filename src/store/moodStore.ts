import { create } from 'zustand';

export type Mood = 'sad' | 'calm' | 'anxious';

interface MoodConfig {
  prompt: string;
  negative_prompt: string;
  denoising: number;
  num_inference_steps: number;
  guidance_scale: number;
}

interface MoodState {
  currentMood: Mood | null;
  moodConfig: Record<Mood, MoodConfig>;
  setMood: (mood: Mood) => void;
}

export const useMoodStore = create<MoodState>((set) => ({
  currentMood: null,
  moodConfig: {
    sad: {
      prompt: 'A melancholic, emotional piano melody with soft strings in the background. Professional studio recording, high fidelity, crystal clear sound, 24-bit depth.',
      negative_prompt: 'low quality, distorted, noisy, amateur recording',
      denoising: 0.65,
      num_inference_steps: 150,
      guidance_scale: 12.0,
    },
    calm: {
      prompt: 'A peaceful ambient soundscape with gentle nature sounds and soft pads. Professional studio recording, high fidelity, crystal clear sound, 24-bit depth.',
      negative_prompt: 'low quality, distorted, noisy, amateur recording',
      denoising: 0.65,
      num_inference_steps: 150,
      guidance_scale: 12.0,
    },
    anxious: {
      prompt: 'An intense, building electronic track with complex rhythms and atmospheric elements. Professional studio recording, high fidelity, crystal clear sound, 24-bit depth.',
      negative_prompt: 'low quality, distorted, noisy, amateur recording',
      denoising: 0.65,
      num_inference_steps: 150,
      guidance_scale: 12.0,
    },
  },
  setMood: (mood: Mood) => set({ currentMood: mood }),
})); 