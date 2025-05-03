import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Command from '@ckeditor/ckeditor5-core/src/command';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import DropdownView from '@ckeditor/ckeditor5-ui/src/dropdown/dropdownview';
import createDropdown from '@ckeditor/ckeditor5-ui/src/dropdown/utils/createDropdown';
import addListToDropdown from '@ckeditor/ckeditor5-ui/src/dropdown/utils/addlisttodropdown';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';

export default class StylePlugin extends Plugin {
    init() {
        const editor = this.editor;

        editor.commands.add('applyBlockStyle', new ApplyBlockStyleCommand(editor));

        editor.ui.componentFactory.add('style', locale => {
            const dropdown = createDropdown(locale);
            const items = new Collection();

            const styles = editor.config.get('style.definitions') || [];

            for (const def of styles) {
                items.add({
                    type: 'button',
                    model: new Model({
                        label: def.name,
                        withText: true,
                        _styleDefinition: def
                    })
                });
            }

            addListToDropdown(dropdown, items);

            dropdown.buttonView.set({
                label: 'Styles',
                tooltip: true,
                withText: true
            });

            this.listenTo(dropdown, 'execute', evt => {
                const def = evt.source._styleDefinition;
                editor.execute('applyBlockStyle', def);
                editor.editing.view.focus();
            });

            return dropdown;
        });
    }
}

class ApplyBlockStyleCommand extends Command {
    execute(styleDef) {
        const model = this.editor.model;
        const selection = model.document.selection;

        model.change(writer => {
            const selectedElement = selection.getSelectedElement();

            if (selectedElement && model.schema.isBlock(selectedElement)) {
                // Переименовываем элемент (если нужно)
                if (selectedElement.name !== styleDef.element) {
                    const newElement = writer.createElement(styleDef.element, styleDef.attributes || {});
                    model.insertContent(newElement);
                    writer.setSelection(newElement, 'in');
                    return;
                }

                // Применяем атрибуты/классы
                if (styleDef.classes) {
                    writer.setAttribute('class', styleDef.classes.join(' '), selectedElement);
                }
            }
        });
    }

    refresh() {
        this.isEnabled = true;
    }
}
