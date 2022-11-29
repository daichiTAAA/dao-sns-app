import { ApiPromise } from '@polkadot/api';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { Dispatch } from 'react';
import { IonModal } from '@ionic/react';

import { releasePost } from '../hooks/postFunction';
import { InputGroup } from './organisms/inputGroup';

type Props = {
  isOpen: boolean;
  afterOpenFn: Dispatch<React.SetStateAction<boolean>>;
  api: ApiPromise;
  actingAccount: InjectedAccountWithMeta;
};

export default function PostModal(props: Props) {
  const submit = async (event: any) => {
    event.preventDefault();
    await releasePost({
      api: props.api,
      actingAccount: props.actingAccount,
      description: event.target.description.value,
      imgUrl: event.target.imgUrl.value,
    });
    props.afterOpenFn(false);
    alert(
      `Image URL: ${event.target.imgUrl.value}\nDescription: ${event.target.description.value}`
    );
  };
  return (
    <IonModal isOpen={props.isOpen}>
      <InputGroup message="Post" submit={submit} afterOpenFn={props.afterOpenFn} />
    </IonModal>
  );
}
