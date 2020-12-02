import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../shared/variables';
import Link from 'next/link';

const cargosUsuarios = () => {
  const [cargos, setCargos] = useState([]);
  const url = `${API_URL}/cargos`;

  useEffect(() => {
    return getCargos();
  }, []);


  const getCargos = async () => {
    await axios.get(url).then(res => {
      setCargos(res.data.content);
    }
    );
  };

  const deleteCargo = async (id) =>{
    const excluir = confirm(`Deseja excluir o Registro #${id}?`);

    if(!excluir)
      return;

    await axios.delete(`${url}/${id}`).then(res => {
      alert("Registro excluido!");
      getCargos();
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
            <h2 className="text-4xl">Cargos</h2>
            <Link href={{ pathname: "/cargos/novo"}}>
                <button type="button" className="btn-outline-success transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-purple-700 hover:bg-purple-700 text-purple-700 hover:text-white font-normal py-2 px-4 rounded">Adicionar Cargo</button>
            </Link>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome Cargo
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    cargos.map((cargo) => {
                      return (
                        <tr key={cargo.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{cargo.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{cargo.nome}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link href={{ pathname: "/cargos/[id]/view", query: { id: cargo.id } }}>
                              <a className="text-indigo-600 hover:text-indigo-900">Visualizar </a>
                            </Link>|
                            <Link href={{ pathname: "/cargos/[id]/editar", query: { id: cargo.id } }}>
                              <a className="text-indigo-600 hover:text-indigo-900"> Editar </a>
                            </Link>|
                            <Link href="#" >
                              <a onClick={() => deleteCargo(cargo.id)} className="text-red-600 hover:text-indigo-900"> Excluir</a>
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

export default cargosUsuarios
