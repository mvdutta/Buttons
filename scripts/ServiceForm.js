import { sendRequest } from "./dataAccess.js"

export const ServiceForm = () => {
    let html = `
     
        <div class="field">
            <label class="label" for="serviceDescription">Parent's Name(s)</label>
            <input type="text" name="parentName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceAddress">Child's Name</label>
            <input type="text" name="childName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceBudget">Number of Children Attending</label>
            <input type="number" name="numOfChildren" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceBudget">Party Address</label>
            <input type="text" name="address" class="input" />
        </div>
        <div class="field">
        <label for="type">Length of Party</label>
        <select class="field-area-text" name="reservation" id="type">
         <option value="type">Select Number of Hours</option>
         <option value="1 hour">1 hour</option>
         <option value="2 hours">2 hours</option>
         <option value="3 hours">3 hours</option>
         </select>
        </div>
        <div class="field">
            <label class="label" for="serviceDate">Date of Party</label>
            <input class="field-area-text" type="date" name="partyDate" class="input" />
        </div>
         
        <button class="button button1" id="submitRequest">Submit Request</button>
    `

    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const parentName = document.querySelector("input[name='parentName']").value//the infomation the user entered
        const childName = document.querySelector("input[name='childName']").value
        const numberOfChildren = document.querySelector("input[name='numOfChildren']").value
        const address = document.querySelector("input[name='address']").value
        const dateOfParty = document.querySelector("input[name='partyDate']").value
        const lengthOfReservation = document.querySelector("select[name='reservation']").value   

        // Make an object out of the user input
        const userRequest = {
            parentName: parentName,
            childName: childName,
            numberOfChildren: numberOfChildren,
            address: address,
            dateOfParty: dateOfParty,
            lengthOfReservation: lengthOfReservation           
        }

        // Send the data to the API for permanent storage
        sendRequest(userRequest)
    }
})
  