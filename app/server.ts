import Fastify from 'fastify';
const app = Fastify({logger:true});//this logger is from pino, it was already installed by fastify.Pino is a logging library which gives out details in json format
//The level means the severity of log, ranging from 10-60,30 being the normal

app.get('/', async () => {
    return { hello: 'world' }
})


const start = async () => {
    try {
        app.listen({ port: 3000 }, (error, address) => {
            if (error) throw error
            console.log(`server running on ${address}`)
        });
    } catch (error) {
        app.log.error(error)
        process.exit(1)
    }
};
start();

const closeApp = async () => {
    await app.close()
    process.exit(1)
};

process.on('SIGINT', closeApp);   
process.on('SIGTERM', closeApp);