import { ApiPromise } from '@polkadot/api';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import React, { useEffect, useState } from 'react';

import MessageMember from '../message_member';
import MessageRoom from '../messageRoom';
import TopBar from '../topBar';
import { connectToContract } from '../../hooks/connect';
import { balenceOf } from '../../hooks/FT';
import { getLastMessage, getMessageList } from '../../hooks/messageFunction';
import {
  checkCreatedInfo,
  createProfile,
  getProfileForMessage,
  getSimpleProfileForMessage,
} from '../../hooks/profileFunction';
import type { ProfileType } from '../../hooks/profileFunction';
import { IonPage, IonContent } from '@ionic/react';

export default function MessageBox() {
  // variable related to contract
  const [api, setApi] = useState<ApiPromise>();
  const [accountList, setAccountList] = useState<InjectedAccountWithMeta[]>([]);
  const [actingAccount, setActingAccount] = useState<InjectedAccountWithMeta>();

  const [imgUrl, setImgUrl] = useState('');
  const [isCreatedProfile, setIsCreatedProfile] = useState(true);
  const [isCreatedFnRun, setIsCreatedFnRun] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [userImgUrl, setUserImgUrl] = useState('');
  const [myImgUrl, setMyImgUrl] = useState('');
  const [messageListId, setMessageListId] = useState<string>('');
  const [messageMemberList, setMessageMemberList] = useState<any[]>([]);
  const [myUserId, setMyUserId] = useState('');
  const [isSetup, setIsSetup] = useState(false);
  const [profile, setProfile] = useState<ProfileType>();
  const [balance, setBalance] = useState<string>('0');

  useEffect(() => {
    //connect to contract
    connectToContract({
      api: api,
      accountList: accountList,
      actingAccount: actingAccount!,
      isSetup: isSetup,
      setApi: setApi,
      setAccountList: setAccountList,
      setActingAccount: setActingAccount!,
      setIsSetup: setIsSetup,
    });
    if (!isSetup) return;

    // get profile
    getProfileForMessage({
      api: api,
      userId: actingAccount?.address,
      setImgUrl: setImgUrl,
      setMyImgUrl: setMyImgUrl,
      setFriendList: setFriendList,
      setProfile: setProfile,
    });
    // create message member list UI
    createMessageMemberList();

    balenceOf({
      api: api,
      actingAccount: actingAccount!,
      setBalance: setBalance,
    });

    // check if already created profile in frontend
    if (isCreatedFnRun) return;

    // check if already created profile in contract
    checkCreatedInfo({
      api: api,
      userId: actingAccount?.address,
      setIsCreatedProfile: setIsCreatedProfile,
    });
    if (isCreatedProfile) return;
    // create profile
    createProfile({ api: api, actingAccount: actingAccount! });
    setIsCreatedFnRun(true);
    setInterval(() => {}, 5000);
  });

  // create message member list UI
  const createMessageMemberList = async () => {
    let memberList: Array<any> = new Array<any>();
    for (var i = 0; i < friendList.length; i++) {
      let friendProfile = await getSimpleProfileForMessage({
        api: api,
        userId: friendList[i],
      });
      let idList = profile?.messageListIdList;
      let lastMessage: string | null = null;
      let messageList = await getMessageList({
        api: api,
        id: idList![i],
      });
      if (idList !== undefined) {
        lastMessage = await getLastMessage({ api: api, id: idList![i] });
        idList[i] = 0;
      }
      let memberListFactor = (
        <MessageMember
          name={friendProfile?.name}
          img_url={friendProfile?.imgUrl}
          last_message={lastMessage}
          setShowMessageModal={setShowMessageModal}
          setUserName={setUserName}
          setUserImgUrl={setUserImgUrl}
          setMyImgUrl={setMyImgUrl}
          messageListId={idList![i]}
          setMessageListId={setMessageListId}
          setMessageList={setMessageList}
          messageList={messageList}
          getMessageList={getMessageList}
          setMyUserId={setMyUserId}
          myUserId={profile?.userId}
          api={api}
        />
      );
      memberList.push(memberListFactor);
    }
    setMessageMemberList(memberList);
  };

  return (
    <IonPage>
      <IonContent>
        {!showMessageModal ? (
          <>
            <TopBar
              idList={accountList}
              imgUrl={imgUrl}
              setActingAccount={setActingAccount}
              balance={balance}
            />
            <div>{messageMemberList}</div>
          </>
        ) : (
          <MessageRoom 
            setShowMessageModal={setShowMessageModal}
            userName={userName}
            userImgUrl={userImgUrl}
            myImgUrl={myImgUrl}
            myUserId={myUserId}
            api={api!}
            actingAccount={actingAccount!}
            messageListId={messageListId!}
            messageList={messageList!}
          />
        )}
      </IonContent>
    </IonPage>
  );
}
