self.addEventListener('install',succ=>{

console.log('install');
  succ.waitUntil(

caches.open('c1').then(co=>{ return co.addAll(
[
'./',
'index.html',
'main.css',
'images/bg-01.jpg',
'main.js',
'manifest.json',

'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'
]

)})



)})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        let responseClone = response.clone();
        caches.open('c1').then(function(cache) {
          cache.put(event.request, responseClone);
        });

        return resp
      });
    }).catch(function() {

    })
  );
});
