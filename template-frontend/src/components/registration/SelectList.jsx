import { useFormContext } from 'react-hook-form';

export default function SelectInput({ name, label, validationRules, items, ...rest }) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className='mb-3'>
      <label htmlFor={name} className='form-label'>
        {label}
      </label>
      <select
        id={name}
        {...register(name, validationRules)}
        className='form-select'
        {...rest}
      >
        <option value='' disabled>
          {`-- Selecteer een ${label} --`}
        </option>
        {items.map(({ id, name }) => (
          <option key={id} value={name}>
            {name}
          </option>
        ))}
      </select>
      {errors[name] && <p className='form-text text-danger'>{errors[name].message}</p>}
    </div>
  );
}
