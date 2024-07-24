const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    clientId: "kafka-app",
    brokers: ["localhost:9092"]
});

const consumer = kafka.consumer({
    groupId: "kafka-app7"
});

async function connectCons() {
    await consumer.connect();
    await consumer.subscribe({topic: "immediate-events", fromBeginning: true});

    await consumer.run({
        eachMessage: async({topic, partition,message}) => {
            console.log({
                offset: message.offset,
                value: message?.value?.toString()
            })
        }
    });
}

connectCons();