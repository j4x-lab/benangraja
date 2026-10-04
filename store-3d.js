/* BENANG RAJA — store-3d interactions: intro.mp4 chapter tour + CSS-3D tulis-premium miniature (orbit, day/night). No deps. */
(function(){
"use strict";
var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var root=document.getElementById("store3d");
if(!root) return;

/* ── tabs (pause video when leaving tour) ── */
var tabs=root.querySelectorAll(".s3-tab");
var tourView=document.getElementById("s3tour"), miniView=document.getElementById("s3mini");
var video=document.getElementById("s3video");
tabs.forEach(function(t){t.addEventListener("click",function(){
  tabs.forEach(function(x){x.classList.remove("on");x.setAttribute("aria-selected","false")});
  t.classList.add("on");t.setAttribute("aria-selected","true");
  var mini=t.getAttribute("data-mode")==="mini";
  tourView.classList.toggle("on",!mini);miniView.classList.toggle("on",mini);
  if(mini&&video&&!video.paused) video.pause();
})});

/* ── day/night ── */
var dn=document.getElementById("s3dn");
dn.addEventListener("click",function(){
  var night=root.classList.toggle("night");
  dn.textContent=night?"☀️ siang":"🌙 malam";
  dn.setAttribute("aria-pressed",night?"true":"false");
});

/* ── video chapter tour (intro.mp4 10.01s — bab dari frame asli 0.5s/3s/7s) ── */
var chaps=[
  {s:0.3,t:"0:00 / 0:10",n:"Etalase — manekin & harga pabrik",d:"Eceran & grosir harga pabrik · parkir luas · manekin koleksi terbaru"},
  {s:3.2,t:"0:03 / 0:10",n:"Lorong — full AC & rak penuh",d:"Ruang luas super nyaman — gantungan hem & kain kanan-kiri"},
  {s:7.0,t:"0:07 / 0:10",n:"Fitting room — coba langsung",d:"Puluh motif siap coba — ruang ganti terang di ujung lorong"}
];
var ci=0,play=document.getElementById("s3play"),
    capT=document.getElementById("s3t"),capN=document.getElementById("s3n"),capD=document.getElementById("s3s");
var chBtns=root.querySelectorAll(".s3-ch");
function fmt(s){s=Math.max(0,Math.floor(s));return "0:"+("0"+s).slice(-2)}
function mark(k){
  ci=(k+chaps.length)%chaps.length;
  capT.textContent=chaps[ci].t;capN.textContent=chaps[ci].n;capD.textContent=chaps[ci].d;
  chBtns.forEach(function(b,j){b.classList.toggle("on",j===ci)});
}
function go(k){mark(k);try{video.currentTime=chaps[ci].s}catch(_){} video.play().catch(function(){});}
mark(0);
chBtns.forEach(function(b){b.addEventListener("click",function(){go(+b.getAttribute("data-k"))})});
document.getElementById("s3next").addEventListener("click",function(){go(ci+1)});
document.getElementById("s3prev").addEventListener("click",function(){go(ci-1)});
function toggle(){if(video.paused){video.play().catch(function(){})}else{video.pause()}}
play.addEventListener("click",toggle);
video.addEventListener("click",toggle);
video.addEventListener("play",function(){play.classList.add("hide");play.textContent="⏸"});
video.addEventListener("pause",function(){play.classList.remove("hide");play.textContent="▶"});
video.addEventListener("timeupdate",function(){
  capT.textContent=fmt(video.currentTime)+" / 0:10";
  var k=video.currentTime<2?0:(video.currentTime<5.5?1:2);
  if(k!==ci) mark(k);
});
tourView.setAttribute("tabindex","0");
tourView.addEventListener("keydown",function(e){
  if(e.key==="ArrowRight") go(ci+1);
  if(e.key==="ArrowLeft") go(ci-1);
  if(e.key===" "){e.preventDefault();toggle()}
});

/* ── CSS-3D miniature (logic C, tanpa WebGL → aman file:// & HP kentang) ── */
var stage=document.getElementById("s3stage"),cube=document.getElementById("s3cube");
var ang=-24,tilt=-12,dragM=false,px=0,py=0;
function renderCube(){cube.style.transform="rotateX("+tilt.toFixed(1)+"deg) rotateY("+ang.toFixed(1)+"deg)"}
renderCube();
if(!reduce){setInterval(function(){if(!dragM&&miniView.classList.contains("on")){ang+=.25;renderCube()}},50)}
stage.addEventListener("pointerdown",function(e){dragM=true;px=e.clientX;py=e.clientY;try{stage.setPointerCapture(e.pointerId)}catch(_){}});
addEventListener("pointermove",function(e){if(!dragM)return;ang+=(e.clientX-px)*.45;tilt=Math.max(-38,Math.min(8,tilt-(e.clientY-py)*.3));px=e.clientX;py=e.clientY;renderCube()});
addEventListener("pointerup",function(){dragM=false});
})();
