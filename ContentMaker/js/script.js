
localStorage.setItem('tabelaContent', $('.cms-artboard').html());

if (localStorage.getItem('tabelaContent')) {
  $('.cms-artboard').html(localStorage.getItem('tabelaContent'))
}

$(document).on('click', '[data-action="export"]', function() {
  var uniqueNum = new Date().getTime();
  var collectData = $('.cms-artboard').clone();

  collectData.find('[data-content="text"]').removeAttr('contenteditable');
  collectData.find('[data-content="text"]').removeAttr('data-content');

  var blob = new Blob([collectData.html()], {
      type: 'text/html;charset=utf-8'
  });

  saveAs(blob, 'page-' + uniqueNum + '.html');
});

$(document).on('click', '[data-action="show-classes"]', function() {
  $('.pages-cms').toggleClass('show-classes');
});

$(document).on('click', '.tab-nav-item', function(e) {
  e.preventDefault();

  var target = $(this).data('tab');

  $(this).siblings().removeClass('active')
  $('#' + target + '').siblings().hide();

  $(this).addClass('active')
  $('#' + target + '').show();
});

$(document).on('click', '.text-align .text-section-item', function() {
  var target = $('.active[data-content="text"]');
  var thisIndex = $(this).index();
  var thisClass = $(this).data('class');
  var thisSiblings = $(this).closest('.text-align').siblings('.text-align');


  thisSiblings.each(function(){
    var siblingsIndex = $(this).find('.text-section-item').eq(thisIndex);

    if (siblingsIndex.hasClass('active')) {
      var siblingsClass = siblingsIndex.data('class');

      siblingsIndex.removeClass('active');
      target.removeClass(siblingsClass);
    }
  });

  if($(this).hasClass('active')) {
    $(this).removeClass('active');
    target.removeClass(thisClass);

  } else {
    $(this).addClass('active');
    target.addClass(thisClass);
  }
});

$(document).on('click', '.text-style .text-section-item', function() {
  var target = $('.active[data-content="text"]');
  var thisClass = $(this).data('class');
  var siblingsClass = $(this).siblings('.active').data('class');

  if($(this).hasClass('active')) {
    $(this).removeClass('active');
    target.removeClass(thisClass);

  } else {
    target.removeClass(siblingsClass);
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    target.addClass(thisClass);
  }
});

$(document).on('click', '.heading-section-item', function() {
  var target = $('.active[data-content="text"]');
  var thisTag = $(this).data('tag');

  $(target).each(function(){
		var newElem = $('<' + thisTag + '></' + thisTag + '>', {html: $(this).html()});
		$.each(this.attributes, function() {
			newElem.attr(this.name, this.value);
		});
		$(this).replaceWith(newElem);
	});
});

$(document).on('click', '.fontfamily-section-item', function() {
  var target = $('.active[data-content="text"]');
  var thisData = $(this).data('fontfamily');
  var thisSiblingsData = $(this).siblings('.active').data('fontfamily');

  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    target.removeClass(thisData);

  } else {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    target.removeClass(thisSiblingsData);
    target.addClass(thisData);
  }
});


$(document).on('click', '[data-submit="class"]', function() {
  var target = $('.textarea-classes').val();

  $('.pages-cms .active').attr('class', target);
  $('[data-submit="class"]').addClass('disabled');
});
$(document).on('input', '[data-type="classes"]', function() {
  var activeClass = $('.active[data-content="text"]').attr('class');
  var textareaClass = $('.textarea-classes').val();

  if (activeClass !== textareaClass) {
    $('[data-submit="class"]').removeClass('disabled');

  } else {
    $('[data-submit="class"]').addClass('disabled');
  }
});


$(document).on('click', '[data-submit="styles"]', function() {
  var target = $('.textarea-styles').val();

  $('.pages-cms .active').attr('style', target);
  $('[data-submit="styles"]').addClass('disabled');

  if (target == '') {
    $('.active[data-content="text"]').removeAttr('style');
  }
});
$(document).on('input', '[data-type="styles"]', function() {
  var activeClass = $('.active[data-content="text"]').attr('style');
  var textareaClass = $('.textarea-styles').val();

  if (activeClass !== textareaClass) {
    $('[data-submit="styles"]').removeClass('disabled');

  } else {
    $('[data-submit="styles"]').addClass('disabled');
  }
});


$(document).on('click', '[data-submit="html"]', function() {
  var target = $('.textarea-html').val();

  $('.pages-cms .active').html(target);
  $('[data-submit="html"]').addClass('disabled');
});
$(document).on('input', '[data-type="html"]', function() {
  var activeClass = $('.active[data-content="text"]').html();
  var textareaClass = $('.textarea-html').val();

  if (activeClass !== textareaClass) {
    $('[data-submit="html"]').removeClass('disabled');

  } else {
    $('[data-submit="html"]').addClass('disabled');
  }
});

$('.pages-cms').on('click', function(event) {
  var el = $(event.target);
  var sidebar = $('.sidebar');


  if (el.hasClass('active')) {
    el.removeClass('active');
    $('body').css({
      'overflow': ''
    });
    sidebar.removeClass('active');

  } else {
    $('.pages-cms .active').removeClass('active');
    el.addClass('active');
    $('body').css({
      'overflow': 'hidden'
    });
    sidebar.addClass('active');
  }


  var thisClass = el.attr('class');
  var thisStyle = el.attr('style');
  var thisHtml = el.html();

  $('.textarea-classes').val(thisClass);
  $('.textarea-styles').val(thisStyle);
  $('.textarea-html').val(thisHtml);

  $('[data-submit]').addClass('disabled');
});
