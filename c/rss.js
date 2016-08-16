(function(){
    var rss = {
        dom_obj : {},
        init : function(){
            this.dom_obj = create_block_element('rss_block', main_menu.dom_obj);
			console.log('testing...' + this.dom_obj);
            //var title = create_inline_element('rssss', this.dom_obj);

            //this.title_obj = create_inline_element('rs4', this.dom_obj);
            //this.title_obj.setClass('rss_title');

            //this.dom_obj = create_inline_element('rs5', this.dom_obj);
            //this.dom_obj.setClass('rss_descr');
            //this.dom_obj.hide();
			//this.dom_obj.innerHTML = '<div class="rss_widget_title"><span id="rssfeed">rss e 111 khar kharkosde</span></div>' ;
			//this.dom_obj.innerHTML = ' <!-- start feedwind code --><script type="text/javascript">document.write(\'\x3Cscript type="text/javascript" src="\' + (\'https:\' == document.location.protocol ? \'https://\' : \'http://\') + \'feed.mikle.com/js/rssmikle.js">\x3C/script>\');</script><script type="text/javascript">(function() {var params = {rssmikle_url: "http://www.hamshahrionline.ir/rss",rssmikle_frame_width: "300",rssmikle_frame_height: "400",frame_height_by_article: "0",rssmikle_target: "_blank",rssmikle_font: "Arial, Helvetica, sans-serif",rssmikle_font_size: "14",rssmikle_border: "off",responsive: "off",rssmikle_css_url: "",text_align: "right",text_align2: "right",corner: "on",scrollbar: "on",autoscroll: "on",scrolldirection: "up",scrollstep: "7",mcspeed: "20",sort: "New",rssmikle_title: "on",rssmikle_title_sentence: "اخبار ایران و جهان",rssmikle_title_link: "",rssmikle_title_bgcolor: "#F5CE00",rssmikle_title_color: "#000000",rssmikle_title_bgimage: "",rssmikle_item_bgcolor: "#403C6E",rssmikle_item_bgimage: "",rssmikle_item_title_length: "55",rssmikle_item_title_color: "#D1D7FF",rssmikle_item_border_bottom: "on",rssmikle_item_description: "on",item_link: "off",rssmikle_item_description_length: "200",rssmikle_item_description_color: "#D4D4D4",rssmikle_item_date: "gl1",rssmikle_timezone: "Etc/GMT",datetime_format: "%b %e, %Y %k:%M:%S",item_description_style: "text+tn",item_thumbnail: "full",item_thumbnail_selection: "auto",article_num: "15",rssmikle_item_podcast: "off",keyword_inc: "",keyword_exc: ""};feedwind_show_widget_iframe(params);})();</script><div style="font-size:10px; text-align:center; width:300px;"><a href="http://feed.mikle.com/" target="_blank" style="color:#CCCCCC;">RSS Feed Widget</a><!--Please display the above link in your web page according to Terms of Service.--></div><!-- end feedwind code -->  ' ;
			this.dom_obj.show();
            this.start_load();
        },

        set : function(title) { 	//,data){
            _debug('rss.set:' + title + ":"); 	// + data);
            //if (title && data) {
                this.dom_obj.show();
            //} 
			//else {
            //    this.dom_obj.hide();
            //}
            //this.title_obj.innerHTML = title + "<br><hr>";
			//data = '<div class="rss_widget_title"><span>rss e kire khar kharkosde</span></div>' ;
            this.dom_obj.innerHTML = title; 	// + '<div class="rss_widget_title"><span>rss e 2222</span></div>' ;

        },
        load : function(){
            _debug('rss.load');
            var answer = '';
            var request = new XMLHttpRequest();
            
            var self = this;
            
            request.open('GET','rss.php'/* + Math.random() */, true);
            request.setRequestHeader("Content-Type", "text/xml");
            request.setRequestHeader("charset", "utf-8");
            request.onreadystatechange = function(){
            
                _debug('rss.request ' + request.readyState + ":" + request.status);
            
                if (request.readyState == 4 && request.status == 200) {
            
                    clearTimeout(requestTimeout);
                    answer = request.responseText;//.split("|");
                    if (answer) {
                        self.set(answer);  	// ,answer['1']);
                    } else {
                        self.set();
                    }
                }
            };
            request.send(null);
            var requestTimeout = setTimeout(request.abort,5000);

        },
        start_load : function(){
            _debug('rss.start_load');
            this.load();
            var self = this;
            window.clearInterval(this.load_interval);

            this.load_interval = window.setInterval(function(){self.load()}, 30*60*1000)

        }
    };
    rss.init();
	rss.set();
	
    module.rss = rss;
    loader.next();
})();







//
//(function(){
//
//    module.rss_widget = {
//		
//		dom_obj	: {},
//        on        : false,
//        widget_on : false,
//
//        init : function(){
//            _debug('rss_widget.init');
//
//            this.dom_obj   = create_block_element('rss_widget_block', main_menu.dom_obj);
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
//            _debug('rss_widget.show', item);
//
//            this.dom_obj.show();
//            this.widget_on = true;
//			this.dom_obj.innerHTML = '<div class="rss_widget_title">rss e kire khar kharkosde</div>' ;
//        },
//
//        hide : function(){
//            _debug('rss_widget.hide');
//            this.dom_obj.hide();
//            this.widget_on = this.on = false;
//        }
//
//
//    };
//	
//	rssWidget = new rss_widget;
//    module.rss_widget.init();
//	module.rss_widget.show();
//	
//
//})();
//
//loader.next();