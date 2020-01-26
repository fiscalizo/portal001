/* global Storage */

$(document).ready(function () {
    function store(name, val) {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem(name, val);
        } else {
            window.alert('Please use a modern browser to properly view this template!');
        }
    }
    
    $("*[data-theme]").click(function (e) {
        e.preventDefault();
        var currentStyle = $(this).attr('data-theme');
        // console.log('15 : ' + currentTheme);
        store('theme', currentStyle);
        $('#theme').attr({
            href: '/assets/ampleadmin/css/colors/' + currentStyle + '.css'
        });
    });

    var currentTheme = get('theme');
    if (currentTheme) {
        $('#theme').attr({
            href: '/assets/ampleadmin/css/colors/' + currentTheme + '.css'
        });
    }
    // color selector
    $('#themecolors').on('click', 'a', function () {
        $('#themecolors li a').removeClass('working');
        $(this).addClass('working');
    });

});

function get(name) {
	var currentTheme = localStorage.getItem(name);
	// console.log('38 ' +currentTheme);
	if (!currentTheme) {
		currentTheme = "megna-dark";
	}
	$('#themecolors li a').removeClass('working');
	var classTheme = currentTheme+'-theme';
	if (currentTheme === 'gray') {
        // console.log('45 ' + currentTheme);
		classTheme = 'yellow-theme';
	} 
	if (currentTheme === 'gray-dark') {
        // console.log('49 ' + currentTheme);
		classTheme = 'yellow-dark-theme';
	} 
	$('.'+classTheme).addClass('working');
	
	return currentTheme;
}
