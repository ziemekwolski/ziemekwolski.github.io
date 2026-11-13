// Small progressive enhancements. The site works without this file.

// Mobile navigation toggle
document.querySelectorAll("[data-nav]").forEach(function (nav) {
  var toggle = nav.querySelector("[data-nav-toggle]");
  if (!toggle) return;

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("nav--open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("nav--open")) {
      nav.classList.remove("nav--open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });
});

// Insights category filter
document.querySelectorAll("[data-filter]").forEach(function (group) {
  var target = document.querySelector(group.getAttribute("data-filter"));
  if (!target) return;
  var cards = target.querySelectorAll("[data-category]");
  var chips = group.querySelectorAll("[data-category-filter]");

  group.hidden = false;

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var value = chip.getAttribute("data-category-filter");
      chips.forEach(function (c) {
        c.setAttribute("aria-pressed", String(c === chip));
      });
      cards.forEach(function (card) {
        card.hidden = value !== "all" && card.getAttribute("data-category") !== value;
      });
    });
  });
});

// Spam-resistant email links (see _includes/email.html)
document.querySelectorAll("[data-email-user]").forEach(function (el) {
  function rev(s) { return s.split("").reverse().join(""); }
  var address = rev(el.getAttribute("data-email-user")) + "@" + rev(el.getAttribute("data-email-domain"));
  var link = document.createElement("a");
  link.href = ["ma", "il", "to:"].join("") + address;
  link.textContent = address;
  el.replaceWith(link);
});

// Disqus comments: load only on request (see _includes/comments.html)
document.querySelectorAll("[data-disqus-gate]").forEach(function (gate) {
  var button = gate.querySelector("[data-disqus-load]");
  gate.hidden = false;

  button.addEventListener("click", function () {
    window.disqus_config = function () {
      this.page.url = gate.getAttribute("data-disqus-url");
      this.page.identifier = gate.getAttribute("data-disqus-identifier");
    };
    var script = document.createElement("script");
    script.src = "https://" + gate.getAttribute("data-disqus-shortname") + ".disqus.com/embed.js";
    script.setAttribute("data-timestamp", String(Date.now()));
    document.body.appendChild(script);
    gate.remove();
  });
});
