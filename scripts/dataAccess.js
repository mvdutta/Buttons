const applicationState = {
    clowns: [],
    completions: [],
    requests: []
}
const API = "http://localhost:8088"//application programming interface(API) (the menu)
//whenever this function is run, the requests from the database will be stored in requests in applicationState so we have our own copy b/c applicationState is inside the front end.

//GET request to retrieve all the service requests from the external database(json file)
export const fetchRequests = () => {//function makes a GET request(retrieve the data). 
    return fetch(`${API}/requests`, {
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