import fastify from 'fastify'
import {PrismaClient} from "@prisma/client"
const app = fastify()

const prisma = new PrismaClient()

prisma.user.create({
    data:{
        email:"Teste@gmail.com",
        name:"Vinicio"
    }
})

export default app;