angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $ionicModal, $ionicPlatform, $cordovaVibration, $http) {

  $scope.Data = {
    stereoEffect: true,
    landscapeMode: false,
    moveStarFighter: false,
    planetsSpeed: 1,
    ip: 'http://192.168.1.3'
  };

  var oldspeed = {
    x: 0,
    y: 0,
    z: 0
  };
  var nearzeroz = 0;
  var nearzerox = 0;
  var nearzeroy = 0;

  function onSuccess(speed) {

    if (Math.abs(speed.y - oldspeed.y) > 0.01) {
      console.log(speed.y);
    }
    if (Math.abs(speed.x - oldspeed.x) > 0.01) {
      console.log(speed.x);
    }
    if (Math.abs(speed.z - oldspeed.z) > 0.01) {
      console.log(speed.z);
    }




    if (Math.abs(speed.y - oldspeed.y) > 0.01) {
      //console.log("changed y , move " + speed.y);
      if (parseInt(speed.y * (180) / (32)) == 0) {
        if (speed.y > 0.01)
          nearzeroy += speed.y;
      } else {
        $http({
          method: 'POST',
          url: $scope.Data.ip + ':8888/vr/',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: function(obj) {
            var str = [];
            for (var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          },
          data: {
            movement: "Y" + parseInt(((speed.y) * (180) / (40)) + 800) + 'm' //map the value
          }
        }).success(function() {
          nearzeroy = 0;
        });

      }
    }
    if (Math.abs(speed.x - oldspeed.x) > 0.01) {
      //console.log("changed x , move " + speed.x);
      if (parseInt(speed.x * (180) / (32)) == 0) {
        if (speed.x > 0.01)
          nearzerox += speed.x;
      } else {
        $http({
          method: 'POST',
          url: $scope.Data.ip + ':8888/vr/',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: function(obj) {
            var str = [];
            for (var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          },
          data: {
            movement: "X" + parseInt(((speed.x + nearzerox) * (180) / (40)) + 400) + 'm' //map the value
          }
        }).success(function() {
          nearzerox = 0;
        });

      }
    }
    if (Math.abs(speed.z - oldspeed.z) > 0.01) {
      // keep the 'near zero' values, and send them within the first >1 value
      if (parseInt(speed.z * (180) / (32)) == 0) {
        if (speed.z > 0.01)
          nearzeroz += speed.z;
      } else {
        $http({
          method: 'POST',
          url: $scope.Data.ip + ':8888/vr/',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: function(obj) {
            var str = [];
            for (var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          },
          data: {
            movement: "Z" + parseInt(((speed.z + nearzeroz) * (180) / (40))) + 'm' //map the value
          }
        }).success(function() {
          nearzeroz = 0;
        });

      }
    }
    oldspeed = speed;
  };

  function onError() {
    console.log('onError!');
  };

  var options = {
    frequency: 10
  };

  $ionicPlatform.ready(function() {
    var watchID = navigator.gyroscope.watchAngularSpeed(onSuccess, onError, options);
  });


  $scope.getFirstStream = function() {
    return $scope.Data.ip + ':8080';
  };
  $scope.getSecondStream = function() {
    return $scope.Data.ip + ':8081';
  };
  $ionicModal.fromTemplateUrl('templates/settings.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.settingsModal = modal;
  });
  $scope.openSettingsModal = function() {
    $scope.settingsModal.show();
  };
  $scope.closeSettingsModal = function() {
    $scope.settingsModal.hide();
  };

  $scope.Move = function() {
    Vibrate(50);
    $scope.Data.moveStarFighter = !$scope.Data.moveStarFighter;
  };

  $scope.planetVibrate = function() {
    Vibrate(50);
  };

  function Vibrate(input) {
    $ionicPlatform.ready(function() {
      $cordovaVibration.vibrate(input);
    });
  };

  function readDeviceOrientation() {
    if (Math.abs(window.orientation) === 90) {
      // Landscape
      Vibrate(50);
      $scope.Data.landscapeMode = true;
      $scope.$apply();
    } else {
      // Portrait
      Vibrate(50);
      $scope.Data.landscapeMode = false;
      $scope.Data.stereoEffect = true;
      $scope.Data.moveStarFighter = false;
      $scope.$apply();
    }
  };
  window.addEventListener('orientationchange', readDeviceOrientation, false);
})
