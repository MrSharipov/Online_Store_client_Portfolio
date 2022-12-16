import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "counter",
    initialState: {
        itemAmount: 0,
    },
    reducers: {
        addItem: (state, action) => {
            state.itemAmount = action.payload.amount
        },
        removeAll: (state) =>(state = 0),
        removeItem: (state, action)=> {
            state.value -= 1
        }
    },
});

export const {addItem, removeAll, removeItem} = userSlice.actions;
export default userSlice.reducer;