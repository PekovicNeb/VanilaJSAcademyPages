//
//Variables
//
var APIurl = 'https://vanillajsacademy.com/api/places.json';
var favesID = 'exploreFaves';
var visitedID = 'visitedPlaces';
var mainFilter = 'all';

//
//Methods
var getNoPlacesHTML = function(){
    return '<div>Unable to find any places right now. Please try again. Sorry.</div>';
}

var getPlacesHTML = function(props){
    var html = '<div class="row">';
    props.places.map(function (place) {
        // check if local Storage key exists and read the value
      //  var ariaFavePressedValue = !UIPlaces.data.faves[place.place] ? false : UIPlaces.data.faves[place.place];
        var ariaFavePressedValue = isFaves(place.place);
        var ariaVisitPressedValue = isVisits(place.place);

        if (mainFilter == 'all'){
            showPlace = true;
        } else if(mainFilter == 'faves' ){
            showPlace = !props.faves[place.place] ? false : props.faves[place.place];
        } else if(mainFilter == 'visited' ){
            showPlace = !props.visits[place.place] ? false : props.visits[place.place];
        } else if(mainFilter == 'not-visited'){
            showPlace = !props.visits[place.place] ? true : false ;
        };
        if (showPlace) {
        html+='<div class = "grid" ><p><a href="' + place.url + '">'+ place.place + '</a></p>';
        html+='<img src="' + place.img + '"/>';
        html+='<p>' + place.description + '</p>';  
        html+='<p><button id="' + place.place + '" class="fave" aria-label="Save ' +place.place+'" aria-pressed="'+ ariaFavePressedValue+'">❤</button>'
        html+='<button data-visited="' + place.place + '" class="visited" aria-label="Visited ' + place.place +'" aria-pressed="'+ ariaVisitPressedValue+ '">✓</button></p></div>'
        }
    }).join('') + '</div>';
    return html;
}        

// my Reef component
var UIPlaces = new Reef('#app',{
    // data
        data: {},
    // template
        template : function (props){
            // Do good practice checks
            if(props.places && props.places.length){
                return getPlacesHTML(props);
            }
                // Otherwise return an error
                return getNoPlacesHTML();
        }
    });

var getFaves = function () {
    var faves = localStorage.getItem(favesID);
    var favesObj = !faves ? {} : JSON.parse(faves);
    return favesObj;
};

var isFaves = function (place) {
    var fave = UIPlaces.data.faves[place];
    return !fave ? false : fave;
};
var isVisits = function (place) {
    var visit = UIPlaces.data.visits[place]
    return !visit ? false : visit;;
};

var getVisits = function (place) {
    var visits = localStorage.getItem(visitedID);
    var visitsObj = !visits ? {} : JSON.parse(visits);
    return visitsObj;
};
// Fetch data from the API
var getAPIPlaces = function(){
    fetch(APIurl).then(function (response) {
        if (response.ok) {
			return response.json();
		}
		return Promise.reject(response);
    }).then(function (data) {
        // console.log(data);
        UIPlaces.data.places = data;
        UIPlaces.data.faves = getFaves();
        UIPlaces.data.visits = getVisits();
    }).catch(function(err){
        console.warn(err);
        UIPlaces.data.places= null;
        UIPlaces.data.faves = null;
        UIPlaces.data.vistits = null;
    });
}  
var setFavourite = function(target){
    if(!target.closest('.fave')) return;
    //save data object
    UIPlaces.data.faves[target.id] = !UIPlaces.data.faves[target.id] ? true : false;
    //save data as localStorage variable
    localStorage.setItem(favesID, JSON.stringify(UIPlaces.data.faves));
}

var setVisited = function(target){
    if(!target.closest('.visited')) return;
    //save data object
    var visited = target.getAttribute("data-visited");    
    UIPlaces.data.visits[visited] = !UIPlaces.data.visits[visited] ? true : false;
    //save data as localStorage variable
    localStorage.setItem(visitedID, JSON.stringify(UIPlaces.data.visits));
}

var filterPlaces = function(target){
    if(!target.closest('.filters')) return;
    mainFilter = target.value;
    UIPlaces.data.faves = getFaves();
    UIPlaces.data.visits = getVisits();
}

var clickHandler = function(event){
    setFavourite(event.target);
    setVisited(event.target);
    filterPlaces(event.target);
}

//
// Inits
//
getAPIPlaces();

//
//Event Listeners
//
document.addEventListener('click', clickHandler);