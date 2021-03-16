// API url to this lambda funtion: /.netlify/functions/like
let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()

    let body = JSON.parse(event.body)
    let equipmentID = body.EquipmentID
    let userId = body.UserID
    let EquipmentName = body.EquipmentName
    let ImageURL = body.ImageURL
    let Price = body.Price
    let GymName = body.GymName
    let GymID = body.GymID

  let querySnapshot = await db.collection('reservations3')
                              .where('EquipmentID', '==', equipmentID)
                              .where('UserID', '==', userId)
                              .where('GymID', '==', GymID)
                              .get()
  let existingReservation = querySnapshot.size

  if (existingReservation == 0) {
    await db.collection('reservations3').doc(`${GymID}-${equipmentID}-${userId}`).set({
      EquipmentID: equipmentID,
      EquipmentName: EquipmentName,
      ImageURL: ImageURL,
      Price: Price,
      GymName: GymName,
      GymID: GymID,
      UserID: userId
    })

    return {
        statusCode: 200,
        body: JSON.stringify({success: true})
      }
    } else {
      return {
        statusCode: 403,
        body: JSON.stringify({success: false, error: 'user already liked post'})
      }
    }
  
  }