import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.daosnsapp.app',
  appName: 'dao-sns-app',
  bundledWebRuntime: false,
  webDir: 'out',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
  server: {
    // url: 'http://192.168.0.20:3000/',
    // url: 'http://192.168.203.126:3000/',
    url: 'http://192.168.131.126:3000/',
    cleartext: true,
  },
  cordova: {},
};

export default config;
