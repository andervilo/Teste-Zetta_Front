import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../shared/variables';
import Link from 'next/link';

const perfisUsuario = () => {
  const [perfis, setPerfis] = useState([]);
  const url = `${API_URL}/perfis-usuarios`;

  useEffect(() => {
    return getPerfis();
  }, []);


  const getPerfis = async () => {
    await axios.get(url).then(res => {
      setPerfis(res.data.content);
    }
    );
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <h2 className="text-4xl">Perfis de Usuário</h2>
            <Link href={{ pathname: "/perfis/novo"}}>
                <button type="button" className="btn-outline-success transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-purple-700 hover:bg-purple-700 text-purple-700 hover:text-white font-normal py-2 px-4 rounded">Adicionar Perfil</button>
            </Link>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome Perfil
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    perfis.map((perfil) => {
                      return (
                        <tr key={perfil.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{perfil.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{perfil.nome}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link href={{ pathname: "/perfis/[id]/view", query: { id: perfil.id } }}>
                              <a className="text-indigo-600 hover:text-indigo-900">Visualizar </a>
                            </Link>|
                            <Link href={{ pathname: "/perfis/[id]/editar", query: { id: perfil.id } }}>
                              <a href="#" className="text-indigo-600 hover:text-indigo-900"> Editar</a>
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

export default perfisUsuario
