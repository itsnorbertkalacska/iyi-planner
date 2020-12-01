import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';

import Item from './src/home/item';

export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const items = [];
  for (let i = 1; i <= 30; i++) {
    items.push({
      id: i,
      title: `Title #${i}`,
    });
  }

  const handleSelection = (itemId: number) => {
    if (itemId === selectedId) {
      setSelectedId(null);
    } else {
      setSelectedId(itemId);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Insta Planner</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={items}
          keyExtractor={(item) => `item${item.id}`}
          renderItem={({ item }) => (
            <Item
              key={`item${item.id}`}
              onPress={() => handleSelection(item.id)}
              title={item.title}
              selected={selectedId === item.id}
            />
          )}
          numColumns={3}
          extraData={selectedId}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
  },
  listContainer: {
    flex: 11,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
