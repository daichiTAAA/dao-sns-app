import type { FC } from 'react';
import { IonButton } from '@ionic/react';

type Props = {
  message: string;
  submit: (event: any) => Promise<void>;
};

export const SubmitButton: FC<Props> = (props: Props) => {
  return (
    <IonButton className="bg-[#003AD0] text-white mr-auto rounded-lg w-1/6" onClick={props.submit}>
      {`${props.message}!`}
    </IonButton>
  );
};
