import firebase from 'firebase'

// Register user in firebase
export const signUp = async (user) => {
  try {
    const response = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    return response
  } catch (error) {
    return error
  }
}

// Sign In user with firebase
export const signIn = async (user) => {
  try {
    const response = await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    return response
  } catch (error) {
    return error
  }
}

// Log out user from firebase
export const signOut = async () => {
  try {
    const response = await firebase.auth().signOut()
    return response
  } catch (error) {
    return error
  }
}