$(document).ready(function () {

  var all_lb_items = '';

  /*
   ---------------- Show ligthbox on mouse click on lb-item
   */

  $('.lb-item').on('click', function () {
    var current_item = $(this);
    all_lb_items = $(this).parent().find('.lb-item');
    var current_item_index = find_index_in_array(all_lb_items, current_item[0]);
    var content = $(this).html();
    var overlay = $('.lb-background');

    overlay.find('.lb-wrapper').append('<div class="lb-content" data-index="' + current_item_index + '">' + content + '</div>');
    overlay.fadeIn({
      duration: 300,
      start: function () {
        if ($(this).css('display') == 'block') $(this).css('display', 'flex');
      }
    });

    if (current_item_index < all_lb_items.length -1) {
      $('.icon-prev').show();
      $('.icon-next').show();
    }
    if (current_item_index == 0) {
      $('.icon-prev').hide();
    }
    if (current_item_index == all_lb_items.length -1) {
      $('.icon-next').hide();
    }
  });

  /*
   ------------------ Hide ligthbox on mouse click outside of lb-wrapper
   */

  $('.lb-background').on('click', function(e) {
    if (e.target.class != 'lb-wrapper' && !$('.lb-wrapper').find(e.target).length) {
      $('.lb-background').fadeOut(300);
      setTimeout(function () {
        $('.lb-content').remove();
      }, 400);
    }
  });

  /*
   -------------------Show next item on click icon-next
   */

  $('.icon-next').on('click', function () {
    $('.icon-prev').show();
    var lb_content = $('.lb-content');
    var next_index = lb_content.data('index') + 1;
    if (next_index < all_lb_items.length) {
      $(this).show();
      var new_item = all_lb_items.eq(next_index);
      lb_content.html(new_item.html()).data('index', next_index);
      if (next_index == all_lb_items.length - 1) {
        $(this).hide();
      }
    } else {
      $(this).hide();
    }
  });

  /*
   ----------------------Show prev item on click icon-prev
   */

  $('.icon-prev').on('click', function () {
    $('.icon-next').show();
    var lb_content = $('.lb-content');
    var prev_index = lb_content.data('index') - 1;
    if (prev_index >= 0) {
      $(this).show();
      var new_item = all_lb_items.eq(prev_index);
      lb_content.html(new_item.html()).data('index', prev_index);
      if (prev_index == 0) {
        $(this).hide();
      }
    } else {
      $(this).hide();
    }
  });

  /*
   -----------------------Find index of object in array of objects
   */

  function find_index_in_array(data, value) {
    for(var i = 0, l = data.length ; i < l ; i++) {
      if(data[i] === value) {
        return i;
      }
    }
    return -1;
  }
});