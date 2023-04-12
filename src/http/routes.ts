import {FastifyInstance} from 'fastify'
import {register} from '../http/controller/register'


export async function routerRegister(app:FastifyInstance) {

    app.post('',register)
    
}