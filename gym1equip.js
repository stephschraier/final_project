// Gym specific name, equipment available (picture and description for each item), 4 per category
// Under each item - input field for name, res start, res end date and reserve me button
// When reserve me button is clicked - item becomes greyed out
// Go to my profile link to get to user profile page
// Back to home page button, log out button (can we redirect this back to the home page or do we need a 2nd button)
// Database write back: Reservation ID and within that "UserID, Name, EquipmentID, Equipment Name, GymID, Gym Name, ImageURL"

//TODO: Add in sign out button, add in link to reservations page, confirm grey out is persistent
// Add data Scott needs - fix user name and email


//pull the images in from Firebase from equipment collection


// API let response = await fetch('/.netlify/functions/reservationsAPI?userID=${user.uid') CHANGE TO GYM ID
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

        //let querySnapshot = await db.collection('Equipment').get()
        let response = await fetch(`/.netlify/functions/equipmentAPI?GymID=eqOdxleqeNWnFmXkICTk`)
        //make dynamic gym
        let equipmentAvailable = await response.json()
       // let equipmentAvailable = querySnapshot.docs
    
        for (let i=0; i < equipmentAvailable.length; i++){

            let equipmentAvailableID = equipmentAvailable[i].id 
            //let equipment = equipmentAvailable[i].data()- remove data
            let equipment = equipmentAvailable[i]
            console.log(equipment)
            let equipmentName = equipment.equipmentname
            // let equipmentURL = equipment.ImageURL UPDATE
            let gymName = equipment.gymname
           // let gymID = equipment.GymID UDPATE
            let price = equipment.price
            console.log(gymID)
                    
            //insert the html in the correct spot for the images
            if (gymID == 'eqOdxleqeNWnFmXkICTk'){
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

            let equipmentRented = document.querySelector(`.button-${equipmentAvailableID}`)
            equipmentRented.addEventListener('click', async function(event) {
                event.preventDefault()
                document.querySelector(`.button-${equipmentAvailableID}`).classList.add('opacity-20')
                

             //create reservation    
                await db.collection('reservations3').add({
                    EquipmentID: equipmentAvailableID,
                    EquipmentName: equipmentName,
                    ImageURL: equipmentURL,
                    Price: price,
                    GymName: gymName,
                    GymID: gymID,
                    UserID: user.uid
                    
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