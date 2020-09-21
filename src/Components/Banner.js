import React from 'react'
import { CarouselProvider, Slider, Slide} from 'pure-react-carousel';
import {Button} from "@material-ui/core"
import 'pure-react-carousel/dist/react-carousel.es.css';

const Banner = () => {
    return (
        <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={18}
            totalSlides={2}>
            <Slider>
                <Slide index={0}>
                    <div style={{position: "relative", textAlign: "center"}}>
                        <img style={{opacity: "0.5", width: "100%", height:"300px", objectFit:"cover"}} src="https://thebannercsi.files.wordpress.com/2019/04/disney-deadpool.jpg" alt="gambar" />
                        <div style={{position: "absolute",top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                            <h1 style={{color: "white", fontSize:"40px", fontWeight:"900"}}> MOVIES </h1>
                            <h3  style={{color: "white", fontSize:"20px"}} > Find your Favorite Movie! </h3>   
                            <Button href="/movie" variant="outlined" style={{fontSize:"14px", color:"white", backgroundColor: "rgba(51,51,51, 0.5)"}} >More</Button>
                        </div>
                    </div>
                </Slide>
                <Slide index={1}>
                    <div style={{position: "relative", textAlign: "center"}}>
                        <img style={{opacity: "0.5", width: "100%", height:"300px", objectFit:"cover"}} src="http://www.innersloth.com/Images/GAMES/AmongUs/banner_AmongUs.jpg" alt="gambar" />
                        <div style={{position: "absolute",top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                            <h1 style={{color: "white", fontSize:"40px", fontWeight:"900"}}> Games </h1> 
                            <h3  style={{color: "white", fontSize:"20px"}} > Find Impostart on your team! </h3> 
                            <Button href="/game" variant="outlined" style={{fontSize:"14px", color:"white", backgroundColor: "rgba(51,51,51, 0.5)"}} >More</Button>
                        </div>
                    </div>
                </Slide>
            </Slider>
        </CarouselProvider>
    )
}

export default Banner
