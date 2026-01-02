const { useState } = React;
const root = ReactDOM.createRoot(document.getElementById("root"));

/* Theme Configuration */
const THEME = {
  primary: "sky",
  bg: "zinc",
};

/* Style Configuration */
const Layout = ({ children }) => (
  <div
    className={`flex flex-col items-center justify-center h-screen bg-${THEME.bg}-900 text-${THEME.primary}-100 p-6 space-y-6`}
  >
    {children}
  </div>
);

const Title = ({ children }) => (
  <h1 className={`text-3xl font-medium mb-8 text-${THEME.primary}-400`}>
    {children}
  </h1>
);

const GridContainer = ({ children }) => (
  <div className="grid grid-cols-4 md:grid-cols-4 gap-4 w-full max-w-sm">
    {children}
  </div>
);

const SlotItem = ({ item, isWinner, isSpinning }) => (
  <div
    className={`
      bg-${THEME.bg}-800 p-4 rounded-xl border border-${THEME.bg}-700 flex flex-col items-center justify-center h-30 transition-all duration-100
      ${isWinner ? "border-yellow-400 bg-yellow-900/30 scale-105" : `border-${THEME.bg}-700`}
      ${isSpinning ? "animate-pulse" : ""}
    `}
  >
    <div className="text-5xl mb-1">{item}</div>
  </div>
);

const MakeButton = ({ onClick, actionName }) => (
  <button
    onClick={onClick}
    className={`w-full max-w-xs py-4 bg-${THEME.bg}-600 hover:bg-${THEME.bg}-500 text-${THEME.primary}-300 text-xs font-medium rounded-xl shadow-lg shadow-${THEME.bg}-900/40 active:scale-95 transition-all`}
  >
    {actionName}
  </button>
);

/* Main Application */
function App() {
  const [slots, setSlots] = useState({
    slot1: "🍉",
    slot2: "🥭",
    slot3: "🍓",
    slot4: "🥥",
  });

  const [isSpinning, setIsSpinning] = useState(false);

  const slotItems = ["🍉", "🥭", "🍓", "🥥"];

  const getRandomItem = () => {
    const randomNumber = Math.floor(slotItems.length * Math.random());
    return slotItems[randomNumber];
  };

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    const spingInterval = setInterval(() => {
      setSlots({
        slot1: getRandomItem(),
        slot2: getRandomItem(),
        slot3: getRandomItem(),
        slot4: getRandomItem(),
      });
    }, 50);

    setTimeout(() => {
      clearInterval(spingInterval);
      setIsSpinning(false);
    }, 500);
  };

  const isWinner =
    !isSpinning &&
    slots.slot1 === slots.slot2 &&
    slots.slot2 === slots.slot3 &&
    slots.slot3 === slots.slot4;

  return (
    <Layout>
      <Title>{isWinner ? "🎉 WINNER! 🎉" : "Slot Machine"}</Title>

      <GridContainer>
        {Object.values(slots).map((item, index) => (
          <SlotItem
            key={index}
            item={item}
            isWinner={isWinner}
            isSpinning={isSpinning}
          />
        ))}
      </GridContainer>
      <GridContainer>
        <MakeButton
          onClick={handleSpin}
          actionName={isSpinning ? "ROLLING..." : "SPIN 🎰"}
        />
      </GridContainer>
    </Layout>
  );
}

root.render(<App />);
