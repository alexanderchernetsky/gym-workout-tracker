import React, {useEffect} from 'react';
import {Controller, SubmitHandler, useForm, FormProvider} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import {loginUser} from './authSlice';
import {AppDispatch, RootState} from '../../store';
import {AppRoutes} from '../../constants/routes';
import {LoadingStateType} from '../progress/progressSlice';
import {emailFieldValidationRules, passwordFieldValidationRules} from './validationRules';

import styles from './styles.module.scss';

export type LoginInputs = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const loadingState = useSelector((state: RootState) => state.auth.loadingState);
    const user = useSelector((state: RootState) => state.auth.user);

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
            dispatch(loginUser(fields));
        }
    };

    const isError = loadingState === LoadingStateType.Error;

    useEffect(() => {
        if (user) {
            navigate(AppRoutes.HOME);
        }
    }, [user, navigate]);

    const onSignUpLinkClick = () => {
        navigate(AppRoutes.REGISTER);
    };

    return (
        <React.Fragment>
            <Typography variant="h4" component="h3" className={styles.heading}>
                GYM
            </Typography>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
                <div className={styles.signUpWrapper}>
                    <div className={styles.signUpText}>Don't have an account yet?</div>
                    <div className={styles.signUpLink} onClick={onSignUpLinkClick}>
                        Sign Up!
                    </div>
                </div>
                {isError && <Alert severity="error">The error has happened. Please try to log in again.</Alert>}
            </div>
        </React.Fragment>
    );
};

export default LoginForm;
