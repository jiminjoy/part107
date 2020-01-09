 //anchor popovers to the tooltip on resize
 $(window).off("resize").on("resize", function() {
	$(".popover").each(function() {
		var popover = $(this);
		if (popover.is(":visible")) {
			var ctrl = $(popover.context);
			ctrl.popover('show');
		}
	});
});