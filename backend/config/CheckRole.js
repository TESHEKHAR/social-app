const checkRole = (roles) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(403).send('Access denied.');

        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) return res.status(403).send('Invalid token.');

            if (roles.includes(decoded.role)) {
                req.user = decoded;
                next();
            } else {
                return res.status(403).send('Access denied. Insufficient permissions.');
            }
        });
    };
};

module.exports = { checkRole };
