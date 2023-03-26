import React, {useState} from 'react';
import ImageUploader from 'react-images-upload';
import {Controller, SubmitHandler, useForm, FormProvider} from 'react-hook-form';
import uuid from 'react-uuid';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import heic2any from 'heic2any';

import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

import {AppRoutes, PageWithResponsiveAppBar} from '../../../App';
import {addNewProgressItem, LoadingStateType} from '../progressSlice';
import {AppDispatch, RootState} from '../../../store';

import styles from './styles.module.scss';

const MAX_IMAGE_SIZE = 5242880;

type ProgressItemFormValues = {
    weight: number;
    progressIndicators: string;
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

    const onImageDrop = (pictureFiles: File[], pictureDataURLs: string[]) => {
        setPictures(pictureFiles);
        setImageError(false);
    };

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
                // let reader = new FileReader();
                // let blob: Blob;
                //
                // reader.readAsText(photo);
                // reader.onload = function() {
                //     // @ts-ignore
                //     blob = reader.result;
                // };
                // reader.onerror = function() {
                //     setImageConversionError(true);
                //     console.error(reader.error);
                // };

                heic2any({
                    // @ts-ignore File = Blob ?
                    photo,
                    toType: 'image/jpeg',
                    quality: 1
                })
                    .then(conversionResult => {
                        // FileSaver.saveAs(conversionResult, 'conversion.jpg');
                        console.log('conversionResult', conversionResult);
                        converted = conversionResult;
                    })
                    .catch(error => {
                        setImageConversionError(true);
                        console.error(`Error converting file: ${error}`);
                    });
            }

            const base64img = await toBase64(isHEIC ? converted : photo);

            dispatch(
                addNewProgressItem({
                    weight: fields.weight,
                    progressIndicators: fields.progressIndicators,
                    image: base64img as string,
                    id: uuid(),
                    // todo: replace with date from the date picker
                    date: new Date().toString()
                })
            );

            // todo: navigate to the progress page if success only
        }
    };

    return (
        <PageWithResponsiveAppBar>
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
                        {/* todo: Add date picker field */}
                        {/* Image */}
                        {/* todo: double-check if .heic works on iphone */}
                        <ImageUploader
                            buttonText="Choose image"
                            className={styles.imageUploader}
                            withPreview
                            singleImage
                            withIcon
                            onChange={onImageDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.jpeg', '.heic']}
                            maxFileSize={MAX_IMAGE_SIZE}
                        />
                        {imageError && <Alert severity="error">The image is required.</Alert>}
                        {/* Submit */}
                        <Button variant="contained" type="submit" className={styles.submitButton} disabled={loadingState === LoadingStateType.Loading}>
                            Submit
                        </Button>
                    </FormProvider>
                </form>
                {isUploadError && <Alert severity="error">New progress item upload failed. Please try again.</Alert>}
                {isImageConversionError && <Alert severity="error">Image upload failed. Allowed image types: .jpg, .gif, .png, .jpeg.</Alert>}
            </div>
        </PageWithResponsiveAppBar>
    );
};

export default CreateProgressItemPage;
