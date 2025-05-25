import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ParticleSystem } from '@/components/ParticleSystem/ParticleSystem';
import { useMoodStore, Mood } from '@/store/moodStore';
import styles from '@/styles/Experience.module.css';

export default function Experience() {
  const { currentMood, setMood } = useMoodStore();
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Initialize audio context on user interaction
    const initAudio = () => {
      const context = new AudioContext({
        sampleRate: 44100,
        latencyHint: 'interactive',
      });
      const gain = context.createGain();
      gain.connect(context.destination);
      setAudioContext(context);
      setGainNode(gain);
    };

    document.addEventListener('click', initAudio, { once: true });
    return () => document.removeEventListener('click', initAudio);
  }, []);

  const handleMoodSelect = (mood: Mood) => {
    setMood(mood);
    if (audioContext && gainNode) {
      generateMusic(mood);
    }
  };

  const generateMusic = async (mood: Mood) => {
    if (!audioContext || !gainNode) return;

    try {
      const response = await fetch('/api/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood }),
      });

      if (!response.ok) throw new Error('Failed to generate music');

      const { id } = await response.json();
      await pollPrediction(id);
    } catch (error) {
      console.error('Error generating music:', error);
    }
  };

  const pollPrediction = async (id: string) => {
    try {
      const response = await fetch(`/api/prediction/${id}`);
      const data = await response.json();

      if (data.status === 'succeeded' && data.output) {
        const audioResponse = await fetch(data.output);
        const arrayBuffer = await audioResponse.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(gainNode);
        source.start(0);
        setIsPlaying(true);
      } else if (data.status === 'processing') {
        setTimeout(() => pollPrediction(id), 1000);
      }
    } catch (error) {
      console.error('Error polling prediction:', error);
    }
  };

  const togglePlayback = () => {
    if (!audioContext || !gainNode) return;

    if (isPlaying) {
      gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 3);
      setIsPlaying(false);
    } else {
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 3);
      setIsPlaying(true);
    }
  };

  return (
    <div className={styles.container}>
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <ParticleSystem />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      <div className={styles.controls}>
        <div className={styles.moodButtons}>
          <button
            className={`${styles.moodButton} ${currentMood === 'sad' ? styles.active : ''}`}
            onClick={() => handleMoodSelect('sad')}
          >
            Sad
          </button>
          <button
            className={`${styles.moodButton} ${currentMood === 'calm' ? styles.active : ''}`}
            onClick={() => handleMoodSelect('calm')}
          >
            Calm
          </button>
          <button
            className={`${styles.moodButton} ${currentMood === 'anxious' ? styles.active : ''}`}
            onClick={() => handleMoodSelect('anxious')}
          >
            Anxious
          </button>
        </div>

        <div className={styles.audioControls}>
          <button
            className={styles.playButton}
            onClick={togglePlayback}
            disabled={!audioContext}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
    </div>
  );
} 