import { configureStore } from "@reduxjs/toolkit"; 
import coursesReducer from "./Courses/reducer"; 
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import accountReducer from "./Account/reducer";
import enrollmentsReducer from "./Dashboard/reducer";
const store = configureStore(
    { reducer: { 
        coursesReducer,
        modulesReducer,
        accountReducer,
        enrollmentsReducer
    }, 
}
); 
export default store;