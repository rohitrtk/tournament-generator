import { Component } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BracketComponent } from './components/bracket/bracket.component';

@Component({
  selector: 'tg-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    SidebarComponent,
    BracketComponent
  ]
})
export class AppComponent {

}
