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
                setMessage(result.message);
            } else {
                setMessage(result.error || 'An error occurred during upload.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred during upload.');
        }
    };

    return (
        <div>
            <h1>Upload Receipt</h1>
            <form onSubmit={handleUpload}>
                <div>
                    <label>User ID:</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={handleUserIdChange}
                        placeholder="Enter User ID"
                    />
                </div>
                <div>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadReceipt;
