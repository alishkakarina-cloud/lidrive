import { useEffect } from "react";
import { X } from "lucide-react";
import { useUI } from "../lib/ui";

const VIDEO_SRC = "https://videos.pexels.com/video-files/4319761/4319761-sd_640_360_30fps.mp4";

export default function VideoModal() {
  const { videoOpen, setVideoOpen } = useUI();

  useEffect(() => {
    if (!videoOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setVideoOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [videoOpen, setVideoOpen]);

  if (!videoOpen) return null;

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      <button
        aria-label="Закрыть видео"
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={() => setVideoOpen(false)}
      />
      <div className="animate-fade-up relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
        <button
          type="button"
          onClick={() => setVideoOpen(false)}
          aria-label="Закрыть"
          className="glass-strong absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full"
        >
          <X size={18} />
        </button>
        <video
          src={VIDEO_SRC}
          controls
          autoPlay
          playsInline
          className="aspect-video w-full bg-black"
        />
      </div>
    </div>
  );
}
