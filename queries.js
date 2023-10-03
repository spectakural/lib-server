const Pool = require('pg').Pool
// const pool = new Pool({
//     user:'dev',
//     host:'localhost',
//     database:'liberatti',
//     password:'root',
//     port:5432
// })

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  })

const getUsers = (req, res) => {
    pool.query('select * from users order by userid', (error, results) => {
        if(error){
            throw error
        }
        else{
            res.status(200).json(results.rows)
        }
    })
}

const getUsersByEmail = (req, res) =>{
    const email = req.params.email
    pool.query('select * from users where email = $1',[email],(error,result) =>{
        if (error){
            throw error
        }
        else{
            res.status(200).json(result.rows)
        }
    })
}

const getUserCart = (req, res) =>{
    const email = req.params.email
    pool.query("select cart from users where email=$1",[email], (error,result)=>{
        if(error){
            throw error
        }
        else{
            res.status(200).json(result.rows)
        }
    })
}

const createUser = (req, res) =>{
    const {name, email, phno, subStatus, cart} = req.body
    // res.status(200).send(`name: ${name} \nemail: ${email}`)
    pool.query('insert into users(name, email, phno, substatus, cart) values($1,$2,$3,$4,$5)',[name,email,phno,subStatus,cart], (error, result) =>{
        if(error){
            throw error
        }
        else{
            res.status(201).send(`User created successfully with id:${result.insertId}`)
        }
    })
}

const updateUser = (req,res) => {
    const {name, email, phno, subStatus} = req.body

    pool.query('update users set name=$1, phno=$2, substatus=$3 where email = "$4"', [name,phno,subStatus,email], (error, result)=>{
        if(error){
            throw error
        }
        else{
            res.status(200).send(`updated successfuly at id:${id}`)
        }
    })
}

const updateUserCart = (req,res)=>{
    const {email, cart} = req.body
    pool.query('update users set cart=$1 where email=$2',[cart,email],(err,result)=>{
        if(err){
            throw error
        }else{
            res.status(200).send("cart updated successfully")
        }
    })
}

const deleteUser = (req,res) => {
    const {id} = req.body

    pool.query('delete from users where userid = $1',[id], (err,result) => {
        if(err){
            throw err
        }
        else{
            res.status(200).send(`user deleted at id: ${id}`)
        }
    })
}

const getBooks = (req,res) =>{
    pool.query('select * from books order by name asc',(err,result)=>{
        if(err){
            throw error
        }else{
            res.status(200).json(result.rows)
        }
    })
}

const getBooksById = (req,res) =>{
    const id = req.params.id
    pool.query('select * from books where bookid=$1',[id],(error, result)=>{
        if(error){
            throw error
        }else{
            res.status(200).json(result.rows)
        }
    })
}

const createBook = (req, res) =>{
    const {name, author, publisher, dateofrelease, availability, isbn} = req.body
    pool.query('insert into books(name, author, publisher, dateofrelease, availability, isbn) values($1,$2,$3,$4,$5,$6)',[name, author, publisher, dateofrelease, availability, isbn], (error, result) =>{
        if(error){
            throw error
        }
        else{
            res.status(201).send(`Book created successfully with id:${result.insertId}`)
        }
    })
}

const updateBookDetails = (req,res) => {
    const id = req.params.id
    const {name, author, publisher, dateofrelease, availability, isbn} = req.body

    pool.query('update books set name=$1, author=$2, publisher=$3, dateofrelease=$4, availability=$5, isbn=$6 where bookid = $7', [name, author, publisher, dateofrelease, availability, isbn, id], (error, result)=>{
        if(error){
            throw error
        }
        else{
            res.status(200).send(`Book updated successfuly at id:${id}`)
        }
    })
}

const updateBookAvl = (req,res) =>{
    const id = req.params.id
    const {availability} = req.body

    pool.query('update books set availability=$1 where bookid=$2',[availability,id],(err,result)=>{
        if (err){
            throw err
        }
        else{
            res.status(200).send(`Book availability updated at id:${id}`)
        }
    })
}

const deleteBook = (req,res) => {
    const id = req.params.id

    pool.query('delete from books where bookid = $1',[id], (err,result) => {
        if(err){
            throw err
        }
        else{
            res.status(200).send(`book deleted at id: ${id}`)
        }
    })
}

const rents = (req,res) =>{
    const {userId,bookId,dateofrent,dateofreturn} = req.body
    pool.query('insert into rent(userId,bookId,dateofrent,dateofreturn) values($1,$2,$3,$4,$5)',[userId,bookId,dateofrent,dateofreturn], (err,result)=>{
        if(err){
            throw err
        }
        else{
            res.status(201).send(`bookid:${bookId} rented to userId:${userId} at rentId:${result.insertId}`)
        }
    })
}

const getRentByUserId = (req,res) =>{
    const id = req.params.id
    pool.query('select * from rent where userId=$1',[id],(err,result)=>{
        if(err){
            throw err
        }else{
            res.status(200).json(result.rows)
        }
    })
}

const getRentByBookId = (req,res) =>{
    const id = req.params.id
    pool.query('select * from rent where bookId=$1',[id],(err,result)=>{
        if(err){
            throw err
        }else{
            res.status(200).json(result.rows)
        }
    })
}

const returnBook = (req,res) =>{            //update
    const {userId, bookId, returnedDate, fine} = req.body
    pool.query('update rent set returnedDate=$1, fine=$2 where userid=$3 and bookid=$4',[returnedDate,fine,userId,bookId], (err,result)=>{
        if(err){
            throw err
        }else{
            res.status(200).send(`bookId:${bookId} returned successfully by userId:${userId} on ${returnedDate} with fine of rs.${fine}`)
        }
    })
}

const createCart = (req,res)=>{
    const {userId} = req.body
    pool.query('insert into cart(userid) values($1)',[userId], (err,result)=>{
        if(err){
            throw err
        }else{
            res.status(200).send(`cart created for userID:${userId}`)
        }
    })
}

const addToCart = (req,res)=>{
    const {userId, bookId} = req.body
    pool.query('insert into cart_items(cartid, bookid) values((select cartid from cart where userid=$1),$2)',[userId, bookId], (err,result)=>{
        if(err){
            throw err
        }
        else{
            res.status(200).send(`bookId:${bookId} added into userId:${userId} cart`)
        }
    })
}


module.exports = {
    getUsers:getUsers,
    getUsersByEmail:getUsersByEmail,
    getUserCart:getUserCart,
    createUser:createUser,
    updateUser:updateUser,
    updateUserCart:updateUserCart,
    deleteUser:deleteUser,
    getBooks:getBooks,
    getBooksById:getBooksById,
    createBook:createBook,
    updateBookDetails:updateBookDetails,
    updateBookAvl:updateBookAvl,
    deleteBook:deleteBook,
    rents:rents,
    getRentByUserId:getRentByUserId,
    getRentByBookId:getRentByBookId,
    returnBook:returnBook,
    createCart:createCart,
    addToCart:addToCart
}