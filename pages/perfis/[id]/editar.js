import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { API_URL } from '../../../shared/variables';
import Link from 'next/link'
import Router from 'next/router'

const editarPerfil = () => {
    const router = useRouter();
    const { id } = router.query;
    const [perfil, setPerfil] = useState({});
    const [nome, setNome] = useState();
    
    const url = `${API_URL}/perfis-usuarios/${id}`;

    useEffect(() => {
        return getPerfil();
    }, []);

    const getPerfil = async (id) => {        
        await axios.get(url).then(res => {
                setPerfil(res.data);
                setNome(res.data.nome)
            }
        );
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await axios.put(url,{id: perfil.id, nome: nome || ""}).then(res => {
            Router.push("/perfis");
        }).catch(error =>{
            if ('fieldErrors' in error.response.data){
                alert(error.response.data.fieldErrors.nome);
            }
        });
    }
    return (
        <>
            <h2 className="text-4xl py-2">Editar Perfil #{perfil.id}</h2>
            <form onSubmit={handleSubmit}>
                <label className="block">
                    <span className="text-gray-700">Nome Perfil</span>
                    <input type="text" className="form-input mt-1 block w-full" placeholder="Nome Cargo" 
                        value={nome}
                        onChange={e => setNome(e.target.value)}/>
                </label>
                <div className="py-3">
                    <button type="submit" className="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-700 hover:bg-purple-900 text-white font-normal py-2 px-4 mr-1 rounded">Gravar</button>
                    <Link href={{ pathname: "/perfis"}}>
                        <button type="button" className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-purple-700 hover:bg-purple-700 text-purple-700 hover:text-white font-normal py-2 px-4 rounded">Voltar para lista</button>
                    </Link>
                </div>
            </form>   
        </>
    )
}

editarPerfil.getInitialProps = async (ctx) => {
    const id = ctx.query.id;
    return { id: id };
}

export default editarPerfil
