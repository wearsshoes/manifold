import * as functions from 'firebase-functions'
import { placeBetLogic } from '.'

const apiFunctions = {
  'place-bet': placeBetLogic,
}

export const apiCall = functions.firestore
  .document('api-calls/{apiCallId}')
  .onCreate(async (snap, context) => {
    const data = snap.data() as any
    console.log('data:', data)

    const apiFunction = apiFunctions[data.name as keyof typeof apiFunctions]
    await apiFunction(data)
  })
