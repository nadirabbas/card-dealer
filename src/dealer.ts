class Dealer<D extends object> {
  private _deck: D[];
  public _drawPile: D[];
  private _discardPile: D[];

  /**
   * Instantiates a Dealer instance to play games
   * @param deck - an array of card objects
   */
  public constructor(deck: D[]) {
    // need to valdiate the deck first
    this._deck = [...deck];
    this._drawPile = [...deck];
    this._discardPile = [];
    // this._options = options;
  }

  /**
   * Randomizes the draw pile
   * @chainable
   */
  public shuffle() {
    function shuffleDeck(deck: D[]) {
      for (let remaining = deck.length - 1; remaining > 0; remaining--) {
        const swap = Math.floor(Math.random() * remaining);
        [deck[remaining], deck[swap]] = [deck[swap], deck[remaining]];
      }
      return deck;
    }

    this._drawPile = shuffleDeck(this._deck);
    return this;
  }

  /**
   * Splits the deck & puts the top half on the bottom
   * @chainable
   * @param {number} count - The position of the deck to cut
   */
  public cut(count: number = 1) {
    const top = this._drawPile.splice(0, count);
    this._drawPile.concat(top);
    return this;
  }

  /**
   * Draws cards from the draw pile
   * @param count
   * @return cards
   */
  public draw(count: number = 1) {
    const drawnCards: D[] = this._drawPile.splice(0, count);
    this._discardPile.concat(drawnCards);
    return drawnCards;
  }

  /**
   * Moves cards from the draw pile to the discard pile
   * @chainable
   * @param {number} count - The number of cards to move from the draw pile to the discard pile
   */
  public discard(count: number = 1) {
    const discardedCards: D[] = this._drawPile.splice(0, count);
    this._discardPile.concat(discardedCards);
    return this;
  }

  /**
   * Resets the dealer for a new game
   * @chainable
   */
  public reset() {
    this._drawPile = [...this._deck];
    this._discardPile = [];
    return this;
  }

  /**
   * returns a count for the remaining cards in the draw pile
   * @returns count of remaining cards from draw pile
   */
  public remainingCards() {
    return this._drawPile.length;
  }
}

export default Dealer;
