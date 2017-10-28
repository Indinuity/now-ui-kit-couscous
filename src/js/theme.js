(function($) {

  $('body')
  .on('click', 'nav.menu .nav-item > a', function(e) {
    var ctx = $(this);
    $('.nav-item ul', ctx.closest('.menu'))
    .slideUp()
    .closest('.nav-item')
    .find(".fa-caret-up")
    .toggleClass("fa-caret-down fa-caret-up");

    ctx.next().is(':visible') || ctx.next().slideDown().parent().find('.pull-right').toggleClass('fa-caret-down fa-caret-up');
    
    e.stopPropagation();
  })
  .on('click', '.drawer-toggle', function(e) {
    e.preventDefault();
    $(this).closest('.room').toggleClass("active");
  });
  
})(jQuery);