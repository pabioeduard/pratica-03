import React, { useState, useEffect } from 'react';
import { Modal, View, StyleSheet, TextInput } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { addProduto, updateProduto } from '../database/Database';

interface ModalFormProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  editingItem: any | null;
}

export const ModalForm: React.FC<ModalFormProps> = ({ visible, onClose, onSave, editingItem }) => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');

  useEffect(() => {
    if (editingItem) {
      setNome(editingItem.nome);
      setPreco(editingItem.preco.toString());
    } else {
      setNome('');
      setPreco('');
    }
  }, [editingItem]);

  const handleSave = () => {
    if (nome && preco) {
      if (editingItem) {
        updateProduto(editingItem.id, nome, parseFloat(preco), () => {
          onSave();
          onClose();
        });
      } else {
        addProduto(nome, parseFloat(preco), () => {
          onSave();
          onClose();
        });
      }
    }
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{editingItem ? 'Editar Produto' : 'Cadastrar Produto'}</Text>
          <TextInput
            style={styles.input}
            label="Nome do Produto"
            value={nome}
            onChangeText={setNome}
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="Preço"
            value={preco}
            keyboardType="numeric"
            onChangeText={setPreco}
            mode="outlined"
          />
          <Button mode="contained" onPress={handleSave} style={styles.button}>
            Salvar
          </Button>
          <Button mode="outlined" onPress={onClose} style={styles.button}>
            Cancelar
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: 300,
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginVertical: 5,
  },
});
