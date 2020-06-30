import { combineReducers, createStore } from "redux";

// Actions.js
export const loginasAdminAction = () => ({
  type: "LOGIN_AS_ADMIN"
});

export const insertProjectAction = () => ({
  type: "INSERT_PROJECT_PAGE"
});

export const updateProjectAction = () => ({
  type: "UPDATE_PROJECT_PAGE"
});

export const removeProjectAction = () => ({
  type: "REMOVE_PROJECT_PAGE"
});

export const projectListAction = () => ({
  type: "PROJECT_LIST_PAGE"
});

export const addProjectDataAction = payload => ({
  type: "ADD_PROJECT_DATA",
  PAYLOAD: payload
});

export const removeProjectDataAction = payload => ({
  type: "REMOVE_PROJECT_DATA",
  PAYLOAD: payload
});

// DataReducer.js
const initialState = {
  userRole: "user",
  adminCurrentPage: "ProjectListPage",
  ProjectData: ""
};

export const DataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_AS_ADMIN":
      return { ...state, userRole: "admin" };
    case "INSERT_PROJECT_PAGE":
      return { ...state, adminCurrentPage: "InsertProjectPage" };
    case "UPDATE_PROJECT_PAGE":
      return { ...state, adminCurrentPage: "UpdateProjectPage" };
    case "REMOVE_PROJECT_PAGE":
      return { ...state, adminCurrentPage: "RemoveProjectPage" };
    case "PROJECT_LIST_PAGE":
      return { ...state, adminCurrentPage: "ProjectListPage" };
    case "ADD_PROJECT_DATA":
      return { ...state, ProjectData: action.PAYLOAD.data };
    case "REMOVE_PROJECT_DATA":
      return { ...state, ProjectData: "" };
    default:
      return state;
  }
};

// RootReducer.js
export const RootReducer = combineReducers({
  DataReducer
});

// Store.js
export default function configureStore() {
  return createStore(RootReducer);
}
