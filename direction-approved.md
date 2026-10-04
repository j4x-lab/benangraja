# direction-approved.md — Store 3D Benang Raja

## Tiga arah yang ditampilkan (Phase 4-5, file nyata + screenshot)
1. **A — Denah Jujur Utilitarian** · `design-demos/a-brutalist-wireframe.html` · screenshot `/tmp/br-a2.png`
   Logika 🎲轮盘：detik 16 → `#17 Functional Brutalism` (bagian webpage, reduksi 98%).
2. **B — Tur Foto ala Matterport** · `design-demos/b-matterport-tour.html` · screenshot `/tmp/br-b.png`
   Logika 🏆 referensi: Matterport / IKEA Kreativ / Google Street View indoor (standar tur ritel).
3. **C — Miniatur Flagship Three.js** · `design-demos/c-nerihu-miniature.html` · screenshot `/tmp/br-c3.png`
   Logika 🧠 desainer: Neri&Hu retail theatre × batik heritage (hitam + kuningan, serif Cormorant).
   Catatan: preview file:// sempat hitam karena Chrome memblokir tekstur WebGL file:// —
   diperbaiki via base64 inline; di hosting http(s) path `store/*.jpeg` biasa jalan.

Semua tiga memakai 3 foto asli `store/front.jpeg`, `store/inside.jpeg`, `store/inside2.jpeg` (tanpa stok).

## Pilihan user (verbatim)
- Q: "Arah mana yang dipasang ke section #toko?" → A: **"Mix dua arah"**
- Contoh mix yang ditawarkan: hotspot B + bingkai emas C.
- Konteks sebelumnya: tujuan = Showroom virtual · teknologi = Auto adaptif · pasang = Ganti di #toko.

## Lock eksekusi
**Mix B+C**: interaksi tur foto B (seret-pan, hotspot, filmstrip) + bahasa visual C
(hitam pekat + kuningan, serif display, mode malam/siang) + tab Miniatur CSS-3D
(ringan, tanpa WebGL → aman file:// maupun HP kentang). Ganti isi `#diorama` di `#toko`,
file baru `store-3d.css` + `store-3d.js`. Diorama konseptual lama pensiun.

## Amandemen 2026-10-04 (user: keep frame, pakai intro.mp4; mini → produk premium)
- **Tur** (`#s3tour`): foto-panorama diganti `images/intro.mp4` (10.01s, 1280×720,
  diverifikasi frame asli @0.5s etalase / @3s lorong / @7s fitting room).
  Frame + caption + tab + mode malam dipertahankan; kontrol = tombol putar +
  3 tombol bab (Etalase 0.3s / Lorong 3.2s / Fitting 7.0s) + prev/next + keyboard.
  Poster = `store/front.jpeg`. Tidak autoplay (hemat kuota HP).
- **Miniatur** (`#s3mini`): foto toko diganti produk kualitas tertinggi —
  **Primis Kombinasi Tulis** (`images/tulis-biru.jpg`, Rp 173.750, lini tulis premium),
  3 sisi kubus (object-position 28/50/72% agar tiap sisi beda potongan motif),
  panel kiri = harga/spesifikasi, caption = nama + harga. Orbit + malam tetap.
- Cap waktu bab diambil dari frame video yang benar-benar dilihat, bukan tebakan.
