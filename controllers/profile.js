const handleProfileGet = (db) => (req, res) => {
    const { id } = req.params;
    db.select('*')
    .from('users')
    .where({ id })
    .then(users => {
        if (users && users.length > 0) {
            res.json(users[0]);
        } else {
            res.status(400).json('not found');
        }
    })
    .catch(err => {
        console.error(err);
        res.status(404).json('error getting user');
    });
}

module.exports = { handleProfileGet };