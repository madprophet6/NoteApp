import { Layout, Text, ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { NoteType } from './types';
import { NoteForm } from './components/NoteForm';
import { NoteList } from './components/NoteList';

const HomeScreen = () => {
  const [notes, setNotes] = useState<NoteType[]>([
    {
      createdOn: new Date(),
      text: 'bla bla bla',
      title: 'My Note!',
      id: '232233212321'
    }
  ])

  const handleOnNoteSave = (note: NoteType) => {
    console.log(note)
    setNotes([...notes, note])
  }

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      {/* <NoteForm /> */}
      <NoteForm 
        onSave={handleOnNoteSave}
      />

      <NoteList 
      notes={notes}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
