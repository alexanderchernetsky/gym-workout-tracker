import React from 'react';

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
                    <div className={styles.errorMessage}>Something went wrong.</div>
                </div>
            ) : (
                children
            )}
        </React.Fragment>
    );
};

export default Error;
