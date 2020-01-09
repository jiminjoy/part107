/*
 * jQuery UI Autocomplete Auto Select Extension
 *
 * Copyright 2010, Scott GonzÃ¡lez (http://scottgonzalez.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * http://github.com/scottgonzalez/jquery-ui-extensions
 */
(function( $ ) {

$.ui.autocomplete.prototype.options.autoSelect = true;
$( ".ui-widget" ).live( "blur", function( event ) {
	
	var autocomplete = $( this ).data( "autocomplete" );
	//if ( !autocomplete.options.autoSelect || autocomplete.selectedItem ) { return; }

	var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( $(this).val() ) + "$", "i" );
	autocomplete.widget().children( ".ui-menu-item" ).each(function() {
		var item = $( this ).data( "uiAutocompleteItem" );
		if ( matcher.test( item.label || item.value || item ) ) {
			autocomplete.selectedItem = item;
			return false;
		}
	});
	if ( autocomplete.selectedItem ) {
		autocomplete._trigger( "selected", event, { item: autocomplete.selectedItem } );
	}
});

}( jQuery ));

(function( $ ) {

$( ".ui-autocomplete-input" ).live( "autocompleteopen", function() {
	var autocomplete = $( this ).data( "autocomplete" ),
		menu = autocomplete.menu;

	if ( !autocomplete.options.selectFirst ) {
		return;
	}

	menu.activate( $.Event({ type: "mouseenter" }), menu.element.children().first() );
});

}( jQuery ));
