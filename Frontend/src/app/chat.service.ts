import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: any;
  private apiUrl = 'http://localhost:3000';  // Backend URL

  constructor(private http: HttpClient) {
    // Initialize Socket.io client
    this.socket = io(this.apiUrl);
  }

  // Join the chat with the userId (e.g., candidate or employer)
  joinChat(userId: string) {
    this.socket.emit('join', userId);
  }

  // Send a message to the recipient
  sendMessage(data: any) {
    this.socket.emit('sendMessage', data);
  }

  // Listen for incoming messages
  receiveMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('receiveMessage', (message: any) => {
        observer.next(message);  // Emit received message to subscribers
      });
    });
  }

  // Get message history between two users
  getMessages(user1: string, user2: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/messages/${user1}/${user2}`);
  }
}
