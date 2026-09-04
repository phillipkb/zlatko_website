(function (global) {
  var NAV = [
    { id: "about", bg: "За мен", en: "About" },
    { id: "dialogues", bg: "Диалози", en: "Dialogues" },
    { id: "literary-essays", bg: "Литературни есета", en: "Literary Essays" },
    { id: "love-on-boogie-street", bg: "Любов на Boogie Street", en: "Love on Boogie Street" },
    { id: "erotic-memories", bg: "Еротични спомени", en: "Erotic Memories" },
    { id: "now-and-after", bg: "Сега и после", en: "Now and After" },
    { id: "in-the-past", bg: "Минало", en: "In the Past" },
    // { id: "gallery", bg: "Галерия", en: "Gallery" },
    { id: "archives", bg: "Архив", en: "Archive" },
    { id: "contact", bg: "Контакт", en: "Contact" }
  ];

  function pagesDepth() {
    var path = location.pathname.replace(/\\/g, "/");
    var marker = "/pages/";
    var i = path.indexOf(marker);
    if (i < 0) return 0;
    var rest = path.slice(i + marker.length).replace(/\/+$/, "");
    if (!rest) return 1;
    return rest.split("/").length;
  }

  function inPages() {
    return pagesDepth() > 0;
  }

  function relToSiteRoot() {
    var depth = pagesDepth();
    return depth === 0 ? "" : "../".repeat(depth);
  }

  function relToPagesRoot() {
    var depth = pagesDepth();
    if (depth <= 1) return "";
    return "../".repeat(depth - 1);
  }

  function pageHref(id) {
    if (id === "about") {
      return relToSiteRoot() + "index.html";
    }
    if (pagesDepth() === 0) return "pages/" + id + ".html";
    return relToPagesRoot() + id + ".html";
  }

  function currentId() {
    var path = location.pathname.replace(/\\/g, "/");
    var i = path.indexOf("/pages/");
    if (i < 0) return "about";
    var first = path.slice(i + "/pages/".length).split("/")[0] || "";
    return first.replace(/\.html$/, "") || "about";
  }

  var TOC_SECTIONS = {
    "erotic-memories": {
      firstId: "knigata",
      firstHref: "erotic-memories.html",
      items: [
        { id: "knigata", bg: "Книгата", en: "The book" },
        { id: "recenzii", bg: "Рецензии", en: "Reviews" },
        { id: "komentari", bg: "Коментари", en: "Comments" },
        { id: "saobshteniya", bg: "Съобщения", en: "Notices" },
        { id: "mrezha", bg: "Мрежа", en: "Network" }
      ]
    },
    "now-and-after": {
      firstId: "prousts-questionnaire",
      firstHref: "now-and-after.html",
      items: [
        { id: "prousts-questionnaire", bg: "Въпросника на Пруст", en: "Proust’s Questionnaire" },
        { id: "people", bg: "Хора", en: "People" },
        { id: "books", bg: "Книги", en: "Books" },
        { id: "places", bg: "Места", en: "Places" },
        { id: "my-recommendations", bg: "Препоръчано от мен", en: "My Recommendations" }
      ]
    },
    "in-the-past": {
      firstId: "anatomy",
      firstHref: "in-the-past.html",
      items: [
        { id: "anatomy", bg: "Анатомия", en: "Anatomy" },
        { id: "biology", bg: "Биология", en: "Biology" },
        { id: "microbiology", bg: "Микробиология", en: "Microbiology" },
        { id: "the-memoir", bg: "Мемоар", en: "The Memoir" },
        { id: "translations", bg: "Преводи", en: "Translations" }
      ]
    },
    "gallery": {
      firstId: "albums",
      firstHref: "gallery.html",
      items: [
        { id: "albums", bg: "Албуми", en: "Albums" },
        { id: "hawaii", bg: "Хавай", en: "Hawaii" },
        { id: "berlin", bg: "Берлин", en: "Berlin" },
        { id: "japan", bg: "Япония", en: "Japan" },
        { id: "andalusia", bg: "Андалузия", en: "Andalusia" },
        { id: "san-sebastian", bg: "Сан Себастиян", en: "San Sebastian" },
        { id: "shipka", bg: "Шипка", en: "Shipka" },
        { id: "sofia-maya-t", bg: "София – Мая Т.", en: "Sofia - Maya T." },
        { id: "aruba", bg: "Аруба", en: "Aruba" },
        { id: "san-sebastian-article", bg: "Сан Себастиян – репортаж", en: "San Sebastian - article" },
        { id: "amsterdam", bg: "Амстердам", en: "Amsterdam" }
      ]
    }
  };

  function detectTocSection() {
    var path = location.pathname.replace(/\\/g, "/");
    if (path.indexOf("erotic-memories") !== -1) return "erotic-memories";
    if (path.indexOf("now-and-after") !== -1) return "now-and-after";
    if (path.indexOf("in-the-past") !== -1) return "in-the-past";
    if (path.indexOf("gallery") !== -1) return "gallery";
    if (path.indexOf("archives") !== -1) return "archives";
    return "";
  }

  function currentTocEntry(section) {
    var spec = TOC_SECTIONS[section];
    if (!spec) return "";
    var path = location.pathname.replace(/\\/g, "/");
    var nested = path.match(new RegExp("/" + section + "/([^/]+)\\.html$"));
    if (nested) return nested[1];
    return spec.firstId;
  }

  function tocEntryHref(section, id) {
    var spec = TOC_SECTIONS[section];
    var path = location.pathname.replace(/\\/g, "/");
    var inFolder = new RegExp("/" + section + "/").test(path);
    if (id === spec.firstId) {
      return inFolder ? "../" + spec.firstHref : spec.firstHref;
    }
    return inFolder ? id + ".html" : section + "/" + id + ".html";
  }

  global.Site = {
    nav: NAV,
    inPages: inPages,
    pageHref: pageHref,
    currentId: currentId
  };

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      if (this._ready) return;
      this._ready = true;
      var home = this.hasAttribute("home");
      var titleTag = home ? "h1" : "p";
      var href = pageHref("about");
      var flags = relToSiteRoot() + "assets/img/";
      this.innerHTML =
        '<header class="site-header">' +
          '<div class="brand">' +
            '<p class="site-author">' +
              '<a href="' + href + '">' +
                '<span class="lang-bg">Златко Ангелов</span>' +
                '<span class="lang-en">Zlatko Anguelov</span>' +
              "</a>" +
            "</p>" +
            "<" + titleTag + ' class="site-title">' +
              '<a href="' + href + '">' +
                '<span class="lang-bg">Bulgaria-Canada-USA-UK-Spain</span>' +
                '<span class="lang-en">Bulgaria-Canada-USA-UK-Spain</span>' +
              "</a>" +
            "</" + titleTag + ">" +
            '<p class="site-kicker">' +
              '<span class="lang-bg">Страници за хора, книги и места</span>' +
              '<span class="lang-en">Pages for people, books, and places</span>' +
            "</p>" +
          "</div>" +
          '<div class="lang-switch" role="group" aria-label="Language">' +
            '<button type="button" data-lang="bg" aria-pressed="true" aria-label="Български" title="Български">' +
              '<img src="' + flags + 'flag_bg.jpg" alt="" width="35" height="22">' +
            "</button>" +
            '<button type="button" data-lang="en" aria-pressed="false" aria-label="English" title="English">' +
              '<img src="' + flags + 'flag_en.jpg" alt="" width="35" height="22">' +
            "</button>" +
          "</div>" +
        "</header>";
    }
  }

  class SiteNav extends HTMLElement {
    connectedCallback() {
      if (this._ready) return;
      this._ready = true;
      var current = currentId();
      var items = NAV.map(function (item) {
        var currentAttr = item.id === current ? ' aria-current="page"' : "";
        return (
          "<li>" +
            '<a href="' + pageHref(item.id) + '"' + currentAttr + ">" +
              '<span class="lang-bg">' + item.bg + "</span>" +
              '<span class="lang-en">' + item.en + "</span>" +
            "</a>" +
          "</li>"
        );
      }).join("");
      this.innerHTML =
        '<nav class="site-nav" aria-label="Раздели">' +
          "<ul>" + items + "</ul>" +
        "</nav>";
    }
  }

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      if (this._ready) return;
      this._ready = true;
      this.innerHTML =
        '<footer class="site-footer">' +
          "<span>antipropaganda.net</span>" +
          "<span>" +
            '<span class="lang-bg">Златко Ангелов</span>' +
            '<span class="lang-en">Zlatko Anguelov</span>' +
          "</span>" +
        "</footer>";
    }
  }

  class BookToc extends HTMLElement {
    connectedCallback() {
      if (this._ready) return;
      this._ready = true;
      var section = this.getAttribute("section") || detectTocSection();
      var spec = TOC_SECTIONS[section];
      if (!spec) return;
      var current = this.getAttribute("current") || currentTocEntry(section);
      var items = spec.items.map(function (item) {
        var currentAttr = item.id === current ? ' aria-current="page"' : "";
        return (
          "<li>" +
            '<a href="' + tocEntryHref(section, item.id) + '"' + currentAttr + ">" +
              '<span class="lang-bg">' + item.bg + "</span>" +
              '<span class="lang-en">' + item.en + "</span>" +
            "</a>" +
          "</li>"
        );
      }).join("");
      this.innerHTML =
        '<nav class="book-toc" aria-label="Съдържание">' +
          "<h2>" +
            '<span class="lang-bg">Съдържание</span>' +
            '<span class="lang-en">Contents</span>' +
          "</h2>" +
          "<ol>" + items + "</ol>" +
        "</nav>";
    }
  }

  class SiteShell extends HTMLElement {
    connectedCallback() {
      if (this._ready) return;
      this._ready = true;
      var home = this.hasAttribute("home");
      var children = Array.prototype.slice.call(this.childNodes);
      this.innerHTML =
        '<a class="skip-link" href="#content">' +
          '<span class="lang-bg">Към съдържанието</span>' +
          '<span class="lang-en">Skip to content</span>' +
        "</a>" +
        "<site-header" + (home ? " home" : "") + "></site-header>" +
        "<site-nav></site-nav>" +
        '<main id="content" class="site-main"></main>' +
        "<site-footer></site-footer>";
      var main = this.querySelector("main");
      children.forEach(function (node) {
        main.appendChild(node);
      });
      this.dispatchEvent(new Event("site:ready", { bubbles: true }));
    }
  }

  var MONTHS = {
    bg: {
      "01": "Януари",
      "02": "Февруари",
      "03": "Март",
      "04": "Април",
      "05": "Май",
      "06": "Юни",
      "07": "Юли",
      "08": "Август",
      "09": "Септември",
      "10": "Октомври",
      "11": "Ноември",
      "12": "Декември"
    },
    en: {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      "10": "October",
      "11": "November",
      "12": "December"
    }
  };

  function detectArchiveCurrent() {
    var path = location.pathname.replace(/\\/g, "/");
    var match = path.match(/\/archives\/(\d{4})\/(\d{2})\/([^/]+)\.html$/);
    return match ? match[1] + "/" + match[2] + "/" + match[3] : "";
  }

  function archiveDocHref(year, month, slug) {
    return relToPagesRoot() + "archives/" + year + "/" + month + "/" + slug + ".html";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function groupArchiveItems(items) {
    var years = [];
    var byYear = {};
    (items || []).forEach(function (item) {
      var yearGroup = byYear[item.year];
      if (!yearGroup) {
        yearGroup = { year: item.year, months: [], byMonth: {} };
        byYear[item.year] = yearGroup;
        years.push(yearGroup);
      }
      var monthGroup = yearGroup.byMonth[item.month];
      if (!monthGroup) {
        monthGroup = { month: item.month, docs: [] };
        yearGroup.byMonth[item.month] = monthGroup;
        yearGroup.months.push(monthGroup);
      }
      monthGroup.docs.push(item);
    });
    return years;
  }

  function renderArchiveTree(items, current, lang) {
    var monthsMap = MONTHS[lang] || MONTHS.bg;
    return groupArchiveItems(items).map(function (yearGroup) {
      var months = yearGroup.months.map(function (monthGroup) {
        var docs = monthGroup.docs.map(function (item) {
          var key = item.year + "/" + item.month + "/" + item.slug;
          var currentAttr = key === current ? ' aria-current="page"' : "";
          return (
            "<li>" +
              '<a href="' + archiveDocHref(item.year, item.month, item.slug) + '"' + currentAttr + ">" +
                escapeHtml(item.title) +
              "</a>" +
            "</li>"
          );
        }).join("");
        return (
          '<li class="archive-month">' +
            '<p class="archive-month-label">' + (monthsMap[monthGroup.month] || monthGroup.month) + "</p>" +
            '<ol class="archive-docs">' + docs + "</ol>" +
          "</li>"
        );
      }).join("");
      return (
        '<li class="archive-year">' +
          '<p class="archive-year-label">' + yearGroup.year + "</p>" +
          "<ol>" + months + "</ol>" +
        "</li>"
      );
    }).join("");
  }

  class ArchiveNav extends HTMLElement {
    connectedCallback() {
      if (this._ready) return;
      this._ready = true;
      var index = global.ArchiveIndex || { bg: [], en: [] };
      var current = this.getAttribute("current") || detectArchiveCurrent();
      var layout = this.getAttribute("layout") || (this.tagName.toLowerCase() === "archive-index" ? "page" : "toc");
      var bgTree = renderArchiveTree(index.bg, current, "bg");
      var enTree = renderArchiveTree(index.en, current, "en");
      if (layout === "page") {
        this.innerHTML =
          '<div class="lang-bg"><ol class="archive-index">' + bgTree + "</ol></div>" +
          '<div class="lang-en"><ol class="archive-index">' + enTree + "</ol></div>";
        return;
      }
      this.innerHTML =
        '<nav class="archive-toc" aria-label="Съдържание">' +
          "<h2>" +
            '<span class="lang-bg">Съдържание</span>' +
            '<span class="lang-en">Contents</span>' +
          "</h2>" +
          '<div class="lang-bg"><ol>' + bgTree + "</ol></div>" +
          '<div class="lang-en"><ol>' + enTree + "</ol></div>" +
        "</nav>";
    }
  }

  class ArchiveToc extends ArchiveNav {}
  class ArchiveIndex extends ArchiveNav {}

  customElements.define("site-header", SiteHeader);
  customElements.define("site-nav", SiteNav);
  customElements.define("site-footer", SiteFooter);
  customElements.define("book-toc", BookToc);
  customElements.define("archive-nav", ArchiveNav);
  customElements.define("archive-toc", ArchiveToc);
  customElements.define("archive-index", ArchiveIndex);
  customElements.define("site-shell", SiteShell);
})(window);
