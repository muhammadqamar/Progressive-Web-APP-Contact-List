Notification.requestPermission()

var a1 = window.indexedDB.open('book');

a1.onerror =  function(event){console.log(`error in intiatiing db ${event}`)};
a1.onupgradeneeded = function(event) {
 var db = event.target.result;
var objstr = db.createObjectStore('contacts',{keyPath:'email'});
objstr.createIndex('name','name',{unique:false});

objstr.createIndex('contact','contact',{unique:false});


};
a1.onsuccess =  function(succ){
  showrslt()
}


function stordb()
{


var namecontact = document.getElementById('name').value
var contact =     document.getElementById('tel').value
var email =       document.getElementById('ml').value

var a = window.indexedDB.open('book');

a.onerror =  function(event){console.log(`error in intiatiing db ${event}`)};
a.onupgradeneeded = function(event) {
 var db = event.target.result;
var objstr = db.createObjectStore('contacts',{keyPath:'email'});
objstr.createIndex('name','name',{unique:false});

objstr.createIndex('contact','contact',{unique:false});

};
a.onsuccess =  function(succ){

var db = succ.target.result

db.transaction('contacts','readwrite').objectStore('contacts').add({email:email,name:namecontact,contact:contact})}
showrslt()
var r =  new Notification('Record added',{body: 'great!! your result added'})

}





function showrslt()
{var b = window.indexedDB.open('book');
b.onsuccess =  function(succ){
var allrslt =[]
var db = succ.target.result

db.transaction('contacts','readwrite').objectStore('contacts').openCursor().onsuccess = function(x){

var n  = x.target.result
if(n)
{

  var te = `<tr><td>${ n.value.name}</td>
            <td>${ n.value.contact}</td>
            <td>${ n.value.email}</td>
            <td id='${ n.value.email}' class="del"  onclick="delrec(this.id)" >delete</td>
            </tr>`
 allrslt=allrslt+te
  n.continue();
}
else {
document.getElementById('alldetails').innerHTML =  allrslt
    console.log("No more entries!");

  }


}
}
}
function delrec(e)
{

  console.log(e)

  var keydelete =  e

  var c = window.indexedDB.open('book');
  c.onsuccess =  function(succ){

  var db = succ.target.result
  db.transaction('contacts','readwrite').objectStore('contacts').delete(keydelete)
  showrslt()
var m =  new Notification('Record Deleted',{body: 'great!! your result Deleted'})
}

}

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js',{scope:'./'})
  .then(succ=>{console.log(`registered ${succ}`)})
.catch(err=>{console.log(`error ${err}`)})
}else{console.log('browser not support')}
