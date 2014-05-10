
jQuery(document).ready(function() {
  var onClick = function() {
    var contentWidth = jQuery('#content').width();
    jQuery('#content').css('width', contentWidth);
    jQuery('#container').bind('touchmove', function(e){e.preventDefault();});

    var current = jQuery("nav").css("margin-left"),
      val = "0%",
      layer = "block";
      opacity = 0.5,
      ham = -10;

    if(current === "0px") {
      val = "-70%";
      layer = "none";
      opacity = 0;
      ham = 0;
    } else {
      jQuery('#contentLayer').css('display', layer);
    }

    jQuery("nav").animate({"margin-left": [val, 'easeOutExpo']}, {
        duration: 700
    });

    jQuery('#hamburger').animate({"left": [ham, 'easeOutExpo']}, {
        duration: 700
    });

    jQuery("#contentLayer").animate({"opacity": [opacity, 'easeOutExpo']}, {
        duration: 700,
        complete: function() {
          jQuery('#contentLayer').css('display', layer);
        }
    });
  };

  jQuery("#hamburger").click(onClick);
  jQuery(".title").click(onClick);

  //close the menu
  jQuery("#contentLayer").click(function() {
      jQuery('#container').unbind('touchmove');
      jQuery("nav").animate({"margin-left": ["-70%", 'easeOutExpo']}, {
          duration: 700
      });
      jQuery("#contentLayer").animate({"opacity": [0, 'easeOutExpo']}, {
          duration: 700,
          complete: function() {
            jQuery('#contentLayer').css('display', 'none');
          }
      });
      jQuery('#hamburger').animate({"left": [0, 'easeOutExpo']}, {
          duration: 700
      });
  });
});
