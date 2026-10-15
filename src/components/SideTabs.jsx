export default function SideTabs({ tabs, active, onChange }) {

    return(
        <nav className="side-tabs" aria-label="Main sections">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    type="button"
                    className={`side-tab ${active === tab ? 'active' : ''}`}
                    onClick={() => onChange(tab)}
                >
                    {tab}
                </button>
            ))}
        </nav>
    )

}