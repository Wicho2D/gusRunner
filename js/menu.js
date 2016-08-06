var Menu = {
    
    preload: function(){
        juego.stage.backgroundColor= "#000";
        juego.load.image("boton", "assets/btngus.png");
    },
    
    create: function(){
        juego.scale.pageAlignHorizontally = true;
        juego.scale.pageAlignVertically = true;
        juego.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        var boton = juego.add.button(juego.width/2, juego.height/2, "boton", this.inicioJuego, this);
        boton.anchor.set(0.5);
        var estilo = {
            font: "32px Consolas",
            fill: "#fff",
            align: "center"
        }
        var texto = juego.add.text(juego.width/2, 30, "Corre Gus Corre!!!", estilo);
        texto.anchor.set(0.5);
    },
    
    inicioJuego: function(){
        this.state.start("JuegoInicilizado");
    }
};