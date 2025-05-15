/* eslint-disable @typescript-eslint/no-explicit-any */
import Select, { StylesConfig } from 'react-select';
import { ControllerRenderProps } from 'react-hook-form';

type OptionType = { value: string; label: string };

type CustomSelectProps = {
    label?: string;
    error?: string;
    placeholder?: string;
    options: OptionType[];
    field: ControllerRenderProps<any, any>;
};

const customStyles: StylesConfig<OptionType> = {
    input: (base) => ({
        ...base,
        color: 'var(--color-white)'
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'rgba(255, 255, 255, 0.7)',
        paddingLeft: 5,
    }),
    control: (base, state) => ({
        ...base,
        backgroundColor: 'transparent',
        border: '2px solid rgba(87, 87, 87, 0.442)',
        borderRadius: '3px',
        padding: '2px 4px',
        color: '#fff',
        marginBottom: 10,
        boxShadow: state.isFocused
            ? '0 0 0 3px rgba(87, 87, 87, 0.217)'
            : 'none',
        borderColor: state.isFocused
            ? 'rgba(87, 87, 87, 0.564)'
            : 'rgba(87, 87, 87, 0.442)',
        '&:hover': {
            borderColor: 'rgba(87, 87, 87, 0.442)', // оставляем тот же цвет при ховере
        },
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: 'var(--color-navy-light)',
        borderRadius: '8px',
        maxHeight: 220,
        overflow: 'hidden',
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? 'var(--color-blue-gray)' : 'var(--color-blue-light)',
        color: '#fff',
        cursor: 'pointer',
    }),
    singleValue: (base) => ({
        ...base,
        color: '#fff',
    }),
};

export const CustomSelect: React.FC<CustomSelectProps> = ({ label, error, options, field, placeholder }): React.JSX.Element => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {label && <label style={{ color: '#fff' }}>{label}</label>}
            <Select
                placeholder={placeholder ? placeholder : ""}
                styles={customStyles}
                options={options}
                value={options.find(opt => opt.value === field.value) || null}
                onChange={(selected) => field.onChange((selected as OptionType)?.value)}
                onBlur={field.onBlur}
                name={field.name}
            />
            {error && <span style={{ color: 'red' }}>{error}</span>}
        </div>
    );
};
