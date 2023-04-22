import { createPool } from "mysql"

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'simple_login'
});

export const queryExecute = (query, values) => {
    return new Promise((resolve, reject) => {
        pool.query(query, values, (error, result) => {
            if (error)
                return reject(error);
            return resolve(result);
        });
    });
};