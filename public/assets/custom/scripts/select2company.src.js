/* a compressão foi feita no: http://php-minify.com/js-minify/ */
(function ($) {
    $.fn.initSelect2 = function (options) {

        // This is the easiest way to have default options.
        const settings = $.extend({

            // These are the defaults.
            route: '',
            callback: function() {}
            // color: '556b2f',
            // backgroundColor: 'white',
        }, options);

        // Greenify the collection based on the settings variable.
        // return this.css({
        //     color: settings.color,
        //     backgroundColor: settings.backgroundColor
        // });

        this.select2({
            theme: 'material',
            language: 'pt-BR',
            placeholder: 'Clientes',
            multiple: true,
            ajax: {
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
                            console.log('PROCESSRESULTS');
                            console.log(item);
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
            },
        });

        this.on('change', function () {

            console.clear();

            // count select2 option selected
            var count = $('.select2company option:selected').length;

            if (count) {
                iziToastShow('', 'Aguarde, carregando...');

            } else {
                iziToastShow('', 'Limpando calendário...');
            }

            clearTimeout(clickTimeout);

            clickTimeout = setTimeout(function()
            {
                console.log('SETTIMEOUT ( ON CHANGE )...');

                if (count) {

                    // call the callback and apply the scope:
                    settings.callback.call(this);

                    // if (typeof callback == 'function') { // make sure the callback is a function
                    //     callback.call(this); // brings the scope to the callback
                    // }
                    // calendarEventSource(calendar);

                } else {
                    document.location.reload();
                }

            }, sleep);

        });
    };
}(jQuery));