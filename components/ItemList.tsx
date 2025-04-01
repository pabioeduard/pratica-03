import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';

type Item = {
  id: number;
  nome: string;
  preco: number;
};

interface ItemListProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: number) => void;
  onItemPress: (item: Item) => void;
}

export const ItemList: React.FC<ItemListProps> = ({ items, onEdit, onDelete, onItemPress }) => {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <Card key={item.id} style={styles.card} onPress={() => onItemPress(item)}>
          <Card.Content>
            <Text style={styles.itemName}>{item.nome}</Text>
            <Text style={styles.itemPrice}>R${item.preco.toFixed(2)}</Text>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button mode="contained" onPress={() => onEdit(item)} style={styles.button}>
              Editar
            </Button>
            <Button mode="outlined" onPress={() => onDelete(item.id)} style={styles.button}>
              Excluir
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    elevation: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#4CAF50',
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  button: {
    marginHorizontal: 5,
  },
});
