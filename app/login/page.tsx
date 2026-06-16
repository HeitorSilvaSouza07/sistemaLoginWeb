'use client'

import {useState} from 'react';

export default function LoginPage(){

    const [ emailUser, setEmailUser ] = useState('')
    const [ passwordUser, setPasswordUser ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ message, setMessage ] = useState('')
    const [ messageType, setMessageType ] = useState<'success' | 'error' | ''>('')

    const handleLogin = async () => {

        setLoading(true)
        setMessage('')

    try{
        const r = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailUser, passwordUser }) 
        })
        
        const data = await r.json()

        if(!r.ok){
            setMessageType('error')
            setMessage(data.msg)
            throw new Error(data.msg)
        }

        setMessageType('success')
        setMessage(data.msg)
        console.log('Login bem sucedido:', data)

    }catch(error: any){
        console.log('Erro no login:', error)
        if(!message) {
            setMessageType('error')
            setMessage(error.message || 'Erro ao fazer login')
        }       
    }finally{
        setLoading(false)
    }
    }

    return(
        <div>
            <h1>Login</h1>
            <input 
                type="email" 
                name="emailUser"
                value={emailUser}
                onChange={(e) => setEmailUser(e.target.value)}
                placeholder="Email"
            />
            <input 
                type="password" 
                name="passwordUser"
                value={passwordUser}
                onChange={(e) => setPasswordUser(e.target.value)}
                placeholder="Senha"
            />
            <button onClick={handleLogin} disabled={loading}>
                {loading ? 'Carregando...' : 'Entrar'}
            </button>
            {message && (
                <p style={{ 
                    color: messageType === 'success' ? 'green' : 'red',
                    marginTop: '10px'
                }}>
                    {message}
                </p>
            )}
        </div>
    )
}