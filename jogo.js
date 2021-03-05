$(document).ready(function(){

    var rodada = 1;
    var matriz_jogo = Array(3);
    //Monta o array multidimensional que determina as posições no jogo
    matriz_jogo['a'] = Array(3);
    matriz_jogo['b'] = Array(3);
    matriz_jogo['c'] = Array(3);

    matriz_jogo['a'][1] = 0;
    matriz_jogo['a'][2] = 0;
    matriz_jogo['a'][3] = 0;
    matriz_jogo['b'][1] = 0;
    matriz_jogo['b'][2] = 0;
    matriz_jogo['b'][3] = 0;
    matriz_jogo['c'][1] = 0;
    matriz_jogo['c'][2] = 0;
    matriz_jogo['c'][3] = 0;

    $('#btn_iniciar_jogo').click(function(){
        //valida se os jogadores preencheram os apelidos no input
        if($('#entrada_apelido_jogador_1').val() == ''){
            alert('Favor digitar um nome válido para o jogador 1!');
            return false;
        }
        else if($('#entrada_apelido_jogador_2').val() == ''){
            alert('Favor digitar um nome válido para o jogador 2!');
            return false;
        }
        if($('#entrada_apelido_jogador_1').val() == $('#entrada_apelido_jogador_2').val()){
            //Se os nomes forem iguais, acrescenta '1' após o apelido do jogador 1 e '2' após o apelido do jogador 2
            $('#nome_jogador_1').html($('#entrada_apelido_jogador_1').val() + ' 1');
            $('#nome_jogador_2').html($('#entrada_apelido_jogador_2').val() + ' 2');
        }
        else{
            //Caso os nomes sejam diferentes, printa os nomes abaixo das respectivas imagens na palco_jogo
            $('#nome_jogador_1').html($('#entrada_apelido_jogador_1').val());
            $('#nome_jogador_2').html($('#entrada_apelido_jogador_2').val());
        }      
        //alterna a visualização das divs
        $('#pagina_inicial').hide();
        $('#palco_jogo').show();
    });
    //Recupera atraves do clique o id da posição clicada no jogo
    $('.jogada').click(function(){
        jogada(this.id);
    });

    function jogada(id){
        var icone = '';
        var ponto = 0;

        if((rodada % 2) == 1){//Verifica se o modulo da divisão é igual a 1 e atribui o valor 1 para o jogador 1
            icone = 'url("imagens/marcacao_1.png")';
            ponto = 1;
        }else{//Verifica se o modulo da divisão é igual a 0 e atribui o valor -1 para o jogador 2
            icone = 'url("imagens/marcacao_2.png")';
            ponto = -1;
        }
        rodada++;
        //Insere a imagem referente ao jogador que clicou na posição
        $('#'+id).css('background-image', icone);
        //Desabilita a opção de clicar na mesma posição novamente
        $('#'+id).off();
        //recupera o valor da linha e da colula, removendo o separador do id da posição clicada
        var linha_coluna = id.split('-');
        matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

        verifica_combinacao(linha_coluna[0]);
    }

    function verifica_combinacao(linha){
        //Verifica pontos na horizontal
        var pontos = 0;
        for (var h = 1; h <=3; h++) {
            pontos = pontos + matriz_jogo[linha][h];
            ganhador(pontos);
        }
        //Verifica pontos na vertical
        for (var v = 1; v <=3; v++) {
            pontos = 0;
            pontos += matriz_jogo['a'][v];
            pontos += matriz_jogo['b'][v];
            pontos += matriz_jogo['c'][v];
            ganhador(pontos);
        }
        //Verifica pontos na diagonal
        pontos = 0;
        pontos += matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
        ganhador(pontos);
        pontos = 0;
        pontos += matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
        ganhador(pontos);

        empate(pontos);
    }

    //Função que verifica qual jogador alcançou a pontuação necessária para vencer o jogo
    function ganhador(pontos){
        var jogador_1 = $('#entrada_apelido_jogador_1').val();
        var jogador_2 = $('#entrada_apelido_jogador_2').val();
        if(pontos == 3){
            alert(jogador_1 + ' venceu o jogo!');
            $('.jogada').off();
            pontuacao(pontos);
            $('.div-btn-restart').show();
        }
        else if(pontos == -3){
            alert(jogador_2 + ' venceu o jogo!');
            $('.jogada').off();
            pontuacao(pontos);
            $('.div-btn-restart').show();
        }
    }
    //Função que verifica se deu empate
    function empate(pontos){
        if(rodada == 10 && pontos != 3){
            alert('Deu velha!');
            $('.jogada').off();
            $('.div-btn-restart').show();
        }
    }

    function pontuacao(jogador){
        if(jogador == 3){
            //Com JS: var pts = parseInt(document.getElementById('pontuacao_jogador_1').textContent);
            var pts = parseInt($('#pontuacao_jogador_1').text());
            pts = pts + 1;
            $('#pontuacao_jogador_1').html(pts);
        }
        else if(jogador == -3){
            //Com JS: var pts = parseInt(document.getElementById('pontuacao_jogador_2').textContent);
            var pts = parseInt($('#pontuacao_jogador_2').text());
            pts = pts + 1;
            $('#pontuacao_jogador_2').html(pts);
        }
    }
    
    $('.btn-restart').click(function(){
        //Reseta os valores da rodada e da matriz_jogo
        rodada = 1;

        matriz_jogo['a'][1] = 0;
        matriz_jogo['a'][2] = 0;
        matriz_jogo['a'][3] = 0;
        matriz_jogo['b'][1] = 0;
        matriz_jogo['b'][2] = 0;
        matriz_jogo['b'][3] = 0;
        matriz_jogo['c'][1] = 0;
        matriz_jogo['c'][2] = 0;
        matriz_jogo['c'][3] = 0;
        //Limpa as imagens colocadas nos elementos com a classe .jogada
        $(".jogada").css('background-image', '');
        //Reativa o clique nos elementos com a classe .jogada e chama a função jogada()
        $('.jogada').click(function(){
            jogada(this.id);
        });
        //esconde o botão Revanche
        $('.div-btn-restart').hide();
    });
});