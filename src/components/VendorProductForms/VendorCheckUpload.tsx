import React, { ChangeEvent, useState } from 'react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB, adjust as needed

const CheckUpload: React.FC = () => {
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const uploadFile = async (file: File, folderName: string): Promise<string | null> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folderName", folderName);

        try {
            const response = await fetch("/api/upload-file", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(data)}`);
            }

            if (data.success && data.location) {
                console.log("Uploaded file location:", data.location);
                return data.location;
            } else {
                throw new Error(JSON.stringify(data));
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                setUploadStatus("File is too large. Maximum size is 5MB.");
                return;
            }

            setIsUploading(true);
            setUploadStatus('Uploading...');

            try {
                const data = await uploadFile(file, "attachments");
                setUploadStatus(`File uploaded successfully: ${data}`);
            } catch (error) {
                setUploadStatus(`Error during file upload: ${error instanceof Error ? error.message : String(error)}`);
            } finally {
                setIsUploading(false);
            }
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={handleFileChange}
                accept="*/*"
                disabled={isUploading}
            />
            <p>{uploadStatus}</p>
        </div>
    );
};

export default CheckUpload;