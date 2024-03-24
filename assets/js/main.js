/* global jQuery */

/* global window */
(function ($) {
  var COMMON = {
    init: function init() {
      this.cacheDOM();
      $(window).on('resize', this.reCalcOnResize.bind(this));
    },
    cacheDOM: function cacheDOM() {
      this.$body = $('body');
      this.windowWidth = $(window).width();
    },
    reCalcOnResize: function reCalcOnResize() {
      this.windowWidth = $(window).width();
    }
  };
  var mainNavigation = {
    init: function init() {
      this.$mainNavContainer = $('#site-navigation');
      this.$menuToggler = this.$mainNavContainer.find('.menu-toggle');
      this.$mainMenuContainer = this.$mainNavContainer.find('.menu-primary-container');
      this.$mainMenu = this.$mainNavContainer.find('#primary-menu');
      this.$menuToggler.on('click', this.toggleMenu.bind(this));
    },
    toggleMenu: function toggleMenu(e) {
      e.preventDefault();
      this.$mainMenuContainer.toggleClass('shown');
    }
  };
  $(function () {
    COMMON.init();
    mainNavigation.init();
  });
})(jQuery);