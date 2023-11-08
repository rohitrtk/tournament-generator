import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { combineLatest } from "rxjs";

import { PairingComponent } from "@app/components/pairing/pairing.component";
import { selectBracket } from "@app/store/reducers";

@Component({
  selector: "tg-bracket-column",
  standalone: true,
  templateUrl: "./bracketColumn.component.html",
  imports: [CommonModule, PairingComponent],
})
export class BracketColumnComponent {
  @Input() columnIndex: number = -1;

  data$ = combineLatest({
    bracket: this.store.select(selectBracket)
  });

  constructor(private store: Store) { }
}