(function (global) {
  var NAV = [
    { id: "about", bg: "За мен", en: "About" },
    { id: "dialogues", bg: "Диалози", en: "Dialogues" },
    { id: "literary-essays", bg: "Литературни есета", en: "Literary Essays" },
    { id: "love-on-boogie-street", bg: "Любов на Boogie Street", en: "Love on Boogie Street" },
    { id: "erotic-memories", bg: "Еротични спомени", en: "Erotic Memories" },
    { id: "now-and-after", bg: "Сега и после", en: "Now and After" },
    { id: "in-the-past", bg: "Минало", en: "In the Past" },
    { id: "gallery", bg: "Галерия", en: "Gallery" },
    { id: "contact", bg: "Контакт", en: "Contact" }
  ];

  function inPages() {
    return /(?:^|\/)pages(?:\/|$)/.test(location.pathname);
  }

  function pageHref(id) {
    if (id === "about") {
      return inPages() ? "../index.html" : "index.html";
    }
    return inPages() ? id + ".html" : "pages/" + id + ".html";
  }

  function currentId() {
    var file = location.pathname.split("/").pop() || "index.html";
    if (!file || file === "index.html") return "about";
    return file.replace(/\.html$/, "");
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
                '<span class="lang-bg">До Саутхамптън през Айова</span>' +
                '<span class="lang-en">To Southampton via Iowa</span>' +
              "</a>" +
            "</" + titleTag + ">" +
            '<p class="site-kicker">' +
              '<span class="lang-bg">Страници за хора, книги и места</span>' +
              '<span class="lang-en">Pages for people, books, and places</span>' +
            "</p>" +
          "</div>" +
          '<div class="lang-switch" role="group" aria-label="Language">' +
            '<button type="button" data-lang="bg" aria-pressed="true">Български</button>' +
            '<button type="button" data-lang="en" aria-pressed="false">English</button>' +
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

  customElements.define("site-header", SiteHeader);
  customElements.define("site-nav", SiteNav);
  customElements.define("site-footer", SiteFooter);
  customElements.define("site-shell", SiteShell);
})(window);
