// src/components/RichEditor.jsx
import React, { useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function RichEditor({ value, onChange }) {
  // Convert initial HTML to Draft ContentState
  const contentBlock = htmlToDraft(value || '');
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks,
    contentBlock.entityMap
  );

  // EditorState holds current content
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState)
  );

  // Update editor state and propagate HTML to parent
  const handleEditorChange = (state) => {
    setEditorState(state);
    const html = draftToHtml(convertToRaw(state.getCurrentContent()));
    onChange(html);
  };

  return (
    <div className="border rounded-2xl overflow-hidden">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbarClassName="bg-gray-100 p-2 flex flex-wrap"
        wrapperClassName="editor-wrapper"
        editorClassName="min-h-[150px] p-4 focus:outline-none"
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'list',
            'textAlign',
            'link',
            'emoji',
            'image',
            'history',
          ],
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough'],
          },
          blockType: {
            options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote'],
          },
          fontSize: {
            options: [8, 12, 16, 24, 32, 48],
          },
          list: {
            options: ['unordered', 'ordered'],
          },
          textAlign: {
            options: ['left', 'center', 'right', 'justify'],
          },
          link: {
            options: ['link'],
          },
          emoji: {},
          image: {
            urlEnabled: true,
            uploadEnabled: false,
            previewImage: true,
          },
          history: {
            options: ['undo', 'redo'],
          },
        }}
      />
    </div>
  );
}
