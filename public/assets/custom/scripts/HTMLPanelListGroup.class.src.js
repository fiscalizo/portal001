function PanelListGroup(element, data) {

    if (typeof element === 'undefined' || typeof data === 'undefined') {
        throw new TypeError(">>> CANNOT INIT PANELLISTGROUP() <<<");
    }

    this.data = data;
    this.datalen = data.length;
    this.element = element;
    this.uploads = [];
}

PanelListGroup.prototype.getFullName = function() {
    return this.datalen + " " + this.element;
};

PanelListGroup.prototype.html = function() {

    var anchors = '';

    for (var i = 0; i < this.datalen; i++) {

        this.area = this.data[i]['name'];
        this.alias = this.data[i]['alias'];
        this.documentos = this.data[i]['documentos'];

        // foreach new row of anchor
        anchors += this.anchor();
    }

    return anchors;
};

PanelListGroup.prototype.anchor = function() {

    return '<a href="javascript:void(0)" ' +
        'class="list-group-item" ' +
        'data-toggle="collapse" ' +
        'data-target="#' + this.alias + '" ' +
        'data-parent="' + this.element + '">' + this.area +
        '<span id="counter-' + this.alias + '" class="label label-info pull-right">0</span> ' +
        '</a>' +
        this.rowCollapse();
};

PanelListGroup.prototype.rowCollapse = function() {

    return '<div id="' + this.alias + '" class="collapse">' + this.table() + '</div>';
};

PanelListGroup.prototype.table = function() {
    
    function fncCase1() {
        console.log('fncCase1');
        return void 0;
    }

    function fncCase2() {
        console.log('fncCase2');
        return void 0;
    }

    function fncCaseElse() {
        console.log('fncCaseElse');
        return void 0;
    }

    function fncColunas() {
        return ['ID', 'Arquivo', 'Enviado', 'Vencimento', 'Status', 'Download'];
    }

    const dataTarget = this.alias;

    
    // html table string
    var html = '';

    
    //var auxiliar para ser utilizado no push do 'this.uploads'
    const tmp_uploads = {};
    // console.log(tmp_uploads);
    
    
    if (this.documentos.length === 1) {

        // para cada 'documento'...
        this.documentos.forEach(function (item) {

            // var table = new HTMLDataTable(dataTarget, item['upload'], ['ID', 'Arquivo', 'Enviado', 'Vencimento', 'Status', 'Download']);
            HTMLDataTable.init(dataTarget, item['upload'], fncColunas());

            html += HTMLDataTable.getHtml();

            tmp_uploads['areaAlias'] = dataTarget;
            tmp_uploads['files'] = item['upload'];
        });

    }  else if (this.documentos.length >= 2) {

        var upload_files = [];

        // para cada 'documento'...
        this.documentos.forEach(function (item, key) {

            // se há 'arquivos de upload' nesse documento...
            if (item['upload'].length) {

                // para cada 'arquivo de upload' nesse documento...
                item['upload'].forEach(function (i, k) {

                    upload_files.push(i);
                });
            }
        });

        // var table = new HTMLDataTable(dataTarget, upload_files, ['ID', 'Arquivo', 'Enviado', 'Vencimento', 'Status', 'Download']);
        HTMLDataTable.init(dataTarget, upload_files, fncColunas());

        html += HTMLDataTable.getHtml();

        tmp_uploads['areaAlias']    = dataTarget;
        tmp_uploads['files']        = upload_files;

    } else {

        // var table = new HTMLDataTable(dataTarget, [], ['ID', 'Arquivo', 'Enviado', 'Vencimento', 'Status', 'Download']);
        HTMLDataTable.init(dataTarget, [], fncColunas());

        html += HTMLDataTable.getHtml();

        tmp_uploads['areaAlias']    = dataTarget;
        tmp_uploads['files']        = [];
    }

    this.uploads.push(tmp_uploads);

    return html;
};
