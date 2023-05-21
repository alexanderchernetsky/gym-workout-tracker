import React from 'react';
import {Controller, SubmitHandler, useForm, FormProvider} from 'react-hook-form';
import uuid from 'react-uuid';
import {useNavigate, useParams} from 'react-router-dom';
import classNames from 'classnames';
import {Moment} from 'moment';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import {PageWithResponsiveAppBar} from '../../../components/ResponsiveAppBar';
import {AppRoutes} from '../../../constants/routes';
import {dateFieldValidationRules, imageFieldValidationRules, progressIndicatorsFieldValidationRules, weightFieldValidationRules} from './validationRules';
import {useCreateProgressEntryMutation, useEditProgressEntryMutation, useFetchProgressEntryQuery} from '../../../services';
import truncateStringWithDots from '../../../helpers/truncateStringWithDots';
import convertFileToBase64 from '../../../helpers/convertFileToBase64';
import getErrorMessage from './getErrorMessage';

import styles from './styles.module.scss';

type ProgressItemFormValues = {
    weight: number;
    progressIndicators: string;
    date: Moment;
    image: File;
};

const MAX_IMAGE_NAME_STRING_LENGTH = 30;

const CreateProgressItemPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [createNewProgressEntry, {isLoading: isCreating, isError: isCreateError}] = useCreateProgressEntryMutation();
    const [editProgressEntry, {isLoading: isEditing, isError: isEditError}] = useEditProgressEntryMutation();
    const {
        data,
        isLoading: isLoadingProgressEntry,
        isError: isFetchError
    } = useFetchProgressEntryQuery(id, {
        skip: !id
    });

    const methods = useForm<ProgressItemFormValues>({
        defaultValues: {
            weight: data?.weight || 0,
            progressIndicators: data?.progressIndicators || '',
            // todo: convert image from base64 to File https://ionic.io/blog/converting-a-base64-string-to-a-blob-in-javascript
            // @ts-ignore
            image: data?.image || null,
            date: data?.date || null
        }
    });

    const {handleSubmit} = methods;

    const onSubmit: SubmitHandler<ProgressItemFormValues> = async fields => {
        const input = document.getElementById('progress-page-upload-image-input') as HTMLInputElement;
        const picture = input.files[0];

        const base64img = await convertFileToBase64(picture);

        const trigger = id ? editProgressEntry : createNewProgressEntry;

        const result = await trigger({
            weight: Number(fields.weight),
            progressIndicators: fields.progressIndicators,
            image: base64img as string,
            // todo: id should be created server-side and returned with the response
            id: uuid().slice(0, 8),
            date: fields.date.format() // "2014-09-08T08:02:17-05:00" (ISO 8601, no fractional seconds)
        }).unwrap();

        if (result.success) {
            navigate(AppRoutes.PROGRESS_PAGE);
        } else {
            // if failed isError will be set to true and Alert will be shown
        }
    };

    const isError = isCreateError || isEditError || isFetchError;
    const errorMessage = getErrorMessage(isCreateError, isEditError, isFetchError);
    const isLoading = isCreating || isEditing || isLoadingProgressEntry;

    return (
        <PageWithResponsiveAppBar>
            {isError && <Alert severity="error">{errorMessage}</Alert>}
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
                                        type="number"
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
                        {/* todo: double-check if .heic works on a real iphone device */}
                        <span className={styles.fieldLabel}>Image:</span>
                        <Controller
                            name="image"
                            rules={imageFieldValidationRules}
                            render={({field, fieldState: {error}}) => {
                                const imagePath = field.value?.split('\\');
                                const imageName = truncateStringWithDots(imagePath ? imagePath[imagePath.length - 1] : '', MAX_IMAGE_NAME_STRING_LENGTH);

                                return (
                                    <React.Fragment>
                                        <label className={classNames(styles.field, styles.customFileUpload, Boolean(error) && styles.inputWithError)}>
                                            <CloudUploadIcon />
                                            <span className={styles.imageUploadInputText}>Upload photo</span>
                                            <input
                                                {...field}
                                                className={styles.imageUploadInput}
                                                type="file"
                                                accept="image/jpeg, image/png, image/jpg, image/heic"
                                                id="progress-page-upload-image-input"
                                            />
                                        </label>
                                        <span>{imageName}</span>
                                        <FormHelperText id="outlined-weight-helper-text" className={styles.errorMessage}>
                                            {error ? error.message : ''}
                                        </FormHelperText>
                                    </React.Fragment>
                                );
                            }}
                        />
                        {/* Submit */}
                        <Button variant="contained" type="submit" className={styles.submitButton} disabled={isLoading}>
                            Submit
                        </Button>
                    </FormProvider>
                </form>
            </div>
        </PageWithResponsiveAppBar>
    );
};

export default CreateProgressItemPage;
