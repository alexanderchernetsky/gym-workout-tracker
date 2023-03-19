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


const routes = {
    HOME: '/',
    SPLIT_WORKOUTS_LIST: '/split-workout',
    SPLIT_WORKOUT: '/split-workout/:id',
    EXERCISES_LIST: `/exercise`,
    EXERCISE: '/exercise/:id',
    PROGRESS: '/progress'
}

function LinkRouter(props) {
    return <Link {...props} component={RouterLink} />;
}

// todo: get rid of hardcode, use regular expressions ?
const getBreadcrumbNameMap = (id) => ({
    [routes.SPLIT_WORKOUTS_LIST]: 'Split workouts',
    [`${routes.SPLIT_WORKOUTS_LIST}/1`]: 'Workout',
    [`${routes.SPLIT_WORKOUTS_LIST}/2`]: 'Workout',
    [`${routes.SPLIT_WORKOUTS_LIST}/3`]: 'Workout',
    [`${routes.EXERCISES_LIST}`]: 'Exercises',
    [`${routes.EXERCISES_LIST}/1`]: 'Exercise',
    [`${routes.PROGRESS}`]: 'Progress',
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
                  <Route path={routes.HOME} element={<Home />} />
                  <Route path={routes.SPLIT_WORKOUTS_LIST} element={<SplitWorkouts />} />
                  <Route path={routes.SPLIT_WORKOUT} element={<WorkoutPage />} />
                  <Route path={routes.EXERCISES_LIST} element={<Exercises />} />
                  <Route path={routes.EXERCISE} element={<ExercisePage />} />
                  <Route path={routes.PROGRESS} element={<ProgressPage />} />
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
