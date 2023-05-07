import React, {useEffect} from 'react';
import {Controller, SubmitHandler, useForm, FormProvider} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import {login} from '../authSlice';
import {AppDispatch} from '../../../store';
import {AppRoutes} from '../../../constants/routes';
import {emailFieldValidationRules, passwordFieldValidationRules} from '../validationRules';
import {SHARED_LOGIN_KEY, useLoginMutation} from '../../../services';

import styles from '../styles.module.scss';

export type LoginInputs = {
    email: string;
    password: string;
};

const loginFormDefaultValues: LoginInputs = {
    email: '',
    password: ''
};

const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [loginUser, {data, isError, isLoading}] = useLoginMutation({
        fixedCacheKey: SHARED_LOGIN_KEY
    });

    const methods = useForm<LoginInputs>({
        defaultValues: loginFormDefaultValues
    });

    const {
        handleSubmit,
        formState: {isValid}
    } = methods;

    const onSubmit: SubmitHandler<LoginInputs> = async fields => {
        if (isValid) {
            const data = await loginUser(fields).unwrap();
            dispatch(login(data.user));
        }
    };

    useEffect(() => {
        if (data?.user?.id) {
            navigate(AppRoutes.HOME);
        }
    }, [data, navigate]);

    const onSignUpLinkClick = () => {
        navigate(AppRoutes.REGISTER);
    };

    return (
        <React.Fragment>
            <Typography variant="h4" component="h3" className={styles.heading}>
                GYM
            </Typography>
            <div className={styles.formWrapper}>
                {isError && <Alert severity="error">The error has happened. Please try to log in again.</Alert>}
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
                        <Button variant="contained" type="submit" disabled={isLoading}>
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
            </div>
        </React.Fragment>
    );
};

export default LoginPage;
