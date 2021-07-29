import firebase from '../firebase';

export const logIn = (successCb: () => void) => {
  // get the firebase auth object
  const google = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(google)
    .then(() => {
      successCb();
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const logOut = (successCb: () => void) => {
  const auth = firebase.auth();

  if (auth) {
    auth
      .signOut()
      .then(() => {
        successCb();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}

export const getAuthState = (): firebase.User | null => {
  const auth = firebase.auth();

  if (auth && auth.currentUser) {
    return auth.currentUser;
  } else {
    return null;
  }
}