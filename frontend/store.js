import { createStore, applyMiddleware, compose } from "redux";
import rootreducer from "./reducers/index";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () => createStore(rootreducer);
export const wrapper = createWrapper(makeStore);
