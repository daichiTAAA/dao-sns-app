import { IconType } from 'react-icons';
import { BiCommentEdit, BiHomeSmile, BiUser } from 'react-icons/bi';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { flash, happy, home, medal } from 'ionicons/icons';

import BottomLogo from '../atoms/bottomLogo';
import Profile from './profile';
import Home from './home';
import MessageBox from './messageBox';

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/home" render={() => <Home />} exact={true} />
        <Route path="/tabs/profile" render={() => <Profile />} exact={true} />
        <Route path="/tabs/messageBox" render={() => <MessageBox />} exact={true} />
        <Route path="/tabs" render={() => <Redirect to="/tabs/home" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/home">
          <IonIcon icon={home} />
          <IonLabel>home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tabs/profile">
          <IonIcon icon={happy} />
          <IonLabel>profile</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tabs/messageBox">
          <IonIcon icon={medal} />
          <IonLabel>message</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
