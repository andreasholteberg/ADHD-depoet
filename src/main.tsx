import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import App from './App.tsx';
import './index.css';
import { applyTheme, initThemeListener } from './lib/theme';

applyTheme();
initThemeListener();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* reducedMotion="user": motion-animasjoner respekterer systeminnstillingen */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
);
