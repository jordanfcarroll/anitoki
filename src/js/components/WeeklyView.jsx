var React = require("react");

var Weekday = require("./Weekday.jsx");

var $ = require("jquery");

var Swipe = require("swipe-js");

var WeeklyView = React.createClass({
	getInitialState: function () {
		return {
			mobileDisplaying: 0
		}
	},

	

	render: function () {
		var _this = this;
		const days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		]
		var weekdays = [];
		for (var i = 0; i < 7; i++) {
			let shows = [];
			let className = "weekly-day"
			if (this.props.shows) {
				shows = this.props.userShows.map(function (id) {
					return _this.props.shows.find((value) => id === value.id)
				})
				shows = shows.filter(function (show) {
					var date = new Date(show.airing.time);
					return (date.getDay() === i && show.airing.countdown < 604800);
				})
			}
			if (this.state.mobileDisplaying === i) {
				className += " mobile-current-displaying";
			}
			weekdays.push(<Weekday 
							className={className} 
							day={days[i]} 
							key={i}
							shows={shows}
							showtime={this.props.showtime}
							navigateToDrawer={this.props.navigateToDrawer}
							setShow={this.props.setShow} />);
		}

		// Create mobile view buttons 
		var buttonLeft;
		var buttonRight;

		if (this.state.mobileDisplaying === 0) {
			buttonLeft = <button className="back-button fa fa-angle-left no-back" />
		} else {
			buttonLeft = <button className="back-button fa fa-angle-left" onClick={this.handleBack} />
		}
		if (this.state.mobileDisplaying === 6) {
			buttonRight = <button className="forward-button fa fa-angle-right no-fwd"/>
		} else {
			buttonRight = <button className="forward-button fa fa-angle-right" onClick={this.handleAdvance} />
		}

		return (
			<div id="week-view">
				{/*<div className="arrow-button-wrapper">
									{buttonLeft}
									{buttonRight}
								</div>*/}
				<div className="weekday-wrapper">
					<div id='slider' className='swipe'>
						<div className='swipe-wrap'>
							{weekdays}
						</div>
					</div>
				</div>
			</div>
		);
	},

	handleAdvance: function () {
		var _this = this;
		if(this.state.mobileDisplaying < 6) {
			this.setState({
				mobileDisplaying: _this.state.mobileDisplaying + 1
			})
			window.weekdaySwipe.next();
		}
	},

	componentDidMount: function () {
		// Add swipe events if below breakpoint and listen for changes to kill and add appropriately
		var _this = this;

		var bodyWidth = $("body").width();
		if ( bodyWidth < 1024 ) {
			window.weekdaySwipe = new Swipe(document.getElementById('slider'), {
					startSlide: 0,
					speed: 400,
					continuous: false,
					disableScroll: false,
					stopPropagation: false,
					callback: function(index, elem) {},
					transitionEnd: function(index, elem) {}
			});
		}

		$(window).resize(function() {

    		var bodyWidth = $('body').width();

   			 if ( bodyWidth < 1040 && !window.weekdaySwipe ) {

	   			window.weekdaySwipe = new Swipe(document.getElementById('slider'), {
					startSlide: 0,
					speed: 400,
					continuous: false,
					disableScroll: false,
					stopPropagation: false,
					callback: function(index, elem) {},
					transitionEnd: function(index, elem) {}
				});

			} else if(bodyWidth > 1040 && window.weekdaySwipe) {

        		window.weekdaySwipe.kill();
        		window.weekdaySwipe = null;
        		_this.setState({
        			mobileDisplaying: 0
        		})
    		}
		});
	},

	handleBack: function () {
		var _this = this;
		if(this.state.mobileDisplaying > 0) {
			this.setState({
				mobileDisplaying: _this.state.mobileDisplaying - 1
			})
			window.weekdaySwipe.prev();
		}
	}
});

module.exports = WeeklyView;