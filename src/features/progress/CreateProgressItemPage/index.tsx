import React, {useState} from 'react';
import ImageUploader from 'react-images-upload';
import {Controller, SubmitHandler, useForm, FormProvider} from 'react-hook-form';

import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

import {PageWithResponsiveAppBar} from '../../../App';

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

const CreateProgressItemPage = () => {
    const [pictures, setPictures] = useState<File[]>([]);
    const [imageError, setImageError] = useState(false);

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

    const onSubmit: SubmitHandler<ProgressItemFormValues> = fields => {
        console.log('fields', fields);
        console.log('isValid', isValid);
        console.log('pictureFiles', pictures);

        if (!pictures.length) {
            setImageError(true);

            return;
        }

        if (isValid && !imageError) {
            // todo: dispatch action
        }
    };

    return (
        <PageWithResponsiveAppBar>
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
                    {/* Image */}
                    <ImageUploader
                        buttonText="Choose image"
                        className={styles.imageUploader}
                        withPreview
                        singleImage
                        withIcon
                        onChange={onImageDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={MAX_IMAGE_SIZE}
                    />
                    {imageError && <Alert severity="error">The image is required.</Alert>}
                    {/* Submit */}
                    <Button variant="contained" type="submit" className={styles.submitButton}>
                        Submit
                    </Button>
                </FormProvider>
            </form>
        </PageWithResponsiveAppBar>
    );
};

export default CreateProgressItemPage;
