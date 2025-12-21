import { useState } from "react";
import "./Gallery.css";
import ReelGallery from "./components/ReelGallery/ReelGallery";
import LandscapeGallery from "./components/LandscapeGallery/LandscapeGallery";
import VideoModal from "./components/VideoModal/VideoModal";

export interface GalleryVideo {
    id: string;
    clientName: string;
    youtubeId: string;
    type: "reel" | "landscape";
}

// Hardcoded video data - update this array when adding new videos
const galleryVideos: GalleryVideo[] = [
    // Reel-style (portrait) videos
    { id: "1", clientName: "Sample Company", youtubeId: "dQw4w9WgXcQ", type: "reel" },
    { id: "2", clientName: "Another Client", youtubeId: "dQw4w9WgXcQ", type: "reel" },
    { id: "3", clientName: "Brand Name", youtubeId: "dQw4w9WgXcQ", type: "reel" },
    // Landscape (YouTube-style) videos
    { id: "4", clientName: "Company ABC", youtubeId: "dQw4w9WgXcQ", type: "landscape" },
    { id: "5", clientName: "Business XYZ", youtubeId: "dQw4w9WgXcQ", type: "landscape" },
    { id: "6", clientName: "Client Corp", youtubeId: "dQw4w9WgXcQ", type: "landscape" },
];

type VideoType = "reel" | "landscape";

export default function Gallery() {
    const [selectedType, setSelectedType] = useState<VideoType>("reel");
    const [activeVideo, setActiveVideo] = useState<GalleryVideo | null>(null);

    const filteredVideos = galleryVideos.filter((v) => v.type === selectedType);

    const handleVideoClick = (video: GalleryVideo) => {
        setActiveVideo(video);
    };

    const handleCloseModal = () => {
        setActiveVideo(null);
    };

    return (
        <section className="gallery-section">
            <div className="section-content-wrapper">
                <h1>Gallery</h1>

                <div className="gallery-type-selector">
                    <select
                        className="gallery-select"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value as VideoType)}
                    >
                        <option value="reel">Reels (Portrait)</option>
                        <option value="landscape">YouTube Style (Landscape)</option>
                    </select>
                </div>

                {selectedType === "reel" ? (
                    <ReelGallery videos={filteredVideos} onVideoClick={handleVideoClick} />
                ) : (
                    <LandscapeGallery videos={filteredVideos} onVideoClick={handleVideoClick} />
                )}
            </div>

            {activeVideo && (
                <VideoModal video={activeVideo} onClose={handleCloseModal} />
            )}
        </section>
    );
}
