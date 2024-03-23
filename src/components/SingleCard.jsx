import "./SingleCard.css";

export default function SingleCard({ card, handleChoice, flipped,disabled }) {
  function handleClick() {
    if(!disabled){
    handleChoice(card);
    }
  }

  return (
    <>
      <div className="card">
        <div className={flipped ? "flipped" : ""}>
          <img className="front"  src={card.src} alt="card front" />
          <img
            src="/img/cover.png"
            alt="card back"
            className="back"
            onClick={handleClick}
            
          />
        </div>
      </div>
    </>
  );
}
