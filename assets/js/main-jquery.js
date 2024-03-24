(function ($) {
  this.MobileNav = function () {
    this.curItem,
      (this.curLevel = 0),
      (this.transitionEnd = _getTransitionEndEventName());

    var defaults = {
      initElem: ".main-menu",
      menuTitle: "Menu",
    };

    // Check if MobileNav was initialized with some options and assign them to the "defaults"
    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = extendDefaults(defaults, arguments[0]);
    }

    // Add to the "defaults" ONLY if the key is already in the "defaults"
    function extendDefaults(source, extender) {
      for (option in extender) {
        if (source.hasOwnProperty(option)) {
          source[option] = extender[option];
        }
      }
    }

    MobileNav.prototype.getCurrentItem = function () {
      return this.curItem;
    };

    MobileNav.prototype.setMenuTitle = function (title) {
      defaults.menuTitle = title;
      _updateMenuTitle(this);
      return title;
    };

    // Init is an anonymous IIFE
    (function (MobileNav) {
      var initElem = $(defaults.initElem).length ? $(defaults.initElem) : false;

      if (initElem) {
        defaults.initElem = initElem;
        _clickHandlers(MobileNav);
        _updateMenuTitle(MobileNav);
      } else {
        console.log(
          defaults.initElem + " element doesn't exist, menu not initialized."
        );
      }
    })(this);

    function _getTransitionEndEventName() {
      var i,
        undefined,
        el = document.createElement("div"),
        transitions = {
          transition: "transitionend",
          OTransition: "otransitionend", // oTransitionEnd in very old Opera
          MozTransition: "transitionend",
          WebkitTransition: "webkitTransitionEnd",
        };

      for (i in transitions) {
        if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
          return transitions[i];
        }
      }
    }

    function _clickHandlers(menu) {
      defaults.initElem.on("click", ".nav-more-option", function (e) {
        e.preventDefault();
        menu.curItem = $(this).parent();
        _updateActiveMenu(menu);
      });

      defaults.initElem.on("click", ".nav-toggle", function () {
        _updateActiveMenu(menu, "back");
      });
    }

    // TODO: Make this DRY (deal with waiting for transitionend event)
    function _updateActiveMenu(menu, direction) {
      // Get the device pixel ratio
      var devicePixelRatio = window.devicePixelRatio || 1;

      // Get the viewport dimensions in CSS pixels
      var viewportWidth = window.innerWidth;
      var viewportHeight = window.innerHeight;

      // Calculate the dimensions in JavaScript pixels
      var screenWidth = viewportWidth * devicePixelRatio;
      var screenHeight = viewportHeight * devicePixelRatio;

      if (screenWidth < 1199) {
        _slideMenu(menu, direction);
      }
      if (direction === "back") {
        /*defaults.initElem.children('ul').one(menu.transitionEnd, function(e) {
                                    menu.curItem.removeClass('nav-dropdown-open nav-dropdown-active');
                                    menu.curItem = menu.curItem.parent().closest('li');
                                    menu.curItem.addClass('nav-dropdown-open nav-dropdown-active');
                                    _updateMenuTitle(menu);
                            });*/

        menu.curItem.removeClass("nav-dropdown-open nav-dropdown-active");
        menu.curItem = menu.curItem.parent().closest("li");
        menu.curItem.addClass("nav-dropdown-open nav-dropdown-active");
        _updateMenuTitle(menu);
      } else {
        menu.curItem.addClass("nav-dropdown-open nav-dropdown-active");
        _updateMenuTitle(menu);
      }
    }

    // Update main menu title to be the text of the clicked menu item
    function _updateMenuTitle(menu) {
      var title = defaults.menuTitle;
      if (menu.curLevel > 0) {
        title = menu.curItem.children("a").text();
        defaults.initElem.find(".nav-toggle").addClass("back-visible");
      } else {
        defaults.initElem.find(".nav-toggle").removeClass("back-visible");
      }
      $(".nav-title").text(title);
    }

    // Slide the main menu based on current menu depth
    function _slideMenu(menu, direction) {
      if (direction === "back") {
        menu.curLevel = menu.curLevel > 0 ? menu.curLevel - 1 : 0;
      } else {
        menu.curLevel += 1;
      }
      defaults.initElem.children("ul").css({
        transform: "translateX(-" + menu.curLevel * 100 + "%)",
      });
    }
  };
})(jQuery);

$(document).ready(function () {
  var MobileMenu = new MobileNav({
    initElem: "nav",
    menuTitle: "Menu",
  });

  $(".menu-burger").on("click", function (e) {
    e.preventDefault();

    $(".nav-wrapper").toggleClass("show-menu");
  });
  $(".search-switch").on("click", function () {
    $(".search-form").toggleClass("active");
  });

  $(window).on("scroll", function () {
    var scrollTop = $(window).scrollTop();

    if (scrollTop == 0) {
      $(".header-wrapper").removeClass("scrolled");
      $(".header-wrapper-main").removeClass("scrolled-main");
    } else {
      $(".header-wrapper").addClass("scrolled");
      $(".header-wrapper-main").addClass("scrolled-main");
    }
    // if ($("section").hasClass(".detail-full-trip-wrap")) {

    var tripSections = $(".trip-section");
    var detailWrapper = $(".detail-full-trip");
    var windowHeight = $(window).height();
    var windowScroll = $(window).scrollTop();
    // var wrapperOffset = detailWrapper.offset();
    var wrapperOffset = detailWrapper.offset().top;
    var wrapperHeight = detailWrapper.outerHeight();
    var detailVisiblePercent =
      ((windowHeight - (wrapperOffset - windowScroll)) / wrapperHeight) * 100;

    tripSections.each(function () {
      var section = $(this);
      var sectionOffset = section.offset().top;
      var sectionHeight = section.outerHeight();
      var windowHeight = $(window).height();
      var windowScroll = $(window).scrollTop();
      var visiblePercent =
        ((windowHeight - (sectionOffset - windowScroll)) / sectionHeight) * 100;

      if (visiblePercent >= 50) {
        $(".trip-nav-single").removeClass("active");
        $(".trip-section").removeClass("active");

        // console.log(visiblePercent);

        section.addClass("active");
        $(
          "#" + $($(".trip-section.active").last()).attr("id") + "-switch"
        ).addClass("active");
      } else {
        section.removeClass("active");
      }
    });

    if (detailVisiblePercent > 8 && detailVisiblePercent < 105) {
      $(".detail-trip-nav-wrapper").addClass("active");
    } else {
      $(".detail-trip-nav-wrapper").removeClass("active");
    }
    // }
  });
  $(document).on("click", ".trip-nav-single", function (e) {
    e.preventDefault();
    var topOffset = $($(this).attr("href")).offset().top;
    var scrollOffset = topOffset - 135;
    $("html, body").animate(
      {
        scrollTop: scrollOffset,
      },
      500
    );
  });
  $("[data-fancybox]").fancybox({
    // Options will go here
    buttons: ["close"],
    wheel: false,
    transitionEffect: "slide",
    // thumbs          : false,
    // hash            : false,
    loop: true,
    // keyboard        : true,
    toolbar: true,
    // animationEffect : false,
    // arrows          : true,
    clickContent: false,
  });
  $(document).on("click", ".banner-detail .play-button i", function (e) {
    e.preventDefault();
    $(this).toggleClass("fa-circle-play fa-circle-pause");
    if ($(this).hasClass("fa-circle-pause")) {
      $(".banner-wrapper video").removeClass("d-none");
      $(".banner-wrapper video").trigger("play");
    } else {
      // $(".banner-wrapper video").addClass("d-none");
      $(".banner-wrapper video").trigger("pause");
    }
  });
  $(document).on("click", ".lang-select", function () {
    var theLang = $(this).attr("data-id");

    window.location.replace(
      window.location.origin + window.location.pathname + theLang
    );
    location.reload();
  });
  $(document).on("click, mouseover", ".review-star-form .fa-star", function () {
    $(".review-star-form .fa-star").removeClass("fas");
    $(".review-star-form .fa-star").addClass("far");
    $(".review-rating-edit").text($(this).attr("star-id") + ".0");
    for (var i = 1; i <= $(this).attr("star-id"); i++) {
      $(".review-star-form li:nth-child(" + i + ") .fa-star").removeClass(
        "far"
      );
      $(".review-star-form li:nth-child(" + i + ") .fa-star").addClass("fas");
    }
  });
  $(document).on("click",".write-review-btn",function(){
$(".overall-review").addClass("collapse");
$(".review-form").addClass("active");
  });
 
});
Fancybox.bind("[data-fancybox]", {
  // Your custom options
});
