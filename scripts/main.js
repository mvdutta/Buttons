import { fetchRequests } from "./dataAccess.js"
import { HireAClown } from "./HireAClown.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
    // .then(() => fetchPlumbers())
    // .then(() => fetchCompletions())
    .then(//running fetchRequests which returns a promise so need a .then(). Inside this .then(), telling it to run the function SinkRepair() and store the output of that function in mainContainer which is the DOM
        () => { 
            mainContainer.innerHTML = HireAClown()
        }
    )
}

render()