export class UserAlreadyExistsError extends Error {
    constructor(){
        super('alwared exist email')
    }
}