import { FormEvent, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Poppins } from "@next/font/google";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const reading = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const getServerSideProps = (async (ctx) => {
  const query = ctx.query as {
    uid?: string;
  };

  if (!query.uid) {
    return {
      notFound: true,
      props: {},
    };
  }

  const token = process.env.SECURITY_TOKEN;

  if (query.uid !== token) {
    return {
      notFound: true,
      props: {},
    };
  }

  return {
    props: {},
  };
}) satisfies GetServerSideProps;

const Conta = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = useSupabaseClient();

  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      return alert("Por favor preencha os campos!");
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return alert("Ocorreu um erro");
      }
    } catch (error) {
      return alert("Ocorreu um erro");
    }
    // register

    router.push("/conta-criada");
  };

  return (
    <main className={`${reading.className}`}>
      <Image width={60} height={68} src="/logo.png" alt="Logo da TikCash" />

      <h1>Faça seu cadastro</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Insira seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Insira sua senha"
          value={password}
          minLength={6}
          maxLength={100}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Fazer cadastro</button>
      </form>
    </main>
  );
};

export default function Page() {
  const [loading, setLoading] = useState(true);
  const { query } = useRouter();

  useEffect(() => {
    // validate query
    setLoading(false);
  }, [query]);

  if (loading) {
    return <h1>loading....</h1>;
  }

  return <Conta />;
}
