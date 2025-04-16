import React from 'react';
import { List, IconButton } from 'react-native-paper';
import { View } from 'react-native';
import { deleteProduto } from '../database/Database';
import { Produto } from '../types/type'; 

interface ItemListProps {
  item: Produto;
  onEdit: (item: Produto) => void;
  onPress: () => void;
  reload: () => void;
}

export function ItemList({ item, onEdit, onPress, reload }: ItemListProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <List.Item title={item.nome} description={`R$ ${item.preco.toFixed(2)}`} onPress={onPress} />
      <IconButton icon="pencil" onPress={() => onEdit(item)} />
      <IconButton
        icon="delete"
        onPress={() => {
          deleteProduto(item.id, reload);
        }}
      />
    </View>
  );
}
