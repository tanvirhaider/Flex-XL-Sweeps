


var creativeId = "HTMLResponsiveRichMediaBanner";
var creativeVersion = "1.1.0";
var lastModified = "2018-01-10";
var lastUploaded = "2018-01-10";
var templateVersion = "1.0.01";
var scrollPos = {x:undefined, y:undefined};
var adId, rnd, uid, versionID;
var listenerQueue;
var creativeIFrameId;
var USE_RESIZE_LISTENER = false;
var isMobile = (/Mobi/i).test(navigator.userAgent);
var isIOS = (/iPhone|iPad|iPod/i).test(navigator.userAgent);
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

/*---------------------------*/
/*-----> SIZMEK CODES  <-----*/
/*---------------------------*/

function initializeLocalPreview() {
    var ua = navigator.userAgent;
    window.EB = {
        _adConfig: {
            adId: 0,
            rnd: 0,
            uid: 0,
            customJSVars: {}
        },
        clickthrough: function(){console.log("EB.clickthrough: ", arguments);},
        userActionCounter: function(){console.log("EB.userActionCounter: ", arguments);},
        _sendMessage: function () {return;},
        API: {
            browser: {
                webkit: ua.match(/webkit/i) !== null,
                firefox: ua.match(/firefox/i) !== null
            },
            os: {
                ios: ua.match(/ipod|iphone|ipad/i) !== null,
                android: ua.match(/android/i) !== null,
                windowphone: ua.match(/windows phone/i) !== null,
                mobile: ua.match(/ipod|iphone|ipad|android|windows phone/i) !== null
            },
            setStyle: function (obj, styles) {
                for(var style in styles) {
                    if(!styles.hasOwnProperty(style)) continue;
                    obj.style[style] = styles[style];
                }
            },
            getCustomVar: function (name) {return window.EB._adConfig.customJSVars[name];}
        },
        Comm: {
            setName: function (name) {return name;},
            isConnected: function (name) { return false; }
        },
        getSDKData: function () { return false; },
        expand: function () { return false; },
        collapse: function () { return false; }
    };
    window.EBG = {
        px: function (n) {
            if(n.toString().match(/^\d$|^\d+$/) !== null) {
                return n + "px";
            }
            return n;
        }
    };
}


function addCustomScriptEventListener(eventName, callback, interAd) {
    listenerQueue = listenerQueue || {};
    var data = {
        uid             : uid,
        listenerId      : Math.ceil(Math.random() * 1000000000),
        eventName       : eventName,
        interAd         : !!(interAd),
        creativeIFrameId: creativeIFrameId
    };
    window.EB._sendMessage("addCustomScriptEventListener", data);
    data.callback = callback;
    listenerQueue[data.listenerId] = data;
    return data.listenerId;
}

function dispatchCustomScriptEvent(eventName, params) {
    params                  = params || {};
    params.uid              = uid;
    params.eventName        = eventName;
    params.creativeIFrameId = creativeIFrameId;
    window.EB._sendMessage("dispatchCustomScriptEvent", params);
}

function removeCustomScriptEventListener(listenerId) {
    var params = {uid : uid,listenerId:listenerId,creativeIFrameId: creativeIFrameId};
    window.EB._sendMessage("removeCustomScriptEventListener", params);
    if (listenerQueue[listenerId]) delete listenerQueue[listenerId];
}


function eventManager(event) {
	var msg = JSON.parse(event.data);
	if(msg.type && msg.data && (!uid || (msg.data.uid && msg.data.uid == uid))) {
		switch (msg.type) {
			case "sendCreativeId":
				creativeIFrameId = msg.data.creativeIFrameId;
				addCustomScriptEventListener('pageScroll', onPageScroll);
			   // addCustomScriptEventListener('creativeResize', sizeContentArea);
				addCustomScriptEventListener('debugLog', function(e){
					var log = e.text;
					console.log(log);

					if(!document.getElementById("debugWindow")){
						var dw = document.createElement("div");
                        dw.id = "debugWindow";
						dw.setAttribute("state", "collapsed");
						dw.style.width = "60px";
						dw.style.height = "60px";
						dw.style.position = "absolute";
						dw.style.top = "0%";
						dw.style.left = "0%";
						dw.style.zIndex = "9999999";
						dw.style.backgroundColor = "#eee";
						dw.style.color = "black";
						dw.style.overflow = "scroll";


						document.getElementsByTagName("body")[0].appendChild(dw);

						dw.addEventListener("click", function(e){
							if(dw.getAttribute("state") === "collapsed"){
								dw.style.width = "100%";
								dw.style.height = "100%";
								dw.setAttribute("state", "expanded");
							}else{
								dw.style.width = "60px";
								dw.style.height = "60px";
								dw.setAttribute("state", "collapsed");
							}
						}, false);
					}

					document.getElementById("debugWindow").innerHTML += "<br>";
					document.getElementById("debugWindow").innerHTML += log;
					document.getElementById("debugWindow").innerHTML += "<br>";
				}); //sdf

				window.EB._sendMessage("dispatchScrollPos",{uid:uid});
				if(creativeContainerReady) creativeContainerReady();
			break;
			case "eventCallback": // Handle Callback
				var list 	= msg.data.listenerIds;
				var length  = list.length;
				for (var i = 0; i < length; i++){
					try {
						var t = listenerQueue[list[i]];
						if (!t) continue;
						t.callback(msg.data);
					} catch (Error){}
				}
			break;
		}
	}
}


function setCreativeVersion() {EB._sendMessage("setCreativeVersion", {creativeId: creativeId, creativeVersion: creativeVersion, creativeLastModified: lastModified, uid: uid});}

function onPageScroll(event) {
    // use scrollPos anywhere to know the current x/y coordinates.
    scrollPos.x = event.scrollXPercent;
    scrollPos.y = event.scrollYPercent;

   // console.log("scroll position Y: " + scrollPos.y);
}


function initializeGlobalVariables() {
    try { adId          = window.EB._adConfig.adId;} catch (Error) {}
    try { rnd           = window.EB._adConfig.rnd;} catch (Error) {}
    try { uid           = window.EB._adConfig.uid;} catch (Error) {}
    try { versionID     = window.EB._adConfig.massVersioning.adVersions.split("_")[0]; } catch (Error) {versionID = "";}
}

/*-----> TRACKING <-----*/
function fireNounTracking(interaction, noun){
    // MDX 2.0 and MDX NXT use different noun tracking URLs
    // The below will auto detect which platform the unit is running and set the appropriate base URL
    var isNXT = (adId.toString().length >= 10);
    var baseURL = (isNXT)?"https://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=19&mc=imp&pli=16478984&PluID=0&ord=%time%&rtu=-1&pcp=$$adID=" 
    + adId 
    + "|vId=" 
    + versionID 
    + "|interactionName=" : "https://bs.serving-sys.com/Serving/adServer.bs?cn=display&c=19&pli=1073952795&adid=1073972634&ord=[timestamp]&rtu=-1&pcp=$$adID=" 
    + adId 
    + "|vID=" 
    + versionID 
    + "|interactionName=";

    var pixel = new Image();
    pixel.src = baseURL + interaction + "|noun=" + noun + "$$";

    try{ if(localPreview === true){ console.log(baseURL + interaction + "|noun=" + noun + "$$");} } catch(Error){}
}




/*----------------------------*/
/*-----> INITIALIZATION <-----*/
/*----------------------------*/



function checkIfAdKitReady(event) {
    if (!window.adkit) {
        if (window.localPreview) {console.log("this is not a sizmek ad");}
        init(window);
    }
    else {
        //console.log("adkit: ",adkit);
        
       // if (window.localPreview) {console.log("this is a sizmek ad");}
        try{
            if (window.localPreview) {
                console.group("ad-debug");
                console.log("---- PREVIEW MODE ----");
                    adkit.onReady(function(){
                        window.initializeLocalPreview();
                        USE_RESIZE_LISTENER = true;
                        initializeCreative();
                });
                return;
            }
        }catch(e){}
    
        adkit.onReady(initializeCreative);
    }
}


function initializeCreative() {
    initializeGlobalVariables();
    setCreativeVersion();
    init(window);
}

window.addEventListener("message",function(){try{eventManager.apply(this, arguments);}catch(e){}},false);
window.addEventListener("load", function(event) {checkIfAdKitReady();});
    
