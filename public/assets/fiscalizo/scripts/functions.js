(function( $ ){
    $.fn.myfunction = function() {
        // alert('hello world');
        let x = multiply(2, 3);
        let text = $(this).text(x);
        return text;
    };

    let multiply = function(x,y) {
        return (x * y);
    }
})( jQuery );
