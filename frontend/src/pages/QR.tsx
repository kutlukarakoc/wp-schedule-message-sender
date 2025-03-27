import QRScanner from "../components/QRScanner";

const QRPage = () => {
  return (
    <main className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">QR Kod Tarayıcı</h1>
      <QRScanner />
    </main>
  );
};

export default QRPage;
