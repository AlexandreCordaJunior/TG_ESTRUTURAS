function destacaCodigo(tempo, vetNum) {
    return new Promise(function(fResolve){
        let children = document.getElementsByTagName("code")[0].children;

        let qtdNum = vetNum.length;
        for(let i = 0; i < qtdNum; i++) {
            setTimeout(() => {
                children[vetNum[i]].classList.add("destaque");
                setTimeout(() => {
                    children[vetNum[i]].classList.toggle("destaque");
                    if(i === qtdNum - 1) {
                        fResolve();
                    }
                }, tempo / 3);
            }, (tempo / 3) * i);
        }
    }.bind(this));
}

async function add(velocidade, animation) {

    if ($('#indice').val() == '') {
        alert('ERRO: O campo índice está vázio.');
        $('#indice').focus();
        return 0;
    }

    if ($('#indice').val() < 0) {
        alert('ERRO: O campo índice deve ser igual ou maior que 0.');
        $('#indice').val('');
        $('#indice').focus();
        return 0;
    }

    if ($('#numero').val() == '') {
        alert('ERRO: O campo número está vázio.');
        $('#numero').focus();
        return 0;
    }

    if ($('#numero').val().length > 2) {
        alert('ERRO: O número digitado deve ter até 2 dígitos.');
        $('#numero').val('');
        $('#numero').focus();
        return 0;
    }

    if ($('#lista > div').length == 0 && $('#indice').val() != 0) {
        alert('ERRO: O índice do primeiro elemento da lista deve ser o 0.');
        $('#indice').val('');
        $('#indice').focus();
        return 0;
    }

    if ($('#lista > div').length >= 7) {
        alert('ERRO: Lista cheia.');
        return 0;
    }

    if ($('#indice').val() > $('#lista > div').length) {
        alert(`ERRO: O próximo índice deve ser o ${$('#lista > div').length}.`);
        $('#indice').val('');
        $('#indice').focus();
        return 0;
    }

    if ($('#indice').val() == 0) {
        $('#indice').prop('disabled', true);
        $('#numero').prop('disabled', true);
        $('#adicionar').prop('disabled', true);
        $('#remover').prop('disabled', true);
        $('#limpar').prop('disabled', true);
        $('#velocidade').prop('disabled', true);

        $('#lista > div').connections('remove');

        $('<div>', {
            html: $('#numero').val(),
            class: 'circulo'
        }).prependTo('#lista').hide().fadeIn().animate({
            'top': '0px'
        }, {
            duration: velocidade, /* Poderia ser o valor da velocidade, mas é muito lento */
            start: () => {
                animation = true;
            },
            complete: async () => {
                $('#lista > div:first-child').connections({
                    to: $('#lista > div'),
                    css: {
                        'z-index': '-1',
                        'border': '3px solid #58B19F'
                    }
                });

                $('#indice').prop('disabled', false);
                $('#numero').prop('disabled', false);
                $('#adicionar').prop('disabled', false);
                $('#remover').prop('disabled', false);
                $('#limpar').prop('disabled', false);
                $('#velocidade').prop('disabled', false);

                $('#indice').val('');
                $('#numero').val('');
                $('#indice').focus();

                animation = false;
            }
        });
    }

    if ($('#indice').val() != 0) {
        $('#indice').prop('disabled', true);
        $('#numero').prop('disabled', true);
        $('#adicionar').prop('disabled', true);
        $('#remover').prop('disabled', true);
        $('#limpar').prop('disabled', true);
        $('#velocidade').prop('disabled', true);

        $('#lista > div').connections('remove');

        $('<div>', {
            html: $('#numero').val(),
            class: 'circulo'
        }).insertAfter(`#lista > div:nth-child(${$('#indice').val()})`).hide().fadeIn().animate({
            'top': '0px'
        }, {
            duration: velocidade,
            start: () => {
                animation = true;
            },
            complete: async () => {
                $('#lista > div:first-child').connections({
                    to: $('#lista > div'),
                    css: {
                        'z-index': '-1',
                        'border': '3px solid #58B19F'
                    }
                });

                $('#indice').prop('disabled', false);
                $('#numero').prop('disabled', false);
                $('#adicionar').prop('disabled', false);
                $('#remover').prop('disabled', false);
                $('#limpar').prop('disabled', false);
                $('#velocidade').prop('disabled', false);

                $('#indice').val('');
                $('#numero').val('');
                $('#indice').focus();

                animation = false;
            }
        });
    }
}

async function remove(velocidade, animation) {
    if ($('#lista > div').length == 0) {
        alert('ERRO: A lista já está vázia.');
        return 0;
    }

    if ($('#indice').val() == '') {
        alert('ERRO: O campo índice está vazio.');
        $('#indice').focus();
        return 0;
    }

    var indice = Number($('#indice').val()) + 1;

    if (indice < 1 || indice > $('#lista > div').length) {
        alert('ERRO: O índice digitado não está na lista.');
        $('#indice').val('');
        $('#indice').focus();
        return 0;
    }

    $('#lista > div').connections('remove');

    $(`#lista > div:nth-child(${indice})`).css({
        'position': 'relative',
        'background-color': '#EA2027'
    }).animate({
        'top': '30px'
    }, {
        duration: velocidade,
        start:  () => {
            $('#indice').prop('disabled', true);
            $('#numero').prop('disabled', true);
            $('#adicionar').prop('disabled', true);
            $('#remover').prop('disabled', true);
            $('#limpar').prop('disabled', true);
            $('#velocidade').prop('disabled', true);

            animation = true;
        },
        complete: async () => {
            $(`#lista > div:nth-child(${indice})`).remove();

            $('#lista > div:first-child').connections({
                to: $('#lista > div'),
                css: {
                    'z-index': '-1',
                    'border': '3px solid #58B19F'
                }
            });

            $('#indice').prop('disabled', false);
            $('#numero').prop('disabled', false);
            $('#adicionar').prop('disabled', false);
            $('#remover').prop('disabled', false);
            $('#limpar').prop('disabled', false);
            $('#velocidade').prop('disabled', false);

            $('#indice').val('');
            $('#numero').val('');
            $('#indice').focus();

            animation = false;
        }
    });
}

function clean() {
    if ($('#lista > div').length == 0) {
        alert('ERRO: A lista já está vázia.');
        return 0;
    }

    $('#lista > div').remove();
}


$('document').ready(() => {

    $("#linguagem").change(() => {

    });

    //adicionar, remover, limpar
    $('#adicionar').click(() => {
        add(velocidade, animation);
    });

    $('#remover').click(() => {
        remove(velocidade, animation);
    });

    $("#limpar").click(() => {
        clean();
    });

    var velocidade = 250; // Velocidade padrão (1 segundo)
    var animation = false;

    $('#velocidade').change(() => {
        velocidade = $('#velocidade').val() * -250;
        /* $('#txtvelocidade').text($('#velocidade').val() * -1); */
    });

    $('#linguagem').change(() => {
        console.log(`Linguagem atual: ${$('#linguagem').val()}`);
    });

    /* Caso mude o tamanho da janela do navegador */
    $(window).resize(() => {
        if(animation == false) {
            $('#lista > div').connections('remove');

            $('#lista > div:first-child').connections({
                to: $('#lista > div'),
                css: {
                    'z-index': '-1',
                    'border': '3px solid #27ae60'
                }
            });
        } else {
            $('#lista > div').connections('remove');
        }
    });
});