const larguraJogo = 700; //Altura da página
        const alturaJogo = 850; //Largura da página

        const config = { //constante com as configs do jogo, física, gravidade e o modo Arcade
            type: Phaser.AUTO,
            width: larguraJogo,
            height: alturaJogo,

            physics: {
                default: 'arcade',
                arcade: {
                    gravity:{ y: 300},
                    //debug: true
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

        const game = new Phaser.Game(config);
         //Variaveis
        var alien;
        var teclado;
        var fogo;
        var plataforma;
        var moeda;
        var placar;
        var pontuacao = -1;
        var plataforma2;
        var plataforma3;
        let assets = [alien, teclado, fogo, plataforma, moeda, placar]
        

        function preload() { //carrega os assetes
            this.load.image('background', 'assets/bg.png');
            this.load.image('alien1', 'assets/alien1.png');
            this.load.image('turbo', 'assets/turbo.png');
            this.load.image('tijolos', 'assets/tijolos.png');
            this.load.image('moeda', 'assets/moeda.png');
        }

        function create() {
            this.add.image(larguraJogo/2, alturaJogo/2, 'background'); //adiciona o background
           
            fogo = this.add.sprite(0, 0, 'turbo'); //cria a sprite do foguinho
            fogo.setVisible(false); //deixa ela invisivel por padrão
            
            alien = this.physics.add.sprite(larguraJogo/2, 0, 'alien1'); //crio o alien
            alien.setCollideWorldBounds(true); //ativa colisão com a página

            teclado = this.input.keyboard.createCursorKeys(); //cria função para os direcionais

            plataforma = this.physics.add.staticImage(larguraJogo/2, alturaJogo/2, 'tijolos'); //adiciona plataforma
            this.physics.add.collider(plataforma, alien); //adiciona colisão a ela

            plataforma2 = this.physics.add.staticImage(larguraJogo/1, alturaJogo/2, 'tijolos');
            this.physics.add.collider(plataforma2, alien);

            plataforma3 = this.physics.add.staticImage(larguraJogo/28, alturaJogo/2, 'tijolos');
            this.physics.add.collider(plataforma3, alien);

            moeda = this.physics.add.sprite(larguraJogo/2, 0, 'moeda');  //adiciona sprite da moeda
            moeda.setCollideWorldBounds(true); //moeda passa ter colisão com os limites da página
            moeda.setBounce(0.9); //moeda passa ter bounce
            this.physics.add.collider(moeda, plataforma) //colisão entre moeda e plataforma
            this.physics.add.collider(moeda, plataforma2)
            this.physics.add.collider(moeda, plataforma3)

            placar = this.add.text(50, 50, 'Dinheiros:' + pontuacao, {fontSize:'45px', fill:'#495613'}); //texto do placar

            this.physics.add.overlap(alien, moeda, function(){ //identificar overlap entre alien e moeda
                moeda.setVisible(false); //moeda some quando passa por cima

                var posicaoMoeda_Y = Phaser.Math.RND.between(50, 650);
                moeda.setPosition(posicaoMoeda_Y, 100); //nova moeda dá spawn

                pontuacao +=1; //+1 ponto por cada moeda que desaparece
                placar.setText('Moedas:' + pontuacao);

                moeda.setVisible(true);
            });

        }

        function update() { //faz as teclas direcionais moverem o alien

            if (teclado.left.isDown) {
                alien.setVelocityX(-100); }
            
            else if (teclado.right.isDown) {
                alien.setVelocityX(100)}
            
            else {alien.setVelocityX(0)}
            
            if (teclado.up.isDown) {
                alien.setVelocityY(-100);
                ativarTurbo();} //direcional para cima mostra o turbo
            
                else{ semTurbo(); }

            fogo.setPosition(alien.x, alien.y + alien.height/2) //posiciona o fogo embaixo do alien
        }

    function ativarTurbo() {
        fogo.setVisible(true); //mostra o fogo quando ativado
    }
    function semTurbo() {
        fogo.setVisible(false); //esconde o fogo quando não ativado
    }

    console.log(assets +'tristeza')