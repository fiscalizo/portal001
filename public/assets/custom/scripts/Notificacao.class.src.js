const Notificacao = new function() {

    this.response = null;

    this.evento = null;

    this.isFiscalizo = false;

    this.init = function (response, evento, isFiscalizo) {
        /**
         * Dataset do response
         *
         * @type {object}
         */
        this.response = response.data;

        /**
         * Evento do FullCalendar
         *
         * @type {object}
         */
        this.evento = evento;

        /**
         * Se é Fiscalizo ou não
         *
         * @type {boolean}
         */
        this.isFiscalizo = (isFiscalizo) ? isFiscalizo : 0;
    };

    // test method
    this.getInfo = function() {
        return this.response + ' ' + this.evento + ' getInfo()';
    };

    // main method
    this.getHtml = function() {
        return (this.isFiscalizo) ? this.markup() : this.markup_replace();
    };

    // element id
    this.eid = function() {
        return 'notificacao' + this.response['id'];
    };

    // record id
    this.rid = function() {
        return this.response['id'];
    };

    // jQuery object
    this.jquery = function() {
        return $('#' + this.eid());
    };

    // title
    this.title = function() {
        return this.response['title'] || 'TITLE';
    };

    // filename
    this.filename = function() {
        return this.upload() ? this.upload()['current_filename'] : '';
        // return this.event.extendedProps['file'] || this.event.extendedProps['current_filename'];
    };

    // markup da notificacao
    this.markup = function() {

        return (this.response['templates'].length) ?
            this.response.templates[0]['markup'] : this.response['markup'];


        // const counter = parseInt(this.response['templates'].length);
        //
        // if (counter > 0) {
        //
        //     return this.response.templates[0]['markup'];
        //
        // } else {
        //
        //     return this.response['markup'];
        // }

        // console.log(this.response['templates'].length);
        // console.log(this.response['templates'][0]);
        // return (this.response['templates'].length) ?
        //     this.response.templates[0]['markup'] : this.response['markup'];
    };

    // markup da notificacao editado
    this.markup_replace = function() {

        if (this.markup() && this.markup().includes('#titulodoc'))
        {
            return this.markup().replace('#titulodoc', this.titulodoc());

        } else {

            return this.markup();
        }


        // old school, classic way
        // const str = this.markup();
        // if (str.indexOf('#titulodoc') > -1) { // returns `-1` if it is not present.
        //     console.log('match');
        // } else {
        //     console.log('not found');
        // }
        //
        // console.log(this.markup());
        // return 'ret ok';

        // const counter = parseInt(this.response['templates'].length);

        // if (this.markup().includes('#titulodoc')) {
        //
        //     return 'if ok';
        //
        // }  else {
        //
        //     return 'else ok';
        // }

        // return [
        //     this.response['templates'],
        //     this.response['templates'].length,
        //     parseInt(this.response['templates'].length)
        // ];
        //
        // if (this.markup() && this.markup().includes('#titulodoc'))
        // {
        //     return this.response;
        //     // return this.markup().replace('#titulodoc', this.titulodoc());
        //
        // } else {
        //
        //     return this.response;
        //     // return this.markup();
        // }


    };

    // anchor
    this.anchor = function(url) {
        return '<a data-titulodoc="' + this.title() +
            '" href="' + url + '" style="-ms-text-size-adjust:100%; -webkit-text-size-adjust:100%; mso-line-height-rule:exactly; font-family:Helvetica,Arial,sans-serif; font-size:14px; color:#0000cd; font-weight:bold; font-style:normal; text-decoration:underline" target="_blank">' + this.title() + '</a>';
    };

    // titulo doc
    this.titulodoc = function() {
        return '<span data-titulodoc="' + this.title() +
            '" style="-ms-text-size-adjust:100%; -webkit-text-size-adjust:100%; mso-line-height-rule:exactly; font-family:Helvetica,Arial,sans-serif; font-size:14px; color:#0000cd; font-weight:bold; font-style:normal; text-decoration:' + this.underline() +
            '">' + this.title() + '</span>';
    };

    // upload id
    this.uid = function() {
        return this.upload() ? this.upload()['id'] : null;
    };

    // underline
    this.underline = function() {
        return this.uid() ? 'underline' : 'none';
    };

    // upload array
    this.upload = function() {
        return this.response['upload'].length ? this.response['upload'][0] : null;
    };
};