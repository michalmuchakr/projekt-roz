$( document ).ready(function() {
  $('.friends-carousel').owlCarousel({
    items:4,
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    dots: false,
    responsive:{
      0:{
          items:1,
      },
      600:{
          items:3,
      },
      1000:{
          items:6
      }
  }
  });
});
