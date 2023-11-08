import { createFeature, createReducer, on } from "@ngrx/store";
import { bracketActions } from "./actions";
import { BracketState } from "@app/types";

const initialState: BracketState = {
  bracket: []
}

const bracketFeature = createFeature({
  name: "bracket",
  reducer: createReducer(
    initialState,
    on(
      bracketActions.create,
      (state, action) => {
        return {
          bracket: action.bracket,
        }
      }
    ),
    on(
      bracketActions.update,
      (state, { winner, currentColumn, pairingIndex, nextPairingIndex }) => {
        const newBracket = {
          bracket: state.bracket.map((col, i) => {

            if (i === currentColumn) {
              const newColumn = [...col];

              newColumn.map((pairing, j) => {
                if (j === pairingIndex) {
                  const newPairing = {
                    ...pairing,
                    winner
                  }

                  return newPairing;
                }

                return pairing;
              })

              return newColumn;
            } else if (i === currentColumn + 1) {
              const even = pairingIndex % 2 === 0;
              let people = [...col[nextPairingIndex].people];
              if (even) {
                people[0] = winner;
              } else {
                people[1] = winner;
              }

              const newColumn = [
                ...col.slice(0, nextPairingIndex),
                { ...col[nextPairingIndex], people },
                ...col.slice(nextPairingIndex + 1)
              ];

              return newColumn;
            }

            return col;
          })
        }

        return newBracket
      }
    )
  )
});

export const {
  name: bracketFeatureKey,
  reducer: bracketReducer,
  selectBracket
} = bracketFeature;
