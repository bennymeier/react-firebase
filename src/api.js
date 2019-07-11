import firebase from "firebase/app";
import "firebase/firestore";
import FIREBASE_CONFIG from "./firebase-config";
firebase.initializeApp(FIREBASE_CONFIG);
export const KANBAN = firebase.firestore().collection("kanban");
export const KANBAN_DELETE = (id) => KANBAN.doc(id).delete();
export const KANBAN_INSERT = (obj) => KANBAN.add(obj);
export const KANBAN_GET = (id) => KANBAN.doc(id).get();