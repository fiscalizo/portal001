/**
 * Ajax Promise (POST)
 *
 * @param {String} url - Endereço da consulta.
 * @param {Object} form - FormData(form).
 * @return {Object} Returns an Promise object.
 */
function postPromise(url, form)
{
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
function getPromise(url)
{
    return $.get({
        dataType: 'json',
        method: 'GET',
        url: url,
    });
}