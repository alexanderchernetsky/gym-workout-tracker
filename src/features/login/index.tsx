import React, {useEffect} from 'react';
import {Controller, SubmitHandler, useForm, FormProvider} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import {loginUser} from './loginSlice';
import {RootState} from '../../store';
import {LoadingStateType} from '../progress/progressSlice';

import styles from './styles.module.scss';
import {AppRoutes} from '../../App';
import {useNavigate} from 'react-router-dom';

type LoginInputs = {
    email: string;
    password: string;
};

const emailFieldValidationRules = {required: true, pattern: {value: /^\S+@\S+$/i, message: 'Invalid email address'}};
const passwordFieldValidationRules = {
    required: true,
    minLength: {value: 5, message: 'Password must have at least 5 characters'},
    maxLength: {value: 30, message: 'Password must have maximum 30 characters'}
};

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loadingState = useSelector((state: RootState) => state.login.loadingState);
    const user = useSelector((state: RootState) => state.login.user);

    const methods = useForm<LoginInputs>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const {
        handleSubmit,
        formState: {isValid}
    } = methods;

    const onSubmit: SubmitHandler<LoginInputs> = fields => {
        if (isValid) {
            // todo
            // @ts-ignore
            dispatch(loginUser(fields));
        }
    };

    const isError = loadingState === LoadingStateType.Error;

    useEffect(() => {
        if (user) {
            navigate(AppRoutes.HOME);
        }
    }, [user, navigate]);

    return (
        <React.Fragment>
            <Typography variant="h3" component="h3" className={styles.heading}>
                GYM
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
                <FormProvider {...methods}>
                    <Controller
                        name="email"
                        rules={emailFieldValidationRules}
                        render={({field, fieldState: {error}}) => (
                            <TextField
                                {...field}
                                className={styles.field}
                                error={Boolean(error)}
                                helperText={error ? error.message : ''}
                                label="Email"
                                variant="outlined"
                                autoComplete="off"
                                required
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        rules={passwordFieldValidationRules}
                        render={({field, fieldState: {error}}) => (
                            <TextField
                                {...field}
                                className={styles.field}
                                error={Boolean(error)}
                                helperText={error ? error.message : ''}
                                label="Password"
                                variant="outlined"
                                autoComplete="off"
                                type="password"
                                required
                            />
                        )}
                    />
                    <Button variant="contained" type="submit" disabled={loadingState === LoadingStateType.Loading}>
                        Login
                    </Button>
                </FormProvider>
            </form>
            {isError && <Alert severity="error">The error has happened. Please try to log in again.</Alert>}
        </React.Fragment>
    );
};

export default LoginForm;
