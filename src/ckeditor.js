import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';

class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
  Essentials,
  Paragraph,
  Bold,
  Italic
];

ClassicEditor.defaultConfig = {
  toolbar: {
    items: ['bold', 'italic', 'undo', 'redo']
  },
  language: 'en'
};

if (typeof window !== 'undefined') {
    window.ClassicEditor = ClassicEditor;
  }