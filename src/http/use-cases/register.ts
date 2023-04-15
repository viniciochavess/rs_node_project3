import { prisma } from "../../lib/prisma"

import { hash } from "bcryptjs"

import { IUsersRepository } from "../repositories/IUsers"

interface RegisterUseCaseRequest{
    name:string
    email:string
    password:string
}

// SOLID
// D - Dependency inversion Principle

export class  RegisterUseCase {

    constructor(private usersRepositor:IUsersRepository){
        
    }
    
    async execute({name,email,password}:RegisterUseCaseRequest) {
        
        const userWithSameEmail = await prisma.user.findUnique({
            where:{
                email
            }
        })
        
        if(userWithSameEmail){
            throw new Error("email alwared exist")
        }
        
        
        const password_hash = await hash(password,6)
        
     
        await this.usersRepositor.create({
            name,
            email,
            password_hash
        })
       
        
    }
}


