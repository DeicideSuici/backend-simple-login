import moment from 'moment';
import encode from 'jwt-simple';

const secretKey = 'Mahiro&2023';

export const createToken = (data) => {
    const payload = {
        username: data.username,
        email: data.email,
        cellphone: data.cellphone,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    }
    
    return encode.encode(payload, secretKey);
}