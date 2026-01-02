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

const ResourceItem = ({ icon, name, count }) => (
  <div
    className={`bg-${THEME.bg}-800 p-4 rounded-xl border border-${THEME.bg}-700 flex flex-col items-center justify-center`}
  >
    <div className="text-2xl mb-1">{icon}</div>
    <div className={`text-xs text-${THEME.primary}-400 uppercase`}>{name}</div>
    <div className={`text-xl text-${THEME.primary}-200 font-bold`}>{count}</div>
  </div>
);

const MakeButton = ({ onClick, actionName, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full max-w-xs py-4 bg-${THEME.bg}-600 hover:bg-${THEME.bg}-500 text-${THEME.primary}-300 text-xs font-medium rounded-xl shadow-lg shadow-${THEME.bg}-900/40 ${disabled ? "opacity-50 cursor-not-allowed" : "active:scale-95"} transition-all`}
  >
    {actionName}
  </button>
);

/* Main Application */
function App() {
  const [resources, setResources] = useState({
    wood: 0,
    coal: 0,
    ironore: 0,
    iron: 0,
  });

  const handleMakeResource = (type) => {
    setResources((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const handleMakeIron = () => {
    if (resources.coal >= 1 && resources.ironore >= 2) {
      setResources((prev) => ({
        ...prev,
        coal: prev.coal - 1,
        ironore: prev.ironore - 2,
        iron: prev.iron + 1,
      }));
    }
  };

  return (
    <Layout>
      <Title>Mining Tycoon</Title>

      <GridContainer>
        <ResourceItem icon="🌲" name="wood" count={resources.wood} />
        <ResourceItem icon="⚫️" name="coal" count={resources.coal} />
        <ResourceItem icon="🪨" name="ironore" count={resources.ironore} />
        <ResourceItem icon="⚔️" name="iron" count={resources.iron} />
      </GridContainer>
      <GridContainer>
        <MakeButton
          onClick={() => handleMakeResource("wood")}
          actionName="🪓 Chop Tree"
        />
        <MakeButton
          onClick={() => handleMakeResource("coal")}
          actionName="🪏 Dig Coal"
        />
        <MakeButton
          onClick={() => handleMakeResource("ironore")}
          actionName="⛏️Mine Ironore"
        />
        <MakeButton
          onClick={handleMakeIron}
          actionName="⛓️‍💥 Smelt Iron"
          disabled={resources.coal < 1 || resources.ironore < 2}
        />
      </GridContainer>
    </Layout>
  );
}

root.render(<App />);
