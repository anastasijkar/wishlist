import firebase, { db } from '../../firebase';

import IUser from '../../interfaces/user.interface';

import NOTIFICATION_TYPES from '../../enums/notificationTypes.enum';

export const getUser = async (authData: firebase.User) => {
  try {
    const docRef = db.collection('Users').doc(authData.uid);
    const doc = await docRef.get();
    const data = await doc.data();

    return data ? data as IUser : null;
  } catch (error) {
    throw new Error(error)
  }
}

export const addUser = async (authData: firebase.User) => {
  try {
    const userToAdd: IUser = {
      email: authData.email || '',
      username: authData.displayName || '',
      photo: authData.photoURL,
    };
    const authId = authData.uid;
    await db.collection("Users").doc(authId).set(userToAdd);
    await db.collection("UserNotifications").doc(authId).collection('notifications').add({
      type: NOTIFICATION_TYPES.OTHER,
      text: 'You joined Wishlist 🎉',
      time: Date.now(),
      read: false
    })
    return {
      uid: authId,
      ...userToAdd as IUser
    };
  } catch (error) {
    throw new Error(error)
  }
}

export const updateUser = async (uid: string, profileData: IUser) => {
  try {
    const docRef = db.collection('Users').doc(uid);
    await docRef.update(profileData);
    return profileData as IUser;
  } catch (error) {
    throw new Error(error)
  }
}

