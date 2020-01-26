const HTMLDataTable = new function () {

    /**
     * @param element Element ID
     * @param object Object dataset
     * @param column Colunas da table (opcional)
     */
    this.init = function (element, object, column) {
        this.element = element;
        this.object = object;
        this.column = column;
        this.tableId = 'htmltable-' + element;
    };

    this.table = function() {
        return this.getHtml();
    };


    this.getHtml = function () {
        return '<table id="' + this.tableId + '" ' +
            'class="table table-striped color-bordered-table info-bordered-table collapsible-table">' +
            this.thead() + '</table>';
    };

    this.thead = function () {

        var thead = "<thead>" + "<tr>";

        const len = this.colDataset().length;

        for (var i = 0; i < len; i++) {
            thead += '<th scope="col">' + this.colDataset()[i] + "</th>";
        }

        // adicionar mais uma coluna para 'buttons'.
        thead += "<th nowrap></th>";
        thead += "</tr></thead>";

        return thead;
    };

    // colDataset
    this.colDataset = function () {
        return (this.column.length) ? this.column : Object.keys(this.object[0]);
    };
};