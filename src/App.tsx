import React from 'react';
import {Route, BrowserRouter, Routes, useNavigate, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import 'moment/locale/en-gb';

import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';

import Home from './features/Home';
import SplitWorkouts from './features/SplitWorkouts';
import WorkoutPage from './features/WorkoutPage';
import ExercisePage from './features/ExercisePage';
import Exercises from './features/Exercises';
import ProgressPage from './features/progress';
import CreateProgressItemPage from './features/progress/CreateProgressItemPage';
import LoginForm from './features/login';
import {RootState} from './store';
import NotFound from './pages/NotFound';
import {AppRoutes} from './constants/routes';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import styles from './styles.module.css';

interface IRequireAuthProps {
    children: React.ReactNode;
}

const RequireAuth: React.FC<IRequireAuthProps> = ({children}) => {
    // to not lose login state after page refresh
    const user = localStorage.getItem('user');

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn) || Boolean(user);

    return <React.Fragment>{isLoggedIn ? children : <LoginForm />}</React.Fragment>;
};

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-gb">
            <BrowserRouter>
                <div className={styles.app}>
                    <Routes>
                        <Route path={AppRoutes.LOGIN} element={<LoginForm />} />
                        <Route
                            path={AppRoutes.HOME}
                            element={
                                <RequireAuth>
                                    <Home />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={AppRoutes.PROGRESS_PAGE}
                            element={
                                <RequireAuth>
                                    <ProgressPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={AppRoutes.CREATE_PROGRESS_ITEM_PAGE}
                            element={
                                <RequireAuth>
                                    <CreateProgressItemPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={AppRoutes.SPLIT_WORKOUTS_LIST}
                            element={
                                <RequireAuth>
                                    <SplitWorkouts />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={AppRoutes.SPLIT_WORKOUT}
                            element={
                                <RequireAuth>
                                    <WorkoutPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={AppRoutes.EXERCISES_LIST}
                            element={
                                <RequireAuth>
                                    <Exercises />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={AppRoutes.EXERCISE}
                            element={
                                <RequireAuth>
                                    <ExercisePage />
                                </RequireAuth>
                            }
                        />
                        <Route path={AppRoutes.NOT_FOUND} element={<NotFound />} />
                        <Route path="*" element={<Navigate to={AppRoutes.NOT_FOUND} />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </LocalizationProvider>
    );
}

export default App;
