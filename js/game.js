var juego = new Phaser.Game(600, 200, Phaser.AUTO);

juego.state.add("MenuInicio", Menu);
juego.state.add("JuegoInicilizado", juegoInicilizado);
juego.state.add("GameOver", Game_Over);
juego.state.start('MenuInicio');