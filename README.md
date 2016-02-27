# split-cell-to-notebook
A Jupyter Notebook extension for splitting a cell into two notebooks. Although,
@captainsafia made this extension, it would not have been possible without the
project's PokeMon sponsor, Cinccino.

![Cinccino](http://randompokemon.com/sprites/animated/573.gif)

## Installation

1. Run `ipython locate` to determine the location of your Jupyter Notebook configuration.
2. Download `split-cell-to-notebook.js` and copy it to `$(ipython locate)/nbextensions`.
3. Create a new folder called `static` inside `$(ipython locate)/profile_default`.
4. Create a new folder inside `static` called `custom`.
5. Create a new file inside custom titled `custom.js`.
6. Place the following inside `custom.js`
```
$([Jupyter.events]).on("app_initialized.NotebookApp", function() {
    Jupyter.load_extensions("split-cell-to-notebook");
});
```
7. Run `jupyter notebook` at the command line and enjoy your new feature!

## Usage Screencast
