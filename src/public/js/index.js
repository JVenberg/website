/*
Name: Jack Venberg
Date: 03.30.19
Section: CSE 154 TA

This is the index.js script for my "About Me" page.
*/

(function () {
  const TYPE_SPEED = 50;
  const NAV_HEIGHT = 70;
  const OFFSET = Math.sin(2 * Math.PI / 180) * window.innerWidth;
  const NAV_ANGLE = Math.sin(2 * Math.PI / 180) * Math.sin(88 * Math.PI / 180);

  /** Runs once the page has loaded to set up the image slideshow */
  window.addEventListener("load", function() {
    writeText($("intro-text").textContent, $("intro"), 0);

    if ('CSS' in window && CSS.supports('mix-blend-mode', 'difference') &&
        CSS.supports('clip-path', 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)')) {
      initializeScrollNav();
    } else {
      defaultNav();
    }
  });

  /**
   * Initializes default nav bar for "lesser" browsers.
   */
  function defaultNav() {
    $("nav-shadow").classList.remove("hidden");
    $("top-nav").classList.add("default-nav");
  }

  /**
   * Initializes scroll listener and updates background to maintain readablility
   * with given array of content sections.
   */
  function initializeScrollNav() {
    let sections = document.getElementsByClassName("content");
    updateNavBackground(sections);

    $("nav-background").classList.remove("hidden");
    $("nav-shadow").classList.remove("hidden");

    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateNavBackground(sections);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
  * Changes the color scheme of the nav bar when the nav bar crosses the card of
  * the page.
  * @param {array} sections - array of DOM elements.
  */
  function updateNavBackground(sections) {
    let intersect = false;
    for (let section of sections) {
      let box = section.getBoundingClientRect();

      let top = box.top - OFFSET;
      let bottom = box.bottom + OFFSET;
      if (top <= NAV_HEIGHT && bottom >= 0) {
        intersect = true;
        if (top >= -NAV_HEIGHT && top <= NAV_HEIGHT) {
          updateNavStyle(box.top + "px", "",
            Math.max(0, window.innerWidth - (NAV_HEIGHT - top) / NAV_ANGLE) + "px", "");
        } else if (box.bottom <= NAV_HEIGHT && box.bottom >= -NAV_HEIGHT) {
          updateNavStyle("", NAV_HEIGHT * 3 - bottom + "px",
            "", Math.max(0, window.innerWidth - (bottom - NAV_HEIGHT) / NAV_ANGLE) + "px");
        } else {
          updateNavStyle(-NAV_HEIGHT+ "px", "", "0", "");
        }
      }
    }
    if (intersect) {
      $("nav-background").style.display = "";
      $("nav-shadow").style.display = "";
    } else {
      $("nav-background").style.display = "none";
      $("nav-shadow").style.display = "none";
    }
  }


  /**
  * Updates nav style with given values.
  * @param {string} navTop - nav bar top style.
  * @param {string} navBottom - nav bar bottom style.
  * @param {string} shadowTop - shadow left style.
  * @param {string} shadowBottom - shadow right bottom style.
  */
  function updateNavStyle(navTop, navBottom, shadowLeft, shadowRight) {
    $("nav-background").style.top = navTop;
    $("nav-background").style.bottom = navBottom;
    $("nav-shadow").style.left = shadowLeft;
    $("nav-shadow").style.right = shadowRight;
  }

  /**
  * Writes text to page with delay to simulate typeing.
  * @param {string} text - text to write.
  * @param {object} element - DOM element to write to.
  * @param {number} index - index of text currently on.
  */
  function writeText(text, ele, index) {
    if (index < text.length) {
      ele.textContent += text.charAt(index);
      setTimeout(writeText, TYPE_SPEED, text, ele, index + 1);
    } else {
      $("cursor").classList.add("blinking-cursor");
    }
  }

  /**
   * Returns the elements that match the given query string.
   * @param {string} id - element query
   * @return {object} DOM object list associated with query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function $(id) {
    return document.getElementById(id);
  }
})();
