$(document).ready(function() {
    var profile_details = "";  
var category_list=[];

dis_flag='style="display:block;"';
dis_count=0;

    $.each(data, function(key, profile_value) {
        
       var note          = profile_value['note'];
       var category     = profile_value['category'];
       var url = profile_value['url'];
       var category_details = category.split(",");

if(dis_count>5){dis_flag='style="display:none;"';}
else{dis_count++;}
profile_details +=  '<div data-w-id="38b9e8b8-0a9b-2cc4-92ad-1f22767dd9db" '+dis_flag+' class="collection-item mix w-dyn-item">';
profile_details += '<div class="image-div">';
if(url.search("youtube.com")>-1){	
profile_details +=  '<iframe width="320" height="240" src="'+url+'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';}
elseif(url.search("facebook.com")>-1){
profile_details +=  '<iframe src="'+url+'" width="320" height="240" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true"></iframe>';}
else{
profile_details +=  '<video width="320" height="240" controls><source src="'+url+'" type="video/mp4">Your browser does not support the video tag.</video>';}
profile_details +=  '</div>';
        profile_details	+=	'<div class="bio-text-block w-richtext">';
        profile_details	+=	'<p>'+note+'</p>';
        profile_details	+=	'</div>';
        profile_details	+=	'<div class="occupations-div">';

        var flag = 0 ;

        $.each(category_details, function(key, category_value) {
category_list.push(category_value.trim());
            flag++;
            profile_details	+=	'<div class="category-trigger">'+category_value+'</div>';
        });

        if(flag != 5 && flag <= 5){

            for(var count =flag ; count <= flag; count++ ){

                profile_details	+= '<div class="category-trigger w-dyn-bind-empty"></div>';
            }
        }

        profile_details	+='</div>';
        profile_details	+='<div class="buttons-div">';
        profile_details	+='<a href="whatsapp://send?text='+url+'" target="_blank" class="button-bottom right-button w-button">Share</a>';
        profile_details	+='<a download="video.mp4" href="'+url+'" target="_blank" class="button-bottom right-button w-button">Download</a>';
        profile_details	+='</div>';
		profile_details	+=	'</div>';

      });

      //console.log(profile_details);
category_li = category_list.filter(function(item, pos) {return category_list.indexOf(item) == pos;})
category_details='';//<div class="filter-item w-dyn-item filter-active"><div class="html-embed w-embed"><div class="checkbox w-checkbox"><input type="checkbox" id="General" name="Checkbox" data-name="Checkbox" class="w-checkbox-input" data-value="General" value="General"><label for="General" class="w-form-label">General</label></div></div></div>';
for(var i in category_li)
{
category_details+='<div class="filter-item w-dyn-item"><div class="html-embed w-embed"><div class="checkbox w-checkbox"><input type="checkbox" id="'+category_li[i]+'" name="Checkbox" data-name="Checkbox" class="w-checkbox-input" data-value="'+category_li[i]+'" value="'+category_li[i]+'"><label for="'+category_li[i]+'" class="w-form-label">'+category_li[i]+'</label></div></div></div>';
}

      $("#target-container").html(profile_details);
     $("#cat-list").html(category_details);
      var slug = function(str) {
        var $slug = '';
        var trimmed = $.trim(str);
        $slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
        replace(/-+/g, '-').
        replace(/^-|-$/g, '');
        return $slug.toLowerCase();
        }
    

      // Code#002: Add Classes to Collection List Items
  	$('.filter-list .w-dyn-item').each(function () {

        // The five Category Text Blocks
        var category1 = slug($(this).find('.category-inlay:nth-child(1)').text());
        var category2 = slug($(this).find('.category-inlay:nth-child(2)').text());
        var category3 = slug($(this).find('.category-inlay:nth-child(3)').text());	
        var category4 = slug($(this).find('.category-inlay:nth-child(4)').text());
        var category5 = slug($(this).find('.category-inlay:nth-child(5)').text());


        $(this).addClass(category1);
        $(this).addClass(category2);
        $(this).addClass(category3);
        $(this).addClass(category4);
        $(this).addClass(category5);
    });


    $('.filter-item').click(function(){
loading_size=-1;
        var navigationCategory = slug($(this).text());
         $('#filter-list .w-dyn-item').delay(500).css('display', 'none');
       $('.' + navigationCategory).delay(500).css('display', 'block');
     
         $('.filter-item').removeClass('filter-active');
         $(this).addClass('filter-active');
   });
 
/* 
    // Code#004: Show All
    $('.filter-item:first-child').click(function(){
    
        $('#filter-list .w-dyn-item').delay(500).css('display', 'block');

    });
 
    // Code#005: Set Active for Category "All"
    $('.filter-item:first-child').addClass('filter-active');
*/
 

    // Reusable function to convert any string/text to css-friendly format
    var conv = function (str) {
        if (!str) {
            str = 'empty';
            }
        return str.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '')
                .replace(/ /g, "-")
                .toLowerCase()
                .trim();
    }; 

    // Creating dynamic elements classes from its categories:
    var catArray = document.querySelectorAll('.w-dyn-item .category-trigger');
    catArray.forEach( function(elem) {
        var text = elem.innerText || elem.innerContent;
        var className = conv(text);
        if (!isNaN(parseInt(className.charAt(0), 10))) {
            className = ("_" + className);
            }
        elem.parentElement.parentElement.classList.add(className);
    });
    
    // Move all items to one container
    var moveItems = document.querySelectorAll('.move-up');
    moveItems.forEach( function(move) {
        document.getElementById('target-container').appendChild(move);
    });
    
    var containerEl = document.querySelector('.filter-list');
    var checkboxGroup = document.querySelector('.left-nav-div');
    var checkboxes = checkboxGroup.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach( function(elem) {
        var dataValue = conv(elem.getAttribute("data-value"));
        if (!isNaN(parseInt(dataValue.charAt(0), 10))) {
                dataValue = ("_" + dataValue);
                }
        elem.setAttribute('value', '.' + dataValue);
    });
    var allCheckbox = document.querySelector('.clear');
    allCheckbox.setAttribute('value', 'all');
    var mixer = mixitup(containerEl, {
        load: {
            sort: 'random'
        }
    });
  
 
    checkboxGroup.addEventListener('change', function(e) {

        var selectors = [];
        var checkbox;
        var i;
        if (e.target === allCheckbox && e.target.checked) {
        for (i = 0; i < checkboxes.length; i++) {
            checkbox = checkboxes[i];
            if (checkbox !== allCheckbox) checkbox.checked = false;
        }
        } else {
            allCheckbox.checked = false;
        }
        for (i = 0; i < checkboxes.length; i++) {
        checkbox = checkboxes[i];
        
            if (checkbox.checked) selectors.push(checkbox.value);
        }
        
        var selectorString = selectors.length > 0 ?
        selectors.join(',') :  'all';
        mixer.filter(selectorString);

    });
//$("#General").click();
});

var loading_size=6;
$(document.body).on('touchmove', onScroll); // for mobile
$(window).on('scroll', onScroll); 

function onScroll() {
    //if($(window).scrollTop() > $(document).height() - $(window).height()-1) {
if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight - 1 ) { 	
if(loading_size<0){return false;}
$('.w-dyn-item').each(function (i) {
if(loading_size==0){loading_size=6;return false;}
if(this.getAttribute("style")=="display:none;")
{
this.setAttribute("style","display:block;");
//$(this).removeAttr("style");
loading_size-=1;
}
if($('.w-dyn-item').length==(i+1)){
$('#filter-list .w-dyn-item').delay(500).css('display', 'block');
loading_size=-1;return false;}
});


    }
}




        function shareOnFB() {
            var url = "https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(window.location.href);
            window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
            return false;
        }

        function shareOntwitter() {
            var url = "https://twitter.com/intent/tweet?url="+window.location.href;
            TwitterWindow = window.open(url, 'TwitterWindow', width = 600, height = 300);
            return false;
        }

        function shareOnwhatsapp(url) {
            window.open(
                "whatsapp://send?text="+window.location.href,
                '_blank'
            );
        }
