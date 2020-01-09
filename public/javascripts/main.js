

// Common Setting
var _pts = "(c) 2015, Pilot Training System, LLC."
var sub   = " Contact US"
var image="/images/libraryIconwhite.png"
var imageout="/images/libraryIcon.png"
// General 
  w = screen.width;
  h = screen.height;
  x = Math.floor(w/4); 
  y = Math.floor(h/9);
// Common Setting 

// CSS Style Setting

var _ftf = "font-family:Verdana,Arial"; //Set Font Style
 

// Color Setting

var _bgclr = "#E8E8E8"   // background color
var _bartb = "#0B2161"   // top and bottom bar
var _txclr = "#FFD700"  // text color


var xss = new Array()
 xss[0] = new Array( ".T1"      , "font-size:21pt; font-style:normal; font-weight:bold; Color:#120087; Padding-left:10px") // Main_Title_Big
 xss[1] = new Array( ".T2"      , "font-size:10pt; font-style:normal; font-weight:bold; Color:Black" )  // Sub_Title_Small
 xss[2] = new Array( ".D"       , "font-size:11pt; font-weight:bold ; Color:Black" )  // Description
 xss[3] = new Array( "body"        , "margin-left: 0px;font-size: 11px;color:black; text-align: center; " )
 xss[4] = new Array( "td"          , "font-size:10pt; color:black; padding:4px" )
 xss[5] = new Array(".center_block", "width: 100%; overflow:hidden;")
 xss[6] = new Array(".center_block_news", "width: 100%; overflow:hidden;")
 xss[7] = new Array(".copyright"   , "width: 100%;font-size:12pt; opacity: 0.8; background:#021c42;" )
 //xss[8] = new Array(".toolbar"     , "width:100%; margin: 0px; font-size: 10px; overflow:hidden;" )
 //xss[9] = new Array(".center_block .toolbar", "width:95%; margin:0px; overflow:hidden;" )
 xss[8] = new Array(".center_block_news .toolbar", "width:95%; margin:0 auto; overflow:hidden;" )
// xss[10] = new Array(".stationary", "opacity:0.6; background:#000000; position:fixed; top:0;")
// DOCUMENTS

var aw  = 800;                    // Image Size (Width) of AirCraft, 
var ah  = 650;                    // Image Size (Height) of AirCraft
var at  = (h - ah)/2 ;            // Screen.Location of Docs: Top    
var al  = (w - aw)/2 ;            // Screen.Location of Docs: Left->Center 


var ds = new Array ()
 ds[0] = new Array ( "aircraft"        ,   555 ,   40,  "aircraft_info"    );
 ds[1] = new Array ( "airspace"        ,   640 ,  180,  "airspace_info"    );  
 ds[2] = new Array ( "weather"         ,   720 ,  320,  "weather_info"    );  
         
//ds[] = new Array(  [i][0]           , [i][1] ,[i][2],  [i][3],             );
//ds[] = new Array(  "Name"           , o.left , o.top,   file_name,             );


function toggleSidebar(){
    document.getElementById("sidebar").classList.toggle('active');
}

// $(document).ready(function () {

//     $('#sidebarCollapse').on('click', function () {
//         $('#sidebar').toggleClass('active');
//     });

// });

function index_css () 
{
  with (document) {
    writeln(' <meta http-equiv="Content-Language" content="en" />');
    writeln(' <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />');
    
    //bootstrap jQuery
    // writeln("<script type='text/javascript' src='https://code.jquery.com/jquery-1.11.3.js'></script>");
    writeln("<script type='text/javascript' src='https://code.jquery.com/ui/1.11.4/jquery-ui.js' integrity='sha256-DI6NdAhhFRnO2k51mumYeDShet3I8AKCQf/tf7ARNhI=' crossorigin='anonymous'> </script>");
    //bootstrap custom scripts
    writeln("<script type='text/javascript' src='/javascripts/navigatorCustom.js'></script>");
    //bootstrap styling
    // writeln("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'>");
    //custom styling
    writeln(' <link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/style.css">');
    writeln(' <link rel="shortcut icon"  href="Images/favicon.ico">');  
    writeln(' <title>' + _titleStr + '</title>'); 
    writeln(' <style type="text/css">');    
    // writeln(' a:link    {text-decoration: none; font-family:Verdana}' );    
    // writeln(' a:visited {text-decoration: none; font-family:Verdana}' );    
    // writeln(' a:hover   {text-decoration: none; font-family:Verdana;}' );
    writeln(' #dback    {     left: 275; position:absolute; width:'+aw+'px; height:'+ah+'px; z-index:2; text-align: center;  } ');
    writeln(' #img      { width:'+aw+'px; height:'+ah+'px;}' );     
    writeln(' #bg       { width:'+(aw+20)+'px; height:'+(ah+20)+'px;}' );  
    var ds_pst   =" position: absolute; " ;
    var ds_close =" z-index:1; outline: none; border:0px; display:block;  " ;
    for (i=0; i<=(ds.length-1); i++) {
            writeln('.'+ds[i][3]+'            {'+ds_pst+' left: '+ds[i][1]+
            'px; top:'+ds[i][2]+'px; background: url(Images/'+ds[i][3]+'.png) no-repeat;  '+ds_close+'} '); 
            writeln('.'+ds[i][3]+':hover      {'+ds_pst+' left: '+ds[i][1]+
            'px; top:'+ds[i][2]+'px; background: url(Images/'+ds[i][3]+'3.png) no-repeat; '+ds_close+'} ');             
    }
    for (i=0; i<=(xss.length-1); i++) {
        writeln(' '+xss[i][0]+'            {'+_ftf+';'+xss[i][1]+'}  '); 
    }
    writeln(' </style> ');
    //custom styling for bootstrap
    writeln("<link rel='stylesheet' href='/stylesheets/navigatorCustom.css'>");
    
    //scripts
    writeln('<script>');
    writeln('  (function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){');
    writeln('  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),');
    writeln('  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)');
    writeln('  })(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');');
    writeln('  ga(\'create\', \'UA-43954716-1\', \'pilottrainingsystem.com\');');
    writeln('  ga(\'send\', \'pageview\');');
    writeln('</script>');
    // writeln("<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js'></script>");
    writeln("<script src='/jquery/jquery-migrate-1.2.1.js'></script>"); // backward compatibility with some features on the website.

    }
    
}
 

function index_head ()
{
    
    with (document) {   
        writeln ('<br><br><br><br><br><br>');
        // //writeln ('<body link=none aLink=none vLink=none">');
        // writeln ('<base target ="_self">');
        // writeln ('<div class="center_block" id = "center_block"> ');
        // writeln ('<div class="toolbar" > ');
        
        // var centerBlockHtml =   '<div class = "selectedhome">';
        // centerBlockHtml     +=      '<ul style="width:20%; list-style:none; margin-top:1.5em; margin-left:10%; float:left;">';
        // // centerBlockHtml     +=          '<li class = "logo">';
        // // centerBlockHtml     +=                  '<a href="/index.php"><img src="/Images/PTSlogomod.png" width="100%"></a>';
        // // centerBlockHtml     +=          '</li>';
        // //centerBlockHtml   +=          '<li>';
        // //centerBlockHtml   +=              '<a href = "https://www.facebook.com/pages/Pilot-Training-System/517405968285851" target = "_blank">';
        // //centerBlockHtml   +=                  '<img  src = "/Images/fb-button.png" height = "10%" width = "10%" style="margin-right: 2em;" alt = "Facebook button"/>';
        // //centerBlockHtml   +=              '</a>';
        // //centerBlockHtml   +=              '<a href = "http://www.twitter.com/myPilotTraining" target = "_blank">';
        // //centerBlockHtml   +=                  '<img  src = "/Images/twitter-button.png" height = "10%" width = "10%" alt = "Twitter button" />';
        // //centerBlockHtml   +=              '</a>';
        // //centerBlockHtml   +=          '</li>';
        // centerBlockHtml     +=      '</ul>';
        // centerBlockHtml     +=  '</div>';

        
        // writeln(centerBlockHtml);
        
        // /*if(selectedButton == "home"){
        //     writeln('<div class = "selectedhome"><a href="/index.php"><img src="/Images/PTSlogomod.png" width="100%"></a></div>');
        // }
        // else{
        //     writeln('<div class = "selectedhome"><a href="/index.php"><img src="/Images/PTSlogomod.png" width="100%"></a></div>');
        // }*/
        
        // //shu 10/26/2015: replace buttons with header
        // if(selectedButton == "home")
        // writeln('<div class = "selectedhome"><a href="/index.php"><img src="/Images/PTSlogomod.png" width="100%"></a></div>');
        // else
        // writeln('<div class = "selectedhome"><a href="/index.php"><img src="/Images/PTSlogomod.png" width="100%"></a></div>');

        // if(selectedButton == "store")
        // writeln('<div class = "selected"><a href="/Store/index.php" title="Pilot Store"><img src="/Images/shopIconwhite.png"></a></div>');
        // else
        // writeln('<div class = "selected"><a href="/Store/index.php" title="Pilot Store"><img onmouseover="src=\'/Images/shopIconwhite.png \'" onmouseout="src=\' /Images/shopIcon.png \'" src="/Images/shopIcon.png"></a></div>');


        // if(selectedButton == "forums")
        // writeln('<div class = "selected"><a href="/newsAndForums.php" title="News & Forums"><img src="/Images/socialIconwhite.png"></a></div>');
        // else
        // writeln('<div class = "selected"><a href="/newsAndForums.php" title="News & Forums"><img onmouseover="src=\'/Images/socialIconwhite.png \'" onmouseout="src=\' /Images/socialIcon.png \'" src="/Images/socialIcon.png"></a></div>');


        // if(selectedButton == "library")
        // writeln('<div class = "selected"><a href="/Library/index.php" title="Training Library"><img src="/Images/libraryIconwhite.png"></a></div>');
        // else
        // writeln('<div class = "selected"><a href="/Library/index.php" title="Training Library"><img onmouseover="src=\'/Images/libraryIconwhite.png \'" onmouseout="src=\' /Images/libraryIcon.png \'" src="/Images/libraryIcon.png"></a></div>');


        // if(selectedButton == "plan")
        // writeln('<div class = "selected"><a href="/flightPlan.php" title="Flight Plan"><img src="/Images/flightIconwhite.png"></a></div>');
        // else
        // writeln('<div class = "selected"><a href = "/flightPlan.php" title="Flight Plan"><img onmouseover="src=\'/Images/flightIconwhite.png \'" onmouseout="src=\' /Images/flightIcon.png \'" src="/Images/flightIcon.png"></a></div>');
        

        // /*if(selectedButton == "news")
        // writeln('<span class = "selected"><a href="/news.php"> &nbsp;&nbsp;&nbsp; News &nbsp;&nbsp;&nbsp;  </a></span>');
        // else
        // writeln('<a href="/news.php"> &nbsp;&nbsp;&nbsp; News &nbsp;&nbsp;&nbsp;  </a>');
        // */


        // /*
        // if(selectedButton == "about")
        // writeln('<span class = "selected"><a href="/index.php"><img src="/images/libraryIconwhite.png"></a></span>');
        // else
        // writeln('<a href="/index.php"><img src="/images/libraryIcon.png"></a>');
        
        
        // if(selectedButton == "contact")
        // writeln('<span class = "selected"><a href="/contactUs.php"> &nbsp;&nbsp;&nbsp; Contact Us &nbsp;&nbsp;&nbsp;  </a></span>');
        // else
        // writeln('<a href="/contactUs.php"> &nbsp;&nbsp;&nbsp; Contact Us &nbsp;&nbsp;&nbsp;  </a>');
        // */
        // /*
        // if(selectedButton == "sitemap")
        // writeln('<span class = "selected"><a href="/sitemap.php"> &nbsp;&nbsp;&nbsp; Site Map &nbsp;&nbsp;&nbsp;  </a></span>');
        // else
        // writeln('<a href="/sitemap.php"> &nbsp;&nbsp;&nbsp; Site Map &nbsp;&nbsp;&nbsp;  </a>');
        // */
        
        // writeln ('</div>');
        // writeln ('</div>');
        /*
        writeln('<table  align = "center"><tr ><td>');
        writeln('<a href = "/index.php"><img src ="/Images/pts_logo.jpg" alt = "logo" height='+y+' class ="logo" > </a>');
        writeln('</td></tr></table>');
        */
    }
}

function index_head_news ()
{

    //var selectedButton passed in from caller
    // one of plan, library, store, news, forums, about, home, contact
    //var selectedButton = "contact";

    
    if (typeof(selectedButton) == "undefined" || selectedButton == null) {
      selectedButton = "";
    }   
    
    //shu: 11/5/2015: highlight selected page in navigation bar
    switch(selectedButton){
        case "store":
            var storeBtn = document.getElementById("store");
            if(storeBtn != null){
                document.getElementById("store").style.fontWeight = "bold"; 
                document.getElementById("store").style.color = "#A8A8A8";
            }
            break;  
            
        case "news":
            var socialBtn = document.getElementById("social");
            if(socialBtn != null){
                document.getElementById("social").style.fontWeight = "bold";
                document.getElementById("social").style.color = "#A8A8A8";
            }
            break;  
            
        case "forums":
            var socialBtn = document.getElementById("social");
            if(socialBtn != null){
                document.getElementById("social").style.fontWeight = "bold";
                document.getElementById("social").style.color = "#A8A8A8";
            }
            break;
            
        case "social":
            var socialBtn = document.getElementById("social");
            if(socialBtn != null){
                document.getElementById("social").style.fontWeight = "bold";
                document.getElementById("social").style.color = "#A8A8A8";
            }
            break;
            
        case "library":
            document.getElementById("tutorials").style.fontWeight = "bold";
            document.getElementById("tutorials").style.color = "#A8A8A8";
            break;
        
        case "handbooks":
            var handbooksBtn = document.getElementById("handbooks");
            if(handbooksBtn != null){
                document.getElementById("handbooks").style.fontWeight = "bold";
                document.getElementById("handbooks").style.color = "#A8A8A8";
            }
            break;
        
        case "exams":
            var examsBtn = document.getElementById("exams");
            if(examsBtn != null){
                document.getElementById("exams").style.fontWeight = "bold";
                document.getElementById("exams").style.color = "#A8A8A8";
            }
            break;
        
        case "about":
            var homeBtn = document.getElementById("home");
            if(homeBtn != null){
                document.getElementById("home").style.fontWeight = "bold";
                document.getElementById("home").style.color = "#A8A8A8";
            }
            break;
            
        case "plan":
            var flightPlanBtn = document.getElementById("flightPlan");
            if(flightPlanBtn != null){
                document.getElementById("flightPlan").style.fontWeight = "bold";
                document.getElementById("flightPlan").style.color = "#A8A8A8";
            }
            break;
    }
    
    with (document) {   
    
        //writeln ('<body link=none aLink=none vLink=none">');
        writeln ('<base target ="_self">');
        writeln ('<div class="center_block_news" id = "center_block_news"> ');
        writeln ('<div class="toolbar" > ');
        
        var centerBlockHtml =   '<div class = "selectedhome">';
        centerBlockHtml     +=      '<ul style="width:20%; list-style:none; margin-top:1.5em; margin-left:10%; float:left;">';
        centerBlockHtml     +=          '<li class = "logo">';
        centerBlockHtml     +=                  '<a href="/index.php"><img src="/Images/PTSlogomod.png" width="100%"></a>';
        //centerBlockHtml   +=          '</li>';
        //centerBlockHtml   +=          '<li>';
        //centerBlockHtml   +=              '<a href = "////https://www.facebook.com/pages/Pilot-Training-System/517405968285851" target = "_blank">';
        //centerBlockHtml   +=                  '<img  src = "/Images/fb-button.png" height = "10%" //width = "10%" style="margin-right: 2em;" alt = "Facebookbutton"/>';
        //centerBlockHtml   +=              '</a>';
        //centerBlockHtml   +=              '<a href = "http://www.twitter.com/myPilotTraining" target = //"_blank">';
        //centerBlockHtml   +=                  '<img  src = "/Images/twitter-button.png" height = "10%" //width = "10%" alt = "Twitter button" />';
        //centerBlockHtml   +=              '</a>';
        centerBlockHtml     +=          '</li>';
        centerBlockHtml     +=      '</ul>';
        centerBlockHtml     +=  '</div>';

        
        writeln(centerBlockHtml);
        
        /*if(selectedButton == "home")
        writeln('<div class = "selectedhome"><a href="/index.php"><img src="/Images/PTSlogomod.png" width="100%"></a></div>');
        else
        writeln('<div class = "selectedhome"><a href="/index.php"><img src="/Images/PTSlogomod.png" width="100%"></a></div>');
        */
        //shu 10/26/2015: replace buttons with header
        /*if(selectedButton == "store")
        writeln('<div class = "selected"><a href="/Store/index.php"><img src="/Images/shopIconwhite.png"></a></div>');
        else
        writeln('<div class = "selected"><a href="/Store/index.php"><img onmouseover="src=\'/Images/shopIconwhite.png \'" onmouseout="src=\' /Images/shopIcon.png \'" src="/Images/shopIcon.png"></a></div>');
        
        
        if(selectedButton == "forums")
        writeln('<div class = "selected"><a href="/newsAndForums.php"><img src="/Images/socialIconwhite.png"></a></div>');
        else
        writeln('<div class = "selected"><a href="/newsAndForums.php"><img onmouseover="src=\'/Images/socialIconwhite.png \'" onmouseout="src=\' /Images/socialIcon.png \'" src="/Images/socialIcon.png"></a></div>');

        if(selectedButton == "library")
        writeln('<div class = "selected"><a href="/Library/index.php"><img src="/Images/libraryIconwhite.png"></a></div>');
        else
        writeln('<div class = "selected"><a href="/Library/index.php"><img onmouseover="src=\'/Images/libraryIconwhite.png \'" onmouseout="src=\' /Images/libraryIcon.png \'" src="/Images/libraryIcon.png"></a></div>');
        
        if(selectedButton == "plan")
        writeln('<div class = "selected"><a href="/flightPlan.php"><img src="/Images/flightIconwhite.png"></a></div>');
        else
        writeln('<div class = "selected"><a href = "/flightPlan.php" ><img onmouseover="src=\'/Images/flightIconwhite.png \'" onmouseout="src=\' /Images/flightIcon.png \'" src="/Images/flightIcon.png"></a></div>');
        */
        
        /*if(selectedButton == "news")
        writeln('<span class = "selected"><a href="/news.php"> &nbsp;&nbsp;&nbsp; News &nbsp;&nbsp;&nbsp;  </a></span>');
        else
        writeln('<a href="/news.php"> &nbsp;&nbsp;&nbsp; News &nbsp;&nbsp;&nbsp;  </a>');
        */


        /*
        if(selectedButton == "about")
        writeln('<span class = "selected"><a href="/index.php"><img src="/images/libraryIconwhite.png"></a></span>');
        else
        writeln('<a href="/index.php"><img src="/images/libraryIcon.png"></a>');
        
        
        if(selectedButton == "contact")
        writeln('<span class = "selected"><a href="/contactUs.php"> &nbsp;&nbsp;&nbsp; Contact Us &nbsp;&nbsp;&nbsp;  </a></span>');
        else
        writeln('<a href="/contactUs.php"> &nbsp;&nbsp;&nbsp; Contact Us &nbsp;&nbsp;&nbsp;  </a>');
        */
        /*
        if(selectedButton == "sitemap")
        writeln('<span class = "selected"><a href="/sitemap.php"> &nbsp;&nbsp;&nbsp; Site Map &nbsp;&nbsp;&nbsp;  </a></span>');
        else
        writeln('<a href="/sitemap.php"> &nbsp;&nbsp;&nbsp; Site Map &nbsp;&nbsp;&nbsp;  </a>');
        */
        
        writeln ('</div>');
        writeln ('</div>');
        /*
        writeln('<table  align = "center"><tr ><td>');
        writeln('<a href = "/index.php"><img src ="/Images/pts_logo.jpg" alt = "logo" height='+y+' class ="logo" > </a>');
        writeln('</td></tr></table>');
        */
    }
}
function index_foot () 
{
    with (document) {   
        writeln ('<div class="stationary footer copyright">');
        writeln('<div style="padding: 0.2em 0.25em 0.25em 6em"><a href = "/index.php">'+_pts+'</a>');
        writeln ('<a href="/contactUs.php">&nbsp&nbsp'+sub+'</a>');
        writeln ('<a href="/terms.pdf">&nbsp&nbspTerms of Service</a>');
        writeln ('<a href="/sitemap.php">&nbsp&nbspSite Map</a></div></div>');
    }
} 

function toggle_list_expansion(id) {
    var display = document.getElementById(id).style.display;
    if (display == "none") {
        document.getElementById(id).style.display = "block";
    } else {
        document.getElementById(id).style.display = "none";
    }
}
