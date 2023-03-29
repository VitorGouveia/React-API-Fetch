import Image from "next/image";
import { useRouter } from "next/router";
import { Poppins } from "@next/font/google";

const reading = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const Conta = () => {
  const router = useRouter();

  const redirect = () => {
    window.location.href =
      "https://play.google.com/store/search?q=meu%20app&c=apps";
  };

  return (
    <main className={`${reading.className}`} style={{ paddingInline: "30px" }}>
      <Image width={60} height={88} src="/logo.png" alt="Logo da TikCash" />

      <h1>Copie e guarde esse código de indicação para ganhar 100 moedas!</h1>

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          borderRadius: "12px",
          overflow: "overlay",
          overflowX: "hidden",
        }}
      >
        <p
          style={{
            width: "60%",
            height: "100%",
            background: "#fff",
            color: "#000",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {router.query.code}
        </p>
        <button
          onClick={async () => {
            if (navigator.clipboard) {
              await navigator.clipboard.writeText(String(router.query.code));
              alert("Código copiado!");
            }
          }}
          style={{ width: "40%", borderRadius: "0px", fontSize: "14px" }}
        >
          COPIAR
        </button>
      </div>

      <button onClick={redirect}>Baixar o app</button>
    </main>
  );
};

export default Conta;
