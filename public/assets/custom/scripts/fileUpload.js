console.log('!!!!!!!!!!!!!!!!!');

'use strict';

// let $inputfile = $( '.inputfile' );


$( '.inputfile' ).each( function() {
    let $input	 = $( this ),
        $label	 = $input.next( 'label' ),
        labelVal = $label.html();

    $input.on( 'change', function( e )
    {
        let fileName = '';

        if( this.files && this.files.length > 1 )
            fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
        else if( e.target.value )
            fileName = e.target.value.split( '\\' ).pop();

        if( fileName )
            $label.find( '.archive-name' ).html( fileName );
        else
            $label.html( labelVal );
    });

    // Firefox bug fix
    $input
        .on( 'focus', function(){ $input.addClass( 'has-focus' ); })
        .on( 'blur', function(){ $input.removeClass( 'has-focus' ); });
});



console.log('@@@@@@@@@@@@@@@@@@@@@@@@@');