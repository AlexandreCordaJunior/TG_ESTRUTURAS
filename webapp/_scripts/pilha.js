let lastPage = `templates/${$("#linguagem").val()}/pilha/pilha_geral.html`;

$('document').ready(() => {

    $("#codigo").load(`templates/${$("#linguagem").val()}/pilha/pilha_geral.html`);

    $("#linguagem").change(() => {
        if(lastPage !== `templates/${$("#linguagem").val()}/pilha/pilha_geral.html`) {
            $("#codigo").load(`templates/${$("#linguagem").val()}/pilha/pilha_geral.html`);
            lastPage = `templates/${$("#linguagem").val()}/pilha/pilha_geral.html`;
        }
    });

    //adicionar, remover, limpar
    $("#adicionar").click(() => {
        if(lastPage !== `templates/${$("#linguagem").val()}/pilha/inserir.html`) {
            $("#codigo").load(`templates/${$("#linguagem").val()}/pilha/inserir.html`);
            lastPage = `templates/${$("#linguagem").val()}/pilha/inserir.html`;
        }
    });

    $("#remover").click(() => {
        if(lastPage !== `templates/${$("#linguagem").val()}/pilha/remover.html`) {
            $("#codigo").load(`templates/${$("#linguagem").val()}/pilha/remover.html`);
            lastPage = `templates/${$("#linguagem").val()}/pilha/remover.html`;
        }
    });

    $("#limpar").click(() => {
        if(lastPage !== `templates/${$("#linguagem").val()}/pilha/pilha_geral.html`) {
            $("#codigo").load(`templates/${$("#linguagem").val()}/pilha/pilha_geral.html`);
            lastPage = `templates/${$("#linguagem").val()}/pilha/pilha_geral.html`;
        }
    });

    var velocidade = 1000; // Velocidade padrão (1 segundo)
    var animation = false;

    $('#velocidade').change(() => {
        velocidade = $('#velocidade').val() * -1000;
        /* $('#txtvelocidade').text($('#velocidade').val() * -1); <- exibe o valor atual na tela (removido temporariamente)*/
    });

    $('#adicionar').click(() => {
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
    });

    $('#remover').click(() => {
        if ($('#pilha > div').length == 0) {
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
    });

    $('#limpar').click(() => {
        if ($('#pilha > div').length == 0) {
            alert('ERRO: A pilha já está vazia.');
            return 0;
        }

        $('#pilha > div').remove();
    });

    $('#linguagem').change(() => {
        console.log(`Linguagem atual: ${$('#linguagem').val()}`);
    });

    /* Caso mude o tamanho da janela do navegador */
    $(window).resize(() => {
        if(animation == false) {
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