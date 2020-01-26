class HTMLTable
{
    /**
     * @param eid Element ID
     * @param dataset Object dataset
     * @param columns Colunas da table (opcional)
     */
    constructor(eid, dataset = [], columns = [])
    {
        this.eid            = eid;
        this.dataset        = dataset;
        this.columns        = columns;
        this.tableId        = 'htmltable-' + eid;
        this.columnToolbar  = false;
        this.columnToolbarTitle = '';
    }

    get getHtml() {
        return this.table;
    }

    render = (obj) => {
        $(obj).html(this.table);
    };

    table = () => {
        return '<table id="' + this.tableId + '" ' +
            'class="table table-striped color-bordered-table info-bordered-table collapsible-table">' +
            this.thead() + '</table>';
    };

    thead = () => {
        let thead = "<thead>" + "<tr>";

        if (this.columns.length)
        {
            for (let i = 0; i < this.columns.length; i++) {
                thead += '<th scope="col">' + this.columns[i] + "</th>";
            }
        }

        if (this.columnToolbar)
        {
            thead += "<th nowrap>" + this.columnToolbarTitle + "</th>";
        }

        thead += "</tr></thead>";

        return thead;
    };

    setColumns = (...columns) =>
    {
        this.columns = columns;

        if (!this.columns.length) {
            console.error('>>> HTMLTABLE NO COLUMNS <<<');
        }
        return this;
    };

    addColumnToolbar = (bool, title = '') =>
    {
        this.columnToolbar = bool;
        this.columnToolbarTitle = title;
        return this;
    };


}
