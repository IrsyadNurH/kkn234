// app/components/LoadingScreen.tsx
interface LoadingScreenProps {
  onFinished: () => void;
}

export default function LoadingScreen({ onFinished }: LoadingScreenProps) {
  return (
    // Anda bisa mengubah warna background di sini jika ingin, misal bg-black
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <video
        // Ganti 'object-cover' menjadi 'object-contain'
        className="w-full h-full object-contain"
        autoPlay
        muted
        playsInline // Tambahkan ini untuk kompatibilitas lebih baik di iOS
        onEnded={onFinished}
      >
        <source src="/loading-logo.mp4" type="video/mp4" />
        Browser Anda tidak mendukung tag video.
      </video>
    </div>
  );
}
