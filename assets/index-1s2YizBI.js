(function () {
	const t = document.createElement('link').relList;
	if (t && t.supports && t.supports('modulepreload')) return;
	for (const r of document.querySelectorAll('link[rel="modulepreload"]')) n(r);
	new MutationObserver(r => {
		for (const i of r)
			if (i.type === 'childList')
				for (const l of i.addedNodes)
					l.tagName === 'LINK' && l.rel === 'modulepreload' && n(l);
	}).observe(document, { childList: !0, subtree: !0 });
	function s(r) {
		const i = {};
		return (
			r.integrity && (i.integrity = r.integrity),
			r.referrerPolicy && (i.referrerPolicy = r.referrerPolicy),
			r.crossOrigin === 'use-credentials'
				? (i.credentials = 'include')
				: r.crossOrigin === 'anonymous'
					? (i.credentials = 'omit')
					: (i.credentials = 'same-origin'),
			i
		);
	}
	function n(r) {
		if (r.ep) return;
		r.ep = !0;
		const i = s(r);
		fetch(r.href, i);
	}
})();
/**
 * @vue/shared v3.4.25
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ /*! #__NO_SIDE_EFFECTS__ */ function ps(e, t) {
	const s = new Set(e.split(','));
	return n => s.has(n);
}
const V = {},
	qe = [],
	oe = () => {},
	Or = () => !1,
	Ft = e =>
		e.charCodeAt(0) === 111 &&
		e.charCodeAt(1) === 110 &&
		(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
	gs = e => e.startsWith('onUpdate:'),
	z = Object.assign,
	_s = (e, t) => {
		const s = e.indexOf(t);
		s > -1 && e.splice(s, 1);
	},
	Sr = Object.prototype.hasOwnProperty,
	R = (e, t) => Sr.call(e, t),
	I = Array.isArray,
	ze = e => Lt(e) === '[object Map]',
	vn = e => Lt(e) === '[object Set]',
	P = e => typeof e == 'function',
	G = e => typeof e == 'string',
	Ke = e => typeof e == 'symbol',
	B = e => e !== null && typeof e == 'object',
	wn = e => (B(e) || P(e)) && P(e.then) && P(e.catch),
	En = Object.prototype.toString,
	Lt = e => En.call(e),
	Ir = e => Lt(e).slice(8, -1),
	Cn = e => Lt(e) === '[object Object]',
	ms = e => G(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
	st = ps(
		',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted',
	),
	Ht = e => {
		const t = Object.create(null);
		return s => t[s] || (t[s] = e(s));
	},
	Tr = /-(\w)/g,
	Je = Ht(e => e.replace(Tr, (t, s) => (s ? s.toUpperCase() : ''))),
	Pr = /\B([A-Z])/g,
	Ze = Ht(e => e.replace(Pr, '-$1').toLowerCase()),
	On = Ht(e => e.charAt(0).toUpperCase() + e.slice(1)),
	Gt = Ht(e => (e ? `on${On(e)}` : '')),
	Ae = (e, t) => !Object.is(e, t),
	Jt = (e, t) => {
		for (let s = 0; s < e.length; s++) e[s](t);
	},
	Sn = (e, t, s) => {
		Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: s });
	},
	Ar = e => {
		const t = parseFloat(e);
		return isNaN(t) ? e : t;
	};
let Ks;
const In = () =>
	Ks ||
	(Ks =
		typeof globalThis < 'u'
			? globalThis
			: typeof self < 'u'
				? self
				: typeof window < 'u'
					? window
					: typeof global < 'u'
						? global
						: {});
function bs(e) {
	if (I(e)) {
		const t = {};
		for (let s = 0; s < e.length; s++) {
			const n = e[s],
				r = G(n) ? Lr(n) : bs(n);
			if (r) for (const i in r) t[i] = r[i];
		}
		return t;
	} else if (G(e) || B(e)) return e;
}
const Rr = /;(?![^(]*\))/g,
	Mr = /:([^]+)/,
	Fr = /\/\*[^]*?\*\//g;
function Lr(e) {
	const t = {};
	return (
		e
			.replace(Fr, '')
			.split(Rr)
			.forEach(s => {
				if (s) {
					const n = s.split(Mr);
					n.length > 1 && (t[n[0].trim()] = n[1].trim());
				}
			}),
		t
	);
}
function ys(e) {
	let t = '';
	if (G(e)) t = e;
	else if (I(e))
		for (let s = 0; s < e.length; s++) {
			const n = ys(e[s]);
			n && (t += n + ' ');
		}
	else if (B(e)) for (const s in e) e[s] && (t += s + ' ');
	return t.trim();
}
const Hr =
		'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
	Nr = ps(Hr);
function Tn(e) {
	return !!e || e === '';
}
const Ds = e =>
		G(e)
			? e
			: e == null
				? ''
				: I(e) || (B(e) && (e.toString === En || !P(e.toString)))
					? JSON.stringify(e, Pn, 2)
					: String(e),
	Pn = (e, t) =>
		t && t.__v_isRef
			? Pn(e, t.value)
			: ze(t)
				? {
						[`Map(${t.size})`]: [...t.entries()].reduce(
							(s, [n, r], i) => ((s[Yt(n, i) + ' =>'] = r), s),
							{},
						),
					}
				: vn(t)
					? { [`Set(${t.size})`]: [...t.values()].map(s => Yt(s)) }
					: Ke(t)
						? Yt(t)
						: B(t) && !I(t) && !Cn(t)
							? String(t)
							: t,
	Yt = (e, t = '') => {
		var s;
		return Ke(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e;
	};
/**
 * @vue/reactivity v3.4.25
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let ce;
class jr {
	constructor(t = !1) {
		(this.detached = t),
			(this._active = !0),
			(this.effects = []),
			(this.cleanups = []),
			(this.parent = ce),
			!t && ce && (this.index = (ce.scopes || (ce.scopes = [])).push(this) - 1);
	}
	get active() {
		return this._active;
	}
	run(t) {
		if (this._active) {
			const s = ce;
			try {
				return (ce = this), t();
			} finally {
				ce = s;
			}
		}
	}
	on() {
		ce = this;
	}
	off() {
		ce = this.parent;
	}
	stop(t) {
		if (this._active) {
			let s, n;
			for (s = 0, n = this.effects.length; s < n; s++) this.effects[s].stop();
			for (s = 0, n = this.cleanups.length; s < n; s++) this.cleanups[s]();
			if (this.scopes)
				for (s = 0, n = this.scopes.length; s < n; s++) this.scopes[s].stop(!0);
			if (!this.detached && this.parent && !t) {
				const r = this.parent.scopes.pop();
				r &&
					r !== this &&
					((this.parent.scopes[this.index] = r), (r.index = this.index));
			}
			(this.parent = void 0), (this._active = !1);
		}
	}
}
function $r(e, t = ce) {
	t && t.active && t.effects.push(e);
}
function Vr() {
	return ce;
}
let Ve;
class xs {
	constructor(t, s, n, r) {
		(this.fn = t),
			(this.trigger = s),
			(this.scheduler = n),
			(this.active = !0),
			(this.deps = []),
			(this._dirtyLevel = 4),
			(this._trackId = 0),
			(this._runnings = 0),
			(this._shouldSchedule = !1),
			(this._depsLength = 0),
			$r(this, r);
	}
	get dirty() {
		if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
			(this._dirtyLevel = 1), Re();
			for (let t = 0; t < this._depsLength; t++) {
				const s = this.deps[t];
				if (s.computed && (Ur(s.computed), this._dirtyLevel >= 4)) break;
			}
			this._dirtyLevel === 1 && (this._dirtyLevel = 0), Me();
		}
		return this._dirtyLevel >= 4;
	}
	set dirty(t) {
		this._dirtyLevel = t ? 4 : 0;
	}
	run() {
		if (((this._dirtyLevel = 0), !this.active)) return this.fn();
		let t = Ie,
			s = Ve;
		try {
			return (Ie = !0), (Ve = this), this._runnings++, Ws(this), this.fn();
		} finally {
			qs(this), this._runnings--, (Ve = s), (Ie = t);
		}
	}
	stop() {
		var t;
		this.active &&
			(Ws(this),
			qs(this),
			(t = this.onStop) == null || t.call(this),
			(this.active = !1));
	}
}
function Ur(e) {
	return e.value;
}
function Ws(e) {
	e._trackId++, (e._depsLength = 0);
}
function qs(e) {
	if (e.deps.length > e._depsLength) {
		for (let t = e._depsLength; t < e.deps.length; t++) An(e.deps[t], e);
		e.deps.length = e._depsLength;
	}
}
function An(e, t) {
	const s = e.get(t);
	s !== void 0 &&
		t._trackId !== s &&
		(e.delete(t), e.size === 0 && e.cleanup());
}
let Ie = !0,
	ns = 0;
const Rn = [];
function Re() {
	Rn.push(Ie), (Ie = !1);
}
function Me() {
	const e = Rn.pop();
	Ie = e === void 0 ? !0 : e;
}
function vs() {
	ns++;
}
function ws() {
	for (ns--; !ns && rs.length; ) rs.shift()();
}
function Mn(e, t, s) {
	if (t.get(e) !== e._trackId) {
		t.set(e, e._trackId);
		const n = e.deps[e._depsLength];
		n !== t ? (n && An(n, e), (e.deps[e._depsLength++] = t)) : e._depsLength++;
	}
}
const rs = [];
function Fn(e, t, s) {
	vs();
	for (const n of e.keys()) {
		let r;
		n._dirtyLevel < t &&
			(r ?? (r = e.get(n) === n._trackId)) &&
			(n._shouldSchedule || (n._shouldSchedule = n._dirtyLevel === 0),
			(n._dirtyLevel = t)),
			n._shouldSchedule &&
				(r ?? (r = e.get(n) === n._trackId)) &&
				(n.trigger(),
				(!n._runnings || n.allowRecurse) &&
					n._dirtyLevel !== 2 &&
					((n._shouldSchedule = !1), n.scheduler && rs.push(n.scheduler)));
	}
	ws();
}
const Ln = (e, t) => {
		const s = new Map();
		return (s.cleanup = e), (s.computed = t), s;
	},
	is = new WeakMap(),
	Ue = Symbol(''),
	os = Symbol('');
function te(e, t, s) {
	if (Ie && Ve) {
		let n = is.get(e);
		n || is.set(e, (n = new Map()));
		let r = n.get(s);
		r || n.set(s, (r = Ln(() => n.delete(s)))), Mn(Ve, r);
	}
}
function ve(e, t, s, n, r, i) {
	const l = is.get(e);
	if (!l) return;
	let f = [];
	if (t === 'clear') f = [...l.values()];
	else if (s === 'length' && I(e)) {
		const u = Number(n);
		l.forEach((d, h) => {
			(h === 'length' || (!Ke(h) && h >= u)) && f.push(d);
		});
	} else
		switch ((s !== void 0 && f.push(l.get(s)), t)) {
			case 'add':
				I(e)
					? ms(s) && f.push(l.get('length'))
					: (f.push(l.get(Ue)), ze(e) && f.push(l.get(os)));
				break;
			case 'delete':
				I(e) || (f.push(l.get(Ue)), ze(e) && f.push(l.get(os)));
				break;
			case 'set':
				ze(e) && f.push(l.get(Ue));
				break;
		}
	vs();
	for (const u of f) u && Fn(u, 4);
	ws();
}
const Br = ps('__proto__,__v_isRef,__isVue'),
	Hn = new Set(
		Object.getOwnPropertyNames(Symbol)
			.filter(e => e !== 'arguments' && e !== 'caller')
			.map(e => Symbol[e])
			.filter(Ke),
	),
	zs = Kr();
function Kr() {
	const e = {};
	return (
		['includes', 'indexOf', 'lastIndexOf'].forEach(t => {
			e[t] = function (...s) {
				const n = F(this);
				for (let i = 0, l = this.length; i < l; i++) te(n, 'get', i + '');
				const r = n[t](...s);
				return r === -1 || r === !1 ? n[t](...s.map(F)) : r;
			};
		}),
		['push', 'pop', 'shift', 'unshift', 'splice'].forEach(t => {
			e[t] = function (...s) {
				Re(), vs();
				const n = F(this)[t].apply(this, s);
				return ws(), Me(), n;
			};
		}),
		e
	);
}
function Dr(e) {
	Ke(e) || (e = String(e));
	const t = F(this);
	return te(t, 'has', e), t.hasOwnProperty(e);
}
class Nn {
	constructor(t = !1, s = !1) {
		(this._isReadonly = t), (this._isShallow = s);
	}
	get(t, s, n) {
		const r = this._isReadonly,
			i = this._isShallow;
		if (s === '__v_isReactive') return !r;
		if (s === '__v_isReadonly') return r;
		if (s === '__v_isShallow') return i;
		if (s === '__v_raw')
			return n === (r ? (i ? si : Un) : i ? Vn : $n).get(t) ||
				Object.getPrototypeOf(t) === Object.getPrototypeOf(n)
				? t
				: void 0;
		const l = I(t);
		if (!r) {
			if (l && R(zs, s)) return Reflect.get(zs, s, n);
			if (s === 'hasOwnProperty') return Dr;
		}
		const f = Reflect.get(t, s, n);
		return (Ke(s) ? Hn.has(s) : Br(s)) || (r || te(t, 'get', s), i)
			? f
			: se(f)
				? l && ms(s)
					? f
					: f.value
				: B(f)
					? r
						? Bn(f)
						: Os(f)
					: f;
	}
}
class jn extends Nn {
	constructor(t = !1) {
		super(!1, t);
	}
	set(t, s, n, r) {
		let i = t[s];
		if (!this._isShallow) {
			const u = lt(i);
			if (
				(!Pt(n) && !lt(n) && ((i = F(i)), (n = F(n))), !I(t) && se(i) && !se(n))
			)
				return u ? !1 : ((i.value = n), !0);
		}
		const l = I(t) && ms(s) ? Number(s) < t.length : R(t, s),
			f = Reflect.set(t, s, n, r);
		return (
			t === F(r) && (l ? Ae(n, i) && ve(t, 'set', s, n) : ve(t, 'add', s, n)), f
		);
	}
	deleteProperty(t, s) {
		const n = R(t, s);
		t[s];
		const r = Reflect.deleteProperty(t, s);
		return r && n && ve(t, 'delete', s, void 0), r;
	}
	has(t, s) {
		const n = Reflect.has(t, s);
		return (!Ke(s) || !Hn.has(s)) && te(t, 'has', s), n;
	}
	ownKeys(t) {
		return te(t, 'iterate', I(t) ? 'length' : Ue), Reflect.ownKeys(t);
	}
}
class Wr extends Nn {
	constructor(t = !1) {
		super(!0, t);
	}
	set(t, s) {
		return !0;
	}
	deleteProperty(t, s) {
		return !0;
	}
}
const qr = new jn(),
	zr = new Wr(),
	Gr = new jn(!0);
const Es = e => e,
	Nt = e => Reflect.getPrototypeOf(e);
function bt(e, t, s = !1, n = !1) {
	e = e.__v_raw;
	const r = F(e),
		i = F(t);
	s || (Ae(t, i) && te(r, 'get', t), te(r, 'get', i));
	const { has: l } = Nt(r),
		f = n ? Es : s ? Is : ct;
	if (l.call(r, t)) return f(e.get(t));
	if (l.call(r, i)) return f(e.get(i));
	e !== r && e.get(t);
}
function yt(e, t = !1) {
	const s = this.__v_raw,
		n = F(s),
		r = F(e);
	return (
		t || (Ae(e, r) && te(n, 'has', e), te(n, 'has', r)),
		e === r ? s.has(e) : s.has(e) || s.has(r)
	);
}
function xt(e, t = !1) {
	return (
		(e = e.__v_raw), !t && te(F(e), 'iterate', Ue), Reflect.get(e, 'size', e)
	);
}
function Gs(e) {
	e = F(e);
	const t = F(this);
	return Nt(t).has.call(t, e) || (t.add(e), ve(t, 'add', e, e)), this;
}
function Js(e, t) {
	t = F(t);
	const s = F(this),
		{ has: n, get: r } = Nt(s);
	let i = n.call(s, e);
	i || ((e = F(e)), (i = n.call(s, e)));
	const l = r.call(s, e);
	return (
		s.set(e, t), i ? Ae(t, l) && ve(s, 'set', e, t) : ve(s, 'add', e, t), this
	);
}
function Ys(e) {
	const t = F(this),
		{ has: s, get: n } = Nt(t);
	let r = s.call(t, e);
	r || ((e = F(e)), (r = s.call(t, e))), n && n.call(t, e);
	const i = t.delete(e);
	return r && ve(t, 'delete', e, void 0), i;
}
function Zs() {
	const e = F(this),
		t = e.size !== 0,
		s = e.clear();
	return t && ve(e, 'clear', void 0, void 0), s;
}
function vt(e, t) {
	return function (n, r) {
		const i = this,
			l = i.__v_raw,
			f = F(l),
			u = t ? Es : e ? Is : ct;
		return (
			!e && te(f, 'iterate', Ue), l.forEach((d, h) => n.call(r, u(d), u(h), i))
		);
	};
}
function wt(e, t, s) {
	return function (...n) {
		const r = this.__v_raw,
			i = F(r),
			l = ze(i),
			f = e === 'entries' || (e === Symbol.iterator && l),
			u = e === 'keys' && l,
			d = r[e](...n),
			h = s ? Es : t ? Is : ct;
		return (
			!t && te(i, 'iterate', u ? os : Ue),
			{
				next() {
					const { value: x, done: E } = d.next();
					return E
						? { value: x, done: E }
						: { value: f ? [h(x[0]), h(x[1])] : h(x), done: E };
				},
				[Symbol.iterator]() {
					return this;
				},
			}
		);
	};
}
function Ee(e) {
	return function (...t) {
		return e === 'delete' ? !1 : e === 'clear' ? void 0 : this;
	};
}
function Jr() {
	const e = {
			get(i) {
				return bt(this, i);
			},
			get size() {
				return xt(this);
			},
			has: yt,
			add: Gs,
			set: Js,
			delete: Ys,
			clear: Zs,
			forEach: vt(!1, !1),
		},
		t = {
			get(i) {
				return bt(this, i, !1, !0);
			},
			get size() {
				return xt(this);
			},
			has: yt,
			add: Gs,
			set: Js,
			delete: Ys,
			clear: Zs,
			forEach: vt(!1, !0),
		},
		s = {
			get(i) {
				return bt(this, i, !0);
			},
			get size() {
				return xt(this, !0);
			},
			has(i) {
				return yt.call(this, i, !0);
			},
			add: Ee('add'),
			set: Ee('set'),
			delete: Ee('delete'),
			clear: Ee('clear'),
			forEach: vt(!0, !1),
		},
		n = {
			get(i) {
				return bt(this, i, !0, !0);
			},
			get size() {
				return xt(this, !0);
			},
			has(i) {
				return yt.call(this, i, !0);
			},
			add: Ee('add'),
			set: Ee('set'),
			delete: Ee('delete'),
			clear: Ee('clear'),
			forEach: vt(!0, !0),
		};
	return (
		['keys', 'values', 'entries', Symbol.iterator].forEach(i => {
			(e[i] = wt(i, !1, !1)),
				(s[i] = wt(i, !0, !1)),
				(t[i] = wt(i, !1, !0)),
				(n[i] = wt(i, !0, !0));
		}),
		[e, s, t, n]
	);
}
const [Yr, Zr, Xr, Qr] = Jr();
function Cs(e, t) {
	const s = t ? (e ? Qr : Xr) : e ? Zr : Yr;
	return (n, r, i) =>
		r === '__v_isReactive'
			? !e
			: r === '__v_isReadonly'
				? e
				: r === '__v_raw'
					? n
					: Reflect.get(R(s, r) && r in n ? s : n, r, i);
}
const kr = { get: Cs(!1, !1) },
	ei = { get: Cs(!1, !0) },
	ti = { get: Cs(!0, !1) };
const $n = new WeakMap(),
	Vn = new WeakMap(),
	Un = new WeakMap(),
	si = new WeakMap();
function ni(e) {
	switch (e) {
		case 'Object':
		case 'Array':
			return 1;
		case 'Map':
		case 'Set':
		case 'WeakMap':
		case 'WeakSet':
			return 2;
		default:
			return 0;
	}
}
function ri(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : ni(Ir(e));
}
function Os(e) {
	return lt(e) ? e : Ss(e, !1, qr, kr, $n);
}
function ii(e) {
	return Ss(e, !1, Gr, ei, Vn);
}
function Bn(e) {
	return Ss(e, !0, zr, ti, Un);
}
function Ss(e, t, s, n, r) {
	if (!B(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
	const i = r.get(e);
	if (i) return i;
	const l = ri(e);
	if (l === 0) return e;
	const f = new Proxy(e, l === 2 ? n : s);
	return r.set(e, f), f;
}
function nt(e) {
	return lt(e) ? nt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function lt(e) {
	return !!(e && e.__v_isReadonly);
}
function Pt(e) {
	return !!(e && e.__v_isShallow);
}
function Kn(e) {
	return e ? !!e.__v_raw : !1;
}
function F(e) {
	const t = e && e.__v_raw;
	return t ? F(t) : e;
}
function oi(e) {
	return Object.isExtensible(e) && Sn(e, '__v_skip', !0), e;
}
const ct = e => (B(e) ? Os(e) : e),
	Is = e => (B(e) ? Bn(e) : e);
class Dn {
	constructor(t, s, n, r) {
		(this.getter = t),
			(this._setter = s),
			(this.dep = void 0),
			(this.__v_isRef = !0),
			(this.__v_isReadonly = !1),
			(this.effect = new xs(
				() => t(this._value),
				() => Ct(this, this.effect._dirtyLevel === 2 ? 2 : 3),
			)),
			(this.effect.computed = this),
			(this.effect.active = this._cacheable = !r),
			(this.__v_isReadonly = n);
	}
	get value() {
		const t = F(this);
		return (
			(!t._cacheable || t.effect.dirty) &&
				Ae(t._value, (t._value = t.effect.run())) &&
				Ct(t, 4),
			Wn(t),
			t.effect._dirtyLevel >= 2 && Ct(t, 2),
			t._value
		);
	}
	set value(t) {
		this._setter(t);
	}
	get _dirty() {
		return this.effect.dirty;
	}
	set _dirty(t) {
		this.effect.dirty = t;
	}
}
function li(e, t, s = !1) {
	let n, r;
	const i = P(e);
	return (
		i ? ((n = e), (r = oe)) : ((n = e.get), (r = e.set)),
		new Dn(n, r, i || !r, s)
	);
}
function Wn(e) {
	var t;
	Ie &&
		Ve &&
		((e = F(e)),
		Mn(
			Ve,
			(t = e.dep) != null
				? t
				: (e.dep = Ln(() => (e.dep = void 0), e instanceof Dn ? e : void 0)),
		));
}
function Ct(e, t = 4, s) {
	e = F(e);
	const n = e.dep;
	n && Fn(n, t);
}
function se(e) {
	return !!(e && e.__v_isRef === !0);
}
function ci(e) {
	return fi(e, !1);
}
function fi(e, t) {
	return se(e) ? e : new ui(e, t);
}
class ui {
	constructor(t, s) {
		(this.__v_isShallow = s),
			(this.dep = void 0),
			(this.__v_isRef = !0),
			(this._rawValue = s ? t : F(t)),
			(this._value = s ? t : ct(t));
	}
	get value() {
		return Wn(this), this._value;
	}
	set value(t) {
		const s = this.__v_isShallow || Pt(t) || lt(t);
		(t = s ? t : F(t)),
			Ae(t, this._rawValue) &&
				((this._rawValue = t), (this._value = s ? t : ct(t)), Ct(this, 4));
	}
}
function ai(e) {
	return se(e) ? e.value : e;
}
const di = {
	get: (e, t, s) => ai(Reflect.get(e, t, s)),
	set: (e, t, s, n) => {
		const r = e[t];
		return se(r) && !se(s) ? ((r.value = s), !0) : Reflect.set(e, t, s, n);
	},
};
function qn(e) {
	return nt(e) ? e : new Proxy(e, di);
}
/**
 * @vue/runtime-core v3.4.25
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function Te(e, t, s, n) {
	try {
		return n ? e(...n) : e();
	} catch (r) {
		jt(r, t, s);
	}
}
function ae(e, t, s, n) {
	if (P(e)) {
		const r = Te(e, t, s, n);
		return (
			r &&
				wn(r) &&
				r.catch(i => {
					jt(i, t, s);
				}),
			r
		);
	}
	if (I(e)) {
		const r = [];
		for (let i = 0; i < e.length; i++) r.push(ae(e[i], t, s, n));
		return r;
	}
}
function jt(e, t, s, n = !0) {
	const r = t ? t.vnode : null;
	if (t) {
		let i = t.parent;
		const l = t.proxy,
			f = `https://vuejs.org/error-reference/#runtime-${s}`;
		for (; i; ) {
			const d = i.ec;
			if (d) {
				for (let h = 0; h < d.length; h++) if (d[h](e, l, f) === !1) return;
			}
			i = i.parent;
		}
		const u = t.appContext.config.errorHandler;
		if (u) {
			Re(), Te(u, null, 10, [e, l, f]), Me();
			return;
		}
	}
	hi(e, s, r, n);
}
function hi(e, t, s, n = !0) {
	console.error(e);
}
let ft = !1,
	ls = !1;
const Z = [];
let me = 0;
const Ge = [];
let Ce = null,
	$e = 0;
const zn = Promise.resolve();
let Ts = null;
function pi(e) {
	const t = Ts || zn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function gi(e) {
	let t = me + 1,
		s = Z.length;
	for (; t < s; ) {
		const n = (t + s) >>> 1,
			r = Z[n],
			i = ut(r);
		i < e || (i === e && r.pre) ? (t = n + 1) : (s = n);
	}
	return t;
}
function Ps(e) {
	(!Z.length || !Z.includes(e, ft && e.allowRecurse ? me + 1 : me)) &&
		(e.id == null ? Z.push(e) : Z.splice(gi(e.id), 0, e), Gn());
}
function Gn() {
	!ft && !ls && ((ls = !0), (Ts = zn.then(Yn)));
}
function _i(e) {
	const t = Z.indexOf(e);
	t > me && Z.splice(t, 1);
}
function mi(e) {
	I(e)
		? Ge.push(...e)
		: (!Ce || !Ce.includes(e, e.allowRecurse ? $e + 1 : $e)) && Ge.push(e),
		Gn();
}
function Xs(e, t, s = ft ? me + 1 : 0) {
	for (; s < Z.length; s++) {
		const n = Z[s];
		if (n && n.pre) {
			if (e && n.id !== e.uid) continue;
			Z.splice(s, 1), s--, n();
		}
	}
}
function Jn(e) {
	if (Ge.length) {
		const t = [...new Set(Ge)].sort((s, n) => ut(s) - ut(n));
		if (((Ge.length = 0), Ce)) {
			Ce.push(...t);
			return;
		}
		for (Ce = t, $e = 0; $e < Ce.length; $e++) Ce[$e]();
		(Ce = null), ($e = 0);
	}
}
const ut = e => (e.id == null ? 1 / 0 : e.id),
	bi = (e, t) => {
		const s = ut(e) - ut(t);
		if (s === 0) {
			if (e.pre && !t.pre) return -1;
			if (t.pre && !e.pre) return 1;
		}
		return s;
	};
function Yn(e) {
	(ls = !1), (ft = !0), Z.sort(bi);
	try {
		for (me = 0; me < Z.length; me++) {
			const t = Z[me];
			t && t.active !== !1 && Te(t, null, 14);
		}
	} finally {
		(me = 0),
			(Z.length = 0),
			Jn(),
			(ft = !1),
			(Ts = null),
			(Z.length || Ge.length) && Yn();
	}
}
function yi(e, t, ...s) {
	if (e.isUnmounted) return;
	const n = e.vnode.props || V;
	let r = s;
	const i = t.startsWith('update:'),
		l = i && t.slice(7);
	if (l && l in n) {
		const h = `${l === 'modelValue' ? 'model' : l}Modifiers`,
			{ number: x, trim: E } = n[h] || V;
		E && (r = s.map(T => (G(T) ? T.trim() : T))), x && (r = s.map(Ar));
	}
	let f,
		u = n[(f = Gt(t))] || n[(f = Gt(Je(t)))];
	!u && i && (u = n[(f = Gt(Ze(t)))]), u && ae(u, e, 6, r);
	const d = n[f + 'Once'];
	if (d) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[f]) return;
		(e.emitted[f] = !0), ae(d, e, 6, r);
	}
}
function Zn(e, t, s = !1) {
	const n = t.emitsCache,
		r = n.get(e);
	if (r !== void 0) return r;
	const i = e.emits;
	let l = {},
		f = !1;
	if (!P(e)) {
		const u = d => {
			const h = Zn(d, t, !0);
			h && ((f = !0), z(l, h));
		};
		!s && t.mixins.length && t.mixins.forEach(u),
			e.extends && u(e.extends),
			e.mixins && e.mixins.forEach(u);
	}
	return !i && !f
		? (B(e) && n.set(e, null), null)
		: (I(i) ? i.forEach(u => (l[u] = null)) : z(l, i), B(e) && n.set(e, l), l);
}
function $t(e, t) {
	return !e || !Ft(t)
		? !1
		: ((t = t.slice(2).replace(/Once$/, '')),
			R(e, t[0].toLowerCase() + t.slice(1)) || R(e, Ze(t)) || R(e, t));
}
let be = null,
	Vt = null;
function At(e) {
	const t = be;
	return (be = e), (Vt = (e && e.type.__scopeId) || null), t;
}
function Xn(e) {
	Vt = e;
}
function Qn() {
	Vt = null;
}
function xi(e, t = be, s) {
	if (!t || e._n) return e;
	const n = (...r) => {
		n._d && cn(-1);
		const i = At(t);
		let l;
		try {
			l = e(...r);
		} finally {
			At(i), n._d && cn(1);
		}
		return l;
	};
	return (n._n = !0), (n._c = !0), (n._d = !0), n;
}
function Zt(e) {
	const {
			type: t,
			vnode: s,
			proxy: n,
			withProxy: r,
			propsOptions: [i],
			slots: l,
			attrs: f,
			emit: u,
			render: d,
			renderCache: h,
			props: x,
			data: E,
			setupState: T,
			ctx: K,
			inheritAttrs: L,
		} = e,
		ne = At(e);
	let D, Y;
	try {
		if (s.shapeFlag & 4) {
			const W = r || n,
				ie = W;
			(D = _e(d.call(ie, W, h, x, T, E, K))), (Y = f);
		} else {
			const W = t;
			(D = _e(
				W.length > 1 ? W(x, { attrs: f, slots: l, emit: u }) : W(x, null),
			)),
				(Y = t.props ? f : vi(f));
		}
	} catch (W) {
		(ot.length = 0), jt(W, e, 1), (D = Pe(at));
	}
	let N = D;
	if (Y && L !== !1) {
		const W = Object.keys(Y),
			{ shapeFlag: ie } = N;
		W.length && ie & 7 && (i && W.some(gs) && (Y = wi(Y, i)), (N = Ye(N, Y)));
	}
	return (
		s.dirs && ((N = Ye(N)), (N.dirs = N.dirs ? N.dirs.concat(s.dirs) : s.dirs)),
		s.transition && (N.transition = s.transition),
		(D = N),
		At(ne),
		D
	);
}
const vi = e => {
		let t;
		for (const s in e)
			(s === 'class' || s === 'style' || Ft(s)) && ((t || (t = {}))[s] = e[s]);
		return t;
	},
	wi = (e, t) => {
		const s = {};
		for (const n in e) (!gs(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
		return s;
	};
function Ei(e, t, s) {
	const { props: n, children: r, component: i } = e,
		{ props: l, children: f, patchFlag: u } = t,
		d = i.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (s && u >= 0) {
		if (u & 1024) return !0;
		if (u & 16) return n ? Qs(n, l, d) : !!l;
		if (u & 8) {
			const h = t.dynamicProps;
			for (let x = 0; x < h.length; x++) {
				const E = h[x];
				if (l[E] !== n[E] && !$t(d, E)) return !0;
			}
		}
	} else
		return (r || f) && (!f || !f.$stable)
			? !0
			: n === l
				? !1
				: n
					? l
						? Qs(n, l, d)
						: !0
					: !!l;
	return !1;
}
function Qs(e, t, s) {
	const n = Object.keys(t);
	if (n.length !== Object.keys(e).length) return !0;
	for (let r = 0; r < n.length; r++) {
		const i = n[r];
		if (t[i] !== e[i] && !$t(s, i)) return !0;
	}
	return !1;
}
function Ci({ vnode: e, parent: t }, s) {
	for (; t; ) {
		const n = t.subTree;
		if ((n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e))
			((e = t.vnode).el = s), (t = t.parent);
		else break;
	}
}
const Oi = Symbol.for('v-ndc'),
	Si = e => e.__isSuspense;
function Ii(e, t) {
	t && t.pendingBranch
		? I(e)
			? t.effects.push(...e)
			: t.effects.push(e)
		: mi(e);
}
const Ti = Symbol.for('v-scx'),
	Pi = () => St(Ti),
	Et = {};
function Xt(e, t, s) {
	return kn(e, t, s);
}
function kn(
	e,
	t,
	{ immediate: s, deep: n, flush: r, once: i, onTrack: l, onTrigger: f } = V,
) {
	if (t && i) {
		const M = t;
		t = (...ye) => {
			M(...ye), ie();
		};
	}
	const u = k,
		d = M => (n === !0 ? M : We(M, n === !1 ? 1 : void 0));
	let h,
		x = !1,
		E = !1;
	if (
		(se(e)
			? ((h = () => e.value), (x = Pt(e)))
			: nt(e)
				? ((h = () => d(e)), (x = !0))
				: I(e)
					? ((E = !0),
						(x = e.some(M => nt(M) || Pt(M))),
						(h = () =>
							e.map(M => {
								if (se(M)) return M.value;
								if (nt(M)) return d(M);
								if (P(M)) return Te(M, u, 2);
							})))
					: P(e)
						? t
							? (h = () => Te(e, u, 2))
							: (h = () => (T && T(), ae(e, u, 3, [K])))
						: (h = oe),
		t && n)
	) {
		const M = h;
		h = () => We(M());
	}
	let T,
		K = M => {
			T = N.onStop = () => {
				Te(M, u, 4), (T = N.onStop = void 0);
			};
		},
		L;
	if (Kt)
		if (
			((K = oe),
			t ? s && ae(t, u, 3, [h(), E ? [] : void 0, K]) : h(),
			r === 'sync')
		) {
			const M = Pi();
			L = M.__watcherHandles || (M.__watcherHandles = []);
		} else return oe;
	let ne = E ? new Array(e.length).fill(Et) : Et;
	const D = () => {
		if (!(!N.active || !N.dirty))
			if (t) {
				const M = N.run();
				(n || x || (E ? M.some((ye, de) => Ae(ye, ne[de])) : Ae(M, ne))) &&
					(T && T(),
					ae(t, u, 3, [M, ne === Et ? void 0 : E && ne[0] === Et ? [] : ne, K]),
					(ne = M));
			} else N.run();
	};
	D.allowRecurse = !!t;
	let Y;
	r === 'sync'
		? (Y = D)
		: r === 'post'
			? (Y = () => ee(D, u && u.suspense))
			: ((D.pre = !0), u && (D.id = u.uid), (Y = () => Ps(D)));
	const N = new xs(h, oe, Y),
		W = Vr(),
		ie = () => {
			N.stop(), W && _s(W.effects, N);
		};
	return (
		t
			? s
				? D()
				: (ne = N.run())
			: r === 'post'
				? ee(N.run.bind(N), u && u.suspense)
				: N.run(),
		L && L.push(ie),
		ie
	);
}
function Ai(e, t, s) {
	const n = this.proxy,
		r = G(e) ? (e.includes('.') ? er(n, e) : () => n[e]) : e.bind(n, n);
	let i;
	P(t) ? (i = t) : ((i = t.handler), (s = t));
	const l = ht(this),
		f = kn(r, i.bind(n), s);
	return l(), f;
}
function er(e, t) {
	const s = t.split('.');
	return () => {
		let n = e;
		for (let r = 0; r < s.length && n; r++) n = n[s[r]];
		return n;
	};
}
function We(e, t, s = 0, n) {
	if (!B(e) || e.__v_skip) return e;
	if (t && t > 0) {
		if (s >= t) return e;
		s++;
	}
	if (((n = n || new Set()), n.has(e))) return e;
	if ((n.add(e), se(e))) We(e.value, t, s, n);
	else if (I(e)) for (let r = 0; r < e.length; r++) We(e[r], t, s, n);
	else if (vn(e) || ze(e))
		e.forEach(r => {
			We(r, t, s, n);
		});
	else if (Cn(e)) for (const r in e) We(e[r], t, s, n);
	return e;
}
function Ne(e, t, s, n) {
	const r = e.dirs,
		i = t && t.dirs;
	for (let l = 0; l < r.length; l++) {
		const f = r[l];
		i && (f.oldValue = i[l].value);
		let u = f.dir[n];
		u && (Re(), ae(u, s, 8, [e.el, f, e, t]), Me());
	}
}
/*! #__NO_SIDE_EFFECTS__ */ function tr(e, t) {
	return P(e) ? z({ name: e.name }, t, { setup: e }) : e;
}
const Ot = e => !!e.type.__asyncLoader,
	sr = e => e.type.__isKeepAlive;
function Ri(e, t) {
	nr(e, 'a', t);
}
function Mi(e, t) {
	nr(e, 'da', t);
}
function nr(e, t, s = k) {
	const n =
		e.__wdc ||
		(e.__wdc = () => {
			let r = s;
			for (; r; ) {
				if (r.isDeactivated) return;
				r = r.parent;
			}
			return e();
		});
	if ((Ut(t, n, s), s)) {
		let r = s.parent;
		for (; r && r.parent; )
			sr(r.parent.vnode) && Fi(n, t, s, r), (r = r.parent);
	}
}
function Fi(e, t, s, n) {
	const r = Ut(t, e, n, !0);
	rr(() => {
		_s(n[t], r);
	}, s);
}
function Ut(e, t, s = k, n = !1) {
	if (s) {
		const r = s[e] || (s[e] = []),
			i =
				t.__weh ||
				(t.__weh = (...l) => {
					if (s.isUnmounted) return;
					Re();
					const f = ht(s),
						u = ae(t, s, e, l);
					return f(), Me(), u;
				});
		return n ? r.unshift(i) : r.push(i), i;
	}
}
const we =
		e =>
		(t, s = k) =>
			(!Kt || e === 'sp') && Ut(e, (...n) => t(...n), s),
	Li = we('bm'),
	Hi = we('m'),
	Ni = we('bu'),
	ji = we('u'),
	$i = we('bum'),
	rr = we('um'),
	Vi = we('sp'),
	Ui = we('rtg'),
	Bi = we('rtc');
function Ki(e, t = k) {
	Ut('ec', e, t);
}
const cs = e => (e ? (xr(e) ? Fs(e) || e.proxy : cs(e.parent)) : null),
	rt = z(Object.create(null), {
		$: e => e,
		$el: e => e.vnode.el,
		$data: e => e.data,
		$props: e => e.props,
		$attrs: e => e.attrs,
		$slots: e => e.slots,
		$refs: e => e.refs,
		$parent: e => cs(e.parent),
		$root: e => cs(e.root),
		$emit: e => e.emit,
		$options: e => As(e),
		$forceUpdate: e =>
			e.f ||
			(e.f = () => {
				(e.effect.dirty = !0), Ps(e.update);
			}),
		$nextTick: e => e.n || (e.n = pi.bind(e.proxy)),
		$watch: e => Ai.bind(e),
	}),
	Qt = (e, t) => e !== V && !e.__isScriptSetup && R(e, t),
	Di = {
		get({ _: e }, t) {
			if (t === '__v_skip') return !0;
			const {
				ctx: s,
				setupState: n,
				data: r,
				props: i,
				accessCache: l,
				type: f,
				appContext: u,
			} = e;
			let d;
			if (t[0] !== '$') {
				const T = l[t];
				if (T !== void 0)
					switch (T) {
						case 1:
							return n[t];
						case 2:
							return r[t];
						case 4:
							return s[t];
						case 3:
							return i[t];
					}
				else {
					if (Qt(n, t)) return (l[t] = 1), n[t];
					if (r !== V && R(r, t)) return (l[t] = 2), r[t];
					if ((d = e.propsOptions[0]) && R(d, t)) return (l[t] = 3), i[t];
					if (s !== V && R(s, t)) return (l[t] = 4), s[t];
					fs && (l[t] = 0);
				}
			}
			const h = rt[t];
			let x, E;
			if (h) return t === '$attrs' && te(e.attrs, 'get', ''), h(e);
			if ((x = f.__cssModules) && (x = x[t])) return x;
			if (s !== V && R(s, t)) return (l[t] = 4), s[t];
			if (((E = u.config.globalProperties), R(E, t))) return E[t];
		},
		set({ _: e }, t, s) {
			const { data: n, setupState: r, ctx: i } = e;
			return Qt(r, t)
				? ((r[t] = s), !0)
				: n !== V && R(n, t)
					? ((n[t] = s), !0)
					: R(e.props, t) || (t[0] === '$' && t.slice(1) in e)
						? !1
						: ((i[t] = s), !0);
		},
		has(
			{
				_: {
					data: e,
					setupState: t,
					accessCache: s,
					ctx: n,
					appContext: r,
					propsOptions: i,
				},
			},
			l,
		) {
			let f;
			return (
				!!s[l] ||
				(e !== V && R(e, l)) ||
				Qt(t, l) ||
				((f = i[0]) && R(f, l)) ||
				R(n, l) ||
				R(rt, l) ||
				R(r.config.globalProperties, l)
			);
		},
		defineProperty(e, t, s) {
			return (
				s.get != null
					? (e._.accessCache[t] = 0)
					: R(s, 'value') && this.set(e, t, s.value, null),
				Reflect.defineProperty(e, t, s)
			);
		},
	};
function ks(e) {
	return I(e) ? e.reduce((t, s) => ((t[s] = null), t), {}) : e;
}
let fs = !0;
function Wi(e) {
	const t = As(e),
		s = e.proxy,
		n = e.ctx;
	(fs = !1), t.beforeCreate && en(t.beforeCreate, e, 'bc');
	const {
		data: r,
		computed: i,
		methods: l,
		watch: f,
		provide: u,
		inject: d,
		created: h,
		beforeMount: x,
		mounted: E,
		beforeUpdate: T,
		updated: K,
		activated: L,
		deactivated: ne,
		beforeDestroy: D,
		beforeUnmount: Y,
		destroyed: N,
		unmounted: W,
		render: ie,
		renderTracked: M,
		renderTriggered: ye,
		errorCaptured: de,
		serverPrefetch: Wt,
		expose: Fe,
		inheritAttrs: Xe,
		components: pt,
		directives: gt,
		filters: qt,
	} = t;
	if ((d && qi(d, n, null), l))
		for (const U in l) {
			const j = l[U];
			P(j) && (n[U] = j.bind(s));
		}
	if (r) {
		const U = r.call(s, s);
		B(U) && (e.data = Os(U));
	}
	if (((fs = !0), i))
		for (const U in i) {
			const j = i[U],
				Le = P(j) ? j.bind(s, s) : P(j.get) ? j.get.bind(s, s) : oe,
				_t = !P(j) && P(j.set) ? j.set.bind(s) : oe,
				He = Eo({ get: Le, set: _t });
			Object.defineProperty(n, U, {
				enumerable: !0,
				configurable: !0,
				get: () => He.value,
				set: he => (He.value = he),
			});
		}
	if (f) for (const U in f) ir(f[U], n, s, U);
	if (u) {
		const U = P(u) ? u.call(s) : u;
		Reflect.ownKeys(U).forEach(j => {
			Xi(j, U[j]);
		});
	}
	h && en(h, e, 'c');
	function X(U, j) {
		I(j) ? j.forEach(Le => U(Le.bind(s))) : j && U(j.bind(s));
	}
	if (
		(X(Li, x),
		X(Hi, E),
		X(Ni, T),
		X(ji, K),
		X(Ri, L),
		X(Mi, ne),
		X(Ki, de),
		X(Bi, M),
		X(Ui, ye),
		X($i, Y),
		X(rr, W),
		X(Vi, Wt),
		I(Fe))
	)
		if (Fe.length) {
			const U = e.exposed || (e.exposed = {});
			Fe.forEach(j => {
				Object.defineProperty(U, j, {
					get: () => s[j],
					set: Le => (s[j] = Le),
				});
			});
		} else e.exposed || (e.exposed = {});
	ie && e.render === oe && (e.render = ie),
		Xe != null && (e.inheritAttrs = Xe),
		pt && (e.components = pt),
		gt && (e.directives = gt);
}
function qi(e, t, s = oe) {
	I(e) && (e = us(e));
	for (const n in e) {
		const r = e[n];
		let i;
		B(r)
			? 'default' in r
				? (i = St(r.from || n, r.default, !0))
				: (i = St(r.from || n))
			: (i = St(r)),
			se(i)
				? Object.defineProperty(t, n, {
						enumerable: !0,
						configurable: !0,
						get: () => i.value,
						set: l => (i.value = l),
					})
				: (t[n] = i);
	}
}
function en(e, t, s) {
	ae(I(e) ? e.map(n => n.bind(t.proxy)) : e.bind(t.proxy), t, s);
}
function ir(e, t, s, n) {
	const r = n.includes('.') ? er(s, n) : () => s[n];
	if (G(e)) {
		const i = t[e];
		P(i) && Xt(r, i);
	} else if (P(e)) Xt(r, e.bind(s));
	else if (B(e))
		if (I(e)) e.forEach(i => ir(i, t, s, n));
		else {
			const i = P(e.handler) ? e.handler.bind(s) : t[e.handler];
			P(i) && Xt(r, i, e);
		}
}
function As(e) {
	const t = e.type,
		{ mixins: s, extends: n } = t,
		{
			mixins: r,
			optionsCache: i,
			config: { optionMergeStrategies: l },
		} = e.appContext,
		f = i.get(t);
	let u;
	return (
		f
			? (u = f)
			: !r.length && !s && !n
				? (u = t)
				: ((u = {}), r.length && r.forEach(d => Rt(u, d, l, !0)), Rt(u, t, l)),
		B(t) && i.set(t, u),
		u
	);
}
function Rt(e, t, s, n = !1) {
	const { mixins: r, extends: i } = t;
	i && Rt(e, i, s, !0), r && r.forEach(l => Rt(e, l, s, !0));
	for (const l in t)
		if (!(n && l === 'expose')) {
			const f = zi[l] || (s && s[l]);
			e[l] = f ? f(e[l], t[l]) : t[l];
		}
	return e;
}
const zi = {
	data: tn,
	props: sn,
	emits: sn,
	methods: tt,
	computed: tt,
	beforeCreate: Q,
	created: Q,
	beforeMount: Q,
	mounted: Q,
	beforeUpdate: Q,
	updated: Q,
	beforeDestroy: Q,
	beforeUnmount: Q,
	destroyed: Q,
	unmounted: Q,
	activated: Q,
	deactivated: Q,
	errorCaptured: Q,
	serverPrefetch: Q,
	components: tt,
	directives: tt,
	watch: Ji,
	provide: tn,
	inject: Gi,
};
function tn(e, t) {
	return t
		? e
			? function () {
					return z(
						P(e) ? e.call(this, this) : e,
						P(t) ? t.call(this, this) : t,
					);
				}
			: t
		: e;
}
function Gi(e, t) {
	return tt(us(e), us(t));
}
function us(e) {
	if (I(e)) {
		const t = {};
		for (let s = 0; s < e.length; s++) t[e[s]] = e[s];
		return t;
	}
	return e;
}
function Q(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function tt(e, t) {
	return e ? z(Object.create(null), e, t) : t;
}
function sn(e, t) {
	return e
		? I(e) && I(t)
			? [...new Set([...e, ...t])]
			: z(Object.create(null), ks(e), ks(t ?? {}))
		: t;
}
function Ji(e, t) {
	if (!e) return t;
	if (!t) return e;
	const s = z(Object.create(null), e);
	for (const n in t) s[n] = Q(e[n], t[n]);
	return s;
}
function or() {
	return {
		app: null,
		config: {
			isNativeTag: Or,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {},
		},
		mixins: [],
		components: {},
		directives: {},
		provides: Object.create(null),
		optionsCache: new WeakMap(),
		propsCache: new WeakMap(),
		emitsCache: new WeakMap(),
	};
}
let Yi = 0;
function Zi(e, t) {
	return function (n, r = null) {
		P(n) || (n = z({}, n)), r != null && !B(r) && (r = null);
		const i = or(),
			l = new WeakSet();
		let f = !1;
		const u = (i.app = {
			_uid: Yi++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Co,
			get config() {
				return i.config;
			},
			set config(d) {},
			use(d, ...h) {
				return (
					l.has(d) ||
						(d && P(d.install)
							? (l.add(d), d.install(u, ...h))
							: P(d) && (l.add(d), d(u, ...h))),
					u
				);
			},
			mixin(d) {
				return i.mixins.includes(d) || i.mixins.push(d), u;
			},
			component(d, h) {
				return h ? ((i.components[d] = h), u) : i.components[d];
			},
			directive(d, h) {
				return h ? ((i.directives[d] = h), u) : i.directives[d];
			},
			mount(d, h, x) {
				if (!f) {
					const E = Pe(n, r);
					return (
						(E.appContext = i),
						x === !0 ? (x = 'svg') : x === !1 && (x = void 0),
						h && t ? t(E, d) : e(E, d, x),
						(f = !0),
						(u._container = d),
						(d.__vue_app__ = u),
						Fs(E.component) || E.component.proxy
					);
				}
			},
			unmount() {
				f && (e(null, u._container), delete u._container.__vue_app__);
			},
			provide(d, h) {
				return (i.provides[d] = h), u;
			},
			runWithContext(d) {
				const h = it;
				it = u;
				try {
					return d();
				} finally {
					it = h;
				}
			},
		});
		return u;
	};
}
let it = null;
function Xi(e, t) {
	if (k) {
		let s = k.provides;
		const n = k.parent && k.parent.provides;
		n === s && (s = k.provides = Object.create(n)), (s[e] = t);
	}
}
function St(e, t, s = !1) {
	const n = k || be;
	if (n || it) {
		const r = n
			? n.parent == null
				? n.vnode.appContext && n.vnode.appContext.provides
				: n.parent.provides
			: it._context.provides;
		if (r && e in r) return r[e];
		if (arguments.length > 1) return s && P(t) ? t.call(n && n.proxy) : t;
	}
}
const lr = {},
	cr = () => Object.create(lr),
	fr = e => Object.getPrototypeOf(e) === lr;
function Qi(e, t, s, n = !1) {
	const r = {},
		i = cr();
	(e.propsDefaults = Object.create(null)), ur(e, t, r, i);
	for (const l in e.propsOptions[0]) l in r || (r[l] = void 0);
	s ? (e.props = n ? r : ii(r)) : e.type.props ? (e.props = r) : (e.props = i),
		(e.attrs = i);
}
function ki(e, t, s, n) {
	const {
			props: r,
			attrs: i,
			vnode: { patchFlag: l },
		} = e,
		f = F(r),
		[u] = e.propsOptions;
	let d = !1;
	if ((n || l > 0) && !(l & 16)) {
		if (l & 8) {
			const h = e.vnode.dynamicProps;
			for (let x = 0; x < h.length; x++) {
				let E = h[x];
				if ($t(e.emitsOptions, E)) continue;
				const T = t[E];
				if (u)
					if (R(i, E)) T !== i[E] && ((i[E] = T), (d = !0));
					else {
						const K = Je(E);
						r[K] = as(u, f, K, T, e, !1);
					}
				else T !== i[E] && ((i[E] = T), (d = !0));
			}
		}
	} else {
		ur(e, t, r, i) && (d = !0);
		let h;
		for (const x in f)
			(!t || (!R(t, x) && ((h = Ze(x)) === x || !R(t, h)))) &&
				(u
					? s &&
						(s[x] !== void 0 || s[h] !== void 0) &&
						(r[x] = as(u, f, x, void 0, e, !0))
					: delete r[x]);
		if (i !== f) for (const x in i) (!t || !R(t, x)) && (delete i[x], (d = !0));
	}
	d && ve(e.attrs, 'set', '');
}
function ur(e, t, s, n) {
	const [r, i] = e.propsOptions;
	let l = !1,
		f;
	if (t)
		for (let u in t) {
			if (st(u)) continue;
			const d = t[u];
			let h;
			r && R(r, (h = Je(u)))
				? !i || !i.includes(h)
					? (s[h] = d)
					: ((f || (f = {}))[h] = d)
				: $t(e.emitsOptions, u) ||
					((!(u in n) || d !== n[u]) && ((n[u] = d), (l = !0)));
		}
	if (i) {
		const u = F(s),
			d = f || V;
		for (let h = 0; h < i.length; h++) {
			const x = i[h];
			s[x] = as(r, u, x, d[x], e, !R(d, x));
		}
	}
	return l;
}
function as(e, t, s, n, r, i) {
	const l = e[s];
	if (l != null) {
		const f = R(l, 'default');
		if (f && n === void 0) {
			const u = l.default;
			if (l.type !== Function && !l.skipFactory && P(u)) {
				const { propsDefaults: d } = r;
				if (s in d) n = d[s];
				else {
					const h = ht(r);
					(n = d[s] = u.call(null, t)), h();
				}
			} else n = u;
		}
		l[0] &&
			(i && !f ? (n = !1) : l[1] && (n === '' || n === Ze(s)) && (n = !0));
	}
	return n;
}
function ar(e, t, s = !1) {
	const n = t.propsCache,
		r = n.get(e);
	if (r) return r;
	const i = e.props,
		l = {},
		f = [];
	let u = !1;
	if (!P(e)) {
		const h = x => {
			u = !0;
			const [E, T] = ar(x, t, !0);
			z(l, E), T && f.push(...T);
		};
		!s && t.mixins.length && t.mixins.forEach(h),
			e.extends && h(e.extends),
			e.mixins && e.mixins.forEach(h);
	}
	if (!i && !u) return B(e) && n.set(e, qe), qe;
	if (I(i))
		for (let h = 0; h < i.length; h++) {
			const x = Je(i[h]);
			nn(x) && (l[x] = V);
		}
	else if (i)
		for (const h in i) {
			const x = Je(h);
			if (nn(x)) {
				const E = i[h],
					T = (l[x] = I(E) || P(E) ? { type: E } : z({}, E));
				if (T) {
					const K = ln(Boolean, T.type),
						L = ln(String, T.type);
					(T[0] = K > -1),
						(T[1] = L < 0 || K < L),
						(K > -1 || R(T, 'default')) && f.push(x);
				}
			}
		}
	const d = [l, f];
	return B(e) && n.set(e, d), d;
}
function nn(e) {
	return e[0] !== '$' && !st(e);
}
function rn(e) {
	return e === null
		? 'null'
		: typeof e == 'function'
			? e.name || ''
			: (typeof e == 'object' && e.constructor && e.constructor.name) || '';
}
function on(e, t) {
	return rn(e) === rn(t);
}
function ln(e, t) {
	return I(t) ? t.findIndex(s => on(s, e)) : P(t) && on(t, e) ? 0 : -1;
}
const dr = e => e[0] === '_' || e === '$stable',
	Rs = e => (I(e) ? e.map(_e) : [_e(e)]),
	eo = (e, t, s) => {
		if (t._n) return t;
		const n = xi((...r) => Rs(t(...r)), s);
		return (n._c = !1), n;
	},
	hr = (e, t, s) => {
		const n = e._ctx;
		for (const r in e) {
			if (dr(r)) continue;
			const i = e[r];
			if (P(i)) t[r] = eo(r, i, n);
			else if (i != null) {
				const l = Rs(i);
				t[r] = () => l;
			}
		}
	},
	pr = (e, t) => {
		const s = Rs(t);
		e.slots.default = () => s;
	},
	to = (e, t) => {
		const s = (e.slots = cr());
		if (e.vnode.shapeFlag & 32) {
			const n = t._;
			n ? (z(s, t), Sn(s, '_', n)) : hr(t, s);
		} else t && pr(e, t);
	},
	so = (e, t, s) => {
		const { vnode: n, slots: r } = e;
		let i = !0,
			l = V;
		if (n.shapeFlag & 32) {
			const f = t._;
			f
				? s && f === 1
					? (i = !1)
					: (z(r, t), !s && f === 1 && delete r._)
				: ((i = !t.$stable), hr(t, r)),
				(l = t);
		} else t && (pr(e, t), (l = { default: 1 }));
		if (i) for (const f in r) !dr(f) && l[f] == null && delete r[f];
	};
function ds(e, t, s, n, r = !1) {
	if (I(e)) {
		e.forEach((E, T) => ds(E, t && (I(t) ? t[T] : t), s, n, r));
		return;
	}
	if (Ot(n) && !r) return;
	const i = n.shapeFlag & 4 ? Fs(n.component) || n.component.proxy : n.el,
		l = r ? null : i,
		{ i: f, r: u } = e,
		d = t && t.r,
		h = f.refs === V ? (f.refs = {}) : f.refs,
		x = f.setupState;
	if (
		(d != null &&
			d !== u &&
			(G(d)
				? ((h[d] = null), R(x, d) && (x[d] = null))
				: se(d) && (d.value = null)),
		P(u))
	)
		Te(u, f, 12, [l, h]);
	else {
		const E = G(u),
			T = se(u);
		if (E || T) {
			const K = () => {
				if (e.f) {
					const L = E ? (R(x, u) ? x[u] : h[u]) : u.value;
					r
						? I(L) && _s(L, i)
						: I(L)
							? L.includes(i) || L.push(i)
							: E
								? ((h[u] = [i]), R(x, u) && (x[u] = h[u]))
								: ((u.value = [i]), e.k && (h[e.k] = u.value));
				} else
					E
						? ((h[u] = l), R(x, u) && (x[u] = l))
						: T && ((u.value = l), e.k && (h[e.k] = l));
			};
			l ? ((K.id = -1), ee(K, s)) : K();
		}
	}
}
const ee = Ii;
function no(e) {
	return ro(e);
}
function ro(e, t) {
	const s = In();
	s.__VUE__ = !0;
	const {
			insert: n,
			remove: r,
			patchProp: i,
			createElement: l,
			createText: f,
			createComment: u,
			setText: d,
			setElementText: h,
			parentNode: x,
			nextSibling: E,
			setScopeId: T = oe,
			insertStaticContent: K,
		} = e,
		L = (
			o,
			c,
			a,
			p = null,
			g = null,
			b = null,
			v = void 0,
			m = null,
			y = !!c.dynamicChildren,
		) => {
			if (o === c) return;
			o && !et(o, c) && ((p = mt(o)), he(o, g, b, !0), (o = null)),
				c.patchFlag === -2 && ((y = !1), (c.dynamicChildren = null));
			const { type: _, ref: w, shapeFlag: O } = c;
			switch (_) {
				case Bt:
					ne(o, c, a, p);
					break;
				case at:
					D(o, c, a, p);
					break;
				case es:
					o == null && Y(c, a, p, v);
					break;
				case fe:
					pt(o, c, a, p, g, b, v, m, y);
					break;
				default:
					O & 1
						? ie(o, c, a, p, g, b, v, m, y)
						: O & 6
							? gt(o, c, a, p, g, b, v, m, y)
							: (O & 64 || O & 128) && _.process(o, c, a, p, g, b, v, m, y, Qe);
			}
			w != null && g && ds(w, o && o.ref, b, c || o, !c);
		},
		ne = (o, c, a, p) => {
			if (o == null) n((c.el = f(c.children)), a, p);
			else {
				const g = (c.el = o.el);
				c.children !== o.children && d(g, c.children);
			}
		},
		D = (o, c, a, p) => {
			o == null ? n((c.el = u(c.children || '')), a, p) : (c.el = o.el);
		},
		Y = (o, c, a, p) => {
			[o.el, o.anchor] = K(o.children, c, a, p, o.el, o.anchor);
		},
		N = ({ el: o, anchor: c }, a, p) => {
			let g;
			for (; o && o !== c; ) (g = E(o)), n(o, a, p), (o = g);
			n(c, a, p);
		},
		W = ({ el: o, anchor: c }) => {
			let a;
			for (; o && o !== c; ) (a = E(o)), r(o), (o = a);
			r(c);
		},
		ie = (o, c, a, p, g, b, v, m, y) => {
			c.type === 'svg' ? (v = 'svg') : c.type === 'math' && (v = 'mathml'),
				o == null ? M(c, a, p, g, b, v, m, y) : Wt(o, c, g, b, v, m, y);
		},
		M = (o, c, a, p, g, b, v, m) => {
			let y, _;
			const { props: w, shapeFlag: O, transition: C, dirs: S } = o;
			if (
				((y = o.el = l(o.type, b, w && w.is, w)),
				O & 8
					? h(y, o.children)
					: O & 16 && de(o.children, y, null, p, g, kt(o, b), v, m),
				S && Ne(o, null, p, 'created'),
				ye(y, o, o.scopeId, v, p),
				w)
			) {
				for (const H in w)
					H !== 'value' &&
						!st(H) &&
						i(y, H, null, w[H], b, o.children, p, g, xe);
				'value' in w && i(y, 'value', null, w.value, b),
					(_ = w.onVnodeBeforeMount) && ge(_, p, o);
			}
			S && Ne(o, null, p, 'beforeMount');
			const A = io(g, C);
			A && C.beforeEnter(y),
				n(y, c, a),
				((_ = w && w.onVnodeMounted) || A || S) &&
					ee(() => {
						_ && ge(_, p, o), A && C.enter(y), S && Ne(o, null, p, 'mounted');
					}, g);
		},
		ye = (o, c, a, p, g) => {
			if ((a && T(o, a), p)) for (let b = 0; b < p.length; b++) T(o, p[b]);
			if (g) {
				let b = g.subTree;
				if (c === b) {
					const v = g.vnode;
					ye(o, v, v.scopeId, v.slotScopeIds, g.parent);
				}
			}
		},
		de = (o, c, a, p, g, b, v, m, y = 0) => {
			for (let _ = y; _ < o.length; _++) {
				const w = (o[_] = m ? Oe(o[_]) : _e(o[_]));
				L(null, w, c, a, p, g, b, v, m);
			}
		},
		Wt = (o, c, a, p, g, b, v) => {
			const m = (c.el = o.el);
			let { patchFlag: y, dynamicChildren: _, dirs: w } = c;
			y |= o.patchFlag & 16;
			const O = o.props || V,
				C = c.props || V;
			let S;
			if (
				(a && je(a, !1),
				(S = C.onVnodeBeforeUpdate) && ge(S, a, c, o),
				w && Ne(c, o, a, 'beforeUpdate'),
				a && je(a, !0),
				_
					? Fe(o.dynamicChildren, _, m, a, p, kt(c, g), b)
					: v || j(o, c, m, null, a, p, kt(c, g), b, !1),
				y > 0)
			) {
				if (y & 16) Xe(m, c, O, C, a, p, g);
				else if (
					(y & 2 && O.class !== C.class && i(m, 'class', null, C.class, g),
					y & 4 && i(m, 'style', O.style, C.style, g),
					y & 8)
				) {
					const A = c.dynamicProps;
					for (let H = 0; H < A.length; H++) {
						const $ = A[H],
							q = O[$],
							le = C[$];
						(le !== q || $ === 'value') &&
							i(m, $, q, le, g, o.children, a, p, xe);
					}
				}
				y & 1 && o.children !== c.children && h(m, c.children);
			} else !v && _ == null && Xe(m, c, O, C, a, p, g);
			((S = C.onVnodeUpdated) || w) &&
				ee(() => {
					S && ge(S, a, c, o), w && Ne(c, o, a, 'updated');
				}, p);
		},
		Fe = (o, c, a, p, g, b, v) => {
			for (let m = 0; m < c.length; m++) {
				const y = o[m],
					_ = c[m],
					w =
						y.el && (y.type === fe || !et(y, _) || y.shapeFlag & 70)
							? x(y.el)
							: a;
				L(y, _, w, null, p, g, b, v, !0);
			}
		},
		Xe = (o, c, a, p, g, b, v) => {
			if (a !== p) {
				if (a !== V)
					for (const m in a)
						!st(m) && !(m in p) && i(o, m, a[m], null, v, c.children, g, b, xe);
				for (const m in p) {
					if (st(m)) continue;
					const y = p[m],
						_ = a[m];
					y !== _ && m !== 'value' && i(o, m, _, y, v, c.children, g, b, xe);
				}
				'value' in p && i(o, 'value', a.value, p.value, v);
			}
		},
		pt = (o, c, a, p, g, b, v, m, y) => {
			const _ = (c.el = o ? o.el : f('')),
				w = (c.anchor = o ? o.anchor : f(''));
			let { patchFlag: O, dynamicChildren: C, slotScopeIds: S } = c;
			S && (m = m ? m.concat(S) : S),
				o == null
					? (n(_, a, p), n(w, a, p), de(c.children || [], a, w, g, b, v, m, y))
					: O > 0 && O & 64 && C && o.dynamicChildren
						? (Fe(o.dynamicChildren, C, a, g, b, v, m),
							(c.key != null || (g && c === g.subTree)) && gr(o, c, !0))
						: j(o, c, a, w, g, b, v, m, y);
		},
		gt = (o, c, a, p, g, b, v, m, y) => {
			(c.slotScopeIds = m),
				o == null
					? c.shapeFlag & 512
						? g.ctx.activate(c, a, p, v, y)
						: qt(c, a, p, g, b, v, y)
					: Ls(o, c, y);
		},
		qt = (o, c, a, p, g, b, v) => {
			const m = (o.component = mo(o, p, g));
			if ((sr(o) && (m.ctx.renderer = Qe), bo(m), m.asyncDep)) {
				if ((g && g.registerDep(m, X), !o.el)) {
					const y = (m.subTree = Pe(at));
					D(null, y, c, a);
				}
			} else X(m, o, c, a, g, b, v);
		},
		Ls = (o, c, a) => {
			const p = (c.component = o.component);
			if (Ei(o, c, a))
				if (p.asyncDep && !p.asyncResolved) {
					U(p, c, a);
					return;
				} else (p.next = c), _i(p.update), (p.effect.dirty = !0), p.update();
			else (c.el = o.el), (p.vnode = c);
		},
		X = (o, c, a, p, g, b, v) => {
			const m = () => {
					if (o.isMounted) {
						let { next: w, bu: O, u: C, parent: S, vnode: A } = o;
						{
							const De = _r(o);
							if (De) {
								w && ((w.el = A.el), U(o, w, v)),
									De.asyncDep.then(() => {
										o.isUnmounted || m();
									});
								return;
							}
						}
						let H = w,
							$;
						je(o, !1),
							w ? ((w.el = A.el), U(o, w, v)) : (w = A),
							O && Jt(O),
							($ = w.props && w.props.onVnodeBeforeUpdate) && ge($, S, w, A),
							je(o, !0);
						const q = Zt(o),
							le = o.subTree;
						(o.subTree = q),
							L(le, q, x(le.el), mt(le), o, g, b),
							(w.el = q.el),
							H === null && Ci(o, q.el),
							C && ee(C, g),
							($ = w.props && w.props.onVnodeUpdated) &&
								ee(() => ge($, S, w, A), g);
					} else {
						let w;
						const { el: O, props: C } = c,
							{ bm: S, m: A, parent: H } = o,
							$ = Ot(c);
						if (
							(je(o, !1),
							S && Jt(S),
							!$ && (w = C && C.onVnodeBeforeMount) && ge(w, H, c),
							je(o, !0),
							O && $s)
						) {
							const q = () => {
								(o.subTree = Zt(o)), $s(O, o.subTree, o, g, null);
							};
							$
								? c.type.__asyncLoader().then(() => !o.isUnmounted && q())
								: q();
						} else {
							const q = (o.subTree = Zt(o));
							L(null, q, a, p, o, g, b), (c.el = q.el);
						}
						if ((A && ee(A, g), !$ && (w = C && C.onVnodeMounted))) {
							const q = c;
							ee(() => ge(w, H, q), g);
						}
						(c.shapeFlag & 256 ||
							(H && Ot(H.vnode) && H.vnode.shapeFlag & 256)) &&
							o.a &&
							ee(o.a, g),
							(o.isMounted = !0),
							(c = a = p = null);
					}
				},
				y = (o.effect = new xs(m, oe, () => Ps(_), o.scope)),
				_ = (o.update = () => {
					y.dirty && y.run();
				});
			(_.id = o.uid), je(o, !0), _();
		},
		U = (o, c, a) => {
			c.component = o;
			const p = o.vnode.props;
			(o.vnode = c),
				(o.next = null),
				ki(o, c.props, p, a),
				so(o, c.children, a),
				Re(),
				Xs(o),
				Me();
		},
		j = (o, c, a, p, g, b, v, m, y = !1) => {
			const _ = o && o.children,
				w = o ? o.shapeFlag : 0,
				O = c.children,
				{ patchFlag: C, shapeFlag: S } = c;
			if (C > 0) {
				if (C & 128) {
					_t(_, O, a, p, g, b, v, m, y);
					return;
				} else if (C & 256) {
					Le(_, O, a, p, g, b, v, m, y);
					return;
				}
			}
			S & 8
				? (w & 16 && xe(_, g, b), O !== _ && h(a, O))
				: w & 16
					? S & 16
						? _t(_, O, a, p, g, b, v, m, y)
						: xe(_, g, b, !0)
					: (w & 8 && h(a, ''), S & 16 && de(O, a, p, g, b, v, m, y));
		},
		Le = (o, c, a, p, g, b, v, m, y) => {
			(o = o || qe), (c = c || qe);
			const _ = o.length,
				w = c.length,
				O = Math.min(_, w);
			let C;
			for (C = 0; C < O; C++) {
				const S = (c[C] = y ? Oe(c[C]) : _e(c[C]));
				L(o[C], S, a, null, g, b, v, m, y);
			}
			_ > w ? xe(o, g, b, !0, !1, O) : de(c, a, p, g, b, v, m, y, O);
		},
		_t = (o, c, a, p, g, b, v, m, y) => {
			let _ = 0;
			const w = c.length;
			let O = o.length - 1,
				C = w - 1;
			for (; _ <= O && _ <= C; ) {
				const S = o[_],
					A = (c[_] = y ? Oe(c[_]) : _e(c[_]));
				if (et(S, A)) L(S, A, a, null, g, b, v, m, y);
				else break;
				_++;
			}
			for (; _ <= O && _ <= C; ) {
				const S = o[O],
					A = (c[C] = y ? Oe(c[C]) : _e(c[C]));
				if (et(S, A)) L(S, A, a, null, g, b, v, m, y);
				else break;
				O--, C--;
			}
			if (_ > O) {
				if (_ <= C) {
					const S = C + 1,
						A = S < w ? c[S].el : p;
					for (; _ <= C; )
						L(null, (c[_] = y ? Oe(c[_]) : _e(c[_])), a, A, g, b, v, m, y), _++;
				}
			} else if (_ > C) for (; _ <= O; ) he(o[_], g, b, !0), _++;
			else {
				const S = _,
					A = _,
					H = new Map();
				for (_ = A; _ <= C; _++) {
					const re = (c[_] = y ? Oe(c[_]) : _e(c[_]));
					re.key != null && H.set(re.key, _);
				}
				let $,
					q = 0;
				const le = C - A + 1;
				let De = !1,
					Vs = 0;
				const ke = new Array(le);
				for (_ = 0; _ < le; _++) ke[_] = 0;
				for (_ = S; _ <= O; _++) {
					const re = o[_];
					if (q >= le) {
						he(re, g, b, !0);
						continue;
					}
					let pe;
					if (re.key != null) pe = H.get(re.key);
					else
						for ($ = A; $ <= C; $++)
							if (ke[$ - A] === 0 && et(re, c[$])) {
								pe = $;
								break;
							}
					pe === void 0
						? he(re, g, b, !0)
						: ((ke[pe - A] = _ + 1),
							pe >= Vs ? (Vs = pe) : (De = !0),
							L(re, c[pe], a, null, g, b, v, m, y),
							q++);
				}
				const Us = De ? oo(ke) : qe;
				for ($ = Us.length - 1, _ = le - 1; _ >= 0; _--) {
					const re = A + _,
						pe = c[re],
						Bs = re + 1 < w ? c[re + 1].el : p;
					ke[_] === 0
						? L(null, pe, a, Bs, g, b, v, m, y)
						: De && ($ < 0 || _ !== Us[$] ? He(pe, a, Bs, 2) : $--);
				}
			}
		},
		He = (o, c, a, p, g = null) => {
			const { el: b, type: v, transition: m, children: y, shapeFlag: _ } = o;
			if (_ & 6) {
				He(o.component.subTree, c, a, p);
				return;
			}
			if (_ & 128) {
				o.suspense.move(c, a, p);
				return;
			}
			if (_ & 64) {
				v.move(o, c, a, Qe);
				return;
			}
			if (v === fe) {
				n(b, c, a);
				for (let O = 0; O < y.length; O++) He(y[O], c, a, p);
				n(o.anchor, c, a);
				return;
			}
			if (v === es) {
				N(o, c, a);
				return;
			}
			if (p !== 2 && _ & 1 && m)
				if (p === 0) m.beforeEnter(b), n(b, c, a), ee(() => m.enter(b), g);
				else {
					const { leave: O, delayLeave: C, afterLeave: S } = m,
						A = () => n(b, c, a),
						H = () => {
							O(b, () => {
								A(), S && S();
							});
						};
					C ? C(b, A, H) : H();
				}
			else n(b, c, a);
		},
		he = (o, c, a, p = !1, g = !1) => {
			const {
				type: b,
				props: v,
				ref: m,
				children: y,
				dynamicChildren: _,
				shapeFlag: w,
				patchFlag: O,
				dirs: C,
			} = o;
			if ((m != null && ds(m, null, a, o, !0), w & 256)) {
				c.ctx.deactivate(o);
				return;
			}
			const S = w & 1 && C,
				A = !Ot(o);
			let H;
			if ((A && (H = v && v.onVnodeBeforeUnmount) && ge(H, c, o), w & 6))
				Cr(o.component, a, p);
			else {
				if (w & 128) {
					o.suspense.unmount(a, p);
					return;
				}
				S && Ne(o, null, c, 'beforeUnmount'),
					w & 64
						? o.type.remove(o, c, a, g, Qe, p)
						: _ && (b !== fe || (O > 0 && O & 64))
							? xe(_, c, a, !1, !0)
							: ((b === fe && O & 384) || (!g && w & 16)) && xe(y, c, a),
					p && Hs(o);
			}
			((A && (H = v && v.onVnodeUnmounted)) || S) &&
				ee(() => {
					H && ge(H, c, o), S && Ne(o, null, c, 'unmounted');
				}, a);
		},
		Hs = o => {
			const { type: c, el: a, anchor: p, transition: g } = o;
			if (c === fe) {
				Er(a, p);
				return;
			}
			if (c === es) {
				W(o);
				return;
			}
			const b = () => {
				r(a), g && !g.persisted && g.afterLeave && g.afterLeave();
			};
			if (o.shapeFlag & 1 && g && !g.persisted) {
				const { leave: v, delayLeave: m } = g,
					y = () => v(a, b);
				m ? m(o.el, b, y) : y();
			} else b();
		},
		Er = (o, c) => {
			let a;
			for (; o !== c; ) (a = E(o)), r(o), (o = a);
			r(c);
		},
		Cr = (o, c, a) => {
			const { bum: p, scope: g, update: b, subTree: v, um: m } = o;
			p && Jt(p),
				g.stop(),
				b && ((b.active = !1), he(v, o, c, a)),
				m && ee(m, c),
				ee(() => {
					o.isUnmounted = !0;
				}, c),
				c &&
					c.pendingBranch &&
					!c.isUnmounted &&
					o.asyncDep &&
					!o.asyncResolved &&
					o.suspenseId === c.pendingId &&
					(c.deps--, c.deps === 0 && c.resolve());
		},
		xe = (o, c, a, p = !1, g = !1, b = 0) => {
			for (let v = b; v < o.length; v++) he(o[v], c, a, p, g);
		},
		mt = o =>
			o.shapeFlag & 6
				? mt(o.component.subTree)
				: o.shapeFlag & 128
					? o.suspense.next()
					: E(o.anchor || o.el);
	let zt = !1;
	const Ns = (o, c, a) => {
			o == null
				? c._vnode && he(c._vnode, null, null, !0)
				: L(c._vnode || null, o, c, null, null, null, a),
				zt || ((zt = !0), Xs(), Jn(), (zt = !1)),
				(c._vnode = o);
		},
		Qe = {
			p: L,
			um: he,
			m: He,
			r: Hs,
			mt: qt,
			mc: de,
			pc: j,
			pbc: Fe,
			n: mt,
			o: e,
		};
	let js, $s;
	return { render: Ns, hydrate: js, createApp: Zi(Ns, js) };
}
function kt({ type: e, props: t }, s) {
	return (s === 'svg' && e === 'foreignObject') ||
		(s === 'mathml' &&
			e === 'annotation-xml' &&
			t &&
			t.encoding &&
			t.encoding.includes('html'))
		? void 0
		: s;
}
function je({ effect: e, update: t }, s) {
	e.allowRecurse = t.allowRecurse = s;
}
function io(e, t) {
	return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function gr(e, t, s = !1) {
	const n = e.children,
		r = t.children;
	if (I(n) && I(r))
		for (let i = 0; i < n.length; i++) {
			const l = n[i];
			let f = r[i];
			f.shapeFlag & 1 &&
				!f.dynamicChildren &&
				((f.patchFlag <= 0 || f.patchFlag === 32) &&
					((f = r[i] = Oe(r[i])), (f.el = l.el)),
				s || gr(l, f)),
				f.type === Bt && (f.el = l.el);
		}
}
function oo(e) {
	const t = e.slice(),
		s = [0];
	let n, r, i, l, f;
	const u = e.length;
	for (n = 0; n < u; n++) {
		const d = e[n];
		if (d !== 0) {
			if (((r = s[s.length - 1]), e[r] < d)) {
				(t[n] = r), s.push(n);
				continue;
			}
			for (i = 0, l = s.length - 1; i < l; )
				(f = (i + l) >> 1), e[s[f]] < d ? (i = f + 1) : (l = f);
			d < e[s[i]] && (i > 0 && (t[n] = s[i - 1]), (s[i] = n));
		}
	}
	for (i = s.length, l = s[i - 1]; i-- > 0; ) (s[i] = l), (l = t[l]);
	return s;
}
function _r(e) {
	const t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : _r(t);
}
const lo = e => e.__isTeleport,
	fe = Symbol.for('v-fgt'),
	Bt = Symbol.for('v-txt'),
	at = Symbol.for('v-cmt'),
	es = Symbol.for('v-stc'),
	ot = [];
let ue = null;
function mr(e = !1) {
	ot.push((ue = e ? null : []));
}
function co() {
	ot.pop(), (ue = ot[ot.length - 1] || null);
}
let dt = 1;
function cn(e) {
	dt += e;
}
function fo(e) {
	return (
		(e.dynamicChildren = dt > 0 ? ue || qe : null),
		co(),
		dt > 0 && ue && ue.push(e),
		e
	);
}
function br(e, t, s, n, r, i) {
	return fo(J(e, t, s, n, r, i, !0));
}
function uo(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function et(e, t) {
	return e.type === t.type && e.key === t.key;
}
const yr = ({ key: e }) => e ?? null,
	It = ({ ref: e, ref_key: t, ref_for: s }) => (
		typeof e == 'number' && (e = '' + e),
		e != null
			? G(e) || se(e) || P(e)
				? { i: be, r: e, k: t, f: !!s }
				: e
			: null
	);
function J(
	e,
	t = null,
	s = null,
	n = 0,
	r = null,
	i = e === fe ? 0 : 1,
	l = !1,
	f = !1,
) {
	const u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && yr(t),
		ref: t && It(t),
		scopeId: Vt,
		slotScopeIds: null,
		children: s,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: i,
		patchFlag: n,
		dynamicProps: r,
		dynamicChildren: null,
		appContext: null,
		ctx: be,
	};
	return (
		f
			? (Ms(u, s), i & 128 && e.normalize(u))
			: s && (u.shapeFlag |= G(s) ? 8 : 16),
		dt > 0 &&
			!l &&
			ue &&
			(u.patchFlag > 0 || i & 6) &&
			u.patchFlag !== 32 &&
			ue.push(u),
		u
	);
}
const Pe = ao;
function ao(e, t = null, s = null, n = 0, r = null, i = !1) {
	if (((!e || e === Oi) && (e = at), uo(e))) {
		const f = Ye(e, t, !0);
		return (
			s && Ms(f, s),
			dt > 0 &&
				!i &&
				ue &&
				(f.shapeFlag & 6 ? (ue[ue.indexOf(e)] = f) : ue.push(f)),
			(f.patchFlag |= -2),
			f
		);
	}
	if ((wo(e) && (e = e.__vccOpts), t)) {
		t = ho(t);
		let { class: f, style: u } = t;
		f && !G(f) && (t.class = ys(f)),
			B(u) && (Kn(u) && !I(u) && (u = z({}, u)), (t.style = bs(u)));
	}
	const l = G(e) ? 1 : Si(e) ? 128 : lo(e) ? 64 : B(e) ? 4 : P(e) ? 2 : 0;
	return J(e, t, s, n, r, l, i, !0);
}
function ho(e) {
	return e ? (Kn(e) || fr(e) ? z({}, e) : e) : null;
}
function Ye(e, t, s = !1) {
	const { props: n, ref: r, patchFlag: i, children: l } = e,
		f = t ? po(n || {}, t) : n;
	return {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: f,
		key: f && yr(f),
		ref:
			t && t.ref ? (s && r ? (I(r) ? r.concat(It(t)) : [r, It(t)]) : It(t)) : r,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: l,
		target: e.target,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== fe ? (i === -1 ? 16 : i | 16) : i,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: e.transition,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && Ye(e.ssContent),
		ssFallback: e.ssFallback && Ye(e.ssFallback),
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce,
	};
}
function Be(e = ' ', t = 0) {
	return Pe(Bt, null, e, t);
}
function _e(e) {
	return e == null || typeof e == 'boolean'
		? Pe(at)
		: I(e)
			? Pe(fe, null, e.slice())
			: typeof e == 'object'
				? Oe(e)
				: Pe(Bt, null, String(e));
}
function Oe(e) {
	return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Ye(e);
}
function Ms(e, t) {
	let s = 0;
	const { shapeFlag: n } = e;
	if (t == null) t = null;
	else if (I(t)) s = 16;
	else if (typeof t == 'object')
		if (n & 65) {
			const r = t.default;
			r && (r._c && (r._d = !1), Ms(e, r()), r._c && (r._d = !0));
			return;
		} else {
			s = 32;
			const r = t._;
			!r && !fr(t)
				? (t._ctx = be)
				: r === 3 &&
					be &&
					(be.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
		}
	else
		P(t)
			? ((t = { default: t, _ctx: be }), (s = 32))
			: ((t = String(t)), n & 64 ? ((s = 16), (t = [Be(t)])) : (s = 8));
	(e.children = t), (e.shapeFlag |= s);
}
function po(...e) {
	const t = {};
	for (let s = 0; s < e.length; s++) {
		const n = e[s];
		for (const r in n)
			if (r === 'class')
				t.class !== n.class && (t.class = ys([t.class, n.class]));
			else if (r === 'style') t.style = bs([t.style, n.style]);
			else if (Ft(r)) {
				const i = t[r],
					l = n[r];
				l &&
					i !== l &&
					!(I(i) && i.includes(l)) &&
					(t[r] = i ? [].concat(i, l) : l);
			} else r !== '' && (t[r] = n[r]);
	}
	return t;
}
function ge(e, t, s, n = null) {
	ae(e, t, 7, [s, n]);
}
const go = or();
let _o = 0;
function mo(e, t, s) {
	const n = e.type,
		r = (t ? t.appContext : e.appContext) || go,
		i = {
			uid: _o++,
			vnode: e,
			type: n,
			parent: t,
			appContext: r,
			root: null,
			next: null,
			subTree: null,
			effect: null,
			update: null,
			scope: new jr(!0),
			render: null,
			proxy: null,
			exposed: null,
			exposeProxy: null,
			withProxy: null,
			provides: t ? t.provides : Object.create(r.provides),
			accessCache: null,
			renderCache: [],
			components: null,
			directives: null,
			propsOptions: ar(n, r),
			emitsOptions: Zn(n, r),
			emit: null,
			emitted: null,
			propsDefaults: V,
			inheritAttrs: n.inheritAttrs,
			ctx: V,
			data: V,
			props: V,
			attrs: V,
			slots: V,
			refs: V,
			setupState: V,
			setupContext: null,
			attrsProxy: null,
			slotsProxy: null,
			suspense: s,
			suspenseId: s ? s.pendingId : 0,
			asyncDep: null,
			asyncResolved: !1,
			isMounted: !1,
			isUnmounted: !1,
			isDeactivated: !1,
			bc: null,
			c: null,
			bm: null,
			m: null,
			bu: null,
			u: null,
			um: null,
			bum: null,
			da: null,
			a: null,
			rtg: null,
			rtc: null,
			ec: null,
			sp: null,
		};
	return (
		(i.ctx = { _: i }),
		(i.root = t ? t.root : i),
		(i.emit = yi.bind(null, i)),
		e.ce && e.ce(i),
		i
	);
}
let k = null,
	Mt,
	hs;
{
	const e = In(),
		t = (s, n) => {
			let r;
			return (
				(r = e[s]) || (r = e[s] = []),
				r.push(n),
				i => {
					r.length > 1 ? r.forEach(l => l(i)) : r[0](i);
				}
			);
		};
	(Mt = t('__VUE_INSTANCE_SETTERS__', s => (k = s))),
		(hs = t('__VUE_SSR_SETTERS__', s => (Kt = s)));
}
const ht = e => {
		const t = k;
		return (
			Mt(e),
			e.scope.on(),
			() => {
				e.scope.off(), Mt(t);
			}
		);
	},
	fn = () => {
		k && k.scope.off(), Mt(null);
	};
function xr(e) {
	return e.vnode.shapeFlag & 4;
}
let Kt = !1;
function bo(e, t = !1) {
	t && hs(t);
	const { props: s, children: n } = e.vnode,
		r = xr(e);
	Qi(e, s, r, t), to(e, n);
	const i = r ? yo(e, t) : void 0;
	return t && hs(!1), i;
}
function yo(e, t) {
	const s = e.type;
	(e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, Di));
	const { setup: n } = s;
	if (n) {
		const r = (e.setupContext = n.length > 1 ? vo(e) : null),
			i = ht(e);
		Re();
		const l = Te(n, e, 0, [e.props, r]);
		if ((Me(), i(), wn(l))) {
			if ((l.then(fn, fn), t))
				return l
					.then(f => {
						un(e, f, t);
					})
					.catch(f => {
						jt(f, e, 0);
					});
			e.asyncDep = l;
		} else un(e, l, t);
	} else vr(e, t);
}
function un(e, t, s) {
	P(t)
		? e.type.__ssrInlineRender
			? (e.ssrRender = t)
			: (e.render = t)
		: B(t) && (e.setupState = qn(t)),
		vr(e, s);
}
let an;
function vr(e, t, s) {
	const n = e.type;
	if (!e.render) {
		if (!t && an && !n.render) {
			const r = n.template || As(e).template;
			if (r) {
				const { isCustomElement: i, compilerOptions: l } = e.appContext.config,
					{ delimiters: f, compilerOptions: u } = n,
					d = z(z({ isCustomElement: i, delimiters: f }, l), u);
				n.render = an(r, d);
			}
		}
		e.render = n.render || oe;
	}
	{
		const r = ht(e);
		Re();
		try {
			Wi(e);
		} finally {
			Me(), r();
		}
	}
}
const xo = {
	get(e, t) {
		return te(e, 'get', ''), e[t];
	},
};
function vo(e) {
	const t = s => {
		e.exposed = s || {};
	};
	return {
		attrs: new Proxy(e.attrs, xo),
		slots: e.slots,
		emit: e.emit,
		expose: t,
	};
}
function Fs(e) {
	if (e.exposed)
		return (
			e.exposeProxy ||
			(e.exposeProxy = new Proxy(qn(oi(e.exposed)), {
				get(t, s) {
					if (s in t) return t[s];
					if (s in rt) return rt[s](e);
				},
				has(t, s) {
					return s in t || s in rt;
				},
			}))
		);
}
function wo(e) {
	return P(e) && '__vccOpts' in e;
}
const Eo = (e, t) => li(e, t, Kt),
	Co = '3.4.25';
/**
 * @vue/runtime-dom v3.4.25
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ const Oo = 'http://www.w3.org/2000/svg',
	So = 'http://www.w3.org/1998/Math/MathML',
	Se = typeof document < 'u' ? document : null,
	dn = Se && Se.createElement('template'),
	Io = {
		insert: (e, t, s) => {
			t.insertBefore(e, s || null);
		},
		remove: e => {
			const t = e.parentNode;
			t && t.removeChild(e);
		},
		createElement: (e, t, s, n) => {
			const r =
				t === 'svg'
					? Se.createElementNS(Oo, e)
					: t === 'mathml'
						? Se.createElementNS(So, e)
						: Se.createElement(e, s ? { is: s } : void 0);
			return (
				e === 'select' &&
					n &&
					n.multiple != null &&
					r.setAttribute('multiple', n.multiple),
				r
			);
		},
		createText: e => Se.createTextNode(e),
		createComment: e => Se.createComment(e),
		setText: (e, t) => {
			e.nodeValue = t;
		},
		setElementText: (e, t) => {
			e.textContent = t;
		},
		parentNode: e => e.parentNode,
		nextSibling: e => e.nextSibling,
		querySelector: e => Se.querySelector(e),
		setScopeId(e, t) {
			e.setAttribute(t, '');
		},
		insertStaticContent(e, t, s, n, r, i) {
			const l = s ? s.previousSibling : t.lastChild;
			if (r && (r === i || r.nextSibling))
				for (
					;
					t.insertBefore(r.cloneNode(!0), s),
						!(r === i || !(r = r.nextSibling));

				);
			else {
				dn.innerHTML =
					n === 'svg'
						? `<svg>${e}</svg>`
						: n === 'mathml'
							? `<math>${e}</math>`
							: e;
				const f = dn.content;
				if (n === 'svg' || n === 'mathml') {
					const u = f.firstChild;
					for (; u.firstChild; ) f.appendChild(u.firstChild);
					f.removeChild(u);
				}
				t.insertBefore(f, s);
			}
			return [
				l ? l.nextSibling : t.firstChild,
				s ? s.previousSibling : t.lastChild,
			];
		},
	},
	To = Symbol('_vtc');
function Po(e, t, s) {
	const n = e[To];
	n && (t = (t ? [t, ...n] : [...n]).join(' ')),
		t == null
			? e.removeAttribute('class')
			: s
				? e.setAttribute('class', t)
				: (e.className = t);
}
const hn = Symbol('_vod'),
	Ao = Symbol('_vsh'),
	Ro = Symbol(''),
	Mo = /(^|;)\s*display\s*:/;
function Fo(e, t, s) {
	const n = e.style,
		r = G(s);
	let i = !1;
	if (s && !r) {
		if (t)
			if (G(t))
				for (const l of t.split(';')) {
					const f = l.slice(0, l.indexOf(':')).trim();
					s[f] == null && Tt(n, f, '');
				}
			else for (const l in t) s[l] == null && Tt(n, l, '');
		for (const l in s) l === 'display' && (i = !0), Tt(n, l, s[l]);
	} else if (r) {
		if (t !== s) {
			const l = n[Ro];
			l && (s += ';' + l), (n.cssText = s), (i = Mo.test(s));
		}
	} else t && e.removeAttribute('style');
	hn in e && ((e[hn] = i ? n.display : ''), e[Ao] && (n.display = 'none'));
}
const pn = /\s*!important$/;
function Tt(e, t, s) {
	if (I(s)) s.forEach(n => Tt(e, t, n));
	else if ((s == null && (s = ''), t.startsWith('--'))) e.setProperty(t, s);
	else {
		const n = Lo(e, t);
		pn.test(s)
			? e.setProperty(Ze(n), s.replace(pn, ''), 'important')
			: (e[n] = s);
	}
}
const gn = ['Webkit', 'Moz', 'ms'],
	ts = {};
function Lo(e, t) {
	const s = ts[t];
	if (s) return s;
	let n = Je(t);
	if (n !== 'filter' && n in e) return (ts[t] = n);
	n = On(n);
	for (let r = 0; r < gn.length; r++) {
		const i = gn[r] + n;
		if (i in e) return (ts[t] = i);
	}
	return t;
}
const _n = 'http://www.w3.org/1999/xlink';
function Ho(e, t, s, n, r) {
	if (n && t.startsWith('xlink:'))
		s == null
			? e.removeAttributeNS(_n, t.slice(6, t.length))
			: e.setAttributeNS(_n, t, s);
	else {
		const i = Nr(t);
		s == null || (i && !Tn(s))
			? e.removeAttribute(t)
			: e.setAttribute(t, i ? '' : s);
	}
}
function No(e, t, s, n, r, i, l) {
	if (t === 'innerHTML' || t === 'textContent') {
		n && l(n, r, i), (e[t] = s ?? '');
		return;
	}
	const f = e.tagName;
	if (t === 'value' && f !== 'PROGRESS' && !f.includes('-')) {
		const d = f === 'OPTION' ? e.getAttribute('value') || '' : e.value,
			h = s ?? '';
		(d !== h || !('_value' in e)) && (e.value = h),
			s == null && e.removeAttribute(t),
			(e._value = s);
		return;
	}
	let u = !1;
	if (s === '' || s == null) {
		const d = typeof e[t];
		d === 'boolean'
			? (s = Tn(s))
			: s == null && d === 'string'
				? ((s = ''), (u = !0))
				: d === 'number' && ((s = 0), (u = !0));
	}
	try {
		e[t] = s;
	} catch {}
	u && e.removeAttribute(t);
}
function jo(e, t, s, n) {
	e.addEventListener(t, s, n);
}
function $o(e, t, s, n) {
	e.removeEventListener(t, s, n);
}
const mn = Symbol('_vei');
function Vo(e, t, s, n, r = null) {
	const i = e[mn] || (e[mn] = {}),
		l = i[t];
	if (n && l) l.value = n;
	else {
		const [f, u] = Uo(t);
		if (n) {
			const d = (i[t] = Do(n, r));
			jo(e, f, d, u);
		} else l && ($o(e, f, l, u), (i[t] = void 0));
	}
}
const bn = /(?:Once|Passive|Capture)$/;
function Uo(e) {
	let t;
	if (bn.test(e)) {
		t = {};
		let n;
		for (; (n = e.match(bn)); )
			(e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0);
	}
	return [e[2] === ':' ? e.slice(3) : Ze(e.slice(2)), t];
}
let ss = 0;
const Bo = Promise.resolve(),
	Ko = () => ss || (Bo.then(() => (ss = 0)), (ss = Date.now()));
function Do(e, t) {
	const s = n => {
		if (!n._vts) n._vts = Date.now();
		else if (n._vts <= s.attached) return;
		ae(Wo(n, s.value), t, 5, [n]);
	};
	return (s.value = e), (s.attached = Ko()), s;
}
function Wo(e, t) {
	if (I(t)) {
		const s = e.stopImmediatePropagation;
		return (
			(e.stopImmediatePropagation = () => {
				s.call(e), (e._stopped = !0);
			}),
			t.map(n => r => !r._stopped && n && n(r))
		);
	} else return t;
}
const yn = e =>
		e.charCodeAt(0) === 111 &&
		e.charCodeAt(1) === 110 &&
		e.charCodeAt(2) > 96 &&
		e.charCodeAt(2) < 123,
	qo = (e, t, s, n, r, i, l, f, u) => {
		const d = r === 'svg';
		t === 'class'
			? Po(e, n, d)
			: t === 'style'
				? Fo(e, s, n)
				: Ft(t)
					? gs(t) || Vo(e, t, s, n, l)
					: (
								t[0] === '.'
									? ((t = t.slice(1)), !0)
									: t[0] === '^'
										? ((t = t.slice(1)), !1)
										: zo(e, t, n, d)
						  )
						? No(e, t, n, i, l, f, u)
						: (t === 'true-value'
								? (e._trueValue = n)
								: t === 'false-value' && (e._falseValue = n),
							Ho(e, t, n, d));
	};
function zo(e, t, s, n) {
	if (n)
		return !!(
			t === 'innerHTML' ||
			t === 'textContent' ||
			(t in e && yn(t) && P(s))
		);
	if (
		t === 'spellcheck' ||
		t === 'draggable' ||
		t === 'translate' ||
		t === 'form' ||
		(t === 'list' && e.tagName === 'INPUT') ||
		(t === 'type' && e.tagName === 'TEXTAREA')
	)
		return !1;
	if (t === 'width' || t === 'height') {
		const r = e.tagName;
		if (r === 'IMG' || r === 'VIDEO' || r === 'CANVAS' || r === 'SOURCE')
			return !1;
	}
	return yn(t) && G(s) ? !1 : t in e;
}
const Go = z({ patchProp: qo }, Io);
let xn;
function Jo() {
	return xn || (xn = no(Go));
}
const Yo = (...e) => {
	const t = Jo().createApp(...e),
		{ mount: s } = t;
	return (
		(t.mount = n => {
			const r = Xo(n);
			if (!r) return;
			const i = t._component;
			!P(i) && !i.render && !i.template && (i.template = r.innerHTML),
				(r.innerHTML = '');
			const l = s(r, !1, Zo(r));
			return (
				r instanceof Element &&
					(r.removeAttribute('v-cloak'), r.setAttribute('data-v-app', '')),
				l
			);
		}),
		t
	);
};
function Zo(e) {
	if (e instanceof SVGElement) return 'svg';
	if (typeof MathMLElement == 'function' && e instanceof MathMLElement)
		return 'mathml';
}
function Xo(e) {
	return G(e) ? document.querySelector(e) : e;
}
const Qo = '/vue-ecosystem-learning/vite.svg',
	ko =
		"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='37.07'%20height='36'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20198'%3e%3cpath%20fill='%2341B883'%20d='M204.8%200H256L128%20220.8L0%200h97.92L128%2051.2L157.44%200h47.36Z'%3e%3c/path%3e%3cpath%20fill='%2341B883'%20d='m0%200l128%20220.8L256%200h-51.2L128%20132.48L50.56%200H0Z'%3e%3c/path%3e%3cpath%20fill='%2335495E'%20d='M50.56%200L128%20133.12L204.8%200h-47.36L128%2051.2L97.92%200H50.56Z'%3e%3c/path%3e%3c/svg%3e",
	Dt = e => (Xn('data-v-1d5be6d4'), (e = e()), Qn(), e),
	el = { class: 'card' },
	tl = Dt(() =>
		J(
			'p',
			null,
			[
				Be(' Edit '),
				J('code', null, 'components/HelloWorld.vue'),
				Be(' to test HMR '),
			],
			-1,
		),
	),
	sl = Dt(() =>
		J(
			'p',
			null,
			[
				Be(' Check out '),
				J(
					'a',
					{
						href: 'https://vuejs.org/guide/quick-start.html#local',
						target: '_blank',
					},
					'create-vue',
				),
				Be(', the official Vue + Vite starter '),
			],
			-1,
		),
	),
	nl = Dt(() =>
		J(
			'p',
			null,
			[
				Be(' Install '),
				J(
					'a',
					{ href: 'https://github.com/vuejs/language-tools', target: '_blank' },
					'Volar',
				),
				Be(' in your IDE for a better DX '),
			],
			-1,
		),
	),
	rl = Dt(() =>
		J(
			'p',
			{ class: 'read-the-docs' },
			'Click on the Vite and Vue logos to learn more',
			-1,
		),
	),
	il = tr({
		__name: 'HelloWorld',
		props: { msg: {} },
		setup(e) {
			const t = ci(0);
			return (s, n) => (
				mr(),
				br(
					fe,
					null,
					[
						J('h1', null, Ds(s.msg), 1),
						J('div', el, [
							J(
								'button',
								{ type: 'button', onClick: n[0] || (n[0] = r => t.value++) },
								'count is ' + Ds(t.value),
								1,
							),
							tl,
						]),
						sl,
						nl,
						rl,
					],
					64,
				)
			);
		},
	}),
	wr = (e, t) => {
		const s = e.__vccOpts || e;
		for (const [n, r] of t) s[n] = r;
		return s;
	},
	ol = wr(il, [['__scopeId', 'data-v-1d5be6d4']]),
	ll = e => (Xn('data-v-58aba71c'), (e = e()), Qn(), e),
	cl = ll(() =>
		J(
			'div',
			null,
			[
				J('a', { href: 'https://vitejs.dev', target: '_blank' }, [
					J('img', { src: Qo, class: 'logo', alt: 'Vite logo' }),
				]),
				J('a', { href: 'https://vuejs.org/', target: '_blank' }, [
					J('img', { src: ko, class: 'logo vue', alt: 'Vue logo' }),
				]),
			],
			-1,
		),
	),
	fl = tr({
		__name: 'App',
		setup(e) {
			return (t, s) => (
				mr(), br(fe, null, [cl, Pe(ol, { msg: 'Vite + Vue' })], 64)
			);
		},
	}),
	ul = wr(fl, [['__scopeId', 'data-v-58aba71c']]);
Yo(ul).mount('#app');
