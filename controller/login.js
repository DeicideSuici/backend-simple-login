import bcypt from 'bcrypt'
import { queryExecute } from "../database/MyConnection.js";
import { createToken } from "../helpers/jwt.js";

export const login = async (request, response) => {
    const { email, password } = request.body;

    if(!email || !password)
        return response.status(404).json({
            status: 'error',
            status_info: 'data_not_found',
            info: 'Data Request Not Found!'
        });

    const query = `SELECT * FROM vw_users WHERE email = '${email}'`;
    let data;

    try{
        [ data ] = await queryExecute(query, []);
    }catch(error){
        return response.status(500).json({
            status: 'error',
            status_info: 'server_error',
            info: 'Server Error!'
        });
    }

    if(!data)
        return response.status(404).json({
            status: 'error',
            status_info: 'user_not_found',
            info: 'User Not Found!'
        });

    let passwordResult = bcypt.compareSync(password, data.password);

    if(!passwordResult){
        return response.status(400).json({
            status: 'error',
            status_info: 'password_not_valid',
            info: 'Password not valid'
        });
    }

    const token = createToken(data);

    return response.status(200).json({
        status: 'success',
        info: 'User And Password Valid!',
        user_info: {
            username: data.username,
            email: data.email,
            cellphone: data.cellphone,
            profile: data.profile,
            token: token
        }
    });
}

export const register = async (request, response) => {
    const { username, email, cellphone, password, profile_id} = request.body;

    if(!username || !email || !cellphone || !password || !profile_id)
        return response.status(404).json({
            status: 'error',
            status_info: 'data_not_found',
            info: 'Data Request Not Found!'
        });

    const queryCheck = `SELECT * FROM users WHERE email = '${email}'`;

    let dataCheck;

    try{
        [ dataCheck ] = await queryExecute(queryCheck, []);
    }catch(error){
        return response.status(500).json({
            status: 'error',
            status_info: 'server_error',
            info: 'Server Error!'
        });
    }

    if(dataCheck)
        return response.status(400).json({
            status: 'error',
            status_info: 'email_exist',
            info: 'Email Registered!'
        });

    const hashPassword = await bcypt.hashSync(password, 10);

    const query = `INSERT INTO users(username, email, cellphone, password, profile_id) VALUES('${username}', '${email}', '${cellphone}', '${hashPassword}', ${profile_id})`;
    
    try{
        queryExecute(query);
    }catch(error){
        return response.status(500).json({
            status: 'error',
            status_info: 'server_error',
            info: 'Server Error!'
        });
    }

    return response.status(200).json({
        status: 'success',
        info: 'New User Added To Database!'
    });
}