import React from 'react';
import {Route, BrowserRouter, Routes, useNavigate, Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

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
import {logOut} from './features/login/authSlice';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import styles from './styles.module.css';

export enum AppRoutes {
    HOME = '/',
    LOGIN = '/login',
    PROGRESS_PAGE = '/progress',
    CREATE_PROGRESS_ITEM_PAGE = '/progress/create',
    DIET_PAGE = '/diet',
    SPLIT_WORKOUTS_LIST = '/split-workout',
    FULL_BODY_WORKOUTS_LIST = '/full-body-workout',
    SPLIT_WORKOUT = '/split-workout/:id',
    EXERCISES_LIST = `/exercise`,
    EXERCISE = '/exercise/:id',
    NOT_FOUND = '/not-found'
}

const appNavigationItems = [
    {
        name: 'Workouts',
        route: AppRoutes.HOME
    },
    {
        name: 'Progress',
        route: AppRoutes.PROGRESS_PAGE
    },
    {
        name: 'Diet',
        route: AppRoutes.DIET_PAGE
    }
];

const settings = ['Profile', 'Account', 'Dashboard'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNavItemClick = (route: AppRoutes) => {
        navigate(route);
        setAnchorElNav(null);
    };

    const handleLogOut = () => {
        dispatch(logOut());
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <FitnessCenterIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        GYM
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'}
                            }}
                        >
                            {appNavigationItems.map(({name, route}) => (
                                <MenuItem key={name} onClick={() => handleNavItemClick(route)}>
                                    <Typography textAlign="center">{name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <FitnessCenterIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        GYM
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {appNavigationItems.map(({name, route}) => (
                            <Button key={name} onClick={() => handleNavItemClick(route)} sx={{my: 2, color: 'white', display: 'block'}}>
                                {name}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                {/* todo: add src to a real avatar image*/}
                                <Avatar alt="Alex Chernetsky" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map(setting => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                            <MenuItem key="log-out" onClick={handleLogOut}>
                                <Typography textAlign="center">Log out</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

interface IPageWithResponsiveAppBarProps {
    children: React.ReactNode;
}

// todo: find a better way to show ResponsiveAppBar for all routes except /login
export const PageWithResponsiveAppBar: React.FC<IPageWithResponsiveAppBarProps> = ({children}) => {
    return (
        <React.Fragment>
            <ResponsiveAppBar />
            {children}
        </React.Fragment>
    );
};

interface IRequireAuthProps {
    children: React.ReactNode;
}

const RequireAuth: React.FC<IRequireAuthProps> = ({children}) => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    return <React.Fragment>{isLoggedIn ? children : <LoginForm />}</React.Fragment>;
};

function App() {
    return (
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
    );
}

export default App;
