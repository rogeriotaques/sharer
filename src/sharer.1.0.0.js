/**
 * Sharer - jQuery plugin which creates an easy sharing bar for websites.  
 * Copyright (c) 2014, Rogério Taques. 
 *
 * Licensed under MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this 
 * software and associated documentation files (the "Software"), to deal in the Software 
 * without restriction, including without limitation the rights to use, copy, modify, merge, 
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons 
 * to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or 
 * substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @requires jQuery v1.8 or above
 * @version 1.0
 * @cat Plugins/UI 
 * @author Rogério Taques (rogerio.taques@gmail.com | https://github.com/rogeriotaques)
 */

/**
 * CHANGELOG
 * 
 * 1.0 First release.
 * 
 */

(function($){
	
	var defaults = {
		// it's required to share over facebook
		fb_app_id: 'YOUR FACEBOOK APP ID HERE',
		// it's required to share over facebook and must be a valid URL for your fb app (app_id)
		fb_redir: 'URL TO REDIRECT AFTER SHARE',		
		
		// the API key for goo.gl, a shortner service from Google
		googl_api_key: null,
		
		// customize the screen name
		screen_name: 'sharer',	
		
		// customize window size
		window: {
			width: 400,
			height: 500
		},
		
		// a callback which is called right after to open sharing window
		onshare: null,									
	}, 
	
	_shortenUrl = function( long_url, api_key )
	{
		// call the shortner service
		// and replace given url by it's short version
		var googl = JSON.parse($.ajax({
			url: 'https:\/\/www.googleapis.com\/urlshortener\/v1\/url' + ( api_key !== undefined && api_key !== null ? '?key=' + api_key : '' ),
			type: 'POST',
	        contentType: 'application/json; charset=utf-8',
	        dataType: 'json',
	        data: '{ longUrl: "' + long_url +'"}',
	        async: false
		}).responseText );	
		
		return googl.id;
		
	}, // _shortenUrl
	
	_getShareUrl = function ( sn, o, a )
	{
		var share_url = '',	
			url = ( a.attr('href') || window.location.href ),
			title = ( a.data('title') || a.attr('title') || 'Check it out! {URL}' ),
			summary = ( a.data('summary') || '' );

		if ( sn == 'facebook' ) share_url = 'https:\/\/www.facebook.com\/dialog\/share?app_id={APP_ID}&display=popup&href={URL}&redirect_uri={REDIRECT_URL}';
		else if ( sn == 'google' ) share_url = 'https:\/\/plus.google.com\/share?url={URL}';
		else if ( sn == 'twitter' ) share_url = 'https:\/\/twitter.com\/share?text={TITLE}&via={SCREEN_NAME}&url={URL}';
		else if ( sn == 'linkedin' ) share_url = 'http:\/\/www.linkedin.com\/shareArticle?mini=true&ro=true&url={URL}&title={TITLE}&summary={SUMMARY}';
		
		url = ( a.data('shorten') ? _shortenUrl(url, o.googl_api_key) : url );
		
		share_url = share_url.replace('{APP_ID}', (o.fb_app_id || ''));
		share_url = share_url.replace('{TITLE}', escape( title.replace('{URL}', url)) );
		share_url = share_url.replace('{SUMMARY}', escape(summary));
		share_url = share_url.replace('{URL}', escape(url));
		share_url = share_url.replace('{REDIRECT_URL}', escape(o.fb_redir));
		share_url = share_url.replace('{SCREEN_NAME}', escape(o.screen_name));
		
		return share_url;
		
	}; // _getShareUrl
	
	$.fn.sharer = function( options )
	{
		var o = $.extend(defaults, options);
		
		return this.each( function() {
			
			var t  = $(this),
				sn = t.data('media'); // which social networking should share in
			
			if ( sn )
			{
				t.addClass('sharer');
				t.html( '<i class="sharer-icon sharer-'+sn+'" ></i>' );
				
				t.on('click', function( ev )
				{
					// take control over click ...
					ev.preventDefault();
					
					// raise the default window popup
					var sharer_modal = window.open(
						_getShareUrl(sn, o, t), 
						'Sharer Window', 
						'channelmode=no,directories=no,fullscreen=no,status=no,toolbar=no,width=' + (o.window.width || 400) +',height=' + (o.window.height || 500) +',modal=yes,alwaysRaised=yes', 
						true
					);
					
					// when there is a callback set, call it ...
					if (o.onshare && $.isFunction( o.onshare ) )
					{
						o.onshare( sn, sharer_modal );
					}
				});							
			}
			else 
			{
				// when media isn't given
				// ignore and hide the item.
				t.hide();
			}
			
		} );	
		
	}; // $.fn.sharer 
	
})(jQuery);


