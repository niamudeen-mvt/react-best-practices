import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import axiosInstance from '../utils/axios';

export default function GalleryPage() {
    const [files, setFiles] = useState([]);

    const filesChanged = (event) => {
        setFiles([...event.target.files]);
    };

    useQuery({
        queryKey: ['gallery'],
        queryFn: async () => {
            const response = await axiosInstance.get('/auth/files');
            return response?.data || [];
        },
    });

    const { mutate } = useMutation({
        mutationFn: (files) => {
            const formData = new FormData();
            formData.append('files', files[0]);
            const response = axiosInstance.post('/auth/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response;
        },
    });
    const handleUpload = async () => {
        mutate(files);
    };
    return (
        <>
            <section className="section">
                <div>
                    <div className="border border-dashed border-gray-400 p-10 rounded-lg">
                        <input
                            type="file"
                            onChange={filesChanged}
                            className="cursor-pointer"
                        />
                        <button onClick={handleUpload} className="btn">
                            Upload
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
