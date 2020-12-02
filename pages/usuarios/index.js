import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../shared/variables';
import Link from 'next/link';

const usuarios = () => {
  const [users, setUsers] = useState([]);
  const url = `${API_URL}/usuarios`;

  useEffect(() => {
    return getUsers();
  }, []);


  const getUsers = async () => {
    await axios.get(url).then(res => {
      setUsers(res.data.content);
    }
    );
  };

  const deleteUser = async (id) =>{
    const excluir = confirm(`Deseja excluir o Registro #${id}?`);

    if(!excluir)
      return;
    
    await axios.delete(`${url}/${id}`).then(res => {
      alert("Registro excluido!");
      getUsers();
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
    });
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <h2 className="text-4xl">Usuários</h2>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CPF
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cargo
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    users.map((user) => {
                      return (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.nome}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.cpf}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm text-gray-900">{user.cargoNome}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link href={{ pathname: "/usuarios/[id]/view", query: { id: user.id } }}>
                              <a className="text-indigo-600 hover:text-indigo-900">Visualizar </a>
                            </Link>|
                            <Link href={{ pathname: "/usuarios/[id]/editar", query: { id: user.id } }}>
                              <a href="#" className="text-indigo-600 hover:text-indigo-900"> Editar </a>
                            </Link>|
                            <Link href="#" >
                              <a onClick={() => deleteUser(user.id)} className="text-red-600 hover:text-indigo-900"> Excluir</a>
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  }



                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default usuarios
