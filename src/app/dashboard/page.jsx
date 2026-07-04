"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import PokemonCard from "@/app/components/PokemonCard";
import styles from "./dashboard.module.css";
import Image from "next/image";

export default function Dashboard() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [pokemonToDelete, setPokemonToDelete] = useState(null);

  useEffect(() => { 
    let isMounted = true;

    async function fetchPokemons() {
      try {
        const res = await fetch(`/api/pokemons?search=${encodeURIComponent(search)}`);
        const data = await res.json();
        if (isMounted && Array.isArray(data)) {
          setPokemons(data);
        }
      } catch (err) {
        console.error("Erro ao buscar pokémons:", err);
      }
    }

    fetchPokemons(); 

    return () => {
      isMounted = false;
    };
  }, [search]);

  const confirmDelete = async () => {
    if (!pokemonToDelete) return;
    try {
      await fetch(`/api/pokemons/${pokemonToDelete.id}`, { method: "DELETE" });
      const res = await fetch(`/api/pokemons?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      if (Array.isArray(data)) setPokemons(data);
    } catch (err) {
      console.error("Erro ao deletar:", err);
    } finally {
      setPokemonToDelete(null);
    }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.brand}>
          <div className={styles.pokeball}>
            <div className={styles.pokeballCenter}></div>
          </div>
          <Image src="/pokemon-logo.png" alt="Pokémon" width={120} height={42} className={styles.logoFloat} />        </div>
        <div className={styles.navActions}>
         <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input 
            type="text" 
            placeholder="Buscar pokémon por nome..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
          <a href="/dashboard/novo" className={styles.btnNew}>Novo Card</a>
          <button onClick={() => signOut({ callbackUrl: "/login" })} className={styles.btnLogout}>Sair</button>
        </div>
      </nav>

      <main className={styles.mainGrid}>
        {pokemons.length === 0 ? (
          <p className={styles.noData}>Nenhum card encontrado. Comece por criar um novo!</p>
        ) : (
          pokemons.map((poke) => (
            <PokemonCard key={poke.id} pokemon={poke} onDelete={() => setPokemonToDelete(poke)} />
          ))
        )}
      </main>

      {pokemonToDelete && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <div className={styles.modalIcon}>⚠️</div>
            <h3 className={styles.modalTitle}>Eliminar Card</h3>
            <p className={styles.modalText}>
              Tem certeza que deseja eliminar <strong>{pokemonToDelete.name}</strong>? Esta ação não pode ser desfeita.
            </p>
            <div className={styles.modalActions}>
              <button className={styles.modalCancel} onClick={() => setPokemonToDelete(null)}>
                Cancelar
              </button>
              <button className={styles.modalConfirm} onClick={confirmDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}