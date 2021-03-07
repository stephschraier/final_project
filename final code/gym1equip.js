// Gym specific name, equipment available (picture and description for each item), 4 per category
// Under each item - input field for name, res start, res end date and reserve me button
// When reserve me button is clicked - item becomes greyed out
// Go to my profile link to get to user profile page
// Back to home page button, log out button (can we redirect this back to the home page or do we need a 2nd button)
// Database write back: Reservation ID and within that "UserID, UserName, Name, Start Date, End Date, EquipmentID, Equipment Name, GymID, Gym Name"

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