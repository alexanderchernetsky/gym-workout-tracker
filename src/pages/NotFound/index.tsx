import React from 'react';

import classes from './styles.module.scss';

const NotFoundScreen: React.FC = () => {
    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <h1>404: The page you are looking for isn’t here</h1>
            </div>
        </div>
    );
};

export default NotFoundScreen;
