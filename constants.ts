
import { Game, Category } from './types';

export const CATEGORIES: Category[] = [
  'All', 'Action', 'Puzzle', 'Racing', 'Strategy', 'Sports', 'Adventure', 'Apps'
];

const MINECRAFT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Minecraft</title>
<style>
    body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background-color: #000; }
    iframe { width: 100%; height: 100%; border: none; }
</style>
</head>
<body>
<iframe src="https://g.eaglercraft.com/ap/" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</body>
</html>`;

const SNOW_RIDER_HTML = `<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Vrkids2009/snowrider3d@6b7c2b9167b592528b221428414e63f06c4640b9/TemplateData/style.css">
</head>
<body style="margin:0; overflow:hidden; background: #000;">
<script src="https://cdn.jsdelivr.net/gh/Vrkids2009/snowrider3d@6b7c2b9167b592528b221428414e63f06c4640b9/TemplateData/UnityProgress.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Vrkids2009/snowrider3d@6b7c2b9167b592528b221428414e63f06c4640b9/Build/UnityLoader.js"></script>
<script>
	var gameInstance = UnityLoader.instantiate("gameContainer", "https://cdn.jsdelivr.net/gh/Vrkids2009/snowrider3d@6b7c2b9167b592528b221428414e63f06c4640b9/Build/SnowRider3D-gd-1.json", {onProgress: UnityProgress,Module:{onRuntimeInitialized: function() {UnityProgress(gameInstance, "complete")}}}); 
</script>
<div class="webgl-content" style="width: 100vw; height: 100vh;">
	<div id="gameContainer" style="width: 100%; height: 100%; margin: auto"></div>
</div>
</body>
</html>`;

const POLY_TRACK_HTML = `<!DOCTYPE html>
<html lang="en-us">
<head>
	<base href="https://cdn.jsdelivr.net/gh/genizy/polytrack@main/">
	<script>
		window.jkdfgnjkndfg = document.querySelector('base').href;
		fetch("simulation_worker.bundle.js").then(res => res.text()).then(text => {
			const blob = new Blob([text.replaceAll("replacethisplease", window.jkdfgnjkndfg)], { type: 'application/javascript' });
			window.simulationworker = URL.createObjectURL(blob);
		});
		const ogworker = window.Worker;
		window.Worker = function (scripturl, options) {
			if (typeof scripturl === 'string' && scripturl.toLowerCase() === "simulation_worker.bundle.js") {
				scripturl = window.simulationworker;
			}
			return new ogworker(scripturl, options);
		};
		window.Worker.prototype = ogworker.prototype;

		const ogfetch = window.fetch;
		window.fetch = async function (input, init) {
			if (typeof input === "string") {
				input = input.replace("vps.kodub.com:43273", "vpskodub.tmena1565.workers.dev");
			} else if (input instanceof Request) {
				const newUrl = input.url.replace("vps.kodub.com:43273", "vpskodub.tmena1565.workers.dev");
				input = new Request(newUrl, input);
			}
			return ogfetch(input, init);
		};

		const ogxml = XMLHttpRequest.prototype.open;
		XMLHttpRequest.prototype.open = function (method, url, ...rest) {
			if (typeof url === "string") {
				url = url.replace("vps.kodub.com:43273", "vpskodub.tmena1565.workers.dev");
			}
			return ogxml.call(this, method, url, ...rest);
		};
	</script>
	<style>body { margin: 0; overflow: hidden; background: #000; } canvas { width: 100%; height: 100%; }</style>
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
</head>
<body>
	<canvas id="screen"></canvas>
	<div id="ui"></div>
	<div id="transition-layer"></div>
	<script type="module" src="main.bundle.js" defer></script>
</body>
</html>`;

const SLOPE_HTML = `<!DOCTYPE html>
<html lang="en-us">
  <head>
    <base href="https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/slope%203/">
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Slope 3</title>
    <style>
        html, body { width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden; background-color: #000; }
        .webgl-content { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; }
        #gameContainer { width: 100%; height: 100%; }
    </style>
    <script>
      window.fileMergerConfig = { files: [{ name: 'Slope3.data.unityweb', parts: 2 }], basePath: '', debug: false };
    </script>
    <script src="UnityLoader.js"></script>
    <script>
    (function() {
      'use strict';
      const config = Object.assign({files: [], basePath: '', debug: true}, window.fileMergerConfig || {});
      window.mergedFiles = window.mergedFiles || {};
      const mergeStatus = {};
      
      async function mergeSplitFiles(filePath, partsCount) {
          const parts = [];
          for (let i = 1; i <= partsCount; i++) parts.push(\`\${filePath}.part\${i}\`);
          const responses = await Promise.all(parts.map(p => fetch(p)));
          const buffers = await Promise.all(responses.map(r => r.arrayBuffer()));
          const totalLen = buffers.reduce((acc, b) => acc + b.byteLength, 0);
          const merged = new Uint8Array(totalLen);
          let offset = 0;
          for (const b of buffers) { merged.set(new Uint8Array(b), offset); offset += b.byteLength; }
          return merged.buffer;
      }

      function getMerged(name) {
        for (const [k, v] of Object.entries(window.mergedFiles)) { if (k.includes(name)) return v; }
        return null;
      }

      if (!window.originalFetch) window.originalFetch = window.fetch;
      window.fetch = function(url, ...args) {
        const name = url.toString().split('?')[0].split('/').pop();
        const b = getMerged(name);
        if (b) {
            const type = name.endsWith('.wasm') ? 'application/wasm' : 'application/octet-stream';
            return Promise.resolve(new Response(b, {status: 200, headers: {'Content-Type': type}}));
        }
        return window.originalFetch.call(this, url, ...args);
      }

      config.files.forEach(f => {
           const path = config.basePath + f.name;
           mergeSplitFiles(path, f.parts).then(b => { window.mergedFiles[f.name] = b; });
      });
    })();
    
    var gameInstance = UnityLoader.instantiate("gameContainer", "build.json");
    </script>
  </head>
<body><div class="webgl-content"><div id="gameContainer"></div></div></body>
</html>`;

const FIFA_HTML = `<!DOCTYPE html>
  <head> 
    <script>
      window.gameconfig = {
        name: "FIFA 10",
        url: "https://cdn.jsdelivr.net/gh/bubbls/ugss@8be6bff43ec227a82b1f0231b044d378efc4fb7e/FIFA%2010%20(Europe)%20(En%2CFr%2CDe%2CEs%2CIt)/FIFA%2010%20(Europe)%20(En%2CFr%2CDe%2CEs%2CIt).nds",
        core: "nds",
        min: 1,
        max: 2,
      };
    </script>
    <script>
      function mergeFiles(fileParts, cb) {
        return new Promise((resolve, reject) => {
          let buffers = [];
          function fetchPart(index) {
            if (index >= fileParts.length) {
              resolve(URL.createObjectURL(new Blob(buffers)));
              return;
            }
            fetch(fileParts[index]).then(r => r.arrayBuffer()).then(d => { buffers.push(d); fetchPart(index + 1); });
            cb(index);
          }
          fetchPart(0);
        });
      }
      function getParts(file, start, end) {
        let parts = [];
        for (let i = start; i <= end; i++) {
          parts.push(file + ".part" + String(i).padStart((end+"").length, '0'));
        }
        return parts;
      }
    </script>
    <style>body { margin: 0; background: #121212; color: white; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; } #game { width: 100%; height: 100%; }</style>
  </head>
  <body>
    <div id="game"></div>
    <script>
      var parts = getParts(window.gameconfig.url, window.gameconfig.min, window.gameconfig.max);
      Promise.all([mergeFiles(parts, () => {})]).then(([gameUrl]) => {
          EJS_player = "#game";
          EJS_core = window.gameconfig.core;
          EJS_gameName = window.gameconfig.name;
          EJS_color = "#0064ff";
          EJS_startOnLoaded = true;
          EJS_pathtodata = "https://cdn.jsdelivr.net/gh/genizy/emu@master/";
          EJS_gameUrl = gameUrl;
          var script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/gh/genizy/emu@master/loader.js";
          document.body.appendChild(script);
      });
    </script>
  </body>
</html>`;

const BTD6_HTML = `<!DOCTYPE html>
<html>
<head>
  <base href="https://cdn.jsdelivr.net/gh/genizy/google-class@latest/btd6/">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bloons TD6</title>
  <style>body { background: #000; margin: 0; overflow: hidden; } #app { width: 100vw; height: 100vh; }</style>
</head>
<body>
  <div id="app"></div>
  <script src="script.js"></script>
  <script>
    const appElement = document.getElementById('app');
    const scaffolding = new Scaffolding.Scaffolding();
    scaffolding.width = 480;
    scaffolding.height = 360;
    scaffolding.resizeMode = "preserve-ratio";
    scaffolding.setup();
    scaffolding.appendTo(appElement);
    const vm = scaffolding.vm;
    window.Scratch = { vm, renderer: vm.renderer, audioEngine: vm.runtime.audioEngine, bitmapAdapter: vm.runtime.v2BitmapAdapter, videoProvider: vm.runtime.ioDevices.video.provider };
    scaffolding.setUsername("player" + Math.floor(Math.random() * 1000));
    scaffolding.setAccentColor("#ff4c4c");
    vm.setTurboMode(false);
    vm.setFramerate(30);
    const getProjectData = () => new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response);
        xhr.responseType = 'arraybuffer';
        xhr.open('GET', "assets/project.json");
        xhr.send();
    });
    getProjectData().then(data => { scaffolding.loadProject(data); scaffolding.start(); });
  </script>
</body>
</html>`;

const BURRITO_BISON_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <style>html, body { margin: 0; padding: 0; background: black; overflow: hidden; width: 100%; height: 100%; } #flash-container { width: 100%; height: 100%; }</style>
  <script src="https://cdn.jsdelivr.net/npm/@ruffle-rs/ruffle@0.2.0-nightly.2025.10.2/ruffle.min.js"></script>
</head>
<body>
  <div id="flash-container"></div>
  <script>
    const ruffle = window.RufflePlayer?.newest();
    const player = ruffle.createPlayer();
    const container = document.getElementById("flash-container");
    player.style.width = "100%";
    player.style.height = "100%";
    container.appendChild(player);
    player.load("https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@3226fffeff224431331345e43c546bace1a5a936/Burrito_Bison.swf");
  </script>
</body>
</html>`;

const FIREBOY_WATERGIRL_HTML = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><title>Fireboy & Watergirl 3</title></head>
<body style="margin: 0px; overflow: hidden; background: #000;">
<script src="https://cdn.jsdelivr.net/gh/Edward358-AI/HTML5-games@3c35856e44aea5d93ebe781cb1af84570dd8512c/html5/fireboy-and-watergirl-3/play/bower_components/requirejs/require.js"></script>
<div id="root" style="width:100%;height:100%"></div>
<script>
 var s = document.createElement('script');
 s.src = 'https://cdn.jsdelivr.net/gh/Edward358-AI/HTML5-games@3c35856e44aea5d93ebe781cb1af84570dd8512c/html5/fireboy-and-watergirl-3/play/version.js';
 s.onload = function() { require(["https://cdn.jsdelivr.net/gh/bobydob/godotpack@eee6707129e6b8de0315fa9a296cec67aa16f6d8/side/faw3/faw3.min.js?v=" + version]); };
 document.body.appendChild(s);
</script>
</body>
</html>`;

const FREE_RIDER_HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><style>body,html{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:#000}iframe{width:100%;height:100%;border:none}</style></head><body><iframe src="https://www.freeriderhd.com/embed" allow="autoplay; fullscreen"></iframe></body></html>`;

const FOOTBALL_LEGENDS_HTML = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/app.css" /></head>
<body style="margin:0;overflow:hidden;background:#000">
<div id="content"></div>
<script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/nape.js"></script>
<script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/minjquery.js"></script>
<script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/easel.js"></script>
<script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/bluebird.js"></script>
<script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/phaserminn.js"></script>
<script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/cache.js"></script>
<script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/superstor.js"></script>
<script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/bones.js"></script>
<script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/legends.js"></script>
</body></html>`;

const BASKET_RANDOM_HTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bubbls/ruffle@1520d90d7b2994737acd8f7a633d018f63c22ca7/style.css"></head><body style="margin:0;overflow:hidden;background:#000;"><script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@1520d90d7b2994737acd8f7a633d018f63c22ca7/box2d.js"></script><script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@1520d90d7b2994737acd8f7a633d018f63c22ca7/main.js" type="module"></script></body></html>`;

const GRANNY_2_HTML = `<!DOCTYPE html><html lang="en-us"><head><meta charset="utf-8"/><style>body{margin:0;background:#000;overflow:hidden}#unity-canvas{width:100%;height:100%}</style></head><body><canvas id="unity-canvas"></canvas><script>var buildUrl="https://cdn.jsdelivr.net/gh/m-e-64-cls/5@main/Build",loaderUrl=buildUrl+"/bb0d9ecdb05db3e84da20bd14a4f84dc.loader.js";var script=document.createElement("script");script.src=loaderUrl;script.onload=()=>{createUnityInstance(document.querySelector("#unity-canvas"),{dataUrl:buildUrl+"/aa32f1e0d2d5eeacc71b89b496157322.data_part0.data",frameworkUrl:buildUrl+"/e42b2d09d8d232ecce16310ff4617586.framework.js",codeUrl:buildUrl+"/52fc98ffa6c0df3da7ee8ac3194aa7f0.wasm_part0.wasm",companyName:"Awesome",productName:"Granny VS Grandpa",productVersion:"0.1"})};document.body.appendChild(script);</script></body></html>`;

const GEOMETRY_DASH_LITE_HTML = `<!DOCTYPE html><html lang="en-US"><head><base href="https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/gdlite/"><link rel="stylesheet" href="themes/geometrydashlite.io/rs/css/home.css?v=1"><style>body{margin:0;overflow:hidden;background:#000}canvas{width:100vw;height:100vh;display:block}</style></head><body><div id="gameContainer"></div><script src="Build/UnityLoader.js"></script><script>var gameInstance=UnityLoader.instantiate("gameContainer","Build/GeometryDashLite.json");</script></body></html>`;

const ONE_V_ONE_LOL_HTML = `<!DOCTYPE html>
<html lang="en-us">
<head>
  <meta charset="utf-8">
  <title>1v1.LOL</title>
  <style>body { margin: 0; padding: 0; overflow: hidden; background-color: #000; height: 100vh; } #gameContainer { width: 100%; height: 100%; }</style>
  <script src="https://cdn.jsdelivr.net/gh/n-101-1/1@main/UnityProgress.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/n-101-1/1@main/2.7.js"></script>
</head>
<body>
  <div id="gameContainer"></div>
  <script>
    var gameInstance = UnityLoader.instantiate("gameContainer", "https://cdn.jsdelivr.net/gh/n-101-1/1@main/2.7.json", {onProgress: UnityProgress});
  </script>
</body>
</html>`;

const NINETY_NINE_BALLS_HTML = `<!DOCTYPE html>
<html>
<body style="margin:0;overflow:hidden;background:#000;">
<canvas id="canvas" width="552" height="931" style="width:100%;height:100%;"></canvas>
<script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@8ba7f083496ec787377881857d02bb2012cd7ffa/99balls.js"></script>
</body>
</html>`;

const BASEBALL_BROS_HTML = `<!DOCTYPE html>
<html lang="en">
<head><base href="https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@ae6706e5224c55594c491edfc7f5ad541e2ea02b/baseball%20bros/"><script src="./BaseballBros.js"></script><style>body{margin:0;background:#000;overflow:hidden;height:100vh}#openfl-content{width:100%;height:100%}</style></head>
<body><div id="openfl-content"></div><script>lime.embed("BaseballBros", "openfl-content", 0, 0, {parameters: {}});</script></body>
</html>`;

const GUN_MAYHEM_2_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>Gun Mayhem 2</title>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      background: black;
      overflow: hidden;
      height: 100%;
      width: 100%;
    }

    #flash-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: black;
    }

    ruffle-player {
      width: 100%;
      height: 100%;
      background: black;
      display: block;
    }
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
      const aspectRatio = 4 / 3;

      let width = Math.floor(windowWidth);
      let height = Math.floor(windowWidth / aspectRatio);

      if (height > windowHeight) {
        height = Math.floor(windowHeight);
        width = Math.floor(height * aspectRatio);
      }

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
        player.style.background = "black";
        container.appendChild(player);
        player.load("https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@4f33d4929927fdec42e3f5f079657bd0ee3edbed/gun-mayhem-2-more-ma-13824.swf");
      } else {
        container.textContent = "Ruffle failed to load."; 
      }
    });
  </script>
</body>
</html>`;

const MADALIN_CARS_HTML = `<!DOCTYPE html>
<html lang="en-us"><head><base href="https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@79091a3feb921044b3597bd32cea7357b43e2d9c/madalincarmulti/"><link rel="stylesheet" href="TemplateData/style.css"></head>
<body style="margin:0;overflow:hidden"><div id="unity-container" style="width:100%;height:100%"><canvas id="unity-canvas" style="width:100%;height:100%"></canvas></div>
<script>
  var buildUrl="Build";var loaderUrl=buildUrl+"/304bc71d77b7acd6469bb5cc0730073b.js";var config={dataUrl:buildUrl+"/97a54d9b4b7525d0f2328e0cbb512980.data",frameworkUrl:buildUrl+"/4e20d7eb8e868230cafe4baff2e177d4.js",codeUrl:buildUrl+"/03cde5b9e5b1a5b23fbab20d045d4958.wasm",streamingAssetsUrl:"StreamingAssets",companyName:"Madalin Games",productName:"Madalin Cars Multiplayer",productVersion:"2.0.0"};
  var script=document.createElement("script");script.src=loaderUrl;script.onload=()=>{createUnityInstance(document.querySelector("#unity-canvas"),config)};document.body.appendChild(script);
</script></body></html>`;

const TRUCK_SIMULATOR_HTML = `<!DOCTYPE html>
<html lang="en-us"><head><base href="https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@79091a3feb921044b3597bd32cea7357b43e2d9c/indian-truck-simulator-3d-gh-pages/"><script src="Build/UnityLoader.js"></script></head>
<body style="margin:0;overflow:hidden;width:100%;height:100%"><div id="gameContainer" style="width:100%;height:100%"></div>
<script>
fetch("Build/indian_truck_gd_2_0_1.json").then(r=>r.json()).then(c=>{c.dataUrl="Build/indian_truck_gd_2_0_1.data.unityweb";c.wasmCodeUrl="Build/indian_truck_gd_2_0_1.wasm.code.unityweb";c.wasmFrameworkUrl="Build/indian_truck_gd_2_0_1.wasm.framework.unityweb";
UnityLoader.instantiate("gameContainer", URL.createObjectURL(new Blob([JSON.stringify(c)],{type:"application/json"})));});
</script></body></html>`;

const ULTRA_KILL_HTML = `<!DOCTYPE html>
<html lang="en-us"><head><base target="_blank">
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>google.com</title>
    <style>
      html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #000;
      }
      #unity-canvas {
        position: fixed;
        top: 0; left: 0;
        width: 100vw;
        height: 100vh;
        background-color: #000;
        display: block;
      }
      #loading-screen {
        position: fixed;
        top: 0; left: 0;
        width: 100vw;
        height: 100vh;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: white;
        font-family: Arial, sans-serif;
        font-size: 18px;
        z-index: 10;
      }
      #loading-text { margin-bottom: 15px; }
      #progress-container {
        width: 40%;
        height: 10px;
        background: #222;
        border-radius: 5px;
        overflow: hidden;
      }
      #progress-bar {
        height: 100%;
        width: 0%;
        background: #09f;
        transition: width 0.2s linear;
      }
    </style>
  </head>
  <body>
    <div id="loading-screen" style="display: none;">
      <div id="loading-text">Loading...</div>
      <div id="progress-container">
        <div id="progress-bar" style="width: 100%;"></div>
      </div>
    </div>

    <canvas id="unity-canvas" width="1269" height="1033" style="cursor: default;"></canvas>

    <!-- Loader CDN -->
    <script src="https://cdn.jsdelivr.net/gh/kelsimsk/ugil@main/Build/ultrakill.loader.js"></script>

    <script>
      // 🔹 Mobil görünüm optimizasyonu
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
        document.getElementsByTagName('head')[0].appendChild(meta);
      }

      const loadingScreen = document.getElementById("loading-screen");
      const progressBar = document.getElementById("progress-bar");
      const loadingText = document.getElementById("loading-text");

      // 🔹 Parçaları CDN'den birleştirme
      async function mergeParts(baseName, totalParts, progressWeight) {
        const parts = [];
        for (let i = 0; i < totalParts; i++) {
          const url = \`https://cdn.jsdelivr.net/gh/kelsimsk/ugil@main/Build/\${baseName}.part\${i}\`;
          const res = await fetch(url);
          if (!res.ok) throw new Error(\`Part \${i} yüklenemedi: \${url}\`);
          const buf = await res.arrayBuffer();
          parts.push(buf);

          // Dosya yükleme ilerlemesi
          const percent = ((i + 1) / totalParts) * progressWeight;
          progressBar.style.width = percent + "%";
        }
        const blob = new Blob(parts, { type: "application/octet-stream" });
        return URL.createObjectURL(blob);
      }

      (async () => {
        // 🔹 Parça sayıları (örnek)
        const dataParts = 4;
        const wasmParts = 3;

        try {
          // 80% birleşme, 20% Unity load
          const dataUrl = await mergeParts("ultrakill.data.unityweb", dataParts, 40);
          const wasmUrl = await mergeParts("ultrakill.wasm.unityweb", wasmParts, 80);

          createUnityInstance(document.querySelector("#unity-canvas"), {
            dataUrl: dataUrl,
            frameworkUrl: "https://cdn.jsdelivr.net/gh/kelsimsk/ugil@main/Build/ultrakill.framework.js.unityweb",
            codeUrl: wasmUrl,
            streamingAssetsUrl: "StreamingAssets",
            companyName: "Hakita",
            productName: "ULTRAKILL WEB PORT",
            productVersion: "1.5",
          }, (progress) => {
            const percent = 80 + progress * 20;
            progressBar.style.width = percent + "%";
          }).then(() => {
            loadingScreen.style.display = "none";
          }).catch((err) => {
            loadingText.textContent = "Error loading game: " + err;
            loadingText.style.color = "red";
          });
        } catch (e) {
          loadingText.textContent = "CDN Error: " + e.message;
          loadingText.style.color = "red";
        }
      })();
    </script>
    
    <!-- Sticky Bottom Center Ad (728x90) with Smooth Slide-Out and Reappearance -->
<style>
  /* Container: Bottom center, fixed, with overflow hidden */
  #ad-container {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: min(728px, calc(100% - 20px)); /* 728px, 10px margin on mobile */
    height: 90px;
    background: rgba(0, 0, 0, 0.90);
    display: none;
    z-index: 99999;
    border-radius: 0; /* Sharp corners */
    overflow: hidden;
    box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.45);
    box-sizing: border-box;
    transition: transform 0.5s ease-in-out; /* Smooth slide-in/out animation */
  }

  /* Slide-out animation */
  #ad-container.hidden {
    transform: translate(-50%, 100%); /* Slide down out of view */
  }

  #ad-iframe {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 745px; /* Updated width */
    height: 90px; /* Updated height */
    border: 0;
    display: block;
    overflow: hidden;
    pointer-events: auto;
    box-sizing: content-box;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  #ad-iframe::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

  /* Close button with arrow */
  #close-ad {
    position: absolute;
    top: 6px;
    right: 8px;
    background: #ff4d4d;
    color: #fff;
    border: none;
    padding: 5px 9px;
    font-size: 13px;
    border-radius: 4px;
    cursor: not-allowed;
    opacity: 0.72;
    z-index: 100000;
    display: flex;
    align-items: center;
  }
  #close-ad.enabled {
    cursor: pointer;
    opacity: 1;
  }
  #close-ad::before {
    content: '↓'; /* Down arrow for bottom ad */
    margin-right: 4px;
  }

  /* Right mask for scrollbar */
  #ad-right-mask {
    position: absolute;
    top: 0;
    right: 0;
    width: 12px;
    height: 100%;
    pointer-events: none;
    background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9));
    z-index: 99999;
  }

  /* Mobile adjustments */
  @media (max-width: 440px) {
    #ad-container {
      width: calc(100% - 12px);
      left: 50%;
      transform: translateX(-50%);
      border-radius: 0; /* Sharp corners on mobile */
    }
    #ad-iframe {
      width: 728px;
    }
  }
</style>

<div id="ad-container" aria-hidden="false" role="dialog" aria-label="Advertisement" style="display: block;">
  <iframe id="ad-iframe" src="https://script.google.com/macros/s/AKfycbzNG4z_PlG6Ke_bX5wSPKK2uBRB3IY9ouVzqM1shucYhSTvsJWRmyMyZaaC2z5S3ADN/exec" width="768px" height="95px" scrolling="no" frameborder="0" sandbox="allow-scripts allow-popups allow-same-origin"></iframe>
  <button id="close-ad" disabled="">Close (1)</button>
  <div id="ad-right-mask"></div>
</div>

<script>
  (function () {
    const showDelay = 2000; // 2 seconds delay before first show
    const countdownStart = 12; // 12 seconds countdown
    const reappearDelay = 60000; // 25 seconds before reappearance
    const adContainer = document.getElementById('ad-container');
    const closeBtn = document.getElementById('close-ad');

    function showAd() {
      // Show ad with smooth slide-in
      adContainer.style.display = 'block';
      adContainer.classList.remove('hidden');
      adContainer.setAttribute('aria-hidden', 'false');

      // Start countdown
      let timeLeft = countdownStart;
      closeBtn.textContent = \`Close (\${timeLeft})\`;
      closeBtn.disabled = true;
      closeBtn.classList.remove('enabled');

      const t = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
          closeBtn.textContent = \`Close (\${timeLeft})\`;
        } else {
          clearInterval(t);
          closeBtn.disabled = false;
          closeBtn.classList.add('enabled');
          closeBtn.textContent = 'Close ↓';
        }
      }, 1000);
    }

    // Initial ad show
    setTimeout(showAd, showDelay);

    // Close with animation and schedule reappearance
    closeBtn.addEventListener('click', () => {
      if (closeBtn.disabled) return;
      adContainer.classList.add('hidden');
      adContainer.setAttribute('aria-hidden', 'true');
      // Schedule reappearance without removing or reloading iframe
      setTimeout(showAd, reappearDelay);
    });
  })();
</script>

  
<script src="blob:https://1639346118-atari-embeds.googleusercontent.com/aa1942ce-35f4-42ce-b4db-ea17456d4275"></script></body></html>`;

const FOOTBALL_BROS_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<base target="_blank">
<meta charset="utf-8">
<title>FOOTBALL BROS!</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<style>
    html,body { margin: 0; padding: 0; height: 100%; background: #000000; color: orange; width: 100%; overflow: hidden; }
    #openfl-content { background: #000000; width: 100%; height: 100%; }
</style>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/brodeliver/fb@8/FootballBros.js?th=309"></script>
</head>
<body>
  <div id="game2" style="width: 100%; height: 100%; ">
    <div id="openfl-content" style="width: 100%; height: 100%; cursor: default;"></div>
  </div>
  <script type="text/javascript">
    lime.embed ("FootballBros", "openfl-content", 0, 0, { parameters: {} });
  </script>
</body>
</html>`;

const CRASHY_ROAD_HTML = `<!DOCTYPE html>
<html lang="en-us">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/docs-g-classroommyflies/6yy66@main/style.css">
<style>
    canvas:focus { outline: none; }
    html, body { padding: 0; margin: 0; overflow: hidden; height: 100%; background: #000; }
</style>
</head>
<body class="dark">
<div id="unity-container" class="unity-desktop">
<canvas id="unity-canvas" tabindex="-1" style="width: 100%; height: 100%; cursor: default;"></canvas>
</div>
<div id="loading-cover" style="display: none;">
<div id="loading-bar">
<div id="unity-logo"><img src="https://cdn.jsdelivr.net/gh/docs-g-classroommyflies/6yy66@main/Images/logo.png"></div>
<div id="unity-progress-bar-empty" style="">
<div id="unity-progress-bar-full" style="width: 100%;"></div>
</div>
<div class="spinner" style="display: none;"></div>
</div>
</div>

<script>
    const buildUrl = "https://cdn.jsdelivr.net/gh/docs-g-classroommyflies/6yy66@main/Build";
    const loaderUrl = buildUrl + "/builds.loader.js";
    const config = {
        dataUrl: buildUrl + "/builds.data.br",
        frameworkUrl: buildUrl + "/builds.framework.js",
        codeUrl: "",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "Linted",
        productName: "CrashyRoad",
        productVersion: "1"
    };

    const container = document.querySelector("#unity-container");
    const canvas = document.querySelector("#unity-canvas");
    const loadingCover = document.querySelector("#loading-cover");
    const progressBarEmpty = document.querySelector("#unity-progress-bar-empty");
    const progressBarFull = document.querySelector("#unity-progress-bar-full");
    const spinner = document.querySelector('.spinner');

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        container.className = "unity-mobile";
        config.devicePixelRatio = 1.3;
    }

    loadingCover.style.background = "url('https://cdn.jsdelivr.net/gh/docs-g-classroommyflies/6yy66@main/Images/background.jpg') center / cover";
    loadingCover.style.display = "";

    const script = document.createElement("script");
    script.src = loaderUrl;

    const PART_PREFIX = "builds.wasm.br.part";
    const PART_COUNT = 4;

    async function loadWasmBr() {
        const parts = [];
        for (let i = 0; i < PART_COUNT; i++) {
            const url = \`\${buildUrl}/\${PART_PREFIX}\${i}\`;
            const resp = await fetch(url);
            if (!resp.ok) throw new Error(\`Part load failed: \${url}\`);
            parts.push(await resp.arrayBuffer());
        }
        const total = parts.reduce((s, p) => s + p.byteLength, 0);
        const merged = new Uint8Array(total);
        let offset = 0;
        for (const p of parts) {
            merged.set(new Uint8Array(p), offset);
            offset += p.byteLength;
        }
        const blob = new Blob([merged], { type: "application/wasm" });
        config.codeUrl = URL.createObjectURL(blob);
    }

    (async () => {
        try { await loadWasmBr(); } catch (e) { console.error(e); }
        document.body.appendChild(script);
    })();

    script.onload = () => {
        createUnityInstance(canvas, config, (progress) => {
            spinner.style.display = "none";
            progressBarEmpty.style.display = "";
            progressBarFull.style.width = \`\${100 * Math.max(progress, 0.05)}%\`;
        }).then((unityInstance) => {
            loadingCover.style.display = "none";
        }).catch((message) => {
            console.error(message);
        });
    };
</script>

<!-- Ad Code -->
<style>
  #ad-container {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: min(728px, calc(100% - 20px));
    height: 90px;
    background: rgba(0, 0, 0, 0.90);
    display: none;
    z-index: 99999;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.45);
    transition: transform 0.5s ease-in-out;
  }
  #ad-container.hidden { transform: translate(-50%, -100%); }
  #ad-iframe { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 745px; height: 90px; border: 0; overflow: hidden; }
  #close-ad { position: absolute; top: 6px; right: 8px; background: #ff4d4d; color: #fff; border: none; padding: 5px 9px; font-size: 13px; border-radius: 4px; cursor: not-allowed; opacity: 0.72; z-index: 100000; display: flex; align-items: center; }
  #close-ad.enabled { cursor: pointer; opacity: 1; }
  #ad-right-mask { position: absolute; top: 0; right: 0; width: 12px; height: 100%; pointer-events: none; background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)); z-index: 99999; }
</style>
<div id="ad-container">
  <iframe id="ad-iframe" src="https://script.google.com/macros/s/AKfycbzNG4z_PlG6Ke_bX5wSPKK2uBRB3IY9ouVzqM1shucYhSTvsJWRmyMyZaaC2z5S3ADN/exec" scrolling="no"></iframe>
  <button id="close-ad">Close</button>
  <div id="ad-right-mask"></div>
</div>
<script>
  (function () {
    const showDelay = 9000;
    const countdownStart = 12;
    const reappearDelay = 60000;
    const adContainer = document.getElementById('ad-container');
    const closeBtn = document.getElementById('close-ad');

    function showAd() {
      adContainer.style.display = 'block';
      adContainer.classList.remove('hidden');
      let timeLeft = countdownStart;
      closeBtn.textContent = \`Close (\${timeLeft})\`;
      closeBtn.disabled = true;
      closeBtn.classList.remove('enabled');

      const t = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
          closeBtn.textContent = \`Close (\${timeLeft})\`;
        } else {
          clearInterval(t);
          closeBtn.disabled = false;
          closeBtn.classList.add('enabled');
          closeBtn.textContent = 'Close ↑';
        }
      }, 1000);
    }
    setTimeout(showAd, showDelay);
    closeBtn.addEventListener('click', () => {
      if (closeBtn.disabled) return;
      adContainer.classList.add('hidden');
      setTimeout(showAd, reappearDelay);
    });
  })();
</script>
</body>
</html>`;

// Helper to generate a reliable placeholder image
const getPlaceholder = (title: string, color: string = '22d3ee') => 
    `https://placehold.co/600x450/111111/${color}?text=${encodeURIComponent(title)}&font=roboto`;

export const GAMES: Game[] = [
  {
    id: 'crashy-road',
    title: 'Crashy Road',
    category: 'Racing',
    image: getPlaceholder('Crashy Road', '4ade80'),
    rating: 4.6,
    plays: '2M',
    description: 'Drive as far as you can, avoid obstacles, and collect coins in this endless arcade racer.',
    customHtml: CRASHY_ROAD_HTML
  },
  {
    id: 'football-bros',
    title: 'Football Bros',
    category: 'Sports',
    image: getPlaceholder('Football Bros', 'fb923c'),
    rating: 4.8,
    plays: '8M',
    description: 'Online multiplayer football! Bone crushing hits, long bombs, and tons more!',
    isHot: true,
    customHtml: FOOTBALL_BROS_HTML
  },
  {
    id: 'ultrakill',
    title: 'ULTRAKILL',
    category: 'Action',
    image: getPlaceholder('ULTRAKILL', 'ef4444'),
    rating: 4.9,
    plays: '5M',
    description: 'ULTRAKILL is a fast-paced violent retro FPS combining the skill-based style scoring from character action games with unadulterated carnage.',
    isHot: true,
    customHtml: ULTRA_KILL_HTML
  },
  {
    id: 'sf-alpha-3',
    title: 'Street Fighter Alpha 3',
    category: 'Action',
    image: getPlaceholder('Street Fighter Alpha 3', 'e11d48'),
    rating: 4.9,
    plays: '12M',
    description: 'The classic arcade fighter. Select your hero and battle for supremacy in this legendary 2D fighting game.',
    isHot: true,
    romUrl: "https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@a3b0ea52357b0aa94b7acf145c52494035722022/Street%20Fighter%20Alpha%203%20(USA).zip"
  },
  {
    id: 'minecraft',
    title: 'Minecraft',
    category: 'Adventure',
    image: getPlaceholder('Minecraft', '84cc16'),
    rating: 5.0,
    plays: '100M',
    description: 'Explore infinite worlds and build everything from the simplest of homes to the grandest of castles. Play the classic Eaglercraft version.',
    isHot: true,
    customHtml: MINECRAFT_HTML
  },
  {
    id: '1v1-lol',
    title: '1v1.LOL',
    category: 'Action',
    image: getPlaceholder('1v1.LOL', '60a5fa'),
    rating: 4.8,
    plays: '25M',
    description: 'A competitive online third-person shooter where you build your way around the map tactically.',
    isHot: true,
    customHtml: ONE_V_ONE_LOL_HTML
  },
  {
    id: 'madalin-cars',
    title: 'Madalin Cars Multiplayer',
    category: 'Racing',
    image: getPlaceholder('Madalin Cars', 'f59e0b'),
    rating: 4.7,
    plays: '15M',
    description: 'Drive supercars in a massive open world. Perform stunts, drift, and race with friends online.',
    customHtml: MADALIN_CARS_HTML
  },
  {
    id: 'pokemon-emerald',
    title: 'Pokémon Emerald',
    category: 'Adventure',
    image: getPlaceholder('Pokémon Emerald', '10b981'),
    rating: 4.8,
    plays: '8.5M',
    description: 'Explore the Hoenn region, catch wild Pokémon, and become the Champion in this beloved GBA classic.',
    isHot: true,
    romUrl: "https://cdn.jsdelivr.net/gh/a456pur/seraph@81f551ca0aa8e3d6018d32d8ac5904ac9bc78f76/games/pokemonemerald/pokemonemerald.gba"
  },
  {
    id: 'baseball-bros',
    title: 'Baseball Bros',
    category: 'Sports',
    image: getPlaceholder('Baseball Bros', '38bdf8'),
    rating: 4.5,
    plays: '4M',
    description: 'Hit home runs and strike out opponents in this fun and fast-paced arcade baseball game.',
    customHtml: BASEBALL_BROS_HTML
  },
  {
    id: 'gun-mayhem-2',
    title: 'Gun Mayhem 2',
    category: 'Action',
    image: getPlaceholder('Gun Mayhem 2', 'a8a29e'),
    rating: 4.6,
    plays: '9M',
    description: 'More mayhem, more guns! Knock your opponents off the map in this chaotic platform shooter.',
    customHtml: GUN_MAYHEM_2_HTML
  },
  {
    id: '99-balls',
    title: '99 Balls',
    category: 'Puzzle',
    image: getPlaceholder('99 Balls', 'c084fc'),
    rating: 4.4,
    plays: '3.5M',
    description: 'A satisfying arcade game where you shoot balls to break numbered bricks before they reach the bottom.',
    customHtml: NINETY_NINE_BALLS_HTML
  },
  {
    id: 'truck-sim',
    title: 'Indian Truck Simulator 3D',
    category: 'Racing',
    image: getPlaceholder('Truck Sim 3D', 'd97706'),
    rating: 4.3,
    plays: '2M',
    description: 'Drive heavy cargo trucks through challenging indian terrain and deliver goods on time.',
    customHtml: TRUCK_SIMULATOR_HTML
  },
  {
    id: 'football-legends',
    title: 'Football Legends',
    category: 'Sports',
    image: getPlaceholder('Football Legends', '22c55e'),
    rating: 4.7,
    plays: '8M',
    description: 'Play solo or with a friend in this fun arcade soccer game featuring famous football legends.',
    customHtml: FOOTBALL_LEGENDS_HTML
  },
  {
    id: 'snow-rider-3d',
    title: 'Snow Rider 3D',
    category: 'Sports',
    image: getPlaceholder('Snow Rider 3D', '0ea5e9'),
    rating: 4.7,
    plays: '5M',
    description: 'Experience the thrill of riding a sleigh down a snowy mountain. Avoid obstacles and collect gifts!',
    isNew: true,
    customHtml: SNOW_RIDER_HTML
  },
  {
    id: 'poly-track',
    title: 'PolyTrack',
    category: 'Racing',
    image: getPlaceholder('PolyTrack', 'f472b6'),
    rating: 4.6,
    plays: '4.2M',
    description: 'A fast-paced low-poly racing game with a track editor. Race against time and master the curves.',
    customHtml: POLY_TRACK_HTML
  },
  {
    id: 'slope',
    title: 'Slope',
    category: 'Action',
    image: getPlaceholder('Slope', '8b5cf6'),
    rating: 4.8,
    plays: '15M',
    description: 'Control a ball rolling down a steep slope. Avoid obstacles and keep your momentum in this endless 3D runner.',
    customHtml: SLOPE_HTML
  },
  {
    id: 'fifa-10',
    title: 'FIFA 10',
    category: 'Sports',
    image: getPlaceholder('FIFA 10', '0284c7'),
    rating: 4.5,
    plays: '2M',
    description: 'Play the classic FIFA 10 (Nintendo DS version) directly in your browser. Build your dream team and compete.',
    customHtml: FIFA_HTML
  },
  {
    id: 'btd6',
    title: 'Bloons TD 6',
    category: 'Strategy',
    image: getPlaceholder('Bloons TD 6', 'facc15'),
    rating: 4.9,
    plays: '10M',
    description: 'Craft your perfect defense from a combination of awesome Monkey Towers, upgrades, Heroes, and activated abilities.',
    isHot: true,
    customHtml: BTD6_HTML
  },
  {
    id: 'burrito-bison',
    title: 'Burrito Bison',
    category: 'Action',
    image: getPlaceholder('Burrito Bison', 'a78bfa'),
    rating: 4.7,
    plays: '6M',
    description: 'Launch Burrito Bison as far as you can and smash gummy bears to gain speed!',
    customHtml: BURRITO_BISON_HTML
  },
  {
    id: 'fireboy-watergirl-3',
    title: 'Fireboy & Watergirl 3',
    category: 'Puzzle',
    image: getPlaceholder('Fireboy Watergirl', 'ef4444'),
    rating: 4.8,
    plays: '18M',
    description: 'Control Fireboy and Watergirl simultaneously to solve puzzles and overcome obstacles in the Ice Temple.',
    customHtml: FIREBOY_WATERGIRL_HTML
  },
  {
    id: 'free-rider',
    title: 'Free Rider',
    category: 'Racing',
    image: getPlaceholder('Free Rider', 'fbbf24'),
    rating: 4.6,
    plays: '9M',
    description: 'Ride your bike on user-created tracks in this classic physics-based racing game.',
    customHtml: FREE_RIDER_HTML
  },
  {
    id: 'basket-random',
    title: 'Basket Random',
    category: 'Sports',
    image: getPlaceholder('Basket Random', 'fdba74'),
    rating: 4.6,
    plays: '3M',
    description: 'Score baskets in this funny physics-based basketball game. Play solo or with a friend!',
    customHtml: BASKET_RANDOM_HTML
  },
  {
    id: 'granny-2',
    title: 'Granny VS Grandpa',
    category: 'Action',
    image: getPlaceholder('Granny VS Grandpa', '57534e'),
    rating: 4.5,
    plays: '1M',
    description: 'Survive the horror in this multiplayer version of Granny. Escape the house or hunt down survivors.',
    isNew: true,
    customHtml: GRANNY_2_HTML
  },
  {
    id: 'geometry-dash-lite',
    title: 'Geometry Dash Lite',
    category: 'Action',
    image: getPlaceholder('Geometry Dash', 'eab308'),
    rating: 4.8,
    plays: '20M',
    description: 'Jump and fly your way through danger in this rhythm-based action platformer!',
    customHtml: GEOMETRY_DASH_LITE_HTML
  },
  {
    id: 'geforce-now',
    title: 'Nvidia GeForce Now',
    category: 'Apps',
    image: getPlaceholder('GeForce Now', '76b900'),
    rating: 4.9,
    plays: '100M',
    description: 'Play PC games on any device with the power of the cloud. (Note: May require login)',
    url: 'https://play.geforcenow.com'
  },
  {
    id: 'discord',
    title: 'Discord',
    category: 'Apps',
    image: getPlaceholder('Discord', '5865f2'),
    rating: 4.8,
    plays: '500M',
    description: 'Chat, hang out, and stay close with your friends and communities.',
    url: 'https://discord.com/app'
  },
  {
    id: 'spotify',
    title: 'Spotify',
    category: 'Apps',
    image: getPlaceholder('Spotify', '1db954'),
    rating: 4.9,
    plays: '1B',
    description: 'Web player for Spotify. Listen to your favorite music and podcasts.',
    url: 'https://open.spotify.com'
  },
  {
    id: 'duckduckgo',
    title: 'DuckDuckGo',
    category: 'Apps',
    image: getPlaceholder('DuckDuckGo', 'de5833'),
    rating: 4.7,
    plays: '50M',
    description: 'Browse the web privately. Search without being tracked.',
    url: 'https://duckduckgo.com'
  }
];
