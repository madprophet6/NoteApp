import React from 'react';
import { StyleSheet } from 'react-native';
import { List, ListItem } from '@ui-kitten/components';
import { NoteType } from '../types';


interface NoteListProps {
    notes:NoteType[]

}

export const NoteList = (props:NoteListProps) => {

  const renderItem = ({ item, index }: { item: NoteType, index: number }) => (
    <ListItem 
        title={`${item.title} ${index + 1}`}
        description={`Created on ${item.createdOn.toISOString()} ${index + 1}`}
    />
  );

  return (
    <List
      style={styles.container}
      data={props.notes}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 180,
    width: 300
  },
});