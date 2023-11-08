import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { bufferCount, filter, from, map, toArray } from "rxjs";
import { Store } from "@ngrx/store";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { ionRemoveCircleOutline } from "@ng-icons/ionicons";

import { BracketService } from "@app/services/bracket.service";
import { bracketActions } from "@app/store/actions";

@Component({
  selector: "tg-sidebar",
  templateUrl: "./sidebar.component.html",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIconComponent],
  providers: [provideIcons({ ionRemoveCircleOutline })],
  animations: [
    trigger("openClose", [
      state('open', style({ width: '300px' })),
      state('closed', style({ width: '100px' })),
      transition('open => closed', [animate("300ms ease-out")]),
      transition('closed => open', [animate("300ms ease-out")])
    ]),
    trigger("openCloseChild", [
      state("open", style({ opacity: 1.0 })),
      state("closed", style({ opacity: 0.0 })),
      transition("open => closed", [animate("300ms ease-in-out")]),
      transition("closed => open", [animate("300ms ease-in-out")])
    ])
  ]
})
export class SidebarComponent implements OnInit {

  open: boolean = false;

  form = this.fb.group({
    people: this.fb.array([])
  })

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private bracketService: BracketService
  ) { }

  ngOnInit(): void { }

  get people() {
    return this.form.controls.people as FormArray;
  }

  addPerson() {
    const personForm = this.fb.group({
      name: ["", Validators.required]
    })

    this.people.push(personForm);
  }

  deletePerson(index: number) {
    this.people.removeAt(index);
  }

  clearList() {
    for (let i = this.people.length - 1; i >= 0; i--) {
      this.people.removeAt(i);
    }
  }

  createBracket() {
    const people = this.people.getRawValue() as { name: string }[];

    from(people).pipe(
      bufferCount(2),
      filter(pair => pair.length > 0),
      map((pair) => ({
        people: [pair[0].name, pair[1].name],
        winner: undefined,
      })),
      toArray(),
    ).subscribe((result) => {
      const bracket = this.bracketService.createBracket(result);
      this.store.dispatch(bracketActions.create({ bracket }));

      // console.log(bracket);
    })
  }

  onMouseEnter() {
    this.open = true;
  }

  onMouseLeave() {
    this.open = false;
  }
}