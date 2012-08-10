define(['underscore', 'backbone'], function (_, Backbone) {
	return {
		init: function () {
			Backbone.View.prototype.close = function () {
				this.remove();
				this.unbind();

				if (typeof this.onClose === 'function') {
					this.onClose();
				}
			};

			Backbone.View.prototype.onRenderComplete = function(callback) {
				if (typeof callback === 'function') {
					callback.call(this);
				}
			};

			Backbone.View.prototype.rendering = function (callback) {
				var that = this;
				_.defer(function () {
					that.onRenderComplete(callback);
				});
			};
		}
	};
});