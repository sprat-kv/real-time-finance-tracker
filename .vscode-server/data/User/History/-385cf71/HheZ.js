import React, { useState } from 'react';

const UploadReceipt = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setMessage(''); // Clear previous messages
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        setIsUploading(true); // Set uploading state

        try {
            const response = await fetch('http://3.141.148.137/api/upload_receipt', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(`Success: ${result.message}`);
            } else {
                setMessage(`Error: ${result.error || 'An unknown error occurred.'}`);
            }
        } catch (error) {
            console.error('Upload Error:', error);
            setMessage('An error occurred while uploading the file. Please try again.');
        } finally {
            setIsUploading(false); // Reset uploading state
        }
    };

    return (
        <div>
            <h1>Upload Receipt</h1>
            <form onSubmit={handleUpload}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,application/pdf" // Optional: restrict file types
                />
                <button type="submit" disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadReceipt;
