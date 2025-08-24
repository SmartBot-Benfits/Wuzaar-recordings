function animateCounter(el,end){let s=null;const step=(t)=>{if(!s)s=t;const p=Math.min((t-s)/1200,1);el.textContent=Math.floor(end*p).toLocaleString();if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)};
document.addEventListener('DOMContentLoaded',async()=>{
  document.getElementById('year').textContent=new Date().getFullYear();
  animateCounter(document.getElementById('kArtists'),120);
  animateCounter(document.getElementById('kTracks'),450);
  animateCounter(document.getElementById('kEvents'),32);
  const res=await fetch('content/artists.json'); const data=await res.json(); const talents=data.artists||[]; window.__WUZAAR_ARTISTS=talents;
  const grid=document.getElementById('talentGrid'); const gSel=document.getElementById('genreFilter'); const lSel=document.getElementById('locFilter');
  const genres=new Set(['All Genres']); const locs=new Set(['All Locations']);
  talents.slice(0,24).forEach((t,idx)=>{genres.add(t.genre||''); locs.add(t.city||''); const c=document.createElement('div'); c.className='card';
    c.innerHTML=`<img src='${t.image}' alt='${t.name}' style='width:100%;height:140px;object-fit:cover;border-radius:10px'><div class='badge'>${t.status}</div><div class='name'>${t.name}</div><div class='genre'>${t.genre}</div>`; grid.appendChild(c); });
  gSel.innerHTML=''; for(const g of genres){const o=document.createElement('option');o.value=o.textContent=g; gSel.appendChild(o);}
  lSel.innerHTML=''; for(const l of locs){const o=document.createElement('option');o.value=o.textContent=l; lSel.appendChild(o);}
  document.getElementById('searchInput').addEventListener('input',e=>{const q=e.target.value.toLowerCase(); Array.from(grid.children).forEach(card=>{card.style.display=card.textContent.toLowerCase().includes(q)?'':'' })});
  const track=document.getElementById('artistTrack'); track.innerHTML=''; talents.slice(0,10).forEach((a,i)=>{const card=document.createElement('div'); card.className='artist-card';
    card.innerHTML=`<img src='${a.image}' alt='${a.name}' style='width:100%;height:140px;object-fit:cover;border-radius:10px'><h4>${a.name}</h4><span class='genre'>${a.genre}</span>`; track.appendChild(card); });
  let offset=0; document.getElementById('prevArtist').addEventListener('click',()=>{offset=Math.max(0,offset-272); track.style.transform=`translateX(-${offset}px)`});
  document.getElementById('nextArtist').addEventListener('click',()=>{const max=Math.max(0,(track.children.length*272)-track.clientWidth); offset=Math.min(max,offset+272); track.style.transform=`translateX(-${offset}px)`});
  // Chat demo
  const chatFab=document.getElementById('chatFab'); const chatBox=document.getElementById('chatBox'); const chatClose=document.getElementById('chatClose');
  chatFab.addEventListener('click',()=>chatBox.classList.add('open')); chatClose.addEventListener('click',()=>chatBox.classList.remove('open'));
  document.getElementById('chatForm').addEventListener('submit',e=>{e.preventDefault(); const v=document.getElementById('chatText'); const b=document.getElementById('chatBody'); const me=document.createElement('div'); me.textContent=v.value; b.appendChild(me); v.value=''; setTimeout(()=>{const bot=document.createElement('div'); bot.className='bot'; bot.textContent='Thanks! Our team will reply soon.'; b.appendChild(bot); b.scrollTop=b.scrollHeight;},500)});
});