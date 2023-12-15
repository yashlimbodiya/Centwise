import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./Store/index.ts"
import i18n from './i18n.ts';
import { I18nextProvider } from 'react-i18next';

const container = document.getElementById('root');
if (container) {
      const root = createRoot(container);

      root.render(
            <Provider store={store}>
                  <I18nextProvider i18n={i18n}>
                        <App />
                  </I18nextProvider>
            </Provider>
      );
} else {
      console.error("Root container not found");
} 