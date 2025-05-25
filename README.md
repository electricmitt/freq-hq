# FREQ. - Mood-Based Music and Visual Experience

FREQ. is an interactive web application that generates music and visual experiences based on your mood. It uses Riffusion for AI-powered music generation and Three.js for dynamic particle visualizations.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- A Riffusion API token (get it from [Replicate](https://replicate.com))

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd freq-hq
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Riffusion API token:
```
RIFFUSION_API_TOKEN=your_api_token_here
```

## Running the Application

1. Start the server:
```bash
node server.js
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

3. Follow the mood selection process:
   - Select your current mood
   - Choose your target mood
   - Experience the generated music and visuals

## Features

- **Mood-Based Music Generation**: Uses Riffusion AI to generate music that matches your mood
- **Dynamic Visual Experience**: Interactive particle system that responds to the music
- **Smooth Transitions**: Seamless transitions between different mood states
- **Audio Controls**: Play/pause and volume control for the generated music

## Technical Details

- **Frontend**: HTML5, CSS3, JavaScript
- **3D Visualization**: Three.js
- **Music Generation**: Riffusion API
- **Server**: Node.js with Express

## Troubleshooting

If you encounter any issues:

1. **Music Not Playing**:
   - Ensure your Riffusion API token is correctly set in the `.env` file
   - Check that you have set up billing on your Replicate account
   - Make sure you've clicked on the page to enable audio (browser requirement)

2. **Visuals Not Showing**:
   - Check your browser console for any errors
   - Ensure your browser supports WebGL
   - Try refreshing the page

3. **Server Issues**:
   - Verify that port 3000 is not in use
   - Check that all dependencies are installed
   - Ensure Node.js is properly installed

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
