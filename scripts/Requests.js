import { getClowns, getRequests, saveCompletion } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests()
    const clowns = getClowns()
    console.log(clowns)
    let liArray = requests.map((request) => {
        return `
        <li class="requests-text" id="${request.id}">
        <div class = "left-area">
            Reservation for ${request.childName} on ${request.dateOfParty} for ${request.lengthOfReservation}
        </div>
        <div class = "middle-area">
        <select class="clowns" id="clowns">
           <option value="">Choose</option>
           ${clowns.map((clown)=>{
             return `<option value="${request.id}--${clown.id}">${clown.name}</option>`
           }).join("")
           }
       </select>
   </div>
        <div class = "right-area" >
          <button class="request__deny" id="request--${request.id}">Deny</button>
    </div>
        </li>
        `
    })
    let html = `
    <div class="reservation-area">
    <ul>
        ${liArray.join("")}
    </ul>
    </div>`
    return html;
             
}

const mainContainer = document.querySelector("#container")
mainContainer.addEventListener(
  "change",
  (event) => {
      if (event.target.id === "clowns") {
          const [requestId, clownId] = event.target.value.split("--")

         const currentDate = new Date (Date.now())
         const date_created = currentDate.toISOString().slice(0,10)
          const completion = { //modern JS notation for when the name of the property is the same as the name of the variable holding the value for the property
            requestId,
            clownId,
            date_created,
          }
          
             /* Invoke the function that performs the POST request
              to the `completions` resource for your API. Send the
              completion object as a parameter.
           */
          saveCompletion(completion)
      }
  }
)