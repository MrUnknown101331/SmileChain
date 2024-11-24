import {useState} from 'react'
import TopBar from "./TopBar/TopBar.jsx";
import WebCamCont from "./WebCamContain/WebCamCont.jsx";
import PhotoFeed from "./PhotoFeed/PhotoFeed.jsx";

function App() {
    const [images, setImages] = useState([]);
    const addImage = (image) => {
        setImages((prevItems) => [...prevItems, image]);
    }


    return (
        <>
            <TopBar/>
            <WebCamCont addImage={addImage}/>
            <PhotoFeed images={images}/>
        </>
    )
}

export default App;
