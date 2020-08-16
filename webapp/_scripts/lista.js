let lastPage = `templates/${$("#linguagem").val()}/lista/lista_geral.html`;
$('document').ready(() => {

    $("#codigo").load(`templates/${$("#linguagem").val()}/lista/lista_geral.html`);

    $("#linguagem").change(() => {
        if(lastPage !== `templates/${$("#linguagem").val()}/lista/lista_geral.html`) {
            $("#codigo").load(`templates/${$("#linguagem").val()}/lista/lista_geral.html`);
            lastPage = `templates/${$("#linguagem").val()}/lista/lista_geral.html`;
        }
    });

    //adicionar, remover, limpar
    $("#adicionar").click(() => {
        if(lastPage !== `templates/${$("#linguagem").val()}/lista/inserir.html`) {
            $("#codigo").load(`templates/${$("#linguagem").val()}/lista/inserir.html`);
            lastPage = `templates/${$("#linguagem").val()}/lista/inserir.html`;
        }
    });

    $("#remover").click(() => {
        if(lastPage !== `templates/${$("#linguagem").val()}/lista/remover.html`) {
            $("#codigo").load(`templates/${$("#linguagem").val()}/lista/remover.html`);
            lastPage = `templates/${$("#linguagem").val()}/lista/remover.html`;
        }
    });

    $("#limpar").click(() => {
        if(lastPage !== `templates/${$("#linguagem").val()}/lista/lista_geral.html`) {
            $("#codigo").load(`templates/${$("#linguagem").val()}/lista/lista_geral.html`);
            lastPage = `templates/${$("#linguagem").val()}/lista/lista_geral.html`;
        }
    });

    var velocidade = 1000; // Velocidade padrão (1 segundo)
    var animation = false;

    $('#velocidade').change(() => {
        velocidade = $('#velocidade').val() * -1000;
        /* $('#txtvelocidade').text($('#velocidade').val() * -1); */
    });

    $('#adicionar').click(() => {
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
                complete: () => {
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
            if ($('#indice').val() > $('#lista > div').length) {
                alert(`ERRO: O próximo índice deve ser o ${$('#lista > div').length}.`);
                $('#indice').val('');
                $('#indice').focus();
                return 0;
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
                complete: () => {
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
    });

    $('#remover').click(() => {
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
            start: () => {
                $('#indice').prop('disabled', true);
                $('#numero').prop('disabled', true);
                $('#adicionar').prop('disabled', true);
                $('#remover').prop('disabled', true);
                $('#limpar').prop('disabled', true);
                $('#velocidade').prop('disabled', true);

                animation = true;
            },
            complete: () => {
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
    });

    $('#limpar').click(() => {
        if ($('#lista > div').length == 0) {
            alert('ERRO: A lista já está vázia.');
            return 0;
        }

        $('#lista > div').remove();
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