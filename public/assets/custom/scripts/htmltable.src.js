;(function ($) {
    'use strict';

    $.fn.htmltable = function(options) {

        let settings = $.extend({}, $.fn.htmltable.defaults, options);

        let table = function() {

            let el = document.createElement("table");

            el.setAttribute('class', settings.tableClass);
            el.setAttribute("name", settings.tableName);
            el.setAttribute("id", settings.tableID);

            el.appendChild(thead());

            return el;
        };

        let thead = function() {

            let el = document.createElement("thead");

            el.appendChild(thead_columns());

            return el;
        };

        let thead_columns = function() {

            let row = document.createElement("tr");

            for (let i in settings.theadColumns) {

                let th = document.createElement("th");

                let cellText = document.createTextNode(settings.theadColumns[i]);

                th.setAttribute("scope", "col");

                th.appendChild(cellText);

                row.appendChild(th);
            }

            if (settings.toolbarColumn) {
                let toolbarColumn = document.createElement("th");

                toolbarColumn.setAttribute("nowrap", "");

                row.appendChild(toolbarColumn);
            }

            return row;
        };

        // Our plugin implementation code goes here.
        return this.each(function() {

            // Do something to each element here.
            let self = $(this);

            self.html(table());
        });
    };

    // Plugin defaults – added as a property on our plugin function.
    // dark-table
    // inverse-table
    // muted-table
    $.fn.htmltable.defaults = {
        foreground: "red",
        background: "yellow",
        theadColumns: [],
        toolbarColumn: false,
        tableName: "table-name",
        tableID: "table-id",
        tableClass: 'table table-striped',
    };

}(jQuery));