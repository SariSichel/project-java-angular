import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:8080/api/Post/chat';

  constructor(private http: HttpClient) {}

  sendMessage(message: string, conversationId: string): Observable<string> {
    const body = { message, conversationId };
    return this.http.post(this.apiUrl, body, { responseType: 'text' });
  }
}