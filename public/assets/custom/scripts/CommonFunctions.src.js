
/**
 * Ajax Promise (POST)
 *
 * @param {String} url - Endereço da consulta.
 * @param {Object} form - FormData(form).
 * @return {Object} Returns an Promise object.
 */
function postPromise(url, form) {
    return $.ajax({
        method: 'POST',
        dataType: 'json',
        data: form,
        url: url,
        contentType: false,
        processData: false,
        cache: false,
    });
}

/**
 * Ajax Promise (GET)
 *
 * @param {string} url - endereço da consulta.
 * @return {Object} Returns an Promise object.
 */
function getPromise(url) {
    return $.get({
        dataType: 'json',
        method: 'GET',
        url: url,
    });
}

function fncSwalError(data) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
    });

    console.error(data || null);
}

function fncSwalWarning(data) {
    Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: data,
    });

    console.error(data || null);
}

function clearInput() {

    $(':input').each(function () {

        const type = this.type;

        const tag = this.tagName.toLowerCase(); // normalize case

        if (type === 'text' || type === 'email' || type === 'password' || tag === 'textarea' || type === 'datetime-local' || type === 'date' || type === 'file')
            this.value = '';

        if (type === 'number')
            this.value = 1;

        if (type === 'checkbox' || type === 'radio')
            this.checked = false;
    });
}

function isUndefinedOrNull(value) {
    const undefined = void(0);
    const nulo = null;
    return value === undefined || value === nulo;
}
