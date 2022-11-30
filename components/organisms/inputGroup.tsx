import { Dispatch, FC, useState } from 'react';

import { BigInput } from '../atoms/bigInput';
import { CloseButton } from '../atoms/closeButton';
import { SmallInput } from '../atoms/smallInput';
import { SubmitButton } from '../atoms/submitButton';
import { GetStorageItem } from '../atoms/getStorageItem';
import { IonList, IonLabel, IonButton } from '@ionic/react';

type Props = {
  message: string;
  submit: (event: any) => Promise<void>;
  afterOpenFn: Dispatch<React.SetStateAction<boolean>>;
};

export const InputGroup: FC<Props> = (props: Props) => {
  const [imgUrl, setImgUrl] = useState<string>('');

  return (
    <>
      <form onSubmit={props.submit}>
        <IonLabel>input post info!</IonLabel>
        <SmallInput title="Image URL" name="imgUrl" value={imgUrl} />
        <GetStorageItem afterClick={setImgUrl} />
        <BigInput title="Description" name="description" />
        <IonList className="flex">
          <CloseButton afterOpenFn={props.afterOpenFn} />
          <SubmitButton submit={props.submit} message="Post" />
        </IonList>
      </form>
    </>
  );
};
