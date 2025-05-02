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
 import Widget from '@ckeditor/ckeditor5-widget/src/widget';


class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
  Essentials,
  Paragraph,
  Bold,
  Italic,
  PasteFromOffice,
  GeneralHtmlSupport,
  SourceEditing,
  InsertRowPlugin,
  Widget,
];

ClassicEditor.defaultConfig = {
  toolbar: {
    items: ['bold', 'italic', '|', 'insertRowCols', '|', 'undo', 'redo',
      'sourceEditing',
      // 'insertRowCols', // кнопка вставки строки
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