'use strict';

function UI() {
	this.status = {
		healthTempDragging: false
	}
	this.data = {
		sheetId: undefined,
		healthTempMax: 0
	}

	this.elements = {};
	this.elements.document = $(document);
	this.elements.statCard = $(".card");
	this.elements.statCardKeys = this.elements.statCard.find("h1, h2");

	//health bar
	this.elements.hpCard = $(".hp-card");
	this.elements.hpSlider = this.elements.hpCard.find(".slider");
	this.elements.hpBar = this.elements.hpCard.find(".bottom");
	this.elements.hpCurrentBar = this.elements.hpCard.find("#current-health");
    
    //create character
//    this.elements.addCharacter = this.elements.document.find(".dropdown ul li input");
//
//	this.elements.statCardKeys.each(function() {
//		$(this).data("input", $(this).children("input"));
//		$(this).data("value", $(this).children("[keyval]"));
//	});
    
    this.data = {};


//    this.createNewCharacterSheet();
	this.setup();
//	this.updateHealthBar();
}
UI.prototype.resetSheetData = function(sheetId, newdata) {
    this.sheetData = newdata;
    if(newdata === undefined) {
        this.sheetData = {
            hit_points: {
                current: 10,
                maximum: 10,
            },
            character: {
                name: ""
            },
        } 
    }
    this.data.sheetId = sheetId;
//    this.suave = new suave("content", this.sheetData);
//    this.sheetData = this.suave.getData();
//    this.saveAll();
}
UI.prototype.setup = function() {
	var that = this;

	that.elements.statCardKeys.on("click", function(e) {
		e.stopPropagation();
		that.saveAll();
		that.toggleCardInputs($(this));
	});

	that.elements.document.on("click", function(e) {
		e.stopPropagation();
		that.saveAll();
	});

	that.elements.document.keypress(function(e) {
		if(e.which == 13) {
			that.saveAll();
		}
	});


	//health bar sliding
	that.elements.hpSlider.on("mousedown", function(e) {
		e.stopPropagation();
		$(this).addClass("sliding");
        that.data.healthTempMax = that.characterSheet.data.json.hit_points.temporary;
	});
	that.elements.document.on("mouseup", function() {
		that.elements.hpSlider.removeClass("sliding");
	});
	that.elements.document.on("mousemove", function(e) {
		if(that.elements.hpSlider.hasClass("sliding")) {
			var leftOffset = that.elements.hpBar.offset().left;
			var xpos = e.pageX - leftOffset;
			var width = that.elements.hpBar.width();
			var percent = (xpos / width);
			if(percent < 0) {
				percent = 0;
			}
			else if(percent > 1) {
				percent = 1;
			}
			that.updateHealthBar(percent);
		}
	});
	that.elements.document.on("selectstart", function(e) {
		if(that.elements.hpSlider.hasClass("sliding")) {
			e.preventDefault();
		}
	});
}

//UI.prototype.saveAll = function() {
//    if(this.characterSheet === undefined) return;
//	this.toggleCardInputs(this.elements.statCardKeys, true);
//    this.updateHealthBar();
//	this.setSaveTimer();
//};

//UI.prototype.toggleCardInputs = function(element, hide) {
//	var that = this;
//	element.each(function() {
//		if(!hide) {
//			$(this).data("input").show().focus().select();
//		}
//		else {
//			$(this).data("input").hide();
//		}
//	});
//}

UI.prototype.updateHealthBar = function(percent) {
    var sheetData = this.characterSheet.data.json;
    
	var current = sheetData.hit_points.current;
	var max = sheetData.hit_points.maximum;
	var tmp = sheetData.hit_points.temporary;

	if(percent !== undefined) { //on drag
		this.elements.hpCurrentBar.css("width", percent * 100 + "%");
        var val = Math.floor(max * percent);
        if(tmp > 0 || this.data.healthTempMax > 0) {
            this.status.healthTempDragging = true;
            if(this.data.healthTempMax < max) {
                this.data.healthTempMax = max;
            }
            val = Math.floor(this.data.healthTempMax * percent);
            sheetData.hit_points.temporary = val;
        }
        if(!this.status.healthTempDragging) {
            sheetData.hit_points.current = val;
        }
	}
	else { //on mouse release or input edit
        var numerator = current;
        if(tmp > 0) {
            numerator = tmp;
            this.elements.hpCurrentBar.addClass("bggray");
            this.elements.hpSlider.addClass("bordergray");
        }
        else {
            this.status.healthTempDragging = false;
            this.elements.hpCurrentBar.removeClass("bggray");
            this.elements.hpSlider.removeClass("bordergray");
        }
        if(max > 0) {
            if(current > max) {
                sheetData.hit_points.current = max;
            }
            percent = numerator / max;
            percent = Math.min(1, percent);
            percent = Math.max(0, percent);
        }
        else {
            percent = 0;
            sheetData.hit_points.current = 0;
        }
        this.elements.hpCurrentBar.stop().animate({"width" : Math.floor(percent * 100) + "%"}, 400, "linear").css("overflow","visible");
	}
}


//UI.prototype.setSaveTimer = function() {
//    console.log("saving");
//	clearTimeout(this.status.saveTimer);
//	var that = this;
//	this.status.saveTimer = setTimeout(function() {
//		that.characterSheet.setJson(JSON.stringify(that.characterSheet.data.json));
//        console.log(that.characterSheet);
//        that.characterSheet.save();
//	}, 1);
//}

//UI.prototype.createNewCharacterSheet = function(sheetId, newdata, optionalData) {
//    this.sheetData = newdata;
//    this.data.sheetId = sheetId;
//    var characterName = "";
//    if(optionalData != undefined && optionalData.characterName !== undefined) {
//        characterName = optionalData.characterName;
//        $(document).trigger("addSheetToList", {characterName: characterName, id: sheetId});
//    }
//    if(newdata === undefined) {
//        this.sheetData = {
//            hit_points: {
//                current: 10,
//                maximum: 10,
//            },
//            character: {
//                name: characterName
//            },
//        } 
//    }
//    
//    this.suave = new suave("content", this.sheetData);
//    this.sheetData = this.suave.getData();
//    this.saveAll();
//}

//UI.prototype.loadSheet = function(sheetId, json) {
//    var data = JSON.parse(JSON.parse(json));
//    this.createNewCharacterSheet(sheetId, data);
//}


//UI.prototype.setSheet = function(sheet) {
//    try {
//        sheet.data.json = JSON.parse(sheet.getJson());
//    }
//    catch(error) {
//        sheet.data.json = {};
//    }
//    
//    if(!sheet.data.json) {
//        sheet.data.json = {};
//    }
//    sheet.data.json.character = {};
//    sheet.data.json.character.name = sheet.getName();
//    this.suave = new suave("content", sheet.data.json);
//    sheet.data.json = this.suave.getData();
//    this.characterSheet = sheet;
//    this.saveAll();
//}

//UI.prototype.saveCharacterSheet = function() {
//    if(this.sheetData.character === undefined || this.sheetData.character.name === undefined || this.sheetData.character.name == "") {
//        return;
//    }
//    var json = JSON.stringify(this.sheetData);
//	var that = this;
//	var phpData = {data: json, name: this.sheetData.character.name};
//	var id = this.data.sheetId;
//	if(id !== undefined) {
//		phpData.sheetId = parseInt(id);
//	}
//    console.log("saving with id " + phpData.sheetId);
//	$.ajax({
//		type: "POST",
//		dataType: "json",
//		url: "php/characterSheetSave.php",
//		data: phpData,
//		success: function(data) {
//			if(data.error !== undefined && data.error.length > 0) {
//				alert(data.error);
//			}
//			that.data.sheetId = data.sheetId;
//		},
//		error: function() {
//			console.warn("could not save user data");
//		}
//	});
//}