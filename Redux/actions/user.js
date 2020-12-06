import Firebase, { db } from "../../config/firebase.js";
import {
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_NAME,
  LOGIN,
  SIGNUP,
} from "../actionTypes/user";

export const updateEmail = (email) => {
  return {
    type: UPDATE_EMAIL,
    payload: email,
  };
};

export const updateName = (name) => {
  return {
    type: UPDATE_NAME,
    payload: name,
  };
};

export const updatePassword = (password) => {
  return {
    type: UPDATE_PASSWORD,
    payload: password,
  };
};

export const login = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().user;
      const response = await Firebase.auth().signInWithEmailAndPassword(
        email,
        password
      );

      dispatch(getUser(response.user.uid));
    } catch (e) {
      alert(e, "Invalid Login Attempt");
    }
  };
};

export const signup = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().user;
      const response = await Firebase.auth().createUserWithEmailAndPassword(
        email,
        password
      );
      if (response.user.uid) {
        const user = {
          uid: response.user.uid,
          email: email,
        };

        db.collection("users").doc(response.user.uid).set(user);

        dispatch({ type: SIGNUP, payload: user });
      }
    } catch (e) {
      alert(e);
    }
  };
};

export const getUser = (uid) => {
  return async (dispatch, getState) => {
    try {
      const user = await db.collection("users").doc(uid).get();

      dispatch({ type: LOGIN, payload: user.data() });
    } catch (e) {
    //   alert(e);
    }
  };
};