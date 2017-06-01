var SCENES = [
				{
				name:'CorridorView',
				pano:'#corridor_view',
				hotspots: [
						{
							id:'personFour',
							connected: 'personFour',
							position: "0.467 -2.558 -13.297",
							rotation: "0 -25.210 0",
						},{
							id:'personOne',
							connected: 'personOne',/*Guy One*/
							position: "-11.5 -0.008 -8.325",
							rotation: "0 64.74 0"
						},{
							id:'personThree',
							connected : 'personThree',/*Guy Three*/
							position: "-3.830 0.024 -13.297",
							rotation : "0 0 0"
						},{
							id:'personTwo',/*Guy Two*/
							connected: 'personTwo',
							position: "-9.582 0.077 -12.669",
							rotation : "0 30.100 0"
						}
					]
				}/*,
				{
					name:'personOne',
					box:'#person_one',

				},{
					name: 'personTwo',
					box:'#person_two',
				},
				{
					name: 'personThree',
					box: '#person_three',
				},
				{
					name: 'personFour',
					box: '#person_four',
				}*/
				// {}
			]

var renderHotspot = function(hotspot){
	var entity = document.createElement('a-entity');
	entity.setAttribute('template','src: #link');
	entity.setAttribute('data-thumb','#hotspot')
	entity.setAttribute('data-src',hotspot.connected);
	entity.setAttribute('position',hotspot.position);
	entity.setAttribute('rotation',hotspot.rotation);
	entity.setAttribute('class','hotspotClass');
	document.querySelector('a-scene').append(entity);

}


var loadScene = function(sceneName,loadedFrom){

	SCENES.map(function(scene){
		if(scene.name===sceneName){
			document.querySelector('a-sky').setAttribute('color','');
			document.querySelector('a-sky').setAttribute('src',scene.pano);
			scene.hotspots.forEach(function(hotspot){
				renderHotspot(hotspot);
			})
		}
	})
}

function startExp(){
	document.querySelector('#startScreen').emit('start');
	document.querySelector('#startScreen').setAttribute('visible',false);
	document.querySelector('#startScreen2').setAttribute('visible',false);
	document.querySelectorAll('.experienceScreen').forEach(function(value){
		value.setAttribute('visible',true);
	});
	loadScene('CorridorView');
}

var closeExp = function(){
	removeHotspots();
	document.querySelector('#startScreen').setAttribute('visible',true);
	document.querySelector('#startScreen2').setAttribute('visible',true);
	document.querySelector('#ScapicAbout').setAttribute('visible',false);
	document.querySelector('#MachaniAbout').setAttribute('visible',false);
	document.querySelector('a-sky').setAttribute('color','');
	document.querySelector('a-sky').setAttribute('src','#start');
	document.querySelectorAll('.experienceScreen').forEach(function(value){
		value.setAttribute('visible',false);
	});
}

$(document).ready(function(){
		startExp();
	document.querySelector('.homeMachani').addEventListener('click',closeExp);
	document.querySelector('.homeScapic').addEventListener('click',closeExp);
	document.querySelector('.home').addEventListener('click',closeExp);
	// document.querySelector('')
	var noSleep = new NoSleep();
	function enableNoSleep() {
	  noSleep.enable();
	  document.querySelector('#welcomeScapic').play();
	  document.querySelector('#welcomeScapic').pause();
	  console.log('nosleeping');
	  document.querySelector('.a-enter-vr-button').addEventListener('click', enableNoSleep, false);
	}
	document.querySelector('.a-enter-vr-button').addEventListener('click', enableNoSleep, false);
});
