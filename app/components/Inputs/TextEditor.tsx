"use client"

import {
  ContentEditableProps,
  createButton,
  createDropdown,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
  useEditorState
} from 'react-simple-wysiwyg';
import React, {useState} from "react";
import {InputGroup} from "@/app/components/Inputs/InputGroup";
import styles from "@/app/components/Inputs/Input.module.css";
import {FormMessage} from "@/app/components/Form";
import {ApiError} from "@/app/types";
import './TextEditor.css';

const BtnUndo = createButton('Undo', <i className={"uil-corner-up-left-alt text-h3"}/>, 'undo');
const BtnRedo = createButton('Redo', <i className={"uil-corner-up-right-alt text-h3"}/>, 'redo');
const BtnBold = createButton('Bold', <i className={"uil-bold text-h3"}/>, 'bold');
const BtnItalic = createButton('Italic', <i className={"uil-italic text-h3"}/>, 'italic');
const BtnUnderline = createButton('Underline', <i className={"uil-underline text-h3"}/>, 'underline');
const BtnAlignCenter = createButton('Align center', <i className={"uil-align-center text-h3"}/>, 'justifyCenter');
const BtnAlignLeft = createButton('Align left', <i className={"uil-align-left text-h3"}/>, 'justifyLeft');
const BtnAlignRight = createButton('Align right', <i className={"uil-align-right text-h3"}/>, 'justifyRight');
const BtnStrikeThrough = createButton('Strike through', <i className={"uil-text-strike-through text-h3"}/>, 'strikeThrough');
const BtnNumberedList = createButton('Numbered list', <i className={"uil-list-ol text-large"}/>, 'insertOrderedList');
const BtnBulletList = createButton('Bullet  list', <i className={"uil-list-ul text-h3"}/>, 'insertUnorderedList');
const BtnClearFormatting = createButton('Clear formatting', <i className={"uil-times text-h3"}/>, 'removeFormat');
const BtnLink = createButton('Link', <i className={"uil-link-h text-h3"}/>, ({ $selection }) => {
  if ($selection?.nodeName === 'A') {
    document.execCommand('unlink');
  } else {
    // eslint-disable-next-line no-alert
    document.execCommand('createLink', false, prompt('URL', '') || undefined);
  }
});

const BtnStyles = createDropdown('Styles', [
  ['Normal', 'formatBlock', 'DIV'],
  ['Header 1', 'formatBlock', 'H1'],
  ['Header 2', 'formatBlock', 'H2'],
  ['Header 3', 'formatBlock', 'H3'],
  ['𝙲𝚘𝚍𝚎', 'formatBlock', 'PRE'],
]);

const HtmlButton = ({ ...rest }) => {
  const editorState = useEditorState();
  function onClick() {
    editorState.update({
      htmlMode: !editorState.htmlMode,
    });
  }
  return (
    <button
      type="button"
      title="HTML mode"
      className="rsw-btn"
      onClick={onClick}
      data-active={editorState.htmlMode}
      {...rest}
    >
      <i className={"uil-arrow text-h3"}/>
    </button>
  );
}

interface TextEditorProps extends ContentEditableProps {
  label?: string | React.ReactElement | React.ReactElement[],
  errors?: ApiError | null | string | string[];
  errorKey?: string;
}
export const TextEditor = ({label, id, errors, errorKey, value, onChange, name, ...rest}: TextEditorProps) => {
  return (
    <InputGroup>
      {label && <label htmlFor={id} className={styles.form__label}>{label}</label>}
      <EditorProvider>
        <Editor value={value} onChange={onChange} name={name || id} {...rest}>
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnAlignRight />
            <BtnAlignCenter />
            <BtnAlignLeft />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
            <HtmlButton />
            <Separator />
            <BtnStyles />
          </Toolbar>
        </Editor>
      </EditorProvider>
      <FormMessage errors={errors} errorKey={errorKey} as={'text'} />
    </InputGroup>
  );
}
