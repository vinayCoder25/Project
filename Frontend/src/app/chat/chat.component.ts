import { Component } from '@angular/core';
import { ChatService } from '../chat.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userId = 'candidate';  // Assume this is the logged-in user’s ID
  partnerId = 'employer';  // The other user's ID (employer or candidate)
  messages: any[] = [];
  newMessage: string = '';

  constructor(private chatService: ChatService, private authService: AuthService) {}

  ngOnInit(): void {
    // Join the chat when the component is initialized

    const role = this.authService.getDataFromToken('');
    if(role == 'employer'){
      this.userId = 'employer';
      this.partnerId = 'candidate';
    } else {
      this.userId = 'candidate';
      this.partnerId = 'employer';
    }

    this.chatService.joinChat(this.userId);


    // Load the message history
    this.chatService.getMessages(this.userId, this.partnerId).subscribe((messages) => {
      this.messages = messages;
    });

    // Listen for incoming messages
    this.chatService.receiveMessage().subscribe((message) => {
      this.messages.push(message);  // Add the received message to the chat
    });
  }

  // Send a message
  sendMessage(): void {
    if (this.newMessage.trim()) {
      const messageData = {
        sender: this.userId,
        recipient: this.partnerId,
        message: this.newMessage
      };
      this.chatService.sendMessage(messageData);  // Emit the message
      this.newMessage = '';  // Clear the input field after sending
    }
  }
}
