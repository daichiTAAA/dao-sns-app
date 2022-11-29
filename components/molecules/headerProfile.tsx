import Image from 'next/image';
import { FC } from 'react';
import { cog, flash, list } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

export type Id = {
  address: string;
};

type Props = {
  imgUrl: string;
  idList: Id[];
  setActingAccount: (id: Id) => void;
};

const HeaderProfile: FC<Props> = props => {
  return (
    <div className="flex-row flex items-center ml-[30px]">
      {props.imgUrl ? (
        <Image
          className="w-[70px] h-[70px] rounded-full mr-3"
          src={props.imgUrl}
          alt="profile_logo"
          width={30}
          height={30}
        />
      ) : (
        <IonIcon className="w-[30px] h-[30px] rounded-full mr-3" icon={flash} />
      )}
      <div className="mr-3 bg-slate-500">
        <div className="text-slate-100 text-center">wallet address</div>
        <div className="text-slate-900">
          <select
            onChange={event => {
              props.setActingAccount(props.idList[Number(event.target.value)]);
            }}
            className="w-32"
          >
            {props.idList ? (
              props.idList.map((id, index) => <option value={index}> {id.address} </option>)
            ) : (
              <option className="text-ellipsis overflow-hidden">no accounts</option>
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default HeaderProfile;
