import Image from 'next/image';
import React from 'react';
import { AiFillHeart } from 'react-icons/ai';

import { addLikes } from '../hooks/postFunction';
import { SmallerProfileIcon } from './atoms/smallerProfileIcon';

import { IonItem, IonList, IonIcon, IonLabel } from '@ionic/react';
import { flash } from 'ionicons/icons';

export default function Post(props: any) {
  return (
    <>
      <IonItem>
        <SmallerProfileIcon
          imgUrl={props.user_img_url}
          api={props.api}
          actingAccount={props.actingAccount}
          userId={props.userId}
        />
        <IonLabel>{props.name}</IonLabel>
        <IonLabel>{props.time}</IonLabel>
        <IonLabel>{props.description}</IonLabel>
        {props.post_img_url ? (
          <Image
            className="mr-3"
            src={props.post_img_url}
            alt="profile_logo"
            width={250}
            height={250}
            quality={100}
          />
        ) : (
          <IonIcon src={flash} />
        )}

        <IonLabel>{props.num_of_likes}</IonLabel>
        <AiFillHeart
          onClick={() => {
            addLikes({
              api: props.api,
              actingAccount: props.actingAccount,
              postId: props.postId,
            });
          }}
        />
      </IonItem>
    </>
  );
}
