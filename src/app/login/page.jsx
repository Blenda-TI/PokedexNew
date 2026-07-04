"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../auth.module.css";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("E-mail ou senha incorretos.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.sceneLayer}>
        <Image src="/character-3.png" alt="" width={260} height={260} className={styles.charBig} />
        <Image src="/character-1.png" alt="" width={70} height={70} className={styles.charSmall1} />
        <Image src="/character-2.png" alt="" width={60} height={60} className={styles.charSmall2} />
      </div>

      <div className={styles.box}>
        <div className={styles.badge}>
          <div className={styles.badgeBand}></div>
          <div className={styles.badgeButton}></div>
        </div>
        <h2 className={styles.title}>Bem-vindo de volta</h2>
        <p className={styles.subtitle}>Entre para acessar sua coleção</p>

        {error && <div className={styles.error}>⚠️ {error}</div>}

        <form onSubmit={handleLogin}>
          <div className={styles.field}>
            <label className={styles.label}>E-mail</label>
            <input type="email" required placeholder="seuemail@exemplo.com" className={styles.input} value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Senha</label>
            <input type="password" required placeholder="••••••••" className={styles.input} value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className={styles.divider}></div>
        <p className={styles.link}>Não tem conta? <a href="/cadastro">Cadastre-se</a></p>
      </div>
    </div>
  );
}