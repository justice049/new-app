import React, { useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw,ContentState } from 'draft-js'
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { set } from 'nprogress';

export default function NewsEditor(props) {
  
  useEffect(() => {
    const html = props.content;
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState)
    }
  }, [props.content])

    // 定义 editorState 初始状态
    const [editorState, setEditorState] = useState()

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
