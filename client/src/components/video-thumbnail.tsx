import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

interface VideoThumbnailProps {
  thumbnailSrc: string;
  videoUrl: string;
  title: string;
  className?: string;
}

export function VideoThumbnail({ thumbnailSrc, videoUrl, title, className = "" }: VideoThumbnailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Convert Google Drive share URL to embeddable preview URL
  const getEmbedUrl = (url: string) => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return url;
  };

  return (
    <>
      {/* Thumbnail with play button */}
      <motion.div
        className={`video-thumbnail-wrapper relative cursor-pointer overflow-hidden rounded-lg group ${className}`}
        onClick={() => setIsModalOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        role="button"
        aria-label={`Play video: ${title}`}
      >
        <img
          src={thumbnailSrc}
          alt={`${title} video thumbnail`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {/* Pulsing ring */}
            <div className="absolute inset-0 -m-2 rounded-full bg-white/20 animate-ping" style={{ animationDuration: "2s" }} />

            {/* Play button circle */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:bg-white transition-colors duration-200">
              <Play className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900 ml-0.5" fill="currentColor" />
            </div>
          </motion.div>
        </div>

        {/* "Watch Video" label */}
        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
          <span className="text-[10px] sm:text-xs text-white/80 font-medium tracking-wide uppercase flex items-center gap-1">
            <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3" fill="currentColor" />
            Watch Video
          </span>
        </div>
      </motion.div>

      {/* Full-screen video modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(false);
              }}
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </motion.button>

            {/* Video container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-[92vw] max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={getEmbedUrl(videoUrl)}
                title={title}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>

            {/* Video title */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-4 sm:bottom-6 text-white/70 text-xs sm:text-sm font-medium"
            >
              {title}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
