'use strict';

const { Consumer } = require('sqs-consumer');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/047507167948/packages.fifo',
  handleMessage: async (message) => {
    console.log(message.Body);
  }
});

app.start();