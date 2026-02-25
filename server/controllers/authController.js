const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working');
}


// Register Endpoint
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // Check if name was entered
        if (!name) {
            return res.json({
                error: 'name is required'
            });
        }
        // check is pawword is good
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            });
        }
        //check email
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                error: 'Email is taken already'
            });
        }

        const hashedPassword = await hashPassword(password);

        // Determine user role
        let userRole = role && ['customer', 'provider'].includes(role.toLowerCase()) ? role.toLowerCase() : 'customer';

        // Check if this is the admin email
        if (email === 'karthik321@gmail.com') {
            userRole = 'admin';
        }

        //Create user in database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: userRole
        });

        return res.json(user);
    } catch (error) {
        console.log(error);
    }
}

//Login Endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: 'No user found'
            });
        }

        //check if password matches
        const match = await comparePassword(password, user.password);
        if (match) {
            jwt.sign({ email: user.email, id: user._id, name: user.name, role: user.role }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user);
            });
        }
        if (!match) {
            res.json({
                error: 'password do not match'
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const getprofile = (req, res) => {
    const { token } = req.cookies;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) {
                return res.status(401).json({ error: "Invalid token" });
            }
            res.json(user);
        });
    } else {
        res.json(null);
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getprofile,
    logoutUser
}