/*
 * @license
 * Your First PWA Codelab (https://g.co/codelabs/pwa)
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
// 'use strict';

// CODELAB: Update cache names any time any of the cached files change.
// const CACHE_NAME = 'static-cache-v1';
const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  'index.html',
];

// let deferredPrompt;

// window.addEventListener('beforeinstallprompt', (e) => {
//   // Prevent Chrome 67 and earlier from automatically showing the prompt
//   e.preventDefault();
//   // Stash the event so it can be triggered later.
//   deferredPrompt = e;
//   btnAdd.style.display = 'block';
//   btnAdd.addEventListener('click', (e) => {
//     // hide our user interface that shows our A2HS button
//     btnAdd.style.display = 'none';
//     // Show the prompt
//     deferredPrompt.prompt();
//     // Wait for the user to respond to the prompt
//     deferredPrompt.userChoice
//       .then((choiceResult) => {
//         if (choiceResult.outcome === 'accepted') {
//           console.log('User accepted the A2HS prompt');
//         } else {
//           console.log('User dismissed the A2HS prompt');
//         }
//         deferredPrompt = null;
//       });
//   });
// });

this.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // CODELAB: Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
);

  this.skipWaiting();
});

this.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);

  this.clients.claim();
});

this.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  // CODELAB: Add fetch event handler here.
  if (evt.request.url.includes('/forecast/')) {
    console.log('[Service Worker] Fetch (data)', evt.request.url);
    evt.respondWith(
        caches.open(DATA_CACHE_NAME).then((cache) => {
          return fetch(evt.request)
              .then((response) => {
                // If the response was good, clone it and store it in the cache.
                if (response.status === 200) {
                  cache.put(evt.request.url, response.clone());
                }
                return response;
              }).catch((err) => {
                // Network request failed, try to get it from the cache.
                return cache.match(evt.request);
              });
        }));
    return;
  }
  evt.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(evt.request)
            .then((response) => {
              return response || fetch(evt.request);
            });
      })
  );
  if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return;
  }
  evt.respondWith(
      fetch(evt.request)
          .catch(() => {
            return caches.open(CACHE_NAME)
                .then((cache) => {
                  return cache.match('/offline.html');
                });
          })
  );

});

// var doCache = true;

// var CACHE_NAME = "my-pwa-cache-v1";

// this.addEventListener("activate", event => {
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys().then(keyList =>
//       Promise.all(
//         keyList.map(key => {
//           if (!cacheWhitelist.includes(key)) {
//             console.log("Deleting cache: " + key);
//             return caches.delete(key);
//           }
//         })
//       )
//     )
//   );
// });

// this.addEventListener("install", function(event) {
//   if (doCache) {
//     event.waitUntil(
//       caches.open(CACHE_NAME).then(function(cache) {
//         fetch("/manifest.json")
//           .then(response => {
//             response.json();
//           })
//           .then(assets => {
//             const urlsToCache = ["/", "/offline.html","/index.html"];
//             cache.addAll(urlsToCache);
//             console.log("cached");
//           });
//       })
//     );
//   }
// });

// this.addEventListener("fetch", function(event) {
//   if (doCache) {
//     event.respondWith(
//       caches.match(event.request).then(function(response) {
//         return response || fetch(event.request);
//       })
//     );
//   }
// });
