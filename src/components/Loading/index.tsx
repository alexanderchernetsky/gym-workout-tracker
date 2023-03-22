import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import styles from './styles.module.scss';


interface ILoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const Loading: React.FC<ILoadingProps> = ({ isLoading, children }) => {
  return (
    <React.Fragment>
      {isLoading ? (
          <Box className={styles.spinnerWrapper}>
            <CircularProgress />
          </Box>
      ) : (
        children
      )}
    </React.Fragment>
  );
};

export default Loading;
