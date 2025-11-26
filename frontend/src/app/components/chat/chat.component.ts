import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: string[] = [];
  newMessage: string = '';
  conversationId: string = 'conv_' + Date.now();
  isLoading: boolean = false;

  constructor(private chatService: ChatService) {}

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    this.messages.push('אתה: ' + this.newMessage);
    const messageToSend = this.newMessage;
    this.newMessage = '';
    this.isLoading = true;
    
    this.chatService.sendMessage(messageToSend, this.conversationId)
      .subscribe({
        next: (response) => {
          this.messages.push('AI: ' + response);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error:', error);
          this.messages.push('שגיאה: לא ניתן להתחבר לשרת');
          this.isLoading = false;
        }
      });
  }
}