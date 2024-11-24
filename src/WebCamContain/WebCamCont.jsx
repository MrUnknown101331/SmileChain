import styles from './WebCamCont.module.css'
import Webcam from "react-webcam";
import {useRef} from "react";
import PropTypes from "prop-types";

function WebCamCont(props) {
    const webcamRef = useRef(null);
    const videoConstraints = {
        width: 720,
        height: 720,
        facingMode: "user"
    };

    const capture = () => {
        const img = webcamRef.current.getScreenshot();
        props.addImage(img)
    }
    return (
        <div className={styles.box}>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className={styles.CamCont}
                mirrored={true}
            />
            <button onClick={capture} className={styles.captureBtn}>Capture photo</button>
        </div>
    )
}

WebCamCont.propTypes = {
    addImage: PropTypes.func.isRequired
}

export default WebCamCont;