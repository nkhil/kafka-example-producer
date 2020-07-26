const config = require('../config');
const kafka = require('kafka-node');

async function handleMessage(req, res, next) {
  try {
    const Producer = kafka.Producer;
    const client = new kafka.KafkaClient(config.kafka.kafka_server);
    const producer = new Producer(client);
    const { topic, messages } = req.body;
    const payloads = [
      {
        topic,
        messages,
      }
    ];

    producer.on('ready', async function () {
      await producer.send(payloads, (err, data) => {
        if (err) {
          console.log('ON READY ERR \n', err);
          console.log(`kafka-producer -> ${topic}: broker update failed`);
        } else {
          console.log(`kafka-producer -> ${topic}: broker update success`);
          res.status(201).send();
        }
      });
    });

    producer.on('error', function (err) {
      console.log(err);
      console.log(`kafka-producer -> ${topic}: connection errored`);
      throw err;
    });

  } catch (err) {
    // Handle error
    console.log('Error:\n', err);
  }
}

module.exports = {
  handleMessage,
}
