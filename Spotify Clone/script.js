console.log("Welcome to Spotify");
//variables
let songIndex = 0;
//audioElement.play();
let audioElement = new Audio('songs/1.mp3');
let masterPlay =document.getElementById('masterPlay');
let myProgressBar =document.getElementById('myProgressBar');
let gif =document.getElementById('gif');
let masterSongName =document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs =[
    {songName:"wariyo - Mortals (feat. Laura Brehm)", filepath:"songs/1.mp3", coverPath:"Cover/1.jpg"},
    {songName:"cielo - Huma huma", filepath:"songs/2.mp3", coverPath:"Cover/2.jpg"},
    {songName:"Deaf KEV - Invincible", filepath:"songs/3.mp3", coverPath:"Cover/3.jpg"},
    {songName:"Diffrent Heaven & Ehide", filepath:"songs/4.mp3", coverPath:"Cover/4.jpg"},
    {songName:"janji-Halavine-Tonight", filepath:"songs/5.mp3", coverPath:"Cover/5.jpg"},
    {songName:"Kaneem-xyz", filepath:"songs/6.mp3", coverPath:"Cover/6.jpg"},
]
songItems.forEach((element,i)=>{
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
//Handle Play/Pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
       audioElement.play();
       masterPlay.classList.remove('fa-play-circle');
       masterPlay.classList.add('fa-pause-circle');
       gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
     }
})
//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
//update seekbar
Progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
myProgressBar.value = Progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime= myProgressBar.value*audioElement.duration/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=`songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime= 0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
     })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=5){
        songIndex=0
    }
    else{
        songIndex +=1;
    }
    audioElement.src=`songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime= 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<= 0){
        songIndex =5;
    }
    else{
        songIndex -=1;
    }
    audioElement.src=`songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime= 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})