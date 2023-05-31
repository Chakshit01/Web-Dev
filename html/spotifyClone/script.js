// Global Variables
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let ProgressBar = document.getElementById('progressBar')
let songgif = document.getElementById('songGif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let mastersong = document.getElementById('mastersong');

let songs = [
    {songname:"Acoustic breeze" , filePath: "./music/acousticbreeze.mp3" , coverPath: "./cover/acousticbreeze.jpg"},
    {songname:"A new beginning" , filePath: "./music/anewbeginning.mp3" , coverPath: "./cover/anewbeginning.jpg"},
    {songname:"Buddy" , filePath: "./music/buddy.mp3" , coverPath: "./cover/buddy.jpg"},
    {songname:"Creative minds" , filePath: "./music/creativeminds.mp3" , coverPath: "./cover/creativeminds.jpg"},
    {songname:"Cute" , filePath: "./music/cute.mp3" , coverPath: "./cover/cute.jpg"},
]

let audioElement = new Audio();
mastersong.innerHTML = songs[0].songname;


// Main Logics
// Covers and names updated while loading
songItems.forEach((element , i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songname;
})


// Handle Play and pause
masterPlay.addEventListener('click' , () => {
    if(audioElement.paused || audioElement.currentTime == 0) {
        masterPlay.classList.remove('fa-play-circle');        
        masterPlay.classList.add('fa-pause-circle');   
        
        if(songIndex <= 0) {
            songIndex = 0;
        }
        
        if(audioElement.src == "") {
            audioElement.src = songs[songIndex].filePath;
        }

        if(audioElement.src.includes(songs[songIndex].filePath)) {
            audioElement.src = songs[songIndex].filePath;
        }
        
        songgif.style.opacity = '1';
        setTimeout(() => {
            mastersong.innerText = songs[songIndex].songname;  
        }, 300);
        audioElement.play();
    }
    
    else {
        masterPlay.classList.remove('fa-pause-circle');        
        masterPlay.classList.add('fa-play-circle');     
        songgif.style.opacity = '0';
        audioElement.pause();
        setTimeout(() => {
            mastersong.innerText = "";
        }, 300);
    }
});


// Listen to events
audioElement.addEventListener('timeupdate' , () => {
    // Seek bar is updated
    let progress = parseFloat((audioElement.currentTime/audioElement.duration) * 100);
    ProgressBar.value = progress;
 
    // Next Song is played
    if(parseInt(ProgressBar.value) == 100) {
        
        if(songIndex >= songs.length - 1) {
            songIndex = 0;
        }
    
        else {
            songIndex += 1;
        }
    
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');        
        masterPlay.classList.add('fa-pause-circle');      
        mastersong.innerText = songs[songIndex].songname;
        songgif.style.opacity = '1';
        
    }
});


// Change audio according to progress bar
ProgressBar.addEventListener('change' , () => {
    audioElement.currentTime = parseFloat((ProgressBar.value * audioElement.duration) / 100);
});

// Toggling all the buttons off
const makeallPlays = () => {
    Array.from(document.getElementsByClassName('songitemPlay')).forEach((element)=> {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}

// Play Songs individually with Play buttons
Array.from(document.getElementsByClassName('songitemPlay')).forEach((element)=> {
    element.addEventListener('click' , (e)=> {
        makeallPlays();
        audioElement.pause();
        songIndex = parseInt(e.target.id);

        if(!(audioElement.src.includes(songs[songIndex].filePath.substring(1)))) {
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');

            masterPlay.classList.remove('fa-play-circle');        
            masterPlay.classList.add('fa-pause-circle');   

            audioElement.src = songs[songIndex].filePath;
            audioElement.currentTime = 0;
            songgif.style.opacity = '1';
            setTimeout(() => {
                mastersong.innerText = songs[songIndex].songname;  
            }, 300);
            
            audioElement.play();
        }

        else {
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');

            masterPlay.classList.remove('fa-pause-circle');  
            masterPlay.classList.add('fa-play-circle');        
        }
    });
});

// Next
document.getElementById('next').addEventListener('click', () => {
    if(songIndex >= songs.length - 1) {
        songIndex = 0;
    }

    else {
        songIndex += 1;
    }

    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');        
    masterPlay.classList.add('fa-pause-circle');      
    mastersong.innerText = songs[songIndex].songname;
    songgif.style.opacity = '1';
})


// Previous
document.getElementById('previous').addEventListener('click', () => {
    if(songIndex <= 0) {
        songIndex = 0;
    }

    else {
        songIndex -= 1;
    }

    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');        
    masterPlay.classList.add('fa-pause-circle');      
    mastersong.innerText = songs[songIndex].songname;
    songgif.style.opacity = '1';
}) 