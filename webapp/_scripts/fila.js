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
    if ($('#numero').val() == '') {
        $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
        $('#alert .message').text("O campo número está vázio");
        $('#numero').focus();
        return 0;
    }

    if ($('#numero').val().length > 2) {
        $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
        $('#alert .message').text("O número digitado deve ter até 2 dígitos");
        $('#numero').val('');
        $('#numero').focus();
        return 0;
    }

    if ($('#fila > div').length >= 7) {
        $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
        $('#alert .message').text("A fila está cheia");
        $('#numero').val('');
        return 0;
    }

    await destacaCodigo(velocidade, [1, 2, 3]);

    var txtNumero = $('#numero').val();

    $('#numero').prop('disabled', true);
    $('#adicionar').prop('disabled', true);
    $('#remover').prop('disabled', true);
    $('#limpar').prop('disabled', true);
    $('#velocidade').prop('disabled', true);

    $('<div />', {
        html: $('#numero').val(),
        class: 'circulo'
    }).appendTo('#fila').hide().fadeIn().animate({
        'top': '0px'
    }, {
        duration: velocidade,
        start: () => {
            animation = true;
        },
        complete: async () => {
            $('#fila > div:first-child').connections({
                to: $('#fila > div'),
                css: {
                    'z-index': '-1',
                    'border': '3px solid #27ae60'
                }
            });

            if (!document.getElementById('head')) {
                await destacaCodigo(velocidade, [5, 6, 7, 8]);
                $('<span>', {
                    html: 'Head', id: 'head',
                    css: {
                        color: '#EA2027',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        position: 'absolute',
                        top: '40px',
                        left: '2px'
                    }
                }).appendTo('#fila > div:first-child').hide().fadeIn();
            } else {
                await destacaCodigo(velocidade, [9, 10, 11, 12]);
                $('#head').appendTo('#fila > div:first-child').hide().fadeIn();
            }

            if (!document.getElementById('tail')) {
                $('<span>', {
                    html: 'Tail', id: 'tail',
                    css: {
                        color: '#EA2027',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        position: 'absolute',
                        top: '65px',
                        left: '8px'
                    }
                }).appendTo('#fila > div:last-child').hide().fadeIn();
            } else if ($('#fila > div').length >= 2) {
                $('#tail').css({
                    top: '40px',
                    left: '8px'
                }).appendTo('#fila > div:last-child').hide().fadeIn();
            }

            $('#numero').prop('disabled', false);
            $('#adicionar').prop('disabled', false);
            $('#remover').prop('disabled', false);
            $('#limpar').prop('disabled', false);
            $('#velocidade').prop('disabled', false);

            $('#numero').val('');
            $('#numero').focus();

            animation = false;
        }
    });

    $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-success');
    $('#alert .message').text(`O número ${txtNumero} foi adicionado na fila`);
}

async function remove(velocidade, animation) {
    if ($('#fila > div').length == 0) {
        await destacaCodigo(velocidade, [1, 2, 3, 4]);
        $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
        $('#alert .message').text("A fila já está vazia");
        return 0;
    }

    $('#fila > div:first-child').css({
        'background-color': '#EA2027'
    }).animate({
        'top': '30px'
    }, {
        duration: velocidade,
        start: async () => {
            animation = true;

            var length = $('#fila > div').length;
            if (length == 1) {
                await destacaCodigo(velocidade, [6, 7, 8, 9]);
                $('#head').remove();
                $('#tail').remove();
            } else if (length == 2) {
                await destacaCodigo(velocidade, [10, 11, 12]);
                $('#tail').css({
                    top: '65px',
                    left: '8px'
                }).appendTo('#fila > div:last-child').hide().fadeIn();
                $('#head').appendTo(`#fila > div:nth-child(2)`).hide().fadeIn();
            } else {
                await destacaCodigo(velocidade, [10, 11, 12]);
                $('#head').appendTo(`#fila > div:nth-child(2)`).hide().fadeIn();
            }

            $('#fila > div').connections('remove');

            $('#numero').val('');
            $('#numero').prop('disabled', true);
            $('#adicionar').prop('disabled', true);
            $('#remover').prop('disabled', true);
            $('#limpar').prop('disabled', true);
            $('#velocidade').prop('disabled', true);
        },
        complete: () => {
            $('#fila > div:first-child').fadeOut(() => {
                $('#fila > div:first-child').remove();

                $('#fila > div:first-child').connections({
                    to: $('#fila > div'),
                    css: {
                        'z-index': '-1',
                        'border': '3px solid #27ae60'
                    }
                });
            });

            $('#numero').prop('disabled', false);
            $('#adicionar').prop('disabled', false);
            $('#remover').prop('disabled', false);
            $('#limpar').prop('disabled', false);
            $('#velocidade').prop('disabled', false);

            $('#numero').focus();

            animation = false;
        }
    });

    $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-success');
    $('#alert .message').text("O primeiro elemento da fila foi removido");
}

function clean() {
    if ($('#fila > div').length == 0) {
        $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
        $('#alert .message').text("A fila já está vazia");
        return 0;
    }

    $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-success');
    $('#alert .message').text("Todos os números da fila foram removidos");

    $('#fila > div').remove();
}

$('document').ready(() => {
    var velocidade = 1000; // Velocidade padrão (1 segundo)
    var animation = false;

    $('#velocidade').change(() => {
        velocidade = $('#velocidade').val() * -1000;
        /* $('#txtvelocidade').text($('#velocidade').val() * -1); <- exibe o valor atual na tela (removido temporariamente)*/
    });

    $('#adicionar').click(() => {
        $("#codigo").load("template/fila/fila_inserir.html", undefined, () => {
            add(velocidade, animation);
        });
    });

    $('#remover').click(() => {
        $("#codigo").load("template/fila/fila_remover.html", undefined, () => {
            remove(velocidade, animation);
        });
    });

    $("#limpar").click(() => {
        clean();
    });

    /* Caso mude o tamanho da janela do navegador */
    $(window).resize(() => {
        if (animation == false) {
            $('#fila > div').connections('remove');

            $('#fila > div:first-child').connections({
                to: $('#fila > div'),
                css: {
                    'z-index': '-1',
                    'border': '3px solid #27ae60'
                }
            });
        } else {
            $('#fila > div').connections('remove');
        }
    });
});