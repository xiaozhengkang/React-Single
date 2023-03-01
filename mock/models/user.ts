// models/user.ts
import {UserInterface} from "../interfaces/user";

const Mock = require('mockjs')
const userData: UserInterface[] = [
    {
        id: Mock.mock('@increment'),
        username: 'admin',
        password: 'admin',
        role: ['admin']
    },
    {
        id: Mock.mock('@increment'),
        username: 'guest',
        password: 'guest',
        role: ['guest']
    }
]
export default userData;