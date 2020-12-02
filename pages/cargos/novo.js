import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { API_URL } from '../../shared/variables';
import Link from 'next/link'
import Router from 'next/router'

const criarCargo = () => {
    const [nome, setNome] = useState();
    
    const url = `${API_URL}/cargos`;

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await axios.post(url,{id: 0, nome: nome || ""}).then(res => {
            Router.push("/cargos");
        }).catch(error =>{
            if ('fieldErrors' in error.response.data){
                alert(error.response.data.fieldErrors.nome);
            }else if(error.response.data.status == 400){
                alert(error.response.data.message);
            }else if(error.response.data.status == 500){
                alert(error.response.data.message);
            }
        });
    }
    return (
        <>
            <h2 className="text-4xl py-2">Editar Cargo</h2>
            <form onSubmit={handleSubmit}>
                <label className="block">
                    <span className="text-gray-700">Nome Cargo</span>
                    <input type="text" className="form-input mt-1 block w-full" placeholder="Nome Cargo" 
                        value={nome}
                        onChange={e => setNome(e.target.value)}/>
                </label>
                <div className="py-3">
                    <button type="submit" className="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-700 hover:bg-purple-900 text-white font-normal py-2 px-4 mr-1 rounded">Gravar</button>
                    <Link href={{ pathname: "/cargos"}}>
                        <button type="button" className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-purple-700 hover:bg-purple-700 text-purple-700 hover:text-white font-normal py-2 px-4 rounded">Voltar para lista</button>
                    </Link>
                </div>
            </form>   
        </>
    )
}

export default criarCargo
