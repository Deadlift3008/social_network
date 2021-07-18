async function logout(req, res) {
    req.logout();
    res.status(200);
    res.json({ status: 'ok' });
}

module.exports = {
    logout
}