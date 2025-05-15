import s from './CreateNFTPage.module.scss';
import { Container } from '@/components/Container';
import { withRoleCheck } from '@/HOCs/withRoleCheck';
import { PiImage } from "react-icons/pi";
import { Button } from '@/components/UI/Button';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Input } from '@/components/UI/Input';
import { CustomSelect } from '@/components/UI/Select';
import { FileDropzone } from '@/components/UI/FileDropzone';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { nftStore } from '@/stores/nftStore';
import { usersStore } from '@/stores/usersStore';
import { createNft } from '@/api/createNft';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' },
    },
};

enum ECategory {
    SOLANA_NFTS = "solana-nfts",
    ART = "art",
    COLLECTIBLES = "collectibles",
    DOMAIN_NAME = "domain-name",
    MUSIC = "music",
    PHOTOGRAPHY = "photo",
    SPORTS = "sports",
    TRADING_CARDS = "trading-cards",
    UTILITY = "utility",
};

type FormData = {
    name: string;
    collection: string;
    category: string;
    royaltyPercentage: number;
    description?: string;
};

const CreateNFTContent: React.FC = (): React.JSX.Element => {
    const navigate = useNavigate();
    const { collectionsCurUserNFTs: collections } = usersStore;
    const { nfts } = nftStore;

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [step, setStep] = useState<number>(1);
    const [visitedSteps, setVisitedSteps] = useState<Record<number, boolean>>({});
    const [iHaveCollections, setIHaveCollections] = useState<boolean>(false);
    const totalSteps = 3;

    const { control, handleSubmit, getValues, setValue, reset, trigger, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            name: '',
            collection: '',
            category: '',
            royaltyPercentage: null,
            description: '',
        }
    });

    const getFirstError = (): string | null => {
        if (fileError) return fileError;

        const fields = ['collection', 'name', 'category', 'royaltyPercentage', 'description'] as const;
        for (const field of fields) {
            if (errors[field]?.message) {
                return errors[field]?.message as string;
            }
        }
        return null;
    };

    const firstError = getFirstError();

    const handleValidateNextStep = async (fields: Array<keyof FormData>, nextStep: number): Promise<void> => {
        const valid = await trigger(fields);
        if (valid) setStep(nextStep);
    }

    const onSubmit = async (data: FormData) => {
        try {
            if (!selectedFile) {
                toast.error("Пожалуйста, добавьте файл для NFT.");
                return;
            }

            setFileError(null);

            const formData = new FormData();
            formData.append('file', selectedFile);

            const dataFields = {
                ownerId: String(usersStore.curUser.id),
                description: data.description || '',
                ...data,
            };
            Object.entries(dataFields).forEach(([key, value]) => {
                formData.append(key, String(value))
            });

            await toast.promise(createNft(formData), {
                pending: 'NFT создается...',
                success: 'NFT успешно создано!',
                error: 'Что-то пошло не так :('
            });

            reset();
            setSelectedFile(null);
            setPreview(null);
            setIHaveCollections(false);
            setStep(1);
        } catch (error) {
            toast.error("Произошла ошибка при создании NFT.", error);
        }
    };

    useEffect(() => {
        if (!nfts.length) {
            nftStore.fetchNfts();
        }
    }, []);

    useEffect(() => {
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreview(null);
        }
    }, [selectedFile]);

    useEffect(() => {
        setVisitedSteps((prev) => ({
            ...prev,
            [step]: true,
        }));
    }, [step]);

    return (
        <section>
            <Container>
                <motion.div
                    className={s.wrapper}
                    initial={{
                        width: '50%'
                    }}
                    animate={{
                        width: step === 1 ? '50%' : '100%',
                        margin: step === 1 ? '0 auto' : '0',
                        display: step === 1 ? 'flex' : 'grid',
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <form className={s.form} onSubmit={handleSubmit(onSubmit)} style={step === 1 ? { width: '100%', display: 'flex' } : undefined}>
                        {step === 1 && (
                            <>
                                <div className={s.formContent}>
                                    <h2 className={s.subTitle}>{!iHaveCollections ? 'Создать новую коллекцию NFT' : 'Использовать существующую коллекцию'}</h2>
                                    <Controller
                                        name="collection"
                                        control={control}
                                        rules={{
                                            required: "Коллекция обязательна"
                                        }}
                                        render={({ field, fieldState }) => (
                                            !iHaveCollections
                                                ? <Input label='Новая коллекция' error={fieldState.error?.message} {...field} />
                                                : <CustomSelect
                                                    label='Коллекция'
                                                    placeholder='Выберите коллекцию *'
                                                    options={collections.map(collection => ({
                                                        value: collection,
                                                        label: collection
                                                    }))}
                                                    field={field}
                                                    error={fieldState.error?.message}
                                                />
                                        )}
                                    />
                                    <Button title={iHaveCollections ? 'Создать коллекцию' : 'Выбрать свою коллекцию'} size='large' theme='yellow-secondary' onClick={() => setIHaveCollections(!iHaveCollections)} />
                                </div>
                                <div className={s.formFooter}>
                                    {firstError && <p className={s.globalError}>{firstError}</p>}
                                    <div className={s.btns}>
                                        <Button theme="yellow-secondary" size="large" title="Назад" onClick={() => navigate(-1)} />
                                        <Button theme='yellow' size='large' title='Далее' onClick={() => handleValidateNextStep(['collection'], 2)} />
                                    </div>
                                    <p className={s.steps}>Шаг {step} из {totalSteps}</p>
                                </div>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <motion.div
                                    className={s.formContent}
                                    initial={visitedSteps[2] ? false : "hidden"}
                                    animate={visitedSteps[2] ? false : "visible"}
                                    variants={{
                                        hidden: {},
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.12,
                                            },
                                        },
                                    }}
                                >
                                    <h2 className={s.subTitle}>Создать новую NFT</h2>

                                    <motion.div variants={fadeUp}>
                                        <FileDropzone selectedFile={selectedFile} onFileSelect={setSelectedFile} />
                                    </motion.div>

                                    <motion.div variants={fadeUp}>
                                        <Controller
                                            name="name"
                                            control={control}
                                            rules={{
                                                required: "Название обязательно",
                                            }}
                                            render={({ field, fieldState }) => <Input label="Name *" error={fieldState.error?.message} {...field} />}
                                        />
                                    </motion.div>

                                    <motion.div variants={fadeUp}>
                                        <Controller
                                            name="category"
                                            control={control}
                                            rules={{
                                                required: "Категория обязательна"
                                            }}
                                            render={({ field, fieldState }) => (
                                                <CustomSelect
                                                    options={Object.entries(ECategory).map(([key, value]) => ({
                                                        value,
                                                        label: key.replace(/_/g, ' ').toLowerCase(),
                                                    }))}
                                                    field={field}
                                                    error={fieldState.error?.message}
                                                    placeholder="Category *"
                                                />
                                            )}
                                        />
                                    </motion.div>

                                    <motion.div variants={fadeUp}>
                                        <Controller
                                            name="royaltyPercentage"
                                            control={control}
                                            rules={{
                                                required: 'Роялти обязательно',
                                                min: { value: 0, message: 'Минимум 0%' },
                                                max: { value: 100, message: 'Максимум 100%' }
                                            }}
                                            render={({ field, fieldState }) => <Input type='number' label="Royalty Percentage *" error={fieldState.error?.message} {...field} />}
                                        />
                                    </motion.div>

                                    <motion.div variants={fadeUp}>
                                        <Controller
                                            name="description"
                                            control={control}
                                            render={({ field, fieldState }) => <Input label="Description" error={fieldState.error?.message} {...field} />}
                                        />
                                    </motion.div>
                                </motion.div>

                                <motion.div
                                    className={s.formFooter}
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        hidden: {},
                                        visible: {
                                            transition: {
                                                delayChildren: 0.6,
                                                staggerChildren: 0.15,
                                            },
                                        },
                                    }}
                                >
                                    {firstError && <p className={s.globalError}>{firstError}</p>}
                                    <div className={s.btns}>
                                        <Button theme="yellow-secondary" size="large" title="Назад" onClick={() => setStep(1)} />
                                        <Button theme="yellow" size="large" title="Далее" onClick={() => handleValidateNextStep(['name', 'category', 'royaltyPercentage'], 3)} />
                                    </div>
                                    <p className={s.steps}>
                                        Шаг {step} из {totalSteps}
                                    </p>
                                </motion.div>
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <div className={s.formContent}>
                                    <h2 className={s.subTitle}>Предпросмотр перед созданием NFT</h2>
                                    <div className={s.previewInfoWrap}>
                                        <div className={s.row}><strong>Коллекция:</strong><p>{getValues('collection') || '—'}</p></div>
                                        <div className={s.row}><strong>Название NFT:</strong><p>{getValues('name') || '—'}</p></div>
                                        <div className={s.row}><strong>Категория:</strong><p>{getValues('category') || '—'}</p></div>
                                        <div className={s.row}><strong>Роялти (%):</strong><p>{getValues('royaltyPercentage') || '—'}</p></div>
                                        <div className={s.row}><strong>Описание:</strong><p>{getValues('description') || '—'}</p></div>
                                    </div>
                                </div>
                                <div className={s.formFooter}>
                                    <div className={s.btns}>
                                        <Button theme="yellow-secondary" size="large" title="Назад" onClick={() => setStep(2)} />
                                        <Button theme="yellow" size="large" title="Создать" type="submit" />
                                    </div>
                                    <p className={s.steps}>Шаг {step} из {totalSteps}</p>
                                </div>
                            </>
                        )}
                    </form>
                    {step > 1 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={visitedSteps[2] ? { duration: 0.3 } : { delay: 0.3, duration: 0.3 }}
                        >
                            {preview ? (
                                <div className={s.preview} style={{ backgroundImage: `url(${preview})` }} />
                            ) : (
                                <div className={s.nulPreview}>
                                    <PiImage />
                                    <p>Нету загруженного медиа файла</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </Container>
        </section>
    )
};

export const CreateNFTPage = withRoleCheck(['admin'], CreateNFTContent);