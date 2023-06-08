// Set up global variables
const apiKey = '&appid=b70af7fc1ba7289283a69d99fe89d592&units=imperial';
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const d = new Date();
const currentDate = d.toDateString();

// Add event listener to the Generate button
document.getElementById('generate').addEventListener('click', generateData);

// Function to generate data and post to the server
function generateData() {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    // Get weather information based on the zip code
    getWeatherData(weatherUrl, zipCode, apiKey).then(function(data) {
        // Post data to server
        postProjectData('http://localhost:4800/addData', {
            date: currentDate,
            temp: data.main.temp,
            feelings: feelings 
        }).then(() => {
            updateUI();
        }).catch((error) => {
            console.error("Error while posting data to the server", error);
        });
    }).catch((error) => {
        console.error("Error while fetching weather data from OpenWeatherMap API", error);
    });
}

// Function to get weather information based on zip code
const getWeatherData = async (url, zip, apiKey) => {
    try {
        const response = await fetch(`${url}${zip}${apiKey}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Error while fetching weather data from OpenWeatherMap API");
        }
    } catch(error) {
        throw error;
    }
};

// Function to post data to the server
const postProjectData = async (url = "", data = {}) => {
    try {
        const Postresponse = await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            // Converts object to JSON string
            body: JSON.stringify(data)      
        });
        const newDataAdded = await Postresponse.json();
        return newDataAdded;
    } catch (error) {
        console.log("Error while posting data to the server", error);
        // appropriately handle the error
    }
};


// Function to update the user interface with data from the server
const updateUI = async () => {
    try {
        const response = await fetch('/all');
        if (response.ok) {
            const allData = await response.json();
            const latestEntry = allData[allData.length - 1];
            // Write updated data to DOM elements
            document.getElementById('date').innerHTML = `Date: ${latestEntry.date}`;
            document.getElementById('temp').innerHTML = `Temperature: ${Math.round(latestEntry.temp)} degrees`;
            document.getElementById('content').innerHTML = `Feeling: ${latestEntry.feelings}`;
        } else {
            throw new Error("Error while fetching data from the server");
        }
    } catch(error) {
        console.error("Error while updating the user interface", error);
    }
};

