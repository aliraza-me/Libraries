
function VisibleOnViewport($elementName, isClass) {
  var scrollTop = $(window).scrollTop();
  var scrollBottom = scrollTop + $(window).innerHeight();
  var isClass = isClass ? isClass : 'visible-item';

  $($elementName).each(function(){
    var catchElement = $(this).offset().top + ($(this).innerHeight() / 2);

    if (catchElement > scrollTop && catchElement < scrollBottom) {
      $(this).addClass(isClass);

    } else {
      $(this).removeClass(isClass);
    }
  });
}
