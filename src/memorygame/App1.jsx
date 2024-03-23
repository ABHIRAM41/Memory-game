import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";

const cardImage = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

export default function App1() {
  const [card, setCard] = useState([]);
  const [num, setNum] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled,setDisabled]=useState(false);
  //shuffled cards
  const shuffleCards = () => {
    const suffledCards = [...cardImage, ...cardImage]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

      setChoiceOne(null);
    setChoiceTwo(null);
    setCard(suffledCards);
    setNum(0);

  };
  const handleChoice = (c) => {
    choiceOne ? setChoiceTwo(c) : setChoiceOne(c);
  };

  useEffect(() => {
    
    if (choiceOne && choiceTwo) {setDisabled(true);
      if (choiceTwo.src === choiceOne.src)
        setCard((prev) => {
          return prev.map((cards) => {
            if (cards.src === choiceOne.src) return { ...cards, matched: true };
            return cards;
          });
        });
      else {
        console.log("not equal");
      }
      setTimeout(()=>resetTurn(),1000);
    }
  }, [choiceOne, choiceTwo]);

  useEffect(()=>{
    shuffleCards();
  },[])

  // const checkChoice=()=>{
  //     if(choiceTwo.src===choiceOne.src)
  //     console.log("equal");
  //     else {
  //         console.log("not equal")
  //     }
  //     resetTurn();
  // }

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setNum((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  // console.log(card,num)
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {card.map((card) => (
          <SingleCard 
            card={card}
            key={card.id}
            handleChoice={handleChoice} 
            flipped={card===choiceOne || card===choiceTwo || card.matched}
            disabled={disabled}
            />
        ))}
      </div>
      <p>Turns: {num}</p>
    </div>
  );
}
