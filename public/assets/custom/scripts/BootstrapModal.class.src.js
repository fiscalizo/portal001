const BootstrapModal = new function() {

    this.eid = '';
    this.title = '';
    this.htmlContent = '';

    this.init = function (eid, title, htmlContent) {
        this.eid = eid;
        this.title = title;
        this.htmlContent = htmlContent;
    };

    // main method
    this.getModal = function() {

        return '<div class="modal modal-wide centered-modal modal-custom fade" id="' +
            this.eid +
            '" tabindex="-1" data-keyboard="true" role="dialog">' +
            '<div class="modal-dialog modal-dialog-custom">' +
            '<div class="modal-content modal-content-custom">' +
            '<div class="modal-header modal-header-custom">' +
            '<button type="button" class="close" data-dismiss="modal">×</button>' +
            '<h4 class="modal-title">' +
            this.title +
            '</h4>' +
            "</div>" +
            '<div class="modal-body modal-body-custom">' +
            this.htmlContent +
            "</div>" +
            '<div class="modal-footer modal-footer-custom">' +
            '<button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>' +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
    };
};