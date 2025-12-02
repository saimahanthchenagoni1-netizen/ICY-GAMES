import { Game, Category } from './types';

export const CATEGORIES: Category[] = [
  'All', 'Action', 'Puzzle', 'Racing', 'Strategy', 'Sports', 'Adventure'
];

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
        html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: #000;
        }
        .webgl-content {
            width: 100% !important;
            height: 100% !important;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        #gameContainer {
            width: 100% !important;
            height: 100% !important;
            flex-grow: 1;
        }
        .footer {
            height: 5%;
            width: 100%;
            display: none; 
        }
    </style>
    <script>
      window.fileMergerConfig = {
        files: [
          { name: 'Slope3.data.unityweb', parts: 2 } 
        ],
        basePath: '', 
        debug: true
      };
    </script>
    <script>
    (function() {
      'use strict';
      const config = Object.assign({files: [], basePath: '', debug: true}, window.fileMergerConfig || {});
      window.mergedFiles = window.mergedFiles || {};
      const mergeStatus = {};

      function log(...args) { if (config.debug) console.log('[FileMerger]', ...args); }
      function error(...args) { console.error('[FileMerger]', ...args); }
      function normalizeUrl(url) { try { return decodeURIComponent(url.toString().split('?')[0]); } catch (e) { return url; } }
      function urlsMatch(url1, url2) {
        const n1 = normalizeUrl(url1), n2 = normalizeUrl(url2);
        const name1 = n1.split('/').pop().split('?')[0];
        const name2 = n2.split('/').pop().split('?')[0];

        for (const f of config.files) {
            if (name1.startsWith(f.name) && name1.length >= f.name.length) return f.name;
            if (name2.startsWith(f.name) && name2.length >= f.name.length) return f.name;
        }

        return null;
      }

      async function mergeSplitFiles(filePath, partsCount) {
        try {
          const parts = [];
          for (let i = 1; i <= partsCount; i++) parts.push(\`\${filePath}.part\${i}\`);
          log(\`Merging \${filePath} from \${partsCount} parts...\`);
          const responses = await Promise.all(parts.map(p => window.originalFetch(p)));
          for (const r of responses) if (!r.ok) throw new Error(\`Part missing: \${r.url} (\${r.status})\`);
          const buffers = await Promise.all(responses.map(r => r.arrayBuffer()));
          const totalLen = buffers.reduce((acc, b) => acc + b.byteLength, 0);
          const merged = new Uint8Array(totalLen);
          let offset = 0;
          for (const b of buffers) { merged.set(new Uint8Array(b), offset); offset += b.byteLength; }
          log(\`✅ Merged: \${filePath} (\${(totalLen/1024/1024).toFixed(2)} MB)\`);
          return merged.buffer;
        } catch (e) { error(e); throw e; }
      }

      function shouldIntercept(url) {
        const s = normalizeUrl(url);
        if (s.includes('.part')) return null;

        const matchedName = urlsMatch(s, s);
        if (matchedName) return matchedName;
        
        return null;
      }

      function getMerged(name) {
        if (window.mergedFiles[name]) return window.mergedFiles[name];
        for (const [k, v] of Object.entries(window.mergedFiles)) {
             if (k.startsWith(name)) return v;
        }
        return null;
      }

      if (!window.originalFetch) window.originalFetch = window.fetch;
      window.fetch = function(url, ...args) {
        const name = shouldIntercept(url);
        if (name) {
          log('Intercepting fetch:', name);
          return new Promise((resolve, reject) => {
            const t = setInterval(() => {
              const b = getMerged(name);
              if (b) {
                clearInterval(t);
                const type = name.endsWith('.wasm') ? 'application/wasm' : 'application/octet-stream';
                resolve(new Response(b, {status: 200, headers: {'Content-Type': type}}));
              }
              else if (mergeStatus[name] === 'failed') { clearInterval(t); reject(new Error('Merge failed')); }
            }, 50);
          });
        }
        return window.originalFetch.call(this, url, ...args);
      }

      if (!window.OriginalXMLHttpRequest) window.OriginalXMLHttpRequest = window.XMLHttpRequest;
      window.XMLHttpRequest = function(opts) {
        const xhr = new window.OriginalXMLHttpRequest(opts);
        const open = xhr.open;
        xhr.open = function(m, u, ...a) { this._url = u; return open.call(this, m, u, ...a); };
        xhr.send = function(...a) {
          const name = shouldIntercept(this._url);
          if (name) {
            log('Intercepting XHR:', name);
            const t = setInterval(() => {
              const b = getMerged(name);
              if (b) {
                clearInterval(t);
                Object.defineProperties(xhr, { status: {value: 200}, response: {value: b}, readyState: {value: 4} });
                if (xhr.onload) xhr.onload({type: 'load', target: xhr});
              }
            }, 50);
            return;
          }
          return window.OriginalXMLHttpRequest.prototype.send.apply(this, a);
        }
        return xhr;
      }

      async function start() {
        config.files.forEach(f => {
           const path = config.basePath + f.name;
           mergeStatus[f.name] = 'merging';
           mergeSplitFiles(path, f.parts).then(b => {
             window.mergedFiles[f.name] = b; 
             window.mergedFiles[path] = b;
             mergeStatus[f.name] = 'ready';
           }).catch(() => mergeStatus[f.name] = 'failed');
        });
      }
      start();
    })();
    </script>
    <script src="UnityLoader.js"></script>
    <script src="UnityProgress.js"></script>
    <script>
        var gameInstance = UnityLoader.instantiate("gameContainer", "build.json", {
            onProgress: UnityProgress,
            Module: {
                onRuntimeInitialized: function() {
                    UnityProgress(gameInstance, "complete")
                }
            }
        });
    </script>
  </head>
<body>
    <div class="webgl-content">
        <div id="gameContainer" style="width: 100%; height: 95%; margin: auto;"></div>
    </div>
</body>
</html>`;

const FIFA_HTML = `<!DOCTYPE html>
<!-- Ultimate Game Stash file--> 
<!-- For the regularly updating doc go to https://docs.google.com/document/d/1_FmH3BlSBQI7FGgAQL59-ZPe8eCxs35wel6JUyVaG8Q/ -->
  <head> 
    <script>
      window.gameconfig = {
        name: "FIFA 10 (Europe) (En,Fr,De,Es,It)",
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
              let mergedBlob = new Blob(buffers);
              let mergedFileUrl = URL.createObjectURL(mergedBlob);
              resolve(mergedFileUrl);
              return;
            }
            fetch(fileParts[index])
              .then((response) => response.arrayBuffer())
              .then((data) => {
                buffers.push(data);
                fetchPart(index + 1);
              })
              .catch(reject);
            cb(index);
          }
          fetchPart(0);
        });
      }
      function getParts(file, start, end) {
        let parts = [];
        for (let i = start; i <= end; i++) {
          let padded = String(i).padStart((end+"").length, '0');
          parts.push(file + ".part" + padded);
        }
        return parts;
      }
    </script>
    <style>
      body,
      html {
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: #121212;
        color: white;
        font-family: Arial, sans-serif;
      }
      #game-container {
        text-align: center;
        width: 100%;
        height: 100%;
      }
      #loading-progress {
        font-size: 18px;
        margin-top: 20px;
        padding: 10px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        display: inline-block;
      }
    </style>
  </head>
  <body>
    <div id="game-container">
      <div id="game"></div>
      <div id="loading-progress">Loading: 0/0</div>
      <div id="first-time">First-time loading may take longer...</div>
    </div>
    <script>
      var parts = getParts(
        window.gameconfig.url,
        window.gameconfig.min,
        window.gameconfig.max
      );
      var totalParts = parts.length;

      function updateLoadingProgress(loaded) {
        const progressElement = document.getElementById("loading-progress");
        if (loaded === 0) {
          progressElement.textContent = "Loading: 0/0";
        } else {
          progressElement.textContent = \`Loading: \${loaded}/\${totalParts}\`;
        }
      }

      Promise.all([mergeFiles(parts, updateLoadingProgress)])
        .then(([gameUrl]) => {
          document.getElementById("loading-progress").remove();
          document.getElementById("first-time").remove();
          EJS_player = "#game";
          EJS_core = window.gameconfig.core;
          EJS_gameName = window.gameconfig.name;
          EJS_color = "#0064ff";
          EJS_startOnLoaded = true;
          EJS_pathtodata = "https://cdn.jsdelivr.net/gh/genizy/emu@master/";
          EJS_gameUrl = gameUrl;
          const script = document.createElement("script");
          script.src =
            "https://cdn.jsdelivr.net/gh/genizy/emu@master/loader.js";
          document.body.appendChild(script);
        })
        .catch((error) => {
          console.error(error);
          document.getElementById("loading-progress").textContent =
            "Error loading game.";
        });
    </script>
  </body>
</html>`;

const BTD6_HTML = `<!DOCTYPE html>
<!-- Created with https://packager.turbowarp.org/ -->
<html>
<head>
  <base href="https://cdn.jsdelivr.net/gh/genizy/google-class@latest/btd6/">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta http-equiv="Content-Security-Policy" content="default-src * 'self' 'unsafe-inline' 'unsafe-eval' data: blob:">
  <title>Bloons TD6</title>
  <style>
    body {
      color: #ffffff;
      font-family: sans-serif;
      overflow: hidden;
      margin: 0;
      padding: 0;
    }
    :root, body.is-fullscreen {
      background-color: #000000;
    }
    [hidden] {
      display: none !important;
    }
    h1 {
      font-weight: normal;
    }
    a {
      color: inherit;
      text-decoration: underline;
      cursor: pointer;
    }

    #app, #loading, #error, #launch {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .screen {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      cursor: default;
      user-select: none;
      -webkit-user-select: none;
      background-color: #000000;
    }
    #launch {
      background-color: rgba(0, 0, 0, 0.7);
      cursor: pointer;
    }
    .green-flag {
      width: 80px;
      height: 80px;
      padding: 16px;
      border-radius: 100%;
      background: rgba(255, 255, 255, 0.75);
      border: 3px solid hsla(0, 100%, 100%, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
    }
    #loading {
      
    }
    .progress-bar-outer {
      border: 1px solid currentColor;
      height: 10px;
      width: 200px;
      max-width: 200px;
    }
    .progress-bar-inner {
      height: 100%;
      width: 0;
      background-color: currentColor;
    }
    .loading-text, noscript {
      font-weight: normal;
      font-size: 36px;
      margin: 0 0 16px;
    }
    .loading-image {
      margin: 0 0 16px;
    }
    #error-message, #error-stack {
      font-family: monospace;
      max-width: 600px;
      white-space: pre-wrap;
      user-select: text;
      -webkit-user-select: text;
    }
    #error-stack {
      text-align: left;
      max-height: 200px;
      overflow: auto;
    }
    .control-button {
      width: 2rem;
      height: 2rem;
      padding: 0.375rem;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      user-select: none;
      -webkit-user-select: none;
      cursor: pointer;
      border: 0;
      border-radius: 4px;
    }
    .control-button-highlight:hover {
      background: #ff4c4c26;
    }
    .control-button-highlight.active {
      background: #ff4c4c59;
    }
    .fullscreen-button {
      background: white;
    }
    .standalone-fullscreen-button {
      position: absolute;
      top: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 0 0 0 4px;
      padding: 4px;
      cursor: pointer;
    }
    .sc-canvas {
      cursor: auto;
    }
    .sc-monitor-root[data-opcode^="data_"] .sc-monitor-value-color {
      background-color: #ff8c1a;
    }
    .sc-monitor-row-value-outer {
      background-color: #fc662c;
    }
    .sc-monitor-row-value-editing .sc-monitor-row-value-outer {
      background-color: #e25b27;
    }
    
  </style>
  <meta name="theme-color" content="#000000">
  
</head>
<body>
  <div id="app"></div>

  <div id="launch" class="screen" hidden title="Click to start">
    <div class="green-flag">
      <svg viewBox="0 0 16.63 17.5" width="42" height="44">
        <defs><style>.cls-1,.cls-2{fill:#4cbf56;stroke:#45993d;stroke-linecap:round;stroke-linejoin:round;}.cls-2{stroke-width:1.5px;}</style></defs>
        <path class="cls-1" d="M.75,2A6.44,6.44,0,0,1,8.44,2h0a6.44,6.44,0,0,0,7.69,0V12.4a6.44,6.44,0,0,1-7.69,0h0a6.44,6.44,0,0,0-7.69,0"/>
        <line class="cls-2" x1="0.75" y1="16.75" x2="0.75" y2="0.75"/>
      </svg>
    </div>
  </div>

  <div id="loading" class="screen">
    <noscript>Enable JavaScript</noscript>
    
    
    <div class="progress-bar-outer"><div class="progress-bar-inner" id="loading-inner"></div></div>
  </div>

  <div id="error" class="screen" hidden>
    <h1>Error</h1>
    <details>
      <summary id="error-message"></summary>
      <p id="error-stack"></p>
    </details>
  </div>

  <script src="script.js"></script>
  <script>
    const appElement = document.getElementById('app');
    const launchScreen = document.getElementById('launch');
    const loadingScreen = document.getElementById('loading');
    const loadingInner = document.getElementById('loading-inner');
    const errorScreen = document.getElementById('error');
    const errorScreenMessage = document.getElementById('error-message');
    const errorScreenStack = document.getElementById('error-stack');

    const handleError = (error) => {
      console.error(error);
      if (!errorScreen.hidden) return;
      errorScreen.hidden = false;
      errorScreenMessage.textContent = '' + error;
      let debug = error && error.stack || 'no stack';
      debug += '\\nUser agent: ' + navigator.userAgent;
      errorScreenStack.textContent = debug;
    };
    const setProgress = (progress) => {
      if (loadingInner) loadingInner.style.width = progress * 100 + '%';
    };
    const interpolate = (a, b, t) => a + t * (b - a);

    try {
      setProgress(0.1);

      const scaffolding = new Scaffolding.Scaffolding();
      scaffolding.width = 480;
      scaffolding.height = 360;
      scaffolding.resizeMode = "preserve-ratio";
      scaffolding.editableLists = false;
      scaffolding.usePackagedRuntime = true;
      scaffolding.setup();
      scaffolding.appendTo(appElement);

      const vm = scaffolding.vm;
      window.scaffolding = scaffolding;
      window.vm = scaffolding.vm;
      window.Scratch = {
        vm,
        renderer: vm.renderer,
        audioEngine: vm.runtime.audioEngine,
        bitmapAdapter: vm.runtime.v2BitmapAdapter,
        videoProvider: vm.runtime.ioDevices.video.provider
      };

      scaffolding.setUsername("player####".replace(/#/g, () => Math.floor(Math.random() * 10)));
      scaffolding.setAccentColor("#ff4c4c");

      try {
        scaffolding.addCloudProvider(new Scaffolding.Cloud.WebSocketProvider(["wss://clouddata.turbowarp.org","wss://clouddata.turbowarp.xyz"], "p4-@project.sb3"));
      } catch (error) {
        console.error(error);
      }

      vm.setTurboMode(false);
      if (vm.setInterpolation) vm.setInterpolation(false);
      if (vm.setFramerate) vm.setFramerate(30);
      if (vm.renderer.setUseHighQualityRender) vm.renderer.setUseHighQualityRender(false);
      if (vm.setRuntimeOptions) vm.setRuntimeOptions({
        fencing: true,
        miscLimits: true,
        maxClones: 300,
      });
      if (vm.setCompilerOptions) vm.setCompilerOptions({
        enabled: true,
        warpTimer: false
      });
      if (vm.renderer.setMaxTextureDimension) vm.renderer.setMaxTextureDimension(2048);

      // enforcePrivacy threat model only makes sense in the editor
      if (vm.runtime.setEnforcePrivacy) vm.runtime.setEnforcePrivacy(false);

      if (typeof ScaffoldingAddons !== 'undefined') {
        ScaffoldingAddons.run(scaffolding, {"gamepad":false,"pointerlock":false,"specialCloudBehaviors":false,"unsafeCloudBehaviors":false,"pause":false});
      }

      scaffolding.setExtensionSecurityManager({
        getSandboxMode: () => 'unsandboxed',
        canLoadExtensionFromProject: () => true
      });
      for (const extension of []) {
        vm.extensionManager.loadExtensionURL(extension);
      }

    } catch (e) {
      handleError(e);
    }
  </script>
  
  
    <script>
      const getProjectData = (function() {
        const storage = scaffolding.storage;
        storage.onprogress = (total, loaded) => {
          setProgress(interpolate(0.2, 0.98, loaded / total));
        };
        
        storage.addWebStore(
          [
            storage.AssetType.ImageVector,
            storage.AssetType.ImageBitmap,
            storage.AssetType.Sound,
            storage.AssetType.Font
          ].filter(i => i),
          (asset) => new URL('https://cdn.jsdelivr.net/gh/genizy/google-class@main/btd6/assets/' + asset.assetId + '.' + asset.dataFormat).href
        );
        return () => new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = () => {
          if (location.protocol === 'file:') {
            reject(new Error('Zip environment must be used on a website, not on a local file. To fix this error, use the "Plain HTML" environment instead.'));
          } else {
            reject(new Error('Request to load project data failed.'));
          }
        };
        xhr.onprogress = (e) => {
          if (e.lengthComputable) {
            setProgress(interpolate(0.1, 0.2, e.loaded / e.total));
          }
        };
        xhr.responseType = 'arraybuffer';
        xhr.open('GET', "assets/project.json");
        xhr.send();
      });
      })();
    </script>
  <script>
    const run = async () => {
      const projectData = await getProjectData();
      await scaffolding.loadProject(projectData);
      setProgress(1);
      loadingScreen.hidden = true;
      if (true) {
        scaffolding.start();
      } else {
        launchScreen.hidden = false;
        launchScreen.addEventListener('click', () => {
          launchScreen.hidden = true;
          scaffolding.start();
        });
        launchScreen.focus();
      }
    };
    run().catch(handleError);
  </script>
</body>
</html>`;

const BURRITO_BISON_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>Burrito Bison</title>
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
      
      let width = Math.floor(windowWidth * 1);
      let height = Math.floor(width / aspectRatio);
      
      if (height > windowHeight * 1) {
        height = Math.floor(windowHeight * 1);
        width = Math.floor(height * aspectRatio);
      }
      
      container.style.width = \`\${width}px\`;
      container.style.height = \`\${height}px\`;
      
      const topMargin = (windowHeight - height) / 2;
      const leftMargin = (windowWidth - width) / 2;
      
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
        player.load("https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@3226fffeff224431331345e43c546bace1a5a936/Burrito_Bison.swf");
      } else {
        container.textContent = "Ruffle failed to load."; 
      }
    });
  </script>
</body>
</html>`;

const FIREBOY_WATERGIRL_HTML = `<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8" /> <meta name="format-detection" content="telephone=no"> <meta name="HandheldFriendly" content="true" /> <meta name="apple-mobile-web-app-capable" content="yes" /> <meta name="apple-mobile-web-app-status-bar-style" content="black" /> <meta name="apple-mobile-web-app-title" content="Bubblez"> <meta id="viewport" name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui,shrink-to-fit=no" /> <meta name="apple-mobile-web-app-capable" content="yes"> <meta name="apple-mobile-web-app-title" content="Fireboy and Watergirl 3 Ice Temple"> <title>Fireboy & Watergirl 3 Ice Temple</title> <script> var gtag; </script> </head> <body style="margin: 0px; overflow: hidden;" oncontextmenu="return false"> <script type="text/javascript"> window.requireNode = window.require; window.require = undefined; </script> <script src="https://cdn.jsdelivr.net/gh/Edward358-AI/HTML5-games@3c35856e44aea5d93ebe781cb1af84570dd8512c/html5/fireboy-and-watergirl-3/play/bower_components/requirejs/require.js"></script> <div id="root"> <div id="container"></div> <div id="hammer"></div> <div id="debug-fps" style="color:#ff0000; position: absolute; top: 0;"></div> </div> <script type="text/javascript">  function addScript(src, buster, callback) { var s = document.createElement('script'); s.setAttribute('src', src + '?v=' + buster); if (typeof callback === 'function') { s.onload = callback; } document.body.appendChild(s); } addScript('https://cdn.jsdelivr.net/gh/Edward358-AI/HTML5-games@3c35856e44aea5d93ebe781cb1af84570dd8512c/html5/fireboy-and-watergirl-3/play/version.js', Date.now(), function() { require(["https://cdn.jsdelivr.net/gh/bobydob/godotpack@eee6707129e6b8de0315fa9a296cec67aa16f6d8/side/faw3/faw3.min.js?v=" + version]); }); </script> </body> </html>`;

const FREE_RIDER_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Free Rider HD</title>
    <style>
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background-color: #000; }
        iframe { width: 100%; height: 100%; border: none; }
    </style>
</head>
<body>
    <iframe src="https://www.freeriderhd.com/embed" allow="autoplay; fullscreen" title="Free Rider HD"></iframe>
</body>
</html>`;

const FOOTBALL_LEGENDS_HTML = `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no" />
	<link rel="stylesheet"
		href="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/app.css"
		type="text/css" />
	<title>Football Legends</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-MENBM6GSNY"></script>
	<script>
		function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","G-MENBM6GSNY")
	</script>
</head>

<body>
	<div id="content"></div>
	<div id="orientation"></div>
	<div id="loader">Loading ...</div>
	<script type="text/javascript" src=""></script>
	<script type="text/javascript"
		src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/nape.js">
		var nape ="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/nape.js"; 
	</script>
	<script type="text/javascript"
		src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/minjquery.js">
	</script>
	<script type="text/javascript"
		src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/easel.js">
	</script>
	<script type="text/javascript"
		src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/bluebird.js">
	</script>
	<script type="text/javascript"
		src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/phaserminn.js">
	</script>
	<script type="text/javascript"
		src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/cache.js">
	</script>
	<script type="text/javascript"
		src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/superstor.js">
	</script>
	<script type="text/javascript"
		src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/bones.js">
	</script>
	<script type="text/javascript">
		var notIE11 = (typeof (Event) ==='function'); window.SDK_OPTIONS = { gameId: "65s7iqle6xe0exlr7a3cs2hmkkabzohw", onEvent: function (event) { switch (event.name) { case "SDK_GAME_START": // advertisement done, resume game logic and unmute audio var event; if (notIE11) { event = new Event("SDK_GAME_START"); } else { event = document.createEvent('Event'); event.initEvent('SDK_GAME_START', true, true); } document.getElementById("content").dispatchEvent(event); break; case "SDK_GAME_PAUSE": // pause game logic / mute audio var event; if (notIE11) { event = new Event("SDK_GAME_PAUSE"); } else { event = document.createEvent('Event'); event.initEvent('SDK_GAME_PAUSE', true, true); } document.getElementById("content").dispatchEvent(event); break; case "SDK_READY": // this event is triggered when your user doesn't want personalised targeting of ads and such console.log("SDK_READY"); break; } }, }; (function (a, b, c) { var d = a.getElementsByTagName(b)[0]; a.getElementById(c) || (a = a.createElement(b), a.id = c, a.src ="", d.parentNode.insertBefore(a, d)) })(document, "script", "gamemonetize-sdk"); 
	</script>
	<script type="text/javascript"
		src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/legends.js">
	</script>
</body>
<script src=""></script>
</html>`;

const BASKET_RANDOM_HTML = `<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Basket Random</title>
	<meta name="viewport"
		content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
	<link rel="stylesheet"
		href="https://cdn.jsdelivr.net/gh/bubbls/ruffle@1520d90d7b2994737acd8f7a633d018f63c22ca7/style.css"
		type="text/css">
	<script>
		window.addEventListener("keydown", function(e) { // space and arrow keys if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) { e.preventDefault(); } }, false); 
	</script>
</head>
<body style="margin:0;overflow:hidden;background:#000;">
	<div id="fb-root"></div>
	<script
		src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@1520d90d7b2994737acd8f7a633d018f63c22ca7/box2d.js">
	</script> <noscript>
		<div id="notSupportedWrap">
			<h2 id="notSupportedTitle">This content requires JavaScript</h2>
			<p class="notSupportedMessage">JavaScript appears to be disabled. Please enable it to view this content.</p>
		</div>
	</noscript>
	<script
		src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@1520d90d7b2994737acd8f7a633d018f63c22ca7/suppoortcheck.js">
	</script>
	<script
		src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@1520d90d7b2994737acd8f7a633d018f63c22ca7/offclient.js"
		type="module"></script>
	<script
		src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@1520d90d7b2994737acd8f7a633d018f63c22ca7/main.js"
		type="module"></script>
	<script
		src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@1520d90d7b2994737acd8f7a633d018f63c22ca7/registersw.js"
		type="module"></script>
	<script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@1520d90d7b2994737acd8f7a633d018f63c22ca7/api.js"></script>
</body>
</html>`;

const GRANNY_2_HTML = `<!DOCTYPE html>
<html lang="en-us">
<head>
<meta charset="utf-8"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title>Granny VS Grandpa</title>
<link rel="stylesheet" href=""/>
<style>
    body { margin: 0; background: #000; overflow: hidden; }
    #unity-container { position: absolute; width: 100%; height: 100%; left: 0; top: 0; }
    #unity-canvas { width: 100%; height: 100%; }
</style>
<script>
    var YaGames;
    // Mock Yandex SDK for functionality without external dependency errors
    window.YaGames = {
        init: () => Promise.resolve({
            getPlayer: () => Promise.resolve({
                getName: () => "Player",
                getPhoto: () => ""
            }),
            getLeaderboards: () => Promise.resolve({})
        })
    };
</script>
</head>
<body>
<div id="unity-container">
<canvas id="unity-canvas"></canvas>
</div>
<script>
      var container = document.querySelector("#unity-container");
      var canvas = document.querySelector("#unity-canvas");

      var buildUrl = "https://cdn.jsdelivr.net/gh/m-e-64-cls/5@main/Build";
      var loaderUrl = buildUrl + "/bb0d9ecdb05db3e84da20bd14a4f84dc.loader.js";
      
      function loadAndMergeFiles(files, callback) {
        var mergedBlob = [];
        var loadNextFile = function (index) {
            if (index < files.length) {
                var file = files[index];
                fetch(buildUrl + "/" + file)
                    .then(response => response.arrayBuffer())
                    .then(data => {
                        mergedBlob.push(new Uint8Array(data));
                        loadNextFile(index + 1);
                    })
                    .catch(error => console.error('Error loading file:', file, error));
            } else {
                callback(new Blob(mergedBlob));
            }
        };
        loadNextFile(0);
    }

    var wasmFiles = [
        "52fc98ffa6c0df3da7ee8ac3194aa7f0.wasm_part0.wasm",
        "52fc98ffa6c0df3da7ee8ac3194aa7f0.wasm_part1.wasm",
        "52fc98ffa6c0df3da7ee8ac3194aa7f0.wasm_part2.wasm"
    ];

    var dataFiles = [
        "aa32f1e0d2d5eeacc71b89b496157322.data_part0.data",
        "aa32f1e0d2d5eeacc71b89b496157322.data_part1.data"
    ];

    loadAndMergeFiles(wasmFiles, function (mergedWasmBlob) {
        var mergedWasmFile = URL.createObjectURL(mergedWasmBlob);
        loadAndMergeFiles(dataFiles, function (mergedDataBlob) {
            var mergedDataFile = URL.createObjectURL(mergedDataBlob);
            var config = {
                dataUrl: mergedDataFile,
                frameworkUrl: buildUrl + "/e42b2d09d8d232ecce16310ff4617586.framework.js",
                codeUrl: mergedWasmFile,
                streamingAssetsUrl: "StreamingAssets",
                companyName: "Awesome",
                productName: "Granny VS Grandpa - Multiplayer",
                productVersion: "0.1",
            };

            var script = document.createElement("script");
            script.src = loaderUrl;
            script.onload = () => {
                createUnityInstance(canvas, config);
            };
            document.body.appendChild(script);
        });
    });
</script>
</body>
</html>`;

const GEOMETRY_DASH_LITE_HTML = `<!DOCTYPE html>
<html lang="en-US">
<head>
  <base href="https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/gdlite/">
    <title>Geometry Dash</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="themes/geometrydashlite.io/rs/css/home.css?v=1">
    <style>
        html { box-sizing: border-box; }
        *, *:before, *:after { box-sizing: inherit; }
        body { margin: 0; background-image: linear-gradient(rgb(0, 0, 0), rgb(0, 102, 255)); overflow: hidden; }
        #gameContainer { width: 100vw; height: 100vh; }
        canvas { width: 100%; height: 100%; display: block; }
        #loader { position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background-image: linear-gradient(rgb(0, 0, 0), rgb(0, 102, 255)); }
        .spinner { margin: 10px; font-size: 10px; position: relative; text-indent: -9999em; border-top: 1.1em solid rgba(255, 255, 255, 0.2); border-right: 1.1em solid rgba(255, 255, 255, 0.2); border-bottom: 1.1em solid rgba(255, 255, 255, 0.2); border-left: 1.1em solid #ffffff; transform: translateZ(0); animation: spinner-spin 1.1s infinite linear; border-radius: 50%; width: 5em; height: 5em; }
        @keyframes spinner-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    </style>
</head>
<body>
    <div id="gameContainer"></div>
    <div id="loader">
        <div class="spinner"></div>
    </div>
    <script>
      window.fileMergerConfig = {
        files: [
          { name: 'GeometryDashLite.data.unityweb', parts: 2 },
          { name: 'GeometryDashLite.wasm.code.unityweb', parts: 1 },
          { name: 'GeometryDashLite.wasm.framework.unityweb', parts: 1 },
        ],
        basePath: 'Build/',
        debug: true
      };  
    </script>
    <script src="https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@ac5cdfc0042aca584e72619375b4aca948a9243c/merge.js"></script>
    <script src="Build/UnityLoader.js"></script>
    <script>
        var gameInstance = UnityLoader.instantiate("gameContainer", "Build/GeometryDashLite.json", {
            onProgress: UnityProgress
        });
        function UnityProgress(gameInstance, progress) {
            if (!gameInstance.Module) return;
            const loader = document.querySelector("#loader");
            if (progress === 1 && !gameInstance.removeTimeout) {
                gameInstance.removeTimeout = setTimeout(function() {
                    loader.style.display = "none";
                }, 2000);
            }
        }
    </script>
</body>
</html>`;

export const GAMES: Game[] = [
  {
    id: 'sf-alpha-3',
    title: 'Street Fighter Alpha 3',
    category: 'Action',
    image: 'https://upload.wikimedia.org/wikipedia/en/0/00/Street_Fighter_Alpha_3_cover.jpg',
    rating: 4.9,
    plays: '12M',
    description: 'The classic arcade fighter. Select your hero and battle for supremacy in this legendary 2D fighting game.',
    isHot: true,
    romUrl: "https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@a3b0ea52357b0aa94b7acf145c52494035722022/Street%20Fighter%20Alpha%203%20(USA).zip"
  },
  {
    id: 'pokemon-emerald',
    title: 'Pokémon Emerald',
    category: 'Adventure',
    image: 'https://upload.wikimedia.org/wikipedia/en/5/5b/Pokemon_Emerald_box.jpg',
    rating: 4.8,
    plays: '8.5M',
    description: 'Explore the Hoenn region, catch wild Pokémon, and become the Champion in this beloved GBA classic.',
    isHot: true,
    isNew: false,
    romUrl: "https://cdn.jsdelivr.net/gh/a456pur/seraph@81f551ca0aa8e3d6018d32d8ac5904ac9bc78f76/games/pokemonemerald/pokemonemerald.gba"
  },
  {
    id: 'football-legends',
    title: 'Football Legends',
    category: 'Sports',
    image: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/94bd254c46f131a47346747df32a843e.png',
    rating: 4.7,
    plays: '8M',
    description: 'Play solo or with a friend in this fun arcade soccer game featuring famous football legends.',
    customHtml: FOOTBALL_LEGENDS_HTML
  },
  {
    id: 'snow-rider-3d',
    title: 'Snow Rider 3D',
    category: 'Sports',
    image: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/5e7323868673a55476a6d6540c499708.png',
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
    image: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/8a0112d5b62b761a2933d142079412a8.png',
    rating: 4.6,
    plays: '4.2M',
    description: 'A fast-paced low-poly racing game with a track editor. Race against time and master the curves.',
    customHtml: POLY_TRACK_HTML
  },
  {
    id: 'slope',
    title: 'Slope',
    category: 'Action',
    image: 'https://play-lh.googleusercontent.com/uJ055-6xM4zWb60gC5qNnJ-d9vWqN1I_4d2g_b_m_1-f_0_7_c_3_v_0',
    rating: 4.8,
    plays: '15M',
    description: 'Control a ball rolling down a steep slope. Avoid obstacles and keep your momentum in this endless 3D runner.',
    customHtml: SLOPE_HTML
  },
  {
    id: 'fifa-10',
    title: 'FIFA 10',
    category: 'Sports',
    image: 'https://upload.wikimedia.org/wikipedia/en/b/b3/FIFA_10_Cover.jpg',
    rating: 4.5,
    plays: '2M',
    description: 'Play the classic FIFA 10 (Nintendo DS version) directly in your browser. Build your dream team and compete.',
    customHtml: FIFA_HTML
  },
  {
    id: 'btd6',
    title: 'Bloons TD 6',
    category: 'Strategy',
    image: 'https://upload.wikimedia.org/wikipedia/en/6/66/Bloons_TD_6_cover.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Burrito_Bison_Launcha_Libre_cover.jpg',
    rating: 4.7,
    plays: '6M',
    description: 'Launch Burrito Bison as far as you can and smash gummy bears to gain speed!',
    customHtml: BURRITO_BISON_HTML
  },
  {
    id: 'fireboy-watergirl-3',
    title: 'Fireboy & Watergirl 3',
    category: 'Puzzle',
    image: 'https://upload.wikimedia.org/wikipedia/en/9/93/Fireboy_and_Watergirl_3_Ice_Temple_cover.jpg',
    rating: 4.8,
    plays: '18M',
    description: 'Control Fireboy and Watergirl simultaneously to solve puzzles and overcome obstacles in the Ice Temple.',
    customHtml: FIREBOY_WATERGIRL_HTML
  },
  {
    id: 'free-rider',
    title: 'Free Rider',
    category: 'Racing',
    image: 'https://play-lh.googleusercontent.com/zV_d9q_m_1-f_0_7_c_3_v_0',
    rating: 4.6,
    plays: '9M',
    description: 'Ride your bike on user-created tracks in this classic physics-based racing game.',
    customHtml: FREE_RIDER_HTML
  },
  {
    id: 'basket-random',
    title: 'Basket Random',
    category: 'Sports',
    image: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/5d9d7967-336c-48c9-8d8a-6415f9b457e9.png',
    rating: 4.6,
    plays: '3M',
    description: 'Score baskets in this funny physics-based basketball game. Play solo or with a friend!',
    customHtml: BASKET_RANDOM_HTML
  },
  {
    id: 'granny-2',
    title: 'Granny VS Grandpa',
    category: 'Action',
    image: 'https://play-lh.googleusercontent.com/M6q0rN2K7j0_x_0_7_c_3_v_0',
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
    image: 'https://upload.wikimedia.org/wikipedia/en/3/35/Geometry_Dash_Logo.png',
    rating: 4.8,
    plays: '20M',
    description: 'Jump and fly your way through danger in this rhythm-based action platformer!',
    customHtml: GEOMETRY_DASH_LITE_HTML
  }
];