// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
// TODO: Add Firebase Cloud Messaging (FCM) if needed later
// import { getMessaging } from "firebase/messaging";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
const storage = getStorage(app)
// TODO: Initialize Messaging if needed later
// const messaging = getMessaging(app);

// Firestore Operations
export const addDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data)
    console.log(`Document written with ID: ${docRef.id} to collection: ${collectionName}`)
    return docRef.id
  } catch (e) {
    console.error("Error adding document: ", e)
    throw e
  }
}

export const getDocuments = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName))
    const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    console.log(`Fetched ${documents.length} documents from ${collectionName}`)
    return documents
  } catch (e) {
    console.error("Error getting documents: ", e)
    throw e
  }
}

export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    await updateDoc(doc(db, collectionName, docId), data)
    console.log(`Document ${docId} in ${collectionName} updated successfully.`)
  } catch (e) {
    console.error("Error updating document: ", e)
    throw e
  }
}

export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    await deleteDoc(doc(db, collectionName, docId))
    console.log(`Document ${docId} in ${collectionName} deleted successfully.`)
  } catch (e) {
    console.error("Error deleting document: ", e)
    throw e
  }
}

// Firebase Storage Operations
export const uploadFile = async (path: string, file: File): Promise<string> => {
  try {
    const storageRef = ref(storage, path)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    console.log(`File uploaded to ${path}, URL: ${downloadURL}`)
    return downloadURL
  } catch (e) {
    console.error("Error uploading file: ", e)
    throw e
  }
}

// Firebase Cloud Messaging (FCM) Placeholder - requires server-side implementation for sending
export const sendPushNotification = async (message: { title: string; body: string; imageUrl?: string }) => {
  console.log(`[FCM Placeholder] Sending push notification:`, message)
  // In a real app, this would typically involve calling a backend API route
  // that uses Firebase Admin SDK to send FCM messages.
  // For now, it's a client-side mock.
  return { success: true, message: "Mock notification sent" }
}
