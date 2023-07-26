
export {fP,songListMap,songTitle,sF};
import { artistName,year,songImg } from "../script.js";

let myFile=document.getElementById("myfile");
let songTitle=document.getElementById("song-tittle");
const jsmediatags=window.jsmediatags;


// let artistName=document.getElementById("artist-name");
let songListMap=new Map();
let sF=[];
myFile.disabled=false;

let fP=[];
let urlObj=null;

myFile.onchange=e=> {
     const fileInput = document.querySelector('input[type=file]');
    const selectedFiles = fileInput.files;
     
     for (let i = 0; i < selectedFiles.length; i++) {

if(!selectedFiles.length || selectedFiles[i].type!="audio/mpeg" ){return}

urlObj=URL.createObjectURL(selectedFiles[i]);// for converting file to Blob to a url so that later can be used in the source of the file

// console.log(selectedFiles[i]);
fP.push(urlObj);
// console.log(urlObj);
song.src=fP[0];


songData(selectedFiles[i],fP[i]);



     }
        myFile.disabled=true;
        
}


function songData(selectedFiles,urlObj) {
     
     const file=selectedFiles;

     jsmediatags.read(file,{
          onSuccess:function(tag){

          
                songTitle.innerText=tag.tags.title || null;
                artistName.innerText=tag.tags.artist || null;
                year.innerText=tag.tags.year || null;
                sF.push({
                    "title":tag.tags.title,
                    "artist":tag.tags.artist,
                    "year":tag.tags.year,
                    "source":urlObj
                });
               //  console.log(tag.tags);
          },
          onError: function(error){
               console.log(error);
          }
     })
}





// setTimeout(() => {
//      if (fP.length>0) {
//                     console.log(fP);
//                     console.log(...songListMap);
//                }
// }, 10000);

// setInterval(() => {
//      if (fP.length>0) {
//           console.log(fP);
//           console.log(...songListMap);
//      }
// }, 5000);

// if (fP!=null) {
//      song.setAttribute('src',fP[1])
// }
// myFile.onclick=e=>{
//      FileChooser fileChooser = new FileChooser();
// fileChooser.setTitle("Choose File");
// fileChooser.setInitialDirectory(new File(System.getProperty("user.home")));
// fileChooser.getExtensionFilters().addAll(
//     new ExtensionFilter("Excel Files", "*.xlsx", "*.xls"),
//     new ExtensionFilter("All Files", "*.*")
// );
// List<File> selectedFiles = fileChooser.showOpenMultipleDialog(stage); // modify to show open multiple dialog

// if (selectedFiles != null) {
//     for (File file : selectedFiles) {
//         System.out.println(file.getPath()); // print path for each selected file
//     }
// }

// }


// const input = document.getElementById('input');
// input.addEventListener('change', function() {
//   const files = this.files;
//   for (let i = 0; i < files.length; i++) {
//     const reader = new FileReader();
//     reader.onload = function() {
//       console.log('File path:', files[i].path); // access file path
//       console.log('File name:', files[i].name); // access file name
//     };
//     reader.readAsDataURL(files[i]);
//   }
// });
