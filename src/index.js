// internal
const Game = require( './Game/Game' )



// Initialize a new Game
const game = new Game()

const topics = {
  pop     : game.createTopic( 'pop' ),
  science : game.createTopic( 'science' ),
  sports  : game.createTopic( 'sports' ),
  rock    : game.createTopic( 'rock' ),
}

// Per topic create us some questions
for ( let key in topics ) {
  topics[ key ].generateQuestions( 50 )
}

game.addPlayer( 'Jesus' )
game.addPlayer( 'Tom Cruise' )
game.addPlayer( 'Thomas Di Leva' )

// Let the game begin
do {
  game.roll();

  if( game.isCorrect() ) {
    game.wrongAnswer();
  } else {
    game.rightAnswer();
  }

} while ( !game.winner );
