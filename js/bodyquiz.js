//Execute a JavaScript immediately after a page has been loaded
//Reference https://codepen.io/x-dream/pen/ZGbBVd

window.onload = function() {

  var data_id = {
    resource_id: '4ea75e17-cb1e-473e-9b6b-c0227b1fa787', // the resource id
  };

  // get the words from the API and store the result in local storage
  // only do the request if there is no data in local storage
  if (!this.localStorage.getItem("slqData")){
    $.ajax({
      url: 'https://data.gov.au/api/3/action/datastore_search', 
      data: data_id,
      dataType: 'jsonp',
      cache: true,
      success: function(data) {
        localStorage.setItem("slqData", JSON.stringify(data));
      }
      
    });   
  }

  // retrieve data from local storage
  var sqlData = JSON.parse(this.localStorage.getItem("slqData"));
  var records = sqlData.result.records;

  // initialize data used by the quiz
  var data = {
    terms: [],
    definitions: [],
    pairs: {},
  }

    var selectedTerm = null, //to make sure none is selected onload
      selectedDef = null,
      termsContainer = document.querySelector("#terms"), //list of terms
      defsContainer = document.querySelector("#defs"); //list of definitions
  
    //This function takes two arguments, that is one term and one def to compare if they match. 
    //It returns True or False after compairing values of the "pairs" object property.     
    function isMatch(termIndex, defIndex) {
      return data.pairs[termIndex] === defIndex;
    }
  
    //This function adds HTML elements and content to the specified container (UL).
    function createListHTML(list, container) {
      container.innerHTML = ""; //first, clean up any existing LI elements
      for (var i = 0; i < 6; i++) {
        container.innerHTML = container.innerHTML + "<li data-index='" + list[i]["index"] + "'>" + "<span>" + list[i]["text"] + "</span>" + "</li>";
      }
    }
  
    //listen for a "click" event on a list of Terms and store the clicked object in the target object
    termsContainer.addEventListener("click", function(e) {
      var target = e.target.parentNode;
      if (target.className === "score")
        return;
      var termIndex = Number(target.getAttribute("data-index"));
       
      if (selectedTerm !== null && selectedTerm !== termIndex) {
        termsContainer.querySelector("li[data-index='" + selectedTerm + "']").removeAttribute("data-selected");
      }
  
      if (target.hasAttribute("data-selected")) {
        target.removeAttribute("data-selected");
        selectedTerm = null;
      }  	
      else {
        target.setAttribute("data-selected", true);
        selectedTerm = termIndex;
      }
  
      if (selectedTerm !== null && selectedDef !== null) {
        var term = document.querySelector("#terms [data-index='" + selectedTerm + "']");
        var def = document.querySelector("#defs [data-index='" + selectedDef + "']");
        if (isMatch(selectedTerm, selectedDef)) {
          term.className = "score";
          def.className = "score";
        }
  
        selectedTerm = null;
        selectedDef = null;
        term.removeAttribute("data-selected");
        def.removeAttribute("data-selected");
      }
      if (termsContainer.querySelectorAll("li.score").length == data.definitions.length) {

        localStorage.setItem("quiz", true);
			  check_achievements("../images/puzzlepart1.png") 
      }

    })
  
    defsContainer.addEventListener("click", function(e) {
      var target = e.target.parentNode;
      if (target.className === "score")
        return;
      var defIndex = Number(target.getAttribute("data-index"));
  
      if (selectedDef !== null && selectedDef !== defIndex) {
        defsContainer.querySelector("li[data-index='" + selectedDef + "']").removeAttribute("data-selected");
      }
  
      if (target.hasAttribute("data-selected"))
        target.removeAttribute("data-selected");
      else
        target.setAttribute("data-selected", true);
      selectedDef = Number(target.getAttribute("data-index"));
      if (selectedTerm !== null && selectedDef !== null) {
        //var term = document.querySelector("#terms [data-index='"+selectedTerm+"']");
        var term = termsContainer.querySelector("[data-index='" + selectedTerm + "']");
        //var def = document.querySelector("#defs [data-index='"+selectedDef+"']");
        var def = defsContainer.querySelector("[data-index='" + selectedDef + "']");
        if (isMatch(selectedTerm, selectedDef)) {
  
          term.className = "score";
          def.className = "score";
        }
        selectedTerm = null; 
        selectedDef = null; 
        term.removeAttribute("data-selected");
        def.removeAttribute("data-selected");

        if (termsContainer.querySelectorAll("li.score").length == data.definitions.length) {
          localStorage.setItem("quiz", true);
          check_achievements("../images/puzzlepart1.png")
          
        }
      }
    })
  
    function reset_quiz_data() {
      // shuffle data from API to use different words
      randomSort(records)
      // reset data used by the quiz
      data = {
        terms: [],
        definitions: [],
        pairs: {},
      }
      // fill quiz data with api data
      for (i = 0; i < 6; i++) {
        data.terms.push({
          index: i,
          text: `${records[i].English} (${records[i].Yugambeh})`,
          //text: records[i].English,
        })
        data.definitions.push({
          index: i,
          text: records[i].Yugambeh
        })
        data.pairs[i] = i
      }
    }
    
    function reset() {
      var resetTerms = termsContainer.querySelectorAll("li");
      var resetDefs = defsContainer.querySelectorAll("li");
      for (var i = 0; i < resetTerms.length; i++) {
        resetTerms[i].removeAttribute("class", "score");
        resetTerms[i].removeAttribute("data-selected");
      }
      for (i = 0; i < resetDefs.length; i++) {
        resetDefs[i].removeAttribute("class", "score");
        resetDefs[i].removeAttribute("data-selected");
      }
  
      selectedTerm = null;
      selectedDef = null;
    }
  
    function shuffle() {
      reset_quiz_data()
      randomSort(data.terms)
      randomSort(data.definitions)
      createListHTML(data.terms, termsContainer)
      createListHTML(data.definitions, defsContainer)
    }
  
    function randomSort(array) {
      var currentIndex = array.length,
        temporaryValue, randomIndex;
  
      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
  
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
  
        // And swap it with the current element. SWAP
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
  
      return array;
    }
  
    shuffle();
    document.querySelector(".reset").addEventListener("click", function() {
      reset();
      termsContainer.setAttribute("class", "fadeOut");
      defsContainer.setAttribute("class", "fadeOut");
      setTimeout(function() {
          shuffle();
          termsContainer.removeAttribute("class", "fadeOut");
          defsContainer.removeAttribute("class", "fadeOut");
        }, 450)
        //shuffle();
  
    });
  }