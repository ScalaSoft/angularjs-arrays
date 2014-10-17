angularjs-arrays
================

Array functions for AngularJs
This functions are implemented like php functions based on performance.

<h4>Installation</h4>

<ul>
  <li>Just Download the .js file</li>
  <li>Include into yours index.htmlmain file like: 
  ```
  src="scripts/libs/Array.js"
  ```
  </li>
</ul>


<h4>Injection</h4>
  .controller('UsersCtrl', function ($scope, $location, $route, $modal, $routeParams, $q, $array, …){

<h4>Usage</h4>

<h5>Example 1:</h5>
```javascript
var arr = [1,2,3] , var in = $array.in_array(1,arr) // in = true
```
<h5>Example 2:</h5>
```javascript
var ordered_arr = array({3:'value'}, {2:'value'}, {'a':'value'}, {'b':'value'});
var key = array_search(/val/g, ordered_arr); // or var key = ordered_arr.search(/val/g); //returns '3'
```
