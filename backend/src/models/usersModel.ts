import knex from '../database/connection';

class usersModel {

    myUser(login){
        return knex('fc_users').select('*').where('user',login).first();
    }
}

export default usersModel;