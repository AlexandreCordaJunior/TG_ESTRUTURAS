let lastPage = `templates/${$("#linguagem").val()}/lista/lista_geral.html`;

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
    const linguagem = $("#linguagem").val();

    if ($('#indice').val() == '') {
        alert('ERRO: O campo índice está vázio.');
        $('#indice').focus();
        return 0;
    }

    if ($('#indice').val() < 0) {
        if(linguagem === "c") {
            await destacaCodigo(velocidade, [1, 2, 3, 4])
        }
        else {
            await destacaCodigo(velocidade, [1, 2, 3])
        }
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
        if(linguagem === "c") {
            await destacaCodigo(velocidade, [1, 2, 3, 4])
        }
        else {
            await destacaCodigo(velocidade, [1, 2, 3])
        }

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
        if(linguagem === "c") {
            await destacaCodigo(velocidade, [1, 2, 3, 4])
        }
        else {
            await destacaCodigo(velocidade, [1, 2, 3])
        }
        alert(`ERRO: O próximo índice deve ser o ${$('#lista > div').length}.`);
        $('#indice').val('');
        $('#indice').focus();
        return 0;
    }
    await destacaCodigo(velocidade, [1]);

    if(linguagem === "c") {
        await destacaCodigo(velocidade, [5, 6, 8, 9])
    }
    else {
        await destacaCodigo(velocidade, [5, 6, 7])
    }

    if ($('#indice').val() == 0) {
        if(linguagem === "c") {
            await destacaCodigo(velocidade, [10])
        }
        else {
            await destacaCodigo(velocidade, [9])
        }
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
                if(linguagem === "c") {
                    await destacaCodigo(velocidade, [14, 15, 16, 17, 22])
                }
                else {
                    await destacaCodigo(velocidade, [13, 14, 15, 19])
                }
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

        for(let i = 0; i < $('#indice').val(); i++) {
            if(linguagem === "c") {
                await destacaCodigo(velocidade, [10, 11, 12, 13]);
            }
            else {
                await destacaCodigo(velocidade, [9, 10, 11]);
            }
        }
        if(linguagem === "c") {
            await destacaCodigo(velocidade, [10]);
        }
        else {
            await destacaCodigo(velocidade, [9]);
        }

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
                if(linguagem === "c") {
                    await destacaCodigo(velocidade, [14, 18, 19, 20, 21, 22]);
                }
                else {
                    await destacaCodigo(velocidade, [13, 16, 17, 18, 19]);
                }

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
    const linguagem = $("#linguagem").val();

    if ($('#lista > div').length == 0) {
        if(linguagem === "c") {
            await destacaCodigo(velocidade, [1, 2, 3, 4])
        }
        else {
            await destacaCodigo(velocidade, [1, 2, 3])
        }
        alert('ERRO: A lista já está vázia.');
        return 0;
    }

    await destacaCodigo(velocidade, [1])


    if ($('#indice').val() == '') {
        alert('ERRO: O campo índice está vazio.');
        $('#indice').focus();
        return 0;
    }

    var indice = Number($('#indice').val()) + 1;

    if (indice < 1 || indice > $('#lista > div').length) {
        if(linguagem === "c") {
            await destacaCodigo(velocidade, [5, 6, 7, 8])
        }
        else {
            await destacaCodigo(velocidade, [5, 6, 7])
        }
        alert('ERRO: O índice digitado não está na lista.');
        $('#indice').val('');
        $('#indice').focus();
        return 0;
    }

    await destacaCodigo(velocidade, [5]);

    $('#lista > div').connections('remove');

    await destacaCodigo(velocidade, [9, 10]);

    for(let i = 0; i < $('#indice').val(); i++) {
        if(linguagem === "c") {
            await destacaCodigo(velocidade, [11, 12, 13, 14])
        }
        else {
            await destacaCodigo(velocidade, [11, 12, 13])
        }
    }

    await destacaCodigo(velocidade, [11]);

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
            if(linguagem === "c") {
                await destacaCodigo(velocidade, [16]);
            }

            if(parseInt($('#indice').val(), 10) === 0) {
                if(linguagem === "c") {
                    await destacaCodigo(velocidade, [18, 19, 20, 21]);
                }
                else {
                    await destacaCodigo(velocidade, [15, 16, 17]);
                }
            }
            else{
                if(linguagem === "c") {
                    await destacaCodigo(velocidade, [18, 21, 22, 23]);
                }
                else {
                    await destacaCodigo(velocidade, [15, 17, 18]);
                }
            }

            if(linguagem === "c") {
                await destacaCodigo(velocidade, [24]);
            }

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

    $("#codigo").load(`templates/${$("#linguagem").val()}/lista/lista_geral.html`);

    $("#linguagem").change(() => {
        if(lastPage.includes("inserir")) {
            if(lastPage !== `templates/${$("#linguagem").val()}/lista/inserir.html`) {
                $("#codigo").load(`templates/${$("#linguagem").val()}/lista/inserir.html`);
                lastPage = `templates/${$("#linguagem").val()}/lista/inserir.html`;
            }
        } else if(lastPage.includes("remover")) {
            if(lastPage !== `templates/${$("#linguagem").val()}/lista/remover.html`) {
                $("#codigo").load(`templates/${$("#linguagem").val()}/lista/remover.html`);
                lastPage = `templates/${$("#linguagem").val()}/lista/remover.html`;
            }
        }
        else{
            if(lastPage !== `templates/${$("#linguagem").val()}/lista/lista_geral.html`) {
                $("#codigo").load(`templates/${$("#linguagem").val()}/lista/lista_geral.html`);
                lastPage = `templates/${$("#linguagem").val()}/lista/lista_geral.html`;
            }
        }
    });

    //adicionar, remover, limpar
    $('#adicionar').click(() => {
        if(lastPage !== `templates/${$("#linguagem").val()}/lista/inserir.html`) {
            $("#codigo").load(`templates/${$("#linguagem").val()}/lista/inserir.html`, undefined, () => {
                add(velocidade, animation);
            });
            lastPage = `templates/${$("#linguagem").val()}/lista/inserir.html`;
        }
        else{
            add(velocidade, animation);
        }
    });

    $('#remover').click(() => {
        if(lastPage !== `templates/${$("#linguagem").val()}/lista/remover.html`) {
            $("#codigo").load(`templates/${$("#linguagem").val()}/lista/remover.html`, undefined, () => {
                remove(velocidade, animation);
            });
            lastPage = `templates/${$("#linguagem").val()}/lista/remover.html`;
        }
        else{
            remove(velocidade, animation);
        }
    });

    $("#limpar").click(() => {
        if(lastPage !== `templates/${$("#linguagem").val()}/lista/lista_geral.html`) {
            $("#codigo").load(`templates/${$("#linguagem").val()}/lista/lista_geral.html`, undefined, () => {
                clean();
            });
            lastPage = `templates/${$("#linguagem").val()}/lista/lista_geral.html`;
        }
        else{
            clean();
        }
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