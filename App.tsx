import { useEffect, useRef, useState } from 'react'
 
import './App.css'
import type React from 'react';

   const songs=[
    {
 
{
name:'Fly Me To The Moon',
imgurl:'./fly me to the moon.jpg',
audiourl:'https://github.com/fatimaAlzahraa-almaz/music-play/raw/main/fly%20me%20to%20the%20moon.mp3'
},
{
name:'Breath-Years & Years',
imgurl:'./breath.jpg',
audiourl:'https://github.com/fatimaAlzahraa-almaz/music-play/raw/main/breath.mp3'
},
{
name:'Dark Opening',
imgurl:'./dark.png',
audiourl:'https://github.com/fatimaAlzahraa-almaz/music-play/raw/main/Dark.mp3'
}
 ,
 {
name:'Rose-APT',
imgurl:'./apt.jpg',
audiourl:'https://github.com/fatimaAlzahraa-almaz/music-play/raw/main/Rose-Apt.mp3'
}
,
 
{
name:'Call Of Silence -AOT',
imgurl:'./call of silence.jpg',
audiourl:'https://github.com/fatimaAlzahraa-almaz/music-play/raw/main/call%20of%20silence.mp3'
},
{
name:'Round and Round',
imgurl:'./round.jpg',
audiourl:'https://github.com/fatimaAlzahraa-almaz/music-play/raw/main/Round%20and%20Round.mp3'
},
{
name:'Mortals Funk (Remix)',
imgurl:'./mortall funk.jpg',
audiourl:'https://github.com/fatimaAlzahraa-almaz/music-play/raw/main/Mortals%20Funk%20Remix.mp3'
},{
name:'2 Phut Hon Funk',
imgurl:'./phot hon.jpg',
audiourl:'./2 Phut Hon Funk.mp3'
},
{
name:'Hurt-maikubi',
imgurl:'./hurt.jpg',
audiourl:'./hurt maikubi.mp3'
},
 
 

];
 
function App() {
  
    const audioRef = useRef<HTMLAudioElement>(null);
    const[index,setindex]=useState(0);
    const [progress, setProgress] = useState(0);
    const[isplay,setplay]=useState(false);
    const[imgplayer,setimgplayer]=useState('public/Frame 3.png');
    
    
    useEffect(() => {
        const audio = audioRef.current;

        if (audio) {
            const updateProgress = () => {
                const progressValue = (audio.currentTime / audio.duration) * 100;
                setProgress(progressValue);
            };
 const handleEnded = () => {
                setindex((prevIndex) => (prevIndex + 1) % songs.length);
            };

            audio.addEventListener('timeupdate', updateProgress);
            audio.addEventListener('ended', handleEnded);
            return () => {
                audio.removeEventListener('timeupdate', updateProgress);
                audio.removeEventListener('ended', handleEnded);
            };
        }
    }, []);
     useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = songs[index].audiourl;
            if(isplay)
                audioRef.current.play();
            
        }
    }, [index]);

    const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = (parseFloat(event.target.value) / 100) * (audioRef.current?.duration || 0);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };
 function hundleplay(play=false)
 {
if(play)
{
    setplay(false);
    audioRef.current?.pause();
    setimgplayer('./Frame 3.png')

}
else{
    setplay(true);
    audioRef.current?.play();
    setimgplayer('./stopmusic.png')

}
 }
  
 
 function hundelright()
 {
setindex((index+1)%songs.length);




 }
 function hundleleft()
 {
  setindex((index+(songs.length-1))%songs.length);
 }


  return (
    < div className="wrap"> 
    <div className='container'> 
        <div className="head">
             <div className='dodev' ><img className="doimg"src='./do.jpg'/></div>
             <div className='songname'><h3 className='hname'>{songs[index].name}</h3> 
               </div>
             <div className='dodev' ><img className="doimg"src='./do.jpg'/></div>
        </div>
      
      <div className='imgdiv'><img className='imgsong' src={songs[index].imgurl}/></div>
            <div>
            <audio ref={audioRef} className='audio'  />
            <input
            className='inputclass'
                type="range"
                id="progressBar"
                min="0"
                value={progress}
                step="1"
                onChange={handleProgressChange}
                 
            />
             </div>

            <div className="btnsbox">
  <button onClick={hundleleft} className='btn leftr'><img className="btnimg leftrimg"src="./leftbt.png"/></button>
  
  <button  className='btn' onClick={()=>hundleplay(isplay)}><img className="btnimg" src={imgplayer}/></button>
  <button  className='btn leftr' onClick={hundelright}><img className="btnimg leftrimg" src="./rightbt 4.png"/></button>
  
</div>
  

     </div>  
     </div> 
    );

  
}

export default App
