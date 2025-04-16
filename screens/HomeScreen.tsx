import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { createTable, getProdutos } from '../database/Database';
import { ModalForm } from '../components/ModalForm';
import { ItemList } from '../components/ItemList';
import { Produto } from '../types/type'; 

export function HomeScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editingItem, setEditingItem] = useState<Produto | null>(null);

  const loadProdutos = async () => {
    await createTable();
    await getProdutos(setProdutos);
  };

  useEffect(() => {
    loadProdutos();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ItemList
            item={item}
            onEdit={(produto) => {
              setEditingItem(produto);
              setModalVisible(true);
            }}
            onPress={() => navigation.navigate('ItemDetail', { item })}
            reload={loadProdutos}
          />
        )}
      />

      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={() => {
          setEditingItem(null);
          setModalVisible(true);
        }}
      />

      <ModalForm
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditingItem(null);
        }}
        reload={loadProdutos}
        editingItem={editingItem}
      />
    </View>
  );
}
