import s from './NFTForm.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone'
import { Form } from '../Form';
import { createNft } from '@/api/createNft';
import { toast } from 'react-toastify';
import { usersStore } from '@/stores/usersStore';
import { observer } from "mobx-react";

type TNftFormFields = {
    name: string;
    collection: string;
    category: string;
    description?: string;
    royaltyPercentage?: number;
};

interface NFTFromProps {
    ownerId: string;
}

export const NFTForm: React.FC<NFTFromProps> = observer(({ ownerId }) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setFile(file);

        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
        maxFiles: 1
    });

    const handleFormSubmit = async (data: TNftFormFields) => {
        if (!file) {
            alert('Please upload an image');
            return;
        }

        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            console.log(key)
            if (value !== undefined) {
                formData.append(key, String(value).toLowerCase());
            };
        });
        formData.append('ownerId', ownerId);
        formData.append('file', file);

        await toast.promise(createNft(formData), { pending: "NFT создается...", success: 'NFT успешно создан!', error: 'Что-то пошло не так' })
    };

    const removeImage = useCallback((e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setFile(null);
        setPreview(null);
    }, []);

    const fields: Array<TField> = [
        {
            id: 1,
            label: 'Name *',
            name: 'name',
            type: 'text',
            rules: { required: 'Name is required' }
        },
        {
            id: 2,
            label: 'Collection *',
            name: 'collection',
            type: 'text',
            rules: { required: 'Collection is required' }
        },
        {
            id: 3,
            label: 'Category *',
            name: 'category',
            type: 'text',
            rules: { required: 'Category is required' }
        },
        {
            id: 4,
            label: 'Royalty Percentage *',
            name: 'royaltyPercentage',
            type: 'number',
            rules: { min: { value: 0, message: 'Min 0%' }, max: { value: 100, message: 'Max 100%' }, required: 'Royalty is required' }
        },
        {
            id: 5,
            label: 'Description',
            name: 'description',
            type: 'text'
        },
    ];

    return (
        <div className={s.nftForm}>
            <div
                {...getRootProps()}
                className={`${s.dropzone} ${preview ? s.hasPreview : ''}`}
            >
                <input {...getInputProps()} />
                {preview ? (
                    <>
                        <img src={preview} alt="NFT preview" className={s.preview} />
                        <button
                            type="button"
                            onClick={removeImage}
                            className={s.removeButton}
                            aria-label="Remove image"
                        >
                            &times;
                        </button>
                    </>
                ) : (
                    <div className={s.dropzoneContent}>
                        <p>Drag & drop image here</p>
                        <p className={s.smallText}>Supports: JPG, PNG, WEBP</p>
                    </div>
                )}
            </div>
            <Form
                labelTheme='var(--color-theme-dark)'
                fields={fields}
                btnText={'Create NFT'}
                btnType='submit'
                onSubmit={handleFormSubmit}
            />
        </div>
    )
});