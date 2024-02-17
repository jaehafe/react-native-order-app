import * as React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import Colors from '@/constants/Colors';
import { Link, useSegments } from 'expo-router';
import { Tables } from '@/database.types';

export const defaultImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

interface ProductListItemProps {
  product: Tables<'products'>;
}

export default function ProductListItem({ product }: ProductListItemProps) {
  const segments = useSegments();

  const segment = segments[0] ? segments[0] : 'user';

  return (
    // TODO
    <Link href={`/${segment}/menu/${product.id}` as any} asChild>
      <Pressable style={styles.container}>
        <Image source={{ uri: product.image || defaultImage }} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: '50%',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
});
