import React, {ChangeEvent} from 'react';
import {List} from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

import {PageWithResponsiveAppBar} from '../../../components/ResponsiveAppBar';
import {useFetchExercisesQuery} from '../../../services/ninjasApi';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';
import createSearchString from '../../../helpers/createSearchString';
import {muscleSelectOptions, typeSelectOptions} from './filterOptions';
import ExerciseListItem from '../ExerciseListItem';

import styles from './styles.module.scss';

const Exercises = () => {
    const [name, setName] = React.useState('');
    const [type, setType] = React.useState('');
    const [muscle, setMuscle] = React.useState('');

    const searchString = createSearchString({muscle: muscle, type: type, name: name});

    // todo: how to apply throttle-debounce library? Is it needed or should it be removed from deps? should I use skip?
    const {data = [], isLoading, isError} = useFetchExercisesQuery(searchString);

    const handleTypeChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
    };

    const handleMuscleChange = (event: SelectChangeEvent) => {
        setMuscle(event.target.value);
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    return (
        <PageWithResponsiveAppBar>
            <div className={styles.pageWrapper}>
                <Loading isLoading={isLoading}>
                    <Error isError={isError}>
                        <div className={styles.contentWrapper}>
                            <h1 className={styles.pageTitle}>Exercises</h1>
                            <TextField
                                id="filled-basic"
                                label="Search"
                                variant="filled"
                                className={styles.searchInput}
                                value={name}
                                onChange={handleNameChange}
                            />
                            <div className={styles.filtersWrapper}>
                                <FormControl variant="filled" sx={{m: 1, minWidth: 120}} className={styles.selectWrapper}>
                                    <InputLabel id="muscle-select-label">Muscle</InputLabel>
                                    <Select labelId="muscle-select-label" id="muscle-select" value={muscle} onChange={handleMuscleChange}>
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {muscleSelectOptions.map(option => (
                                            <MenuItem key={option} value={option} className={styles.selectOption}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl variant="filled" sx={{m: 1, minWidth: 120}} className={styles.selectWrapper}>
                                    <InputLabel id="type-select-label">Type</InputLabel>
                                    <Select labelId="type-select-label" id="type-select" value={type} onChange={handleTypeChange}>
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {typeSelectOptions.map(option => (
                                            <MenuItem key={option} value={option} className={styles.selectOption}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <h2 className={styles.subHeader}>Exercises:</h2>
                            <List sx={{bgcolor: 'background.paper'}} component="nav" aria-label="exercises" className={styles.list}>
                                {data.map((exercise, index) => (
                                    <ExerciseListItem exercise={exercise} key={`${exercise.name}-${index}`} />
                                ))}
                                {data.length === 0 && 'Nothing found...'}
                            </List>
                        </div>
                    </Error>
                </Loading>
            </div>
        </PageWithResponsiveAppBar>
    );
};

export default Exercises;
