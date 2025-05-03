import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';

 import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
 import HtmlSupport from '@ckeditor/ckeditor5-html-support';
 import { GeneralHtmlSupport } from '@ckeditor/ckeditor5-html-support';
 import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';
 import InsertRowPlugin from './plugins/insertrowplugin.js';
 import DivSupportPlugin from './plugins/DivSupportPlugin.js';
 import Widget from '@ckeditor/ckeditor5-widget/src/widget';
 import SimpleBlockStylePlugin from './plugins/SimpleBlockStylePlugin';
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

  SimpleBlockStylePlugin
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
    ]
  },
  style: {
    definitions: [
        {
            name: 'Заметка',
            element: 'div',
            classes: [ 'note' ]
        },
        {
            name: 'Подсказка',
            element: 'div',
            classes: [ 'tip' ]
        },
        {
            name: 'Блок с кодом',
            element: 'div',
            classes: [ 'code-block' ]
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