import { useDropzone } from 'react-dropzone';
import React, { useEffect } from 'react';
import styles from './FileDropzone.module.scss';

type FileDropzoneProps = {
    onFileSelect: (file: File) => void;
    selectedFile?: File;
};

export const FileDropzone: React.FC<FileDropzoneProps> = ({ onFileSelect, selectedFile }) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                onFileSelect(file);
            }
        },
    });

    useEffect(() => {
        if (!selectedFile) {
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    return (
        <div>
            <div className={styles.dropzone} {...getRootProps()}>
                <input {...getInputProps()} />
                <p>
                    {selectedFile ? 'Файл выбран. Можешь заменить, перетащив новый.' : 'Перетащи файл или кликни, чтобы выбрать изображение'}
                </p>
            </div>
        </div>
    );
};
