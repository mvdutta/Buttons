const applicationState = {
    clowns: [],
    completions: [],
    requests: []
}
const API = "http://localhost:8088"//application programming interface(API) (the menu)
//whenever this function is run, the requests from the database will be stored in requests in applicationState so we have our own copy b/c applicationState is inside the front end.

const jsonSorter = "?_sort=dateOfParty&_order=asc"

//GET request to retrieve all the service requests from the external database(json file)
export const fetchRequests = () => {//function makes a GET request(retrieve the data). 
    return fetch(`${API}/requests${jsonSorter}`, {
        method: "GET",
    })//called a promise. A promise can either resolve or reject. function given to .then() only runs if the promise is resolved/fulfilled
        .then(response => response.json())//After the data comes back(the response) its going to convert (parse) the data into an ordinary JS array or object b/c data was stored in json. Converting the response into JS array or object. .json() also returns a promise, so need another .then(). Every promise has a .then() method and a .catch() method. Into these, we put in functions. The funtion in .then will run if the promise was successful. the function in .catch() will run if the promise failed.
        .then(
            (serviceRequests) => {//making a new property for the applicationState object called requests and storing the array that we received in this property (called serviceRequests). Now we have access to the external data.
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}



//GET request to retrieve all the clowns from the external database(json file)
export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.clowns = data
            }
        )
}

//GET request to retrieve completions from the external database(json file)
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (completedOrders) => {
                applicationState.completions = completedOrders
            }
        )
}
export const sendRequest = (userServiceRequest) => {//userServiceRequests an object containing all the inputs supplied by the user.
    const fetchOptions = {//creating an object to hold all the extra information that must be sent with the POST request
        method: "POST",//for a POST request, need to specify the nature of the request. Don't need to do this with a GET request.
        headers: {
            "Content-Type": "application/json"//tells the server that we are sending JSON data
        },
        body: JSON.stringify(userServiceRequest)//userServiceRequest is an ordinary JS object and must be converted into json using JSON-stringify() b/c on the server it will be stored as json and json data is in strings
    }

    //next, invoke fetch, which takes 2 arguments
    return fetch(`${API}/requests`, fetchOptions)//now we are sending the POST request by taking all the information inside fetchOptions from above and then giving an address to send the information (API/requests)
        .then(response => response.json())//not expecting to get data back, but the server will still send a response that we need to listen for and make sure it is a "good" response, like a 200 code and not a 404 code, etc
        .then(() => {//if the above instructions went through, then we need to dispatch our event called "stateChanged" to update the DOM
            document.dispatchEvent(new CustomEvent("stateChanged"))

        })
}
const mainContainer = document.querySelector("#container")
export const saveCompletion = (completion) => {
    console.log("about to send")
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion)
    }
    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

//DELETE request: function whose responsiblity it is to initiate the fetch request for DELETE must have the primary key (id) sent to it as an argument:
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                document.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}


///////Helper functions to retrieve parts of applicationState (our own copy of the database)
export const getRequests = () => {//getter function to get the data from applicationState
    return applicationState.requests.map((request) => ({ ...request}))
}
// GET is for retrieving data from the database and POST is for adding new data to the DB. 

export const getClowns = () => {//getter function to get the data from applicationState
    return applicationState.clowns.map((clown) => ({ ...clown}))
}

export const getCompletions = () => {//getter function to get the data from applicationState
    return applicationState.completions.map((completedOrder) => ({ ...completedOrder}))
}