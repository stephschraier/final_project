// Gym specific name, equipment available (picture and description for each item), 4 per category
// Under each item - input field for name, res start, res end date and reserve me button
// When reserve me button is clicked - item becomes greyed out
// Go to my profile link to get to user profile page
// Back to home page button, log out button (can we redirect this back to the home page or do we need a 2nd button)
// Database write back: Reservation ID and within that "UserID, UserName, Name, Start Date, End Date, EquipmentID, Equipment Name, GymID, Gym Name"

//QUESTIONS: loop is not working, not pulling in the right data though pulls in the array properly


//pull the images in from Firebase from equipment collection
window.addEventListener('DOMContentLoaded', async function(event) {
    let db = firebase.firestore()

   let querySnapshot = await db.collection('Equipment').get()
   let equipmentAvailable = querySnapshot.docs
   console.log (equipmentAvailable)
   
   for (let i=0; i < equipmentAvailable.length; i++){
       let equipmentAvailableID = equipmentAvailable[i].id 
       let equipment = equipmentAvailableID.Equipment
       let equipmentURL = equipmentAvailableID.ImageURL
       console.log(equipmentAvailableID)
       console.log(equipment)
       console.log(equipmentURL)


   }

   //insert the html in the correct spot for the images - how do i put this into the right columns
   document.querySelector('.column1').insertAdjacentHTML ('beforeend',`
        <p class="text-center mt-2">${equipment}</p>
            <p><img class="m-auto border border-gray-300" src="${equipmentURL}"></p>
                <div class="text-center">
                    <form id="rented">
                        <button class="bg-blue-800 hover:bg-blue-600 text-white px-4 py-2 rounded-xl">Reserve This</button>
                    </form>
                </div>
   `)
   
   //when reserve me button is clicked send the ID back to firebase into the reservations collection
   let equipmentRented = document.querySelector(`.rented-${equipmentAvaialbleID}`)
   equipmentRented.addEventListener('click', async function(event) {
       event.preventDefault()
       document.querySelector(`.gym1equip-${equipmentAvailableID}`).classList.add('opacity-20')
       await db.collection('reservations').doc(`${equipmentAvailableID}`).set({})
   }
   )
   
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