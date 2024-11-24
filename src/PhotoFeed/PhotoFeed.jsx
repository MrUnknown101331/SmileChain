import styles from './PhotoFeed.module.css'
import PropTypes from "prop-types";
import SmileCard from "../SmileCard/SmileCard.jsx";

function PhotoFeed(props) {
    return (
        <>
            {props.images.length && <p className={styles.head}>Winning Pictures</p>}
            <div className={styles.container}>
                {
                    props.images.map((image, index) => {
                            const date = new Date();
                            const today = (date.getHours() % 12 === 0) ? 12 : date.getHours() % 12;
                            const apm = (date.getHours() >= 12) ? 'PM' : 'AM';
                            const curr = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ', ' + today + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' + apm;
                            return (
                                <SmileCard
                                    key={index}
                                    image={image}
                                    time={curr}
                                    rating={4}
                                />
                            )
                        }
                    )
                }
            </div>
        </>
    )
}

PhotoFeed.propTypes = {
    images: PropTypes.array
}

export default PhotoFeed;


// {imgSrc && <img src={imgSrc} alt="Captured" style={{ maxWidth: '100%', marginTop: '1rem' }} />}

// 11/18/2024, 2:40:09 AM