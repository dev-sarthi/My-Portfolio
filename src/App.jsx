import { NavigationProvider } from './hooks/useNavigation';
import BrainScene from './scene/BrainScene';
import HUD from './overlay/HUD';
import RegionPanel from './overlay/RegionPanel';
import LoadingScreen from './overlay/LoadingScreen';

export default function App() {
  return (
    <NavigationProvider>
      <BrainScene />
      <HUD />
      <RegionPanel />
      <LoadingScreen />
    </NavigationProvider>
  );
}
