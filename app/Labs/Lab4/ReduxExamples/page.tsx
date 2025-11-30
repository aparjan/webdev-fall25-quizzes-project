'use client'

import { Provider } from "react-redux";
import HelloRedux from "./HelloRedux/helloRedux";
import store from "../../store";
import CounterRedux from "./CounterRedux";
import AddRedux from "./AddRedux/page";
import TodoList from "./todos/TodoList";

export default function ReduxExamples() {
    return (
        <Provider store={store}>
            <div>
            <h2>Redux Examples</h2>
            <HelloRedux />
            <CounterRedux />
            <AddRedux />
            <TodoList />
        </div>
        </Provider>
    );
};