import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { combineLatest } from "rxjs";
import { Store } from "@ngrx/store";

import { PairingComponent } from "@app/components/pairing/pairing.component"
import { BracketColumnComponent } from "@app/components/bracketColumn/bracketColumn.component";
import { selectBracket } from "@app/store/reducers";
import { closestPowerOfTwo } from "@app/util";

@Component({
  selector: "tg-bracket",
  standalone: true,
  templateUrl: "./bracket.component.html",
  imports: [CommonModule, PairingComponent, BracketColumnComponent],
})
export class BracketComponent implements OnInit {

  data$ = combineLatest({
    bracket: this.store.select(selectBracket)
  });

  nColumns: number | undefined = undefined;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.data$.pipe().subscribe((data) => {
      this.nColumns = data.bracket.length > 0 ? Math.log2(closestPowerOfTwo(data.bracket.length)) : undefined;
    })
  }
}