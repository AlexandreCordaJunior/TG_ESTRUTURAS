function destacaCodigo(tempo, vetNum) {
    return new Promise(function (fResolve) {
        let children = document.getElementsByTagName("code")[0].children;

        let qtdNum = vetNum.length;
        for (let i = 0; i < qtdNum; i++) {
            setTimeout(() => {
                children[vetNum[i]].classList.add("destaque");
                setTimeout(() => {
                    children[vetNum[i]].classList.toggle("destaque");
                    if (i === qtdNum - 1) {
                        fResolve();
                    }
                }, tempo / 6);
            }, (tempo / 6) * i);
        }
    }.bind(this));
}

async function add(velocidade, animation) {

    if ($('#indice').val() == '') {
        $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
        $('#alert .message').text("O campo índice está vazio");
        $('#indice').focus();
        return 0;
    }

    if ($('#indice').val() < 0) {
        $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
        $('#alert .message').text("O campo índice deve ser igual ou maior que 0");
        $('#indice').val('');
        $('#indice').focus();
        return 0;
    }

    if ($('#numero').val() == '') {
        $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
        $('#alert .message').text("O campo número está vazio");
        $('#numero').focus();
        return 0;
    }

    if ($('#numero').val().length > 2) {
        $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
        $('#alert .message').text("O número deve ter até 2 dígitos");
        $('#numero').val('');
        $('#numero').focus();
        return 0;
    }

    if ($('#lista > div').length == 0 && $('#indice').val() != 0) {
        $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
        $('#alert .message').text("O índice do primeiro elemento da lista deve ser o 0");
        $('#indice').val('');
        $('#indice').focus();
        return 0;
    }

    if ($('#lista > div').length >= 7) {
        $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
        $('#alert .message').text("A lista está cheia");
        return 0;
    }

    if ($('#indice').val() > $('#lista > div').length) {
        await destacaCodigo(velocidade, [1, 2, 3, 4]);
        $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
        $('#alert .message').text(`O próximo índice deve ser o ${$('#lista > div').length}`);
        $('#indice').val('');
        $('#indice').focus();
        return 0;
    }

    await destacaCodigo(velocidade, [5, 6, 7, 9, 10]);

    var txtIndice = $('#indice').val() - 0;
    var txtNumero = $('#numero').val() - 0;

    if ($('#indice').val() == 0) {
        $('#indice').prop('disabled', true);
        $('#numero').prop('disabled', true);
        $('#adicionar').prop('disabled', true);
        $('#remover').prop('disabled', true);
        $('#limpar').prop('disabled', true);
        $('#velocidade').prop('disabled', true);

        $('#lista > div').connections('remove');

        $('<div>', {
            html: $('#numero').val() - 0,
            class: 'circulo'
        }).prependTo('#lista').hide().fadeIn().animate({
            'top': '0px'
        }, {
            duration: velocidade, /* Poderia ser o valor da velocidade, mas é muito lento */
            start: async () => {
                await destacaCodigo(velocidade, [17, 18, 19, 20, 25]);
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
            html: $('#numero').val() - 0,
            class: 'circulo'
        }).insertAfter(`#lista > div:nth-child(${$('#indice').val()})`).hide().fadeIn().animate({
            'top': '0px'
        }, {
            duration: velocidade,
            start: async () => {
                animation = true;
            },
            complete: async () => {
                for (let i = 0; i < $('#indice').val(); i++) {
                    await destacaCodigo(velocidade, [12, 13, 14, 15]);
                }
                await destacaCodigo(velocidade, [21, 22, 23, 24, 25]);
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

    $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-success');
    $('#alert .message').text(`O número ${txtNumero} foi adicionado na posição ${txtIndice}`);
}

async function remove(velocidade, animation) {
    if ($('#lista > div').length == 0) {
        await destacaCodigo(velocidade, [1, 2, 3, 4]);
        $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
        $('#alert .message').text("A lista já está vázia");
        return 0;
    }

    if ($('#indice').val() == '') {
        $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
        $('#alert .message').text("O campo índice está vazio");
        $('#indice').focus();
        return 0;
    }

    var indice = Number($('#indice').val()) + 1;

    if (indice < 1 || indice > $('#lista > div').length) {
        await destacaCodigo(velocidade, [6, 7, 8, 9]);
        $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
        $('#alert .message').text("O índice digitado não está na fila");
        $('#indice').val('');
        $('#indice').focus();
        return 0;
    }

    $('#lista > div').connections('remove');

    await destacaCodigo(velocidade, [11, 12]);

    $(`#lista > div:nth-child(${indice})`).css({
        'position': 'relative',
        'background-color': '#EA2027'
    }).animate({
        'top': '30px'
    }, {
        duration: velocidade,
        start: async () => {
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

            for (let i = 0; i < indice - 1; i++) {
                await destacaCodigo(velocidade, [14, 15, 16, 17]);
            }
            if (indice - 1) {
                await destacaCodigo(velocidade, [22, 23, 24]);
            }
            else {
                await destacaCodigo(velocidade, [19, 20, 21]);
            }

            animation = false;
        }
    });

    $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-success');
    $('#alert .message').text("O índice digitado foi removido");
}

function clean() {
    if ($('#lista > div').length == 0) {
        $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
        $('#alert .message').text("A lista já está vázia");
        return 0;
    }

    $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-success');
    $('#alert .message').text("Todos os números da lista foram removidos");

    $('#lista > div').remove();
}


$('document').ready(() => {

    $("#linguagem").change(() => {

    });

    //adicionar, remover, limpar
    $('#adicionar').click(() => {
        $("#codigo").load("template/lista/lista_inserir.html", undefined, () => {
            add(velocidade, animation);
        });
    });

    $('#remover').click(() => {
        $("#codigo").load("template/lista/lista_remover.html", undefined, () => {
            remove(velocidade, animation);
        });
    });

    $("#limpar").click(() => {
        clean();
    });

    var velocidade = $('#velocidade').val() * -1000;
    $('#txtvelocidade').text(`${velocidade / 1000}`);
    
    var animation = false;

    $('#velocidade').change(() => {
        velocidade = $('#velocidade').val() * -1000;
        $('#txtvelocidade').text(`${velocidade / 1000}`);
    });

    $('#linguagem').change(() => {
        console.log(`Linguagem atual: ${$('#linguagem').val()}`);
    });

    /* Caso mude o tamanho da janela do navegador */
    $(window).resize(() => {
        if (animation == false) {
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