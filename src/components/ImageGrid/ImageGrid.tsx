import { FunctionComponent } from 'react';
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
  const images = [
    { uri: 'https://picsum.photos/600/600?image=10' },
    { uri: 'https://picsum.photos/600/600?image=20' },
    { uri: 'https://picsum.photos/600/600?image=30' },
    { uri: 'https://picsum.photos/600/600?image=40' },
  ];

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

  return (
    <Grid<ImageGridItem>
      data={images}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};
