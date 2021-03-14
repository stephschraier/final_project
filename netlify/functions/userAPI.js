let firebase = require('./firebase')

exports.handler = async function(event) {
  console.log('hello from the back-end!')

  let userData = [] 
  
  let db = firebase.firestore()
  let querySnapshot = await db.collection('Users').get()
  console.log(`Number of Users: ${querySnapshot.size}`)

  let users = querySnapshot.docs
  for (let i = 0; i < users.length; i++){
    let userID = users[i].id
    let user = users[i].data()
    //console.log(user)

    userData.push({
      id: userID,
      text: user.text
    })
  }

  return {
    statusCode: 200,
    body: JSON.stringify(userData)
  }
}