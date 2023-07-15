// Get references to the elements you'll be working with
var input = document.getElementById("password")
var div = document.getElementById("HIDDENDIV")
var btn = document.getElementById("button")
var inputContainer = document.getElementsByClassName("codeInput-container")

// Set up event handlers in JavaScript
// btn.addEventListener("click", validate)

btn.addEventListener("onChange", validate)

function validate() {
  // if (input.value.toLowerCase() == "081222") {
  if (input.value.toLowerCase() == process.env.PASSWORD_KEY) {
    // No need to add a "show" class. Just remove the "hidden" class.
    div.classList.remove("hidden")

    // Or, add it:
    input.classList.add("hidden")
    btn.classList.add("hidden")
  }
  //   else {
  //     password.focus() // <-- If you don't do this first, your select code won't work
  //     password.setSelectionRange(0, password.value.length)
  //     alert("Invalid Password!")
  //   }
}

function validate(value) {
  if (value == process.env.PASSWORD_KEY) {
    // setkey
    // No need to add a "show" class. Just remove the "hidden" class.
    div.classList.remove("hidden")

    // Or, add it:
    // input.classList.add("hidden")
    // btn.classList.add("hidden")
  }
  //   else {
  //     password.focus() // <-- If you don't do this first, your select code won't work
  //     password.setSelectionRange(0, password.value.length)
  //     alert("Invalid Password!")
  //   }
}

input.addEventListener("change", function (event) {
  //   if (event.keyCode === 13) {
  // No reason to simulate a button click. Just call the code that needs to be run.
  console.log(event.target.value)
  if (event.target.value != "") validate()
  //   }
})

/* You only need to apply this to elements that should be hidden and
       then simply remove this class from hidden elements to show them. */

$(document).ready(function () {
  $(".codeInput").codeInput({
    number: 6,
  })
})

jQuery.fn.codeInput = function (options) {
  var defaults = {
    number: 4,
    length: 1,
    type: "password",
  }

  var settings = $.extend({}, defaults, options)

  return this.each(function () {
    var self = $(this)
    var placeholder = self.attr("placeholder")
    var div = $("<div/>").addClass("codeInput-container")

    div.append($("<span />").text(placeholder))

    self.replaceWith(div)

    div.append(self)

    var inputDiv = $("<div />").addClass("inputs")

    for (var i = 1; i <= settings.number; i++) {
      inputDiv.append(
        $("<input />").attr({
          maxlength: settings.length,
          type: settings.type,
        })
      )
    }

    div.prepend(inputDiv)

    div.on("click touchstart", function (e) {
      if (!div.hasClass("active")) {
        div.addClass("active")
        setTimeout(function () {
          div.find(".inputs input:first-child").focus()
        }, 400)
      }
    })

    div.find(".inputs").on("keyup input", "input", function (e) {
      if (
        $(this).val().toString().length >= settings.length ||
        e.keyCode == 39
      ) {
        $(this).next().focus()
      }
      if (e.keyCode == 8 || e.keyCode == 37) {
        $(this).prev().focus()
      }
      var value = ""
      div.find(".inputs input").each(function () {
        value = value + $(this).val().toString()
      })
      self.attr({
        value: value,
      })
      console.log(value)
      if (value != "") {
        validate(value)
      }
    })

    $(document).on("click touchstart", function (e) {
      if (
        !$(e.target).parent().is(div) &&
        !$(e.target).parent().parent().is(div)
      ) {
        var hide = true
        div.find(".inputs input").each(function () {
          if ($(this).val().toString().length) {
            hide = false
          }
        })
        if (hide) {
          div.removeClass("active")
          div.find(".inputs input").blur()
        } else {
          div.addClass("active")
        }
      }
    })
  })
}
