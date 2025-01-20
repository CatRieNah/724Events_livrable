import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // tri decroissant donc sort((a, b) => b-a retourne un chiffre positif si b>a)
  const byDateDesc = data?.focus
  // on copie le tableau de data.focus pour ne pas le modifier
    ? [...data.focus].sort((evtA, evtB) =>
        new Date(evtB.date) > new Date(evtA.date) ? 1 : -1
      )
    : [];

    // fonction pour passer à la carte suivante
    const nextCard = () => {
      // prevIndex est l'index actuel au moment où la mise à jour est calculée
      setIndex((prevIndex) => 
        prevIndex <byDateDesc.length - 1 ? prevIndex + 1 : 0
      )
    };
  
    useEffect(() => {
      const timer = setTimeout(nextCard, 5000); // Déclenche la fonction nextCard toutes les 5 secondes
      return () => clearTimeout(timer); // Nettoie le timer pour éviter les problèmes de mémoire
    }, [index, byDateDesc.length]); // Redémarre le timer lorsque l'index ou la longueur change
  return (
    <div className="SlideCardList">
      {/* Sortir la pagination dans la boucle map */}
      {byDateDesc?.map((event, idx) => (
        <div
          key={`${event.title}-${event.date}`}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((event, radioIdx) => (
                <input
                  key={`${event.title}-${event.date}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => setIndex(radioIdx)}  // Gestionnaire d'événements onChange

                />
              ))}
            </div>
          </div>
    </div>
  );
};

export default Slider;
