// 处理POST报文
import {JWT_SECRET_KEY} from "./config";
import jwt from 'jsonwebtoken'
import userData from './models/user'
import {ServerResponse} from 'http';

export async function parseJson(req: any) {
    let body = '';
    await new Promise((resolve) => {
        req.on('data', (chunk: any) => {
            body += chunk
        })
        req.on('end', () => {
            resolve(undefined)
        })
    })
    return JSON.parse(body)
}

// 根据token取用户信息
export function parseUser(headers: any) {
    const info = headers.authorization
    if (!info) {
        return null
    }
    const [prefix, token] = info.split(' ')
    if (prefix !== 'Bearer') {
        return null
    }
    try {
        const data: any = jwt.verify(token, JWT_SECRET_KEY)
        return userData.find(item => item.id === data.id)
    } catch (e) {
        return null
    }
}

// 未授权请求
export function authFailed(res: ServerResponse, message: string) {
    res.statusCode = 401
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.end(message)
}

// 错误请求
export function apiFailed(res: ServerResponse, message: Object) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.end(JSON.stringify(message))
}

// 正常响应
export function response(res: ServerResponse, message: Object) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.end(JSON.stringify(message))
}