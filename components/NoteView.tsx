import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Layout, Modal, Text } from '@ui-kitten/components';
import { NoteType } from '../types';
import { NoteForm } from './NoteForm';

interface NoteViewProps {
    isVisible: boolean
    handleClose: () => void
    note: NoteType | null
    onSave: (note: NoteType) => void
}

export const NoteView = (props: NoteViewProps) => {
    const { isVisible, handleClose, note } = props

    const handleOnSaveAndClose = (note: NoteType) => {
        props.onSave(note)
        handleClose()
    }

    return (
        <Modal 
            visible={isVisible}
            backdropStyle={styles.backdrop}
            style={{ width: '90%'}}
        >
            <Card disabled={true}>
                <NoteForm
                    onSave={(note) => handleOnSaveAndClose(note)}
                    note={note ? note : undefined}
                    buttonText='Done'
                    buttonIcon='checkmark-outline'
                />
            </Card>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: 192,
    },
    card: {
        width: '90%'
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});