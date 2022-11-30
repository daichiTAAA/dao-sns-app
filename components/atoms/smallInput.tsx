import { FC } from 'react';
import { IonInput, IonItem, IonLabel } from '@ionic/react';

type Props = {
  title: string;
  name: string;
  value: string;
};

export const SmallInput: FC<Props> = (props: Props) => {
  return (
    <IonItem>
      <IonLabel>{`${props.title}:`}</IonLabel>
      <IonInput id={props.name} name={props.name} value={props.value} type="text" />
    </IonItem>
  );
};
