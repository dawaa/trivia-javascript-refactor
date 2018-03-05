const Player = require( '../../src/Player/Player' )

describe( 'Player class', () => {
  let mike

  beforeEach(() => { mike = new Player( 'mike' ) })
  afterEach(() => { mike = null })

  it ( 'should create a Player', () => {
    expect( mike instanceof Player ).toBeTruthy()
  } )

  it ( 'should have name property the same as the given name in the constructor', () => {
    expect( mike.name ).toBe( 'mike' )
  } )

  it ( 'should by default set a Player\'s state inPenaltyBox to false', () => {
    expect( mike.inPenaltyBox ).toBe( false )
  } )

  it ( 'should not be able to pass null or undefined to the constructor', () => {
    expect( () => { new Player() } )
      .toThrow( 'A Player must be assigned a name in the constructor.' )

    expect( () => { new Player( '' ) } )
      .toThrow( 'A Player must not have an empty name given.' )
  } )
} )
