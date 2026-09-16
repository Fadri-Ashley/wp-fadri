/* ============================================================
   main.js — interaktivitas web portofolio
   Semua ditulis dengan JavaScript murni (tanpa library).
   ============================================================ */

// Jalankan setelah seluruh HTML selesai dibaca browser.
document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------------------------------------------
     1. Tahun otomatis di footer
     Supaya tidak perlu diedit manual tiap ganti tahun.
     ---------------------------------------------------------- */
  const yearEl = document.querySelector('#year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ----------------------------------------------------------
     2. Smooth scroll untuk link dengan atribut data-scroll
     ---------------------------------------------------------- */
  const scrollLinks = document.querySelectorAll('[data-scroll]');

  scrollLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      const targetId = link.getAttribute('href');      // contoh: "#contact"
      const target = document.querySelector(targetId);

      if (!target) return;                             // kalau tujuan tidak ada, biarkan default

      event.preventDefault();                          // batalkan lompatan instan
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ----------------------------------------------------------
     3. Reveal saat section masuk layar
     IntersectionObserver memberi tahu kita kapan sebuah elemen
     terlihat di viewport, tanpa perlu menghitung posisi scroll.
     ---------------------------------------------------------- */
  const revealItems = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);                // cukup sekali, lalu berhenti mengamati
    });
  }, {
    threshold: 0.15                                    // 15% elemen terlihat = dianggap masuk
  });

  revealItems.forEach(function (item) {
    revealObserver.observe(item);
  });

  /* ----------------------------------------------------------
     4. Animasi progress bar skill
     Lebar bar diambil dari atribut data-level di HTML,
     lalu diisi saat bar pertama kali terlihat.
     ---------------------------------------------------------- */
  const bars = document.querySelectorAll('.bar__fill');

  const barObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      const bar = entry.target;
      const level = bar.dataset.level || 0;            // sama dengan getAttribute('data-level')
      bar.style.width = level + '%';

      observer.unobserve(bar);
    });
  }, {
    threshold: 0.5
  });

  bars.forEach(function (bar) {
    barObserver.observe(bar);
  });

});