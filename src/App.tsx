import React from 'react';
import {
    Link as RouterLink,
    Route,
    BrowserRouter,
    Routes,
    useLocation
} from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {Avatar, Link, Typography} from "@mui/material";

import Home from "./pages/Home";
import SplitWorkouts from "./pages/SplitWorkouts";
import WorkoutPage from "./pages/WorkoutPage";
import ExercisePage from "./pages/ExercisePage";
import Exercises from "./pages/Exercises";
import ProgressPage from './pages/ProgressPage';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import styles from './styles.module.css';


export enum AppRoutes {
    HOME = '/',
    SPLIT_WORKOUTS_LIST = '/split-workout',
    FULL_BODY_WORKOUTS_LIST = '/full-body-workout',
    SPLIT_WORKOUT = '/split-workout/:id',
    EXERCISES_LIST = `/exercise`,
    EXERCISE = '/exercise/:id',
    PROGRESS = '/progress'
}

function LinkRouter(props: any) {
    return <Link {...props} component={RouterLink} />;
}

// todo: get rid of hardcode, use regular expressions ?
const getBreadcrumbNameMap = () => ({
    [AppRoutes.SPLIT_WORKOUTS_LIST]: 'Split workouts',
    [`${AppRoutes.SPLIT_WORKOUTS_LIST}/1`]: 'Workout',
    [`${AppRoutes.SPLIT_WORKOUTS_LIST}/2`]: 'Workout',
    [`${AppRoutes.SPLIT_WORKOUTS_LIST}/3`]: 'Workout',
    [`${AppRoutes.EXERCISES_LIST}`]: 'Exercises',
    [`${AppRoutes.EXERCISES_LIST}/1`]: 'Exercise',
    [`${AppRoutes.PROGRESS}`]: 'Progress',
})

function BreadcrumbsComponent() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumbs} >
            <LinkRouter underline="hover" color="inherit" to="/">
                Home
            </LinkRouter>
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                return last ? (
                    <Typography color="text.primary" key={to}>
                        {getBreadcrumbNameMap()[to]}
                    </Typography>
                ) : (
                    <LinkRouter underline="hover" color="inherit" to={to} key={to}>
                        {getBreadcrumbNameMap()[to]}
                    </LinkRouter>
                );
            })}
        </Breadcrumbs>
    );
}


function App() {
  return (
      <BrowserRouter>
          <div className={styles.app}>
              <nav className={styles.navigation}>
                  <BreadcrumbsComponent />
                  <Avatar alt="Alex Chernetsky" src="/static/images/avatar/1.jpg" />
              </nav>

              <Routes>
                  <Route path={AppRoutes.HOME} element={<Home />} />
                  <Route path={AppRoutes.SPLIT_WORKOUTS_LIST} element={<SplitWorkouts />} />
                  <Route path={AppRoutes.SPLIT_WORKOUT} element={<WorkoutPage />} />
                  <Route path={AppRoutes.EXERCISES_LIST} element={<Exercises />} />
                  <Route path={AppRoutes.EXERCISE} element={<ExercisePage />} />
                  <Route path={AppRoutes.PROGRESS} element={<ProgressPage />} />
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
