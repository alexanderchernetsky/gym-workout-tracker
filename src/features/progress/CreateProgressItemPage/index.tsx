import React, {useState} from 'react';
import {Controller, SubmitHandler, useForm, FormProvider} from 'react-hook-form';
import uuid from 'react-uuid';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import classNames from 'classnames';
import {Moment} from 'moment';

import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

import {PageWithResponsiveAppBar} from '../../../components/ResponsiveAppBar';
import {AppRoutes} from '../../../constants/routes';
import {addNewProgressItem, LoadingStateType} from '../progressSlice';
import {AppDispatch, RootState} from '../../../store';

import styles from './styles.module.scss';

const MAX_IMAGE_SIZE = 5242880; // 5.24 MB

type ProgressItemFormValues = {
    weight: number;
    progressIndicators: string;
    date: Moment;
};

const weightFieldValidationRules = {
    required: {
        value: true,
        message: 'This is a required field'
    },
    min: {
        value: 1,
        message: "Your weight can't be less than 1 kg"
    },
    max: {
        value: 500,
        message: "Your weight can't be more than 500 kg"
    }
};

const progressIndicatorsFieldValidationRules = {
    required: {
        value: true,
        message: 'This is a required field'
    },
    minLength: {
        value: 10,
        message: 'Your progress description is too short.'
    },
    maxLength: {
        value: 1000,
        message: 'Your progress description is too long.'
    }
};

const dateFieldValidationRules = {
    required: {
        value: true,
        message: 'This is a required field'
    }
};

// todo: move to a separate helper file
const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

const CreateProgressItemPage = () => {
    const [pictures, setPictures] = useState<File[]>([]);
    const [imageError, setImageError] = useState(false);
    const [isImageConversionError, setImageConversionError] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const loadingState = useSelector((state: RootState) => state.progress.loadingState);

    const isUploadError = loadingState === LoadingStateType.Error;

    const methods = useForm<ProgressItemFormValues>({
        defaultValues: {
            weight: 0,
            progressIndicators: ''
        }
    });

    const {
        handleSubmit,
        formState: {isValid}
    } = methods;

    console.log('pictures', pictures);

    const onSubmit: SubmitHandler<ProgressItemFormValues> = async fields => {
        if (!pictures.length) {
            setImageError(true);

            return;
        }

        if (isValid && !imageError) {
            const photo = pictures[0];
            const HEIC_IMAGE_MIME_TYPE = 'image/heic';
            let converted;
            const isHEIC = photo.type === HEIC_IMAGE_MIME_TYPE;

            if (isHEIC) {
                // todo: handle heic (iphone images type)
                // heic2any({
                //     // @ts-ignore File = Blob ?
                //     photo,
                //     toType: 'image/jpeg',
                //     quality: 1
                // })
                //     .then(conversionResult => {
                //         // FileSaver.saveAs(conversionResult, 'conversion.jpg');
                //         console.log('conversionResult', conversionResult);
                //         converted = conversionResult;
                //     })
                //     .catch(error => {
                //         setImageConversionError(true);
                //         console.error(`Error converting file: ${error}`);
                //     });
            }

            const base64img = await toBase64(isHEIC ? converted : photo);

            const result = await dispatch(
                addNewProgressItem({
                    weight: fields.weight,
                    progressIndicators: fields.progressIndicators,
                    image: base64img as string,
                    id: uuid(),
                    date: fields.date.format() // "2014-09-08T08:02:17-05:00" (ISO 8601, no fractional seconds)
                })
            );
            // todo: re-write using unwrap()
            if (addNewProgressItem.fulfilled.match(result)) {
                navigate(AppRoutes.PROGRESS_PAGE);
            } else {
                // if failed isUploadError will be set to true and Alert will be shown
            }
        }
    };

    return (
        <PageWithResponsiveAppBar>
            {isUploadError && <Alert severity="error">New progress item upload failed. Please try again.</Alert>}
            {isImageConversionError && <Alert severity="error">Image upload failed. Allowed image types: .jpg, .gif, .png, .jpeg.</Alert>}
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <FormProvider {...methods}>
                        {/*Weight*/}
                        <span className={styles.fieldLabel}>Weight:</span>
                        <Controller
                            name="weight"
                            rules={weightFieldValidationRules}
                            render={({field, fieldState: {error}}) => (
                                <React.Fragment>
                                    <OutlinedInput
                                        {...field}
                                        error={Boolean(error)}
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        inputProps={{
                                            'aria-label': 'weight'
                                        }}
                                        className={styles.field}
                                    />
                                    <FormHelperText id="outlined-weight-helper-text" className={styles.errorMessage}>
                                        {error ? error.message : ''}
                                    </FormHelperText>
                                </React.Fragment>
                            )}
                        />
                        {/*Progress*/}
                        <span className={styles.fieldLabel}>Progress indicators:</span>
                        <Controller
                            name="progressIndicators"
                            rules={progressIndicatorsFieldValidationRules}
                            render={({field, fieldState: {error}}) => (
                                <React.Fragment>
                                    <TextField {...field} error={Boolean(error)} id="outlined-multiline-static" multiline rows={4} className={styles.field} />
                                    <FormHelperText id="outlined-weight-helper-text" className={styles.errorMessage}>
                                        {error ? error.message : ''}
                                    </FormHelperText>
                                </React.Fragment>
                            )}
                        />
                        {/* Date */}
                        <span className={styles.fieldLabel}>Date:</span>
                        <Controller
                            name="date"
                            rules={dateFieldValidationRules}
                            render={({field, fieldState: {error}}) => (
                                <React.Fragment>
                                    <DatePicker {...field} className={classNames(styles.field, Boolean(error) && styles.fieldWithError)} disableFuture />
                                    <FormHelperText id="outlined-weight-helper-text" className={styles.errorMessage}>
                                        {error ? error.message : ''}
                                    </FormHelperText>
                                </React.Fragment>
                            )}
                        />
                        {/* Image */}
                        {/* todo: find another ImageUploader, double-check if .heic works on a real iphone device */}
                        {imageError && <Alert severity="error">The image is required.</Alert>}
                        {/* Submit */}
                        <Button variant="contained" type="submit" className={styles.submitButton} disabled={loadingState === LoadingStateType.Loading}>
                            Submit
                        </Button>
                    </FormProvider>
                </form>
            </div>
        </PageWithResponsiveAppBar>
    );
};

export default CreateProgressItemPage;
