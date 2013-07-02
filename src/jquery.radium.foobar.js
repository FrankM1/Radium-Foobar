 
/* radium_foobar
/* Version 1.2 */
(function($) {
 	
 	var Radium_Foobar = { 
 			
     	init: function(options, elem) {
 			
 			var self = this;
 			self.options 	= $.extend({}, $.fn.radium_foobar.options, options);
 			self.elem 		= $(elem);
 			if ( !self.options.button_position ) self.options.button_position = elem;
 				self.wrapper 	= self.elem,
 			self.close 		= $('<div/>').addClass('close').html(' ').appendTo(self.options.button_position);
 			self.open 		= $('<div/>').addClass('open').html(' ').appendTo(self.options.button_position);
 			self.cookie 	= self.options.cookie_name,
 			self.header 	= $(self.options.header),
 			self.height 	= self.elem.outerHeight(true);
 				  				
 			self.wrapper.removeClass('hidden');
 			
 			if( $.cookie(self.cookie) == null && self.wrapper.hasClass('foobar-loaded') ) {
 			
 				self.wrapper.css({'top' : 0});
 				self.header.css({paddingTop : self.height});
 				self.close.addClass('open').removeClass('closed').show();
 				self.open.hide();
 				
 			} else {
 			
 				self.wrapper.css({'top' : '-' + self.height});
 				self.header.css({paddingTop : 0});
 				self.close.addClass('closed').removeClass('open').hide();
 				self.open.show();;
 				
 			}
 			
 			if( $.cookie(self.cookie) == 'closed' && self.options.cookie ) {
 				self.wrapper.css({'top' : '-' + self.height });
 				self.header.css({paddingTop : 0});
 				self.close.addClass('closed').removeClass('open').hide();
 				self.open.show();
 			};
 			
 			if( $.cookie(self.cookie) == 'open' && self.options.cookie ) {
 				self.wrapper.css({'top' : 0});
 				self.header.css({paddingTop : self.height });
 				self.close.addClass('open').removeClass('closed').show();
 				self.open.hide();
 			};
 			
 			self.open.click(function(){
 				self.close.removeClass('closed').addClass('open').css("display", "");
  				self.header.animate({paddingTop : self.height }, self.options.speed);
 				self.wrapper.animate({ 'top' : 0}, self.options.speed).addClass('foobar-loaded');
 				$(this).hide();
 				if( self.options.cookie ) $.cookie(self.cookie, 'open', { expires: 1, path: '/' });
 			});
 			
 			self.close.click(function(){
 				self.wrapper.animate({'top' : '-' + self.height}, self.options.speed);
 				self.header.animate({paddingTop : 0}, self.options.speed);
 				self.close.addClass('closed').removeClass('open');
 				$(this).hide();
 				self.open.css("display", "");
 				if( self.options.cookie ) $.cookie(self.cookie, 'closed', { expires: 1, path: '/' });
 			});	
 		}
 	};
 	
 	$.fn.radium_foobar = function(options) {
 	
 	    return this.each(function() {
 	    
 	        var radium_foobar  = Object.create(Radium_Foobar);
 	       	radium_foobar .init(options, this);
 	        $.data(this, 'foobar', radium_foobar );
 	        
 	    });
 	    
 	};
 	
 	$.fn.radium_foobar.options = {
 		
 		cookie: true,
 		cookie_name: 'radium_foobar_cookie',
 	    speed: 200,
 	    header: '#main-header',
 	    button_position: '#top-foobar'
  
 	};	
 	
})(jQuery);	 