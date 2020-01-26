;(function ($) {
    'use strict';

    $.fn.initPanelTab = function (options) {

        console.log('$.fn.initPanelTab...');

        let retval = '';


        /* DEFAULT SETTINGS */
        let settings = $.extend({
            route: 'routerouterouteroute',
        }, options);


        /* INIT PANEL TAB */
        $('[data-toggle="tab"]', this).click(function(e) {
            console.log('clickee');

            /* THIS SELF */
            let self = $(this);
            console.log(self);


            /* HREF HASH */
            let href = this.hash;
            console.log(href);

            retval = href;
        });

        return retval;
    };
}(jQuery));