// Generated by CoffeeScript 1.7.1
(function() {
  angular.module('calendarModule').constant('coolCalendarConfig', {
    useIsoweek: true,
    height: 360,
    dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    templateUrl: 'Calendar/views/calendarTpl.html'
  }).factory('weeksOfMonth', [
    'coolCalendarConfig', function(coolCalendarConfig) {
      return function(date) {
        var calendarMonthDates, calendarMonthFirstDate, calendarMonthLastDate, calendarMonthWeeks, dateIndex, day, i, j, monthFirstDate, monthLastDate, selectedDay, week, weekDay, weeks, _i, _j, _ref;
        selectedDay = moment(date);
        monthFirstDate = angular.copy(selectedDay).startOf('month');
        monthLastDate = angular.copy(selectedDay).endOf('month');
        if (coolCalendarConfig.useIsoweek) {
          calendarMonthFirstDate = angular.copy(monthFirstDate).startOf('isoWeek');
          calendarMonthLastDate = angular.copy(monthLastDate).endOf('isoWeek');
        } else {
          calendarMonthFirstDate = angular.copy(monthFirstDate).startOf('week');
          calendarMonthLastDate = angular.copy(monthLastDate).endOf('week');
        }
        calendarMonthDates = angular.copy(calendarMonthFirstDate).twix(calendarMonthLastDate).count("days");
        calendarMonthWeeks = calendarMonthDates / 7;
        weeks = [];
        dateIndex = angular.copy(calendarMonthFirstDate);
        for (i = _i = 0, _ref = calendarMonthWeeks - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          week = [];
          for (j = _j = 0; _j <= 6; j = ++_j) {
            weekDay = {};
            day = angular.copy(dateIndex);
            dateIndex.add('days', 1);
            weekDay.day = day;
            weekDay.isInCurrentMonth = day.month() === selectedDay.month() ? true : false;
            weekDay.isToday = day.isSame(moment(), 'day') ? true : false;
            week.push(weekDay);
          }
          weeks.push(week);
        }
        return weeks;
      };
    }
  ]).directive('coolCalendar', [
    '$log', 'coolCalendarConfig', 'weeksOfMonth', function($log, coolCalendarConfig, weeksOfMonth) {
      return {
        restrict: 'EA',
        replace: true,
        templateUrl: coolCalendarConfig.templateUrl,
        scope: true,
        link: function($scope, $element, $attrs) {
          var sunday;
          $scope.coolCalendarConfig = coolCalendarConfig;
          if ($scope.coolCalendarConfig.useIsoweek) {
            $scope.dayNames = angular.copy($scope.coolCalendarConfig.dayNames);
          } else {
            $scope.dayNames = angular.copy($scope.coolCalendarConfig.dayNames);
            sunday = $scope.dayNames.pop();
            $scope.dayNames.unshift(sunday);
          }
          $scope.height = $scope.coolCalendarConfig.height;
          $scope.calendarStyle = {
            "height": $scope.height + "px"
          };
          $scope.rowStyle = {
            "height": ($scope.height - 60) / 5 + "px"
          };
          $scope.selectedDay = new Date();
          return $scope.weeks = weeksOfMonth($scope.selectedDay);
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=calendarDirectives.map
