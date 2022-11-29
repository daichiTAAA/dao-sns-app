import { FC } from 'react';

type Props = {
  balance: string;
};

export const Balance: FC<Props> = (props: Props) => {
  return <div className="text-2xl text-slate-100">{props.balance} UNI</div>;
};
