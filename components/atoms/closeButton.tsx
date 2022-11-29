import { Dispatch, FC } from 'react';
import { IonButton } from '@ionic/react';

type Props = {
  afterOpenFn: Dispatch<React.SetStateAction<boolean>>;
};

export const CloseButton: FC<Props> = (props: Props) => {
  return (
    <IonButton
      className="bg-[#003AD0] text-white ml-auto rounded-lg w-1/6 mr-9"
      onClick={() => props.afterOpenFn(false)}
    >
      Close
    </IonButton>
  );
};
