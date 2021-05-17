'use strict';

require('dotenv').config();

const faker = require('faker');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const sns = new AWS.SNS();
const vendorName = process.env.VENDOR_NAME || 'ACME Vendor';
const vendorUrl = 'https://sqs.us-west-2.amazonaws.com/047507167948/vendor';
const { Consumer } = require('sqs-consumer');


const app = Consumer.create({
  queueUrl: vendorUrl,
  handleMessage: handler,
});

const topic = 'arn:aws:sns:us-west-2:047507167948:pickup.fifo';

let message = {
  orderId: faker.datatype.uuid(),
  customer: faker.name.findName(),
  vendor: process.env.VENDOR_NAME,
  vendorUrl: vendorUrl,
}

const payload = {
  MessageGroupId: 'MessageGroupId1',
  Message: JSON.stringify(message),
  TopicArn: topic
};

// publish new order to 'pickup' topic:
setInterval(() => {
  sns.publish(payload).promise()
  .then(data => {
    console.log(data);
  })
  .catch(console.error);
}, 5000);

// listen to vendor-specific queue for delivery notifications:
async function handler(message) {
  console.log(message);
}
app.start();