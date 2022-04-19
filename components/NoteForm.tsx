import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from '@ui-kitten/components';
import { Button, Icon, Layout, Spinner } from '@ui-kitten/components';
import { NoteType } from '../types';

interface NoteFormProps {
    onSave: (note: NoteType) => void
    note?: NoteType
    buttonText?: string
    buttonIcon?: string
}

export const NoteForm = (props: NoteFormProps) => {
    const [titleInput, setTitleInput] = useState<string>(props.note ? props.note.title : '')
    const [noteInput, setNoteInput] = useState<string>(props.note ? props.note.text : '')

    const handleOnSave = () => {
        const now = new Date()
        const newNote: NoteType = {
            id: props.note ? props.note.id : now.toISOString(),
            text: noteInput,
            title: titleInput,
            createdOn: props.note ? props.note.createdOn : now
        }
        props.onSave(newNote)
    }

    return (
        <View style={styles.view}>
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
                    <Icon name={ props.buttonIcon ? props.buttonIcon : 'save'}/>
                }
                onPress={handleOnSave}
            >
                { props.buttonText ? props.buttonText : 'Save Note'}
            </Button>

        </View>
    )
}
const styles = StyleSheet.create({
    view: {
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        marginVertical: 2,
        marginBottom: 25
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        margin: 2,
        marginTop: 25,
        maxWidth: 200
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})
