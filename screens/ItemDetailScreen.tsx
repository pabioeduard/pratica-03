import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { deleteProduto } from '../database/Database';
import { ModalForm } from '../components/ModalForm';

export const ItemDetailScreen = ({ route, navigation }: any) => {
  const { item } = route.params; 
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    Alert.alert(
      'Excluir Produto',
      'Tem certeza que deseja excluir este produto?',
      [
        { text: 'Cancelar' },
        { text: 'Excluir', onPress: () => {
          deleteProduto(item.id, () => navigation.goBack());
        }},
      ]
    );
  };

  const handleEdit = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.nome}</Text>
      <Text style={styles.price}>R${item.preco.toFixed(2)}</Text>
      
      <Button mode="contained" onPress={handleEdit} style={styles.button}>
        Editar Produto
      </Button>

      <Button mode="outlined" onPress={handleDelete} style={styles.button}>
        Excluir Produto
      </Button>

      <ModalForm
        visible={modalVisible}
        onClose={handleCloseModal}
        onSave={() => navigation.goBack()}
        editingItem={item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#4CAF50',
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
  },
});
