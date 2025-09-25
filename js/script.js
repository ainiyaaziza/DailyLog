// Fungsi untuk mendapatkan waktu London (hanya jam dan menit)
function getLondonTimeOnly() {
    const now = new Date();
    const options = {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit'
    };
    return now.toLocaleString('en-GB', options);
}

// Fungsi untuk mendapatkan waktu London lengkap untuk header
function getLondonFullTime() {
    const now = new Date();
    const options = {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    return now.toLocaleString('en-US', options);
}

// Memperbarui tampilan waktu di header setiap detik
function updateLondonTimeHeader() {
    document.getElementById('london-time').innerText = `London Time: ${getLondonFullTime()}`;
}

setInterval(updateLondonTimeHeader, 1000);
updateLondonTimeHeader();

// Fungsi untuk menyalin laporan dengan menambahkan waktu
function copyReport(elementId) {
    const currentTime = getLondonTimeOnly();
    let textToCopy = '';

    if (elementId === 'report1-box') {
        // Format untuk Clock-In
        textToCopy = `*CLOCK-IN*\n\nألسلام عليكم ورحمة الله وبركاته\n*I’m starting a shift at*: ${currentTime} UK time`;
    } else if (elementId === 'report2-box') {
        // Format untuk Clock-Out
        const listItems = Array.from(document.querySelectorAll('#report2-text li')).map(li => `- ${li.innerText.trim()}`).join('\n');
        
        textToCopy = `*CLOCK-OUT*\n\nألسلام عليكم ورحمة الله وبركاته\n\n*I have finished the shift at*: ${currentTime} UK time\n\nSummary of the day:\n${listItems}\n\nGoogle form updated`;
    }
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Report copied successfully!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}