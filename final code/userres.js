// Welcome to your reservations [Insert name], Each piece of equipment reserved with its picture and what gym its from and res start and end date
// Back to home page button, log out button (can we redirect this back to the home page or do we need a 2nd button)
// Pulling from database: based on userID need to pull ReservationID which has all items listed above



window.addEventListener('DOMContentLoaded', async function(event) {

let db = firebase.firestore()

let querySnapshot = await db.collection('Reservations').get()
let docRef = querySnapshot.docs
// console.log (docRef)
 
 for (let i=0; i < docRef.length; i++){
     let reservationId = docRef[i].id 
     let reservationData = docRef[i].data()

  }

//   //insert the html in the correct spot for the images - how do i put this into the right columns
//   document.querySelector('.column1').insertAdjacentHTML ('beforeend',`
//     <div class="lg:flex-col m-4 w-1/4 bg-gray-200">
//       <p class="text-center mt-2">Treadmill</p>
//       <p><img class="m-auto border border-gray-300" src="https://cdn.webshopapp.com/shops/281654/files/282878529/treadmill-fitrun-40i.jpg"></p>
//       <p>
//         <ul class="w-full text-center">
//           <ul class="mx-auto my-1 p-1 w-72 border border-gray-400 rounded shadow-xl focus:outline-none focus:ring-purple-500 focus:border-purple-500">Equipment 1</ul>
//           <ul class="mx-auto my-1 p-1 w-72 border border-gray-400 rounded shadow-xl focus:outline-none focus:ring-purple-500 focus:border-purple-500">Price: $0.00</ul>
//           <ul class="mx-auto my-1 p-1 w-72 border border-gray-400 rounded shadow-xl focus:outline-none focus:ring-purple-500 focus:border-purple-500">Reservation Start Date: 0/0/0000</ul>
//           <ul class="mx-auto my-1 p-1 w-72 border border-gray-400 rounded shadow-xl focus:outline-none focus:ring-purple-500 focus:border-purple-500">Reservation End Date: 0/0/0000</ul>
//         </ul>
//       </p>
//     </div>

//   `)
 
 //when reserve me button is clicked send the ID back to firebase into the reservations collection
//  let equipmentRented = document.querySelector(`.rented-${equipmentAvaialbleID}`)

//   equipmentRented.addEventListener('click', async function(event) {

//     event.preventDefault()
//     document.querySelector(`.gym1equip-${equipmentAvailableID}`).classList.add('opacity-20')
//     await db.collection('reservations').doc(`${equipmentAvailableID}`).set({})

  // })

})