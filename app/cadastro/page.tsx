'use client';

import {useState} from 'react';

export default function CadastroPage(){

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


        
        }catch(error){

        }finally{
            setLoading(false)
        }
    }
  
    return(
        <div>
            <h1>Aba de cadastro</h1>
            <input type='text' name='email' placeholder='emaiç' onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" name='password' placeholder='senha' onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleSingUp}>{loading ? 'Carregando...' : 'Entrar'}</button>
            {error && <p>Erro ao fazer login</p>}
        </div>
    )
}