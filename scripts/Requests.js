import { getClowns, getCompletions, getRequests, saveCompletion } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests()
    const clowns = getClowns()
    const completions = getCompletions()
    const completedRequestIds = completions.map((completion) => {
        return completion.requestId
    })
    const completedRequests = requests.filter((request) => {
        return completedRequestIds.includes(request.id.toString())//complete requests are the ones whose ids are included in completedRequestIds, which comes from completions
    })
    const incompleteRequests = requests.filter((request) => {
        return !completedRequestIds.includes(request.id.toString())//incomplete ones are the ones that are not included in completions
    })
    let liArrayIncomplete = incompleteRequests.map((request) => {
        return `
        <li class="requests-text" id="${request.id}">
        <div class = "left-area">
            Reservation for ${request.childName} on ${request.dateOfParty} for ${request.lengthOfReservation}
        </div>
        <div class= "middle-area">
        <select class="clowns" id="clowns">
           <option value="">Choose</option>
           ${clowns.map((clown)=>{
             return `<option value="${request.id}--${clown.id}">${clown.name}</option>`
           }).join("")
           }
       </select>
   </div>
        <div class = "right-area" >
          <button class="request__deny" id="request--${request.id}">deny</i></button>
    </div>
        </li>
        `
    })
    let liArrayComplete = completedRequests.map((request) => {
        const completedReservation = completions.find((completion) =>{
            return +completion.requestId === request.id
        }) 
        const clown = clowns.find((clown) => {
            return clown.id === +completedReservation.clownId
        })
        const clownName = clown.name
        return `
        <li class="requests-text" id="${request.id}">
        <div class = "left-area">
            Reservation for ${request.childName} on ${request.dateOfParty} for ${request.lengthOfReservation}
        </div>
        <div class= "middle-area">
        <p>${clownName}</p>
   </div>
        <div class = "right-area" >
          <button class="request__remove" id="request--${request.id}">remove</button>
    </div>
        </li>
        `
    })
    let html = `
    <div class="reservation-area">
    <ul>
        ${liArrayIncomplete.join("")}
        ${liArrayComplete.join("")}
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





/////////JUNK
// const completions = getCompletions()
// console.log(requests)
// console.log(completions)
// const completedRequestIds = completions.map(el=>el.requestId)
// console.log(completedRequestIds)
// const incompletes = requests.filter(el => !completedRequestIds.includes(el.id.toString()))
// const completes = requests.filter(el => completedRequestIds.includes(el.id.toString()))