import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import styles from './styles.module.scss';

interface IErrorProps {
    isError: boolean;
    children: React.ReactNode;
}

const Error: React.FC<IErrorProps> = ({isError, children}) => {
    return (
        <React.Fragment>
            {isError ? (
                <div>
                    <div className={styles.errorMessage}>
                        <ErrorOutlineIcon color="error" />
                        &nbsp; Something went wrong.
                    </div>
                </div>
            ) : (
                children
            )}
        </React.Fragment>
    );
};

export default Error;
