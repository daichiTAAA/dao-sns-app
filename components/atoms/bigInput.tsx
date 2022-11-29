import { FC } from 'react';

import { IonInput, IonItem, IonLabel } from '@ionic/react';

type Props = {
  title: string;
  name: string;
};

export const BigInput: FC<Props> = (props: Props) => {
  return (
    <IonItem>
      <IonLabel>{`${props.title}:`}</IonLabel>
      <IonInput
        id={props.name}
        name={props.name}
        type="text"
        className="w-64 h-32 bg-white flex ml-4"
      />
    </IonItem>
  );
};
