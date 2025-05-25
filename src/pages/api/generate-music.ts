import type { NextApiRequest, NextApiResponse } from 'next';
import { useMoodStore } from '@/store/moodStore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { mood } = req.body;
    const { moodConfig } = useMoodStore.getState();

    if (!mood || !moodConfig[mood]) {
      return res.status(400).json({ error: 'Invalid mood' });
    }

    const config = moodConfig[mood];
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.RIFFUSION_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05',
        input: {
          prompt: config.prompt,
          negative_prompt: config.negative_prompt,
          denoising: config.denoising,
          num_inference_steps: config.num_inference_steps,
          guidance_scale: config.guidance_scale,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate music');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error generating music:', error);
    res.status(500).json({ error: 'Failed to generate music' });
  }
} 