
function ItemsPerRow($elementName) {
  var counter = 0;

  $($elementName).each(function () {
    if ($(this).prev().length > 0) {
      if ($(this).position().top != $(this).prev().position().top) return false;
      counter++;

    } else {
      counter++;
    }
  });

  return counter;
}
