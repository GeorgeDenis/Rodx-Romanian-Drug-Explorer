module.exports = fn => {
    return (req, res) => {
        return fn(req, res).catch(err => {
            res.statusCode = err.statusCode || 500;
            res.end(JSON.stringify({
                message: err.message
            }));
        });
    }
}