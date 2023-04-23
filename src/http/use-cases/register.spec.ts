import {expect, test, describe, it} from 'vitest'
import {RegisterUseCase} from './register'
import {InMemoryUsersRepository} from '../repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './erros/user-already-exists-erro'

describe('Register Use Case', ()=>{
    it('should has user password upon registration', async()=>{
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)


      const {user} =  await registerUseCase.execute({
            name:'John Doe',
            email:'johndoel@email.com',
            password:'123456'
        })
     


        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )
        expect(isPasswordCorrectlyHashed).toBe(true)
    })


    it('should not be able to register with same email twice', async()=>{
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

        const email = 'johndoel@email.com'


        await registerUseCase.execute({
            name:'John Doe',
            email:'johndoel@email.com',
            password:'123456'
        })


        

        expect(async()=>{
            await registerUseCase.execute({
                name:'John Doe',
                email:'johndoel@email.com',
                password:'123456'
            })
         
        }).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })


    it('should be able to register', async()=>{
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

        const email = 'johndoel@email.com'


      const {user} =  await registerUseCase.execute({
            name:'John Doe',
            email:'johndoel@email.com',
            password:'123456'
        })


        expect(user.id).toEqual(expect.any(String))
        
        

     
    })
   
    
})