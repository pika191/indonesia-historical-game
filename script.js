// Data pahlawan
const heroes = [
    { name: "Peristiwa Rengasdengklok", image: "assets/rengasdengklok.jpg", description: "Proklamator Kemerdekaan Indonesia." },
    { name: "Pertempuran Ambarawa", image: "assets/ambarawa.jpg", description: "pertempuran besar yang terjadi antara Tentara Nasional Indonesia yang baru saja dibentuk dan Angkatan Darat Britania Raya dengan pasukan Belanda yang terjadi antara 20 Oktober 1945 dan 15 Desember 1945 di Kabupaten Semarang dan Kabupaten Magelang di Jawa Tengah, Indonesia" },
    { name: "Proklamasi", image: "assets/proklamasi.jpg", description: "Peristiwa saat Ir. Soekarno yang didampingi Mohammad Hatta membacakan teks Proklamasi yang diabadikan oleh Frans Mendur." },
    { name: "Perjanjian Linggarjati", image: "assets/linggarjati.jpg", description: "kesepakatan politik yang disepakati pada tanggal 15 November 1946 oleh pemerintah Belanda dan Republik Indonesia yang dideklarasikan secara sepihak di desa Linggajati, Kabupaten Kuningan, dekat Cirebon yang mana Belanda mengakui republik ini memiliki kekuasaan de facto di Jawa, Madura, dan Sumatra." },
    { name: "Serangan Umum 1 Maret", image: "assets/1maret.jpg", description: "merupakan serangan militer selama Revolusi Nasional Indonesia di mana Kota Yogyakarta dikuasai oleh pasukan Indonesia selama enam jam. Serangan ini berperan penting dalam menyebabkan tekanan internasional terhadap Belanda." },
    { name: "Pertempuran Medan Area", image: "assets/medan.jpg", description: "Pertempuran yang terjadi antara pasukan Sekutu dan TNI Angkatan Darat di Medan, Sumatera Utara, dan daerah sekitarnya selama Revolusi Nasional Indonesia." },
    { name: "Pertempuran Surabaya", image: "assets/sby.jpg", description: "Pertempuran ini adalah perang pertama pasukan Indonesia di kota Surabaya dengan pasukan Sekutu setelah Proklamasi Kemerdekaan Indonesia dan satu pertempuran terbesar dan terberat dalam sejarah Revolusi Nasional Indonesia yang menjadi simbol nasional atas perlawanan Indonesia terhadap kolonialisme dan Imperialisme" },
    { name: "Perjanjian Renville", image: "assets/rnv.jpg", description: "perjanjian antara Indonesia dengan Belanda yang terjadi pada tanggal 8 Desember 1947 sampai 17 Januari 1948 di atas geladak kapal perang Amerika Serikat sebagai tempat netral USS Renville, yang berlabuh di Jakarta." },
    { name: "Peristiwa G30S", image: "assets/g30s.jpg", description: "peristiwa berlatar belakang kudeta yang terjadi selama satu malam pada tanggal 30 September hingga 1 Oktober 1965 yang mengakibatkan gugurnya enam jenderal serta satu orang perwira pertama militer Indonesia dan jenazahnya dimasukkan ke dalam suatu lubang sumur lama di area Lubang Buaya, Jakarta Timur." },
    { name: "Surat Perintah Sebelas Maret", image: "assets/supersemar.jpg", description: "sebuah dokumen yang ditandatangani oleh Presiden Indonesia Soekarno pada tanggal 11 Maret 1966, yang memberikan wewenang kepada Panglima Angkatan Darat Letnan Jenderal Soeharto untuk mengambil tindakan apa pun yang dianggap perlu untuk memulihkan ketertiban dalam situasi kacau selama pembantaian massal di Indonesia 1965–1966." }
];

// Variabel game
let score = 0;
let questionCount = 0;
const maxQuestions = 10; // Batas 10 pertanyaan
let timer;
const timeLimit = 20; // Timer 15 detik
let timeRemaining = timeLimit;

// Elemen DOM
const card = document.getElementById("card");
const heroImage = document.getElementById("hero-image");
const heroDescription = document.getElementById("hero-description");
const question = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");

// Fungsi untuk mengacak array
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Menampilkan pertanyaan baru
function loadQuestion() {
    if (questionCount >= maxQuestions) {
        endGame();
        return;
    }

    let correctHero = heroes[Math.floor(Math.random() * heroes.length)];
    heroImage.src = correctHero.image;
    heroDescription.innerText = correctHero.description;

    // Acak pilihan jawaban
    let options = shuffle([...heroes]);
    options = options.slice(0, 3); // Ambil 3 pilihan acak
    if (!options.includes(correctHero)) {
        options[Math.floor(Math.random() * options.length)] = correctHero; // Pastikan jawaban benar ada
    }

    // Tampilkan pilihan jawaban
    optionsContainer.innerHTML = "";
    options.forEach(hero => {
        let button = document.createElement("button");
        button.innerText = hero.name;
        button.classList.add("option-button");
        button.onclick = () => checkAnswer(hero.name, correctHero.name);
        optionsContainer.appendChild(button);
    });

    questionCount++; // Tambah jumlah pertanyaan
    startTimer(); // Mulai timer
}

// Mengecek jawaban
function checkAnswer(selectedName, correctName) {
    clearInterval(timer); // Hentikan timer setelah menjawab

    if (selectedName === correctName) {
        score += 10; // Tambah skor jika benar
        alert("Jawaban benar! +10 poin 🎉");
    } else {
        alert("Jawaban salah! Coba lagi 😢");
    }

    scoreDisplay.innerText = `Skor: ${score}`;
    loadQuestion(); // Muat pertanyaan berikutnya
}

// Flip kartu ketika diklik
card.addEventListener("click", () => {
    card.classList.toggle("flipped");
});

// Timer 15 detik dengan animasi
function startTimer() {
    clearInterval(timer);
    timeRemaining = timeLimit;
    progressBar.style.width = "100%"; // Reset progress bar

    timer = setInterval(() => {
        timeRemaining--;
        timerDisplay.innerText = `Waktu: ${timeRemaining}s`;

        let progressPercentage = (timeRemaining / timeLimit) * 100;
        progressBar.style.width = `${progressPercentage}%`; // Update progress bar

        if (timeRemaining <= 0) {
            clearInterval(timer);
            alert("Waktu habis! Jawaban dianggap salah ❌");
            loadQuestion(); // Pindah ke pertanyaan berikutnya
        }
    }, 1000);
}

// Mengakhiri permainan setelah 10 pertanyaan
function endGame() {
    clearInterval(timer);
    let message = "";

    if (score < 50) {
        message = "Kamu perlu membaca sejarah lebih giat lagi, semangat! 📚🔥";
    } else if (score >= 50 && score < 60) {
        message = "Pengetahuan sejarah kamu sudah bagus, tingkatkan lagi yah! 👏";
    } else if (score >= 60 && score < 70) {
        message = "Selamat! Sepertinya pengetahuan kamu sudah baik dan banyak! 🎖️";
    } else if (score >= 70 && score < 80) {
        message = "Yeay! Kamu memang pecinta sejarah! 🏆";
    } else if (score >= 80 && score < 100) {
        message = "Luar biasa! Kamu sangat hebat dalam sejarah! 🎊";
    } else if (score === 100) {
        message = "Selamat! Kamu sudah cocok menjadi ahli sejarah! 🎓🥇";
    }

    alert(`Game selesai! Skor akhir: ${score}\n${message}`);
    location.reload(); // Restart game setelah selesai
}

// Fungsi untuk menampilkan popup animasi
function showPopup(message, type) {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    const popupIcon = document.getElementById("popup-icon");

    popupMessage.innerText = message;
    
    // Ubah ikon berdasarkan jenis pesan
    if (type === "success") {
        popupIcon.innerHTML = "✅";
        popup.style.backgroundColor = "#4CAF50"; // Hijau untuk benar
    } else if (type === "error") {
        popupIcon.innerHTML = "❌";
        popup.style.backgroundColor = "#FF5733"; // Merah untuk salah
    } else {
        popupIcon.innerHTML = "⏳";
        popup.style.backgroundColor = "#FFC107"; // Kuning untuk waktu habis
    }

    popup.style.opacity = "1";
    popup.style.transform = "translate(-50%, 0)";

    setTimeout(() => {
        popup.style.opacity = "0";
        popup.style.transform = "translate(-50%, -50px)";
    }, 2000); // Hilang setelah 2 detik
}

// Mengecek jawaban
function checkAnswer(selectedName, correctName) {
    clearInterval(timer); // Hentikan timer setelah menjawab

    if (selectedName === correctName) {
        score += 10; // Tambah skor jika benar
        showPopup("Jawaban benar! +10 poin 🎉", "success");
    } else {
        showPopup("Jawaban salah! Coba lagi 😢", "error");
    }

    scoreDisplay.innerText = `Skor: ${score}`;
    setTimeout(loadQuestion, 2000); // Tunggu sebelum soal baru muncul
}

// Timer 15 detik dengan animasi
function startTimer() {
    clearInterval(timer);
    timeRemaining = timeLimit;
    progressBar.style.width = "100%"; // Reset progress bar

    timer = setInterval(() => {
        timeRemaining--;
        timerDisplay.innerText = `Waktu: ${timeRemaining}s`;

        let progressPercentage = (timeRemaining / timeLimit) * 100;
        progressBar.style.width = `${progressPercentage}%`; // Update progress bar

        if (timeRemaining <= 0) {
            clearInterval(timer);
            showPopup("Waktu habis! Jawaban salah ❌", "timeout");
            setTimeout(loadQuestion, 2000); // Tunggu sebelum lanjut ke soal baru
        }
    }, 1000);
}

// Fungsi menampilkan popup hasil akhir
function showFinalPopup(score) {
    const finalPopup = document.getElementById("final-popup");
    const finalMessage = document.getElementById("final-message");
    const finalIcon = document.getElementById("final-icon");

    let message = "";
    let icon = "";
    let bgColor = "";

    if (score < 50) {
        message = "Kamu perlu membaca sejarah lebih giat lagi, semangat! 📚🔥";
        icon = "📖";
        bgColor = "#FF5733"; // Merah
    } else if (score >= 50 && score < 60) {
        message = "Pengetahuan sejarah kamu sudah bagus, tingkatkan lagi yah! 👏";
        icon = "👍";
        bgColor = "#FFC107"; // Kuning
    } else if (score >= 60 && score < 70) {
        message = "Selamat! Sepertinya pengetahuan kamu sudah baik dan banyak! 🎖️";
        icon = "🏆";
        bgColor = "#4CAF50"; // Hijau
    } else if (score >= 70 && score < 80) {
        message = "Yeay! Kamu memang pecinta sejarah! 🏆";
        icon = "📜";
        bgColor = "#4CAF50"; // Hijau
    } else if (score >= 80 && score < 100) {
        message = "Luar biasa! Kamu sangat hebat dalam sejarah! 🎊";
        icon = "🎉";
        bgColor = "#2196F3"; // Biru
    } else if (score === 100) {
        message = "Selamat! Kamu sudah cocok menjadi ahli sejarah! 🎓🥇";
        icon = "🥇";
        bgColor = "#8E44AD"; // Ungu
    }

    finalPopup.style.backgroundColor = bgColor;
    finalMessage.innerText = message;
    finalIcon.innerText = icon;

    finalPopup.style.display = "flex"; // Tampilkan popup
}

// Fungsi untuk mengakhiri game
function endGame() {
    clearInterval(timer);
    showFinalPopup(score);
}

// Restart game tanpa refresh
document.getElementById("restart-button").addEventListener("click", () => {
    location.reload();
});

// Fungsi untuk memulai permainan
function startGame() {
    const startScreen = document.getElementById("start-screen");
    const gameContainer = document.getElementById("game-container");

    startScreen.classList.add("fade-out"); // Tambah animasi keluar
    setTimeout(() => {
        startScreen.style.display = "none";
        gameContainer.style.display = "block";
    }, 500); // Setelah animasi selesai, sembunyikan start screen

    loadQuestion(); // Mulai permainan
}

// Pastikan tampilan menyesuaikan ukuran layar
function adjustLayout() {
    const gameContainer = document.getElementById("game-container");
    const card = document.querySelector(".card");

    if (window.innerWidth < 600) {
        gameContainer.style.padding = "10px";
        card.style.width = "90%";
    } else {
        gameContainer.style.padding = "20px";
        card.style.width = "50%";
    }
}

window.addEventListener("resize", adjustLayout);
document.addEventListener("DOMContentLoaded", adjustLayout);


// Muat pertanyaan pertama
loadQuestion();

