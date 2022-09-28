import { deleteRequest, fetchClowns, fetchCompletions, fetchRequests } from "./dataAccess.js"
import { HireAClown } from "./HireAClown.js"


const mainContainer = document.querySelector("#container")
document.addEventListener(
    "stateChanged",//we've added an event listener to listen for the stateChanged event created in DataAcess. Once we here it, we will re-render the DOM by invoking render()
    (customEvent) => {
        render()
    }
)


const render = () => {
    fetchRequests()
    .then(() => fetchClowns())
    .then(() => fetchCompletions())
    .then(() => { 
            mainContainer.innerHTML = HireAClown()
        }
    )
}

render()

//delete button event listener: when user clicks on a delete button, the deleteRequest() function will be invoked with the id of the service request passed in as an argument:

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(+(requestId))
    }
})