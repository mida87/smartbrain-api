const saltRounds = 10;

const handleRegister = (db, bcrypt) => (req, res) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }

    const hash = bcrypt.hashSync(password, saltRounds);
    
    db.transaction(trx => {
        trx.insert({hash, email})
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,        
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => {
        console.error(err);
        return res.status(400).json('unable to register');
    });
}

module.exports = { handleRegister };