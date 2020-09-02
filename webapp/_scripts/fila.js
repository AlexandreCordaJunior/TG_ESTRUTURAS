let lastPage = `templates/${$("#linguagem").val()}/fila/fila_geral.html`;

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

async function add(velocidade, animation) {
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

    if ($('#fila > div').length >= 7) {
        alert('ERRO: Fila cheia.');
        $('#numero').val('');
        return 0;
    }
    let promise;

    if ($("#linguagem").val() === "c") {
        promise = destacaCodigo(velocidade, [1, 2, 3]);
    }
    else {
        promise = destacaCodigo(velocidade, [1]);
    }
    $('#numero').prop('disabled', true);
    $('#adicionar').prop('disabled', true);
    $('#remover').prop('disabled', true);
    $('#limpar').prop('disabled', true);
    $('#velocidade').prop('disabled', true);

    await promise;
    if ($("#fila")[0].children.length === 0) {
        if ($("#linguagem").val() === "c") {
            destacaCodigo(velocidade, [5, 6, 7]);
        }
        else {
            destacaCodigo(velocidade, [3, 4]);
        }
    }
    else {
        if ($("#linguagem").val() === "c") {
            destacaCodigo(velocidade, [5, 8, 9, 10, 11]);
        }
        else {
            destacaCodigo(velocidade, [3, 5, 6, 7]);
        }
    }
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
        complete: () => {
            $('#fila > div:first-child').connections({
                to: $('#fila > div'),
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
                        top: '40px',
                        left: '2px'
                    }
                }).appendTo('#fila > div:first-child').hide().fadeIn();
            } else {
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
}

async function remove(velocidade, animation) {
    const linguagem = $("#linguagem").val();
    if ($('#fila > div').length == 0) {
        await destacaCodigo(velocidade, [1, 2, 3]);
        alert('ERRO: A fila já está vazia.');
        return 0;
    }

    if ($("#fila")[0].children.length === 1) {
        if (linguagem === "c") {
            destacaCodigo(velocidade, [5, 6, 7, 8, 12]);
        }
        else {
            destacaCodigo(velocidade, [5, 6]);
        }
    }
    else {
        if (linguagem === "c") {
            destacaCodigo(velocidade, [5, 6, 9, 10, 11, 12]);
        }
        else {
            destacaCodigo(velocidade, [5, 7, 8]);
        }
    }
    $('#fila > div:first-child').css({
        'background-color': '#EA2027'
    }).animate({
        'top': '30px'
    }, {
        duration: velocidade,
        start: () => {
            animation = true;

            var length = $('#fila > div').length;
            if (length == 1) {
                $('#head').remove();
                $('#tail').remove();
            } else if (length == 2) {
                $('#tail').css({
                    top: '65px',
                    left: '8px'
                }).appendTo('#fila > div:last-child').hide().fadeIn();
                $('#head').appendTo(`#fila > div:nth-child(2)`).hide().fadeIn();
            } else {
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
}

function clean() {
    if ($('#fila > div').length == 0) {
        alert('ERRO: A fila já está vazia.');
        return 0;
    }

    $('#fila > div').remove();
}

$('document').ready(() => {
    $("#codigo").load(`templates/${$("#linguagem").val()}/fila/fila_geral.html`);
    $("#linguagem").change(() => {
        if (lastPage.includes("inserir")) {
            if (lastPage !== `templates/${$("#linguagem").val()}/fila/inserir.html`) {
                $("#codigo").load(`templates/${$("#linguagem").val()}/fila/inserir.html`);
                lastPage = `templates/${$("#linguagem").val()}/fila/inserir.html`;
            }
        } else if (lastPage.includes("remover")) {
            if (lastPage !== `templates/${$("#linguagem").val()}/fila/remover.html`) {
                $("#codigo").load(`templates/${$("#linguagem").val()}/fila/remover.html`);
                lastPage = `templates/${$("#linguagem").val()}/fila/remover.html`;
            }
        }
        else {
            if (lastPage !== `templates/${$("#linguagem").val()}/fila/fila_geral.html`) {
                $("#codigo").load(`templates/${$("#linguagem").val()}/fila/fila_geral.html`);
                lastPage = `templates/${$("#linguagem").val()}/fila/fila_geral.html`;
            }
        }
    });

    var velocidade = 1000; // Velocidade padrão (1 segundo)
    var animation = false;

    $('#velocidade').change(() => {
        velocidade = $('#velocidade').val() * -1000;
        /* $('#txtvelocidade').text($('#velocidade').val() * -1); <- exibe o valor atual na tela (removido temporariamente)*/
    });

    $('#adicionar').click(() => {
        if (lastPage !== `templates/${$("#linguagem").val()}/fila/inserir.html`) {
            $("#codigo").load(`templates/${$("#linguagem").val()}/fila/inserir.html`, undefined, () => {
                add(velocidade, animation);
            });
            lastPage = `templates/${$("#linguagem").val()}/fila/inserir.html`;
        }
        else {
            add(velocidade, animation);
        }
    });

    $('#remover').click(() => {
        if (lastPage !== `templates/${$("#linguagem").val()}/fila/remover.html`) {
            $("#codigo").load(`templates/${$("#linguagem").val()}/fila/remover.html`, undefined, () => {
                remove(velocidade, animation);
            });
            lastPage = `templates/${$("#linguagem").val()}/fila/remover.html`;
        }
        else {
            remove(velocidade, animation);
        }
    });

    $("#limpar").click(() => {
        if (lastPage !== `templates/${$("#linguagem").val()}/fila/fila_geral.html`) {
            $("#codigo").load(`templates/${$("#linguagem").val()}/fila/fila_geral.html`, undefined, () => {
                clean();
            });
            lastPage = `templates/${$("#linguagem").val()}/fila/fila_geral.html`;
        }
        else {
            clean();
        }
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