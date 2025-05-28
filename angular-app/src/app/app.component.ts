import { CommonModule } from '@angular/common';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Bienvenido a la app Angular con WebSocket!';
  messages: string[] = [];
  private ws!: WebSocket;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.connectWebSocket();
  }

  connectWebSocket() {
    this.ws = new WebSocket('ws://localhost:8765');
    
    this.ws.onmessage = (event) => {
      this.ngZone.run(() => {
        this.messages.push(event.data);
      });
    };

    this.ws.onopen = () => {
      console.log('Conectado al WebSocket');
    };

    this.ws.onclose = () => {
      console.log('WebSocket cerrado');
      setTimeout(() => this.connectWebSocket(), 5000);
    };

    this.ws.onerror = (error) => {
      console.error('Error WebSocket:', error);
      this.ws.close();
    };
  }
}
