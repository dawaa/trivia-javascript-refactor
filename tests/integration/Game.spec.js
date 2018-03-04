// internal
const Game = require( '../../src/Game/Game' )

describe( 'Game class integration', () => {
  let game
  let spyConsole

  beforeEach(() => {
    spyConsole = spyOn( console, 'log' )
    game       = new Game()
  })
  afterEach(() => {
    game.destroy()
    spyConsole = null
    game       = null
  })

  const createTopics = () => {
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
  }

  it( 'should end with one winning once they get 6 gold coins', () => {
    createTopics()
    game.addPlayer( 'Jesus' )
    game.addPlayer( 'Tom Cruise' )
    game.addPlayer( 'Thomas Di Leva' )

    do {
      game.roll()

      if( game.isCorrect() ) {
        game.wrongAnswer();
      } else {
        game.rightAnswer();
      }
    } while ( !game.winner )

    expect( spyConsole.mostRecentCall.args[ 0 ] )
      .toMatch( /now has 6 Gold Coins.$/ )
  } )
} )
