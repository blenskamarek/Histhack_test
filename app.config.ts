import 'dotenv/config';
import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Histhack App',
  slug: 'histhack-app',
  version: '1.0.0',
  extra: {
    apiUrl: process.env.API_URL,
    eas: {
      projectId: process.env.EAS_PROJECT_ID,
    },
  },
});
