import { Dispatch, FC } from 'react';
import { BsPlusLg } from 'react-icons/bs';

import { IonButton } from '@ionic/react';

type Props = {
  setShowNewPostModal: Dispatch<React.SetStateAction<boolean>>;
};

export const PostButton: FC<Props> = (props: Props) => {
  return (
    <IonButton
      onClick={() => {
        props.setShowNewPostModal(true);
      }}
      className="bg-[#003AD0] mr-auto rounded-lg w-1/6"
    >
      <BsPlusLg className="h-9 w-9" />
    </IonButton>
  );
};
