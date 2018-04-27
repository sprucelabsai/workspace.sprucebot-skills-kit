'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
function postMessage(message) {
	return window.parent.postMessage(JSON.stringify(message), '*');
}

exports.default = {
	height: 0,
	forceAuth: function forceAuth() {
		postMessage('Skill:ForceAuth');
	},
	resized: function resized() {
		var height = 0;

		var body = document.body;
		var docEl = document.documentElement;

		var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
		var clientTop = docEl.clientTop || body.clientTop || 0;
		var top = scrollTop - clientTop;
		var height = top + body.scrollHeight;

		if (height != this.height) {
			this.height = height;
			postMessage({
				name: 'Skill:Resized',
				height: height
			});
		}
	},
	back: function back() {
		postMessage('Skill:Back');
	},
	ready: function ready() {
		this.resized();
		postMessage({
			name: 'Skill:Loaded',
			url: window.location.href
		});
		this.resizedInterval = setInterval(this.resized.bind(this), 300);
	},
	scrollTo: function scrollTo(offset) {
		postMessage({ name: 'Skill:ScrollTo', offset: offset || 0 });
	}
};