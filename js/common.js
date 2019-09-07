$(document).ready(function () {
  (function () {
    const commonController = {
      dropDown: $('.dropdown-menu'),
      friendsCarousel: $('.friends-carousel'),
      navigation: $('.navbar'),
      slideItem: $(".slide-item"),
      html: $('html'),

      sectionsIdsArray: ['our-activity', 'friends'],
      sectionsTopPositionArray: [],

      topPosition: 0,
      sectionOffsetTop: 30,
      navStaticOffsetTop: Math.floor($('.navbar').offset().top),

      initCarousel: function () {
        this.friendsCarousel.owlCarousel({
          items: 4,
          loop: true,
          margin: 10,
          autoplay: true,
          autoplayTimeout: 3000,
          autoplayHoverPause: true,
          dots: false,
          responsive: {
            0: {
              items: 1,
            },
            600: {
              items: 3,
            },
            1000: {
              items: 6
            }
          }
        });
      },

      changeNavPosition() {
        this.navigation.toggleClass('fixed-position', this.topPosition > this.navStaticOffsetTop);
        this.slideItem.not('.bottom').toggleClass('to-top', this.topPosition > this.navStaticOffsetTop);
      },

      bindScerollEvent: function () {
        const that = this;
        $(window).on('scroll', function () {
          that.proccedScrollPositionCalculation();
        });
      },

      proccedScrollPositionCalculation: function () {
        this.topPosition = this.html.scrollTop();
        this.changeNavPosition();
      },

      getSectionPositions: function () {
        const tempArr = [0];
        this.sectionsIdsArray.forEach(function (sectionItem) {
          const tempSection = $("section#" + sectionItem);
          if (tempSection.length) {
            tempArr.push(Math.floor($("section#" + sectionItem).offset().top));
          }
        });
        this.sectionsTopPositionArray = tempArr;
      },

      scrollToSection: function () {
        const that = this;
        this.slideItem.on('click', function (e) {
          if ($(e.target).hasClass('bottom')) {
            that.manageScrollDown();
          } else {
            that.manageScrollUp();
          }
        })
      },

      manageScrollDown: function () {
        const that = this;
        for (let i = 0; i < that.sectionsTopPositionArray.length; i++) {
          if (that.topPosition < that.sectionsTopPositionArray[i] - that.sectionOffsetTop) {
            const destinyposition = that.sectionsTopPositionArray[i] - that.sectionOffsetTop;
            that.slideToSection(destinyposition);
            break;
          }
        }
      },

      manageScrollUp: function () {
        const that = this;
        for (let i = that.sectionsTopPositionArray.length - 1; i >= 0; i--) {
          if (that.topPosition > that.sectionsTopPositionArray[i] - that.sectionOffsetTop) {
            const destinyposition = that.sectionsTopPositionArray[i] - that.sectionOffsetTop;
            that.slideToSection(destinyposition);
            break;
          }
        }
      },

      slideToSection: function (posY) {
        window.scroll({
          top: posY,
          behavior: 'smooth'
        });
      },


      bindRwdDropdownToggle: function () {
        this.dropDown.on('click', function (e) {
          $(e).toggleClass('expanded');
        })
      },

      init: function () {
        this.initCarousel();
        this.getSectionPositions();
        this.bindScerollEvent();
        this.proccedScrollPositionCalculation();
        this.scrollToSection();
        this.bindRwdDropdownToggle();
      }
    }
    commonController.init();
  })();
});

$(window).on("load", function () {
  $('.loader').addClass('loaded');
});
