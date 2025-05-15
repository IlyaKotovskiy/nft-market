import s from './Form.module.scss';
import { Button } from '../Button';
import { FieldError, FieldValues, RegisterOptions, useForm } from 'react-hook-form';

type TField = {
    id: number;
    label: string;
    name: string;
    value?: string;
    rules?: RegisterOptions<FieldValues, string>;
    type: string;
}

interface IFormProps {
    labelTheme: string;
    fields: Array<TField>;
    btnText: string;
    btnType: "button" | "reset" | "submit";
    onSubmit: (data: FieldValues) => void;
    defaultValues?: {};
}

export const Form: React.FC<IFormProps> = ({ labelTheme, fields, btnText, btnType, onSubmit, defaultValues }): React.JSX.Element => {
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map(field => (
                <div key={field.id} className={s.inputWrapper}>
                    <input
                        {...register(field.name, field.rules)}
                        type={field.type}
                        placeholder=' '
                        className={s.input}
                    />
                    <label className={`${s.label}`} style={{ backgroundColor: labelTheme }}>{field.label}</label>
                    {errors[field.name] && (
                        <p className='error-field'>{(errors[field.name] as FieldError)?.message}</p>
                    )}
                </div>
            ))}
            <Button title={btnText} theme='yellow' size='small' type={btnType} />
        </form>
    )
};