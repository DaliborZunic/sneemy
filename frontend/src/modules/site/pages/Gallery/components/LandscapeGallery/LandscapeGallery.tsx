import type { GalleryVideo } from "../../Gallery";
import "./LandscapeGallery.css";

interface LandscapeGalleryProps {
    videos: GalleryVideo[];
    onVideoClick: (video: GalleryVideo) => void;
}

export default function LandscapeGallery({ videos, onVideoClick }: LandscapeGalleryProps) {
    const getThumbnailUrl = (vimeoId: string) => {
        return `https://vumbnail.com/${vimeoId}.jpg`;
    };

    return (
        <div className="landscape-gallery-grid">
            {videos.map((video) => (
                <div key={video.id} className="landscape-item">
                    <div
                        className="landscape-thumbnail-wrapper"
                        onClick={() => onVideoClick(video)}
                    >
                        <img
                            src={getThumbnailUrl(video.vimeoId)}
                            alt={video.clientName}
                            className="landscape-thumbnail"
                        />
                        <div className="landscape-play-overlay">
                            <svg
                                className="play-icon"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                    <p className="landscape-client-name">{video.clientName}</p>
                </div>
            ))}
        </div>
    );
}
