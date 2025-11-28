// Remove typing cursor after animation completes
document.addEventListener('DOMContentLoaded', function() {
    const typingElements = document.querySelectorAll('.typing-text');
    typingElements.forEach(element => {
        setTimeout(() => {
            element.style.borderRight = 'none';
        }, 3500); // Remove cursor after 3.5s (typing duration)
    });
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    const menuToggle = document.querySelector('.mobile-menu-toggle i');
    
    if (nav) {
        nav.classList.toggle('active');
        
        // Toggle icon between bars and times
        if (nav.classList.contains('active')) {
            menuToggle.classList.remove('fa-bars');
            menuToggle.classList.add('fa-times');
        } else {
            menuToggle.classList.remove('fa-times');
            menuToggle.classList.add('fa-bars');
        }
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.getElementById('mainNav');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (nav && menuToggle && nav.classList.contains('active')) {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
            nav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// Gallery Slider - Duplicate slides for infinite scroll
document.addEventListener('DOMContentLoaded', function() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
        const slides = sliderWrapper.innerHTML;
        sliderWrapper.innerHTML = slides + slides;
    }

    // Set minimum date for booking
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    
    if (checkInInput && checkOutInput) {
        const today = new Date().toISOString().split('T')[0];
        checkInInput.setAttribute('min', today);
        checkOutInput.setAttribute('min', today);

        checkInInput.addEventListener('change', function() {
            const checkInDate = new Date(this.value);
            const nextDay = new Date(checkInDate);
            nextDay.setDate(nextDay.getDate() + 1);
            checkOutInput.setAttribute('min', nextDay.toISOString().split('T')[0]);
            updatePrice();
        });

        checkOutInput.addEventListener('change', updatePrice);
    }
});

// Update booking price
function updatePrice() {
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const roomType = document.getElementById('roomType').value;

    if (checkIn && checkOut && roomType) {
        const date1 = new Date(checkIn);
        const date2 = new Date(checkOut);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const roomRate = parseInt(roomType);
        const totalAmount = roomRate * diffDays;

        document.getElementById('roomRate').textContent = 'ETB ' + roomRate.toLocaleString();
        document.getElementById('numNights').textContent = diffDays;
        document.getElementById('totalAmount').textContent = 'ETB ' + totalAmount.toLocaleString();
    }
}

// Booking form submission
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const totalAmount = document.getElementById('totalAmount').textContent;
        document.getElementById('modalAmount').textContent = totalAmount;
        document.getElementById('modalAmountTelebirr').textContent = totalAmount;
        
        const modal = document.getElementById('paymentModal');
        modal.style.display = 'block';
    });
}

// Modal close
const modal = document.getElementById('paymentModal');
const closeBtn = document.querySelector('.close');

if (closeBtn) {
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Payment selection
function selectPayment(method) {
    document.getElementById('bankDetails').style.display = 'none';
    document.getElementById('telebirrDetails').style.display = 'none';
    
    if (method === 'bank') {
        document.getElementById('bankDetails').style.display = 'block';
    } else if (method === 'telebirr') {
        document.getElementById('telebirrDetails').style.display = 'block';
    }
}

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}


// Amenity Modal Data
const amenityData = {
    pool: {
        title: "Swimming Pool",
        subtitle: "Outdoor Heated Pool with Poolside Service",
        image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&h=600&fit=crop",
        description: "Dive into luxury at our stunning outdoor heated swimming pool. Surrounded by lush gardens and comfortable loungers, our pool area is the perfect place to relax and unwind.",
        features: [
            "Olympic-size heated pool",
            "Children's pool area",
            "Poolside bar and restaurant",
            "Comfortable sun loungers",
            "Towel service included",
            "Pool attendant on duty",
            "Changing rooms and showers",
            "Jacuzzi and hot tub"
        ],
        hours: "Open Daily: 6:00 AM - 10:00 PM"
    },
    gym: {
        title: "Fitness Center",
        subtitle: "State-of-the-Art Gym Equipment",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=600&fit=crop",
        description: "Stay fit during your stay at our fully equipped fitness center. Featuring the latest cardio and strength training equipment, plus personal training services.",
        features: [
            "Latest cardio equipment",
            "Free weights and machines",
            "Personal trainers available",
            "Yoga and fitness classes",
            "Locker rooms with showers",
            "Complimentary towels and water",
            "Air-conditioned facility",
            "TV screens and music"
        ],
        hours: "Open 24/7"
    },
    spa: {
        title: "Spa & Wellness Center",
        subtitle: "Relaxation and Rejuvenation",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=600&fit=crop",
        description: "Indulge in ultimate relaxation at our luxurious spa. Our expert therapists offer a range of treatments designed to refresh your body and mind.",
        features: [
            "Massage therapy (Swedish, Deep tissue, Hot stone)",
            "Facial treatments",
            "Body scrubs and wraps",
            "Manicure and pedicure",
            "Sauna and steam room",
            "Aromatherapy",
            "Couples treatment rooms",
            "Professional therapists"
        ],
        hours: "Open Daily: 9:00 AM - 9:00 PM"
    },
    restaurant: {
        title: "Fine Dining Restaurants",
        subtitle: "Culinary Excellence",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop",
        description: "Experience exceptional dining at our three restaurants, each offering unique culinary experiences from traditional Ethiopian to international cuisine.",
        features: [
            "3 specialty restaurants",
            "Ethiopian traditional cuisine",
            "International menu",
            "Vegetarian and vegan options",
            "Private dining rooms",
            "Wine cellar with 200+ selections",
            "24/7 room service",
            "Breakfast buffet included"
        ],
        hours: "Restaurants: 6:30 AM - 11:00 PM | Room Service: 24/7"
    },
    conference: {
        title: "Conference & Event Facilities",
        subtitle: "Professional Meeting Spaces",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=600&fit=crop",
        description: "Host successful meetings and events in our modern conference facilities. Equipped with the latest technology and supported by our professional events team.",
        features: [
            "5 meeting rooms (20-200 capacity)",
            "Grand ballroom (500 capacity)",
            "High-speed WiFi",
            "Audio-visual equipment",
            "Video conferencing",
            "Catering services",
            "Event planning assistance",
            "Business support services"
        ],
        hours: "Available 24/7 with advance booking"
    },
    business: {
        title: "Business Center",
        subtitle: "Complete Business Solutions",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop",
        description: "Stay productive with our fully equipped business center. All the tools and services you need for successful business operations.",
        features: [
            "Computer workstations",
            "High-speed internet",
            "Printing and copying",
            "Scanning and faxing",
            "Secretarial services",
            "Translation services",
            "Private meeting rooms",
            "Office supplies available"
        ],
        hours: "Open 24/7"
    },
    parking: {
        title: "Parking Facilities",
        subtitle: "Secure and Convenient",
        image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1200&h=600&fit=crop",
        description: "Enjoy complimentary parking in our secure facility. With over 200 spaces and valet service, parking is never a concern.",
        features: [
            "200+ parking spaces",
            "Complimentary for guests",
            "Valet parking service",
            "24/7 security monitoring",
            "CCTV surveillance",
            "Covered parking available",
            "EV charging stations",
            "Easy access to hotel"
        ],
        hours: "Available 24/7"
    },
    wifi: {
        title: "High-Speed WiFi",
        subtitle: "Stay Connected",
        image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=1200&h=600&fit=crop",
        description: "Enjoy complimentary high-speed WiFi throughout the hotel. Stay connected for work or leisure with our reliable internet service.",
        features: [
            "Complimentary WiFi",
            "High-speed fiber connection",
            "Coverage in all areas",
            "Secure network",
            "Multiple device support",
            "24/7 technical support",
            "Business-grade bandwidth",
            "Easy connection process"
        ],
        hours: "Available 24/7"
    },
    concierge: {
        title: "Concierge Service",
        subtitle: "Your Personal Assistant",
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&h=600&fit=crop",
        description: "Our dedicated concierge team is here to make your stay exceptional. From restaurant reservations to tour bookings, we're here to help.",
        features: [
            "24/7 availability",
            "Restaurant reservations",
            "Tour and activity bookings",
            "Transportation arrangements",
            "Ticket bookings",
            "Local recommendations",
            "Special requests handling",
            "Multilingual staff"
        ],
        hours: "Available 24/7"
    },
    shuttle: {
        title: "Airport Shuttle Service",
        subtitle: "Complimentary Transfers",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=600&fit=crop",
        description: "Enjoy complimentary airport transfers in our luxury vehicles. Our professional drivers ensure a comfortable journey to and from the airport.",
        features: [
            "Complimentary service",
            "Luxury vehicles",
            "Professional drivers",
            "24/7 availability",
            "Meet and greet service",
            "Luggage assistance",
            "Child seats available",
            "Advance booking recommended"
        ],
        hours: "Available 24/7 (Advance booking required)"
    },
    laundry: {
        title: "Laundry & Dry Cleaning",
        subtitle: "Professional Garment Care",
        image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1200&h=600&fit=crop",
        description: "Keep your wardrobe fresh with our professional laundry and dry cleaning services. Same-day service available for your convenience.",
        features: [
            "Same-day service available",
            "Dry cleaning",
            "Pressing and ironing",
            "Shoe cleaning",
            "Express service",
            "Eco-friendly products",
            "Pickup and delivery",
            "Special garment care"
        ],
        hours: "Service: 7:00 AM - 9:00 PM | Pickup: 24/7"
    },
    security: {
        title: "24/7 Security",
        subtitle: "Your Safety is Our Priority",
        image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200&h=600&fit=crop",
        description: "Rest easy knowing our comprehensive security system and trained personnel are protecting you around the clock.",
        features: [
            "24/7 security personnel",
            "CCTV surveillance",
            "Secure key card access",
            "In-room safes",
            "Fire safety systems",
            "Emergency response team",
            "Secure parking",
            "Regular security patrols"
        ],
        hours: "Monitored 24/7"
    }
};

// Open Amenity Modal
function openAmenityModal(amenityType) {
    const modal = document.getElementById('amenityModal');
    const modalBody = document.getElementById('amenityModalBody');
    const data = amenityData[amenityType];
    
    if (!data) return;
    
    const featuresHTML = data.features.map(feature => 
        `<li><i class="fas fa-check-circle"></i> ${feature}</li>`
    ).join('');
    
    modalBody.innerHTML = `
        <div class="amenity-modal-header">
            <img src="${data.image}" alt="${data.title}">
            <div class="amenity-modal-title">
                <h2>${data.title}</h2>
                <p>${data.subtitle}</p>
            </div>
        </div>
        <div class="amenity-modal-body">
            <div class="amenity-detail-section">
                <h3>About This Amenity</h3>
                <p style="color: #555; line-height: 1.8; font-size: 1.05rem;">${data.description}</p>
            </div>
            
            <div class="amenity-detail-section">
                <h3>Features & Services</h3>
                <ul class="amenity-detail-list">
                    ${featuresHTML}
                </ul>
            </div>
            
            <div class="amenity-hours">
                <h4><i class="fas fa-clock"></i> Operating Hours</h4>
                <p style="margin: 0; font-size: 1.1rem; font-weight: 600;">${data.hours}</p>
            </div>
            
            <div class="amenity-cta">
                <a href="booking.html" class="cta-button">Book Your Stay Now</a>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close Amenity Modal
function closeAmenityModal() {
    const modal = document.getElementById('amenityModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('amenityModal');
    if (event.target == modal) {
        closeAmenityModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeAmenityModal();
    }
});


// Toggle Service List (Rooms & Dining)
function toggleServiceList(type) {
    const listId = type + '-list';
    const list = document.getElementById(listId);
    const button = list.previousElementSibling;
    
    // Toggle active class
    list.classList.toggle('active');
    button.classList.toggle('active');
}


// Home Slider Navigation
let sliderPosition = 0;
const slideWidth = 370; // 350px + 20px gap

function slideLeft() {
    const slider = document.getElementById('homeSlider');
    if (slider) {
        sliderPosition += slideWidth * 2;
        if (sliderPosition > 0) {
            sliderPosition = 0;
        }
        slider.style.transform = `translateX(${sliderPosition}px)`;
        slider.style.animation = 'none';
    }
}

function slideRight() {
    const slider = document.getElementById('homeSlider');
    if (slider) {
        sliderPosition -= slideWidth * 2;
        const maxScroll = -(slideWidth * 8); // 8 unique slides
        if (sliderPosition < maxScroll) {
            sliderPosition = maxScroll;
        }
        slider.style.transform = `translateX(${sliderPosition}px)`;
        slider.style.animation = 'none';
    }
}

// Reset animation when slider is not being manually controlled
let resetTimer;
function resetSliderAnimation() {
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
        const slider = document.getElementById('homeSlider');
        if (slider) {
            slider.style.animation = 'scrollRightToLeft 30s linear infinite';
            sliderPosition = 0;
        }
    }, 5000);
}

// Add event listeners to arrows
document.addEventListener('DOMContentLoaded', function() {
    const leftArrow = document.querySelector('.slider-arrow-left');
    const rightArrow = document.querySelector('.slider-arrow-right');
    
    if (leftArrow) {
        leftArrow.addEventListener('click', resetSliderAnimation);
    }
    if (rightArrow) {
        rightArrow.addEventListener('click', resetSliderAnimation);
    }
});
