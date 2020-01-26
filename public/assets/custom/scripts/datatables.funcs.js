function renderAtivo(data, type, full, meta) {

    // return (full['ativo']) ? full['ativo'] : '-';

    if ( full['ativo'] ) {
        if ( full['ativo'] === 'N' ) {
            return '<span class="label label-danger">' + full['ativo'] +
                '</span>';
        } else {
            return '<span class="label label-success">' + full['ativo'] +
                '</span>';
        }
    } else {
        return '-';
    }
}

function prettyAtivo(value){
    console.log(value);

    const rd = (value) ? value : 'N';

    if ( value ) {
        if ( value === 'N' ) {
            return '<span class="label label-danger">' + value +
                '</span>';
        } else {
            return '<span class="label label-success">' + value +
                '</span>';
        }
    } else {
        return '-';
    }

}

