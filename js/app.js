$(document).ready( function() {


// ROTATE PROFILE PICS
	var rand = function() {
		number = Math.floor((Math.random()*14));
		return
	};
	rand();

	function Profile (image) {
		this.image = image;
	}

	var profilePics = new Array();
	profilePics[0] = new Profile("images/profiles/child.jpg");
	profilePics[1] = new Profile("images/profiles/disco.jpg");
	profilePics[2] = new Profile("images/profiles/green.jpg");
	profilePics[3] = new Profile("images/profiles/mud.jpg");
	profilePics[4] = new Profile("images/profiles/normal.jpg");
	profilePics[5] = new Profile("images/profiles/paris.jpg");
	profilePics[6] = new Profile("images/profiles/portland.jpg");
	profilePics[7] = new Profile("images/profiles/slide.jpg");
	profilePics[8] = new Profile("images/profiles/wedding.jpg");
	profilePics[9] = new Profile("images/profiles/china.jpg");
	profilePics[10] = new Profile("images/profiles/israel.jpg");
	profilePics[11] = new Profile("images/profiles/kellogg.jpg");
	profilePics[12] = new Profile("images/profiles/kellogg2.jpg");
	profilePics[13] = new Profile("images/profiles/wedding2.jpg");

	var newProfile = function () {
		rand();
		$('.profile img').attr('src', profilePics[number].image);
	};
	newProfile();


// CALL ISOTOPE

	var expContainer = $('#explanations');

	var container = $('#isotope-con').imagesLoaded( function() {
		container.isotope({
				itemSelector: '.item'
			}).isotope('shuffle');
	});

	var iso = container.data('isotope');


// FILTERS

	var filter;
	$('.nav-left li').on('click', function () {
		$('.active').removeClass('active');
		$('#explanations').slideUp();
		filter = $(this).text();
		if (filter == "Companies") {
			$('.Company').addClass('w2');
			container.isotope({ filter: '.Company' });
			$(this).addClass('active');
		}
		else if (filter == "Apps") {
			$('.App').addClass('w2');
			container.isotope({ filter: '.App' });
			$(this).addClass('active');
		}
		else if (filter == "Articles") {
			$('.Article').addClass('w2');
			container.isotope({ filter: '.Article' });
			$(this).addClass('active');
		}
		else if (filter == "Passions") {
			$('.Passion').addClass('w2');
			container.isotope({ filter: '.Passion' });
			$(this).addClass('active');
		};	
	});
	
	$('.profile').on('click', function () {
		$('#explanations').slideUp();
		$('.item').removeClass('w2');
		$('.active').removeClass('active');
		container.isotope({ filter: '*' }).isotope('shuffle');
		window.scrollTo(0, 0);
		newProfile();
	});

	// AJAX PULL ITEMS

	$.ajax({
		url: "js/items.js",
		contentType: "application/json",
		dataType: "json",
		type: "GET"
	})
	.success( function (data) {
		$.each(data, function(i){
	
			var result = $('.templates .item').clone();
			var expResult = $('.templates .itemExplained').clone();

			// INSERT TYPE AS A CLASS
			result.addClass(data[i].type);
			result.find('.identity').text(data[i].id);
			
			// INSERT IMAGE
			var itemImg = result.find('.itemImg');
			itemImg.attr('src', data[i].imageURL);

			// INSERT HOVER
			result.find('.title').text(data[i].title);
			result.find('.type').text(data[i].type);

			// APPEND THE CONTAINER
			container.append(result);

			// INSERT EXPLANATION
			expResult.addClass(data[i].type);
			expResult.addClass(data[i].id);
			expResult.find('h1').text(data[i].title);
			expResult.find('p').text(data[i].explanation);
			expResult.find('a').text(data[i].buttonTxt);
			expResult.find('.expLink').attr('href', data[i].expLink);

			var expImg = expResult.find('.expImg');
			expImg.attr('src', data[i].expImgURL);

			expContainer.append(expResult);
			
			// HOVER ON ITEM
			$('.item').on('mouseenter', function () {
				$(this).zoom({
					duration: 500,
					magnify: 0.7,
					onZoomOut: function () {
						$(this).parent().find('.itemHover').fadeOut();
					}
				});
				$(this).find('.itemHover').fadeIn(500);
			});

			// CONTROLING & DISPLAYING EXPLANATION ITEMS
			var clickedID;
			var currentItem;
			var intID;
			var prevID;
			var nextID;

			// CLICKING ON AN ITEM
			$('.item').on('click', function() {
				$('html, body').stop().animate({ scrollTop: 0 }, 300);
				clickedID = $(this).find('.identity').text();
				currentItem = $('.'+clickedID);
				$('.itemExplained').hide();
				currentItem.show()
				$('#explanations').slideDown();
				intID = parseInt(clickedID);
			});

			// CLICKING PREVIOUS CONTROL BUTTON
			$('.prevExp').on('click', function() {
				$('.itemExplained').hide();
				if ($('.nav-left li').hasClass('active')) {
					var filterOn = function (filterName, x, y) {
						if (filter == filterName) {
							if (intID > x) { prevID = intID - 1; }
							else { prevID = y }
						};
					};
					filterOn("Companies", 1, 5);
					filterOn("Apps", 6, 10);
					filterOn("Articles", 11, 15);
					filterOn("Passions", 16, 19);
				}
				else {
					if (intID > 1) { prevID = intID - 1; }
					else { prevID = data.length; }
				};
				$('.'+prevID).show();
				intID = prevID;	
			});

			// CLICKING NEXT CONTROL BUTTON
			$('.nextExp').on('click', function() {
				$('.itemExplained').hide();
				if ($('.nav-left li').hasClass('active')) {
					var filterOn = function (filterName, x, y) {
						if (filter == filterName) {
							if (intID < x) { nextID = intID + 1; }
							else { nextID = y }
						};
					};
					filterOn("Companies", 5, 1);
					filterOn("Apps", 10, 6);
					filterOn("Articles", 15, 11);
					filterOn("Passions", 19, 16);
				}
				else{
					if (intID < data.length) { nextID = intID + 1; }
					else { nextID = 1; }
				};
				$('.'+nextID).show();
				intID = nextID;
			});

			// CLOSING EXPLANATIONS
			$('.closeExp').on('click', function() {
				$('html, body').stop().animate({ scrollTop: 0 }, 300);
				$('.itemExplained').fadeOut();
				$('#explanations').slideUp();
			});

		});
		// RUN THE ISOTOPE SHUFFLE
		container.imagesLoaded( function() {
			container.isotope({
				itemSelector: '.item'
			}).isotope('shuffle');
		});
	});

	/* CONTROLS ON EXPLANATIONS */
	

	


});