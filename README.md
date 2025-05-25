# FREQ. - Interactive Mood-Based Music & Visual Experience

An immersive web application that combines AI-generated music with dynamic 3D particle visualizations, creating a unique experience based on your mood.

## Features

- 🎵 AI-powered music generation using Riffusion
- 🌈 Dynamic 3D particle system with mood-based color schemes
- 🎨 Interactive mood selection (Sad, Calm, Anxious)
- 🔊 Smooth audio transitions with fade effects
- 🎮 Responsive controls and intuitive user interface

## Tech Stack

- **Frontend Framework**: Next.js 14 with TypeScript
- **3D Graphics**: Three.js with React Three Fiber
- **State Management**: Zustand
- **Styling**: CSS Modules
- **Audio Processing**: Web Audio API
- **AI Integration**: Riffusion API

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- A Riffusion API token (get one at [replicate.com](https://replicate.com))

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/freq-hq.git
   cd freq-hq
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your Riffusion API token:
   ```
   RIFFUSION_API_TOKEN=your_api_token_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
freq-hq/
├── src/
│   ├── components/
│   │   └── ParticleSystem/
│   │       └── ParticleSystem.tsx    # 3D particle visualization
│   │   ├── pages/
│   │   │   ├── api/
│   │   │   │   ├── generate-music.ts     # Music generation endpoint
│   │   │   │   └── prediction/
│   │   │   │   └── [id].ts           # Prediction status endpoint
│   │   │   ├── _app.tsx                  # App wrapper
│   │   │   ├── _document.tsx             # Custom document
│   │   │   └── experience.tsx            # Main experience page
│   │   ├── store/
│   │   │   └── moodStore.ts              # Zustand store for mood state
│   │   └── styles/
│   │       ├── Experience.module.css     # Experience page styles
│   │       └── globals.css               # Global styles
│   ├── .env.local                        # Environment variables
│   ├── next.config.js                    # Next.js configuration
│   ├── package.json                      # Project dependencies
│   └── tsconfig.json                     # TypeScript configuration
```

## Usage

1. Click anywhere on the page to initialize audio (required by browser policies)
2. Select a mood using the buttons at the bottom of the screen
3. Wait for the AI to generate music matching your selected mood
4. Use the play/pause button to control playback
5. Enjoy the synchronized visual experience with the generated music

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Riffusion](https://www.riffusion.com/) for the AI music generation
- [Three.js](https://threejs.org/) for 3D graphics
- [Next.js](https://nextjs.org/) for the React framework
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) for React Three.js integration
