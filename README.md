# Sharer 1.0 

Sharer is a jquery plugin that automatically creates sharing buttons for share your site and web-app over 4 major social networking sites, without subscribe any paid plan or register anywhere.

Using *sharer* your audience will be able to share your content over:

* Facebook (requires a Facebook App ID)
* Google+
* Twitter
* Linked-in

Have a look in the [Live Demo] (http://awin.com.br/sharer)

## Why Sharer?

Yes, that's true! There's a bunch of plugins and online services that intend to allow you create ways to people share your contents from websites (and some of them are really greate), so, why I've created *sharer*? That's simple, because *sharer* doesn't require any subscribe, purchase or paid plan to work and it's a lot more easier and simple to embed.

I've created it to support my projects, but you can use it *for free* if you rather.

## Getting started

It's simple. 

Download this project (or clone this repository) on your computer and copy all files under *src* directory into a public folder of your project. After do it, the structure of files of your project should be something like as following:

```
/
| assets/
|--- js/
|------ sharer.1.X.X.js
|------ sharer.css
|------ social-icons.png
```

Open your HTML page (every page that sharing links should be available, or the template page of your site/app) and import the given libraries. After import it, your code should be like as following:

```
<!DOCTYPE html >

<html lang="en">
    <head>
        ...
        
        <!-- DESIGN FOR SHARING BUTTONS  -->
        <link rel="stylesheet" type="text/css" href="path/to/files/sharer.css" />
    </head>
    <body>
        ...
        
        <!-- YOUR SHARING BUTTONS SHOULD BE LIKE THIS -->
        <div class="sharer-container">
          <a class="sharer" data-media="facebook" href="">Facebook</a>
          <a class="sharer" data-media="google" href="">Google</a>
          <a class="sharer" data-media="twitter" data-shorten="true" data-title="..." href="">Twitter</a>
          <a class="sharer" data-media="linkedin" data-title="..." data-summary="..." href="">Linked-in</a>
        </div>
        
        ...
        
        <!-- SCRIPTS GOES HERE ... -->
        <script type="text/javascript" src="path/to/jquery.X.X.X.min.js"></script> <!-- IMPORT JQUERY -->
        <script type="text/javascript" src="path/to/sharer.1.X.X.min.js"></script> <!-- IMPORT SHARER -->
        <script type="text/javascript" >
          $(document).ready(function(){
            // call
            $('.sharer').sharer();
          });
        </script>
        
    </body>
</html>
```

That's it! Now, if you run your page, you should see all 4 sharing buttons.

## Options 

You can customize the behavior of *sharer* and it's highly recommended.

The following options are available for anchor TAGs (```<a />```):

### href : string

Optional.

If not given, *sharer* will consider that you're sharing the current URL. 

You can use it to share any other page from the page where sharing button is.

### data-media : string

Required.

Defines the media where page will be shared.

Possible values are:

* facebook
* google
* twitter
* linkedin

### data-shorten : boolean

Optional.

Defines whenever you want that a URL be shortened. 

All given URLs will be shortened with [Goo.gl](http:goo.gl).

### data-title : string

Optional.

Allows you to customize the text content that will be posted on Twitter or the title of your sharing on Linked-in. Text can be customized such as following example:

```
<a ... data-title="Anything you want here for #hashtag and {URL}" .. ></a>
```

In the above case, *sharer* will replace ```{URL}``` by given URL (shortened or not).

This parameter is ignored by *Facebook* and *Google Plus*.

### data-summary : string

Optional. It's used exclusively by Linked-in.

Allows you to customize the summary description of what content is being shared.

This parameter is ignored by *Facebook*, *Google Plus* and *Twitter*.

The following options are available for javascript call (``` $('.sharer').sharer(); ```):

#### fb_app_id  : string

Required to shave over Facebook.

If you wanna share your contents over Facebook, you should provide your *FACEBOOK APP ID*. It's required because Facebook requires an registered APP in order to share contents over its timeline.

To create your app, refer to https://developers.facebook.com/apps

#### fb_redir  : string

Required to shave over Facebook.

Besides the *fb_app_id* you should also provide the *REDIRECT URL*, and this URL should be registered on your Facebook App. Otherwise, Facebook will raise an error when your audience tries to share any content or page.

#### googl_api_key  : string

Optional, but strongly recommended if you'd like to shorten URLs.

*Sharer* makes use of [Goo.gl](http://goo.gl) API to shorten URLs you provide. Even though Google doesn't require an API Key in order to shorten those URLs, they strongly recommend that you get a key to do it. By the way, it's free.

To know how get your Goo.gl API key, refer to https://developers.google.com/url-shortener/v1/getting_started

#### screen_name  : string

Optional. Default value is "sharer".

It's the screen name that Twitter applies into a post. It will be seeing like "via @Sharer".

#### window  : JSON { width, height }

Optional.

This option allows you to customize the size of sharing popup window.

Default value is:

* width: 400,
* height: 500
	
#### onshare  : function( a, b )

Optional.

It's a callback that is called right after the sharing popup window is raised.

This callback throws 2 parameters:

* a: string - the media name (social networking site)
* b: object - the instance of opened popup window

You can make use of this callback to perform any useful action after user clicks to share something.


## Questions, reporting bugs and suggestions

You can use the [Github Issues Platform](https://github.com/rogeriotaques/sharer/issues) to report bugs or give your suggestons. Furthermore, all comments are welcome. ;) Happy coding.
