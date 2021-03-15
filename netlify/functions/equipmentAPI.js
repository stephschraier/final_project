let firebase = require('./firebase')

exports.handler = async function(event) {
  console.log('hello from the back-end!')
  console.log(event)
  let queryStringUserId = event.queryStringParameters.GymID

  let equipmentsData = []

  let db = firebase.firestore()
  let querySnapshot = await db.collection('Equipment')
                              .where('GymID', '==', queryStringUserId)
                              .get()
  console.log(`Number of equipment in collection: ${querySnapshot.size}`)
  
  
  let equipments = querySnapshot.docs
 //   console.log(user)
// // loop through the post documents
  for (let i=0; i<equipments.length; i++) {
    let equipmentId = equipments[i].id                                // the ID for the given post
    let equipmentData = equipments[i].data()                       // the rest of the post data
    // let equipmentQuery = await db.collection('equipment').doc(reservationsData.EquipmentID)         // likes from Firestore
// might need to do equipmentQuery.data()
// EX: equipmentname: equipmentQuery.data().Equipment

// //     // add a new Object of our own creation to the reservationsData Array EDIT
    equipmentsData.push({
      id: equipmentId,                                          
      imageUrl: equipmentData.ImageUrl,  // if lives in reservations
      equipmentname: equipmentData.Equipment, //if doesn't live in reservations pull from Query
      price: equipmentData.Price,
      gymname: equipmentData.GymName                                                    
    })
  }

  return {
    statusCode: 200,
    body: JSON.stringify(equipmentsData)
  }
}