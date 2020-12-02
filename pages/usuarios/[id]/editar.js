import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { API_URL } from '../../../shared/variables';
import Link from 'next/link'
import Router from 'next/router'

const editarUser = () => {
    const router = useRouter();
    const { id } = router.query;
    const [sexo, setSexo] = useState();
    const [cargos, setCargos] = useState([]);
    const [perfis, setPerfis] = useState([]);
    const [user, setUser] = useState({
        id: 0,
        nome: "",
        cpf: "",
        sexo: "",
        dataNascimento: "",
        cargoNome: 0,
        perfis: [
            {
                id: 0
            }
        ]
    });
    const [userUpdate,setUserUpdate] = useState({
        id: 0,
        nome: "",
        cpf: "",
        sexo: "",
        dataNascimento: "",
        cargoId: 0,
        perfis: [ ]
    })
    const [nome, setNome] = useState();
    
    const url = `${API_URL}/usuarios/${id}`;

    const urlCargos = `${API_URL}/cargos`;

    const urlPerfis = `${API_URL}/perfis-usuarios`;

    useEffect(() => {
        getUser();
        
    }, []);

    useEffect(() => {
        
        setUserUpdate(prevUser=>({...prevUser, id: user.id}))
        setUserUpdate(prevUser=>({...prevUser, nome: user.nome}))
        setUserUpdate(prevUser=>({...prevUser, dataNascimento: user.dataNascimento}))
        setUserUpdate(prevUser=>({...prevUser, cpf: user.cpf}))

        if(user.sexo !== "" && (userUpdate.sexo !== 'M' && userUpdate.sexo !== 'F')){
            console.log(user)
            setUserUpdate(prevUser=>({...prevUser, sexo: user.sexo === 'Masculino' ? 'M' : 'F' }))
        }
        
        if(cargos.length <= 0){
            getCargos();
        }

    }, [user]);

    

    useEffect(() => {
        setIdCargo(user.cargoNome);
    }, [cargos]);

    const setIdCargo = (descCargo) =>{
        cargos?.forEach(cargo => {
            if(cargo.nome === descCargo){
                setUserUpdate(prevUser=>({...prevUser, cargoId:cargo.id  }))
            }
        });
    }

    const getUser = async (id) => {        
        await axios.get(url).then(res => {
                setUser(res.data);
            }
        );
    };

    const getCargos = async () => {        
        await axios.get(urlCargos).then(res => {
                setCargos(res.data.content);
            }
        );
    };

    const getPerfis = async () => {        
        await axios.get(urlPerfis).then(res => {
                setPerfis(res.data.content);
            }
        );
    };

    const isNumber = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            setUser(prevUser=>({...prevUser, cpf: e.target.value}))
        }
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        console.log(userUpdate)
        
        await axios.put(url,{userUpdate}).then(res => {
            Router.push("/usuarios");
        }).catch(error =>{
            console.log(error.response)
            if ('fieldErrors' in error.response.data){
                alert(error.response.data.fieldErrors.nome);
            }
        });
    }
    return (
        <>
            <h2 className="text-4xl py-2">Editar Usuário #{user.id}</h2>
            <form onSubmit={handleSubmit}>
                <label className="block">
                    <span className="text-gray-700 font-bold">Nome Usuário</span>
                    <input type="text" className="form-input mt-1 block w-full" placeholder="Nome Usuário" 
                        value={user.nome}
                        onChange={e => setUser(prevUser=>({...prevUser, nome: e.target.value}))}/>
                </label>

                <label className="block">
                    <span className="text-gray-700 font-bold">Sexo</span>
                    <select value={userUpdate.sexo} onChange={e => setUserUpdate(prevUser=>({...prevUser, sexo: e.target.value}))} className="form-select block w-full mt-1">
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                    </select>
                </label>

                <label className="block">
                    <span className="text-gray-700 font-bold">Data de Nascimento</span>
                    <input type="date" className="form-input mt-1 block w-full" placeholder="Data de Nascimento" 
                        value={user.dataNascimento}
                        onChange={e => setUser(prevUser=>({...prevUser, dataNascimento: e.target.value}))}/>
                </label>

                <label className="block">
                    <span className="text-gray-700 font-bold">CPF</span>
                    <input type="texte" className="form-input mt-1 block w-full" 
                        placeholder="cpf" 
                        maxLength="11"
                        value={user.cpf} 
                        onChange={e => isNumber(e)}/>
                </label>

                <label className="block">
                    <span className="text-gray-700 font-bold">Cargo</span>
                    <select value={userUpdate?.cargoId} onChange={e => setUserUpdate(prevUser=>({...prevUser, cargoId: e.target.value}))} className="form-select block w-full mt-1">
                        {cargos?.map((c)=>{
                            return(
                                <option key={c.id} value={c.id}>{c.nome}</option>
                            )
                        })}
                    </select>
                </label>


                <div className="py-3">
                    <button type="submit" className="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-700 hover:bg-purple-900 text-white font-normal py-2 px-4 mr-1 rounded">Gravar</button>
                    <Link href={{ pathname: "/usuarios"}}>
                        <button type="button" className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-purple-700 hover:bg-purple-700 text-purple-700 hover:text-white font-normal py-2 px-4 rounded">Voltar para lista</button>
                    </Link>
                </div>
            </form>   
        </>
    )
}

editarUser.getInitialProps = async (ctx) => {
    const id = ctx.query.id;
    return { id: id };
}

export default editarUser
