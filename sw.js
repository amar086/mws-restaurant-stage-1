
self.addEventListener('install', function(event) {
	// wait for page install before caching 	
	event.waitUntil(
		caches.open('mws-static-v1').then(function(cache){
			return cache.addAll([
					'/',
					'/index.html',
					'/restaurant.html',
					'/css/styles.css',
					'/data/restaurants.json',
					'/img/1.jpg',
					'/img/10.jpg',
					'/img/2.jpg',
					'/img/3.jpg',
					'/img/4.jpg',
					'/img/5.jpg',
					'/img/6.jpg',
					'/img/7.jpg',
					'/img/8.jpg',
					'/img/9.jpg',
					'/js/dbhelper.js',
					'/js/index.js',
					'/js/main.js',
					'/sw.js',
					'/js/restaurant_info.js',
					'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
					'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'

				]);
		}));


});	


self.addEventListener('fetch', function(event) {
	// wait for page install before caching 	
	event.respondWith(
		caches.match(event.request).then(function(response){
			if(response) {
			    console.log("Found request " + event.request.url + " in cache");
				return response;
			}else {
				console.log("Request " + event.request.url + " not found in cache");
				return fetch(event.request).then(function(response){
					const copyResponse = response.clone();
					caches.open('mws-static-v1').then(function(cache){
							cache.put(event.request,copyResponse);
					});
					return response;
				});
			}
		})

		);
});	 



