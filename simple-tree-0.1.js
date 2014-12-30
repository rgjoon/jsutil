function SimpleTree(o) {
	var base = o || {};
	var makeLevel = function(data) {
		for( var i = 0; i < (data.items || []).length; i++ ) {
			var $category = $([
				'<div>',
					'<div>',
						'<div class="switch" style="float:left;padding:5px"></div>',
						'<div class="tree-menu" style="margin-left:20px;padding:5px;">',
							data.items[i].title,
						'</div>',
					'</div>',
				'</div>'
			].join(''));

			data.$parent.append($category);

			$('.tree-menu', $category).click((function(item) {
				return function() {
					if( data.select ) {
						data.select(item);
					}
				}
			})(data.items[i])).mouseenter(function() {
				$(this).css({
					'cursor' : 'pointer',
					'text-decoration' : 'underline'
				});
			}).mouseleave(function() {
				$(this).css({
					'cursor' : 'auto',
					'text-decoration' : 'none'
				});
			});

			if( data.items[i].child ) {
				$('.switch', $category).text('+').click((function($category) {
					return function() {
						var $child = $('.child:first', $category);

						if( $child.css('display') === 'block' ) {
							$(this).text('+');
							$child.slideUp(100);
						}
						else {
							$(this).text('-');
							$child.slideDown(100);
						}
					};
				})($category)).mouseenter(function() {
					$(this).css('cursor', 'pointer');
				}).mouseleave(function() {
					$(this).css('cursor', 'auto');
				});

				var $children = $('<div class="child" style="display:none;margin-left:20px"></div>').appendTo($category);
				makeLevel({
					$parent : $children,
					items : data.items[i].child,
					select : data.select
				});
			}
		}
	}

	base.$root = $('<div style="overflow:auto;width:100%;height:100%;margin:0;padding:0"></div>');

	return {
		append : function($root) {
			$root.append(base.$root);
		}, 

		load : function(data) {
			base.items = (data || {}).items || [];

			base.$root.empty();
			makeLevel({
				$parent : base.$root,
				items : base.items,
				select : data.select
			});
		}
	}
};