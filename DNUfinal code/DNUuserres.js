// Welcome to your reservations [Insert name], Each piece of equipment reserved with its picture and what gym its from and res start and end date
// Back to home page button, log out button (can we redirect this back to the home page or do we need a 2nd button)
// Pulling from database: based on userID need to pull ReservationID which has all items listed above

// API let response = await fetch('/.netlify/functions/reservationsAPI?userID=${user.uid')
// let XYZ = await response.json()


firebase.auth().onAuthStateChanged(async function(user) {

  if (user) {
    // Signed in
    let db = firebase.firestore()
    console.log('signed in')

    // Ensure the signed-in user is in the users collection
    db.collection('Users').doc(user.uid).set({
      name: user.displayName,
      email: user.email
    })

    document.querySelector('.Page-Title').innerHTML = `
    ${user.displayName}'s Reservation
    `

    document.querySelector('.sign-in-or-sign-out').innerHTML = `
    <div class = "text-center">
    <h1 class="text-3xl font-bold text-blue-800 uppercase">${user.displayName}'s Reservations</h1>
    <button class="sign-out bg-blue-800 hover:bg-blue-600 text-white px-4 py-2">Sign Out</button>
    </div>
    `

    document.querySelector('.sign-out').addEventListener('click', async function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'
    })

    let querySnapshot = await db.collection('reservations3').get() 
    //Fetch reservationAPI
    let docRef = querySnapshot.docs 
    
    for (let i=0; i < docRef.length; i++){
        
      let reservationId = docRef[i].id 
      let reservationData = docRef[i].data()
      let reservationURL = reservationData.ImageURL
      let reservationEquipment = reservationData.EquipmentName
      let gymName = reservationData.GymName
      let price = reservationData.Price
      let reservationUser = reservationData.UserID

      if (user.uid == reservationUser) {

        document.querySelector('.column1').insertAdjacentHTML ('beforeend',`

          <div class="lg:flex-col m-4 bg-gray-200 mx-auto">
            <p class="text-center mt-2">${reservationEquipment}</p>
            <p><img class="md:object-scale-down border border-gray-300" src="${reservationURL}"></p>
            <p>
              <ul class="w-full text-center">
                <ul class="mx-auto my-1 p-1 w-72 border border-gray-400 rounded shadow-xl focus:outline-none focus:ring-purple-500 focus:border-purple-500">Gym Name: ${gymName}</ul>
                <ul class="mx-auto my-1 p-1 w-72 border border-gray-400 rounded shadow-xl focus:outline-none focus:ring-purple-500 focus:border-purple-500">Price: ${price}</ul>
              </ul>
            </p>
          </div>
      
        `)

      } else {
      
      }
  
    }
    
  } else {
      // Signed out
      console.log(`signed out`)
  
      // Hide the form when signed-out
      // document.querySelector('form').classList.add('hidden')
  
      // Initializes FirebaseUI Auth
      let ui = new firebaseui.auth.AuthUI(firebase.auth())
  
      // FirebaseUI configuration
      let authUIConfig = {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: 'index.html'
      }
      // Starts FirebaseUI Auth
      ui.start('.sign-in-or-sign-out', authUIConfig)
    }
 
})