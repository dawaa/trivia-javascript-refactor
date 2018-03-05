const Game      = require( '../../src/Game/Game' )
const Questions = require( '../../src/Questions/Questions' )
const Player    = require( '../../src/Player/Player' )

describe( 'Game class', () => {
  let game

  beforeEach(() => {
    spyOn( console, 'log' )
    game = new Game()
  })
  afterEach(() => {
    game.destroy()
    game = null
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

  it( 'should have default properties', () => {
    expect( game.winner ).toBeFalsy()
    expect( game.currentPlayer ).toBe( 0 )
    expect( game.isGettingOutOfPenaltyBox ).toBeFalsy()
  } )

  it( 'should create a new topic and be an instance of Questions', () => {
    game.createTopic( 'jazz' )
    expect( game.getTopic( 'jazz' ) instanceof Questions ).toBeTruthy()
  } )

  it( 'should throw an error if trying to initiate game with less than 2 players', () => {
    expect(() => { game.roll() })
      .toThrow( 'There must be at least 2 players to play this game.' )
  } )

  it( 'should be able to create a new Player using .addPlayer()', () => {
    game.addPlayer( 'Jesus' )
    expect( game.getPlayersCount() ).toBe( 1 )
    game.addPlayer( 'Tom Cruise' )
    game.addPlayer( 'Thomas Di Leva' )
    expect( game.getPlayersCount() ).toBe( 3 )
  } )

  it( 'should call .getCurrentPlayer() and be an instance of Player', () => {
    game.addPlayer( 'Jesus' )
    game.addPlayer( 'Tom Cruise' )
    const player = game.getCurrentPlayer()
    expect( player instanceof Player ).toBeTruthy()
    expect( player.name ).toBe( 'Jesus' )
  } )

  it( 'should call .nextPlayer() correctly with 2 players', () => {
    game.addPlayer( 'Jesus' )
    game.addPlayer( 'Tom Cruise' )
    expect( game.currentPlayer ).toBe( 0 )
    game.nextPlayer()
    expect( game.currentPlayer ).toBe( 1 )
    expect( game.getCurrentPlayer().name ).toBe( 'Tom Cruise' )
    game.nextPlayer()
    expect( game.currentPlayer ).toBe( 0 )
    expect( game.getCurrentPlayer().name ).toBe( 'Jesus' )
  } )

  it( 'should call .wrongAnswer() and put the player in the penalty box', () => {
    const spy = spyOn( game, 'nextPlayer' )
    game.addPlayer( 'Jesus' )
    game.addPlayer( 'Tom Cruise' )
    game.wrongAnswer()
    const player = game.getCurrentPlayer()
    expect( game.getCurrentPlayer().inPenaltyBox ).toBe( true )
  } )

  it( 'should call .rightAnswer() and increment purse of a player until it wins', () => {
    spyOn( game, 'nextPlayer' )
    game.addPlayer( 'Jesus' )
    game.addPlayer( 'Tom Cruise' )

    expect( game.winner ).toBe( false )
    game.rightAnswer()
    game.rightAnswer()
    game.rightAnswer()
    game.rightAnswer()
    game.rightAnswer()
    expect( game.winner ).toBe( false )
    game.rightAnswer()
    expect( game.winner ).toBe( true )
  } )

  it( 'should call .rightAnswer() but Player is penalized so we don\'t increment purse', () => {
    const _nextPlayer     = game.nextPlayer
    const spy             = spyOn( game, 'nextPlayer' )
    const spyDidPlayerWin = spyOn( game, 'didPlayerWin' )

    game.addPlayer( 'Jesus' )
    game.addPlayer( 'Tom Cruise' )
    game.wrongAnswer()
    expect( game.getCurrentPlayer().name ).toBe( 'Jesus' )
    expect( game.getCurrentPurse() ).toBe( 0 )
    game.rightAnswer()
    expect( spyDidPlayerWin ).not.toHaveBeenCalled()
    expect( game.getCurrentPurse() ).toBe( 0 )
  } )

  it( 'should call .askQuestion() and correctly shift one question from the array of questions', () => {
    createTopics()
    game.addPlayer( 'Jesus' )
    game.addPlayer( 'Tom Cruise' )
    expect( game.getCurrentTopic() ).toBe( 'pop' )
    expect( game.getTopic( game.getCurrentTopic() ).questions.length )
      .toBe( 50 )
    game.askQuestion()
    expect( game.getTopic( game.getCurrentTopic() ).questions.length )
      .toBe( 49 )
    game.askQuestion()
    game.askQuestion()
    expect( game.getTopic( game.getCurrentTopic() ).questions.length )
      .toBe( 47 )
  } )

  it( 'should call .isPlayable() with 1 Player', () => {
    game.addPlayer( 'Jesus' )
    expect( game.isPlayable() ).toBe( false )
  } )

  it( 'should call .isPlayable() with 2 Players', () => {
    game.addPlayer( 'Jesus' )
    game.addPlayer( 'Tom Cruise' )
    expect( game.isPlayable() ).toBe( true )
  } )
} )
