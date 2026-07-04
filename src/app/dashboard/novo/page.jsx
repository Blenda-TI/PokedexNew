"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./form.module.css";

export default function NovoPokemon() {
  const router = useRouter();
  const [form, setForm] = useState({ 
    name: "", 
    type: "Fogo", 
    hp: 60, 
    attack: "", 
    description: "", 
    imageUrl: "", 
    rarity: "Comum" 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/pokemons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) router.push("/dashboard");
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.formBox}>
        <h2 className={styles.formTitle}>Criar Novo Card Pokémon</h2>
        
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Nome do Pokémon</label>
          <input type="text" required onChange={e => setForm({...form, name: e.target.value})} className={styles.input} />
        </div>

        <div className={styles.row}>
          <div>
            <label className={styles.label}>Tipo</label>
            <select onChange={e => setForm({...form, type: e.target.value})} className={styles.select}>
              <option value="Fogo">Fogo 🔥</option>
              <option value="Água">Água 💧</option>
              <option value="Planta">Planta 🍃</option>
              <option value="Elétrico">Elétrico ⚡</option>
              <option value="Psíquico">Psíquico 🔮</option>
            </select>
          </div>
          <div>
            <label className={styles.label}>HP</label>
            <input type="number" required defaultValue={60} onChange={e => setForm({...form, hp: Number(e.target.value)})} className={styles.input} />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Ataque Principal</label>
          <input type="text" required onChange={e => setForm({...form, attack: e.target.value})} className={styles.input} />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>URL da Imagem</label>
          <input type="url" required placeholder="https://..." onChange={e => setForm({...form, imageUrl: e.target.value})} className={styles.input} />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Raridade</label>
          <select onChange={e => setForm({...form, rarity: e.target.value})} className={styles.select}>
            <option value="Comum">Comum</option>
            <option value="Incomum">Incomum</option>
            <option value="Raro">Raro ✨</option>
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Descrição</label>
          <textarea required onChange={e => setForm({...form, description: e.target.value})} className={styles.textarea} />
        </div>

        <button type="submit" className={styles.btnSubmit}>Salvar Card</button>
        <button type="button" onClick={() => router.push("/dashboard")} className={styles.btnVoltar}>
          ← Voltar
        </button>
      </form>
    </div>
  );
}