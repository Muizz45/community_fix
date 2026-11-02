
const reportForm = document.getElementById("resident-report-form");
const imageInput = document.getElementById("issue-image");
const imagePreview = document.getElementById("image-preview");
const reportsList = document.getElementById("reports-list");

// IMAGE PREVIEW
if (imageInput && imagePreview) {
    imageInput.addEventListener("change", function () {
        const file = this.files[0];

        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Please select a valid image.");
                this.value = "";
                return;
            }

            imagePreview.src = URL.createObjectURL(file);
            imagePreview.style.display = "block";
        } else {
            imagePreview.style.display = "none";
        }
    });
}

// LOAD SAVED REPORTS
let reports = JSON.parse(localStorage.getItem("naijafix-reports")) || [];


function displayReport(report) {
    if (!reportsList) return;

    const row = document.createElement("tr");

    const issue = document.createElement("td");
    issue.textContent = report.title;

    // PICTURE
    const picture = document.createElement("td");

    if (report.image) {
        const img = document.createElement("img");

        img.src = report.image;
        img.alt = "Report Picture";
        img.style.width = "70px";
        img.style.height = "60px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "8px";

        picture.appendChild(img);
    } else {
        picture.textContent = "No picture";
    }

    const location = document.createElement("td");
    location.textContent = report.location;

    const date = document.createElement("td");
    date.textContent = report.date;

    const status = document.createElement("td");
    status.textContent = report.status || "Pending";

    row.append(issue, picture, location, date, status);

    reportsList.appendChild(row);
}


// DISPLAY SAVED REPORTS
if (reportsList) {
    reports.forEach(displayReport);
}

// SUBMIT REPORT
if (reportForm) {
    reportForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = document.getElementById("issue-title").value;
        const category = document.getElementById("issue-category").value;
        const location = document.getElementById("issue-location").value;
        const description = document.getElementById("issue-description").value;

        const file = imageInput.files[0];

        function saveReport(image) {
            const report = {
                title: title,
                category: category,
                location: location,
                description: description,
                image: image,
                date: new Date().toLocaleDateString("en-GB"),
                status: "Pending"
            };

            reports.push(report);

            localStorage.setItem(
                "naijafix-reports",
                JSON.stringify(reports)
            );

            displayReport(report);

            alert("Your report has been submitted successfully!");

            reportForm.reset();
            imagePreview.style.display = "none";
            imagePreview.src = "";
        }

        if (file) {
            const reader = new FileReader();

            reader.onload = function () {
                saveReport(reader.result);
            };

            reader.readAsDataURL(file);
        } else {
            saveReport(null);
        }
    });
}

// MOBILE NAVIGATION

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";

});

// Close menu after clicking a navigation link

navLinks.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute("aria-label", "Open navigation menu");

        menuToggle.textContent = "☰";

    });

});
