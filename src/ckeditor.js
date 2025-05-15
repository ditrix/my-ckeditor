// ckeditor.js (основной файл сборки CKEditor 5 с поддержкой InsertRow и DivWrapper)

import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

// Кастомные плагины
import InsertRowPlugin from './plugins/InsertRowPlugin';
import DivClassPlugin from './plugins/DivClassPlugin';

class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
  Essentials,
  Paragraph,
  Bold,
  Italic,
  PasteFromOffice,
  SourceEditing,
  GeneralHtmlSupport,
  Widget,
  InsertRowPlugin,
  DivClassPlugin
];

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      'bold', 'italic', '|',
      'insertRow', 'divClass', '|',
      'undo', 'redo', 'sourceEditing'
    ]
  },
  htmlSupport: {
    allow: [
      {
        name: /.*/,
        attributes: true,
        classes: true,
        styles: true
      }
    ]
  },
  language: 'en'
};

if (typeof window !== 'undefined') {
  window.ClassicEditor = ClassicEditor;
}