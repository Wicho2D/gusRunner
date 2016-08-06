var fondo;
var gus;
var musica;
var sfxsalto;
var sfxpunto;
var sfxmuerto;
var salto;
var obstaculo;
var timer;
var intervalo = [1000, 1500, 2000];
var puntaje;
var juegoInicilizado = {
    preload: function() {
        juego.load.image("pico", "assets/picos.png");
        juego.load.image("fondo", "assets/city_background_sunset_small.png");
        juego.load.spritesheet("gus", "assets/gusRunning2.png", 80 , 104);
        juego.load.audio("musica", "assets/Afterburner.ogg");
        juego.load.audio("saltosfx","assets/Jump.wav")
        juego.load.audio("puntosfx", "assets/Pickup_Coin.wav");
        juego.load.audio("muertosfx","assets/Explosion.wav")
        juego.forceSingleUpdate = true;
    },
    create: function() {
        juego.scale.pageAlignHorizontally = true;
        juego.scale.pageAlignVertically = true;
        juego.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //fondo del juego
        fondo = juego.add.tileSprite(0, 0, 600, 200, "fondo");
        //fisica del juego
        juego.physics.startSystem(Phaser.Physics.ARCADE);
        juego.time.desireFps = 30;

        //picos y punto
        obstaculo = juego.add.group();
        obstaculo.enableBody = true;
        obstaculo.createMultiple(10, "pico");
        obstaculo.setAll('anchor.x',0.5);
        obstaculo.setAll('anchor.y',0);
        obstaculo.setAll('checkWorldBounds', true);
        obstaculo.setAll('outOfBoundsKill', true);
        //personaje caminando
        gus = juego.add.sprite(60, 104, "gus");
        gus.anchor.set(0.5);
        gus.frame = 0;
        gus.animations.add("correr",[0, 1, 2, 3, 4, 5], 10, true);
        //personaje saltando
        gus.animations.add("saltar",[6,7],2,true);
        //agregamos fisica a gus
        juego.physics.arcade.enable(gus);
        
        gus.body.bounce.y = 0;
        gus.body.gravity.y = 600;
        gus.body.collideWorldBounds = true;
        gus.body.width = gus.body.sourceWidth * 0.72;
        //barra espaciadora para saltar
        juego.input.onDown.add(this.saltar, this);
        //salto = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //salto.onDown.add(this.saltar, this);
        
        //musica de fondo
        musica = juego.add.audio("musica");
        musica.loop = true;
        musica.play();
        //sonido de salto, punto y muerte
        sfxsalto = juego.add.audio("saltosfx");
        sfxpunto = juego.add.audio("puntosfx");
        sfxmuerto = juego.add.audio("muertosfx");
        
        //timer de creacion de picos
        timer = juego.time.events;
        loop = timer.loop(juego.rnd.pick(intervalo), this.crearPico, this);
        puntaje = 0;
        txtPuntos = juego.add.text(20, 20, "0", {font: "30px Arial", fill: "#fff"});

    },
    update: function() {
    //Anima el fondo, los saltos y detecta colision
        if(gus.inWorld == false){
          juego.state.start('GameOver');  
        } else if(gus.body.onFloor()){
            gus.animations.play("correr");
        } else {
            gus.animations.play("saltar");
        }
        fondo.tilePosition.x -= 2;
        juego.physics.arcade.overlap(gus, obstaculo, this.tocoPico, null, this); 
    },
    //funcion para saltar
    saltar: function(){
        if(gus.body.onFloor()){
            gus.body.velocity.y = - 300;
            sfxsalto.play();
        }
    },
    crearPico: function(){
        this.crearPicox(juego.width - 1, 165);
        loop.delay = juego.rnd.pick(intervalo);
        picox.events.onOutOfBounds.add(this.actualizar, this);
    },
    crearPicox: function(x, y){
        picox = obstaculo.getFirstDead();
        picox.reset(x, y);
        picox.body.velocity.x = -190;
        
    },
    tocoPico: function(){
        salto = juego.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
        if(gus.alive == false)
        return;
        gus.alive == false;
        gus.animations.paused = true;
        juego.time.events.remove(timer);
        txtPuntos = puntaje;
        juego.add.tween(gus).to({angle: - 180}, 50).start();
        sfxmuerto.play();
        gus.body.collideWorldBounds = false;
        obstaculo.forEachAlive(function(u){
            u.body.velocity = 0;
            puntaje = puntaje;
        },this);
    },
    actualizar: function(){
        puntaje++;
        txtPuntos.text = puntaje;
        sfxpunto.play();
    }
}