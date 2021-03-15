let firebase = require('./firebase')

exports.handler = async function(event) {
  console.log('hello from the back-end!')
  console.log(event)
  let queryStringUserId = event.queryStringParameters.userId

  let reservationsData = []

  let db = firebase.firestore()
  let querySnapshot = await db.collection('reservations3')
                              .where('userId', '==', queryStringUserId)
                              .get()
  console.log(`Number to reservations in collection: ${querySnapshot.size}`)
  
  
  let reservations = querySnapshot.docs
 //   console.log(user)
// // loop through the post documents
  for (let i=0; i<reservations.length; i++) {
    let reservationId = reservations[i].id                                // the ID for the given post
    let reservationData = reservations[i].data()                          // the rest of the post data
    let equipmentQuery = await db.collection('equipment').doc(reservationsData.EquipmentID)         // likes from Firestore
                             .get()
// might need to do equipmentQuery.data()
// EX: equipmentname: equipmentQuery.data().Equipment

//     // add a new Object of our own creation to the reservationsData Array
    reservationsData.push({
      id: reservationId,                                          
      imageUrl: reservationData.ImageUrl,  // if lives in reservations
      equipmentname: equipmentQuery.Equipment, //if doesn't live in reservations pull from Query                                                   
    })
  }



  return {
    statusCode: 200,
    body: JSON.stringify(userData)
  }
}