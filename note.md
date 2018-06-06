# Note

## components

### layout

**references:**

[1] https://colorlib.com/thank-you-for-downloading/?dlm-dp-dl=755

[2] transparent background image https://www167.lunapic.com/editor/?action=crop

[3] Modern Business https://blackrockdigital.github.io/startbootstrap-modern-business/about.html

- fullscreen `lab 03` and `the storymap template of lab`

**fullscreen**

```css
html, body, #map { width: 100%; height: 100%; margin: 0; background: #fff; }
``` 

**leaflet `div` placeholder/element inside a `div` element**


```css
.storymap-map {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: 900;     /*a larger z-index than the container*/
    display: block;
    overflow-x: hidden;
    overflow-y: hidden;
    background-color: #f5f5f5;
}
```

### data


#### draught map:

http://drought.eng.uci.edu/js/main.js  search "mercator"

```javascript
 L.tileLayer(' http://climate.calit2.uci.edu/MERRA/tile_mercator/SPI20152_dry/tile_{z}_{x}-{y}.png').addTo(map);
```
json to csv



#### Matrix

[1] georeference

[2] swoopy arrow

[animation.html](animation.html)

### functions

#### map

#### sankey

### 3D force atlas graph


matrix