
/*
  Willow Studios Inc.
  developer: Tanvir Haider 
  contact info:  contact@willow.studio
  Happy to help with any development and Animation
  --------------------------------------------------------------------------------------------



                                        contact@willow.studio                                       
                                       HappyToDevelopAnything:)                                     
                                     webGL./. | .|  |- |+ ..SVG|                                    
                                    .CSS  +. .+  |  |  |:    htm|                                   
                                    :21|  |. .|  |  |  |:     747                                   
                                    :MM.  |. .|  |  |  |: .|  NM|                                   
                             .......|MM.  |. .|  |  |  |: .|  NMy.......                            
                          .|aftereffects  |. .|  |  |  |:  |  CanvasAnima||                         
                        .|CREATOR|::|::|. |. .|  |  |  |;  |  |  .||S|:GREAT.                       
                        |MN: .  || .|  0. |. .|  |  |  |#  |  |. |: .|   .dMd                       
                        NM|  0. :|  |  |  |. .|  |  |  |C  |  |  /| .|    :MM|                      
                       .MM|  |  :|  |  |  |. .|  |  |  |+  |  |  /| .|  : .MM/                      
                       .MM|  |  :|  |  |  |. .|  |  |  |+  |  |  /| .|  y..MM/                      
              ../||||||yMM/  |  :|  |  | .|. .|  |  |  |:  |  |  /| .|  | .MMh||||||+|.             
            .+646.824.6777.  |  :|  |  | ||. .|  |  |  |:  +  |  /| .|  | .yyyyhyyhdNMN|.           
           .dMm/|  |. |. .|  |  :|  |  | .|      |  |  |:     |  /| .|  |  || :+ .:  :hMN|          
           |MN. |. |. |.  |  |  :|  |  |  .      |  :  |:     |  /- .|  |  +. .| .y  /.hMd          
           dMh  |  |. |.  |  |  ..  |  |         .     .-     -  /-  |  |  +. .|  |  | +MM          
           dMh  |  |. |.  |  |   .ydmddmddh|+.          .+|jQuery+++ .  |  +. .|  |  | +MM.         
           dMh  |  |. |.  |  |   .||d||d||ymMMh.      NODEJS|||||||+    |  +. .|  |  | +MM.         
           hM|  .  |. ..  |  |      |  |    -dMN-    /MMy.              |  +. .|  |    /MN          
            .      |.     |  .      |  |     .mMm   .NMh                |  +. .|  |.    ..          
                   .      |         :  |      for.  :MM/                |     .|  .                 
                          |            |      {i}.  :MM/                |     .|                    
                          |            |      oMM.  :MM/                .     .|                    
                          .            .  +y/ oMM.  :MM/                                        
                                          ymy oMM.  :MM/                                            
                           -o-   /o-   /+.:s: oMM.  :MM+   .+/   .+/   .+-                          
                           :Nd  :NNd. -Nm.hNy oMM.  :MM+   .dN: .dNN/  hN/                          
                            yN+ dmoNo hN/ hNy oMM.  :MM+    :Nh +Nsmd./Nh                           
                            \mmoNo dm+Ny  hNy sMM.  :MM+.oyo.sN+md.+Nodm/                           
                             /NNd. :NNm.  hNy sMM.  :MM//MMM+.dNN/ .dNN+                            
                              \+.   .+/   -+- -o/   .++..:+/. \+/   .+/ 


----------------------------------------------------------------------------------------------

*/


// @codekit-prepend "_Sizmek.js"

// document.getElementById("myBtn").addEventListener("click", displayDate);

function init () {
    console.log("start the ad");

    // desktop-logo

    var Dlogo = document.querySelector("#desktop-logo");
    Dlogo.addEventListener("click", heroClicked);

    var hero = document.querySelector(".hero");
    hero.addEventListener("click", heroClicked);

    function heroClicked (event) {
        console.log("logo clicked");
        window.EB.clickthrough();
    }

}


function sizeContentArea(data) {
    var adWrapper = document.getElementById("willow-ad-stage");
	try { winW = document.body.ownerDocument.defaultView.frameElement.parentElement.parentElement.parentElement.offsetWidth; } 
	catch (Error) {
		if (data && typeof data.sfGeomObj !== "undefined") { winW = data.sfGeomObj.win.w; }
		else { winW = window.innerWidth; }
	}

	if (data && typeof data.sfGeomObj !== "undefined") { winH = data.sfGeomObj.win.h; }
	else { winH = Math.round(winW * 1.6); }

    if (winW < 705) {
        console.log("mobile fxl code applied");
        adWrapper.style.width = winW + "px";
        adWrapper.style.height = winH + "px";
    }
    // else {
    //     winH = 824;
    //     winW = 414;
    // }


    init();
}