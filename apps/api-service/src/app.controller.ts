import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('WORKER_SERVICE') private readonly client: ClientProxy) { }

  // async onApplicationBootstrap() {
  //   await this.client.connect();
  // }

  @Get()
  async startJob() {
    console.log('Sending job to worker');
    await this.client.emit('start_job', { bool: true, num: 123.45, str: "A message string." }).toPromise();
    return 'Job sent!';
  }

  @EventPattern('progress')
  async handleProgress(data: any) {
    console.log('Progress received:', data);
  }

  @EventPattern('result')
  async handleReply(data: any) {
    console.log('Reply received:', data);
  }
}
