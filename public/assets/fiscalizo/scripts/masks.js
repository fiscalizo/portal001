$(document).ready(function () {

    // TELEFONE
    var fone = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },
        telopts = {
            onKeyPress: function (val, e, field, options) {
                field.mask(fone.apply({}, arguments), options);
            }
        };

    $('#telefone1').mask(fone, telopts);
    $('#telefone2').mask(fone, telopts);
    $('#telefone3').mask(fone, telopts);


    let $cnpjcpf_number = $('#cnpjcpf_number');


    $cnpjcpf_number.keyup(function (e)
    {
        let $val = $(this).val();
        let $length = $val.length;
        let $mask = ( $length > 14 ) ? '00.000.000/0000-00' : '000.000.000-009999';

        $('#cnpjcpf_number').mask($mask);
    });


    // CEP
    var cep = $('#cep');
    cep.mask('00000-000');
});
