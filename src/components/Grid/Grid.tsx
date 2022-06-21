import { FlatList, Dimensions, PixelRatio, StyleSheet, ListRenderItem, FlatListProps } from 'react-native';

export interface GridRenderItemInfo<T> {
  item: T;
  size: number;
  marginLeft: number;
  marginTop: number;
} 

export type GridRenderItem<T> = (info: GridRenderItemInfo<T>) => ReturnType<ListRenderItem<T>>;

export type GridKeyExtractor<T> = (item: T) => string;

export interface GridProps<T> extends Omit<FlatListProps<T>, 'data' | 'renderItem'> {
  data: T[];
  numColumns?: number;
  itemMargin?: number;
  keyExtractor: GridKeyExtractor<T>;
  renderItem: GridRenderItem<T>;
}

export const Grid = <T,>({
  data,
  numColumns = 4,
  itemMargin = StyleSheet.hairlineWidth,
  keyExtractor,
  renderItem,
  ...props
}: GridProps<T>) => {
  const renderGridItem: ListRenderItem<T> = ({ item, index }) => {
    const { width } = Dimensions.get('window');

    const size = PixelRatio.roundToNearestPixel(
      (width - itemMargin * (numColumns - 1)) / numColumns
    );

    const marginLeft = index % numColumns === 0 ? 0 : itemMargin;

    const marginTop = index < numColumns ? 0 : itemMargin;

    return renderItem({ item, size, marginLeft, marginTop });
  };

  return (
    <FlatList
      data={data}
      numColumns={numColumns}
      renderItem={renderGridItem}
      keyExtractor={keyExtractor}
      {...props}
    />
  );
};
