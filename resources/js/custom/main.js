/* global jQuery */
/* global window */
(($) => {
	const COMMON = {
		init() {
			this.cacheDOM();

			$(window).on('resize', this.reCalcOnResize.bind(this));
		},
		cacheDOM() {
			this.$body = $('body');
			this.windowWidth = $(window).width();
		},
		reCalcOnResize() {
			this.windowWidth = $(window).width();
		},
	};

	const mainNavigation = {
		init() {
			this.$mainNavContainer = $('#site-navigation');
			this.$menuToggler = this.$mainNavContainer.find('.menu-toggle');
			this.$mainMenuContainer = this.$mainNavContainer.find('.menu-primary-container');
			this.$mainMenu = this.$mainNavContainer.find('#primary-menu');
			this.$menuToggler.on('click', this.toggleMenu.bind(this));
		},
		toggleMenu(e) {
			e.preventDefault();
			this.$mainMenuContainer.toggleClass('shown');
		},
	};

	$(() => {
		COMMON.init();
		mainNavigation.init();
	});
})(jQuery);
