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

    document.querySelector('.homepage').insertAdjacentHTML('beforeend', `
            <div class="lg:flex m-auto">
                
            <div class="lg:flex-col m-4 w-1/3 bg-gray-200">
                <p>
                    <h3 class="text-center text-xl font-bold text-gray-700 uppercase">Equinox</h3>
                </p>
                <p class="text-center mt-2">Located in Old Town</p>
                <p><img class="mt-8 m-auto border border-gray-300" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEUAAAD////19fWvr6/Ly8thYWFOTk6CgoLT09Ph4eHW1taLi4v5+fnIyMicnJwxMTG4uLjAwMArKyvp6emUlJQ8PDwmJiYZGRl3d3doaGipqanj4+NaWloUFBSFhYXv7+9tbW0LCwtISEg3Nzd5eXlTU1MuLi5DQ0PTsZi7AAAEHklEQVR4nO3Ya3fiKhSA4cRajSbe6m20tt7b//8PRzYkhg3RzrFn1pqu9/lUAiXsADvEJAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMBf0cnaV1kn0mKRZ9s0nQ5+RepOl/9+qkr5pbTWTeaXi9leXTQtx1VpdSkNIr0/j3tpWvSHn7piPzGD3ZXFtSkNIx3YXtK657DBuigrW+9B5fBy+bUqPV1Kfd2kY/5VXzQt0+phvF8KRdD3plcN603X7eTyyBa65u8iaPPFCJev9ergQZsIe/81wnSVXIfYinXtnMJhSwf2zi9NcxONcKVqFy2vOhj/YxEWtUnQEa6vNzXLea1HJhMsG0TmoHGNugjzrvU+ivWT9oa703pa3e3bIiwXeCTCk30E4+5uNrls4k1avPgNRrJ5dkkyjj35IMJFQ2Uu93EpZiaF83dG6B5YGOFe1s6kTFD7bbhDfskj2NsdubwXoZ660tZ0Mi9L0lnmNXg0wlSSVxjhsFqDQuZJ53npo1/ENpfn1hw+V2Oo3chbLY9EuJUQD0kswmlaz9HJwQ/YqZJgUBNGMcst9Tow46hn8UVtzT4e4UAmahuN0NR0a+WBdx9n7gIMKnxeLlUvpbbZC/UL5rF7r/RHIsySzFS1IxFu9GLJY52U6agpizhehCqh9VOVPDO9JB6LcCkLdRZGaLJIUc8eq2iEMtU386hxaw4zPYe9751DW5eeTzrClU4Op2iEmR317GaANsL2wJr4dWO3TyqmbV6/EEbo59rkdoR29RW5jlA2fD1BmpFMdSfVqeesa8IIG14ncuDbXMvyRpzXW5ixXU+EZlUHB7ubESaT+AYp7AYtvbX0filHLi+LrT7Yh+0a3ofL1Ht0cox49Vp81lfJIbpkbkeYTKMRyrvumrUnek4NCe5ksmz4WOskwo+GSnu+dRuiI+cMdQqWXGFPvTZvHP8wwkU0wqOZmWptyHtYvxNkE47dCPKkmUTY+RhZOvHaL6d1Z/GykdsE95GFnD4dFseZPWgFN7gToUv5Oo2vZXctTx+L+cxO88ZvMCvX11lqD3cirOjTwSb16fNvlc/K+nBH34vQneD0t0XPfC1Mrj2r1W+z8KcX65ciDL7QV171NliD5eeHE3yNfyFCSVDh92Fiv4wd/XUkC8atTXnIzVvxToTJsX+tjfcyqOp780j1/QjfiniE86rjrc4yXn6xCaCr/z0eYewMu3IhvMbGL13YBr3Ip3ji9om+aDb1dUs/x5pcHq77Ju0Hv57IwmxV7wgbQ+w3pq9yT2GwMtkt+u4ZnZvCf9DnObIx/gcb92NG0Wrd/lL5dy3bbhm377f9V23uZKyf4JiPf+oSBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICf4zfONSdqoTvCvAAAAABJRU5ErkJggg=="></p>
                    <div class="text-center">
                        <form id="rented">
                        <a href="gym1equip.html" class="bg-blue-800 hover:bg-blue-600 text-white px-2 py-1 rounded-xl">See Available Equipment</a>
                        </form>
                    </div>
            </div> 

            <div class="lg:flex-col m-4 w-1/3 bg-gray-200">
                <p>
                    <h3 class="text-center text-xl font-bold text-gray-700 uppercase">East Bank Club</h3>
                </p>
                <p class="text-center mt-2">Located in River North</p>
                <p><img class="mt-8 m-auto border border-gray-300" src="data:image/jpeg;base64,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gnMpfRSe47wTpYeR1E/BZD4wMK9ei+94J8YGFevRfe8FW/mUvopPcd4JzKX0UnuO8E6WHkdRPwWQ+MDCvXovveCfGBhXr0X3vBVv5lL6KT3HeCcyl9FJ7jvBOlh5HUT8FkPjAwr16L73gnxgYV69F97wVb+ZS+ik9x3gnMpfRSe4/wAE6WHkdTPwWJqc5eExi/Ow7oYyVx7mrVsZz0QtBFHSvedmlKQxvWGtuT1GyiOHCqiQ2ZTzuPBscjj3BbBhebjFKgi1KY2n50rmxgfy+d3LvwVR5Zz5rJcIx2UmVVZiLr1MxLQbtjb5MTTxDOPSbnpX3JbJWqxOTQp2eQD8pI64jZ1nefqjX/VSjk5mcgjIfXSmZw18my7I79LvOd3KS6KjjgY2KGNjI2izWsAa0DoAXJ6mMViCOxolJ5mYbI7JODC4eThGk91jLIQNKQ/k0bm7uk3J2BEWJtt5ZrSSWEERFw6EREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREB//2Q=="></p>
                <div class="text-center">
                    <form id="rented">
                    <a href="gym2equip.html" class="bg-blue-800 hover:bg-blue-600 text-white px-2 py-1 rounded-xl">See Available Equipment</a>
                    </form>
                </div>
            </div> 

            <div class="lg:flex-col m-4 w-1/3 bg-gray-200">
                <p>
                    <h3 class="text-center text-xl font-bold text-gray-700 uppercase">Barry's Bootcamp</h3>
                </p>
                <p class="text-center mt-2">Located in Lincoln Park</p>
                <p><img class="mt-8 m-auto border border-gray-300" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtGyXzg2xtMDRbNRLCpkpK17O1iMUfLiE3ZQ&usqp=CAU"></p>
                <div class="text-center">
                    <form id="rented">
                    <a href="gymp3equip.html" class="bg-blue-800 hover:bg-blue-600 text-white px-2 py-1 rounded-xl">See Available Equipment</a>
                    </form>
                </div>
            </div> 
            </div> 
            </div>
                `)
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
