# pasta

A command line tool for instantly creating public pastes on [pastebin.com](http://pastebin.com).

## Installation

Clone the respository from Github and install the necessary packages.

```shell
git clone https://github.com/avikj/pasta.git
cd pasta
npm install
```
Next, link the module to make the 'pasta' command available. You may have to use sudo or grant administrator permissions to do so.
```shell
npm link
```

## Usage

To use pasta, you must first obtain a developer API key from pastebin. To do so, create a pastebin account if you do not already have one, and log in. You can then find your unique API key [here](http://pastebin.com/api#1). 

The first time you use the pasta command, you will be prompted to enter your API key. This will be saved so that you will not need to enter it each time you want to create a paste.

The syntax for creating a paste is as follows:
```shell
$ pasta <filename> [title]
```
The command will return a [pastebin.com](http://pastebin.com) link to your file.

If the title is not provided, paste will use the file name as the title.

For example, if I wanted to create a paste for the main JavaScript file for a node module that I am currently working on, I would use
```shell
$ pasta index.js "index.js for paste"
  http://pastebin.com/xz6JFZak
```

NOTE: Pastebin may limit the number of pastes you create in a given time period due to account restrictions.

## Todo
 * improve error handling
 * allow users to use their pastebin accounts
 * publish on npm
