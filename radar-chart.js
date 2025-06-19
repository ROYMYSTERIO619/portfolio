// Radar Chart Implementation

// Data for different skill categories
const skillsData = {
    programming: {
        labels: ['C', 'Java', 'JavaScript', 'Python', 'HTML'],
        values: [90, 85, 80, 75, 85],
        backgroundColor: 'rgba(108, 99, 255, 0.2)',
        borderColor: 'rgba(108, 99, 255, 1)',
    },
    frameworks: {
        labels: ['React', 'Node.js', 'Express', 'Bootstrap', 'Flask'],
        values: [70, 75, 80, 85, 65],
        backgroundColor: 'rgba(255, 107, 107, 0.2)',
        borderColor: 'rgba(255, 107, 107, 1)',
    },
    tools: {
        labels: ['GitHub', 'Figma', 'VSCode', 'Windows', 'Linux'],
        values: [80, 75, 90, 85, 70],
        backgroundColor: 'rgba(65, 88, 208, 0.2)',
        borderColor: 'rgba(65, 88, 208, 1)',
    },
    databases: {
        labels: ['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase', 'Redis'],
        values: [85, 75, 65, 70, 60],
        backgroundColor: 'rgba(47, 141, 70, 0.2)',
        borderColor: 'rgba(47, 141, 70, 1)',
    }
};

// Initialize Radar Chart
let radarChart;

function initializeRadarChart() {
    const ctx = document.getElementById('skillsRadarChart');
    if (!ctx) return;

    const activeCategory = document.querySelector('.skills-category.active').dataset.category;
    const data = skillsData[activeCategory];

    if (radarChart) {
        radarChart.destroy();
    }

    radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Skill Level',
                data: data.values,
                backgroundColor: data.backgroundColor,
                borderColor: data.borderColor,
                borderWidth: 2,
                pointBackgroundColor: data.borderColor,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: data.borderColor
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    angleLines: {
                        color: 'rgba(150, 150, 150, 0.2)'
                    },
                    grid: {
                        color: 'rgba(150, 150, 150, 0.2)'
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: isDarkMode() ? '#e4e6eb' : '#333',
                        showLabelBackdrop: false,
                        display: false, // Hide the internal values
                        stepSize: 25
                    },
                    pointLabels: {
                        color: isDarkMode() ? '#e4e6eb' : '#333',
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 14,
                            weight: 'bold'
                        },
                        padding: 12 // More space for the labels
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.raw + '%';
                        }
                    },
                    backgroundColor: isDarkMode() ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                    titleColor: isDarkMode() ? '#fff' : '#333',
                    bodyColor: isDarkMode() ? '#fff' : '#333',
                    borderColor: isDarkMode() ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1,
                    padding: 10,
                    cornerRadius: 6,
                    displayColors: false
                }
            },
            elements: {
                line: {
                    tension: 0.2 // Slightly smoother lines
                }
            },
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}

function isDarkMode() {
    return document.body.classList.contains('dark-theme');
}

// Handle Skills Tab switching
function setupSkillsTabs() {
    const skillsCategories = document.querySelectorAll('.skills-category');
    const skillsContents = document.querySelectorAll('.skills-tab-content');

    skillsCategories.forEach(category => {
        category.addEventListener('click', () => {
            const target = category.dataset.category;

            // Update active category
            skillsCategories.forEach(cat => cat.classList.remove('active'));
            category.classList.add('active');

            // Update tab content
            skillsContents.forEach(content => {
                content.classList.remove('active');
                if (content.dataset.content === target) {
                    content.classList.add('active');
                }
            });

            // Update radar chart
            initializeRadarChart();
        });
    });
}

// Initialize skills section
document.addEventListener('DOMContentLoaded', () => {
    setupSkillsTabs();
    
    // Wait for Chart.js to be available
    if (typeof Chart !== 'undefined') {
        initializeRadarChart();
    } else {
        // Load Chart.js dynamically if not available
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => {
            initializeRadarChart();
        };
        document.head.appendChild(script);
    }
});

// Update chart when theme changes
document.addEventListener('themeChanged', () => {
    if (radarChart) {
        initializeRadarChart();
    }
});