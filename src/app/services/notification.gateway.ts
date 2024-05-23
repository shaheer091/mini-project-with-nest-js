import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class NotificationGateway implements OnGatewayConnection{
  @WebSocketServer() server: Server;

  sendNotification(msg: any) {
    this.server.emit('event', msg);
  }
  handleConnection(client: any, ...args: any[]) {
      console.log('Client connected: ', client.id);
  }
}
