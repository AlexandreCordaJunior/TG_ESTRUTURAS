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

    var velocidade = 1000;

    $('#velocidade').change(() => {
        velocidade = $('#velocidade').val() * -1000;
        $('#txtvelocidade').text($('#velocidade').val() * -1);
    });

    $('#inserir').click(() => {
        if($('#indice').val() == '') {
            alert('ERRO: O campo índice está vázio.');
            return 0;
        }

        if($('#numero').val() == '') {
            alert('ERRO: O campo número está vázio.');
            return 0;
        }

        if($('#numero').val().length > 2) {
            alert('ERRO: O número digitado deve ter até 2 dígitos.');
            return 0;
        }

        if($('#indice').val() < 0 || $('#indice').val() > 9) {
            alert('ERRO: O índice deve estar entre 0 e 9.');
            $('#indice').val('');
            $('#indice').focus();
            return 0;
        }

        var circulo = document.createElement('div');
        circulo.id = 'circulo';
        document.body.appendChild(circulo);

        var indice = $('#indice').val();
        
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
            'text-align' : 'center',
            'line-height' : '30px'
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
            }
        });
    });

    $('#linguagem').change(() => {
        console.log(`Linguagem atual: ${$('#linguagem').val()}`);
    });
});