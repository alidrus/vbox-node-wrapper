# vbox-node-wrapper
A wrapper for the VBoxManage command-line tool previously written in PHP, now rewritten as a NodeJS app.


## Introduction and Motivation
This utility is a replacement for
[virtualbox-cli-wrapper](https://github.com/alidrus/virtualbox-cli-wrapper)
previously written using PHP using symfony/console 3.0. I am no longer
maintaining it due to its complexity and general unpopularity of PHP as a
command line script. I decided to rewrite it as a NodeJS command-line app.


## Requirement
To use this utility, you will need:
- NodeJS, v14 recommended.
- Yarn
- VirtualBox with configured virtual machines.
- Linux, MacOS or any Unix-like OS supported by NodeJS.


## Build and Install
To produce the bundled script *dist/vbox.js*, run `yarn dev` at the top level
folder of this repository. This script may be executed by running `node
dist/vbox.js`.

Alternatively, you can compile it as a native executable *dist/vbox* by
running `yarn prod` and be run directly on the command line.

To install it in your home *bin/* directory, run `yarn install`.


## Usage
For detailed usage help run `vbox help`.
