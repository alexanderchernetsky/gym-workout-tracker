import React, {useState} from 'react';
import ImageUploader from 'react-images-upload';

import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';

import {PageWithResponsiveAppBar} from '../../../App';

// todo: use react-hook-form for FE validation
const CreateProgressItemPage = () => {
    const [pictures, setPictures] = useState([]);

    // todo: add ts types to pictureFiles and pictureDataURLs
    // @ts-ignore
    const onDrop = (pictureFiles, pictureDataURLs) => {
        setPictures(pictureFiles);
    };

    return (
        <PageWithResponsiveAppBar>
            {/*todo: add Date picker */}
            {/*Weight*/}
            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
                <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                        'aria-label': 'weight'
                    }}
                />
            </FormControl>
            {/* todo: add Additional info text field */}
            <TextField id="outlined-multiline-static" label="Progress Indicators" multiline rows={4} defaultValue="Default Value" />
            {/* todo: add image uploader */}
            <ImageUploader withIcon={true} buttonText="Choose images" onChange={onDrop} imgExtension={['.jpg', '.gif', '.png', '.gif']} maxFileSize={5242880} />
            {/* todo: add submit button */}
            <Button variant="contained">Submit</Button>
        </PageWithResponsiveAppBar>
    );
};

export default CreateProgressItemPage;
