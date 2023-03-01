// services/auth.ts
import {authFailed, parseJson, parseUser, response} from "../utils"
import userData from '../models/user'
import jwt from 'jsonwebtoken'
import {JWT_SECRET_KEY, TOKEN_TIMEOUT, URL_PREFIX} from "../config";


export default [
    {
        url: URL_PREFIX + 'auth/login',
        method: 'post',
        timeout: 300, // 模拟响应延时
        rawResponse: async (req: any, res: any) => {
            const body = await parseJson(req)
            const user = userData.find(item => item.username === body.username)
            if (!user) {
                return authFailed(res, "用户不存在")
            }
            if (user.password !== body.password) {
                return authFailed(res, "密码错误")
            }
            const payload = {
                id: user.id,
                username: user.username,
                exp: Math.floor(Date.now() / 1000) + TOKEN_TIMEOUT,
            }
            const token = jwt.sign(payload, JWT_SECRET_KEY, {algorithm: 'HS256'})
            return response(res, {token: token})
        }
    },
    {
        url: URL_PREFIX + 'auth/userinfo',
        method: 'get',
        rawResponse: (req: any, res: any) => {
            const user = parseUser(req.headers)
            if (!user) {
                return authFailed(res, "Token过期")
            }
            return response(res, user)
        }
    },
    {
        url: URL_PREFIX + 'auth/logout',
        method: 'post',
    }
]
