import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw } from 'draft-js'
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

export default function NewsEditor(props) {
  // 定义 editorState 初始状态
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  // 处理 editorState 更新
  const onEditorStateChange = (newState) => {
    setEditorState(newState)
  }

  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        onBlur={()=>{
            //进行回调
            props.getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        }}
      />
    </div>
  )
}
