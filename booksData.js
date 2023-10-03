const Pool = require('pg').Pool
const pool = new Pool({
    user:'dev',
    host:'localhost',
    database:'liberatti',
    password:'root',
    port:5432
})

