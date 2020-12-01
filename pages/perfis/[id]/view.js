import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { API_URL } from '../../../shared/variables';
import Link from 'next/link'

const detailPerfil = () => {
    const router = useRouter();
    const { id } = router.query;
    const [perfil, setPerfil] = useState([]);
    
    const url = `${API_URL}/perfis-usuarios/${id}`;

    useEffect(() => {
        return getPerfil();
    }, []);

    const getPerfil = async (id) => {        
        await axios.get(url).then(res => {
            setPerfil(res.data);
            }
        );
    };

  return (
    <>
        <h2 className="text-4xl py-2">Visualizar Perfil #{perfil.id}</h2>
        <table class="table-auto">
            <tbody>
                <tr>
                    <td className="text-2xl px-3">Id:</td>
                    <td className="text-2xl px-3 ">{perfil.id}</td>
                </tr>
                <tr className="bg-blue-200">
                    <td className="text-2xl px-3">Nome:</td>
                    <td className="text-2xl px-3 bg-blue-200">{perfil.nome}</td>
                </tr>
            </tbody>
        </table>
        <div className="py-3">
            <Link href={{ pathname: "/perfis"}}>
                <button type="button" class="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-700 hover:bg-purple-900 text-white font-normal py-2 px-4 mr-1 rounded">Voltar para lista</button>
            </Link>
            <Link href={{ pathname: "/perfis/[id]/editar", query: { id: perfil.id }}}>
                <button type="button" class="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-purple-700 hover:bg-purple-700 text-purple-700 hover:text-white font-normal py-2 px-4 rounded">Editar Perfil</button>
            </Link>
        </div>
    </>
  )
}

detailPerfil.getInitialProps = async (ctx) => {
    const id = ctx.query.id;
    return { id: id };
}

export default detailPerfil

