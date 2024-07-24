const {connectProd, sendMessage} = require('./producer');
const {connectCons} = require('./consumer');

async function main() {
    await connectProd();
    await connectCons();

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Enter message: ',async(message) => {
        await sendMessage('immediate-events',message);
        readline.close();
    });
}
main();