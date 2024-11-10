document.addEventListener("DOMContentLoaded", () => {
    const formGroups = document.querySelectorAll(".form-group");
    const submitButton = document.querySelector(".submit-button");

    // Function to validate each input
    function validateInput(input) {
        const errorMessage = input.parentElement.querySelector(".error-message");

        if (input.type === "number" && (input.value === "" || input.value < 0)) {
            errorMessage.style.display = "block";
            return false;
        } else if (input.tagName === "SELECT" && input.value === "") {
            errorMessage.style.display = "block";
            return false;
        } else {
            errorMessage.style.display = "none";
            return true;
        }
    }

    // Validate all inputs on submit
    function validateForm() {
        let isValid = true;
        
        formGroups.forEach(group => {
            const input = group.querySelector("input, select");
            if (input) {
                const valid = validateInput(input);
                if (!valid) isValid = false;
            }
        });

        return isValid;
    }

    // Show success message
    function showSuccessMessage() {
        const container = document.querySelector(".container");
        container.innerHTML = `
            <h1>Thank you!</h1>
            <p>Your environmental sustainability data has been submitted successfully.</p>
        `;
        container.style.textAlign = "center";
    }

    // Handle form submission
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();

        if (validateForm()) {
            showSuccessMessage();
        } else {
            alert("Please fill out all fields correctly before submitting.");
        }
    });

    // Add real-time validation on input change
    formGroups.forEach(group => {
        const input = group.querySelector("input, select");
        if (input) {
            input.addEventListener("input", () => validateInput(input));
        }
    });

    document.getElementById("month").addEventListener("change", () => {
        const month = document.getElementById("month").value;
        const year = document.getElementById("year").value;
        console.log(`Selected Month/Year: ${month} ${year}`);
    });
    document.getElementById("year").addEventListener("change", () => {
        const month = document.getElementById("month").value;
        const year = document.getElementById("year").value;
        console.log(`Selected Month/Year: ${month} ${year}`);
    });

    document.getElementById("submitBtn").addEventListener("click", function() {
        const month = document.getElementById("month").value;
        const year = document.getElementById("year").value;

        // Simple validation to ensure both month and year are selected
        if (month === "" || year === "") {
            alert("Please select both month and year.");
        } else {
            // Redirect to the dashboard page
            window.location.href = "/Frontend/pages/dashboard.html";  
        }
    });    
});
