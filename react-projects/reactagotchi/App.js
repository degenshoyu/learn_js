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
    className={`flex flex-col items-center justify-center h-screen bg-${THEME.bg}-900 text-${THEME.primary}-100 p-6 space-y-6 overflow-hidden`}
  >
    {children}
  </div>
);

const Title = ({ children }) => (
  <h1 className={`text-5xl font-medium mb-8 text-${THEME.primary}-400`}>
    {children}
  </h1>
);

const GameLayout = ({ children }) => (
  <div
    className={`flex flex-row items-center justify-center gap-8 w-full max-w-4xl`}
  >
    {children}
  </div>
);

const StatsColumn = ({ children }) => (
  <div className="flex flex-col gap-4 w-full md:w-1/3 max-w-sm">{children}</div>
);

const MainStageColumn = ({ children }) => (
  <div className="flex flex-col gap-6 w-full md:w-2/3 max-w-sm items-center">
    {children}
  </div>
);

const ButtonRow = ({ children }) => (
  <div className="grid grid-cols-3 gap-3 w-full">{children}</div>
);

const PetStatsCard = ({ icon, stats }) => (
  <div
    className={`
      bg-${THEME.bg}-800 p-4 rounded-xl border border-${THEME.bg}-700 flex flex-row items-center justify-center h-30 transition-all duration-100
    `}
  >
    <div className="text-2xl mb-1">{icon}</div>
    <div className="text-4xl font-mono font-bold">{stats}</div>
  </div>
);

const Pet = ({ isAlive }) => (
  <div
    className={`
      w-48 h-48 rounded-full border-4 flex items-center justify-center text-8xl shadow-2xl transition-all duration-500
      ${isAlive ? `bg-${THEME.bg}-800 border-${THEME.bg}-700 animate-bounce` : "bg-red-900/50 border-red-800 grayscale"}
  `}
  >
    {isAlive ? "😻" : "💀"}
  </div>
);

const PetButton = ({ onClick, actionName, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      w-full py-4 bg-${THEME.bg}-700 hover:bg-${THEME.bg}-600
      text-${THEME.primary}-200 text-sm font-bold uppercase tracking-wider
      rounded-xl shadow-lg border-b-4 border-${THEME.bg}-900 active:border-b-0 active:translate-y-1
      transition-all
    `}
  >
    {actionName}
  </button>
);

/* Main Application */
function App() {
  const [petStats, setPetStats] = useState({
    hunger: 70,
    energy: 70,
    mood: 70,
  });

  const isAlive =
    petStats.hunger > 0 && petStats.energy > 0 && petStats.mood > 0;

  React.useEffect(() => {
    if (!isAlive) return;

    const decay = setInterval(() => {
      setPetStats((prev) => ({
        ...prev,
        hunger: Math.max(0, prev.hunger - 2),
        energy: Math.max(0, prev.energy - 1),
        mood: Math.max(0, prev.mood - 3),
      }));
    }, 1000);
    return () => clearInterval(decay);
  }, [isAlive]);

  const handleRestart = () => {
    setPetStats({
      hunger: 70,
      energy: 70,
      mood: 70,
    });
  };

  const handlePet = (type, value, effectType, effectValue) => {
    if (petStats[type] < 100) {
      setPetStats((prev) => ({
        ...prev,
        [type]: Math.min(100, prev[type] + value),
        [effectType]: Math.max(0, prev[effectType] - effectValue),
      }));
    }
  };

  const handleSleep = () => {
    if (petStats.energy < 100) {
      setPetStats((prev) => ({
        ...prev,
        energy: 100,
        hunger: Math.max(0, prev.hunger - 15),
      }));
    }
  };

  return (
    <Layout>
      <Title>Reactagotchi</Title>

      <GameLayout>
        <StatsColumn>
          <PetStatsCard icon="🍛" stats={petStats.hunger} />
          <PetStatsCard icon="🎮" stats={petStats.mood} />
          <PetStatsCard icon="🛌" stats={petStats.energy} />
        </StatsColumn>

        <MainStageColumn>
          <Pet isAlive={isAlive} />
          <ButtonRow>
            <PetButton
              onClick={() => handlePet("hunger", 20, "energy", 5)}
              actionName="Feed"
              disabled={petStats.hunger >= 100}
            />
            <PetButton
              onClick={() => handlePet("mood", 20, "energy", 15)}
              actionName="Play"
              disabled={petStats.mood >= 100}
            />
            <PetButton
              onClick={handleSleep}
              actionName="Sleep"
              disabled={petStats.energy >= 100}
            />
          </ButtonRow>
        </MainStageColumn>
      </GameLayout>
    </Layout>
  );
}

root.render(<App />);
