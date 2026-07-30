import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/400-italic.css';
import '@fontsource/lora/400.css';
import '@fontsource/lora/500.css';
import '@fontsource/lora/600.css';
import '@fontsource/lora/700.css';
import '@fontsource/lora/400-italic.css';
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

// Fjern det statiske hero-skallet fra scripts/prerender.ts.
// Skallet er det besøkende ser mens denne bundelen laster; nå har React
// overtatt. requestAnimationFrame gjør at React rekker å male først, slik
// at det ikke blinker en tom flate mellom skall og app.
requestAnimationFrame(() => {
  document.getElementById('prerender')?.remove();
});
