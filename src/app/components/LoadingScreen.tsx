// app/components/LoadingScreen.tsx
interface LoadingScreenProps {
  onFinished: () => void;
}

export default function LoadingScreen({ onFinished }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 bg-white z-50">
      <video
        // 1. Hapus atribut width dan height
        // 2. Tambahkan className untuk styling fullscreen
        className="w-full h-full object-cover" 
        autoPlay
        muted
        onEnded={onFinished}
      >
        <source src="/loading-logo.mp4" type="video/mp4" />
        Browser Anda tidak mendukung tag video.
      </video>
    </div>
  );
}