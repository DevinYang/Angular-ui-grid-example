Angular-ui-grid-example
=======================

AngularJS ui-grid example using Nginx


ui-grid is very useful

* when loading a very large dataset (10K+ records)
* customizing the view thru sorting, pinning column, etc.
* manipulating the data by editing the row dynamically



This a sample app which uses 

* AngularJS ui-grid component with following major settings
** ui-grid can be downloaded from [here](http://ui-grid.info/). This project has the downloaded dependency under /ui/js/release/
** column menu configuration
** grid menu configuration
** sorting option
** Column freeze/Pinning
** Lazy data load/Infinite Scroll - Improve page load performance
** Row selection
* Nginx server 1.6.2
** with gzip configuration (reduces the load size and load time drastically)
* Foundation CSS - As the style bootstrap. foundation.css can be downloaded [here](http://foundation.zurb.com/develop/download.html). This app has the css under /ui/css/lib/foundation.css


To run this app
1. Execute the start.cmd under /server/nginx-1.6.2/. This starts the server in the port 80
2. So load http://localhost on your browser (I tested on Chrome)



The json data used on this app is prepared using the online tool found here - http://www.json-generator.com/



Following are the styles required for ui-grid which is put in "custom.css"

```
...
/* CSS required for grid menu -- START */
.my-custom-menu {
  position: absolute;
}

.my-custom-menu .ui-grid-menu {
  padding: 0px;
}

.my-custom-menu .ui-grid-menu-inner {
  -webkit-box-shadow: none;
  box-shadow: none;
}
/* CSS required for grid menu -- END */
...
```



Following is the configuration to set up gzip in Nginx.

```javascript
...
...
http {
    ...
	...

    ### enable the gzip compression at the server level ###
    gzip on;
    gzip_http_version 1.1;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_proxied any;
    #gzip_types text/plain text/html text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/javascript text/x-js;
    gzip_types text/css application/json application/x-javascript text/javascript application/javascript text/x-js;
    gzip_buffers 16 8k;
    gzip_disable "MSIE [1-6]\.(?!.*SV1)";
	
	...
	...
	}
...
...
```

Observation
* When using ui-grid, page style was distorted without DOCTYPE. So do not forget to include DOCTYPE.
* Following imports are needed for ui-grid "grid menu" to appear properly
```
<!-- Scripts needed for grid menu ~~~ START -->
<script	src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-touch.js"></script>
<script	src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-animate.js"></script>
<script src="http://ui-grid.info/docs/grunt-scripts/csv.js"></script>
<script src="http://ui-grid.info/docs/grunt-scripts/pdfmake.js"></script>
<script src="http://ui-grid.info/docs/grunt-scripts/vfs_fonts.js"></script>
<!-- Scripts needed for grid menu ~~~ END -->
```
* Try removing the configuration for gzip in the Nginx.conf file, the page load time got increased drastically. (Observed using Chrome Developer Tool)
* Try removing the ui-grid option InfiniteScroll from the table, the data load takes a lot of time while dealing with huge dataset. InfiniteScroll option enable lazy load of data, load the data only when needed (in this case on scroll).(Observed using Chrome Developer Tool)