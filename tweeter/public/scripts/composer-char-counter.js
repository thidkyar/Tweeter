
$(document).ready(function() {
  $('.textarea').on("keyup", function (event) {
    const maxLength = 140;
    const length = $(this).val().length;
    length = maxLength - length;

    if (length < 0) {
      // $('.counter').css('color', 'red');
      $(this).addClass('red-text');
    } else if (length >= 0) {
      // $('.counter').css('color', 'black');
      $(this).removeClass('red-text');
    }
    
    $(this).siblings('.counter').text(length)
  });
});
