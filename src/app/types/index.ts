/**
 * Alias for string.
 */
export type Person = string;

/** 
 * Each pairing consists of an array of two people. 
 * Winner is the index of the person who has won or undefined.
 * 
 * @example
 * // A pairing where "Rohit" is the winner of this pair.
 * const p: Pairing = {
 *  people: ["Rohit", "Liam"],
 *  winner: 0
 * };
 */
export type Pairing = {
  people: Person[];
  winner?: Person;
  nextPairingIndex: number;
  currentColumn: number;
}

/**
 * The index variable represents the index of a pairing in a column of pairings.
 * If nextTop is true, the winner of the pairing of interest will be placed
 * in index 0 of the people array. If nextTop is false, the winner gets plcaed
 * in index 1 of the people array.
 */
export type PairingIndex = {
  index: number;
  nextTop: boolean;
}

/**
 * The bracket consists of an array of pairing arrays.
 * 
 * @example
 * // This represents a bracket where Rohit and Liam competed against one
 * // another, and Noah and Cameron competed against one another. Rohit
 * // and Noah were the winners of their respective pairs, and so were placed
 * // in the next array.
 * const b: Bracket = [
 *  ["Rohit", "Liam", "Noah", "Cameron"],
 *  ["Rohit", "Noah"]
 * ];
 */
export type Bracket = Pairing[][];

/**
 * The initial state of the bracket is just an empty Bracket.
 */
export type BracketState = {
  bracket: Bracket;
}
