import { prisma } from "../../../lib/prisma"

import {IUsers,IUsersRepository } from '../IUsers'



export class PrimsaUsersRepository implements IUsersRepository {
        async create(data: any){
           const user = await prisma.user.create({
                data,
            })
            return user
        }
        
}