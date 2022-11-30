import { ApiPromise } from '@polkadot/api';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import React, { FC, useEffect, useState } from 'react';

import { PostButton } from '../atoms/postButton';
import Post from '../post';
import PostModal from '../postModal';
import TopBar from '../topBar';
import { connectToContract } from '../../hooks/connect';
import { balenceOf, distributeReferLikes, transfer } from '../../hooks/FT';
import type { PostType } from '../../hooks/postFunction';
import { getGeneralPost } from '../../hooks/postFunction';
import { checkCreatedInfo, createProfile, getProfileForHome } from '../../hooks/profileFunction';
import { IonPage, IonContent } from '@ionic/react';

export default function Home() {
  const [api, setApi] = useState<ApiPromise>();

  const [isCreatedProfile, setIsCreatedProfile] = useState(true);
  const [isCreatedFnRun, setIsCreatedFnRun] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const [isDistributed, setIsDistributed] = useState(false);

  const [imgUrl, setImgUrl] = useState('');
  const [accountList, setAccountList] = useState<InjectedAccountWithMeta[]>([]);
  const [actingAccount, setActingAccount] = useState<InjectedAccountWithMeta>();
  const [generalPostList, setGeneralPostList] = useState<PostType[]>([]);
  const [balance, setBalance] = useState<string>('0');

  useEffect(() => {
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
    setInterval(() => {}, 10000);
  }, []);

  useEffect(() => {
    if (!isSetup) return;
    getProfileForHome({
      api: api!,
      userId: actingAccount?.address!,
      setImgUrl: setImgUrl,
    });
    balenceOf({
      api: api,
      actingAccount: actingAccount!,
      setBalance: setBalance,
    });
    getGeneralPost({ api: api!, setGeneralPostList: setGeneralPostList });
    if (isDistributed) return;
    distributeReferLikes({
      api: api,
      actingAccount: actingAccount!,
    });
    setIsDistributed(true);
    if (isCreatedFnRun) return;
    checkCreatedInfo({
      api: api,
      userId: actingAccount?.address!,
      setIsCreatedProfile: setIsCreatedProfile,
    });
    if (isCreatedProfile) return;
    createProfile({ api: api, actingAccount: actingAccount! });
    setIsCreatedFnRun(true);
    setInterval(() => {}, 5000);
  }, []);

  return (
    <IonPage>
      <IonContent>
        <PostModal
          isOpen={showNewPostModal}
          afterOpenFn={setShowNewPostModal}
          api={api!}
          actingAccount={actingAccount!}
        />
        <TopBar
          idList={accountList}
          imgUrl={imgUrl}
          setActingAccount={setActingAccount}
          balance={balance}
        />
        <div>
          {generalPostList.map(post => (
            <Post
              name={post.name}
              time={post.createdTime}
              description={post.description}
              num_of_likes={post.numOfLikes}
              user_img_url={post.userImgUrl}
              post_img_url={post.imgUrl}
              userId={post.userId}
              postId={post.postId}
              actingAccount={actingAccount}
              api={api}
            />
          ))}
        </div>
        <PostButton setShowNewPostModal={setShowNewPostModal} />
      </IonContent>
    </IonPage>
  );
}
