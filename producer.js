const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    clientId: "kafka-app",
    brokers: ["localhost:9092"]
});

const producer = kafka.producer();

async function connectProd() {
    await producer.connect();
}

async function sendMessage(topic, message) {
    await producer.send({
        topic: topic,
        messages: [{value:message}]
    });
}

async function main() {
    await connectProd();
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function promptMessage() {
        readline.question('Enter message: ', async (message) => {
            await sendMessage('immediate-events', message);
        });
    }
    for (let i=0;i<10;i++) promptMessage();
}

main();