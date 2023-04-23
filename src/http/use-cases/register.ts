
import { hash } from "bcryptjs"
import { IUsersRepository , IUsers} from "../repositories/IUsers"
import { UserAlreadyExistsError } from "./erros/user-already-exists-erro"




interface RegisterUseCaseRequest{
    name:string
    email:string
    password:string
}

interface RegisterUseCaseResponse{
    user:IUsers
}

// SOLID
// D - Dependency inversion Principle

export class  RegisterUseCase {

    constructor(private usersRepositor:IUsersRepository){
        
    }
    
    async execute({name,email,password}:RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        
        const userWithSameEmail = await this.usersRepositor.findByEmail(email)
        
        if(userWithSameEmail){
            throw new UserAlreadyExistsError()
        }
        
        
        const password_hash = await hash(password,6)
        
     
       const user = await this.usersRepositor.create({
            name,
            email,
            password_hash
        })
       
        return {
            user,
        }
        
    }
}


