
interface IUsers {
    name:string,
    email:string,
    password_hash:string
}


 interface IUsersRepository{

    create({name,email,password_hash}:IUsers): Promise <any>
    findByEmail(email:string): Promise  <any|null>


}


export  {IUsers, IUsersRepository}