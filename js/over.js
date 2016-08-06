var Game_Over = {
    preload: function(){
        juego.stage.backgroundColor= "#000";
        juego.load.image("boton", "assets/btngus.png");
    },
    create: function(){
        juego.scale.pageAlignHorizontally = true;
        juego.scale.pageAlignVertically = true;
        juego.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        musica.stop();
        var boton = juego.add.button(juego.width/2, juego.height/2, "boton", this.inicioJuego, this);
        boton.anchor.set(0.5);
        var estilo = {
            font: "32px Consolas",
            fill: "#FFF",
            align: "center"
        }
        var texto = juego.add.text(juego.width/2, 30, "Juego Terminado!!!", estilo);
        texto.anchor.set(0.5);
        var textoPuntaje = juego.add.text(juego.width/2, 180, "Puntos: 0", estilo);
        if(puntaje < 0){
           textoPuntaje.text = "Puntos: 0";
        } else {
            textoPuntaje.text = "Puntos: " + puntaje;
        }
        textoPuntaje.anchor.set(0.5);
        puntaje = -1;
    },
    inicioJuego: function(){
        this.state.start("JuegoInicilizado");
    }
}