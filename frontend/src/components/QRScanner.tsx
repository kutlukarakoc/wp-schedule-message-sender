import { useEffect, useState } from "react";
import { getQR } from "../lib/api";
import { Card } from "@/components/ui/card";

const QRScanner = () => {
  const [qr, setQr] = useState("");

  useEffect(() => {
    const fetchQR = async () => {
      try {
        const response = await getQR();
        setQr(response.data.qr);
      } catch (error) {
        console.error("QR kodu alınırken hata oluştu!", error);
      }
    };
    fetchQR();
  }, []);

  return (
    <Card className="p-6 max-w-lg mx-auto text-center">
      <h2 className="text-lg font-semibold mb-4">QR Kodunu Tarat</h2>
      {qr ? (
        <pre className="bg-gray-100 p-4">{qr}</pre>
      ) : (
        <p>QR kod yükleniyor...</p>
      )}
    </Card>
  );
};

export default QRScanner;
