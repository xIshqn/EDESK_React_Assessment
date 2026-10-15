import { useState } from 'react';
import SideTabs from './components/SideTabs.jsx';
import HomeTab from './components/HomeTab.jsx';
import LoginForm from './components/LoginForm.jsx';

const TABS = ['Home', 'Profile', 'Messages', 'Settings'];

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');

  const renderTab = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeTab />;
      case 'Profile':
        return <LoginForm />;
      default:
        return (
          <section className="tab-panel">
            <h2 className="tab-title">{activeTab} Tab.</h2>
            <p className="muted">No content for this section yet.</p>
          </section>
        );
    }
  };

  return (
    <div className="app">
      <SideTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />
      <main className="content">{renderTab()}</main>
    </div>
  );
}