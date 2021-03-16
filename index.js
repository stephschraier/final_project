// Title, names and pictures of our gyms, click into each gym which takes us to gym specific page
// Login in/logout button - only on this page, need to login in here to see the gyms
// When logged out says welcome to website, please login to see our gyms and equipment


// let db = firebase.firestore()
// // Change main event listener from DOMContentLoaded to
// // firebase.auth().onAuthStateChanged and move code that
// // shows login UI to only show when signed out

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


    //let querySnapshot = await db.collection('Equipment').get()
    let response = await fetch(`/.netlify/functions/gymAPI`)
    let gymsavailable = await response.json()

    for (let i=0; i < gymsavailable.length; i++){

        let gymavailableID = gymsavailable[i].id 
        //let equipment = equipmentAvailable[i].data()- remove data
        let gym1 = gymsavailable[i]
        console.log(gym1)
        let gymName = gym1.gymname
        let gymimage = gym1.gymimage
    

    document.querySelector('.homepage').insertAdjacentHTML('beforeend', `
            <div class="lg:flex m-auto">
                
            <div class="lg:flex-col m-4 bg-gray-200">
                <p>
                    <h3 class="text-center text-xl font-bold text-gray-700 uppercase">${gymName}</h3>
                </p>
                <p><img class="m-auto border border-gray-300" src="${gymimage}"></p>
                    <div class="text-center mt-6">
                        <a href="gym1equip.html" class="bg-blue-800 hover:bg-blue-600 text-white px-2 py-1 rounded-xl">See Available Equipment</a>
                    </div>
            </div>  
            </div>
                `)}


    //   Sign-out button
      document.querySelector('.sign-in-or-sign-out').innerHTML = `
      <h1> Signed in as ${user.displayName} </h1>
      <button class="sign-out bg-blue-800 hover:bg-blue-600 text-white px-4 py-2 rounded-xlplace-self-center">Sign Out</button>`
      document.querySelector('.sign-out').addEventListener('click', async function(event) {
        console.log('sign out clicked')
        firebase.auth().signOut()
        document.location.href = 'index.html'
      })
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
