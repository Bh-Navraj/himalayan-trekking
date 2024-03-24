$("#trending-packages-cart-wrapper").owlCarousel({
  loop: true,
  margin: 30,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,
  nav: true,
  dots: false,
  items: 3.3,
  navText: [
    "<i class='fa-solid fa-circle-chevron-left'></i>",
    "<i class='fa-solid fa-circle-chevron-right'></i>",
  ],
  responsive: {
    0: {
      items: 1,
      nav: false,
      dots: true,
    },
    567: {
      items: 2,
      nav: true,
    },
    991: {
      items: 3,
      nav: true,
    },
  },
});
$("#traveller-voice-cart-wrapper").owlCarousel({
  loop: true,
  margin: 30,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,

  nav: true,
  dots: false,
  items: 3.3,
  navText: [
    "<i class='fa-solid fa-circle-chevron-left'></i>",
    "<i class='fa-solid fa-circle-chevron-right'></i>",
  ],
  responsive: {
    0: {
      items: 1,
      nav: false,
      dots: true,
    },
    567: {
      items: 2,
      nav: true,
    },
    1500: {
      items: 3,
      nav: true,
    },
  },
});
$("#review-cart-cart-wrapper").owlCarousel({
  loop: true,
  margin: 30,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,

  nav: false,
  dots: true,
  items: 2,
  responsive: {
    0: {
      items: 1,
    },
    556:{
      items:2
    }
  },
});

