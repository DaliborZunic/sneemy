import type { GalleryVideo } from "../../Gallery";
import "./ReelGallery.css";

interface ReelGalleryProps {
    videos: GalleryVideo[];
    onVideoClick: (video: GalleryVideo) => void;
}

export default function ReelGallery({ videos, onVideoClick }: ReelGalleryProps) {
    const getThumbnailUrl = (youtubeId: string) => {
        return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
    };

    return (
        <div className="reel-gallery-grid">
            {videos.map((video) => (
                <div key={video.id} className="reel-item">
                    <div
                        className="reel-thumbnail-wrapper"
                        onClick={() => onVideoClick(video)}
                    >
                        <img
                            src={getThumbnailUrl(video.youtubeId)}
                            alt={video.clientName}
                            className="reel-thumbnail"
                        />
                        <div className="reel-play-overlay">
                            <svg
                                className="play-icon"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                    <p className="reel-client-name">{video.clientName}</p>
                </div>
            ))}
        </div>
    );
}
