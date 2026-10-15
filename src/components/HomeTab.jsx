import { useMemo, useState } from "react";
import TreeMenu from "./TreeMenu.jsx";
import CustomerTable from "./CustomerTable.jsx";
import locations from "../data/locations.json";
import customers from "../data/customers.json";

const LEVEL_FIELD = ["country", "state", "city"];

export default function HomeTab() {
  const [selected, setSelected] = useState({
    id: locations[0].id,
    label: locations[0].label,
    level: 0,
  });

  const filtered = useMemo(() => {
    if (!selected) return customers;
    const field = LEVEL_FIELD[selected.level];
    return customers.filter((c) => c[field] === selected.label);
  }, [selected]);

  return (
    <section className="tab-panel">
      <h2 className="tab-title">Home Tab.</h2>
      <div className="home-layout">
        <TreeMenu
          nodes={locations}
          selectedId={selected?.id}
          onSelect={setSelected}
          defaultExpanded={["usa", "usa-ny", "canada", "australia"]}
        />
        <CustomerTable
            key={selected?.id}
            data={filtered}
            scopeLabel={selected?.label}
        />
      </div>
    </section>
  );
}
