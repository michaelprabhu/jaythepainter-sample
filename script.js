(function () {
  'use strict';

  // Opt in to reveal styles only when JS runs, so content is never hidden without JS.
  document.documentElement.classList.add('js');

  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    for (var i = 0; i < items.length; i++) items[i].classList.add('in');
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  for (var j = 0; j < items.length; j++) observer.observe(items[j]);

  // Safety net: reveal anything still hidden after 2.5s (e.g. observer failure).
  window.setTimeout(function () {
    for (var k = 0; k < items.length; k++) items[k].classList.add('in');
  }, 2500);
})();
