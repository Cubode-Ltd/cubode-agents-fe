import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
    cubes: {}
};

const cubesSlice = createSlice({
    name: 'cubes',
    initialState,
    reducers: {
        addCube: (state, action) => {
            const { id, cube } = action.payload;
            state.cubes[id] = cube;
        },
        updateCube: (state, action) => {
            const { id, updates } = action.payload;
            if (state.cubes[id]) {
                Object.assign(state.cubes[id], updates);
            }
        },
        removeCube: (state, action) => {
            delete state.cubes[action.payload.id];
        }
    }
});

export const { addCube, updateCube, removeCube } = cubesSlice.actions;
export default configureStore({
    reducer: {
        cubes: cubesSlice.reducer
    }
});
