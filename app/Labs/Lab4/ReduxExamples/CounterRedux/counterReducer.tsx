'use client'
import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

const initialState = { count: 0 };

const counterSlice = createSlice({
    name: "counter", 
    initialState,
    reducers: {
        increment: (state) => { state.count = state.count + 1; },
        decrement: (state) => { state.count = state.count - 1; },
    },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer; 

// Define the state type
interface RootState {
    counterReducer: {
        count: number;
    };
}

// Component (named export)
export function CounterRedux() {
    const { count } = useSelector((state: RootState) => state.counterReducer);
    const dispatch = useDispatch();

    return (
        <div id="wd-counter-redux">
            <h3>Counter Redux</h3>
            <h4>{count}</h4>
            <button 
                onClick={() => dispatch(increment())}
                className="btn btn-success ms-2">
                Increment
            </button>
            <button 
                onClick={() => dispatch(decrement())}
                className="btn btn-danger ms-2">
                Decrement
            </button>
            <hr />
        </div>
    );
}