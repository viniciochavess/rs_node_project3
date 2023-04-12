import fastify from 'fastify'
const app = fastify()

import {z} from 'zod'
import { prisma } from './lib/prisma';
import { appRoutes } from './http/routes';

app.get('/',(request,reply)=>{
    return 'olá'
})

app.register(appRoutes,{
    prefix:'users'
})




export default app;