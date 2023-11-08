import { Injectable } from "@angular/core";
import { combineLatest } from "rxjs";
import { Store } from "@ngrx/store";

import { Bracket, Pairing } from "@app/types";
import { closestPowerOfTwo } from "@app/util";
import { selectBracket } from "@app/store/reducers";
import { bracketActions } from "@app/store/actions";

@Injectable({
  providedIn: "root"
})
export class BracketService {
  constructor(private store: Store) { }

  data$ = combineLatest({
    bracket: this.store.select(selectBracket)
  });

  private isEvenGrouping(n: number) {
    return n % 2 === 0;
  }

  createEmptyPairing(currentColumn: number): Omit<Pairing, "nextPairingIndex"> {
    return {
      people: ["", ""],
      winner: undefined,
      currentColumn
    }
  }

  createBracket(pairingData: Partial<Pairing>[]): Bracket {
    const bracket = [pairingData];
    const nPeople = pairingData.length;
    const nColumns = nPeople > 0 ? Math.log2(closestPowerOfTwo(nPeople)) + 1 : -1;

    // Handle even number of groupings
    if (this.isEvenGrouping(nPeople)) {
      let nPairings = nPeople / 2;
      for (let i = 0; i < nColumns; i++) {

        if (i === 0) {
          let pairingIndex = -1;
          for (let j = 0; j < bracket[0].length; j++) {
            bracket[0][j].nextPairingIndex = j % 2 === 0 ? ++pairingIndex : pairingIndex;
            bracket[0][j].currentColumn = 0;
            // bracket[0][j].pairingIndex = 0;
          }
          continue;
        }

        const pairings: Pairing[] = Array(nPairings).fill(this.createEmptyPairing(i));
        let pairingIndex = -1;
        bracket.push(pairings);
        for (let j = 0; j < bracket[i].length; j++) {
          bracket[i][j].nextPairingIndex = j % 2 === 0 ? ++pairingIndex : pairingIndex;
          bracket[i][j].currentColumn = i;
        }
        nPairings /= 2;
      }

    } else {
      console.error("Uneven grouping not implemented.");
    }

    return bracket as Bracket;
  }

  updateWinner(winner: string, currentColumn: number, pairingIndex: number, nextPairingIndex: number) {
    this.store.dispatch(bracketActions.update({ winner, currentColumn, pairingIndex, nextPairingIndex }))
  }
}