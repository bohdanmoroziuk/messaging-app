import { FunctionComponent, useState, useEffect } from 'react';
import { Image, TouchableOpacity } from 'react-native';
// @ts-ignore
import CameraRoll from 'expo-cameraroll';
import * as Permissions from 'expo-permissions';

import Grid, { GridRenderItem } from 'src/components/Grid';

export interface ImageGridItem {
  uri: string;
}

export interface ImageGridProps {
  onPressImage: () => void;
}

const keyExtractor = ({ uri }: ImageGridItem) => uri;

export const ImageGrid: FunctionComponent<ImageGridProps> = ({
  onPressImage,
}) => {
  const [images, setImages] = useState<ImageGridItem[]>([]);

  const renderItem: GridRenderItem<ImageGridItem> = ({
    item,
    size,
    marginTop,
    marginLeft,
  }) => {
    const style = {
      flex: 1,
      width: size,
      height: size,
      marginTop,
      marginLeft,
    };

    return (
      <Image source={{ uri: item.uri }} style={style} />
    );
  }; 

  const getImages = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== Permissions.PermissionStatus.GRANTED) {
      console.log('Camera roll permission denied.');
      return;
    }

    const { edges } = await CameraRoll.getPhotos({
      first: 20,
      assertType: 'Photos',
    });

    // @ts-ignore
    const images = edges.map((edge) => edge.node.image);

    setImages(images);
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <Grid<ImageGridItem>
      data={images}
      renderItem={renderItem}
      itemMargin={2}
      keyExtractor={keyExtractor}
    />
  );
};
