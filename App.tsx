import { Layout, Text, ApplicationProvider, IconRegistry, Button, Icon } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { NoteType } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NoteList } from './components/NoteList';
import { NoteView } from './components/NoteView';

const HomeScreen = () => {
  const [notes, setNotes] = useState<NoteType[]>([])
  const [viewNoteID, setViewNoteID] = useState<string | null>(null)

  // save notes to storage
  useEffect(() => {
    const jsonValue = JSON.stringify({ notes })
    AsyncStorage.setItem('notes', jsonValue)
  }, [notes])

  const saveNotes = () => {
    const jsonValue = JSON.stringify({ notes })
    AsyncStorage.setItem('notes', jsonValue)
  }

  // load notes from storage
  useEffect(() => {
    AsyncStorage.getItem('notes').then(jsonValue => {
      if(jsonValue !== null) {
        const data = JSON.parse(jsonValue)
        console.log(data)
        if (data.notes)
          setNotes(data.notes)
      }
    })
  }, [])

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

      saveNotes()
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
