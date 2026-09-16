let audioContext;
let masterGain;
let musicTimer;

function startParty() {

    document.getElementById("intro").classList.add("hide");

    startMusic();

    launchConfetti();
}


/* =========================
   🎵 PARTY MUSIC
========================= */

function startMusic() {

    audioContext = new (
        window.AudioContext ||
        window.webkitAudioContext
    )();

    masterGain = audioContext.createGain();

    masterGain.gain.value = 0.08;

    masterGain.connect(audioContext.destination);

    const melody = [
        523.25, 659.25, 783.99, 659.25,
        698.46, 783.99, 880.00, 783.99,
        659.25, 783.99, 987.77, 783.99,
        698.46, 659.25, 523.25
    ];

    let i = 0;

    function playNote() {

        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = "triangle";

        osc.frequency.value = melody[i];

        gain.gain.setValueAtTime(
            0,
            audioContext.currentTime
        );

        gain.gain.linearRampToValueAtTime(
            0.5,
            audioContext.currentTime + 0.03
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + 0.35
        );

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start();
        osc.stop(audioContext.currentTime + 0.4);

        i++;

        if (i >= melody.length) {
            i = 0;
        }
    }

    playNote();

    musicTimer = setInterval(playNote, 330);
}


/* =========================
   🎉 EXTRA CONFETTI
========================= */

function launchConfetti() {

    const confetti = document.querySelector(".confetti");

    setInterval(() => {

        const piece = document.createElement("span");

        piece.style.position = "absolute";
        piece.style.left = Math.random() * 100 + "%";
        piece.style.top = "-20px";
        piece.style.fontSize =
            Math.random() * 20 + 10 + "px";

        piece.textContent =
            Math.random() > .5 ? "✦" : "•";

        piece.style.color =
            Math.random() > .5 ? "#e8bd63" : "#d9e5f2";

        piece.style.animation =
            "confettiFall 4s linear forwards";

        confetti.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 4000);

    }, 180);
      }
