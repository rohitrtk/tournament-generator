import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { BracketService } from "@app/services/bracket.service";
import { Pairing } from "@app/types";

@Component({
  standalone: true,
  selector: "tg-pairing",
  templateUrl: "./pairing.component.html",
  imports: [CommonModule]
})
export class PairingComponent {

  @Input({ required: true }) pairing!: Pairing;
  @Input({ required: true }) pairingIndex!: number;
  @Input({ required: true }) currentColumn: number = 0;

  winner: string | undefined = undefined;

  constructor(private bracketService: BracketService) { }

  setWinner(winner: string) {
    const [top, bottom] = this.pairing.people;

    this.winner = winner === top ? top : winner === bottom ? bottom : undefined;

    if (this.winner) {
      this.bracketService.updateWinner(this.winner, this.currentColumn, this.pairingIndex, this.pairing.nextPairingIndex);
    }
  }
}