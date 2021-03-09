// Welcome to your reservations [Insert name], Each piece of equipment reserved with its picture and what gym its from and res start and end date
// Back to home page button, log out button (can we redirect this back to the home page or do we need a 2nd button)
// Pulling from database: based on userID need to pull ReservationID which has all items listed above

let db = firebase.firestore()

window.addEventListener('DOMContentLoaded', async function(event) {

  document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault()
    
    let renterName = document.querySelector('#name').value
    let resStartDate = document.querySelector('#reservationstart').value
    let resEndDate = document.querySelector('#reservationend').value

    if (renterName.length && resStartDate.length && resEndDate.length > 0) {
      
      let docRef = await db.collection('Reservations').add({
        renterName: renterName,
        resStartDate: resStartDate,
        resEndDate: resEndDate
      })

    }

  })
  
})