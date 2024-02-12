"use strict"; //FixIn: 9.8.0.3

/**
 * Main _wpbc JS object
 */

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _wpbc = function (obj, $) {
  // Secure parameters for Ajax	------------------------------------------------------------------------------------
  var p_secure = obj.security_obj = obj.security_obj || {
    user_id: 0,
    nonce: '',
    locale: ''
  };

  obj.set_secure_param = function (param_key, param_val) {
    p_secure[param_key] = param_val;
  };

  obj.get_secure_param = function (param_key) {
    return p_secure[param_key];
  }; // Calendars 	----------------------------------------------------------------------------------------------------


  var p_calendars = obj.calendars_obj = obj.calendars_obj || {// sort            : "booking_id",
    // sort_type       : "DESC",
    // page_num        : 1,
    // page_items_count: 10,
    // create_date     : "",
    // keyword         : "",
    // source          : ""
  };
  /**
   *  Check if calendar for specific booking resource defined   ::   true | false
   *
   * @param {string|int} resource_id
   * @returns {boolean}
   */

  obj.calendar__is_defined = function (resource_id) {
    return 'undefined' !== typeof p_calendars['calendar_' + resource_id];
  };
  /**
   *  Create Calendar initializing
   *
   * @param {string|int} resource_id
   */


  obj.calendar__init = function (resource_id) {
    p_calendars['calendar_' + resource_id] = {};
    p_calendars['calendar_' + resource_id]['id'] = resource_id;
    p_calendars['calendar_' + resource_id]['pending_days_selectable'] = false;
  };
  /**
   * Set params for all  calendars
   *
   * @param {object} calendars_obj		Object { calendar_1: {} }
   * 												 calendar_3: {}, ... }
   */


  obj.calendars_all__set = function (calendars_obj) {
    p_calendars = calendars_obj;
  };
  /**
   * Get bookings in all calendars
   *
   * @returns {object|{}}
   */


  obj.calendars_all__get = function () {
    return p_calendars;
  };
  /**
   * Get calendar object   ::   { id: 1, … }
   *
   * @param {string|int} resource_id				  '2'
   * @returns {object|boolean}					{ id: 2 ,… }
   */


  obj.calendar__get_parameters = function (resource_id) {
    if (obj.calendar__is_defined(resource_id)) {
      return p_calendars['calendar_' + resource_id];
    } else {
      return false;
    }
  };
  /**
   * Set calendar object   ::   { dates:  Object { "2023-07-21": {…}, "2023-07-22": {…}, "2023-07-23": {…}, … }
   *
   * if calendar object  not defined, then  it's will be defined and ID set
   * if calendar exist, then  system set  as new or overwrite only properties from calendar_property_obj parameter,  but other properties will be existed and not overwrite, like 'id'
   *
   * @param {string|int} resource_id				  '2'
   * @param {object} calendar_property_obj					  {  dates:  Object { "2023-07-21": {…}, "2023-07-22": {…}, "2023-07-23": {…}, … }  }
   * @param {boolean} is_complete_overwrite		  if 'true' (default: 'false'),  then  only overwrite or add  new properties in  calendar_property_obj
   * @returns {*}
   *
   * Examples:
   *
   * Common usage in PHP:
   *   			echo "  _wpbc.calendar__set(  " .intval( $resource_id ) . ", { 'dates': " . wp_json_encode( $availability_per_days_arr ) . " } );";
   */


  obj.calendar__set_parameters = function (resource_id, calendar_property_obj) {
    var is_complete_overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!obj.calendar__is_defined(resource_id) || true === is_complete_overwrite) {
      obj.calendar__init(resource_id);
    }

    for (var prop_name in calendar_property_obj) {
      p_calendars['calendar_' + resource_id][prop_name] = calendar_property_obj[prop_name];
    }

    return p_calendars['calendar_' + resource_id];
  };
  /**
   * Set property  to  calendar
   * @param resource_id	"1"
   * @param prop_name		name of property
   * @param prop_value	value of property
   * @returns {*}			calendar object
   */


  obj.calendar__set_param_value = function (resource_id, prop_name, prop_value) {
    if (!obj.calendar__is_defined(resource_id)) {
      obj.calendar__init(resource_id);
    }

    p_calendars['calendar_' + resource_id][prop_name] = prop_value;
    return p_calendars['calendar_' + resource_id];
  };
  /**
   *  Get calendar property value   	::   mixed | null
   *
   * @param {string|int}  resource_id		'1'
   * @param {string} prop_name			'selection_mode'
   * @returns {*|null}					mixed | null
   */


  obj.calendar__get_param_value = function (resource_id, prop_name) {
    if (obj.calendar__is_defined(resource_id) && 'undefined' !== typeof p_calendars['calendar_' + resource_id][prop_name]) {
      return p_calendars['calendar_' + resource_id][prop_name];
    }

    return null; // If some property not defined, then null;
  }; // -----------------------------------------------------------------------------------------------------------------
  // Bookings 	----------------------------------------------------------------------------------------------------


  var p_bookings = obj.bookings_obj = obj.bookings_obj || {// calendar_1: Object {
    //						   id:     1
    //						 , dates:  Object { "2023-07-21": {…}, "2023-07-22": {…}, "2023-07-23": {…}, …
    // }
  };
  /**
   *  Check if bookings for specific booking resource defined   ::   true | false
   *
   * @param {string|int} resource_id
   * @returns {boolean}
   */

  obj.bookings_in_calendar__is_defined = function (resource_id) {
    return 'undefined' !== typeof p_bookings['calendar_' + resource_id];
  };
  /**
   * Get bookings calendar object   ::   { id: 1 , dates:  Object { "2023-07-21": {…}, "2023-07-22": {…}, "2023-07-23": {…}, … }
   *
   * @param {string|int} resource_id				  '2'
   * @returns {object|boolean}					{ id: 2 , dates:  Object { "2023-07-21": {…}, "2023-07-22": {…}, "2023-07-23": {…}, … }
   */


  obj.bookings_in_calendar__get = function (resource_id) {
    if (obj.bookings_in_calendar__is_defined(resource_id)) {
      return p_bookings['calendar_' + resource_id];
    } else {
      return false;
    }
  };
  /**
   * Set bookings calendar object   ::   { dates:  Object { "2023-07-21": {…}, "2023-07-22": {…}, "2023-07-23": {…}, … }
   *
   * if calendar object  not defined, then  it's will be defined and ID set
   * if calendar exist, then  system set  as new or overwrite only properties from calendar_obj parameter,  but other properties will be existed and not overwrite, like 'id'
   *
   * @param {string|int} resource_id				  '2'
   * @param {object} calendar_obj					  {  dates:  Object { "2023-07-21": {…}, "2023-07-22": {…}, "2023-07-23": {…}, … }  }
   * @returns {*}
   *
   * Examples:
   *
   * Common usage in PHP:
   *   			echo "  _wpbc.bookings_in_calendar__set(  " .intval( $resource_id ) . ", { 'dates': " . wp_json_encode( $availability_per_days_arr ) . " } );";
   */


  obj.bookings_in_calendar__set = function (resource_id, calendar_obj) {
    if (!obj.bookings_in_calendar__is_defined(resource_id)) {
      p_bookings['calendar_' + resource_id] = {};
      p_bookings['calendar_' + resource_id]['id'] = resource_id;
    }

    for (var prop_name in calendar_obj) {
      p_bookings['calendar_' + resource_id][prop_name] = calendar_obj[prop_name];
    }

    return p_bookings['calendar_' + resource_id];
  }; // Dates

  /**
   *  Get bookings data for ALL Dates in calendar   ::   false | { "2023-07-22": {…}, "2023-07-23": {…}, … }
   *
   * @param {string|int} resource_id			'1'
   * @returns {object|boolean}				false | Object {
  															"2023-07-24": Object { ['summary']['status_for_day']: "available", day_availability: 1, max_capacity: 1, … }
  															"2023-07-26": Object { ['summary']['status_for_day']: "full_day_booking", ['summary']['status_for_bookings']: "pending", day_availability: 0, … }
  															"2023-07-29": Object { ['summary']['status_for_day']: "resource_availability", day_availability: 0, max_capacity: 1, … }
  															"2023-07-30": {…}, "2023-07-31": {…}, …
  														}
   */


  obj.bookings_in_calendar__get_dates = function (resource_id) {
    if (obj.bookings_in_calendar__is_defined(resource_id) && 'undefined' !== typeof p_bookings['calendar_' + resource_id]['dates']) {
      return p_bookings['calendar_' + resource_id]['dates'];
    }

    return false; // If some property not defined, then false;
  };
  /**
   * Set bookings dates in calendar object   ::    { "2023-07-21": {…}, "2023-07-22": {…}, "2023-07-23": {…}, … }
   *
   * if calendar object  not defined, then  it's will be defined and 'id', 'dates' set
   * if calendar exist, then system add a  new or overwrite only dates from dates_obj parameter,
   * but other dates not from parameter dates_obj will be existed and not overwrite.
   *
   * @param {string|int} resource_id				  '2'
   * @param {object} dates_obj					  { "2023-07-21": {…}, "2023-07-22": {…}, "2023-07-23": {…}, … }
   * @param {boolean} is_complete_overwrite		  if false,  then  only overwrite or add  dates from 	dates_obj
   * @returns {*}
   *
   * Examples:
   *   			_wpbc.bookings_in_calendar__set_dates( resource_id, { "2023-07-21": {…}, "2023-07-22": {…}, … }  );		<-   overwrite ALL dates
   *   			_wpbc.bookings_in_calendar__set_dates( resource_id, { "2023-07-22": {…} },  false  );					<-   add or overwrite only  	"2023-07-22": {}
   *
   * Common usage in PHP:
   *   			echo "  _wpbc.bookings_in_calendar__set_dates(  " . intval( $resource_id ) . ",  " . wp_json_encode( $availability_per_days_arr ) . "  );  ";
   */


  obj.bookings_in_calendar__set_dates = function (resource_id, dates_obj) {
    var is_complete_overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (!obj.bookings_in_calendar__is_defined(resource_id)) {
      obj.bookings_in_calendar__set(resource_id, {
        'dates': {}
      });
    }

    if ('undefined' === typeof p_bookings['calendar_' + resource_id]['dates']) {
      p_bookings['calendar_' + resource_id]['dates'] = {};
    }

    if (is_complete_overwrite) {
      // Complete overwrite all  booking dates
      p_bookings['calendar_' + resource_id]['dates'] = dates_obj;
    } else {
      // Add only  new or overwrite exist booking dates from  parameter. Booking dates not from  parameter  will  be without chnanges
      for (var prop_name in dates_obj) {
        p_bookings['calendar_' + resource_id]['dates'][prop_name] = dates_obj[prop_name];
      }
    }

    return p_bookings['calendar_' + resource_id];
  };
  /**
   *  Get bookings data for specific date in calendar   ::   false | { day_availability: 1, ... }
   *
   * @param {string|int} resource_id			'1'
   * @param {string} sql_class_day			'2023-07-21'
   * @returns {object|boolean}				false | {
  														day_availability: 4
  														max_capacity: 4															//  >= Business Large
  														2: Object { is_day_unavailable: false, _day_status: "available" }
  														10: Object { is_day_unavailable: false, _day_status: "available" }		//  >= Business Large ...
  														11: Object { is_day_unavailable: false, _day_status: "available" }
  														12: Object { is_day_unavailable: false, _day_status: "available" }
  													}
   */


  obj.bookings_in_calendar__get_for_date = function (resource_id, sql_class_day) {
    if (obj.bookings_in_calendar__is_defined(resource_id) && 'undefined' !== typeof p_bookings['calendar_' + resource_id]['dates'] && 'undefined' !== typeof p_bookings['calendar_' + resource_id]['dates'][sql_class_day]) {
      return p_bookings['calendar_' + resource_id]['dates'][sql_class_day];
    }

    return false; // If some property not defined, then false;
  }; // Any  PARAMS   in bookings

  /**
   * Set property  to  booking
   * @param resource_id	"1"
   * @param prop_name		name of property
   * @param prop_value	value of property
   * @returns {*}			booking object
   */


  obj.booking__set_param_value = function (resource_id, prop_name, prop_value) {
    if (!obj.bookings_in_calendar__is_defined(resource_id)) {
      p_bookings['calendar_' + resource_id] = {};
      p_bookings['calendar_' + resource_id]['id'] = resource_id;
    }

    p_bookings['calendar_' + resource_id][prop_name] = prop_value;
    return p_bookings['calendar_' + resource_id];
  };
  /**
   *  Get booking property value   	::   mixed | null
   *
   * @param {string|int}  resource_id		'1'
   * @param {string} prop_name			'selection_mode'
   * @returns {*|null}					mixed | null
   */


  obj.booking__get_param_value = function (resource_id, prop_name) {
    if (obj.bookings_in_calendar__is_defined(resource_id) && 'undefined' !== typeof p_bookings['calendar_' + resource_id][prop_name]) {
      return p_bookings['calendar_' + resource_id][prop_name];
    }

    return null; // If some property not defined, then null;
  };
  /**
   * Set bookings for all  calendars
   *
   * @param {object} calendars_obj		Object { calendar_1: { id: 1, dates: Object { "2023-07-22": {…}, "2023-07-23": {…}, "2023-07-24": {…}, … } }
   * 												 calendar_3: {}, ... }
   */


  obj.bookings_in_calendars__set_all = function (calendars_obj) {
    p_bookings = calendars_obj;
  };
  /**
   * Get bookings in all calendars
   *
   * @returns {object|{}}
   */


  obj.bookings_in_calendars__get_all = function () {
    return p_bookings;
  }; // -----------------------------------------------------------------------------------------------------------------
  // Seasons 	----------------------------------------------------------------------------------------------------


  var p_seasons = obj.seasons_obj = obj.seasons_obj || {// calendar_1: Object {
    //						   id:     1
    //						 , dates:  Object { "2023-07-21": {…}, "2023-07-22": {…}, "2023-07-23": {…}, …
    // }
  };
  /**
   * Add season names for dates in calendar object   ::    { "2023-07-21": [ 'wpbc_season_september_2023', 'wpbc_season_september_2024' ], "2023-07-22": [...], ... }
   *
   *
   * @param {string|int} resource_id				  '2'
   * @param {object} dates_obj					  { "2023-07-21": {…}, "2023-07-22": {…}, "2023-07-23": {…}, … }
   * @param {boolean} is_complete_overwrite		  if false,  then  only  add  dates from 	dates_obj
   * @returns {*}
   *
   * Examples:
   *   			_wpbc.seasons__set( resource_id, { "2023-07-21": [ 'wpbc_season_september_2023', 'wpbc_season_september_2024' ], "2023-07-22": [...], ... }  );
   */

  obj.seasons__set = function (resource_id, dates_obj) {
    var is_complete_overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if ('undefined' === typeof p_seasons['calendar_' + resource_id]) {
      p_seasons['calendar_' + resource_id] = {};
    }

    if (is_complete_overwrite) {
      // Complete overwrite all  season dates
      p_seasons['calendar_' + resource_id] = dates_obj;
    } else {
      // Add only  new or overwrite exist booking dates from  parameter. Booking dates not from  parameter  will  be without chnanges
      for (var prop_name in dates_obj) {
        if ('undefined' === typeof p_seasons['calendar_' + resource_id][prop_name]) {
          p_seasons['calendar_' + resource_id][prop_name] = [];
        }

        for (var season_name_key in dates_obj[prop_name]) {
          p_seasons['calendar_' + resource_id][prop_name].push(dates_obj[prop_name][season_name_key]);
        }
      }
    }

    return p_seasons['calendar_' + resource_id];
  };
  /**
   *  Get bookings data for specific date in calendar   ::   [] | [ 'wpbc_season_september_2023', 'wpbc_season_september_2024' ]
   *
   * @param {string|int} resource_id			'1'
   * @param {string} sql_class_day			'2023-07-21'
   * @returns {object|boolean}				[]  |  [ 'wpbc_season_september_2023', 'wpbc_season_september_2024' ]
   */


  obj.seasons__get_for_date = function (resource_id, sql_class_day) {
    if ('undefined' !== typeof p_seasons['calendar_' + resource_id] && 'undefined' !== typeof p_seasons['calendar_' + resource_id][sql_class_day]) {
      return p_seasons['calendar_' + resource_id][sql_class_day];
    }

    return []; // If not defined, then [];
  }; // Other parameters 			------------------------------------------------------------------------------------


  var p_other = obj.other_obj = obj.other_obj || {};

  obj.set_other_param = function (param_key, param_val) {
    p_other[param_key] = param_val;
  };

  obj.get_other_param = function (param_key) {
    return p_other[param_key];
  }; // -----------------------------------------------------------------------------------------------------------------


  return obj;
}(_wpbc || {}, jQuery);
/**
 * Deep Clone of object or array
 *
 * @param obj
 * @returns {any}
 */


function wpbc_clone_obj(obj) {
  return JSON.parse(JSON.stringify(obj));
} // ---------------------------------------------------------------------------------------------------------------------
// C O D E   Tricks
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Order or child booking resources saved here:  	_wpbc.booking__get_param_value( resource_id, 'resources_id_arr__in_dates' )		[2,10,12,11]
 */

/**
 * How to check  booked times on  specific date: ?
 *
			_wpbc.bookings_in_calendar__get_for_date(2,'2023-08-21');

			console.log(
						_wpbc.bookings_in_calendar__get_for_date(2,'2023-08-21')[2].booked_time_slots.merged_seconds,
						_wpbc.bookings_in_calendar__get_for_date(2,'2023-08-21')[10].booked_time_slots.merged_seconds,
						_wpbc.bookings_in_calendar__get_for_date(2,'2023-08-21')[11].booked_time_slots.merged_seconds,
						_wpbc.bookings_in_calendar__get_for_date(2,'2023-08-21')[12].booked_time_slots.merged_seconds
					);
 *  OR
			console.log(
						_wpbc.bookings_in_calendar__get_for_date(2,'2023-08-21')[2].booked_time_slots.merged_readable,
						_wpbc.bookings_in_calendar__get_for_date(2,'2023-08-21')[10].booked_time_slots.merged_readable,
						_wpbc.bookings_in_calendar__get_for_date(2,'2023-08-21')[11].booked_time_slots.merged_readable,
						_wpbc.bookings_in_calendar__get_for_date(2,'2023-08-21')[12].booked_time_slots.merged_readable
					);
 *
 */

/**
 * Days selection:
 * 					wpbc_calendar__unselect_all_dates( resource_id );
 *
 *
 *	var inst= wpbc_calendar__get_inst(3); inst.dates=[]; wpbc__calendar__on_select_days('22.09.2023 - 23.09.2023' , {'resource_id':3} , inst);  inst.stayOpen = false;jQuery.datepick._updateDatepick( inst );
 *  if it doesn't work  in 100% situations. check wpbc_select_days_in_calendar(3, [ [ 2023, "09", 26 ], [ 2023, "08", 25 ]]);
 */
// ---------------------------------------------------------------------------------------------------------------------
// C A L E N D A R
// ---------------------------------------------------------------------------------------------------------------------

/**
 *  Show WPBC Calendar
 *
 * @param resource_id			- resource ID
 * @returns {boolean}
 */


function wpbc_calendar_show(resource_id) {
  // If no calendar HTML tag,  then  exit
  if (0 === jQuery('#calendar_booking' + resource_id).length) {
    return false;
  } // If the calendar with the same Booking resource is activated already, then exit.


  if (true === jQuery('#calendar_booking' + resource_id).hasClass('hasDatepick')) {
    return false;
  } // -----------------------------------------------------------------------------------------------------------------
  // Days selection
  // -----------------------------------------------------------------------------------------------------------------


  var local__is_range_select = false;
  var local__multi_days_select_num = 365; // multiple | fixed

  if ('dynamic' === _wpbc.calendar__get_param_value(resource_id, 'days_select_mode')) {
    local__is_range_select = true;
    local__multi_days_select_num = 0;
  }

  if ('single' === _wpbc.calendar__get_param_value(resource_id, 'days_select_mode')) {
    local__multi_days_select_num = 0;
  } // -----------------------------------------------------------------------------------------------------------------
  // Min - Max days to scroll/show
  // -----------------------------------------------------------------------------------------------------------------


  var local__min_date = 0;

  var local__max_date = _wpbc.calendar__get_param_value(resource_id, 'booking_max_monthes_in_calendar'); //local__max_date = new Date(2024, 5, 28);  It is here issue of not selectable dates, but some dates showing in calendar as available, but we can not select it.
  // Define last day in calendar (as a last day of month (and not date, which is related to actual 'Today' date).
  // E.g. if today is 2023-09-25, and we set 'Number of months to scroll' as 5 months, then last day will be 2024-02-29 and not the 2024-02-25.


  var cal_last_day_in_month = jQuery.datepick._determineDate(null, local__max_date, new Date());

  cal_last_day_in_month = new Date(cal_last_day_in_month.getFullYear(), cal_last_day_in_month.getMonth() + 1, 0);
  local__max_date = cal_last_day_in_month;

  if (location.href.indexOf('page=wpbc-new') != -1 && location.href.indexOf('booking_hash') != -1 // Comment this line for ability to add  booking in past days at  Booking > Add booking page.
  ) {
    local__min_date = null;
    local__max_date = null;
  }

  var local__start_weekday = _wpbc.calendar__get_param_value(resource_id, 'booking_start_day_weeek');

  var local__number_of_months = parseInt(_wpbc.calendar__get_param_value(resource_id, 'calendar_number_of_months'));
  jQuery('#calendar_booking' + resource_id).text(''); // Remove all HTML in calendar tag
  // -----------------------------------------------------------------------------------------------------------------
  // Show calendar
  // -----------------------------------------------------------------------------------------------------------------

  jQuery('#calendar_booking' + resource_id).datepick({
    beforeShowDay: function beforeShowDay(js_date) {
      return wpbc__calendar__apply_css_to_days(js_date, {
        'resource_id': resource_id
      }, this);
    },
    onSelect: function onSelect(string_dates, js_dates_arr) {
      /**
      *	string_dates   =   '23.08.2023 - 26.08.2023'    |    '23.08.2023 - 23.08.2023'    |    '19.09.2023, 24.08.2023, 30.09.2023'
      *  js_dates_arr   =   range: [ Date (Aug 23 2023), Date (Aug 25 2023)]     |     multiple: [ Date(Oct 24 2023), Date(Oct 20 2023), Date(Oct 16 2023) ]
      */
      return wpbc__calendar__on_select_days(string_dates, {
        'resource_id': resource_id
      }, this);
    },
    onHover: function onHover(string_date, js_date) {
      return wpbc__calendar__on_hover_days(string_date, js_date, {
        'resource_id': resource_id
      }, this);
    },
    onChangeMonthYear: function onChangeMonthYear(year, real_month, js_date__1st_day_in_month) {},
    showOn: 'both',
    numberOfMonths: local__number_of_months,
    stepMonths: 1,
    prevText: '&laquo;',
    nextText: '&raquo;',
    dateFormat: 'dd.mm.yy',
    changeMonth: false,
    changeYear: false,
    minDate: local__min_date,
    maxDate: local__max_date,
    // '1Y',
    // minDate: new Date(2020, 2, 1), maxDate: new Date(2020, 9, 31),             	// Ability to set any  start and end date in calendar
    showStatus: false,
    multiSeparator: ', ',
    closeAtTop: false,
    firstDay: local__start_weekday,
    gotoCurrent: false,
    hideIfNoPrevNext: true,
    multiSelect: local__multi_days_select_num,
    rangeSelect: local__is_range_select,
    // showWeeks: true,
    useThemeRoller: false
  }); // -----------------------------------------------------------------------------------------------------------------
  // Clear today date highlighting
  // -----------------------------------------------------------------------------------------------------------------

  setTimeout(function () {
    wpbc_calendars__clear_days_highlighting(resource_id);
  }, 500); //FixIn: 7.1.2.8
  // -----------------------------------------------------------------------------------------------------------------
  // Scroll calendar to  specific month
  // -----------------------------------------------------------------------------------------------------------------

  var start_bk_month = _wpbc.calendar__get_param_value(resource_id, 'calendar_scroll_to');

  if (false !== start_bk_month) {
    wpbc_calendar__scroll_to(resource_id, start_bk_month[0], start_bk_month[1]);
  }
}
/**
 * Apply CSS to calendar date cells
 *
 * @param date										-  JavaScript Date Obj:  		Mon Dec 11 2023 00:00:00 GMT+0200 (Eastern European Standard Time)
 * @param calendar_params_arr						-  Calendar Settings Object:  	{
 *																  						"resource_id": 4
 *																					}
 * @param datepick_this								- this of datepick Obj
 * @returns {(*|string)[]|(boolean|string)[]}		- [ {true -available | false - unavailable}, 'CSS classes for calendar day cell' ]
 */


function wpbc__calendar__apply_css_to_days(date, calendar_params_arr, datepick_this) {
  var today_date = new Date(wpbc_today[0], parseInt(wpbc_today[1]) - 1, wpbc_today[2], 0, 0, 0); // Today JS_Date_Obj.

  var class_day = wpbc__get__td_class_date(date); // '1-9-2023'

  var sql_class_day = wpbc__get__sql_class_date(date); // '2023-01-09'

  var resource_id = 'undefined' !== typeof calendar_params_arr['resource_id'] ? calendar_params_arr['resource_id'] : '1'; // '1'
  // Get Data --------------------------------------------------------------------------------------------------------

  var date_bookings_obj = _wpbc.bookings_in_calendar__get_for_date(resource_id, sql_class_day); // Array with CSS classes for date ---------------------------------------------------------------------------------


  var css_classes__for_date = [];
  css_classes__for_date.push('sql_date_' + sql_class_day); //  'sql_date_2023-07-21'

  css_classes__for_date.push('cal4date-' + class_day); //  'cal4date-7-21-2023'

  css_classes__for_date.push('wpbc_weekday_' + date.getDay()); //  'wpbc_weekday_4'

  var is_day_selectable = false; // If something not defined,  then  this date closed ---------------------------------------------------------------

  if (false === date_bookings_obj) {
    css_classes__for_date.push('date_user_unavailable');
    return [is_day_selectable, css_classes__for_date.join(' ')];
  } // -----------------------------------------------------------------------------------------------------------------
  //   date_bookings_obj  - Defined.            Dates can be selectable.
  // -----------------------------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------------------
  // Add season names to the day CSS classes -- it is required for correct  work  of conditional fields --------------


  var season_names_arr = _wpbc.seasons__get_for_date(resource_id, sql_class_day);

  for (var season_key in season_names_arr) {
    css_classes__for_date.push(season_names_arr[season_key]); //  'wpdevbk_season_september_2023'
  } // -----------------------------------------------------------------------------------------------------------------
  // Cost Rate -------------------------------------------------------------------------------------------------------


  css_classes__for_date.push('rate_' + date_bookings_obj[resource_id]['date_cost_rate'].toString().replace(/[\.\s]/g, '_')); //  'rate_99_00' -> 99.00

  if (parseInt(date_bookings_obj['day_availability']) > 0) {
    is_day_selectable = true;
    css_classes__for_date.push('date_available');
    css_classes__for_date.push('reserved_days_count' + parseInt(date_bookings_obj['max_capacity'] - date_bookings_obj['day_availability']));
  } else {
    is_day_selectable = false;
    css_classes__for_date.push('date_user_unavailable');
  }

  switch (date_bookings_obj['summary']['status_for_day']) {
    case 'available':
      break;

    case 'time_slots_booking':
      css_classes__for_date.push('timespartly', 'times_clock');
      break;

    case 'full_day_booking':
      css_classes__for_date.push('full_day_booking');
      break;

    case 'season_filter':
      css_classes__for_date.push('date_user_unavailable', 'season_unavailable');
      date_bookings_obj['summary']['status_for_bookings'] = ''; // Reset booking status color for possible old bookings on this date

      break;

    case 'resource_availability':
      css_classes__for_date.push('date_user_unavailable', 'resource_unavailable');
      date_bookings_obj['summary']['status_for_bookings'] = ''; // Reset booking status color for possible old bookings on this date

      break;

    case 'weekday_unavailable':
      css_classes__for_date.push('date_user_unavailable', 'weekday_unavailable');
      date_bookings_obj['summary']['status_for_bookings'] = ''; // Reset booking status color for possible old bookings on this date

      break;

    case 'from_today_unavailable':
      css_classes__for_date.push('date_user_unavailable', 'from_today_unavailable');
      date_bookings_obj['summary']['status_for_bookings'] = ''; // Reset booking status color for possible old bookings on this date

      break;

    case 'limit_available_from_today':
      css_classes__for_date.push('date_user_unavailable', 'limit_available_from_today');
      date_bookings_obj['summary']['status_for_bookings'] = ''; // Reset booking status color for possible old bookings on this date

      break;

    case 'change_over':
      /*
       *
      //  check_out_time_date2approve 	 	check_in_time_date2approve
      //  check_out_time_date2approve 	 	check_in_time_date_approved
      //  check_in_time_date2approve 		 	check_out_time_date_approved
      //  check_out_time_date_approved 	 	check_in_time_date_approved
       */
      css_classes__for_date.push('timespartly', 'check_in_time', 'check_out_time');
      break;

    case 'check_in':
      css_classes__for_date.push('timespartly', 'check_in_time');

      if ('pending' == date_bookings_obj['summary']['status_for_bookings']) {
        css_classes__for_date.push('check_in_time_date2approve');
      }

      if ('approved' == date_bookings_obj['summary']['status_for_bookings']) {
        css_classes__for_date.push('check_in_time_date_approved');
      }

      break;

    case 'check_out':
      css_classes__for_date.push('timespartly', 'check_out_time');

      if ('pending' == date_bookings_obj['summary']['status_for_bookings']) {
        css_classes__for_date.push('check_out_time_date2approve');
      }

      if ('approved' == date_bookings_obj['summary']['status_for_bookings']) {
        css_classes__for_date.push('check_out_time_date_approved');
      }

      break;

    default:
      // mixed statuses: 'change_over check_out' .... variations.... check more in 		function wpbc_get_availability_per_days_arr()
      date_bookings_obj['summary']['status_for_day'] = 'available';
  }

  if ('available' != date_bookings_obj['summary']['status_for_day']) {
    var is_set_pending_days_selectable = _wpbc.calendar__get_param_value(resource_id, 'pending_days_selectable'); // set pending days selectable          //FixIn: 8.6.1.18


    switch (date_bookings_obj['summary']['status_for_bookings']) {
      case '':
        // Usually  it's means that day  is available or unavailable without the bookings
        break;

      case 'pending':
        css_classes__for_date.push('date2approve');
        is_day_selectable = is_day_selectable ? true : is_set_pending_days_selectable;
        break;

      case 'approved':
        css_classes__for_date.push('date_approved');
        break;
      // Situations for "change-over" days: ----------------------------------------------------------------------

      case 'pending_pending':
        css_classes__for_date.push('check_out_time_date2approve', 'check_in_time_date2approve');
        is_day_selectable = is_day_selectable ? true : is_set_pending_days_selectable;
        break;

      case 'pending_approved':
        css_classes__for_date.push('check_out_time_date2approve', 'check_in_time_date_approved');
        is_day_selectable = is_day_selectable ? true : is_set_pending_days_selectable;
        break;

      case 'approved_pending':
        css_classes__for_date.push('check_out_time_date_approved', 'check_in_time_date2approve');
        is_day_selectable = is_day_selectable ? true : is_set_pending_days_selectable;
        break;

      case 'approved_approved':
        css_classes__for_date.push('check_out_time_date_approved', 'check_in_time_date_approved');
        break;

      default:
    }
  }

  return [is_day_selectable, css_classes__for_date.join(' ')];
}
/**
 * Mouseover calendar date cells
 *
 * @param string_date
 * @param date										-  JavaScript Date Obj:  		Mon Dec 11 2023 00:00:00 GMT+0200 (Eastern European Standard Time)
 * @param calendar_params_arr						-  Calendar Settings Object:  	{
 *																  						"resource_id": 4
 *																					}
 * @param datepick_this								- this of datepick Obj
 * @returns {boolean}
 */


function wpbc__calendar__on_hover_days(string_date, date, calendar_params_arr, datepick_this) {
  if (null === date) {
    return false;
  }

  var class_day = wpbc__get__td_class_date(date); // '1-9-2023'

  var sql_class_day = wpbc__get__sql_class_date(date); // '2023-01-09'

  var resource_id = 'undefined' !== typeof calendar_params_arr['resource_id'] ? calendar_params_arr['resource_id'] : '1'; // '1'
  // Get Data --------------------------------------------------------------------------------------------------------

  var date_booking_obj = _wpbc.bookings_in_calendar__get_for_date(resource_id, sql_class_day); // {...}


  if (!date_booking_obj) {
    return false;
  } // T o o l t i p s -------------------------------------------------------------------------------------------------


  var tooltip_text = '';

  if (date_booking_obj['summary']['tooltip_availability'].length > 0) {
    tooltip_text += date_booking_obj['summary']['tooltip_availability'];
  }

  if (date_booking_obj['summary']['tooltip_day_cost'].length > 0) {
    tooltip_text += date_booking_obj['summary']['tooltip_day_cost'];
  }

  if (date_booking_obj['summary']['tooltip_times'].length > 0) {
    tooltip_text += date_booking_obj['summary']['tooltip_times'];
  }

  if (date_booking_obj['summary']['tooltip_booking_details'].length > 0) {
    tooltip_text += date_booking_obj['summary']['tooltip_booking_details'];
  }

  wpbc_set_tooltip___for__calendar_date(tooltip_text, resource_id, class_day); //  U n h o v e r i n g    in    UNSELECTABLE_CALENDAR  ------------------------------------------------------------

  var is_unselectable_calendar = jQuery('#calendar_booking_unselectable' + resource_id).length > 0; //FixIn: 8.0.1.2

  var is_booking_form_exist = jQuery('#booking_form_div' + resource_id).length > 0;

  if (is_unselectable_calendar && !is_booking_form_exist) {
    /**
     *  Un Hover all dates in calendar (without the booking form), if only Availability Calendar here and we do not insert Booking form by mistake.
     */
    wpbc_calendars__clear_days_highlighting(resource_id); // Clear days highlighting

    var css_of_calendar = '.wpbc_only_calendar #calendar_booking' + resource_id;
    jQuery(css_of_calendar + ' .datepick-days-cell, ' + css_of_calendar + ' .datepick-days-cell a').css('cursor', 'default'); // Set cursor to Default

    return false;
  } //  D a y s    H o v e r i n g  ------------------------------------------------------------------------------------


  if (location.href.indexOf('page=wpbc') == -1 || location.href.indexOf('page=wpbc-new') > 0 || location.href.indexOf('page=wpbc-availability') > 0) {
    // The same as dates selection,  but for days hovering
    if ('function' == typeof wpbc__calendar__do_days_highlight__bs) {
      wpbc__calendar__do_days_highlight__bs(sql_class_day, date, resource_id);
    }
  }
}
/**
 * Select calendar date cells
 *
 * @param date										-  JavaScript Date Obj:  		Mon Dec 11 2023 00:00:00 GMT+0200 (Eastern European Standard Time)
 * @param calendar_params_arr						-  Calendar Settings Object:  	{
 *																  						"resource_id": 4
 *																					}
 * @param datepick_this								- this of datepick Obj
 *
 */


function wpbc__calendar__on_select_days(date, calendar_params_arr, datepick_this) {
  var resource_id = 'undefined' !== typeof calendar_params_arr['resource_id'] ? calendar_params_arr['resource_id'] : '1'; // '1'
  // Set unselectable,  if only Availability Calendar  here (and we do not insert Booking form by mistake).

  var is_unselectable_calendar = jQuery('#calendar_booking_unselectable' + resource_id).length > 0; //FixIn: 8.0.1.2

  var is_booking_form_exist = jQuery('#booking_form_div' + resource_id).length > 0;

  if (is_unselectable_calendar && !is_booking_form_exist) {
    wpbc_calendar__unselect_all_dates(resource_id); // Unselect Dates

    jQuery('.wpbc_only_calendar .popover_calendar_hover').remove(); // Hide all opened popovers

    return false;
  }

  jQuery('#date_booking' + resource_id).val(date); // Add selected dates to  hidden textarea

  if ('function' === typeof wpbc__calendar__do_days_select__bs) {
    wpbc__calendar__do_days_select__bs(date, resource_id);
  }

  wpbc_disable_time_fields_in_booking_form(resource_id); // Hook -- trigger day selection -----------------------------------------------------------------------------------

  var mouse_clicked_dates = date; // Can be: "05.10.2023 - 07.10.2023"  |  "10.10.2023 - 10.10.2023"  |

  var all_selected_dates_arr = wpbc_get__selected_dates_sql__as_arr(resource_id); // Can be: [ "2023-10-05", "2023-10-06", "2023-10-07", … ]

  jQuery(".booking_form_div").trigger("date_selected", [resource_id, mouse_clicked_dates, all_selected_dates_arr]);
} // -----------------------------------------------------------------------------------------------------------------
// T i m e    F i e l d s		start
// -----------------------------------------------------------------------------------------------------------------

/**
 * Disable time slots in booking form depend on selected dates and booked dates/times
 *
 * @param resource_id
 */


function wpbc_disable_time_fields_in_booking_form(resource_id) {
  /**
   * 	1. Get all time fields in the booking form as array  of objects
   * 					[
   * 					 	   {	jquery_option:      jQuery_Object {}
   * 								name:               'rangetime2[]'
   * 								times_as_seconds:   [ 21600, 23400 ]
   * 								value_option_24h:   '06:00 - 06:30'
   * 					     }
   * 					  ...
   * 						   {	jquery_option:      jQuery_Object {}
   * 								name:               'starttime2[]'
   * 								times_as_seconds:   [ 21600 ]
   * 								value_option_24h:   '06:00'
   *  					    }
   * 					 ]
   */
  var time_fields_obj_arr = wpbc_get__time_fields__in_booking_form__as_arr(resource_id); // 2. Get all selected dates in  SQL format  like this [ "2023-08-23", "2023-08-24", "2023-08-25", ... ]

  var selected_dates_arr = wpbc_get__selected_dates_sql__as_arr(resource_id); // 3. Get child booking resources  or single booking resource  that  exist  in dates

  var child_resources_arr = wpbc_clone_obj(_wpbc.booking__get_param_value(resource_id, 'resources_id_arr__in_dates'));
  var sql_date;
  var child_resource_id;
  var merged_seconds;
  var time_fields_obj;
  var is_intersect;
  var is_check_in; // 4. Loop  all  time Fields options

  for (var field_key in time_fields_obj_arr) {
    time_fields_obj_arr[field_key].disabled = 0; // By default this time field is not disabled

    time_fields_obj = time_fields_obj_arr[field_key]; // { times_as_seconds: [ 21600, 23400 ], value_option_24h: '06:00 - 06:30', name: 'rangetime2[]', jquery_option: jQuery_Object {}}
    // Loop  all  selected dates

    for (var i = 0; i < selected_dates_arr.length; i++) {
      // Get Date: '2023-08-18'
      sql_date = selected_dates_arr[i];
      var how_many_resources_intersected = 0; // Loop all resources ID

      for (var res_key in child_resources_arr) {
        child_resource_id = child_resources_arr[res_key]; // _wpbc.bookings_in_calendar__get_for_date(2,'2023-08-21')[12].booked_time_slots.merged_seconds		= [ "07:00:11 - 07:30:02", "10:00:11 - 00:00:00" ]
        // _wpbc.bookings_in_calendar__get_for_date(2,'2023-08-21')[2].booked_time_slots.merged_seconds			= [  [ 25211, 27002 ], [ 36011, 86400 ]  ]

        if (false !== _wpbc.bookings_in_calendar__get_for_date(resource_id, sql_date)) {
          merged_seconds = _wpbc.bookings_in_calendar__get_for_date(resource_id, sql_date)[child_resource_id].booked_time_slots.merged_seconds; // [  [ 25211, 27002 ], [ 36011, 86400 ]  ]
        } else {
          merged_seconds = [];
        }

        if (time_fields_obj.times_as_seconds.length > 1) {
          is_intersect = wpbc_is_intersect__range_time_interval([[parseInt(time_fields_obj.times_as_seconds[0]) + 20, parseInt(time_fields_obj.times_as_seconds[1]) - 20]], merged_seconds);
        } else {
          is_check_in = -1 !== time_fields_obj.name.indexOf('start');
          is_intersect = wpbc_is_intersect__one_time_interval(is_check_in ? parseInt(time_fields_obj.times_as_seconds) + 20 : parseInt(time_fields_obj.times_as_seconds) - 20, merged_seconds);
        }

        if (is_intersect) {
          how_many_resources_intersected++; // Increase
        }
      }

      if (child_resources_arr.length == how_many_resources_intersected) {
        // All resources intersected,  then  it's means that this time-slot or time must  be  Disabled, and we can  exist  from   selected_dates_arr LOOP
        time_fields_obj_arr[field_key].disabled = 1;
        break; // exist  from   Dates LOOP
      }
    }
  } // 5. Now we can disable time slot in HTML by  using  ( field.disabled == 1 ) property


  wpbc__html__time_field_options__set_disabled(time_fields_obj_arr);
  jQuery(".booking_form_div").trigger('wpbc_hook_timeslots_disabled', [resource_id, selected_dates_arr]); // Trigger hook on disabling timeslots.		Usage: 	jQuery( ".booking_form_div" ).on( 'wpbc_hook_timeslots_disabled', function ( event, bk_type, all_dates ){ ... } );		//FixIn: 8.7.11.9
}
/**
 * Is number inside /intersect  of array of intervals ?
 *
 * @param time_A		     		 25800
 * @param time_interval_B		[  [ 25211, 27002 ], [ 36011, 86400 ]  ]
 * @returns {boolean}
 */


function wpbc_is_intersect__one_time_interval(time_A, time_interval_B) {
  for (var j = 0; j < time_interval_B.length; j++) {
    if (parseInt(time_A) > parseInt(time_interval_B[j][0]) && parseInt(time_A) < parseInt(time_interval_B[j][1])) {
      return true;
    } // if ( ( parseInt( time_A ) == parseInt( time_interval_B[ j ][ 0 ] ) ) || ( parseInt( time_A ) == parseInt( time_interval_B[ j ][ 1 ] ) ) ) {
    // 			// Time A just  at  the border of interval
    // }

  }

  return false;
}
/**
 * Is these array of intervals intersected ?
 *
 * @param time_interval_A		[ [ 21600, 23400 ] ]
 * @param time_interval_B		[  [ 25211, 27002 ], [ 36011, 86400 ]  ]
 * @returns {boolean}
 */


function wpbc_is_intersect__range_time_interval(time_interval_A, time_interval_B) {
  var is_intersect;

  for (var i = 0; i < time_interval_A.length; i++) {
    for (var j = 0; j < time_interval_B.length; j++) {
      is_intersect = wpbc_intervals__is_intersected(time_interval_A[i], time_interval_B[j]);

      if (is_intersect) {
        return true;
      }
    }
  }

  return false;
}
/**
 * Get all time fields in the booking form as array  of objects
 *
 * @param resource_id
 * @returns []
 *
 * 		Example:
 * 					[
 * 					 	   {
 * 								value_option_24h:   '06:00 - 06:30'
 * 								times_as_seconds:   [ 21600, 23400 ]
 * 					 	   		jquery_option:      jQuery_Object {}
 * 								name:               'rangetime2[]'
 * 					     }
 * 					  ...
 * 						   {
 * 								value_option_24h:   '06:00'
 * 								times_as_seconds:   [ 21600 ]
 * 						   		jquery_option:      jQuery_Object {}
 * 								name:               'starttime2[]'
 *  					    }
 * 					 ]
 */


function wpbc_get__time_fields__in_booking_form__as_arr(resource_id) {
  /**
  * Fields with  []  like this   select[name="rangetime1[]"]
  * it's when we have 'multiple' in shortcode:   [select* rangetime multiple  "06:00 - 06:30" ... ]
  */
  var time_fields_arr = ['select[name="rangetime' + resource_id + '"]', 'select[name="rangetime' + resource_id + '[]"]', 'select[name="starttime' + resource_id + '"]', 'select[name="starttime' + resource_id + '[]"]', 'select[name="endtime' + resource_id + '"]', 'select[name="endtime' + resource_id + '[]"]'];
  var time_fields_obj_arr = []; // Loop all Time Fields

  for (var ctf = 0; ctf < time_fields_arr.length; ctf++) {
    var time_field = time_fields_arr[ctf];
    var time_option = jQuery(time_field + ' option'); // Loop all options in time field

    for (var j = 0; j < time_option.length; j++) {
      var jquery_option = jQuery(time_field + ' option:eq(' + j + ')');
      var value_option_seconds_arr = jquery_option.val().split('-');
      var times_as_seconds = []; // Get time as seconds

      for (var i in value_option_seconds_arr) {
        // value_option_seconds_arr[i] = '14:00 '  | ' 16:00'   (if from 'rangetime') and '16:00'  if (start/end time)
        var start_end_times_arr = value_option_seconds_arr[i].trim().split(':');
        var time_in_seconds = parseInt(start_end_times_arr[0]) * 60 * 60 + parseInt(start_end_times_arr[1]) * 60;
        times_as_seconds.push(time_in_seconds);
      }

      time_fields_obj_arr.push({
        'name': jQuery(time_field).attr('name'),
        'value_option_24h': jquery_option.val(),
        'jquery_option': jquery_option,
        'times_as_seconds': times_as_seconds
      });
    }
  }

  return time_fields_obj_arr;
}
/**
 * Disable HTML options and add booked CSS class
 *
 * @param time_fields_obj_arr      - this value is from  the func:  	wpbc_get__time_fields__in_booking_form__as_arr( resource_id )
 * 					[
 * 					 	   {	jquery_option:      jQuery_Object {}
 * 								name:               'rangetime2[]'
 * 								times_as_seconds:   [ 21600, 23400 ]
 * 								value_option_24h:   '06:00 - 06:30'
 * 	  						    disabled = 1
 * 					     }
 * 					  ...
 * 						   {	jquery_option:      jQuery_Object {}
 * 								name:               'starttime2[]'
 * 								times_as_seconds:   [ 21600 ]
 * 								value_option_24h:   '06:00'
 *   							disabled = 0
 *  					    }
 * 					 ]
 *
 */


function wpbc__html__time_field_options__set_disabled(time_fields_obj_arr) {
  var jquery_option;

  for (var i = 0; i < time_fields_obj_arr.length; i++) {
    var jquery_option = time_fields_obj_arr[i].jquery_option;

    if (1 == time_fields_obj_arr[i].disabled) {
      jquery_option.prop('disabled', true); // Make disable some options

      jquery_option.addClass('booked'); // Add "booked" CSS class
      // if this booked element selected --> then deselect  it

      if (jquery_option.prop('selected')) {
        jquery_option.prop('selected', false);
        jquery_option.parent().find('option:not([disabled]):first').prop('selected', true).trigger("change");
      }
    } else {
      jquery_option.prop('disabled', false); // Make active all times

      jquery_option.removeClass('booked'); // Remove class "booked"
    }
  }
}
/**
 * Check if this time_range | Time_Slot is Full Day  booked
 *
 * @param timeslot_arr_in_seconds		[ 36011, 86400 ]
 * @returns {boolean}
 */


function wpbc_is_this_timeslot__full_day_booked(timeslot_arr_in_seconds) {
  if (timeslot_arr_in_seconds.length > 1 && parseInt(timeslot_arr_in_seconds[0]) < 30 && parseInt(timeslot_arr_in_seconds[1]) > 24 * 60 * 60 - 30) {
    return true;
  }

  return false;
} // -----------------------------------------------------------------------------------------------------------------
// S e l e c t e d    D a t e s  /  T i m e - F i e l d s
// -----------------------------------------------------------------------------------------------------------------

/**
 *  Get all selected dates in SQL format like this [ "2023-08-23", "2023-08-24" , ... ]
 *
 * @param resource_id
 * @returns {[]}			[ "2023-08-23", "2023-08-24", "2023-08-25", "2023-08-26", "2023-08-27", "2023-08-28", "2023-08-29" ]
 */


function wpbc_get__selected_dates_sql__as_arr(resource_id) {
  var selected_dates_arr = [];
  selected_dates_arr = jQuery('#date_booking' + resource_id).val().split(',');

  for (var i in selected_dates_arr) {
    selected_dates_arr[i] = selected_dates_arr[i].trim();
    selected_dates_arr[i] = selected_dates_arr[i].split('.');

    if (selected_dates_arr[i].length > 1) {
      selected_dates_arr[i] = selected_dates_arr[i][2] + '-' + selected_dates_arr[i][1] + '-' + selected_dates_arr[i][0];
    }
  } // Remove empty elements from an array


  selected_dates_arr = selected_dates_arr.filter(function (n) {
    return parseInt(n);
  });
  selected_dates_arr.sort();
  return selected_dates_arr;
}
/**
 * Get all time fields in the booking form as array  of objects
 *
 * @param resource_id
 * @returns []
 *
 * 		Example:
 * 					[
 * 					 	   {
 * 								value_option_24h:   '06:00 - 06:30'
 * 								times_as_seconds:   [ 21600, 23400 ]
 * 					 	   		jquery_option:      jQuery_Object {}
 * 								name:               'rangetime2[]'
 * 					     }
 * 					  ...
 * 						   {
 * 								value_option_24h:   '06:00'
 * 								times_as_seconds:   [ 21600 ]
 * 						   		jquery_option:      jQuery_Object {}
 * 								name:               'starttime2[]'
 *  					    }
 * 					 ]
 */


function wpbc_get__selected_time_fields__in_booking_form__as_arr(resource_id) {
  var is_only_selected_time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  /**
   * Fields with  []  like this   select[name="rangetime1[]"]
   * it's when we have 'multiple' in shortcode:   [select* rangetime multiple  "06:00 - 06:30" ... ]
   */
  var time_fields_arr = ['select[name="rangetime' + resource_id + '"]', 'select[name="rangetime' + resource_id + '[]"]', 'select[name="starttime' + resource_id + '"]', 'select[name="starttime' + resource_id + '[]"]', 'select[name="endtime' + resource_id + '"]', 'select[name="endtime' + resource_id + '[]"]', 'select[name="durationtime' + resource_id + '"]', 'select[name="durationtime' + resource_id + '[]"]'];
  var time_fields_obj_arr = []; // Loop all Time Fields

  for (var ctf = 0; ctf < time_fields_arr.length; ctf++) {
    var time_field = time_fields_arr[ctf];
    var time_option;

    if (is_only_selected_time) {
      time_option = jQuery('#booking_form' + resource_id + ' ' + time_field + ' option:selected'); // Exclude conditional  fields,  because of using '#booking_form3 ...'
    } else {
      time_option = jQuery('#booking_form' + resource_id + ' ' + time_field + ' option'); // All  time fields
    } // Loop all options in time field


    for (var j = 0; j < time_option.length; j++) {
      var jquery_option = jQuery(time_option[j]); // Get only  selected options 	//jQuery( time_field + ' option:eq(' + j + ')' );

      var value_option_seconds_arr = jquery_option.val().split('-');
      var times_as_seconds = []; // Get time as seconds

      for (var i in value_option_seconds_arr) {
        // value_option_seconds_arr[i] = '14:00 '  | ' 16:00'   (if from 'rangetime') and '16:00'  if (start/end time)
        var start_end_times_arr = value_option_seconds_arr[i].trim().split(':');
        var time_in_seconds = parseInt(start_end_times_arr[0]) * 60 * 60 + parseInt(start_end_times_arr[1]) * 60;
        times_as_seconds.push(time_in_seconds);
      }

      time_fields_obj_arr.push({
        'name': jQuery('#booking_form' + resource_id + ' ' + time_field).attr('name'),
        'value_option_24h': jquery_option.val(),
        'jquery_option': jquery_option,
        'times_as_seconds': times_as_seconds
      });
    }
  } // Text:   [starttime] - [endtime] -----------------------------------------------------------------------------


  var text_time_fields_arr = ['input[name="starttime' + resource_id + '"]', 'input[name="endtime' + resource_id + '"]'];

  for (var tf = 0; tf < text_time_fields_arr.length; tf++) {
    var text_jquery = jQuery('#booking_form' + resource_id + ' ' + text_time_fields_arr[tf]); // Exclude conditional  fields,  because of using '#booking_form3 ...'

    if (text_jquery.length > 0) {
      var time__h_m__arr = text_jquery.val().trim().split(':'); // '14:00'

      if (0 == time__h_m__arr.length) {
        continue; // Not entered time value in a field
      }

      if (1 == time__h_m__arr.length) {
        if ('' === time__h_m__arr[0]) {
          continue; // Not entered time value in a field
        }

        time__h_m__arr[1] = 0;
      }

      var text_time_in_seconds = parseInt(time__h_m__arr[0]) * 60 * 60 + parseInt(time__h_m__arr[1]) * 60;
      var text_times_as_seconds = [];
      text_times_as_seconds.push(text_time_in_seconds);
      time_fields_obj_arr.push({
        'name': text_jquery.attr('name'),
        'value_option_24h': text_jquery.val(),
        'jquery_option': text_jquery,
        'times_as_seconds': text_times_as_seconds
      });
    }
  }

  return time_fields_obj_arr;
} // ---------------------------------------------------------------------------------------------------------------------
// S U P P O R T    for    C A L E N D A R
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Get Calendar datepick  Instance
 * @param resource_id  of booking resource
 * @returns {*|null}
 */


function wpbc_calendar__get_inst(resource_id) {
  if ('undefined' === typeof resource_id) {
    resource_id = '1';
  }

  if (jQuery('#calendar_booking' + resource_id).length > 0) {
    return jQuery.datepick._getInst(jQuery('#calendar_booking' + resource_id).get(0));
  }

  return null;
}
/**
 * Unselect  all dates in calendar and visually update this calendar
 *
 * @param resource_id		ID of booking resource
 * @returns {boolean}		true on success | false,  if no such  calendar
 */


function wpbc_calendar__unselect_all_dates(resource_id) {
  if ('undefined' === typeof resource_id) {
    resource_id = '1';
  }

  var inst = wpbc_calendar__get_inst(resource_id);

  if (null !== inst) {
    // Unselect all dates and set  properties of Datepick
    jQuery('#date_booking' + resource_id).val(''); //FixIn: 5.4.3

    inst.stayOpen = false;
    inst.dates = [];

    jQuery.datepick._updateDatepick(inst);

    return true;
  }

  return false;
}
/**
 * Clear days highlighting in All or specific Calendars
 *
    * @param resource_id  - can be skiped to  clear highlighting in all calendars
    */


function wpbc_calendars__clear_days_highlighting(resource_id) {
  if ('undefined' !== typeof resource_id) {
    jQuery('#calendar_booking' + resource_id + ' .datepick-days-cell-over').removeClass('datepick-days-cell-over'); // Clear in specific calendar
  } else {
    jQuery('.datepick-days-cell-over').removeClass('datepick-days-cell-over'); // Clear in all calendars
  }
}
/**
 * Scroll to specific month in calendar
 *
 * @param resource_id		ID of resource
 * @param year				- real year  - 2023
 * @param month				- real month - 12
 * @returns {boolean}
 */


function wpbc_calendar__scroll_to(resource_id, year, month) {
  if ('undefined' === typeof resource_id) {
    resource_id = '1';
  }

  var inst = wpbc_calendar__get_inst(resource_id);

  if (null !== inst) {
    year = parseInt(year);
    month = parseInt(month) - 1; // In JS date,  month -1

    inst.cursorDate = new Date(); // In some cases,  the setFullYear can  set  only Year,  and not the Month and day      //FixIn:6.2.3.5

    inst.cursorDate.setFullYear(year, month, 1);
    inst.cursorDate.setMonth(month);
    inst.cursorDate.setDate(1);
    inst.drawMonth = inst.cursorDate.getMonth();
    inst.drawYear = inst.cursorDate.getFullYear();

    jQuery.datepick._notifyChange(inst);

    jQuery.datepick._adjustInstDate(inst);

    jQuery.datepick._showDate(inst);

    jQuery.datepick._updateDatepick(inst);

    return true;
  }

  return false;
}
/**
 * Is this date selectable in calendar (mainly it's means AVAILABLE date)
 *
 * @param {int|string} resource_id		1
 * @param {string} sql_class_day		'2023-08-11'
 * @returns {boolean}					true | false
 */


function wpbc_is_this_day_selectable(resource_id, sql_class_day) {
  // Get Data --------------------------------------------------------------------------------------------------------
  var date_bookings_obj = _wpbc.bookings_in_calendar__get_for_date(resource_id, sql_class_day);

  var is_day_selectable = parseInt(date_bookings_obj['day_availability']) > 0;

  if ('available' != date_bookings_obj['summary']['status_for_day']) {
    var is_set_pending_days_selectable = _wpbc.calendar__get_param_value(resource_id, 'pending_days_selectable'); // set pending days selectable          //FixIn: 8.6.1.18


    switch (date_bookings_obj['summary']['status_for_bookings']) {
      case 'pending': // Situations for "change-over" days:

      case 'pending_pending':
      case 'pending_approved':
      case 'approved_pending':
        is_day_selectable = is_day_selectable ? true : is_set_pending_days_selectable;
        break;

      default:
    }
  }

  return is_day_selectable;
}
/**
 * Is date to check IN array of selected dates
 *
 * @param {date}js_date_to_check		- JS Date			- simple  JavaScript Date object
 * @param {[]} js_dates_arr			- [ JSDate, ... ]   - array  of JS dates
 * @returns {boolean}
 */


function wpbc_is_this_day_among_selected_days(js_date_to_check, js_dates_arr) {
  for (var date_index = 0; date_index < js_dates_arr.length; date_index++) {
    //FixIn: 8.4.5.16
    if (js_dates_arr[date_index].getFullYear() === js_date_to_check.getFullYear() && js_dates_arr[date_index].getMonth() === js_date_to_check.getMonth() && js_dates_arr[date_index].getDate() === js_date_to_check.getDate()) {
      return true;
    }
  }

  return false;
}
/**
 * Get SQL Class Date '2023-08-01' from  JS Date
 *
 * @param date				JS Date
 * @returns {string}		'2023-08-12'
 */


function wpbc__get__sql_class_date(date) {
  var sql_class_day = date.getFullYear() + '-';
  sql_class_day += date.getMonth() + 1 < 10 ? '0' : '';
  sql_class_day += date.getMonth() + 1 + '-';
  sql_class_day += date.getDate() < 10 ? '0' : '';
  sql_class_day += date.getDate();
  return sql_class_day;
}
/**
 * Get TD Class Date '1-31-2023' from  JS Date
 *
 * @param date				JS Date
 * @returns {string}		'1-31-2023'
 */


function wpbc__get__td_class_date(date) {
  var td_class_day = date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear(); // '1-9-2023'

  return td_class_day;
}
/**
 * Get date params from  string date
 *
 * @param date			string date like '31.5.2023'
 * @param separator		default '.'  can be skipped.
 * @returns {  {date: number, month: number, year: number}  }
 */


function wpbc__get__date_params__from_string_date(date, separator) {
  separator = 'undefined' !== typeof separator ? separator : '.';
  var date_arr = date.split(separator);
  var date_obj = {
    'year': parseInt(date_arr[2]),
    'month': parseInt(date_arr[1]) - 1,
    'date': parseInt(date_arr[0])
  };
  return date_obj; // for 		 = new Date( date_obj.year , date_obj.month , date_obj.date );
}
/**
 * Add Spin Loader to  calendar
 * @param resource_id
 */


function wpbc_calendar__loading__start(resource_id) {
  jQuery('#calendar_booking' + resource_id).after('<div class="wpbc_spins_loader_wrapper"><div class="wpbc_spins_loader"></div></div>');
  jQuery('#calendar_booking' + resource_id).addClass('wpbc_calendar_blur');
}
/**
 * Remove Spin Loader to  calendar
 * @param resource_id
 */


function wpbc_calendar__loading__stop(resource_id) {
  jQuery('#calendar_booking' + resource_id + ' + .wpbc_spins_loader_wrapper').remove();
  jQuery('#calendar_booking' + resource_id).removeClass('wpbc_calendar_blur');
}
/**
 * Update Look  of calendar
 *
 * @param resource_id
 */


function wpbc_calendar__update_look(resource_id) {
  var inst = wpbc_calendar__get_inst(resource_id);

  jQuery.datepick._updateDatepick(inst);
} // ---------------------------------------------------------------------------------------------------------------------
// S U P P O R T    M A T H
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Merge several  intersected intervals or return not intersected:                        [[1,3],[2,6],[8,10],[15,18]]  ->   [[1,6],[8,10],[15,18]]
 *
 * @param [] intervals			 [ [1,3],[2,4],[6,8],[9,10],[3,7] ]
 * @returns []					 [ [1,8],[9,10] ]
 *
 * Exmample: wpbc_intervals__merge_inersected(  [ [1,3],[2,4],[6,8],[9,10],[3,7] ]  );
 */


function wpbc_intervals__merge_inersected(intervals) {
  if (!intervals || intervals.length === 0) {
    return [];
  }

  var merged = [];
  intervals.sort(function (a, b) {
    return a[0] - b[0];
  });
  var mergedInterval = intervals[0];

  for (var i = 1; i < intervals.length; i++) {
    var interval = intervals[i];

    if (interval[0] <= mergedInterval[1]) {
      mergedInterval[1] = Math.max(mergedInterval[1], interval[1]);
    } else {
      merged.push(mergedInterval);
      mergedInterval = interval;
    }
  }

  merged.push(mergedInterval);
  return merged;
}
/**
 * Is 2 intervals intersected:       [36011, 86392]    <=>    [1, 43192]  =>  true      ( intersected )
 *
 * Good explanation  here https://stackoverflow.com/questions/3269434/whats-the-most-efficient-way-to-test-if-two-ranges-overlap
 *
 * @param array  interval_A   [ 36011, 86392 ]
 * @param array  interval_B   [     1, 43192 ]
 *
 * @return bool
 */


function wpbc_intervals__is_intersected(interval_A, interval_B) {
  if (0 == interval_A.length || 0 == interval_B.length) {
    return false;
  }

  interval_A[0] = parseInt(interval_A[0]);
  interval_A[1] = parseInt(interval_A[1]);
  interval_B[0] = parseInt(interval_B[0]);
  interval_B[1] = parseInt(interval_B[1]);
  var is_intersected = Math.max(interval_A[0], interval_B[0]) - Math.min(interval_A[1], interval_B[1]); // if ( 0 == is_intersected ) {
  //	                                 // Such ranges going one after other, e.g.: [ 12, 15 ] and [ 15, 21 ]
  // }

  if (is_intersected < 0) {
    return true; // INTERSECTED
  }

  return false; // Not intersected
}
/**
 * Get the closets ABS value of element in array to the current myValue
 *
 * @param myValue 	- int element to search closet 			4
 * @param myArray	- array of elements where to search 	[5,8,1,7]
 * @returns int												5
 */


function wpbc_get_abs_closest_value_in_arr(myValue, myArray) {
  if (myArray.length == 0) {
    // If the array is empty -> return  the myValue
    return myValue;
  }

  var obj = myArray[0];
  var diff = Math.abs(myValue - obj); // Get distance between  1st element

  var closetValue = myArray[0]; // Save 1st element

  for (var i = 1; i < myArray.length; i++) {
    obj = myArray[i];

    if (Math.abs(myValue - obj) < diff) {
      // we found closer value -> save it
      diff = Math.abs(myValue - obj);
      closetValue = obj;
    }
  }

  return closetValue;
} // ---------------------------------------------------------------------------------------------------------------------
//  T O O L T I P S
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Define tooltip to show,  when  mouse over Date in Calendar
 *
 * @param  tooltip_text			- Text to show				'Booked time: 12:00 - 13:00<br>Cost: $20.00'
 * @param  resource_id			- ID of booking resource	'1'
 * @param  td_class				- SQL class					'1-9-2023'
 * @returns {boolean}					- defined to show or not
 */


function wpbc_set_tooltip___for__calendar_date(tooltip_text, resource_id, td_class) {
  //TODO: make escaping of text for quot symbols,  and JS/HTML...
  jQuery('#calendar_booking' + resource_id + ' td.cal4date-' + td_class).attr('data-content', tooltip_text);
  var td_el = jQuery('#calendar_booking' + resource_id + ' td.cal4date-' + td_class).get(0); //FixIn: 9.0.1.1

  if ('undefined' !== typeof td_el && undefined == td_el._tippy && '' !== tooltip_text) {
    wpbc_tippy(td_el, {
      content: function content(reference) {
        var popover_content = reference.getAttribute('data-content');
        return '<div class="popover popover_tippy">' + '<div class="popover-content">' + popover_content + '</div>' + '</div>';
      },
      allowHTML: true,
      trigger: 'mouseenter focus',
      interactive: false,
      hideOnClick: true,
      interactiveBorder: 10,
      maxWidth: 550,
      theme: 'wpbc-tippy-times',
      placement: 'top',
      delay: [400, 0],
      //FixIn: 9.4.2.2
      //delay			 : [0, 9999999999],						// Debuge  tooltip
      ignoreAttributes: true,
      touch: true,
      //['hold', 500], // 500ms delay				//FixIn: 9.2.1.5
      appendTo: function appendTo() {
        return document.body;
      }
    });
    return true;
  }

  return false;
} // ---------------------------------------------------------------------------------------------------------------------
//  A j a x    L o a d    C a l e n d a r    D a t a
// ---------------------------------------------------------------------------------------------------------------------


function wpbc_calendar__load_data__ajx(params) {
  console.groupCollapsed('WPBC_AJX_CALENDAR_LOAD');
  console.log(' == Before Ajax Send - calendars_all__get() == ', _wpbc.calendars_all__get());
  wpbc_calendar__loading__start(params['resource_id']); // Start Ajax

  jQuery.post(wpbc_global1.wpbc_ajaxurl, {
    action: 'WPBC_AJX_CALENDAR_LOAD',
    wpbc_ajx_user_id: _wpbc.get_secure_param('user_id'),
    nonce: _wpbc.get_secure_param('nonce'),
    wpbc_ajx_locale: _wpbc.get_secure_param('locale'),
    calendar_request_params: params // Usually like: { 'resource_id': 1, 'max_days_count': 365 }

  },
  /**
   * S u c c e s s
   *
   * @param response_data		-	its object returned from  Ajax - class-live-searcg.php
   * @param textStatus		-	'success'
   * @param jqXHR				-	Object
   */
  function (response_data, textStatus, jqXHR) {
    console.log(' == Response WPBC_AJX_CALENDAR_LOAD == ', response_data);
    console.groupEnd(); // Probably Error

    if (_typeof(response_data) !== 'object' || response_data === null) {
      var jq_node = wpbc_get_calendar__jq_node__for_messages(this.data);
      var message_type = 'info';

      if ('' === response_data) {
        response_data = 'The server responds with an empty string. The server probably stopped working unexpectedly. <br>Please check your <strong>error.log</strong> in your server configuration for relative errors.';
        message_type = 'warning';
      } // Show Message


      wpbc_front_end__show_message(response_data, {
        'type': message_type,
        'show_here': {
          'jq_node': jq_node,
          'where': 'after'
        },
        'is_append': true,
        'style': 'text-align:left;',
        'delay': 0
      });
      return;
    } // Show Calendar


    wpbc_calendar__loading__stop(response_data['resource_id']); // -------------------------------------------------------------------------------------------------
    // Bookings - Dates

    _wpbc.bookings_in_calendar__set_dates(response_data['resource_id'], response_data['ajx_data']['dates']); // Bookings - Child or only single booking resource in dates


    _wpbc.booking__set_param_value(response_data['resource_id'], 'resources_id_arr__in_dates', response_data['ajx_data']['resources_id_arr__in_dates']); // Aggregate booking resources,  if any ?


    _wpbc.booking__set_param_value(response_data['resource_id'], 'aggregate_resource_id_arr', response_data['ajx_data']['aggregate_resource_id_arr']); // -------------------------------------------------------------------------------------------------
    // Update calendar


    wpbc_calendar__update_look(response_data['resource_id']);

    if ('undefined' !== typeof response_data['ajx_data']['ajx_after_action_message'] && '' != response_data['ajx_data']['ajx_after_action_message'].replace(/\n/g, "<br />")) {
      var jq_node = wpbc_get_calendar__jq_node__for_messages(this.data); // Show Message

      wpbc_front_end__show_message(response_data['ajx_data']['ajx_after_action_message'].replace(/\n/g, "<br />"), {
        'type': 'undefined' !== typeof response_data['ajx_data']['ajx_after_action_message_status'] ? response_data['ajx_data']['ajx_after_action_message_status'] : 'info',
        'show_here': {
          'jq_node': jq_node,
          'where': 'after'
        },
        'is_append': true,
        'style': 'text-align:left;',
        'delay': 10000
      });
    } //jQuery( '#ajax_respond' ).html( response_data );		// For ability to show response, add such DIV element to page

  }).fail(function (jqXHR, textStatus, errorThrown) {
    if (window.console && window.console.log) {
      console.log('Ajax_Error', jqXHR, textStatus, errorThrown);
    } // Get Content of Error Message


    var error_message = '<strong>' + 'Error!' + '</strong> ' + errorThrown;

    if (jqXHR.status) {
      error_message += ' (<b>' + jqXHR.status + '</b>)';

      if (403 == jqXHR.status) {
        error_message += '<br> Probably nonce for this page has been expired. Please <a href="javascript:void(0)" onclick="javascript:location.reload();">reload the page</a>.';
        error_message += '<br> Otherwise, please check this <a style="font-weight: 600;" href="https://wpbookingcalendar.com/faq/request-do-not-pass-security-check/">troubleshooting instruction</a>.<br>';
      }
    }

    var message_show_delay = 3000;

    if (jqXHR.responseText) {
      error_message += ' ' + jqXHR.responseText;
      message_show_delay = 10;
    }

    error_message = error_message.replace(/\n/g, "<br />");
    var jq_node = wpbc_get_calendar__jq_node__for_messages(this.data);
    /**
     * If we make fast clicking on different pages,
     * then under calendar will show error message with  empty  text, because ajax was not received.
     * To  not show such warnings we are set delay  in 3 seconds.  var message_show_delay = 3000;
     */

    var closed_timer = setTimeout(function () {
      // Show Message
      wpbc_front_end__show_message(error_message, {
        'type': 'error',
        'show_here': {
          'jq_node': jq_node,
          'where': 'after'
        },
        'is_append': true,
        'style': 'text-align:left;',
        'css_class': 'wpbc_fe_message_alt',
        'delay': 0
      });
    }, parseInt(message_show_delay));
  }) // .done(   function ( data, textStatus, jqXHR ) {   if ( window.console && window.console.log ){ console.log( 'second success', data, textStatus, jqXHR ); }    })
  // .always( function ( data_jqXHR, textStatus, jqXHR_errorThrown ) {   if ( window.console && window.console.log ){ console.log( 'always finished', data_jqXHR, textStatus, jqXHR_errorThrown ); }     })
  ; // End Ajax
} // ---------------------------------------------------------------------------------------------------------------------
// Support
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Get Calendar jQuery node for showing messages during Ajax
 * This parameter:   calendar_request_params[resource_id]   parsed from this.data Ajax post  data
 *
 * @param ajx_post_data_url_params		 'action=WPBC_AJX_CALENDAR_LOAD...&calendar_request_params%5Bresource_id%5D=2&calendar_request_params%5Bbooking_hash%5D=&calendar_request_params'
 * @returns {string}	''#calendar_booking1'  |   '.booking_form_div' ...
 *
 * Example    var jq_node  = wpbc_get_calendar__jq_node__for_messages( this.data );
 */


function wpbc_get_calendar__jq_node__for_messages(ajx_post_data_url_params) {
  var jq_node = '.booking_form_div';
  var calendar_resource_id = wpbc_get_resource_id__from_ajx_post_data_url(ajx_post_data_url_params);

  if (calendar_resource_id > 0) {
    jq_node = '#calendar_booking' + calendar_resource_id;
  }

  return jq_node;
}
/**
 * Get resource ID from ajx post data url   usually  from  this.data  = 'action=WPBC_AJX_CALENDAR_LOAD...&calendar_request_params%5Bresource_id%5D=2&calendar_request_params%5Bbooking_hash%5D=&calendar_request_params'
 *
 * @param ajx_post_data_url_params		 'action=WPBC_AJX_CALENDAR_LOAD...&calendar_request_params%5Bresource_id%5D=2&calendar_request_params%5Bbooking_hash%5D=&calendar_request_params'
 * @returns {int}						 1 | 0  (if errror then  0)
 *
 * Example    var jq_node  = wpbc_get_calendar__jq_node__for_messages( this.data );
 */


function wpbc_get_resource_id__from_ajx_post_data_url(ajx_post_data_url_params) {
  // Get booking resource ID from Ajax Post Request  -> this.data = 'action=WPBC_AJX_CALENDAR_LOAD...&calendar_request_params%5Bresource_id%5D=2&calendar_request_params%5Bbooking_hash%5D=&calendar_request_params'
  var calendar_resource_id = wpbc_get_uri_param_by_name('calendar_request_params[resource_id]', ajx_post_data_url_params);

  if (null !== calendar_resource_id && '' !== calendar_resource_id) {
    calendar_resource_id = parseInt(calendar_resource_id);

    if (calendar_resource_id > 0) {
      return calendar_resource_id;
    }
  }

  return 0;
}
/**
 * Get parameter from URL  -  parse URL parameters,  like this: action=WPBC_AJX_CALENDAR_LOAD...&calendar_request_params%5Bresource_id%5D=2&calendar_request_params%5Bbooking_hash%5D=&calendar_request_params
 * @param name  parameter  name,  like 'calendar_request_params[resource_id]'
 * @param url	'parameter  string URL'
 * @returns {string|null}   parameter value
 *
 * Example: 		wpbc_get_uri_param_by_name( 'calendar_request_params[resource_id]', this.data );  -> '2'
 */


function wpbc_get_uri_param_by_name(name, url) {
  url = decodeURIComponent(url);
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
} // ---------------------------------------------------------------------------------------------------------------------
// Show Messages at Front-Edn side
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Show message in content
 *
 * @param message				Message HTML
 * @param params = {
 *								'type'     : 'warning',							// 'error' | 'warning' | 'info' | 'success'
 *								'show_here' : {
 *													'jq_node' : '',				// any jQuery node definition
 *													'where'   : 'inside'		// 'inside' | 'before' | 'after' | 'right' | 'left'
 *											  },
 *								'is_append': true,								// Apply  only if 	'where'   : 'inside'
 *								'style'    : 'text-align:left;',				// styles, if needed
 *							    'css_class': '',								// For example can  be: 'wpbc_fe_message_alt'
 *								'delay'    : 0,									// how many microsecond to  show,  if 0  then  show forever
 *								'if_visible_not_show': false					// if true,  then do not show message,  if previos message was not hided (not apply if 'where'   : 'inside' )
 *				};
 * Examples:
 * 			var html_id = wpbc_front_end__show_message( 'You can test days selection in calendar', {} );
 *
 *			var notice_message_id = wpbc_front_end__show_message( message_verif_requred, { 'type': 'warning', 'delay': 10000, 'if_visible_not_show': true,
 *																  'show_here': {'where': 'right', 'jq_node': el,} } );
 *
 *			wpbc_front_end__show_message( response_data[ 'ajx_data' ][ 'ajx_after_action_message' ].replace( /\n/g, "<br />" ),
 *											{   'type'     : ( 'undefined' !== typeof( response_data[ 'ajx_data' ][ 'ajx_after_action_message_status' ] ) )
 *															  ? response_data[ 'ajx_data' ][ 'ajx_after_action_message_status' ] : 'info',
 *												'show_here': {'jq_node': jq_node, 'where': 'after'},
 *												'css_class':'wpbc_fe_message_alt',
 *												'delay'    : 10000
 *											} );
 *
 *
 * @returns string  - HTML ID		or 0 if not showing during this time.
 */


function wpbc_front_end__show_message(message) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var params_default = {
    'type': 'warning',
    // 'error' | 'warning' | 'info' | 'success'
    'show_here': {
      'jq_node': '',
      // any jQuery node definition
      'where': 'inside' // 'inside' | 'before' | 'after' | 'right' | 'left'

    },
    'is_append': true,
    // Apply  only if 	'where'   : 'inside'
    'style': 'text-align:left;',
    // styles, if needed
    'css_class': '',
    // For example can  be: 'wpbc_fe_message_alt'
    'delay': 0,
    // how many microsecond to  show,  if 0  then  show forever
    'if_visible_not_show': false,
    // if true,  then do not show message,  if previos message was not hided (not apply if 'where'   : 'inside' )
    'is_scroll': true // is scroll  to  this element

  };

  for (var p_key in params) {
    params_default[p_key] = params[p_key];
  }

  params = params_default;
  var unique_div_id = new Date();
  unique_div_id = 'wpbc_notice_' + unique_div_id.getTime();
  params['css_class'] += ' wpbc_fe_message';

  if (params['type'] == 'error') {
    params['css_class'] += ' wpbc_fe_message_error';
    message = '<i class="menu_icon icon-1x wpbc_icn_report_gmailerrorred"></i>' + message;
  }

  if (params['type'] == 'warning') {
    params['css_class'] += ' wpbc_fe_message_warning';
    message = '<i class="menu_icon icon-1x wpbc_icn_warning"></i>' + message;
  }

  if (params['type'] == 'info') {
    params['css_class'] += ' wpbc_fe_message_info';
  }

  if (params['type'] == 'success') {
    params['css_class'] += ' wpbc_fe_message_success';
    message = '<i class="menu_icon icon-1x wpbc_icn_done_outline"></i>' + message;
  }

  var scroll_to_element = '<div id="' + unique_div_id + '_scroll" style="display:none;"></div>';
  message = '<div id="' + unique_div_id + '" class="wpbc_front_end__message ' + params['css_class'] + '" style="' + params['style'] + '">' + message + '</div>';
  var jq_el_message = false;
  var is_show_message = true;

  if ('inside' === params['show_here']['where']) {
    if (params['is_append']) {
      jQuery(params['show_here']['jq_node']).append(scroll_to_element);
      jQuery(params['show_here']['jq_node']).append(message);
    } else {
      jQuery(params['show_here']['jq_node']).html(scroll_to_element + message);
    }
  } else if ('before' === params['show_here']['where']) {
    jq_el_message = jQuery(params['show_here']['jq_node']).siblings('[id^="wpbc_notice_"]');

    if (params['if_visible_not_show'] && jq_el_message.is(':visible')) {
      is_show_message = false;
      unique_div_id = jQuery(jq_el_message.get(0)).attr('id');
    }

    if (is_show_message) {
      jQuery(params['show_here']['jq_node']).before(scroll_to_element);
      jQuery(params['show_here']['jq_node']).before(message);
    }
  } else if ('after' === params['show_here']['where']) {
    jq_el_message = jQuery(params['show_here']['jq_node']).nextAll('[id^="wpbc_notice_"]');

    if (params['if_visible_not_show'] && jq_el_message.is(':visible')) {
      is_show_message = false;
      unique_div_id = jQuery(jq_el_message.get(0)).attr('id');
    }

    if (is_show_message) {
      jQuery(params['show_here']['jq_node']).before(scroll_to_element); // We need to  set  here before(for handy scroll)

      jQuery(params['show_here']['jq_node']).after(message);
    }
  } else if ('right' === params['show_here']['where']) {
    jq_el_message = jQuery(params['show_here']['jq_node']).nextAll('.wpbc_front_end__message_container_right').find('[id^="wpbc_notice_"]');

    if (params['if_visible_not_show'] && jq_el_message.is(':visible')) {
      is_show_message = false;
      unique_div_id = jQuery(jq_el_message.get(0)).attr('id');
    }

    if (is_show_message) {
      jQuery(params['show_here']['jq_node']).before(scroll_to_element); // We need to  set  here before(for handy scroll)

      jQuery(params['show_here']['jq_node']).after('<div class="wpbc_front_end__message_container_right">' + message + '</div>');
    }
  } else if ('left' === params['show_here']['where']) {
    jq_el_message = jQuery(params['show_here']['jq_node']).siblings('.wpbc_front_end__message_container_left').find('[id^="wpbc_notice_"]');

    if (params['if_visible_not_show'] && jq_el_message.is(':visible')) {
      is_show_message = false;
      unique_div_id = jQuery(jq_el_message.get(0)).attr('id');
    }

    if (is_show_message) {
      jQuery(params['show_here']['jq_node']).before(scroll_to_element); // We need to  set  here before(for handy scroll)

      jQuery(params['show_here']['jq_node']).before('<div class="wpbc_front_end__message_container_left">' + message + '</div>');
    }
  }

  if (is_show_message && parseInt(params['delay']) > 0) {
    var closed_timer = setTimeout(function () {
      jQuery('#' + unique_div_id).fadeOut(1500);
    }, parseInt(params['delay']));
    var closed_timer2 = setTimeout(function () {
      jQuery('#' + unique_div_id).trigger('hide');
    }, parseInt(params['delay']) + 1501);
  } // Check  if showed message in some hidden parent section and show it. But it must  be lower than '.wpbc_container'


  var parent_els = jQuery('#' + unique_div_id).parents().map(function () {
    if (!jQuery(this).is('visible') && jQuery('.wpbc_container').has(this)) {
      jQuery(this).show();
    }
  });

  if (params['is_scroll']) {
    wpbc_do_scroll('#' + unique_div_id + '_scroll');
  }

  return unique_div_id;
}
/**
 * Error message. 	Preset of parameters for real message function.
 *
 * @param el		- any jQuery node definition
 * @param message	- Message HTML
 * @returns string  - HTML ID		or 0 if not showing during this time.
 */


function wpbc_front_end__show_message__error(jq_node, message) {
  var notice_message_id = wpbc_front_end__show_message(message, {
    'type': 'error',
    'delay': 10000,
    'if_visible_not_show': true,
    'show_here': {
      'where': 'right',
      'jq_node': jq_node
    }
  });
  return notice_message_id;
}
/**
 * Error message UNDER element. 	Preset of parameters for real message function.
 *
 * @param el		- any jQuery node definition
 * @param message	- Message HTML
 * @returns string  - HTML ID		or 0 if not showing during this time.
 */


function wpbc_front_end__show_message__error_under_element(jq_node, message, message_delay) {
  if ('undefined' === typeof message_delay) {
    message_delay = 0;
  }

  var notice_message_id = wpbc_front_end__show_message(message, {
    'type': 'error',
    'delay': message_delay,
    'if_visible_not_show': true,
    'show_here': {
      'where': 'after',
      'jq_node': jq_node
    }
  });
  return notice_message_id;
}
/**
 * Error message UNDER element. 	Preset of parameters for real message function.
 *
 * @param el		- any jQuery node definition
 * @param message	- Message HTML
 * @returns string  - HTML ID		or 0 if not showing during this time.
 */


function wpbc_front_end__show_message__error_above_element(jq_node, message, message_delay) {
  if ('undefined' === typeof message_delay) {
    message_delay = 10000;
  }

  var notice_message_id = wpbc_front_end__show_message(message, {
    'type': 'error',
    'delay': message_delay,
    'if_visible_not_show': true,
    'show_here': {
      'where': 'before',
      'jq_node': jq_node
    }
  });
  return notice_message_id;
}
/**
 * Warning message. 	Preset of parameters for real message function.
 *
 * @param el		- any jQuery node definition
 * @param message	- Message HTML
 * @returns string  - HTML ID		or 0 if not showing during this time.
 */


function wpbc_front_end__show_message__warning(jq_node, message) {
  var notice_message_id = wpbc_front_end__show_message(message, {
    'type': 'warning',
    'delay': 10000,
    'if_visible_not_show': true,
    'show_here': {
      'where': 'right',
      'jq_node': jq_node
    }
  });
  return notice_message_id;
}
/**
 * Warning message UNDER element. 	Preset of parameters for real message function.
 *
 * @param el		- any jQuery node definition
 * @param message	- Message HTML
 * @returns string  - HTML ID		or 0 if not showing during this time.
 */


function wpbc_front_end__show_message__warning_under_element(jq_node, message) {
  var notice_message_id = wpbc_front_end__show_message(message, {
    'type': 'warning',
    'delay': 10000,
    'if_visible_not_show': true,
    'show_here': {
      'where': 'after',
      'jq_node': jq_node
    }
  });
  return notice_message_id;
}
/**
 * Warning message ABOVE element. 	Preset of parameters for real message function.
 *
 * @param el		- any jQuery node definition
 * @param message	- Message HTML
 * @returns string  - HTML ID		or 0 if not showing during this time.
 */


function wpbc_front_end__show_message__warning_above_element(jq_node, message) {
  var notice_message_id = wpbc_front_end__show_message(message, {
    'type': 'warning',
    'delay': 10000,
    'if_visible_not_show': true,
    'show_here': {
      'where': 'before',
      'jq_node': jq_node
    }
  });
  return notice_message_id;
}
/**
 * Scroll to specific element
 *
 * @param jq_node					string or jQuery element,  where scroll  to
 * @param extra_shift_offset		int shift offset from  jq_node
 */


function wpbc_do_scroll(jq_node) {
  var extra_shift_offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (!jQuery(jq_node).length) {
    return;
  }

  var targetOffset = jQuery(jq_node).offset().top;

  if (targetOffset <= 0) {
    if (0 != jQuery(jq_node).nextAll(':visible').length) {
      targetOffset = jQuery(jq_node).nextAll(':visible').first().offset().top;
    } else if (0 != jQuery(jq_node).parent().nextAll(':visible').length) {
      targetOffset = jQuery(jq_node).parent().nextAll(':visible').first().offset().top;
    }
  }

  if (jQuery('#wpadminbar').length > 0) {
    targetOffset = targetOffset - 50 - 50;
  } else {
    targetOffset = targetOffset - 20 - 50;
  }

  targetOffset += extra_shift_offset; // Scroll only  if we did not scroll before

  if (!jQuery('html,body').is(':animated')) {
    jQuery('html,body').animate({
      scrollTop: targetOffset
    }, 500);
  }
} //TODO: remove vars:       bk_2clicks_mode_days_start, bk_1click_mode_days_start     date2approve   date_approved
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluY2x1ZGVzL193cGJjX2NhbGVuZGFyL19zcmMvd3BiY19jYWxlbmRhci5qcyJdLCJuYW1lcyI6WyJfd3BiYyIsIm9iaiIsIiQiLCJwX3NlY3VyZSIsInNlY3VyaXR5X29iaiIsInVzZXJfaWQiLCJub25jZSIsImxvY2FsZSIsInNldF9zZWN1cmVfcGFyYW0iLCJwYXJhbV9rZXkiLCJwYXJhbV92YWwiLCJnZXRfc2VjdXJlX3BhcmFtIiwicF9jYWxlbmRhcnMiLCJjYWxlbmRhcnNfb2JqIiwiY2FsZW5kYXJfX2lzX2RlZmluZWQiLCJyZXNvdXJjZV9pZCIsImNhbGVuZGFyX19pbml0IiwiY2FsZW5kYXJzX2FsbF9fc2V0IiwiY2FsZW5kYXJzX2FsbF9fZ2V0IiwiY2FsZW5kYXJfX2dldF9wYXJhbWV0ZXJzIiwiY2FsZW5kYXJfX3NldF9wYXJhbWV0ZXJzIiwiY2FsZW5kYXJfcHJvcGVydHlfb2JqIiwiaXNfY29tcGxldGVfb3ZlcndyaXRlIiwicHJvcF9uYW1lIiwiY2FsZW5kYXJfX3NldF9wYXJhbV92YWx1ZSIsInByb3BfdmFsdWUiLCJjYWxlbmRhcl9fZ2V0X3BhcmFtX3ZhbHVlIiwicF9ib29raW5ncyIsImJvb2tpbmdzX29iaiIsImJvb2tpbmdzX2luX2NhbGVuZGFyX19pc19kZWZpbmVkIiwiYm9va2luZ3NfaW5fY2FsZW5kYXJfX2dldCIsImJvb2tpbmdzX2luX2NhbGVuZGFyX19zZXQiLCJjYWxlbmRhcl9vYmoiLCJib29raW5nc19pbl9jYWxlbmRhcl9fZ2V0X2RhdGVzIiwiYm9va2luZ3NfaW5fY2FsZW5kYXJfX3NldF9kYXRlcyIsImRhdGVzX29iaiIsImJvb2tpbmdzX2luX2NhbGVuZGFyX19nZXRfZm9yX2RhdGUiLCJzcWxfY2xhc3NfZGF5IiwiYm9va2luZ19fc2V0X3BhcmFtX3ZhbHVlIiwiYm9va2luZ19fZ2V0X3BhcmFtX3ZhbHVlIiwiYm9va2luZ3NfaW5fY2FsZW5kYXJzX19zZXRfYWxsIiwiYm9va2luZ3NfaW5fY2FsZW5kYXJzX19nZXRfYWxsIiwicF9zZWFzb25zIiwic2Vhc29uc19vYmoiLCJzZWFzb25zX19zZXQiLCJzZWFzb25fbmFtZV9rZXkiLCJwdXNoIiwic2Vhc29uc19fZ2V0X2Zvcl9kYXRlIiwicF9vdGhlciIsIm90aGVyX29iaiIsInNldF9vdGhlcl9wYXJhbSIsImdldF9vdGhlcl9wYXJhbSIsImpRdWVyeSIsIndwYmNfY2xvbmVfb2JqIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5Iiwid3BiY19jYWxlbmRhcl9zaG93IiwibGVuZ3RoIiwiaGFzQ2xhc3MiLCJsb2NhbF9faXNfcmFuZ2Vfc2VsZWN0IiwibG9jYWxfX211bHRpX2RheXNfc2VsZWN0X251bSIsImxvY2FsX19taW5fZGF0ZSIsImxvY2FsX19tYXhfZGF0ZSIsImNhbF9sYXN0X2RheV9pbl9tb250aCIsImRhdGVwaWNrIiwiX2RldGVybWluZURhdGUiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImxvY2F0aW9uIiwiaHJlZiIsImluZGV4T2YiLCJsb2NhbF9fc3RhcnRfd2Vla2RheSIsImxvY2FsX19udW1iZXJfb2ZfbW9udGhzIiwicGFyc2VJbnQiLCJ0ZXh0IiwiYmVmb3JlU2hvd0RheSIsImpzX2RhdGUiLCJ3cGJjX19jYWxlbmRhcl9fYXBwbHlfY3NzX3RvX2RheXMiLCJvblNlbGVjdCIsInN0cmluZ19kYXRlcyIsImpzX2RhdGVzX2FyciIsIndwYmNfX2NhbGVuZGFyX19vbl9zZWxlY3RfZGF5cyIsIm9uSG92ZXIiLCJzdHJpbmdfZGF0ZSIsIndwYmNfX2NhbGVuZGFyX19vbl9ob3Zlcl9kYXlzIiwib25DaGFuZ2VNb250aFllYXIiLCJ5ZWFyIiwicmVhbF9tb250aCIsImpzX2RhdGVfXzFzdF9kYXlfaW5fbW9udGgiLCJzaG93T24iLCJudW1iZXJPZk1vbnRocyIsInN0ZXBNb250aHMiLCJwcmV2VGV4dCIsIm5leHRUZXh0IiwiZGF0ZUZvcm1hdCIsImNoYW5nZU1vbnRoIiwiY2hhbmdlWWVhciIsIm1pbkRhdGUiLCJtYXhEYXRlIiwic2hvd1N0YXR1cyIsIm11bHRpU2VwYXJhdG9yIiwiY2xvc2VBdFRvcCIsImZpcnN0RGF5IiwiZ290b0N1cnJlbnQiLCJoaWRlSWZOb1ByZXZOZXh0IiwibXVsdGlTZWxlY3QiLCJyYW5nZVNlbGVjdCIsInVzZVRoZW1lUm9sbGVyIiwic2V0VGltZW91dCIsIndwYmNfY2FsZW5kYXJzX19jbGVhcl9kYXlzX2hpZ2hsaWdodGluZyIsInN0YXJ0X2JrX21vbnRoIiwid3BiY19jYWxlbmRhcl9fc2Nyb2xsX3RvIiwiZGF0ZSIsImNhbGVuZGFyX3BhcmFtc19hcnIiLCJkYXRlcGlja190aGlzIiwidG9kYXlfZGF0ZSIsIndwYmNfdG9kYXkiLCJjbGFzc19kYXkiLCJ3cGJjX19nZXRfX3RkX2NsYXNzX2RhdGUiLCJ3cGJjX19nZXRfX3NxbF9jbGFzc19kYXRlIiwiZGF0ZV9ib29raW5nc19vYmoiLCJjc3NfY2xhc3Nlc19fZm9yX2RhdGUiLCJnZXREYXkiLCJpc19kYXlfc2VsZWN0YWJsZSIsImpvaW4iLCJzZWFzb25fbmFtZXNfYXJyIiwic2Vhc29uX2tleSIsInRvU3RyaW5nIiwicmVwbGFjZSIsImlzX3NldF9wZW5kaW5nX2RheXNfc2VsZWN0YWJsZSIsImRhdGVfYm9va2luZ19vYmoiLCJ0b29sdGlwX3RleHQiLCJ3cGJjX3NldF90b29sdGlwX19fZm9yX19jYWxlbmRhcl9kYXRlIiwiaXNfdW5zZWxlY3RhYmxlX2NhbGVuZGFyIiwiaXNfYm9va2luZ19mb3JtX2V4aXN0IiwiY3NzX29mX2NhbGVuZGFyIiwiY3NzIiwid3BiY19fY2FsZW5kYXJfX2RvX2RheXNfaGlnaGxpZ2h0X19icyIsIndwYmNfY2FsZW5kYXJfX3Vuc2VsZWN0X2FsbF9kYXRlcyIsInJlbW92ZSIsInZhbCIsIndwYmNfX2NhbGVuZGFyX19kb19kYXlzX3NlbGVjdF9fYnMiLCJ3cGJjX2Rpc2FibGVfdGltZV9maWVsZHNfaW5fYm9va2luZ19mb3JtIiwibW91c2VfY2xpY2tlZF9kYXRlcyIsImFsbF9zZWxlY3RlZF9kYXRlc19hcnIiLCJ3cGJjX2dldF9fc2VsZWN0ZWRfZGF0ZXNfc3FsX19hc19hcnIiLCJ0cmlnZ2VyIiwidGltZV9maWVsZHNfb2JqX2FyciIsIndwYmNfZ2V0X190aW1lX2ZpZWxkc19faW5fYm9va2luZ19mb3JtX19hc19hcnIiLCJzZWxlY3RlZF9kYXRlc19hcnIiLCJjaGlsZF9yZXNvdXJjZXNfYXJyIiwic3FsX2RhdGUiLCJjaGlsZF9yZXNvdXJjZV9pZCIsIm1lcmdlZF9zZWNvbmRzIiwidGltZV9maWVsZHNfb2JqIiwiaXNfaW50ZXJzZWN0IiwiaXNfY2hlY2tfaW4iLCJmaWVsZF9rZXkiLCJkaXNhYmxlZCIsImkiLCJob3dfbWFueV9yZXNvdXJjZXNfaW50ZXJzZWN0ZWQiLCJyZXNfa2V5IiwiYm9va2VkX3RpbWVfc2xvdHMiLCJ0aW1lc19hc19zZWNvbmRzIiwid3BiY19pc19pbnRlcnNlY3RfX3JhbmdlX3RpbWVfaW50ZXJ2YWwiLCJuYW1lIiwid3BiY19pc19pbnRlcnNlY3RfX29uZV90aW1lX2ludGVydmFsIiwid3BiY19faHRtbF9fdGltZV9maWVsZF9vcHRpb25zX19zZXRfZGlzYWJsZWQiLCJ0aW1lX0EiLCJ0aW1lX2ludGVydmFsX0IiLCJqIiwidGltZV9pbnRlcnZhbF9BIiwid3BiY19pbnRlcnZhbHNfX2lzX2ludGVyc2VjdGVkIiwidGltZV9maWVsZHNfYXJyIiwiY3RmIiwidGltZV9maWVsZCIsInRpbWVfb3B0aW9uIiwianF1ZXJ5X29wdGlvbiIsInZhbHVlX29wdGlvbl9zZWNvbmRzX2FyciIsInNwbGl0Iiwic3RhcnRfZW5kX3RpbWVzX2FyciIsInRyaW0iLCJ0aW1lX2luX3NlY29uZHMiLCJhdHRyIiwicHJvcCIsImFkZENsYXNzIiwicGFyZW50IiwiZmluZCIsInJlbW92ZUNsYXNzIiwid3BiY19pc190aGlzX3RpbWVzbG90X19mdWxsX2RheV9ib29rZWQiLCJ0aW1lc2xvdF9hcnJfaW5fc2Vjb25kcyIsImZpbHRlciIsIm4iLCJzb3J0Iiwid3BiY19nZXRfX3NlbGVjdGVkX3RpbWVfZmllbGRzX19pbl9ib29raW5nX2Zvcm1fX2FzX2FyciIsImlzX29ubHlfc2VsZWN0ZWRfdGltZSIsInRleHRfdGltZV9maWVsZHNfYXJyIiwidGYiLCJ0ZXh0X2pxdWVyeSIsInRpbWVfX2hfbV9fYXJyIiwidGV4dF90aW1lX2luX3NlY29uZHMiLCJ0ZXh0X3RpbWVzX2FzX3NlY29uZHMiLCJ3cGJjX2NhbGVuZGFyX19nZXRfaW5zdCIsIl9nZXRJbnN0IiwiZ2V0IiwiaW5zdCIsInN0YXlPcGVuIiwiZGF0ZXMiLCJfdXBkYXRlRGF0ZXBpY2siLCJtb250aCIsImN1cnNvckRhdGUiLCJzZXRGdWxsWWVhciIsInNldE1vbnRoIiwic2V0RGF0ZSIsImRyYXdNb250aCIsImRyYXdZZWFyIiwiX25vdGlmeUNoYW5nZSIsIl9hZGp1c3RJbnN0RGF0ZSIsIl9zaG93RGF0ZSIsIndwYmNfaXNfdGhpc19kYXlfc2VsZWN0YWJsZSIsIndwYmNfaXNfdGhpc19kYXlfYW1vbmdfc2VsZWN0ZWRfZGF5cyIsImpzX2RhdGVfdG9fY2hlY2siLCJkYXRlX2luZGV4IiwiZ2V0RGF0ZSIsInRkX2NsYXNzX2RheSIsIndwYmNfX2dldF9fZGF0ZV9wYXJhbXNfX2Zyb21fc3RyaW5nX2RhdGUiLCJzZXBhcmF0b3IiLCJkYXRlX2FyciIsImRhdGVfb2JqIiwid3BiY19jYWxlbmRhcl9fbG9hZGluZ19fc3RhcnQiLCJhZnRlciIsIndwYmNfY2FsZW5kYXJfX2xvYWRpbmdfX3N0b3AiLCJ3cGJjX2NhbGVuZGFyX191cGRhdGVfbG9vayIsIndwYmNfaW50ZXJ2YWxzX19tZXJnZV9pbmVyc2VjdGVkIiwiaW50ZXJ2YWxzIiwibWVyZ2VkIiwiYSIsImIiLCJtZXJnZWRJbnRlcnZhbCIsImludGVydmFsIiwiTWF0aCIsIm1heCIsImludGVydmFsX0EiLCJpbnRlcnZhbF9CIiwiaXNfaW50ZXJzZWN0ZWQiLCJtaW4iLCJ3cGJjX2dldF9hYnNfY2xvc2VzdF92YWx1ZV9pbl9hcnIiLCJteVZhbHVlIiwibXlBcnJheSIsImRpZmYiLCJhYnMiLCJjbG9zZXRWYWx1ZSIsInRkX2NsYXNzIiwidGRfZWwiLCJ1bmRlZmluZWQiLCJfdGlwcHkiLCJ3cGJjX3RpcHB5IiwiY29udGVudCIsInJlZmVyZW5jZSIsInBvcG92ZXJfY29udGVudCIsImdldEF0dHJpYnV0ZSIsImFsbG93SFRNTCIsImludGVyYWN0aXZlIiwiaGlkZU9uQ2xpY2siLCJpbnRlcmFjdGl2ZUJvcmRlciIsIm1heFdpZHRoIiwidGhlbWUiLCJwbGFjZW1lbnQiLCJkZWxheSIsImlnbm9yZUF0dHJpYnV0ZXMiLCJ0b3VjaCIsImFwcGVuZFRvIiwiZG9jdW1lbnQiLCJib2R5Iiwid3BiY19jYWxlbmRhcl9fbG9hZF9kYXRhX19hangiLCJwYXJhbXMiLCJjb25zb2xlIiwiZ3JvdXBDb2xsYXBzZWQiLCJsb2ciLCJwb3N0Iiwid3BiY19nbG9iYWwxIiwid3BiY19hamF4dXJsIiwiYWN0aW9uIiwid3BiY19hanhfdXNlcl9pZCIsIndwYmNfYWp4X2xvY2FsZSIsImNhbGVuZGFyX3JlcXVlc3RfcGFyYW1zIiwicmVzcG9uc2VfZGF0YSIsInRleHRTdGF0dXMiLCJqcVhIUiIsImdyb3VwRW5kIiwianFfbm9kZSIsIndwYmNfZ2V0X2NhbGVuZGFyX19qcV9ub2RlX19mb3JfbWVzc2FnZXMiLCJkYXRhIiwibWVzc2FnZV90eXBlIiwid3BiY19mcm9udF9lbmRfX3Nob3dfbWVzc2FnZSIsImZhaWwiLCJlcnJvclRocm93biIsIndpbmRvdyIsImVycm9yX21lc3NhZ2UiLCJzdGF0dXMiLCJtZXNzYWdlX3Nob3dfZGVsYXkiLCJyZXNwb25zZVRleHQiLCJjbG9zZWRfdGltZXIiLCJhanhfcG9zdF9kYXRhX3VybF9wYXJhbXMiLCJjYWxlbmRhcl9yZXNvdXJjZV9pZCIsIndwYmNfZ2V0X3Jlc291cmNlX2lkX19mcm9tX2FqeF9wb3N0X2RhdGFfdXJsIiwid3BiY19nZXRfdXJpX3BhcmFtX2J5X25hbWUiLCJ1cmwiLCJkZWNvZGVVUklDb21wb25lbnQiLCJyZWdleCIsIlJlZ0V4cCIsInJlc3VsdHMiLCJleGVjIiwibWVzc2FnZSIsInBhcmFtc19kZWZhdWx0IiwicF9rZXkiLCJ1bmlxdWVfZGl2X2lkIiwiZ2V0VGltZSIsInNjcm9sbF90b19lbGVtZW50IiwianFfZWxfbWVzc2FnZSIsImlzX3Nob3dfbWVzc2FnZSIsImFwcGVuZCIsImh0bWwiLCJzaWJsaW5ncyIsImlzIiwiYmVmb3JlIiwibmV4dEFsbCIsImZhZGVPdXQiLCJjbG9zZWRfdGltZXIyIiwicGFyZW50X2VscyIsInBhcmVudHMiLCJtYXAiLCJoYXMiLCJzaG93Iiwid3BiY19kb19zY3JvbGwiLCJ3cGJjX2Zyb250X2VuZF9fc2hvd19tZXNzYWdlX19lcnJvciIsIm5vdGljZV9tZXNzYWdlX2lkIiwid3BiY19mcm9udF9lbmRfX3Nob3dfbWVzc2FnZV9fZXJyb3JfdW5kZXJfZWxlbWVudCIsIm1lc3NhZ2VfZGVsYXkiLCJ3cGJjX2Zyb250X2VuZF9fc2hvd19tZXNzYWdlX19lcnJvcl9hYm92ZV9lbGVtZW50Iiwid3BiY19mcm9udF9lbmRfX3Nob3dfbWVzc2FnZV9fd2FybmluZyIsIndwYmNfZnJvbnRfZW5kX19zaG93X21lc3NhZ2VfX3dhcm5pbmdfdW5kZXJfZWxlbWVudCIsIndwYmNfZnJvbnRfZW5kX19zaG93X21lc3NhZ2VfX3dhcm5pbmdfYWJvdmVfZWxlbWVudCIsImV4dHJhX3NoaWZ0X29mZnNldCIsInRhcmdldE9mZnNldCIsIm9mZnNldCIsInRvcCIsImZpcnN0IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCJdLCJtYXBwaW5ncyI6IkFBQUEsYSxDQUM4Qjs7QUFDOUI7QUFDQTtBQUNBOzs7O0FBRUEsSUFBSUEsS0FBSyxHQUFJLFVBQVdDLEdBQVgsRUFBZ0JDLENBQWhCLEVBQW1CO0FBRS9CO0FBQ0EsTUFBSUMsUUFBUSxHQUFHRixHQUFHLENBQUNHLFlBQUosR0FBbUJILEdBQUcsQ0FBQ0csWUFBSixJQUFvQjtBQUN4Q0MsSUFBQUEsT0FBTyxFQUFFLENBRCtCO0FBRXhDQyxJQUFBQSxLQUFLLEVBQUksRUFGK0I7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QixLQUFqRCxHQUF5REYsTUFBekQsR0FBa0VDLEdBQWpGO0FBQ0E7QUFDRDs7QUFFRCxNQUFLeFMsTUFBTSxDQUFFLGFBQUYsQ0FBTixDQUF3Qk0sTUFBeEIsR0FBaUMsQ0FBdEMsRUFBeUM7QUFDeENnUyxJQUFBQSxZQUFZLEdBQUdBLFlBQVksR0FBRyxFQUFmLEdBQW9CLEVBQW5DO0FBQ0EsR0FGRCxNQUVPO0FBQ05BLElBQUFBLFlBQVksR0FBR0EsWUFBWSxHQUFHLEVBQWYsR0FBb0IsRUFBbkM7QUFDQTs7QUFDREEsRUFBQUEsWUFBWSxJQUFJRCxrQkFBaEIsQ0FwQjBELENBc0IxRDs7QUFDQSxNQUFLLENBQUVyUyxNQUFNLENBQUUsV0FBRixDQUFOLENBQXNCa1IsRUFBdEIsQ0FBMEIsV0FBMUIsQ0FBUCxFQUFnRDtBQUMvQ2xSLElBQUFBLE1BQU0sQ0FBRSxXQUFGLENBQU4sQ0FBc0IwUyxPQUF0QixDQUErQjtBQUFDQyxNQUFBQSxTQUFTLEVBQUVMO0FBQVosS0FBL0IsRUFBMEQsR0FBMUQ7QUFDQTtBQUNELEMsQ0FHRCIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL0ZpeEluOiA5LjguMC4zXHJcbi8qKlxyXG4gKiBNYWluIF93cGJjIEpTIG9iamVjdFxyXG4gKi9cclxuXHJcbnZhciBfd3BiYyA9IChmdW5jdGlvbiAoIG9iaiwgJCkge1xyXG5cclxuXHQvLyBTZWN1cmUgcGFyYW1ldGVycyBmb3IgQWpheFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0dmFyIHBfc2VjdXJlID0gb2JqLnNlY3VyaXR5X29iaiA9IG9iai5zZWN1cml0eV9vYmogfHwge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1c2VyX2lkOiAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRub25jZSAgOiAnJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bG9jYWxlIDogJydcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgfTtcclxuXHRvYmouc2V0X3NlY3VyZV9wYXJhbSA9IGZ1bmN0aW9uICggcGFyYW1fa2V5LCBwYXJhbV92YWwgKSB7XHJcblx0XHRwX3NlY3VyZVsgcGFyYW1fa2V5IF0gPSBwYXJhbV92YWw7XHJcblx0fTtcclxuXHJcblx0b2JqLmdldF9zZWN1cmVfcGFyYW0gPSBmdW5jdGlvbiAoIHBhcmFtX2tleSApIHtcclxuXHRcdHJldHVybiBwX3NlY3VyZVsgcGFyYW1fa2V5IF07XHJcblx0fTtcclxuXHJcblxyXG5cdC8vIENhbGVuZGFycyBcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHR2YXIgcF9jYWxlbmRhcnMgPSBvYmouY2FsZW5kYXJzX29iaiA9IG9iai5jYWxlbmRhcnNfb2JqIHx8IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gc29ydCAgICAgICAgICAgIDogXCJib29raW5nX2lkXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIHNvcnRfdHlwZSAgICAgICA6IFwiREVTQ1wiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBwYWdlX251bSAgICAgICAgOiAxLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBwYWdlX2l0ZW1zX2NvdW50OiAxMCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gY3JlYXRlX2RhdGUgICAgIDogXCJcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8ga2V5d29yZCAgICAgICAgIDogXCJcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gc291cmNlICAgICAgICAgIDogXCJcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqICBDaGVjayBpZiBjYWxlbmRhciBmb3Igc3BlY2lmaWMgYm9va2luZyByZXNvdXJjZSBkZWZpbmVkICAgOjogICB0cnVlIHwgZmFsc2VcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfGludH0gcmVzb3VyY2VfaWRcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRvYmouY2FsZW5kYXJfX2lzX2RlZmluZWQgPSBmdW5jdGlvbiAoIHJlc291cmNlX2lkICkge1xyXG5cclxuXHRcdHJldHVybiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiggcF9jYWxlbmRhcnNbICdjYWxlbmRhcl8nICsgcmVzb3VyY2VfaWQgXSApICk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogIENyZWF0ZSBDYWxlbmRhciBpbml0aWFsaXppbmdcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfGludH0gcmVzb3VyY2VfaWRcclxuXHQgKi9cclxuXHRvYmouY2FsZW5kYXJfX2luaXQgPSBmdW5jdGlvbiAoIHJlc291cmNlX2lkICkge1xyXG5cclxuXHRcdHBfY2FsZW5kYXJzWyAnY2FsZW5kYXJfJyArIHJlc291cmNlX2lkIF0gPSB7fTtcclxuXHRcdHBfY2FsZW5kYXJzWyAnY2FsZW5kYXJfJyArIHJlc291cmNlX2lkIF1bICdpZCcgXSA9IHJlc291cmNlX2lkO1xyXG5cdFx0cF9jYWxlbmRhcnNbICdjYWxlbmRhcl8nICsgcmVzb3VyY2VfaWQgXVsgJ3BlbmRpbmdfZGF5c19zZWxlY3RhYmxlJyBdID0gZmFsc2U7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCBwYXJhbXMgZm9yIGFsbCAgY2FsZW5kYXJzXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge29iamVjdH0gY2FsZW5kYXJzX29ialx0XHRPYmplY3QgeyBjYWxlbmRhcl8xOiB7fSB9XHJcblx0ICogXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0IGNhbGVuZGFyXzM6IHt9LCAuLi4gfVxyXG5cdCAqL1xyXG5cdG9iai5jYWxlbmRhcnNfYWxsX19zZXQgPSBmdW5jdGlvbiAoIGNhbGVuZGFyc19vYmogKSB7XHJcblx0XHRwX2NhbGVuZGFycyA9IGNhbGVuZGFyc19vYmo7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0IGJvb2tpbmdzIGluIGFsbCBjYWxlbmRhcnNcclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHtvYmplY3R8e319XHJcblx0ICovXHJcblx0b2JqLmNhbGVuZGFyc19hbGxfX2dldCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBwX2NhbGVuZGFycztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgY2FsZW5kYXIgb2JqZWN0ICAgOjogICB7IGlkOiAxLCDigKYgfVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd8aW50fSByZXNvdXJjZV9pZFx0XHRcdFx0ICAnMidcclxuXHQgKiBAcmV0dXJucyB7b2JqZWN0fGJvb2xlYW59XHRcdFx0XHRcdHsgaWQ6IDIgLOKApiB9XHJcblx0ICovXHJcblx0b2JqLmNhbGVuZGFyX19nZXRfcGFyYW1ldGVycyA9IGZ1bmN0aW9uICggcmVzb3VyY2VfaWQgKSB7XHJcblxyXG5cdFx0aWYgKCBvYmouY2FsZW5kYXJfX2lzX2RlZmluZWQoIHJlc291cmNlX2lkICkgKXtcclxuXHJcblx0XHRcdHJldHVybiBwX2NhbGVuZGFyc1sgJ2NhbGVuZGFyXycgKyByZXNvdXJjZV9pZCBdO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCBjYWxlbmRhciBvYmplY3QgICA6OiAgIHsgZGF0ZXM6ICBPYmplY3QgeyBcIjIwMjMtMDctMjFcIjoge+KApn0sIFwiMjAyMy0wNy0yMlwiOiB74oCmfSwgXCIyMDIzLTA3LTIzXCI6IHvigKZ9LCDigKYgfVxyXG5cdCAqXHJcblx0ICogaWYgY2FsZW5kYXIgb2JqZWN0ICBub3QgZGVmaW5lZCwgdGhlbiAgaXQncyB3aWxsIGJlIGRlZmluZWQgYW5kIElEIHNldFxyXG5cdCAqIGlmIGNhbGVuZGFyIGV4aXN0LCB0aGVuICBzeXN0ZW0gc2V0ICBhcyBuZXcgb3Igb3ZlcndyaXRlIG9ubHkgcHJvcGVydGllcyBmcm9tIGNhbGVuZGFyX3Byb3BlcnR5X29iaiBwYXJhbWV0ZXIsICBidXQgb3RoZXIgcHJvcGVydGllcyB3aWxsIGJlIGV4aXN0ZWQgYW5kIG5vdCBvdmVyd3JpdGUsIGxpa2UgJ2lkJ1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd8aW50fSByZXNvdXJjZV9pZFx0XHRcdFx0ICAnMidcclxuXHQgKiBAcGFyYW0ge29iamVjdH0gY2FsZW5kYXJfcHJvcGVydHlfb2JqXHRcdFx0XHRcdCAgeyAgZGF0ZXM6ICBPYmplY3QgeyBcIjIwMjMtMDctMjFcIjoge+KApn0sIFwiMjAyMy0wNy0yMlwiOiB74oCmfSwgXCIyMDIzLTA3LTIzXCI6IHvigKZ9LCDigKYgfSAgfVxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNfY29tcGxldGVfb3ZlcndyaXRlXHRcdCAgaWYgJ3RydWUnIChkZWZhdWx0OiAnZmFsc2UnKSwgIHRoZW4gIG9ubHkgb3ZlcndyaXRlIG9yIGFkZCAgbmV3IHByb3BlcnRpZXMgaW4gIGNhbGVuZGFyX3Byb3BlcnR5X29ialxyXG5cdCAqIEByZXR1cm5zIHsqfVxyXG5cdCAqXHJcblx0ICogRXhhbXBsZXM6XHJcblx0ICpcclxuXHQgKiBDb21tb24gdXNhZ2UgaW4gUEhQOlxyXG5cdCAqICAgXHRcdFx0ZWNobyBcIiAgX3dwYmMuY2FsZW5kYXJfX3NldCggIFwiIC5pbnR2YWwoICRyZXNvdXJjZV9pZCApIC4gXCIsIHsgJ2RhdGVzJzogXCIgLiB3cF9qc29uX2VuY29kZSggJGF2YWlsYWJpbGl0eV9wZXJfZGF5c19hcnIgKSAuIFwiIH0gKTtcIjtcclxuXHQgKi9cclxuXHRvYmouY2FsZW5kYXJfX3NldF9wYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCByZXNvdXJjZV9pZCwgY2FsZW5kYXJfcHJvcGVydHlfb2JqLCBpc19jb21wbGV0ZV9vdmVyd3JpdGUgPSBmYWxzZSAgKSB7XHJcblxyXG5cdFx0aWYgKCAoIW9iai5jYWxlbmRhcl9faXNfZGVmaW5lZCggcmVzb3VyY2VfaWQgKSkgfHwgKHRydWUgPT09IGlzX2NvbXBsZXRlX292ZXJ3cml0ZSkgKXtcclxuXHRcdFx0b2JqLmNhbGVuZGFyX19pbml0KCByZXNvdXJjZV9pZCApO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAoIHZhciBwcm9wX25hbWUgaW4gY2FsZW5kYXJfcHJvcGVydHlfb2JqICl7XHJcblxyXG5cdFx0XHRwX2NhbGVuZGFyc1sgJ2NhbGVuZGFyXycgKyByZXNvdXJjZV9pZCBdWyBwcm9wX25hbWUgXSA9IGNhbGVuZGFyX3Byb3BlcnR5X29ialsgcHJvcF9uYW1lIF07XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBfY2FsZW5kYXJzWyAnY2FsZW5kYXJfJyArIHJlc291cmNlX2lkIF07XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0IHByb3BlcnR5ICB0byAgY2FsZW5kYXJcclxuXHQgKiBAcGFyYW0gcmVzb3VyY2VfaWRcdFwiMVwiXHJcblx0ICogQHBhcmFtIHByb3BfbmFtZVx0XHRuYW1lIG9mIHByb3BlcnR5XHJcblx0ICogQHBhcmFtIHByb3BfdmFsdWVcdHZhbHVlIG9mIHByb3BlcnR5XHJcblx0ICogQHJldHVybnMgeyp9XHRcdFx0Y2FsZW5kYXIgb2JqZWN0XHJcblx0ICovXHJcblx0b2JqLmNhbGVuZGFyX19zZXRfcGFyYW1fdmFsdWUgPSBmdW5jdGlvbiAoIHJlc291cmNlX2lkLCBwcm9wX25hbWUsIHByb3BfdmFsdWUgKSB7XHJcblxyXG5cdFx0aWYgKCAoIW9iai5jYWxlbmRhcl9faXNfZGVmaW5lZCggcmVzb3VyY2VfaWQgKSkgKXtcclxuXHRcdFx0b2JqLmNhbGVuZGFyX19pbml0KCByZXNvdXJjZV9pZCApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBfY2FsZW5kYXJzWyAnY2FsZW5kYXJfJyArIHJlc291cmNlX2lkIF1bIHByb3BfbmFtZSBdID0gcHJvcF92YWx1ZTtcclxuXHJcblx0XHRyZXR1cm4gcF9jYWxlbmRhcnNbICdjYWxlbmRhcl8nICsgcmVzb3VyY2VfaWQgXTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiAgR2V0IGNhbGVuZGFyIHByb3BlcnR5IHZhbHVlICAgXHQ6OiAgIG1peGVkIHwgbnVsbFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd8aW50fSAgcmVzb3VyY2VfaWRcdFx0JzEnXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHByb3BfbmFtZVx0XHRcdCdzZWxlY3Rpb25fbW9kZSdcclxuXHQgKiBAcmV0dXJucyB7KnxudWxsfVx0XHRcdFx0XHRtaXhlZCB8IG51bGxcclxuXHQgKi9cclxuXHRvYmouY2FsZW5kYXJfX2dldF9wYXJhbV92YWx1ZSA9IGZ1bmN0aW9uKCByZXNvdXJjZV9pZCwgcHJvcF9uYW1lICl7XHJcblxyXG5cdFx0aWYgKFxyXG5cdFx0XHQgICAoIG9iai5jYWxlbmRhcl9faXNfZGVmaW5lZCggcmVzb3VyY2VfaWQgKSApXHJcblx0XHRcdCYmICggJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiAoIHBfY2FsZW5kYXJzWyAnY2FsZW5kYXJfJyArIHJlc291cmNlX2lkIF1bIHByb3BfbmFtZSBdICkgKVxyXG5cdFx0KXtcclxuXHRcdFx0cmV0dXJuICBwX2NhbGVuZGFyc1sgJ2NhbGVuZGFyXycgKyByZXNvdXJjZV9pZCBdWyBwcm9wX25hbWUgXTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcdFx0Ly8gSWYgc29tZSBwcm9wZXJ0eSBub3QgZGVmaW5lZCwgdGhlbiBudWxsO1xyXG5cdH07XHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG5cdC8vIEJvb2tpbmdzIFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHZhciBwX2Jvb2tpbmdzID0gb2JqLmJvb2tpbmdzX29iaiA9IG9iai5ib29raW5nc19vYmogfHwge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGNhbGVuZGFyXzE6IE9iamVjdCB7XHJcbiBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vXHRcdFx0XHRcdFx0ICAgaWQ6ICAgICAxXHJcbiBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vXHRcdFx0XHRcdFx0ICwgZGF0ZXM6ICBPYmplY3QgeyBcIjIwMjMtMDctMjFcIjoge+KApn0sIFwiMjAyMy0wNy0yMlwiOiB74oCmfSwgXCIyMDIzLTA3LTIzXCI6IHvigKZ9LCDigKZcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyB9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqICBDaGVjayBpZiBib29raW5ncyBmb3Igc3BlY2lmaWMgYm9va2luZyByZXNvdXJjZSBkZWZpbmVkICAgOjogICB0cnVlIHwgZmFsc2VcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfGludH0gcmVzb3VyY2VfaWRcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRvYmouYm9va2luZ3NfaW5fY2FsZW5kYXJfX2lzX2RlZmluZWQgPSBmdW5jdGlvbiAoIHJlc291cmNlX2lkICkge1xyXG5cclxuXHRcdHJldHVybiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiggcF9ib29raW5nc1sgJ2NhbGVuZGFyXycgKyByZXNvdXJjZV9pZCBdICkgKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgYm9va2luZ3MgY2FsZW5kYXIgb2JqZWN0ICAgOjogICB7IGlkOiAxICwgZGF0ZXM6ICBPYmplY3QgeyBcIjIwMjMtMDctMjFcIjoge+KApn0sIFwiMjAyMy0wNy0yMlwiOiB74oCmfSwgXCIyMDIzLTA3LTIzXCI6IHvigKZ9LCDigKYgfVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd8aW50fSByZXNvdXJjZV9pZFx0XHRcdFx0ICAnMidcclxuXHQgKiBAcmV0dXJucyB7b2JqZWN0fGJvb2xlYW59XHRcdFx0XHRcdHsgaWQ6IDIgLCBkYXRlczogIE9iamVjdCB7IFwiMjAyMy0wNy0yMVwiOiB74oCmfSwgXCIyMDIzLTA3LTIyXCI6IHvigKZ9LCBcIjIwMjMtMDctMjNcIjoge+KApn0sIOKApiB9XHJcblx0ICovXHJcblx0b2JqLmJvb2tpbmdzX2luX2NhbGVuZGFyX19nZXQgPSBmdW5jdGlvbiggcmVzb3VyY2VfaWQgKXtcclxuXHJcblx0XHRpZiAoIG9iai5ib29raW5nc19pbl9jYWxlbmRhcl9faXNfZGVmaW5lZCggcmVzb3VyY2VfaWQgKSApe1xyXG5cclxuXHRcdFx0cmV0dXJuIHBfYm9va2luZ3NbICdjYWxlbmRhcl8nICsgcmVzb3VyY2VfaWQgXTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXQgYm9va2luZ3MgY2FsZW5kYXIgb2JqZWN0ICAgOjogICB7IGRhdGVzOiAgT2JqZWN0IHsgXCIyMDIzLTA3LTIxXCI6IHvigKZ9LCBcIjIwMjMtMDctMjJcIjoge+KApn0sIFwiMjAyMy0wNy0yM1wiOiB74oCmfSwg4oCmIH1cclxuXHQgKlxyXG5cdCAqIGlmIGNhbGVuZGFyIG9iamVjdCAgbm90IGRlZmluZWQsIHRoZW4gIGl0J3Mgd2lsbCBiZSBkZWZpbmVkIGFuZCBJRCBzZXRcclxuXHQgKiBpZiBjYWxlbmRhciBleGlzdCwgdGhlbiAgc3lzdGVtIHNldCAgYXMgbmV3IG9yIG92ZXJ3cml0ZSBvbmx5IHByb3BlcnRpZXMgZnJvbSBjYWxlbmRhcl9vYmogcGFyYW1ldGVyLCAgYnV0IG90aGVyIHByb3BlcnRpZXMgd2lsbCBiZSBleGlzdGVkIGFuZCBub3Qgb3ZlcndyaXRlLCBsaWtlICdpZCdcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfGludH0gcmVzb3VyY2VfaWRcdFx0XHRcdCAgJzInXHJcblx0ICogQHBhcmFtIHtvYmplY3R9IGNhbGVuZGFyX29ialx0XHRcdFx0XHQgIHsgIGRhdGVzOiAgT2JqZWN0IHsgXCIyMDIzLTA3LTIxXCI6IHvigKZ9LCBcIjIwMjMtMDctMjJcIjoge+KApn0sIFwiMjAyMy0wNy0yM1wiOiB74oCmfSwg4oCmIH0gIH1cclxuXHQgKiBAcmV0dXJucyB7Kn1cclxuXHQgKlxyXG5cdCAqIEV4YW1wbGVzOlxyXG5cdCAqXHJcblx0ICogQ29tbW9uIHVzYWdlIGluIFBIUDpcclxuXHQgKiAgIFx0XHRcdGVjaG8gXCIgIF93cGJjLmJvb2tpbmdzX2luX2NhbGVuZGFyX19zZXQoICBcIiAuaW50dmFsKCAkcmVzb3VyY2VfaWQgKSAuIFwiLCB7ICdkYXRlcyc6IFwiIC4gd3BfanNvbl9lbmNvZGUoICRhdmFpbGFiaWxpdHlfcGVyX2RheXNfYXJyICkgLiBcIiB9ICk7XCI7XHJcblx0ICovXHJcblx0b2JqLmJvb2tpbmdzX2luX2NhbGVuZGFyX19zZXQgPSBmdW5jdGlvbiggcmVzb3VyY2VfaWQsIGNhbGVuZGFyX29iaiApe1xyXG5cclxuXHRcdGlmICggISBvYmouYm9va2luZ3NfaW5fY2FsZW5kYXJfX2lzX2RlZmluZWQoIHJlc291cmNlX2lkICkgKXtcclxuXHRcdFx0cF9ib29raW5nc1sgJ2NhbGVuZGFyXycgKyByZXNvdXJjZV9pZCBdID0ge307XHJcblx0XHRcdHBfYm9va2luZ3NbICdjYWxlbmRhcl8nICsgcmVzb3VyY2VfaWQgXVsgJ2lkJyBdID0gcmVzb3VyY2VfaWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yICggdmFyIHByb3BfbmFtZSBpbiBjYWxlbmRhcl9vYmogKXtcclxuXHJcblx0XHRcdHBfYm9va2luZ3NbICdjYWxlbmRhcl8nICsgcmVzb3VyY2VfaWQgXVsgcHJvcF9uYW1lIF0gPSBjYWxlbmRhcl9vYmpbIHByb3BfbmFtZSBdO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwX2Jvb2tpbmdzWyAnY2FsZW5kYXJfJyArIHJlc291cmNlX2lkIF07XHJcblx0fTtcclxuXHJcblx0Ly8gRGF0ZXNcclxuXHJcblx0LyoqXHJcblx0ICogIEdldCBib29raW5ncyBkYXRhIGZvciBBTEwgRGF0ZXMgaW4gY2FsZW5kYXIgICA6OiAgIGZhbHNlIHwgeyBcIjIwMjMtMDctMjJcIjoge+KApn0sIFwiMjAyMy0wNy0yM1wiOiB74oCmfSwg4oCmIH1cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfGludH0gcmVzb3VyY2VfaWRcdFx0XHQnMSdcclxuXHQgKiBAcmV0dXJucyB7b2JqZWN0fGJvb2xlYW59XHRcdFx0XHRmYWxzZSB8IE9iamVjdCB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCIyMDIzLTA3LTI0XCI6IE9iamVjdCB7IFsnc3VtbWFyeSddWydzdGF0dXNfZm9yX2RheSddOiBcImF2YWlsYWJsZVwiLCBkYXlfYXZhaWxhYmlsaXR5OiAxLCBtYXhfY2FwYWNpdHk6IDEsIOKApiB9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCIyMDIzLTA3LTI2XCI6IE9iamVjdCB7IFsnc3VtbWFyeSddWydzdGF0dXNfZm9yX2RheSddOiBcImZ1bGxfZGF5X2Jvb2tpbmdcIiwgWydzdW1tYXJ5J11bJ3N0YXR1c19mb3JfYm9va2luZ3MnXTogXCJwZW5kaW5nXCIsIGRheV9hdmFpbGFiaWxpdHk6IDAsIOKApiB9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCIyMDIzLTA3LTI5XCI6IE9iamVjdCB7IFsnc3VtbWFyeSddWydzdGF0dXNfZm9yX2RheSddOiBcInJlc291cmNlX2F2YWlsYWJpbGl0eVwiLCBkYXlfYXZhaWxhYmlsaXR5OiAwLCBtYXhfY2FwYWNpdHk6IDEsIOKApiB9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCIyMDIzLTA3LTMwXCI6IHvigKZ9LCBcIjIwMjMtMDctMzFcIjoge+KApn0sIOKAplxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0ICovXHJcblx0b2JqLmJvb2tpbmdzX2luX2NhbGVuZGFyX19nZXRfZGF0ZXMgPSBmdW5jdGlvbiggcmVzb3VyY2VfaWQpe1xyXG5cclxuXHRcdGlmIChcclxuXHRcdFx0ICAgKCBvYmouYm9va2luZ3NfaW5fY2FsZW5kYXJfX2lzX2RlZmluZWQoIHJlc291cmNlX2lkICkgKVxyXG5cdFx0XHQmJiAoICd1bmRlZmluZWQnICE9PSB0eXBlb2YgKCBwX2Jvb2tpbmdzWyAnY2FsZW5kYXJfJyArIHJlc291cmNlX2lkIF1bICdkYXRlcycgXSApIClcclxuXHRcdCl7XHJcblx0XHRcdHJldHVybiAgcF9ib29raW5nc1sgJ2NhbGVuZGFyXycgKyByZXNvdXJjZV9pZCBdWyAnZGF0ZXMnIF07XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1x0XHQvLyBJZiBzb21lIHByb3BlcnR5IG5vdCBkZWZpbmVkLCB0aGVuIGZhbHNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCBib29raW5ncyBkYXRlcyBpbiBjYWxlbmRhciBvYmplY3QgICA6OiAgICB7IFwiMjAyMy0wNy0yMVwiOiB74oCmfSwgXCIyMDIzLTA3LTIyXCI6IHvigKZ9LCBcIjIwMjMtMDctMjNcIjoge+KApn0sIOKApiB9XHJcblx0ICpcclxuXHQgKiBpZiBjYWxlbmRhciBvYmplY3QgIG5vdCBkZWZpbmVkLCB0aGVuICBpdCdzIHdpbGwgYmUgZGVmaW5lZCBhbmQgJ2lkJywgJ2RhdGVzJyBzZXRcclxuXHQgKiBpZiBjYWxlbmRhciBleGlzdCwgdGhlbiBzeXN0ZW0gYWRkIGEgIG5ldyBvciBvdmVyd3JpdGUgb25seSBkYXRlcyBmcm9tIGRhdGVzX29iaiBwYXJhbWV0ZXIsXHJcblx0ICogYnV0IG90aGVyIGRhdGVzIG5vdCBmcm9tIHBhcmFtZXRlciBkYXRlc19vYmogd2lsbCBiZSBleGlzdGVkIGFuZCBub3Qgb3ZlcndyaXRlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd8aW50fSByZXNvdXJjZV9pZFx0XHRcdFx0ICAnMidcclxuXHQgKiBAcGFyYW0ge29iamVjdH0gZGF0ZXNfb2JqXHRcdFx0XHRcdCAgeyBcIjIwMjMtMDctMjFcIjoge+KApn0sIFwiMjAyMy0wNy0yMlwiOiB74oCmfSwgXCIyMDIzLTA3LTIzXCI6IHvigKZ9LCDigKYgfVxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNfY29tcGxldGVfb3ZlcndyaXRlXHRcdCAgaWYgZmFsc2UsICB0aGVuICBvbmx5IG92ZXJ3cml0ZSBvciBhZGQgIGRhdGVzIGZyb20gXHRkYXRlc19vYmpcclxuXHQgKiBAcmV0dXJucyB7Kn1cclxuXHQgKlxyXG5cdCAqIEV4YW1wbGVzOlxyXG5cdCAqICAgXHRcdFx0X3dwYmMuYm9va2luZ3NfaW5fY2FsZW5kYXJfX3NldF9kYXRlcyggcmVzb3VyY2VfaWQsIHsgXCIyMDIzLTA3LTIxXCI6IHvigKZ9LCBcIjIwMjMtMDctMjJcIjoge+KApn0sIOKApiB9ICApO1x0XHQ8LSAgIG92ZXJ3cml0ZSBBTEwgZGF0ZXNcclxuXHQgKiAgIFx0XHRcdF93cGJjLmJvb2tpbmdzX2luX2NhbGVuZGFyX19zZXRfZGF0ZXMoIHJlc291cmNlX2lkLCB7IFwiMjAyMy0wNy0yMlwiOiB74oCmfSB9LCAgZmFsc2UgICk7XHRcdFx0XHRcdDwtICAgYWRkIG9yIG92ZXJ3cml0ZSBvbmx5ICBcdFwiMjAyMy0wNy0yMlwiOiB7fVxyXG5cdCAqXHJcblx0ICogQ29tbW9uIHVzYWdlIGluIFBIUDpcclxuXHQgKiAgIFx0XHRcdGVjaG8gXCIgIF93cGJjLmJvb2tpbmdzX2luX2NhbGVuZGFyX19zZXRfZGF0ZXMoICBcIiAuIGludHZhbCggJHJlc291cmNlX2lkICkgLiBcIiwgIFwiIC4gd3BfanNvbl9lbmNvZGUoICRhdmFpbGFiaWxpdHlfcGVyX2RheXNfYXJyICkgLiBcIiAgKTsgIFwiO1xyXG5cdCAqL1xyXG5cdG9iai5ib29raW5nc19pbl9jYWxlbmRhcl9fc2V0X2RhdGVzID0gZnVuY3Rpb24oIHJlc291cmNlX2lkLCBkYXRlc19vYmogLCBpc19jb21wbGV0ZV9vdmVyd3JpdGUgPSB0cnVlICl7XHJcblxyXG5cdFx0aWYgKCAhb2JqLmJvb2tpbmdzX2luX2NhbGVuZGFyX19pc19kZWZpbmVkKCByZXNvdXJjZV9pZCApICl7XHJcblx0XHRcdG9iai5ib29raW5nc19pbl9jYWxlbmRhcl9fc2V0KCByZXNvdXJjZV9pZCwgeyAnZGF0ZXMnOiB7fSB9ICk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCAndW5kZWZpbmVkJyA9PT0gdHlwZW9mIChwX2Jvb2tpbmdzWyAnY2FsZW5kYXJfJyArIHJlc291cmNlX2lkIF1bICdkYXRlcycgXSkgKXtcclxuXHRcdFx0cF9ib29raW5nc1sgJ2NhbGVuZGFyXycgKyByZXNvdXJjZV9pZCBdWyAnZGF0ZXMnIF0gPSB7fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChpc19jb21wbGV0ZV9vdmVyd3JpdGUpe1xyXG5cclxuXHRcdFx0Ly8gQ29tcGxldGUgb3ZlcndyaXRlIGFsbCAgYm9va2luZyBkYXRlc1xyXG5cdFx0XHRwX2Jvb2tpbmdzWyAnY2FsZW5kYXJfJyArIHJlc291cmNlX2lkIF1bICdkYXRlcycgXSA9IGRhdGVzX29iajtcclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHQvLyBBZGQgb25seSAgbmV3IG9yIG92ZXJ3cml0ZSBleGlzdCBib29raW5nIGRhdGVzIGZyb20gIHBhcmFtZXRlci4gQm9va2luZyBkYXRlcyBub3QgZnJvbSAgcGFyYW1ldGVyICB3aWxsICBiZSB3aXRob3V0IGNobmFuZ2VzXHJcblx0XHRcdGZvciAoIHZhciBwcm9wX25hbWUgaW4gZGF0ZXNfb2JqICl7XHJcblxyXG5cdFx0XHRcdHBfYm9va2luZ3NbICdjYWxlbmRhcl8nICsgcmVzb3VyY2VfaWQgXVsnZGF0ZXMnXVsgcHJvcF9uYW1lIF0gPSBkYXRlc19vYmpbIHByb3BfbmFtZSBdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBfYm9va2luZ3NbICdjYWxlbmRhcl8nICsgcmVzb3VyY2VfaWQgXTtcclxuXHR9O1xyXG5cclxuXHJcblx0LyoqXHJcblx0ICogIEdldCBib29raW5ncyBkYXRhIGZvciBzcGVjaWZpYyBkYXRlIGluIGNhbGVuZGFyICAgOjogICBmYWxzZSB8IHsgZGF5X2F2YWlsYWJpbGl0eTogMSwgLi4uIH1cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfGludH0gcmVzb3VyY2VfaWRcdFx0XHQnMSdcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3FsX2NsYXNzX2RheVx0XHRcdCcyMDIzLTA3LTIxJ1xyXG5cdCAqIEByZXR1cm5zIHtvYmplY3R8Ym9vbGVhbn1cdFx0XHRcdGZhbHNlIHwge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXlfYXZhaWxhYmlsaXR5OiA0XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1heF9jYXBhY2l0eTogNFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vICA+PSBCdXNpbmVzcyBMYXJnZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQyOiBPYmplY3QgeyBpc19kYXlfdW5hdmFpbGFibGU6IGZhbHNlLCBfZGF5X3N0YXR1czogXCJhdmFpbGFibGVcIiB9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDEwOiBPYmplY3QgeyBpc19kYXlfdW5hdmFpbGFibGU6IGZhbHNlLCBfZGF5X3N0YXR1czogXCJhdmFpbGFibGVcIiB9XHRcdC8vICA+PSBCdXNpbmVzcyBMYXJnZSAuLi5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0MTE6IE9iamVjdCB7IGlzX2RheV91bmF2YWlsYWJsZTogZmFsc2UsIF9kYXlfc3RhdHVzOiBcImF2YWlsYWJsZVwiIH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0MTI6IE9iamVjdCB7IGlzX2RheV91bmF2YWlsYWJsZTogZmFsc2UsIF9kYXlfc3RhdHVzOiBcImF2YWlsYWJsZVwiIH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHQgKi9cclxuXHRvYmouYm9va2luZ3NfaW5fY2FsZW5kYXJfX2dldF9mb3JfZGF0ZSA9IGZ1bmN0aW9uKCByZXNvdXJjZV9pZCwgc3FsX2NsYXNzX2RheSApe1xyXG5cclxuXHRcdGlmIChcclxuXHRcdFx0ICAgKCBvYmouYm9va2luZ3NfaW5fY2FsZW5kYXJfX2lzX2RlZmluZWQoIHJlc291cmNlX2lkICkgKVxyXG5cdFx0XHQmJiAoICd1bmRlZmluZWQnICE9PSB0eXBlb2YgKCBwX2Jvb2tpbmdzWyAnY2FsZW5kYXJfJyArIHJlc291cmNlX2lkIF1bICdkYXRlcycgXSApIClcclxuXHRcdFx0JiYgKCAndW5kZWZpbmVkJyAhPT0gdHlwZW9mICggcF9ib29raW5nc1sgJ2NhbGVuZGFyXycgKyByZXNvdXJjZV9pZCBdWyAnZGF0ZXMnIF1bIHNxbF9jbGFzc19kYXkgXSApIClcclxuXHRcdCl7XHJcblx0XHRcdHJldHVybiAgcF9ib29raW5nc1sgJ2NhbGVuZGFyXycgKyByZXNvdXJjZV9pZCBdWyAnZGF0ZXMnIF1bIHNxbF9jbGFzc19kYXkgXTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHRcdC8vIElmIHNvbWUgcHJvcGVydHkgbm90IGRlZmluZWQsIHRoZW4gZmFsc2U7XHJcblx0fTtcclxuXHJcblxyXG5cdC8vIEFueSAgUEFSQU1TICAgaW4gYm9va2luZ3NcclxuXHJcblx0LyoqXHJcblx0ICogU2V0IHByb3BlcnR5ICB0byAgYm9va2luZ1xyXG5cdCAqIEBwYXJhbSByZXNvdXJjZV9pZFx0XCIxXCJcclxuXHQgKiBAcGFyYW0gcHJvcF9uYW1lXHRcdG5hbWUgb2YgcHJvcGVydHlcclxuXHQgKiBAcGFyYW0gcHJvcF92YWx1ZVx0dmFsdWUgb2YgcHJvcGVydHlcclxuXHQgKiBAcmV0dXJucyB7Kn1cdFx0XHRib29raW5nIG9iamVjdFxyXG5cdCAqL1xyXG5cdG9iai5ib29raW5nX19zZXRfcGFyYW1fdmFsdWUgPSBmdW5jdGlvbiAoIHJlc291cmNlX2lkLCBwcm9wX25hbWUsIHByb3BfdmFsdWUgKSB7XHJcblxyXG5cdFx0aWYgKCAhIG9iai5ib29raW5nc19pbl9jYWxlbmRhcl9faXNfZGVmaW5lZCggcmVzb3VyY2VfaWQgKSApe1xyXG5cdFx0XHRwX2Jvb2tpbmdzWyAnY2FsZW5kYXJfJyArIHJlc291cmNlX2lkIF0gPSB7fTtcclxuXHRcdFx0cF9ib29raW5nc1sgJ2NhbGVuZGFyXycgKyByZXNvdXJjZV9pZCBdWyAnaWQnIF0gPSByZXNvdXJjZV9pZDtcclxuXHRcdH1cclxuXHJcblx0XHRwX2Jvb2tpbmdzWyAnY2FsZW5kYXJfJyArIHJlc291cmNlX2lkIF1bIHByb3BfbmFtZSBdID0gcHJvcF92YWx1ZTtcclxuXHJcblx0XHRyZXR1cm4gcF9ib29raW5nc1sgJ2NhbGVuZGFyXycgKyByZXNvdXJjZV9pZCBdO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqICBHZXQgYm9va2luZyBwcm9wZXJ0eSB2YWx1ZSAgIFx0OjogICBtaXhlZCB8IG51bGxcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfGludH0gIHJlc291cmNlX2lkXHRcdCcxJ1xyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wX25hbWVcdFx0XHQnc2VsZWN0aW9uX21vZGUnXHJcblx0ICogQHJldHVybnMgeyp8bnVsbH1cdFx0XHRcdFx0bWl4ZWQgfCBudWxsXHJcblx0ICovXHJcblx0b2JqLmJvb2tpbmdfX2dldF9wYXJhbV92YWx1ZSA9IGZ1bmN0aW9uKCByZXNvdXJjZV9pZCwgcHJvcF9uYW1lICl7XHJcblxyXG5cdFx0aWYgKFxyXG5cdFx0XHQgICAoIG9iai5ib29raW5nc19pbl9jYWxlbmRhcl9faXNfZGVmaW5lZCggcmVzb3VyY2VfaWQgKSApXHJcblx0XHRcdCYmICggJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiAoIHBfYm9va2luZ3NbICdjYWxlbmRhcl8nICsgcmVzb3VyY2VfaWQgXVsgcHJvcF9uYW1lIF0gKSApXHJcblx0XHQpe1xyXG5cdFx0XHRyZXR1cm4gIHBfYm9va2luZ3NbICdjYWxlbmRhcl8nICsgcmVzb3VyY2VfaWQgXVsgcHJvcF9uYW1lIF07XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHRcdC8vIElmIHNvbWUgcHJvcGVydHkgbm90IGRlZmluZWQsIHRoZW4gbnVsbDtcclxuXHR9O1xyXG5cclxuXHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBTZXQgYm9va2luZ3MgZm9yIGFsbCAgY2FsZW5kYXJzXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge29iamVjdH0gY2FsZW5kYXJzX29ialx0XHRPYmplY3QgeyBjYWxlbmRhcl8xOiB7IGlkOiAxLCBkYXRlczogT2JqZWN0IHsgXCIyMDIzLTA3LTIyXCI6IHvigKZ9LCBcIjIwMjMtMDctMjNcIjoge+KApn0sIFwiMjAyMy0wNy0yNFwiOiB74oCmfSwg4oCmIH0gfVxyXG5cdCAqIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCBjYWxlbmRhcl8zOiB7fSwgLi4uIH1cclxuXHQgKi9cclxuXHRvYmouYm9va2luZ3NfaW5fY2FsZW5kYXJzX19zZXRfYWxsID0gZnVuY3Rpb24gKCBjYWxlbmRhcnNfb2JqICkge1xyXG5cdFx0cF9ib29raW5ncyA9IGNhbGVuZGFyc19vYmo7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0IGJvb2tpbmdzIGluIGFsbCBjYWxlbmRhcnNcclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHtvYmplY3R8e319XHJcblx0ICovXHJcblx0b2JqLmJvb2tpbmdzX2luX2NhbGVuZGFyc19fZ2V0X2FsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBwX2Jvb2tpbmdzO1xyXG5cdH07XHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG5cclxuXHJcblx0Ly8gU2Vhc29ucyBcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHR2YXIgcF9zZWFzb25zID0gb2JqLnNlYXNvbnNfb2JqID0gb2JqLnNlYXNvbnNfb2JqIHx8IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBjYWxlbmRhcl8xOiBPYmplY3Qge1xyXG4gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL1x0XHRcdFx0XHRcdCAgIGlkOiAgICAgMVxyXG4gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL1x0XHRcdFx0XHRcdCAsIGRhdGVzOiAgT2JqZWN0IHsgXCIyMDIzLTA3LTIxXCI6IHvigKZ9LCBcIjIwMjMtMDctMjJcIjoge+KApn0sIFwiMjAyMy0wNy0yM1wiOiB74oCmfSwg4oCmXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgc2Vhc29uIG5hbWVzIGZvciBkYXRlcyBpbiBjYWxlbmRhciBvYmplY3QgICA6OiAgICB7IFwiMjAyMy0wNy0yMVwiOiBbICd3cGJjX3NlYXNvbl9zZXB0ZW1iZXJfMjAyMycsICd3cGJjX3NlYXNvbl9zZXB0ZW1iZXJfMjAyNCcgXSwgXCIyMDIzLTA3LTIyXCI6IFsuLi5dLCAuLi4gfVxyXG5cdCAqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ3xpbnR9IHJlc291cmNlX2lkXHRcdFx0XHQgICcyJ1xyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBkYXRlc19vYmpcdFx0XHRcdFx0ICB7IFwiMjAyMy0wNy0yMVwiOiB74oCmfSwgXCIyMDIzLTA3LTIyXCI6IHvigKZ9LCBcIjIwMjMtMDctMjNcIjoge+KApn0sIOKApiB9XHJcblx0ICogQHBhcmFtIHtib29sZWFufSBpc19jb21wbGV0ZV9vdmVyd3JpdGVcdFx0ICBpZiBmYWxzZSwgIHRoZW4gIG9ubHkgIGFkZCAgZGF0ZXMgZnJvbSBcdGRhdGVzX29ialxyXG5cdCAqIEByZXR1cm5zIHsqfVxyXG5cdCAqXHJcblx0ICogRXhhbXBsZXM6XHJcblx0ICogICBcdFx0XHRfd3BiYy5zZWFzb25zX19zZXQoIHJlc291cmNlX2lkLCB7IFwiMjAyMy0wNy0yMVwiOiBbICd3cGJjX3NlYXNvbl9zZXB0ZW1iZXJfMjAyMycsICd3cGJjX3NlYXNvbl9zZXB0ZW1iZXJfMjAyNCcgXSwgXCIyMDIzLTA3LTIyXCI6IFsuLi5dLCAuLi4gfSAgKTtcclxuXHQgKi9cclxuXHRvYmouc2Vhc29uc19fc2V0ID0gZnVuY3Rpb24oIHJlc291cmNlX2lkLCBkYXRlc19vYmogLCBpc19jb21wbGV0ZV9vdmVyd3JpdGUgPSBmYWxzZSApe1xyXG5cclxuXHRcdGlmICggJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiAocF9zZWFzb25zWyAnY2FsZW5kYXJfJyArIHJlc291cmNlX2lkIF0pICl7XHJcblx0XHRcdHBfc2Vhc29uc1sgJ2NhbGVuZGFyXycgKyByZXNvdXJjZV9pZCBdID0ge307XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCBpc19jb21wbGV0ZV9vdmVyd3JpdGUgKXtcclxuXHJcblx0XHRcdC8vIENvbXBsZXRlIG92ZXJ3cml0ZSBhbGwgIHNlYXNvbiBkYXRlc1xyXG5cdFx0XHRwX3NlYXNvbnNbICdjYWxlbmRhcl8nICsgcmVzb3VyY2VfaWQgXSA9IGRhdGVzX29iajtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0Ly8gQWRkIG9ubHkgIG5ldyBvciBvdmVyd3JpdGUgZXhpc3QgYm9va2luZyBkYXRlcyBmcm9tICBwYXJhbWV0ZXIuIEJvb2tpbmcgZGF0ZXMgbm90IGZyb20gIHBhcmFtZXRlciAgd2lsbCAgYmUgd2l0aG91dCBjaG5hbmdlc1xyXG5cdFx0XHRmb3IgKCB2YXIgcHJvcF9uYW1lIGluIGRhdGVzX29iaiApe1xyXG5cclxuXHRcdFx0XHRpZiAoICd1bmRlZmluZWQnID09PSB0eXBlb2YgKHBfc2Vhc29uc1sgJ2NhbGVuZGFyXycgKyByZXNvdXJjZV9pZCBdWyBwcm9wX25hbWUgXSkgKXtcclxuXHRcdFx0XHRcdHBfc2Vhc29uc1sgJ2NhbGVuZGFyXycgKyByZXNvdXJjZV9pZCBdWyBwcm9wX25hbWUgXSA9IFtdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRmb3IgKCB2YXIgc2Vhc29uX25hbWVfa2V5IGluIGRhdGVzX29ialsgcHJvcF9uYW1lIF0gKXtcclxuXHRcdFx0XHRcdHBfc2Vhc29uc1sgJ2NhbGVuZGFyXycgKyByZXNvdXJjZV9pZCBdWyBwcm9wX25hbWUgXS5wdXNoKCBkYXRlc19vYmpbIHByb3BfbmFtZSBdWyBzZWFzb25fbmFtZV9rZXkgXSApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwX3NlYXNvbnNbICdjYWxlbmRhcl8nICsgcmVzb3VyY2VfaWQgXTtcclxuXHR9O1xyXG5cclxuXHJcblx0LyoqXHJcblx0ICogIEdldCBib29raW5ncyBkYXRhIGZvciBzcGVjaWZpYyBkYXRlIGluIGNhbGVuZGFyICAgOjogICBbXSB8IFsgJ3dwYmNfc2Vhc29uX3NlcHRlbWJlcl8yMDIzJywgJ3dwYmNfc2Vhc29uX3NlcHRlbWJlcl8yMDI0JyBdXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ3xpbnR9IHJlc291cmNlX2lkXHRcdFx0JzEnXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHNxbF9jbGFzc19kYXlcdFx0XHQnMjAyMy0wNy0yMSdcclxuXHQgKiBAcmV0dXJucyB7b2JqZWN0fGJvb2xlYW59XHRcdFx0XHRbXSAgfCAgWyAnd3BiY19zZWFzb25fc2VwdGVtYmVyXzIwMjMnLCAnd3BiY19zZWFzb25fc2VwdGVtYmVyXzIwMjQnIF1cclxuXHQgKi9cclxuXHRvYmouc2Vhc29uc19fZ2V0X2Zvcl9kYXRlID0gZnVuY3Rpb24oIHJlc291cmNlX2lkLCBzcWxfY2xhc3NfZGF5ICl7XHJcblxyXG5cdFx0aWYgKFxyXG5cdFx0XHQgICAoICd1bmRlZmluZWQnICE9PSB0eXBlb2YgKCBwX3NlYXNvbnNbICdjYWxlbmRhcl8nICsgcmVzb3VyY2VfaWQgXSApIClcclxuXHRcdFx0JiYgKCAndW5kZWZpbmVkJyAhPT0gdHlwZW9mICggcF9zZWFzb25zWyAnY2FsZW5kYXJfJyArIHJlc291cmNlX2lkIF1bIHNxbF9jbGFzc19kYXkgXSApIClcclxuXHRcdCl7XHJcblx0XHRcdHJldHVybiAgcF9zZWFzb25zWyAnY2FsZW5kYXJfJyArIHJlc291cmNlX2lkIF1bIHNxbF9jbGFzc19kYXkgXTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gW107XHRcdC8vIElmIG5vdCBkZWZpbmVkLCB0aGVuIFtdO1xyXG5cdH07XHJcblxyXG5cclxuXHQvLyBPdGhlciBwYXJhbWV0ZXJzIFx0XHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHZhciBwX290aGVyID0gb2JqLm90aGVyX29iaiA9IG9iai5vdGhlcl9vYmogfHwgeyB9O1xyXG5cclxuXHRvYmouc2V0X290aGVyX3BhcmFtID0gZnVuY3Rpb24gKCBwYXJhbV9rZXksIHBhcmFtX3ZhbCApIHtcclxuXHRcdHBfb3RoZXJbIHBhcmFtX2tleSBdID0gcGFyYW1fdmFsO1xyXG5cdH07XHJcblxyXG5cdG9iai5nZXRfb3RoZXJfcGFyYW0gPSBmdW5jdGlvbiAoIHBhcmFtX2tleSApIHtcclxuXHRcdHJldHVybiBwX290aGVyWyBwYXJhbV9rZXkgXTtcclxuXHR9O1xyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuXHRyZXR1cm4gb2JqO1xyXG5cclxufSggX3dwYmMgfHwge30sIGpRdWVyeSApKTtcclxuXHJcblxyXG4vKipcclxuICogRGVlcCBDbG9uZSBvZiBvYmplY3Qgb3IgYXJyYXlcclxuICpcclxuICogQHBhcmFtIG9ialxyXG4gKiBAcmV0dXJucyB7YW55fVxyXG4gKi9cclxuZnVuY3Rpb24gd3BiY19jbG9uZV9vYmooIG9iaiApe1xyXG5cclxuXHRyZXR1cm4gSlNPTi5wYXJzZSggSlNPTi5zdHJpbmdpZnkoIG9iaiApICk7XHJcbn1cclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBDIE8gRCBFICAgVHJpY2tzXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHQvKipcclxuXHQgKiBPcmRlciBvciBjaGlsZCBib29raW5nIHJlc291cmNlcyBzYXZlZCBoZXJlOiAgXHRfd3BiYy5ib29raW5nX19nZXRfcGFyYW1fdmFsdWUoIHJlc291cmNlX2lkLCAncmVzb3VyY2VzX2lkX2Fycl9faW5fZGF0ZXMnIClcdFx0WzIsMTAsMTIsMTFdXHJcblx0ICovXHJcblxyXG5cdC8qKlxyXG5cdCAqIEhvdyB0byBjaGVjayAgYm9va2VkIHRpbWVzIG9uICBzcGVjaWZpYyBkYXRlOiA/XHJcblx0ICpcclxuXHRcdFx0XHRfd3BiYy5ib29raW5nc19pbl9jYWxlbmRhcl9fZ2V0X2Zvcl9kYXRlKDIsJzIwMjMtMDgtMjEnKTtcclxuXHJcblx0XHRcdFx0Y29uc29sZS5sb2coXHJcblx0XHRcdFx0XHRcdFx0X3dwYmMuYm9va2luZ3NfaW5fY2FsZW5kYXJfX2dldF9mb3JfZGF0ZSgyLCcyMDIzLTA4LTIxJylbMl0uYm9va2VkX3RpbWVfc2xvdHMubWVyZ2VkX3NlY29uZHMsXHJcblx0XHRcdFx0XHRcdFx0X3dwYmMuYm9va2luZ3NfaW5fY2FsZW5kYXJfX2dldF9mb3JfZGF0ZSgyLCcyMDIzLTA4LTIxJylbMTBdLmJvb2tlZF90aW1lX3Nsb3RzLm1lcmdlZF9zZWNvbmRzLFxyXG5cdFx0XHRcdFx0XHRcdF93cGJjLmJvb2tpbmdzX2luX2NhbGVuZGFyX19nZXRfZm9yX2RhdGUoMiwnMjAyMy0wOC0yMScpWzExXS5ib29rZWRfdGltZV9zbG90cy5tZXJnZWRfc2Vjb25kcyxcclxuXHRcdFx0XHRcdFx0XHRfd3BiYy5ib29raW5nc19pbl9jYWxlbmRhcl9fZ2V0X2Zvcl9kYXRlKDIsJzIwMjMtMDgtMjEnKVsxMl0uYm9va2VkX3RpbWVfc2xvdHMubWVyZ2VkX3NlY29uZHNcclxuXHRcdFx0XHRcdFx0KTtcclxuXHQgKiAgT1JcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcclxuXHRcdFx0XHRcdFx0XHRfd3BiYy5ib29raW5nc19pbl9jYWxlbmRhcl9fZ2V0X2Zvcl9kYXRlKDIsJzIwMjMtMDgtMjEnKVsyXS5ib29rZWRfdGltZV9zbG90cy5tZXJnZWRfcmVhZGFibGUsXHJcblx0XHRcdFx0XHRcdFx0X3dwYmMuYm9va2luZ3NfaW5fY2FsZW5kYXJfX2dldF9mb3JfZGF0ZSgyLCcyMDIzLTA4LTIxJylbMTBdLmJvb2tlZF90aW1lX3Nsb3RzLm1lcmdlZF9yZWFkYWJsZSxcclxuXHRcdFx0XHRcdFx0XHRfd3BiYy5ib29raW5nc19pbl9jYWxlbmRhcl9fZ2V0X2Zvcl9kYXRlKDIsJzIwMjMtMDgtMjEnKVsxMV0uYm9va2VkX3RpbWVfc2xvdHMubWVyZ2VkX3JlYWRhYmxlLFxyXG5cdFx0XHRcdFx0XHRcdF93cGJjLmJvb2tpbmdzX2luX2NhbGVuZGFyX19nZXRfZm9yX2RhdGUoMiwnMjAyMy0wOC0yMScpWzEyXS5ib29rZWRfdGltZV9zbG90cy5tZXJnZWRfcmVhZGFibGVcclxuXHRcdFx0XHRcdFx0KTtcclxuXHQgKlxyXG5cdCAqL1xyXG5cclxuXHQvKipcclxuXHQgKiBEYXlzIHNlbGVjdGlvbjpcclxuXHQgKiBcdFx0XHRcdFx0d3BiY19jYWxlbmRhcl9fdW5zZWxlY3RfYWxsX2RhdGVzKCByZXNvdXJjZV9pZCApO1xyXG5cdCAqXHJcblx0ICpcclxuXHQgKlx0dmFyIGluc3Q9IHdwYmNfY2FsZW5kYXJfX2dldF9pbnN0KDMpOyBpbnN0LmRhdGVzPVtdOyB3cGJjX19jYWxlbmRhcl9fb25fc2VsZWN0X2RheXMoJzIyLjA5LjIwMjMgLSAyMy4wOS4yMDIzJyAsIHsncmVzb3VyY2VfaWQnOjN9ICwgaW5zdCk7ICBpbnN0LnN0YXlPcGVuID0gZmFsc2U7alF1ZXJ5LmRhdGVwaWNrLl91cGRhdGVEYXRlcGljayggaW5zdCApO1xyXG5cdCAqICBpZiBpdCBkb2Vzbid0IHdvcmsgIGluIDEwMCUgc2l0dWF0aW9ucy4gY2hlY2sgd3BiY19zZWxlY3RfZGF5c19pbl9jYWxlbmRhcigzLCBbIFsgMjAyMywgXCIwOVwiLCAyNiBdLCBbIDIwMjMsIFwiMDhcIiwgMjUgXV0pO1xyXG5cdCAqL1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIEMgQSBMIEUgTiBEIEEgUlxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8qKlxyXG4gKiAgU2hvdyBXUEJDIENhbGVuZGFyXHJcbiAqXHJcbiAqIEBwYXJhbSByZXNvdXJjZV9pZFx0XHRcdC0gcmVzb3VyY2UgSURcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiB3cGJjX2NhbGVuZGFyX3Nob3coIHJlc291cmNlX2lkICl7XHJcblxyXG5cdC8vIElmIG5vIGNhbGVuZGFyIEhUTUwgdGFnLCAgdGhlbiAgZXhpdFxyXG5cdGlmICggMCA9PT0galF1ZXJ5KCAnI2NhbGVuZGFyX2Jvb2tpbmcnICsgcmVzb3VyY2VfaWQgKS5sZW5ndGggKXsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG5cdC8vIElmIHRoZSBjYWxlbmRhciB3aXRoIHRoZSBzYW1lIEJvb2tpbmcgcmVzb3VyY2UgaXMgYWN0aXZhdGVkIGFscmVhZHksIHRoZW4gZXhpdC5cclxuXHRpZiAoIHRydWUgPT09IGpRdWVyeSggJyNjYWxlbmRhcl9ib29raW5nJyArIHJlc291cmNlX2lkICkuaGFzQ2xhc3MoICdoYXNEYXRlcGljaycgKSApeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQvLyBEYXlzIHNlbGVjdGlvblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0dmFyIGxvY2FsX19pc19yYW5nZV9zZWxlY3QgPSBmYWxzZTtcclxuXHR2YXIgbG9jYWxfX211bHRpX2RheXNfc2VsZWN0X251bSAgID0gMzY1O1x0XHRcdFx0XHQvLyBtdWx0aXBsZSB8IGZpeGVkXHJcblx0aWYgKCAnZHluYW1pYycgPT09IF93cGJjLmNhbGVuZGFyX19nZXRfcGFyYW1fdmFsdWUoIHJlc291cmNlX2lkLCAnZGF5c19zZWxlY3RfbW9kZScgKSApe1xyXG5cdFx0bG9jYWxfX2lzX3JhbmdlX3NlbGVjdCA9IHRydWU7XHJcblx0XHRsb2NhbF9fbXVsdGlfZGF5c19zZWxlY3RfbnVtID0gMDtcclxuXHR9XHJcblx0aWYgKCAnc2luZ2xlJyAgPT09IF93cGJjLmNhbGVuZGFyX19nZXRfcGFyYW1fdmFsdWUoIHJlc291cmNlX2lkLCAnZGF5c19zZWxlY3RfbW9kZScgKSApe1xyXG5cdFx0bG9jYWxfX211bHRpX2RheXNfc2VsZWN0X251bSA9IDA7XHJcblx0fVxyXG5cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIE1pbiAtIE1heCBkYXlzIHRvIHNjcm9sbC9zaG93XHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHR2YXIgbG9jYWxfX21pbl9kYXRlID0gMDtcclxuXHR2YXIgbG9jYWxfX21heF9kYXRlID0gX3dwYmMuY2FsZW5kYXJfX2dldF9wYXJhbV92YWx1ZSggcmVzb3VyY2VfaWQsICdib29raW5nX21heF9tb250aGVzX2luX2NhbGVuZGFyJyApO1xyXG5cdC8vbG9jYWxfX21heF9kYXRlID0gbmV3IERhdGUoMjAyNCwgNSwgMjgpOyAgSXQgaXMgaGVyZSBpc3N1ZSBvZiBub3Qgc2VsZWN0YWJsZSBkYXRlcywgYnV0IHNvbWUgZGF0ZXMgc2hvd2luZyBpbiBjYWxlbmRhciBhcyBhdmFpbGFibGUsIGJ1dCB3ZSBjYW4gbm90IHNlbGVjdCBpdC5cclxuXHJcblx0Ly8gRGVmaW5lIGxhc3QgZGF5IGluIGNhbGVuZGFyIChhcyBhIGxhc3QgZGF5IG9mIG1vbnRoIChhbmQgbm90IGRhdGUsIHdoaWNoIGlzIHJlbGF0ZWQgdG8gYWN0dWFsICdUb2RheScgZGF0ZSkuXHJcblx0Ly8gRS5nLiBpZiB0b2RheSBpcyAyMDIzLTA5LTI1LCBhbmQgd2Ugc2V0ICdOdW1iZXIgb2YgbW9udGhzIHRvIHNjcm9sbCcgYXMgNSBtb250aHMsIHRoZW4gbGFzdCBkYXkgd2lsbCBiZSAyMDI0LTAyLTI5IGFuZCBub3QgdGhlIDIwMjQtMDItMjUuXHJcblx0dmFyIGNhbF9sYXN0X2RheV9pbl9tb250aCA9IGpRdWVyeS5kYXRlcGljay5fZGV0ZXJtaW5lRGF0ZSggbnVsbCwgbG9jYWxfX21heF9kYXRlLCBuZXcgRGF0ZSgpICk7XHJcblx0Y2FsX2xhc3RfZGF5X2luX21vbnRoID0gbmV3IERhdGUoIGNhbF9sYXN0X2RheV9pbl9tb250aC5nZXRGdWxsWWVhcigpLCBjYWxfbGFzdF9kYXlfaW5fbW9udGguZ2V0TW9udGgoKSArIDEsIDAgKTtcclxuXHRsb2NhbF9fbWF4X2RhdGUgPSBjYWxfbGFzdF9kYXlfaW5fbW9udGg7XHJcblxyXG5cdGlmICggICAoIGxvY2F0aW9uLmhyZWYuaW5kZXhPZigncGFnZT13cGJjLW5ldycpICE9IC0xIClcclxuXHRcdCYmICggbG9jYXRpb24uaHJlZi5pbmRleE9mKCdib29raW5nX2hhc2gnKSAhPSAtMSApICAgICAgICAgICAgICAgICAgLy8gQ29tbWVudCB0aGlzIGxpbmUgZm9yIGFiaWxpdHkgdG8gYWRkICBib29raW5nIGluIHBhc3QgZGF5cyBhdCAgQm9va2luZyA+IEFkZCBib29raW5nIHBhZ2UuXHJcblx0XHQpe1xyXG5cdFx0bG9jYWxfX21pbl9kYXRlID0gbnVsbDtcclxuXHRcdGxvY2FsX19tYXhfZGF0ZSA9IG51bGw7XHJcblx0fVxyXG5cclxuXHR2YXIgbG9jYWxfX3N0YXJ0X3dlZWtkYXkgICAgPSBfd3BiYy5jYWxlbmRhcl9fZ2V0X3BhcmFtX3ZhbHVlKCByZXNvdXJjZV9pZCwgJ2Jvb2tpbmdfc3RhcnRfZGF5X3dlZWVrJyApO1xyXG5cdHZhciBsb2NhbF9fbnVtYmVyX29mX21vbnRocyA9IHBhcnNlSW50KCBfd3BiYy5jYWxlbmRhcl9fZ2V0X3BhcmFtX3ZhbHVlKCByZXNvdXJjZV9pZCwgJ2NhbGVuZGFyX251bWJlcl9vZl9tb250aHMnICkgKTtcclxuXHJcblx0alF1ZXJ5KCAnI2NhbGVuZGFyX2Jvb2tpbmcnICsgcmVzb3VyY2VfaWQgKS50ZXh0KCAnJyApO1x0XHRcdFx0XHQvLyBSZW1vdmUgYWxsIEhUTUwgaW4gY2FsZW5kYXIgdGFnXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQvLyBTaG93IGNhbGVuZGFyXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRqUXVlcnkoJyNjYWxlbmRhcl9ib29raW5nJysgcmVzb3VyY2VfaWQpLmRhdGVwaWNrKFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YmVmb3JlU2hvd0RheTogZnVuY3Rpb24gKCBqc19kYXRlICl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB3cGJjX19jYWxlbmRhcl9fYXBwbHlfY3NzX3RvX2RheXMoIGpzX2RhdGUsIHsncmVzb3VyY2VfaWQnOiByZXNvdXJjZV9pZH0sIHRoaXMgKTtcclxuXHRcdFx0XHRcdFx0XHQgIH0sXHJcblx0XHRcdFx0b25TZWxlY3Q6IGZ1bmN0aW9uICggc3RyaW5nX2RhdGVzLCBqc19kYXRlc19hcnIgKXsgIC8qKlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICpcdHN0cmluZ19kYXRlcyAgID0gICAnMjMuMDguMjAyMyAtIDI2LjA4LjIwMjMnICAgIHwgICAgJzIzLjA4LjIwMjMgLSAyMy4wOC4yMDIzJyAgICB8ICAgICcxOS4wOS4yMDIzLCAyNC4wOC4yMDIzLCAzMC4wOS4yMDIzJ1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICogIGpzX2RhdGVzX2FyciAgID0gICByYW5nZTogWyBEYXRlIChBdWcgMjMgMjAyMyksIERhdGUgKEF1ZyAyNSAyMDIzKV0gICAgIHwgICAgIG11bHRpcGxlOiBbIERhdGUoT2N0IDI0IDIwMjMpLCBEYXRlKE9jdCAyMCAyMDIzKSwgRGF0ZShPY3QgMTYgMjAyMykgXVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB3cGJjX19jYWxlbmRhcl9fb25fc2VsZWN0X2RheXMoIHN0cmluZ19kYXRlcywgeydyZXNvdXJjZV9pZCc6IHJlc291cmNlX2lkfSwgdGhpcyApO1xyXG5cdFx0XHRcdFx0XHRcdCAgfSxcclxuXHRcdFx0XHRvbkhvdmVyOiBmdW5jdGlvbiAoIHN0cmluZ19kYXRlLCBqc19kYXRlICl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB3cGJjX19jYWxlbmRhcl9fb25faG92ZXJfZGF5cyggc3RyaW5nX2RhdGUsIGpzX2RhdGUsIHsncmVzb3VyY2VfaWQnOiByZXNvdXJjZV9pZH0sIHRoaXMgKTtcclxuXHRcdFx0XHRcdFx0XHQgIH0sXHJcblx0XHRcdFx0b25DaGFuZ2VNb250aFllYXI6IGZ1bmN0aW9uICggeWVhciwgcmVhbF9tb250aCwganNfZGF0ZV9fMXN0X2RheV9pbl9tb250aCApeyB9LFxyXG5cdFx0XHRcdHNob3dPbiAgICAgICAgOiAnYm90aCcsXHJcblx0XHRcdFx0bnVtYmVyT2ZNb250aHM6IGxvY2FsX19udW1iZXJfb2ZfbW9udGhzLFxyXG5cdFx0XHRcdHN0ZXBNb250aHMgICAgOiAxLFxyXG5cdFx0XHRcdHByZXZUZXh0ICAgICAgOiAnJmxhcXVvOycsXHJcblx0XHRcdFx0bmV4dFRleHQgICAgICA6ICcmcmFxdW87JyxcclxuXHRcdFx0XHRkYXRlRm9ybWF0ICAgIDogJ2RkLm1tLnl5JyxcclxuXHRcdFx0XHRjaGFuZ2VNb250aCAgIDogZmFsc2UsXHJcblx0XHRcdFx0Y2hhbmdlWWVhciAgICA6IGZhbHNlLFxyXG5cdFx0XHRcdG1pbkRhdGUgICAgICAgOiBsb2NhbF9fbWluX2RhdGUsXHJcblx0XHRcdFx0bWF4RGF0ZSAgICAgICA6IGxvY2FsX19tYXhfZGF0ZSwgXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vICcxWScsXHJcblx0XHRcdFx0Ly8gbWluRGF0ZTogbmV3IERhdGUoMjAyMCwgMiwgMSksIG1heERhdGU6IG5ldyBEYXRlKDIwMjAsIDksIDMxKSwgICAgICAgICAgICAgXHQvLyBBYmlsaXR5IHRvIHNldCBhbnkgIHN0YXJ0IGFuZCBlbmQgZGF0ZSBpbiBjYWxlbmRhclxyXG5cdFx0XHRcdHNob3dTdGF0dXMgICAgICA6IGZhbHNlLFxyXG5cdFx0XHRcdG11bHRpU2VwYXJhdG9yICA6ICcsICcsXHJcblx0XHRcdFx0Y2xvc2VBdFRvcCAgICAgIDogZmFsc2UsXHJcblx0XHRcdFx0Zmlyc3REYXkgICAgICAgIDogbG9jYWxfX3N0YXJ0X3dlZWtkYXksXHJcblx0XHRcdFx0Z290b0N1cnJlbnQgICAgIDogZmFsc2UsXHJcblx0XHRcdFx0aGlkZUlmTm9QcmV2TmV4dDogdHJ1ZSxcclxuXHRcdFx0XHRtdWx0aVNlbGVjdCAgICAgOiBsb2NhbF9fbXVsdGlfZGF5c19zZWxlY3RfbnVtLFxyXG5cdFx0XHRcdHJhbmdlU2VsZWN0ICAgICA6IGxvY2FsX19pc19yYW5nZV9zZWxlY3QsXHJcblx0XHRcdFx0Ly8gc2hvd1dlZWtzOiB0cnVlLFxyXG5cdFx0XHRcdHVzZVRoZW1lUm9sbGVyOiBmYWxzZVxyXG5cdFx0XHR9XHJcblx0KTtcclxuXHJcblxyXG5cdFxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0Ly8gQ2xlYXIgdG9kYXkgZGF0ZSBoaWdobGlnaHRpbmdcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHNldFRpbWVvdXQoIGZ1bmN0aW9uICgpeyAgd3BiY19jYWxlbmRhcnNfX2NsZWFyX2RheXNfaGlnaGxpZ2h0aW5nKCByZXNvdXJjZV9pZCApOyAgfSwgNTAwICk7ICAgICAgICAgICAgICAgICAgICBcdC8vRml4SW46IDcuMS4yLjhcclxuXHRcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIFNjcm9sbCBjYWxlbmRhciB0byAgc3BlY2lmaWMgbW9udGhcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHZhciBzdGFydF9ia19tb250aCA9IF93cGJjLmNhbGVuZGFyX19nZXRfcGFyYW1fdmFsdWUoIHJlc291cmNlX2lkLCAnY2FsZW5kYXJfc2Nyb2xsX3RvJyApO1xyXG5cdGlmICggZmFsc2UgIT09IHN0YXJ0X2JrX21vbnRoICl7XHJcblx0XHR3cGJjX2NhbGVuZGFyX19zY3JvbGxfdG8oIHJlc291cmNlX2lkLCBzdGFydF9ia19tb250aFsgMCBdLCBzdGFydF9ia19tb250aFsgMSBdICk7XHJcblx0fVxyXG59XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBBcHBseSBDU1MgdG8gY2FsZW5kYXIgZGF0ZSBjZWxsc1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIGRhdGVcdFx0XHRcdFx0XHRcdFx0XHRcdC0gIEphdmFTY3JpcHQgRGF0ZSBPYmo6ICBcdFx0TW9uIERlYyAxMSAyMDIzIDAwOjAwOjAwIEdNVCswMjAwIChFYXN0ZXJuIEV1cm9wZWFuIFN0YW5kYXJkIFRpbWUpXHJcblx0ICogQHBhcmFtIGNhbGVuZGFyX3BhcmFtc19hcnJcdFx0XHRcdFx0XHQtICBDYWxlbmRhciBTZXR0aW5ncyBPYmplY3Q6ICBcdHtcclxuXHQgKlx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICBcdFx0XHRcdFx0XHRcInJlc291cmNlX2lkXCI6IDRcclxuXHQgKlx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHQgKiBAcGFyYW0gZGF0ZXBpY2tfdGhpc1x0XHRcdFx0XHRcdFx0XHQtIHRoaXMgb2YgZGF0ZXBpY2sgT2JqXHJcblx0ICogQHJldHVybnMgeygqfHN0cmluZylbXXwoYm9vbGVhbnxzdHJpbmcpW119XHRcdC0gWyB7dHJ1ZSAtYXZhaWxhYmxlIHwgZmFsc2UgLSB1bmF2YWlsYWJsZX0sICdDU1MgY2xhc3NlcyBmb3IgY2FsZW5kYXIgZGF5IGNlbGwnIF1cclxuXHQgKi9cclxuXHRmdW5jdGlvbiB3cGJjX19jYWxlbmRhcl9fYXBwbHlfY3NzX3RvX2RheXMoIGRhdGUsIGNhbGVuZGFyX3BhcmFtc19hcnIsIGRhdGVwaWNrX3RoaXMgKXtcclxuXHJcblx0XHR2YXIgdG9kYXlfZGF0ZSA9IG5ldyBEYXRlKCB3cGJjX3RvZGF5WyAwIF0sIChwYXJzZUludCggd3BiY190b2RheVsgMSBdICkgLSAxKSwgd3BiY190b2RheVsgMiBdLCAwLCAwLCAwICk7XHRcdFx0XHRcdFx0XHRcdC8vIFRvZGF5IEpTX0RhdGVfT2JqLlxyXG5cdFx0dmFyIGNsYXNzX2RheSAgICAgPSB3cGJjX19nZXRfX3RkX2NsYXNzX2RhdGUoIGRhdGUgKTtcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyAnMS05LTIwMjMnXHJcblx0XHR2YXIgc3FsX2NsYXNzX2RheSA9IHdwYmNfX2dldF9fc3FsX2NsYXNzX2RhdGUoIGRhdGUgKTtcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyAnMjAyMy0wMS0wOSdcclxuXHRcdHZhciByZXNvdXJjZV9pZCA9ICggJ3VuZGVmaW5lZCcgIT09IHR5cGVvZihjYWxlbmRhcl9wYXJhbXNfYXJyWyAncmVzb3VyY2VfaWQnIF0pICkgPyBjYWxlbmRhcl9wYXJhbXNfYXJyWyAncmVzb3VyY2VfaWQnIF0gOiAnMSc7IFx0XHQvLyAnMSdcclxuXHJcblx0XHQvLyBHZXQgRGF0YSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0dmFyIGRhdGVfYm9va2luZ3Nfb2JqID0gX3dwYmMuYm9va2luZ3NfaW5fY2FsZW5kYXJfX2dldF9mb3JfZGF0ZSggcmVzb3VyY2VfaWQsIHNxbF9jbGFzc19kYXkgKTtcclxuXHJcblxyXG5cdFx0Ly8gQXJyYXkgd2l0aCBDU1MgY2xhc3NlcyBmb3IgZGF0ZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdHZhciBjc3NfY2xhc3Nlc19fZm9yX2RhdGUgPSBbXTtcclxuXHRcdGNzc19jbGFzc2VzX19mb3JfZGF0ZS5wdXNoKCAnc3FsX2RhdGVfJyAgICAgKyBzcWxfY2xhc3NfZGF5ICk7XHRcdFx0XHQvLyAgJ3NxbF9kYXRlXzIwMjMtMDctMjEnXHJcblx0XHRjc3NfY2xhc3Nlc19fZm9yX2RhdGUucHVzaCggJ2NhbDRkYXRlLScgICAgICsgY2xhc3NfZGF5ICk7XHRcdFx0XHRcdC8vICAnY2FsNGRhdGUtNy0yMS0yMDIzJ1xyXG5cdFx0Y3NzX2NsYXNzZXNfX2Zvcl9kYXRlLnB1c2goICd3cGJjX3dlZWtkYXlfJyArIGRhdGUuZ2V0RGF5KCkgKTtcdFx0XHRcdC8vICAnd3BiY193ZWVrZGF5XzQnXHJcblxyXG5cdFx0dmFyIGlzX2RheV9zZWxlY3RhYmxlID0gZmFsc2U7XHJcblxyXG5cdFx0Ly8gSWYgc29tZXRoaW5nIG5vdCBkZWZpbmVkLCAgdGhlbiAgdGhpcyBkYXRlIGNsb3NlZCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdGlmICggZmFsc2UgPT09IGRhdGVfYm9va2luZ3Nfb2JqICl7XHJcblxyXG5cdFx0XHRjc3NfY2xhc3Nlc19fZm9yX2RhdGUucHVzaCggJ2RhdGVfdXNlcl91bmF2YWlsYWJsZScgKTtcclxuXHJcblx0XHRcdHJldHVybiBbIGlzX2RheV9zZWxlY3RhYmxlLCBjc3NfY2xhc3Nlc19fZm9yX2RhdGUuam9pbignICcpICBdO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0Ly8gICBkYXRlX2Jvb2tpbmdzX29iaiAgLSBEZWZpbmVkLiAgICAgICAgICAgIERhdGVzIGNhbiBiZSBzZWxlY3RhYmxlLlxyXG5cdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0Ly8gQWRkIHNlYXNvbiBuYW1lcyB0byB0aGUgZGF5IENTUyBjbGFzc2VzIC0tIGl0IGlzIHJlcXVpcmVkIGZvciBjb3JyZWN0ICB3b3JrICBvZiBjb25kaXRpb25hbCBmaWVsZHMgLS0tLS0tLS0tLS0tLS1cclxuXHRcdHZhciBzZWFzb25fbmFtZXNfYXJyID0gX3dwYmMuc2Vhc29uc19fZ2V0X2Zvcl9kYXRlKCByZXNvdXJjZV9pZCwgc3FsX2NsYXNzX2RheSApO1xyXG5cdFx0Zm9yICggdmFyIHNlYXNvbl9rZXkgaW4gc2Vhc29uX25hbWVzX2FyciApe1xyXG5cdFx0XHRjc3NfY2xhc3Nlc19fZm9yX2RhdGUucHVzaCggc2Vhc29uX25hbWVzX2Fyclsgc2Vhc29uX2tleSBdICk7XHRcdFx0XHQvLyAgJ3dwZGV2Ymtfc2Vhc29uX3NlcHRlbWJlcl8yMDIzJ1xyXG5cdFx0fVxyXG5cdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG5cdFx0Ly8gQ29zdCBSYXRlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdGNzc19jbGFzc2VzX19mb3JfZGF0ZS5wdXNoKCAncmF0ZV8nICsgZGF0ZV9ib29raW5nc19vYmpbIHJlc291cmNlX2lkIF1bICdkYXRlX2Nvc3RfcmF0ZScgXS50b1N0cmluZygpLnJlcGxhY2UoIC9bXFwuXFxzXS9nLCAnXycgKSApO1x0XHRcdFx0XHRcdC8vICAncmF0ZV85OV8wMCcgLT4gOTkuMDBcclxuXHJcblxyXG5cdFx0aWYgKCBwYXJzZUludCggZGF0ZV9ib29raW5nc19vYmpbICdkYXlfYXZhaWxhYmlsaXR5JyBdICkgPiAwICl7XHJcblx0XHRcdGlzX2RheV9zZWxlY3RhYmxlID0gdHJ1ZTtcclxuXHRcdFx0Y3NzX2NsYXNzZXNfX2Zvcl9kYXRlLnB1c2goICdkYXRlX2F2YWlsYWJsZScgKTtcclxuXHRcdFx0Y3NzX2NsYXNzZXNfX2Zvcl9kYXRlLnB1c2goICdyZXNlcnZlZF9kYXlzX2NvdW50JyArIHBhcnNlSW50KCBkYXRlX2Jvb2tpbmdzX29ialsgJ21heF9jYXBhY2l0eScgXSAtIGRhdGVfYm9va2luZ3Nfb2JqWyAnZGF5X2F2YWlsYWJpbGl0eScgXSApICk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpc19kYXlfc2VsZWN0YWJsZSA9IGZhbHNlO1xyXG5cdFx0XHRjc3NfY2xhc3Nlc19fZm9yX2RhdGUucHVzaCggJ2RhdGVfdXNlcl91bmF2YWlsYWJsZScgKTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0c3dpdGNoICggZGF0ZV9ib29raW5nc19vYmpbICdzdW1tYXJ5J11bJ3N0YXR1c19mb3JfZGF5JyBdICl7XHJcblxyXG5cdFx0XHRjYXNlICdhdmFpbGFibGUnOlxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSAndGltZV9zbG90c19ib29raW5nJzpcclxuXHRcdFx0XHRjc3NfY2xhc3Nlc19fZm9yX2RhdGUucHVzaCggJ3RpbWVzcGFydGx5JywgJ3RpbWVzX2Nsb2NrJyApO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSAnZnVsbF9kYXlfYm9va2luZyc6XHJcblx0XHRcdFx0Y3NzX2NsYXNzZXNfX2Zvcl9kYXRlLnB1c2goICdmdWxsX2RheV9ib29raW5nJyApO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSAnc2Vhc29uX2ZpbHRlcic6XHJcblx0XHRcdFx0Y3NzX2NsYXNzZXNfX2Zvcl9kYXRlLnB1c2goICdkYXRlX3VzZXJfdW5hdmFpbGFibGUnLCAnc2Vhc29uX3VuYXZhaWxhYmxlJyApO1xyXG5cdFx0XHRcdGRhdGVfYm9va2luZ3Nfb2JqWyAnc3VtbWFyeSddWydzdGF0dXNfZm9yX2Jvb2tpbmdzJyBdID0gJyc7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFJlc2V0IGJvb2tpbmcgc3RhdHVzIGNvbG9yIGZvciBwb3NzaWJsZSBvbGQgYm9va2luZ3Mgb24gdGhpcyBkYXRlXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlICdyZXNvdXJjZV9hdmFpbGFiaWxpdHknOlxyXG5cdFx0XHRcdGNzc19jbGFzc2VzX19mb3JfZGF0ZS5wdXNoKCAnZGF0ZV91c2VyX3VuYXZhaWxhYmxlJywgJ3Jlc291cmNlX3VuYXZhaWxhYmxlJyApO1xyXG5cdFx0XHRcdGRhdGVfYm9va2luZ3Nfb2JqWyAnc3VtbWFyeSddWydzdGF0dXNfZm9yX2Jvb2tpbmdzJyBdID0gJyc7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFJlc2V0IGJvb2tpbmcgc3RhdHVzIGNvbG9yIGZvciBwb3NzaWJsZSBvbGQgYm9va2luZ3Mgb24gdGhpcyBkYXRlXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlICd3ZWVrZGF5X3VuYXZhaWxhYmxlJzpcclxuXHRcdFx0XHRjc3NfY2xhc3Nlc19fZm9yX2RhdGUucHVzaCggJ2RhdGVfdXNlcl91bmF2YWlsYWJsZScsICd3ZWVrZGF5X3VuYXZhaWxhYmxlJyApO1xyXG5cdFx0XHRcdGRhdGVfYm9va2luZ3Nfb2JqWyAnc3VtbWFyeSddWydzdGF0dXNfZm9yX2Jvb2tpbmdzJyBdID0gJyc7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFJlc2V0IGJvb2tpbmcgc3RhdHVzIGNvbG9yIGZvciBwb3NzaWJsZSBvbGQgYm9va2luZ3Mgb24gdGhpcyBkYXRlXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlICdmcm9tX3RvZGF5X3VuYXZhaWxhYmxlJzpcclxuXHRcdFx0XHRjc3NfY2xhc3Nlc19fZm9yX2RhdGUucHVzaCggJ2RhdGVfdXNlcl91bmF2YWlsYWJsZScsICdmcm9tX3RvZGF5X3VuYXZhaWxhYmxlJyApO1xyXG5cdFx0XHRcdGRhdGVfYm9va2luZ3Nfb2JqWyAnc3VtbWFyeSddWydzdGF0dXNfZm9yX2Jvb2tpbmdzJyBdID0gJyc7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFJlc2V0IGJvb2tpbmcgc3RhdHVzIGNvbG9yIGZvciBwb3NzaWJsZSBvbGQgYm9va2luZ3Mgb24gdGhpcyBkYXRlXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlICdsaW1pdF9hdmFpbGFibGVfZnJvbV90b2RheSc6XHJcblx0XHRcdFx0Y3NzX2NsYXNzZXNfX2Zvcl9kYXRlLnB1c2goICdkYXRlX3VzZXJfdW5hdmFpbGFibGUnLCAnbGltaXRfYXZhaWxhYmxlX2Zyb21fdG9kYXknICk7XHJcblx0XHRcdFx0ZGF0ZV9ib29raW5nc19vYmpbICdzdW1tYXJ5J11bJ3N0YXR1c19mb3JfYm9va2luZ3MnIF0gPSAnJztcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gUmVzZXQgYm9va2luZyBzdGF0dXMgY29sb3IgZm9yIHBvc3NpYmxlIG9sZCBib29raW5ncyBvbiB0aGlzIGRhdGVcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJ2NoYW5nZV9vdmVyJzpcclxuXHRcdFx0XHQvKlxyXG5cdFx0XHRcdCAqXHJcblx0XHRcdFx0Ly8gIGNoZWNrX291dF90aW1lX2RhdGUyYXBwcm92ZSBcdCBcdGNoZWNrX2luX3RpbWVfZGF0ZTJhcHByb3ZlXHJcblx0XHRcdFx0Ly8gIGNoZWNrX291dF90aW1lX2RhdGUyYXBwcm92ZSBcdCBcdGNoZWNrX2luX3RpbWVfZGF0ZV9hcHByb3ZlZFxyXG5cdFx0XHRcdC8vICBjaGVja19pbl90aW1lX2RhdGUyYXBwcm92ZSBcdFx0IFx0Y2hlY2tfb3V0X3RpbWVfZGF0ZV9hcHByb3ZlZFxyXG5cdFx0XHRcdC8vICBjaGVja19vdXRfdGltZV9kYXRlX2FwcHJvdmVkIFx0IFx0Y2hlY2tfaW5fdGltZV9kYXRlX2FwcHJvdmVkXHJcblx0XHRcdFx0ICovXHJcblxyXG5cdFx0XHRcdGNzc19jbGFzc2VzX19mb3JfZGF0ZS5wdXNoKCAndGltZXNwYXJ0bHknLCAnY2hlY2tfaW5fdGltZScsICdjaGVja19vdXRfdGltZScgKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJ2NoZWNrX2luJzpcclxuXHRcdFx0XHRjc3NfY2xhc3Nlc19fZm9yX2RhdGUucHVzaCggJ3RpbWVzcGFydGx5JywgJ2NoZWNrX2luX3RpbWUnICk7XHJcblxyXG5cdFx0XHRcdGlmICggJ3BlbmRpbmcnID09IGRhdGVfYm9va2luZ3Nfb2JqWyAnc3VtbWFyeSddWydzdGF0dXNfZm9yX2Jvb2tpbmdzJyBdICl7XHJcblx0XHRcdFx0XHRjc3NfY2xhc3Nlc19fZm9yX2RhdGUucHVzaCggJ2NoZWNrX2luX3RpbWVfZGF0ZTJhcHByb3ZlJyApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoICdhcHByb3ZlZCcgPT0gZGF0ZV9ib29raW5nc19vYmpbICdzdW1tYXJ5J11bJ3N0YXR1c19mb3JfYm9va2luZ3MnIF0gKXtcclxuXHRcdFx0XHRcdGNzc19jbGFzc2VzX19mb3JfZGF0ZS5wdXNoKCAnY2hlY2tfaW5fdGltZV9kYXRlX2FwcHJvdmVkJyApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJ2NoZWNrX291dCc6XHJcblx0XHRcdFx0Y3NzX2NsYXNzZXNfX2Zvcl9kYXRlLnB1c2goICd0aW1lc3BhcnRseScsICdjaGVja19vdXRfdGltZScgKTtcclxuXHJcblx0XHRcdFx0aWYgKCAncGVuZGluZycgPT0gZGF0ZV9ib29raW5nc19vYmpbICdzdW1tYXJ5J11bJ3N0YXR1c19mb3JfYm9va2luZ3MnIF0gKXtcclxuXHRcdFx0XHRcdGNzc19jbGFzc2VzX19mb3JfZGF0ZS5wdXNoKCAnY2hlY2tfb3V0X3RpbWVfZGF0ZTJhcHByb3ZlJyApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoICdhcHByb3ZlZCcgPT0gZGF0ZV9ib29raW5nc19vYmpbICdzdW1tYXJ5J11bJ3N0YXR1c19mb3JfYm9va2luZ3MnIF0gKXtcclxuXHRcdFx0XHRcdGNzc19jbGFzc2VzX19mb3JfZGF0ZS5wdXNoKCAnY2hlY2tfb3V0X3RpbWVfZGF0ZV9hcHByb3ZlZCcgKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdC8vIG1peGVkIHN0YXR1c2VzOiAnY2hhbmdlX292ZXIgY2hlY2tfb3V0JyAuLi4uIHZhcmlhdGlvbnMuLi4uIGNoZWNrIG1vcmUgaW4gXHRcdGZ1bmN0aW9uIHdwYmNfZ2V0X2F2YWlsYWJpbGl0eV9wZXJfZGF5c19hcnIoKVxyXG5cdFx0XHRcdGRhdGVfYm9va2luZ3Nfb2JqWyAnc3VtbWFyeSddWydzdGF0dXNfZm9yX2RheScgXSA9ICdhdmFpbGFibGUnO1xyXG5cdFx0fVxyXG5cclxuXHJcblxyXG5cdFx0aWYgKCAnYXZhaWxhYmxlJyAhPSBkYXRlX2Jvb2tpbmdzX29ialsgJ3N1bW1hcnknXVsnc3RhdHVzX2Zvcl9kYXknIF0gKXtcclxuXHJcblx0XHRcdHZhciBpc19zZXRfcGVuZGluZ19kYXlzX3NlbGVjdGFibGUgPSBfd3BiYy5jYWxlbmRhcl9fZ2V0X3BhcmFtX3ZhbHVlKCByZXNvdXJjZV9pZCwgJ3BlbmRpbmdfZGF5c19zZWxlY3RhYmxlJyApO1x0Ly8gc2V0IHBlbmRpbmcgZGF5cyBzZWxlY3RhYmxlICAgICAgICAgIC8vRml4SW46IDguNi4xLjE4XHJcblxyXG5cdFx0XHRzd2l0Y2ggKCBkYXRlX2Jvb2tpbmdzX29ialsgJ3N1bW1hcnknXVsnc3RhdHVzX2Zvcl9ib29raW5ncycgXSApe1xyXG5cclxuXHRcdFx0XHRjYXNlICcnOlxyXG5cdFx0XHRcdFx0Ly8gVXN1YWxseSAgaXQncyBtZWFucyB0aGF0IGRheSAgaXMgYXZhaWxhYmxlIG9yIHVuYXZhaWxhYmxlIHdpdGhvdXQgdGhlIGJvb2tpbmdzXHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAncGVuZGluZyc6XHJcblx0XHRcdFx0XHRjc3NfY2xhc3Nlc19fZm9yX2RhdGUucHVzaCggJ2RhdGUyYXBwcm92ZScgKTtcclxuXHRcdFx0XHRcdGlzX2RheV9zZWxlY3RhYmxlID0gKGlzX2RheV9zZWxlY3RhYmxlKSA/IHRydWUgOiBpc19zZXRfcGVuZGluZ19kYXlzX3NlbGVjdGFibGU7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnYXBwcm92ZWQnOlxyXG5cdFx0XHRcdFx0Y3NzX2NsYXNzZXNfX2Zvcl9kYXRlLnB1c2goICdkYXRlX2FwcHJvdmVkJyApO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdC8vIFNpdHVhdGlvbnMgZm9yIFwiY2hhbmdlLW92ZXJcIiBkYXlzOiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdFx0Y2FzZSAncGVuZGluZ19wZW5kaW5nJzpcclxuXHRcdFx0XHRcdGNzc19jbGFzc2VzX19mb3JfZGF0ZS5wdXNoKCAnY2hlY2tfb3V0X3RpbWVfZGF0ZTJhcHByb3ZlJywgJ2NoZWNrX2luX3RpbWVfZGF0ZTJhcHByb3ZlJyApO1xyXG5cdFx0XHRcdFx0aXNfZGF5X3NlbGVjdGFibGUgPSAoaXNfZGF5X3NlbGVjdGFibGUpID8gdHJ1ZSA6IGlzX3NldF9wZW5kaW5nX2RheXNfc2VsZWN0YWJsZTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdwZW5kaW5nX2FwcHJvdmVkJzpcclxuXHRcdFx0XHRcdGNzc19jbGFzc2VzX19mb3JfZGF0ZS5wdXNoKCAnY2hlY2tfb3V0X3RpbWVfZGF0ZTJhcHByb3ZlJywgJ2NoZWNrX2luX3RpbWVfZGF0ZV9hcHByb3ZlZCcgKTtcclxuXHRcdFx0XHRcdGlzX2RheV9zZWxlY3RhYmxlID0gKGlzX2RheV9zZWxlY3RhYmxlKSA/IHRydWUgOiBpc19zZXRfcGVuZGluZ19kYXlzX3NlbGVjdGFibGU7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnYXBwcm92ZWRfcGVuZGluZyc6XHJcblx0XHRcdFx0XHRjc3NfY2xhc3Nlc19fZm9yX2RhdGUucHVzaCggJ2NoZWNrX291dF90aW1lX2RhdGVfYXBwcm92ZWQnLCAnY2hlY2tfaW5fdGltZV9kYXRlMmFwcHJvdmUnICk7XHJcblx0XHRcdFx0XHRpc19kYXlfc2VsZWN0YWJsZSA9IChpc19kYXlfc2VsZWN0YWJsZSkgPyB0cnVlIDogaXNfc2V0X3BlbmRpbmdfZGF5c19zZWxlY3RhYmxlO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ2FwcHJvdmVkX2FwcHJvdmVkJzpcclxuXHRcdFx0XHRcdGNzc19jbGFzc2VzX19mb3JfZGF0ZS5wdXNoKCAnY2hlY2tfb3V0X3RpbWVfZGF0ZV9hcHByb3ZlZCcsICdjaGVja19pbl90aW1lX2RhdGVfYXBwcm92ZWQnICk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gWyBpc19kYXlfc2VsZWN0YWJsZSwgY3NzX2NsYXNzZXNfX2Zvcl9kYXRlLmpvaW4oICcgJyApIF07XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogTW91c2VvdmVyIGNhbGVuZGFyIGRhdGUgY2VsbHNcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmdfZGF0ZVxyXG5cdCAqIEBwYXJhbSBkYXRlXHRcdFx0XHRcdFx0XHRcdFx0XHQtICBKYXZhU2NyaXB0IERhdGUgT2JqOiAgXHRcdE1vbiBEZWMgMTEgMjAyMyAwMDowMDowMCBHTVQrMDIwMCAoRWFzdGVybiBFdXJvcGVhbiBTdGFuZGFyZCBUaW1lKVxyXG5cdCAqIEBwYXJhbSBjYWxlbmRhcl9wYXJhbXNfYXJyXHRcdFx0XHRcdFx0LSAgQ2FsZW5kYXIgU2V0dGluZ3MgT2JqZWN0OiAgXHR7XHJcblx0ICpcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgXHRcdFx0XHRcdFx0XCJyZXNvdXJjZV9pZFwiOiA0XHJcblx0ICpcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0ICogQHBhcmFtIGRhdGVwaWNrX3RoaXNcdFx0XHRcdFx0XHRcdFx0LSB0aGlzIG9mIGRhdGVwaWNrIE9ialxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdwYmNfX2NhbGVuZGFyX19vbl9ob3Zlcl9kYXlzKCBzdHJpbmdfZGF0ZSwgZGF0ZSwgY2FsZW5kYXJfcGFyYW1zX2FyciwgZGF0ZXBpY2tfdGhpcyApIHtcclxuXHJcblx0XHRpZiAoIG51bGwgPT09IGRhdGUgKXsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG5cdFx0dmFyIGNsYXNzX2RheSAgICAgPSB3cGJjX19nZXRfX3RkX2NsYXNzX2RhdGUoIGRhdGUgKTtcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyAnMS05LTIwMjMnXHJcblx0XHR2YXIgc3FsX2NsYXNzX2RheSA9IHdwYmNfX2dldF9fc3FsX2NsYXNzX2RhdGUoIGRhdGUgKTtcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyAnMjAyMy0wMS0wOSdcclxuXHRcdHZhciByZXNvdXJjZV9pZCA9ICggJ3VuZGVmaW5lZCcgIT09IHR5cGVvZihjYWxlbmRhcl9wYXJhbXNfYXJyWyAncmVzb3VyY2VfaWQnIF0pICkgPyBjYWxlbmRhcl9wYXJhbXNfYXJyWyAncmVzb3VyY2VfaWQnIF0gOiAnMSc7XHRcdC8vICcxJ1xyXG5cclxuXHRcdC8vIEdldCBEYXRhIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHR2YXIgZGF0ZV9ib29raW5nX29iaiA9IF93cGJjLmJvb2tpbmdzX2luX2NhbGVuZGFyX19nZXRfZm9yX2RhdGUoIHJlc291cmNlX2lkLCBzcWxfY2xhc3NfZGF5ICk7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIHsuLi59XHJcblxyXG5cdFx0aWYgKCAhIGRhdGVfYm9va2luZ19vYmogKXsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG5cclxuXHRcdC8vIFQgbyBvIGwgdCBpIHAgcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHR2YXIgdG9vbHRpcF90ZXh0ID0gJyc7XHJcblx0XHRpZiAoIGRhdGVfYm9va2luZ19vYmpbICdzdW1tYXJ5J11bJ3Rvb2x0aXBfYXZhaWxhYmlsaXR5JyBdLmxlbmd0aCA+IDAgKXtcclxuXHRcdFx0dG9vbHRpcF90ZXh0ICs9ICBkYXRlX2Jvb2tpbmdfb2JqWyAnc3VtbWFyeSddWyd0b29sdGlwX2F2YWlsYWJpbGl0eScgXTtcclxuXHRcdH1cclxuXHRcdGlmICggZGF0ZV9ib29raW5nX29ialsgJ3N1bW1hcnknXVsndG9vbHRpcF9kYXlfY29zdCcgXS5sZW5ndGggPiAwICl7XHJcblx0XHRcdHRvb2x0aXBfdGV4dCArPSAgZGF0ZV9ib29raW5nX29ialsgJ3N1bW1hcnknXVsndG9vbHRpcF9kYXlfY29zdCcgXTtcclxuXHRcdH1cclxuXHRcdGlmICggZGF0ZV9ib29raW5nX29ialsgJ3N1bW1hcnknXVsndG9vbHRpcF90aW1lcycgXS5sZW5ndGggPiAwICl7XHJcblx0XHRcdHRvb2x0aXBfdGV4dCArPSAgZGF0ZV9ib29raW5nX29ialsgJ3N1bW1hcnknXVsndG9vbHRpcF90aW1lcycgXTtcclxuXHRcdH1cclxuXHRcdGlmICggZGF0ZV9ib29raW5nX29ialsgJ3N1bW1hcnknXVsndG9vbHRpcF9ib29raW5nX2RldGFpbHMnIF0ubGVuZ3RoID4gMCApe1xyXG5cdFx0XHR0b29sdGlwX3RleHQgKz0gIGRhdGVfYm9va2luZ19vYmpbICdzdW1tYXJ5J11bJ3Rvb2x0aXBfYm9va2luZ19kZXRhaWxzJyBdO1xyXG5cdFx0fVxyXG5cdFx0d3BiY19zZXRfdG9vbHRpcF9fX2Zvcl9fY2FsZW5kYXJfZGF0ZSggdG9vbHRpcF90ZXh0LCByZXNvdXJjZV9pZCwgY2xhc3NfZGF5ICk7XHJcblxyXG5cclxuXHJcblx0XHQvLyAgVSBuIGggbyB2IGUgciBpIG4gZyAgICBpbiAgICBVTlNFTEVDVEFCTEVfQ0FMRU5EQVIgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0dmFyIGlzX3Vuc2VsZWN0YWJsZV9jYWxlbmRhciA9ICggalF1ZXJ5KCAnI2NhbGVuZGFyX2Jvb2tpbmdfdW5zZWxlY3RhYmxlJyArIHJlc291cmNlX2lkICkubGVuZ3RoID4gMCk7XHRcdFx0XHQvL0ZpeEluOiA4LjAuMS4yXHJcblx0XHR2YXIgaXNfYm9va2luZ19mb3JtX2V4aXN0ICAgID0gKCBqUXVlcnkoICcjYm9va2luZ19mb3JtX2RpdicgKyByZXNvdXJjZV9pZCApLmxlbmd0aCA+IDAgKTtcclxuXHJcblx0XHRpZiAoICggaXNfdW5zZWxlY3RhYmxlX2NhbGVuZGFyICkgJiYgKCAhIGlzX2Jvb2tpbmdfZm9ybV9leGlzdCApICl7XHJcblxyXG5cdFx0XHQvKipcclxuXHRcdFx0ICogIFVuIEhvdmVyIGFsbCBkYXRlcyBpbiBjYWxlbmRhciAod2l0aG91dCB0aGUgYm9va2luZyBmb3JtKSwgaWYgb25seSBBdmFpbGFiaWxpdHkgQ2FsZW5kYXIgaGVyZSBhbmQgd2UgZG8gbm90IGluc2VydCBCb29raW5nIGZvcm0gYnkgbWlzdGFrZS5cclxuXHRcdFx0ICovXHJcblxyXG5cdFx0XHR3cGJjX2NhbGVuZGFyc19fY2xlYXJfZGF5c19oaWdobGlnaHRpbmcoIHJlc291cmNlX2lkICk7IFx0XHRcdFx0XHRcdFx0Ly8gQ2xlYXIgZGF5cyBoaWdobGlnaHRpbmdcclxuXHJcblx0XHRcdHZhciBjc3Nfb2ZfY2FsZW5kYXIgPSAnLndwYmNfb25seV9jYWxlbmRhciAjY2FsZW5kYXJfYm9va2luZycgKyByZXNvdXJjZV9pZDtcclxuXHRcdFx0alF1ZXJ5KCBjc3Nfb2ZfY2FsZW5kYXIgKyAnIC5kYXRlcGljay1kYXlzLWNlbGwsICdcclxuXHRcdFx0XHQgICsgY3NzX29mX2NhbGVuZGFyICsgJyAuZGF0ZXBpY2stZGF5cy1jZWxsIGEnICkuY3NzKCAnY3Vyc29yJywgJ2RlZmF1bHQnICk7XHQvLyBTZXQgY3Vyc29yIHRvIERlZmF1bHRcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHJcblxyXG5cdFx0Ly8gIEQgYSB5IHMgICAgSCBvIHYgZSByIGkgbiBnICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdGlmIChcclxuXHRcdFx0ICAgKCBsb2NhdGlvbi5ocmVmLmluZGV4T2YoICdwYWdlPXdwYmMnICkgPT0gLTEgKVxyXG5cdFx0XHR8fCAoIGxvY2F0aW9uLmhyZWYuaW5kZXhPZiggJ3BhZ2U9d3BiYy1uZXcnICkgPiAwIClcclxuXHRcdFx0fHwgKCBsb2NhdGlvbi5ocmVmLmluZGV4T2YoICdwYWdlPXdwYmMtYXZhaWxhYmlsaXR5JyApID4gMCApXHJcblx0XHQpe1xyXG5cdFx0XHQvLyBUaGUgc2FtZSBhcyBkYXRlcyBzZWxlY3Rpb24sICBidXQgZm9yIGRheXMgaG92ZXJpbmdcclxuXHJcblx0XHRcdGlmICggJ2Z1bmN0aW9uJyA9PSB0eXBlb2YoIHdwYmNfX2NhbGVuZGFyX19kb19kYXlzX2hpZ2hsaWdodF9fYnMgKSApe1xyXG5cdFx0XHRcdHdwYmNfX2NhbGVuZGFyX19kb19kYXlzX2hpZ2hsaWdodF9fYnMoIHNxbF9jbGFzc19kYXksIGRhdGUsIHJlc291cmNlX2lkICk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogU2VsZWN0IGNhbGVuZGFyIGRhdGUgY2VsbHNcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBkYXRlXHRcdFx0XHRcdFx0XHRcdFx0XHQtICBKYXZhU2NyaXB0IERhdGUgT2JqOiAgXHRcdE1vbiBEZWMgMTEgMjAyMyAwMDowMDowMCBHTVQrMDIwMCAoRWFzdGVybiBFdXJvcGVhbiBTdGFuZGFyZCBUaW1lKVxyXG5cdCAqIEBwYXJhbSBjYWxlbmRhcl9wYXJhbXNfYXJyXHRcdFx0XHRcdFx0LSAgQ2FsZW5kYXIgU2V0dGluZ3MgT2JqZWN0OiAgXHR7XHJcblx0ICpcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgXHRcdFx0XHRcdFx0XCJyZXNvdXJjZV9pZFwiOiA0XHJcblx0ICpcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0ICogQHBhcmFtIGRhdGVwaWNrX3RoaXNcdFx0XHRcdFx0XHRcdFx0LSB0aGlzIG9mIGRhdGVwaWNrIE9ialxyXG5cdCAqXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gd3BiY19fY2FsZW5kYXJfX29uX3NlbGVjdF9kYXlzKCBkYXRlLCBjYWxlbmRhcl9wYXJhbXNfYXJyLCBkYXRlcGlja190aGlzICl7XHJcblxyXG5cdFx0dmFyIHJlc291cmNlX2lkID0gKCAndW5kZWZpbmVkJyAhPT0gdHlwZW9mKGNhbGVuZGFyX3BhcmFtc19hcnJbICdyZXNvdXJjZV9pZCcgXSkgKSA/IGNhbGVuZGFyX3BhcmFtc19hcnJbICdyZXNvdXJjZV9pZCcgXSA6ICcxJztcdFx0Ly8gJzEnXHJcblxyXG5cdFx0Ly8gU2V0IHVuc2VsZWN0YWJsZSwgIGlmIG9ubHkgQXZhaWxhYmlsaXR5IENhbGVuZGFyICBoZXJlIChhbmQgd2UgZG8gbm90IGluc2VydCBCb29raW5nIGZvcm0gYnkgbWlzdGFrZSkuXHJcblx0XHR2YXIgaXNfdW5zZWxlY3RhYmxlX2NhbGVuZGFyID0gKCBqUXVlcnkoICcjY2FsZW5kYXJfYm9va2luZ191bnNlbGVjdGFibGUnICsgcmVzb3VyY2VfaWQgKS5sZW5ndGggPiAwKTtcdFx0XHRcdC8vRml4SW46IDguMC4xLjJcclxuXHRcdHZhciBpc19ib29raW5nX2Zvcm1fZXhpc3QgICAgPSAoIGpRdWVyeSggJyNib29raW5nX2Zvcm1fZGl2JyArIHJlc291cmNlX2lkICkubGVuZ3RoID4gMCApO1xyXG5cdFx0aWYgKCAoIGlzX3Vuc2VsZWN0YWJsZV9jYWxlbmRhciApICYmICggISBpc19ib29raW5nX2Zvcm1fZXhpc3QgKSApe1xyXG5cdFx0XHR3cGJjX2NhbGVuZGFyX191bnNlbGVjdF9hbGxfZGF0ZXMoIHJlc291cmNlX2lkICk7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBVbnNlbGVjdCBEYXRlc1xyXG5cdFx0XHRqUXVlcnkoJy53cGJjX29ubHlfY2FsZW5kYXIgLnBvcG92ZXJfY2FsZW5kYXJfaG92ZXInKS5yZW1vdmUoKTsgICAgICAgICAgICAgICAgICAgICAgXHRcdFx0XHRcdFx0XHQvLyBIaWRlIGFsbCBvcGVuZWQgcG9wb3ZlcnNcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGpRdWVyeSggJyNkYXRlX2Jvb2tpbmcnICsgcmVzb3VyY2VfaWQgKS52YWwoIGRhdGUgKTtcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIEFkZCBzZWxlY3RlZCBkYXRlcyB0byAgaGlkZGVuIHRleHRhcmVhXHJcblxyXG5cclxuXHRcdGlmICggJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mICh3cGJjX19jYWxlbmRhcl9fZG9fZGF5c19zZWxlY3RfX2JzKSApeyB3cGJjX19jYWxlbmRhcl9fZG9fZGF5c19zZWxlY3RfX2JzKCBkYXRlLCByZXNvdXJjZV9pZCApOyB9XHJcblxyXG5cdFx0d3BiY19kaXNhYmxlX3RpbWVfZmllbGRzX2luX2Jvb2tpbmdfZm9ybSggcmVzb3VyY2VfaWQgKTtcclxuXHJcblx0XHQvLyBIb29rIC0tIHRyaWdnZXIgZGF5IHNlbGVjdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0dmFyIG1vdXNlX2NsaWNrZWRfZGF0ZXMgPSBkYXRlO1x0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gQ2FuIGJlOiBcIjA1LjEwLjIwMjMgLSAwNy4xMC4yMDIzXCIgIHwgIFwiMTAuMTAuMjAyMyAtIDEwLjEwLjIwMjNcIiAgfFxyXG5cdFx0dmFyIGFsbF9zZWxlY3RlZF9kYXRlc19hcnIgPSB3cGJjX2dldF9fc2VsZWN0ZWRfZGF0ZXNfc3FsX19hc19hcnIoIHJlc291cmNlX2lkICk7XHRcdFx0XHRcdFx0XHRcdFx0Ly8gQ2FuIGJlOiBbIFwiMjAyMy0xMC0wNVwiLCBcIjIwMjMtMTAtMDZcIiwgXCIyMDIzLTEwLTA3XCIsIOKApiBdXHJcblx0XHRqUXVlcnkoIFwiLmJvb2tpbmdfZm9ybV9kaXZcIiApLnRyaWdnZXIoIFwiZGF0ZV9zZWxlY3RlZFwiLCBbIHJlc291cmNlX2lkLCBtb3VzZV9jbGlja2VkX2RhdGVzLCBhbGxfc2VsZWN0ZWRfZGF0ZXNfYXJyIF0gKTtcclxuXHR9XHJcblxyXG5cclxuXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQvLyBUIGkgbSBlICAgIEYgaSBlIGwgZCBzXHRcdHN0YXJ0XHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0LyoqXHJcblx0ICogRGlzYWJsZSB0aW1lIHNsb3RzIGluIGJvb2tpbmcgZm9ybSBkZXBlbmQgb24gc2VsZWN0ZWQgZGF0ZXMgYW5kIGJvb2tlZCBkYXRlcy90aW1lc1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHJlc291cmNlX2lkXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gd3BiY19kaXNhYmxlX3RpbWVfZmllbGRzX2luX2Jvb2tpbmdfZm9ybSggcmVzb3VyY2VfaWQgKXtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFx0MS4gR2V0IGFsbCB0aW1lIGZpZWxkcyBpbiB0aGUgYm9va2luZyBmb3JtIGFzIGFycmF5ICBvZiBvYmplY3RzXHJcblx0XHQgKiBcdFx0XHRcdFx0W1xyXG5cdFx0ICogXHRcdFx0XHRcdCBcdCAgIHtcdGpxdWVyeV9vcHRpb246ICAgICAgalF1ZXJ5X09iamVjdCB7fVxyXG5cdFx0ICogXHRcdFx0XHRcdFx0XHRcdG5hbWU6ICAgICAgICAgICAgICAgJ3JhbmdldGltZTJbXSdcclxuXHRcdCAqIFx0XHRcdFx0XHRcdFx0XHR0aW1lc19hc19zZWNvbmRzOiAgIFsgMjE2MDAsIDIzNDAwIF1cclxuXHRcdCAqIFx0XHRcdFx0XHRcdFx0XHR2YWx1ZV9vcHRpb25fMjRoOiAgICcwNjowMCAtIDA2OjMwJ1xyXG5cdFx0ICogXHRcdFx0XHRcdCAgICAgfVxyXG5cdFx0ICogXHRcdFx0XHRcdCAgLi4uXHJcblx0XHQgKiBcdFx0XHRcdFx0XHQgICB7XHRqcXVlcnlfb3B0aW9uOiAgICAgIGpRdWVyeV9PYmplY3Qge31cclxuXHRcdCAqIFx0XHRcdFx0XHRcdFx0XHRuYW1lOiAgICAgICAgICAgICAgICdzdGFydHRpbWUyW10nXHJcblx0XHQgKiBcdFx0XHRcdFx0XHRcdFx0dGltZXNfYXNfc2Vjb25kczogICBbIDIxNjAwIF1cclxuXHRcdCAqIFx0XHRcdFx0XHRcdFx0XHR2YWx1ZV9vcHRpb25fMjRoOiAgICcwNjowMCdcclxuXHRcdCAqICBcdFx0XHRcdFx0ICAgIH1cclxuXHRcdCAqIFx0XHRcdFx0XHQgXVxyXG5cdFx0ICovXHJcblx0XHR2YXIgdGltZV9maWVsZHNfb2JqX2FyciA9IHdwYmNfZ2V0X190aW1lX2ZpZWxkc19faW5fYm9va2luZ19mb3JtX19hc19hcnIoIHJlc291cmNlX2lkICk7XHJcblxyXG5cdFx0Ly8gMi4gR2V0IGFsbCBzZWxlY3RlZCBkYXRlcyBpbiAgU1FMIGZvcm1hdCAgbGlrZSB0aGlzIFsgXCIyMDIzLTA4LTIzXCIsIFwiMjAyMy0wOC0yNFwiLCBcIjIwMjMtMDgtMjVcIiwgLi4uIF1cclxuXHRcdHZhciBzZWxlY3RlZF9kYXRlc19hcnIgPSB3cGJjX2dldF9fc2VsZWN0ZWRfZGF0ZXNfc3FsX19hc19hcnIoIHJlc291cmNlX2lkICk7XHJcblxyXG5cdFx0Ly8gMy4gR2V0IGNoaWxkIGJvb2tpbmcgcmVzb3VyY2VzICBvciBzaW5nbGUgYm9va2luZyByZXNvdXJjZSAgdGhhdCAgZXhpc3QgIGluIGRhdGVzXHJcblx0XHR2YXIgY2hpbGRfcmVzb3VyY2VzX2FyciA9IHdwYmNfY2xvbmVfb2JqKCBfd3BiYy5ib29raW5nX19nZXRfcGFyYW1fdmFsdWUoIHJlc291cmNlX2lkLCAncmVzb3VyY2VzX2lkX2Fycl9faW5fZGF0ZXMnICkgKTtcclxuXHJcblx0XHR2YXIgc3FsX2RhdGU7XHJcblx0XHR2YXIgY2hpbGRfcmVzb3VyY2VfaWQ7XHJcblx0XHR2YXIgbWVyZ2VkX3NlY29uZHM7XHJcblx0XHR2YXIgdGltZV9maWVsZHNfb2JqO1xyXG5cdFx0dmFyIGlzX2ludGVyc2VjdDtcclxuXHRcdHZhciBpc19jaGVja19pbjtcclxuXHJcblx0XHQvLyA0LiBMb29wICBhbGwgIHRpbWUgRmllbGRzIG9wdGlvbnNcclxuXHRcdGZvciAoIHZhciBmaWVsZF9rZXkgaW4gdGltZV9maWVsZHNfb2JqX2FyciApe1xyXG5cclxuXHRcdFx0dGltZV9maWVsZHNfb2JqX2FyclsgZmllbGRfa2V5IF0uZGlzYWJsZWQgPSAwOyAgICAgICAgICAvLyBCeSBkZWZhdWx0IHRoaXMgdGltZSBmaWVsZCBpcyBub3QgZGlzYWJsZWRcclxuXHJcblx0XHRcdHRpbWVfZmllbGRzX29iaiA9IHRpbWVfZmllbGRzX29ial9hcnJbIGZpZWxkX2tleSBdO1x0XHQvLyB7IHRpbWVzX2FzX3NlY29uZHM6IFsgMjE2MDAsIDIzNDAwIF0sIHZhbHVlX29wdGlvbl8yNGg6ICcwNjowMCAtIDA2OjMwJywgbmFtZTogJ3JhbmdldGltZTJbXScsIGpxdWVyeV9vcHRpb246IGpRdWVyeV9PYmplY3Qge319XHJcblxyXG5cdFx0XHQvLyBMb29wICBhbGwgIHNlbGVjdGVkIGRhdGVzXHJcblx0XHRcdGZvciAoIHZhciBpID0gMDsgaSA8IHNlbGVjdGVkX2RhdGVzX2Fyci5sZW5ndGg7IGkrKyApe1xyXG5cclxuXHRcdFx0XHQvLyBHZXQgRGF0ZTogJzIwMjMtMDgtMTgnXHJcblx0XHRcdFx0c3FsX2RhdGUgPSBzZWxlY3RlZF9kYXRlc19hcnJbIGkgXTtcclxuXHJcblxyXG5cdFx0XHRcdHZhciBob3dfbWFueV9yZXNvdXJjZXNfaW50ZXJzZWN0ZWQgPSAwO1xyXG5cdFx0XHRcdC8vIExvb3AgYWxsIHJlc291cmNlcyBJRFxyXG5cdFx0XHRcdGZvciAoIHZhciByZXNfa2V5IGluIGNoaWxkX3Jlc291cmNlc19hcnIgKXtcclxuXHJcblx0XHRcdFx0XHRjaGlsZF9yZXNvdXJjZV9pZCA9IGNoaWxkX3Jlc291cmNlc19hcnJbIHJlc19rZXkgXTtcclxuXHJcblx0XHRcdFx0XHQvLyBfd3BiYy5ib29raW5nc19pbl9jYWxlbmRhcl9fZ2V0X2Zvcl9kYXRlKDIsJzIwMjMtMDgtMjEnKVsxMl0uYm9va2VkX3RpbWVfc2xvdHMubWVyZ2VkX3NlY29uZHNcdFx0PSBbIFwiMDc6MDA6MTEgLSAwNzozMDowMlwiLCBcIjEwOjAwOjExIC0gMDA6MDA6MDBcIiBdXHJcblx0XHRcdFx0XHQvLyBfd3BiYy5ib29raW5nc19pbl9jYWxlbmRhcl9fZ2V0X2Zvcl9kYXRlKDIsJzIwMjMtMDgtMjEnKVsyXS5ib29rZWRfdGltZV9zbG90cy5tZXJnZWRfc2Vjb25kc1x0XHRcdD0gWyAgWyAyNTIxMSwgMjcwMDIgXSwgWyAzNjAxMSwgODY0MDAgXSAgXVxyXG5cclxuXHRcdFx0XHRcdGlmICggZmFsc2UgIT09IF93cGJjLmJvb2tpbmdzX2luX2NhbGVuZGFyX19nZXRfZm9yX2RhdGUoIHJlc291cmNlX2lkLCBzcWxfZGF0ZSApICl7XHJcblx0XHRcdFx0XHRcdG1lcmdlZF9zZWNvbmRzID0gX3dwYmMuYm9va2luZ3NfaW5fY2FsZW5kYXJfX2dldF9mb3JfZGF0ZSggcmVzb3VyY2VfaWQsIHNxbF9kYXRlIClbIGNoaWxkX3Jlc291cmNlX2lkIF0uYm9va2VkX3RpbWVfc2xvdHMubWVyZ2VkX3NlY29uZHM7XHRcdC8vIFsgIFsgMjUyMTEsIDI3MDAyIF0sIFsgMzYwMTEsIDg2NDAwIF0gIF1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdG1lcmdlZF9zZWNvbmRzID0gW107XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoIHRpbWVfZmllbGRzX29iai50aW1lc19hc19zZWNvbmRzLmxlbmd0aCA+IDEgKXtcclxuXHRcdFx0XHRcdFx0aXNfaW50ZXJzZWN0ID0gd3BiY19pc19pbnRlcnNlY3RfX3JhbmdlX3RpbWVfaW50ZXJ2YWwoICBbXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQoIHBhcnNlSW50KCB0aW1lX2ZpZWxkc19vYmoudGltZXNfYXNfc2Vjb25kc1swXSApICsgMjAgKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQoIHBhcnNlSW50KCB0aW1lX2ZpZWxkc19vYmoudGltZXNfYXNfc2Vjb25kc1sxXSApIC0gMjAgKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQsIG1lcmdlZF9zZWNvbmRzICk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRpc19jaGVja19pbiA9ICgtMSAhPT0gdGltZV9maWVsZHNfb2JqLm5hbWUuaW5kZXhPZiggJ3N0YXJ0JyApKTtcclxuXHRcdFx0XHRcdFx0aXNfaW50ZXJzZWN0ID0gd3BiY19pc19pbnRlcnNlY3RfX29uZV90aW1lX2ludGVydmFsKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KCAoIGlzX2NoZWNrX2luIClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgPyBwYXJzZUludCggdGltZV9maWVsZHNfb2JqLnRpbWVzX2FzX3NlY29uZHMgKSArIDIwXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgIDogcGFyc2VJbnQoIHRpbWVfZmllbGRzX29iai50aW1lc19hc19zZWNvbmRzICkgLSAyMFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LCBtZXJnZWRfc2Vjb25kcyApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKGlzX2ludGVyc2VjdCl7XHJcblx0XHRcdFx0XHRcdGhvd19tYW55X3Jlc291cmNlc19pbnRlcnNlY3RlZCsrO1x0XHRcdC8vIEluY3JlYXNlXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCBjaGlsZF9yZXNvdXJjZXNfYXJyLmxlbmd0aCA9PSBob3dfbWFueV9yZXNvdXJjZXNfaW50ZXJzZWN0ZWQgKSB7XHJcblx0XHRcdFx0XHQvLyBBbGwgcmVzb3VyY2VzIGludGVyc2VjdGVkLCAgdGhlbiAgaXQncyBtZWFucyB0aGF0IHRoaXMgdGltZS1zbG90IG9yIHRpbWUgbXVzdCAgYmUgIERpc2FibGVkLCBhbmQgd2UgY2FuICBleGlzdCAgZnJvbSAgIHNlbGVjdGVkX2RhdGVzX2FyciBMT09QXHJcblxyXG5cdFx0XHRcdFx0dGltZV9maWVsZHNfb2JqX2FyclsgZmllbGRfa2V5IF0uZGlzYWJsZWQgPSAxO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGV4aXN0ICBmcm9tICAgRGF0ZXMgTE9PUFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvLyA1LiBOb3cgd2UgY2FuIGRpc2FibGUgdGltZSBzbG90IGluIEhUTUwgYnkgIHVzaW5nICAoIGZpZWxkLmRpc2FibGVkID09IDEgKSBwcm9wZXJ0eVxyXG5cdFx0d3BiY19faHRtbF9fdGltZV9maWVsZF9vcHRpb25zX19zZXRfZGlzYWJsZWQoIHRpbWVfZmllbGRzX29ial9hcnIgKTtcclxuXHJcblx0XHRqUXVlcnkoIFwiLmJvb2tpbmdfZm9ybV9kaXZcIiApLnRyaWdnZXIoICd3cGJjX2hvb2tfdGltZXNsb3RzX2Rpc2FibGVkJywgW3Jlc291cmNlX2lkLCBzZWxlY3RlZF9kYXRlc19hcnJdICk7XHRcdFx0XHRcdC8vIFRyaWdnZXIgaG9vayBvbiBkaXNhYmxpbmcgdGltZXNsb3RzLlx0XHRVc2FnZTogXHRqUXVlcnkoIFwiLmJvb2tpbmdfZm9ybV9kaXZcIiApLm9uKCAnd3BiY19ob29rX3RpbWVzbG90c19kaXNhYmxlZCcsIGZ1bmN0aW9uICggZXZlbnQsIGJrX3R5cGUsIGFsbF9kYXRlcyApeyAuLi4gfSApO1x0XHQvL0ZpeEluOiA4LjcuMTEuOVxyXG5cdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIElzIG51bWJlciBpbnNpZGUgL2ludGVyc2VjdCAgb2YgYXJyYXkgb2YgaW50ZXJ2YWxzID9cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gdGltZV9BXHRcdCAgICAgXHRcdCAyNTgwMFxyXG5cdFx0ICogQHBhcmFtIHRpbWVfaW50ZXJ2YWxfQlx0XHRbICBbIDI1MjExLCAyNzAwMiBdLCBbIDM2MDExLCA4NjQwMCBdICBdXHJcblx0XHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHRcdCAqL1xyXG5cdFx0ZnVuY3Rpb24gd3BiY19pc19pbnRlcnNlY3RfX29uZV90aW1lX2ludGVydmFsKCB0aW1lX0EsIHRpbWVfaW50ZXJ2YWxfQiApe1xyXG5cclxuXHRcdFx0Zm9yICggdmFyIGogPSAwOyBqIDwgdGltZV9pbnRlcnZhbF9CLmxlbmd0aDsgaisrICl7XHJcblxyXG5cdFx0XHRcdGlmICggKHBhcnNlSW50KCB0aW1lX0EgKSA+IHBhcnNlSW50KCB0aW1lX2ludGVydmFsX0JbIGogXVsgMCBdICkpICYmIChwYXJzZUludCggdGltZV9BICkgPCBwYXJzZUludCggdGltZV9pbnRlcnZhbF9CWyBqIF1bIDEgXSApKSApe1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGlmICggKCBwYXJzZUludCggdGltZV9BICkgPT0gcGFyc2VJbnQoIHRpbWVfaW50ZXJ2YWxfQlsgaiBdWyAwIF0gKSApIHx8ICggcGFyc2VJbnQoIHRpbWVfQSApID09IHBhcnNlSW50KCB0aW1lX2ludGVydmFsX0JbIGogXVsgMSBdICkgKSApIHtcclxuXHRcdFx0XHQvLyBcdFx0XHQvLyBUaW1lIEEganVzdCAgYXQgIHRoZSBib3JkZXIgb2YgaW50ZXJ2YWxcclxuXHRcdFx0XHQvLyB9XHJcblx0XHRcdH1cclxuXHJcblx0XHQgICAgcmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSXMgdGhlc2UgYXJyYXkgb2YgaW50ZXJ2YWxzIGludGVyc2VjdGVkID9cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gdGltZV9pbnRlcnZhbF9BXHRcdFsgWyAyMTYwMCwgMjM0MDAgXSBdXHJcblx0XHQgKiBAcGFyYW0gdGltZV9pbnRlcnZhbF9CXHRcdFsgIFsgMjUyMTEsIDI3MDAyIF0sIFsgMzYwMTEsIDg2NDAwIF0gIF1cclxuXHRcdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdFx0ICovXHJcblx0XHRmdW5jdGlvbiB3cGJjX2lzX2ludGVyc2VjdF9fcmFuZ2VfdGltZV9pbnRlcnZhbCggdGltZV9pbnRlcnZhbF9BLCB0aW1lX2ludGVydmFsX0IgKXtcclxuXHJcblx0XHRcdHZhciBpc19pbnRlcnNlY3Q7XHJcblxyXG5cdFx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCB0aW1lX2ludGVydmFsX0EubGVuZ3RoOyBpKysgKXtcclxuXHJcblx0XHRcdFx0Zm9yICggdmFyIGogPSAwOyBqIDwgdGltZV9pbnRlcnZhbF9CLmxlbmd0aDsgaisrICl7XHJcblxyXG5cdFx0XHRcdFx0aXNfaW50ZXJzZWN0ID0gd3BiY19pbnRlcnZhbHNfX2lzX2ludGVyc2VjdGVkKCB0aW1lX2ludGVydmFsX0FbIGkgXSwgdGltZV9pbnRlcnZhbF9CWyBqIF0gKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIGlzX2ludGVyc2VjdCApe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldCBhbGwgdGltZSBmaWVsZHMgaW4gdGhlIGJvb2tpbmcgZm9ybSBhcyBhcnJheSAgb2Ygb2JqZWN0c1xyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSByZXNvdXJjZV9pZFxyXG5cdFx0ICogQHJldHVybnMgW11cclxuXHRcdCAqXHJcblx0XHQgKiBcdFx0RXhhbXBsZTpcclxuXHRcdCAqIFx0XHRcdFx0XHRbXHJcblx0XHQgKiBcdFx0XHRcdFx0IFx0ICAge1xyXG5cdFx0ICogXHRcdFx0XHRcdFx0XHRcdHZhbHVlX29wdGlvbl8yNGg6ICAgJzA2OjAwIC0gMDY6MzAnXHJcblx0XHQgKiBcdFx0XHRcdFx0XHRcdFx0dGltZXNfYXNfc2Vjb25kczogICBbIDIxNjAwLCAyMzQwMCBdXHJcblx0XHQgKiBcdFx0XHRcdFx0IFx0ICAgXHRcdGpxdWVyeV9vcHRpb246ICAgICAgalF1ZXJ5X09iamVjdCB7fVxyXG5cdFx0ICogXHRcdFx0XHRcdFx0XHRcdG5hbWU6ICAgICAgICAgICAgICAgJ3JhbmdldGltZTJbXSdcclxuXHRcdCAqIFx0XHRcdFx0XHQgICAgIH1cclxuXHRcdCAqIFx0XHRcdFx0XHQgIC4uLlxyXG5cdFx0ICogXHRcdFx0XHRcdFx0ICAge1xyXG5cdFx0ICogXHRcdFx0XHRcdFx0XHRcdHZhbHVlX29wdGlvbl8yNGg6ICAgJzA2OjAwJ1xyXG5cdFx0ICogXHRcdFx0XHRcdFx0XHRcdHRpbWVzX2FzX3NlY29uZHM6ICAgWyAyMTYwMCBdXHJcblx0XHQgKiBcdFx0XHRcdFx0XHQgICBcdFx0anF1ZXJ5X29wdGlvbjogICAgICBqUXVlcnlfT2JqZWN0IHt9XHJcblx0XHQgKiBcdFx0XHRcdFx0XHRcdFx0bmFtZTogICAgICAgICAgICAgICAnc3RhcnR0aW1lMltdJ1xyXG5cdFx0ICogIFx0XHRcdFx0XHQgICAgfVxyXG5cdFx0ICogXHRcdFx0XHRcdCBdXHJcblx0XHQgKi9cclxuXHRcdGZ1bmN0aW9uIHdwYmNfZ2V0X190aW1lX2ZpZWxkc19faW5fYm9va2luZ19mb3JtX19hc19hcnIoIHJlc291cmNlX2lkICl7XHJcblx0XHQgICAgLyoqXHJcblx0XHRcdCAqIEZpZWxkcyB3aXRoICBbXSAgbGlrZSB0aGlzICAgc2VsZWN0W25hbWU9XCJyYW5nZXRpbWUxW11cIl1cclxuXHRcdFx0ICogaXQncyB3aGVuIHdlIGhhdmUgJ211bHRpcGxlJyBpbiBzaG9ydGNvZGU6ICAgW3NlbGVjdCogcmFuZ2V0aW1lIG11bHRpcGxlICBcIjA2OjAwIC0gMDY6MzBcIiAuLi4gXVxyXG5cdFx0XHQgKi9cclxuXHRcdFx0dmFyIHRpbWVfZmllbGRzX2Fycj1bXHJcblx0XHRcdFx0XHRcdFx0XHRcdCdzZWxlY3RbbmFtZT1cInJhbmdldGltZScgKyByZXNvdXJjZV9pZCArICdcIl0nLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQnc2VsZWN0W25hbWU9XCJyYW5nZXRpbWUnICsgcmVzb3VyY2VfaWQgKyAnW11cIl0nLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQnc2VsZWN0W25hbWU9XCJzdGFydHRpbWUnICsgcmVzb3VyY2VfaWQgKyAnXCJdJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0J3NlbGVjdFtuYW1lPVwic3RhcnR0aW1lJyArIHJlc291cmNlX2lkICsgJ1tdXCJdJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0J3NlbGVjdFtuYW1lPVwiZW5kdGltZScgKyByZXNvdXJjZV9pZCArICdcIl0nLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQnc2VsZWN0W25hbWU9XCJlbmR0aW1lJyArIHJlc291cmNlX2lkICsgJ1tdXCJdJ1xyXG5cdFx0XHRcdFx0XHRcdFx0XTtcclxuXHJcblx0XHRcdHZhciB0aW1lX2ZpZWxkc19vYmpfYXJyID0gW107XHJcblxyXG5cdFx0XHQvLyBMb29wIGFsbCBUaW1lIEZpZWxkc1xyXG5cdFx0XHRmb3IgKCB2YXIgY3RmPSAwOyBjdGYgPCB0aW1lX2ZpZWxkc19hcnIubGVuZ3RoOyBjdGYrKyApe1xyXG5cclxuXHRcdFx0XHR2YXIgdGltZV9maWVsZCA9IHRpbWVfZmllbGRzX2FyclsgY3RmIF07XHJcblx0XHRcdFx0dmFyIHRpbWVfb3B0aW9uID0galF1ZXJ5KCB0aW1lX2ZpZWxkICsgJyBvcHRpb24nICk7XHJcblxyXG5cdFx0XHRcdC8vIExvb3AgYWxsIG9wdGlvbnMgaW4gdGltZSBmaWVsZFxyXG5cdFx0XHRcdGZvciAoIHZhciBqID0gMDsgaiA8IHRpbWVfb3B0aW9uLmxlbmd0aDsgaisrICl7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGpxdWVyeV9vcHRpb24gPSBqUXVlcnkoIHRpbWVfZmllbGQgKyAnIG9wdGlvbjplcSgnICsgaiArICcpJyApO1xyXG5cdFx0XHRcdFx0dmFyIHZhbHVlX29wdGlvbl9zZWNvbmRzX2FyciA9IGpxdWVyeV9vcHRpb24udmFsKCkuc3BsaXQoICctJyApO1xyXG5cdFx0XHRcdFx0dmFyIHRpbWVzX2FzX3NlY29uZHMgPSBbXTtcclxuXHJcblx0XHRcdFx0XHQvLyBHZXQgdGltZSBhcyBzZWNvbmRzXHJcblx0XHRcdFx0XHRmb3IgKCB2YXIgaSBpbiB2YWx1ZV9vcHRpb25fc2Vjb25kc19hcnIgKXtcclxuXHJcblx0XHRcdFx0XHRcdC8vIHZhbHVlX29wdGlvbl9zZWNvbmRzX2FycltpXSA9ICcxNDowMCAnICB8ICcgMTY6MDAnICAgKGlmIGZyb20gJ3JhbmdldGltZScpIGFuZCAnMTY6MDAnICBpZiAoc3RhcnQvZW5kIHRpbWUpXHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgc3RhcnRfZW5kX3RpbWVzX2FyciA9IHZhbHVlX29wdGlvbl9zZWNvbmRzX2FyclsgaSBdLnRyaW0oKS5zcGxpdCggJzonICk7XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgdGltZV9pbl9zZWNvbmRzID0gcGFyc2VJbnQoIHN0YXJ0X2VuZF90aW1lc19hcnJbIDAgXSApICogNjAgKiA2MCArIHBhcnNlSW50KCBzdGFydF9lbmRfdGltZXNfYXJyWyAxIF0gKSAqIDYwO1xyXG5cclxuXHRcdFx0XHRcdFx0dGltZXNfYXNfc2Vjb25kcy5wdXNoKCB0aW1lX2luX3NlY29uZHMgKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR0aW1lX2ZpZWxkc19vYmpfYXJyLnB1c2goIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J25hbWUnICAgICAgICAgICAgOiBqUXVlcnkoIHRpbWVfZmllbGQgKS5hdHRyKCAnbmFtZScgKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J3ZhbHVlX29wdGlvbl8yNGgnOiBqcXVlcnlfb3B0aW9uLnZhbCgpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnanF1ZXJ5X29wdGlvbicgICA6IGpxdWVyeV9vcHRpb24sXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCd0aW1lc19hc19zZWNvbmRzJzogdGltZXNfYXNfc2Vjb25kc1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRpbWVfZmllbGRzX29ial9hcnI7XHJcblx0XHR9XHJcblxyXG5cdFx0XHQvKipcclxuXHRcdFx0ICogRGlzYWJsZSBIVE1MIG9wdGlvbnMgYW5kIGFkZCBib29rZWQgQ1NTIGNsYXNzXHJcblx0XHRcdCAqXHJcblx0XHRcdCAqIEBwYXJhbSB0aW1lX2ZpZWxkc19vYmpfYXJyICAgICAgLSB0aGlzIHZhbHVlIGlzIGZyb20gIHRoZSBmdW5jOiAgXHR3cGJjX2dldF9fdGltZV9maWVsZHNfX2luX2Jvb2tpbmdfZm9ybV9fYXNfYXJyKCByZXNvdXJjZV9pZCApXHJcblx0XHRcdCAqIFx0XHRcdFx0XHRbXHJcblx0XHRcdCAqIFx0XHRcdFx0XHQgXHQgICB7XHRqcXVlcnlfb3B0aW9uOiAgICAgIGpRdWVyeV9PYmplY3Qge31cclxuXHRcdFx0ICogXHRcdFx0XHRcdFx0XHRcdG5hbWU6ICAgICAgICAgICAgICAgJ3JhbmdldGltZTJbXSdcclxuXHRcdFx0ICogXHRcdFx0XHRcdFx0XHRcdHRpbWVzX2FzX3NlY29uZHM6ICAgWyAyMTYwMCwgMjM0MDAgXVxyXG5cdFx0XHQgKiBcdFx0XHRcdFx0XHRcdFx0dmFsdWVfb3B0aW9uXzI0aDogICAnMDY6MDAgLSAwNjozMCdcclxuXHRcdFx0ICogXHQgIFx0XHRcdFx0XHRcdCAgICBkaXNhYmxlZCA9IDFcclxuXHRcdFx0ICogXHRcdFx0XHRcdCAgICAgfVxyXG5cdFx0XHQgKiBcdFx0XHRcdFx0ICAuLi5cclxuXHRcdFx0ICogXHRcdFx0XHRcdFx0ICAge1x0anF1ZXJ5X29wdGlvbjogICAgICBqUXVlcnlfT2JqZWN0IHt9XHJcblx0XHRcdCAqIFx0XHRcdFx0XHRcdFx0XHRuYW1lOiAgICAgICAgICAgICAgICdzdGFydHRpbWUyW10nXHJcblx0XHRcdCAqIFx0XHRcdFx0XHRcdFx0XHR0aW1lc19hc19zZWNvbmRzOiAgIFsgMjE2MDAgXVxyXG5cdFx0XHQgKiBcdFx0XHRcdFx0XHRcdFx0dmFsdWVfb3B0aW9uXzI0aDogICAnMDY6MDAnXHJcblx0XHRcdCAqICAgXHRcdFx0XHRcdFx0XHRkaXNhYmxlZCA9IDBcclxuXHRcdFx0ICogIFx0XHRcdFx0XHQgICAgfVxyXG5cdFx0XHQgKiBcdFx0XHRcdFx0IF1cclxuXHRcdFx0ICpcclxuXHRcdFx0ICovXHJcblx0XHRcdGZ1bmN0aW9uIHdwYmNfX2h0bWxfX3RpbWVfZmllbGRfb3B0aW9uc19fc2V0X2Rpc2FibGVkKCB0aW1lX2ZpZWxkc19vYmpfYXJyICl7XHJcblxyXG5cdFx0XHRcdHZhciBqcXVlcnlfb3B0aW9uO1xyXG5cclxuXHRcdFx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCB0aW1lX2ZpZWxkc19vYmpfYXJyLmxlbmd0aDsgaSsrICl7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGpxdWVyeV9vcHRpb24gPSB0aW1lX2ZpZWxkc19vYmpfYXJyWyBpIF0uanF1ZXJ5X29wdGlvbjtcclxuXHJcblx0XHRcdFx0XHRpZiAoIDEgPT0gdGltZV9maWVsZHNfb2JqX2FyclsgaSBdLmRpc2FibGVkICl7XHJcblx0XHRcdFx0XHRcdGpxdWVyeV9vcHRpb24ucHJvcCggJ2Rpc2FibGVkJywgdHJ1ZSApOyBcdFx0Ly8gTWFrZSBkaXNhYmxlIHNvbWUgb3B0aW9uc1xyXG5cdFx0XHRcdFx0XHRqcXVlcnlfb3B0aW9uLmFkZENsYXNzKCAnYm9va2VkJyApOyAgICAgICAgICAgXHQvLyBBZGQgXCJib29rZWRcIiBDU1MgY2xhc3NcclxuXHJcblx0XHRcdFx0XHRcdC8vIGlmIHRoaXMgYm9va2VkIGVsZW1lbnQgc2VsZWN0ZWQgLS0+IHRoZW4gZGVzZWxlY3QgIGl0XHJcblx0XHRcdFx0XHRcdGlmICgganF1ZXJ5X29wdGlvbi5wcm9wKCAnc2VsZWN0ZWQnICkgKXtcclxuXHRcdFx0XHRcdFx0XHRqcXVlcnlfb3B0aW9uLnByb3AoICdzZWxlY3RlZCcsIGZhbHNlICk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGpxdWVyeV9vcHRpb24ucGFyZW50KCkuZmluZCggJ29wdGlvbjpub3QoW2Rpc2FibGVkXSk6Zmlyc3QnICkucHJvcCggJ3NlbGVjdGVkJywgdHJ1ZSApLnRyaWdnZXIoIFwiY2hhbmdlXCIgKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGpxdWVyeV9vcHRpb24ucHJvcCggJ2Rpc2FibGVkJywgZmFsc2UgKTsgIFx0XHQvLyBNYWtlIGFjdGl2ZSBhbGwgdGltZXNcclxuXHRcdFx0XHRcdFx0anF1ZXJ5X29wdGlvbi5yZW1vdmVDbGFzcyggJ2Jvb2tlZCcgKTsgICBcdFx0Ly8gUmVtb3ZlIGNsYXNzIFwiYm9va2VkXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrIGlmIHRoaXMgdGltZV9yYW5nZSB8IFRpbWVfU2xvdCBpcyBGdWxsIERheSAgYm9va2VkXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gdGltZXNsb3RfYXJyX2luX3NlY29uZHNcdFx0WyAzNjAxMSwgODY0MDAgXVxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdwYmNfaXNfdGhpc190aW1lc2xvdF9fZnVsbF9kYXlfYm9va2VkKCB0aW1lc2xvdF9hcnJfaW5fc2Vjb25kcyApe1xyXG5cclxuXHRcdGlmIChcclxuXHRcdFx0XHQoIHRpbWVzbG90X2Fycl9pbl9zZWNvbmRzLmxlbmd0aCA+IDEgKVxyXG5cdFx0XHQmJiAoIHBhcnNlSW50KCB0aW1lc2xvdF9hcnJfaW5fc2Vjb25kc1sgMCBdICkgPCAzMCApXHJcblx0XHRcdCYmICggcGFyc2VJbnQoIHRpbWVzbG90X2Fycl9pbl9zZWNvbmRzWyAxIF0gKSA+ICAoICgyNCAqIDYwICogNjApIC0gMzApIClcclxuXHRcdCl7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIFMgZSBsIGUgYyB0IGUgZCAgICBEIGEgdCBlIHMgIC8gIFQgaSBtIGUgLSBGIGkgZSBsIGQgc1xyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdC8qKlxyXG5cdCAqICBHZXQgYWxsIHNlbGVjdGVkIGRhdGVzIGluIFNRTCBmb3JtYXQgbGlrZSB0aGlzIFsgXCIyMDIzLTA4LTIzXCIsIFwiMjAyMy0wOC0yNFwiICwgLi4uIF1cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSByZXNvdXJjZV9pZFxyXG5cdCAqIEByZXR1cm5zIHtbXX1cdFx0XHRbIFwiMjAyMy0wOC0yM1wiLCBcIjIwMjMtMDgtMjRcIiwgXCIyMDIzLTA4LTI1XCIsIFwiMjAyMy0wOC0yNlwiLCBcIjIwMjMtMDgtMjdcIiwgXCIyMDIzLTA4LTI4XCIsIFwiMjAyMy0wOC0yOVwiIF1cclxuXHQgKi9cclxuXHRmdW5jdGlvbiB3cGJjX2dldF9fc2VsZWN0ZWRfZGF0ZXNfc3FsX19hc19hcnIoIHJlc291cmNlX2lkICl7XHJcblxyXG5cdFx0dmFyIHNlbGVjdGVkX2RhdGVzX2FyciA9IFtdO1xyXG5cdFx0c2VsZWN0ZWRfZGF0ZXNfYXJyID0galF1ZXJ5KCAnI2RhdGVfYm9va2luZycgKyByZXNvdXJjZV9pZCApLnZhbCgpLnNwbGl0KCcsJyk7XHJcblx0XHRmb3IgKCB2YXIgaSBpbiBzZWxlY3RlZF9kYXRlc19hcnIgKXtcclxuXHRcdFx0c2VsZWN0ZWRfZGF0ZXNfYXJyW2ldID0gc2VsZWN0ZWRfZGF0ZXNfYXJyW2ldLnRyaW0oKTtcclxuXHRcdFx0c2VsZWN0ZWRfZGF0ZXNfYXJyW2ldID0gc2VsZWN0ZWRfZGF0ZXNfYXJyW2ldLnNwbGl0KCcuJyk7XHJcblx0XHRcdGlmICggc2VsZWN0ZWRfZGF0ZXNfYXJyWyBpIF0ubGVuZ3RoID4gMSApe1xyXG5cdFx0XHRcdHNlbGVjdGVkX2RhdGVzX2FyclsgaSBdID0gc2VsZWN0ZWRfZGF0ZXNfYXJyWyBpIF1bIDIgXSArICctJyArIHNlbGVjdGVkX2RhdGVzX2FyclsgaSBdWyAxIF0gKyAnLScgKyBzZWxlY3RlZF9kYXRlc19hcnJbIGkgXVsgMCBdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmVtb3ZlIGVtcHR5IGVsZW1lbnRzIGZyb20gYW4gYXJyYXlcclxuXHRcdHNlbGVjdGVkX2RhdGVzX2FyciA9IHNlbGVjdGVkX2RhdGVzX2Fyci5maWx0ZXIoIGZ1bmN0aW9uICggbiApeyByZXR1cm4gcGFyc2VJbnQobik7IH0gKTtcclxuXHJcblx0XHRzZWxlY3RlZF9kYXRlc19hcnIuc29ydCgpO1xyXG5cclxuXHRcdHJldHVybiBzZWxlY3RlZF9kYXRlc19hcnI7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IGFsbCB0aW1lIGZpZWxkcyBpbiB0aGUgYm9va2luZyBmb3JtIGFzIGFycmF5ICBvZiBvYmplY3RzXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcmVzb3VyY2VfaWRcclxuXHQgKiBAcmV0dXJucyBbXVxyXG5cdCAqXHJcblx0ICogXHRcdEV4YW1wbGU6XHJcblx0ICogXHRcdFx0XHRcdFtcclxuXHQgKiBcdFx0XHRcdFx0IFx0ICAge1xyXG5cdCAqIFx0XHRcdFx0XHRcdFx0XHR2YWx1ZV9vcHRpb25fMjRoOiAgICcwNjowMCAtIDA2OjMwJ1xyXG5cdCAqIFx0XHRcdFx0XHRcdFx0XHR0aW1lc19hc19zZWNvbmRzOiAgIFsgMjE2MDAsIDIzNDAwIF1cclxuXHQgKiBcdFx0XHRcdFx0IFx0ICAgXHRcdGpxdWVyeV9vcHRpb246ICAgICAgalF1ZXJ5X09iamVjdCB7fVxyXG5cdCAqIFx0XHRcdFx0XHRcdFx0XHRuYW1lOiAgICAgICAgICAgICAgICdyYW5nZXRpbWUyW10nXHJcblx0ICogXHRcdFx0XHRcdCAgICAgfVxyXG5cdCAqIFx0XHRcdFx0XHQgIC4uLlxyXG5cdCAqIFx0XHRcdFx0XHRcdCAgIHtcclxuXHQgKiBcdFx0XHRcdFx0XHRcdFx0dmFsdWVfb3B0aW9uXzI0aDogICAnMDY6MDAnXHJcblx0ICogXHRcdFx0XHRcdFx0XHRcdHRpbWVzX2FzX3NlY29uZHM6ICAgWyAyMTYwMCBdXHJcblx0ICogXHRcdFx0XHRcdFx0ICAgXHRcdGpxdWVyeV9vcHRpb246ICAgICAgalF1ZXJ5X09iamVjdCB7fVxyXG5cdCAqIFx0XHRcdFx0XHRcdFx0XHRuYW1lOiAgICAgICAgICAgICAgICdzdGFydHRpbWUyW10nXHJcblx0ICogIFx0XHRcdFx0XHQgICAgfVxyXG5cdCAqIFx0XHRcdFx0XHQgXVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdwYmNfZ2V0X19zZWxlY3RlZF90aW1lX2ZpZWxkc19faW5fYm9va2luZ19mb3JtX19hc19hcnIoIHJlc291cmNlX2lkLCBpc19vbmx5X3NlbGVjdGVkX3RpbWUgPSB0cnVlICl7XHJcblx0XHQvKipcclxuXHRcdCAqIEZpZWxkcyB3aXRoICBbXSAgbGlrZSB0aGlzICAgc2VsZWN0W25hbWU9XCJyYW5nZXRpbWUxW11cIl1cclxuXHRcdCAqIGl0J3Mgd2hlbiB3ZSBoYXZlICdtdWx0aXBsZScgaW4gc2hvcnRjb2RlOiAgIFtzZWxlY3QqIHJhbmdldGltZSBtdWx0aXBsZSAgXCIwNjowMCAtIDA2OjMwXCIgLi4uIF1cclxuXHRcdCAqL1xyXG5cdFx0dmFyIHRpbWVfZmllbGRzX2Fycj1bXHJcblx0XHRcdFx0XHRcdFx0XHQnc2VsZWN0W25hbWU9XCJyYW5nZXRpbWUnICsgcmVzb3VyY2VfaWQgKyAnXCJdJyxcclxuXHRcdFx0XHRcdFx0XHRcdCdzZWxlY3RbbmFtZT1cInJhbmdldGltZScgKyByZXNvdXJjZV9pZCArICdbXVwiXScsXHJcblx0XHRcdFx0XHRcdFx0XHQnc2VsZWN0W25hbWU9XCJzdGFydHRpbWUnICsgcmVzb3VyY2VfaWQgKyAnXCJdJyxcclxuXHRcdFx0XHRcdFx0XHRcdCdzZWxlY3RbbmFtZT1cInN0YXJ0dGltZScgKyByZXNvdXJjZV9pZCArICdbXVwiXScsXHJcblx0XHRcdFx0XHRcdFx0XHQnc2VsZWN0W25hbWU9XCJlbmR0aW1lJyArIHJlc291cmNlX2lkICsgJ1wiXScsXHJcblx0XHRcdFx0XHRcdFx0XHQnc2VsZWN0W25hbWU9XCJlbmR0aW1lJyArIHJlc291cmNlX2lkICsgJ1tdXCJdJyxcclxuXHRcdFx0XHRcdFx0XHRcdCdzZWxlY3RbbmFtZT1cImR1cmF0aW9udGltZScgKyByZXNvdXJjZV9pZCArICdcIl0nLFxyXG5cdFx0XHRcdFx0XHRcdFx0J3NlbGVjdFtuYW1lPVwiZHVyYXRpb250aW1lJyArIHJlc291cmNlX2lkICsgJ1tdXCJdJ1xyXG5cdFx0XHRcdFx0XHRcdF07XHJcblxyXG5cdFx0dmFyIHRpbWVfZmllbGRzX29ial9hcnIgPSBbXTtcclxuXHJcblx0XHQvLyBMb29wIGFsbCBUaW1lIEZpZWxkc1xyXG5cdFx0Zm9yICggdmFyIGN0Zj0gMDsgY3RmIDwgdGltZV9maWVsZHNfYXJyLmxlbmd0aDsgY3RmKysgKXtcclxuXHJcblx0XHRcdHZhciB0aW1lX2ZpZWxkID0gdGltZV9maWVsZHNfYXJyWyBjdGYgXTtcclxuXHJcblx0XHRcdHZhciB0aW1lX29wdGlvbjtcclxuXHRcdFx0aWYgKCBpc19vbmx5X3NlbGVjdGVkX3RpbWUgKXtcclxuXHRcdFx0XHR0aW1lX29wdGlvbiA9IGpRdWVyeSggJyNib29raW5nX2Zvcm0nICsgcmVzb3VyY2VfaWQgKyAnICcgKyB0aW1lX2ZpZWxkICsgJyBvcHRpb246c2VsZWN0ZWQnICk7XHRcdFx0Ly8gRXhjbHVkZSBjb25kaXRpb25hbCAgZmllbGRzLCAgYmVjYXVzZSBvZiB1c2luZyAnI2Jvb2tpbmdfZm9ybTMgLi4uJ1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRpbWVfb3B0aW9uID0galF1ZXJ5KCAnI2Jvb2tpbmdfZm9ybScgKyByZXNvdXJjZV9pZCArICcgJyArIHRpbWVfZmllbGQgKyAnIG9wdGlvbicgKTtcdFx0XHRcdC8vIEFsbCAgdGltZSBmaWVsZHNcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdC8vIExvb3AgYWxsIG9wdGlvbnMgaW4gdGltZSBmaWVsZFxyXG5cdFx0XHRmb3IgKCB2YXIgaiA9IDA7IGogPCB0aW1lX29wdGlvbi5sZW5ndGg7IGorKyApe1xyXG5cclxuXHRcdFx0XHR2YXIganF1ZXJ5X29wdGlvbiA9IGpRdWVyeSggdGltZV9vcHRpb25bIGogXSApO1x0XHQvLyBHZXQgb25seSAgc2VsZWN0ZWQgb3B0aW9ucyBcdC8valF1ZXJ5KCB0aW1lX2ZpZWxkICsgJyBvcHRpb246ZXEoJyArIGogKyAnKScgKTtcclxuXHRcdFx0XHR2YXIgdmFsdWVfb3B0aW9uX3NlY29uZHNfYXJyID0ganF1ZXJ5X29wdGlvbi52YWwoKS5zcGxpdCggJy0nICk7XHJcblx0XHRcdFx0dmFyIHRpbWVzX2FzX3NlY29uZHMgPSBbXTtcclxuXHJcblx0XHRcdFx0Ly8gR2V0IHRpbWUgYXMgc2Vjb25kc1xyXG5cdFx0XHRcdGZvciAoIHZhciBpIGluIHZhbHVlX29wdGlvbl9zZWNvbmRzX2FyciApe1xyXG5cclxuXHRcdFx0XHRcdC8vIHZhbHVlX29wdGlvbl9zZWNvbmRzX2FycltpXSA9ICcxNDowMCAnICB8ICcgMTY6MDAnICAgKGlmIGZyb20gJ3JhbmdldGltZScpIGFuZCAnMTY6MDAnICBpZiAoc3RhcnQvZW5kIHRpbWUpXHJcblxyXG5cdFx0XHRcdFx0dmFyIHN0YXJ0X2VuZF90aW1lc19hcnIgPSB2YWx1ZV9vcHRpb25fc2Vjb25kc19hcnJbIGkgXS50cmltKCkuc3BsaXQoICc6JyApO1xyXG5cclxuXHRcdFx0XHRcdHZhciB0aW1lX2luX3NlY29uZHMgPSBwYXJzZUludCggc3RhcnRfZW5kX3RpbWVzX2FyclsgMCBdICkgKiA2MCAqIDYwICsgcGFyc2VJbnQoIHN0YXJ0X2VuZF90aW1lc19hcnJbIDEgXSApICogNjA7XHJcblxyXG5cdFx0XHRcdFx0dGltZXNfYXNfc2Vjb25kcy5wdXNoKCB0aW1lX2luX3NlY29uZHMgKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRpbWVfZmllbGRzX29ial9hcnIucHVzaCgge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J25hbWUnICAgICAgICAgICAgOiBqUXVlcnkoICcjYm9va2luZ19mb3JtJyArIHJlc291cmNlX2lkICsgJyAnICsgdGltZV9maWVsZCApLmF0dHIoICduYW1lJyApLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J3ZhbHVlX29wdGlvbl8yNGgnOiBqcXVlcnlfb3B0aW9uLnZhbCgpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2pxdWVyeV9vcHRpb24nICAgOiBqcXVlcnlfb3B0aW9uLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J3RpbWVzX2FzX3NlY29uZHMnOiB0aW1lc19hc19zZWNvbmRzXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSApO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVGV4dDogICBbc3RhcnR0aW1lXSAtIFtlbmR0aW1lXSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHRcdHZhciB0ZXh0X3RpbWVfZmllbGRzX2Fycj1bXHJcblx0XHRcdFx0XHRcdFx0XHRcdCdpbnB1dFtuYW1lPVwic3RhcnR0aW1lJyArIHJlc291cmNlX2lkICsgJ1wiXScsXHJcblx0XHRcdFx0XHRcdFx0XHRcdCdpbnB1dFtuYW1lPVwiZW5kdGltZScgKyByZXNvdXJjZV9pZCArICdcIl0nLFxyXG5cdFx0XHRcdFx0XHRcdFx0XTtcclxuXHRcdGZvciAoIHZhciB0Zj0gMDsgdGYgPCB0ZXh0X3RpbWVfZmllbGRzX2Fyci5sZW5ndGg7IHRmKysgKXtcclxuXHJcblx0XHRcdHZhciB0ZXh0X2pxdWVyeSA9IGpRdWVyeSggJyNib29raW5nX2Zvcm0nICsgcmVzb3VyY2VfaWQgKyAnICcgKyB0ZXh0X3RpbWVfZmllbGRzX2FyclsgdGYgXSApO1x0XHRcdFx0XHRcdFx0XHQvLyBFeGNsdWRlIGNvbmRpdGlvbmFsICBmaWVsZHMsICBiZWNhdXNlIG9mIHVzaW5nICcjYm9va2luZ19mb3JtMyAuLi4nXHJcblx0XHRcdGlmICggdGV4dF9qcXVlcnkubGVuZ3RoID4gMCApe1xyXG5cclxuXHRcdFx0XHR2YXIgdGltZV9faF9tX19hcnIgPSB0ZXh0X2pxdWVyeS52YWwoKS50cmltKCkuc3BsaXQoICc6JyApO1x0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyAnMTQ6MDAnXHJcblx0XHRcdFx0aWYgKCAwID09IHRpbWVfX2hfbV9fYXJyLmxlbmd0aCApe1xyXG5cdFx0XHRcdFx0Y29udGludWU7XHRcdFx0XHRcdFx0XHRcdFx0Ly8gTm90IGVudGVyZWQgdGltZSB2YWx1ZSBpbiBhIGZpZWxkXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICggMSA9PSB0aW1lX19oX21fX2Fyci5sZW5ndGggKXtcclxuXHRcdFx0XHRcdGlmICggJycgPT09IHRpbWVfX2hfbV9fYXJyWyAwIF0gKXtcclxuXHRcdFx0XHRcdFx0Y29udGludWU7XHRcdFx0XHRcdFx0XHRcdC8vIE5vdCBlbnRlcmVkIHRpbWUgdmFsdWUgaW4gYSBmaWVsZFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dGltZV9faF9tX19hcnJbIDEgXSA9IDA7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHZhciB0ZXh0X3RpbWVfaW5fc2Vjb25kcyA9IHBhcnNlSW50KCB0aW1lX19oX21fX2FyclsgMCBdICkgKiA2MCAqIDYwICsgcGFyc2VJbnQoIHRpbWVfX2hfbV9fYXJyWyAxIF0gKSAqIDYwO1xyXG5cclxuXHRcdFx0XHR2YXIgdGV4dF90aW1lc19hc19zZWNvbmRzID0gW107XHJcblx0XHRcdFx0dGV4dF90aW1lc19hc19zZWNvbmRzLnB1c2goIHRleHRfdGltZV9pbl9zZWNvbmRzICk7XHJcblxyXG5cdFx0XHRcdHRpbWVfZmllbGRzX29ial9hcnIucHVzaCgge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J25hbWUnICAgICAgICAgICAgOiB0ZXh0X2pxdWVyeS5hdHRyKCAnbmFtZScgKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCd2YWx1ZV9vcHRpb25fMjRoJzogdGV4dF9qcXVlcnkudmFsKCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnanF1ZXJ5X29wdGlvbicgICA6IHRleHRfanF1ZXJ5LFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J3RpbWVzX2FzX3NlY29uZHMnOiB0ZXh0X3RpbWVzX2FzX3NlY29uZHNcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9ICk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGltZV9maWVsZHNfb2JqX2FycjtcclxuXHR9XHJcblxyXG5cclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBTIFUgUCBQIE8gUiBUICAgIGZvciAgICBDIEEgTCBFIE4gRCBBIFJcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCBDYWxlbmRhciBkYXRlcGljayAgSW5zdGFuY2VcclxuXHQgKiBAcGFyYW0gcmVzb3VyY2VfaWQgIG9mIGJvb2tpbmcgcmVzb3VyY2VcclxuXHQgKiBAcmV0dXJucyB7KnxudWxsfVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdwYmNfY2FsZW5kYXJfX2dldF9pbnN0KCByZXNvdXJjZV9pZCApe1xyXG5cclxuXHRcdGlmICggJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiAocmVzb3VyY2VfaWQpICl7XHJcblx0XHRcdHJlc291cmNlX2lkID0gJzEnO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggalF1ZXJ5KCAnI2NhbGVuZGFyX2Jvb2tpbmcnICsgcmVzb3VyY2VfaWQgKS5sZW5ndGggPiAwICl7XHJcblx0XHRcdHJldHVybiBqUXVlcnkuZGF0ZXBpY2suX2dldEluc3QoIGpRdWVyeSggJyNjYWxlbmRhcl9ib29raW5nJyArIHJlc291cmNlX2lkICkuZ2V0KCAwICkgKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVuc2VsZWN0ICBhbGwgZGF0ZXMgaW4gY2FsZW5kYXIgYW5kIHZpc3VhbGx5IHVwZGF0ZSB0aGlzIGNhbGVuZGFyXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcmVzb3VyY2VfaWRcdFx0SUQgb2YgYm9va2luZyByZXNvdXJjZVxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVx0XHR0cnVlIG9uIHN1Y2Nlc3MgfCBmYWxzZSwgIGlmIG5vIHN1Y2ggIGNhbGVuZGFyXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gd3BiY19jYWxlbmRhcl9fdW5zZWxlY3RfYWxsX2RhdGVzKCByZXNvdXJjZV9pZCApe1xyXG5cclxuXHRcdGlmICggJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiAocmVzb3VyY2VfaWQpICl7XHJcblx0XHRcdHJlc291cmNlX2lkID0gJzEnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBpbnN0ID0gd3BiY19jYWxlbmRhcl9fZ2V0X2luc3QoIHJlc291cmNlX2lkIClcclxuXHJcblx0XHRpZiAoIG51bGwgIT09IGluc3QgKXtcclxuXHJcblx0XHRcdC8vIFVuc2VsZWN0IGFsbCBkYXRlcyBhbmQgc2V0ICBwcm9wZXJ0aWVzIG9mIERhdGVwaWNrXHJcblx0XHRcdGpRdWVyeSggJyNkYXRlX2Jvb2tpbmcnICsgcmVzb3VyY2VfaWQgKS52YWwoICcnICk7ICAgICAgLy9GaXhJbjogNS40LjNcclxuXHRcdFx0aW5zdC5zdGF5T3BlbiA9IGZhbHNlO1xyXG5cdFx0XHRpbnN0LmRhdGVzID0gW107XHJcblx0XHRcdGpRdWVyeS5kYXRlcGljay5fdXBkYXRlRGF0ZXBpY2soIGluc3QgKTtcclxuXHJcblx0XHRcdHJldHVybiB0cnVlXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENsZWFyIGRheXMgaGlnaGxpZ2h0aW5nIGluIEFsbCBvciBzcGVjaWZpYyBDYWxlbmRhcnNcclxuXHQgKlxyXG4gICAgICogQHBhcmFtIHJlc291cmNlX2lkICAtIGNhbiBiZSBza2lwZWQgdG8gIGNsZWFyIGhpZ2hsaWdodGluZyBpbiBhbGwgY2FsZW5kYXJzXHJcbiAgICAgKi9cclxuXHRmdW5jdGlvbiB3cGJjX2NhbGVuZGFyc19fY2xlYXJfZGF5c19oaWdobGlnaHRpbmcoIHJlc291cmNlX2lkICl7XHJcblxyXG5cdFx0aWYgKCAndW5kZWZpbmVkJyAhPT0gdHlwZW9mICggcmVzb3VyY2VfaWQgKSApe1xyXG5cclxuXHRcdFx0alF1ZXJ5KCAnI2NhbGVuZGFyX2Jvb2tpbmcnICsgcmVzb3VyY2VfaWQgKyAnIC5kYXRlcGljay1kYXlzLWNlbGwtb3ZlcicgKS5yZW1vdmVDbGFzcyggJ2RhdGVwaWNrLWRheXMtY2VsbC1vdmVyJyApO1x0XHQvLyBDbGVhciBpbiBzcGVjaWZpYyBjYWxlbmRhclxyXG5cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGpRdWVyeSggJy5kYXRlcGljay1kYXlzLWNlbGwtb3ZlcicgKS5yZW1vdmVDbGFzcyggJ2RhdGVwaWNrLWRheXMtY2VsbC1vdmVyJyApO1x0XHRcdFx0XHRcdFx0XHQvLyBDbGVhciBpbiBhbGwgY2FsZW5kYXJzXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTY3JvbGwgdG8gc3BlY2lmaWMgbW9udGggaW4gY2FsZW5kYXJcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSByZXNvdXJjZV9pZFx0XHRJRCBvZiByZXNvdXJjZVxyXG5cdCAqIEBwYXJhbSB5ZWFyXHRcdFx0XHQtIHJlYWwgeWVhciAgLSAyMDIzXHJcblx0ICogQHBhcmFtIG1vbnRoXHRcdFx0XHQtIHJlYWwgbW9udGggLSAxMlxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdwYmNfY2FsZW5kYXJfX3Njcm9sbF90byggcmVzb3VyY2VfaWQsIHllYXIsIG1vbnRoICl7XHJcblxyXG5cdFx0aWYgKCAndW5kZWZpbmVkJyA9PT0gdHlwZW9mIChyZXNvdXJjZV9pZCkgKXsgcmVzb3VyY2VfaWQgPSAnMSc7IH1cclxuXHRcdHZhciBpbnN0ID0gd3BiY19jYWxlbmRhcl9fZ2V0X2luc3QoIHJlc291cmNlX2lkIClcclxuXHRcdGlmICggbnVsbCAhPT0gaW5zdCApe1xyXG5cclxuXHRcdFx0eWVhciAgPSBwYXJzZUludCggeWVhciApO1xyXG5cdFx0XHRtb250aCA9IHBhcnNlSW50KCBtb250aCApIC0gMTtcdFx0Ly8gSW4gSlMgZGF0ZSwgIG1vbnRoIC0xXHJcblxyXG5cdFx0XHRpbnN0LmN1cnNvckRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cdFx0XHQvLyBJbiBzb21lIGNhc2VzLCAgdGhlIHNldEZ1bGxZZWFyIGNhbiAgc2V0ICBvbmx5IFllYXIsICBhbmQgbm90IHRoZSBNb250aCBhbmQgZGF5ICAgICAgLy9GaXhJbjo2LjIuMy41XHJcblx0XHRcdGluc3QuY3Vyc29yRGF0ZS5zZXRGdWxsWWVhciggeWVhciwgbW9udGgsIDEgKTtcclxuXHRcdFx0aW5zdC5jdXJzb3JEYXRlLnNldE1vbnRoKCBtb250aCApO1xyXG5cdFx0XHRpbnN0LmN1cnNvckRhdGUuc2V0RGF0ZSggMSApO1xyXG5cclxuXHRcdFx0aW5zdC5kcmF3TW9udGggPSBpbnN0LmN1cnNvckRhdGUuZ2V0TW9udGgoKTtcclxuXHRcdFx0aW5zdC5kcmF3WWVhciA9IGluc3QuY3Vyc29yRGF0ZS5nZXRGdWxsWWVhcigpO1xyXG5cclxuXHRcdFx0alF1ZXJ5LmRhdGVwaWNrLl9ub3RpZnlDaGFuZ2UoIGluc3QgKTtcclxuXHRcdFx0alF1ZXJ5LmRhdGVwaWNrLl9hZGp1c3RJbnN0RGF0ZSggaW5zdCApO1xyXG5cdFx0XHRqUXVlcnkuZGF0ZXBpY2suX3Nob3dEYXRlKCBpbnN0ICk7XHJcblx0XHRcdGpRdWVyeS5kYXRlcGljay5fdXBkYXRlRGF0ZXBpY2soIGluc3QgKTtcclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSXMgdGhpcyBkYXRlIHNlbGVjdGFibGUgaW4gY2FsZW5kYXIgKG1haW5seSBpdCdzIG1lYW5zIEFWQUlMQUJMRSBkYXRlKVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtpbnR8c3RyaW5nfSByZXNvdXJjZV9pZFx0XHQxXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHNxbF9jbGFzc19kYXlcdFx0JzIwMjMtMDgtMTEnXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHRcdFx0XHRcdHRydWUgfCBmYWxzZVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdwYmNfaXNfdGhpc19kYXlfc2VsZWN0YWJsZSggcmVzb3VyY2VfaWQsIHNxbF9jbGFzc19kYXkgKXtcclxuXHJcblx0XHQvLyBHZXQgRGF0YSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0dmFyIGRhdGVfYm9va2luZ3Nfb2JqID0gX3dwYmMuYm9va2luZ3NfaW5fY2FsZW5kYXJfX2dldF9mb3JfZGF0ZSggcmVzb3VyY2VfaWQsIHNxbF9jbGFzc19kYXkgKTtcclxuXHJcblx0XHR2YXIgaXNfZGF5X3NlbGVjdGFibGUgPSAoIHBhcnNlSW50KCBkYXRlX2Jvb2tpbmdzX29ialsgJ2RheV9hdmFpbGFiaWxpdHknIF0gKSA+IDAgKTtcclxuXHJcblx0XHRpZiAoICdhdmFpbGFibGUnICE9IGRhdGVfYm9va2luZ3Nfb2JqWyAnc3VtbWFyeSddWydzdGF0dXNfZm9yX2RheScgXSApe1xyXG5cclxuXHRcdFx0dmFyIGlzX3NldF9wZW5kaW5nX2RheXNfc2VsZWN0YWJsZSA9IF93cGJjLmNhbGVuZGFyX19nZXRfcGFyYW1fdmFsdWUoIHJlc291cmNlX2lkLCAncGVuZGluZ19kYXlzX3NlbGVjdGFibGUnICk7XHRcdC8vIHNldCBwZW5kaW5nIGRheXMgc2VsZWN0YWJsZSAgICAgICAgICAvL0ZpeEluOiA4LjYuMS4xOFxyXG5cclxuXHRcdFx0c3dpdGNoICggZGF0ZV9ib29raW5nc19vYmpbICdzdW1tYXJ5J11bJ3N0YXR1c19mb3JfYm9va2luZ3MnIF0gKXtcclxuXHRcdFx0XHRjYXNlICdwZW5kaW5nJzpcclxuXHRcdFx0XHQvLyBTaXR1YXRpb25zIGZvciBcImNoYW5nZS1vdmVyXCIgZGF5czpcclxuXHRcdFx0XHRjYXNlICdwZW5kaW5nX3BlbmRpbmcnOlxyXG5cdFx0XHRcdGNhc2UgJ3BlbmRpbmdfYXBwcm92ZWQnOlxyXG5cdFx0XHRcdGNhc2UgJ2FwcHJvdmVkX3BlbmRpbmcnOlxyXG5cdFx0XHRcdFx0aXNfZGF5X3NlbGVjdGFibGUgPSAoaXNfZGF5X3NlbGVjdGFibGUpID8gdHJ1ZSA6IGlzX3NldF9wZW5kaW5nX2RheXNfc2VsZWN0YWJsZTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaXNfZGF5X3NlbGVjdGFibGU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJcyBkYXRlIHRvIGNoZWNrIElOIGFycmF5IG9mIHNlbGVjdGVkIGRhdGVzXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge2RhdGV9anNfZGF0ZV90b19jaGVja1x0XHQtIEpTIERhdGVcdFx0XHQtIHNpbXBsZSAgSmF2YVNjcmlwdCBEYXRlIG9iamVjdFxyXG5cdCAqIEBwYXJhbSB7W119IGpzX2RhdGVzX2Fyclx0XHRcdC0gWyBKU0RhdGUsIC4uLiBdICAgLSBhcnJheSAgb2YgSlMgZGF0ZXNcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRmdW5jdGlvbiB3cGJjX2lzX3RoaXNfZGF5X2Ftb25nX3NlbGVjdGVkX2RheXMoIGpzX2RhdGVfdG9fY2hlY2ssIGpzX2RhdGVzX2FyciApe1xyXG5cclxuXHRcdGZvciAoIHZhciBkYXRlX2luZGV4ID0gMDsgZGF0ZV9pbmRleCA8IGpzX2RhdGVzX2Fyci5sZW5ndGggOyBkYXRlX2luZGV4KysgKXsgICAgIFx0XHRcdFx0XHRcdFx0XHRcdC8vRml4SW46IDguNC41LjE2XHJcblx0XHRcdGlmICggKCBqc19kYXRlc19hcnJbIGRhdGVfaW5kZXggXS5nZXRGdWxsWWVhcigpID09PSBqc19kYXRlX3RvX2NoZWNrLmdldEZ1bGxZZWFyKCkgKSAmJlxyXG5cdFx0XHRcdCAoIGpzX2RhdGVzX2FyclsgZGF0ZV9pbmRleCBdLmdldE1vbnRoKCkgPT09IGpzX2RhdGVfdG9fY2hlY2suZ2V0TW9udGgoKSApICYmXHJcblx0XHRcdFx0ICgganNfZGF0ZXNfYXJyWyBkYXRlX2luZGV4IF0uZ2V0RGF0ZSgpID09PSBqc19kYXRlX3RvX2NoZWNrLmdldERhdGUoKSApICkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IFNRTCBDbGFzcyBEYXRlICcyMDIzLTA4LTAxJyBmcm9tICBKUyBEYXRlXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZGF0ZVx0XHRcdFx0SlMgRGF0ZVxyXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XHRcdCcyMDIzLTA4LTEyJ1xyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdwYmNfX2dldF9fc3FsX2NsYXNzX2RhdGUoIGRhdGUgKXtcclxuXHJcblx0XHR2YXIgc3FsX2NsYXNzX2RheSA9IGRhdGUuZ2V0RnVsbFllYXIoKSArICctJztcclxuXHRcdFx0c3FsX2NsYXNzX2RheSArPSAoICggZGF0ZS5nZXRNb250aCgpICsgMSApIDwgMTAgKSA/ICcwJyA6ICcnO1xyXG5cdFx0XHRzcWxfY2xhc3NfZGF5ICs9ICggZGF0ZS5nZXRNb250aCgpICsgMSApICsgJy0nXHJcblx0XHRcdHNxbF9jbGFzc19kYXkgKz0gKCBkYXRlLmdldERhdGUoKSA8IDEwICkgPyAnMCcgOiAnJztcclxuXHRcdFx0c3FsX2NsYXNzX2RheSArPSBkYXRlLmdldERhdGUoKTtcclxuXHJcblx0XHRcdHJldHVybiBzcWxfY2xhc3NfZGF5O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IFREIENsYXNzIERhdGUgJzEtMzEtMjAyMycgZnJvbSAgSlMgRGF0ZVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGRhdGVcdFx0XHRcdEpTIERhdGVcclxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVx0XHQnMS0zMS0yMDIzJ1xyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdwYmNfX2dldF9fdGRfY2xhc3NfZGF0ZSggZGF0ZSApe1xyXG5cclxuXHRcdHZhciB0ZF9jbGFzc19kYXkgPSAoZGF0ZS5nZXRNb250aCgpICsgMSkgKyAnLScgKyBkYXRlLmdldERhdGUoKSArICctJyArIGRhdGUuZ2V0RnVsbFllYXIoKTtcdFx0XHRcdFx0XHRcdFx0Ly8gJzEtOS0yMDIzJ1xyXG5cclxuXHRcdHJldHVybiB0ZF9jbGFzc19kYXk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgZGF0ZSBwYXJhbXMgZnJvbSAgc3RyaW5nIGRhdGVcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBkYXRlXHRcdFx0c3RyaW5nIGRhdGUgbGlrZSAnMzEuNS4yMDIzJ1xyXG5cdCAqIEBwYXJhbSBzZXBhcmF0b3JcdFx0ZGVmYXVsdCAnLicgIGNhbiBiZSBza2lwcGVkLlxyXG5cdCAqIEByZXR1cm5zIHsgIHtkYXRlOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcn0gIH1cclxuXHQgKi9cclxuXHRmdW5jdGlvbiB3cGJjX19nZXRfX2RhdGVfcGFyYW1zX19mcm9tX3N0cmluZ19kYXRlKCBkYXRlICwgc2VwYXJhdG9yKXtcclxuXHJcblx0XHRzZXBhcmF0b3IgPSAoICd1bmRlZmluZWQnICE9PSB0eXBlb2YgKHNlcGFyYXRvcikgKSA/IHNlcGFyYXRvciA6ICcuJztcclxuXHJcblx0XHR2YXIgZGF0ZV9hcnIgPSBkYXRlLnNwbGl0KCBzZXBhcmF0b3IgKTtcclxuXHRcdHZhciBkYXRlX29iaiA9IHtcclxuXHRcdFx0J3llYXInIDogIHBhcnNlSW50KCBkYXRlX2FyclsgMiBdICksXHJcblx0XHRcdCdtb250aCc6IChwYXJzZUludCggZGF0ZV9hcnJbIDEgXSApIC0gMSksXHJcblx0XHRcdCdkYXRlJyA6ICBwYXJzZUludCggZGF0ZV9hcnJbIDAgXSApXHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIGRhdGVfb2JqO1x0XHQvLyBmb3IgXHRcdCA9IG5ldyBEYXRlKCBkYXRlX29iai55ZWFyICwgZGF0ZV9vYmoubW9udGggLCBkYXRlX29iai5kYXRlICk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgU3BpbiBMb2FkZXIgdG8gIGNhbGVuZGFyXHJcblx0ICogQHBhcmFtIHJlc291cmNlX2lkXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gd3BiY19jYWxlbmRhcl9fbG9hZGluZ19fc3RhcnQoIHJlc291cmNlX2lkICl7XHJcblx0XHRqUXVlcnkoICcjY2FsZW5kYXJfYm9va2luZycgKyByZXNvdXJjZV9pZCApLmFmdGVyKCAnPGRpdiBjbGFzcz1cIndwYmNfc3BpbnNfbG9hZGVyX3dyYXBwZXJcIj48ZGl2IGNsYXNzPVwid3BiY19zcGluc19sb2FkZXJcIj48L2Rpdj48L2Rpdj4nICk7XHJcblx0XHRqUXVlcnkoICcjY2FsZW5kYXJfYm9va2luZycgKyByZXNvdXJjZV9pZCApLmFkZENsYXNzKCAnd3BiY19jYWxlbmRhcl9ibHVyJyApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlIFNwaW4gTG9hZGVyIHRvICBjYWxlbmRhclxyXG5cdCAqIEBwYXJhbSByZXNvdXJjZV9pZFxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdwYmNfY2FsZW5kYXJfX2xvYWRpbmdfX3N0b3AoIHJlc291cmNlX2lkICl7XHJcblx0XHRqUXVlcnkoICcjY2FsZW5kYXJfYm9va2luZycgKyByZXNvdXJjZV9pZCArICcgKyAud3BiY19zcGluc19sb2FkZXJfd3JhcHBlcicgKS5yZW1vdmUoKTtcclxuXHRcdGpRdWVyeSggJyNjYWxlbmRhcl9ib29raW5nJyArIHJlc291cmNlX2lkICkucmVtb3ZlQ2xhc3MoICd3cGJjX2NhbGVuZGFyX2JsdXInICk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGUgTG9vayAgb2YgY2FsZW5kYXJcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSByZXNvdXJjZV9pZFxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdwYmNfY2FsZW5kYXJfX3VwZGF0ZV9sb29rKCByZXNvdXJjZV9pZCApe1xyXG5cclxuXHRcdHZhciBpbnN0ID0gd3BiY19jYWxlbmRhcl9fZ2V0X2luc3QoIHJlc291cmNlX2lkICk7XHJcblxyXG5cdFx0alF1ZXJ5LmRhdGVwaWNrLl91cGRhdGVEYXRlcGljayggaW5zdCApO1xyXG5cdH1cclxuXHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gUyBVIFAgUCBPIFIgVCAgICBNIEEgVCBIXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogTWVyZ2Ugc2V2ZXJhbCAgaW50ZXJzZWN0ZWQgaW50ZXJ2YWxzIG9yIHJldHVybiBub3QgaW50ZXJzZWN0ZWQ6ICAgICAgICAgICAgICAgICAgICAgICAgW1sxLDNdLFsyLDZdLFs4LDEwXSxbMTUsMThdXSAgLT4gICBbWzEsNl0sWzgsMTBdLFsxNSwxOF1dXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIFtdIGludGVydmFsc1x0XHRcdCBbIFsxLDNdLFsyLDRdLFs2LDhdLFs5LDEwXSxbMyw3XSBdXHJcblx0XHQgKiBAcmV0dXJucyBbXVx0XHRcdFx0XHQgWyBbMSw4XSxbOSwxMF0gXVxyXG5cdFx0ICpcclxuXHRcdCAqIEV4bWFtcGxlOiB3cGJjX2ludGVydmFsc19fbWVyZ2VfaW5lcnNlY3RlZCggIFsgWzEsM10sWzIsNF0sWzYsOF0sWzksMTBdLFszLDddIF0gICk7XHJcblx0XHQgKi9cclxuXHRcdGZ1bmN0aW9uIHdwYmNfaW50ZXJ2YWxzX19tZXJnZV9pbmVyc2VjdGVkKCBpbnRlcnZhbHMgKXtcclxuXHJcblx0XHRcdGlmICggISBpbnRlcnZhbHMgfHwgaW50ZXJ2YWxzLmxlbmd0aCA9PT0gMCApe1xyXG5cdFx0XHRcdHJldHVybiBbXTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIG1lcmdlZCA9IFtdO1xyXG5cdFx0XHRpbnRlcnZhbHMuc29ydCggZnVuY3Rpb24gKCBhLCBiICl7XHJcblx0XHRcdFx0cmV0dXJuIGFbIDAgXSAtIGJbIDAgXTtcclxuXHRcdFx0fSApO1xyXG5cclxuXHRcdFx0dmFyIG1lcmdlZEludGVydmFsID0gaW50ZXJ2YWxzWyAwIF07XHJcblxyXG5cdFx0XHRmb3IgKCB2YXIgaSA9IDE7IGkgPCBpbnRlcnZhbHMubGVuZ3RoOyBpKysgKXtcclxuXHRcdFx0XHR2YXIgaW50ZXJ2YWwgPSBpbnRlcnZhbHNbIGkgXTtcclxuXHJcblx0XHRcdFx0aWYgKCBpbnRlcnZhbFsgMCBdIDw9IG1lcmdlZEludGVydmFsWyAxIF0gKXtcclxuXHRcdFx0XHRcdG1lcmdlZEludGVydmFsWyAxIF0gPSBNYXRoLm1heCggbWVyZ2VkSW50ZXJ2YWxbIDEgXSwgaW50ZXJ2YWxbIDEgXSApO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRtZXJnZWQucHVzaCggbWVyZ2VkSW50ZXJ2YWwgKTtcclxuXHRcdFx0XHRcdG1lcmdlZEludGVydmFsID0gaW50ZXJ2YWw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRtZXJnZWQucHVzaCggbWVyZ2VkSW50ZXJ2YWwgKTtcclxuXHRcdFx0cmV0dXJuIG1lcmdlZDtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJcyAyIGludGVydmFscyBpbnRlcnNlY3RlZDogICAgICAgWzM2MDExLCA4NjM5Ml0gICAgPD0+ICAgIFsxLCA0MzE5Ml0gID0+ICB0cnVlICAgICAgKCBpbnRlcnNlY3RlZCApXHJcblx0XHQgKlxyXG5cdFx0ICogR29vZCBleHBsYW5hdGlvbiAgaGVyZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMjY5NDM0L3doYXRzLXRoZS1tb3N0LWVmZmljaWVudC13YXktdG8tdGVzdC1pZi10d28tcmFuZ2VzLW92ZXJsYXBcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gYXJyYXkgIGludGVydmFsX0EgICBbIDM2MDExLCA4NjM5MiBdXHJcblx0XHQgKiBAcGFyYW0gYXJyYXkgIGludGVydmFsX0IgICBbICAgICAxLCA0MzE5MiBdXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiBib29sXHJcblx0XHQgKi9cclxuXHRcdGZ1bmN0aW9uIHdwYmNfaW50ZXJ2YWxzX19pc19pbnRlcnNlY3RlZCggaW50ZXJ2YWxfQSwgaW50ZXJ2YWxfQiApIHtcclxuXHJcblx0XHRcdGlmIChcclxuXHRcdFx0XHRcdCggMCA9PSBpbnRlcnZhbF9BLmxlbmd0aCApXHJcblx0XHRcdFx0IHx8ICggMCA9PSBpbnRlcnZhbF9CLmxlbmd0aCApXHJcblx0XHRcdCl7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpbnRlcnZhbF9BWyAwIF0gPSBwYXJzZUludCggaW50ZXJ2YWxfQVsgMCBdICk7XHJcblx0XHRcdGludGVydmFsX0FbIDEgXSA9IHBhcnNlSW50KCBpbnRlcnZhbF9BWyAxIF0gKTtcclxuXHRcdFx0aW50ZXJ2YWxfQlsgMCBdID0gcGFyc2VJbnQoIGludGVydmFsX0JbIDAgXSApO1xyXG5cdFx0XHRpbnRlcnZhbF9CWyAxIF0gPSBwYXJzZUludCggaW50ZXJ2YWxfQlsgMSBdICk7XHJcblxyXG5cdFx0XHR2YXIgaXNfaW50ZXJzZWN0ZWQgPSBNYXRoLm1heCggaW50ZXJ2YWxfQVsgMCBdLCBpbnRlcnZhbF9CWyAwIF0gKSAtIE1hdGgubWluKCBpbnRlcnZhbF9BWyAxIF0sIGludGVydmFsX0JbIDEgXSApO1xyXG5cclxuXHRcdFx0Ly8gaWYgKCAwID09IGlzX2ludGVyc2VjdGVkICkge1xyXG5cdFx0XHQvL1x0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VjaCByYW5nZXMgZ29pbmcgb25lIGFmdGVyIG90aGVyLCBlLmcuOiBbIDEyLCAxNSBdIGFuZCBbIDE1LCAyMSBdXHJcblx0XHRcdC8vIH1cclxuXHJcblx0XHRcdGlmICggaXNfaW50ZXJzZWN0ZWQgPCAwICkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlOyAgICAgICAgICAgICAgICAgICAgIC8vIElOVEVSU0VDVEVEXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBmYWxzZTsgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vdCBpbnRlcnNlY3RlZFxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldCB0aGUgY2xvc2V0cyBBQlMgdmFsdWUgb2YgZWxlbWVudCBpbiBhcnJheSB0byB0aGUgY3VycmVudCBteVZhbHVlXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIG15VmFsdWUgXHQtIGludCBlbGVtZW50IHRvIHNlYXJjaCBjbG9zZXQgXHRcdFx0NFxyXG5cdFx0ICogQHBhcmFtIG15QXJyYXlcdC0gYXJyYXkgb2YgZWxlbWVudHMgd2hlcmUgdG8gc2VhcmNoIFx0WzUsOCwxLDddXHJcblx0XHQgKiBAcmV0dXJucyBpbnRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ1XHJcblx0XHQgKi9cclxuXHRcdGZ1bmN0aW9uIHdwYmNfZ2V0X2Fic19jbG9zZXN0X3ZhbHVlX2luX2FyciggbXlWYWx1ZSwgbXlBcnJheSApe1xyXG5cclxuXHRcdFx0aWYgKCBteUFycmF5Lmxlbmd0aCA9PSAwICl7IFx0XHRcdFx0XHRcdFx0XHQvLyBJZiB0aGUgYXJyYXkgaXMgZW1wdHkgLT4gcmV0dXJuICB0aGUgbXlWYWx1ZVxyXG5cdFx0XHRcdHJldHVybiBteVZhbHVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgb2JqID0gbXlBcnJheVsgMCBdO1xyXG5cdFx0XHR2YXIgZGlmZiA9IE1hdGguYWJzKCBteVZhbHVlIC0gb2JqICk7ICAgICAgICAgICAgIFx0Ly8gR2V0IGRpc3RhbmNlIGJldHdlZW4gIDFzdCBlbGVtZW50XHJcblx0XHRcdHZhciBjbG9zZXRWYWx1ZSA9IG15QXJyYXlbIDAgXTsgICAgICAgICAgICAgICAgICAgXHRcdFx0Ly8gU2F2ZSAxc3QgZWxlbWVudFxyXG5cclxuXHRcdFx0Zm9yICggdmFyIGkgPSAxOyBpIDwgbXlBcnJheS5sZW5ndGg7IGkrKyApe1xyXG5cdFx0XHRcdG9iaiA9IG15QXJyYXlbIGkgXTtcclxuXHJcblx0XHRcdFx0aWYgKCBNYXRoLmFicyggbXlWYWx1ZSAtIG9iaiApIDwgZGlmZiApeyAgICAgXHRcdFx0Ly8gd2UgZm91bmQgY2xvc2VyIHZhbHVlIC0+IHNhdmUgaXRcclxuXHRcdFx0XHRcdGRpZmYgPSBNYXRoLmFicyggbXlWYWx1ZSAtIG9iaiApO1xyXG5cdFx0XHRcdFx0Y2xvc2V0VmFsdWUgPSBvYmo7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gY2xvc2V0VmFsdWU7XHJcblx0XHR9XHJcblxyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICBUIE8gTyBMIFQgSSBQIFNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZSB0b29sdGlwIHRvIHNob3csICB3aGVuICBtb3VzZSBvdmVyIERhdGUgaW4gQ2FsZW5kYXJcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAgdG9vbHRpcF90ZXh0XHRcdFx0LSBUZXh0IHRvIHNob3dcdFx0XHRcdCdCb29rZWQgdGltZTogMTI6MDAgLSAxMzowMDxicj5Db3N0OiAkMjAuMDAnXHJcblx0ICogQHBhcmFtICByZXNvdXJjZV9pZFx0XHRcdC0gSUQgb2YgYm9va2luZyByZXNvdXJjZVx0JzEnXHJcblx0ICogQHBhcmFtICB0ZF9jbGFzc1x0XHRcdFx0LSBTUUwgY2xhc3NcdFx0XHRcdFx0JzEtOS0yMDIzJ1xyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVx0XHRcdFx0XHQtIGRlZmluZWQgdG8gc2hvdyBvciBub3RcclxuXHQgKi9cclxuXHRmdW5jdGlvbiB3cGJjX3NldF90b29sdGlwX19fZm9yX19jYWxlbmRhcl9kYXRlKCB0b29sdGlwX3RleHQsIHJlc291cmNlX2lkLCB0ZF9jbGFzcyApe1xyXG5cclxuXHRcdC8vVE9ETzogbWFrZSBlc2NhcGluZyBvZiB0ZXh0IGZvciBxdW90IHN5bWJvbHMsICBhbmQgSlMvSFRNTC4uLlxyXG5cclxuXHRcdGpRdWVyeSggJyNjYWxlbmRhcl9ib29raW5nJyArIHJlc291cmNlX2lkICsgJyB0ZC5jYWw0ZGF0ZS0nICsgdGRfY2xhc3MgKS5hdHRyKCAnZGF0YS1jb250ZW50JywgdG9vbHRpcF90ZXh0ICk7XHJcblxyXG5cdFx0dmFyIHRkX2VsID0galF1ZXJ5KCAnI2NhbGVuZGFyX2Jvb2tpbmcnICsgcmVzb3VyY2VfaWQgKyAnIHRkLmNhbDRkYXRlLScgKyB0ZF9jbGFzcyApLmdldCggMCApO1x0XHRcdFx0XHQvL0ZpeEluOiA5LjAuMS4xXHJcblxyXG5cdFx0aWYgKFxyXG5cdFx0XHQgICAoICd1bmRlZmluZWQnICE9PSB0eXBlb2YodGRfZWwpIClcclxuXHRcdFx0JiYgKCB1bmRlZmluZWQgPT0gdGRfZWwuX3RpcHB5IClcclxuXHRcdFx0JiYgKCAnJyAhPT0gdG9vbHRpcF90ZXh0IClcclxuXHRcdCl7XHJcblxyXG5cdFx0XHR3cGJjX3RpcHB5KCB0ZF9lbCAsIHtcclxuXHRcdFx0XHRcdGNvbnRlbnQoIHJlZmVyZW5jZSApe1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIHBvcG92ZXJfY29udGVudCA9IHJlZmVyZW5jZS5nZXRBdHRyaWJ1dGUoICdkYXRhLWNvbnRlbnQnICk7XHJcblxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gJzxkaXYgY2xhc3M9XCJwb3BvdmVyIHBvcG92ZXJfdGlwcHlcIj4nXHJcblx0XHRcdFx0XHRcdFx0XHRcdCsgJzxkaXYgY2xhc3M9XCJwb3BvdmVyLWNvbnRlbnRcIj4nXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0KyBwb3BvdmVyX2NvbnRlbnRcclxuXHRcdFx0XHRcdFx0XHRcdFx0KyAnPC9kaXY+J1xyXG5cdFx0XHRcdFx0XHRcdCArICc8L2Rpdj4nO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGFsbG93SFRNTCAgICAgICAgOiB0cnVlLFxyXG5cdFx0XHRcdFx0dHJpZ2dlclx0XHRcdCA6ICdtb3VzZWVudGVyIGZvY3VzJyxcclxuXHRcdFx0XHRcdGludGVyYWN0aXZlICAgICAgOiBmYWxzZSxcclxuXHRcdFx0XHRcdGhpZGVPbkNsaWNrICAgICAgOiB0cnVlLFxyXG5cdFx0XHRcdFx0aW50ZXJhY3RpdmVCb3JkZXI6IDEwLFxyXG5cdFx0XHRcdFx0bWF4V2lkdGggICAgICAgICA6IDU1MCxcclxuXHRcdFx0XHRcdHRoZW1lICAgICAgICAgICAgOiAnd3BiYy10aXBweS10aW1lcycsXHJcblx0XHRcdFx0XHRwbGFjZW1lbnQgICAgICAgIDogJ3RvcCcsXHJcblx0XHRcdFx0XHRkZWxheVx0XHRcdCA6IFs0MDAsIDBdLFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vRml4SW46IDkuNC4yLjJcclxuXHRcdFx0XHRcdC8vZGVsYXlcdFx0XHQgOiBbMCwgOTk5OTk5OTk5OV0sXHRcdFx0XHRcdFx0Ly8gRGVidWdlICB0b29sdGlwXHJcblx0XHRcdFx0XHRpZ25vcmVBdHRyaWJ1dGVzIDogdHJ1ZSxcclxuXHRcdFx0XHRcdHRvdWNoXHRcdFx0IDogdHJ1ZSxcdFx0XHRcdFx0XHRcdFx0Ly9bJ2hvbGQnLCA1MDBdLCAvLyA1MDBtcyBkZWxheVx0XHRcdFx0Ly9GaXhJbjogOS4yLjEuNVxyXG5cdFx0XHRcdFx0YXBwZW5kVG86ICgpID0+IGRvY3VtZW50LmJvZHksXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuICB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAgZmFsc2U7XHJcblx0fVxyXG5cclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgQSBqIGEgeCAgICBMIG8gYSBkICAgIEMgYSBsIGUgbiBkIGEgciAgICBEIGEgdCBhXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuZnVuY3Rpb24gd3BiY19jYWxlbmRhcl9fbG9hZF9kYXRhX19hangoIHBhcmFtcyApe1xyXG5cclxuXHJcbmNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoICdXUEJDX0FKWF9DQUxFTkRBUl9MT0FEJyApOyBjb25zb2xlLmxvZyggJyA9PSBCZWZvcmUgQWpheCBTZW5kIC0gY2FsZW5kYXJzX2FsbF9fZ2V0KCkgPT0gJyAsIF93cGJjLmNhbGVuZGFyc19hbGxfX2dldCgpICk7XHJcblxyXG5cdHdwYmNfY2FsZW5kYXJfX2xvYWRpbmdfX3N0YXJ0KCBwYXJhbXNbJ3Jlc291cmNlX2lkJ10gKTtcclxuXHJcblx0Ly8gU3RhcnQgQWpheFxyXG5cdGpRdWVyeS5wb3N0KCB3cGJjX2dsb2JhbDEud3BiY19hamF4dXJsLFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGFjdGlvbiAgICAgICAgICA6ICdXUEJDX0FKWF9DQUxFTkRBUl9MT0FEJyxcclxuXHRcdFx0XHRcdHdwYmNfYWp4X3VzZXJfaWQ6IF93cGJjLmdldF9zZWN1cmVfcGFyYW0oICd1c2VyX2lkJyApLFxyXG5cdFx0XHRcdFx0bm9uY2UgICAgICAgICAgIDogX3dwYmMuZ2V0X3NlY3VyZV9wYXJhbSggJ25vbmNlJyApLFxyXG5cdFx0XHRcdFx0d3BiY19hanhfbG9jYWxlIDogX3dwYmMuZ2V0X3NlY3VyZV9wYXJhbSggJ2xvY2FsZScgKSxcclxuXHJcblx0XHRcdFx0XHRjYWxlbmRhcl9yZXF1ZXN0X3BhcmFtcyA6IHBhcmFtcyBcdFx0XHRcdFx0XHQvLyBVc3VhbGx5IGxpa2U6IHsgJ3Jlc291cmNlX2lkJzogMSwgJ21heF9kYXlzX2NvdW50JzogMzY1IH1cclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvKipcclxuXHRcdFx0XHQgKiBTIHUgYyBjIGUgcyBzXHJcblx0XHRcdFx0ICpcclxuXHRcdFx0XHQgKiBAcGFyYW0gcmVzcG9uc2VfZGF0YVx0XHQtXHRpdHMgb2JqZWN0IHJldHVybmVkIGZyb20gIEFqYXggLSBjbGFzcy1saXZlLXNlYXJjZy5waHBcclxuXHRcdFx0XHQgKiBAcGFyYW0gdGV4dFN0YXR1c1x0XHQtXHQnc3VjY2VzcydcclxuXHRcdFx0XHQgKiBAcGFyYW0ganFYSFJcdFx0XHRcdC1cdE9iamVjdFxyXG5cdFx0XHRcdCAqL1xyXG5cdFx0XHRcdGZ1bmN0aW9uICggcmVzcG9uc2VfZGF0YSwgdGV4dFN0YXR1cywganFYSFIgKSB7XHJcblxyXG5jb25zb2xlLmxvZyggJyA9PSBSZXNwb25zZSBXUEJDX0FKWF9DQUxFTkRBUl9MT0FEID09ICcsIHJlc3BvbnNlX2RhdGEgKTsgY29uc29sZS5ncm91cEVuZCgpO1xyXG5cclxuXHRcdFx0XHRcdC8vIFByb2JhYmx5IEVycm9yXHJcblx0XHRcdFx0XHRpZiAoICh0eXBlb2YgcmVzcG9uc2VfZGF0YSAhPT0gJ29iamVjdCcpIHx8IChyZXNwb25zZV9kYXRhID09PSBudWxsKSApe1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIGpxX25vZGUgID0gd3BiY19nZXRfY2FsZW5kYXJfX2pxX25vZGVfX2Zvcl9tZXNzYWdlcyggdGhpcy5kYXRhICk7XHJcblx0XHRcdFx0XHRcdHZhciBtZXNzYWdlX3R5cGUgPSAnaW5mbyc7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoICcnID09PSByZXNwb25zZV9kYXRhICl7XHJcblx0XHRcdFx0XHRcdFx0cmVzcG9uc2VfZGF0YSA9ICdUaGUgc2VydmVyIHJlc3BvbmRzIHdpdGggYW4gZW1wdHkgc3RyaW5nLiBUaGUgc2VydmVyIHByb2JhYmx5IHN0b3BwZWQgd29ya2luZyB1bmV4cGVjdGVkbHkuIDxicj5QbGVhc2UgY2hlY2sgeW91ciA8c3Ryb25nPmVycm9yLmxvZzwvc3Ryb25nPiBpbiB5b3VyIHNlcnZlciBjb25maWd1cmF0aW9uIGZvciByZWxhdGl2ZSBlcnJvcnMuJztcclxuXHRcdFx0XHRcdFx0XHRtZXNzYWdlX3R5cGUgPSAnd2FybmluZyc7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdC8vIFNob3cgTWVzc2FnZVxyXG5cdFx0XHRcdFx0XHR3cGJjX2Zyb250X2VuZF9fc2hvd19tZXNzYWdlKCByZXNwb25zZV9kYXRhICwgeyAndHlwZScgICAgIDogbWVzc2FnZV90eXBlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnc2hvd19oZXJlJzogeydqcV9ub2RlJzoganFfbm9kZSwgJ3doZXJlJzogJ2FmdGVyJ30sXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdpc19hcHBlbmQnOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnc3R5bGUnICAgIDogJ3RleHQtYWxpZ246bGVmdDsnLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnZGVsYXknICAgIDogMFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSApO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gU2hvdyBDYWxlbmRhclxyXG5cdFx0XHRcdFx0d3BiY19jYWxlbmRhcl9fbG9hZGluZ19fc3RvcCggcmVzcG9uc2VfZGF0YVsgJ3Jlc291cmNlX2lkJyBdICk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHRcdFx0Ly8gQm9va2luZ3MgLSBEYXRlc1xyXG5cdFx0XHRcdFx0X3dwYmMuYm9va2luZ3NfaW5fY2FsZW5kYXJfX3NldF9kYXRlcyggIHJlc3BvbnNlX2RhdGFbICdyZXNvdXJjZV9pZCcgXSwgcmVzcG9uc2VfZGF0YVsgJ2FqeF9kYXRhJyBdWydkYXRlcyddICApO1xyXG5cclxuXHRcdFx0XHRcdC8vIEJvb2tpbmdzIC0gQ2hpbGQgb3Igb25seSBzaW5nbGUgYm9va2luZyByZXNvdXJjZSBpbiBkYXRlc1xyXG5cdFx0XHRcdFx0X3dwYmMuYm9va2luZ19fc2V0X3BhcmFtX3ZhbHVlKCByZXNwb25zZV9kYXRhWyAncmVzb3VyY2VfaWQnIF0sICdyZXNvdXJjZXNfaWRfYXJyX19pbl9kYXRlcycsIHJlc3BvbnNlX2RhdGFbICdhanhfZGF0YScgXVsgJ3Jlc291cmNlc19pZF9hcnJfX2luX2RhdGVzJyBdICk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gQWdncmVnYXRlIGJvb2tpbmcgcmVzb3VyY2VzLCAgaWYgYW55ID9cclxuXHRcdFx0XHRcdF93cGJjLmJvb2tpbmdfX3NldF9wYXJhbV92YWx1ZSggcmVzcG9uc2VfZGF0YVsgJ3Jlc291cmNlX2lkJyBdLCAnYWdncmVnYXRlX3Jlc291cmNlX2lkX2FycicsIHJlc3BvbnNlX2RhdGFbICdhanhfZGF0YScgXVsgJ2FnZ3JlZ2F0ZV9yZXNvdXJjZV9pZF9hcnInIF0gKTtcclxuXHRcdFx0XHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0XHRcdFx0XHQvLyBVcGRhdGUgY2FsZW5kYXJcclxuXHRcdFx0XHRcdHdwYmNfY2FsZW5kYXJfX3VwZGF0ZV9sb29rKCByZXNwb25zZV9kYXRhWyAncmVzb3VyY2VfaWQnIF0gKTtcclxuXHJcblxyXG5cdFx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0XHRcdCggJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiAocmVzcG9uc2VfZGF0YVsgJ2FqeF9kYXRhJyBdWyAnYWp4X2FmdGVyX2FjdGlvbl9tZXNzYWdlJyBdKSApXHJcblx0XHRcdFx0XHRcdCAmJiAoICcnICE9IHJlc3BvbnNlX2RhdGFbICdhanhfZGF0YScgXVsgJ2FqeF9hZnRlcl9hY3Rpb25fbWVzc2FnZScgXS5yZXBsYWNlKCAvXFxuL2csIFwiPGJyIC8+XCIgKSApXHJcblx0XHRcdFx0XHQpe1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIGpxX25vZGUgID0gd3BiY19nZXRfY2FsZW5kYXJfX2pxX25vZGVfX2Zvcl9tZXNzYWdlcyggdGhpcy5kYXRhICk7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBTaG93IE1lc3NhZ2VcclxuXHRcdFx0XHRcdFx0d3BiY19mcm9udF9lbmRfX3Nob3dfbWVzc2FnZSggcmVzcG9uc2VfZGF0YVsgJ2FqeF9kYXRhJyBdWyAnYWp4X2FmdGVyX2FjdGlvbl9tZXNzYWdlJyBdLnJlcGxhY2UoIC9cXG4vZywgXCI8YnIgLz5cIiApLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyAgICd0eXBlJyAgICAgOiAoICd1bmRlZmluZWQnICE9PSB0eXBlb2YoIHJlc3BvbnNlX2RhdGFbICdhanhfZGF0YScgXVsgJ2FqeF9hZnRlcl9hY3Rpb25fbWVzc2FnZV9zdGF0dXMnIF0gKSApXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgPyByZXNwb25zZV9kYXRhWyAnYWp4X2RhdGEnIF1bICdhanhfYWZ0ZXJfYWN0aW9uX21lc3NhZ2Vfc3RhdHVzJyBdIDogJ2luZm8nLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnc2hvd19oZXJlJzogeydqcV9ub2RlJzoganFfbm9kZSwgJ3doZXJlJzogJ2FmdGVyJ30sXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdpc19hcHBlbmQnOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnc3R5bGUnICAgIDogJ3RleHQtYWxpZ246bGVmdDsnLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnZGVsYXknICAgIDogMTAwMDBcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvL2pRdWVyeSggJyNhamF4X3Jlc3BvbmQnICkuaHRtbCggcmVzcG9uc2VfZGF0YSApO1x0XHQvLyBGb3IgYWJpbGl0eSB0byBzaG93IHJlc3BvbnNlLCBhZGQgc3VjaCBESVYgZWxlbWVudCB0byBwYWdlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHQgICkuZmFpbCggZnVuY3Rpb24gKCBqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24gKSB7ICAgIGlmICggd2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUubG9nICl7IGNvbnNvbGUubG9nKCAnQWpheF9FcnJvcicsIGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93biApOyB9XHJcblxyXG5cdFx0XHRcdFx0Ly8gR2V0IENvbnRlbnQgb2YgRXJyb3IgTWVzc2FnZVxyXG5cdFx0XHRcdFx0dmFyIGVycm9yX21lc3NhZ2UgPSAnPHN0cm9uZz4nICsgJ0Vycm9yIScgKyAnPC9zdHJvbmc+ICcgKyBlcnJvclRocm93biA7XHJcblx0XHRcdFx0XHRpZiAoIGpxWEhSLnN0YXR1cyApe1xyXG5cdFx0XHRcdFx0XHRlcnJvcl9tZXNzYWdlICs9ICcgKDxiPicgKyBqcVhIUi5zdGF0dXMgKyAnPC9iPiknO1xyXG5cdFx0XHRcdFx0XHRpZiAoNDAzID09IGpxWEhSLnN0YXR1cyApe1xyXG5cdFx0XHRcdFx0XHRcdGVycm9yX21lc3NhZ2UgKz0gJzxicj4gUHJvYmFibHkgbm9uY2UgZm9yIHRoaXMgcGFnZSBoYXMgYmVlbiBleHBpcmVkLiBQbGVhc2UgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uY2xpY2s9XCJqYXZhc2NyaXB0OmxvY2F0aW9uLnJlbG9hZCgpO1wiPnJlbG9hZCB0aGUgcGFnZTwvYT4uJztcclxuXHRcdFx0XHRcdFx0XHRlcnJvcl9tZXNzYWdlICs9ICc8YnI+IE90aGVyd2lzZSwgcGxlYXNlIGNoZWNrIHRoaXMgPGEgc3R5bGU9XCJmb250LXdlaWdodDogNjAwO1wiIGhyZWY9XCJodHRwczovL3dwYm9va2luZ2NhbGVuZGFyLmNvbS9mYXEvcmVxdWVzdC1kby1ub3QtcGFzcy1zZWN1cml0eS1jaGVjay9cIj50cm91Ymxlc2hvb3RpbmcgaW5zdHJ1Y3Rpb248L2E+Ljxicj4nXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHZhciBtZXNzYWdlX3Nob3dfZGVsYXkgPSAzMDAwO1xyXG5cdFx0XHRcdFx0aWYgKCBqcVhIUi5yZXNwb25zZVRleHQgKXtcclxuXHRcdFx0XHRcdFx0ZXJyb3JfbWVzc2FnZSArPSAnICcgKyBqcVhIUi5yZXNwb25zZVRleHQ7XHJcblx0XHRcdFx0XHRcdG1lc3NhZ2Vfc2hvd19kZWxheSA9IDEwO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UucmVwbGFjZSggL1xcbi9nLCBcIjxiciAvPlwiICk7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGpxX25vZGUgID0gd3BiY19nZXRfY2FsZW5kYXJfX2pxX25vZGVfX2Zvcl9tZXNzYWdlcyggdGhpcy5kYXRhICk7XHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBJZiB3ZSBtYWtlIGZhc3QgY2xpY2tpbmcgb24gZGlmZmVyZW50IHBhZ2VzLFxyXG5cdFx0XHRcdFx0ICogdGhlbiB1bmRlciBjYWxlbmRhciB3aWxsIHNob3cgZXJyb3IgbWVzc2FnZSB3aXRoICBlbXB0eSAgdGV4dCwgYmVjYXVzZSBhamF4IHdhcyBub3QgcmVjZWl2ZWQuXHJcblx0XHRcdFx0XHQgKiBUbyAgbm90IHNob3cgc3VjaCB3YXJuaW5ncyB3ZSBhcmUgc2V0IGRlbGF5ICBpbiAzIHNlY29uZHMuICB2YXIgbWVzc2FnZV9zaG93X2RlbGF5ID0gMzAwMDtcclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0dmFyIGNsb3NlZF90aW1lciA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uICgpe1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBTaG93IE1lc3NhZ2VcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR3cGJjX2Zyb250X2VuZF9fc2hvd19tZXNzYWdlKCBlcnJvcl9tZXNzYWdlICwgeyAndHlwZScgICAgIDogJ2Vycm9yJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnc2hvd19oZXJlJzogeydqcV9ub2RlJzoganFfbm9kZSwgJ3doZXJlJzogJ2FmdGVyJ30sXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2lzX2FwcGVuZCc6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J3N0eWxlJyAgICA6ICd0ZXh0LWFsaWduOmxlZnQ7JyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnY3NzX2NsYXNzJzond3BiY19mZV9tZXNzYWdlX2FsdCcsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2RlbGF5JyAgICA6IDBcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSApO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgfSAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgICBwYXJzZUludCggbWVzc2FnZV9zaG93X2RlbGF5ICkgICApO1xyXG5cclxuXHRcdFx0ICB9KVxyXG5cdCAgICAgICAgICAvLyAuZG9uZSggICBmdW5jdGlvbiAoIGRhdGEsIHRleHRTdGF0dXMsIGpxWEhSICkgeyAgIGlmICggd2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUubG9nICl7IGNvbnNvbGUubG9nKCAnc2Vjb25kIHN1Y2Nlc3MnLCBkYXRhLCB0ZXh0U3RhdHVzLCBqcVhIUiApOyB9ICAgIH0pXHJcblx0XHRcdCAgLy8gLmFsd2F5cyggZnVuY3Rpb24gKCBkYXRhX2pxWEhSLCB0ZXh0U3RhdHVzLCBqcVhIUl9lcnJvclRocm93biApIHsgICBpZiAoIHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLmxvZyApeyBjb25zb2xlLmxvZyggJ2Fsd2F5cyBmaW5pc2hlZCcsIGRhdGFfanFYSFIsIHRleHRTdGF0dXMsIGpxWEhSX2Vycm9yVGhyb3duICk7IH0gICAgIH0pXHJcblx0XHRcdCAgOyAgLy8gRW5kIEFqYXhcclxufVxyXG5cclxuXHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gU3VwcG9ydFxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IENhbGVuZGFyIGpRdWVyeSBub2RlIGZvciBzaG93aW5nIG1lc3NhZ2VzIGR1cmluZyBBamF4XHJcblx0ICogVGhpcyBwYXJhbWV0ZXI6ICAgY2FsZW5kYXJfcmVxdWVzdF9wYXJhbXNbcmVzb3VyY2VfaWRdICAgcGFyc2VkIGZyb20gdGhpcy5kYXRhIEFqYXggcG9zdCAgZGF0YVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFqeF9wb3N0X2RhdGFfdXJsX3BhcmFtc1x0XHQgJ2FjdGlvbj1XUEJDX0FKWF9DQUxFTkRBUl9MT0FELi4uJmNhbGVuZGFyX3JlcXVlc3RfcGFyYW1zJTVCcmVzb3VyY2VfaWQlNUQ9MiZjYWxlbmRhcl9yZXF1ZXN0X3BhcmFtcyU1QmJvb2tpbmdfaGFzaCU1RD0mY2FsZW5kYXJfcmVxdWVzdF9wYXJhbXMnXHJcblx0ICogQHJldHVybnMge3N0cmluZ31cdCcnI2NhbGVuZGFyX2Jvb2tpbmcxJyAgfCAgICcuYm9va2luZ19mb3JtX2RpdicgLi4uXHJcblx0ICpcclxuXHQgKiBFeGFtcGxlICAgIHZhciBqcV9ub2RlICA9IHdwYmNfZ2V0X2NhbGVuZGFyX19qcV9ub2RlX19mb3JfbWVzc2FnZXMoIHRoaXMuZGF0YSApO1xyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdwYmNfZ2V0X2NhbGVuZGFyX19qcV9ub2RlX19mb3JfbWVzc2FnZXMoIGFqeF9wb3N0X2RhdGFfdXJsX3BhcmFtcyApe1xyXG5cclxuXHRcdHZhciBqcV9ub2RlID0gJy5ib29raW5nX2Zvcm1fZGl2JztcclxuXHJcblx0XHR2YXIgY2FsZW5kYXJfcmVzb3VyY2VfaWQgPSB3cGJjX2dldF9yZXNvdXJjZV9pZF9fZnJvbV9hanhfcG9zdF9kYXRhX3VybCggYWp4X3Bvc3RfZGF0YV91cmxfcGFyYW1zICk7XHJcblxyXG5cdFx0aWYgKCBjYWxlbmRhcl9yZXNvdXJjZV9pZCA+IDAgKXtcclxuXHRcdFx0anFfbm9kZSA9ICcjY2FsZW5kYXJfYm9va2luZycgKyBjYWxlbmRhcl9yZXNvdXJjZV9pZDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4ganFfbm9kZTtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgcmVzb3VyY2UgSUQgZnJvbSBhanggcG9zdCBkYXRhIHVybCAgIHVzdWFsbHkgIGZyb20gIHRoaXMuZGF0YSAgPSAnYWN0aW9uPVdQQkNfQUpYX0NBTEVOREFSX0xPQUQuLi4mY2FsZW5kYXJfcmVxdWVzdF9wYXJhbXMlNUJyZXNvdXJjZV9pZCU1RD0yJmNhbGVuZGFyX3JlcXVlc3RfcGFyYW1zJTVCYm9va2luZ19oYXNoJTVEPSZjYWxlbmRhcl9yZXF1ZXN0X3BhcmFtcydcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhanhfcG9zdF9kYXRhX3VybF9wYXJhbXNcdFx0ICdhY3Rpb249V1BCQ19BSlhfQ0FMRU5EQVJfTE9BRC4uLiZjYWxlbmRhcl9yZXF1ZXN0X3BhcmFtcyU1QnJlc291cmNlX2lkJTVEPTImY2FsZW5kYXJfcmVxdWVzdF9wYXJhbXMlNUJib29raW5nX2hhc2glNUQ9JmNhbGVuZGFyX3JlcXVlc3RfcGFyYW1zJ1xyXG5cdCAqIEByZXR1cm5zIHtpbnR9XHRcdFx0XHRcdFx0IDEgfCAwICAoaWYgZXJycm9yIHRoZW4gIDApXHJcblx0ICpcclxuXHQgKiBFeGFtcGxlICAgIHZhciBqcV9ub2RlICA9IHdwYmNfZ2V0X2NhbGVuZGFyX19qcV9ub2RlX19mb3JfbWVzc2FnZXMoIHRoaXMuZGF0YSApO1xyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdwYmNfZ2V0X3Jlc291cmNlX2lkX19mcm9tX2FqeF9wb3N0X2RhdGFfdXJsKCBhanhfcG9zdF9kYXRhX3VybF9wYXJhbXMgKXtcclxuXHJcblx0XHQvLyBHZXQgYm9va2luZyByZXNvdXJjZSBJRCBmcm9tIEFqYXggUG9zdCBSZXF1ZXN0ICAtPiB0aGlzLmRhdGEgPSAnYWN0aW9uPVdQQkNfQUpYX0NBTEVOREFSX0xPQUQuLi4mY2FsZW5kYXJfcmVxdWVzdF9wYXJhbXMlNUJyZXNvdXJjZV9pZCU1RD0yJmNhbGVuZGFyX3JlcXVlc3RfcGFyYW1zJTVCYm9va2luZ19oYXNoJTVEPSZjYWxlbmRhcl9yZXF1ZXN0X3BhcmFtcydcclxuXHRcdHZhciBjYWxlbmRhcl9yZXNvdXJjZV9pZCA9IHdwYmNfZ2V0X3VyaV9wYXJhbV9ieV9uYW1lKCAnY2FsZW5kYXJfcmVxdWVzdF9wYXJhbXNbcmVzb3VyY2VfaWRdJywgYWp4X3Bvc3RfZGF0YV91cmxfcGFyYW1zICk7XHJcblx0XHRpZiAoIChudWxsICE9PSBjYWxlbmRhcl9yZXNvdXJjZV9pZCkgJiYgKCcnICE9PSBjYWxlbmRhcl9yZXNvdXJjZV9pZCkgKXtcclxuXHRcdFx0Y2FsZW5kYXJfcmVzb3VyY2VfaWQgPSBwYXJzZUludCggY2FsZW5kYXJfcmVzb3VyY2VfaWQgKTtcclxuXHRcdFx0aWYgKCBjYWxlbmRhcl9yZXNvdXJjZV9pZCA+IDAgKXtcclxuXHRcdFx0XHRyZXR1cm4gY2FsZW5kYXJfcmVzb3VyY2VfaWQ7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiAwO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCBwYXJhbWV0ZXIgZnJvbSBVUkwgIC0gIHBhcnNlIFVSTCBwYXJhbWV0ZXJzLCAgbGlrZSB0aGlzOiBhY3Rpb249V1BCQ19BSlhfQ0FMRU5EQVJfTE9BRC4uLiZjYWxlbmRhcl9yZXF1ZXN0X3BhcmFtcyU1QnJlc291cmNlX2lkJTVEPTImY2FsZW5kYXJfcmVxdWVzdF9wYXJhbXMlNUJib29raW5nX2hhc2glNUQ9JmNhbGVuZGFyX3JlcXVlc3RfcGFyYW1zXHJcblx0ICogQHBhcmFtIG5hbWUgIHBhcmFtZXRlciAgbmFtZSwgIGxpa2UgJ2NhbGVuZGFyX3JlcXVlc3RfcGFyYW1zW3Jlc291cmNlX2lkXSdcclxuXHQgKiBAcGFyYW0gdXJsXHQncGFyYW1ldGVyICBzdHJpbmcgVVJMJ1xyXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gICBwYXJhbWV0ZXIgdmFsdWVcclxuXHQgKlxyXG5cdCAqIEV4YW1wbGU6IFx0XHR3cGJjX2dldF91cmlfcGFyYW1fYnlfbmFtZSggJ2NhbGVuZGFyX3JlcXVlc3RfcGFyYW1zW3Jlc291cmNlX2lkXScsIHRoaXMuZGF0YSApOyAgLT4gJzInXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gd3BiY19nZXRfdXJpX3BhcmFtX2J5X25hbWUoIG5hbWUsIHVybCApe1xyXG5cclxuXHRcdHVybCA9IGRlY29kZVVSSUNvbXBvbmVudCggdXJsICk7XHJcblxyXG5cdFx0bmFtZSA9IG5hbWUucmVwbGFjZSggL1tcXFtcXF1dL2csICdcXFxcJCYnICk7XHJcblx0XHR2YXIgcmVnZXggPSBuZXcgUmVnRXhwKCAnWz8mXScgKyBuYW1lICsgJyg9KFteJiNdKil8JnwjfCQpJyApLFxyXG5cdFx0XHRyZXN1bHRzID0gcmVnZXguZXhlYyggdXJsICk7XHJcblx0XHRpZiAoICFyZXN1bHRzICkgcmV0dXJuIG51bGw7XHJcblx0XHRpZiAoICFyZXN1bHRzWyAyIF0gKSByZXR1cm4gJyc7XHJcblx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KCByZXN1bHRzWyAyIF0ucmVwbGFjZSggL1xcKy9nLCAnICcgKSApO1xyXG5cdH1cclxuXHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gU2hvdyBNZXNzYWdlcyBhdCBGcm9udC1FZG4gc2lkZVxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8qKlxyXG4gKiBTaG93IG1lc3NhZ2UgaW4gY29udGVudFxyXG4gKlxyXG4gKiBAcGFyYW0gbWVzc2FnZVx0XHRcdFx0TWVzc2FnZSBIVE1MXHJcbiAqIEBwYXJhbSBwYXJhbXMgPSB7XHJcbiAqXHRcdFx0XHRcdFx0XHRcdCd0eXBlJyAgICAgOiAnd2FybmluZycsXHRcdFx0XHRcdFx0XHQvLyAnZXJyb3InIHwgJ3dhcm5pbmcnIHwgJ2luZm8nIHwgJ3N1Y2Nlc3MnXHJcbiAqXHRcdFx0XHRcdFx0XHRcdCdzaG93X2hlcmUnIDoge1xyXG4gKlx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2pxX25vZGUnIDogJycsXHRcdFx0XHQvLyBhbnkgalF1ZXJ5IG5vZGUgZGVmaW5pdGlvblxyXG4gKlx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J3doZXJlJyAgIDogJ2luc2lkZSdcdFx0Ly8gJ2luc2lkZScgfCAnYmVmb3JlJyB8ICdhZnRlcicgfCAncmlnaHQnIHwgJ2xlZnQnXHJcbiAqXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgfSxcclxuICpcdFx0XHRcdFx0XHRcdFx0J2lzX2FwcGVuZCc6IHRydWUsXHRcdFx0XHRcdFx0XHRcdC8vIEFwcGx5ICBvbmx5IGlmIFx0J3doZXJlJyAgIDogJ2luc2lkZSdcclxuICpcdFx0XHRcdFx0XHRcdFx0J3N0eWxlJyAgICA6ICd0ZXh0LWFsaWduOmxlZnQ7JyxcdFx0XHRcdC8vIHN0eWxlcywgaWYgbmVlZGVkXHJcbiAqXHRcdFx0XHRcdFx0XHQgICAgJ2Nzc19jbGFzcyc6ICcnLFx0XHRcdFx0XHRcdFx0XHQvLyBGb3IgZXhhbXBsZSBjYW4gIGJlOiAnd3BiY19mZV9tZXNzYWdlX2FsdCdcclxuICpcdFx0XHRcdFx0XHRcdFx0J2RlbGF5JyAgICA6IDAsXHRcdFx0XHRcdFx0XHRcdFx0Ly8gaG93IG1hbnkgbWljcm9zZWNvbmQgdG8gIHNob3csICBpZiAwICB0aGVuICBzaG93IGZvcmV2ZXJcclxuICpcdFx0XHRcdFx0XHRcdFx0J2lmX3Zpc2libGVfbm90X3Nob3cnOiBmYWxzZVx0XHRcdFx0XHQvLyBpZiB0cnVlLCAgdGhlbiBkbyBub3Qgc2hvdyBtZXNzYWdlLCAgaWYgcHJldmlvcyBtZXNzYWdlIHdhcyBub3QgaGlkZWQgKG5vdCBhcHBseSBpZiAnd2hlcmUnICAgOiAnaW5zaWRlJyApXHJcbiAqXHRcdFx0XHR9O1xyXG4gKiBFeGFtcGxlczpcclxuICogXHRcdFx0dmFyIGh0bWxfaWQgPSB3cGJjX2Zyb250X2VuZF9fc2hvd19tZXNzYWdlKCAnWW91IGNhbiB0ZXN0IGRheXMgc2VsZWN0aW9uIGluIGNhbGVuZGFyJywge30gKTtcclxuICpcclxuICpcdFx0XHR2YXIgbm90aWNlX21lc3NhZ2VfaWQgPSB3cGJjX2Zyb250X2VuZF9fc2hvd19tZXNzYWdlKCBtZXNzYWdlX3ZlcmlmX3JlcXVyZWQsIHsgJ3R5cGUnOiAnd2FybmluZycsICdkZWxheSc6IDEwMDAwLCAnaWZfdmlzaWJsZV9ub3Rfc2hvdyc6IHRydWUsXHJcbiAqXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgICdzaG93X2hlcmUnOiB7J3doZXJlJzogJ3JpZ2h0JywgJ2pxX25vZGUnOiBlbCx9IH0gKTtcclxuICpcclxuICpcdFx0XHR3cGJjX2Zyb250X2VuZF9fc2hvd19tZXNzYWdlKCByZXNwb25zZV9kYXRhWyAnYWp4X2RhdGEnIF1bICdhanhfYWZ0ZXJfYWN0aW9uX21lc3NhZ2UnIF0ucmVwbGFjZSggL1xcbi9nLCBcIjxiciAvPlwiICksXHJcbiAqXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgICAndHlwZScgICAgIDogKCAndW5kZWZpbmVkJyAhPT0gdHlwZW9mKCByZXNwb25zZV9kYXRhWyAnYWp4X2RhdGEnIF1bICdhanhfYWZ0ZXJfYWN0aW9uX21lc3NhZ2Vfc3RhdHVzJyBdICkgKVxyXG4gKlx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgPyByZXNwb25zZV9kYXRhWyAnYWp4X2RhdGEnIF1bICdhanhfYWZ0ZXJfYWN0aW9uX21lc3NhZ2Vfc3RhdHVzJyBdIDogJ2luZm8nLFxyXG4gKlx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdzaG93X2hlcmUnOiB7J2pxX25vZGUnOiBqcV9ub2RlLCAnd2hlcmUnOiAnYWZ0ZXInfSxcclxuICpcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnY3NzX2NsYXNzJzond3BiY19mZV9tZXNzYWdlX2FsdCcsXHJcbiAqXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2RlbGF5JyAgICA6IDEwMDAwXHJcbiAqXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gKTtcclxuICpcclxuICpcclxuICogQHJldHVybnMgc3RyaW5nICAtIEhUTUwgSURcdFx0b3IgMCBpZiBub3Qgc2hvd2luZyBkdXJpbmcgdGhpcyB0aW1lLlxyXG4gKi9cclxuZnVuY3Rpb24gd3BiY19mcm9udF9lbmRfX3Nob3dfbWVzc2FnZSggbWVzc2FnZSwgcGFyYW1zID0ge30gKXtcclxuXHJcblx0dmFyIHBhcmFtc19kZWZhdWx0ID0ge1xyXG5cdFx0XHRcdFx0XHRcdFx0J3R5cGUnICAgICA6ICd3YXJuaW5nJyxcdFx0XHRcdFx0XHRcdC8vICdlcnJvcicgfCAnd2FybmluZycgfCAnaW5mbycgfCAnc3VjY2VzcydcclxuXHRcdFx0XHRcdFx0XHRcdCdzaG93X2hlcmUnIDoge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdqcV9ub2RlJyA6ICcnLFx0XHRcdFx0Ly8gYW55IGpRdWVyeSBub2RlIGRlZmluaXRpb25cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnd2hlcmUnICAgOiAnaW5zaWRlJ1x0XHQvLyAnaW5zaWRlJyB8ICdiZWZvcmUnIHwgJ2FmdGVyJyB8ICdyaWdodCcgfCAnbGVmdCdcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgfSxcclxuXHRcdFx0XHRcdFx0XHRcdCdpc19hcHBlbmQnOiB0cnVlLFx0XHRcdFx0XHRcdFx0XHQvLyBBcHBseSAgb25seSBpZiBcdCd3aGVyZScgICA6ICdpbnNpZGUnXHJcblx0XHRcdFx0XHRcdFx0XHQnc3R5bGUnICAgIDogJ3RleHQtYWxpZ246bGVmdDsnLFx0XHRcdFx0Ly8gc3R5bGVzLCBpZiBuZWVkZWRcclxuXHRcdFx0XHRcdFx0XHQgICAgJ2Nzc19jbGFzcyc6ICcnLFx0XHRcdFx0XHRcdFx0XHQvLyBGb3IgZXhhbXBsZSBjYW4gIGJlOiAnd3BiY19mZV9tZXNzYWdlX2FsdCdcclxuXHRcdFx0XHRcdFx0XHRcdCdkZWxheScgICAgOiAwLFx0XHRcdFx0XHRcdFx0XHRcdC8vIGhvdyBtYW55IG1pY3Jvc2Vjb25kIHRvICBzaG93LCAgaWYgMCAgdGhlbiAgc2hvdyBmb3JldmVyXHJcblx0XHRcdFx0XHRcdFx0XHQnaWZfdmlzaWJsZV9ub3Rfc2hvdyc6IGZhbHNlLFx0XHRcdFx0XHQvLyBpZiB0cnVlLCAgdGhlbiBkbyBub3Qgc2hvdyBtZXNzYWdlLCAgaWYgcHJldmlvcyBtZXNzYWdlIHdhcyBub3QgaGlkZWQgKG5vdCBhcHBseSBpZiAnd2hlcmUnICAgOiAnaW5zaWRlJyApXHJcblx0XHRcdFx0XHRcdFx0XHQnaXNfc2Nyb2xsJzogdHJ1ZVx0XHRcdFx0XHRcdFx0XHQvLyBpcyBzY3JvbGwgIHRvICB0aGlzIGVsZW1lbnRcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRmb3IgKCB2YXIgcF9rZXkgaW4gcGFyYW1zICl7XHJcblx0XHRwYXJhbXNfZGVmYXVsdFsgcF9rZXkgXSA9IHBhcmFtc1sgcF9rZXkgXTtcclxuXHR9XHJcblx0cGFyYW1zID0gcGFyYW1zX2RlZmF1bHQ7XHJcblxyXG4gICAgdmFyIHVuaXF1ZV9kaXZfaWQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdW5pcXVlX2Rpdl9pZCA9ICd3cGJjX25vdGljZV8nICsgdW5pcXVlX2Rpdl9pZC5nZXRUaW1lKCk7XHJcblxyXG5cdHBhcmFtc1snY3NzX2NsYXNzJ10gKz0gJyB3cGJjX2ZlX21lc3NhZ2UnO1xyXG5cdGlmICggcGFyYW1zWyd0eXBlJ10gPT0gJ2Vycm9yJyApe1xyXG5cdFx0cGFyYW1zWydjc3NfY2xhc3MnXSArPSAnIHdwYmNfZmVfbWVzc2FnZV9lcnJvcic7XHJcblx0XHRtZXNzYWdlID0gJzxpIGNsYXNzPVwibWVudV9pY29uIGljb24tMXggd3BiY19pY25fcmVwb3J0X2dtYWlsZXJyb3JyZWRcIj48L2k+JyArIG1lc3NhZ2U7XHJcblx0fVxyXG5cdGlmICggcGFyYW1zWyd0eXBlJ10gPT0gJ3dhcm5pbmcnICl7XHJcblx0XHRwYXJhbXNbJ2Nzc19jbGFzcyddICs9ICcgd3BiY19mZV9tZXNzYWdlX3dhcm5pbmcnO1xyXG5cdFx0bWVzc2FnZSA9ICc8aSBjbGFzcz1cIm1lbnVfaWNvbiBpY29uLTF4IHdwYmNfaWNuX3dhcm5pbmdcIj48L2k+JyArIG1lc3NhZ2U7XHJcblx0fVxyXG5cdGlmICggcGFyYW1zWyd0eXBlJ10gPT0gJ2luZm8nICl7XHJcblx0XHRwYXJhbXNbJ2Nzc19jbGFzcyddICs9ICcgd3BiY19mZV9tZXNzYWdlX2luZm8nO1xyXG5cdH1cclxuXHRpZiAoIHBhcmFtc1sndHlwZSddID09ICdzdWNjZXNzJyApe1xyXG5cdFx0cGFyYW1zWydjc3NfY2xhc3MnXSArPSAnIHdwYmNfZmVfbWVzc2FnZV9zdWNjZXNzJztcclxuXHRcdG1lc3NhZ2UgPSAnPGkgY2xhc3M9XCJtZW51X2ljb24gaWNvbi0xeCB3cGJjX2ljbl9kb25lX291dGxpbmVcIj48L2k+JyArIG1lc3NhZ2U7XHJcblx0fVxyXG5cclxuXHR2YXIgc2Nyb2xsX3RvX2VsZW1lbnQgPSAnPGRpdiBpZD1cIicgKyB1bmlxdWVfZGl2X2lkICsgJ19zY3JvbGxcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTtcIj48L2Rpdj4nO1xyXG5cdG1lc3NhZ2UgPSAnPGRpdiBpZD1cIicgKyB1bmlxdWVfZGl2X2lkICsgJ1wiIGNsYXNzPVwid3BiY19mcm9udF9lbmRfX21lc3NhZ2UgJyArIHBhcmFtc1snY3NzX2NsYXNzJ10gKyAnXCIgc3R5bGU9XCInICsgcGFyYW1zWyAnc3R5bGUnIF0gKyAnXCI+JyArIG1lc3NhZ2UgKyAnPC9kaXY+JztcclxuXHJcblxyXG5cdHZhciBqcV9lbF9tZXNzYWdlID0gZmFsc2U7XHJcblx0dmFyIGlzX3Nob3dfbWVzc2FnZSA9IHRydWU7XHJcblxyXG5cdGlmICggJ2luc2lkZScgPT09IHBhcmFtc1sgJ3Nob3dfaGVyZScgXVsgJ3doZXJlJyBdICl7XHJcblxyXG5cdFx0aWYgKCBwYXJhbXNbICdpc19hcHBlbmQnIF0gKXtcclxuXHRcdFx0alF1ZXJ5KCBwYXJhbXNbICdzaG93X2hlcmUnIF1bICdqcV9ub2RlJyBdICkuYXBwZW5kKCBzY3JvbGxfdG9fZWxlbWVudCApO1xyXG5cdFx0XHRqUXVlcnkoIHBhcmFtc1sgJ3Nob3dfaGVyZScgXVsgJ2pxX25vZGUnIF0gKS5hcHBlbmQoIG1lc3NhZ2UgKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGpRdWVyeSggcGFyYW1zWyAnc2hvd19oZXJlJyBdWyAnanFfbm9kZScgXSApLmh0bWwoIHNjcm9sbF90b19lbGVtZW50ICsgbWVzc2FnZSApO1xyXG5cdFx0fVxyXG5cclxuXHR9IGVsc2UgaWYgKCAnYmVmb3JlJyA9PT0gcGFyYW1zWyAnc2hvd19oZXJlJyBdWyAnd2hlcmUnIF0gKXtcclxuXHJcblx0XHRqcV9lbF9tZXNzYWdlID0galF1ZXJ5KCBwYXJhbXNbICdzaG93X2hlcmUnIF1bICdqcV9ub2RlJyBdICkuc2libGluZ3MoICdbaWRePVwid3BiY19ub3RpY2VfXCJdJyApO1xyXG5cdFx0aWYgKCAocGFyYW1zWyAnaWZfdmlzaWJsZV9ub3Rfc2hvdycgXSkgJiYgKGpxX2VsX21lc3NhZ2UuaXMoICc6dmlzaWJsZScgKSkgKXtcclxuXHRcdFx0aXNfc2hvd19tZXNzYWdlID0gZmFsc2U7XHJcblx0XHRcdHVuaXF1ZV9kaXZfaWQgPSBqUXVlcnkoIGpxX2VsX21lc3NhZ2UuZ2V0KCAwICkgKS5hdHRyKCAnaWQnICk7XHJcblx0XHR9XHJcblx0XHRpZiAoIGlzX3Nob3dfbWVzc2FnZSApe1xyXG5cdFx0XHRqUXVlcnkoIHBhcmFtc1sgJ3Nob3dfaGVyZScgXVsgJ2pxX25vZGUnIF0gKS5iZWZvcmUoIHNjcm9sbF90b19lbGVtZW50ICk7XHJcblx0XHRcdGpRdWVyeSggcGFyYW1zWyAnc2hvd19oZXJlJyBdWyAnanFfbm9kZScgXSApLmJlZm9yZSggbWVzc2FnZSApO1xyXG5cdFx0fVxyXG5cclxuXHR9IGVsc2UgaWYgKCAnYWZ0ZXInID09PSBwYXJhbXNbICdzaG93X2hlcmUnIF1bICd3aGVyZScgXSApe1xyXG5cclxuXHRcdGpxX2VsX21lc3NhZ2UgPSBqUXVlcnkoIHBhcmFtc1sgJ3Nob3dfaGVyZScgXVsgJ2pxX25vZGUnIF0gKS5uZXh0QWxsKCAnW2lkXj1cIndwYmNfbm90aWNlX1wiXScgKTtcclxuXHRcdGlmICggKHBhcmFtc1sgJ2lmX3Zpc2libGVfbm90X3Nob3cnIF0pICYmIChqcV9lbF9tZXNzYWdlLmlzKCAnOnZpc2libGUnICkpICl7XHJcblx0XHRcdGlzX3Nob3dfbWVzc2FnZSA9IGZhbHNlO1xyXG5cdFx0XHR1bmlxdWVfZGl2X2lkID0galF1ZXJ5KCBqcV9lbF9tZXNzYWdlLmdldCggMCApICkuYXR0ciggJ2lkJyApO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCBpc19zaG93X21lc3NhZ2UgKXtcclxuXHRcdFx0alF1ZXJ5KCBwYXJhbXNbICdzaG93X2hlcmUnIF1bICdqcV9ub2RlJyBdICkuYmVmb3JlKCBzY3JvbGxfdG9fZWxlbWVudCApO1x0XHQvLyBXZSBuZWVkIHRvICBzZXQgIGhlcmUgYmVmb3JlKGZvciBoYW5keSBzY3JvbGwpXHJcblx0XHRcdGpRdWVyeSggcGFyYW1zWyAnc2hvd19oZXJlJyBdWyAnanFfbm9kZScgXSApLmFmdGVyKCBtZXNzYWdlICk7XHJcblx0XHR9XHJcblxyXG5cdH0gZWxzZSBpZiAoICdyaWdodCcgPT09IHBhcmFtc1sgJ3Nob3dfaGVyZScgXVsgJ3doZXJlJyBdICl7XHJcblxyXG5cdFx0anFfZWxfbWVzc2FnZSA9IGpRdWVyeSggcGFyYW1zWyAnc2hvd19oZXJlJyBdWyAnanFfbm9kZScgXSApLm5leHRBbGwoICcud3BiY19mcm9udF9lbmRfX21lc3NhZ2VfY29udGFpbmVyX3JpZ2h0JyApLmZpbmQoICdbaWRePVwid3BiY19ub3RpY2VfXCJdJyApO1xyXG5cdFx0aWYgKCAocGFyYW1zWyAnaWZfdmlzaWJsZV9ub3Rfc2hvdycgXSkgJiYgKGpxX2VsX21lc3NhZ2UuaXMoICc6dmlzaWJsZScgKSkgKXtcclxuXHRcdFx0aXNfc2hvd19tZXNzYWdlID0gZmFsc2U7XHJcblx0XHRcdHVuaXF1ZV9kaXZfaWQgPSBqUXVlcnkoIGpxX2VsX21lc3NhZ2UuZ2V0KCAwICkgKS5hdHRyKCAnaWQnICk7XHJcblx0XHR9XHJcblx0XHRpZiAoIGlzX3Nob3dfbWVzc2FnZSApe1xyXG5cdFx0XHRqUXVlcnkoIHBhcmFtc1sgJ3Nob3dfaGVyZScgXVsgJ2pxX25vZGUnIF0gKS5iZWZvcmUoIHNjcm9sbF90b19lbGVtZW50ICk7XHRcdC8vIFdlIG5lZWQgdG8gIHNldCAgaGVyZSBiZWZvcmUoZm9yIGhhbmR5IHNjcm9sbClcclxuXHRcdFx0alF1ZXJ5KCBwYXJhbXNbICdzaG93X2hlcmUnIF1bICdqcV9ub2RlJyBdICkuYWZ0ZXIoICc8ZGl2IGNsYXNzPVwid3BiY19mcm9udF9lbmRfX21lc3NhZ2VfY29udGFpbmVyX3JpZ2h0XCI+JyArIG1lc3NhZ2UgKyAnPC9kaXY+JyApO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSBpZiAoICdsZWZ0JyA9PT0gcGFyYW1zWyAnc2hvd19oZXJlJyBdWyAnd2hlcmUnIF0gKXtcclxuXHJcblx0XHRqcV9lbF9tZXNzYWdlID0galF1ZXJ5KCBwYXJhbXNbICdzaG93X2hlcmUnIF1bICdqcV9ub2RlJyBdICkuc2libGluZ3MoICcud3BiY19mcm9udF9lbmRfX21lc3NhZ2VfY29udGFpbmVyX2xlZnQnICkuZmluZCggJ1tpZF49XCJ3cGJjX25vdGljZV9cIl0nICk7XHJcblx0XHRpZiAoIChwYXJhbXNbICdpZl92aXNpYmxlX25vdF9zaG93JyBdKSAmJiAoanFfZWxfbWVzc2FnZS5pcyggJzp2aXNpYmxlJyApKSApe1xyXG5cdFx0XHRpc19zaG93X21lc3NhZ2UgPSBmYWxzZTtcclxuXHRcdFx0dW5pcXVlX2Rpdl9pZCA9IGpRdWVyeSgganFfZWxfbWVzc2FnZS5nZXQoIDAgKSApLmF0dHIoICdpZCcgKTtcclxuXHRcdH1cclxuXHRcdGlmICggaXNfc2hvd19tZXNzYWdlICl7XHJcblx0XHRcdGpRdWVyeSggcGFyYW1zWyAnc2hvd19oZXJlJyBdWyAnanFfbm9kZScgXSApLmJlZm9yZSggc2Nyb2xsX3RvX2VsZW1lbnQgKTtcdFx0Ly8gV2UgbmVlZCB0byAgc2V0ICBoZXJlIGJlZm9yZShmb3IgaGFuZHkgc2Nyb2xsKVxyXG5cdFx0XHRqUXVlcnkoIHBhcmFtc1sgJ3Nob3dfaGVyZScgXVsgJ2pxX25vZGUnIF0gKS5iZWZvcmUoICc8ZGl2IGNsYXNzPVwid3BiY19mcm9udF9lbmRfX21lc3NhZ2VfY29udGFpbmVyX2xlZnRcIj4nICsgbWVzc2FnZSArICc8L2Rpdj4nICk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRpZiAoICAgKCBpc19zaG93X21lc3NhZ2UgKSAgJiYgICggcGFyc2VJbnQoIHBhcmFtc1sgJ2RlbGF5JyBdICkgPiAwICkgICApe1xyXG5cdFx0dmFyIGNsb3NlZF90aW1lciA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uICgpe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeSggJyMnICsgdW5pcXVlX2Rpdl9pZCApLmZhZGVPdXQoIDE1MDAgKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9ICwgcGFyc2VJbnQoIHBhcmFtc1sgJ2RlbGF5JyBdICkgICApO1xyXG5cclxuXHRcdHZhciBjbG9zZWRfdGltZXIyID0gc2V0VGltZW91dCggZnVuY3Rpb24gKCl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRqUXVlcnkoICcjJyArIHVuaXF1ZV9kaXZfaWQgKS50cmlnZ2VyKCAnaGlkZScgKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9LCAoIHBhcnNlSW50KCBwYXJhbXNbICdkZWxheScgXSApICsgMTUwMSApICk7XHJcblx0fVxyXG5cclxuXHQvLyBDaGVjayAgaWYgc2hvd2VkIG1lc3NhZ2UgaW4gc29tZSBoaWRkZW4gcGFyZW50IHNlY3Rpb24gYW5kIHNob3cgaXQuIEJ1dCBpdCBtdXN0ICBiZSBsb3dlciB0aGFuICcud3BiY19jb250YWluZXInXHJcblx0dmFyIHBhcmVudF9lbHMgPSBqUXVlcnkoICcjJyArIHVuaXF1ZV9kaXZfaWQgKS5wYXJlbnRzKCkubWFwKCBmdW5jdGlvbiAoKXtcclxuXHRcdGlmICggKCFqUXVlcnkoIHRoaXMgKS5pcyggJ3Zpc2libGUnICkpICYmIChqUXVlcnkoICcud3BiY19jb250YWluZXInICkuaGFzKCB0aGlzICkpICl7XHJcblx0XHRcdGpRdWVyeSggdGhpcyApLnNob3coKTtcclxuXHRcdH1cclxuXHR9ICk7XHJcblxyXG5cdGlmICggcGFyYW1zWyAnaXNfc2Nyb2xsJyBdICl7XHJcblx0XHR3cGJjX2RvX3Njcm9sbCggJyMnICsgdW5pcXVlX2Rpdl9pZCArICdfc2Nyb2xsJyApO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHVuaXF1ZV9kaXZfaWQ7XHJcbn1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEVycm9yIG1lc3NhZ2UuIFx0UHJlc2V0IG9mIHBhcmFtZXRlcnMgZm9yIHJlYWwgbWVzc2FnZSBmdW5jdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBlbFx0XHQtIGFueSBqUXVlcnkgbm9kZSBkZWZpbml0aW9uXHJcblx0ICogQHBhcmFtIG1lc3NhZ2VcdC0gTWVzc2FnZSBIVE1MXHJcblx0ICogQHJldHVybnMgc3RyaW5nICAtIEhUTUwgSURcdFx0b3IgMCBpZiBub3Qgc2hvd2luZyBkdXJpbmcgdGhpcyB0aW1lLlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdwYmNfZnJvbnRfZW5kX19zaG93X21lc3NhZ2VfX2Vycm9yKCBqcV9ub2RlLCBtZXNzYWdlICl7XHJcblxyXG5cdFx0dmFyIG5vdGljZV9tZXNzYWdlX2lkID0gd3BiY19mcm9udF9lbmRfX3Nob3dfbWVzc2FnZShcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtZXNzYWdlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCd0eXBlJyAgICAgICAgICAgICAgIDogJ2Vycm9yJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdkZWxheScgICAgICAgICAgICAgIDogMTAwMDAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnaWZfdmlzaWJsZV9ub3Rfc2hvdyc6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnc2hvd19oZXJlJyAgICAgICAgICA6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCd3aGVyZScgIDogJ3JpZ2h0JyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdqcV9ub2RlJzoganFfbm9kZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgIH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0cmV0dXJuIG5vdGljZV9tZXNzYWdlX2lkO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEVycm9yIG1lc3NhZ2UgVU5ERVIgZWxlbWVudC4gXHRQcmVzZXQgb2YgcGFyYW1ldGVycyBmb3IgcmVhbCBtZXNzYWdlIGZ1bmN0aW9uLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGVsXHRcdC0gYW55IGpRdWVyeSBub2RlIGRlZmluaXRpb25cclxuXHQgKiBAcGFyYW0gbWVzc2FnZVx0LSBNZXNzYWdlIEhUTUxcclxuXHQgKiBAcmV0dXJucyBzdHJpbmcgIC0gSFRNTCBJRFx0XHRvciAwIGlmIG5vdCBzaG93aW5nIGR1cmluZyB0aGlzIHRpbWUuXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gd3BiY19mcm9udF9lbmRfX3Nob3dfbWVzc2FnZV9fZXJyb3JfdW5kZXJfZWxlbWVudCgganFfbm9kZSwgbWVzc2FnZSwgbWVzc2FnZV9kZWxheSApe1xyXG5cclxuXHRcdGlmICggJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiAobWVzc2FnZV9kZWxheSkgKXtcclxuXHRcdFx0bWVzc2FnZV9kZWxheSA9IDBcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgbm90aWNlX21lc3NhZ2VfaWQgPSB3cGJjX2Zyb250X2VuZF9fc2hvd19tZXNzYWdlKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2UsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J3R5cGUnICAgICAgICAgICAgICAgOiAnZXJyb3InLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2RlbGF5JyAgICAgICAgICAgICAgOiBtZXNzYWdlX2RlbGF5LFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2lmX3Zpc2libGVfbm90X3Nob3cnOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J3Nob3dfaGVyZScgICAgICAgICAgOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnd2hlcmUnICA6ICdhZnRlcicsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnanFfbm9kZSc6IGpxX25vZGVcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgICB9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdHJldHVybiBub3RpY2VfbWVzc2FnZV9pZDtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBFcnJvciBtZXNzYWdlIFVOREVSIGVsZW1lbnQuIFx0UHJlc2V0IG9mIHBhcmFtZXRlcnMgZm9yIHJlYWwgbWVzc2FnZSBmdW5jdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBlbFx0XHQtIGFueSBqUXVlcnkgbm9kZSBkZWZpbml0aW9uXHJcblx0ICogQHBhcmFtIG1lc3NhZ2VcdC0gTWVzc2FnZSBIVE1MXHJcblx0ICogQHJldHVybnMgc3RyaW5nICAtIEhUTUwgSURcdFx0b3IgMCBpZiBub3Qgc2hvd2luZyBkdXJpbmcgdGhpcyB0aW1lLlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdwYmNfZnJvbnRfZW5kX19zaG93X21lc3NhZ2VfX2Vycm9yX2Fib3ZlX2VsZW1lbnQoIGpxX25vZGUsIG1lc3NhZ2UsIG1lc3NhZ2VfZGVsYXkgKXtcclxuXHJcblx0XHRpZiAoICd1bmRlZmluZWQnID09PSB0eXBlb2YgKG1lc3NhZ2VfZGVsYXkpICl7XHJcblx0XHRcdG1lc3NhZ2VfZGVsYXkgPSAxMDAwMFxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBub3RpY2VfbWVzc2FnZV9pZCA9IHdwYmNfZnJvbnRfZW5kX19zaG93X21lc3NhZ2UoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWVzc2FnZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQndHlwZScgICAgICAgICAgICAgICA6ICdlcnJvcicsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnZGVsYXknICAgICAgICAgICAgICA6IG1lc3NhZ2VfZGVsYXksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnaWZfdmlzaWJsZV9ub3Rfc2hvdyc6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnc2hvd19oZXJlJyAgICAgICAgICA6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCd3aGVyZScgIDogJ2JlZm9yZScsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnanFfbm9kZSc6IGpxX25vZGVcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgICB9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdHJldHVybiBub3RpY2VfbWVzc2FnZV9pZDtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBXYXJuaW5nIG1lc3NhZ2UuIFx0UHJlc2V0IG9mIHBhcmFtZXRlcnMgZm9yIHJlYWwgbWVzc2FnZSBmdW5jdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBlbFx0XHQtIGFueSBqUXVlcnkgbm9kZSBkZWZpbml0aW9uXHJcblx0ICogQHBhcmFtIG1lc3NhZ2VcdC0gTWVzc2FnZSBIVE1MXHJcblx0ICogQHJldHVybnMgc3RyaW5nICAtIEhUTUwgSURcdFx0b3IgMCBpZiBub3Qgc2hvd2luZyBkdXJpbmcgdGhpcyB0aW1lLlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdwYmNfZnJvbnRfZW5kX19zaG93X21lc3NhZ2VfX3dhcm5pbmcoIGpxX25vZGUsIG1lc3NhZ2UgKXtcclxuXHJcblx0XHR2YXIgbm90aWNlX21lc3NhZ2VfaWQgPSB3cGJjX2Zyb250X2VuZF9fc2hvd19tZXNzYWdlKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2UsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J3R5cGUnICAgICAgICAgICAgICAgOiAnd2FybmluZycsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnZGVsYXknICAgICAgICAgICAgICA6IDEwMDAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2lmX3Zpc2libGVfbm90X3Nob3cnOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J3Nob3dfaGVyZScgICAgICAgICAgOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnd2hlcmUnICA6ICdyaWdodCcsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnanFfbm9kZSc6IGpxX25vZGVcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgICB9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdHJldHVybiBub3RpY2VfbWVzc2FnZV9pZDtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBXYXJuaW5nIG1lc3NhZ2UgVU5ERVIgZWxlbWVudC4gXHRQcmVzZXQgb2YgcGFyYW1ldGVycyBmb3IgcmVhbCBtZXNzYWdlIGZ1bmN0aW9uLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGVsXHRcdC0gYW55IGpRdWVyeSBub2RlIGRlZmluaXRpb25cclxuXHQgKiBAcGFyYW0gbWVzc2FnZVx0LSBNZXNzYWdlIEhUTUxcclxuXHQgKiBAcmV0dXJucyBzdHJpbmcgIC0gSFRNTCBJRFx0XHRvciAwIGlmIG5vdCBzaG93aW5nIGR1cmluZyB0aGlzIHRpbWUuXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gd3BiY19mcm9udF9lbmRfX3Nob3dfbWVzc2FnZV9fd2FybmluZ191bmRlcl9lbGVtZW50KCBqcV9ub2RlLCBtZXNzYWdlICl7XHJcblxyXG5cdFx0dmFyIG5vdGljZV9tZXNzYWdlX2lkID0gd3BiY19mcm9udF9lbmRfX3Nob3dfbWVzc2FnZShcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtZXNzYWdlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCd0eXBlJyAgICAgICAgICAgICAgIDogJ3dhcm5pbmcnLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2RlbGF5JyAgICAgICAgICAgICAgOiAxMDAwMCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdpZl92aXNpYmxlX25vdF9zaG93JzogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdzaG93X2hlcmUnICAgICAgICAgIDoge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J3doZXJlJyAgOiAnYWZ0ZXInLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2pxX25vZGUnOiBqcV9ub2RlXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCk7XHJcblx0XHRyZXR1cm4gbm90aWNlX21lc3NhZ2VfaWQ7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogV2FybmluZyBtZXNzYWdlIEFCT1ZFIGVsZW1lbnQuIFx0UHJlc2V0IG9mIHBhcmFtZXRlcnMgZm9yIHJlYWwgbWVzc2FnZSBmdW5jdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBlbFx0XHQtIGFueSBqUXVlcnkgbm9kZSBkZWZpbml0aW9uXHJcblx0ICogQHBhcmFtIG1lc3NhZ2VcdC0gTWVzc2FnZSBIVE1MXHJcblx0ICogQHJldHVybnMgc3RyaW5nICAtIEhUTUwgSURcdFx0b3IgMCBpZiBub3Qgc2hvd2luZyBkdXJpbmcgdGhpcyB0aW1lLlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdwYmNfZnJvbnRfZW5kX19zaG93X21lc3NhZ2VfX3dhcm5pbmdfYWJvdmVfZWxlbWVudCgganFfbm9kZSwgbWVzc2FnZSApe1xyXG5cclxuXHRcdHZhciBub3RpY2VfbWVzc2FnZV9pZCA9IHdwYmNfZnJvbnRfZW5kX19zaG93X21lc3NhZ2UoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWVzc2FnZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQndHlwZScgICAgICAgICAgICAgICA6ICd3YXJuaW5nJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdkZWxheScgICAgICAgICAgICAgIDogMTAwMDAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnaWZfdmlzaWJsZV9ub3Rfc2hvdyc6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnc2hvd19oZXJlJyAgICAgICAgICA6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCd3aGVyZScgIDogJ2JlZm9yZScsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnanFfbm9kZSc6IGpxX25vZGVcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgICB9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdHJldHVybiBub3RpY2VfbWVzc2FnZV9pZDtcclxuXHR9XHJcblxyXG5cclxuLyoqXHJcbiAqIFNjcm9sbCB0byBzcGVjaWZpYyBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSBqcV9ub2RlXHRcdFx0XHRcdHN0cmluZyBvciBqUXVlcnkgZWxlbWVudCwgIHdoZXJlIHNjcm9sbCAgdG9cclxuICogQHBhcmFtIGV4dHJhX3NoaWZ0X29mZnNldFx0XHRpbnQgc2hpZnQgb2Zmc2V0IGZyb20gIGpxX25vZGVcclxuICovXHJcbmZ1bmN0aW9uIHdwYmNfZG9fc2Nyb2xsKCBqcV9ub2RlICwgZXh0cmFfc2hpZnRfb2Zmc2V0ID0gMCApe1xyXG5cclxuXHRpZiAoICFqUXVlcnkoIGpxX25vZGUgKS5sZW5ndGggKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dmFyIHRhcmdldE9mZnNldCA9IGpRdWVyeSgganFfbm9kZSApLm9mZnNldCgpLnRvcDtcclxuXHJcblx0aWYgKCB0YXJnZXRPZmZzZXQgPD0gMCApe1xyXG5cdFx0aWYgKCAwICE9IGpRdWVyeSgganFfbm9kZSApLm5leHRBbGwoICc6dmlzaWJsZScgKS5sZW5ndGggKXtcclxuXHRcdFx0dGFyZ2V0T2Zmc2V0ID0galF1ZXJ5KCBqcV9ub2RlICkubmV4dEFsbCggJzp2aXNpYmxlJyApLmZpcnN0KCkub2Zmc2V0KCkudG9wO1xyXG5cdFx0fSBlbHNlIGlmICggMCAhPSBqUXVlcnkoIGpxX25vZGUgKS5wYXJlbnQoKS5uZXh0QWxsKCAnOnZpc2libGUnICkubGVuZ3RoICl7XHJcblx0XHRcdHRhcmdldE9mZnNldCA9IGpRdWVyeSgganFfbm9kZSApLnBhcmVudCgpLm5leHRBbGwoICc6dmlzaWJsZScgKS5maXJzdCgpLm9mZnNldCgpLnRvcDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGlmICggalF1ZXJ5KCAnI3dwYWRtaW5iYXInICkubGVuZ3RoID4gMCApe1xyXG5cdFx0dGFyZ2V0T2Zmc2V0ID0gdGFyZ2V0T2Zmc2V0IC0gNTAgLSA1MDtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGFyZ2V0T2Zmc2V0ID0gdGFyZ2V0T2Zmc2V0IC0gMjAgLSA1MDtcclxuXHR9XHJcblx0dGFyZ2V0T2Zmc2V0ICs9IGV4dHJhX3NoaWZ0X29mZnNldDtcclxuXHJcblx0Ly8gU2Nyb2xsIG9ubHkgIGlmIHdlIGRpZCBub3Qgc2Nyb2xsIGJlZm9yZVxyXG5cdGlmICggISBqUXVlcnkoICdodG1sLGJvZHknICkuaXMoICc6YW5pbWF0ZWQnICkgKXtcclxuXHRcdGpRdWVyeSggJ2h0bWwsYm9keScgKS5hbmltYXRlKCB7c2Nyb2xsVG9wOiB0YXJnZXRPZmZzZXR9LCA1MDAgKTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG4vL1RPRE86IHJlbW92ZSB2YXJzOiAgICAgICBia18yY2xpY2tzX21vZGVfZGF5c19zdGFydCwgYmtfMWNsaWNrX21vZGVfZGF5c19zdGFydCAgICAgZGF0ZTJhcHByb3ZlICAgZGF0ZV9hcHByb3ZlZCJdLCJmaWxlIjoiaW5jbHVkZXMvX3dwYmNfY2FsZW5kYXIvX291dC93cGJjX2NhbGVuZGFyLmpzIn0=
