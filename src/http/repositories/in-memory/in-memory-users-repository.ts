import { randomUUID } from 'crypto'
import {IUsers, IUsersRepository} from '../IUsers'

export class InMemoryUsersRepository implements IUsersRepository{

    public items: IUsers[] = []

    create({ name, email, password_hash }: IUsers) {
        const user = {
            id:randomUUID(),
            name,
            email,
            password_hash
        }
        this.items.push(user)
        return user
    }
    findByEmail(email: string){
        const user = this.items.find(item => item.email == email)

        if(!user){
            return null
        }
        return user
    }


}
