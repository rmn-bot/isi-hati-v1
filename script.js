// Konfigurasi Firebase (Gantilah dengan konfigurasi Anda)
const firebaseConfig = {
    apiKey: "AIzaSyBiZFyJay4YMBWji0n-oVHMfpAheSxgjSE",
    authDomain: "komentar--rmn-g.firebaseapp.com",
    databaseURL: "https://komentar--rmn-g-default-rtdb.firebaseio.com",
    projectId: "komentar--rmn-g",
    storageBucket: "komentar--rmn-g.appspot.com",
    messagingSenderId: "788562066307",
    appId: "1:788562066307:web:b19b4aacf8e190c50214b6",
    measurementId: "G-Y56DN493N6"
};

// Inisialisasi Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const playButton = document.getElementById("playButton");
const commentSection = document.getElementById("commentSection");
const commentInput = document.getElementById("commentInput");
const sendComment = document.getElementById("sendComment");
const commentContainer = document.getElementById("commentContainer");
const backgroundMusic = document.getElementById("backgroundMusic");

// Memuat komentar dari Firebase
database.ref("comments").on("child_added", (snapshot) => {
    const comment = snapshot.val();
    displayComment(comment.text, comment.x);
});

// Menambahkan komentar baru ke Firebase
sendComment.addEventListener("click", () => {
    const text = commentInput.value.trim();
    if (text) {
        const x = Math.random() * 80; // Posisi acak
        database.ref("comments").push({ text: text, x: x });
        commentInput.value = "";
    }
});

// Menampilkan komentar di layar
function displayComment(text, x) {
    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";
    commentDiv.style.left = `${x}%`;
    commentDiv.innerText = text;
    commentContainer.appendChild(commentDiv);
    animateComment(commentDiv);
}

function animateComment(commentDiv) {
    let pos = 100;
    const id = setInterval(() => {
        if (pos < -100) {
            clearInterval(id);
            commentContainer.removeChild(commentDiv);
        } else {
            pos--;
            commentDiv.style.transform = `translateX(${pos}vw)`;
        }
    }, 20);
}

// Memulai musik dan menampilkan komentar
playButton.addEventListener("click", () => {
    backgroundMusic.play();
    commentSection.style.display = "block";
    playButton.style.display = "none"; // Sembunyikan tombol setelah diklik
});