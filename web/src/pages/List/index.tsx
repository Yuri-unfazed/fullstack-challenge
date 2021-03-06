import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './style.css';
import api from '../../services/api';
import Pageheader from '../../assets/components/PageHeader';

import edit from '../../assets/images/pencil-striped-symbol-for-interface-edit-buttons_icon-icons.com_56782.svg';
import del from '../../assets/images/delete_remove_bin_icon-icons.com_72400.svg';

interface Item {
    id: number,
    name: string,
    initial_value: number,
    responsible: string,
    used: number,
    start_date: string,
    end_date: string
}


const List = () => {
    const date = new Date();
    
    const [items, setItems] = useState<Item[]>([]);

    const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    useEffect(() => {
        api.get('auctions', config).then(response => {
            setItems(response.data.auctions);
        });
    }, []);

    return (
        <div id='page-history' className='container'>
            <Pageheader title='Menu' />

            <table className='list-table'>
                <thead className='thead-table'>
                    <td>Nome</td>
                    <td>Valor Inicial</td>
                    <td>Usado ?</td>
                    <td>Resp.</td>
                    <td>Leilão ativo ?</td>
                    <td>#</td>
                </thead>
                <tbody className='tbody-table'>
                    {items.map(item => (
                        <tr key={item.id} onClick={() => { }} className='table-control'>
                            <td>{item.name}</td>
                            <td>R$: {item.initial_value}</td>
                            <td>{item.used == 0 ? 'Não' : 'Sim'}</td>
                            <td>{item.responsible}</td>
                            <td>{new Date(item.end_date) >= new Date()?"sim":"Não"}</td>
                            <td>
                                <Link to={`/edit/${item.id}`} className='password button-control'>
                                    <img src={edit} alt='editar' className='edit-button' />
                                </Link>
                                <Link to={`/delete/${item.id}`} className='password button-control'>
                                    <img src={del} alt='deletar' className='delete-button' />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}

export default List;