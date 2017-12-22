# Libraries
----------

## 1. Visible items on screen

Normal
```
VisibleOnViewport('.col-4');
```

On scroll
```
$(window).scroll(function() {
  VisibleOnViewport('.col-4');
});
```

Add `bg-primary` class to visible item. by default it will add `visible-item`. 
```
VisibleOnViewport('.col-4', 'bg-primary');
```


## 2. Find number of items per row

Normal
```
ItemsPerRow('.col-4');
```

Multiple Items
```
ItemsPerRow('.col-4');
ItemsPerRow('.col-6');
```
