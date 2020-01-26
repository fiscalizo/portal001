;(function ($) {
    'use strict';

    $.fn.initSelect2 = function (options) {

        console.log('$.fn.initSelect2...');

        /* DEFAULT SETTINGS */
        let settings = $.extend({
            callback: function() {},
            route: '',
            placeholder: '',
            maximumSelection: 1,
        }, options);

        /* SELECT2 INIT */
        this.select2({
            theme: 'material',
            language: 'pt-BR',
            placeholder: settings.placeholder,
            maximumSelectionLength: settings.maximumSelection,
            ajax: fncAjax(),
        });

        /* FUNCTION AJAX */
        function fncAjax() {
            return {
                url: settings.route,
                dataType: 'json',
                data: function (params)
                {
                    return {
                        search: params.term,
                        page: params.page || 1
                    };
                },
                processResults: function (response)
                {
                    response.page = response.page || 1;
                    return {
                        results: response.items.data.map(function (item) {
                            return {
                                id: item['codigo'],
                                text: item['razao_social']
                            };
                        }),
                        pagination: {
                            more: response.pagination
                        }
                    }
                },
                cache: true,
                delay: 250
            }
        }
    };
}(jQuery));