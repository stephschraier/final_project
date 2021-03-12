// Gym specific name, equipment available (picture and description for each item), 4 per category
// Under each item - input field for name, res start, res end date and reserve me button
// When reserve me button is clicked - item becomes greyed out
// Go to my profile link to get to user profile page
// Back to home page button, log out button (can we redirect this back to the home page or do we need a 2nd button)
// Database write back: Reservation ID and within that "UserID, Name, EquipmentID, Equipment Name, GymID, Gym Name, ImageURL"

//TODO: Add in sign out button, add in link to reservations page, confirm grey out is persistent
// Add data Scott needs - fix user name and email


//pull the images in from Firebase from equipment collection
window.addEventListener('DOMContentLoaded', async function(event) {
    let db = firebase.firestore()

   let querySnapshot = await db.collection('Equipment').get()
   let equipmentAvailable = querySnapshot.docs
   console.log (equipmentAvailable)
   
   for (let i=0; i < equipmentAvailable.length; i++){
       let equipmentAvailableID = equipmentAvailable[i].id 
       let equipment = equipmentAvailable[i].data()
       let equipmentName = equipment.Equipment
       let equipmentURL = equipment.ImageURL
       let gymName = equipment.GymName
       let price = equipment.Price
       //this is the section to persist opacity, needs sign in code to work
        let docRef = await db.collection('reservations').doc(`${equipmentAvailableID}`).get()
        let reservedEquip = docRef.data()
        let opacityClass = ''
        if (reservedEquip) {
        opacityClass = 'opacity-20'}
        

   //insert the html in the correct spot for the images
   document.querySelector('.column1').insertAdjacentHTML ('beforeend',`
        <div>
            <div class="text-center text-sm mt-2">${equipmentName}</div>
            <div><img class="m-auto border border-gray-300" src="${equipmentURL}"></div>
            <div class="button-${equipmentAvailableID} text-center">
                <form id="rented">
                    <button class="rental bg-blue-800 hover:bg-blue-600 text-white px-4 py-2 rounded-xl">Reserve This</button>
                </form>
            </div>
        </div>
   `)
  //when reserve me button is clicked send the ID back to firebase into the reservations collection - update to correct res collection
//---
    let equipmentRented = document.querySelector(`.button-${equipmentAvailableID}`)
    equipmentRented.addEventListener('click', async function(event) {
      event.preventDefault()
      document.querySelector(`.button-${equipmentAvailableID}`).classList.add('opacity-20')
      await db.collection('reservations3').add({
        // Name: user.displayName,
        // Email: user.email,
        EquipmentID: equipmentAvailableID,
        EquipmentName: equipmentName,
        ImageURL: equipmentURL,
        Price: price,
        GymName: gymName
        
      })
      
 }
 )
 //---
}
   
 

    
   
   //old from when we used a form not a button
    // document.querySelector('form').addEventListener('submit', async function(event) {
    // event.preventDefault()
    
    // let renterName = document.querySelector('#name').value
    // let resStartDate = document.querySelector('#reservationstart').value
    // let resEndDate = document.querySelector('#reservationend').value

    // if (renterName.length && resStartDate.length && resEndDate.length > 0) {
    //     let docRef = await db.collection('Reservations').add({
    //       renterName: renterName,
    //       resStartDate: resStartDate,
    //       resEndDate: resEndDate
    //     })
    //   }

    // })
})