document.addEventListener('DOMContentLoaded', () => {
    // Simulate doctor presence status
    const doctorStatus = document.querySelector('.doctor-status .indicator-dot');
    const healthStatus = document.querySelector('.health-status .indicator-dot');
    
    // Simulate doctor presence (random for demo)
    setInterval(() => {
        const isPresent = Math.random() > 0.5;
        doctorStatus.className = 'indicator-dot ' + (isPresent ? 'active' : '');
    }, 5000);
    
    // Simulate health status changes (random for demo)
    setInterval(() => {
        const status = Math.random();
        if (status > 0.7) {
            healthStatus.className = 'indicator-dot danger';
        } else if (status > 0.4) {
            healthStatus.className = 'indicator-dot warning';
        } else {
            healthStatus.className = 'indicator-dot active';
        }
    }, 8000);
});