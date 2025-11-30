'use client'
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterReducer";

interface RootState {
    counterReducer: {
        count: number;
    };
}

export default function CounterRedux() {
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