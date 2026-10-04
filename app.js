/* BENANG RAJA — interactions: loader, nav, 3D hero tilt, boutique orbit, fabric lab, reveals, form */
(function(){
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* loader */
  window.addEventListener("load", function(){
    setTimeout(function(){ document.getElementById("loader").classList.add("done"); }, 700);
  });
  setTimeout(function(){ document.getElementById("loader").classList.add("done"); }, 3200); // failsafe

  /* nav */
  var nav = document.getElementById("nav");
  addEventListener("scroll", function(){ nav.classList.toggle("scrolled", scrollY > 12); }, {passive:true});
  var burger = document.getElementById("burger"), menu = document.getElementById("mobileMenu");
  burger.addEventListener("click", function(){
    var open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  menu.querySelectorAll("a").forEach(function(a){ a.addEventListener("click", function(){ menu.classList.remove("open"); }); });

  /* hero 3D tilt — motion values, no react state */
  var stage = document.getElementById("heroStage"), frame = document.getElementById("heroFrame");
  var portrait = frame ? frame.querySelector(".hero-portrait") : null;
  if (stage && portrait && !reduce) {
    var rx = 0, ry = 0, tx = 0, ty = 0, raf = null;
    function loop(){
      rx += (tx - rx) * .08; ry += (ty - ry) * .08;
      portrait.style.transform = "rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg)";
      if (Math.abs(tx-rx) > .01 || Math.abs(ty-ry) > .01) raf = requestAnimationFrame(loop);
      else raf = null;
    }
    function kick(){ if (!raf) raf = requestAnimationFrame(loop); }
    stage.addEventListener("pointermove", function(e){
      var r = stage.getBoundingClientRect();
      ty = ((e.clientX - r.left) / r.width - .5) * 14;
      tx = -((e.clientY - r.top) / r.height - .5) * 10;
      kick();
    });
    stage.addEventListener("pointerleave", function(){ tx = 0; ty = 0; kick(); });
  }

  /* boutique orbit — drag to rotate */
  var dio = document.getElementById("diorama"), room = document.getElementById("dioRoom");
  if (dio && room) {
    var ang = 0, dragging = false, px = 0, idle = null;
    function render(){ room.style.transform = "rotateX(58deg) rotateZ(" + ang.toFixed(1) + "deg)"; }
    dio.addEventListener("pointerdown", function(e){ dragging = true; px = e.clientX; if (e.pointerId !== undefined && dio.setPointerCapture){ try{ dio.setPointerCapture(e.pointerId); }catch(_){} } });
    addEventListener("pointermove", function(e){ if (!dragging) return; ang += (e.clientX - px) * .35; px = e.clientX; render(); });
    addEventListener("pointerup", function(){ dragging = false; auto(); });
    function auto(){
      if (idle || reduce) return;
      idle = setInterval(function(){ if (!dragging){ ang += .18; render(); } }, 50);
    }
    render(); auto();
    /* touch swipe maps through pointer events above */
  }

  /* fabric lab — real cloth photos, true 3× magnifier of the same pixels */
  var FABRICS = {
    sogan:  { img:"images/sogan-hires.jpg",  w:"katun Raja Sogan",      g:"Rp 78.125 · official store",  d:"3 warna · kain meteran",      z:"motif asli — Raja Sogan · 3×" },
    dobi:   { img:"images/dobi-hires.jpg",   w:"dobby Rajawali Sogan",  g:"Rp 152.500 · official store", d:"motif garuda · premium",      z:"motif asli — Rajawali · 3×" },
    anjani: { img:"images/anjani-hires.jpg", w:"katun Anjani Emerald",  g:"Rp 35.000 · official store",  d:"kain saja · best seller",      z:"motif asli — Anjani · 3×" },
    tulis:  { img:"images/tulis-biru.jpg",   w:"primis kombinasi tulis", g:"Rp 173.750 · official store", d:"Semarangan biru · tulis",     z:"motif asli — Tulis Biru · 3×" }
  };
  Object.keys(FABRICS).forEach(function(k){ var im = new Image(); im.src = FABRICS[k].img; });
  var drape = document.getElementById("drape"),
      drapePhoto = document.getElementById("drapePhoto"),
      zoom = document.getElementById("drapeZoom"),
      zoomLabel = document.getElementById("zoomLabel");
  function setFabric(f, flash){
    var s = FABRICS[f];
    if (!s || !drapePhoto) return;
    drapePhoto.src = s.img;
    if (zoom) zoom.style.backgroundImage = 'url("' + s.img + '")';
    document.getElementById("spWeave").textContent = s.w;
    document.getElementById("spWeight").textContent = s.g;
    document.getElementById("spDye").textContent = s.d;
    if (zoomLabel) zoomLabel.textContent = s.z;
    if (flash !== false && !reduce && window.gsap) gsap.fromTo(drapePhoto, {opacity:.25}, {opacity:1, duration:.5, ease:"expo.out"});
  }
  setFabric("sogan", false);
  document.querySelectorAll(".sw-item").forEach(function(btn){
    btn.addEventListener("click", function(){
      document.querySelectorAll(".sw-item").forEach(function(b){ b.classList.remove("active"); b.setAttribute("aria-selected","false"); });
      btn.classList.add("active"); btn.setAttribute("aria-selected","true");
      setFabric(btn.getAttribute("data-f"));
    });
  });
  /* true magnifier — lens shows the real cloth at 3× under the cursor */
  function moveLens(e){
    var r = drape.getBoundingClientRect();
    var px = e.clientX - r.left, py = e.clientY - r.top;
    zoom.style.display = "grid";
    zoom.style.left = Math.min(Math.max(px - 95, 4), r.width - 194) + "px";
    zoom.style.top = Math.min(Math.max(py - 95, 4), r.height - 194) + "px";
    zoom.style.backgroundPosition = (px / r.width * 100).toFixed(1) + "% " + (py / r.height * 100).toFixed(1) + "%";
  }
  if (drape && zoom && matchMedia("(pointer:fine)").matches) {
    drape.addEventListener("pointermove", moveLens);
    drape.addEventListener("pointerleave", function(){ zoom.style.display = "none"; });
  } else if (drape && zoom) {
    drape.addEventListener("click", function(e){
      if (zoom.style.display === "grid") zoom.style.display = "none"; else moveLens(e);
    });
  }

  /* collection cards → jump fabric lab to matching cloth */
  var fabricMap = { tulis:"tulis", sogan:"sogan", anjani:"anjani", dobi:"dobi" };
  document.querySelectorAll(".kol").forEach(function(card){
    card.addEventListener("click", function(){
      var f = fabricMap[card.getAttribute("data-fabric")] || "sogan";
      var btn = document.querySelector('.sw-item[data-f="' + f + '"]');
      if (btn) btn.click();
      document.getElementById("kain").scrollIntoView({behavior: reduce ? "auto" : "smooth"});
    });
  });

  /* reveals — progressive enhancement: hide via JS only when animation is available */
  var els = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    /* leave visible */
  } else if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.set(els, {opacity:0, y:28});
    els.forEach(function(el, i){
      gsap.to(el, { opacity:1, y:0, duration:.9, ease:"expo.out", delay:(i % 3) * .06,
        scrollTrigger:{ trigger: el, start:"top 88%", once:true } });
    });
    gsap.to(".hero-copy", { opacity:1, y:0, duration:1, ease:"expo.out", startAt:{opacity:0, y:26} });
  } else {
    var io = new IntersectionObserver(function(es){
      es.forEach(function(en){ if (en.isIntersecting){ en.target.classList.remove("reveal-hidden"); en.target.style.transition = "opacity .7s, transform .7s"; io.unobserve(en.target); } });
    }, {threshold:.15});
    els.forEach(function(el){ el.classList.add("reveal-hidden"); el.style.transition = "none"; io.observe(el); });
  }

  /* booking form — inline validation near fields */
  var form = document.getElementById("bookForm");
  form.addEventListener("submit", function(e){
    e.preventDefault();
    var ok = true;
    function check(id, valid){
      var input = document.getElementById(id);
      var err = input.parentElement.querySelector("[data-err]");
      input.classList.toggle("invalid", !valid);
      err.textContent = valid ? "" : "Mohon isi dengan benar.";
      if (!valid) ok = false;
    }
    var name = document.getElementById("fName").value.trim();
    var wa = document.getElementById("fWa").value.replace(/\D/g, "");
    var date = document.getElementById("fDate").value;
    check("fName", name.length >= 3);
    check("fWa", wa.length >= 9 && wa.length <= 15);
    check("fDate", !!date);
    if (ok) {
      document.getElementById("formOk").hidden = false;
      form.querySelector('button[type="submit"]').textContent = "Permintaan Terkirim ✓";
      form.querySelector('button[type="submit"]').disabled = true;
    }
  });
})();
