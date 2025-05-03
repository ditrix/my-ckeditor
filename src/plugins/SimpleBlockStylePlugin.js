// import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
// import Command from '@ckeditor/ckeditor5-core/src/command';
// import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
// import Model from '@ckeditor/ckeditor5-ui/src/model';
// import createDropdown from '@ckeditor/ckeditor5-ui/src/dropdown/utils/createDropdown';
// import addListToDropdown from '@ckeditor/ckeditor5-ui/src/dropdown/utils/addlisttodropdown';
// import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Command from '@ckeditor/ckeditor5-core/src/command';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import { createDropdown, addListToDropdown } from '@ckeditor/ckeditor5-ui';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';

//  import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget';
export default class SimpleBlockStylePlugin extends Plugin {
    init() {
        const editor = this.editor;
        const styles = [
            { name: 'Заметка', class: 'note' },
            { name: 'Подсказка', class: 'tip' },
            { name: 'Блок с кодом', class: 'code-block' }
        ];

        editor.commands.add('applySimpleBlockStyle', new ApplySimpleBlockStyleCommand(editor));

        editor.ui.componentFactory.add('blockStyle', locale => {
            const dropdownView = createDropdown(locale);
            const items = new Collection();

            for (const def of styles) {
                items.add({
                    type: 'button',
                    model: new Model({
                        label: def.name,
                        withText: true,
                        _styleClass: def.class
                    })
                });
            }

            addListToDropdown(dropdownView, items);

            dropdownView.buttonView.set({
                
                label: 'Block Style',
                tooltip: true,
                withText: true
               
            });

            dropdownView.on('execute', evt => {
                const className = evt.source._styleClass;
                editor.execute('applySimpleBlockStyle', className);
                editor.editing.view.focus();
            });

            return dropdownView;
        });
    }
}

class ApplySimpleBlockStyleCommand extends Command {
    execute(className) {
        const model = this.editor.model;

        model.change(writer => {
            const selection = model.document.selection;
            const position = selection.getFirstPosition();
            const selectedElement = selection.getSelectedElement();
            const parent = position.parent;

            if (selectedElement && selectedElement.name === 'div') {
                writer.setAttribute('class', className, selectedElement);
            } else {
                const div = writer.createElement('div', { class: className });
                model.insertContent(div, position);
                writer.setSelection(div, 'in');
            }
        });
    }

    refresh() {
        this.isEnabled = true;
    }
}
