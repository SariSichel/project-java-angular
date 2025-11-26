import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ChatComponent],
  //   template: '<app-chat></app-chat>',
  // styleUrls: ['./app.component.css']
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project-angular';
}
