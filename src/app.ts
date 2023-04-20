import fastify from 'fastify'
const app = fastify()

import {ZodError, z} from 'zod'
import { prisma } from './lib/prisma';
import { appRoutes } from './http/routes';
import { env } from './env';

app.get('/',(request,reply)=>{
    return 'olá'
})

app.register(appRoutes,{
    prefix:'users'
})

app.setErrorHandler((error,request,reply)=>{
    if(error instanceof ZodError){
        return reply.status(400).send({message:"Validation error", issue : error.format()})
    }
    if(env.NODE_ENV == 'production'){
        console.log(env.NODE_ENV)
        console.error(error)
    }
})




export default app;