import { useState, useEffect } from "react";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlusCircle, FaCalculator, FaRedo, FaListUl } from "react-icons/fa";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [total, setTotal] = useState("");
  const [moyenne, setMoyenne] = useState(null);
  const [base, setBase] = useState(20);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const ajouterNote = () => {
    const n = parseFloat(note);
    const t = parseFloat(total);
    if (isNaN(n) || isNaN(t) || t <= 0) {
      alert("Veuillez entrer des valeurs valides.");
      return;
    }
    if (n > t) {
      alert("La note ne peut pas être supérieure au total.");
      return;
    }
    setNotes([...notes, { note: n, total: t }]);
    setNote("");
    setTotal("");
    setMoyenne(null);
  };

  const calculerMoyenne = () => {
    const totalNotes = notes.reduce((acc, n) => acc + n.note, 0);
    const totalMax = notes.reduce((acc, n) => acc + n.total, 0);
    if (totalMax === 0) return;
    const moyenneFinale = (totalNotes / totalMax) * base;
    setMoyenne(base === 100 ? `${moyenneFinale.toFixed(2)}%` : moyenneFinale.toFixed(2));
  };

  const reset = () => {
    setNotes([]);
    setNote("");
    setTotal("");
    setMoyenne(null);
  };

  return (
    <div className={darkMode ? "dark container" : "container"}>
      <motion.h1 className="title" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        🎓 Bienvenue à toi
      </motion.h1>

      <p className="intro">
        Cet outil te permet d’ajouter toutes tes interrogations
        pour obtenir ta vraie moyenne comme celle du bulletin scolaire.
      </p>

      <div className="dark-toggle">
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          Mode sombre
        </label>
      </div>

      <motion.div className="inputs" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
        <input
          type="number"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note obtenue"
          className="input"
        />
        <input
          type="number"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          placeholder="Sur"
          className="input"
        />
        <button onClick={ajouterNote} className="button primary">
          <FaPlusCircle style={{ marginRight: "8px" }} /> Ajouter
        </button>
      </motion.div>

      <ul className="notes-list">
        <AnimatePresence>
          {notes.map((n, index) => (
            <motion.li
              key={index}
              className="note-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <FaListUl style={{ marginRight: "6px", color: "#888" }} /> {n.note} / {n.total}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <motion.div className="moyenne-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <label className="label">Moyenne sur :</label>
        <select
          value={base}
          onChange={(e) => setBase(parseInt(e.target.value))}
          className="select"
        >
          <option value={20}>20</option>
          <option value={100}>100</option>
        </select>
        <button onClick={calculerMoyenne} className="button success">
          <FaCalculator style={{ marginRight: "8px" }} /> Calculer
        </button>
      </motion.div>

      <AnimatePresence>
        {moyenne !== null && (
          <motion.p
            className="result"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            Moyenne sur {base} : <span>{moyenne}</span>
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        className="button danger"
        onClick={reset}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <FaRedo style={{ marginRight: "8px" }} /> Tout effacer
      </motion.button>
    </div>
  );
}