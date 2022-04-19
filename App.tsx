import { Layout, Text, ApplicationProvider, IconRegistry, Button, Icon } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { NoteType } from './types';
import { NoteForm } from './components/NoteForm';
import { NoteList } from './components/NoteList';
import { NoteView } from './components/NoteView';

const HomeScreen = () => {
  const [notes, setNotes] = useState<NoteType[]>([
    {
      "createdOn": new Date(),
      "id": "2022-04-19T21:03:09.867Z",
      "text": "test",
      "title": "test",
    }
  ])
  const [viewNoteID, setViewNoteID] = useState<string | null>(null)

  const handleOnNoteSave = (note: NoteType) => {
    let doesNoteExist = false;

    // search and update existing note
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === note.id) {
        doesNoteExist = true
        notes[i] = note
        break;
      }
    }

    if (!doesNoteExist)
      setNotes([...notes, note])
  }

  const getNoteByID = (searchNoteID: string | null): NoteType | null => {
    let result: NoteType | null = null

    if (searchNoteID === null)
      return result

    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === searchNoteID) {
        result = notes[i]
        break;
      }
    }

    return result
  }

  const handleDeleteNote = (note: NoteType) => {
    const updatedNotes = notes.filter(({ id }) => note.id !== id)
    setNotes(updatedNotes)
  }

  const handleNotePress = (note: NoteType) => {
    setViewNoteID(note.id)
  }

  return (
    <Layout style={styles.container}>

      <NoteList
        notes={notes}
        onRowPress={handleNotePress}
        onDelete={(note) => handleDeleteNote(note)}
      />

      <Button
        style={{ margin: 2 }}
        status='primary'
        accessoryLeft={
          <Icon name='plus-outline' />
        }
        onPress={() => setViewNoteID('NEW')}
      >
        Create Note
      </Button>

      <NoteView
        isVisible={viewNoteID !== null}
        handleClose={() => { setViewNoteID(null) }}
        note={getNoteByID(viewNoteID)}
        onSave={(note) => handleOnNoteSave(note)}
      />


    </Layout>

  )
};

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <HomeScreen />
      </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(247, 249, 252)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 50
  },
});
