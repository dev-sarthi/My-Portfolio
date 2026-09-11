import { useNavigation } from '../hooks/useNavigation';
import { regions } from '../data';
import BuildPanel from '../panels/BuildPanel';
import LearnPanel from '../panels/LearnPanel';
import LeadPanel from '../panels/LeadPanel';
import '../styles/panels.css';

const panelComponents = {
  build: BuildPanel,
  learn: LearnPanel,
  lead: LeadPanel,
};

export default function RegionPanel() {
  const { activeRegion, navigateHome } = useNavigation();
  const isOpen = activeRegion !== null;
  const regionData = regions.find(r => r.id === activeRegion);
  const PanelContent = activeRegion ? panelComponents[activeRegion] : null;

  return (
    <>
      {/* Background dim overlay */}
      <div
        className={`region-panel-backdrop${isOpen ? ' visible' : ''}`}
        onClick={navigateHome}
      />

      {/* Sliding panel */}
      <div className={`region-panel-wrapper${isOpen ? ' open' : ''}`}>
        <div className="region-panel">
          {regionData && (
            <div className="panel-header">
              <span className="panel-region-tag" data-region={regionData.id}>
                ● {regionData.label}
              </span>
              <h2 className="panel-title">{regionData.subtitle}</h2>
              <p className="panel-subtitle">{regionData.description}</p>
            </div>
          )}

          {PanelContent && <PanelContent />}
        </div>
      </div>
    </>
  );
}
