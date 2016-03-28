define(['base/js/namespace', 'base/js/utils', 'jquery'], function(Jupyter, utils, $) {

    function copy_and_swap_content (nb_path, parent_path, content) {
        return Jupyter.notebook.contents.copy(nb_path, parent_path).then(function (data) {
            // save edited content to the newly-provided copy path
            return Jupyter.notebook.contents.save(
                data.path, {type: 'notebook', content: content}
            ).then(function (data) {
                var url = utils.url_path_join(
                    Jupyter.notebook.base_url, 'notebooks', utils.encode_uri_components(data.path)
                );
                // // maybe do something with the new url - open it, or notify user?
                // // Nothing for now, as opening it looks like a popup
                // window.open(url);
            });
        });
    }

    function split_cell_to_notebook() {
        var selected_cell = Jupyter.notebook.get_selected_cell();
        var selected_index = Jupyter.notebook.get_selected_index();

        var nb_path = Jupyter.notebook.notebook_path;
        var parent_path = utils.url_path_split(nb_path)[0];

        var content;

        // pre-cursor notebook
        content = Jupyter.notebook.toJSON();
        content.cells[selected_index].source = selected_cell.get_pre_cursor();
        content.cells = content.cells.slice(0, selected_index + 1);
        copy_and_swap_content(nb_path, parent_path, content);

        // post-cursor notebook
        content = Jupyter.notebook.toJSON();
        content.cells[selected_index].source = selected_cell.get_post_cursor();
        content.cells = content.cells.slice(selected_index, content.cells.length);
        copy_and_swap_content(nb_path, parent_path, content);
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
