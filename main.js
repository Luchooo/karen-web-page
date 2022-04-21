const body = document.body;
const firebaseCloudFunctions = 'https://us-central1-pickappweb-development-luis.cloudfunctions.net/app';

const endTime = new Date('May 14 2022 15:00:00');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

const updateCountdown = () => {
    const startTime = new Date();
    const diff = endTime - startTime;
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;
    daysEl.innerHTML = days;
    hoursEl.innerHTML = hours < 10 ? '0' + hours : hours;
    minutesEl.innerHTML = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.innerHTML = seconds < 10 ? '0' + seconds : seconds;
    if (diff < 0) {
        location.reload();
    }
}

const createStars = () => {
    const star = document.createElement('i');
    star.classList.add('fas');
    star.classList.add('fa-star');
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.animationDuration = Math.random() * 3 + 2 + 's';
    star.style.opacity = Math.random();
    star.style.fontSize = Math.random() * 10 + 10 + 'px';
    document.body.appendChild(star);
    setTimeout(() => {
        star.remove();
    }, 5000)
}

const inputPin = () => {
    new PincodeInput('#pincode-input-container', {
        count: 6,
        secure: false,
        onInput: (code) => {
            if (!!code && code.length === 6) {
                fetch(firebaseCloudFunctions + '/api/is-code', {
                        method: 'PUT',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ code: code })
                    })
                    .then(response => response.json())
                    .then((data) => {
                        if (!!data.success) {
                            alert(data.success);
                        } else if (!!data.error) {
                            alert(data.error);
                        } else {
                            alert("Error no conocido lo siento lo arreglare :(");
                        }
                    })
            }
        }
    })
}

if ((endTime - new Date()) > 0) {
    document.getElementById('countdown').style.visibility = 'visible';
    setInterval(updateCountdown, 1000);
} else {
    document.getElementById('countdown').remove();
    document.getElementById('pincode').style.visibility = 'visible';
    inputPin();
}
setInterval(createStars, 50);