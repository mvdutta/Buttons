export const ServiceForm = () => {
    let html = `
     
        <div class="field">
            <label class="label" for="serviceDescription">Parent's Name(s)</label>
            <input type="text" name="serviceDescription" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceAddress">Child's Name</label>
            <input type="text" name="serviceAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceBudget">Number of Children Attending</label>
            <input type="number" name="serviceBudget" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceBudget">Party Address</label>
            <input type="text" name="serviceBudget" class="input" />
        </div>
        <div class="field">
        <label for="type">Length of Party</label>
        <select class="field-area-text" name="potionType" id="type">
         <option value="type">Select Number of Hours</option>
         <option value="oneHour">1 hour</option>
         <option value=twoHour">2 hours</option>
         <option value=threeHour">3 hours</option>
         </select>
        </div>
        <div class="field">
            <label class="label" for="serviceDate">Date of Party</label>
            <input class="field-area-text" type="date" name="serviceDate" class="input" />
        </div>
         
        <button class="button button1" id="submitRequest">Submit Request</button>
    `

    return html
}

{/* <label class="label" for="serviceBudget">Length of Reservation (hours)</label>
<input type="number" name="serviceBudget" class="input" /> */}