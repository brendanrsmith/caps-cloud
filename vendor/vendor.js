'use strict';

require('dotenv').config();

const faker = require('faker');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const sns = new AWS.SNS();

const topic = 'arn:aws:sns:us-west-2:047507167948:pickup.fifo';

const payload = {
  MessageGroupId : 'MessageGroupId1',
  Message: 'test message 4',
  TopicArn: topic
};

// publish new order to 'pickup' topic
sns.publish(payload).promise()
  .then(data => {
    console.log(data);
  })
  .catch(console.error);