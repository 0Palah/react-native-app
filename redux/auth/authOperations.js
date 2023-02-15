import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

// export function test() {
//   return console.log(321);
// }

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      // деструктуризую user з userCredential
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        login
      );
      console.log("user: ", user);
    } catch (error) {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

export const authSignInUser = () => async (dispatch, getState) => {};

export const authSignOutUser = () => async (dispatch, getState) => {};
