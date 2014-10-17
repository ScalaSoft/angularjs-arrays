angular.module('ng').service('$array', function(){
    var needle = '';
    var haystack = '';
    var argStrict =  '';
    
    return {
        in_array: function(needle, haystack, argStrict) {
            //  discuss at: http://phpjs.org/functions/in_array/
            // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // improved by: vlado houba
            // improved by: Jonas Sciangula Street (Joni2Back)
            //    input by: Billy
            // bugfixed by: Brett Zamir (http://brett-zamir.me)
            //   example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
            //   returns 1: true
            //   example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
            //   returns 2: false
            //   example 3: in_array(1, ['1', '2', '3']);
            //   example 3: in_array(1, ['1', '2', '3'], false);
            //   returns 3: true
            //   returns 3: true
            //   example 4: in_array(1, ['1', '2', '3'], true);
            //   returns 4: false

            var key = '',
              strict = !! argStrict;

            //we prevent the double check (strict && arr[key] === ndl) || (!strict && arr[key] == ndl)
            //in just one for, in order to improve the performance 
            //deciding wich type of comparation will do before walk array
            if (strict) {
              for (key in haystack) {
                if (haystack[key] === needle) {
                  return true;
                }
              }
            } else {
              for (key in haystack) {
                if (haystack[key] == needle) {
                  return true;
                }
              }
            }

            return false;
        },
        array_diff: function array_diff(arr1) {
              //  discuss at: http://phpjs.org/functions/array_diff/
              // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
              // improved by: Sanjoy Roy
              //  revised by: Brett Zamir (http://brett-zamir.me)
              //   example 1: array_diff(['Kevin', 'van', 'Zonneveld'], ['van', 'Zonneveld']);
              //   returns 1: {0:'Kevin'}

              var retArr = {},
                argl = arguments.length,
                k1 = '',
                i = 1,
                k = '',
                arr = {};

              arr1keys: for (k1 in arr1) {
                for (i = 1; i < argl; i++) {
                  arr = arguments[i];
                  for (k in arr) {
                    if (arr[k] === arr1[k1]) {
                      // If it reaches here, it was found in at least one array, so try next value
                      continue arr1keys;
                    }
                  }
                  retArr[k1] = arr1[k1];
                }
              }

              return retArr;
            },
        array_search: function array_search(needle, haystack, argStrict) {
              //  discuss at: http://phpjs.org/functions/array_search/
              // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
              //    input by: Brett Zamir (http://brett-zamir.me)
              // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
              //  depends on: array
              //        test: skip
              //   example 1: array_search('zonneveld', {firstname: 'kevin', middle: 'van', surname: 'zonneveld'});
              //   returns 1: 'surname'
              //   example 2: ini_set('phpjs.return_phpjs_arrays', 'on');
              //   example 2: var ordered_arr = array({3:'value'}, {2:'value'}, {'a':'value'}, {'b':'value'});
              //   example 2: var key = array_search(/val/g, ordered_arr); // or var key = ordered_arr.search(/val/g);
              //   returns 2: '3'

              var strict = !! argStrict,
                key = '';

              if (haystack && typeof haystack === 'object' && haystack.change_key_case) {
                // Duck-type check for our own array()-created PHPJS_Array
                return haystack.search(needle, argStrict);
              }
              if (typeof needle === 'object' && needle.exec) {
                // Duck-type for RegExp
                if (!strict) {
                  // Let's consider case sensitive searches as strict
                  var flags = 'i' + (needle.global ? 'g' : '') +
                    (needle.multiline ? 'm' : '') +
                  // sticky is FF only
                  (needle.sticky ? 'y' : '');
                  needle = new RegExp(needle.source, flags);
                }
                for (key in haystack) {
                  if(haystack.hasOwnProperty(key)){
                      if (needle.test(haystack[key])) {
                          return key;
                      }
                  }
                }
                return false;
              }

              for (key in haystack) {
                if(haystack.hasOwnProperty(key)){
                    if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
                        return key;
                    }
                }
              }

              return false;
            },
        array_key_exists: function array_key_exists(key, search) {
              //  discuss at: http://phpjs.org/functions/array_key_exists/
              // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
              // improved by: Felix Geisendoerfer (http://www.debuggable.com/felix)
              //   example 1: array_key_exists('kevin', {'kevin': 'van Zonneveld'});
              //   returns 1: true

              if (!search || (search.constructor !== Array && search.constructor !== Object)) {
                return false;
              }

              return key in search;
            },
        array_values: function array_values(input) {
              //  discuss at: http://phpjs.org/functions/array_values/
              // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
              // improved by: Brett Zamir (http://brett-zamir.me)
              //   example 1: array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} );
              //   returns 1: {0: 'Kevin', 1: 'van Zonneveld'}

              var tmp_arr = [],
                key = '';

              if (input && typeof input === 'object' && input.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
                return input.values();
              }

              for (key in input) {
                tmp_arr[tmp_arr.length] = input[key];
              }

              return tmp_arr;
            },
        array_intersect_assoc: function array_intersect_assoc(arr1) {
              //  discuss at: http://phpjs.org/functions/array_intersect_assoc/
              // original by: Brett Zamir (http://brett-zamir.me)
              //        note: These only output associative arrays (would need to be
              //        note: all numeric and counting from zero to be numeric)
              //   example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
              //   example 1: $array2 = {a: 'green', 0: 'yellow', 1: 'red'}
              //   example 1: array_intersect_assoc($array1, $array2)
              //   returns 1: {a: 'green'}

              var retArr = {},
                argl = arguments.length,
                arglm1 = argl - 1,
                k1 = '',
                arr = {},
                i = 0,
                k = '';

              arr1keys: for (k1 in arr1) {
                arrs: for (i = 1; i < argl; i++) {
                  arr = arguments[i];
                  for (k in arr) {
                    if (arr[k] === arr1[k1] && k === k1) {
                      if (i === arglm1) {
                        retArr[k1] = arr1[k1];
                      }
                      // If the innermost loop always leads at least once to an equal value, continue the loop until done
                      continue arrs;
                    }
                  }
                  // If it reaches here, it wasn't found in at least one array, so try next value
                  continue arr1keys;
                }
              }

              return retArr;
            }
    };
});