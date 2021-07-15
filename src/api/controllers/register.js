function validate(fields) {

}

async function register(req, res, next, model) {
    const { fields } = req.body;

    const validationError = validate(fields);

    if (validationError) {
        res.status(500).send({ error: validationError });
        return;
    }
}

module.exports = {
    register
}