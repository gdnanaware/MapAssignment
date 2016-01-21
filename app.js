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
        $scope.mapMarker = new google.maps.Marker({position: $scope.latlng, map: $scope.map});
        
       
    })();

  //---------------------------------OnClick search-----------------------------------------------------------------------------------   
      
    google.maps.event.addListener($scope.map, 'click', function(event) {
  
         $scope.lat= event.latLng.lat();
         $scope.lng= event.latLng.lng();
         $scope.latlng = event.latLng; 
         geocodeLatLng($scope.geocoder,$scope.map,$scope.infowindow);
        
       
       
});
    
   
    function geocodeLatLng(geocoder, map, infowindow) {
  
       
        geocoder.geocode({'location': $scope.latlng}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
               
               
                 if ( $scope.mapMarker != null) {
                     $scope.mapMarker.setMap(null);
                 }
                 drawMarker($scope.latlng);
                
                 infowindow.setContent(results[1].formatted_address);
                 infowindow.open(map, $scope.mapMarker);
                 $scope.name = results[1].formatted_address;
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
                 var markpos = results[0].geometry.location;
                 
                                  
                 if ( $scope.mapMarker != null) {
                     $scope.mapMarker.setMap(null);
                 }
                 drawMarker(markpos);
             
             } 
        });
    
    }
 
    
 //---------------------------------Draw Marker-----------------------------------------------------------------------------------    
    
    function drawMarker(pos){
               
         $scope.mapMarker = new google.maps.Marker({position: pos, map: $scope.map});
        
    }
    
    
    
});