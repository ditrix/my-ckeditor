import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
 import { GeneralHtmlSupport } from '@ckeditor/ckeditor5-html-support';
 import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';
 
 import InsertRowPlugin from './plugins/InsertRowPlugin.js';
 import DivSupportPlugin from './plugins/DivSupportPlugin.js';
 //import SimpleBlockStylePlugin from './plugins/SimpleBlockStylePlugin';
class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
  Essentials,
  Paragraph,
  Bold,
  Italic,
  PasteFromOffice,
  GeneralHtmlSupport,
  SourceEditing,
  DivSupportPlugin,
  InsertRowPlugin,
  //SimpleBlockStylePlugin
];

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
        'blockStyle',
        'bold',
        'italic',
        'undo',
        'redo',
        'sourceEditing',
        'divClass'
    ]
  },
  style: {
    definitions: [
        {
            name: 'block',
            element: 'div',
            classes: [ 'block' ]
        },
        {
            name: 'Col-2',
            element: 'div',
            classes: [ 'col-md-2' ]
        },
        {
          name: 'Col-3',
          element: 'div',
          classes: [ 'col-md-3' ]
      },
        {
            name: 'Row',
            element: 'div',
            classes: [ 'row' ]
        }
    ]
  },
  htmlSupport: {
    allow: [
      {
        name: /.*/, // любые теги
        attributes: true, // любые атрибуты
        classes: true,    // любые классы
        styles: true      // любые стили
      }
    ]
  },
  language: 'en'
};

if (typeof window !== 'undefined') {
    window.ClassicEditor = ClassicEditor;
  }
