let firebase = require('./firebase')

exports.handler = async function(event) {
  console.log('hello from the back-end!')
  //console.log(event)
  // let queryStringUserId = event.queryStringParameters.userId

  let gymsData = []

  let db = firebase.firestore()
  let querySnapshot = await db.collection('Gym')
                          //   .where('userId', '==', queryStringUserId)
                              .get()
  console.log(`Number of gyms in collection: ${querySnapshot.size}`)
  
  
  let gyms = querySnapshot.docs
 //   console.log(user)

// // loop through the gyms 
  for (let i=0; i<gyms.length; i++) {
    let gymId = gyms[i].id                                // the ID for the given gym
    let gymData = gyms[i].data()                       // the rest of the gym data
    // let equipmentQuery = await db.collection('equipment').doc(reservationsData.EquipmentID)         // likes from Firestore
    //.get()
// might need to do equipmentQuery.data()
// EX: equipmentname: equipmentQuery.data().Equipment

//     // add a new Object of our own creation to the reservationsData Array
    gymsData.push({
      id: gymId,   
      gymname: gymData.Name, 
      gymsafename: gymData.gymSafeName,
      gymimage: gymData.gymImage                                      
      //imageUrl: reservationData.ImageUrl,  // if lives in reservations
      //gymname: gymData.name, //if doesn't live in reservations pull from Query                                                   
    })
  }

  return {
    statusCode: 200,
    body: JSON.stringify(gymsData)
  }
}