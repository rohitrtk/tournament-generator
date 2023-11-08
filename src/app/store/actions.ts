import { createActionGroup, props } from "@ngrx/store";
import { Bracket } from "@app/types";

export const bracketActions = createActionGroup({
  source: "bracket",
  events: {
    "Create": props<{ bracket: Bracket }>(),
    "Update": props<{ winner: string, currentColumn: number, pairingIndex: number, nextPairingIndex: number }>()
  }
})