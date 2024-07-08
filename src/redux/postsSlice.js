import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('posts');
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return [];
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('posts', serializedState);
    } catch (err) {
        // Ignore write errors
    }
};

const postsSlice = createSlice({
    name: 'posts',
    initialState: loadState(),
    reducers: {
        addPost: (state, action) => {
            const newState = [...state, { id: Date.now(), ...action.payload }];
            saveState(newState);
            return newState;
        },
        editPost: (state, action) => {
            const index = state.findIndex((post) => post.id === action.payload.id);
            if (index !== -1 && state[index].email === action.payload.email && state[index].password === action.payload.password) {
                const newState = [...state];
                newState[index] = { ...newState[index], ...action.payload };
                saveState(newState);
                return newState;
            }
            return state;
        },
        deletePost: (state, action) => {
            const index = state.findIndex((post) => post.id === action.payload.id);
            if (index !== -1 && state[index].email === action.payload.email && state[index].password === action.payload.password) {
                const newState = state.filter(post => post.id !== action.payload.id);
                saveState(newState);
                return newState;
            }
            return state;
        }
    },
});

export const { addPost, editPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
