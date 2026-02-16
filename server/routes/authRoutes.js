const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getprofile, logoutUser } = require('../controllers/authController');
const {
    createRequest,
    getRequests,
    updateRequestStatus,
    addMessage,
    submitRating
} = require('../controllers/serviceController');

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    })
);

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', getprofile);

// Service Request Routes
const upload = require('../middleware/upload');
router.post('/requests', upload.array('attachments', 5), createRequest);
router.get('/requests', getRequests);
router.patch('/requests/:id/status', updateRequestStatus);
router.post('/requests/:id/messages', addMessage);
router.post('/requests/:id/rate', submitRating);


module.exports = router;