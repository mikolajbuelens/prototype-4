export type Users ={
    id: string,
    username: string,
    email: string,
    password: string,
    status: 'admin' | 'user'
}