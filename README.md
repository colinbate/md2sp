> ## Moved to https://github.com/colinbate/md2sp

# Markdown 2 Sharepoint

> This is the published version of the code.

Takes documents with TOML front matter and markdown content and posts them to a Sharepoint blog (or other MetaWeblog API blog). I've tested it with Sharepoint 2010, Sharepoint 2013 and Wordpress 4.0 but it should work with others. Supports normal API authentication as well as NTLM authentication.

Also supports inlining custom stylesheets and using custom CA certificates if needed. Useful for working with corporate certificates that node.js doesn't like.

## Installation

Make sure you have `node.js` installed, then you just need:

    [sudo] npm install -g md2sp

This should install the `md2sp` tool globally on your machine.

## Usage

Markdown 2 Sharepoint is a command line app, when installed globally it should make available the `md2sp` tool. This tool can be used as follows:

    md2sp [[-e] <filename>]
    md2sp new [-i] [<title>]

If run without any parameters, it will attempt to set up a new connection by prompting for information. This can be used to set up a directory for your content files. Doing so will create an `md2sp.toml` file in the working folder with your configuration in it.

When you run the command with a filename as a parameter it will try to create a new post with the contents of that file. It will look for the `md2sp.toml` file in the current directory and all parent directories. If it cannot find one, it will fail. If it does, it will use that information to post your content.

If you haven't saved your password in the config file, it will prompt you each time you run the tool.

In order to edit a post, you will need to ensure there is a `postid` field in the metadata of the content file. This value will be returned after creating a new post and is automatically added to the file if successful. Once this is done, you can run the command with the `-e` flag to indicate editing. **The contents of the post will be overwritten with the contents of the file. If you have edited the post on the server, you may lose those changes.**

### Example

An example content file:

```md
+++
title = "Some Exciting Title"
date = 2014-09-24T14:35:00Z
categories = ["Whatever"]
+++
This is going to be a **great** article.

I like that my markup is so simple.
```

The only required metadata is `title`.

The `date` field is optional, with the current date being used when you post the article. If specified, the date needs to be in UTC. This seems to be a limitation of the TOML parser at the moment.

Any other metadata fields are passed through to the MetaWeblog API as specified.

### Creating a New Post File

If you run the tool with the `new` command, it will create a new post file. You can specify a title on the command line to quickly create a file without any other metadata. If you omit the title, or you specify `-i` with it, you will be prompted to add meta data (data and categories). The filename will be based on the title.

## To Do

* Handle deleting posts
* ~~Automatically add `postid` to newly added files~~
* ~~Create a post file generator~~
* Support uploading images
* ~~Save current date back to date-less posts~~
* ~~Detect existing config files during setup~~
* Add support for proxies
* Add tests!

