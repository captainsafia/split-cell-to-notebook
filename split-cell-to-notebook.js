define(['base/js/namespace', 'base/js/utils', 'jquery'], function(IPython, utils, $) {
    function split_cell_to_notebook() {
        var selected_cell = IPython.notebook.get_selected_cell();
        var content_before_cursor = selected_cell.get_pre_cursor();
        var content_after_cursor = selected_cell.get_post_cursor();
        var kernel_name = Jupyter.notebook.kernel.name;

        console.log(content_before_cursor);
        console.log(content_after_cursor);

        Jupyter.notebook.contents.new_untitled('.', {
            ext: '.ipynb',
            type: 'notebook'
        }).then(function(data) {
            var url = utils.url_path_join(Jupyter.notebook.base_url, 'notebooks',
                utils.encode_uri_components(data.path)) + 
                "?kernel_name=" + kernel_name;
            window.open(url, Jupyter._target);
        });

        selected_cell.set_text(content_before_cursor);
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
