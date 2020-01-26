function elementsRender(data) {

    console.log('elementsRender...');

    /* ADD CLICK RELOAD  */
    $('button.btn-reload').on('click', function () {
        document.location.reload();
    });


    /* INIT PANEL */
    const panel = new PanelListGroup('#menu', data);


    /* APPEND PANEL HTML */
    $('#menupanel').append(panel.html());


    /* DYNAMIC VARIABLE */
    const vars = {};


    /* FOREACH UPLOADS */
    $.each( panel.uploads, function( key, val ) {

        /* DYNAMIC VARIABLE */
        vars['dt_'+ val['areaAlias']] = $('#htmltable-' + val['areaAlias']);

        /* RENDER DATATABLES */
        initDataTable(vars['dt_'+ val['areaAlias']], val['files']);

        /* CONTADOR */
        $('#counter-' + val['areaAlias']).text(val['files'].length);
    });
}

function Download(row) {

    iziToastShow('', 'Preparando download...', 1);

    this.row = row;

    this.rid = row.find("td:first").text();

    const $column_filename = row.find("td").eq(1).text();
    // this.filename = row.find("td").eq(1).text();

    // this.download = parseInt(row.find("td").eq(5).text());

    var $column_download = parseInt(row.find("td").eq(5).text());

    const formData = new FormData();

    formData.append('_token', this.csrf_token);

    formData.append('id', this.rid);

    // console.log('new Download() ok...');
    // console.log(this.url);
    // console.log(this.csrf_token);

    /* POST REQUEST FILE */
    postPromise(this.url, formData)
        .done(function (data) {

            if (data['wasRecentlyCreated'] === true) {

                // console.log('wasRecentlyCreated ok................');
                // console.log(data['url']);

                iziToastHide();

                var contador = $column_download + 1;

                row.find('td').eq(5).text(contador);

                // iziToastShow($column_filename, 'Foi iniciado o download...', 2);

                PopupWindow.init(data['url'], $column_filename, 'Download de documento');


                //
                // const win = window.open(data['url'], '_blank');
                //
                // if (win) {
                //     win.focus(); //Browser has allowed it to be opened
                // } else {
                //     alert('Please allow popups for this website'); //Browser has blocked it
                // }


                // PopupWindow.init()
                // iziToastShow('', 'wasRecentlyCreated ok...', 2);

            } else if (data.hasOwnProperty('errors')) {

                // iziToastShow('Erro!', data['errors']['name'], 3);

                const msg = data['errors']['name'];

                Swal.fire({
                    customClass: {
                        popup: 'swal2-popup-class-custom',
                        content: 'swal2-content-class-custom',
                    },
                    html: msg,
                    showCloseButton: false,
                    showCancelButton: false,
                    focusConfirm: true,
                    confirmButtonColor: "#dd3333"
                });

            } else {

                const msg = 'Não foi possível iniciar o download do arquivo "' + 'VAR: FILENAME' + '". Favor entrar em contato com a Fiscalizo.';

                // iziToastShow('Erro!', 'Não foi possível iniciar o download do arquivo "' + 'VAR: FILENAME' + '". Favor entrar em contato com a Fiscalizo.', 3);
                Swal.fire({
                    customClass: {
                        popup: 'swal2-popup-class-custom',
                        content: 'swal2-content-class-custom',
                    },
                    html: msg,
                    showCloseButton: false,
                    showCancelButton: false,
                    focusConfirm: true,
                    confirmButtonColor: "#dd3333"
                });
            }

        })
        .catch(function (reason) {

            console.log(reason);
            iziToastHide();
            iziToastShow('', 'Erro inesperado...', 3);
        });

}

function Delete(row) {

    const $row = row;
    const $rid = $row.find("td:first").text();
    const $filename = $row.find("td").eq(1).text();
    const formData = new FormData();

    formData.append('_token', this.csrf_token);
    formData.append('id', $rid);
    formData.append('company_codigo', fncCompanyCodigo());

    const $url = this.url || undefined;

    Swal.fire({
        customClass: {
            popup: 'swal2-popup-class-custom',
            content: 'swal2-content-class-custom',
        },
        title: '<strong>' + $filename.toString().toLocaleUpperCase() + '</strong>',
        html: 'Você deseja realmente excluir o arquivo "' + $filename +
            '" ?',
        showCloseButton: false,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonColor: "#dd3333"
    }).then(function(result) {

        if (result.value) {

            postPromise($url, formData)
                .then(function(response) {

                    if (response.hasOwnProperty('errors')) {

                        $.each(response['errors'], function (key, val) {
                            console.log(key, val);
                            iziToastShow(key, val, 3);
                        });

                    } else {

                        iziToastShow('', 'Arquivo removido com sucesso.', 1);

                        SuperDuperClosest($row);
                    }
                })
                .done(function() {
                    console.log('done...');

                    setTimeout(function() {
                        iziToastHide();
                    }, 1500);

                })
                .catch(function(reason) {
                    console.error('catch...');
                    console.error(reason);
                    iziToastShow('', 'Erro inesperado...', 3);
                });
        }
    });
}

function SuperDuperClosest($row) {
    const targetId = $row.closest(".collapse").attr("id");
    const counter = $(".list-group-item[data-target='#"+ targetId +"']").find("#counter-" + targetId);
    counter.text(parseInt(counter.text()) - 1);
    $row.remove();
}

function initDataTable(element, dataset) {

    const getColumnDefs = datatablesColumnDefs();

    element.DataTable({
        dom: '<"row"<"col-sm-6"f><"col-sm-6 actionbar">>tr<"row"<"col-sm-4"><"col-sm-4"p><"col-sm-4">>',
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
        lengthMenu: [[20, 40, 80, 100, -1], [20, 40, 80, 100, "All"]],
        paging: true,
        order: [[0, 'asc']],
        select: {style: 'single'},
        columns: getColumnDefs,
        data: dataset.length ? dataset : [],
        createdRow: function (row, data, dataIndex) {
            // console.warn(data['status']);
            // (data['status'] === 'VENCIDO') ? $('td', row).css('background-color', '#d9534f').css('color', 'white') : $('td', row);
            // (data['status'] === 'VENCIDO') ? $('td', "*"): $('td', row);
        },
    });

    element.on('error.dt', function (e, settings, techNote, message) {
        console.log('AN ERROR HAS BEEN REPORTED BY DATATABLES...');
        console.log(e, settings, techNote, message);
        iziToastShow('ERROR!', 'AN ERROR HAS BEEN REPORTED BY DATATABLES: ' + message, 3);

    }).DataTable();

    /* DOUBLE CLICK */
    element.on('dblclick', 'td:not(:last-child)', function () {

        console.log('dblclick');

        const $row = $(this).parents('tr');
        console.log($row);

        (new Download($row));

        // const $thisRow = $(this).parents('tr');
        // console.log($thisRow);
        // contador($thisRow);
    });

    /* SINGLE CLICK */
    element.on('click', 'button.btndownload', function () {

        console.log('click');

        const $row = $(this).parents('tr');
        console.log($row);

        (new Download($row));

        // let $dataRow = $dataTable.row( $thisRow ).data();
        // console.log($dataRow);
        // contador($thisRow);
    });


    $(function() {

        const initMensagensArquivos = document.getElementById("initMensagensArquivos")
            .getAttribute("data-url");

        if ((/fiscalizo/i).test(initMensagensArquivos)) {

            /* SINGLE CLICK */
            element.on('click', 'button.btndelete', function () {

                const $row = $(this).parents('tr');

                (new Delete($row));
            });
        }
    });
}

/* SET COLUMN DEFINITION INITIALISATION PROPERTIES */
function datatablesColumnDefs() {
    return [
        {
            data: 'id',
            createdCell: function (td, cellData, rowData, row, col) {
                $(td).attr('data-label', 'ID');
            }
        },
        {
            data: 'original_filename',
            createdCell: function (td, cellData, rowData, row, col) {
                $(td).attr('data-label', 'Arquivo');
            }
        },
        {
            data: 'updated_at',
            createdCell: function (td, cellData, rowData, row, col) {
                const rd = (rowData['updated_at']) ? moment(rowData['updated_at']).format('DD/MM/YYYY HH:mm') : '-';
                $(td).attr('data-label', 'Enviado');
                $(td).text(rd);
            }
        },
        {
            data: 'until',
            createdCell: function (td, cellData, rowData, row, col) {
                const rd = (rowData['until']) ? moment(rowData['until']).format('DD/MM/YYYY HH:mm') : '-';
                $(td).attr('data-label', 'Vencimento');
                $(td).text(rd);
            }
        },
        {
            data: 'status',
            createdCell: function (td, cellData, rowData, row, col) {
                // const rd = (rowData['status'] === 'ABERTO') ? '<span class="label label-success">ABERTO</span>' : rowData['status'];

                switch (rowData['status']) {

                    case 'ABERTO': {
                        const rd = '<span class="label label-success">' + rowData['status'] + '</span>';
                        $(td).html(rd);
                        break;
                    }
                    case 'VENCIDO': {
                        const rd = '*';
                        $(td).html(rd);
                        break;
                    }
                    default: {
                        const rd = rowData['status'];
                        $(td).html(rd);
                        break;
                    }
                }

                $(td).attr('data-label', 'Status');
            }
        },
        {
            data: 'downloads',
            createdCell: function (td, cellData, rowData, row, col) {
                const rd = (rowData['downloads']) ? rowData['downloads'].length : 0;
                $(td).attr('data-label', 'Download');
                $(td).text(rd);
            }
        },
        {
            data: null,
            orderable: false,
            className: "text-right",
            defaultContent: fncButtonContent()
        },
    ];
}

function fncButtonContent() {
    const initMensagensArquivos = document.getElementById("initMensagensArquivos").getAttribute( "data-url" );

    if ((/fiscalizo/i).test(initMensagensArquivos)) {
        return '<button class="btn btn-info btn-outline btndownload"><i class="fa fa-download"></i></button>' +
            ' <button class="btn btn-danger btn-outline btndelete"><i class="fa fa-times"></i></button>';
    }

    return '<button class="btn btn-info btn-outline btndownload"><i class="fa fa-download"></i></button>';
}
