const logoutUserService = (req, res) => {
    try {
        // Clear the JWT cookie
        res.clearCookie('authToken', { httpOnly: true, secure: true });

        res.clearCookie('userType', { httpOnly: true, secure: true});

        return res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        console.error('Error in logoutUserService:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    logoutUserService
};
