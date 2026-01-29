import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
const app = Fastify({ logger: true });//this logger is from pino, it was already installed by fastify.Pino is a logging library which gives out details in json format
//The level means the severity of log, ranging from 10-60,30 being the normal

app.get('/', {
    handler: async (request, reply) => {
        return { message: "hello" }
    }
})
async function userRoutes(fastify: FastifyInstance) {
    fastify.post("/", {
        handler: async (request: FastifyRequest<{
            Body: {
                name: string, age: string
            }
        }>, reply: FastifyReply) => {
            const body = request.body
            console.log(body)
            return reply.code(201).send(body)
        }
    })
}

app.register(userRoutes, { prefix: "/api/users" });

const start = async () => {
    try {
        app.listen({ port: 3000 })
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