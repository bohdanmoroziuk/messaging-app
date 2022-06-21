import { FunctionComponent, useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity } from 'react-native';
// @ts-ignore
import CameraRoll from 'expo-cameraroll';
import * as Permissions from 'expo-permissions';

import Grid, { GridRenderItem } from 'src/components/Grid';

export interface ImageGridItem {
  uri: string;
}

export interface ImageGridProps {
  onPressImage: (uri: string) => void;
}

const keyExtractor = ({ uri }: ImageGridItem) => uri;

export const ImageGrid: FunctionComponent<ImageGridProps> = ({
  onPressImage,
}) => {
  const [images, setImages] = useState<ImageGridItem[]>([]);

  const isLoading = useRef(false);
  const cursor = useRef<string | null>(null);

  const renderItem: GridRenderItem<ImageGridItem> = ({
    item,
    size,
    marginTop,
    marginLeft,
  }) => {
    const style = {
      width: size,
      height: size,
      marginTop,
      marginLeft,
    };

    const handlePress = () => {
      onPressImage(item.uri);
    };

    return (
      <TouchableOpacity
        key={item.uri}
        style={style}
        activeOpacity={0.75}
        onPress={handlePress}
      >
        <Image
          source={{ uri: item.uri }}
          style={{ flex: 1 }}
        />
      </TouchableOpacity>
    );
  }; 

  const getImages = async (after: string) => {
    if (isLoading.current) return;

    isLoading.current = true;

    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== Permissions.PermissionStatus.GRANTED) {
      console.log('Camera roll permission denied.');
      return;
    }

    const { edges, page_info: { has_next_page, end_cursor } } = await CameraRoll.getPhotos({
      first: 20,
      after,
      assertType: 'Photos',
    });

    // @ts-ignore
    const images = edges.map((edge) => edge.node.image);

    setImages((prevImages) => [
      ...prevImages,
      ...images,
    ]);

    isLoading.current = false;
    cursor.current = has_next_page ? end_cursor : null;
  };

  const getNextImages = async () => {
    if (!cursor.current) return;

    getImages(cursor.current);
  };

  useEffect(() => {
    getImages('0');
  }, []);

  return (
    <Grid<ImageGridItem>
      data={images}
      renderItem={renderItem}
      itemMargin={2}
      keyExtractor={keyExtractor}
      onEndReached={getNextImages}
    />
  );
};
