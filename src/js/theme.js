(function($) {

  $('body')
  .on('click', 'nav.menu > .nav-item > a', function(e) {
    var ctx = $(this);
    
    // 
    $('.nav-item ul', ctx.closest('.menu'))
    .slideUp()
    .closest('.nav-item')
    .find(".arrows-1_minimal-down")
    .toggleClass("arrows-1_minimal-up arrows-1_minimal-down");

    ctx.next().is(':visible') || ctx.next().slideDown().parent().find('.float-right').toggleClass('arrows-1_minimal-down arrows-1_minimal-up');
    
    e.stopPropagation();
  })
  .on('click', '.drawer-toggle', function(e) {
    e.preventDefault();
    $($(this).attr('data-target')).toggleClass("active");
  });

})(jQuery);