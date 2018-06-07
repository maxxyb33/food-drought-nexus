###### world-food-map-nexus-proposal ######
## Proposal
### for GEOG 4/572 project

# World Food-Drought Nexus #

*Group members:* 
**Bryce Bradshaw, Murthy Ganti, Max Boath**

*The motives:*
1. Look at world cereal production and trade (size-dependent isolines and Sankey diagrams)
2. Visually compare variations in food production/consumption to droughts using historical data (sweep/slider based visualization)
3. Visualize the difference between current and the maximum population that can be supported by the food produced in each country; Plot trends of these differences over time. 
4. Create JS code that will do use the data to project into future using simple models for population, food production and pressures (i.e., do something with the data to not just show it, but process it too, do some computation/optimization with the data).

*A description of the project:*\
Our map-based website will track 5 cereal food crop products’ movement around the world.  We will use data from FAO to feed a migration map (imports and exports by country, per crop), with an overarching coordinated-view that links active clicks to graphs of the data.  An underlying heatmap layer of drought-affected areas will tie food production/consumption to climatic events, and to see how the situation has evolved over time, we will apply a time-slider to our map.  Lastly, we hope to find a way to optimize the data on the fly, so that the website not only shows historical, recorded data, but may also be able to project trends into the future.


*Links to the data:*
+ [FAO World Cereal Food Production Data](http://www.fao.org/faostat/en/#data/QC/visualize "FAO Crop Map")
+ [World Drought Data](http://spei.csic.es/database.html)


*Interface Design References:*\
Coordinated view, similar to visuals of:
+ [FAOSTAT website](http://www.fao.org/faostat/en/#data/QC/visualize)
+ [World migration map](http://migrationsmap.net/#/USA/arrivals)

*Potential URLs:*
+ fooddroughtnexus.com
+ cerealmigrations.com

*********
*********
*********

# INTERFACE SKETCH #
![Interface Sketch](Interface Sketch/webdesign.PNG "Interface Sketch")

Our food-drought-nexus website will feature a landing page with Navbar, photo/video, and map.  Links from the Navbar to other pages will emphasize certain aspects of the global cereals trade through interactive geovisual charts, graphs, and maps.  Finally, an About page will detail the project motivations, implications, dataset descriptions/credits, class description, and information about the page creators.

********
********
********

# DESIGN SCHEME #

### FONT
+ Avenir Rounded /Nunito, Sans-serif

### COLORS
![Color Scheme](img/colors.png "Color Scheme")
+ [Color Link](https://coolors.co/fbf9cf-f7ebb2-f3d885-ffcd5c-cc8740)

### ICONS
+ Seedling: `<i class="fas fa-seedling"></i>`
+ Pagelines: `i class="fab fa-pagelines"></i>`
+ Globe: `<i class="fas fa-globe"></i>`
+ Trade arrow: `<i class="far fa-arrow-alt-circle-right"></i>`
+ Charts: `<i class="fas fa-chart-bar"></i>`
+ Map pin: `<i class="fas fa-map-pin"></i>`
+ Truck: `<i class="fas fa-truck"></i>`
+ Information: `<i class="fas fa-info-circle"></i>`
+ Site map: `<i class="fas fa-sitemap"></i>`
+ $: `<i class="fas fa-dollar-sign"></i>`
+ Database: `<i class="fas fa-database"></i>`


### MULTIMEDIA
![Landing Page Video](img/farmvidpic.png "Landing Page Video")
+ [Link to Video on Pexels Video](https://videos.pexels.com/videos/video-footage-of-a-farm-857072)
