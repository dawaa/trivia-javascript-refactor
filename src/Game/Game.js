// internal
const Player    = require( '../Player/Player' )
const Questions = require( '../Questions/Questions' )

// Local variables
const players   = []
const questions = []
const places    = []
const purses    = []

class Game {
  /**
   * Sets up instance variables for a new Game.
   *
   * @prop boolean winner
   *  Is set to true once one Player has reached 6 gold coins.
   *
   * @prop int     currentPlayer
   *  Keeps track of current Player index
   *
   * @prop boolean isGettingOutOfPenaltyBox
   *  Checks if a Player next turn will get out of the penalty box.
   */
  constructor() {
    this.winner                   = false
    this.currentPlayer            = 0
    this.isGettingOutOfPenaltyBox = false
  }

  /**
   * Takes one question off of the current topic.
   *
   * @return void
   */
  askQuestion() {
    const currentTopic = this.getTopic( this.getCurrentTopic() )
    currentTopic.getQuestion()
  }

  /**
   * Creates a new topic for the Game to contain questions.
   *
   * @param string name
   *
   * @return Questions
   */
  createTopic(name) {
    const newLen = questions.push( new Questions( name ) )
    return questions[ newLen - 1 ]
  }

  /**
   * The current Player rolls, if in penalty box we check if we can get out,
   * otherwise log that we're still in the penalty box.
   * Unless we are allowed to make a play, we place our current Player to
   * where they landed (by their roll) and asks a question.
   *
   * @return void
   */
  roll() {
    const player             = this.getCurrentPlayer()
    const currentPlayerPlace = places[ this.currentPlayer ]
    const roll               = Math.floor( ( Math.random() * 6 ) + 1 )
    const topic              = this.getTopic( this.getCurrentTopic() )

    console.log( `${ player.name } is the current player and rolls ${ roll }.` );

    // Bail early if player is penalized and can't get out
    if ( player.inPenaltyBox && roll % 2 == 0 ) {
      this.isGettingOutOfPenaltyBox = false
      console.log( `${ player.name } is not getting out of the penalty box.` );
      return
    }

    if ( player.inPenaltyBox ) {
      this.isGettingOutOfPenaltyBox = true
      console.log( `${ player.name } is getting out of the penalty box.` );
    }

    places[ this.currentPlayer ] = currentPlayerPlace + roll
    if ( currentPlayerPlace > 11 ) {
      places[ this.currentPlayer ] = currentPlayerPlace - 12
    }

    console.log( `${ player.name }'s new location is ${ currentPlayerPlace }` );
    console.log( `Current category is ${ topic.getName() }` );

    this.askQuestion()
  }

  /**
   * If the answer to the question is wrong we send the current Player to
   * the penalty box.
   *
   * @return void
   */
  wrongAnswer() {
    const player = this.getCurrentPlayer()
    player.inPenaltyBox = true
    console.log( `Question was incorrectly answered.` );
    console.log( `${ player.name } was sent to the penalty box.` );

    this.nextPlayer()
  }

  /**
   * If we got the answer correct we increment the current Player's purse
   * by 1 and make a check to see if they got 6 gold coins yet.
   * Then pass it on to the next Player.
   *
   * @return void
   */
  rightAnswer() {
    const player = this.getCurrentPlayer()

    if ( player.inPenaltyBox && this.isGettingOutOfPenaltyBox === false ) {
      this.nextPlayer()
      return true
    }

    console.log( `Answer was correct!` );
    purses[ this.currentPlayer ] += 1

    console.log(
      `${ player.name } now has ${ purses[ this.currentPlayer ] } Gold Coins.`
    );

    if ( this.didPlayerWin() ) {
      this.winner = true
    }

    this.nextPlayer()
  }

  /**
   * Passes the turn to the next Player index.
   *
   * @return void
   */
  nextPlayer() {
    this.currentPlayer += 1
    if ( this.currentPlayer === this.getPlayersCount() ) {
      this.currentPlayer = 0
    }
  }

  /**
   * Adds a Player to the game and sets up their position and with an empty
   * purse.
   *
   * @return void
   */
  addPlayer(name) {
    players.push( new Player( name ) )
    console.log( `${ name } was added.` );
    console.log( `There are now ${ players.length } players.` );

    places[ this.getPlayersCount() - 1 ] = 0
    purses[ this.getPlayersCount() - 1 ] = 0
  }

  /**
   * Checks if current Player has 6 Gold Coins.
   *
   * @return boolean
   */
  didPlayerWin() {
    return purses[ this.currentPlayer ] == 6
  }

  /**
   * Checks if the current answer is 7.
   *
   * @return boolean
   */
  isCorrect() {
    return Math.floor( Math.random() * 10 ) == 7 ? false : true
  }

  /**
   * Returns if the game is playable or not by the amount of added Players.
   *
   * @return boolean
   */
  isPlayable(participants = players) {
    return participants.length >= 2
  }

  /**
   * Returns the current Player.
   *
   * @return Player
   */
  getCurrentPlayer() {
    if ( !this.isPlayable() ) {
      throw new Error( 'There must be at least 2 players to play this game.' )
    }

    return players[ this.currentPlayer ]
  }

  /**
   * Returns the amount of Gold Coins in the current Player's purse.
   *
   * @return int
   */
  getCurrentPurse() {
    return purses[ this.currentPlayer ]
  }

  /**
   * Checks where current Player's position is and returns a topic.
   *
   * @return string
   */
  getCurrentTopic() {
    switch ( places[ this.currentPlayer ] ) {
      case 0: case 4: case 8:
        return 'pop'
      case 1: case 5: case 9:
        return 'science'
      case 2: case 6: case 10:
        return 'sports'
      default:
        return 'rock'
    }
  }

  /**
   * Returns amount of Players.
   *
   * @return int
   */
  getPlayersCount() {
    return players.length
  }

  /**
   * Returns a topic by a given name.
   *
   * @param string name
   *
   * @return Questions
   */
  getTopic(name) {
    return questions.find( x => x.topic === name )
  }

  /**
   * Resets local variables.
   *
   * @return void
   */
  destroy() {
    players.length   = 0
    questions.length = 0
    places.length    = 0
    purses.length    = 0
  }
}

module.exports = Game
