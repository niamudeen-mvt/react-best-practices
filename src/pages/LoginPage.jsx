import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDataIntoLc } from '../utils/helper';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../utils/axios';
import { updateAuthUser } from '../store/features/authSlice';
import { sendNotification } from '../utils/notifications';
import { useForm } from 'react-hook-form';
import { FORM_ERROR_MESSAGES, REGEX, RESPONSE_MESSAGES } from '../constants';
import FormFieldError from '../components/shared/FormFieldError';

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { mutate, isPending } = useMutation({
        mutationFn: async (user) => {
            const response = await axiosInstance.post('/auth/login', user);
            return response?.data || {};
        },
        onSuccess: (response) => {
            if (response?.code === 'SUCCESS') {
                const { token, user } = response;
                dispatch(updateAuthUser(user));
                setDataIntoLc('token', token);
                setDataIntoLc('userId', user?._id);
                navigate('/products');
            }
        },
        onError: (error) => {
            const errors = error?.response?.data?.errors;

            if (errors && errors.length > 0 && errors[0]?.msg) {
                sendNotification('error', errors[0]?.msg);
            } else if (error?.response?.data?.code === 'ERROR') {
                sendNotification('warning', RESPONSE_MESSAGES.SEVER_ERROR);
            }
        },
    });

    const onSubmit = (data) => {
        if (!data) return;
        mutate(data);
    };
    return (
        <section className="section">
            <form
                className="max-w-[400px] min-h-[500px] mx-auto text-lg p-14 rounded-xl space-y-8 shadow-lg"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2>Sign in</h2>
                <div className="space-y-4 text-xs">
                    <label className="capitalize">Email</label>
                    <input
                        autoComplete="off"
                        {...register('email', {
                            required: {
                                value: true,
                                message: FORM_ERROR_MESSAGES.REQUIRED,
                            },
                            pattern: {
                                value: REGEX.EMAIL,
                                message: FORM_ERROR_MESSAGES.EMAIL.INVALID,
                            },
                        })}
                        className="custom_input"
                    />
                    {errors.email && (
                        <FormFieldError message={errors.email.message} />
                    )}
                </div>

                <div className="space-y-4 text-xs">
                    <label className="capitalize">Password</label>
                    <input
                        autoComplete="off"
                        {...register('password', {
                            required: {
                                value: true,
                                message: FORM_ERROR_MESSAGES.REQUIRED,
                            },
                            minLength: {
                                value: 3,
                                message:
                                    FORM_ERROR_MESSAGES.PASSWORD.MIN_LENGTH,
                            },
                        })}
                        className="custom_input"
                    />
                    {errors.password && (
                        <FormFieldError message={errors.password.message} />
                    )}
                </div>

                <button type="submit" className="btn w-full">
                    {isPending ? 'Loading...' : 'Submit'}
                </button>

                {/* <p className="text-center">
                    Don't have an account ?
                    <Link to="/signup" className="ml-2 text-black">
                        Sign up
                    </Link>
                    </p> */}
            </form>
        </section>
    );
}
