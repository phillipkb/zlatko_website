(function () {
  var languageBound = false;
  var galleryBound = false;

  function bindLanguage() {
    if (languageBound) return;
    var langButtons = document.querySelectorAll("[data-lang]");
    if (!langButtons.length) return;
    languageBound = true;

    var html = document.documentElement;
    var storageKey = "antipropaganda-lang";
    var titled = {
      bg: html.getAttribute("data-title-bg") || "Златко Ангелов — До Саутхамптън през Айова",
      en: html.getAttribute("data-title-en") || "Zlatko Anguelov — To Southampton via Iowa"
    };
    var navLabel = {
      bg: "Раздели",
      en: "Sections"
    };
    var galleryLabel = {
      bg: "Галерия",
      en: "Photograph gallery"
    };
    var prevLabel = {
      bg: "Предишна снимка",
      en: "Previous photograph"
    };
    var nextLabel = {
      bg: "Следваща снимка",
      en: "Next photograph"
    };

    function setLang(lang) {
      var next = lang === "en" ? "en" : "bg";
      html.lang = next;
      html.setAttribute("data-lang", next);
      document.title = titled[next];
      langButtons.forEach(function (button) {
        button.setAttribute("aria-pressed", button.getAttribute("data-lang") === next ? "true" : "false");
      });
      document.querySelectorAll("[data-alt-bg]").forEach(function (img) {
        var alt = img.getAttribute(next === "en" ? "data-alt-en" : "data-alt-bg");
        if (alt) img.setAttribute("alt", alt);
      });
      var gallery = document.querySelector("[data-gallery]");
      if (gallery) gallery.setAttribute("aria-label", galleryLabel[next]);
      var prev = document.querySelector("[data-gallery-prev]");
      var nextBtn = document.querySelector("[data-gallery-next]");
      if (prev) prev.setAttribute("aria-label", prevLabel[next]);
      if (nextBtn) nextBtn.setAttribute("aria-label", nextLabel[next]);
      var nav = document.querySelector(".site-nav");
      if (nav) nav.setAttribute("aria-label", navLabel[next]);
      try {
        localStorage.setItem(storageKey, next);
      } catch (err) {
        /* ignore */
      }
    }

    langButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        setLang(button.getAttribute("data-lang"));
      });
    });

    var saved = null;
    try {
      saved = localStorage.getItem(storageKey);
    } catch (err) {
      saved = null;
    }
    setLang(saved === "en" ? "en" : "bg");
  }

  function bindGallery() {
    if (galleryBound) return;
    var root = document.querySelector("[data-gallery]");
    if (!root) return;
    galleryBound = true;

    var slides = Array.prototype.slice.call(root.querySelectorAll("[data-slide]"));
    var prev = root.querySelector("[data-gallery-prev]");
    var next = root.querySelector("[data-gallery-next]");
    var dotsWrap = root.querySelector("[data-gallery-dots]");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var index = 0;
    var timer = null;
    var delay = 5500;

    function htmlLang() {
      return document.documentElement.getAttribute("data-lang") === "en" ? "en" : "bg";
    }

    function label(n) {
      return htmlLang() === "en" ? "Photograph " + n : "Снимка " + n;
    }

    function show(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (slide, n) {
        var on = n === index;
        slide.classList.toggle("is-active", on);
        slide.setAttribute("aria-hidden", on ? "false" : "true");
      });
      if (dotsWrap) {
        Array.prototype.forEach.call(dotsWrap.children, function (dot, n) {
          dot.setAttribute("aria-current", n === index ? "true" : "false");
        });
      }
    }

    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function start() {
      if (reduceMotion || slides.length < 2) return;
      stop();
      timer = setInterval(function () {
        show(index + 1);
      }, delay);
    }

    if (dotsWrap) {
      slides.forEach(function (_, n) {
        var button = document.createElement("button");
        button.type = "button";
        button.setAttribute("aria-label", label(n + 1));
        button.addEventListener("click", function () {
          show(n);
          start();
        });
        dotsWrap.appendChild(button);
      });
    }

    if (prev) {
      prev.addEventListener("click", function () {
        show(index - 1);
        start();
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        show(index + 1);
        start();
      });
    }

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);
    root.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        show(index - 1);
        start();
      }
      if (event.key === "ArrowRight") {
        show(index + 1);
        start();
      }
    });

    document.querySelectorAll("[data-lang]").forEach(function (button) {
      button.addEventListener("click", function () {
        if (!dotsWrap) return;
        Array.prototype.forEach.call(dotsWrap.children, function (dot, n) {
          dot.setAttribute("aria-label", label(n + 1));
        });
      });
    });

    show(0);
    start();
  }

  function boot() {
    bindLanguage();
    bindGallery();
  }

  document.addEventListener("site:ready", boot);
  boot();
})();
