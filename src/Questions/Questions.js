class Questions {

  /**
   * Questions container for a Topic.
   *
   * @param string name
   *
   * @prop string topic
   *  Name of the Topic holding questions.
   *
   * @prop array  questions
   *  Contains questions.
   */
  constructor(name) {
    if ( name == null ) {
      throw new Error( 'Questions must be assigned a name upon initialization.' )
    } else if ( name === "" ) {
      throw new Error( 'Questions must not be initialized with an empty name given.' )
    }

    this.topic     = name
    this.questions = []
  }

  /**
   * Capitalizes first letter and the rest is lowercased.
   *
   * @return string
   */
  getName() {
    return this.topic.charAt( 0 ).toUpperCase() + this.topic.slice( 1 ).toLowerCase()
  }

  /**
   * Calls `this.shiftQuestion` to take the next question off the stack and
   * outputs it to `console.log`.
   *
   * @return void
   */
  getQuestion() {
    console.log( `${ this.getName() } Question: ${ this.shiftQuestion() }` );
  }

  /**
   * Returns all questions.
   *
   * @return array
   */
  getQuestions() {
    return this.questions
  }

  /**
   * The lazyman's setup to get a quick round of this Game up and running.
   *
   * @return void
   */
  generateQuestions(amount) {
    for ( let i = 0; i < amount; i++ ) {
      this.questions.push( `${ i }` )
    }
  }

  /**
   * Shifts the first element of the `this.questions` array and returns the
   * element.
   *
   * @return string
   */
  shiftQuestion() {
    return this.questions.shift()
  }
}

module.exports = Questions
