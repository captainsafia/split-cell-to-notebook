define(['base/js/namespace', 'base/js/utils', 'jquery'], function(Jupyter, utils, $) {
    function split_cell_to_notebook() {
        var selected_cell = Jupyter.notebook.get_selected_cell();
        var content_before_cursor = selected_cell.get_pre_cursor();
        var content_after_cursor = selected_cell.get_post_cursor();

        var nb_path = Jupyter.notebook.notebook_path;
        var parent_path = utils.url_path_split(nb_path)[0];
        
        Jupyter.notebook.contents.copy(nb_path, parent_path).then(function(data) {
            Jupyter.notebook.contents.get(data.path, {type: 'notebook'}).then(function(data) {
                Jupyter.notebook.fromJSON(data);
                var copy_selected_cell = Jupyter.notebook.get_selected_cell();
                copy_selected_cell.set_text(content_before_cursor);
                console.log(copy_selected_cell.get_text());
                Jupyter.notebook.save_notebook().then(function() {
                    console.log(Jupyter.notebook);
                    console.log('Notebook saved!');
                });
            });
        });

        Jupyter.notebook.contents.copy(nb_path, parent_path).then(function(data) {
            Jupyter.notebook.contents.get(data.path, {type: 'notebook'}).then(function(data) {
                Jupyter.notebook.fromJSON(data);
                var original_selected_cell = Jupyter.notebook.get_selected_cell();
                original_selected_cell.set_text(content_after_cursor);
                console.log(original_selected_cell.get_text());
                Jupyter.notebook.save_notebook().then(function() {
                    console.log(Jupyter.notebook);
                    console.log('Notebook saved!');
                });
            });
        });
    }

    function place_split_button() {
        if (!Jupyter.toolbar) {
            $([Jupyter.events]).on("app_initialized.NotebookApp", place_split_button);
            return;
        }

        if ($("#split-cell-to-nb-btn").length === 0) {
            Jupyter.toolbar.add_buttons_group([
                {
                    'label': 'Split Cell to Notebooks',
                    'icon': 'fa-indent',
                    'callback': split_cell_to_notebook,
                    'id': 'split-cell-to-nb-btn'
                },
            ]);
        }
    }

    function load_ipython_extension() {
        console.log('Loading split-cell-to-notebook extension...');
        place_split_button();
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});
