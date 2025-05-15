import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class DivClassPlugin extends Plugin {
  init() {
    const editor = this.editor;

    // 1. Схема: div как контейнер
    if ( !editor.model.schema.isRegistered( 'div' ) ) {
      editor.model.schema.register( 'div', {
        allowWhere: '$block',
        allowContentOf: '$block',
        allowAttributes: [ 'class', 'style' ],
        isObject: true
      });
    } else {
      editor.model.schema.extend( 'div', {
        allowContentOf: '$block'
      });
    }

    // ✅ 2. Разрешаем параграфы внутри div
    editor.model.schema.extend( 'paragraph', {
      allowIn: 'div'
    });

    // 3. Кнопка тулбара
    editor.ui.componentFactory.add('divClass', locale => {
      const view = new ButtonView(locale);

      view.set({
        label: 'Set Div Class',
        tooltip: true
      });

      view.on('execute', () => {
        const selection = editor.model.document.selection;
        const position = selection.getFirstPosition();
        const selectedElement = position.findAncestor('div');

        if (selectedElement) {
          const currentClass = selectedElement.getAttribute('class') || '';
          const newClass = prompt('Enter class for the div:', currentClass);
          if (newClass !== null) {
            editor.model.change(writer => {
              writer.setAttribute('class', newClass, selectedElement);
            });
          }
        }
      });

      return view;
    });
  }
}
