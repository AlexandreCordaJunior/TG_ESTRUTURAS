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

$('document').ready(() => {

    $("#codigo").load("template/vetor/vetor_inserir.html");

    /* Insere valores aleatorios no vetor inicialmente */
    for(var i = 0; i < 10; i++) {
        $(`#v${i}`).html(Math.floor(Math.random() * 100));
    }

    var velocidade = $('#velocidade').val() * -1000;
    $('#txtvelocidade').text(`${velocidade / 1000}`);

    $('#velocidade').change(() => {
        velocidade = $('#velocidade').val() * -1000;
        $('#txtvelocidade').text(`${velocidade / 1000}`);
    });

    $('#inserir').click(() => {
        if($('#indice').val() == '') {
            $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
            $('#alert .message').text("O campo índice está vazio");
            $('#indice').focus();
            return 0;
        }

        if($('#numero').val() == '') {
            $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
            $('#alert .message').text("O campo número está vázio");
            $('#numero').focus();
            return 0;
        }

        if($('#numero').val().length > 2) {
            $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
            $('#alert .message').text("O número digitado deve ter até 2 dígitos");
            $('#numero').val('');
            $('#numero').focus();
            return 0;
        }

        if($('#indice').val() < 0 || $('#indice').val() > 9) {
            $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-danger');
            $('#alert .message').text(" O número do índice deve estar entre 0 e 9");
            $('#indice').val('');
            $('#indice').focus();
            return 0;
        }

        var circulo = document.createElement('div');
        circulo.id = 'circulo';
        document.body.appendChild(circulo);

        var indice = $('#indice').val() - 0;
        
        /* Pegando a posição inicial e final do circulo */
        var inicio = $('#numero').offset();
        var final = $('#v' + indice).offset();

        /* Estilização do circulo */
        $('#circulo').css({
            'position' : 'absolute',
            'top' : `${inicio.top}px`, 
            'left' : `${inicio.left}px`, 
            'height' : '35px',
            'width' : '35px',
            'border' : '3px solid red',
            'border-radius' : '50%',
            'display': 'flex',
            'justify-content': 'center',
            'align-items': 'center'
        });

        /* Borda vermelha no indice */
        $('#v' + indice).css({
            'border' : '3px solid red'
        });

        /* Limpa o valor da tabela que vai receber o número digitado */
        $('#v' + indice).html('');

        /* Número dentro do circulo */
        var numero = $('#numero').val();
        $('#circulo').html(numero);

        $('#circulo').animate({
            top: `${final.top}px`,
            left: `${final.left}px`
        }, {
            duration: velocidade,
            start: async() => {
                await destacaCodigo(velocidade, [1, 2, 3]);
                $('#indice').val('');
                $('#numero').val('');
                $('#indice').prop('disabled', true);
                $('#numero').prop('disabled', true);
                $('#inserir').prop('disabled', true);
                $('#velocidade').prop('disabled', true);
            },
            complete: () => {
                $('#circulo').remove();
                $('#v' + indice).html(numero);
                $('#indice').focus();
                $('#indice').prop('disabled', false);
                $('#numero').prop('disabled', false);
                $('#inserir').prop('disabled', false);
                $('#velocidade').prop('disabled', false);
                $('#v' + indice).css({
                    'border' : '1px solid #000'
                });
                
                $('#alert').removeClass('alert-primary alert-success alert-danger').addClass('alert-success');
                $('#alert .message').text(`O número ${numero} foi inserido no índice ${indice}`);
            }
        });
    });

    $('#linguagem').change(() => {
        console.log(`Linguagem atual: ${$('#linguagem').val()}`);
    });
});