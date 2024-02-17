import * as React from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import { useAdminOrderList } from '@/api/orders';
import OrderListItem from '@/components/OrderListItem';
import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useInsertOrderSubscription } from '@/api/orders/subscriptions';

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useAdminOrderList({ archived: false });

  useInsertOrderSubscription();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => {
        return <OrderListItem order={item} />;
      }}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
