'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "68a44bf5a0379c8295a05a2d60bd2ed9",
"main.dart.js_12.part.js": "89c0bcb9e28a086a6ba4c9a3952c93e5",
"main.dart.js_6.part.js": "2c71eb1dad812f37a8d8b06051cecda2",
"index.html": "3ae8fb4c5c955e78f7091fcd576be734",
"/": "3ae8fb4c5c955e78f7091fcd576be734",
"main.dart.js_13.part.js": "db2b0f201498ce24c6029a4b2dee363c",
"main.dart.js_4.part.js": "59aa85eceaf73214bd416875865d4c9b",
"main.dart.js": "a7d0926ac8276a9b5ae347a85c6d1910",
"main.dart.js_18.part.js": "b1e38811e0f4046ed9cd8bea98a800a5",
"main.dart.js_19.part.js": "6b051c9ab6e6e32aa46f4bfb52582c9d",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"main.dart.js_5.part.js": "4ba0553a2824be2c74f4dbc30bdd5334",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"main.dart.js_23.part.js": "f8ea3564c5feabfe623b8de74f910c9b",
"main.dart.js_22.part.js": "2f937dd62abdaf05456a5f2dc6a97e5b",
"main.dart.js_8.part.js": "92eaf78dd798dbea3f5634aaa0481397",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "a71e9468a1eb235362b879ef4e825303",
"main.dart.js_14.part.js": "1f964cc7528dcc8f6ccc6df6ce2b0f7f",
"main.dart.js_1.part.js": "d26376d45b4c4dc08d4d45237650b96c",
"main.dart.js_3.part.js": "55ef4dc10664fafab81486370208666c",
"main.dart.js_16.part.js": "d2915b1ad3d7823d7bcee050b2b3e0f0",
"assets/images/work.png": "ab0a1139b43c6478dbcb7c4a59aa6d97",
"assets/images/mail.png": "df6b6769043976e01396f169d3ba3152",
"assets/images/mockup.png": "426f2bc00f67d4dcdd4c6f072d3a00ad",
"assets/images/GitHub.png": "ef7a02b69836dc8b6a732a54c4200dcb",
"assets/images/GitHub_white.png": "472739dfb5857b1f659f4c4c6b4568d0",
"assets/images/copyright.png": "a7e1c3fa88bb79746caa1a0288b068a7",
"assets/images/user.png": "6f6bbb16aec97391aefe120ec5a4e6a2",
"assets/images/blog.png": "6485e574b4c8da1197df2f3ce7addbb4",
"assets/images/linkedin.png": "ba77d4a35f70b4682919950b7fccc469",
"assets/images/location.png": "47262b1d384976f0aac871929b686ea0",
"assets/images/education.png": "7cb7074207475afffda10a8f3f38b242",
"assets/images/skills.png": "80ec44b7355d79a187c1d83ade83cc40",
"assets/AssetManifest.json": "0d3cbc0158fc9b876b3ab6f7e0be43da",
"assets/NOTICES": "eb14ff4eb2090aed72314e60f60d652d",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "6d963e20c731f59554b63985eba5a9d3",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"main.dart.js_2.part.js": "37786225c8da69d7a2c039a1dd4bc646",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
