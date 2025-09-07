import React, { useState } from 'react';

const UploadReceipt = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setUploadStatus('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://3.141.148.137/upload_receipt', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                setUploadStatus('File uploaded successfully!');
            } else {
                setUploadStatus(`Upload failed: ${result.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setUploadStatus('An error occurred during upload.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Upload Receipt</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="file">Choose a file:</label>
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        accept="image/*,application/pdf"
                    />
                </div>
                <button type="submit" style={{ marginTop: '10px' }}>
                    Upload
                </button>
            </form>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default UploadReceipt;
