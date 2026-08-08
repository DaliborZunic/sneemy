import { useEffect } from "react";
import "./VideoModal.css";
import type { GalleryVideo } from "@/types";

export default function VideoModal({ video, onClose }: { video: GalleryVideo; onClose: () => void }) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);
    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [onClose]);
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    const isReel = video.type === "reel";
    return (<div className="video-modal-backdrop" onClick={handleBackdropClick}>
            <button className="video-modal-close" onClick={onClose} aria-label="Zatvori video">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </button>

            <div className={`video-modal-content ${isReel ? "reel-video" : "landscape-video"}`}>
                <iframe src={`https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&playsinline=1`} title={video.clientName} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen/>
            </div>
        </div>);
}
