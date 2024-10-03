document.addEventListener("DOMContentLoaded", () => {
    // Get references to buttons and input fields
    const logBtn = document.getElementById('log-button');
    const hiddenBtn = document.getElementById('hidden-button');
    const updateButton = document.getElementById('update-button');
    const saveButton = document.getElementById('save-button');
    const storedDiv = document.querySelector('.stored');

    // Input elements
    const waterInput = document.getElementById('water-input');
    const sleepInput = document.getElementById('sleep-input');
    const socialInput = document.getElementById('social-input');
    const stepsInput = document.getElementById('steps-input');

    // Variables to hold the input values
    let waterAmount = 0;
    let sleepAmount = 0;
    let socialAmounts = 0;
    let stepsAmount = 0;

    // Initial state: hidden
    let visible = false;

    // Toggle visibility of hidden buttons
    logBtn.addEventListener('click', () => {
        visible = !visible;
        hiddenBtn.style.visibility = visible ? 'visible' : 'hidden';
        hiddenBtn.style.opacity = visible ? 1 : 0;
    });

    // Update values on input change and store in localStorage
    waterInput.addEventListener('input', () => {
        waterAmount = parseInt(waterInput.value, 10) || 0;
    });
    sleepInput.addEventListener('input', () => {
        sleepAmount = parseInt(sleepInput.value, 10) || 0;
    });
    socialInput.addEventListener('input', () => {
        socialAmounts = parseInt(socialInput.value, 10) || 0;
    });
    stepsInput.addEventListener('input', () => {
        stepsAmount = parseInt(stepsInput.value, 10) || 0;
    });

    // Add event listener for the "Update Sketch" button
    updateButton.addEventListener('click', () => {
        updateSketch(waterAmount, sleepAmount, socialAmounts, stepsAmount);
    });

    // Save all values and display them when Save Log button is clicked
    saveButton.addEventListener('click', () => {
        // Create a new log entry object
        const logEntry = {
            water: waterAmount,
            sleep: sleepAmount,
            social: socialAmounts,
            steps: stepsAmount,
            date: new Date().toLocaleString(), // Add timestamp to track entries
        };

        // Retrieve existing logs from localStorage or initialize an empty array
        let dailyLogs = JSON.parse(localStorage.getItem('dailyLogs')) || [];

        // Add the new entry to the array
        dailyLogs.push(logEntry);

        // Save the updated array back to local storage
        localStorage.setItem('dailyLogs', JSON.stringify(dailyLogs));

        // Display all saved logs
        displaySavedValues();

        // Optionally reset the sketch or other UI elements
        resetSketch();
    });

    // Function to display saved values from local storage
    function displaySavedValues() {
        // Retrieve all saved logs from local storage
        const savedLogs = JSON.parse(localStorage.getItem('dailyLogs')) || [];

        // Clear existing content in the storedDiv
        storedDiv.innerHTML = '';

        // Reverse the order of logs to display the most recent first
        const reversedLogs = savedLogs.reverse();

        // Iterate through each log and display it
        reversedLogs.forEach((log, index) => {
            storedDiv.innerHTML += `
                <p><strong>Log ${savedLogs.length - index} - ${log.date}</strong></p>
                <p>
                    <span>Water:</span> ${log.water} cups<br>
                    <span>Sleep:</span> ${log.sleep} hours<br>
                    <span>Social:</span> ${log.social} people<br>
                    <span>Steps:</span> ${log.steps}.000 steps<br>
                </p>
                <hr>
            `;
        });
    }

    // Initial display of saved values when the page loads
    displaySavedValues();
});
