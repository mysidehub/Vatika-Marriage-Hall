/* =====================================================
   VATIKA MARRIAGE HALL
   JAVASCRIPT
===================================================== */


/* =====================================================
   IMPORTANT SETTINGS
===================================================== */

/*
   YAHAN APNA WHATSAPP NUMBER DALO.   1 hi num


   Is format me:
   919876543210

   +, spaces, brackets nahi lagane hain.
*/

const WHATSAPP_NUMBER = "919315330320";


/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMenu() {

    const navbar = document.getElementById("navbar");

    navbar.classList.toggle("show");

}


/* Close mobile menu after clicking link */

document.querySelectorAll("#navbar a").forEach(link => {

    link.addEventListener("click", () => {

        document.getElementById("navbar").classList.remove("show");

    });

});


/* =====================================================
   DARK / LIGHT MODE
===================================================== */

function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    const isDark =
        document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "vatikaTheme",
        isDark ? "dark" : "light"
    );

    updateThemeIcon();

}


/* Load saved theme */

function loadTheme() {

    const savedTheme =
        localStorage.getItem("vatikaTheme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

    }

    updateThemeIcon();

}


function updateThemeIcon() {

    const icon =
        document.getElementById("themeIcon");

    if (!icon) return;

    const isDark =
        document.body.classList.contains("dark-mode");

    if (isDark) {

        icon.className = "fa-solid fa-sun";

    } else {

        icon.className = "fa-solid fa-moon";

    }

}

loadTheme();


/* =====================================================
   DATE MINIMUM
===================================================== */

const dateInput =
    document.getElementById("eventDate");

if (dateInput) {

    const today = new Date();

    const year = today.getFullYear();

    const month =
        String(today.getMonth() + 1).padStart(2, "0");

    const day =
        String(today.getDate()).padStart(2, "0");

    dateInput.min =
        `${year}-${month}-${day}`;
}


/* =====================================================
   PACKAGE SELECT
===================================================== */

const packageSelect =
    document.getElementById("packageSelect");

if (packageSelect) {

    packageSelect.addEventListener("change", updatePackagePrice);

}


function updatePackagePrice() {

    const select =
        document.getElementById("packageSelect");

    const selected =
        select.options[select.selectedIndex];

    const packageName =
        selected.value;

    const price =
        selected.dataset.price || 0;


    document.getElementById("selectedPackage")
        .textContent =
        packageName || "Not Selected";


    document.getElementById("selectedPrice")
        .textContent =
        price > 0
            ? formatCurrency(price)
            : "₹0";

}


/* =====================================================
   PACKAGE BUTTON
===================================================== */

function selectPackage(packageName, price) {

    const select =
        document.getElementById("packageSelect");


    for (let i = 0; i < select.options.length; i++) {

        if (select.options[i].value === packageName) {

            select.selectedIndex = i;

            break;

        }

    }


    updatePackagePrice();


    document.getElementById("booking")
        .scrollIntoView({
            behavior: "smooth"
        });


    showToast(
        packageName + " selected"
    );

}


/* =====================================================
   CURRENCY
===================================================== */

function formatCurrency(number) {

    return "₹" +
        Number(number).toLocaleString("en-IN");

}


/* =====================================================
   BOOKING DATA
===================================================== */

let currentBooking = null;


/* =====================================================
   SUBMIT BOOKING FORM
===================================================== */

function submitBooking(event) {

    event.preventDefault();


    const name =
        document.getElementById("customerName")
            .value.trim();

    const phone =
        document.getElementById("customerPhone")
            .value.trim();

    const eventType =
        document.getElementById("eventType")
            .value;

    const date =
        document.getElementById("eventDate")
            .value;

    const guests =
        document.getElementById("guestCount")
            .value;

    const packageElement =
        document.getElementById("packageSelect");

    const packageName =
        packageElement.value;

    const selectedOption =
        packageElement.options[
            packageElement.selectedIndex
        ];

    const price =
        selectedOption.dataset.price || 0;

    const requirements =
        document.getElementById("requirements")
            .value.trim();


    /* Validate phone */

    if (!/^[0-9]{10}$/.test(phone)) {

        showToast(
            "Please enter a valid 10 digit phone number"
        );

        return;

    }


    /* Validate package */

    if (!packageName) {

        showToast(
            "Please select a package"
        );

        return;

    }


    /* Save booking */

    currentBooking = {

        name: name,

        phone: phone,

        event: eventType,

        date: date,

        guests: guests,

        package: packageName,

        price: price,

        requirements: requirements

    };


    /* Show summary */

    document.getElementById("summaryName")
        .textContent =
        name;

    document.getElementById("summaryPhone")
        .textContent =
        phone;

    document.getElementById("summaryEvent")
        .textContent =
        eventType;

    document.getElementById("summaryDate")
        .textContent =
        formatDate(date);

    document.getElementById("summaryGuests")
        .textContent =
        guests + " Guests";

    document.getElementById("summaryPackage")
        .textContent =
        packageName;

    document.getElementById("summaryPrice")
        .textContent =
        formatCurrency(price);


    /* Open popup */

    document.getElementById("bookingModal")
        .classList.add("show");

    document.body.classList.add("no-scroll");

}


/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(dateString) {

    if (!dateString) return "-";

    const date =
        new Date(dateString + "T00:00:00");

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );

}


/* =====================================================
   SEND BOOKING TO WHATSAPP
===================================================== */

function sendWhatsAppBooking() {

    if (!currentBooking) {

        showToast(
            "Booking details not found"
        );

        return;

    }


    const b = currentBooking;


    /*
       WhatsApp message
    */

    const message =

`🏛️ *VATIKA MARRIAGE HALL*
━━━━━━━━━━━━━━━━━━━━

📋 *NEW BOOKING REQUEST*

👤 *Customer Details*
Name: ${b.name}
Phone: ${b.phone}

🎉 *Event Details*
Event Type: ${b.event}
Event Date: ${formatDate(b.date)}
Number of Guests: ${b.guests}

💎 *Package Details*
Package: ${b.package}
Starting Price: ${formatCurrency(b.price)}

📝 *Additional Requirements*
${b.requirements || "No additional requirements"}

━━━━━━━━━━━━━━━━━━━━
📌 Please contact the customer to confirm availability and final quotation.

Thank you.
`;


    const encodedMessage =
        encodeURIComponent(message);


    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;


    window.open(
        whatsappURL,
        "_blank"
    );


    closeBookingModal();


    showToast(
        "Opening WhatsApp..."
    );

}


/* =====================================================
   CLOSE BOOKING MODAL
===================================================== */

function closeBookingModal() {

    document.getElementById("bookingModal")
        .classList.remove("show");

    document.body.classList.remove("no-scroll");

}


/* =====================================================
   WHATSAPP GENERAL MESSAGE
===================================================== */

function openWhatsApp() {

    const message =
        `Hello Vatika Marriage Hall,

I would like to know more about your wedding hall, packages and availability.

Please share the details with me.`;

    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(
        url,
        "_blank"
    );

}


/* =====================================================
   GALLERY LIGHTBOX
===================================================== */

const galleryItems =
    document.querySelectorAll(".gallery-item");


galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        const image =
            item.querySelector("img");

        if (!image) return;

        document.getElementById("lightboxImage")
            .src =
            image.src;

        document.getElementById("lightbox")
            .classList.add("show");

        document.body.classList.add("no-scroll");

    });

});


function closeLightbox() {

    document.getElementById("lightbox")
        .classList.remove("show");

    document.body.classList.remove("no-scroll");

}


/* Close lightbox with Escape */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeLightbox();

        closeBookingModal();

    }

});


/* =====================================================
   TOAST
===================================================== */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    toastMessage.textContent =
        message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

}


/* =====================================================
   NAVBAR ACTIVE LINK
===================================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll("#navbar a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (
            window.scrollY >= sectionTop
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


/* =====================================================
   PREVENT INVALID PHONE INPUT
===================================================== */

const phoneInput =
    document.getElementById("customerPhone");

if (phoneInput) {

    phoneInput.addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(
                    /[^0-9]/g,
                    ""
                ).slice(0, 10);

        }
    );

}


/* =====================================================
   PAGE LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updatePackagePrice();

    }
);











/* =====================================================
   WELCOME POPUP
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /*
       Popup 1.5 second ke baad show hoga.
    */

    setTimeout(function () {

        const popup =
            document.getElementById("welcomePopup");

        if (popup) {

            popup.classList.add("show");

        }

    }, 1500);

});


/* Close Welcome Popup */

function closeWelcomePopup() {

    const popup =
        document.getElementById("welcomePopup");

    if (popup) {

        popup.classList.remove("show");

    }

}
