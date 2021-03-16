// Gym specific name, equipment available (picture and description for each item), 4 per category
// Under each item - input field for name, res start, res end date and reserve me button
// When reserve me button is clicked - item becomes greyed out
// Go to my profile link to get to user profile page
// Back to home page button, log out button (can we redirect this back to the home page or do we need a 2nd button)
// Database write back: Reservation ID and within that "UserID, Name, EquipmentID, Equipment Name, GymID, Gym Name, ImageURL"

//TODO: Add in sign out button, add in link to reservations page, confirm grey out is persistent, create shell for 2 and 3 w/ 1 piece
// Add data Scott needs - fix user name and email


//pull the images in from Firebase from equipment collection
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

        document.querySelector('.sign-in-or-sign-out').innerHTML = `
        <div class = "text-center">
        <h1 class="text-3xl font-bold text-blue-800 uppercase">Welcome to Equinox, ${user.displayName}</h1>
        <button class="sign-out bg-blue-800 hover:bg-blue-600 text-white px-4 py-2">Sign Out</button>
        </div>
        `

        document.querySelector('.sign-out').addEventListener('click', async function(event) {
            console.log('sign out clicked')
            firebase.auth().signOut()
            document.location.href = 'index.html'
        })

        // let querySnapshot = await db.collection('Equipment').get()
        // let equipmentAvailable = querySnapshot.docs
        // console.log (equipmentAvailable)
        
        // for (let i=0; i < equipmentAvailable.length; i++){
        //     let equipmentAvailableID = equipmentAvailable[i].id 
        //     let equipment = equipmentAvailable[i].data()
        //     let equipmentName = equipment.Equipment
        //     let equipmentURL = equipment.ImageURL
        //     let gymName = equipment.GymName
        //     let gymID = equipment.GymID
        //     let price = equipment.Price

          //let querySnapshot = await db.collection('Equipment').get()
          let response = await fetch(`/.netlify/functions/equipmentAPI?GymID=lRQeq68w9mTWoYqR9stW`)
          //UPDATE make dynamic gym
          let equipmentAvailable = await response.json()
         // let equipmentAvailable = querySnapshot.docs
      
          for (let i=0; i < equipmentAvailable.length; i++){
  
              let equipmentAvailableID = equipmentAvailable[i].id 
              //let equipment = equipmentAvailable[i].data()- remove data
              let equipment = equipmentAvailable[i]
              console.log(equipment)
              let equipmentName = equipment.equipmentname
              let equipmentURL = equipment.imageUrl 
              let gymName = equipment.gymname
              let gymID = equipment.gymid
              let price = equipment.price
              //console.log(gymID)

            //this is the section to persist opacity, needs sign in code to work

            // let docRef = await db.collection('reservations3').doc(`${equipmentAvailableID2}`).get()
            // let reservedEquip = docRef.data()
            // let opacityClass = ''
            // if (reservedEquip) {
            // opacityClass = 'opacity-20'}
   

            //insert the html in the correct spot for the images
            if (gymID == 'lRQeq68w9mTWoYqR9stW') {
            document.querySelector('.gym2').insertAdjacentHTML ('beforeend',`
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
            let equipmentRented = document.querySelector(`.button-${equipmentAvailableID}`)
            equipmentRented.addEventListener('click', async function(event) {
            event.preventDefault()
            document.querySelector(`.button-${equipmentAvailableID}`).classList.add('opacity-20')
            // await db.collection('reservations3').add({
            //     // Name: user.displayName,
            //     // Email: user.email,
            //     EquipmentID: equipmentAvailableID,
            //     EquipmentName: equipmentName,
            //     ImageURL: equipmentURL,
            //     Price: price,
            //     GymName: gymName,
            //     GymID: gymID,
            //     UserID: user.uid
            
            // })

            let response = await fetch('/.netlify/functions/createReservationAPI', {
                method: 'POST',
                body: JSON.stringify({
                    EquipmentID: equipmentAvailableID,
                    EquipmentName: equipmentName,
                    ImageURL: equipmentURL,
                    Price: price,
                    GymName: gymName,
                    GymID: gymID,
                    UserID: user.uid,
                })
            })
      
        })
    } else {}

}
 
    

} else {
    // Signed out
    console.log(`signed out`)

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