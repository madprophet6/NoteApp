import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Button, Icon, Input, List, ListItem } from '@ui-kitten/components';
import { NoteType } from '../types';


interface NoteListProps {
  notes: NoteType[]
  onRowPress: (note: NoteType) => void
  onDelete: (note: NoteType) => void
}

export const NoteList = (props: NoteListProps) => {
  const [searchInput, setSearchInput] = useState('')

  const renderItem = ({ item, index }: { item: NoteType, index: number }) => (
    <ListItem
      title={`${item.title}`}
      description={`Created ${(item.createdOn.split('T')[0])}`}
      onPress={() => { props.onRowPress(item) }}
      accessoryRight={() => (
        <Button
          style={{ margin: 2 }}
          status='danger'
          accessoryLeft={<Icon name='trash-outline' />}
          onPress={() => props.onDelete(item)}
        />
      )}
    />
  );

  // search notes
  let filterNotes = props.notes.filter(note => {
    if (searchInput === '')
      return true
    else if (note.title.indexOf(searchInput) > -1)
      return true
    else if (note.text.indexOf(searchInput) > -1)
      return true
    else 
      return false
  })

  return (
    <>
      <Input
        style={styles.input}
        size='medium'
        placeholder='Serch Notes'
        accessoryLeft={<Icon name='search-outline' />}
        value={searchInput}
        onChangeText={setSearchInput}
      />
      <List
        style={styles.container}
        data={filterNotes}
        renderItem={renderItem}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  input: {
    marginVertical: 2,
    marginBottom: 25
  },
});