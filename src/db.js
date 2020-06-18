import firebase from 'firebase/app';
import 'firebase/firestore';
const { Timestamp } = firebase.firestore;

const db = firebase.initializeApp({ projectId: 'aire-limpio-sur' }).firestore();

export { db, Timestamp };
