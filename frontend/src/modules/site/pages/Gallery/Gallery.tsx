import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./Gallery.css";
import ReelGallery from "./components/ReelGallery/ReelGallery";
import LandscapeGallery from "./components/LandscapeGallery/LandscapeGallery";
import VideoModal from "./components/VideoModal/VideoModal";

export interface GalleryVideo {
    id: string;
    clientName: string;
    vimeoId: string;
    type: "reel" | "landscape";
}

// Hardcoded video data - update this array when adding new videos
// To get Vimeo ID: from URL https://vimeo.com/123456789 the ID is 123456789
const galleryVideos: GalleryVideo[] = [
    // Reel-style (portrait) videos
    { id: "1", clientName: "Sample Company", vimeoId: "824804225", type: "reel" },
    { id: "2", clientName: "Another Client", vimeoId: "824804225", type: "reel" },
    { id: "3", clientName: "Brand Name", vimeoId: "824804225", type: "reel" },
    // Landscape (YouTube-style) videos
    { id: "4", clientName: "Company ABC", vimeoId: "824804225", type: "landscape" },
    { id: "5", clientName: "Business XYZ", vimeoId: "824804225", type: "landscape" },
    { id: "6", clientName: "Client Corp", vimeoId: "824804225", type: "landscape" },
];

type VideoType = "reel" | "landscape";

export default function Gallery() {
    const [searchParams] = useSearchParams();
    const [selectedType, setSelectedType] = useState<VideoType>("reel");
    const [activeVideo, setActiveVideo] = useState<GalleryVideo | null>(null);

    // Read type from URL param on mount
    useEffect(() => {
        const typeParam = searchParams.get("type");
        if (typeParam === "reel" || typeParam === "landscape") {
            setSelectedType(typeParam);
        }
    }, [searchParams]);

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
                <h1>Galerija</h1>

                <div className="gallery-type-selector">
                    <select
                        className="gallery-select"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value as VideoType)}
                    >
                        <option value="reel">Reels (portret)</option>
                        <option value="landscape">YouTube stil (pejzaž)</option>
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
