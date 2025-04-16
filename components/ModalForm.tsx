import React, { useEffect, useState } from 'react';
import { Modal, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { addProduto, updateProduto } from '../database/Database';
import { Produto } from '../types/type'; 

interface ModalFormProps {
  visible: boolean;
  onClose: () => void;
  reload: () => void;
  editingItem: Produto | null;
}

export function ModalForm({ visible, onClose, reload, editingItem }: ModalFormProps) {
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
    const parsedPreco = parseFloat(preco);
    if (editingItem) {
      updateProduto(editingItem.id, nome, parsedPreco, () => {
        reload();
        onClose();
      });
    } else {
      addProduto(nome, parsedPreco, () => {
        reload();
        onClose();
      });
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent>
      <View style={{ flex: 1, backgroundColor: '#fff', padding: 20, marginTop: 100 }}>
        <TextInput label="Nome" value={nome} onChangeText={setNome} mode="outlined" style={{ marginBottom: 10 }} />
        <TextInput
          label="Preço"
          value={preco}
          onChangeText={setPreco}
          keyboardType="numeric"
          mode="outlined"
          style={{ marginBottom: 10 }}
        />
        <Button mode="contained" onPress={handleSave}>
          {editingItem ? 'Salvar Alterações' : 'Adicionar'}
        </Button>
        <Button onPress={onClose} style={{ marginTop: 10 }}>
          Cancelar
        </Button>
      </View>
    </Modal>
  );
}
