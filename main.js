function initMap(){
    // Map options
    let options = {
        zoom: 13,
        center: {lat: 29.951065, lng: -90.071533}
    }
    // New map
    const map = new google.maps.Map(document.getElementById('map'), options)

    /* <-- Static Marker -->
    // Add Marker
    let marker = new google.maps.Marker({
        position: {lat: 29.951065, lng: -90.071533},
        map: map,
        // icon: add custom icon here
    })

    // Creates an information window for map marker
    let infoWindow = new google.maps.infoWindow({
        content:'<h1>New Orleans, LA</h1>'
    })


    // Function that sets the above info window for specified marker
    marker.addListener('click', function (){
        infoWindow.open(map, marker)
    }) 
    */

    addMarker({
        coords:{lat: 29.951065, lng: -90.071533},
        iconImage: 0,// add custom icon here 
        content: none
    })

    // Add Marker Function
    function addMarker(coords){
        let marker = new google.maps.Marker({
        position: props.coords,
        map: map,
        // icon: props.iconImage (idea: add flags so that proprieters can denote the nationalities of their popup's cuisine)
    })

    // Check for custom icon
    if(props.iconImage){
        //set icon image
        marker.setIcon(props.iconImage)
    }

    // Check content
    if(props.content){
        let infoWindow = new google.maps.infoWindow({
        content: props.content
    })

    marker.addListener('click', function (){
        infoWindow.open(map, marker)
    })
    }
    }
}