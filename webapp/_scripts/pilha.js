let lastPage = `templates/${$("#linguagem").val()}/pilha/pilha_geral.html`;

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
                }, tempo / 3);
            }, (tempo / 3) * i);
        }
    }.bind(this));
}

function add(velocidade, animation) {

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

    if ($('#pilha > div').length >= 7) {
        alert('ERRO: Pilha cheia.');
        $('#numero').val('');
        return 0;
    }

    const linguagem = $("#linguagem").val();
    if (linguagem === "c") {
        destacaCodigo(velocidade, [1, 2, 3, 4]);
    }
    else {
        destacaCodigo(velocidade, [1, 2])
    }

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
}

async function remove(velocidade, animation) {
    const linguagem = $("#linguagem").val();

    if ($('#pilha > div').length == 0) {
        if (linguagem === "c") {
            await destacaCodigo(velocidade, [1, 2, 3]);
        }
        else {
            await destacaCodigo(velocidade, [1, 2, 3])
        }
        alert('ERRO: A pilha já está vazia.');
        return 0;
    }

    $('#pilha > div:first-child').css({
        'background-color': '#EA2027'
    }).animate({
        'left': '-30px'
    }, {
        duration: velocidade,
        start: () => {
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

            if (linguagem === "c") {
                destacaCodigo(velocidade, [4, 5, 6, 7]);
            }
            else {
                destacaCodigo(velocidade, [5, 6, 7])
            }
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
}

function clean() {
    if ($('#pilha > div').length == 0) {
        alert('ERRO: A pilha já está vazia.');
        return 0;
    }

    $('#pilha > div').remove();
}

$('document').ready(() => {

    $("#codigo").load(`templates/${$("#linguagem").val()}/pilha/pilha_geral.html`);

    $("#linguagem").change(() => {
        if (lastPage.includes("inserir")) {
            if (lastPage !== `templates/${$("#linguagem").val()}/pilha/inserir.html`) {
                $("#codigo").load(`templates/${$("#linguagem").val()}/pilha/inserir.html`);
                lastPage = `templates/${$("#linguagem").val()}/pilha/inserir.html`;
            }
        } else if (lastPage.includes("remover")) {
            if (lastPage !== `templates/${$("#linguagem").val()}/pilha/remover.html`) {
                $("#codigo").load(`templates/${$("#linguagem").val()}/pilha/remover.html`);
                lastPage = `templates/${$("#linguagem").val()}/pilha/remover.html`;
            }
        }
        else {
            if (lastPage !== `templates/${$("#linguagem").val()}/pilha/pilha_geral.html`) {
                $("#codigo").load(`templates/${$("#linguagem").val()}/pilha/pilha_geral.html`);
                lastPage = `templates/${$("#linguagem").val()}/pilha/pilha_geral.html`;
            }
        }
    });

    //adicionar, remover, limpar
    $('#adicionar').click(() => {
        if (lastPage !== `templates/${$("#linguagem").val()}/pilha/inserir.html`) {
            $("#codigo").load(`templates/${$("#linguagem").val()}/pilha/inserir.html`, undefined, () => {
                add(velocidade, animation);
            });
            lastPage = `templates/${$("#linguagem").val()}/pilha/inserir.html`;
        }
        else {
            add(velocidade, animation);
        }
    });

    $('#remover').click(() => {
        if (lastPage !== `templates/${$("#linguagem").val()}/pilha/remover.html`) {
            $("#codigo").load(`templates/${$("#linguagem").val()}/pilha/remover.html`, undefined, () => {
                remove(velocidade, animation);
            });
            lastPage = `templates/${$("#linguagem").val()}/pilha/remover.html`;
        }
        else {
            remove(velocidade, animation);
        }
    });

    $("#limpar").click(() => {
        if (lastPage !== `templates/${$("#linguagem").val()}/pilha/pilha_geral.html`) {
            $("#codigo").load(`templates/${$("#linguagem").val()}/pilha/pilha_geral.html`, undefined, () => {
                clean();
            });
            lastPage = `templates/${$("#linguagem").val()}/pilha/pilha_geral.html`;
        }
        else {
            clean();
        }
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