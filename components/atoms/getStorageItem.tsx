import { Dispatch, FC, SetStateAction } from 'react';

import { usePhotoGallery, UserPhoto } from '../../hooks/usePhotoGallery';
import { IonButton, IonIcon, isPlatform } from '@ionic/react';
import { camera } from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';
import { Filesystem, Directory } from '@capacitor/filesystem';

type Props = {
  afterClick: Dispatch<SetStateAction<string>>;
};

const PHOTO_STORAGE = 'photos';

export const GetStorageItem: FC<Props> = ({ afterClick }) => {
  const { takePhoto } = usePhotoGallery();

  const onClickAction = async () => {
    await takePhoto();
    const { value } = await Preferences.get({ key: PHOTO_STORAGE });
    const photosInStorage = (value ? JSON.parse(value) : []) as UserPhoto[];
    // If running on the web...
    if (!isPlatform('hybrid')) {
      for (let photo of photosInStorage) {
        const file = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        });
        const imgUri = await Filesystem.getUri({
          path: photo.filepath,
          directory: Directory.Data,
        });
        afterClick(imgUri.uri);
        // Web platform only: Load the photo as base64 data
        photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
      }
    }
  };
  return (
    <IonButton onClick={() => onClickAction()}>
      <IonIcon icon={camera}></IonIcon>
    </IonButton>
  );
};
