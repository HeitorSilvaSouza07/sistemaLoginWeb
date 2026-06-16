'use client'

import {useState} from 'react';

export default function LoginPage(){

    const [ emailUser, setEmailUser ] = useState('')
    const [ passwordUser, setPasswordUser ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)

    const handleLogin = async () => {

        setLoading(true)

    try{
        const r = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailUser, passwordUser }) 
        })
        
        if(!r.ok){setError(true); throw new Error}

        const data = await r.json()
        console.log('Login bem sucedido:', data)

    }catch(error){
        console.log('Erro no login:', error)
        setError(true)       
    }finally{
        setLoading(false)
    }
    }

    return(
        <div>
            <h1>Login</h1>
            <input 
                type="text" 
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
            {error && <p>Erro ao fazer login</p>}
        </div>
    )
}