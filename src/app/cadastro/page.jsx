"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "../auth.module.css";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Algo deu errado");
      }

      router.push("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
        <h2 className={styles.title}>Criar Conta</h2>
        <p className={styles.subtitle}>Comece a montar sua coleção agora</p>

        {error && <div className={styles.error}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Nome</label>
            <input type="text" required placeholder="Seu nome" className={styles.input} value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>E-mail</label>
            <input type="email" required placeholder="seuemail@exemplo.com" className={styles.input} value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Senha</label>
            <input type="password" required placeholder="••••••••" className={styles.input} value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? "Criando conta..." : "Criar Conta"}
          </button>
        </form>

        <div className={styles.divider}></div>
        <p className={styles.link}>Já tem uma conta? <Link href="/login">Faça login aqui</Link></p>
      </div>
    </div>
  );
}   