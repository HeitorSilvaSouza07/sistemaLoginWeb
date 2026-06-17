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
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-md'>
                <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>Entrar</h1>
                
                <div className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                        <input 
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                            type="email" 
                            name="emailUser"
                            value={emailUser}
                            onChange={(e) => setEmailUser(e.target.value)}
                            placeholder="seu@email.com"
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Senha</label>
                        <input 
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                            type="password" 
                            name="passwordUser"
                            value={passwordUser}
                            onChange={(e) => setPasswordUser(e.target.value)}
                            placeholder="Digite sua senha"
                        />
                    </div>

                    <button 
                        onClick={handleLogin} 
                        disabled={loading}
                        className='w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 mt-6'
                    >
                        {loading ? 'Carregando...' : 'Entrar'}
                    </button>
                </div>

                    <div className='bg-gray-200 border border-gray rounded-2xl'>
                        {message && <p >{message}</p>}
                    </div>

                <p className='text-center text-sm text-gray-600 mt-6'>
                    Não tem conta? <a href="/cadastro" className='text-blue-500 hover:text-blue-600 font-semibold'>Cadastre-se</a>
                </p>
            </div>
        </div>
    )
}