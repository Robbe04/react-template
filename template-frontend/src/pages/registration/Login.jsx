import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import LabelInput from '../../components/registration/LabelInput';
import { useAuthentication } from '../../contexts/authentication';
import Error from '../../components/Error';

const validationRules = {
  emailadres: {
    required: 'Email is required',
  },
  password: {
    required: 'Password is required',
  },
};

export default function Login() {
  const { error, loading, login } = useAuthentication();
  const navigate = useNavigate();
  const { search } = useLocation();

  const methods = useForm({
    defaultValues: {
      emailadres: 'thomas.cooper@gmail.com',
      password: 'password2',
    },
  });
  const { handleSubmit, reset } = methods;
  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleLogin = useCallback(
    async ({ emailadres, password }) => {
      const loggedIn = await login(emailadres, password);
      
      if (loggedIn) {
        const params = new URLSearchParams(search);
        navigate({
          pathname: params.get('redirect') || '/',
          replace: true,
        });
      }
    },
    [login, navigate, search],
  );

  return (
    <FormProvider {...methods}>
      <div className='container'>
        <form
          className='d-flex flex-column'
          onSubmit={handleSubmit(handleLogin)}
        >
          <h1>Sign in</h1>
          <Error error={error} />
          <LabelInput
            label='emailadres'
            type='email'
            name='emailadres'
            placeholder='your@email.com'
            validationRules={validationRules.emailadres}
          />
          <LabelInput
            label='password'
            type='password'
            name='password'
            validationRules={validationRules.password}
          />
          <div className='clearfix'>
            <div className='btn-group float-end'>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={loading}
              >
                Sign in
              </button>

              <button
                type='button'
                className='btn btn-light'
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
