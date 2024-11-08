document.addEventListener("DOMContentLoaded", function () {
    // Auto-generate a unique ticket number on page load
    const ticketNumberField = document.getElementById("ticketNumber");
    ticketNumberField.value = "TCKT-" + new Date().getTime();

    // Form validation
    const form = document.getElementById("ticketForm");
    form.addEventListener("submit", function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add("was-validated");
    }, false);

    // Optional: Additional save button logic
    document.getElementById("saveButton").addEventListener("click", function () {
        alert("Form data saved successfully!");
    });

    // Model dropdown filter functionality
    const modelInput = document.getElementById("model");
    const modelDropdown = document.getElementById("modelDropdown");

    // List of Maruti Suzuki car models with variants launched from 2020 onwards
    const carModels = [
        "Alto 800 Petrol",
        "Alto 800 CNG",
        "S-Presso Petrol",
        "S-Presso CNG",
        "Celerio Petrol",
        "Celerio CNG",
        "Wagon R Petrol",
        "Wagon R CNG",
        "Swift Petrol",
        "Swift Diesel",
        "Dzire Petrol",
        "Dzire CNG",
        "Dzire Diesel",
        "Baleno Petrol",
        "Baleno Diesel",
        "Baleno Hybrid",
        "Ignis Petrol",
        "Ciaz Petrol",
        "Ciaz Diesel",
        "Ciaz Hybrid",
        "Ertiga Petrol",
        "Ertiga CNG",
        "Ertiga Diesel",
        "XL6 Petrol",
        "Vitara Brezza Petrol",
        "Vitara Brezza Diesel",
        "S-Cross Petrol",
        "S-Cross Diesel",
        "Jimny Petrol",
        "Fronx Petrol",
        "Fronx CNG",
        "Grand Vitara Petrol",
        "Grand Vitara Hybrid",
        "Grand Vitara Diesel"
    ];

    // Function to filter and display dropdown options (limit to 10 results)
    function filterModels() {
        const query = modelInput.value.toLowerCase();
        modelDropdown.innerHTML = ""; // Clear any existing options
        modelDropdown.style.display = "none"; // Hide by default

        if (query.length > 0) {
            const filteredModels = carModels.filter(model =>
                model.toLowerCase().includes(query)
            ).slice(0, 10); // Limit to 10 results

            if (filteredModels.length > 0) {
                modelDropdown.style.display = "block";
                filteredModels.forEach(model => {
                    const li = document.createElement("li");
                    li.textContent = model;
                    li.addEventListener("click", function () {
                        modelInput.value = model;
                        modelDropdown.style.display = "none"; // Hide dropdown on selection
                    });
                    modelDropdown.appendChild(li);
                });
            }
        }
    }

    // Event listeners for input and focus/blur events
    modelInput.addEventListener("input", filterModels);

    document.addEventListener("click", function (event) {
        if (!modelInput.contains(event.target) && !modelDropdown.contains(event.target)) {
            modelDropdown.style.display = "none"; // Hide dropdown if clicked outside
        }
    });
});
