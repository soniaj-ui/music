// Songs data
const songs = [
    {
        title: "Minnalgal Koothadum",
        artist: "G.V.Prakash",
        src: "assets/song/Minnalgal Koothadum.mp3",
        cover: "assets/img/dhanush.jpg"
    },
    {
        title: "Nee-Partha",
        artist: "HariHaran",
        src: "assets/song/Nee-Partha.mp3",
        cover: "assets/img/kamal.jpg"
    },

    {
        title: "Hey-Sandakkara",
        artist: "Dhee",
        src: "assets/song/Hey-Sandakkara.mp3",
        cover: "assets/img/madhavan.jpg"
    },
    {
        title: "Para-Para",
        artist: "G.V.Prakash",
        src: "assets/song/Para-Para.mp3",
        cover: "assets/img/para.jpg"
    },
    {
        title: "Para-Para",
        artist: "Vijay Yesudas",
        src: "assets/song/Avalum-Naanum.mp3",
        cover: "assets/img/str.jpg"
    }
];

// DOM Elements
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const songList = document.getElementById('song-list');

// Current song index
let currentSongIndex = 0;

// Initialize the player
function loadSong(song) {
    title.textContent = `${song.title} - ${song.artist}`;
    audio.src = song.src;
    cover.src = song.cover;
}

// Play song
function playSong() {
    const musicContainer = document.querySelector('.music-container');
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

// Pause song
function pauseSong() {
    const musicContainer = document.querySelector('.music-container');
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

// Previous song
function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(songs[currentSongIndex]);
    playSong();
    updatePlaylistUI();
}

// Next song
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) {
        currentSongIndex = 0;
    }
    loadSong(songs[currentSongIndex]);
    playSong();
    updatePlaylistUI();
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Set progress
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Initialize playlist
function initPlaylist() {
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(songs[currentSongIndex]);
            playSong();
            updatePlaylistUI();
        });
        songList.appendChild(li);
    });
}

// Update playlist UI to show current playing song
function updatePlaylistUI() {
    const playlistItems = document.querySelectorAll('#song-list li');
    playlistItems.forEach((item, index) => {
        if (index === currentSongIndex) {
            item.classList.add('playing');
        } else {
            item.classList.remove('playing');
        }
    });
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = document.querySelector('.music-container').classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);

progressContainer.addEventListener('click', setProgress);

// Initialize
loadSong(songs[currentSongIndex]);
initPlaylist();