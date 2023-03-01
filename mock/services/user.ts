// services/user.ts
// 一套完整的CRUD实现
import userData from '../models/user'
import {apiFailed, parseJson, response} from '../utils'
import {URL_PREFIX} from "../config";

const Mock = require('mockjs')
export default [
    {
        url: URL_PREFIX + 'user',
        method: 'get',
        response: userData
    },
    {
        url: URL_PREFIX + 'user/:id',
        method: 'get',
        response: ({query}: any) => {
            return userData.find(item => item.id.toString() === query.id)
        }
    },
    {
        url: URL_PREFIX + 'user',
        method: 'post',
        rawResponse: async (req: any, res: any) => {
            const instance = await parseJson(req)
            if (userData.find(item => item.username === instance.username)) {
                return apiFailed(res, '用户名重复')
            }
            instance.id = Mock.mock('@increment')
            userData.push(instance)
            return response(res, instance)
        }
    },
    {
        url: URL_PREFIX + 'user/:id',
        method: 'put',
        response: ({query, body}: any) => {
            const instance = userData.find(item => item.id.toString() === query.id)
            instance && Object.assign(instance, body)
            return instance
        }
    },
    {
        url: URL_PREFIX + 'user/:id',
        method: 'delete',
        response: ({query}: any) => {
            const instance = userData.find(item => item.id.toString() === query.id)
            instance && userData.splice(userData.indexOf(instance))
            return {}
        }
    }
]