import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Appbar } from 'react-native-paper';
import { createTable, getProdutos, deleteProduto } from '../database/Database';
import { ItemList } from '../components/ItemList';
import { ModalForm } from '../components/ModalForm';

export const HomeScreen = ({ navigation }: any) => {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    createTable();
    loadProdutos();
  }, []);

  const loadProdutos = () => {
    getProdutos(setProdutos);
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      'Excluir Produto',
      'Tem certeza que deseja excluir este produto?',
      [
        { text: 'Cancelar' },
        { text: 'Excluir', onPress: () => deleteProduto(id, loadProdutos) },
      ]
    );
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setEditingItem(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Produtos" />
      </Appbar.Header>
      <Button mode="contained" onPress={() => setModalVisible(true)} style={styles.addButton}>
        Adicionar Produto
      </Button>
      <ItemList
        items={produtos}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onItemPress={(item: any) => navigation.navigate('ItemDetail', { item })}
      />
      <ModalForm visible={modalVisible} onClose={handleCloseModal} onSave={loadProdutos} editingItem={editingItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addButton: {
    marginBottom: 20,
  },
});
