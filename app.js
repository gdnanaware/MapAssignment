var app = angular.module('MyApp',[]);

app.controller('MyController',function($scope){
    $scope.name = "";
    $scope.onEditChange = "";

       
    (function initialize() {
        var mapProp = {
        center:new google.maps.LatLng(18.50,74.16),
        zoom:8
        };
        $scope.map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
        $scope.geocoder = new google.maps.Geocoder;
        $scope.infowindow = new google.maps.InfoWindow;
        
       
    })();

  //---------------------------------OnClick search-----------------------------------------------------------------------------------   
      
    google.maps.event.addListener($scope.map, 'click', function(event) {
  
         $scope.lat= event.latLng.lat();
         $scope.lng= event.latLng.lng();
         $scope.latlng = event.latLng; 
        $scope.mapMarker = new google.maps.Marker({ position:  $scope.latlng, map: $scope.map});
       geocodeLatLng($scope.geocoder,$scope.map,$scope.infowindow);
        
       
       
});
    
   
    function geocodeLatLng(geocoder, map, infowindow) {
  
       
        geocoder.geocode({'location': $scope.latlng}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                $scope.mapMarker.position =  $scope.latlng;
                $scope.mapMarker.map = map;
            /*var marker = new google.maps.Marker({
              position: $scope.latlng,
              map: map
            });*/

            infowindow.setContent(results[1].formatted_address);
               
              $scope.name = results[1].formatted_address;
                $scope.temp = "abc";
                
            console.log($scope.name);
                
            infowindow.open(map, $scope.mapMarker);
            $scope.$digest();
            }
            } 
            
            
        });
    }
    
    
 //---------------------------------Address search-----------------------------------------------------------------------------------
     
    $scope.onEditChange = function () {
         geocodeAddress($scope.map,$scope.geocoder);
    };
       
    function geocodeAddress(map,geocoder) {
         var address = $scope.name;
         geocoder.geocode({'address': address}, function(results, status) {
             if (status === google.maps.GeocoderStatus.OK) {
                 map.setCenter(results[0].geometry.location);
                 
                 var marker = new google.maps.Marker({
                     map: map,
                     position: results[0].geometry.location
                 });
             } 
        });
    
}
});