import { FormEvent, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Poppins } from "@next/font/google";

const reading = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const Conta = () => {
  return (
    <main className={`${reading.className}`}>
      <Image width={60} height={68} src="/logo.png" alt="Logo da TikCash" />

      <h1>Conta criada com sucesso! Faça login no aplicativo!</h1>
    </main>
  );
};

export default function Page() {
  return <Conta />;
}
