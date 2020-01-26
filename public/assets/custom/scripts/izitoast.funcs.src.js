function iziToastShow(title, message, tipo)
{
    const settings = switchSettings(tipo || 1);

    iziToast.show({
        title: title,
        titleColor: 'white',
        fontsize: 14,

        message: message,
        messageSize: 14,
        messageColor: 'white',

        position: 'topRight',
        maxWidth: 500,

        backgroundColor: settings['backgroundColor'],
        progressBarColor: settings['progressBarColor'],

        iconUrl: settings['iconUrl'],

        layout: 2,

        // 2 - Replaces the toast that was already open.
        displayMode: 2,
    });
}

function iziToastHide()
{
    const toast = document.querySelector('.iziToast') || null;
    if (toast) {
        iziToast.hide({}, toast);
    }
}

function switchSettings(tipo)
{
    switch (tipo) {
        case 1:
        default:
            return {
                backgroundColor: '#499ED7',
                progressBarColor: '#2E8FD1',
                iconUrl: '/assets/material.io/' +
                    'baseline-info-24px-white.svg',
            };

        case 2:
            return {
                backgroundColor: '#FF9800',
                progressBarColor: '#CF6E00',
                iconUrl: '/assets/material.io/' +
                    'baseline-warning-24px-white.svg',
            };

        case 3:
            return {
                backgroundColor: '#EC2027',
                progressBarColor: '#C81117',
                iconUrl: '/assets/material.io/' +
                    'baseline-error-24px-white.svg',
            };
    }
}
