// js/app.js - Main application logic for frontend demo

// Navigation script
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Set initial active link
    document.querySelector('.nav-link[data-section="onboarding"]').classList.add('active');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            const targetSection = link.getAttribute('data-section');
            document.getElementById(targetSection).classList.add('active');
            
            // Highlight active link
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            link.classList.add('active');
        });
    });
    
    // Initialize components with mock data
    window.onboardingData = mockBusinessData;
    window.documentsData = mockDocuments;
    window.socialMediaRules = mockSocialMediaRules;
    window.campaignsData = mockCampaigns;
    window.eventsData = mockEvents;
    window.repositoriesData = mockRepositories;
    
    console.log("Application initialized with mock data");
    
    // Simple download handler for demonstration
    window.downloadFile = (filename) => {
        alert(`Download requested for: ${filename}\nIn a real implementation, this would download the file.`);
        return false;
    };
});