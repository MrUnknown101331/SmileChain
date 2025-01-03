import {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import io from "socket.io-client";
import serverAddress from "../API_Requests/serverAddress.js";
import {toast} from "react-toastify";
import styles from './SmileCard.module.css';

// Connect to WebSocket server
const socket = io(serverAddress);

function SmileCard(props) {
    const [likes, setLikes] = useState(props.likes);

    const likePic = () => {
        if (props.isLoggedIn) {
            // Optimistic update for UI
            const wasLiked = props.likedImg.includes(props.id);
            setLikes((prevLikes) => (wasLiked ? prevLikes - 1 : prevLikes + 1));
            if (wasLiked) {
                props.updateLikedImg((prevLiked) => prevLiked.filter((id) => id !== props.id));
            } else {
                props.updateLikedImg((prevLiked) => [...prevLiked, props.id]);
            }

            // WebSocket request to like the image
            socket.emit("likeImage", {
                imageId: props.id,
                AccessToken: props.AccessToken
            }, (response) => {
                if (!response.success) {
                    console.error(response.message);
                    // Revert optimistic update if there's an error
                    setLikes((prevLikes) => (wasLiked ? prevLikes + 1 : prevLikes - 1));
                    props.updateLikedImg((prevLiked) =>
                        wasLiked ? [...prevLiked, props.id] : prevLiked.filter((id) => id !== props.id)
                    );
                }
            });
        } else {
            toast.error("Please log in to like.", {
                position: "top-right",
            });
        }
    };

    useEffect(() => {
        const handleLikeChange = (data) => {
            if (data.imageId === props.id) {
                setLikes(data.likes);
            }
        };
        socket.on("image-like-changed", handleLikeChange);

        return () => {
            socket.off("image-like-changed", handleLikeChange);
        };
    }, [props.id]);

    return (
        <div className={styles.container}>
            <img className={styles.image} src={props.image} alt="Captured Image"/>
            <div className={styles.line}>
                <p className={styles.time}>{props.time}</p>
                <button
                    className={`${styles.likes} ${(props.isLoggedIn && props.likedImg.includes(props.id)) ? styles.liked : ""}`}
                    onClick={likePic}>👍{likes}</button>
            </div>
            <p className={styles.winner}>$ Winner!</p>
            <p className={styles.award}>🎉 0.001🪙 awarded! 🎉</p>
            <p className={styles.rating}>{props.rating}/5⭐</p>
        </div>
    );
}

SmileCard.propTypes = {
    image: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
    AccessToken: PropTypes.string.isRequired,
    likedImg: PropTypes.array.isRequired,
    updateLikedImg: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
};

export default SmileCard;
