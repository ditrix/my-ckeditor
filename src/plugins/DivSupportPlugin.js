import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class DivSupport extends Plugin {
    init() {
        const editor = this.editor;

        // 1. Регистрация schema
        editor.model.schema.register('div', {
            allowWhere: '$block',
            allowContentOf: '$block',
            isObject: true,
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
        const div = writer.createContainerElement('div', {
            class: modelElement.getAttribute('class') || ''
        });

        return div;
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
}
}
