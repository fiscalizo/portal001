const PopupWindow = new function() {

    this.url    = '';
    this.title  = '';
    this.msg    = '';

    this.init = function (url, title, msg) {

        this.url = url;
        this.title = title;
        this.msg = msg || '';

        const popup = window.open(this.url, '_blank');

        try {
            popup.focus();
            iziToastShow(this.title, 'Foi iniciado o download...', 2);
        }
        catch (e) {

            iziToastHide();

            Swal.fire({
                timer: 20000,
                timerProgressBar: true,
                showCancelButton: true,
                showConfirmButton: false,
                html:
                    '<h5><b>' + this.msg + '</b></h5>' +
                    '<br>' +
                    '<a style="-ms-text-size-adjust:100%; -webkit-text-size-adjust:100%; mso-line-height-rule:exactly; font-family:Helvetica,Arial,sans-serif; font-size:12px; color:#0000cd; font-weight:bold; font-style:normal; text-decoration:underline" href="'
                    + this.url +'">Clique aqui para iniciar download</a>' +
                    '',
            });
        }

    };
};