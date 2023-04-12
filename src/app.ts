import fastify from 'fastify'
const app = fastify()

import {z} from 'zod'
import { prisma } from './lib/prisma';
app.get('/',(request,reply)=>{
    return 'olá'
})

app.post('/users', async (request,reply)=>{

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password:z.string().min(6)
    })

    const {name,email,password} = registerBodySchema.parse(request.body)
   
    
    await prisma.user.create({
        data:{
            name,
            email,
            password_hash:password
    
        }
    })

    reply.status(201)
})




export default app;