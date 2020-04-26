

self.addEventListener("install",function(event){
    console.log("sw Installed");
    event.waitUntil(
        caches.open("Static Cache v6").then(function(cache){
            cache.addAll([
                "/",
                "/index.html",
                "/css/style.css",
                "/js/script.js",
                "https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css",
                "/images/icon-4.png",
                "/images/background.jpg",
                "/images/icons/icon-48x48.png",
                "/images/icons/icon-72x72.png",
                "/images/icons/icon-96x96.png",
                "/images/icons/icon-144x144.png",
                "/images/icons/icon-192x192.png",
                "/images/icons/icon-512x512.png"
            ])
        })
    )
});


self.addEventListener("active",function(event){
    console.log("sw Activated");
    event.waitUntil(
        caches.keys().then(function(cache){
            cache.map(function(elem){
                if(elem !== "Static Cache v6" || elem !== "Dynamic Cache v6" ){
                    return caches.delete(elem);
                }
            })
        })
    )

})


self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open("Dynamic Cache v6").then(function(cache){
            return fetch(event.request).then(function(responce){
                cache.put(event.request , responce.clone());
                return responce;
            }).catch(function(err){
                return cache.match(event.request).then(function(res){
                    return res;
                })
            })
        })
    )
  });