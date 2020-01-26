const Noticia = new function() {

    this.init = function (element, dataset) {
        this.element = element;
        this.dataset = dataset || [];
    };

    this.render = function() {

        var height = 0;

        const $element = $(this.element);

        // this.dataset.forEach(item => {
        //     $element.append( Noticia.whitebox(item['id'], item['title'], item['image']) );
        //     height += 110;
        // });

        this.dataset.forEach(function (item) {
            $element.append( Noticia.whitebox(item['id'], item['title'], item['image']) );
            height += 110;
        });

        $('.white-box-noticia').css('height', height + 45);
    };

    this.whitebox = function (id, title, image) {
        var pic = (image !== '') ? '<img alt="noticia" style="max-width: 100%; max-height: 70px;" src="' + image + '">' : '';
        var coltitle = (image !== '') ? 'col-xs-8' : 'col-xs-12';
        return '' +
            '<div id="' + id + '" class="white-box white-box-clip">' +
            '<div class="row">' +
            '<div class="' + coltitle +'">' +
            '<span class="text-with-ellipsis">' + title + '</span>' +
            '</div>' +
            '<div class="col-xs-4 text-center">' +
            '<div class="div-img-clip">' + pic +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
};