import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
 import rowColsIcon from '../../icons/div_icon_wrk.svg';



export default class InsertRowPlugin extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add('insertRowCols', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Insert Row',
                icon: rowColsIcon,
                tooltip: true
            });

            view.on('execute', () => {
                const html =
                    `<div class="row" style="border:1px red solid;padding:1rem;">
                        <p>text inside dive</p>
                        <div class="col" style="border:1px green solid;display:inline-block;padding:0.5rem;">
                            <p>inner green text</p>
                        </div>
                        <div class="col" style="border:1px blue solid;display:inline-block;padding:0.5rem;">
                            <p>inner blue text</p>
                        </div>
                    </div>`;

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
