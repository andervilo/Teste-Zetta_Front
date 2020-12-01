import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../components/nav';
import '../shared/variables';
import { API_URL } from '../shared/variables';
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
                            <Link href={`/${user.id}/view`}>
                              <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                            </Link>
                            <Link href={`/${user.id}/view`}>
                              <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
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
