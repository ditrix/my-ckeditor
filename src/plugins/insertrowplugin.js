// -------- InsertRowPlugin.js --------

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import divClassIcon from '../icons/divClassIcon.svg'; // Импорт иконки

export default class InsertRowPlugin extends Plugin {
  init() {
    const editor = this.editor;

// Разрешить абзацы внутри всех div
  editor.model.schema.extend('paragraph', {
    allowIn: 'div'
  });

    editor.ui.componentFactory.add('insertRow', locale => {
      const view = new ButtonView(locale);

      view.set({
        label: 'Insert Row',
        icon: divClassIcon, // Установка иконки
        tooltip: true
      });

      view.on('execute', () => {
        const html = `<p></p>
          <div class="row">
            <div class="col-lg-6 col-sm-12"><p>Column 1</p></div>
            <div class="col-lg-6 col-sm-12"><p>Column 2</p></div>
          </div>
        <p></p>`;

        editor.model.change(writer => {
          const viewFragment = editor.data.processor.toView(html);
          const modelFragment = editor.data.toModel(viewFragment);
          editor.model.insertContent(modelFragment, editor.model.document.selection);
        });
      });

      return view;
    });
  }
}
