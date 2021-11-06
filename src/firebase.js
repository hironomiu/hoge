import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_DATABASE_URL,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
} = process.env

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
}

firebase.initializeApp(firebaseConfig)

export const githubProvider = new firebase.auth.GithubAuthProvider()

export const socialMediaAuth = async (provider) => {
  const auth = firebase.auth()
  // return firebase
  // .auth()
  const data = auth.signInWithPopup(provider)
  return data
    .then((res) => {
      return res.user
    })
    .catch((er) => {
      return er
    })
}

const database = firebase.database()
export const messagesRef = database.ref('messages')
export const pushMessage = ({ name, text }) => messagesRef.push({ name, text })
export const deleteMessage = (key) => database.ref('messages/' + key).remove()
export const updateMessage = (key, message) => {
  let update = {}
  update['/messages/' + key] = message
  database.ref().update(update)
}
