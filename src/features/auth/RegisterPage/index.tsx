import React, {useEffect, useState} from 'react';
import {Controller, SubmitHandler, useForm, FormProvider} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import {Snackbar} from '@mui/material';

import {RootState} from '../../../store';
import {emailFieldValidationRules, passwordFieldValidationRules, userNameValidationRules} from '../validationRules';
import {AppRoutes} from '../../../constants/routes';
import {useRegisterMutation} from '../../../services';

import styles from '../styles.module.scss';

export type RegisterFormInputs = {
    username: string;
    email: string;
    password: string;
};

const RegisterPage = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
    const [registerUser, {isError, isLoading}] = useRegisterMutation();

    const methods = useForm<RegisterFormInputs>({
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    });

    const {
        handleSubmit,
        formState: {isValid}
    } = methods;

    const onSubmit: SubmitHandler<RegisterFormInputs> = async fields => {
        if (isValid) {
            await registerUser(fields).unwrap();

            setIsSnackBarOpen(true);

            setTimeout(() => {
                navigate(AppRoutes.LOGIN);
            }, 1000);
        }
    };

    useEffect(() => {
        if (user) {
            navigate(AppRoutes.HOME);
        }
    }, [user, navigate]);

    const onBackToLoginLinkClick = () => {
        navigate(AppRoutes.LOGIN);
    };

    return (
        <React.Fragment>
            <Snackbar open={isSnackBarOpen} autoHideDuration={5000} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert severity="success" sx={{width: '100%'}}>
                    This is a success message!
                </Alert>
            </Snackbar>
            <Typography variant="h4" component="h3" className={styles.heading}>
                Registration
            </Typography>
            <div className={styles.formWrapper}>
                {isError && <Alert severity="error">The error has happened. Please try to register again.</Alert>}
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <FormProvider {...methods}>
                        <Controller
                            name="username"
                            rules={userNameValidationRules}
                            render={({field, fieldState: {error}}) => (
                                <TextField
                                    {...field}
                                    className={styles.field}
                                    error={Boolean(error)}
                                    helperText={error ? error.message : ''}
                                    label="Username"
                                    variant="outlined"
                                    autoComplete="off"
                                    required
                                />
                            )}
                        />
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
                            Register
                        </Button>
                    </FormProvider>
                </form>
                <div className={styles.signUpWrapper}>
                    <div className={styles.signUpText}>Already have an account?</div>
                    <div className={styles.signUpLink} onClick={onBackToLoginLinkClick}>
                        Back to the Login page
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default RegisterPage;
