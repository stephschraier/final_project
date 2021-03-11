// Gym specific name, equipment available (picture and description for each item), 4 per category
// Under each item - input field for name, res start, res end date and reserve me button
// When reserve me button is clicked - item becomes greyed out
// Go to my profile link to get to user profile page
// Back to home page button, log out button (can we redirect this back to the home page or do we need a 2nd button)
// Database write back: Reservation ID and within that "UserID, Name, EquipmentID, Equipment Name, GymID, Gym Name, ImageURL"

//TODO: Add in sign out button, add in link to reservations page, confirm grey out is persistent, create shell for 2 and 3 w/ 1 piece
// Add data Scott needs - fix user name and email


//pull the images in from Firebase from equipment collection
window.addEventListener('DOMContentLoaded', async function(event) {
    let db = firebase.firestore()

   let querySnapshot = await db.collection('Equipment3').get()
   let equipmentAvailable3 = querySnapshot.docs
   console.log (equipmentAvailable3)
   
   for (let i=0; i < equipmentAvailable.length; i++){
       let equipmentAvailableID3 = equipmentAvailable3[i].id 
       let equipment3 = equipmentAvailable3[i].data()
       let equipmentName3 = equipment3.Equipment
       let equipmentURL3 = equipment3.ImageURL
       let gymName3 = equipment3.GymName
       let price3 = equipment3.Price
       console.log(equipmentAvailableID3)
       console.log(equipmentName3)
       console.log(equipmentURL3)
       console.log(gymName3)
       console.log(price3)
   

   //insert the html in the correct spot for the images
   document.querySelector('.column3').insertAdjacentHTML ('beforeend',`
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