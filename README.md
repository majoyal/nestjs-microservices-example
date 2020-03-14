## Description

This is an example [Nest](https://github.com/nestjs/nest) monorepo project with two microservices communicating asynchronously with each other via events over basic [Nest's TCP Transporter](https://docs.nestjs.com/microservices/basics).

The first microservice (`api-service`) exposes a `GET /` endpoint which, when requested, sends an event to the second microservice (`worker-service`) through that TCP transporter. `worker-service` then do some fake processing and sends back an event to the first service to notify it that processing is done.

An important thing to note here is that all of this process is asynchronous, so no matter how much time is needed on the worker side, response is immediate on the API side, because we use event-based message style. If we were using [request-response](https://docs.nestjs.com/microservices/basics#request-response) message style, initial request would be blocked until the worker side is done with data processing. The drawback is that there is no guarantee that the messages will be successfully delivered. For that, we would need to add some sort of message broker such as [RabbitMQ](https://docs.nestjs.com/microservices/rabbitmq) as a replacement transporter.

## Installation

```bash
$ yarn
```

or

```bash
$ npm install
```

## Running the services
Open two terminal windows and start both services.

To run the `api-service`:
```bash
$ yarn start
```
or
```bash
$ npm run start
```

And to run the `worker-service`:
```bash
$ yarn start:worker
```
or
```bash
$ npm run start:worker
```
When both services are started and running, go to http://localhost:3000 then take a look at the terminal windows. You should see some output in both of them.

## Contributing
Feel free to open an issue or make a PR if you think this sample can be improved (it definitely can!).

## Credits
This example was initially inspired by [this article](https://medium.com/swlh/write-your-first-microservice-in-nest-js-841e10a86117).

## License

[MIT licensed](LICENSE)
