let firebase = require('./firebase')

exports.handler = async function(event) {
  console.log('hello from the back-end!')
  let data = [] // sample only...
  let db = firebase.firestore()
  let querySnapshot = await db.collection('Users').get()
  console.log(`Number of Users: ${querySnapshot.size}`)

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}