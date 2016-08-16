(function(){
    var oghat = {
        dom_obj : {},
        init : function(){
            this.dom_obj = create_block_element('oghat_block', main_menu.dom_obj);
			console.log('testing...' + this.dom_obj);
 			this.dom_obj.show();
            this.start_load();
        },

        set : function(title) { 	//,data){
            _debug('oghat.set:' + title + ":"); 	// + data);
            this.dom_obj.show();
			this.dom_obj.innerHTML = title; 	// + '<div class="oghat_widget_title"><span>oghat e 2222</span></div>' ;

        },
        load : function(){
            _debug('oghat.load');
            var answer = '';
            var request = new XMLHttpRequest();
            
            var self = this;
            
            request.open('GET','pray_time.php'/* + Math.random() */, true);
            request.setRequestHeader("Content-Type", "text/xml");
            request.setRequestHeader("charset", "utf-8");
            request.onreadystatechange = function(){
            
                _debug('oghat.request ' + request.readyState + ":" + request.status);
            
                if (request.readyState == 4 && request.status == 200) {
            
                    clearTimeout(requestTimeout);
                    answer = request.responseText;//.split("|");
                    //if (answer) {
                    //    self.set(answer['0']);  	// ,answer['1']);
                    //} else {
                    //    self.set();
                    //}
					self.set(answer);
                }
            };
            request.send(null);
            var requestTimeout = setTimeout(request.abort,5000);

        },
        start_load : function(){
            _debug('oghat.start_load');
            this.load();
            var self = this;
            window.clearInterval(this.load_interval);

            this.load_interval = window.setInterval(function(){self.load()}, 30*60*1000)

        }
    };
    oghat.init();
	oghat.set();
	
    module.oghat = oghat;
    loader.next();
})();







//
//(function(){
//
//    module.oghat_widget = {
//		
//		dom_obj	: {},
//        on        : false,
//        widget_on : false,
//
//        init : function(){
//            _debug('oghat_widget.init');
//
//            this.dom_obj   = create_block_element('oghat_widget_block', main_menu.dom_obj);
//
//            this.title_obj = create_block_element('title', this.dom_obj);
//            
//            //this.items_obj = create_block_element('items', this.dom_obj);
//
//            
//            var self = this;
//
//            this.hide();
//            this.widget_on = this.on = true;
//
//        },
//
//        show : function(item){
//            _debug('oghat_widget.show', item);
//
//            this.dom_obj.show();
//            this.widget_on = true;
//			this.dom_obj.innerHTML = '<div class="oghat_widget_title">oghat e kire khar kharkosde</div>' ;
//        },
//
//        hide : function(){
//            _debug('oghat_widget.hide');
//            this.dom_obj.hide();
//            this.widget_on = this.on = false;
//        }
//
//
//    };
//	
//	oghatWidget = new oghat_widget;
//    module.oghat_widget.init();
//	module.oghat_widget.show();
//	
//
//})();
//
//loader.next();