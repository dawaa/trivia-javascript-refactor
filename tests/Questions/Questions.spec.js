const Questions = require( '../../src/Questions/Questions' )

describe( 'Questions class', () => {
  let scienceTopic

  beforeEach(() => { scienceTopic = new Questions( 'science' )})
  afterEach(() => { scienceTopic = null })

  it( 'should be an instance of Questions', () => {
    expect( scienceTopic instanceof Questions ).toBeTruthy()
  } )

  it( 'should have an empty questions array', () => {
    expect( scienceTopic.getQuestions().length ).toBe( 0 )
  } )

  it( 'should set the `topic` property of the class in the constructor', () => {
    expect( scienceTopic.topic ).toBe( 'science' )
  } )

  it( 'should correctly generate a given amount of questions for us', () => {
    scienceTopic.generateQuestions( 100 )
    expect( scienceTopic.getQuestions().length ).toBe( 100 )
  } )

  it( 'should correctly get the capitalized name using .getName()', () => {
    expect( scienceTopic.getName() ).toBe( 'Science' )
  } )

  it( 'should shift questions array and log output when using .getQuestion()', () => {
    const spy = spyOn( console, 'log' )

    scienceTopic.generateQuestions( 100 )
    scienceTopic.getQuestion()
    expect( scienceTopic.getQuestions().length ).toBe( 99 )
    expect( spy ).toHaveBeenCalledWith( `Science Question: 0` )
  } )

} )
