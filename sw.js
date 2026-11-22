const C="darzi-v1";
const SHELL=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const r=e.request; if(r.method!=="GET")return;
  const h=new URL(r.url).hostname;
  if(!(h===location.hostname||h==="www.gstatic.com"||h==="fonts.googleapis.com"||h==="fonts.gstatic.com"))return;
  e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(C).then(x=>x.put(r,c));return res;}).catch(()=>caches.match(r).then(m=>m||caches.match("./index.html"))));
});
