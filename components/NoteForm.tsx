import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Input } from '@ui-kitten/components';
import { Button, Icon, Layout, Spinner } from '@ui-kitten/components';
import { NoteType } from '../types';

interface NoteFormProps {
    onSave: (note: NoteType) => void
}

export const NoteForm = (props: NoteFormProps) => {
    const [titleInput, setTitleInput] = useState<string>('')
    const [noteInput, setNoteInput] = useState<string>('')

    const handleOnSave = () => {
        const now = new Date()
        const newNote: NoteType = {
            id: now.toISOString(),
            text: noteInput,
            title: titleInput,
            createdOn: now
        }
        props.onSave(newNote)
    }

    return (
        <>
            <Input
                style={styles.input}
                size='medium'
                placeholder='Medium'
                label="Title"
                value={titleInput}
                onChangeText={setTitleInput}
            />
            <Input
                multiline={true}
                textStyle={{ minHeight: 64 }}
                placeholder='Multiline'
                label="Note"
                value={noteInput}
                onChangeText={setNoteInput}
            />
            <Button 
                style={styles.button} 
                status='primary' 
                accessoryLeft={
                    <Icon name='save'/>
                }
                onPress={handleOnSave}
            >
                Save Note
            </Button>

        </>
    )
}
const styles = StyleSheet.create({
    input: {
        marginVertical: 2,
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        margin: 2,
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})
