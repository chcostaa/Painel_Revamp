var files = [
    "pa.html",
    "css/bootstrap.min.css",
    "css/estiloarrecadacao.css",
    "css/main.css",
    "img/icon.png",
    "img/LOGOSEFAZ.png",
    "js/install.js",
    "manifest.json",
    "js/spa.js",
    "js/jquery.min.js",
    "js/scripts.js",
    "js/bootstrap.min.js",
    "js/angular-locale_pt-br.js",
    "scripts/painelarrecada.controller.js",
    "scripts/app.js",
    "scripts/teste_painelarrecada.controller.js",
    "audio/alerta.mp3"
];


if (typeof files == 'undefined') {
    var files = [];
} else {
    files.push('./');
}

var CACHE_NAME = 'pa-pwa-v1.1';


self.addEventListener('activate', function(event) {
    console.log('[SW] Activate');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (CACHE_NAME.indexOf(cacheName) == -1) {
                        console.log('[SW] Delete cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});




self.addEventListener('install', function(event) {
    console.log('[SW] Install');
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return Promise.all(
                files.map(function(file) {
                    return cache.add(file);
                })
            );
        })
    );
});



self.addEventListener('fetch', function(event) {
    console.log('[SW] fetch ' + event.request.url)
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request.clone());
        })
    );
});





self.addEventListener('notificationclick', function(event) {
    console.log('On notification click: ', event);
    clients.openWindow('/pa.html');
});