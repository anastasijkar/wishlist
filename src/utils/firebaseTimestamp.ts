import firebase from '../firebase';

const formatFirebaseTimestamp = (date: Date) => {
  return firebase.firestore.Timestamp.fromDate(date);
}

const firebaseTimestampToDate = (date: firebase.firestore.Timestamp) => {
  return date.toDate();
}

export { formatFirebaseTimestamp, firebaseTimestampToDate };