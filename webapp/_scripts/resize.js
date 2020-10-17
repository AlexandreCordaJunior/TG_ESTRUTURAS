var resize = () => {
	if($(window).width() <= 480) {
		if(!document.getElementById('aviso')) {
            $('<div />', {
                class: 'alert alert-danger my-2 mx-1',
                html: 'Por questões visuais não é possível utilizar a ferramenta nesse dispositivo',
                id: 'aviso'
            }).appendTo('body');
        }

        $('#wrapper').hide();
	} else {
		if(document.getElementById('aviso')) {
            $('#aviso').remove();
        }

        $('#wrapper').show();
	}
}