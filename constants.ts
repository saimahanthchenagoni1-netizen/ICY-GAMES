
import { Game, Category } from './types';

export const CATEGORIES: Category[] = [
  'All', 'Action', 'Puzzle', 'Racing', 'Strategy', 'Sports', 'Adventure'
];

const ARMOR_MAYHEM_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>Armor Mayhem</title>
  <style>
    html, body { margin: 0; padding: 0; background: black; overflow: hidden; height: 100%; width: 100%; }
    #flash-container { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: black; overflow: hidden; }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/@ruffle-rs/ruffle@0.2.0-nightly.2025.10.2/ruffle.min.js"></script>
</head>
<body>
  <div id="flash-container"></div>
  <script>
    const container = document.getElementById("flash-container");
    function resizeGame() {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const aspectRatio = 5.5 / 3;
      let width = windowWidth;
      let height = Math.floor(width / aspectRatio);
      if (height > windowHeight) { height = windowHeight; width = Math.floor(height * aspectRatio); }
      container.style.width = \`\${width}px\`;
      container.style.height = \`\${height}px\`;
    }
    window.addEventListener("resize", resizeGame);
    window.addEventListener("DOMContentLoaded", () => {
      resizeGame();
      const ruffle = window.RufflePlayer?.newest() || window.RufflePlayer?.createPlayer();
      if (ruffle && container) {
        const player = ruffle.createPlayer();
        player.style.width = "100%";
        player.style.height = "100%";
        container.appendChild(player);
        player.load("https://cdn.jsdelivr.net/gh/Stinkalistic/Flash-games@main/559937_ArmorMayhem_Viral_NG_secur.swf");
      }
    });
  </script>
</body>
</html>`;

const ONE_ON_ONE_SOCCER_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>1 on 1 Soccer</title>
  <style>html, body { margin: 0; padding: 0; background: black; overflow: hidden; height: 100%; width: 100%; }</style>
  <script src="https://cdn.jsdelivr.net/npm/@ruffle-rs/ruffle@0.2.0-nightly.2025.10.2/ruffle.min.js"></script>
</head>
<body>
  <div id="flash-container" style="width:100%; height:100%"></div>
  <script>
    window.addEventListener("DOMContentLoaded", () => {
      const ruffle = window.RufflePlayer?.newest() || window.RufflePlayer?.createPlayer();
      const container = document.getElementById("flash-container");
      if (ruffle && container) {
        const player = ruffle.createPlayer();
        player.style.width = "100%"; player.style.height = "100%";
        container.appendChild(player);
        player.load("https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@4b485142cbb1f542e00dd4444b6593f3bce7fcf3/1on1soccer_24.swf");
      }
    });
  </script>
</body>
</html>`;

const ESCAPE_ROAD_HTML = `<!DOCTYPE html>
<html lang="en-us">
  <base href="https://cdn.jsdelivr.net/gh/abisdbest/classroom.google.com@45b2d69c626dc365753f6922d2c48c4075683ef5/drive.google.com/escape%20road/">
<head>
<meta charset="utf-8">
<style>html, body { margin:0; padding:0; overflow:hidden; background:#000; width:100%; height:100%; }</style>
</head>
<body>
<iframe src="https://classroom.google.com/escape%20road/" style="width:100%; height:100%; border:none;"></iframe>
</body>
</html>`;

const SNOW_RIDER_HTML = `<!DOCTYPE html>
<html>
<head><style>body { margin:0; overflow:hidden; background: #000; }</style></head>
<body>
<iframe src="https://cdn.jsdelivr.net/gh/Vrkids2009/snowrider3d@6b7c2b9167b592528b221428414e63f06c4640b9/index.html" style="width:100vw; height:100vh; border:none;"></iframe>
</body>
</html>`;

const POLY_TRACK_HTML = `<!DOCTYPE html>
<html>
<body style="margin:0; overflow:hidden; background:#000">
<iframe src="https://cdn.jsdelivr.net/gh/genizy/polytrack@main/index.html" style="width:100vw; height:100vh; border:none;"></iframe>
</body>
</html>`;

const SLOPE_HTML = `<!DOCTYPE html>
<html>
<body style="margin:0; overflow:hidden; background:#000">
<iframe src="https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/slope%203/index.html" style="width:100vw; height:100vh; border:none;"></iframe>
</body>
</html>`;

export const GAMES: Game[] = [
  {
    id: 'armor-mayhem',
    title: 'Armor Mayhem',
    category: 'Action',
    image: 'https://images.unsplash.com/photo-1620023428807-f9b5a287c8d9?q=80&w=600&h=600&auto=format&fit=crop',
    rating: 4.8,
    plays: '1M',
    description: 'A futuristic 2D platform shooter with customizable characters and intense combat missions.',
    customHtml: ARMOR_MAYHEM_HTML,
    gridSize: 'medium'
  },
  {
    id: 'one-on-one-soccer',
    title: '1 on 1 Soccer',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bde9be2e?q=80&w=600&h=600&auto=format&fit=crop',
    rating: 4.5,
    plays: '1.5M',
    description: 'A classic 1v1 soccer game. Score more goals than your opponent before time runs out!',
    customHtml: ONE_ON_ONE_SOCCER_HTML,
    gridSize: 'small'
  },
  {
    id: 'escape-road',
    title: 'Escape Road',
    category: 'Racing',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=600&h=600&auto=format&fit=crop',
    rating: 4.9,
    plays: '1M',
    description: 'Escape the police in this intense endless driving game. Drift, dodge, and survive as long as you can!',
    isNew: true,
    customHtml: ESCAPE_ROAD_HTML,
    gridSize: 'medium'
  },
  {
    id: 'football-bros',
    title: 'Football Bros',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=800&h=800&auto=format&fit=crop',
    rating: 4.8,
    plays: '8M',
    description: 'Online multiplayer football! Bone crushing hits, long bombs, and tons more!',
    isHot: true,
    url: 'https://footballbros.io/',
    gridSize: 'large'
  },
  {
    id: '1v1-lol',
    title: '1v1.LOL',
    category: 'Action',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&h=600&auto=format&fit=crop',
    rating: 4.8,
    plays: '25M',
    description: 'A competitive online third-person shooter where you build your way around the map tactically.',
    isHot: true,
    url: 'https://1v1.lol/',
    gridSize: 'medium'
  },
  {
    id: 'slope',
    title: 'Slope',
    category: 'Action',
    image: 'https://images.unsplash.com/photo-1555677284-6a6f971638e0?q=80&w=800&h=800&auto=format&fit=crop',
    rating: 4.8,
    plays: '15M',
    description: 'Control a ball rolling down a steep slope. Avoid obstacles and keep your momentum in this endless 3D runner.',
    customHtml: SLOPE_HTML,
    gridSize: 'large'
  }
];
