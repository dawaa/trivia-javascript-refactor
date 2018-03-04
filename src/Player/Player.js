class Player {

  /**
   * Sets up a Player.
   *
   * @param string name
   *
   * @prop string  name
   *  Name of the Player.
   *
   * @prop boolean inPenaltyBox
   *  If the Player is in the penalty box.
   */
  constructor(name) {
    if ( name == null ) {
      throw new Error( 'A Player must be assigned a name in the constructor.' )
    } else if ( name === '' ) {
      throw new Error( 'A Player must not have an empty name given.' )
    }

    this.name         = name
    this.inPenaltyBox = false
  }
}

module.exports = Player
