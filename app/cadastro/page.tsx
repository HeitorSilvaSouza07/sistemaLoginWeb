'use client';

import {useState} from 'react';

export default function CadastroPage(){

    const [msg, setMsg] = useState('')
    const [ emailUser, setEmail ] = useState('')
    const [ passwordUser, setPassword ] = useState('')
    const [ error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(false)
  
    const handleSingUp =  async () => {

        setLoading(true)

        try{

                const r = await fetch('http://localhost:3001/api/createUser', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ emailUser, passwordUser }) 
                }
                )

                if(!r.ok){setError(true); throw new Error}

                const data = await r.json();

                setMsg(data.msg)
        
        }catch(error){

        }finally{
            setLoading(false)
        }
    }
  
    return(
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-md'>
                <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>Cadastro</h1>
                
                <div className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                        <input 
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                            type='email' 
                            name='email' 
                            placeholder='seu@email.com' 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Senha</label>
                        <input 
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                            type="password" 
                            name='password' 
                            placeholder='Digite sua senha' 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button 
                        onClick={handleSingUp}
                        disabled={loading}
                        className='w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 mt-6'
                    >
                        {loading ? 'Carregando...' : 'Cadastrar'}
                    </button>

                    <div className='bg-gray-200 border border-gray-500 rounded-2xl p-3'>
                        {msg && <p>{msg}</p>}
                    </div>
                </div>

                {error && <p className='mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center'>Erro ao fazer cadastro</p>}
            </div>
        </div>
    )
}