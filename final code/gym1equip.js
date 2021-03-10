// Gym specific name, equipment available (picture and description for each item), 4 per category
// Under each item - input field for name, res start, res end date and reserve me button
// When reserve me button is clicked - item becomes greyed out
// Go to my profile link to get to user profile page
// Back to home page button, log out button (can we redirect this back to the home page or do we need a 2nd button)
// Database write back: Reservation ID and within that "UserID, UserName, Name, Start Date, End Date, EquipmentID, Equipment Name, GymID, Gym Name"

//QUESTIONS: loop is not working, not pulling in the right data though pulls in the array properly



window.addEventListener('DOMContentLoaded', async function(event) {
    let db = firebase.firestore()

   let querySnapshot = await db.collection('equipment').get()
   let equipmentAvailable = querySnapshot.docs
   console.log (equipmentAvailable)
   
   for (let i=0; i < equipmentAvailable.length; i++){
       let equipmentAvailableID = equipmentAvailable[i].id 
       let equipment = equipmentAvailable[i].equipment
       let equipmentURL = equipmentAvailable[i].ImageURL
       console.log(equipment)


   }

   document.querySelector('gym1equip').insertAdjacentHTML ('beforeend',`
        <p class="text-center mt-2">${equipment}</p>
            <p><img class="m-auto border border-gray-300" src="${equipmentURL}"></p>
                <div class="text-center">
                    <form>
                        <button class="bg-blue-800 hover:bg-blue-600 text-white px-4 py-2 rounded-xl">Reserve This</button>
                    </form>
                </div>
   `)
   
   let equipmentRented = document.querySelector(`.gym1equip-${equipmentAvaialbleID}`)
   movieLink.addEventListener('click', async function(event) {
       event.preventDefault()
       document.querySelector(`.gym1equip-${equipmentAvailableID}`).classList.add('opacity-20')
       await db.collection('reservations').doc(`${equipmentAvailableID}`).set({})
   }
   )
   
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