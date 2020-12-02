import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { API_URL } from '../../../shared/variables';
import Link from 'next/link'

const detailUser = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState([]);
    const [carregado, setCarregado] = useState(false);
    
    const url = `${API_URL}/usuarios/${id}`;

    useEffect(() => {
        getUser();
        if('id' in user){
            setCarregado(true);
        }
    }, []);

    // useEffect(() => {
    //     setUser(prevUser=>({...prevUser, dataNascimento: user.dataNascimento.toString().split('-').reverse().join('/') }))
    // }, [carregado]);

    const getUser = (id) => {        
        axios.get(url).then(res => {
            setUser(res.data);
            // setUser(prevUser=>({...prevUser, dataNascimento: user.dataNascimento.toString().split('-').reverse().join('/') }))
            console.log(res.data)
        }).catch(error =>{
        if ('fieldErrors' in error.response.data){
            alert(error.response.data.fieldErrors.nome);
        }else if(error.response.data.status == 400){
            alert(error.response.data.message);
        }else if(error.response.data.status == 500){
            alert(error.response.data.message);
        }else if(error.response.data.status == 404){
          alert(error.response.data.message);
      }
    })
    };

  return (
    <>
        <h2 className="text-4xl py-2">Visualizar Usuário #{user.id}</h2>
        <table className="table-auto">
            <tbody>
                <tr>
                    <td className="text-1xl px-3">Id:</td>
                    <td className="text-1x1 px-3 ">{user.id}</td>
                </tr>
                <tr className="bg-blue-200">
                    <td className="text-1x1 px-3">Nome:</td>
                    <td className="text-1x1 px-3 ">{user.nome}</td>
                </tr>
                <tr >
                    <td className="text-1x1 px-3">Data de Dascimento:</td>
                    <td className="text-1x1 px-3 ">{user.dataNascimento !== undefined ? user.dataNascimento.toString().split('-').reverse().join('/') : user.dataNascimento }</td>
                </tr>
                <tr className="bg-blue-200">
                    <td className="text-1x1 px-3">Sexo:</td>
                    <td className="text-1x1 px-3 bg-blue-200">{user.sexo}</td>
                </tr>
                <tr >
                    <td className="text-1x1 px-3">CPF:</td>
                    <td className="text-1x1 px-3 ">{user.cpf}</td>
                </tr>
                <tr className="bg-blue-200">
                    <td className="text-1x1 px-3">Cargo:</td>
                    <td className="text-1x1 px-3 bg-blue-200">{user.cargoNome}</td>
                </tr>
                <tr >
                    <td className="text-1x1 px-3">Perfis do Usuário:</td>
                    <td className="text-1x1 px-3 ">
                        <table className="table-auto">
                            <tbody>
                                {user.perfis?.map((p) => {
                                    return(
                                        <tr key={p.id}>
                                            <td className="text-1x1 px-3 ">{p.nome}</td>
                                        </tr> 
                                    )
                                })}
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        
        <div className="py-3">
            <Link href={{ pathname: "/usuarios"}}>
                <button type="button" className="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-700 hover:bg-purple-900 text-white font-normal py-2 px-4 mr-1 rounded">Voltar para lista</button>
            </Link>
            <Link href={{ pathname: "/usuarios/[id]/editar", query: { id: user.id }}}>
                <button type="button" className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-purple-700 hover:bg-purple-700 text-purple-700 hover:text-white font-normal py-2 px-4 rounded">Editar Usuaário</button>
            </Link>
        </div>
    </>
  )
}

detailUser.getInitialProps = async (ctx) => {
    const id = ctx.query.id;
    return { id: id };
}

export default detailUser

