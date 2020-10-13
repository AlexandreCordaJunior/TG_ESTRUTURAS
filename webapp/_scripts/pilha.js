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
        $('#alert .message').text("O campo número está vazio");
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

    if ($('#pilha > div').length >= 7) {
        $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
        $('#alert .message').text("A pilha está cheia");
        $('#numero').val('');
        return 0;
    }

    await destacaCodigo(velocidade, [1, 2, 3, 4]);

    var txtNumero = $('#numero').val();

    $('#numero').prop('disabled', true);
    $('#adicionar').prop('disabled', true);
    $('#remover').prop('disabled', true);
    $('#limpar').prop('disabled', true);
    $('#velocidade').prop('disabled', true);

    $('#pilha > div').connections('remove');

    $('<div />', {
        html: $('#numero').val(),
        class: 'circulo-pilha'
    }).prependTo('#pilha').hide().fadeIn().animate({
        'left': '0px'
    }, {
        duration: velocidade,
        start: () => {
            animation = true;
        },
        complete: () => {
            $('#pilha > div:first-child').connections({
                to: $('#pilha > div'),
                css: {
                    'z-index': '-1',
                    'border': '3px solid #27ae60'
                }
            });

            if (!document.getElementById('head')) {
                $('<span>', {
                    html: 'Head', id: 'head',
                    css: {
                        color: '#EA2027',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        position: 'absolute',
                        left: '50px'
                    }
                }).appendTo('#pilha > div:first-child').hide().fadeIn();
            } else {
                $('#head').appendTo('#pilha > div:first-child').hide().fadeIn();
            }

            if (!document.getElementById('tail')) {
                $('<span>', {
                    html: 'Tail', id: 'tail',
                    css: {
                        color: '#EA2027',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        position: 'absolute',
                        left: '95px'
                    }
                }).appendTo('#pilha > div:last-child').hide().fadeIn();
            } else if ($('#pilha > div').length == 2) {
                $('#tail').css({
                    left: '50px'
                }).appendTo('#pilha > div:last-child').hide().fadeIn();
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
    $('#alert .message').text(`O número ${txtNumero} foi adicionado na pilha`);
}

async function remove(velocidade, animation) {

    if ($('#pilha > div').length == 0) {
        await destacaCodigo(velocidade, [1, 2, 3]);
        $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
        $('#alert .message').text("A pilha já está vazia");
        return 0;
    }

    $('#pilha > div:first-child').css({
        'background-color': '#EA2027'
    }).animate({
        'left': '-30px'
    }, {
        duration: velocidade,
        start: async () => {
            await destacaCodigo(velocidade, [4]);
            animation = true;

            var length = $('#pilha > div').length;
            if (length == 1) {
                $('#head').remove();
                $('#tail').remove();
            } else if (length == 2) {
                $('#tail').css({
                    left: '95px'
                }).appendTo('#pilha > div:last-child').hide().fadeIn();
                $('#head').appendTo(`#pilha > div:nth-child(2)`).hide().fadeIn();
            } else {
                $('#head').appendTo(`#pilha > div:nth-child(2)`).hide().fadeIn();
            }

            $('#pilha > div').connections('remove');

            $('#numero').val('');
            $('#numero').prop('disabled', true);
            $('#adicionar').prop('disabled', true);
            $('#remover').prop('disabled', true);
            $('#limpar').prop('disabled', true);
            $('#velocidade').prop('disabled', true);
        },
        complete: () => {
            $('#pilha > div:first-child').fadeOut(() => {
                $('#pilha > div:first-child').remove();

                $('#pilha > div:first-child').connections({
                    to: $('#pilha > div'),
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
    $('#alert .message').text("O último elemento inserido na pilha foi removido");
}

function clean() {
    if ($('#pilha > div').length == 0) {
        $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
        $('#alert .message').text("A pilha já está vazia");
        return 0;
    }

    $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-success');
    $('#alert .message').text("Todos os números da pilha foram removidos");

    $('#pilha > div').remove();
}

$('document').ready(() => {

    $("#linguagem").change(() => {

    });

    //adicionar, remover, limpar
    $('#adicionar').click(() => {
        $("#codigo").load("template/pilha/pilha_inserir.html", undefined, () => {
            add(velocidade, animation);
        });
    });

    $('#remover').click(() => {
        $("#codigo").load("template/pilha/pilha_remover.html", undefined, () => {
            remove(velocidade, animation);
        });
    });

    $("#limpar").click(() => {
        clean();
    });

    var velocidade = 1000; // Velocidade padrão (1 segundo)
    var animation = false;

    $('#velocidade').change(() => {
        velocidade = $('#velocidade').val() * -1000;
        /* $('#txtvelocidade').text($('#velocidade').val() * -1); <- exibe o valor atual na tela (removido temporariamente)*/
    });

    $('#linguagem').change(() => {
        console.log(`Linguagem atual: ${$('#linguagem').val()}`);
    });

    /* Caso mude o tamanho da janela do navegador */
    $(window).resize(() => {
        if (animation == false) {
            $('#pilha > div').connections('remove');

            $('#pilha > div:first-child').connections({
                to: $('#pilha > div'),
                css: {
                    'z-index': '-1',
                    'border': '3px solid #27ae60'
                }
            });
        } else {
            $('#pilha > div').connections('remove');
        }
    });
});