;(function ($) {
    'use strict';

    // Private function for....
    function getRowData(table, row) {

        let $row = $(row).parents('tr');

        return table.row( $row ).data();
    }

    $.fn.initDataTable = function (options) {

        /* default settings */
        let defaults = {
            dom: '<"row"<"col-sm-6"f><"col-sm-6 actionbar">>tr<"row"<"col-sm-4"><"col-sm-4"p><"col-sm-4">>',
            columns: [],
            url: '',
            onModalEdit: function() {},
            onModalDelete: function() {},
            onReload: function() {
                console.clear();
                console.log('reload!!!!!');
            },
        };

        /* default settings */
        let settings = $.extend({}, defaults, options);

        /* our plugin implementation code goes here */
        return this.each(function () {

            /* do something to each element here */
            let self = $(this);

            /* init datatable */
            let table = self.DataTable({
                dom: settings.dom,
                columns: settings.columns,
                ajax: settings.url,
                lengthMenu: [[20, 40, 80, 100, -1], [20, 40, 80, 100, "All"]],
                order: [[0, 'asc']],
                paging: true,
                info: false,
                language: {
                    "emptyTable": "Nenhum registro encontrado",
                    "loadingRecords": "Carregando...",
                    "lengthMenu": "Exibindo _MENU_ registros por página",
                    "zeroRecords": "Nenhum registro encontrado",
                    "info": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "infoEmpty": "Não há registros",
                    "infoFiltered": "(filtrado de _MAX_ registros)",
                    "search": "Filtrar ",
                    "searchPlaceholder": "",
                    "paginate": {
                        "first": "Primeira",
                        "last": "Última",
                        "next": "Próxima",
                        "previous": "Anterior"
                    }
                },
                rowCallback: function (row, data, index) {
                },
                initComplete: function (settings, json) {

                    console.log('initDataTable...');
                    console.log('initComplete()...');
                    console.log(json);

                    /* table cell collapsible expansible */
                    $('.collapsible').on('click', function () {
                        let $this = $(this);
                        $this.toggleClass('active', 'active');
                        $this.parent().siblings('.expansible').toggle();
                    });
                }
            });

            /* BUTTON EDIT */
            $(this).find('tbody').on( 'click', 'button.btnedit', function (e) {

                e.preventDefault();

                let data = getRowData(table, this);

                settings.onModalEdit(data);
            });

            /* BUTTON DEL */
            $(this).find('tbody').on( 'click', 'button.btndel', function (e) {

                e.preventDefault();

                let data = getRowData(table, this);

                settings.onModalDelete(data);
            });
        });
    };
}(jQuery));