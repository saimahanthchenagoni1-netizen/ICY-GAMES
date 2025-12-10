
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
      overflow: hidden;
    }
    .black-box {
      position: fixed;
      background: black;
      z-index: 10;
    }
    #box-top {
      top: 0;
      left: 0;
      width: 100%;
      height: 0;
    }
    #box-bottom {
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0;
    }
    #box-left {
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
    }
    #box-right {
      top: 0;
      right: 0;
      width: 0;
      height: 100%;
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
  <div class="black-box" id="box-top"></div>
  <div class="black-box" id="box-bottom"></div>
  <div class="black-box" id="box-left"></div>
  <div class="black-box" id="box-right"></div>
  <script>
    const container = document.getElementById("flash-container");
    const boxTop = document.getElementById("box-top");
    const boxBottom = document.getElementById("box-bottom");
    const boxLeft = document.getElementById("box-left");
    const boxRight = document.getElementById("box-right");
    
    function resizeGame() {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const aspectRatio = 5.5 / 3;
      
      // Use 95% of available space instead of 100%
      let width = Math.floor(windowWidth * 1);
      let height = Math.floor(width / aspectRatio);
      
      if (height > windowHeight * 1) {
        height = Math.floor(windowHeight * 1);
        width = Math.floor(height * aspectRatio);
      }
      
      container.style.width = \`\${width}px\`;
      container.style.height = \`\${height}px\`;
      
      // Calculate margins
      const topMargin = (windowHeight - height) / 2;
      const leftMargin = (windowWidth - width) / 2;
      
      // Set black box sizes
      boxTop.style.height = \`\${topMargin}px\`;
      boxBottom.style.height = \`\${topMargin}px\`;
      boxLeft.style.width = \`\${leftMargin}px\`;
      boxRight.style.width = \`\${leftMargin}px\`;
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
        player.load("https://cdn.jsdelivr.net/gh/Stinkalistic/Flash-games@main/559937_ArmorMayhem_Viral_NG_secur.swf");
      } else {
        container.textContent = "Ruffle failed to load."; 
      }
    });
  </script>
</body>
</html>`;

const ONE_ON_ONE_SOCCER_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>1 on 1 Soccer</title>
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
      overflow: hidden;
    }
    .black-box {
      position: fixed;
      background: black;
      z-index: 10;
    }
    #box-top {
      top: 0;
      left: 0;
      width: 100%;
      height: 0;
    }
    #box-bottom {
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0;
    }
    #box-left {
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
    }
    #box-right {
      top: 0;
      right: 0;
      width: 0;
      height: 100%;
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
  <div class="black-box" id="box-top"></div>
  <div class="black-box" id="box-bottom"></div>
  <div class="black-box" id="box-left"></div>
  <div class="black-box" id="box-right"></div>
  <script>
    const container = document.getElementById("flash-container");
    const boxTop = document.getElementById("box-top");
    const boxBottom = document.getElementById("box-bottom");
    const boxLeft = document.getElementById("box-left");
    const boxRight = document.getElementById("box-right");
    
    function resizeGame() {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const aspectRatio = 5.5 / 3;
      
      // Use 95% of available space instead of 100%
      let width = Math.floor(windowWidth * 1);
      let height = Math.floor(width / aspectRatio);
      
      if (height > windowHeight * 1) {
        height = Math.floor(windowHeight * 1);
        width = Math.floor(height * aspectRatio);
      }
      
      container.style.width = \`\${width}px\`;
      container.style.height = \`\${height}px\`;
      
      // Calculate margins
      const topMargin = (windowHeight - height) / 2;
      const leftMargin = (windowWidth - width) / 2;
      
      // Set black box sizes
      boxTop.style.height = \`\${topMargin}px\`;
      boxBottom.style.height = \`\${topMargin}px\`;
      boxLeft.style.width = \`\${leftMargin}px\`;
      boxRight.style.width = \`\${leftMargin}px\`;
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
        player.load("https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@4b485142cbb1f542e00dd4444b6593f3bce7fcf3/1on1soccer_24.swf");
      } else {
        container.textContent = "Ruffle failed to load."; 
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
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<title>Escape Road</title>
<link rel="shortcut icon" href="icon.png">
<link rel="stylesheet" href="TemplateData/style.css">
<script src="https://cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init()</script>
</head>
<style>
  @font-face {
  font-family: myFirstFont;
  src: url(Chainwhacks.otf);
  }
  #logo-canvas, body
  {
    font-family: myFirstFont;
  }
</style>
<body class="dark">
<div id="unity-container" class="unity-desktop"><p style="opacity: 0;position: absolute;">_</p>
<canvas id="unity-canvas"></canvas>
</div>
<div id="loading-cover" style="display:none;background: black;">
<div id="unity-loading-bar">
<canvas id="logo-canvas" style="position: absolute; background-color: black;">
<img src="loading.png" id="ld_bg">
<img src="car-icon.png" id="ld_car">
</canvas>
</div>
</div>
<img id="azlogo" class="az" src="az_logo.png">
<script type="text/javascript">
    const container = document.querySelector("#unity-container");
    const canvas = document.querySelector("#unity-canvas");
    const loadingCover = document.querySelector("#loading-cover");
    const fullscreenButton = document.querySelector("#unity-fullscreen-button");

    const buildUrl = "TemplateData";
    const loaderUrl = buildUrl + "/loader.js";
    const config = {
      dataUrl: buildUrl + "/data.unityweb",
      frameworkUrl: buildUrl + "/framework.js.unityweb",
      codeUrl: buildUrl + "/wasm.unityweb",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "1games.io",
      productName: "Escape Road",
      productVersion: "2.0",
    };
    
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      container.className = "unity-mobile";
      config.devicePixelRatio = 1;
    }
    
    function delay(ms) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, ms);
      });
    }
    async function load() {
      var az_logo = document.getElementById('azlogo');
      az_logo.style.opacity = 0;
      logo_loaded = true;
      az_logo.style.display = 'none';
      logo_loaded = false;
      
      createUnityInstance(canvas, config, (progress) => {
        logo_loading_percent = progress;
        drawCanvas(progress);
      }).then((unityInstance) => {
        window.unityInstance = unityInstance;
        setTimeout(() => {
          loadingCover.style.display = "none";
          logo_loaded = true;
          window.focus();
        }, 2000);
      }).catch((message) => {
        alert(message);
      });
    }

    loadingCover.style.display = "";

    var script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      load();
    };

    var logo_loaded = false;
    var logo_loading_percent = 0;

    window.onresize = () => {
      drawCanvas(logo_loading_percent);
    }
    window.onload = () => {
      drawCanvas(logo_loading_percent);
    }

    var logo_canvas = document.getElementById("logo-canvas");
    function drawCanvas(_percent = 0) {
      if (logo_loaded) {
        return;
      }
      resizeLogoCanvas();
      var ctx = logo_canvas.getContext("2d");
      var ld_bg = document.getElementById("ld_bg");
      var ld_car = document.getElementById("ld_car");

      var _sw = logo_canvas.width / 1920;
      var _sh = logo_canvas.height / 1080;

      if (_percent > 1) {
        _percent = 1;
      }

      var bgbar_H = 86;
      var bgbar_W = 1383;
      var fillbar_H = 55;
      var fillbar_W = 1345;
      var maskbar_H = 55;
      var maskbar_W = 1350;
      var bgbar_mask_H = 86;
      var bgbar_mask_W = 1383;

      var posshowbar_Y = 200; 

      var posbgbar_X = (1920 - bgbar_W) / 2;
      var posbgbar_Y = posshowbar_Y;

      var posfillbar_X = (1920 - fillbar_W) / 2;
      var posfillbar_Y = posshowbar_Y - 15;

      var posmaskbar_X = (1920 - maskbar_W) / 2;
      var posmaskbar_Y = posshowbar_Y - 15;

      var _fl = 0;
      var _fl1 = posmaskbar_X + _percent * maskbar_W;

      var _fw = maskbar_W - _percent * maskbar_W;

      if (ld_bg) ctx.drawImage(ld_bg, 0, 0, logo_canvas.width, logo_canvas.height);

      ctx.fillStyle = "#977e21";
      var _lw = 700;
      var _lh = 50;
      ctx.fillRect((1920 - _lw) * 0.5 * _sw, (1080 - 150) * _sh, _lw * _sw, _lh * _sh);

      ctx.fillStyle = "#fad234";
      var _pad = 5;
      var _pw = (_lw - _pad * 2);
      var _ph = _lh - _pad * 2;
      var _px = (1920 - _pw) * 0.5;
      ctx.fillRect(_px * _sw, (1080 - 150 + _pad) * _sh, _pw * _percent * _sw, _ph * _sh);

      var _car_x = _px + _pw * _percent - 100;
      if (_car_x < _px) {
        _car_x = _px;
      }

      ctx.font = "18px myFirstFont";
      const match = /(?<value>\\d+\\.?\\d*)/;
      const setFontSize = (size) => ctx.font = ctx.font.replace(match, size);
      setFontSize(35 * _sh);
      ctx.textAlign = "center";
      ctx.fillStyle = "#fff";
      ctx.shadowColor = "black";
      ctx.shadowOffsetY = 2;
      var new_per = parseInt(_percent * 100);
      ctx.fillText("" + new_per + "%", logo_canvas.width / 2, logo_canvas.height / 2 + _sh * 425);
    }
    function resizeLogoCanvas() {
      var _w = window.innerWidth;
      var _h = window.innerHeight;
      var _nw = _h * 16 / 9;
      if (_nw <= _w) {
        logo_canvas.width = _nw;
        logo_canvas.height = _h;
      }
      else {
        logo_canvas.width = _w;
        logo_canvas.height = _w * 9 / 16;
      }

    }

    document.body.appendChild(script);
  </script>
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
    id: 'crashy-road',
    title: 'Crashy Road',
    category: 'Racing',
    image: 'https://images.unsplash.com/photo-1596727147705-56a537e6d234?q=80&w=600&h=600&auto=format&fit=crop',
    rating: 4.6,
    plays: '2M',
    description: 'Drive as far as you can, avoid obstacles, and collect coins in this endless arcade racer.',
    customHtml: CRASHY_ROAD_HTML,
    gridSize: 'small'
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
    customHtml: FOOTBALL_BROS_HTML,
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
    customHtml: ONE_V_ONE_LOL_HTML,
    gridSize: 'medium'
  },
  {
    id: 'madalin-cars',
    title: 'Madalin Cars Multiplayer',
    category: 'Racing',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&h=600&auto=format&fit=crop',
    rating: 4.7,
    plays: '15M',
    description: 'Drive supercars in a massive open world. Perform stunts, drift, and race with friends online.',
    customHtml: MADALIN_CARS_HTML,
    gridSize: 'wide'
  },
  {
    id: 'baseball-bros',
    title: 'Baseball Bros',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1516731537599-733367a683a3?q=80&w=600&h=600&auto=format&fit=crop',
    rating: 4.5,
    plays: '4M',
    description: 'Hit home runs and strike out opponents in this fun and fast-paced arcade baseball game.',
    customHtml: BASEBALL_BROS_HTML,
    gridSize: 'small'
  },
  {
    id: '99-balls',
    title: '99 Balls',
    category: 'Puzzle',
    image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=600&h=600&auto=format&fit=crop',
    rating: 4.4,
    plays: '3.5M',
    description: 'A satisfying arcade game where you shoot balls to break numbered bricks before they reach the bottom.',
    customHtml: NINETY_NINE_BALLS_HTML,
    gridSize: 'small'
  },
  {
    id: 'truck-sim',
    title: 'Indian Truck Simulator 3D',
    category: 'Racing',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=600&h=600&auto=format&fit=crop',
    rating: 4.3,
    plays: '2M',
    description: 'Drive heavy cargo trucks through challenging indian terrain and deliver goods on time.',
    customHtml: TRUCK_SIMULATOR_HTML,
    gridSize: 'medium'
  },
  {
    id: 'football-legends',
    title: 'Football Legends',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&h=600&auto=format&fit=crop',
    rating: 4.7,
    plays: '8M',
    description: 'Play solo or with a friend in this fun arcade soccer game featuring famous football legends.',
    customHtml: FOOTBALL_LEGENDS_HTML,
    gridSize: 'medium'
  },
  {
    id: 'snow-rider-3d',
    title: 'Snow Rider 3D',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1517176516623-c51b0f91a1a8?q=80&w=1200&h=600&auto=format&fit=crop',
    rating: 4.7,
    plays: '5M',
    description: 'Experience the thrill of riding a sleigh down a snowy mountain. Avoid obstacles and collect gifts!',
    isNew: true,
    customHtml: SNOW_RIDER_HTML,
    gridSize: 'wide'
  },
  {
    id: 'poly-track',
    title: 'PolyTrack',
    category: 'Racing',
    image: 'https://images.unsplash.com/photo-1552345391-7486d3455b51?q=80&w=600&h=600&auto=format&fit=crop',
    rating: 4.6,
    plays: '4.2M',
    description: 'A fast-paced low-poly racing game with a track editor. Race against time and master the curves.',
    customHtml: POLY_TRACK_HTML,
    gridSize: 'small'
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
  },
  {
    id: 'btd6',
    title: 'Bloons TD 6',
    category: 'Strategy',
    image: 'https://images.unsplash.com/photo-1570284613060-766c33850e00?q=80&w=600&h=600&auto=format&fit=crop',
    rating: 4.9,
    plays: '10M',
    description: 'Craft your perfect defense from a combination of awesome Monkey Towers, upgrades, Heroes, and activated abilities.',
    isHot: true,
    customHtml: BTD6_HTML,
    gridSize: 'medium'
  },
  {
    id: 'burrito-bison',
    title: 'Burrito Bison',
    category: 'Action',
    image: 'https://images.unsplash.com/photo-1628151016004-e39563ea9b78?q=80&w=600&h=600&auto=format&fit=crop',
    rating: 4.7,
    plays: '6M',
    description: 'Launch Burrito Bison as far as you can and smash gummy bears to gain speed!',
    customHtml: BURRITO_BISON_HTML,
    gridSize: 'small'
  },
  {
    id: 'fireboy-watergirl-3',
    title: 'Fireboy & Watergirl 3',
    category: 'Puzzle',
    image: 'https://images.unsplash.com/photo-1627856014759-2a01d4733b0f?q=80&w=600&h=600&auto=format&fit=crop',
    rating: 4.8,
    plays: '18M',
    description: 'Control Fireboy and Watergirl simultaneously to solve puzzles and overcome obstacles in the Ice Temple.',
    customHtml: FIREBOY_WATERGIRL_HTML,
    gridSize: 'medium'
  },
  {
    id: 'free-rider',
    title: 'Free Rider',
    category: 'Racing',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&h=600&auto=format&fit=crop',
    rating: 4.6,
    plays: '9M',
    description: 'Ride your bike on user-created tracks in this classic physics-based racing game.',
    customHtml: FREE_RIDER_HTML,
    gridSize: 'small'
  },
  {
    id: 'basket-random',
    title: 'Basket Random',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ad0?q=80&w=600&h=600&auto=format&fit=crop',
    rating: 4.6,
    plays: '3M',
    description: 'Score baskets in this funny physics-based basketball game. Play solo or with a friend!',
    customHtml: BASKET_RANDOM_HTML,
    gridSize: 'small'
  },
  {
    id: 'geometry-dash-lite',
    title: 'Geometry Dash Lite',
    category: 'Action',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&h=600&auto=format&fit=crop',
    rating: 4.8,
    plays: '20M',
    description: 'Jump and fly your way through danger in this rhythm-based action platformer!',
    customHtml: GEOMETRY_DASH_LITE_HTML,
    gridSize: 'medium'
  }
];
