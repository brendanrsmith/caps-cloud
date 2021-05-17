'use strict';

const { Consumer } = require('sqs-consumer');
const { Producer } = require('sqs-producer');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/047507167948/packages.fifo',
  handleMessage: handler,
});


async function handler(message) {
  try {
    const messageBody = JSON.parse(message.Body);
    // console.log(messageBody);
    const parsed = JSON.parse(messageBody.Message);
    console.log('parsed order Message:', parsed);

    setTimeout(async () => {

      const producer = Producer.create({
        queueUrl: parsed.vendorUrl,
      });

      await producer.send({
        id: parsed.orderId,
        body: `order ${parsed.orderId} was delivered`,
      });

      console.log(`delivered order ${parsed.orderId}`);
      // app.stop(); // tell sqs-consumer to stop processing messages
    }, 3000);

  } catch {
    console.error();
  }

}

app.start();
