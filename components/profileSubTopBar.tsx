import { ApiPromise } from '@polkadot/api';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import React, { Dispatch } from 'react';

import { BiggerProfileIcon } from './atoms/biggerProfileIcon';
import { ProfileList } from './molecules/profileList';

import { IonIcon, IonItem, IonList } from '@ionic/react';
import { flash } from 'ionicons/icons';

type Props = {
  imgUrl: string;
  name: string;
  isOpenModal: Dispatch<React.SetStateAction<boolean>>;
  setActingAccount: Dispatch<React.SetStateAction<InjectedAccountWithMeta | undefined>>;
  idList: InjectedAccountWithMeta[];
  setIsCreatedFnRun: Dispatch<React.SetStateAction<boolean>>;
  api: ApiPromise;
  actingAccount: InjectedAccountWithMeta;
  followingList: Array<string>;
  followerList: Array<string>;
};

export default function ProfileSubTopBar(props: Props) {
  return (
    <>
      <IonList className="flex">
        <IonItem className="ml-auto mr-auto">
          {props.imgUrl ? <BiggerProfileIcon imgUrl={props.imgUrl} /> : <IonIcon src={flash} />}
          <ProfileList
            name={props.name}
            isOpenModal={props.isOpenModal}
            setActingAccount={props.setActingAccount}
            idList={props.idList}
            setIsCreatedFnRun={props.setIsCreatedFnRun}
            api={props.api}
            actingAccount={props.actingAccount}
            followingList={props.followingList}
            followerList={props.followerList}
          />
        </IonItem>
      </IonList>
    </>
  );
}
