

// Assuming formData is your JSON data
document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        pickup: document.getElementById('pickup').value,
        destination: document.getElementById('destination').value
    };

    fetch('/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Set Content-Type to application/json
        },
        body: JSON.stringify(formData) // Convert formData to JSON string
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Log the response data
        // Optionally, you can display a message to the user indicating success or failure
        alert('Booking request sent successfully!');
        resetForm();
    })
    .catch(error => {
        console.error('Error:', error); // Log any errors that occur
        // Optionally, you can display an error message to the user
        alert('An error occurred. Please try again later.');
    });
});


function resetForm() {
    document.getElementById('bookingForm').reset();
}
