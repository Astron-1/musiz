import { songListMap,fP,songTitle, sF } from "./songs/gettingFile.js";
let songImg=document.getElementById("songImg");
let progress=document.getElementById("progress");
let song=document.getElementById("song");
let controlIcon=document.getElementById("controlIcon");
let ctrlPlay=document.getElementById("ctrlPlay");
let playNext=document.getElementById("playNext");
let playPrevious=document.getElementById("playPrevious");
let artistName=document.getElementById("artist-name");
let year=document.getElementById("year");
let jumpBackwardTime=document.getElementById("jumpBackwardTime");
let jumpForwardTime=document.getElementById("jumpForwardTime");
let start=document.querySelector("#start");
let end=document.querySelector("#end");

// let source=document.querySelector("source")

song.onloadedmetadata = ()=>{
     progress.max=song.duration;
     progress.value=song.currentTime;
     let min= Math.floor(song.duration/60);
     let sec=Math.floor(song.duration%60);
     if(sec <10 ) sec=`0${sec}`;
     end.innerText=`${min}:${sec}`;
     
}
song.ontimeupdate=()=>{

     let min= Math.floor(song.currentTime/60);
     let sec=Math.floor(song.currentTime%60);

     if(sec <10 ) sec=`0${sec}`;
     start.innerText=`${min}:${sec}`;
}

ctrlPlay.onclick= function ctrlIco(){
     if (controlIcon.classList.contains("fa-pause")) {
          song.pause();
          controlIcon.classList.remove("fa-pause");
          controlIcon.classList.add("fa-play");

     }
     else{
          song.play();
          controlIcon.classList.add("fa-pause");
          controlIcon.classList.remove("fa-play");

     }
}



if (controlIcon.classList.contains("fa-play")) {
     setInterval(() => {
          progress.value=song.currentTime;
     },500);
}
     progress.onchange=function(){
          song.play();
          song.currentTime=progress.value;
          controlIcon.classList.add("fa-pause");
          controlIcon.classList.remove("fa-play");
     }

     playNext.onclick=function(e){

               let index=sF.findIndex(item=>item.title===songTitle.innerText);          
          //      if (index+1>=sF.length) {
          //           index=0;
          //      }
          //     else{
          //           index+=1;
          //     }
              index+1>=sF.length ? index=0: index+=1;

                   let nextSongSrc=sF[index].source;

                   loadSong(nextSongSrc,index);
     };

     playPrevious.onclick=function(e){
          
          let index=sF.findIndex(item=>item.title===songTitle.innerText);
          
     //      if (index-1<0) {
     //           index=sF.length-1;
     //      }
     //     else{
     //           index-=1;
     //     }

     index-1<0 ? index=sF.length-1: index-=1;//using ternary operators

              let prevSongSrc=sF[index].source;

              loadSong(prevSongSrc,index);
     }
     
     function loadSong(SongSrc,index) {
          fetch(SongSrc)
          .then(res=>res.blob())
          .then(blob=>{
               // console.log("BLob url verified");
          })
          .catch(error=>{
               console.error("Error fetching Blob url"+error);
          })

          song.src=SongSrc;
          song.load();

          song.addEventListener('canplaythrough',function () {
               if (controlIcon.classList.contains("fa-play")) {
                    controlIcon.classList.remove("fa-play");
                    controlIcon.classList.add("fa-pause");
               }
               song.play();
          });
          
          songTitle.innerText=sF[index].title || null;  
          artistName.innerText=sF[index].artist || null;
          year.innerText=sF[index].year || null;

          // console.log(("source:"+song.src));   
     }



     jumpForwardTime.onclick=function(e){
          song.currentTime+=10;
     };
     jumpBackwardTime.onclick=function(e){
          song.currentTime-=10;
     };


     


export {artistName,year,songImg}