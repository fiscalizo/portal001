class jQueryDataTables
{
    element;
    dataset;
    columns;
    order;
    columnDefinition;
    buttonDefinition;
    htmltableId;
    dt;

    /**
     *
     * @param element Element ID
     * @param dataset Object com dataset
     * @param columns Colunas da table (opcional)
     * @param order Qual coluna será ordenada (opcional)
     */
    constructor(element, dataset, columns = [], order = 0)
    {
        this.element            = element;
        this.dataset            = dataset;
        this.columns            = columns;
        this.order              = order;
        this.columnDefinition   = [];
        this.buttonDefinition   = null;

        // this.dom = 'tr<"row"<"col-sm-4"f><"col-sm-4"p><"col-sm-4">>';
        this.setDom('<"row"<"col-sm-6"f><"col-sm-6"B>>tr<"row"<"col-sm-4"><"col-sm-4"p><"col-sm-4">>');
    };

    setColumnDefinition = (columnDefinition = []) =>
    {
        this.columnDefinition = columnDefinition;
    };

    setDom = (dom) =>
    {
        this.dom = dom;
    };

    setButtonDefinition = (button) =>
    {
        this.buttonDefinition = button;
    };

    render = () =>
    {
        /* DATATABLES DISABLE ALERT ERROR */
        $.fn.dataTable.ext.errMode = 'none';


        HTMLDataTable.init(this.element, this.dataset, this.columns);


        $('.htmltable').append(HTMLDataTable.getHtml());


        this.htmltableId = HTMLDataTable.tableId;


        this.dt = $(`#${this.htmltableId}`);


        this.dt.DataTable({
            dom: this.dom,
            language: {
                "emptyTable": "Nenhum registro encontrado",
                "loadingRecords": "Carregando...",
                "lengthMenu": "Exibindo _MENU_ registros por página",
                "zeroRecords": "Nenhum registro encontrado",
                "info": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                "infoEmpty": "Não há registros",
                "infoFiltered": "(filtrado de _MAX_ registros)",
                "search": "Pesquisar ",
                "searchPlaceholder": "",
                "paginate": {
                    "first": "Primeira",
                    "last": "Última",
                    "next": "Próxima",
                    "previous": "Anterior"
                }
            },
            lengthMenu: [[20, 40, 80, 100, -1], [20, 40, 80, 100, "All"]],
            select: {
                style: 'single',
                selector: 'td:not(:last-child)'
            },
            paging: true,
            columns: this.columnDefinition,
            order: [[this.order, 'asc']],
            data: this.dataset,
            buttons: (this.buttonDefinition) ? this.buttonDefinition : [],
        });


        this.dt.on('error.dt', function(e, settings, techNote, message)
        {
            console.log(e, settings, techNote, message);
            console.log('AN ERROR HAS BEEN REPORTED BY DATATABLES: ', message);
            iziToastShow('ERROR!', 'AN ERROR HAS BEEN REPORTED BY DATATABLES: ' + message, 3);
        }).DataTable();

    };

}
