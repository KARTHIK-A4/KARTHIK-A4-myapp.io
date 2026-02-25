const ServiceRequest = require('../models/ServiceRequest');
const User = require('../models/user');

const createRequest = async (req, res) => {
    try {
        const { serviceType, description, customerId, customerName } = req.body;

        let attachments = [];
        if (req.files && req.files.length > 0) {
            attachments = req.files.map(file => file.path);
        }

        const newRequest = await ServiceRequest.create({
            customer: customerId,
            serviceType,
            description,
            attachments,
            messages: [{
                sender: customerId,
                name: customerName,
                text: description
            }]
        });

        res.json(newRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create request' });
    }
};

const getRequests = async (req, res) => {
    try {
        const { role, id } = req.query;
        let requests;
        if (role === 'admin' || role === 'provider') {
            requests = await ServiceRequest.find().populate('customer', 'name email').sort({ createdAt: -1 });
        } else {
            requests = await ServiceRequest.find({ customer: id }).sort({ createdAt: -1 });
        }

        res.json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch requests' });
    }
};

const updateRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedRequest = await ServiceRequest.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        res.json(updatedRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update status' });
    }
};

const addMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { senderId, senderName, text } = req.body;

        const updatedRequest = await ServiceRequest.findByIdAndUpdate(
            id,
            {
                $push: {
                    messages: {
                        sender: senderId,
                        name: senderName,
                        text
                    }
                }
            },
            { new: true }
        );

        res.json(updatedRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add message' });
    }
};

const submitRating = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, feedback } = req.body;

        const updatedRequest = await ServiceRequest.findByIdAndUpdate(
            id,
            { rating, feedback },
            { new: true }
        );

        res.json(updatedRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to submit rating' });
    }
};

module.exports = {
    createRequest,
    getRequests,
    updateRequestStatus,
    addMessage,
    submitRating
};
