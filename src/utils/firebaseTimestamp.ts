import firebase from '../firebase';

const formatFirebaseTimestamp = (date: Date) => {
  return firebase.firestore.Timestamp.fromDate(date);
}

export default formatFirebaseTimestamp;