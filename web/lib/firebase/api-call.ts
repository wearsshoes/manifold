import { app } from './init'
import { doc, collection, getFirestore, setDoc } from 'firebase/firestore'

const db = getFirestore(app)

export async function apiCall(apiCallDoc: any) {
  const apiCallRef = doc(collection(db, 'api-calls'))
  await setDoc(apiCallRef, apiCallDoc)
}
