import {FastifyRequest,FastifyReply} from 'fastify'

import {ZodCatch, ZodError, z} from 'zod'
import {RegisterUseCase} from '../use-cases/register'
import { PrimsaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '../use-cases/erros/user-already-exists-erro'


export async function register(request:FastifyRequest,reply:FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password:z.string().min(6)
    })

    const {name,email,password} = registerBodySchema.parse(request.body)

    try{
        const prismaUsersRepository = new PrimsaUsersRepository();
        
        
        const registerUseCase = new RegisterUseCase(prismaUsersRepository);
        await registerUseCase.execute({name,email,password})

    }catch(error){
        if(error instanceof UserAlreadyExistsError){
            return reply.status(409).send(error.message)

        }

    

            return reply.status(500)
    }
   

    reply.status(201).send()
    
}