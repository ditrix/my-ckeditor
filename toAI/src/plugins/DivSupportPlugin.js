import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';

export default class DivSupport extends Plugin {
    init() {
        const editor = this.editor;

        // 1. Регистрация schema
        editor.model.schema.register('div', {
            allowWhere: '$block',
            allowContentOf: '$block', // Разрешить содержимое внутри <div>
            isLimit: true, // Указывает, что <div> является ограничивающим контейнером
            allowAttributes: ['class']
        });

        // 2. Upcast (HTML -> модель)
        editor.conversion.for('upcast').elementToElement({
            view: {
                name: 'div',
                attributes: {
                    class: true
                }
            },
            model: (viewElement, { writer }) => {
                const classAttr = viewElement.getAttribute('class');
                return writer.createElement('div', {
                    class: classAttr
                });
            }
        });

        // 3. Data Downcast (модель -> HTML)
        editor.conversion.for('dataDowncast').elementToElement({
            model: 'div',
            view: (modelElement, { writer }) => {
                return writer.createContainerElement('div', {
                    class: modelElement.getAttribute('class') || ''
                });
            }
        });

        // 4. Editing Downcast (модель -> view в редакторе)
        editor.conversion.for('editingDowncast').elementToElement({
            model: 'div',
            view: (modelElement, { writer }) => {
                const div = writer.createEditableElement('div', {
                    class: modelElement.getAttribute('class') || '',
                    style: 'border: 1px dashed #007acc; padding: 5px;' // Стили для выделения блока
                });

                return toWidgetEditable(div, writer); // Преобразование в редактируемый виджет
            }
        });

        // 5. Обработка вставки с сохранением class
        editor.plugins.get('ClipboardPipeline').on('inputTransformation', (evt, data) => {
            const viewFragment = data.content;

            for (const node of viewFragment.getChildren()) {
                if (node.is('element') && node.name === 'div') {
                    const classAttr = node.getAttribute('class');
                    if (classAttr) {
                        node._setAttribute('class', classAttr);
                    }
                }
            }
        });

        // 6. Добавление панели для изменения классов
        editor.ui.componentFactory.add('divClass', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Set Div Class',
                tooltip: true
            });

            view.on('execute', () => {
                const selection = editor.model.document.selection;
                const selectedElement = selection.getSelectedElement();

                if (selectedElement && selectedElement.is('element', 'div')) {
                    const newClass = prompt('Enter class for the div:', selectedElement.getAttribute('class') || '');
                    editor.model.change(writer => {
                        writer.setAttribute('class', newClass, selectedElement);
                    });
                }
            });

            return view;
        });
    }
}
