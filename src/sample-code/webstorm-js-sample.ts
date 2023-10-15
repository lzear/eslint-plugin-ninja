export const webstormJsSample = `

class Foo extends BarComponent {
}

function buzz() {
  return 0;
}

var x = 1, y = 2,
  foregroundColor = 'transparent',
  highlightColor = 'lime',
  font = 'Arial';
/*
 Multiline
   C-style
     Comment
 */
var myLink = {img: "btn.gif"},
  local = true,
  initial = -1;
width = 400
height = 300

var foo = {
  numbers: ['one', 'two', 'three', 'four', 'five', 'six'],
  data: {
    a: {
      id: 123,
      type: "String",
      isAvailable: true
    },
    b: {id: 456, type: "Int"}
  },
// fBar : function (x,y);
  fOne: function (a, b, c, d, e, f, g, h) {
    var x = a + b + c + d + e + f + g + h;
    fTwo(a, b, c, fThree(d, e, f, g, h));
    var z = a == 'Some string' ? 'yes' : 'no';
    z = a == 10 ? 'yes' : 'no';
    var colors = ['red', 'green', 'blue', 'black', 'white', 'gray'];
    for (j = 0; j < 2; j++) i = a;
    for (var i = 0; i < colors.length; i++)
         var colorString = this.numbers[i];
  },

  chainedCallSample: function (a, b, c, d, e, f) {
    chainRoot.firstCall(a, b, c, d, e, f, g).secondCall(a, b, c, d).thirdCall(a, b, c, d).fourthCall().q(a).r(a, b).s();
    chainRoot.x().y()
      .z();
  },
  callArgumentsSample: function () {
    this.fTwo("one", "two", "three", "four");
    this.fThree({
      strA: 'a',
      strB: 'b',
      strC: 'c',
      strD: 'd'
    }, 'strE');
    [1, 2, 3].reduce(function (previousValue, currentValue) {
      return previousValue + currentValue;
    }, 10);
  },
  /**
   * Function JSDoc. Long lines can be wrapped with 'Comments'/'Wrap at right margin' option
   * @param {string} a Parameter A description.
   * @param {string} b Parameter B description. Can extend beyond the right margin.
   */
  fTwo: function (a, b, c, d) {
    foo(a, b, c, d); // Line comment which can be wrapped if long.
    if (true)
      return c;
    if (a == 'one' && (b == 'two' || c == 'three')) {
      return a + b + c + d;
    } else return strD;
    if (a == 'one') {
      return 1;
    } else if (a == 'two') {
      return 2;
    }
    var number = -10;
    while (x < 0) {
      number = number + 1;
    }
    do {
      number = number + 1;
    } while (number < 10);
    return d;
  },

  fThree: function ({
                      strA,
                      strB,
                      strC,
                      strD
                    }, strE) {
    var number = prompt("Enter a number:", 0);
    switch (number) {
      case 0 :
        alert("Zero");
        break;
      case 1:
        alert("One");
        break;
    }
    try {
      a[2] = 10;
    } catch (e) {
      alert("Failure: " + e.message);
    }
    return strA + strB + strC + strD + strE;
  }
};
`
