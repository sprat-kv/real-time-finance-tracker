import React, { useState } from 'react';

const UploadReceipt = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUserIdChange = (event) => {
        setUserId(event.target.value);
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if (!userId) {
            setMessage('Please provide a User ID.');
            return;
        }

        if (!selectedFile) {
            setMessage('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('user_id', userId);

        try {
            const response = await fetch('http://3.141.148.137/api/upload_receipt', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(result.message || 'Receipt uploaded successfully!');
            } else {
                setMessage(result.error || 'An error occurred during upload.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred during upload.');
        }
    };

    return (
        <div
            style={{
                fontFamily: 'Arial, sans-serif',
                maxWidth: '400px',
                margin: '50px auto',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                fontSize:'12px'
            }}
        >
            <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
                Upload Receipt
            </h1>
            <form
                onSubmit={handleUpload}
                style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
            >
                <div>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '5px',
                            fontWeight: 'bold',
                            color: '#555',
                        }}
                    >
                        User ID:
                    </label>
                    <input
                        type="text"
                        value={userId}
                        onChange={handleUserIdChange}
                        placeholder="Enter User ID"
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />
                </div>
                <div>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '5px',
                            fontWeight: 'bold',
                            color: '#555',
                        }}
                    >
                        Receipt File:
                    </label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        borderRadius: '5px',
                        border: 'none',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#007BFF')}
                >
                    Upload
                </button>
            </form>
            {message && (
                <p
                    style={{
                        marginTop: '20px',
                        textAlign: 'center',
                        color: message.includes('successfully') ? 'green' : 'red',
                        fontWeight: 'bold',
                    }}
                >
                    {message}
                </p>
            )}
        </div>
    );
};

export default UploadReceipt;
