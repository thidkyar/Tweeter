
$(document).ready(function() {
  $('.textarea').on("input",function (event) {
    const maxLength = 140;
    const valLength = $(this).val().length;
    const $counter = $(this).siblings('.counter')
    let length = maxLength - valLength;
    if (length < 0) {
      $counter.addClass('red-text');
    } else if (length >= 0) {
      $counter.removeClass('red-text');
    }
    $counter.text(length)
  });
});
