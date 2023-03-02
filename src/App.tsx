import {useState} from 'react'
import './App.scss'
import * as styled from '@/styles/styled.css'
import classnames from 'classnames'

function App() {
    const [count, setCount] = useState(0)
    let isShow = false;
    const myClass = classnames({
        box: true,
        box2: true
    })

    return (
        <div className="App">
            <h1>Vite + React</h1>
            <div className='Welcome'>
                <h2 className={myClass}>这是一个标题</h2>
            </div>
            <ul className={styled.todoList}>
                <li className={styled.todoInfo}>学习 React 开发</li>
                <li className={styled.todoInfo}>学习 Node.js 开发</li>
            </ul>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <h1>jsx语法使用</h1>
            <h2 title="hi" className="box">
                hello world
                <span>!!!!!!</span>
                <label htmlFor="elemInput">用户名：</label>
                <input id="elemInput"
                       type="text"
                       data-userid="123"/>
            </h2>
            <p>ppppppp</p>
            {
                isShow && 'hello world'
            }
        </div>
    )
}

export default App
