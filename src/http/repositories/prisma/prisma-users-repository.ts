import { prisma } from "../../../lib/prisma"

import {IUsers,IUsersRepository } from '../IUsers'



export class PrimsaUsersRepository implements IUsersRepository {
        async findByEmail(email: string): Promise<any> {
            const emailAlwaredExist = await prisma.user.findUnique({
                where:{
                    email
                }
            })
            return emailAlwaredExist
        }
        async create(data: any){
           const user = await prisma.user.create({
                data,
            })
            return user
        }
        
}