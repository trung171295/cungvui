(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		root.jquery_mmenu_all_js = factory(root.jQuery);
	}
})(this, function(jQuery) {
	/*!
	 * jQuery mmenu v7.3.2
	 * @requires jQuery 1.7.0 or later
	 *
	 * mmenujs.com
	 *
	 * Copyright (c) Fred Heusschen
	 * www.frebsite.nl
	 *
	 * License: CC-BY-NC-4.0
	 * http://creativecommons.org/licenses/by-nc/4.0/
	 */
	!(function(t) {
		var e,
			n,
			i,
			s,
			a,
			r = 'mmenu';
		(t[r] && t[r].version > '7.3.2') ||
			((t[r] = function(t, e, n) {
				return (
					(this.$menu = t),
					(this._api = [
						'bind',
						'getInstance',
						'initPanels',
						'openPanel',
						'closePanel',
						'closeAllPanels',
						'setSelected',
					]),
					(this.opts = e),
					(this.conf = n),
					(this.vars = {}),
					(this.cbck = {}),
					(this.mtch = {}),
					'function' == typeof this.___deprecated && this.___deprecated(),
					this._initWrappers(),
					this._initAddons(),
					this._initExtensions(),
					this._initHooks(),
					this._initMenu(),
					this._initPanels(),
					this._initOpened(),
					this._initAnchors(),
					this._initMatchMedia(),
					'function' == typeof this.___debug && this.___debug(),
					this
				);
			}),
			(t[r].version = '7.3.2'),
			(t[r].uniqueId = 0),
			(t[r].wrappers = {}),
			(t[r].addons = {}),
			(t[r].defaults = {
				hooks: {},
				extensions: [],
				wrappers: [],
				navbar: { add: !0, title: '<img src="images/logo/logo.png">', titleLink: 'parent' },
				onClick: { setSelected: !0 },
				slidingSubmenus: !0,
			}),
			(t[r].configuration = {
				classNames: {
					divider: 'Divider',
					inset: 'Inset',
					nolistview: 'NoListview',
					nopanel: 'NoPanel',
					panel: 'Panel',
					selected: 'Selected',
					spacer: 'Spacer',
					vertical: 'Vertical',
				},
				clone: !1,
				language: null,
				openingInterval: 25,
				panelNodetype: 'ul, ol, div',
				transitionDuration: 400,
			}),
			(t[r].prototype = {
				getInstance: function() {
					return this;
				},
				initPanels: function(t) {
					this._initPanels(t);
				},
				openPanel: function(e, s) {
					if (
						(this.trigger('openPanel:before', e),
						e && e.length && (e.is('.' + n.panel) || (e = e.closest('.' + n.panel)), e.is('.' + n.panel)))
					) {
						var a = this;
						if (('boolean' != typeof s && (s = !0), e.parent('.' + n.listitem + '_vertical').length))
							e
								.parents('.' + n.listitem + '_vertical')
								.addClass(n.listitem + '_opened')
								.children('.' + n.panel)
								.removeClass(n.hidden),
								this.openPanel(
									e
										.parents('.' + n.panel)
										.not(function() {
											return t(this).parent('.' + n.listitem + '_vertical').length;
										})
										.first()
								),
								this.trigger('openPanel:start', e),
								this.trigger('openPanel:finish', e);
						else {
							if (e.hasClass(n.panel + '_opened')) return;
							var l = this.$pnls.children('.' + n.panel),
								o = this.$pnls.children('.' + n.panel + '_opened');
							if (!t[r].support.csstransitions)
								return (
									o.addClass(n.hidden).removeClass(n.panel + '_opened'),
									e.removeClass(n.hidden).addClass(n.panel + '_opened'),
									this.trigger('openPanel:start', e),
									void this.trigger('openPanel:finish', e)
								);
							l.not(e).removeClass(n.panel + '_opened-parent');
							for (var d = e.data(i.parent); d; )
								(d = d.closest('.' + n.panel)).parent('.' + n.listitem + '_vertical').length ||
									d.addClass(n.panel + '_opened-parent'),
									(d = d.data(i.parent));
							l
								.removeClass(n.panel + '_highest')
								.not(o)
								.not(e)
								.addClass(n.hidden),
								e.removeClass(n.hidden);
							var c = function() {
									o.removeClass(n.panel + '_opened'),
										e.addClass(n.panel + '_opened'),
										e.hasClass(n.panel + '_opened-parent')
											? (o.addClass(n.panel + '_highest'),
											  e.removeClass(n.panel + '_opened-parent'))
											: (o.addClass(n.panel + '_opened-parent'),
											  e.addClass(n.panel + '_highest')),
										a.trigger('openPanel:start', e);
								},
								h = function() {
									o.removeClass(n.panel + '_highest').addClass(n.hidden),
										e.removeClass(n.panel + '_highest'),
										a.trigger('openPanel:finish', e);
								};
							s && !e.hasClass(n.panel + '_noanimation')
								? setTimeout(function() {
										a.__transitionend(
											e,
											function() {
												h();
											},
											a.conf.transitionDuration
										),
											c();
								  }, a.conf.openingInterval)
								: (c(), h());
						}
						this.trigger('openPanel:after', e);
					}
				},
				closePanel: function(t) {
					this.trigger('closePanel:before', t);
					var e = t.parent();
					e.hasClass(n.listitem + '_vertical') &&
						(e.removeClass(n.listitem + '_opened'), t.addClass(n.hidden), this.trigger('closePanel', t)),
						this.trigger('closePanel:after', t);
				},
				closeAllPanels: function(t) {
					this.trigger('closeAllPanels:before'),
						this.$pnls
							.find('.' + n.listview)
							.children()
							.removeClass(n.listitem + '_selected')
							.filter('.' + n.listitem + '_vertical')
							.removeClass(n.listitem + '_opened');
					var e = this.$pnls.children('.' + n.panel),
						i = t && t.length ? t : e.first();
					this.$pnls
						.children('.' + n.panel)
						.not(i)
						.removeClass(n.panel + '_opened')
						.removeClass(n.panel + '_opened-parent')
						.removeClass(n.panel + '_highest')
						.addClass(n.hidden),
						this.openPanel(i, !1),
						this.trigger('closeAllPanels:after');
				},
				togglePanel: function(t) {
					var e = t.parent();
					e.hasClass(n.listitem + '_vertical') &&
						this[e.hasClass(n.listitem + '_opened') ? 'closePanel' : 'openPanel'](t);
				},
				setSelected: function(t) {
					this.trigger('setSelected:before', t),
						this.$menu.find('.' + n.listitem + '_selected').removeClass(n.listitem + '_selected'),
						t.addClass(n.listitem + '_selected'),
						this.trigger('setSelected:after', t);
				},
				bind: function(t, e) {
					(this.cbck[t] = this.cbck[t] || []), this.cbck[t].push(e);
				},
				trigger: function() {
					var t = Array.prototype.slice.call(arguments),
						e = t.shift();
					if (this.cbck[e])
						for (var n = 0, i = this.cbck[e].length; n < i; n++) this.cbck[e][n].apply(this, t);
				},
				matchMedia: function(t, e, n) {
					var i = { yes: e, no: n };
					(this.mtch[t] = this.mtch[t] || []), this.mtch[t].push(i);
				},
				i18n: function(e) {
					return t[r].i18n(e, this.conf.language);
				},
				_initHooks: function() {
					for (var t in this.opts.hooks) this.bind(t, this.opts.hooks[t]);
				},
				_initWrappers: function() {
					this.trigger('initWrappers:before');
					for (var e = 0; e < this.opts.wrappers.length; e++) {
						var n = t[r].wrappers[this.opts.wrappers[e]];
						'function' == typeof n && n.call(this);
					}
					this.trigger('initWrappers:after');
				},
				_initAddons: function() {
					var e;
					for (e in (this.trigger('initAddons:before'), t[r].addons))
						t[r].addons[e].add.call(this), (t[r].addons[e].add = function() {});
					for (e in t[r].addons) t[r].addons[e].setup.call(this);
					this.trigger('initAddons:after');
				},
				_initExtensions: function() {
					this.trigger('initExtensions:before');
					var t = this;
					for (var e in (this.opts.extensions.constructor === Array &&
						(this.opts.extensions = { all: this.opts.extensions }),
					this.opts.extensions))
						(this.opts.extensions[e] = this.opts.extensions[e].length
							? n.menu + '_' + this.opts.extensions[e].join(' ' + n.menu + '_')
							: ''),
							this.opts.extensions[e] &&
								(function(e) {
									t.matchMedia(
										e,
										function() {
											this.$menu.addClass(this.opts.extensions[e]);
										},
										function() {
											this.$menu.removeClass(this.opts.extensions[e]);
										}
									);
								})(e);
					this.trigger('initExtensions:after');
				},
				_initMenu: function() {
					this.trigger('initMenu:before');
					this.conf.clone &&
						((this.$orig = this.$menu),
						(this.$menu = this.$orig.clone()),
						this.$menu
							.add(this.$menu.find('[id]'))
							.filter('[id]')
							.each(function() {
								t(this).attr('id', n.mm(t(this).attr('id')));
							})),
						this.$menu.attr('id', this.$menu.attr('id') || this.__getUniqueId()),
						(this.$pnls = t('<div class="' + n.panels + '" />')
							.append(this.$menu.children(this.conf.panelNodetype))
							.prependTo(this.$menu)),
						this.$menu
							.addClass(n.menu)
							.parent()
							.addClass(n.wrapper),
						this.trigger('initMenu:after');
				},
				_initPanels: function(e) {
					this.trigger('initPanels:before', e), (e = e || this.$pnls.children(this.conf.panelNodetype));
					var i = t(),
						s = this,
						a = function(e) {
							e.filter(s.conf.panelNodetype).each(function(e) {
								var r = s._initPanel(t(this));
								if (r) {
									s._initNavbar(r), s._initListview(r), (i = i.add(r));
									var l = r
										.children('.' + n.listview)
										.children('li')
										.children(s.conf.panelNodetype)
										.add(r.children('.' + s.conf.classNames.panel));
									l.length && a(l);
								}
							});
						};
					a(e), this.trigger('initPanels:after', i);
				},
				_initPanel: function(t) {
					this.trigger('initPanel:before', t);
					if (t.hasClass(n.panel)) return t;
					if (
						(this.__refactorClass(t, this.conf.classNames.panel, n.panel),
						this.__refactorClass(t, this.conf.classNames.nopanel, n.nopanel),
						this.__refactorClass(t, this.conf.classNames.inset, n.listview + '_inset'),
						t.filter('.' + n.listview + '_inset').addClass(n.nopanel),
						t.hasClass(n.nopanel))
					)
						return !1;
					var e = t.hasClass(this.conf.classNames.vertical) || !this.opts.slidingSubmenus;
					t.removeClass(this.conf.classNames.vertical);
					var s = t.attr('id') || this.__getUniqueId();
					t.is('ul, ol') && (t.removeAttr('id'), t.wrap('<div />'), (t = t.parent())),
						t.attr('id', s),
						t.addClass(n.panel + ' ' + n.hidden);
					var a = t.parent('li');
					return (
						e ? a.addClass(n.listitem + '_vertical') : t.appendTo(this.$pnls),
						a.length && (a.data(i.child, t), t.data(i.parent, a)),
						this.trigger('initPanel:after', t),
						t
					);
				},
				_initNavbar: function(e) {
					if ((this.trigger('initNavbar:before', e), !e.children('.' + n.navbar).length)) {
						var s = e.data(i.parent),
							a = t('<div class="' + n.navbar + '" />'),
							r = this.__getPanelTitle(e, this.opts.navbar.title),
							l = '';
						if (s && s.length) {
							if (s.hasClass(n.listitem + '_vertical')) return;
							if (s.parent().is('.' + n.listview))
								var o = s.children('a, span').not('.' + n.btn + '_next');
							else o = s.closest('.' + n.panel).find('a[href="#' + e.attr('id') + '"]');
							var d = (s = (o = o.first()).closest('.' + n.panel)).attr('id');
							switch (
								((r = this.__getPanelTitle(e, t('<span>' + o.text() + '</span>').text())),
								this.opts.navbar.titleLink)
							) {
								case 'anchor':
									l = o.attr('href') || '';
									break;
								case 'parent':
									l = '#' + d;
							}
							a.append(
								'<a class="' + n.btn + ' ' + n.btn + '_prev ' + n.navbar + '__btn" href="#' + d + '" />'
							);
						} else if (!this.opts.navbar.title) return;
						this.opts.navbar.add && e.addClass(n.panel + '_has-navbar'),
							a
								.append(
									'<a class="' +
										n.navbar +
										'__title"' +
										(l.length ? ' href="' + l + '"' : '') +
										'>' +
										r +
										'</a>'
								)
								.prependTo(e),
							this.trigger('initNavbar:after', e);
					}
				},
				_initListview: function(e) {
					this.trigger('initListview:before', e);
					var s = this.__childAddBack(e, 'ul, ol');
					this.__refactorClass(s, this.conf.classNames.nolistview, n.nolistview);
					var a = s
						.not('.' + n.nolistview)
						.addClass(n.listview)
						.children()
						.addClass(n.listitem);
					this.__refactorClass(a, this.conf.classNames.selected, n.listitem + '_selected'),
						this.__refactorClass(a, this.conf.classNames.divider, n.listitem + '_divider'),
						this.__refactorClass(a, this.conf.classNames.spacer, n.listitem + '_spacer'),
						a
							.children('a, span')
							.not('.' + n.btn)
							.addClass(n.listitem + '__text');
					var r = e.data(i.parent);
					if (r && r.is('.' + n.listitem) && !r.children('.' + n.btn).length) {
						var l = r.children('a, span').first(),
							o = t(
								'<a class="' +
									n.btn +
									' ' +
									n.btn +
									'_next ' +
									n.listitem +
									'__btn" href="#' +
									e.attr('id') +
									'" />'
							);
						o.insertAfter(l),
							l.is('span') && (o.addClass(n.listitem + '__text').html(l.html()), l.remove());
					}
					this.trigger('initListview:after', e);
				},
				_initOpened: function() {
					this.trigger('initOpened:before');
					var t = this.$pnls
							.find('.' + n.listitem + '_selected')
							.removeClass(n.listitem + '_selected')
							.last()
							.addClass(n.listitem + '_selected'),
						e = t.length ? t.closest('.' + n.panel) : this.$pnls.children('.' + n.panel).first();
					this.openPanel(e, !1), this.trigger('initOpened:after');
				},
				_initAnchors: function() {
					this.trigger('initAnchors:before');
					var e = this;
					a.$body.on(s.click + '-oncanvas', 'a[href]', function(i) {
						var s = t(this),
							a = s.attr('href'),
							l = e.$menu.find(s).length,
							o = s.is('.' + n.listitem + ' > a'),
							d = s.is('[rel="external"]') || s.is('[target="_blank"]');
						if (l && a.length > 1 && '#' == a.slice(0, 1))
							try {
								var c = e.$menu.find(a);
								if (c.is('.' + n.panel))
									return (
										e[s.parent().hasClass(n.listitem + '_vertical') ? 'togglePanel' : 'openPanel'](
											c
										),
										void i.preventDefault()
									);
							} catch (t) {}
						var h = { close: null, setSelected: null, preventDefault: '#' == a.slice(0, 1) };
						for (var p in t[r].addons) {
							var f = t[r].addons[p].clickAnchor.call(e, s, l, o, d);
							if (f) {
								if ('boolean' == typeof f) return void i.preventDefault();
								'object' == typeof f && (h = t.extend({}, h, f));
							}
						}
						l &&
							o &&
							!d &&
							(e.__valueOrFn(s, e.opts.onClick.setSelected, h.setSelected) &&
								e.setSelected(t(i.target).parent()),
							e.__valueOrFn(s, e.opts.onClick.preventDefault, h.preventDefault) && i.preventDefault(),
							e.__valueOrFn(s, e.opts.onClick.close, h.close) &&
								e.opts.offCanvas &&
								'function' == typeof e.close &&
								e.close());
					}),
						this.trigger('initAnchors:after');
				},
				_initMatchMedia: function() {
					var t = this;
					for (var e in this.mtch)
						!(function() {
							var n = e,
								i = window.matchMedia(n);
							t._fireMatchMedia(n, i),
								i.addListener(function(e) {
									t._fireMatchMedia(n, e);
								});
						})();
				},
				_fireMatchMedia: function(t, e) {
					for (var n = e.matches ? 'yes' : 'no', i = 0; i < this.mtch[t].length; i++)
						this.mtch[t][i][n].call(this);
				},
				_getOriginalMenuId: function() {
					var t = this.$menu.attr('id');
					return this.conf.clone && t && t.length && (t = n.umm(t)), t;
				},
				__api: function() {
					var e = this,
						n = {};
					return (
						t.each(this._api, function(t) {
							var i = this;
							n[i] = function() {
								var t = e[i].apply(e, arguments);
								return void 0 === t ? n : t;
							};
						}),
						n
					);
				},
				__valueOrFn: function(t, e, n) {
					if ('function' == typeof e) {
						var i = e.call(t[0]);
						if (void 0 !== i) return i;
					}
					return ('function' != typeof e && void 0 !== e) || void 0 === n ? e : n;
				},
				__getPanelTitle: function(e, n) {
					var s;
					return (
						'function' == typeof this.opts.navbar.title && (s = this.opts.navbar.title.call(e[0])),
						void 0 === s && (s = e.data(i.title)),
						void 0 !== s ? s : 'string' == typeof n ? this.i18n(n) : this.i18n(t[r].defaults.navbar.title)
					);
				},
				__refactorClass: function(t, e, n) {
					return t
						.filter('.' + e)
						.removeClass(e)
						.addClass(n);
				},
				__findAddBack: function(t, e) {
					return t.find(e).add(t.filter(e));
				},
				__childAddBack: function(t, e) {
					return t.children(e).add(t.filter(e));
				},
				__filterListItems: function(t) {
					return t.not('.' + n.listitem + '_divider').not('.' + n.hidden);
				},
				__filterListItemAnchors: function(t) {
					return this.__filterListItems(t)
						.children('a')
						.not('.' + n.btn + '_next');
				},
				__openPanelWoAnimation: function(t) {
					t.hasClass(n.panel + '_noanimation') ||
						(t.addClass(n.panel + '_noanimation'),
						this.__transitionend(
							t,
							function() {
								t.removeClass(n.panel + '_noanimation');
							},
							this.conf.openingInterval
						),
						this.openPanel(t));
				},
				__transitionend: function(t, e, n) {
					var i = !1,
						a = function(n) {
							(void 0 !== n && n.target != t[0]) ||
								(i || (t.off(s.transitionend), t.off(s.webkitTransitionEnd), e.call(t[0])), (i = !0));
						};
					t.on(s.transitionend, a), t.on(s.webkitTransitionEnd, a), setTimeout(a, 1.1 * n);
				},
				__getUniqueId: function() {
					return n.mm(t[r].uniqueId++);
				},
			}),
			(t.fn[r] = function(e, l) {
				!(function() {
					if (t[r].glbl) return;
					(a = { $wndw: t(window), $docu: t(document), $html: t('html'), $body: t('body') }),
						(n = {}),
						(i = {}),
						(s = {}),
						t.each([n, i, s], function(t, e) {
							e.add = function(t) {
								t = t.split(' ');
								for (var n = 0, i = t.length; n < i; n++) e[t[n]] = e.mm(t[n]);
							};
						}),
						(n.mm = function(t) {
							return 'mm-' + t;
						}),
						n.add('wrapper menu panels panel nopanel navbar listview nolistview listitem btn hidden'),
						(n.umm = function(t) {
							return 'mm-' == t.slice(0, 3) && (t = t.slice(3)), t;
						}),
						(i.mm = function(t) {
							return 'mm-' + t;
						}),
						i.add('parent child title'),
						(s.mm = function(t) {
							return t + '.mm';
						}),
						s.add(
							'transitionend webkitTransitionEnd click scroll resize keydown mousedown mouseup touchstart touchmove touchend orientationchange'
						),
						(t[r]._c = n),
						(t[r]._d = i),
						(t[r]._e = s),
						(t[r].glbl = a);
				})();
				var o = t();
				return (
					this.each(function() {
						var n = t(this);
						if (!n.data(r)) {
							var i = jQuery.extend(!0, {}, t[r].defaults, e),
								s = jQuery.extend(!0, {}, t[r].configuration, l),
								a = new t[r](n, i, s);
							a.$menu.data(r, a.__api()), (o = o.add(a.$menu));
						}
					}),
					o
				);
			}),
			(t[r].i18n = ((e = {}),
			function(n, i) {
				switch (typeof n) {
					case 'object':
						return 'string' == typeof i && (void 0 === e[i] && (e[i] = {}), t.extend(e[i], n)), e;
					case 'string':
						return ('string' == typeof i && void 0 !== e[i] && e[i][n]) || n;
					case 'undefined':
					default:
						return e;
				}
			})),
			(t[r].support = {
				touch: 'ontouchstart' in window || navigator.msMaxTouchPoints || !1,
				csstransitions:
					'undefined' == typeof Modernizr || void 0 === Modernizr.csstransitions || Modernizr.csstransitions,
			}));
	})(jQuery);
	!(function(e) {
		var t,
			n,
			i,
			o,
			r = 'offCanvas';
		(e.mmenu.addons[r] = {
			setup: function() {
				if (this.opts[r]) {
					var n = this.opts[r],
						i = this.conf[r];
					(o = e.mmenu.glbl),
						(this._api = e.merge(this._api, ['open', 'close', 'setPage'])),
						'object' != typeof n && (n = {}),
						(n = this.opts[r] = e.extend(!0, {}, e.mmenu.defaults[r], n)),
						'string' != typeof i.page.selector && (i.page.selector = '> ' + i.page.nodetype),
						(this.vars.opened = !1);
					var s = [t.menu + '_offcanvas'];
					this.bind('initMenu:after', function() {
						var e = this;
						this._initBlocker(),
							this.setPage(o.$page),
							this._initWindow_offCanvas(),
							this.$menu
								.addClass(s.join(' '))
								.parent('.' + t.wrapper)
								.removeClass(t.wrapper),
							this.$menu[i.menu.insertMethod](i.menu.insertSelector);
						var n = window.location.hash;
						if (n) {
							var r = this._getOriginalMenuId();
							r &&
								r == n.slice(1) &&
								setTimeout(function() {
									e.open();
								}, 1e3);
						}
					}),
						this.bind('setPage:after', function(e) {
							o.$blck && o.$blck.children('a').attr('href', '#' + e.attr('id'));
						}),
						this.bind('open:start:sr-aria', function() {
							this.__sr_aria(this.$menu, 'hidden', !1);
						}),
						this.bind('close:finish:sr-aria', function() {
							this.__sr_aria(this.$menu, 'hidden', !0);
						}),
						this.bind('initMenu:after:sr-aria', function() {
							this.__sr_aria(this.$menu, 'hidden', !0);
						}),
						this.bind('initBlocker:after:sr-text', function() {
							o.$blck
								.children('a')
								.html(this.__sr_text(this.i18n(this.conf.screenReader.text.closeMenu)));
						});
				}
			},
			add: function() {
				(t = e.mmenu._c),
					(n = e.mmenu._d),
					(i = e.mmenu._e),
					t.add('slideout page no-csstransforms3d'),
					n.add('style');
			},
			clickAnchor: function(e, n) {
				var i = this;
				if (this.opts[r]) {
					var s = this._getOriginalMenuId();
					if (s && e.is('[href="#' + s + '"]')) {
						if (n) return this.open(), !0;
						var a = e.closest('.' + t.menu);
						if (a.length) {
							var p = a.data('mmenu');
							if (p && p.close)
								return (
									p.close(),
									i.__transitionend(
										a,
										function() {
											i.open();
										},
										i.conf.transitionDuration
									),
									!0
								);
						}
						return this.open(), !0;
					}
					if (o.$page)
						return (s = o.$page.first().attr('id')) && e.is('[href="#' + s + '"]')
							? (this.close(), !0)
							: void 0;
				}
			},
		}),
			(e.mmenu.defaults[r] = { blockUI: !0, moveBackground: !0 }),
			(e.mmenu.configuration[r] = {
				menu: { insertMethod: 'prependTo', insertSelector: 'body' },
				page: { nodetype: 'div', selector: null, noSelector: [], wrapIfNeeded: !0 },
			}),
			(e.mmenu.prototype.open = function() {
				if ((this.trigger('open:before'), !this.vars.opened)) {
					var e = this;
					this._openSetup(),
						setTimeout(function() {
							e._openFinish();
						}, this.conf.openingInterval),
						this.trigger('open:after');
				}
			}),
			(e.mmenu.prototype._openSetup = function() {
				var s = this,
					a = this.opts[r];
				this.closeAllOthers(),
					o.$page.each(function() {
						e(this).data(n.style, e(this).attr('style') || '');
					}),
					o.$wndw.trigger(i.resize + '-' + r, [!0]);
				var p = [t.wrapper + '_opened'];
				a.blockUI && p.push(t.wrapper + '_blocking'),
					'modal' == a.blockUI && p.push(t.wrapper + '_modal'),
					a.moveBackground && p.push(t.wrapper + '_background'),
					o.$html.addClass(p.join(' ')),
					setTimeout(function() {
						s.vars.opened = !0;
					}, this.conf.openingInterval),
					this.$menu.addClass(t.menu + '_opened');
			}),
			(e.mmenu.prototype._openFinish = function() {
				var e = this;
				this.__transitionend(
					o.$page.first(),
					function() {
						e.trigger('open:finish');
					},
					this.conf.transitionDuration
				),
					this.trigger('open:start'),
					o.$html.addClass(t.wrapper + '_opening');
			}),
			(e.mmenu.prototype.close = function() {
				if ((this.trigger('close:before'), this.vars.opened)) {
					var i = this;
					this.__transitionend(
						o.$page.first(),
						function() {
							i.$menu.removeClass(t.menu + '_opened');
							var r = [
								t.wrapper + '_opened',
								t.wrapper + '_blocking',
								t.wrapper + '_modal',
								t.wrapper + '_background',
							];
							o.$html.removeClass(r.join(' ')),
								o.$page.each(function() {
									var t = e(this).data(n.style);
									e(this).attr('style', t);
								}),
								(i.vars.opened = !1),
								i.trigger('close:finish');
						},
						this.conf.transitionDuration
					),
						this.trigger('close:start'),
						o.$html.removeClass(t.wrapper + '_opening'),
						this.trigger('close:after');
				}
			}),
			(e.mmenu.prototype.closeAllOthers = function() {
				o.$body
					.find('.' + t.menu + '_offcanvas')
					.not(this.$menu)
					.each(function() {
						var t = e(this).data('mmenu');
						t && t.close && t.close();
					});
			}),
			(e.mmenu.prototype.setPage = function(n) {
				this.trigger('setPage:before', n);
				var i = this,
					s = this.conf[r];
				(n && n.length) ||
					((n = o.$body
						.find(s.page.selector)
						.not('.' + t.menu)
						.not('.' + t.wrapper + '__blocker')),
					s.page.noSelector.length && (n = n.not(s.page.noSelector.join(', '))),
					n.length > 1 &&
						s.page.wrapIfNeeded &&
						(n = n.wrapAll('<' + this.conf[r].page.nodetype + ' />').parent())),
					n.addClass(t.page + ' ' + t.slideout).each(function() {
						e(this).attr('id', e(this).attr('id') || i.__getUniqueId());
					}),
					(o.$page = n),
					this.trigger('setPage:after', n);
			}),
			(e.mmenu.prototype._initWindow_offCanvas = function() {
				o.$wndw.off(i.keydown + '-' + r).on(i.keydown + '-' + r, function(e) {
					if (o.$html.hasClass(t.wrapper + '_opened') && 9 == e.keyCode) return e.preventDefault(), !1;
				});
				var e = 0;
				o.$wndw.off(i.resize + '-' + r).on(i.resize + '-' + r, function(n, i) {
					if (1 == o.$page.length && (i || o.$html.hasClass(t.wrapper + '_opened'))) {
						var r = o.$wndw.height();
						(i || r != e) && ((e = r), o.$page.css('minHeight', r));
					}
				});
			}),
			(e.mmenu.prototype._initBlocker = function() {
				var n = this,
					s = this.opts[r],
					a = this.conf[r];
				this.trigger('initBlocker:before'),
					s.blockUI &&
						(o.$blck ||
							(o.$blck = e('<div class="' + t.wrapper + '__blocker ' + t.slideout + '" />').append(
								'<a />'
							)),
						o.$blck
							.appendTo(a.menu.insertSelector)
							.off(i.touchstart + '-' + r + ' ' + i.touchmove + '-' + r)
							.on(i.touchstart + '-' + r + ' ' + i.touchmove + '-' + r, function(e) {
								e.preventDefault(), e.stopPropagation(), o.$blck.trigger(i.mousedown + '-' + r);
							})
							.off(i.mousedown + '-' + r)
							.on(i.mousedown + '-' + r, function(e) {
								e.preventDefault(),
									o.$html.hasClass(t.wrapper + '_modal') || (n.closeAllOthers(), n.close());
							}),
						this.trigger('initBlocker:after'));
			});
	})(jQuery);
	!(function(t) {
		var i,
			n,
			e = 'screenReader';
		(t.mmenu.addons[e] = {
			setup: function() {
				var r = this,
					a = this.opts[e],
					s = this.conf[e];
				t.mmenu.glbl,
					'boolean' == typeof a && (a = { aria: a, text: a }),
					'object' != typeof a && (a = {}),
					(a = this.opts[e] = t.extend(!0, {}, t.mmenu.defaults[e], a)).aria &&
						(this.bind('initAddons:after', function() {
							this.bind('initMenu:after', function() {
								this.trigger('initMenu:after:sr-aria');
							}),
								this.bind('initNavbar:after', function() {
									this.trigger('initNavbar:after:sr-aria', arguments[0]);
								}),
								this.bind('openPanel:start', function() {
									this.trigger('openPanel:start:sr-aria', arguments[0]);
								}),
								this.bind('close:start', function() {
									this.trigger('close:start:sr-aria');
								}),
								this.bind('close:finish', function() {
									this.trigger('close:finish:sr-aria');
								}),
								this.bind('open:start', function() {
									this.trigger('open:start:sr-aria');
								}),
								this.bind('initOpened:after', function() {
									this.trigger('initOpened:after:sr-aria');
								});
						}),
						this.bind('updateListview', function() {
							this.$pnls
								.find('.' + i.listview)
								.children()
								.each(function() {
									r.__sr_aria(t(this), 'hidden', t(this).is('.' + i.hidden));
								});
						}),
						this.bind('openPanel:start', function(t) {
							var n = this.$menu
									.find('.' + i.panel)
									.not(t)
									.not(t.parents('.' + i.panel)),
								e = t.add(
									t
										.find('.' + i.listitem + '_vertical .' + i.listitem + '_opened')
										.children('.' + i.panel)
								);
							this.__sr_aria(n, 'hidden', !0), this.__sr_aria(e, 'hidden', !1);
						}),
						this.bind('closePanel', function(t) {
							this.__sr_aria(t, 'hidden', !0);
						}),
						this.bind('initPanels:after', function(n) {
							var e = n.find('.' + i.btn).each(function() {
								r.__sr_aria(
									t(this),
									'owns',
									t(this)
										.attr('href')
										.replace('#', '')
								);
							});
							this.__sr_aria(e, 'haspopup', !0);
						}),
						this.bind('initNavbar:after', function(t) {
							var n = t.children('.' + i.navbar);
							this.__sr_aria(n, 'hidden', !t.hasClass(i.panel + '_has-navbar'));
						}),
						a.text &&
							'parent' == this.opts.navbar.titleLink &&
							this.bind('initNavbar:after', function(t) {
								var n = t.children('.' + i.navbar),
									e = !!n.children('.' + i.btn + '_prev').length;
								this.__sr_aria(n.children('.' + i.title), 'hidden', e);
							})),
					a.text &&
						(this.bind('initAddons:after', function() {
							this.bind('setPage:after', function() {
								this.trigger('setPage:after:sr-text', arguments[0]);
							}),
								this.bind('initBlocker:after', function() {
									this.trigger('initBlocker:after:sr-text');
								});
						}),
						this.bind('initNavbar:after', function(t) {
							var n = t.children('.' + i.navbar),
								e = this.i18n(s.text.closeSubmenu);
							n.children('.' + i.btn + '_prev').html(this.__sr_text(e));
						}),
						this.bind('initListview:after', function(t) {
							var e = t.data(n.parent);
							if (e && e.length) {
								var a = e.children('.' + i.btn + '_next'),
									o = this.i18n(
										s.text[
											a.parent().is('.' + i.listitem + '_vertical')
												? 'toggleSubmenu'
												: 'openSubmenu'
										]
									);
								a.append(r.__sr_text(o));
							}
						}));
			},
			add: function() {
				(i = t.mmenu._c), (n = t.mmenu._d), t.mmenu._e, i.add('sronly');
			},
			clickAnchor: function(t, i) {},
		}),
			(t.mmenu.defaults[e] = { aria: !0, text: !0 }),
			(t.mmenu.configuration[e] = {
				text: {
					closeMenu: 'Close menu',
					closeSubmenu: 'Close submenu',
					openSubmenu: 'Open submenu',
					toggleSubmenu: 'Toggle submenu',
				},
			}),
			(t.mmenu.prototype.__sr_aria = function(t, i, n) {
				t.prop('aria-' + i, n)[n ? 'attr' : 'removeAttr']('aria-' + i, n);
			}),
			(t.mmenu.prototype.__sr_role = function(t, i) {
				t.prop('role', i)[i ? 'attr' : 'removeAttr']('role', i);
			}),
			(t.mmenu.prototype.__sr_text = function(t) {
				return '<span class="' + i.sronly + '">' + t + '</span>';
			});
	})(jQuery);
	!(function(o) {
		var t,
			n,
			e,
			r = 'scrollBugFix';
		(o.mmenu.addons[r] = {
			setup: function() {
				var n = this.opts[r];
				this.conf[r];
				(e = o.mmenu.glbl),
					o.mmenu.support.touch &&
						this.opts.offCanvas &&
						this.opts.offCanvas.blockUI &&
						('boolean' == typeof n && (n = { fix: n }),
						'object' != typeof n && (n = {}),
						(n = this.opts[r] = o.extend(!0, {}, o.mmenu.defaults[r], n)).fix &&
							(this.bind('open:start', function() {
								this.$pnls.children('.' + t.panel + '_opened').scrollTop(0);
							}),
							this.bind('initMenu:after', function() {
								this['_initWindow_' + r]();
							})));
			},
			add: function() {
				(t = o.mmenu._c), o.mmenu._d, (n = o.mmenu._e);
			},
			clickAnchor: function(o, t) {},
		}),
			(o.mmenu.defaults[r] = { fix: !0 }),
			(o.mmenu.prototype['_initWindow_' + r] = function() {
				var s = this;
				o(document)
					.off(n.touchmove + '-' + r)
					.on(n.touchmove + '-' + r, function(o) {
						e.$html.hasClass(t.wrapper + '_opened') && o.preventDefault();
					});
				var i = !1;
				e.$body
					.off(n.touchstart + '-' + r)
					.on(n.touchstart + '-' + r, '.' + t.panels + '> .' + t.panel, function(o) {
						e.$html.hasClass(t.wrapper + '_opened') &&
							(i ||
								((i = !0),
								0 === o.currentTarget.scrollTop
									? (o.currentTarget.scrollTop = 1)
									: o.currentTarget.scrollHeight ===
											o.currentTarget.scrollTop + o.currentTarget.offsetHeight &&
									  (o.currentTarget.scrollTop -= 1),
								(i = !1)));
					})
					.off(n.touchmove + '-' + r)
					.on(n.touchmove + '-' + r, '.' + t.panels + '> .' + t.panel, function(n) {
						e.$html.hasClass(t.wrapper + '_opened') &&
							o(this)[0].scrollHeight > o(this).innerHeight() &&
							n.stopPropagation();
					}),
					e.$wndw.off(n.orientationchange + '-' + r).on(n.orientationchange + '-' + r, function() {
						s.$pnls
							.children('.' + t.panel + '_opened')
							.scrollTop(0)
							.css({ '-webkit-overflow-scrolling': 'auto' })
							.css({ '-webkit-overflow-scrolling': 'touch' });
					});
			});
	})(jQuery);
	!(function(t) {
		var e,
			i = 'autoHeight';
		(t.mmenu.addons[i] = {
			setup: function() {
				var n = this.opts[i];
				this.conf[i];
				if (
					(t.mmenu.glbl,
					'boolean' == typeof n && n && (n = { height: 'auto' }),
					'string' == typeof n && (n = { height: n }),
					'object' != typeof n && (n = {}),
					'auto' == (n = this.opts[i] = t.extend(!0, {}, t.mmenu.defaults[i], n)).height ||
						'highest' == n.height)
				) {
					this.bind('initMenu:after', function() {
						this.$menu.addClass(e.menu + '_autoheight');
					});
					var h = function(i) {
						if (!this.opts.offCanvas || this.vars.opened) {
							var h = Math.max(parseInt(this.$pnls.css('top'), 10), 0) || 0,
								s = Math.max(parseInt(this.$pnls.css('bottom'), 10), 0) || 0,
								a = 0;
							this.$menu.addClass(e.menu + '_autoheight-measuring'),
								'auto' == n.height
									? ((i = i || this.$pnls.children('.' + e.panel + '_opened')).parent(
											'.' + e.listitem + '_vertical'
									  ).length &&
											(i = i.parents('.' + e.panel).not(function() {
												return t(this).parent('.' + e.listitem + '_vertical').length;
											})),
									  i.length || (i = this.$pnls.children('.' + e.panel)),
									  (a = i.first().outerHeight()))
									: 'highest' == n.height &&
									  this.$pnls.children('.' + e.panel).each(function() {
											var i = t(this);
											i.parent('.' + e.listitem + '_vertical').length &&
												(i = i.parents('.' + e.panel).not(function() {
													return t(this).parent('.' + e.listitem + '_vertical').length;
												})),
												(a = Math.max(a, i.first().outerHeight()));
									  }),
								this.$menu.height(a + h + s).removeClass(e.menu + '_autoheight-measuring');
						}
					};
					this.opts.offCanvas && this.bind('open:start', h),
						'highest' == n.height && this.bind('initPanels:after', h),
						'auto' == n.height &&
							(this.bind('updateListview', h),
							this.bind('openPanel:start', h),
							this.bind('closePanel', h));
				}
			},
			add: function() {
				(e = t.mmenu._c), t.mmenu._d, t.mmenu._e.add('resize');
			},
			clickAnchor: function(t, e) {},
		}),
			(t.mmenu.defaults[i] = { height: 'default' });
	})(jQuery);
	!(function(n) {
		var t,
			e = 'backButton';
		(n.mmenu.addons[e] = {
			setup: function() {
				if (this.opts.offCanvas) {
					var o = this,
						i = this.opts[e];
					this.conf[e];
					n.mmenu.glbl,
						'boolean' == typeof i && (i = { close: i }),
						'object' != typeof i && (i = {}),
						(i = n.extend(!0, {}, n.mmenu.defaults[e], i));
					var s = '#' + this.$menu.attr('id');
					if (i.close) {
						var a = [];
						function u() {
							(a = [s]),
								this.$pnls
									.children('.' + t.panel + '_opened-parent')
									.add(o.$pnls.children('.' + t.panel + '_opened'))
									.each(function() {
										a.push('#' + n(this).attr('id'));
									});
						}
						this.bind('open:finish', function() {
							history.pushState(null, document.title, s);
						}),
							this.bind('open:finish', u),
							this.bind('openPanel:finish', u),
							this.bind('close:finish', function() {
								(a = []),
									history.back(),
									history.pushState(null, document.title, location.pathname + location.search);
							}),
							n(window).on('popstate', function(t) {
								if (o.vars.opened && a.length) {
									var e = (a = a.slice(0, -1))[a.length - 1];
									e == s
										? o.close()
										: (o.openPanel(n(e)), history.pushState(null, document.title, s));
								}
							});
					}
					i.open &&
						n(window).on('popstate', function(n) {
							o.vars.opened || location.hash != s || o.open();
						});
				}
			},
			add: function() {
				window.history && window.history.pushState
					? ((t = n.mmenu._c), n.mmenu._d, n.mmenu._e)
					: (n.mmenu.addons[e].setup = function() {});
			},
			clickAnchor: function(n, t) {},
		}),
			(n.mmenu.defaults[e] = { close: !1, open: !1 });
	})(jQuery);
	!(function(e) {
		var n, i;
		(e.mmenu.addons.columns = {
			setup: function() {
				var s = this.opts.columns;
				this.conf.columns;
				if (
					(e.mmenu.glbl,
					'boolean' == typeof s && (s = { add: s }),
					'number' == typeof s && (s = { add: !0, visible: s }),
					'object' != typeof s && (s = {}),
					'number' == typeof s.visible && (s.visible = { min: s.visible, max: s.visible }),
					(s = this.opts.columns = e.extend(!0, {}, e.mmenu.defaults.columns, s)).add)
				) {
					(s.visible.min = Math.max(1, Math.min(6, s.visible.min))),
						(s.visible.max = Math.max(s.visible.min, Math.min(6, s.visible.max)));
					for (var a = '', l = '', t = 0; t <= s.visible.max; t++)
						(a += ' ' + n.menu + '_columns-' + t), (l += ' ' + n.panel + '_columns-' + t);
					a.length && ((a = a.slice(1)), (l = l.slice(1)));
					var m = l + ' ' + n.panel + '_opened ' + n.panel + '_opened-parent ' + n.panel + '_highest';
					this.bind('openPanel:before', function(e) {
						var s = e.data(i.parent);
						if (s && (s = s.closest('.' + n.panel)).length) {
							var a = s.attr('class');
							if (a && (a = a.split(n.panel + '_columns-')[1]))
								for (a = parseInt(a.split(' ')[0], 10) + 1; a > 0; ) {
									var l = this.$pnls.children('.' + n.panel + '_columns-' + a);
									if (!l.length) {
										a = -1;
										break;
									}
									a++, l.removeClass(m).addClass(n.hidden);
								}
						}
					}),
						this.bind('openPanel:start', function(i) {
							var t = this.$pnls.children('.' + n.panel + '_opened-parent').length;
							i.hasClass(n.panel + '_opened-parent') || t++,
								(t = Math.min(s.visible.max, Math.max(s.visible.min, t))),
								this.$menu.removeClass(a).addClass(n.menu + '_columns-' + t),
								this.$pnls
									.children('.' + n.panel)
									.removeClass(l)
									.filter('.' + n.panel + '_opened-parent')
									.add(i)
									.slice(-s.visible.max)
									.each(function(i) {
										e(this).addClass(n.panel + '_columns-' + i);
									});
						});
				}
			},
			add: function() {
				(n = e.mmenu._c), (i = e.mmenu._d), e.mmenu._e;
			},
			clickAnchor: function(e, n) {},
		}),
			(e.mmenu.defaults.columns = { add: !1, visible: { min: 1, max: 3 } });
	})(jQuery);
	!(function(t) {
		var n, e;
		(t.mmenu.addons.counters = {
			setup: function() {
				var i = this,
					s = this.opts.counters;
				this.conf.counters;
				if (
					(t.mmenu.glbl,
					'boolean' == typeof s && (s = { add: s, update: s }),
					'object' != typeof s && (s = {}),
					(s = this.opts.counters = t.extend(!0, {}, t.mmenu.defaults.counters, s)),
					this.bind('initListview:after', function(t) {
						var e = this.conf.classNames.counters.counter;
						this.__refactorClass(t.find('.' + e), e, n.counter);
					}),
					s.add &&
						this.bind('initListview:after', function(i) {
							var a;
							switch (s.addTo) {
								case 'panels':
									a = i;
									break;
								default:
									a = i.filter(s.addTo);
							}
							a.each(function() {
								var i = t(this).data(e.parent);
								i &&
									(i.find('.' + n.counter).length ||
										i.children('.' + n.btn).prepend(t('<span class="' + n.counter + '" />')));
							});
						}),
					s.update)
				) {
					var a = function(s) {
						(s = s || this.$pnls.children('.' + n.panel)).each(function() {
							var s = t(this),
								a = s.data(e.parent);
							if (a) {
								var c = a.find('.' + n.counter);
								c.length &&
									(s = s.children('.' + n.listview)).length &&
									c.html(i.__filterListItems(s.children()).length);
							}
						});
					};
					this.bind('initListview:after', a), this.bind('updateListview', a);
				}
			},
			add: function() {
				(n = t.mmenu._c), (e = t.mmenu._d), t.mmenu._e, n.add('counter');
			},
			clickAnchor: function(t, n) {},
		}),
			(t.mmenu.defaults.counters = { add: !1, addTo: 'panels', count: !1 }),
			(t.mmenu.configuration.classNames.counters = { counter: 'Counter' });
	})(jQuery);
	!(function(i) {
		var e,
			t,
			d = 'dividers';
		(i.mmenu.addons.dividers = {
			setup: function() {
				var n = this,
					s = this.opts.dividers;
				this.conf.dividers;
				if (
					(i.mmenu.glbl,
					'boolean' == typeof s && (s = { add: s, fixed: s }),
					'object' != typeof s && (s = {}),
					(s = this.opts.dividers = i.extend(!0, {}, i.mmenu.defaults.dividers, s)).type &&
						this.bind('initMenu:after', function() {
							this.$menu.addClass(e.menu + '_' + d + '-' + s.type);
						}),
					s.add &&
						this.bind('initListview:after', function(t) {
							var d;
							switch (s.addTo) {
								case 'panels':
									d = t;
									break;
								default:
									d = t.filter(s.addTo);
							}
							d.length &&
								(d.children('.' + e.listitem + '_divider').remove(),
								d.find('.' + e.listview).each(function() {
									var t = '';
									n.__filterListItems(i(this).children()).each(function() {
										var d = i
											.trim(
												i(this)
													.children('a, span')
													.text()
											)
											.slice(0, 1)
											.toLowerCase();
										d != t &&
											d.length &&
											((t = d),
											i(
												'<li class="' +
													e.listitem +
													' ' +
													e.listitem +
													'_divider">' +
													d +
													'</li>'
											).insertBefore(this));
									});
								}));
						}),
					s.fixed)
				) {
					this.bind('initPanels:before', function() {
						void 0 === this.$fixeddivider &&
							(this.$fixeddivider = i(
								'<ul class="' +
									e.listview +
									' ' +
									e.listview +
									'_fixeddivider"><li class="' +
									e.listitem +
									' ' +
									e.listitem +
									'_divider"></li></ul>'
							)
								.appendTo(this.$pnls)
								.children());
					});
					var l = function(t) {
						if (!(t = t || this.$pnls.children('.' + e.panel + '_opened')).is(':hidden')) {
							var d = t.find('.' + e.listitem + '_divider').not('.' + e.hidden),
								n = t.scrollTop() || 0,
								s = '';
							d.each(function() {
								i(this).position().top + n < n + 1 && (s = i(this).text());
							}),
								this.$fixeddivider.text(s),
								this.$pnls[s.length ? 'addClass' : 'removeClass'](e.panel + '_dividers');
						}
					};
					this.bind('open:start', l),
						this.bind('openPanel:start', l),
						this.bind('updateListview', l),
						this.bind('initPanel:after', function(i) {
							i.off(t.scroll + '-' + d + ' ' + t.touchmove + '-' + d).on(
								t.scroll + '-' + d + ' ' + t.touchmove + '-' + d,
								function(t) {
									i.hasClass(e.panel + '_opened') && l.call(n, i);
								}
							);
						});
				}
			},
			add: function() {
				(e = i.mmenu._c), i.mmenu._d, (t = i.mmenu._e).add('scroll');
			},
			clickAnchor: function(i, e) {},
		}),
			(i.mmenu.defaults.dividers = { add: !1, addTo: 'panels', fixed: !1, type: null });
	})(jQuery);
	!(function(n) {
		var e,
			t,
			o,
			i = 'drag';
		function a(n, e, t) {
			return n < e && (n = e), n > t && (n = t), n;
		}
		(n.mmenu.addons[i] = {
			setup: function() {
				if (this.opts.offCanvas) {
					var s = this.opts[i],
						r = this.conf[i];
					(o = n.mmenu.glbl),
						'boolean' == typeof s && (s = { menu: s, panels: s }),
						'object' != typeof s && (s = {}),
						'boolean' == typeof s.menu && (s.menu = { open: s.menu }),
						'object' != typeof s.menu && (s.menu = {}),
						'boolean' == typeof s.panels && (s.panels = { close: s.panels }),
						'object' != typeof s.panels && (s.panels = {}),
						(s = this.opts[i] = n.extend(!0, {}, n.mmenu.defaults[i], s)).menu.open &&
							this.bind('setPage:after', function() {
								(function(t, o, s) {
									var r,
										p,
										m,
										u,
										c = this,
										d = {
											events: 'panleft panright',
											typeLower: 'x',
											typeUpper: 'X',
											open_dir: 'right',
											close_dir: 'left',
											negative: !1,
										},
										f = 'width',
										l = d.open_dir,
										h = function(n) {
											n <= t.maxStartPos && (_ = 1);
										},
										g = function() {
											return n('.' + e.slideout);
										},
										_ = 0,
										v = 0,
										b = 0,
										w = this.opts.extensions.all,
										y =
											void 0 === w
												? 'left'
												: w.indexOf(e.menu + '_position-right') > -1
												? 'right'
												: w.indexOf(e.menu + '_position-top') > -1
												? 'top'
												: w.indexOf(e.menu + '_position-bottom') > -1
												? 'bottom'
												: 'left',
										x =
											void 0 === w
												? 'back'
												: w.indexOf(e.menu + '_position-top') > -1 ||
												  w.indexOf(e.menu + '_position-bottom') > -1 ||
												  w.indexOf(e.menu + '_position-front') > -1
												? 'front'
												: 'back';
									switch (y) {
										case 'top':
										case 'bottom':
											(d.events = 'panup pandown'),
												(d.typeLower = 'y'),
												(d.typeUpper = 'Y'),
												(f = 'height');
									}
									switch (y) {
										case 'right':
										case 'bottom':
											(d.negative = !0),
												(h = function(n) {
													n >= s.$wndw[f]() - t.maxStartPos && (_ = 1);
												});
									}
									switch (y) {
										case 'right':
											(d.open_dir = 'left'), (d.close_dir = 'right');
											break;
										case 'top':
											(d.open_dir = 'down'), (d.close_dir = 'up');
											break;
										case 'bottom':
											(d.open_dir = 'up'), (d.close_dir = 'down');
									}
									switch (x) {
										case 'front':
											g = function() {
												return c.$menu;
											};
									}
									var O = this.__valueOrFn(this.$menu, t.node, s.$page);
									'string' == typeof O && (O = n(O));
									var $ = new Hammer(O[0], this.opts[i].vendors.hammer);
									$.on('panstart', function(n) {
										h(n.center[d.typeLower]), (u = g()), (l = d.open_dir);
									}),
										$.on(d.events + ' panend', function(n) {
											_ > 0 && n.preventDefault();
										}),
										$.on(d.events, function(n) {
											if (
												((r = n['delta' + d.typeUpper]),
												d.negative && (r = -r),
												r != v && (l = r >= v ? d.open_dir : d.close_dir),
												(v = r) > t.threshold && 1 == _)
											) {
												if (s.$html.hasClass(e.wrapper + '_opened')) return;
												(_ = 2),
													c._openSetup(),
													c.trigger('open:start'),
													s.$html.addClass(e.dragging),
													(b = a(s.$wndw[f]() * o[f].perc, o[f].min, o[f].max));
											}
											2 == _ &&
												((p = a(v, 10, b) - ('front' == x ? b : 0)),
												d.negative && (p = -p),
												(m = 'translate' + d.typeUpper + '(' + p + 'px )'),
												u.css({ '-webkit-transform': '-webkit-' + m, transform: m }));
										}),
										$.on('panend', function(n) {
											2 == _ &&
												(s.$html.removeClass(e.dragging),
												u.css('transform', ''),
												c[l == d.open_dir ? '_openFinish' : 'close']()),
												(_ = 0);
										});
								}.call(this, s.menu, r.menu, o));
							}),
						s.panels.close &&
							this.bind('initPanel:after', function(n) {
								(function(n, o, a, s) {
									var r = this,
										p = n.data(t.parent);
									if (p) {
										p = p.closest('.' + e.panel);
										var m = new Hammer(n[0], r.opts[i].vendors.hammer),
											u = null;
										m.on('panright', function(n) {
											u ||
												(r.openPanel(p),
												(u = setTimeout(function() {
													clearTimeout(u), (u = null);
												}, r.conf.openingInterval + r.conf.transitionDuration)));
										});
									}
								}.call(this, n, s.panels, r.panels, o));
							});
				}
			},
			add: function() {
				if ('function' != typeof Hammer || Hammer.VERSION < 2)
					return (n.mmenu.addons[i].add = function() {}), void (n.mmenu.addons[i].setup = function() {});
				(e = n.mmenu._c), (t = n.mmenu._d), n.mmenu._e, e.add('dragging');
			},
			clickAnchor: function(n, e) {},
		}),
			(n.mmenu.defaults[i] = {
				menu: { open: !1, maxStartPos: 100, threshold: 50 },
				panels: { close: !1 },
				vendors: { hammer: {} },
			}),
			(n.mmenu.configuration[i] = {
				menu: { width: { perc: 0.8, min: 140, max: 440 }, height: { perc: 0.8, min: 140, max: 880 } },
				panels: {},
			});
	})(jQuery);
	!(function(t) {
		var o,
			e,
			n,
			i,
			s = 'dropdown';
		(t.mmenu.addons.dropdown = {
			setup: function() {
				if (this.opts.offCanvas) {
					var r = this,
						a = this.opts.dropdown,
						p = this.conf.dropdown;
					if (
						((i = t.mmenu.glbl),
						'boolean' == typeof a && a && (a = { drop: a }),
						'object' != typeof a && (a = {}),
						'string' == typeof a.position && (a.position = { of: a.position }),
						(a = this.opts.dropdown = t.extend(!0, {}, t.mmenu.defaults.dropdown, a)).drop)
					) {
						var f;
						this.bind('initMenu:after', function() {
							if ((this.$menu.addClass(o.menu + '_' + s), 'string' != typeof a.position.of)) {
								var e = this._getOriginalMenuId();
								e && e.length && (a.position.of = '[href="#' + e + '"]');
							}
							'string' == typeof a.position.of &&
								((f = t(a.position.of)),
								(a.event = a.event.split(' ')),
								1 == a.event.length && (a.event[1] = a.event[0]),
								'hover' == a.event[0] &&
									f.on(n.mouseenter + '-' + s, function() {
										r.open();
									}),
								'hover' == a.event[1] &&
									this.$menu.on(n.mouseleave + '-' + s, function() {
										r.close();
									}));
						}),
							this.bind('open:start', function() {
								this.$menu.data(e.style, this.$menu.attr('style') || ''),
									i.$html.addClass(o.wrapper + '_dropdown');
							}),
							this.bind('close:finish', function() {
								this.$menu.attr('style', this.$menu.data(e.style)),
									i.$html.removeClass(o.wrapper + '_dropdown');
							});
						var d = function(t, e) {
								var n,
									s,
									r = e[0],
									d = e[1],
									u = 'x' == t ? 'scrollLeft' : 'scrollTop',
									l = 'x' == t ? 'outerWidth' : 'outerHeight',
									h = 'x' == t ? 'left' : 'top',
									m = 'x' == t ? 'right' : 'bottom',
									c = 'x' == t ? 'width' : 'height',
									w = 'x' == t ? 'maxWidth' : 'maxHeight',
									v = null,
									x = i.$wndw[u](),
									b = (f.offset()[h] -= x),
									g = b + f[l](),
									$ = i.$wndw[c](),
									y = p.offset.button[t] + p.offset.viewport[t];
								if (a.position[t])
									switch (a.position[t]) {
										case 'left':
										case 'bottom':
											v = 'after';
											break;
										case 'right':
										case 'top':
											v = 'before';
									}
								return (
									null === v && (v = b + (g - b) / 2 < $ / 2 ? 'after' : 'before'),
									'after' == v
										? ((s = $ - ((n = 'x' == t ? b : g) + y)),
										  (r[h] = n + p.offset.button[t]),
										  (r[m] = 'auto'),
										  a.tip && d.push(o.menu + '_tip-' + ('x' == t ? 'left' : 'top')))
										: ((s = (n = 'x' == t ? g : b) - y),
										  (r[m] = 'calc( 100% - ' + (n - p.offset.button[t]) + 'px )'),
										  (r[h] = 'auto'),
										  a.tip && d.push(o.menu + '_tip-' + ('x' == t ? 'right' : 'bottom'))),
									a.fitViewport && (r[w] = Math.min(p[c].max, s)),
									[r, d]
								);
							},
							u = function(t) {
								if (this.vars.opened) {
									this.$menu.attr('style', this.$menu.data(e.style));
									var n = [{}, []];
									(n = d.call(this, 'y', n)),
										(n = d.call(this, 'x', n)),
										this.$menu.css(n[0]),
										a.tip &&
											this.$menu
												.removeClass(
													o.tipleft + ' ' + o.tipright + ' ' + o.tiptop + ' ' + o.tipbottom
												)
												.addClass(n[1].join(' '));
								}
							};
						this.bind('open:start', u),
							i.$wndw.on(n.resize + '-' + s, function(t) {
								u.call(r);
							}),
							this.opts.offCanvas.blockUI ||
								i.$wndw.on(n.scroll + '-' + s, function(t) {
									u.call(r);
								});
					}
				}
			},
			add: function() {
				(o = t.mmenu._c),
					(e = t.mmenu._d),
					(n = t.mmenu._e),
					o.add('dropdown'),
					n.add('mouseenter mouseleave resize scroll');
			},
			clickAnchor: function(t, o) {},
		}),
			(t.mmenu.defaults.dropdown = { drop: !1, fitViewport: !0, event: 'click', position: {}, tip: !0 }),
			(t.mmenu.configuration.dropdown = {
				offset: { button: { x: -5, y: 5 }, viewport: { x: 20, y: 20 } },
				height: { max: 880 },
				width: { max: 440 },
			});
	})(jQuery);
	!(function(s) {
		var t,
			e,
			n = 'fixedElements';
		(s.mmenu.addons[n] = {
			setup: function() {
				if (this.opts.offCanvas) {
					this.opts[n];
					var i = this.conf[n];
					e = s.mmenu.glbl;
					this.bind('setPage:after', function(o) {
						var c = this.conf.classNames[n].fixed,
							f = o.find('.' + c);
						this.__refactorClass(f, c, t.slideout), f[i.elemInsertMethod](i.elemInsertSelector);
						var a = this.conf.classNames[n].sticky,
							d = o.find('.' + a);
						this.__refactorClass(d, a, t.sticky),
							(d = o.find('.' + t.sticky)).length &&
								(this.bind('open:start', function() {
									if ('hidden' == e.$html.css('overflow')) {
										var t = e.$wndw.scrollTop() + i.sticky.offset;
										d.each(function() {
											s(this).css('top', parseInt(s(this).css('top'), 10) + t);
										});
									}
								}),
								this.bind('close:finish', function() {
									d.css('top', '');
								}));
					});
				}
			},
			add: function() {
				(t = s.mmenu._c), s.mmenu._d, s.mmenu._e, t.add('sticky');
			},
			clickAnchor: function(s, t) {},
		}),
			(s.mmenu.configuration[n] = {
				sticky: { offset: 0 },
				elemInsertMethod: 'appendTo',
				elemInsertSelector: 'body',
			}),
			(s.mmenu.configuration.classNames[n] = { fixed: 'Fixed', sticky: 'Sticky' });
	})(jQuery);
	!(function(a) {
		var n, e, t;
		(a.mmenu.addons.iconbar = {
			setup: function() {
				var i = this,
					o = this.opts.iconbar;
				this.conf.iconbar;
				if ((a.mmenu.glbl, o instanceof Array && (o = { add: !0, top: o }), o.add)) {
					var r = null;
					if (
						(a.each(['top', 'bottom'], function(e, t) {
							var i = o[t];
							i instanceof Array || (i = [i]);
							for (
								var s = a('<div class="' + n.iconbar + '__' + t + '" />'), c = 0, d = i.length;
								c < d;
								c++
							)
								s.append(i[c]);
							s.children().length && (r || (r = a('<div class="' + n.iconbar + '" />')), r.append(s));
						}),
						r &&
							(this.bind('initMenu:after', function() {
								var a = n.menu + '_iconbar';
								o.size && (a += ' ' + n.menu + '_iconbar-' + o.size), this.$menu.addClass(a).prepend(r);
							}),
							'tabs' == o.type))
					) {
						r.addClass(n.iconbar + '_tabs');
						var s = r.find('a');
						s.on(t.click + '-iconbar', function(e) {
							var t = a(this);
							if (t.hasClass(n.iconbar + '__tab_selected')) e.stopImmediatePropagation();
							else
								try {
									var o = a(t.attr('href'));
									o.hasClass(n.panel) &&
										(e.preventDefault(), e.stopImmediatePropagation(), i.openPanel(o, !1));
								} catch (a) {}
						}),
							this.bind('openPanel:start', function a(t) {
								s.removeClass(n.iconbar + '__tab_selected');
								var i = s.filter('[href="#' + t.attr('id') + '"]');
								if (i.length) i.addClass(n.iconbar + '__tab_selected');
								else {
									var o = t.data(e.parent);
									o && o.length && a(o.closest('.' + n.panel));
								}
							});
					}
				}
			},
			add: function() {
				(n = a.mmenu._c), (e = a.mmenu._d), (t = a.mmenu._e), n.add('iconbar');
			},
			clickAnchor: function(a, n) {},
		}),
			(a.mmenu.defaults.iconbar = { add: !1, top: [], bottom: [] }),
			(a.mmenu.configuration.iconbar = {});
	})(jQuery);
	!(function(e) {
		var i,
			n = 'iconPanels';
		(e.mmenu.addons[n] = {
			setup: function() {
				var a = this,
					t = this.opts[n],
					l = (this.conf[n], !1);
				e.mmenu.glbl,
					'boolean' == typeof t && (t = { add: t }),
					('number' != typeof t && 'string' != typeof t) || (t = { add: !0, visible: t }),
					'object' != typeof t && (t = {}),
					'first' == t.visible && ((l = !0), (t.visible = 1)),
					((t = this.opts[n] = e.extend(!0, {}, e.mmenu.defaults[n], t)).visible = Math.min(
						3,
						Math.max(1, t.visible)
					)),
					t.visible++;
				var s = '';
				if (!l) {
					for (var d = 0; d <= t.visible; d++) s += ' ' + i.panel + '_iconpanel-' + d;
					s.length && (s = s.slice(1));
				}
				if (t.add) {
					var r = function(n) {
						if (!n.parent('.' + i.listitem + '_vertical').length) {
							var d = a.$pnls.children('.' + i.panel);
							l
								? d
										.removeClass(i.panel + '_iconpanel-first')
										.first()
										.addClass(i.panel + '_iconpanel-first')
								: d
										.removeClass(s)
										.filter('.' + i.panel + '_opened-parent')
										.removeClass(i.hidden)
										.not(function() {
											return e(this).parent('.' + i.listitem + '_vertical').length;
										})
										.add(n)
										.slice(-t.visible)
										.each(function(n) {
											e(this).addClass(i.panel + '_iconpanel-' + n);
										});
						}
					};
					this.bind('initMenu:after', function() {
						var e = [i.menu + '_iconpanel'];
						t.size && e.push(i.menu + '_iconpanel-' + t.size),
							t.hideNavbar && e.push(i.menu + '_hidenavbar'),
							t.hideDivider && e.push(i.menu + '_hidedivider'),
							this.$menu.addClass(e.join(' '));
					}),
						this.bind('openPanel:start', r),
						this.bind('initPanels:after', function(e) {
							r.call(a, a.$pnls.children('.' + i.panel + '_opened'));
						}),
						this.bind('initListview:after', function(e) {
							!t.blockPanel ||
								e.parent('.' + i.listitem + '_vertical').length ||
								e.children('.' + i.panel + '__blocker').length ||
								e.prepend(
									'<a href="#' +
										e.closest('.' + i.panel).attr('id') +
										'" class="' +
										i.panel +
										'__blocker" />'
								);
						});
				}
			},
			add: function() {
				(i = e.mmenu._c), e.mmenu._d, e.mmenu._e;
			},
			clickAnchor: function(e, i) {},
		}),
			(e.mmenu.defaults[n] = { add: !1, blockPanel: !0, hideDivider: !1, hideNavbar: !0, visible: 3 });
	})(jQuery);
	!(function(n) {
		var e,
			t,
			a,
			i,
			s = 'keyboardNavigation';
		(n.mmenu.addons[s] = {
			setup: function() {
				if (!n.mmenu.support.touch) {
					var t = this.opts[s];
					this.conf[s];
					if (
						((i = n.mmenu.glbl),
						('boolean' != typeof t && 'string' != typeof t) || (t = { enable: t }),
						'object' != typeof t && (t = {}),
						(t = this.opts[s] = n.extend(!0, {}, n.mmenu.defaults[s], t)).enable)
					) {
						var a = n('<button class="' + e.tabstart + '" />'),
							o = n('<button class="' + e.tabend + '" />'),
							r = n('<button class="' + e.tabend + '" />');
						this.bind('initMenu:after', function() {
							t.enhance && this.$menu.addClass(e.menu + '_keyboardfocus'),
								this['_initWindow_' + s](t.enhance);
						}),
							this.bind('initOpened:before', function() {
								this.$menu
									.prepend(a)
									.append(o)
									.children('.' + e.mm('navbars-top') + ', .' + e.mm('navbars-bottom'))
									.children('.' + e.navbar)
									.children('a.' + e.title)
									.attr('tabindex', -1);
							}),
							this.bind('initBlocker:after', function() {
								i.$blck
									.append(r)
									.children('a')
									.addClass(e.tabstart);
							}),
							this.bind('open:finish', function() {
								d.call(this, null, t.enable);
							}),
							this.bind('openPanel:finish', function(n) {
								d.call(this, n, t.enable);
							}),
							this.bind('initOpened:after:sr-aria', function() {
								var n = this.$menu.add(i.$blck).children('.' + e.tabstart + ', .' + e.tabend);
								this.__sr_aria(n, 'hidden', !0), this.__sr_role(n, 'presentation');
							});
					}
				}
			},
			add: function() {
				(e = n.mmenu._c),
					(t = n.mmenu._d),
					(a = n.mmenu._e),
					e.add('tabstart tabend'),
					a.add('focusin keydown');
			},
			clickAnchor: function(n, e) {},
		}),
			(n.mmenu.defaults[s] = { enable: !1, enhance: !1 }),
			(n.mmenu.configuration[s] = {}),
			(n.mmenu.prototype['_initWindow_' + s] = function(o) {
				i.$wndw.off(a.keydown + '-offCanvas'),
					i.$wndw.off(a.focusin + '-' + s).on(a.focusin + '-' + s, function(t) {
						if (i.$html.hasClass(e.wrapper + '_opened')) {
							var a = n(t.target);
							if (a.is('.' + e.tabend)) {
								var s = n();
								a.parent().is('.' + e.menu) && i.$blck && (s = i.$blck),
									a.parent().is('.' + e.wrapper + '__blocker') &&
										(s = i.$body
											.find('.' + e.menu + '_offcanvas')
											.filter('.' + e.menu + '_opened')),
									s.length || (s = a.parent()),
									s.children('.' + e.tabstart).focus();
							}
						}
					}),
					i.$wndw.off(a.keydown + '-' + s).on(a.keydown + '-' + s, function(t) {
						var i = n(t.target),
							s = i.closest('.' + e.menu);
						if (s.length) {
							s.data('mmenu');
							if (i.is('input, textarea'));
							else
								switch (t.keyCode) {
									case 13:
										(i.is('.mm-toggle') || i.is('.mm-check')) && i.trigger(a.click);
										break;
									case 32:
									case 37:
									case 38:
									case 39:
									case 40:
										t.preventDefault();
								}
						}
					}),
					o &&
						i.$wndw.off(a.keydown + '-' + s).on(a.keydown + '-' + s, function(a) {
							var i = n(a.target),
								s = i.closest('.' + e.menu);
							if (s.length) {
								var o = s.data('mmenu');
								if (i.is('input'))
									switch (a.keyCode) {
										case 27:
											i.val('');
									}
								else
									switch (a.keyCode) {
										case 8:
											var d = s.find('.' + e.panel + '_opened').data(t.parent);
											d && d.length && o.openPanel(d.closest('.' + e.panel));
											break;
										case 27:
											s.hasClass(e.menu + '_offcanvas') && o.close();
									}
							}
						});
			});
		var o = 'input, select, textarea, button, label, a[href]';
		function d(t, a) {
			t = t || this.$pnls.children('.' + e.panel + '_opened');
			var i = n(),
				s = this.$menu
					.children('.' + e.mm('navbars_top') + ', .' + e.mm('navbars_bottom'))
					.children('.' + e.navbar);
			s.find(o).filter(':focus').length ||
				('default' == a &&
					((i = t
						.children('.' + e.listview)
						.find('a[href]')
						.not('.' + e.hidden)).length || (i = t.find(o).not('.' + e.hidden)),
					i.length || (i = s.find(o).not('.' + e.hidden))),
				i.length || (i = this.$menu.children('.' + e.tabstart)),
				i.first().focus());
		}
	})(jQuery);
	!(function(n) {
		var e,
			i = 'lazySubmenus';
		(n.mmenu.addons[i] = {
			setup: function() {
				var l = this.opts[i];
				this.conf[i];
				n.mmenu.glbl,
					'boolean' == typeof l && (l = { load: l }),
					'object' != typeof l && (l = {}),
					(l = this.opts[i] = n.extend(!0, {}, n.mmenu.defaults[i], l)).load &&
						(this.bind('initMenu:after', function() {
							this.$pnls
								.find('li')
								.children(this.conf.panelNodetype)
								.not('.' + e.inset)
								.not('.' + e.nolistview)
								.not('.' + e.nopanel)
								.addClass(e.panel + '_lazysubmenu ' + e.nolistview + ' ' + e.nopanel);
						}),
						this.bind('initPanels:before', function(n) {
							(n = n || this.$pnls.children(this.conf.panelNodetype)),
								this.__findAddBack(n, '.' + e.panel + '_lazysubmenu')
									.not('.' + e.panel + '_lazysubmenu .' + e.panel + '_lazysubmenu')
									.removeClass(e.panel + '_lazysubmenu ' + e.nolistview + ' ' + e.nopanel);
						}),
						this.bind('initOpened:before', function() {
							var n = this.$pnls
								.find('.' + this.conf.classNames.selected)
								.parents('.' + e.panel + '_lazysubmenu');
							n.length &&
								(n.removeClass(e.panel + '_lazysubmenu ' + e.nolistview + ' ' + e.nopanel),
								this.initPanels(n.last()));
						}),
						this.bind('openPanel:before', function(n) {
							var i = this.__findAddBack(n, '.' + e.panel + '_lazysubmenu').not(
								'.' + e.panel + '_lazysubmenu .' + e.panel + '_lazysubmenu'
							);
							i.length && this.initPanels(i);
						}));
			},
			add: function() {
				(e = n.mmenu._c), n.mmenu._d, n.mmenu._e;
			},
			clickAnchor: function(n, e) {},
		}),
			(n.mmenu.defaults[i] = { load: !1 }),
			(n.mmenu.configuration[i] = {});
	})(jQuery);
	!(function(n) {
		var a;
		(n.mmenu.addons.navbars = {
			setup: function() {
				var t = this,
					e = this.opts.navbars,
					o = this.conf.navbars;
				if ((n.mmenu.glbl, void 0 !== e)) {
					e instanceof Array || (e = [e]);
					var r = {},
						s = {};
					e.length &&
						(n.each(e, function(i) {
							var c = e[i];
							'boolean' == typeof c && c && (c = {}),
								'object' != typeof c && (c = {}),
								void 0 === c.content && (c.content = ['prev', 'title']),
								c.content instanceof Array || (c.content = [c.content]),
								(c = n.extend(!0, {}, t.opts.navbar, c));
							var d = n('<div class="' + a.navbar + '" />'),
								v = c.height;
							'number' != typeof v
								? (v = 1)
								: (v = Math.min(4, Math.max(1, v))) > 1 && d.addClass(a.navbar + '_size-' + v);
							var m = c.position;
							switch (m) {
								case 'bottom':
									break;
								default:
									m = 'top';
							}
							r[m] || (r[m] = 0),
								(r[m] += v),
								s[m] || (s[m] = n('<div class="' + a.navbars + '_' + m + '" />')),
								s[m].append(d);
							for (var u = 0, b = c.content.length; u < b; u++) {
								var l = n.mmenu.addons.navbars[c.content[u]] || null;
								l
									? l.call(t, d, c, o)
									: ((l = c.content[u]) instanceof n || (l = n(c.content[u])), d.append(l));
							}
							var f = n.mmenu.addons.navbars[c.type] || null;
							f && f.call(t, d, c, o),
								d.children('.' + a.btn).length && d.addClass(a.navbar + '_has-btns');
						}),
						this.bind('initMenu:after', function() {
							for (var n in r)
								this.$menu.addClass(a.menu + '_navbar_' + n + '-' + r[n]),
									this.$menu['bottom' == n ? 'append' : 'prepend'](s[n]);
						}));
				}
			},
			add: function() {
				(a = n.mmenu._c), n.mmenu._d, n.mmenu._e, a.add('navbars');
			},
			clickAnchor: function(n, a) {},
		}),
			(n.mmenu.configuration.navbars = { breadcrumbs: { separator: '/', removeFirst: !1 } }),
			(n.mmenu.configuration.classNames.navbars = {});
	})(jQuery);
	!(function(e) {
		var t,
			n,
			i,
			s = 'pageScroll';
		(e.mmenu.addons[s] = {
			setup: function() {
				var r = this,
					o = this.opts[s],
					a = this.conf[s];
				if (
					((i = e.mmenu.glbl),
					'boolean' == typeof o && (o = { scroll: o }),
					(o = this.opts[s] = e.extend(!0, {}, e.mmenu.defaults[s], o)).scroll &&
						this.bind('close:finish', function() {
							l(a.scrollOffset);
						}),
					o.update)
				) {
					var c = [],
						d = [];
					(r = this).bind('initListview:after', function(n) {
						r.__filterListItemAnchors(n.find('.' + t.listview).children('li')).each(function() {
							var t = e(this).attr('href');
							f(t) && c.push(t);
						}),
							(d = c.reverse());
					});
					var u = -1;
					i.$wndw.on(n.scroll + '-' + s, function(n) {
						for (var s = i.$wndw.scrollTop(), l = 0; l < d.length; l++)
							if (e(d[l]).offset().top < s + a.updateOffset) {
								u !== l &&
									((u = l),
									r.setSelected(
										r
											.__filterListItemAnchors(
												r.$pnls
													.children('.' + t.panel + '_opened')
													.find('.' + t.listview)
													.children('li')
											)
											.filter('[href="' + d[l] + '"]')
											.parent()
									));
								break;
							}
					});
				}
			},
			add: function() {
				(t = e.mmenu._c), e.mmenu._d, (n = e.mmenu._e);
			},
			clickAnchor: function(n, o, a) {
				if (((r = !1), o && a && this.opts.offCanvas && this.opts[s].scroll && i.$page && i.$page.length)) {
					var c = n.attr('href');
					if (f(c)) {
						if (
							((r = e(c)),
							!this.$menu.is('.' + t.menu + '_sidebar-expanded') ||
								!i.$html.is('.' + t.wrapper + '_sidebar-expanded'))
						)
							return { close: !0 };
						l(this.conf[s].scrollOffset);
					}
				}
			},
		}),
			(e.mmenu.defaults[s] = { scroll: !1, update: !1 }),
			(e.mmenu.configuration[s] = { scrollOffset: 0, updateOffset: 50 });
		var r = !1;
		function l(e) {
			r && r.length && r.is(':visible') && i.$html.add(i.$body).animate({ scrollTop: r.offset().top + e }),
				(r = !1);
		}
		function f(e) {
			try {
				return !('#' == e || '#' != e.slice(0, 1) || !i.$page.find(e).length);
			} catch (e) {
				return !1;
			}
		}
	})(jQuery);
	!(function(e) {
		var n,
			s,
			a,
			t = 'searchfield';
		function i(e, n) {
			if (n) for (var s in n) e.attr(s, n[s]);
		}
		(e.mmenu.addons[t] = {
			setup: function() {
				var s = this,
					a = this.opts[t],
					i = this.conf[t];
				e.mmenu.glbl,
					'boolean' == typeof a && (a = { add: a }),
					'object' != typeof a && (a = {}),
					'boolean' == typeof a.panel && (a.panel = { add: a.panel }),
					'object' != typeof a.panel && (a.panel = {}),
					a.add &&
						('panel' == a.addTo && (a.panel.add = !0),
						a.panel.add && ((a.showSubPanels = !1), a.panel.splash && (a.cancel = !0)),
						(a = this.opts[t] = e.extend(!0, {}, e.mmenu.defaults[t], a)),
						(i = this.conf[t] = e.extend(!0, {}, e.mmenu.configuration[t], i)),
						this.bind('close:start', function() {
							this.$menu
								.find('.' + n.searchfield)
								.children('input')
								.blur();
						}),
						this.bind('initPanels:after', function(n) {
							var t,
								i = e();
							switch ((a.panel.add && (i = this._initSearchPanel(n)), a.addTo)) {
								case 'panels':
									t = n;
									break;
								case 'panel':
									t = i;
									break;
								default:
									t = this.$menu.find(a.addTo);
							}
							(t.each(function() {
								var n = s._initSearchfield(e(this));
								a.search && n.length && s._initSearching(n);
							}),
							a.noResults) &&
								(a.panel.add ? i : n).each(function() {
									s._initNoResultsMsg(e(this));
								});
						}));
			},
			add: function() {
				(n = e.mmenu._c),
					(s = e.mmenu._d),
					(a = e.mmenu._e),
					n.add('searchfield'),
					s.add('searchfield'),
					a.add('input focus blur');
			},
			clickAnchor: function(e, s) {
				if (e.hasClass(n.searchfield + '__btn')) {
					if (e.hasClass(n.btn + '_close')) {
						var a = e.closest('.' + n.searchfield).find('input');
						return a.val(''), this.search(a), !0;
					}
					if (e.hasClass(n.btn + '_next')) return e.closest('.' + n.searchfield).submit(), !0;
				}
			},
		}),
			(e.mmenu.defaults[t] = {
				add: !1,
				addTo: 'panels',
				noResults: 'No results found.',
				placeholder: 'Search',
				panel: { add: !1, dividers: !0, fx: 'none', id: null, splash: null, title: 'Search' },
				search: !0,
				showTextItems: !1,
				showSubPanels: !0,
			}),
			(e.mmenu.configuration[t] = { clear: !1, form: !1, input: !1, submit: !1 }),
			(e.mmenu.prototype._initSearchPanel = function(s) {
				var a = this.opts[t];
				this.conf[t];
				if (this.$pnls.children('.' + n.panel + '_search').length) return e();
				var i = e('<div class="' + n.panel + '_search " />')
					.append('<ul />')
					.appendTo(this.$pnls);
				switch (
					(a.panel.id && i.attr('id', a.panel.id),
					a.panel.title && i.attr('data-mm-title', a.panel.title),
					a.panel.fx)
				) {
					case !1:
						break;
					case 'none':
						i.addClass(n.panel + '_noanimation');
						break;
					default:
						i.addClass(n.panel + '_fx-' + a.panel.fx);
				}
				return (
					a.panel.splash &&
						i.append('<div class="' + n.panel + '__searchsplash">' + a.panel.splash + '</div>'),
					this._initPanels(i),
					i
				);
			}),
			(e.mmenu.prototype._initSearchfield = function(s) {
				var a = this.opts[t],
					l = this.conf[t];
				if (s.parent('.' + n.listitem + '_vertical').length) return e();
				if (s.find('.' + n.searchfield).length) return s.find('.' + n.searchfield);
				var d = e('<' + (l.form ? 'form' : 'div') + ' class="' + n.searchfield + '" />'),
					h = e('<div class="' + n.searchfield + '__input" />'),
					r = e('<input placeholder="' + this.i18n(a.placeholder) + '" type="text" autocomplete="off" />');
				return (
					h.append(r).appendTo(d),
					s.prepend(d),
					s.hasClass(n.panel) && s.addClass(n.panel + '_has-searchfield'),
					i(r, l.input),
					l.clear &&
						e(
							'<a class="' + n.btn + ' ' + n.btn + '_close ' + n.searchfield + '__btn" href="#" />'
						).appendTo(h),
					i(d, l.form),
					l.form &&
						l.submit &&
						!l.clear &&
						e(
							'<a class="' + n.btn + ' ' + n.btn + '_next ' + n.searchfield + '__btn" href="#" />'
						).appendTo(h),
					a.cancel &&
						e('<a href="#" class="' + n.searchfield + '__cancel">' + this.i18n('cancel') + '</a>').appendTo(
							d
						),
					d
				);
			}),
			(e.mmenu.prototype._initSearching = function(i) {
				var l = this,
					d = this.opts[t],
					h = (this.conf[t], {});
				i.closest('.' + n.panel + '_search').length
					? ((h.$pnls = this.$pnls.find('.' + n.panel)), (h.$nrsp = i.closest('.' + n.panel)))
					: i.closest('.' + n.panel).length
					? ((h.$pnls = i.closest('.' + n.panel)), (h.$nrsp = h.$pnls))
					: ((h.$pnls = this.$pnls.find('.' + n.panel)), (h.$nrsp = this.$menu)),
					(h.$pnls = h.$pnls.not(function() {
						return e(this).parent('.' + n.listitem + '_vertical').length;
					})),
					d.panel.add && (h.$pnls = h.$pnls.not('.' + n.panel + '_search'));
				var r = i.find('input'),
					c = i.find('.' + n.searchfield + '__cancel'),
					p = this.$pnls.children('.' + n.panel + '_search'),
					o = h.$pnls.find('.' + n.listitem);
				(h.$itms = o.not('.' + n.listitem + '_divider')),
					(h.$dvdr = o.filter('.' + n.listitem + '_divider')),
					d.panel.add &&
						d.panel.splash &&
						r.off(a.focus + '-' + t + '-splash').on(a.focus + '-' + t + '-splash', function(e) {
							l.openPanel(p);
						}),
					d.cancel &&
						(r.off(a.focus + '-' + t + '-cancel').on(a.focus + '-' + t + '-cancel', function(e) {
							c.addClass(n.searchfield + '__cancel-active');
						}),
						c.off(a.click + '-' + t + '-splash').on(a.click + '-' + t + '-splash', function(s) {
							s.preventDefault(),
								e(this).removeClass(n.searchfield + '__cancel-active'),
								p.hasClass(n.panel + '_opened') &&
									l.openPanel(l.$pnls.children('.' + n.panel + '_opened-parent').last());
						})),
					d.panel.add &&
						'panel' == d.addTo &&
						this.bind('openPanel:finish', function(e) {
							e[0] === p[0] && r.focus();
						}),
					r
						.data(s.searchfield, h)
						.off(a.input + '-' + t)
						.on(a.input + '-' + t, function(e) {
							(function(e) {
								switch (e) {
									case 9:
									case 16:
									case 17:
									case 18:
									case 37:
									case 38:
									case 39:
									case 40:
										return !0;
								}
								return !1;
							})(e.keyCode) || l.search(r);
						}),
					this.search(r);
			}),
			(e.mmenu.prototype._initNoResultsMsg = function(s) {
				var a = this.opts[t];
				this.conf[t];
				if (
					(s.closest('.' + n.panel).length || (s = this.$pnls.children('.' + n.panel).first()),
					!s.children('.' + n.panel + '__noresultsmsg').length)
				) {
					var i = s.children('.' + n.listview).first(),
						l = e('<div class="' + n.panel + '__noresultsmsg ' + n.hidden + '" />').append(
							this.i18n(a.noResults)
						);
					i.length ? l.insertAfter(i) : l.prependTo(s);
				}
			}),
			(e.mmenu.prototype.search = function(a, i) {
				var l = this,
					d = this.opts[t];
				this.conf[t];
				(a =
					a ||
					this.$menu
						.find('.' + n.searchfield)
						.chidren('input')
						.first()),
					(i = (i = i || a.val()).toLowerCase().trim());
				var h = a.data(s.searchfield),
					r = a.closest('.' + n.searchfield).find('.' + n.btn),
					c = this.$pnls.children('.' + n.panel + '_search'),
					p = h.$pnls,
					o = h.$itms,
					f = h.$dvdr,
					u = h.$nrsp;
				if (
					(o
						.removeClass(n.listitem + '_nosubitems')
						.find('.' + n.btn + '_fullwidth-search')
						.removeClass(n.btn + '_fullwidth-search ' + n.btn + '_fullwidth'),
					c.children('.' + n.listview).empty(),
					p.scrollTop(0),
					i.length)
				) {
					if (
						(o.add(f).addClass(n.hidden),
						o.each(function() {
							var s = e(this),
								a = 'a';
							(d.showTextItems || (d.showSubPanels && s.find('.' + n.btn + '_next'))) && (a = 'a, span'),
								s
									.children(a)
									.not('.' + n.btn + '_next')
									.text()
									.toLowerCase()
									.indexOf(i) > -1 && s.removeClass(n.hidden);
						}),
						d.panel.add)
					) {
						var m = e();
						p.each(function() {
							var s = l.__filterListItems(e(this).find('.' + n.listitem)).clone(!0);
							s.length &&
								(d.panel.dividers &&
									(m = m.add(
										'<li class="' +
											n.listitem +
											' ' +
											n.listitem +
											'_divider">' +
											e(this)
												.find('.' + n.navbar + '__title')
												.text() +
											'</li>'
									)),
								(m = m.add(s)));
						}),
							m
								.find('.' + n.mm('toggle'))
								.remove()
								.end()
								.find('.' + n.mm('check'))
								.remove()
								.end()
								.find('.' + n.btn)
								.remove(),
							c.children('.' + n.listview).append(m),
							this.openPanel(c);
					} else
						d.showSubPanels &&
							p.each(function(a) {
								var t = e(this);
								l.__filterListItems(t.find('.' + n.listitem)).each(function() {
									var a = e(this).data(s.child);
									a &&
										a
											.find('.' + n.listview)
											.children()
											.removeClass(n.hidden);
								});
							}),
							e(p.get().reverse()).each(function(t) {
								var i = e(this),
									d = i.data(s.parent);
								d &&
									(l.__filterListItems(i.find('.' + n.listitem)).length
										? d.hasClass(n.hidden) &&
										  d
												.removeClass(n.hidden)
												.children('.' + n.btn + '_next')
												.not('.' + n.btn + '_fullwidth')
												.addClass(n.btn + '_fullwidth')
												.addClass(n.btn + '_fullwidth-search')
										: a.closest('.' + n.panel).length ||
										  ((i.hasClass(n.panel + '_opened') ||
												i.hasClass(n.panel + '_opened-parent')) &&
												setTimeout(function() {
													l.openPanel(d.closest('.' + n.panel));
												}, (t + 1) * (1.5 * l.conf.openingInterval)),
										  d.addClass(n.listitem + '_nosubitems')));
							}),
							this.__filterListItems(p.find('.' + n.listitem)).each(function() {
								e(this)
									.prevAll('.' + n.listitem + '_divider')
									.first()
									.removeClass(n.hidden);
							});
					r.removeClass(n.hidden),
						u
							.find('.' + n.panel + '__noresultsmsg')
							[o.not('.' + n.hidden).length ? 'addClass' : 'removeClass'](n.hidden),
						d.panel.add &&
							(d.panel.splash && c.find('.' + n.panel + '__searchsplash').addClass(n.hidden),
							o.add(f).removeClass(n.hidden));
				} else
					o.add(f).removeClass(n.hidden),
						r.addClass(n.hidden),
						u.find('.' + n.panel + '__noresultsmsg').addClass(n.hidden),
						d.panel.add &&
							(d.panel.splash
								? c.find('.' + n.panel + '__searchsplash').removeClass(n.hidden)
								: a.closest('.' + n.panel + '_search').length ||
								  this.openPanel(this.$pnls.children('.' + n.panel + '_opened-parent').last()));
				this.trigger('updateListview');
			});
	})(jQuery);
	!(function(e) {
		var a,
			n,
			i = 'sectionIndexer';
		(e.mmenu.addons[i] = {
			setup: function() {
				var r = this,
					t = this.opts[i];
				this.conf[i];
				e.mmenu.glbl,
					'boolean' == typeof t && (t = { add: t }),
					'object' != typeof t && (t = {}),
					(t = this.opts[i] = e.extend(!0, {}, e.mmenu.defaults[i], t));
				var s = null;
				this.bind('initPanels:after', function(d) {
					if (t.add) {
						var h;
						switch (t.addTo) {
							case 'panels':
								h = d;
								break;
							default:
								h = (h = e(t.addTo, this.$menu)).filter('.' + a.panel);
						}
						h
							.find('.' + a.listitem + '_divider')
							.closest('.' + a.panel)
							.addClass(a.panel + '_has-sectionindexer'),
							s ||
								(s = e('<div class="' + a.sectionindexer + '" />')
									.prependTo(this.$menu)
									.append(
										'<a href="#a">a</a><a href="#b">b</a><a href="#c">c</a><a href="#d">d</a><a href="#e">e</a><a href="#f">f</a><a href="#g">g</a><a href="#h">h</a><a href="#i">i</a><a href="#j">j</a><a href="#k">k</a><a href="#l">l</a><a href="#m">m</a><a href="#n">n</a><a href="#o">o</a><a href="#p">p</a><a href="#q">q</a><a href="#r">r</a><a href="#s">s</a><a href="#t">t</a><a href="#u">u</a><a href="#v">v</a><a href="#w">w</a><a href="#x">x</a><a href="#y">y</a><a href="#z">z</a>'
									)).on(n.mouseover + '-' + i + ' ' + n.touchstart + '-' + i, 'a', function(n) {
									var i = e(n.target)
											.attr('href')
											.slice(1),
										t = r.$pnls.children('.' + a.panel + '_opened'),
										s = t.find('.' + a.listview),
										d = -1,
										h = t.scrollTop();
									t.scrollTop(0),
										s
											.children('.' + a.listitem + '_divider')
											.not('.' + a.hidden)
											.each(function() {
												d < 0 &&
													i ==
														e(this)
															.text()
															.slice(0, 1)
															.toLowerCase() &&
													(d = e(this).position().top);
											}),
										t.scrollTop(d > -1 ? d : h);
								});
						var o = function(e) {
							(e = e || this.$pnls.children('.' + a.panel + '_opened')),
								this.$menu[(e.hasClass(a.panel + '_has-sectionindexer') ? 'add' : 'remove') + 'Class'](
									a.menu + '_has-sectionindexer'
								);
						};
						this.bind('openPanel:start', o), this.bind('initPanels:after', o);
					}
				});
			},
			add: function() {
				(a = e.mmenu._c), e.mmenu._d, (n = e.mmenu._e), a.add('sectionindexer'), n.add('mouseover');
			},
			clickAnchor: function(e, n) {
				if (e.parent().is('.' + a.indexer)) return !0;
			},
		}),
			(e.mmenu.defaults[i] = { add: !1, addTo: 'panels' });
	})(jQuery);
	!(function(e) {
		var t,
			n,
			i = 'setSelected';
		(e.mmenu.addons[i] = {
			setup: function() {
				var s = this,
					a = this.opts[i];
				this.conf[i];
				if (
					(e.mmenu.glbl,
					'boolean' == typeof a && (a = { hover: a, parent: a }),
					'object' != typeof a && (a = {}),
					'detect' == (a = this.opts[i] = e.extend(!0, {}, e.mmenu.defaults[i], a)).current)
				) {
					var l = function(e) {
						e = e.split('?')[0].split('#')[0];
						var t = s.$menu.find('a[href="' + e + '"], a[href="' + e + '/"]');
						t.length
							? s.setSelected(t.parent(), !0)
							: (e = e.split('/').slice(0, -1)).length && l(e.join('/'));
					};
					this.bind('initMenu:after', function() {
						l(window.location.href);
					});
				} else
					a.current ||
						this.bind('initListview:after', function(e) {
							e.find('.' + t.listview)
								.children('.' + t.listitem + '_selected')
								.removeClass(t.listitem + '_selected');
						});
				a.hover &&
					this.bind('initMenu:after', function() {
						this.$menu.addClass(t.menu + '_selected-hover');
					}),
					a.parent &&
						(this.bind('openPanel:finish', function(e) {
							this.$pnls
								.find('.' + t.listview)
								.find('.' + t.listitem + '_selected-parent')
								.removeClass(t.listitem + '_selected-parent');
							for (var i = e.data(n.parent); i; )
								i.not('.' + t.listitem + '_vertical').addClass(t.listitem + '_selected-parent'),
									(i = i.closest('.' + t.panel).data(n.parent));
						}),
						this.bind('initMenu:after', function() {
							this.$menu.addClass(t.menu + '_selected-parent');
						}));
			},
			add: function() {
				(t = e.mmenu._c), (n = e.mmenu._d), e.mmenu._e;
			},
			clickAnchor: function(e, t) {},
		}),
			(e.mmenu.defaults[i] = { current: !0, hover: !1, parent: !1 });
	})(jQuery);
	!(function(e) {
		var d, s;
		(e.mmenu.addons.sidebar = {
			setup: function() {
				if (this.opts.offCanvas) {
					var a = this.opts.sidebar;
					this.conf.sidebar;
					(s = e.mmenu.glbl),
						('string' == typeof a || ('boolean' == typeof a && a) || 'number' == typeof a) &&
							(a = { expanded: a }),
						'object' != typeof a && (a = {}),
						'boolean' == typeof a.collapsed && a.collapsed && (a.collapsed = 'all'),
						('string' != typeof a.collapsed && 'number' != typeof a.collapsed) ||
							(a.collapsed = { use: a.collapsed }),
						'object' != typeof a.collapsed && (a.collapsed = {}),
						'number' == typeof a.collapsed.use &&
							(a.collapsed.use = '(min-width: ' + a.collapsed.use + 'px)'),
						'boolean' == typeof a.expanded && a.expanded && (a.expanded = 'all'),
						('string' != typeof a.expanded && 'number' != typeof a.expanded) ||
							(a.expanded = { use: a.expanded }),
						'object' != typeof a.expanded && (a.expanded = {}),
						'number' == typeof a.expanded.use && (a.expanded.use = '(min-width: ' + a.expanded.use + 'px)'),
						(a = this.opts.sidebar = e.extend(!0, {}, e.mmenu.defaults.sidebar, a));
					var n = d.wrapper + '_sidebar-collapsed';
					a.collapsed.size && (n += ' ' + d.wrapper + '_sidebar-collapsed-' + a.collapsed.size);
					var i = d.wrapper + '_sidebar-expanded';
					a.expanded.size && (i += ' ' + d.wrapper + '_sidebar-expanded-' + a.expanded.size),
						a.collapsed.use &&
							(this.bind('initMenu:after', function() {
								this.$menu.addClass(d.menu + '_sidebar-collapsed'),
									a.collapsed.blockMenu &&
										this.opts.offCanvas &&
										!this.$menu.children('.' + d.menu + '__blocker').length &&
										this.$menu.prepend(
											'<a class="' +
												d.menu +
												'__blocker" href="#' +
												this.$menu.attr('id') +
												'" />'
										),
									a.collapsed.hideNavbar && this.$menu.addClass(d.menu + '_hidenavbar'),
									a.collapsed.hideDivider && this.$menu.addClass(d.menu + '_hidedivider');
							}),
							'boolean' == typeof a.collapsed.use
								? this.bind('initMenu:after', function() {
										s.$html.addClass(n);
								  })
								: this.matchMedia(
										a.collapsed.use,
										function() {
											s.$html.addClass(n);
										},
										function() {
											s.$html.removeClass(n);
										}
								  )),
						a.expanded.use &&
							(this.bind('initMenu:after', function() {
								this.$menu.addClass(d.menu + '_sidebar-expanded');
							}),
							'boolean' == typeof a.expanded.use
								? this.bind('initMenu:after', function() {
										s.$html.addClass(i), this.open();
								  })
								: this.matchMedia(
										a.expanded.use,
										function() {
											s.$html.addClass(i),
												s.$html.hasClass(d.wrapper + '_sidebar-closed') || this.open();
										},
										function() {
											s.$html.removeClass(i), this.close();
										}
								  ),
							this.bind('close:start', function() {
								s.$html.hasClass(i) && s.$html.addClass(d.wrapper + '_sidebar-closed');
							}),
							this.bind('open:start', function() {
								s.$html.removeClass(d.wrapper + '_sidebar-closed');
							}));
				}
			},
			add: function() {
				(d = e.mmenu._c), e.mmenu._d, e.mmenu._e;
			},
			clickAnchor: function(e, a, n) {
				if (this.opts.sidebar.expanded.use && s.$html.is('.' + d.wrapper + '_sidebar-expanded') && a && n)
					return { close: !1 };
			},
		}),
			(e.mmenu.defaults.sidebar = {
				collapsed: { use: !1, blockMenu: !0, hideDivider: !1, hideNavbar: !0 },
				expanded: { use: !1 },
			}),
			(e.mmenu.configuration.sidebar = {});
	})(jQuery);
	!(function(e) {
		var t;
		(e.mmenu.addons.toggles = {
			setup: function() {
				var s = this;
				this.opts.toggles, this.conf.toggles;
				e.mmenu.glbl,
					this.bind('initPanels:after', function(n) {
						this.__refactorClass(n.find('input'), this.conf.classNames.toggles.toggle, t.toggle),
							this.__refactorClass(n.find('input'), this.conf.classNames.toggles.check, t.check),
							n.find('input.' + t.toggle + ', input.' + t.check).each(function() {
								var n = e(this),
									l = n.closest('li'),
									c = n.hasClass(t.toggle) ? 'toggle' : 'check',
									i = n.attr('id') || s.__getUniqueId();
								l.children('label[for="' + i + '"]').length ||
									(n.attr('id', i),
									l.prepend(n),
									e('<label for="' + i + '" class="' + t[c] + '"></label>').insertAfter(
										l.children('.' + t.listitem + '__text').last()
									));
							});
					});
			},
			add: function() {
				(t = e.mmenu._c), e.mmenu._d, e.mmenu._e, t.add('toggle check');
			},
			clickAnchor: function(e, t) {},
		}),
			(e.mmenu.configuration.classNames.toggles = { toggle: 'Toggle', check: 'Check' });
	})(jQuery);
	!(function(a) {
		a.mmenu.addons.navbars.breadcrumbs = function(r, n, e) {
			var s = this,
				t = a.mmenu._c,
				i = a.mmenu._d;
			t.add('separator');
			var b = a('<span class="' + t.navbar + '__breadcrumbs" />').appendTo(r);
			this.bind('initNavbar:after', function(r) {
				if (!r.children('.' + t.navbar).children('.' + t.navbar + '__breadcrumbs').length) {
					r.removeClass(t.panel + '_has-navbar');
					for (
						var n = [], s = a('<span class="' + t.navbar + '__breadcrumbs"></span>'), b = r, c = !0;
						b && b.length;

					) {
						if (
							(b.is('.' + t.panel) || (b = b.closest('.' + t.panel)),
							!b.parent('.' + t.listitem + '_vertical').length)
						) {
							var d = b
								.children('.' + t.navbar)
								.children('.' + t.navbar + '__title')
								.text();
							d.length &&
								n.unshift(
									c ? '<span>' + d + '</span>' : '<a href="#' + b.attr('id') + '">' + d + '</a>'
								),
								(c = !1);
						}
						b = b.data(i.parent);
					}
					e.breadcrumbs.removeFirst && n.shift(),
						s
							.append(n.join('<span class="' + t.separator + '">' + e.breadcrumbs.separator + '</span>'))
							.appendTo(r.children('.' + t.navbar));
				}
			}),
				this.bind('openPanel:start', function(a) {
					var r = a.find('.' + t.navbar + '__breadcrumbs');
					r.length && b.html(r.html() || '');
				}),
				this.bind('initNavbar:after:sr-aria', function(r) {
					r.children('.' + t.navbar)
						.children('.' + t.breadcrumbs)
						.children('a')
						.each(function() {
							s.__sr_aria(
								a(this),
								'owns',
								a(this)
									.attr('href')
									.slice(1)
							);
						});
				});
		};
	})(jQuery);
	!(function(t) {
		t.mmenu.addons.navbars.close = function(e, n) {
			var s = t.mmenu._c;
			t.mmenu.glbl;
			s.add('close');
			var a = t('<a class="' + s.btn + ' ' + s.btn + '_close ' + s.navbar + '__btn" href="#" />').appendTo(e);
			this.bind('setPage:after', function(t) {
				a.attr('href', '#' + t.attr('id'));
			}),
				this.bind('setPage:after:sr-text', function(t) {
					a.html(this.__sr_text(this.i18n(this.conf.screenReader.text.closeMenu))),
						this.__sr_aria(a, 'owns', a.attr('href').slice(1));
				});
		};
	})(jQuery);
	!(function(a) {
		(a.mmenu.addons.navbars.next = function(n, t) {
			var e,
				s,
				r,
				i = a.mmenu._c,
				h = a('<a class="' + i.btn + ' ' + i.btn + '_next ' + i.navbar + '__btn" href="#" />').appendTo(n);
			this.bind('openPanel:start', function(a) {
				(e = a.find('.' + this.conf.classNames.navbars.panelNext)),
					(s = e.attr('href')),
					(r = e.html()),
					s ? h.attr('href', s) : h.removeAttr('href'),
					h[s || r ? 'removeClass' : 'addClass'](i.hidden),
					h.html(r);
			}),
				this.bind('openPanel:start:sr-aria', function(a) {
					this.__sr_aria(h, 'hidden', h.hasClass(i.hidden)),
						this.__sr_aria(h, 'owns', (h.attr('href') || '').slice(1));
				});
		}),
			(a.mmenu.configuration.classNames.navbars.panelNext = 'Next');
	})(jQuery);
	!(function(a) {
		(a.mmenu.addons.navbars.prev = function(n, r) {
			var e,
				t,
				i,
				s = a.mmenu._c,
				h = a('<a class="' + s.btn + ' ' + s.btn + '_prev ' + s.navbar + '__btn" href="#" />').appendTo(n);
			this.bind('initNavbar:after', function(a) {
				a.removeClass(s.panel + '_has-navbar');
			}),
				this.bind('openPanel:start', function(a) {
					a.parent('.' + s.listitem + '_vertical').length ||
						((e = a.find('.' + this.conf.classNames.navbars.panelPrev)).length ||
							(e = a.children('.' + s.navbar).children('.' + s.btn + '_prev')),
						(t = e.attr('href')),
						(i = e.html()),
						t ? h.attr('href', t) : h.removeAttr('href'),
						h[t || i ? 'removeClass' : 'addClass'](s.hidden),
						h.html(i));
				}),
				this.bind('initNavbar:after:sr-aria', function(a) {
					var n = a.children('.' + s.navbar);
					this.__sr_aria(n, 'hidden', !0);
				}),
				this.bind('openPanel:start:sr-aria', function(a) {
					this.__sr_aria(h, 'hidden', h.hasClass(s.hidden)),
						this.__sr_aria(h, 'owns', (h.attr('href') || '').slice(1));
				});
		}),
			(a.mmenu.configuration.classNames.navbars.panelPrev = 'Prev');
	})(jQuery);
	!(function(e) {
		e.mmenu.addons.navbars.searchfield = function(s, t) {
			e.mmenu._c;
			'object' != typeof this.opts.searchfield && (this.opts.searchfield = {}),
				(this.opts.searchfield.add = !0),
				(this.opts.searchfield.addTo = s);
		};
	})(jQuery);
	!(function(a) {
		a.mmenu.addons.navbars.tabs = function(e, t, n) {
			var s = a.mmenu._c,
				r = a.mmenu._d,
				l = a.mmenu._e,
				d = this,
				i = e.children('a');
			e
				.addClass(s.navbar + '_tabs')
				.parent()
				.addClass(s.navbars + '_has-tabs'),
				i.on(l.click + '-navbars', function(e) {
					e.preventDefault();
					var t = a(this);
					if (t.hasClass(s.navbar + '__tab_selected')) e.stopImmediatePropagation();
					else
						try {
							d.openPanel(a(t.attr('href')), !1), e.stopImmediatePropagation();
						} catch (a) {}
				}),
				this.bind('openPanel:start', function a(e) {
					i.removeClass(s.navbar + '__tab_selected');
					var t = i.filter('[href="#' + e.attr('id') + '"]');
					if (t.length) t.addClass(s.navbar + '__tab_selected');
					else {
						var n = e.data(r.parent);
						n && n.length && a(n.closest('.' + s.panel));
					}
				});
		};
	})(jQuery);
	!(function(t) {
		(t.mmenu.addons.navbars.title = function(a, n) {
			var e,
				i,
				r,
				s,
				l = t.mmenu._c,
				h = t('<a class="' + l.navbar + '__title" />').appendTo(a);
			this.bind('openPanel:start', function(t) {
				t.parent('.' + l.listitem + '_vertical').length ||
					((r = t.find('.' + this.conf.classNames.navbars.panelTitle)).length ||
						(r = t.children('.' + l.navbar).children('.' + l.navbar + '__title')),
					(e = r.attr('href')),
					(i = r.html() || n.title),
					e ? h.attr('href', e) : h.removeAttr('href'),
					h[e || i ? 'removeClass' : 'addClass'](l.hidden),
					h.html(i));
			}),
				this.bind('openPanel:start:sr-aria', function(t) {
					if (
						this.opts.screenReader.text &&
						(s ||
							(s = this.$menu
								.children('.' + l.navbars + '_top, .' + l.navbars + '_bottom')
								.children('.' + l.navbar)
								.children('.' + l.btn + '_prev')),
						s.length)
					) {
						var a = !0;
						'parent' == this.opts.navbar.titleLink && (a = !s.hasClass(l.hidden)),
							this.__sr_aria(h, 'hidden', a);
					}
				});
		}),
			(t.mmenu.configuration.classNames.navbars.panelTitle = 'Title');
	})(jQuery);
	jQuery.mmenu.wrappers.angular = function() {
		this.opts.onClick = { close: !0, preventDefault: !1, setSelected: !0 };
	};
	!(function(n) {
		n.mmenu.wrappers.bootstrap3 = function() {
			if (this.$menu.hasClass('navbar-collapse')) {
				(this.conf.classNames.selected = 'active'),
					(this.conf.classNames.divider = 'divider'),
					(this.conf.clone = !0),
					(this.opts.hooks = this.opts.hooks || {});
				for (var n = '', e = ['nav-tabs', 'nav-pills', 'navbar-nav'], t = 0; t < e.length; t++)
					if (this.$menu.find('.' + e[t]).length) {
						n = e[t];
						break;
					}
				n.length &&
					((this.opts.hooks['initMenu:before'] = function() {
						'navbar-nav' == n && this.$menu.wrapInner('<div />');
					}),
					(this.opts.hooks['initMenu:after'] = function() {
						a.menu.call(this),
							a.dropdown.call(this),
							a[
								n
									.split('nav-')
									.join('')
									.split('-nav')
									.join('')
							].call(this);
					}));
			}
		};
		var a = {
			menu: function() {
				this.$menu
					.find('.nav')
					.removeClass('nav')
					.end()
					.find('.sr-only')
					.remove()
					.end()
					.find('.divider:empty')
					.remove();
				for (var n = ['role', 'aria-haspopup', 'aria-expanded'], a = 0; a < n.length; a++)
					this.$menu.find('[' + n[a] + ']').removeAttr(n[a]);
			},
			dropdown: function() {
				var a = this.$menu.find('.dropdown');
				a.removeClass('dropdown'),
					a
						.children('.dropdown-toggle')
						.find('.caret')
						.remove()
						.end()
						.each(function() {
							n(this).replaceWith('<span>' + n(this).html() + '</span>');
						}),
					a.children('.dropdown-menu').removeClass('dropdown-menu');
			},
			tabs: function() {
				this.$menu.find('.nav-tabs').removeClass('nav-tabs');
			},
			pills: function() {
				this.$menu.find('.nav-pills').removeClass('nav-pills');
			},
			navbar: function() {
				var n = this;
				this.$menu
					.removeClass('collapse navbar-collapse')
					.find('[class*="navbar-"]')
					.removeClass('navbar-left navbar-right navbar-nav navbar-text navbar-btn');
				var a = this.$menu.find('.navbar-form');
				(this.conf.searchform = {
					form: { action: a.attr('action'), method: a.attr('method') },
					input: { name: a.find('input').attr('name') },
					submit: !0,
				}),
					a.remove(),
					(this.$orig || this.$menu)
						.closest('.navbar')
						.find('.navbar-header')
						.find('.navbar-toggle')
						.off('click')
						.on('click', function(a) {
							n.open(), a.stopImmediatePropagation(), a.preventDefault();
						});
			},
		};
	})(jQuery);
	!(function(a) {
		function n(n) {
			for (
				var e = n.is('a') ? a('<a />') : a('<span />'), t = ['href', 'title', 'target'], r = 0;
				r < t.length;
				r++
			)
				void 0 !== n.attr(t[r]) && e.attr(t[r], n.attr(t[r]));
			return e.html(n.html()), e.find('.sr-only').remove(), e;
		}
		function e(e) {
			var t = a('<ul />');
			return (
				e.children().each(function() {
					var e = a(this),
						r = a('<li />');
					e.hasClass('dropdown-divider')
						? r.addClass('Divider')
						: e.hasClass('dropdown-item') && r.append(n(e)),
						t.append(r);
				}),
				t
			);
		}
		a.mmenu.wrappers.bootstrap4 = function() {
			var t = this;
			if (this.$menu.hasClass('navbar-collapse')) {
				this.conf.clone = !1;
				var r = a('<nav />'),
					i = a('<div />');
				r.append(i),
					this.$menu.children().each(function() {
						var r,
							s,
							o = a(this);
						switch (!0) {
							case o.hasClass('navbar-nav'):
								i.append(
									((r = o),
									(s = a('<ul />')),
									r.find('.nav-item').each(function() {
										var t = a(this),
											r = a('<li />');
										if ((t.hasClass('active') && r.addClass('Selected'), !t.hasClass('nav-link'))) {
											var i = t.children('.dropdown-menu');
											i.length && r.append(e(i)), (t = t.children('.nav-link'));
										}
										r.prepend(n(t)), s.append(r);
									}),
									s)
								);
								break;
							case o.hasClass('dropdown-menu'):
								i.append(e(o));
								break;
							case o.hasClass('form-inline'):
								(t.conf.searchfield.form = {
									action: o.attr('action') || null,
									method: o.attr('method') || null,
								}),
									(t.conf.searchfield.input = { name: o.find('input').attr('name') || null }),
									(t.conf.searchfield.clear = !1),
									(t.conf.searchfield.submit = !0);
								break;
							default:
								i.append(o.clone(!0));
						}
					}),
					this.bind('initMenu:before', function() {
						r.prependTo('body'), (this.$menu = r);
					}),
					this.$menu
						.parent()
						.find('.navbar-toggler')
						.removeAttr('data-target')
						.removeAttr('aria-controls')
						.off('click')
						.on('click', function(a) {
							a.preventDefault(), a.stopImmediatePropagation(), t[t.vars.opened ? 'close' : 'open']();
						});
			}
		};
	})(jQuery);
	!(function(e) {
		e.mmenu.wrappers.jqueryMobile = function() {
			var n = this;
			(this.opts.onClick.close = !1),
				(this.conf.offCanvas.page.selector = 'div.ui-page-active'),
				e('body').on('pagecontainerchange', function(e, t) {
					'function' == typeof n.close && (n.close(), n.setPage(t.toPage));
				}),
				this.bind('initAnchors:after', function() {
					e('body').on('click', '.mm-listview a', function(n) {
						n.isDefaultPrevented() ||
							(n.preventDefault(), e('body').pagecontainer('change', e(this).attr('href')));
					});
				});
		};
	})(jQuery);
	jQuery.mmenu.wrappers.magento = function() {
		this.conf.classNames.selected = 'active';
	};
	jQuery.mmenu.wrappers.olark = function() {
		this.conf.offCanvas.page.noSelector.push('#olark');
	};
	!(function(n) {
		n.mmenu.wrappers.turbolinks = function() {
			var t, o;
			n(document)
				.on('turbolinks:before-visit', function() {
					(o = n('html')),
						(t = o.attr('class')),
						(t = n
							.grep(t.split(/\s+/), function(n) {
								return !/mm-/.test(n);
							})
							.join(' '));
				})
				.on('turbolinks:load', function() {
					void 0 !== o && (o.attr('class', t), (n.mmenu.glbl = !1));
				});
		};
	})(jQuery);
	!(function(s) {
		s.mmenu.wrappers.wordpress = function() {
			(this.conf.classNames.selected = 'current-menu-item'),
				s('#wpadminbar')
					.css('position', 'fixed')
					.addClass('mm-slideout');
		};
	})(jQuery);
	jQuery.mmenu.i18n({ Menu: 'Menü' }, 'de');
	jQuery.mmenu.i18n(
		{
			'Close menu': 'Menü schließen',
			'Close submenu': 'Untermenü schließen',
			'Open submenu': 'Untermenü öffnen',
			'Toggle submenu': 'Untermenü wechseln',
		},
		'de'
	);
	jQuery.mmenu.i18n({ Search: 'Suche', 'No results found.': 'Keine Ergebnisse gefunden.', cancel: 'beenden' }, 'de');
	jQuery.mmenu.i18n({ Menu: 'منو' }, 'fa');
	jQuery.mmenu.i18n(
		{
			'Close menu': 'بستن منو',
			'Close submenu': 'بستن زیرمنو',
			'Open submenu': 'بازکردن زیرمنو',
			'Toggle submenu': 'سوییچ زیرمنو',
		},
		'fa'
	);
	jQuery.mmenu.i18n({ Search: 'جستجو', 'No results found.': 'نتیجه‌ای یافت نشد.', cancel: 'انصراف' }, 'fa');
	jQuery.mmenu.i18n({ Menu: 'Menu' }, 'nl');
	jQuery.mmenu.i18n(
		{
			'Close menu': 'Menu sluiten',
			'Close submenu': 'Submenu sluiten',
			'Open submenu': 'Submenu openen',
			'Toggle submenu': 'Submenu wisselen',
		},
		'nl'
	);
	jQuery.mmenu.i18n(
		{ Search: 'Zoeken', 'No results found.': 'Geen resultaten gevonden.', cancel: 'annuleren' },
		'nl'
	);
	jQuery.mmenu.i18n({ Menu: 'Меню' }, 'ru');
	jQuery.mmenu.i18n(
		{
			'Close menu': 'Закрыть меню',
			'Close submenu': 'Закрыть подменю',
			'Open submenu': 'Открыть подменю',
			'Toggle submenu': 'Переключить подменю',
		},
		'ru'
	);
	jQuery.mmenu.i18n(
		{ Search: 'Найти', 'No results found.': 'Ничего не найдено.', 'Search results': 'Результаты поиска' },
		'ru'
	);
	return jQuery.mmenu;
});
