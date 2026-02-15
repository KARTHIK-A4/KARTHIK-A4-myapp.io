import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/usercontext';

export default function ServiceRequest() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        serviceType: '',
        description: '',
        customerName: user?.name,
        customerId: user?.id,
    });
    const [files, setFiles] = useState([]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('serviceType', formData.serviceType);
        data.append('description', formData.description);
        data.append('customerName', user.name);
        data.append('customerId', user.id);

        for (let i = 0; i < files.length; i++) {
            data.append('attachments', files[i]);
        }

        try {
            const response = await axios.post('/requests', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success('Service Request Submitted Successfully!');
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to submit request');
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Request a Service</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label>Service Type:</label>
                    <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    >
                        <option value="">Select a Service</option>
                        <option value="Laptop Repair">Laptop Repair</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Installation">Installation</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        style={{ width: '100%', padding: '0.5rem' }}
                    ></textarea>
                </div>

                <div>
                    <label>Attachments (Images, Videos, Docs):</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        accept="image/*,video/*,.pdf,.doc,.docx"
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '0.75rem',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Submit Request
                </button>
            </form>
        </div>
    );
}
