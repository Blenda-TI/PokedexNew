import Link from "next/link";
import styles from "./PokemonCard.module.css";

const TYPE_STYLES = {
  "Fogo": { color: "#ee8130", emoji: "🔥", bg: "linear-gradient(160deg, #fff6ed, #ffe3c9)" },
  "Água": { color: "#6390f0", emoji: "💧", bg: "linear-gradient(160deg, #edf3ff, #cfe0ff)" },
  "Planta": { color: "#7ac74c", emoji: "🍃", bg: "linear-gradient(160deg, #f1fbe9, #d7f5c1)" },
  "Elétrico": { color: "#f7d02c", emoji: "⚡", bg: "linear-gradient(160deg, #fffbe8, #fff1b8)" },
  "Psíquico": { color: "#f95587", emoji: "🔮", bg: "linear-gradient(160deg, #fff0f5, #ffd6e6)" },
};

export default function PokemonCard({ pokemon, onDelete }) {
  const typeStyle = TYPE_STYLES[pokemon.type] || TYPE_STYLES["Fogo"];

  return (
    <div className={styles.card} style={{ borderColor: typeStyle.color }}>
      <div className={styles.cardHeader} style={{ background: typeStyle.color }}>
        <h3 className={styles.name}>{pokemon.name}</h3>
        <span className={styles.hp}>{pokemon.hp} HP</span>
      </div>

      <div className={styles.imageBox} style={{ background: typeStyle.bg }}>
        <img src={pokemon.imageUrl} alt={pokemon.name} className={styles.image} />
        <span className={styles.typeTag} style={{ background: typeStyle.color }}>
          {typeStyle.emoji} {pokemon.type}
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.attackRow}>
          <span className={styles.attackIcon}>⚔️</span>
          <span className={styles.attackName}>{pokemon.attack}</span>
        </div>
        <p className={styles.description}>{pokemon.description}</p>

        <div className={styles.footer}>
          <span className={styles.rarity} style={{ color: typeStyle.color }}>
            {pokemon.rarity === "Raro" ? "✨ " : ""}{pokemon.rarity}
          </span>
          <div className={styles.actions}>
            <Link href={`/dashboard/editar/${pokemon.id}`} className={styles.btnEdit}>
              Editar
            </Link>
            <button onClick={onDelete} className={styles.btnDelete}>
              Deletar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}