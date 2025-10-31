import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "../Lab4/ReduxExamples/HelloRedux/helloReducer";
import counterReducer from "../Lab4/ReduxExamples/CounterRedux/counterReducer";
import addReducer from "../Lab4/ReduxExamples/AddRedux/addReducer";
import todosReducer from "../Lab4/ReduxExamples/todos/todoReducer";

const store = configureStore({
  reducer: {
    helloReducer: helloReducer,
    counterReducer: counterReducer,
    addReducer: addReducer,
    todosReducer: todosReducer
  },
});

export default store;