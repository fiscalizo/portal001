$(document).ready(function () {

    /* MODAL VARIABLES */
    let $modalPermissao = $('#modalPermissao');
    let $modal_title    = $('.modal-title');
    let $bodyContent    = $(".bodyContent");
    let $deleteContent  = $(".deleteContent");
    let $destroy        = $('#destroy');
    let $store          = $('#store');
    let $update         = $('#update');
    let $dname          = $('.dname');

    /* DATEPICKER VARIABLE */
    let $dt_inicio      = $('#dt_inicio');

    /* DATEPICKER INIT */
    $dt_inicio.datepicker({
        format: "dd/mm/yyyy",
        language: "pt-BR",
        orientation: "bottom auto",
        autoclose: true,
        todayHighlight: true
    });

    /* DATEPICKER WORKAROUND */
    $("#dt_inicio:not([readonly])")
        .datepicker()
        .focus(function() {
            $(this).prop("autocomplete", "off");
            //              return false;
        });

    /* SELECT2 VARIABLE */
    let $select2user = $(".select2user");

    $select2user.select2({
        theme: "material",
        language: "pt-BR",
    });

    let preload = $.ajax({
        type: 'GET',
        url: getusers,
        dataType: 'json',
        success: function(data) {
            $.each(data.items, function(key, value){
                let option = new Option(value.name, value.id, false, false);
                $select2user.append(option).trigger('change');
                $select2user.trigger({
                    type: 'select2:select',
                    data: value
                })
            })
        }
    });


    function removeClassHasError() {
        $('.has-error').each(function() {
            // console.log('removeClassHasError() has-error each ......');
            let self = $(this);
            self.removeClass('has-error');
            self.children('span').addClass('hidden');
        });
    }


    /* AO FECHAR MODAL, CLEAR FORM */
    $modalPermissao.on('hidden.bs.modal', function () {
        clearForm($(this));
        $('.deleteDeny').addClass('hidden');
    });


    function clearForm(form) {
        // console.log('01: clearForm: ' +form[0].attributes[0].nodeValue);

        // iterate over all of the inputs for the form
        // element that was passed in
        $(':input', form).each(function() {
            let type = this.type;
            let tag = this.tagName.toLowerCase(); // normalize case
            // it's ok to reset the value attr of text inputs,
            // password inputs, and textareas
            if (type === 'text' || type === 'email' || type === 'password' || tag === 'textarea')
                this.value = "";
            // checkboxes and radios need to have their checked state cleared
            // but should *not* have their 'value' changed
            else if (type === 'checkbox' || type === 'radio')
                this.checked = false;
            // select elements need to have their 'selectedIndex' property set to -1
            // (this works for both single and multiple select elements)
            else if (tag === 'select')
                this.selectedIndex = -1;
        });

        /* clear select2 */
        $select2user.val(null).trigger('change');
        // console.log('02: clear select2 (select2user) ...');

        /* remove a class has-error */
        removeClassHasError();
        // console.log('03: removeClassHasError');

        // console.log('-- end: clearForm --');
    }

    /* MODAL FUNCTIONS */
    ModalPermissao = {
        myModal : $modalPermissao,
        destroy: function (id, name) {

            $modal_title.html(`<strong>EXCLUIR PERMISSÃO</strong>`);

            ajaxGetId('/permissoes/withusers/'+id, 'destroy');

            $dname.text('"' + name + '"');

            $bodyContent.addClass('hidden');
            $deleteContent.removeClass('hidden');

            $destroy.removeClass('hidden');
            $update.addClass('hidden');
            $store.addClass('hidden');

            // console.log('modal destroy: ' + id);

            this.myModal.modal('show');
        },
        edit: function (id) {

            $modal_title.html(`<strong>EDITAR PERMISSÃO</strong>`);

            ajaxGetId('/permissoes/withusers/'+id, 'update');

            $dname.text('');

            $bodyContent.removeClass('hidden');
            $deleteContent.addClass('hidden');

            $destroy.addClass('hidden');
            $update.removeClass('hidden');
            $store.addClass('hidden');

            // console.log('window.location.hostname: ' + window.location.hostname);

            this.myModal.modal('show');
        },
        new: function () {
            // console.log('modal: button new clicked');

            $modal_title.html(`<strong>NOVA PERMISSÃO</strong>`);

            $dname.text('');

            $bodyContent.removeClass('hidden');
            $deleteContent.addClass('hidden');

            $destroy.addClass('hidden');
            $update.addClass('hidden');
            $store.removeClass('hidden');

            this.myModal.modal('show');
        },
        open: function () {
            // console.log('ModalPermissao open');
        },
        store: function () {
            // console.log('ModalPermissao store');
        }
    };


    /**
     * AJAX SUBMIT FORM (SubmitForm)
     *
     * contentType to false stops the content-type header being set.
     * processData to false will stop the content of the request being encoded, which is needed when sending a FormData object.
     */
    function ajaxSubmitForm(url, caller) {
        let form = document.getElementById("formPermissao");
        let data = new FormData(form);
        let rid = $('input[name=id]');
        rid.prop('disabled', false); data.append('id', rid.val()); rid.prop('disabled', true); // hacks input disabled
        let perm = $('input[name=name]');
        perm.prop('disabled', false); data.append('name', perm.val()); perm.prop('disabled', true); // hacks input disabled
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            contentType: false,
            processData: false,
            cache: false,
            dataType: "json",
            beforeSend: function (data) {
                removeClassHasError(); /* remove a class has-error */

                /* antes de enviar, desabilitar botão */
                gid(caller)
                    .text("Aguarde")
                    .attr('disabled', 'disabled');
            },
            success: function (data) {

                /* SE HOUVE ERRO... */
                if (data.errors) {

                    // console.log('data.errors...');
                    // console.log('data.errors...');

                    console.log('Guru Meditation Error');

                    $.each( data.errors, function( key, value ) {
                        let formgroup = '.form-group-' + key;
                        $(formgroup).addClass('has-error');
                        $(formgroup + ' > span').removeClass('hidden').text(value);

                        if (key === 'pk'){
                            $('.deleteDeny').removeClass('hidden').html(value);
                        }
                    });

                    gid(caller)
                        .text(switchText(caller))
                        .removeAttr("disabled");

                } else {

                    // gid(caller)
                    //     .text(switchText(caller))
                    //     .removeAttr("disabled");
                    // console.log(data);

                    document.location.reload();
                }
            },
            error: function (data) { console.log(data); }
        });
    }


    function switchText(caller) {

        let text = "";

        switch(caller) {
            case "destroy":
                text = "Excluir";
                return text;
            case "update":
                text = "Atualizar";
                return text;
            case "store":
                text = "Salvar";
                return text;
        }

    }


    function ajaxGetId(url, caller) {
        $.ajax({
            url: url,
            type: "GET",
            contentType: false,
            processData: false,
            cache: false,
            dataType: "json",
            beforeSend: function (data) {
                removeClassHasError(); /* remove a class has-error */

                /* antes de enviar, desabilitar botão */
                gid(caller)
                    .text("Aguarde")
                    .attr('disabled', 'disabled');

            },
            success: function (data) {
                if (data.errors) {

                    // console.log('if (data.errors): ' + data);
                    console.log('Guru Meditation Error');

                } else {
                    // console.log(data.data);
                    $.each( data.data, function( key, value ) {

                        // populate ativo
                        if(key === 'ativo') { $("input[name=ativo][value=" + value + "]").prop("checked", true); }

                        // populate users
                        if(key === 'users') {
                            let val = [];
                            $.each( value, function( users, user ) {
                                val.push(user['id']);
                            });
                            $select2user.val(val).trigger('change');
                        }

                        // populate others
                        gid(key).val(value);

                        gid(caller)
                            .text(switchText(caller))
                            .removeAttr("disabled");
                    });
                }
            },
            error: function (data) { console.log(data); }
        });
    }

    /**
     * Return jQuery HTMLElement by ID
     *
     * @param id
     * @returns {jQuery|HTMLElement}
     */
    function gid(id){
        return $("#" + id);
    }


    /**
     * SUBMIT FORM
     */
    $('#formPermissao').on('submit', function (e) {
        e.preventDefault();

        // Get the clicked button
        let caller = document.activeElement.id;

        // console.log('run: formPermissao on submit function...');
        // console.log('caller: ' + caller);
        // console.log('func: ajaxSubmitForm()...');

        switch(caller) {
            case "destroy":  // excluir registro
                ajaxSubmitForm(urlPermissaoDestroy, 'destroy');
                break;
            case "store":   // salvar form
                ajaxSubmitForm(urlPermissaoStore, 'store');
                break;
            case "update":  // atualizar form
                ajaxSubmitForm(urlPermissaoUpdate, 'update');
                break;
        }

    });


    // $destroy.on('click', function () {
    //     ajaxSubmitForm(urlPermissaoDestroy, 'destroy');
    // });



    // console.log('document.ready');
});
