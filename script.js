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

    // Update position of dropdown to be fixed below the input field
    function updateDropdownPosition() {
        const rect = modelInput.getBoundingClientRect();
        modelDropdown.style.top = `${rect.bottom + window.scrollY}px`;
        modelDropdown.style.left = `${rect.left + window.scrollX}px`;
        modelDropdown.style.width = `${rect.width}px`; // Match the input width
    }

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

    function filterModels() {
        const query = modelInput.value.toLowerCase();
        modelDropdown.innerHTML = "";
        modelDropdown.style.display = "none";

        if (query.length > 0) {
            const filteredModels = carModels.filter(model =>
                model.toLowerCase().includes(query)
            ).slice(0, 10);

            if (filteredModels.length > 0) {
                updateDropdownPosition(); // Update position when filtering
                modelDropdown.style.display = "block";
                filteredModels.forEach(model => {
                    const li = document.createElement("li");
                    li.textContent = model;
                    li.addEventListener("click", function () {
                        modelInput.value = model;
                        modelDropdown.style.display = "none";
                    });
                    modelDropdown.appendChild(li);
                });
            }
        }
    }

    // Event listeners for input and focus/blur events
    modelInput.addEventListener("input", filterModels);
    window.addEventListener("scroll", updateDropdownPosition);
    document.addEventListener("click", function (event) {
        if (!modelInput.contains(event.target) && !modelDropdown.contains(event.target)) {
            modelDropdown.style.display = "none"; // Hide dropdown if clicked outside
        }
    });

    // File table functionality
    const folderLink = document.getElementById("folderLink");
    const fileTable = document.getElementById("fileTable");
    const fileTableContainer = document.getElementById("fileTableContainer");
    const addFileButton = document.getElementById("addFileButton");
    const fileTableBody = fileTable.querySelector("tbody");

    // Handle file input change event to add files to the table
    folderLink.addEventListener("change", () => {
        if (folderLink.files.length > 0) {
            const file = folderLink.files[0];
            addFileRow(file);
            fileTable.classList.remove("d-none");
            addFileButton.classList.remove("d-none");
        }
    });

    // Button to add more files
    addFileButton.addEventListener("click", () => {
        folderLink.click();
    });

    // Function to add a row to the file table
    function addFileRow(file) {
        const fileRow = document.createElement("tr");
        fileRow.innerHTML = `
            <td>${shortenFileName(file.name)}</td>
            <td>${(file.size / 1024).toFixed(2)} KB</td>
            <td>
                <button class="btn btn-outline-primary btn-sm edit-file">Edit</button>
                <button class="btn btn-outline-danger btn-sm delete-file">Delete</button>
            </td>
        `;
        fileTableBody.appendChild(fileRow);

        // Delete button functionality
        fileRow.querySelector(".delete-file").addEventListener("click", () => {
            fileRow.remove();
            if (fileTableBody.children.length === 0) {
                fileTable.classList.add("d-none");
                addFileButton.classList.add("d-none");
            }
        });

        // Placeholder for Edit functionality
        fileRow.querySelector(".edit-file").addEventListener("click", () => {
            alert(`Edit functionality for ${file.name} is under development.`);
        });
    }

    // Function to shorten file names if they are too long
    function shortenFileName(name) {
        if (name.length > 15) {
            return name.slice(0, 8) + "..." + name.slice(-7);
        }
        return name;
    }
});
